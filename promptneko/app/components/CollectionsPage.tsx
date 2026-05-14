"use client";

import {
  Bookmark,
  FolderOpen,
  Heart,
  LayoutGrid,
  Lock,
  Plus,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { optimizedThumbnailUrl } from "./image-utils";
import { MarketplaceLayout } from "./MarketplaceLayout";
import { DetailedPrompt } from "./marketplace-data";
import { usePromptInteractions } from "./usePromptInteractions";

type Collection = {
  id: string;
  title: string;
  description: string;
  author: string;
  promptCount: number;
  saves: number;
  isPublic: boolean;
  tags: string[];
  accent: string;
  coverPrompts: DetailedPrompt[];
  queryTerm: string;
};

type StoredCollection = {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  queryTerm: string;
};

const LOCAL_COLLECTION_KEY = "pn_user_collections";
const ACCENTS = ["#a463ff", "#ff9f7a", "#7affb0", "#ffef75", "#78c7ff", "#ff78c8", "#00d9a8"];

function readStoredCollections(): StoredCollection[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(LOCAL_COLLECTION_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is StoredCollection => (
      typeof item?.id === "string" &&
      typeof item?.title === "string" &&
      typeof item?.description === "string" &&
      typeof item?.isPublic === "boolean" &&
      typeof item?.queryTerm === "string"
    ));
  } catch {
    return [];
  }
}

function writeStoredCollections(collections: StoredCollection[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_COLLECTION_KEY, JSON.stringify(collections));
}

