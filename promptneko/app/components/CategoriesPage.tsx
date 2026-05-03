"use client";

import {
  Aperture,
  Brush,
  Camera,
  ChevronRight,
  Clapperboard,
  Code2,
  Droplets,
  Film,
  Grid2X2,
  Heart,
  ImageIcon,
  Link,
  Music2,
  Palette,
  PenTool,
  Play,
  Search,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ActionDrawer } from "./ActionDrawer";
import { MarketplaceLayout } from "./MarketplaceLayout";

type FeaturedPrompt = {
  title: string;
  author: string;
  likes: string;
  tag: string;
  crop: string;
  video?: boolean;
};

type CategorySectionData = {
  title: string;
  icon: typeof Palette;
  description: string;
  accent: string;
  subcategories: { label: string; icon: typeof Sparkles }[];
  prompts: FeaturedPrompt[];
};

const topCategories = [
  { title: "Art", count: "210K+ Prompts", icon: Brush, crop: "bg-[-275px_-592px]" },
  { title: "Photography", count: "98K+ Prompts", icon: Camera, crop: "bg-[-475px_-592px]" },
  { title: "Video", count: "75K+ Prompts", icon: Clapperboard, crop: "bg-[-675px_-592px]" },
  { title: "Writing", count: "60K+ Prompts", icon: PenTool, crop: "bg-[-875px_-592px]" },
  { title: "Design", count: "45K+ Prompts", icon: Grid2X2, crop: "bg-[-1075px_-592px]" },
  { title: "Development", count: "38K+ Prompts", icon: Code2, crop: "bg-[-1275px_-592px]" },
];

const sections: CategorySectionData[] = [
  {
    title: "Art",
    icon: Palette,
    description: "Explore different art styles, mediums and aesthetics",
    accent: "text-[#ffef75]",
    subcategories: [
      { label: "Anime", icon: Sparkles },
      { label: "Western", icon: Aperture },
      { label: "Cartoon", icon: WandSparkles },
      { label: "90s Anime", icon: Sparkles },
      { label: "Painting", icon: Brush },
      { label: "Oil Painting", icon: Droplets },
      { label: "Watercolor", icon: Droplets },
      { label: "Digital Art", icon: ImageIcon },
      { label: "Pixel Art", icon: Grid2X2 },
    ],
    prompts: [
      { title: "Sakura Temple Guardian", author: "@waifu.lab", likes: "2.3K", tag: "Anime", crop: "bg-[-275px_-991px]" },
      { title: "Cybernetic Warrior", author: "@pixel.muse", likes: "1.8K", tag: "Digital Art", crop: "bg-[-510px_-991px]" },
      { title: "Starry Night Over Village", author: "@artmaster", likes: "1.6K", tag: "Oil Painting", crop: "bg-[-745px_-991px]" },
      { title: "Coastal Lighthouse", author: "@brush.strokes", likes: "1.2K", tag: "Watercolor", crop: "bg-[-982px_-991px]" },
      { title: "Floating Islands Concept", author: "@visionary.art", likes: "1.1K", tag: "Concept Art", crop: "bg-[-1220px_-991px]" },
    ],
  },
  {
    title: "Photography",
    icon: Camera,
    description: "Realistic photos, cinematic shots and more",
    accent: "text-[#78a7ff]",
    subcategories: [
      { label: "Portrait", icon: Camera },
      { label: "Street", icon: Camera },
      { label: "Cinematic", icon: Film },
      { label: "Fashion", icon: Sparkles },
      { label: "Nature", icon: Droplets },
      { label: "Macro", icon: Aperture },
      { label: "Wildlife", icon: Aperture },
      { label: "Product", icon: Camera },
      { label: "Studio", icon: Camera },
      { label: "Film Look", icon: Film },
    ],
    prompts: [
      { title: "Neon Rainy Street", author: "@lena.craft", likes: "2.1K", tag: "Cinematic", crop: "bg-[-275px_-1481px]" },
      { title: "Moody Studio Portrait", author: "@portraitist", likes: "1.7K", tag: "Portrait", crop: "bg-[-510px_-1481px]" },
      { title: "Alpine Lake Morning", author: "@nature.vibes", likes: "1.5K", tag: "Nature", crop: "bg-[-745px_-1481px]" },
      { title: "Dew Drop Macro", author: "@macro.world", likes: "1.3K", tag: "Macro", crop: "bg-[-982px_-1481px]" },
      { title: "Vintage Car Film Look", author: "@film.captures", likes: "1.1K", tag: "Vintage", crop: "bg-[-1220px_-1481px]" },
    ],
  },
  {
    title: "Video",
    icon: Clapperboard,
    description: "Cinematic videos, edits, vfx and more",
    accent: "text-[#84a7ff]",
    subcategories: [
      { label: "Cinematic", icon: Film },
      { label: "Anime Edit", icon: Film },
      { label: "TikTok", icon: Film },
      { label: "Music Video", icon: Music2 },
      { label: "Commercial", icon: Clapperboard },
      { label: "VFX", icon: Aperture },
      { label: "Motion Graphics", icon: Grid2X2 },
      { label: "Short Film", icon: Film },
      { label: "3D Animation", icon: Grid2X2 },
    ],
    prompts: [
      { title: "Space Walk Cinematic", author: "@astro.visuals", likes: "1.9K", tag: "Cinematic", crop: "bg-[-275px_-1970px]", video: true },
      { title: "Demon Slayer Edit", author: "@anime.edits", likes: "1.6K", tag: "Anime Edit", crop: "bg-[-510px_-1970px]", video: true },
      { title: "Portal Opening VFX", author: "@vfx.create", likes: "1.4K", tag: "VFX", crop: "bg-[-745px_-1970px]", video: true },
      { title: "Neon Logo Animation", author: "@motion.lab", likes: "1.2K", tag: "Motion Graphics", crop: "bg-[-982px_-1970px]", video: true },
      { title: "Noir Short Film", author: "@film.makers", likes: "1.1K", tag: "Short Film", crop: "bg-[-1220px_-1970px]", video: true },
    ],
  },
];

