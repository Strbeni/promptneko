"use client";

import { Bookmark, Play } from "lucide-react";
import Link from "next/link";
import { CropImage } from "../CropImage";
import { promptCards, promptSlug } from "../marketplace-data";

export function RelatedPrompts({ title }: { title: string }) {
  return (
    <section className="mt-6">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-white">{title}</h2>
        <Link className="text-[12px] text-[#a463ff]" href="/explore">View all ›</Link>
      </header>
      <div className="grid grid-cols-4 gap-3">
        {promptCards.slice(1, 5).map((prompt) => (
          <Link className="group relative h-[150px] overflow-hidden rounded-xl border border-[#202746] bg-[#0a1020] hover:border-[#7b3cff]" href={`/prompt/${promptSlug(prompt.title)}`} key={prompt.title}>
            <CropImage className={`absolute inset-0 h-full w-full ${prompt.crop}`} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/75" />
            <Play className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white/80" size={28} fill="currentColor" />
            <Bookmark className="absolute right-3 top-3 z-10 text-white" size={17} />
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <strong className="block truncate text-[12px] text-white">{prompt.title}</strong>
              <span className="text-[11px] text-[#c5ccdd]">$5.49</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
