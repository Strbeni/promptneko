"use client";

import {
  Heart,
  ChevronRight,
  Copy,
  Check,
  Search,
  Grid2X2,
  Bookmark,
  Play,
  Share2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { ActionDrawer } from "./ActionDrawer";
import { MarketplaceLayout } from "./MarketplaceLayout";
import { DetailedPrompt, promptCards } from "./marketplace-data";
import { dbPromptsToDetailedPrompts } from "../../lib/adapters";
import { useAuth } from "./auth/AuthContext";

const LOCAL_KEY = "pn_static_interactions";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isDbPrompt(id: string) {
  return UUID_RE.test(id);
}

function readLocalLikes() {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? "{}");
    return Array.isArray(parsed.liked) ? parsed.liked as string[] : [];
  } catch {
    return [];
  }
}

function writeLocalLikes(next: string[]) {
  const parsed = JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? "{}");
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify({ ...parsed, liked: next }));
}

// ─── Liked Prompt Card ────────────────────────────────────────────────────────

function LikedCard({ item, onUnlike }: { item: DetailedPrompt; onUnlike: (id: string) => void }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const asset = item.assets[0];

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-[16px] bg-[#0c1120] border border-white/5 cursor-pointer transition-all hover:border-[#ff4f9d]/40 hover:-translate-y-0.5"
      onClick={() => router.push(`/prompt/${item.slug}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#090e1b]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${asset?.thumbnailUrl || "/main.png"})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {asset?.type === "video" && (
          <div className="absolute top-2 left-2 z-10 grid place-items-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white">
            <Play size={12} fill="currentColor" className="ml-0.5" />
          </div>
        )}

        {/* Unlike button */}
        <button
          className="absolute bottom-2 right-2 z-10 grid place-items-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-[#ff4f9d]/30 text-[#ff4f9d] transition-all hover:bg-[#ff4f9d]/20"
          onClick={(e) => { e.stopPropagation(); onUnlike(item.id); }}
          title="Unlike"
        >
          <Heart size={12} fill="currentColor" />
        </button>

        {/* Save button overlay */}
        <button
          className={`absolute top-2 right-2 z-10 grid place-items-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 ${saved ? "text-[#a463ff]" : "text-white/60 hover:text-white"}`}
          onClick={(e) => { e.stopPropagation(); setSaved((v) => !v); }}
        >
          <Bookmark size={12} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="m-0 text-[13px] font-semibold text-white truncate">{item.title}</h3>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#5060a0]">
            <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#ffc176] to-[#855cff] shrink-0" />
            <span className="truncate">{item.creator.handle}</span>
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button
            className="grid place-items-center w-7 h-7 rounded-lg bg-white/5 border border-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); /* share logic */ }}
          >
            <Share2 size={11} />
          </button>
          <button
            className="grid place-items-center w-7 h-7 rounded-lg bg-white/5 border border-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(item.promptToCopy || item.content.text);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function LikedPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [remotePrompts, setRemotePrompts] = useState<DetailedPrompt[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    setLikedIds(readLocalLikes());
  }, []);

  useEffect(() => {
    if (loading || !user) {
      setRemotePrompts([]);
      return;
    }

    const controller = new AbortController();
    fetch("/api/me/liked", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (payload?.prompts) {
          setRemotePrompts(dbPromptsToDetailedPrompts(payload.prompts));
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, [loading, user]);

  const allLikedPrompts = useMemo(() => {
    const staticPrompts = promptCards.filter((p) => likedIds.includes(p.id));
    const seen = new Set<string>();
    return [...remotePrompts, ...staticPrompts].filter((prompt) => {
      if (seen.has(prompt.id)) return false;
      seen.add(prompt.id);
      return true;
    });
  }, [likedIds, remotePrompts]);

  const categoryFilters = useMemo(() => [
    "All",
    ...Array.from(new Set(allLikedPrompts.map((p) => p.taxonomy.primaryCategory))).slice(0, 6),
  ], [allLikedPrompts]);

  const visible = useMemo(() => {
    return allLikedPrompts
      .filter((p) => activeCategory === "All" || p.taxonomy.primaryCategory === activeCategory)
      .filter((p) => !searchQ || p.title.toLowerCase().includes(searchQ.toLowerCase()));
  }, [allLikedPrompts, activeCategory, searchQ]);

  async function handleUnlike(id: string) {
    if (isDbPrompt(id)) {
      const res = await fetch(`/api/prompts/${id}/like`, { method: "POST" });
      if (res.ok) setRemotePrompts((prev) => prev.filter((prompt) => prompt.id !== id));
      return;
    }

    setLikedIds((prev) => {
      const next = prev.filter((pid) => pid !== id);
      writeLocalLikes(next);
      return next;
    });
  }

  return (
    <MarketplaceLayout
      activeNav="Liked"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => router.push(`/explore?q=${encodeURIComponent(query)}`)}
      onAction={(a) => setDrawerAction(a)}
    >
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-5 min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="m-0 text-[28px] font-extrabold text-white tracking-tight flex items-center gap-3">
              <Heart className="text-[#ff4f9d]" size={28} />
              Liked Prompts
            </h1>
            <p className="m-0 mt-1.5 text-[13px] text-[#6070a0]">
              {visible.length} prompt{visible.length !== 1 ? "s" : ""} you've shown love to.
            </p>
          </div>
          <button
            className="flex items-center gap-2 h-9 px-4 rounded-xl border border-[#1e2840] bg-transparent text-[#8090b4] text-[12px] hover:text-white hover:border-[#ff4f9d]/40 transition-all"
            onClick={() => router.push("/explore")}
          >
            Browse More
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-[30px] px-3 rounded-lg border text-[12px] font-semibold transition-all ${
                  activeCategory === cat
                    ? "border-[#ff4f9d] bg-[#ff4f9d]/15 text-[#ff7ebd]"
                    : "border-[#1e2840] bg-transparent text-[#6070a0] hover:text-white hover:border-[#5a2a4b]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="ml-auto flex items-center h-[34px] px-3 gap-2 border border-[#1e2840] rounded-xl bg-[#0b1020]">
            <Search size={14} className="text-[#4a5a80]" />
            <input
              className="bg-transparent border-0 outline-none text-white text-[12px] placeholder:text-[#4a5a80] w-[160px]"
              placeholder="Search liked prompts..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {visible.map((p) => (
              <LikedCard key={p.id} item={p} onUnlike={handleUnlike} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={48} className="text-[#1e2840] mb-5" />
            <h3 className="m-0 text-[16px] font-bold text-white mb-2">No liked prompts yet</h3>
            <p className="m-0 text-[13px] text-[#6070a0] mb-6 max-w-[300px]">
              Hit the heart icon on prompts you like, and they'll be saved here.
            </p>
            <button
              className="flex items-center gap-2 h-10 px-6 rounded-xl bg-[#1e2840] text-white text-[13px] font-semibold hover:bg-[#2a3854] transition-all"
              onClick={() => router.push("/explore")}
            >
              Start Exploring
            </button>
          </div>
        )}
      </div>
      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}
