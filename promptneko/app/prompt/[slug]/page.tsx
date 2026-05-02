import { PromptDetailPage } from "../../components/prompt-detail/PromptDetailPage";
import { findPromptBySlug, promptCards, promptSlug } from "../../components/marketplace-data";

export function generateStaticParams() {
  return promptCards.map((prompt) => ({
    slug: promptSlug(prompt.title),
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = findPromptBySlug(slug);

  return <PromptDetailPage prompt={prompt} />;
}
