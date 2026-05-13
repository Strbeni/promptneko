import { notFound } from "next/navigation";
import { CategoryDetailPage } from "../../components/CategoryDetailPage";
import { fetchAllCategorySections } from "../../actions/categories";
import { getCategoryBySlug } from "../../components/marketplace-data";

export async function generateStaticParams() {
  // Pre-render all known category slugs
  return [
    "models", "art", "logos-icons", "graphics", "productivity",
    "marketing", "photography", "games", "websites-ui", "social-reels", "coding-prompts",
  ].map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getCategoryBySlug(slug);
  if (!meta) notFound();

  const sections = await fetchAllCategorySections(slug);

  return (
    <CategoryDetailPage
      meta={meta}
      featured={sections.featured}
      trending={sections.trending}
      free={sections.free}
      best={sections.best}
      all={sections.all}
    />
  );
}
