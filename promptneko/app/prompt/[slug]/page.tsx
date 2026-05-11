import { notFound } from "next/navigation";
import { PromptDetailPage } from "../../components/prompt-detail/PromptDetailPage";
import { getPromptBySlug } from "../../../lib/queries";
import { dbPromptToDetailedPrompt } from "../../../lib/adapters";
import { promptCards } from "../../components/marketplace-data";

// Revalidate once per minute — ISR
export const revalidate = 60;

export async function generateStaticParams() {
  // Seed from static data for the initial build; Supabase takes over at runtime
  return promptCards.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { slug } = await params;
  const sp = await searchParams;
  const isSubmitted = sp?.submitted === '1';

  // Try Supabase first
  const dbRow = await getPromptBySlug(slug, { includePending: isSubmitted }).catch(() => null);

  if (dbRow) {
    const prompt = dbPromptToDetailedPrompt(dbRow as any);
    return <PromptDetailPage prompt={prompt} isPending={isSubmitted} />;
  }

  // Fallback to static data during development / before migration
  const staticPrompt = promptCards.find((p) => p.slug === slug);
  if (staticPrompt) return <PromptDetailPage prompt={staticPrompt} />;

  notFound();
}
