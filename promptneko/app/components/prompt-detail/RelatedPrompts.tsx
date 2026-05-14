"use client";

import { Play } from "lucide-react";
import Link from "next/link";
import { optimizedThumbnailUrl } from "../image-utils";
import { promptCards } from "../marketplace-data";

export function RelatedPrompts({ title }: { title: string }) {
  return (
    <section className="mt-2">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-white">{title}</h2>
        <Link className="text-[11px] font-medium text-[#a463ff] hover:underline" href="/explore">
          View all
        </Link>
      </header>
      <div className="grid grid-cols-2 gap-3">
        {promptCards.slice(0, 4).map((prompt) => (
          <Link 
            className="group block overflow-hidden rounded-xl border border-white/5 bg-[#111111] transition-all hover:border-white/10" 
            href={`/prompt/${prompt.slug}`} 
            key={prompt.id}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: `url(${optimizedThumbnailUrl(prompt.assets[0]?.thumbnailUrl)})` }} 
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
              {prompt.assets[0].type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid place-items-center w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm text-white/90 border border-white/10">
                    <Play size={12} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>
              )}
            </div>
            <div className="p-2.5">
              <strong className="block truncate text-[11px] font-semibold text-white/90">
                {prompt.title}
              </strong>
              <span className="mt-0.5 block text-[10px] text-[#8f98b4] capitalize">
                {prompt.taxonomy.primaryCategory}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
