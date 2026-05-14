/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, createSupabaseServerClient } from '../../../../lib/supabase';
import { createPrompt, createPromptAssets, createPromptVariables } from '../../../../lib/queries';
import { jsonError, rateLimit, sanitizeText } from '../../../../lib/api-utils';

export async function POST(req: NextRequest) {
  try {
    const limited = await rateLimit('prompt-create', 15, 60_000);
    if (!limited.ok) return jsonError('Too many prompt submissions. Please wait and try again.', 429);

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

    const title = sanitizeText(metadata?.title, 100);
    const shortDescription = sanitizeText(metadata?.shortDescription, 250);
    const longDescription = sanitizeText(metadata?.longDescription, 5000);
    const safeContent = sanitizeText(content, 20_000);

    if (!title || !shortDescription || !safeContent) {
      return NextResponse.json({ error: 'Title, short description, and prompt content are required.' }, { status: 400 });
    }

    // --- Get or resolve category id from name ---
    const db = createServerClient();
    let categoryId: string | undefined;
    if (metadata?.category) {
      const slug = sanitizeText(metadata.category, 80).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const { data: cat } = await (db as any).from('categories').select('id').eq('slug', slug).maybeSingle();
      categoryId = (cat as any)?.id;
    }

    // --- Resolve price ---
    const pricingType = pricing?.type === 'one-time' ? 'one_time'
      : pricing?.type === 'subscription' ? 'subscription_only'
      : 'free';
    const priceCents = pricing?.type === 'one-time' ? Math.max(0, Math.round(Number(pricing.price) * 100)) : 0;

    // --- Build example_input from first example ---
    const firstExample = examples?.[0];

    // --- Create prompt row ---
    const { id: promptId, slug } = (await createPrompt({
      creator_id: user.id,
      title,
      short_description: shortDescription,
      long_description: longDescription || undefined,
      content: safeContent,
      category_id: categoryId,
      model_compatibility: Array.isArray(metadata?.modelCompatibility) ? metadata.modelCompatibility.map((item: unknown) => sanitizeText(item, 80)).filter(Boolean).slice(0, 10) : [],
      primary_model: sanitizeText(metadata?.primaryModel, 80) || undefined,
      price_cents: priceCents,
      pricing_type: pricingType,
      tags: Array.isArray(metadata?.tags) ? metadata.tags.map((tag: unknown) => sanitizeText(tag, 40).toLowerCase()).filter(Boolean).slice(0, 10) : [],
      language: sanitizeText(metadata?.language, 12) || 'en',
      use_cases: [],
      expected_output_description: undefined,
      example_input: firstExample?.input,
      example_output: sanitizeText(firstExample?.output, 5000) || undefined,
      is_nsfw: !!metadata?.nsfw,
    })) as any;

    // --- Create assets ---
    if (media?.length > 0) {
      await createPromptAssets(
        promptId,
        media
          .map((url: string, i: number) => ({ url: sanitizeText(url, 2048), type: 'image' as const, is_primary: i === 0, sort_order: i }))
          .filter((asset: { url: string }) => asset.url.startsWith('http') || asset.url.startsWith('/'))
          .slice(0, 8)
      );
    }

    // --- Create variables ---
    if (variables?.length > 0) {
      await createPromptVariables(
        promptId,
        variables.map((v: any, i: number) => ({
          name: sanitizeText(v.displayName || v.name, 80),
          placeholder_key: sanitizeText(v.name, 80),
          description: sanitizeText(v.description, 200) || undefined,
          variable_type: v.type,
          default_value: sanitizeText(v.defaultValue, 500) || undefined,
          options: v.options?.length > 0 ? v.options.map((option: unknown) => sanitizeText(option, 100)).filter(Boolean).slice(0, 50) : undefined,
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
