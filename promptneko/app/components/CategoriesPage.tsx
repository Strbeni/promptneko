"use client";

import {
  Aperture, Brush, Camera, ChevronRight, Clapperboard, Code2,
  Droplets, Film, Grid2X2, Heart, ImageIcon, Music2,
  Palette, PenTool, Play, Search, Sparkles, WandSparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ActionDrawer } from "./ActionDrawer";
import { MarketplaceLayout } from "./MarketplaceLayout";

type FeaturedPrompt = {
  title: string;
  author: string;
  likes: string;
  tag: string;
  gradient: string;
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
  { title: "Art", count: "210K+ Prompts", icon: Brush, gradient: "from-indigo-400 to-purple-600" },
  { title: "Photography", count: "98K+ Prompts", icon: Camera, gradient: "from-amber-300 to-pink-500" },
  { title: "Video", count: "75K+ Prompts", icon: Clapperboard, gradient: "from-emerald-400 to-cyan-600" },
  { title: "Writing", count: "60K+ Prompts", icon: PenTool, gradient: "from-yellow-300 to-red-500" },
  { title: "Design", count: "45K+ Prompts", icon: Grid2X2, gradient: "from-fuchsia-400 to-violet-700" },
  { title: "Development", count: "38K+ Prompts", icon: Code2, gradient: "from-sky-400 to-indigo-600" },
];

const sections: CategorySectionData[] = [
  {
    title: "Art",
    icon: Palette,
    description: "Explore different art styles, mediums and aesthetics",
    accent: "var(--accent)",
    subcategories: [
      { label: "Anime", icon: Sparkles }, { label: "Western", icon: Aperture },
      { label: "Cartoon", icon: WandSparkles }, { label: "90s Anime", icon: Sparkles },
      { label: "Painting", icon: Brush }, { label: "Digital Art", icon: ImageIcon },
    ],
    prompts: [
      { title: "Sakura Temple Guardian", author: "@waifu.lab", likes: "2.3K", tag: "Anime", gradient: "from-pink-400 to-rose-600" },
      { title: "Cybernetic Warrior", author: "@pixel.muse", likes: "1.8K", tag: "Digital Art", gradient: "from-cyan-400 to-blue-600" },
      { title: "Starry Night Over Village", author: "@artmaster", likes: "1.6K", tag: "Oil Painting", gradient: "from-blue-600 to-indigo-900" },
      { title: "Coastal Lighthouse", author: "@brush.strokes", likes: "1.2K", tag: "Watercolor", gradient: "from-teal-400 to-emerald-600" },
      { title: "Floating Islands Concept", author: "@visionary.art", likes: "1.1K", tag: "Concept Art", gradient: "from-purple-400 to-indigo-600" },
    ],
  },
  {
    title: "Photography",
    icon: Camera,
    description: "Realistic photos, cinematic shots and more",
    accent: "var(--accent)",
    subcategories: [
      { label: "Portrait", icon: Camera }, { label: "Street", icon: Camera },
      { label: "Cinematic", icon: Film }, { label: "Fashion", icon: Sparkles },
      { label: "Nature", icon: Droplets }, { label: "Product", icon: Camera },
    ],
    prompts: [
      { title: "Neon Rainy Street", author: "@lena.craft", likes: "2.1K", tag: "Cinematic", gradient: "from-purple-600 to-blue-800" },
      { title: "Moody Studio Portrait", author: "@portraitist", likes: "1.7K", tag: "Portrait", gradient: "from-stone-600 to-stone-900" },
      { title: "Alpine Lake Morning", author: "@nature.vibes", likes: "1.5K", tag: "Nature", gradient: "from-blue-400 to-cyan-600" },
      { title: "Dew Drop Macro", author: "@macro.world", likes: "1.3K", tag: "Macro", gradient: "from-green-400 to-teal-600" },
      { title: "Vintage Car Film Look", author: "@film.captures", likes: "1.1K", tag: "Vintage", gradient: "from-orange-400 to-amber-700" },
    ],
  },
];

