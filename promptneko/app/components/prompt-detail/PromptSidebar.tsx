"use client";

import { Bookmark, Copy, Eye, Heart, Share2, ShoppingCart, Sparkles } from "lucide-react";
import type { PromptCardItem } from "../PromptCard";

export function PromptSidebar({ prompt, onAction }: { prompt: PromptCardItem; onAction: (action: string) => void }) {
  return (
    <aside className="space-y-4">
      <section className="pt-2">
        <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold text-[#f7d45a]">
          <Sparkles size={15} />
          {prompt.model}
        </div>
        <h1 className="mb-5 text-[27px] font-extrabold leading-tight text-white">
          Seedream 5 prompt: Ultra-cinematic sci-fi storm sequence, a glowing...
        </h1>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2a2d42] text-[13px] font-bold text-white">DA</span>
            <div>
              <strong className="block text-[13px] text-white">{prompt.author}</strong>
              <span className="text-[11px] text-[#8f98b4]">Posted 2 days ago</span>
            </div>
          </div>
          <button className="h-9 rounded-lg border border-[#202746] px-4 text-[12px] font-bold text-white hover:bg-white/5" onClick={() => onAction("Follow creator")}>
            Follow
          </button>
        </div>
        <div className="flex gap-7 text-[12px] text-[#9aa3bd]">
          <span className="flex items-center gap-2"><Eye size={15} />62 views</span>
          <span className="flex items-center gap-2"><Heart size={15} />0 favorites</span>
          <span className="flex items-center gap-2"><Bookmark size={15} />0 saves</span>
        </div>
      </section>

      <section className="rounded-2xl border border-[#202746] bg-[#0a1020] p-4">
        <div className="mb-4 flex items-end justify-between">
          <div className="text-[13px] text-white">Standard License <span className="ml-2 text-[#8892ad] line-through">$6.99</span> <span className="ml-1 rounded bg-[#8df5c3] px-1 text-[10px] font-bold text-[#062819]">-10%</span></div>
          <strong className="text-[25px] text-white">$6.29</strong>
        </div>
        <div className="grid grid-cols-[1fr_54px] gap-2">
          <button className="h-10 rounded-lg bg-gradient-to-r from-[#dc3d9b] to-[#6d32e8] text-[13px] font-bold text-white" onClick={() => onAction("Add to Cart")}>
            Add to Cart
          </button>
          <button className="grid h-10 place-items-center rounded-lg border border-[#30235b] bg-[#11162a] text-white" onClick={() => onAction("Cart")}>
            <ShoppingCart size={18} />
          </button>
        </div>
        <div className="mt-4 flex gap-3 text-[10px] text-[#c5ccdd]">
          <span className="rounded bg-[#12182d] px-2 py-1">Instant Access</span>
          <span className="rounded bg-[#12182d] px-2 py-1">Commercial Use</span>
          <span className="rounded bg-[#12182d] px-2 py-1">Money Back</span>
        </div>
      </section>

      <div className="grid grid-cols-4 gap-2">
        {[
          ["Try this prompt", Sparkles],
          ["Copy Prompt", Copy],
          ["Share", Share2],
          ["Save", Bookmark],
        ].map(([label, Icon]) => (
          <button className="flex h-9 items-center justify-center gap-2 rounded-lg border border-[#202746] bg-[#0a1020] text-[11px] text-white hover:border-[#7b3cff]" key={label as string} onClick={() => onAction(label as string)}>
            <Icon size={14} />
            <span className="hidden xl:inline">{label as string}</span>
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-[#202746] bg-[#0a1020] p-4">
        <h2 className="mb-4 text-[13px] text-[#aeb5ca]">Model Used</h2>
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#173a5c] text-white">✦</span>
          <strong className="text-[13px] text-white">Seedream 5 <span className="text-[#7f8aa5]">v2</span></strong>
        </div>
        <h3 className="mb-3 text-[11px] text-[#7f8aa5]">Generation Parameters</h3>
        <div className="flex flex-wrap gap-2 text-[11px] text-[#c5ccdd]">
          {["Image", "3072×3072", "jpg", "3K"].map((item) => <span className="rounded-md border border-[#202746] px-2 py-1" key={item}>{item}</span>)}
        </div>
      </section>

      <section className="grid grid-cols-4 rounded-2xl border border-[#202746] bg-[#0a1020] p-4 text-center">
        {[
          ["Words", "136"],
          ["Tokens", "~270"],
          ["Quality", "4.5 ★"],
          ["Clarity", "98%"],
        ].map(([label, value]) => (
          <div className="border-r border-[#202746] last:border-r-0" key={label}>
            <span className="block text-[11px] text-[#8f98b4]">{label}</span>
            <strong className="mt-1 block text-[18px] text-white">{value}</strong>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#202746] bg-[#0a1020] p-4">
          <h2 className="mb-4 text-[12px] text-white">About the Creator</h2>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2a2d42] text-[13px] font-bold text-white">DA</span>
            <div><strong className="block text-[13px] text-white">{prompt.author}</strong><span className="text-[10px] text-[#ff4f9d]">Top Creator</span></div>
          </div>
          <div className="mb-4 grid grid-cols-3 text-center text-[11px] text-[#8f98b4]">
            <strong className="text-white">24<br /><span className="font-normal text-[#8f98b4]">Prompts</span></strong>
            <strong className="text-white">12.4K<br /><span className="font-normal text-[#8f98b4]">Followers</span></strong>
            <strong className="text-white">98%<br /><span className="font-normal text-[#8f98b4]">Positive</span></strong>
          </div>
          <button className="h-8 w-full rounded-lg border border-[#6732d5] text-[12px] text-[#a463ff]" onClick={() => onAction("View Profile")}>View Profile</button>
        </div>
        <div className="rounded-2xl border border-[#202746] bg-[#0a1020] p-4">
          <h2 className="mb-5 text-[12px] text-white">Quality Score</h2>
          <strong className="text-[28px] text-white">4.5 <span className="text-[11px] text-[#8df5c3]">Excellent</span></strong>
          <div className="my-4 h-1 rounded-full bg-[#202746]"><span className="block h-1 w-[82%] rounded-full bg-[#d944d8]" /></div>
          {["Clarity 98%", "Detail Level 94%", "Creativity 91%", "Usefulness 97%"].map((item) => <p className="mb-2 text-[11px] text-[#c5ccdd]" key={item}>◆ {item}</p>)}
        </div>
      </section>
    </aside>
  );
}
