"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import { DetailedPrompt } from "../marketplace-data";

export function PromptMedia({ prompt }: { prompt: DetailedPrompt }) {
  const assets = prompt.assets.length > 0 ? prompt.assets : [{
    type: "image" as const,
    primaryUrl: "/main.png",
    thumbnailUrl: "/main.png",
    dimensions: { width: 1024, height: 1024 },
  }];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAsset = assets[activeIndex] ?? assets[0];

  function move(delta: number) {
    setActiveIndex((current) => (current + delta + assets.length) % assets.length);
  }

  return (
    <section className="rounded-2xl border border-[#202746] bg-[#080d19] p-2">
      <div className="relative h-[520px] overflow-hidden rounded-xl border border-[#243052] bg-[#0b1222]">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${activeAsset.primaryUrl})` }} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_28%,rgba(42,164,255,0.22),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.2))]" />
        <span className="absolute right-4 top-4 rounded-md bg-[#ff4f9d]/85 px-3 py-1 text-[11px] font-bold text-white">Boosted</span>
        <button className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur disabled:opacity-40" onClick={() => move(-1)} disabled={assets.length <= 1} aria-label="Previous media">
          <ChevronLeft size={22} />
        </button>
        <button className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur disabled:opacity-40" onClick={() => move(1)} disabled={assets.length <= 1} aria-label="Next media">
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {assets.slice(0, 7).map((asset, index) => (
          <button
            className={`relative h-[58px] overflow-hidden rounded-lg border ${index === activeIndex ? "border-[#ff4f9d]" : "border-[#243052]"} bg-[#0b1222]`}
            key={`${asset.thumbnailUrl}-${index}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show media ${index + 1}`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${asset.thumbnailUrl})` }} 
            />
            {asset.type === 'video' ? <Play className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white/80" size={18} fill="currentColor" /> : null}
          </button>
        ))}
      </div>
    </section>
  );
}
