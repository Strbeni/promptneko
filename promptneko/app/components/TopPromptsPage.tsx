"use client";

import {
  Star,
  Trophy,
  TrendingUp,
  Search,
  Bookmark,
  Heart,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

import { optimizedThumbnailUrl } from "./image-utils";
import { MarketplaceLayout } from "./MarketplaceLayout";
import { promptCards, DetailedPrompt } from "./marketplace-data";
import { PromptCard } from "./PromptCard";
import { usePromptInteractions } from "./usePromptInteractions";

export function TopPromptsPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const [searchQ, setSearchQ] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { liked, saved, toggleLike, toggleSave } = usePromptInteractions(promptCards);

  // Top Prompts are pre-sorted by views + likes or rating
  const sortedTopPrompts = useMemo(() => {
    return [...promptCards].sort((a, b) => {
      const scoreB = (b._db?.avgRating || 0) * 1000 + b.stats.likes + b.stats.views;
      const scoreA = (a._db?.avgRating || 0) * 1000 + a.stats.likes + a.stats.views;
      return scoreB - scoreA;
    });
  }, []);

  const categories = useMemo(() => [
    "All",
    ...Array.from(new Set(sortedTopPrompts.map(p => p.taxonomy.primaryCategory)))
  ], [sortedTopPrompts]);

  const visiblePrompts = useMemo(() => {
    return sortedTopPrompts
      .filter(p => activeCategory === "All" || p.taxonomy.primaryCategory === activeCategory)
      .filter(p => !searchQ || p.title.toLowerCase().includes(searchQ.toLowerCase()) || p.description.toLowerCase().includes(searchQ.toLowerCase()));
  }, [sortedTopPrompts, activeCategory, searchQ]);

  // Featured top 3 podium
  const topThree = sortedTopPrompts.slice(0, 3);

  return (
    <MarketplaceLayout
      activeNav="Top Prompts"
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
              <Trophy className="text-[#ffb020]" size={28} />
              Top Rated Prompts
            </h1>
            <p className="m-0 mt-1.5 text-[13px] text-[#6070a0]">
              The absolute highest-performing and community-acclaimed prompts of all time.
            </p>
          </div>
        </div>

        {/* Podium Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {topThree.map((prompt, idx) => {
            const medals = ["bg-[#ffb020]", "bg-[#c0c0c0]", "bg-[#cd7f32]"];
            const labels = ["1st Place", "2nd Place", "3rd Place"];
            return (
              <div 
                key={prompt.id} 
                onClick={() => router.push(`/prompt/${prompt.slug}`)}
                className="relative flex flex-col overflow-hidden rounded-[20px] bg-gradient-to-b from-[#111625] to-[#080d1a] border border-white/10 p-4 cursor-pointer group hover:border-[#ffb020]/50 transition-all"
              >
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10">
                  <span className={`w-2 h-2 rounded-full ${medals[idx]}`} />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">{labels[idx]}</span>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-black/40">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${optimizedThumbnailUrl(prompt.assets[0]?.thumbnailUrl)})` }}
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[#ffb020] text-[11px] font-bold">
                    <Star size={11} fill="currentColor" /> {prompt._db?.avgRating?.toFixed(1) || "4.9"}
                  </div>
                </div>

                <h3 className="text-white text-[15px] font-bold m-0 truncate group-hover:text-[#ffb020] transition-colors">{prompt.title}</h3>
                <p className="text-[#8090b4] text-[12px] m-0 mt-1 line-clamp-2 leading-relaxed">{prompt.description}</p>
                <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-[#5060a0]">
                  <span>{prompt.engine.provider}</span>
                  <span className="text-white/60 font-semibold">{prompt.stats.views.toLocaleString()} views</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-[32px] px-3 rounded-xl border text-[12px] font-semibold transition-all ${
                  activeCategory === cat
                    ? "border-[#ffb020] bg-[#ffb020]/15 text-[#ffcf70]"
                    : "border-[#1e2840] bg-transparent text-[#6070a0] hover:text-white hover:border-[#4a3820]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center h-[34px] px-3 gap-2 border border-[#1e2840] rounded-xl bg-[#0b1020]">
            <Search size={14} className="text-[#4a5a80]" />
            <input
              className="bg-transparent border-0 outline-none text-white text-[12px] placeholder:text-[#4a5a80] w-[160px]"
              placeholder="Filter top prompts..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
        </div>

        {/* All Top List Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {visiblePrompts.map((prompt) => (
            <PromptCard
              item={prompt}
              isSaved={saved.has(prompt.id)}
              isLiked={liked.has(prompt.id)}
              key={prompt.id}
              onOpen={() => setDrawerAction(null)}
              onSave={() => toggleSave(prompt)}
              onLike={() => toggleLike(prompt)}
            />
          ))}
        </div>
      </div>

      
    </MarketplaceLayout>
  );
}
