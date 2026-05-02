"use client";

import { ArrowUp, Sparkles } from "lucide-react";
import { popularTags, topModels, trendingSearches } from "./marketplace-data";

type RightRailProps = {
  onAction: (action: string) => void;
};

export function RightRail({ onAction }: RightRailProps) {
  return (
    <aside className="w-[300px] flex-[0_0_300px] overflow-y-auto px-[18px] py-3 pb-7">
      <Panel title="Trending Searches" onViewAll={() => onAction("Trending Searches")}>
        {trendingSearches.map((item, index) => (
          <button 
            className="flex items-center w-full h-[46px] gap-3 bg-transparent border-0 text-left cursor-pointer group" 
            key={item.title} 
            onClick={() => onAction(item.title)}
          >
            <span className="grid place-items-center w-6 h-6 rounded-4 bg-[#1b2341] text-[#a5aec7] text-[12px] font-bold group-hover:bg-[#7b3cff] group-hover:text-white transition-colors">
              {index + 1}
            </span>
            <div className="flex flex-col min-w-0">
              <strong className="block text-white text-[13px] font-medium truncate">{item.title}</strong>
              <small className="block text-[#8f98b3] text-[11px] font-normal">{item.subtitle}</small>
            </div>
            <i className="flex-1 h-px ml-2 bg-[#1b2341]" />
            <em className="flex items-center gap-[2px] ml-1 text-[#00d9a8] text-[11px] font-bold not-italic font-mono">
              <ArrowUp size={12} />{item.change}
            </em>
          </button>
        ))}
      </Panel>

      <Panel title="Top Models" onViewAll={() => onAction("Top Models")}>
        {topModels.map((item) => (
          <button 
            className="flex items-center w-full h-[46px] gap-3 bg-transparent border-0 text-left cursor-pointer group" 
            key={item.title} 
            onClick={() => onAction(item.title)}
          >
            <span className={`grid place-items-center w-8 h-8 rounded-full border 
              ${item.tone === 'gold' ? 'border-[#ff9823]/40 bg-[#ff9823]/10 text-[#ff9823]' : 
                item.tone === 'blue' ? 'border-[#3ba2ff]/40 bg-[#3ba2ff]/10 text-[#3ba2ff]' : 
                item.tone === 'purple' ? 'border-[#a46aff]/40 bg-[#a46aff]/10 text-[#a46aff]' : 
                'border-[#00d9a8]/40 bg-[#00d9a8]/10 text-[#00d9a8]'}`}>
              <Sparkles size={16} />
            </span>
            <div className="flex flex-col min-w-0">
              <strong className="block text-white text-[13px] font-medium truncate">{item.title}</strong>
              <small className="block text-[#8f98b3] text-[11px] font-normal">{item.subtitle}</small>
            </div>
          </button>
        ))}
      </Panel>

      <Panel title="Popular Tags" onViewAll={() => onAction("Popular Tags")}>
        <div className="flex flex-wrap gap-x-2 gap-y-[9px] pt-1">
          {popularTags.map(([tag, count]) => (
            <button 
              key={tag} 
              className="flex items-center h-[26px] px-[10px] border border-[#1b2544] rounded-full bg-[#0c1122] text-[#c5ccdd] text-[11px] cursor-pointer hover:border-[#7b3cff] hover:text-white transition-colors"
              onClick={() => onAction(tag)}
            >
              {tag}
              <span className="ml-[6px] text-[#808aa5] text-[10px]">{count}</span>
            </button>
          ))}
        </div>
      </Panel>

      <section className="mt-[22px] p-5 border border-[#30395e] rounded-8 bg-gradient-to-b from-[#131b33] to-[#0b1020] [box-shadow:inset_0_0_40px_rgba(112,61,255,0.06)]">
        <h2 className="m-0 text-white text-[19px] font-extrabold leading-tight">Create. Share. Earn.</h2>
        <p className="mt-[6px] mb-[15px] text-[#aeb5ca] text-[13px] leading-[1.5]">Join thousands of creators earning from their prompts.</p>
        <button 
          className="w-full h-9 border-0 rounded-7 bg-gradient-to-b from-[#8751ff] to-[#6530e9] text-white text-[14px] font-bold cursor-pointer [box-shadow:0_0_24px_rgba(112,61,255,0.3)] hover:brightness-110 transition-all"
          onClick={() => onAction("Start Selling")}
        >
          Start Selling
        </button>
      </section>
    </aside>
  );
}

function Panel({ title, children, onViewAll }: { title: string; children: React.ReactNode; onViewAll: () => void }) {
  return (
    <section className="mb-6 first:mt-[6px]">
      <header className="flex items-center justify-between h-[18px] mb-3">
        <h2 className="m-0 text-[#8f98b3] text-[11px] font-bold uppercase tracking-wider">{title}</h2>
        <button className="bg-transparent border-0 text-[#a46aff] text-[11px] font-bold cursor-pointer hover:underline" onClick={onViewAll}>View all</button>
      </header>
      {children}
    </section>
  );
}
