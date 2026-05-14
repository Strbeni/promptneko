"use client";

import {
  History,
  Trash2,
  Search,
  ExternalLink,
  Clock,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { ActionDrawer } from "./ActionDrawer";
import { optimizedThumbnailUrl } from "./image-utils";
import { MarketplaceLayout } from "./MarketplaceLayout";
import { DetailedPrompt } from "./marketplace-data";
import { clearPromptHistory, readPromptHistory } from "./prompt-history";
import { usePromptInteractions } from "./usePromptInteractions";

type HistoryPrompt = DetailedPrompt & { viewedAt: Date };

export function HistoryPage({ allPrompts = [] }: { allPrompts?: DetailedPrompt[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const [searchQ, setSearchQ] = useState("");
  const [historyEntries, setHistoryEntries] = useState(() => readPromptHistory());

  const { saved, toggleSave } = usePromptInteractions(allPrompts);

  const historyItems = useMemo(() => {
    const byKey = new Map<string, DetailedPrompt>();
    allPrompts.forEach((prompt) => {
      byKey.set(prompt.id, prompt);
      byKey.set(prompt.slug, prompt);
    });

    return historyEntries
      .map((entry) => {
        const prompt = byKey.get(entry.id) ?? byKey.get(entry.slug);
        if (!prompt) return null;
        return { ...prompt, viewedAt: new Date(entry.viewedAt) };
      })
      .filter((item): item is HistoryPrompt => item !== null);
  }, [allPrompts, historyEntries]);

  const filteredHistory = useMemo(() => {
    return historyItems.filter(p => 
      !searchQ || 
      p.title.toLowerCase().includes(searchQ.toLowerCase()) || 
      p.engine.provider.toLowerCase().includes(searchQ.toLowerCase())
    );
  }, [historyItems, searchQ]);

  useEffect(() => {
    setHistoryEntries(readPromptHistory());
  }, []);

  function handleClearHistory() {
    clearPromptHistory();
    setHistoryEntries([]);
  }

  return (
    <MarketplaceLayout
      activeNav="History"
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
              <History className="text-[#78c7ff]" size={28} />
              Browsing History
            </h1>
            <p className="m-0 mt-1.5 text-[13px] text-[#6070a0]">
              Review prompts you&apos;ve recently viewed across your active workspace sessions.
            </p>
          </div>

          {historyItems.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-[12px] font-medium hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer"
            >
              <Trash2 size={13} /> Clear History
            </button>
          )}
        </div>

        {/* Search tool */}
        {historyItems.length > 0 && (
          <div className="flex items-center h-[36px] px-3 gap-2 border border-[#1e2840] rounded-xl bg-[#0b1020] max-w-xs mb-6">
            <Search size={14} className="text-[#4a5a80]" />
            <input
              className="bg-transparent border-0 outline-none text-white text-[12px] placeholder:text-[#4a5a80] flex-1"
              placeholder="Search history items..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
        )}

        {/* Content list */}
        {filteredHistory.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredHistory.map((item) => (
              <div 
                key={item.id}
                onClick={() => router.push(`/prompt/${item.slug}`)}
                className="flex items-center gap-4 p-3 rounded-2xl bg-[#0c1120] border border-white/5 hover:border-white/10 cursor-pointer transition-all group"
              >
                <div 
                  className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0 relative overflow-hidden"
                  style={{ backgroundImage: `url(${optimizedThumbnailUrl(item.assets[0]?.thumbnailUrl)})` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-white text-[14px] font-semibold m-0 truncate group-hover:text-[#78c7ff] transition-colors">{item.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#a46aff] font-medium">{item.engine.provider}</span>
                  </div>
                  <p className="text-[#888] text-[12px] m-0 truncate">{item.description}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#5060a0]">
                    <Clock size={11} />
                    <span>Viewed today at {item.viewedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    className={`px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-colors ${saved.has(item.id) ? 'bg-white/10 text-white border-white/20' : 'bg-transparent text-white/60 border-white/5 hover:text-white hover:bg-white/5'}`}
                    onClick={(e) => { e.stopPropagation(); toggleSave(item); }}
                  >
                    {saved.has(item.id) ? 'Saved' : 'Save'}
                  </button>
                  <ExternalLink size={14} className="text-[#4a5a80] group-hover:text-white transition-colors ml-1" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <History size={48} className="text-[#1e2840] mb-5" />
            <h3 className="m-0 text-[16px] font-bold text-white mb-2">{historyEntries.length === 0 ? "No history recorded" : "No matching history"}</h3>
            <p className="m-0 text-[13px] text-[#6070a0] mb-6 max-w-[300px]">
              {historyEntries.length === 0 ? "Open prompt detail pages to build a private local viewing timeline." : "Try a different title, model, or category filter."}
            </p>
            <button
              className="flex items-center gap-2 h-10 px-6 rounded-xl bg-gradient-to-r from-[#7b3cff] to-[#6028d4] text-white text-[13px] font-semibold hover:brightness-110 transition-all cursor-pointer"
              onClick={() => router.push("/explore")}
            >
              <Sparkles size={16} /> Explore Prompts
            </button>
          </div>
        )}
      </div>

      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}
