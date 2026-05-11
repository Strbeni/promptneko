"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { DetailedPrompt, promptCards } from "../marketplace-data";

export function PromptMedia({ prompt }: { prompt: DetailedPrompt }) {
  const thumbs = [prompt, ...promptCards.filter((item) => item.id !== prompt.id)].slice(0, 7);

  return (
    <section className="rounded-2xl border border-[#202746] bg-[#080d19] p-2">
      <div className="relative h-[520px] overflow-hidden rounded-xl border border-[#243052] bg-[#0b1222]">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${prompt.assets[0].primaryUrl})` }} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_28%,rgba(42,164,255,0.22),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.2))]" />
        <span className="absolute right-4 top-4 rounded-md bg-[#ff4f9d]/85 px-3 py-1 text-[11px] font-bold text-white">Boosted</span>
        <button className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur">
          <ChevronLeft size={22} />
        </button>
        <button className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur">
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {thumbs.map((item, index) => (
          <button
            className={`relative h-[58px] overflow-hidden rounded-lg border ${index === 0 ? "border-[#ff4f9d]" : "border-[#243052]"} bg-[#0b1222]`}
            key={`${item.id}-${index}`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${item.assets[0].thumbnailUrl})` }} 
            />
            {item.assets[0].type === 'video' ? <Play className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white/80" size={18} fill="currentColor" /> : null}
          </button>
        ))}
      </div>
    </section>
  );
}
