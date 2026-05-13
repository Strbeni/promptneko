"use client";

import {
  Bookmark,
  ChevronRight,
  Copy,
  Check,
  FolderOpen,
  Heart,
  LayoutGrid,
  Lock,
  Play,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActionDrawer } from "./ActionDrawer";
import { MarketplaceLayout } from "./MarketplaceLayout";
import { promptCards, DetailedPrompt } from "./marketplace-data";

// ─── Static collection data (placeholder until auth + DB) ─────────────────────

const FEATURED_COLLECTIONS = [
  {
    id: "c1",
    title: "Cyberpunk Aesthetics",
    description: "Neon-lit cities, chrome warriors, and electric dreams.",
    author: "@cyber.blade",
    promptCount: 18,
    saves: 2400,
    isPublic: true,
    tags: ["Art", "Sci-Fi"],
    accent: "#a463ff",
    coverPrompts: promptCards.slice(0, 4),
  },
  {
    id: "c2",
    title: "Product Photography Mastery",
    description: "Studio-quality product shots for any brand or campaign.",
    author: "@ad.master",
    promptCount: 12,
    saves: 1800,
    isPublic: true,
    tags: ["Marketing", "Photography"],
    accent: "#ff9f7a",
    coverPrompts: promptCards.slice(4, 8),
  },
  {
    id: "c3",
    title: "Developer Toolkit",
    description: "Best coding prompts for Python, React, SQL and DevOps.",
    author: "@code.wizard",
    promptCount: 24,
    saves: 3100,
    isPublic: true,
    tags: ["Coding", "Productivity"],
    accent: "#7affb0",
    coverPrompts: promptCards.slice(8, 12),
  },
  {
    id: "c4",
    title: "Anime & Manga Worlds",
    description: "From slice-of-life to shonen — all your anime styles.",
    author: "@ghibli.fan",
    promptCount: 31,
    saves: 5200,
    isPublic: true,
    tags: ["Art", "Anime"],
    accent: "#ffef75",
    coverPrompts: promptCards.slice(0, 4),
  },
  {
    id: "c5",
    title: "Brand Identity Starter Pack",
    description: "Logos, colour palettes and typography prompts for new brands.",
    author: "@brandingpro",
    promptCount: 15,
    saves: 1400,
    isPublic: true,
    tags: ["Logos", "Marketing"],
    accent: "#78c7ff",
    coverPrompts: promptCards.slice(4, 8),
  },
  {
    id: "c6",
    title: "Social Media Viral Kit",
    description: "Reels, shorts and TikTok prompts that get views.",
    author: "@vfxmaster",
    promptCount: 20,
    saves: 4700,
    isPublic: true,
    tags: ["Social", "Video"],
    accent: "#ff78c8",
    coverPrompts: promptCards.slice(8, 12),
  },
];

const MY_COLLECTIONS = [
  {
    id: "mc1",
    title: "My Favourites",
    description: "Hand-picked prompts I use daily.",
    promptCount: 7,
    isPublic: false,
    accent: "#a463ff",
    coverPrompts: promptCards.slice(0, 4),
  },
];

// ─── Collection Card ──────────────────────────────────────────────────────────

