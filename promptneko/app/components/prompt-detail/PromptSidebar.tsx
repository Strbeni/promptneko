"use client";

import { useState } from "react";
import { Bookmark, Copy, Eye, Heart, Sparkles, Check } from "lucide-react";
import { DetailedPrompt } from "../marketplace-data";

export function PromptSidebar({ prompt, onAction }: { prompt: DetailedPrompt; onAction: (action: string) => void }) {
  const [copied, setCopied] = useState(false);

  function formatCount(num: number) {
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  }

  function handleCopy() {
    navigator.clipboard.writeText(prompt.promptToCopy || prompt.content.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <aside className="space-y-4">
      <section className="pt-2">
        <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold text-[#f7d45a]">
          <Sparkles size={15} />
          {prompt.engine.provider}
        </div>
        <h1 className="mb-3 text-[27px] font-extrabold leading-tight text-white">
          {prompt.title}
        </h1>
        <p className="mb-5 text-[14px] text-[#8f98b4] leading-relaxed">
          {prompt.description}
        </p>

        <div className="mb-5 flex items-center justify-between rounded-2xl border border-[#202746] bg-[#0a1020] p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2a2d42] text-[13px] font-bold text-white">
              {prompt.creator.displayName.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <strong className="block text-[13px] text-white">{prompt.creator.displayName}</strong>
              <span className="text-[11px] text-[#8f98b4]">{prompt.creator.handle}</span>
            </div>
          </div>
          <button className="h-8 rounded-lg border border-[#6732d5] px-3 text-[12px] font-bold text-[#a463ff] hover:bg-[#6732d5]/10 transition-colors" onClick={() => onAction("View Profile")}>
            Profile
          </button>
        </div>

        <div className="flex justify-between text-[12px] text-[#9aa3bd] bg-[#0a1020] p-4 rounded-2xl border border-[#202746]">
          <span className="flex flex-col items-center gap-1.5"><Eye size={18} className="text-[#aeb5ca]" />{formatCount(prompt.stats.views)} Views</span>
          <span className="flex flex-col items-center gap-1.5"><Heart size={18} className="text-[#ff4f9d]" />{formatCount(prompt.stats.likes)} Likes</span>
          <span className="flex flex-col items-center gap-1.5"><Bookmark size={18} className="text-[#f7d45a]" />{formatCount(prompt.stats.saves)} Saves</span>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2">
        <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8c57ff] to-[#6433e9] text-[13px] font-bold text-white hover:brightness-110 transition-all" onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? "Copied!" : "Copy Prompt"}</span>
        </button>
        <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#202746] bg-[#11162a] text-[13px] font-bold text-white hover:border-[#7b3cff] transition-all" onClick={() => onAction("Try this prompt")}>
          <Sparkles size={16} />
          <span>Try Prompt</span>
        </button>
      </div>

      <section className="rounded-2xl border border-[#202746] bg-[#0a1020] p-4">
        <h2 className="mb-4 text-[13px] text-[#aeb5ca]">Engine Details</h2>
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#173a5c] text-white">✦</span>
          <div>
            <strong className="block text-[14px] text-white">{prompt.engine.modelId}</strong>
            <span className="text-[11px] text-[#7f8aa5]">Version {prompt.content.version}</span>
          </div>
        </div>
        
        <h3 className="mb-3 text-[11px] text-[#7f8aa5]">Tags & Parameters</h3>
        <div className="flex flex-wrap gap-2 text-[11px] text-[#c5ccdd]">
          <span className="rounded-md border border-[#7b3cff]/40 bg-[#7b3cff]/10 text-[#a463ff] px-2 py-1 font-medium">{prompt.taxonomy.primaryCategory}</span>
          {prompt.taxonomy.tags.map((tag) => (
            <span className="rounded-md border border-[#202746] bg-[#11162a] px-2 py-1 capitalize" key={tag}>{tag}</span>
          ))}
          <span className="rounded-md border border-[#202746] bg-[#11162a] px-2 py-1">{prompt.content.text.split(' ').length} Words</span>
        </div>
      </section>
    </aside>
  );
}
