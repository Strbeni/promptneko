"use client";

import { useRouter } from "next/navigation";

import {
  Aperture,
  Brush,
  Camera,
  ChevronRight,
  Clapperboard,
  Code2,
  Cuboid,
  Droplets,
  Film,
  Gamepad2,
  Grid2X2,
  Heart,
  ImageIcon,
  Link2,
  Megaphone,
  Music2,
  Palette,
  PenTool,
  Play,
  Search,
  Sparkles,
  WandSparkles,
  Globe,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ActionDrawer } from "./ActionDrawer";
import { optimizedThumbnailUrl } from "./image-utils";
import { MarketplaceLayout } from "./MarketplaceLayout";
import { CATEGORY_REGISTRY, DetailedPrompt, getCategoryBySlug } from "./marketplace-data";

// ─── Top Category Rail data ────────────────────────────────────────────────────

const topCategories = [
  { title: "Art", slug: "art", count: "22K+ Prompts", icon: Brush },
  { title: "Photography", slug: "photography", count: "12K+ Prompts", icon: Camera },
  { title: "Social & Reels", slug: "social-reels", count: "15K+ Prompts", icon: Film },
  { title: "Logos & Icons", slug: "logos-icons", count: "8K+ Prompts", icon: Palette },
  { title: "Marketing", slug: "marketing", count: "9K+ Prompts", icon: Megaphone },
  { title: "Coding", slug: "coding-prompts", count: "6K+ Prompts", icon: Code2 },
  { title: "Models", slug: "models", count: "34K+ Prompts", icon: Cuboid },
  { title: "Games", slug: "games", count: "4K+ Prompts", icon: Gamepad2 },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState("");
  return (
    <section className="relative mt-0 overflow-hidden rounded-[20px] border border-[#9b42ff] bg-[#110c24] shadow-[0_0_34px_rgba(119,45,255,0.12)] px-9 py-[43px]">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_right,#7b3cff_0%,transparent_65%)]" />
      <div className="relative z-10 max-w-[520px]">
        <p className="mb-[13px] text-[10px] font-semibold uppercase tracking-[0.13em] text-[#d9dcef]">Browse Categories</p>
        <h1 className="m-0 text-[38px] font-extrabold leading-[1.04] text-white">
          Discover <span className="text-[#a463ff]">Creative Worlds</span>
        </h1>
        <p className="mt-[15px] mb-[21px] text-[15px] leading-[1.5] text-[#c9cee0]">
          Navigate AI creativity through curated categories, aesthetics, and styles.
        </p>
        <form
          className="flex h-[44px] w-full max-w-[450px] items-center gap-3 rounded-lg border border-[#30395e] bg-[#0b1123]/90 px-[14px] pr-[3px]"
          onSubmit={(e) => { e.preventDefault(); onSearch(q); }}
        >
          <input
            className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-white outline-none placeholder:text-[#929ab3]"
            placeholder="Search categories or subcategories..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            type="submit"
            className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-b from-[#843fff] to-[#642ee6] text-white"
          >
            <Search size={18} />
          </button>
        </form>
        <div className="mt-[27px] grid w-[410px] grid-cols-4 gap-7">
          {[
            ["11", "Categories"],
            ["200+", "Subcategories"],
            ["127K+", "Prompts"],
            ["Free", "Access"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong className="block text-[18px] leading-none text-[#a463ff]">{value}</strong>
              <span className="mt-[7px] block text-[11px] text-[#c6ccdd]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Top Category Rail ────────────────────────────────────────────────────────

function TopCategoryRail({ onNavigate }: { onNavigate: (slug: string) => void }) {
  const accentMap: Record<string, string> = {
    art: "#ffef75",
    photography: "#78a7ff",
    "social-reels": "#ff78c8",
    "logos-icons": "#78c7ff",
    marketing: "#ff9f7a",
    "coding-prompts": "#7affb0",
    models: "#a463ff",
    games: "#ff7a7a",
  };

  return (
    <section className="relative mt-3 rounded-[14px] border border-[#17203a] bg-[#080d1a]/78 px-[17px] py-[13px]">
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-[14px]">
        {topCategories.map(({ title, slug, count, icon: Icon }) => {
          const accent = accentMap[slug] ?? "#a463ff";
          return (
            <button
              className="group relative h-[114px] overflow-hidden rounded-lg border border-[#273056] bg-[#090f1f] text-center transition-all hover:border-[#7b3cff] hover:-translate-y-0.5"
              key={slug}
              onClick={() => onNavigate(slug)}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `radial-gradient(circle at 50% 0%, ${accent}18, transparent 70%)` }}
              />
              <div className="relative z-10 grid h-full place-items-center content-center gap-2">
                <Icon
                  className="mb-1 drop-shadow-[0_0_14px_currentColor]"
                  style={{ color: accent }}
                  size={32}
                  strokeWidth={1.9}
                />
                <strong className="block text-[13px] text-white leading-tight">{title}</strong>
                <span className="text-[10px] text-[#8090b4]">{count}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ─── Subcategory Pills ────────────────────────────────────────────────────────

function SubcategoryPills({
  slug,
  accent,
  onNavigate,
}: {
  slug: string;
  accent: string;
  onNavigate: (slug: string, tag?: string) => void;
}) {
  const meta = getCategoryBySlug(slug);
  if (!meta) return null;
  const pills = meta.subcategories.slice(0, 8);

  return (
    <div className="flex items-center gap-2 overflow-hidden flex-wrap">
      {pills.map(({ label, tags }, index) => {
        const tag = tags[0];
        return (
          <button
            className={`flex h-[30px] shrink-0 items-center gap-[6px] rounded-lg border px-[12px] text-[11px] font-semibold transition-all ${
              index === 0
                ? "border-[#8a38ff] bg-[#301158] text-white shadow-[0_0_18px_rgba(138,56,255,0.18)]"
                : "border-[#252d4b] bg-[#0d1223] text-[#a0aac2] hover:border-[#3d2875] hover:text-white"
            }`}
            key={label}
            onClick={() => onNavigate(slug, tag)}
          >
            {label}
          </button>
        );
      })}
      <button
        aria-label="More subcategories"
        className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#12182a] text-[#dfe5f8] hover:bg-[#1d2645] transition-colors"
        onClick={() => onNavigate(slug)}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

// ─── Prompt Tile ──────────────────────────────────────────────────────────────

function PromptTile({ prompt, onNavigate }: { prompt: DetailedPrompt; onNavigate: (slug: string) => void }) {
  return (
    <article
      className="group overflow-hidden rounded-lg border border-[#263050] bg-[#080d19] transition-all hover:-translate-y-0.5 hover:border-[#7332f3] cursor-pointer"
      onClick={() => onNavigate(prompt.slug)}
    >
      <div className="relative h-[150px] overflow-hidden bg-[#090e1b]">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${optimizedThumbnailUrl(prompt.assets[0]?.thumbnailUrl)})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_36%,rgba(2,4,10,0.88)_100%)]" />
        <span className="absolute left-[8px] top-[8px] rounded-md bg-[#1b2031]/86 px-[7px] py-[3px] text-[9px] font-bold text-white">
          {prompt.taxonomy.primaryCategory}
        </span>
        {prompt.assets[0]?.type === "video" && (
          <>
            <span className="absolute right-[8px] top-[8px] rounded-md bg-black/50 px-[6px] py-[2px] text-[9px] text-white">
              00:10
            </span>
            <button
              aria-label={`Play ${prompt.title}`}
              className="absolute inset-0 m-auto grid h-9 w-9 place-items-center rounded-full bg-white/88 text-[#0b1020]"
              onClick={(e) => e.stopPropagation()}
            >
              <Play size={16} fill="currentColor" />
            </button>
          </>
        )}
      </div>
      <div className="px-[9px] py-[8px]">
        <h3 className="truncate text-[12px] font-bold text-white">{prompt.title}</h3>
        <div className="mt-[7px] flex items-center gap-[5px] text-[10px] text-[#aeb5ca]">
          <span className="h-[12px] w-[12px] rounded-full bg-gradient-to-br from-[#ffc176] to-[#855cff]" />
          <span className="truncate">{prompt.creator.handle}</span>
          <span className="ml-auto flex items-center gap-1">
            <Heart size={10} className="text-[#ff4f9d]" /> {prompt.stats.likes.toLocaleString()}
          </span>
        </div>
      </div>
    </article>
  );
}

// ─── Category Section ─────────────────────────────────────────────────────────

function CategorySection({
  meta,
  prompts,
  onNavigateCategory,
  onNavigatePrompt,
}: {
  meta: ReturnType<typeof getCategoryBySlug>;
  prompts: DetailedPrompt[];
  onNavigateCategory: (slug: string, tag?: string) => void;
  onNavigatePrompt: (slug: string) => void;
}) {
  if (!meta) return null;
  const displayPrompts = prompts.slice(0, 5);

  return (
    <section className="relative mt-4 rounded-[14px] border border-[#17203a] bg-[#080d1a]/66 px-[18px] py-[16px]">
      <header className="mb-[14px] flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          <h2 className="m-0 text-[20px] font-bold leading-none text-white">{meta.label}</h2>
          <p className="m-0 text-[11px] text-[#9ca4be]">{meta.description}</p>
        </div>
        <button
          className="h-[30px] rounded-lg border border-[#2b1d57] bg-[#0f1024] px-[12px] text-[12px] hover:bg-[#1a1040] transition-colors"
          style={{ color: meta.accent }}
          onClick={() => onNavigateCategory(meta.slug)}
        >
          View all
        </button>
      </header>

      <h3 className="mb-[10px] text-[12px] font-bold text-[#fff083]">Popular Subcategories</h3>
      <SubcategoryPills slug={meta.slug} accent={meta.accent} onNavigate={onNavigateCategory} />

      <div className="flex items-center justify-between mt-[14px] mb-[10px]">
        <h3 className="m-0 text-[12px] font-bold text-white">Featured Prompts</h3>
        <button
          className="text-[11px] hover:text-white transition-colors"
          style={{ color: meta.accent }}
          onClick={() => onNavigateCategory(meta.slug)}
        >
          View all →
        </button>
      </div>

      {displayPrompts.length > 0 ? (
        <div className="grid grid-cols-5 gap-[14px]">
          {displayPrompts.map((prompt) => (
            <PromptTile key={prompt.id} prompt={prompt} onNavigate={onNavigatePrompt} />
          ))}
        </div>
      ) : (
        <p className="text-[12px] text-[#6070a0] py-4">No prompts available yet. Check back soon!</p>
      )}
    </section>
  );
}

// ─── Suggest Category ─────────────────────────────────────────────────────────

function SuggestCategory() {
  return (
    <section className="mt-6 flex h-[86px] items-center gap-[20px] rounded-xl border border-[#2a1d56] bg-[linear-gradient(90deg,#14102a_0%,#201147_55%,#32137a_100%)] px-[28px]">
      <div className="grid h-11 w-11 place-items-center rounded-lg text-[#bb5cff]">
        <Sparkles size={28} />
      </div>
      <div>
        <h2 className="m-0 text-[14px] font-bold text-[#d183ff]">Can't find what you're looking for?</h2>
        <p className="m-0 mt-[6px] text-[11px] text-[#c9c8dd]">
          Request new categories or suggest subcategories for our community.
        </p>
      </div>
      <button className="ml-auto h-10 rounded-lg bg-gradient-to-b from-[#8751ff] to-[#6530e9] px-[23px] text-[13px] font-bold text-white shadow-[0_0_24px_rgba(112,61,255,0.34)] hover:brightness-110 transition-all">
        Suggest Category
      </button>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function CategoriesPage({ allPrompts = [] }: { allPrompts?: DetailedPrompt[] }) {
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const router = useRouter();

  function openAction(action: string) {
    setDrawerAction(action);
  }

  function handleSearch(q: string) {
    const target = q.trim() ? `/explore?q=${encodeURIComponent(q)}` : "/explore";
    router.push(target);
  }

  function navigateToCategory(slug: string, tag?: string) {
    const url = tag ? `/categories/${slug}?tags=${tag}` : `/categories/${slug}`;
    router.push(url);
  }

  function navigateToPrompt(slug: string) {
    router.push(`/prompt/${slug}`);
  }

  // Group allPrompts by mapped categories for each section
  const sectionData = useMemo(() => {
    return CATEGORY_REGISTRY.slice(0, 6).map((meta) => {
      const matched = allPrompts.filter((p) =>
        meta.mappedCategories.includes(p.taxonomy.primaryCategory)
      );
      return { meta, prompts: matched };
    });
  }, [allPrompts]);

  return (
    <MarketplaceLayout
      activeNav="Categories"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => handleSearch(query)}
      onAction={openAction}
    >
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-7 pt-3">
        <Hero onSearch={handleSearch} />
        <TopCategoryRail onNavigate={(slug) => navigateToCategory(slug)} />

        {sectionData.map(({ meta, prompts }) => (
          <CategorySection
            key={meta.slug}
            meta={meta}
            prompts={prompts}
            onNavigateCategory={navigateToCategory}
            onNavigatePrompt={navigateToPrompt}
          />
        ))}

        <SuggestCategory />
      </div>
      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}
