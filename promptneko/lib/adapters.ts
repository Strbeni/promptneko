import type { DbPrompt, DbPromptAsset, DbPromptVariable } from './database.types';
import type { DetailedPrompt } from '../app/components/marketplace-data';

/**
 * Converts a Supabase `prompts` row (with joined relations) into the
 * `DetailedPrompt` shape consumed by all existing UI components.
 * This keeps the DB schema decoupled from the React component API.
 */
export function dbPromptToDetailedPrompt(row: DbPrompt): DetailedPrompt {
  const assets: DbPromptAsset[] = (row.prompt_assets as DbPromptAsset[]) ?? [];
  const variables: DbPromptVariable[] = (row.prompt_variables as DbPromptVariable[]) ?? [];
  const creator = (row.creator as any) ?? {};
  const category = (row.category as any) ?? {};

  // Sort assets: primary first, then by sort_order
  const sortedAssets = [...assets].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return a.sort_order - b.sort_order;
  });

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.short_description,
    content: {
      text: row.content,
      negativePrompt: undefined,
      version: row.version,
    },
    promptToCopy: row.content,
    assets: sortedAssets.map((a) => ({
      type: a.type as 'image' | 'video',
      primaryUrl: a.url,
      thumbnailUrl: a.url,
      dimensions: {
        width: a.width ?? 1024,
        height: a.height ?? 1024,
      },
    })),
    creator: {
      id: creator.id ?? '',
      handle: `@${creator.username ?? 'unknown'}`,
      displayName: creator.display_name ?? 'Unknown Creator',
      avatarUrl: creator.avatar_url ?? '',
      isVerified: creator.is_creator_approved ?? false,
    },
    engine: {
      modelId: row.primary_model ?? 'unknown',
      provider: row.primary_model ?? 'AI',
      parameters: {},
    },
    taxonomy: {
      primaryCategory: category.name ?? 'Uncategorized',
      tags: row.tags ?? [],
    },
    stats: {
      likes: 0,          // reviews.rating aggregation done server-side
      views: row.view_count,
      saves: 0,
    },
    pricing: {
      type: row.pricing_type,
      priceCents: row.price_cents,
    },
    createdAt: row.created_at,
    // Extra fields available for detail page (not in the base interface yet)
    _db: {
      longDescription: row.long_description,
      variables,
      exampleInput: row.example_input,
      exampleOutput: row.example_output,
      modelCompatibility: row.model_compatibility,
      avgRating: row.avg_rating,
      reviewCount: row.review_count,
      purchaseCount: row.purchase_count,
      isNsfw: row.is_nsfw,
    },
  };
}

/** Batch convert */
export function dbPromptsToDetailedPrompts(rows: DbPrompt[]): DetailedPrompt[] {
  return rows.map(dbPromptToDetailedPrompt);
}