function Hero() {
  return (
    <section style={{
      position: "relative", height: 260, borderRadius: 16, overflow: "hidden", marginBottom: 12,
      background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.15, background: "radial-gradient(circle at 70% 30%, #7B3CFF, transparent 60%)" }} />
      <div style={{ relative: "z-10", padding: "40px 36px" }}>
        <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>Browse Categories</p>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "white", marginBottom: 12, letterSpacing: "-0.02em" }}>
          Discover <span style={{ color: "#A78BFA" }}>Creative Worlds</span>
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", marginBottom: 20, maxWidth: 400 }}>
          Navigate AI creativity through curated categories, aesthetics, and styles. Find exactly what you need.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            ["32", "Categories"], ["850+", "Subcategories"], ["650K+", "Prompts"],
          ].map(([v, l]) => (
            <div key={l}>
              <strong style={{ display: "block", fontSize: 18, color: "#A78BFA" }}>{v}</strong>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TopCategoryRail() {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10, marginBottom: 20 }}>
      {topCategories.map(({ title, count, icon: Icon, gradient }) => (
        <button key={title} style={{
          position: "relative", height: 110, borderRadius: 12, overflow: "hidden",
          background: "var(--surface)", border: "1px solid var(--border-soft)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
          transition: "all 0.15s",
        }}
        onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
        onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-soft)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
        >
          <div className={`bg-gradient-to-br ${gradient}`} style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "white", marginBottom: 4 }}>
            <Icon size={18} />
          </div>
          <strong style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{title}</strong>
          <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{count}</span>
        </button>
      ))}
    </section>
  );
}

function PromptTile({ prompt }: { prompt: FeaturedPrompt }) {
  return (
    <article style={{
      background: "var(--surface)", border: "1px solid var(--border-soft)", borderRadius: 12,
      overflow: "hidden", cursor: "pointer", transition: "all 0.2s",
    }}
    onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; }}
    onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
    >
      <div style={{ position: "relative", height: 120 }}>
        <div className={`w-full h-full bg-gradient-to-br ${prompt.gradient}`} />
        <span style={{ position: "absolute", top: 6, left: 6, padding: "2px 6px", borderRadius: 4, background: "rgba(0,0,0,0.5)", color: "white", fontSize: 9, fontWeight: 700 }}>
          {prompt.tag}
        </span>
        {prompt.video && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1A1A2E" }}>
              <Play size={12} fill="currentColor" />
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "8px 10px 10px" }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{prompt.title}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6, fontSize: 10, color: "var(--text-muted)" }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
          <span>{prompt.author}</span>
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 2 }}><Heart size={10} /> {prompt.likes}</span>
        </div>
      </div>
    </article>
  );
}

function CategorySection({ section }: { section: CategorySectionData }) {
  const Icon = section.icon;
  return (
    <section style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Icon size={20} style={{ color: "var(--accent)" }} />
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>{section.title}</h2>
        <p style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 4 }}>{section.description}</p>
        <button style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: "var(--accent)" }}>View all</button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }} className="custom-scrollbar">
        {section.subcategories.map(({ label, icon: SIcon }, i) => (
          <button key={label} style={{
            display: "flex", alignItems: "center", gap: 6, height: 30, padding: "0 12px", borderRadius: 8,
            background: i === 0 ? "var(--accent)" : "var(--surface)",
            color: i === 0 ? "white" : "var(--text-secondary)",
            border: i === 0 ? "0" : "1px solid var(--border-soft)",
            fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
          }}>
            <SIcon size={12} /> {label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
        {section.prompts.map((p) => (
          <PromptTile key={p.title} prompt={p} />
        ))}
      </div>
    </section>
  );
}

export function CategoriesPage() {
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);

  return (
    <MarketplaceLayout
      activeNav="Categories"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => setDrawerAction(query ? `Search: ${query}` : "Search")}
      onAction={setDrawerAction}
    >
      <div className="main-scroll" style={{ background: "var(--bg)" }}>
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-muted)", marginBottom: 12 }}>
          <span>Home</span> <ChevronRight size={12} /> <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Categories</span>
        </nav>
        <Hero />
        <TopCategoryRail />
        {sections.map((section) => (
          <CategorySection key={section.title} section={section} />
        ))}
      </div>
      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}
