"use client";

import { ArrowUp, Sparkles, ChevronRight, ChevronLeft, TrendingUp, Layers, Tag } from "lucide-react";
import { popularTags, topModels, trendingSearches } from "./marketplace-data";

type RightRailProps = {
  onAction: (action: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
};

export function RightRail({ onAction, isCollapsed, onToggle }: RightRailProps) {
  if (isCollapsed) {
    return (
      <aside className="w-[60px] flex-[0_0_60px] border-l border-white/5 bg-[#030711] flex flex-col items-center py-6 gap-8">
        <button 
          onClick={onToggle}
          className="w-8 h-8 grid place-items-center rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex flex-col gap-6 items-center">
          <TrendingUp size={20} className="text-[#a46aff]" />
          <div className="w-8 h-8 rounded-full bg-[#00d9a8]/10 flex items-center justify-center">
            <Tag size={18} className="text-[#00d9a8]" />
          </div>
          <div className="w-8 h-8 rounded-full bg-[#ff9f21]/10 flex items-center justify-center">
            <Sparkles size={18} className="text-[#ff9f21]" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[280px] flex-[0_0_280px] bg-[#030711] border-l border-white/5 flex flex-col h-full min-h-0">
      <div className="px-4 py-3 flex items-center justify-between border-b border-white/5">
        <h2 className="text-white text-[15px] font-bold tracking-tight">Market Insights</h2>
        <button 
          onClick={onToggle}
          className="w-8 h-8 grid place-items-center rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-5 custom-scrollbar">
        {/* Trending */}
        <section>
          <header className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-[#a46aff]">
              <TrendingUp size={14} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Trending</span>
            </div>
            <button className="text-[11px] font-semibold text-white/30 hover:text-[#a46aff] transition-colors" onClick={() => onAction("Trending")}>
              View All
            </button>
          </header>
          <div className="space-y-1.5">
            {trendingSearches.slice(0, 4).map((item, index) => (
              <button 
                key={item.title}
                onClick={() => onAction(item.title)}
                className="group flex items-center w-full gap-2.5 p-2 rounded-lg hover:bg-white/5 transition-all text-left"
              >
                <span className="text-[11px] font-mono font-bold text-white/20 group-hover:text-[#a46aff] transition-colors">
                  0{index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-white/90 truncate">{item.title}</p>
                  <p className="text-[10px] text-white/40">{item.subtitle}</p>
                </div>
                <div className="flex items-center gap-0.5 text-[#00d9a8] text-[10px] font-mono font-bold">
                  <ArrowUp size={10} strokeWidth={3} />
                  {item.change}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Trending Tags */}
        <section>
          <header className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-[#00d9a8]">
              <Tag size={14} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Top Topics</span>
            </div>
          </header>
          <div className="grid grid-cols-1 gap-1.5">
            {popularTags.slice(0, 5).map(([tag, count]) => (
              <button 
                key={tag}
                onClick={() => onAction(tag)}
                className="flex items-center justify-between px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00d9a8]/40 group-hover:bg-[#00d9a8] transition-colors" />
                  <span className="text-[12px] font-semibold text-white/90">#{tag}</span>
                </div>
                <span className="text-[10px] text-white/30 font-mono">{count}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Tags */}
        <section>
          <header className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-[#ff9f21]">
              <Tag size={14} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Popular Tags</span>
            </div>
          </header>
          <div className="flex flex-wrap gap-2">
            {popularTags.slice(0, 10).map(([tag]) => (
              <button 
                key={tag}
                onClick={() => onAction(tag)}
                className="px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/5 text-[11px] text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                #{tag}
              </button>
            ))}
          </div>
        </section>

        {/* Sell Banner */}
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#8751ff] to-[#6530e9] p-4 shadow-lg group">
          <h3 className="relative z-10 text-white text-[17px] font-bold leading-tight">Start earning today</h3>
          <p className="relative z-10 mt-1 mb-3 text-white/70 text-[12px] leading-snug">Publish tested prompts with variables, examples, and outputs.</p>
          <button 
            onClick={() => onAction("Sell")}
            className="relative z-10 w-full py-2 bg-white text-[#6530e9] rounded-xl text-[13px] font-bold shadow-md hover:bg-white/90 transition-colors"
          >
            Become a Seller
          </button>
        </section>
      </div>
    </aside>
  );
}
