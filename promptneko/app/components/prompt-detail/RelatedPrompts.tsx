"use client";

import { Bookmark, Play } from "lucide-react";
import Link from "next/link";
import { CropImage } from "../CropImage";
import { promptCards, promptSlug } from "../marketplace-data";

export function RelatedPrompts({ title }: { title: string }) {
  return (
    <section className="mt-8">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-[18px] font-700 text-[var(--text-primary)] letter-spacing-[-0.01em]">{title}</h2>
        <Link className="text-[12px] font-600 text-[var(--accent)] hover:underline" href="/explore">View all ›</Link>
      </header>
      <div className="grid grid-cols-4 gap-4">
        {promptCards.slice(1, 5).map((prompt) => (
          <Link 
            className="group relative h-[180px] overflow-hidden rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] transition-all hover:border-[var(--accent)] hover:translate-y-[-4px] hover:shadow-lg" 
            href={`/prompt/${promptSlug(prompt.title)}`} 
            key={prompt.title}
          >
            <CropImage className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110 ${prompt.crop}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur">
                <Play size={20} fill="currentColor" />
              </div>
            </div>

            <button className="absolute right-3 top-3 z-10 grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <Bookmark size={14} />
            </button>

            <div className="absolute bottom-4 left-4 right-4 z-10">
              <strong className="block truncate text-[13px] font-600 text-white mb-0.5">{prompt.title}</strong>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-500 text-white/70">@{prompt.author}</span>
                <span className="text-[12px] font-700 text-white">$5.49</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