function CollectionCard({
  col,
  onOpen,
}: {
  col: (typeof FEATURED_COLLECTIONS)[0];
  onOpen: (id: string) => void;
}) {
  const [saved, setSaved] = useState(false);
  const covers = col.coverPrompts.slice(0, 4);

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-[18px] bg-[#0c1120] border border-white/5 cursor-pointer transition-all hover:border-[#7b3cff]/40 hover:-translate-y-0.5"
      onClick={() => onOpen(col.id)}
    >
      {/* 2×2 thumbnail grid */}
      <div className="relative grid grid-cols-2 gap-[2px] aspect-[4/3] overflow-hidden">
        {covers.map((p, i) => (
          <div
            key={i}
            className="bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${p.assets[0]?.thumbnailUrl || "/main.png"})` }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        {/* Lock badge */}
        {!col.isPublic && (
          <span className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold border border-white/10">
            <Lock size={9} /> Private
          </span>
        )}
        {/* Save */}
        <button
          className={`absolute top-2 right-2 grid place-items-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 ${saved ? "text-[#a463ff]" : "text-white/60 hover:text-white"}`}
          onClick={(e) => { e.stopPropagation(); setSaved((v) => !v); }}
        >
          <Bookmark size={12} fill={saved ? "currentColor" : "none"} />
        </button>
        {/* Prompt count bubble */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-semibold border border-white/10">
          <LayoutGrid size={9} /> {col.promptCount} prompts
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <h3 className="m-0 text-[14px] font-bold text-white truncate">{col.title}</h3>
        <p className="m-0 mt-1 text-[11px] text-[#8090b4] line-clamp-2 leading-snug">{col.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-[#6070a0]">
            <span className="w-4 h-4 rounded-full bg-gradient-to-br from-[#ffc176] to-[#855cff]" />
            <span>{col.author}</span>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-[#6070a0]">
            <Heart size={10} className="text-[#ff4f9d]" /> {col.saves.toLocaleString()}
          </span>
        </div>
        {/* Tags */}
        <div className="flex gap-1.5 mt-2.5 flex-wrap">
          {col.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md text-[10px] font-semibold border"
              style={{ color: col.accent, borderColor: `${col.accent}28`, background: `${col.accent}10` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── Create Collection Modal ───────────────────────────────────────────────────

function CreateCollectionModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-[440px] rounded-2xl border border-[#1e2840] bg-[#0b1020] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="m-0 text-[18px] font-bold text-white mb-1">New Collection</h2>
        <p className="m-0 text-[12px] text-[#6070a0] mb-6">Curate your favourite prompts into a shareable collection.</p>

        <label className="block text-[11px] font-semibold text-[#8090b4] uppercase tracking-wide mb-2">Title</label>
        <input
          className="w-full h-[40px] rounded-xl border border-[#1e2840] bg-[#060b18] text-white text-[13px] px-4 outline-none focus:border-[#7b3cff] transition-colors mb-4 placeholder:text-[#3a4a6a]"
          placeholder="e.g. My Anime Picks"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block text-[11px] font-semibold text-[#8090b4] uppercase tracking-wide mb-2">Description</label>
        <textarea
          className="w-full h-[80px] rounded-xl border border-[#1e2840] bg-[#060b18] text-white text-[13px] px-4 py-3 outline-none focus:border-[#7b3cff] transition-colors mb-4 placeholder:text-[#3a4a6a] resize-none"
          placeholder="What's this collection about?"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="m-0 text-[13px] font-semibold text-white">Make Public</p>
            <p className="m-0 text-[11px] text-[#6070a0]">Others can discover and save this collection</p>
          </div>
          <button
            className={`relative w-12 h-6 rounded-full transition-all ${isPublic ? "bg-[#7b3cff]" : "bg-[#1e2840]"}`}
            onClick={() => setIsPublic((v) => !v)}
          >
            <span
              className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-all ${isPublic ? "left-[26px]" : "left-[3px]"}`}
            />
          </button>
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 h-10 rounded-xl border border-[#1e2840] bg-transparent text-[#8090b4] text-[13px] hover:text-white transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 h-10 rounded-xl bg-gradient-to-r from-[#7b3cff] to-[#6028d4] text-white text-[13px] font-semibold hover:brightness-110 transition-all disabled:opacity-40"
            disabled={!title.trim()}
            onClick={onClose}
          >
            Create Collection
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-7">
      {[
        { label: "My Collections", value: MY_COLLECTIONS.length.toString(), icon: FolderOpen, accent: "#a463ff" },
        { label: "Public Collections", value: FEATURED_COLLECTIONS.length.toString(), icon: Users, accent: "#78c7ff" },
        { label: "Total Prompts Saved", value: "34", icon: Bookmark, accent: "#ff78c8" },
        { label: "Community Collections", value: "12K+", icon: Sparkles, accent: "#ffef75" },
      ].map(({ label, value, icon: Icon, accent }) => (
        <div
          key={label}
          className="flex items-center gap-4 px-5 py-4 rounded-[16px] border border-white/5 bg-[#0c1120]"
        >
          <div
            className="grid place-items-center w-10 h-10 rounded-xl shrink-0"
            style={{ background: `${accent}15`, color: accent }}
          >
            <Icon size={18} />
          </div>
          <div>
            <strong className="block text-[20px] font-extrabold leading-none text-white">{value}</strong>
            <span className="mt-0.5 block text-[11px] text-[#6070a0]">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CollectionsPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState<"discover" | "mine">("discover");
  const [searchQ, setSearchQ] = useState("");

  const filtered = FEATURED_COLLECTIONS.filter(
    (c) =>
      !searchQ ||
      c.title.toLowerCase().includes(searchQ.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQ.toLowerCase()))
  );

  return (
    <MarketplaceLayout
      activeNav="Collections"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => router.push(`/explore?q=${encodeURIComponent(query)}`)}
      onAction={(a) => setDrawerAction(a)}
    >
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-5 min-h-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="m-0 text-[28px] font-extrabold text-white tracking-tight">Collections</h1>
            <p className="m-0 mt-1.5 text-[13px] text-[#6070a0]">Curated sets of prompts — discover community favourites or build your own.</p>
          </div>
          <button
            className="flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-[#7b3cff] to-[#6028d4] text-white text-[13px] font-semibold hover:brightness-110 transition-all shadow-[0_0_24px_rgba(123,60,255,0.3)]"
            onClick={() => setShowCreate(true)}
          >
            <Plus size={16} /> New Collection
          </button>
        </div>

        {/* Stats */}
        <StatsBar />

        {/* My Collections */}
        {MY_COLLECTIONS.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FolderOpen size={18} className="text-[#a463ff]" />
                <h2 className="m-0 text-[16px] font-bold text-white">My Collections</h2>
                <span className="text-[11px] text-[#4a5a80]">{MY_COLLECTIONS.length} collection</span>
              </div>
              <button className="text-[12px] font-semibold text-[#a463ff] hover:text-white transition-colors">
                Manage →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {MY_COLLECTIONS.map((col) => (
                <CollectionCard
                  key={col.id}
                  col={{ ...col, author: "@you", saves: 0, isPublic: false, tags: [] }}
                  onOpen={() => {}}
                />
              ))}
              {/* Create new placeholder */}
              <button
                className="flex flex-col items-center justify-center gap-3 rounded-[18px] border border-dashed border-[#1e2840] bg-transparent text-[#3a4a6a] hover:text-[#7b3cff] hover:border-[#7b3cff]/40 transition-all aspect-[4/3] cursor-pointer"
                onClick={() => setShowCreate(true)}
              >
                <Plus size={28} />
                <span className="text-[12px] font-semibold">New Collection</span>
              </button>
            </div>
          </div>
        )}

        {/* Discover */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-[#ffef75]" />
              <h2 className="m-0 text-[16px] font-bold text-white">Discover Collections</h2>
              <span className="text-[11px] text-[#4a5a80]">{filtered.length} collections</span>
            </div>
            {/* Search */}
            <div className="flex items-center h-[34px] px-3 gap-2 border border-[#1e2840] rounded-xl bg-[#0b1020] text-[12px]">
              <Search size={14} className="text-[#4a5a80]" />
              <input
                className="bg-transparent border-0 outline-none text-white placeholder:text-[#4a5a80] w-[180px]"
                placeholder="Search collections..."
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((col) => (
              <CollectionCard key={col.id} col={col} onOpen={() => {}} />
            ))}
          </div>
        </div>
      </div>

      {showCreate && <CreateCollectionModal onClose={() => setShowCreate(false)} />}
      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}
