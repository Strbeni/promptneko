/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from './supabase';
import { DbPrompt } from './database.types';

// Full prompt row with creator + assets + variables joined
const PROMPT_SELECT = `
  *,
  creator:users!creator_id(id, username, display_name, avatar_url, is_creator_approved),
  category:categories!category_id(id, slug, name),
  prompt_assets(id, url, type, width, height, is_primary, sort_order),
  prompt_variables(id, name, placeholder_key, description, variable_type, default_value, options, is_required, sort_order),
  user_likes(count),
  user_saved_prompts(count)
`;

export async function getPrompts({
  category,
  search,
  limit = 24,
  offset = 0,
  featured,
}: {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
  featured?: boolean;
} = {}) {
  const db = createServerClient();
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const safeOffset = Math.max(offset, 0);
  let q = db
    .from('prompts')
    .select(PROMPT_SELECT)
    .eq('status', 'active')
    .order('published_at', { ascending: false })
    .range(safeOffset, safeOffset + safeLimit - 1);

  if (category) q = q.eq('category_id', category);
  if (search) q = q.textSearch('title', search, { type: 'plain' });
  if (featured !== undefined) q = q.eq('is_featured', featured);

  const { data, error } = await (q as any);
  if (error) throw error;
  return (data ?? []) as any[];
}

export async function getPromptBySlug(slug: string, options?: { includePending?: boolean }) {
  const db = createServerClient();
  let query = db
    .from('prompts')
    .select(PROMPT_SELECT)
    .eq('slug', slug);

  if (!options?.includePending) {
    query = query.eq('status', 'active');
  } else {
    query = query.in('status', ['active', 'pending_review']);
  }

  const { data, error } = await query.single();

  if (error) return null;
  return data;
}

export async function getPromptsByCategory(categorySlug: string, limit = 8) {
  const db = createServerClient();
  // First resolve category id from slug
  const { data: cat } = await db
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();

  if (!cat) return [];
  return getPrompts({ category: (cat as any).id, limit });
}

export async function getCategories() {
  const db = createServerClient();
  const { data, error } = await db
    .from('categories')
    .select('*')
    .is('parent_category_id', null)
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedPrompts(limit = 8) {
  return getPrompts({ featured: true, limit });
}

export async function getTrendingPrompts(limit = 8) {
  const db = createServerClient();
  const { data, error } = await db
    .from('prompts')
    .select(PROMPT_SELECT)
    .eq('status', 'active')
    .order('view_count', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function incrementViewCount(promptId: string) {
  const db = createServerClient();
  await (db as any).rpc('increment_view_count', { p_id: promptId });
}

export async function createPrompt(payload: {
  creator_id: string;
  title: string;
  short_description: string;
  long_description?: string;
  content: string;
  category_id?: string;
  subcategory_id?: string;
  model_compatibility?: string[];
  primary_model?: string;
  price_cents?: number;
  pricing_type?: DbPrompt['pricing_type'];
  tags?: string[];
  language?: string;
  use_cases?: string[];
  expected_output_description?: string;
  example_input?: Record<string, string>;
  example_output?: string;
  is_nsfw?: boolean;
}) {
  const db = createServerClient();
  const { data, error } = await (db as any)
    .from('prompts')
    .insert({
      ...payload,
      status: 'pending_review',
      pricing_type: payload.pricing_type ?? 'free',
    })
    .select('id, slug')
    .single();

  if (error) throw error;
  return data as any;
}

export async function createPromptAssets(
  promptId: string,
  assets: Array<{ url: string; type?: 'image' | 'video'; is_primary?: boolean; sort_order?: number }>
) {
  const db = createServerClient();
  const { error } = await (db as any).from('prompt_assets').insert(
    assets.map((a, i) => ({
      prompt_id: promptId,
      url: a.url,
      type: a.type ?? 'image',
      is_primary: a.is_primary ?? i === 0,
      sort_order: a.sort_order ?? i,
    }))
  );
  if (error) throw error;
}

export async function createPromptVariables(
  promptId: string,
  variables: Array<{
    name: string;
    placeholder_key: string;
    description?: string;
    variable_type?: DbPrompt['pricing_type'];
    default_value?: string;
    options?: unknown[];
    validation_rules?: Record<string, unknown>;
    is_required?: boolean;
    sort_order?: number;
  }>
) {
  const db = createServerClient();
  const { error } = await (db as any).from('prompt_variables').insert(
    variables.map((v, i) => ({
      prompt_id: promptId,
      name: v.name,
      placeholder_key: v.placeholder_key,
      description: v.description ?? null,
      variable_type: (v.variable_type as unknown as string) ?? 'text',
      default_value: v.default_value ?? null,
      options: v.options ? JSON.stringify(v.options) : null,
      validation_rules: v.validation_rules ? JSON.stringify(v.validation_rules) : null,
      is_required: v.is_required ?? true,
      sort_order: v.sort_order ?? i,
    }))
  );
  if (error) throw error;
}

export async function getReviewsForPrompt(promptId: string) {
  const db = createServerClient();
  const { data, error } = await db
    .from('reviews')
    .select('*, reviewer:users!reviewer_id(display_name, avatar_url)')
    .eq('prompt_id', promptId)
    .eq('is_hidden', false)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}
