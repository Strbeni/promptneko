"use client";

import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { CropImage } from "../CropImage";
import type { PromptCardItem } from "../PromptCard";
import { promptCards } from "../marketplace-data";

export function PromptMedia({ prompt }: { prompt: PromptCardItem }) {
  const thumbs = [prompt, ...promptCards.filter((item) => item.title !== prompt.title)].slice(0, 6);

  return (
    <section className="relative group">
      {/* Cinematic Preview Container */}
      <div className="relative h-[640px] overflow-hidden rounded-[24px] border border-white/5 bg-[#050816] shadow-2xl shadow-purple-500/10">
        {/* Ambient Glows */}
        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* The Main Content */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500">
             <div className={`absolute inset-0 h-full w-full bg-gradient-to-br ${prompt.gradient} opacity-40`} />
             <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-4xl">
               PREVIEW
             </div>
             
             {/* Gradient Overlays */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/60 via-transparent to-transparent" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(5,8,22,0.4)_100%)]" />
          </div>
        </div>

        {/* Floating Media Controls */}
        <div className="absolute top-8 left-8 flex gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white shadow-xl">
             <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
             AI GENERATED
          </div>
          {prompt.isVideo && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-600/80 backdrop-blur-md text-[11px] font-bold text-white shadow-xl">
               <Play size={10} fill="currentColor" />
               VIDEO PROMPT
            </div>
          )}
        </div>

        {/* Navigation Arrows - Floating Glass */}
        <button className="absolute left-10 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/5 text-white backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/10 hover:scale-110 active:scale-95">
          <ChevronLeft size={24} />
        </button>
        <button className="absolute right-10 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/5 text-white backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/10 hover:scale-110 active:scale-95">
          <ChevronRight size={24} />
        </button>

        {/* Bottom Floating Info */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
          <div className="space-y-1">
             <div className="text-[11px] font-bold text-violet-400 uppercase tracking-widest">Model: Midjourney v6.1</div>
             <h2 className="text-xl font-bold text-white">{prompt.title}</h2>
          </div>
          <div className="flex items-center gap-4 p-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <button className="p-2.5 rounded-xl hover:bg-white/10 text-white transition-colors">
              <Play size={20} fill="currentColor" />
            </button>
            <div className="w-px h-6 bg-white/10" />
            <button className="px-4 py-2 text-[12px] font-bold text-white hover:text-violet-400 transition-colors">
              Full Preview
            </button>
          </div>
        </div>
      </div>

      {/* Floating Thumbnail Strip */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-4 p-2 rounded-[20px] bg-white/[0.03] backdrop-blur-xl border border-white/5">
          {thumbs.map((item, index) => (
            <button
              className={`relative w-20 h-20 overflow-hidden rounded-xl transition-all duration-300 ${index === 0 ? "border-2 border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.4)] scale-110" : "border border-white/10 hover:border-white/30 hover:scale-105"}`}
              key={`${item.title}-${index}`}
            >
              <div className={`absolute inset-0 h-full w-full bg-gradient-to-br ${item.gradient}`} />
              {index > 0 && (
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
