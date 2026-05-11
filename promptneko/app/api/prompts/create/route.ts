import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, createSupabaseServerClient } from '../../../../lib/supabase';
import { createPrompt, createPromptAssets, createPromptVariables } from '../../../../lib/queries';

export async function POST(req: NextRequest) {
  try {
    // --- Authenticate the caller ---
    const cookieStore = await cookies();
    console.log('[create-prompt] Cookies received:', cookieStore.getAll().map(c => c.name));
    
    const authClient = createSupabaseServerClient(cookieStore);
    const { data: { user }, error: authError } = await authClient.auth.getUser();

    if (authError || !user) {
      console.error('[create-prompt] Auth failed:', authError?.message || 'No user found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { content, variables, metadata, examples, media, pricing } = body;

    // --- Get or resolve category id from name ---
    const db = createServerClient();
    let categoryId: string | undefined;
    if (metadata.category) {
      const slug = metadata.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const { data: cat } = await (db as any).from('categories').select('id').eq('slug', slug).maybeSingle();
      categoryId = (cat as any)?.id;
    }

    // --- Resolve price ---
    const pricingType = pricing.type === 'one-time' ? 'one_time'
      : pricing.type === 'subscription' ? 'subscription_only'
      : 'free';
    const priceCents = pricing.type === 'one-time' ? Math.round(pricing.price * 100) : 0;

    // --- Build example_input from first example ---
    const firstExample = examples?.[0];

    // --- Create prompt row ---
    const { id: promptId, slug } = (await createPrompt({
      creator_id: user.id,
      title: metadata.title,
      short_description: metadata.shortDescription,
      long_description: metadata.longDescription || undefined,
      content,
      category_id: categoryId,
      model_compatibility: metadata.modelCompatibility,
      primary_model: metadata.primaryModel || undefined,
      price_cents: priceCents,
      pricing_type: pricingType,
      tags: metadata.tags,
      language: metadata.language ?? 'en',
      use_cases: [],
      expected_output_description: undefined,
      example_input: firstExample?.input,
      example_output: firstExample?.output,
      is_nsfw: metadata.nsfw,
    })) as any;

    // --- Create assets ---
    if (media?.length > 0) {
      await createPromptAssets(
        promptId,
        media.map((url: string, i: number) => ({ url, type: 'image', is_primary: i === 0, sort_order: i }))
      );
    }

    // --- Create variables ---
    if (variables?.length > 0) {
      await createPromptVariables(
        promptId,
        variables.map((v: any, i: number) => ({
          name: v.displayName || v.name,
          placeholder_key: v.name,
          description: v.description || undefined,
          variable_type: v.type,
          default_value: v.defaultValue || undefined,
          options: v.options?.length > 0 ? v.options : undefined,
          validation_rules: v.maxLength ? { max_length: v.maxLength } : undefined,
          is_required: v.required,
          sort_order: i,
        }))
      );
    }

    return NextResponse.json({ success: true, promptId, slug });
  } catch (err: any) {
    console.error('[create-prompt]', err);
    return NextResponse.json({ error: err.message ?? 'Internal error' }, { status: 500 });
  }
}
