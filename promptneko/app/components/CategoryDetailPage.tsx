"use client";

import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Flame,
  Gift,
  Grid2X2,
  Heart,
  LayersIcon,
  Play,
  Search,
  Sparkles,
  SlidersHorizontal,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { ActionDrawer } from "./ActionDrawer";
import { optimizedThumbnailUrl } from "./image-utils";
import { MarketplaceLayout } from "./MarketplaceLayout";
import { CategoryMeta, DetailedPrompt } from "./marketplace-data";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "featured" | "trending" | "free" | "best" | "all";

const TABS: { id: Tab; label: string; icon: typeof Sparkles }[] = [
  { id: "featured", label: "Featured", icon: Sparkles },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "free", label: "Free", icon: Gift },
  { id: "best", label: "Best Rated", icon: Star },
  { id: "all", label: "All Prompts", icon: Grid2X2 },
];

// ─── Mini PromptCard ──────────────────────────────────────────────────────────

function CategoryPromptCard({ item }: { item: DetailedPrompt }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const primaryAsset = item.assets[0];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.promptToCopy || item.content.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-[16px] bg-[#0d1120] border border-white/5 cursor-pointer transition-all hover:border-[#7b3cff]/50 hover:-translate-y-0.5"
      onClick={() => router.push(`/prompt/${item.slug}`)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#090e1b]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${optimizedThumbnailUrl(primaryAsset?.thumbnailUrl)})` }}
        />
        {/* Free badge */}
        {(!item.pricing || item.pricing.type === "free") && (
          <span className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#12382a]/90 text-[#2ee87a] text-[10px] font-bold border border-[#2ee87a]/20">
            <Gift size={9} /> FREE
          </span>
        )}
        {primaryAsset?.type === "video" && (
          <div className="absolute top-2 left-2 z-10 grid place-items-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white">
            <Play size={12} fill="currentColor" className="ml-0.5" />
          </div>
        )}
        {/* Actions */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className={`grid place-items-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/10 transition-colors ${saved ? "text-white" : "text-white/70 hover:text-white"}`}
            onClick={(e) => { e.stopPropagation(); setSaved((v) => !v); }}
          >
            <Bookmark size={12} fill={saved ? "currentColor" : "none"} />
          </button>
          <button
            className={`grid place-items-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/10 transition-colors ${liked ? "text-[#ff4f9d]" : "text-white/70 hover:text-[#ff4f9d]"}`}
            onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
          >
            <Heart size={12} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="m-0 text-white text-[13px] font-semibold truncate">{item.title}</h3>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#888]">
            <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#ffc176] to-[#855cff] shrink-0" />
            <span className="truncate">{item.creator.handle}</span>
            <span className="ml-auto flex items-center gap-1 shrink-0">
              <Heart size={10} className="text-[#ff4f9d]" /> {item.stats.likes.toLocaleString()}
            </span>
          </div>
        </div>
        <button
          className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-white/70 text-[11px] font-medium transition-colors hover:bg-white/10 hover:text-white"
          onClick={handleCopy}
        >
          {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
        </button>
      </div>
    </article>
  );
}

// ─── Featured Rail (horizontal scroll) ───────────────────────────────────────

function FeaturedRail({ prompts }: { prompts: DetailedPrompt[] }) {
  const router = useRouter();
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
        {prompts.map((p) => (
          <article
            key={p.id}
            className="group relative flex-shrink-0 w-[220px] h-[160px] overflow-hidden rounded-[14px] border border-white/5 cursor-pointer transition-all hover:border-[#7b3cff]/60 hover:-translate-y-0.5"
            onClick={() => router.push(`/prompt/${p.slug}`)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${optimizedThumbnailUrl(p.assets[0]?.thumbnailUrl)})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            {(!p.pricing || p.pricing.type === "free") && (
              <span className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#12382a]/90 text-[#2ee87a] text-[9px] font-bold border border-[#2ee87a]/20">
                <Gift size={8} /> FREE
              </span>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="m-0 text-white text-[12px] font-semibold truncate">{p.title}</p>
              <p className="m-0 mt-0.5 text-white/60 text-[10px] flex items-center gap-1">
                <Heart size={9} className="text-[#ff4f9d]" /> {p.stats.likes.toLocaleString()}
                <span className="ml-auto">{p.creator.handle}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function CategoryHero({
  meta,
  previewImages,
  onSearch,
}: {
  meta: CategoryMeta;
  previewImages: string[];
  onSearch: (q: string) => void;
}) {
  const [q, setQ] = useState("");
  // Take up to 6 images for the mosaic
  const mosaicImages = previewImages.slice(0, 6);

  return (
    <section
      className="relative overflow-hidden rounded-[20px] border px-10 py-11 mb-6"
      style={{
        borderColor: `${meta.accent}28`,
        background: `linear-gradient(135deg, #080d1a 0%, #0c1228 60%, ${meta.accent}0d 100%)`,
        boxShadow: `0 0 60px ${meta.accent}10`,
        minHeight: "280px",
      }}
    >
      {/* ── Mosaic image background ── */}
      {mosaicImages.length > 0 && (
        <div className="absolute inset-0 overflow-hidden rounded-[20px] pointer-events-none">
          {/* Right-side image strip */}
          <div className="absolute right-0 top-0 bottom-0 w-[55%] flex gap-[3px]">
            {/* Column 1 */}
            <div className="flex-1 flex flex-col gap-[3px]">
              {mosaicImages.slice(0, 3).map((src, i) => (
                <div
                  key={i}
                  className="flex-1 bg-cover bg-center"
                  style={{ backgroundImage: `url(${optimizedThumbnailUrl(src)})` }}
                />
              ))}
            </div>
            {/* Column 2 */}
            <div className="flex-1 flex flex-col gap-[3px]">
              {(mosaicImages.slice(3, 6).length > 0 ? mosaicImages.slice(3, 6) : mosaicImages.slice(0, 3)).map((src, i) => (
                <div
                  key={i}
                  className="flex-1 bg-cover bg-center"
                  style={{ backgroundImage: `url(${optimizedThumbnailUrl(src)})` }}
                />
              ))}
            </div>
          </div>
          {/* Gradient overlay — fades mosaic into the dark left side */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, #080d1a 28%, #080d1a 38%, rgba(8,13,26,0.88) 52%, rgba(8,13,26,0.55) 68%, rgba(8,13,26,0.2) 100%)`,
            }}
          />
          {/* Accent colour tint over the mosaic */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[55%]"
            style={{ background: `linear-gradient(135deg, transparent 30%, ${meta.accent}1a 100%)` }}
          />
          {/* Top / bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080d1a]/60 via-transparent to-transparent" />
          {/* Blur layer */}
          <div className="absolute right-0 top-0 bottom-0 w-[55%] backdrop-blur-[1px]" />
        </div>
      )}

      {/* ── Accent glow orb ── */}
      <div
        className="absolute right-[-40px] top-[-60px] w-[320px] h-[320px] rounded-full opacity-[0.08] blur-3xl pointer-events-none"
        style={{ background: meta.accent }}
      />

      {/* ── Content ── */}
      <div className="relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] text-[#8090b4] mb-5">
          <Link href="/" className="hover:text-white transition-colors no-underline text-inherit">Home</Link>
          <ChevronRight size={12} />
          <Link href="/categories" className="hover:text-white transition-colors no-underline text-inherit">Categories</Link>
          <ChevronRight size={12} />
          <span style={{ color: meta.accent }}>{meta.label}</span>
        </nav>

        <div className="flex items-start justify-between gap-8 max-w-[580px]">
          <div className="flex-1">
            <span
              className="inline-block mb-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] border"
              style={{ color: meta.accent, borderColor: `${meta.accent}30`, background: `${meta.accent}12` }}
            >
              {meta.promptCount} Prompts · Free Access
            </span>
            <h1 className="m-0 text-[40px] font-extrabold leading-[1.03] text-white mb-3 tracking-tight">
              {meta.label}
            </h1>
            <p className="m-0 text-[14px] leading-[1.65] text-[#8fa0c2] mb-6 max-w-[430px]">
              {meta.description}
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 mb-6">
              {[
                { label: "Prompts", value: meta.promptCount },
                { label: "Subcategories", value: `${meta.subcategories.length}` },
                { label: "Free Access", value: "100%" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <strong className="block text-[20px] font-extrabold leading-none" style={{ color: meta.accent }}>
                    {value}
                  </strong>
                  <span className="mt-0.5 block text-[10px] text-[#6070a0]">{label}</span>
                </div>
              ))}
            </div>

            {/* Search */}
            <form
              className="flex h-[44px] items-center gap-3 rounded-xl border border-[#2a3454] bg-[#060b18]/95 px-4 pr-[4px] max-w-[400px]"
              onSubmit={(e) => { e.preventDefault(); onSearch(q); }}
            >
              <Search size={16} className="text-[#5060a0] shrink-0" />
              <input
                className="flex-1 bg-transparent border-0 outline-none text-[13px] text-white placeholder:text-[#5060a0]"
                placeholder={`Search ${meta.label} prompts...`}
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button
                type="submit"
                className="h-[36px] px-5 rounded-lg text-white text-[12px] font-semibold transition-all hover:brightness-110"
                style={{ background: `linear-gradient(135deg, ${meta.accent} 0%, ${meta.accent}bb 100%)` }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Subcategory Pills ─────────────────────────────────────────────────────────

function SubcategoryPills({
  meta,
  activeTags,
  onTagToggle,
}: {
  meta: CategoryMeta;
  activeTags: Set<string>;
  onTagToggle: (tag: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap mb-5">
      <span className="text-[11px] text-[#8090b4] font-semibold uppercase tracking-wider mr-1">Subcategories</span>
      {meta.subcategories.map((sub) => {
        const tag = sub.tags[0] ?? sub.label.toLowerCase();
        const isActive = activeTags.has(tag);
        return (
          <button
            key={sub.label}
            onClick={() => onTagToggle(tag)}
            className={`flex items-center h-[30px] px-3 rounded-lg border text-[12px] font-semibold transition-all ${
              isActive
                ? "text-white border-opacity-50"
                : "border-[#1e2840] bg-[#0c1122] text-[#aab4cc] hover:border-[#3d2875] hover:text-white"
            }`}
            style={
              isActive
                ? {
                    borderColor: meta.accent,
                    background: `${meta.accent}18`,
                    color: meta.accent,
                    boxShadow: `0 0 14px ${meta.accent}20`,
                  }
                : {}
            }
          >
            {sub.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Filter Bar (All tab) ──────────────────────────────────────────────────────

const ALL_MODELS = [
  "All Models", "Midjourney", "FLUX", "Stable Diffusion", "DALL-E 3",
  "ChatGPT", "Claude", "Gemini", "Grok", "Leonardo Ai",
];
const ALL_PRICING = ["All Pricing", "Free", "Paid"];
const ALL_SORTS = ["Newest", "Most Liked", "Most Viewed", "Best Rated"];

function AllTabFilters({
  model,
  pricing,
  sort,
  searchQ,
  onModel,
  onPricing,
  onSort,
  onSearchQ,
}: {
  model: string;
  pricing: string;
  sort: string;
  searchQ: string;
  onModel: (v: string) => void;
  onPricing: (v: string) => void;
  onSort: (v: string) => void;
  onSearchQ: (v: string) => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function Dropdown({
    id,
    value,
    options,
    onChange,
  }: {
    id: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
  }) {
    const isOpen = openDropdown === id;
    return (
      <div className="relative">
        <button
          className={`flex items-center justify-between gap-2 h-[37px] px-3 border rounded-xl text-[12px] text-[#c5ccdd] transition-all min-w-[130px] ${
            isOpen ? "border-[#7b3cff] bg-[#12102a]" : "border-[#1d2545] bg-[#0c1122] hover:border-[#3d2875]"
          }`}
          onClick={() => setOpenDropdown(isOpen ? null : id)}
        >
          {value}
          <ChevronRight size={13} className={`transition-transform ${isOpen ? "rotate-90" : "rotate-0"}`} />
        </button>
        {isOpen && (
          <div className="absolute top-full mt-1 left-0 z-50 min-w-[170px] rounded-xl border border-[#1d2545] bg-[#0c1122] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt}
                className={`w-full text-left px-4 py-2 text-[12px] transition-colors ${
                  value === opt ? "bg-[#1a1040] text-[#a463ff]" : "text-[#c5ccdd] hover:bg-white/5"
                }`}
                onClick={() => { onChange(opt); setOpenDropdown(null); }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 mb-5 flex-wrap">
      <form
        className="flex items-center h-[37px] px-3 gap-2 border border-[#1d2545] rounded-xl bg-[#0c1122] text-[#c5ccdd] text-[12px] min-w-[200px]"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search size={15} className="text-[#6070a0] shrink-0" />
        <input
          className="flex-1 bg-transparent border-0 outline-none text-white placeholder:text-[#6070a0] text-[12px]"
          placeholder="Filter prompts..."
          value={searchQ}
          onChange={(e) => onSearchQ(e.target.value)}
        />
      </form>
      <Dropdown id="model" value={model} options={ALL_MODELS} onChange={onModel} />
      <Dropdown id="pricing" value={pricing} options={ALL_PRICING} onChange={onPricing} />
      <Dropdown id="sort" value={sort} options={ALL_SORTS} onChange={onSort} />
      <button className="flex items-center justify-center h-[37px] gap-2 border border-[#3d2875] rounded-xl bg-[#0c1122] text-[#c5ccdd] text-[12px] px-3 hover:bg-[#1a1040] transition-all">
        <SlidersHorizontal size={14} />
        Filters
      </button>
    </div>
  );
}

// ─── Tab Prompt Grid ──────────────────────────────────────────────────────────

function PromptGrid({ prompts }: { prompts: DetailedPrompt[] }) {
  if (prompts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <LayersIcon size={48} className="text-[#2a3254] mb-4" />
        <p className="text-[#6070a0] text-[14px]">No prompts found in this section yet.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {prompts.map((p) => (
        <CategoryPromptCard key={p.id} item={p} />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Props = {
  meta: CategoryMeta;
  featured: DetailedPrompt[];
  trending: DetailedPrompt[];
  free: DetailedPrompt[];
  best: DetailedPrompt[];
  all: DetailedPrompt[];
};

function CategoryDetailPageInner({
  meta,
  featured,
  trending,
  free,
  best,
  all,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("featured");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  // "All" tab filters
  const [allModel, setAllModel] = useState("All Models");
  const [allPricing, setAllPricing] = useState("All Pricing");
  const [allSort, setAllSort] = useState("Newest");
  const [allSearch, setAllSearch] = useState("");

  function handleSearch(q: string) {
    router.push(`/explore?q=${encodeURIComponent(q)}&category=${encodeURIComponent(meta.label)}`);
  }

  function toggleTag(tag: string) {
    const next = new Set(activeTags);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    setActiveTags(next);
  }

  // Filtered "All" prompts
  const filteredAll = useMemo(() => {
    let pool = [...all];
    if (allSearch.trim()) {
      const needle = allSearch.trim().toLowerCase();
      pool = pool.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          p.taxonomy.tags.some((t) => t.toLowerCase().includes(needle))
      );
    }
    if (allModel !== "All Models") {
      pool = pool.filter((p) => p.engine.provider.toLowerCase().includes(allModel.toLowerCase()));
    }
    if (allPricing === "Free") {
      pool = pool.filter((p) => !p.pricing || p.pricing.type === "free" || p.pricing.priceCents === 0);
    } else if (allPricing === "Paid") {
      pool = pool.filter((p) => p.pricing && p.pricing.priceCents > 0);
    }
    if (activeTags.size > 0) {
      pool = pool.filter((p) =>
        p.taxonomy.tags.some((t) => activeTags.has(t))
      );
    }
    if (allSort === "Most Liked") pool = [...pool].sort((a, b) => b.stats.likes - a.stats.likes);
    else if (allSort === "Most Viewed") pool = [...pool].sort((a, b) => b.stats.views - a.stats.views);
    return pool;
  }, [all, allSearch, allModel, allPricing, activeTags, allSort]);

  const tabData: Record<Tab, DetailedPrompt[]> = {
    featured,
    trending,
    free,
    best,
    all: filteredAll,
  };

  const tabIconMap: Record<Tab, typeof Sparkles> = {
    featured: Sparkles,
    trending: Flame,
    free: Gift,
    best: Star,
    all: Grid2X2,
  };

  return (
    <MarketplaceLayout
      activeNav="Categories"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => handleSearch(query)}
      onAction={(action) => setDrawerAction(action)}
    >
      <div className="flex-1 overflow-y-auto px-5 pb-8 pt-4 min-h-0">
        {/* Hero */}
        <CategoryHero
          meta={meta}
          previewImages={[...featured, ...all].map((p) => p.assets[0]?.thumbnailUrl).filter(Boolean) as string[]}
          onSearch={handleSearch}
        />

        {/* Subcategory pills */}
        <SubcategoryPills meta={meta} activeTags={activeTags} onTagToggle={toggleTag} />

        {/* Tab navigation */}
        <div className="flex items-center gap-1 mb-6 p-1 rounded-xl bg-[#080d1a] border border-[#141c32] w-fit">
          {TABS.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 h-[34px] px-4 rounded-lg text-[13px] font-semibold transition-all ${
                  isActive
                    ? "text-white"
                    : "text-[#6070a0] hover:text-[#a0aac2]"
                }`}
                style={
                  isActive
                    ? {
                        background: `linear-gradient(135deg, ${meta.accent}28 0%, ${meta.accent}10 100%)`,
                        color: meta.accent,
                        boxShadow: `0 0 16px ${meta.accent}18`,
                        border: `1px solid ${meta.accent}28`,
                      }
                    : {}
                }
              >
                <Icon size={14} />
                {label}
              </button>
            );
          })}
        </div>

        {/* All tab filters */}
        {activeTab === "all" && (
          <AllTabFilters
            model={allModel}
            pricing={allPricing}
            sort={allSort}
            searchQ={allSearch}
            onModel={setAllModel}
            onPricing={setAllPricing}
            onSort={setAllSort}
            onSearchQ={setAllSearch}
          />
        )}

        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {(() => {
              const Tab = TABS.find((t) => t.id === activeTab)!;
              const Icon = tabIconMap[activeTab];
              return (
                <>
                  <Icon size={18} style={{ color: meta.accent }} />
                  <h2 className="m-0 text-[18px] font-bold text-white">{Tab.label}</h2>
                  <span className="text-[11px] text-[#6070a0]">
                    {tabData[activeTab].length} prompts
                  </span>
                </>
              );
            })()}
          </div>
          {activeTab !== "all" && (
            <button
              className="text-[12px] font-semibold px-3 py-1 rounded-lg border border-[#2a1d57] bg-[#0f1024] transition-colors hover:bg-[#1a1040]"
              style={{ color: meta.accent }}
              onClick={() => setActiveTab("all")}
            >
              View all →
            </button>
          )}
        </div>

        {/* Featured uses horizontal rail, others use grid */}
        {activeTab === "featured" ? (
          <FeaturedRail prompts={tabData.featured} />
        ) : (
          <PromptGrid prompts={tabData[activeTab]} />
        )}

        {/* Pagination for "all" tab */}
        {activeTab === "all" && filteredAll.length > 0 && (
          <footer className="flex items-center justify-center gap-2 mt-8 h-[52px] border border-[#151d37] rounded-[8px] bg-[#090e1b]">
            <button className="grid place-items-center w-8 h-8 border border-[#1a2340] rounded-lg bg-[#0e1427] text-[#a5aec7] hover:text-white transition-colors">
              <ChevronLeft size={16} />
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`grid place-items-center w-8 h-8 rounded-lg text-[12px] border transition-colors ${
                  page === 1
                    ? "border-[#7332f3] bg-[#682ee2] text-white"
                    : "border-[#1a2340] bg-[#0e1427] text-[#a5aec7] hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="grid place-items-center w-8 h-8 border border-[#1a2340] rounded-lg bg-[#0e1427] text-[#a5aec7] hover:text-white transition-colors">
              <ChevronRight size={16} />
            </button>
          </footer>
        )}
      </div>

      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}

export function CategoryDetailPage(props: Props) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Loading category...</div>}>
      <CategoryDetailPageInner {...props} />
    </Suspense>
  );
}