function buildCommunityCollections(prompts: DetailedPrompt[]): Collection[] {
  const byCategory = new Map<string, DetailedPrompt[]>();
  prompts.forEach((prompt) => {
    const category = prompt.taxonomy.primaryCategory || "Uncategorized";
    byCategory.set(category, [...(byCategory.get(category) ?? []), prompt]);
  });

  return Array.from(byCategory.entries())
    .map(([category, items], index) => {
      const sorted = [...items].sort((a, b) => (b.stats.views + b.stats.likes) - (a.stats.views + a.stats.likes));
      const topTags = Array.from(new Set(sorted.flatMap((prompt) => prompt.taxonomy.tags))).slice(0, 3);
      return {
        id: `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        title: `${category} Prompt System`,
        description: `${sorted.length} working prompts with copy-ready variables, compatibility notes, and example outputs.`,
        author: sorted[0]?.creator.handle ?? "@promptneko",
        promptCount: sorted.length,
        saves: sorted.reduce((sum, prompt) => sum + prompt.stats.saves, 0),
        isPublic: true,
        tags: topTags.length ? topTags : [category],
        accent: ACCENTS[index % ACCENTS.length],
        coverPrompts: sorted.slice(0, 4),
        queryTerm: category,
      };
    })
    .filter((collection) => collection.coverPrompts.length > 0)
    .sort((a, b) => b.promptCount - a.promptCount);
}

// ─── Collection Card ──────────────────────────────────────────────────────────

function CollectionCard({
  col,
  onOpen,
}: {
  col: Collection;
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
            style={{ backgroundImage: `url(${optimizedThumbnailUrl(p.assets[0]?.thumbnailUrl)})` }}
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

function CreateCollectionModal({
  onClose,
  onCreate,
  topics,
}: {
  onClose: () => void;
  onCreate: (collection: StoredCollection) => void;
  topics: string[];
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [queryTerm, setQueryTerm] = useState(topics[0] ?? "All");

  function submit() {
    if (!title.trim()) return;
    onCreate({
      id: `local-${Date.now()}`,
      title: title.trim(),
      description: desc.trim() || `A focused workspace collection for ${queryTerm} prompts.`,
      isPublic,
      queryTerm,
    });
  }

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

        <label className="block text-[11px] font-semibold text-[#8090b4] uppercase tracking-wide mb-2">Prompt Topic</label>
        <select
          className="w-full h-[40px] rounded-xl border border-[#1e2840] bg-[#060b18] text-white text-[13px] px-4 outline-none focus:border-[#7b3cff] transition-colors mb-4"
          value={queryTerm}
          onChange={(event) => setQueryTerm(event.target.value)}
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>

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
            onClick={submit}
          >
            Create Collection
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar({
  myCount,
  publicCount,
  savedCount,
  totalPrompts,
}: {
  myCount: number;
  publicCount: number;
  savedCount: number;
  totalPrompts: number;
}) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-7">
      {[
        { label: "My Collections", value: myCount.toString(), icon: FolderOpen, accent: "#a463ff" },
        { label: "Public Collections", value: publicCount.toString(), icon: Users, accent: "#78c7ff" },
        { label: "Saved Prompts", value: savedCount.toString(), icon: Bookmark, accent: "#ff78c8" },
        { label: "Prompt Templates", value: totalPrompts.toString(), icon: Sparkles, accent: "#ffef75" },
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

export function CollectionsPage({ allPrompts = [] }: { allPrompts?: DetailedPrompt[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [storedCollections, setStoredCollections] = useState<StoredCollection[]>(() => readStoredCollections());
  const { saved } = usePromptInteractions(allPrompts);

  useEffect(() => {
    setStoredCollections(readStoredCollections());
  }, []);

  const communityCollections = useMemo(() => buildCommunityCollections(allPrompts), [allPrompts]);
  const topics = useMemo(() => {
    const categories = Array.from(new Set(allPrompts.map((prompt) => prompt.taxonomy.primaryCategory).filter(Boolean)));
    return categories.length ? categories : ["All"];
  }, [allPrompts]);

  const savedPrompts = allPrompts.filter((prompt) => saved.has(prompt.id));
  const myCollections = useMemo<Collection[]>(() => {
    const createdCollections = storedCollections.map((collection, index) => {
      const matchingPrompts = allPrompts
        .filter((prompt) => {
          const haystack = `${prompt.title} ${prompt.description} ${prompt.taxonomy.primaryCategory} ${prompt.taxonomy.tags.join(" ")}`.toLowerCase();
          return collection.queryTerm === "All" || haystack.includes(collection.queryTerm.toLowerCase());
        })
        .slice(0, 4);

      return {
        id: collection.id,
        title: collection.title,
        description: collection.description,
        author: "@you",
        promptCount: matchingPrompts.length,
        saves: 0,
        isPublic: collection.isPublic,
        tags: [collection.queryTerm],
        accent: ACCENTS[index % ACCENTS.length],
        coverPrompts: matchingPrompts.length ? matchingPrompts : allPrompts.slice(0, 4),
        queryTerm: collection.queryTerm,
      };
    });

    if (savedPrompts.length === 0) return createdCollections;
    return [
      {
        id: "saved-prompts",
        title: "Saved Prompts",
        description: "Prompts saved from marketplace browsing and detail pages.",
        author: "@you",
        promptCount: savedPrompts.length,
        saves: savedPrompts.length,
        isPublic: false,
        tags: ["Saved"],
        accent: "#a463ff",
        coverPrompts: savedPrompts.slice(0, 4),
        queryTerm: "Saved",
      },
      ...createdCollections,
    ];
  }, [allPrompts, savedPrompts, storedCollections]);

  const filtered = communityCollections.filter(
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
        <StatsBar
          myCount={myCollections.length}
          publicCount={communityCollections.length}
          savedCount={saved.size}
          totalPrompts={allPrompts.length}
        />

        {/* My Collections */}
        {myCollections.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FolderOpen size={18} className="text-[#a463ff]" />
                <h2 className="m-0 text-[16px] font-bold text-white">My Collections</h2>
                <span className="text-[11px] text-[#4a5a80]">{myCollections.length} collection{myCollections.length === 1 ? "" : "s"}</span>
              </div>
              <button className="text-[12px] font-semibold text-[#a463ff] hover:text-white transition-colors">
                Manage →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {myCollections.map((col) => (
                <CollectionCard
                  key={col.id}
                  col={col}
                  onOpen={() => router.push(`/explore?q=${encodeURIComponent(col.queryTerm === "Saved" ? "" : col.queryTerm)}`)}
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
              <CollectionCard 
                key={col.id} 
                col={col} 
                onOpen={() => {
                  router.push(`/explore?category=${encodeURIComponent(col.queryTerm)}`);
                }} 
              />
            ))}
          </div>
        </div>
      </div>

      {showCreate && (
        <CreateCollectionModal
          onClose={() => setShowCreate(false)}
          topics={topics}
          onCreate={(collection) => {
            const next = [collection, ...storedCollections];
            setStoredCollections(next);
            writeStoredCollections(next);
            setShowCreate(false);
          }}
        />
      )}
      
    </MarketplaceLayout>
  );
}
