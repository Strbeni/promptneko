"use server";

import { getPrompts, getTrendingPrompts, getFeaturedPrompts } from "../../lib/queries";
import { dbPromptsToDetailedPrompts } from "../../lib/adapters";
import { promptCards, CATEGORY_REGISTRY, CategoryMeta } from "../components/marketplace-data";
import { DetailedPrompt } from "../components/marketplace-data";

export type CategorySection = "featured" | "trending" | "free" | "best" | "all";

function filterStaticByCategory(meta: CategoryMeta): DetailedPrompt[] {
  if (meta.mappedCategories.length === 0) return [];
  return promptCards.filter((p) =>
    meta.mappedCategories.includes(p.taxonomy.primaryCategory)
  );
}

async function tryGetDbPrompts(limit = 24): Promise<DetailedPrompt[]> {
  try {
    const rawPrompts = await getPrompts({ limit });
    return dbPromptsToDetailedPrompts(rawPrompts);
  } catch {
    return [];
  }
}

export async function fetchCategoryFeatured(slug: string, limit = 8): Promise<DetailedPrompt[]> {
  const meta = CATEGORY_REGISTRY.find((c) => c.slug === slug);
  if (!meta) return [];

  try {
    const raw = await getFeaturedPrompts(limit);
    const db = dbPromptsToDetailedPrompts(raw);
    if (db.length > 0) return db;
  } catch { /* fall through */ }

  const staticFallback = filterStaticByCategory(meta);
  return staticFallback.length > 0 ? staticFallback.slice(0, limit) : promptCards.slice(0, limit);
}

export async function fetchCategoryTrending(slug: string, limit = 12): Promise<DetailedPrompt[]> {
  const meta = CATEGORY_REGISTRY.find((c) => c.slug === slug);
  if (!meta) return [];

  try {
    const raw = await getTrendingPrompts(limit);
    const db = dbPromptsToDetailedPrompts(raw);
    if (db.length > 0) return db;
  } catch { /* fall through */ }

  const staticFallback = filterStaticByCategory(meta);
  return staticFallback.length > 0 ? staticFallback.slice(0, limit) : promptCards.slice(0, limit);
}

export async function fetchCategoryFree(slug: string, limit = 12): Promise<DetailedPrompt[]> {
  const meta = CATEGORY_REGISTRY.find((c) => c.slug === slug);
  if (!meta) return [];

  // All prompts are free until payment model is developed
  try {
    const raw = await getPrompts({ limit });
    const db = dbPromptsToDetailedPrompts(raw);
    if (db.length > 0) return db;
  } catch { /* fall through */ }

  const staticFallback = filterStaticByCategory(meta);
  const pool = staticFallback.length > 0 ? staticFallback : promptCards;
  // Mark all as free
  return pool.slice(0, limit).map((p) => ({
    ...p,
    pricing: { type: "free" as const, priceCents: 0 },
  }));
}

export async function fetchCategoryBest(slug: string, limit = 12): Promise<DetailedPrompt[]> {
  const meta = CATEGORY_REGISTRY.find((c) => c.slug === slug);
  if (!meta) return [];

  try {
    const raw = await getPrompts({ limit });
    const db = dbPromptsToDetailedPrompts(raw);
    if (db.length > 0) {
      return [...db].sort((a, b) => b.stats.likes - a.stats.likes).slice(0, limit);
    }
  } catch { /* fall through */ }

  const staticFallback = filterStaticByCategory(meta);
  const pool = staticFallback.length > 0 ? staticFallback : promptCards;
  return [...pool].sort((a, b) => b.stats.likes - a.stats.likes).slice(0, limit);
}

export async function fetchCategoryAll(slug: string, limit = 24, offset = 0): Promise<DetailedPrompt[]> {
  const meta = CATEGORY_REGISTRY.find((c) => c.slug === slug);
  if (!meta) return [];

  try {
    const raw = await getPrompts({ limit, offset });
    const db = dbPromptsToDetailedPrompts(raw);
    if (db.length > 0) return db;
  } catch { /* fall through */ }

  const staticFallback = filterStaticByCategory(meta);
  const pool = staticFallback.length > 0 ? staticFallback : promptCards;
  return pool.slice(offset, offset + limit);
}

export async function fetchAllCategorySections(slug: string) {
  const [featured, trending, free, best, all] = await Promise.all([
    fetchCategoryFeatured(slug, 8),
    fetchCategoryTrending(slug, 12),
    fetchCategoryFree(slug, 12),
    fetchCategoryBest(slug, 12),
    fetchCategoryAll(slug, 24),
  ]);
  return { featured, trending, free, best, all };
}