function CategoriesAsset({ className, crop }: { className?: string; crop?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block bg-[url('/categories.png')] bg-no-repeat bg-[length:1536px_2304px] ${crop ?? ""} ${className ?? ""}`}
    />
  );
}

function Hero() {
  return (
    <section className="relative mt-0 h-[344px] overflow-hidden rounded-[20px] border border-[#9b42ff] bg-[#110c24] shadow-[0_0_34px_rgba(119,45,255,0.12)]">
      <CategoriesAsset className="absolute inset-0 opacity-95" crop="bg-[-264px_-128px]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,18,0.96)_0%,rgba(7,8,18,0.78)_37%,rgba(7,8,18,0.12)_74%)]" />
      <div className="relative z-10 w-[480px] px-9 py-[43px]">
        <p className="mb-[13px] text-[10px] font-semibold uppercase text-[#d9dcef]">Browse Categories</p>
        <h1 className="m-0 text-[39px] font-extrabold leading-[1.04] text-white">
          Discover <span className="text-[#a463ff]">Creative Worlds</span>
        </h1>
        <p className="mt-[15px] mb-[21px] text-[15px] leading-[1.5] text-[#c9cee0]">
          Navigate AI creativity through curated categories, aesthetics, and styles.
        </p>
        <form className="flex h-[44px] w-[450px] items-center gap-3 rounded-lg border border-[#30395e] bg-[#0b1123]/90 px-[14px] pr-[3px]">
          <input
            className="min-w-0 flex-1 border-0 bg-transparent text-[13px] text-white outline-none placeholder:text-[#929ab3]"
            placeholder="Search categories or subcategories..."
          />
          <button className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-b from-[#843fff] to-[#642ee6] text-white">
            <Search size={18} />
          </button>
        </form>
        <div className="mt-[27px] grid w-[410px] grid-cols-4 gap-7">
          {[
            ["32", "Categories"],
            ["850+", "Subcategories"],
            ["650K+", "Prompts"],
            ["1.2M+", "Creators"],
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

function TopCategoryRail() {
  return (
    <section className="relative mt-3 rounded-[14px] border border-[#17203a] bg-[#080d1a]/78 px-[17px] py-[13px]">
      <div className="grid grid-cols-6 gap-[18px] pr-8">
        {topCategories.map(({ title, count, icon: Icon, crop }) => (
          <button
            className="group relative h-[126px] overflow-hidden rounded-lg border border-[#273056] bg-[#090f1f] text-center transition hover:border-[#7b3cff]"
            key={title}
          >
            <CategoriesAsset className={`absolute inset-0 opacity-55 transition group-hover:opacity-80 ${crop}`} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,15,0.12),rgba(4,7,15,0.83))]" />
            <div className="relative z-10 grid h-full place-items-center content-center">
              <Icon className="mb-[13px] text-[#b267ff] drop-shadow-[0_0_14px_rgba(178,103,255,0.8)]" size={38} strokeWidth={1.9} />
              <strong className="text-[15px] text-white">{title}</strong>
              <span className="mt-[6px] text-[11px] text-white">{count}</span>
            </div>
          </button>
        ))}
      </div>
      <button aria-label="Next categories" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#12182a]/90 text-[#dfe5f8]">
        <ChevronRight size={22} />
      </button>
    </section>
  );
}

function SubcategoryPills({ items, accent }: { items: CategorySectionData["subcategories"]; accent: string }) {
  return (
    <div className="flex items-center gap-[13px] overflow-hidden">
      {items.map(({ label, icon: Icon }, index) => (
        <button
          className={`flex h-[34px] shrink-0 items-center gap-[7px] rounded-lg border px-[14px] text-[12px] font-semibold ${
            index === 0
              ? "border-[#8a38ff] bg-[#301158] text-white shadow-[0_0_18px_rgba(138,56,255,0.25)]"
              : "border-[#252d4b] bg-[#0d1223] text-white"
          }`}
          key={label}
        >
          <Icon className={index === 0 ? "text-[#ff4df4]" : accent} size={14} />
          {label}
        </button>
      ))}
      <button aria-label="More subcategories" className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#12182a] text-[#dfe5f8]">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

function PromptTile({ prompt }: { prompt: FeaturedPrompt }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-[#263050] bg-[#080d19] transition hover:-translate-y-0.5 hover:border-[#7332f3]">
      <div className="relative h-[184px] overflow-hidden">
        <CategoriesAsset className={`h-full w-full transition duration-300 group-hover:scale-105 ${prompt.crop}`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_36%,rgba(2,4,10,0.88)_100%)]" />
        <span className="absolute left-[10px] top-[10px] rounded-md bg-[#1b2031]/86 px-[8px] py-[4px] text-[10px] font-bold text-white">
          {prompt.tag}
        </span>
        {prompt.video ? (
          <>
            <span className="absolute right-[10px] top-[10px] rounded-md bg-black/50 px-[7px] py-[3px] text-[10px] text-white">00:10</span>
            <button aria-label={`Play ${prompt.title}`} className="absolute inset-0 m-auto grid h-10 w-10 place-items-center rounded-full bg-white/88 text-[#0b1020]">
              <Play size={18} fill="currentColor" />
            </button>
          </>
        ) : null}
      </div>
      <div className="px-[10px] py-[9px]">
        <h3 className="truncate text-[13px] font-bold text-white">{prompt.title}</h3>
        <div className="mt-[9px] flex items-center gap-[6px] text-[10px] text-[#aeb5ca]">
          <span className="h-[13px] w-[13px] rounded-full bg-gradient-to-br from-[#ffc176] to-[#855cff]" />
          <span className="truncate">{prompt.author}</span>
          <span className="ml-auto flex items-center gap-1">
            <Heart size={12} /> {prompt.likes}
          </span>
        </div>
      </div>
    </article>
  );
}

function CategorySection({ section }: { section: CategorySectionData }) {
  const Icon = section.icon;

  return (
    <section className="relative mt-4 rounded-[14px] border border-[#17203a] bg-[#080d1a]/66 px-[18px] py-[16px]">
      <header className="mb-[15px] flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          <Icon className={section.accent} size={25} />
          <h2 className="m-0 text-[22px] font-bold leading-none text-white">{section.title}</h2>
          <p className="m-0 text-[11px] text-[#9ca4be]">{section.description}</p>
        </div>
        <button className="h-[31px] rounded-lg border border-[#2b1d57] bg-[#0f1024] px-[14px] text-[12px] text-[#a463ff]">View all</button>
      </header>

      <h3 className="mb-[12px] text-[13px] font-bold text-[#fff083]">Popular Subcategories</h3>
      <SubcategoryPills items={section.subcategories} accent={section.accent} />

      <h3 className="mb-[12px] mt-[17px] text-[13px] font-bold text-white flex justify-between">Featured Prompts <a href={`/categories/${section.title}`}>View all </a></h3>
      <div className="grid grid-cols-5 gap-[17px]">
        {section.prompts.map((prompt) => (
          <PromptTile key={prompt.title} prompt={prompt} />
        ))}
      </div>
      <button aria-label={`Next ${section.title} prompts`} className="absolute right-3 top-[58%] grid h-10 w-10 place-items-center rounded-full bg-[#12182a]/95 text-[#dfe5f8]">
        <ChevronRight size={21} />
      </button>
    </section>
  );
}

function SuggestCategory() {
  return (
    <section className="mt-6 flex h-[86px] items-center gap-[20px] rounded-xl border border-[#2a1d56] bg-[linear-gradient(90deg,#14102a_0%,#201147_55%,#32137a_100%)] px-[28px]">
      <div className="grid h-11 w-11 place-items-center rounded-lg text-[#bb5cff]">
        <Camera size={36} />
      </div>
      <div>
        <h2 className="m-0 text-[14px] font-bold text-[#d183ff]">Can't find what you're looking for?</h2>
        <p className="m-0 mt-[6px] text-[11px] text-[#c9c8dd]">Request new categories or suggest subcategories for our community.</p>
      </div>
      <button className="ml-auto h-10 rounded-lg bg-gradient-to-b from-[#8751ff] to-[#6530e9] px-[23px] text-[13px] font-bold text-white shadow-[0_0_24px_rgba(112,61,255,0.34)]">
        Suggest Category
      </button>
    </section>
  );
}

export function CategoriesPage() {
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const content = useMemo(() => sections, []);

  function openAction(action: string) {
    setDrawerAction(action);
  }

  return (
    <MarketplaceLayout
      activeNav="Categories"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => openAction(query ? `Search: ${query}` : "Search")}
      onAction={openAction}
    >
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-7 pt-3">
        <nav className="mb-[13px] flex items-center gap-[10px] text-[12px] text-[#aeb5ca]">
          <span>Home</span>
          <ChevronRight size={14} />
          <span className="text-white">Categories</span>
        </nav>
        <Hero />
        <TopCategoryRail />
        {content.map((section) => (
          <CategorySection key={section.title} section={section} />
        ))}
        <SuggestCategory />
      </div>
      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}
