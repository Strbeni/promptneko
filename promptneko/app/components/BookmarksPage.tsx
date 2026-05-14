"use client";

import {
  Bookmark,
  BookmarkX,
  Check,
  Copy,
  Heart,
  Play,
  Plus,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

import { optimizedThumbnailUrl } from "./image-utils";
import { MarketplaceLayout } from "./MarketplaceLayout";
import { DetailedPrompt, promptCards } from "./marketplace-data";
import { dbPromptsToDetailedPrompts } from "../../lib/adapters";
import { useAuth } from "./auth/AuthContext";
import { getCachedJson, invalidateCachedJson } from "./client-request-cache";

const LOCAL_KEY = "pn_static_interactions";
const BOOKMARKS_CACHE_MS = 30_000;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type PromptListPayload = {
  prompts?: Parameters<typeof dbPromptsToDetailedPrompts>[0];
};

function isDbPrompt(id: string) {
  return UUID_RE.test(id);
}

function readLocalBookmarks() {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? "{}");
    return Array.isArray(parsed.saved) ? (parsed.saved as string[]) : [];
  } catch {
    return [];
  }
}

function writeLocalBookmarks(next: string[]) {
  let parsed = {};
  try {
    parsed = JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? "{}");
  } catch {}
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify({ ...parsed, saved: next }));
}

// ─── Bookmark Card ────────────────────────────────────────────────────────────

function BookmarkCard({ item, onRemove }: { item: DetailedPrompt; onRemove: (id: string) => void }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const asset = item.assets[0];

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-[16px] bg-[#0c1120] border border-white/5 cursor-pointer transition-all hover:border-[#7b3cff]/40 hover:-translate-y-0.5"
      onClick={() => router.push(`/prompt/${item.slug}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#090e1b]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${optimizedThumbnailUrl(asset?.thumbnailUrl)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {asset?.type === "video" && (
          <div className="absolute top-2 left-2 z-10 grid place-items-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white">
            <Play size={12} fill="currentColor" className="ml-0.5" />
          </div>
        )}

        {/* Remove bookmark */}
        <button
          className="absolute top-2 right-2 z-10 grid place-items-center w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#a463ff] opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 hover:text-red-400 hover:border-red-400/20"
          onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
          title="Remove bookmark"
        >
          <BookmarkX size={12} />
        </button>

        {/* Like */}
        <button
          className={`absolute bottom-2 right-2 z-10 grid place-items-center w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 ${liked ? "text-[#ff4f9d]" : "text-white/60 hover:text-[#ff4f9d]"}`}
          onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
        >
          <Heart size={12} fill={liked ? "currentColor" : "none"} />
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
        <button
          className="shrink-0 grid place-items-center w-7 h-7 rounded-lg bg-white/5 border border-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
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
    </article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function BookmarksPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(() => readLocalBookmarks());
  const [remotePrompts, setRemotePrompts] = useState<DetailedPrompt[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    if (loading || !user) return;

    let cancelled = false;
    getCachedJson<PromptListPayload>("/api/me/saved", BOOKMARKS_CACHE_MS)
      .then((payload) => {
        if (!cancelled && payload?.prompts) {
          setRemotePrompts(dbPromptsToDetailedPrompts(payload.prompts));
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [loading, user]);

  const allBookmarkedPrompts = useMemo(() => {
    const staticPrompts = promptCards.filter((p) => bookmarks.includes(p.id));
    const seen = new Set<string>();
    return [...remotePrompts, ...staticPrompts].filter((prompt) => {
      if (seen.has(prompt.id)) return false;
      seen.add(prompt.id);
      return true;
    });
  }, [bookmarks, remotePrompts]);

  const categoryFilters = useMemo(() => [
    "All",
    ...Array.from(new Set(allBookmarkedPrompts.map((p) => p.taxonomy.primaryCategory))).slice(0, 6),
  ], [allBookmarkedPrompts]);

  const visible = useMemo(() => {
    return allBookmarkedPrompts
      .filter((p) => activeCategory === "All" || p.taxonomy.primaryCategory === activeCategory)
      .filter((p) => !searchQ || p.title.toLowerCase().includes(searchQ.toLowerCase()));
  }, [allBookmarkedPrompts, activeCategory, searchQ]);

  async function removeBookmark(id: string) {
    if (isDbPrompt(id)) {
      const res = await fetch(`/api/prompts/${id}/save`, { method: "POST" });
      if (res.ok) {
        invalidateCachedJson("/api/me/saved");
        invalidateCachedJson("/api/me/interactions");
        setRemotePrompts((prev) => prev.filter((prompt) => prompt.id !== id));
      }
      return;
    }

    setBookmarks((prev) => {
      const next = prev.filter((b) => b !== id);
      writeLocalBookmarks(next);
      return next;
    });
  }

  return (
    <MarketplaceLayout
      activeNav="Bookmarks"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => router.push(`/explore?q=${encodeURIComponent(query)}`)}
      onAction={(a) => setDrawerAction(a)}
    >
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-5 min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="m-0 text-[28px] font-extrabold text-white tracking-tight">Bookmarks</h1>
            <p className="m-0 mt-1.5 text-[13px] text-[#6070a0]">
              {visible.length} saved prompt{visible.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            className="flex items-center gap-2 h-9 px-4 rounded-xl border border-[#1e2840] bg-transparent text-[#8090b4] text-[12px] hover:text-white hover:border-[#7b3cff]/40 transition-all"
            onClick={() => router.push("/explore")}
          >
            <Plus size={14} /> Browse More
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
                    ? "border-[#7b3cff] bg-[#7b3cff]/15 text-[#a463ff]"
                    : "border-[#1e2840] bg-transparent text-[#6070a0] hover:text-white hover:border-[#3d2875]"
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
              placeholder="Search bookmarks..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {visible.map((p) => (
              <BookmarkCard key={p.id} item={p} onRemove={removeBookmark} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Bookmark size={48} className="text-[#1e2840] mb-5" />
            <h3 className="m-0 text-[16px] font-bold text-white mb-2">No bookmarks yet</h3>
            <p className="m-0 text-[13px] text-[#6070a0] mb-6 max-w-[300px]">
              Save prompts you love while browsing — they&apos;ll appear here for easy access.
            </p>
            <button
              className="flex items-center gap-2 h-10 px-6 rounded-xl bg-gradient-to-r from-[#7b3cff] to-[#6028d4] text-white text-[13px] font-semibold hover:brightness-110 transition-all"
              onClick={() => router.push("/explore")}
            >
              Browse Prompts
            </button>
          </div>
        )}
      </div>
      
    </MarketplaceLayout>
  );
}
