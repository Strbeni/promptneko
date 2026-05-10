"use client";

import { 
  BarChart3, Bookmark, CheckCircle2, Copy, Eye, Heart, 
  Layers, Share2, ShieldCheck, ShoppingCart, Sparkles, 
  Terminal, Zap 
} from "lucide-react";
import type { PromptCardItem } from "../PromptCard";

export function PromptSidebar({ prompt, onAction }: { prompt: PromptCardItem; onAction: (action: string) => void }) {
  return (
    <aside className="space-y-6">
      {/* 1. PROMPT HEADER CARD */}
      <section className="p-6 rounded-[24px] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="px-2 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-[10px] font-bold text-violet-400 uppercase tracking-wider">
            Premium Choice
          </div>
          <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
            Trending #1
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white leading-tight mb-4 tracking-tight">
          {prompt.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/20">
               {prompt.creator?.substring(0, 2).toUpperCase() || "AI"}
             </div>
             <div>
                <div className="text-[14px] font-bold text-white">{prompt.creator || "Anonymous"}</div>
                <div className="text-[12px] text-[var(--text-muted)]">Verified Creator</div>
             </div>
          </div>
          <button 
            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[12px] font-bold text-white hover:bg-white/10 transition-all"
            onClick={() => onAction("Follow")}
          >
            Follow
          </button>
        </div>
        <div className="mt-6 flex items-center gap-6 pt-6 border-t border-white/5">
           <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">Views</span>
              <span className="text-sm font-bold text-white">12.4K</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">Saves</span>
              <span className="text-sm font-bold text-white">{prompt.saves}</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">Usage</span>
              <span className="text-sm font-bold text-white">1.2K</span>
           </div>
        </div>
      </section>

      {/* 2. PRICING + CTA CARD */}
      <section className="p-6 rounded-[24px] border border-violet-500/20 bg-gradient-to-b from-violet-600/10 to-transparent backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Zap size={64} className="text-violet-500" />
        </div>
        
        <div className="flex items-end gap-2 mb-6">
           <span className="text-4xl font-bold text-white">$6.29</span>
           <span className="text-[var(--text-muted)] line-through mb-1.5">$8.99</span>
           <span className="mb-2 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
             SAVE 30%
           </span>
        </div>

        <button 
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-[15px] shadow-2xl shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group/btn"
          onClick={() => onAction("Buy Now")}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            <ShoppingCart size={18} />
            Get Instant Access
          </span>
        </button>

        <div className="mt-6 space-y-3">
           <div className="flex items-center gap-3 text-[12px] text-white/80">
              <CheckCircle2 size={14} className="text-emerald-400" />
              Full Commercial License
           </div>
           <div className="flex items-center gap-3 text-[12px] text-white/80">
              <ShieldCheck size={14} className="text-emerald-400" />
              100% Quality Guaranteed
           </div>
           <div className="flex items-center gap-3 text-[12px] text-white/80">
              <Zap size={14} className="text-emerald-400" />
              Instant Download & Updates
           </div>
        </div>
      </section>

      {/* 3. QUICK ACTIONS ROW */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: Sparkles, label: "Try", action: "Try Prompt" },
          { icon: Copy, label: "Copy", action: "Copy Prompt" },
          { icon: Share2, label: "Share", action: "Share Prompt" },
          { icon: Bookmark, label: "Save", action: "Save Prompt" },
        ].map((item) => (
          <button 
            key={item.label}
            onClick={() => onAction(item.action)}
            className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all group"
          >
            <item.icon size={18} className="text-[var(--text-muted)] group-hover:text-violet-400 transition-colors" />
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </div>

      {/* 4. MODEL METADATA CARD */}
      <section className="p-6 rounded-[24px] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
        <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
          <Terminal size={14} />
          Model Metadata
        </h3>
        <div className="space-y-4">
           {[
             { label: "AI Model", value: "Midjourney v6.1", color: "text-violet-400" },
             { label: "Resolution", value: "3072 × 3072 px" },
             { label: "Token Count", value: "240 Tokens" },
             { label: "Prompt Type", value: "Text-to-Image" },
             { label: "Aspect Ratio", value: "1:1 Square" },
           ].map((meta) => (
             <div key={meta.label} className="flex justify-between items-center py-2 border-b border-white/[0.03] last:border-0">
                <span className="text-[13px] text-[var(--text-muted)]">{meta.label}</span>
                <span className={`text-[13px] font-bold ${meta.color || "text-white"}`}>{meta.value}</span>
             </div>
           ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
           {["Cinematic", "Sci-Fi", "Detailed", "Storm", "High-res"].map(tag => (
             <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-[var(--text-muted)]">
               #{tag}
             </span>
           ))}
        </div>
      </section>

      {/* 5. CREATOR CARD */}
      <section className="p-6 rounded-[24px] border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-3xl" />
        <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
          <Heart size={14} />
          About Creator
        </h3>
        <div className="flex items-center gap-4 mb-6">
           <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-0.5 shadow-xl shadow-purple-500/10">
              <div className="w-full h-full rounded-2xl bg-[#0B1020] flex items-center justify-center text-xl font-bold text-white">
                {prompt.creator?.substring(0, 2).toUpperCase() || "AI"}
              </div>
           </div>
           <div>
              <div className="text-lg font-bold text-white">{prompt.creator || "Anonymous"}</div>
              <div className="flex gap-2">
                 <span className="text-[10px] font-bold text-violet-400">RANK #42</span>
                 <span className="text-[10px] font-bold text-emerald-400">ELITE SELLER</span>
              </div>
           </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
           <div className="p-2 rounded-xl bg-white/[0.03]">
              <div className="text-sm font-bold text-white">124</div>
              <div className="text-[9px] text-[var(--text-muted)] font-bold uppercase">Sales</div>
           </div>
           <div className="p-2 rounded-xl bg-white/[0.03]">
              <div className="text-sm font-bold text-white">4.9/5</div>
              <div className="text-[9px] text-[var(--text-muted)] font-bold uppercase">Rating</div>
           </div>
           <div className="p-2 rounded-xl bg-white/[0.03]">
              <div className="text-sm font-bold text-white">99%</div>
              <div className="text-[9px] text-[var(--text-muted)] font-bold uppercase">Success</div>
           </div>
        </div>
        <button 
          className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 text-[13px] font-bold text-white hover:bg-white/10 transition-all"
          onClick={() => onAction("View Profile")}
        >
          View Creator Profile
        </button>
      </section>

      {/* 6. QUALITY METRICS CARD */}
      <section className="p-6 rounded-[24px] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
        <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
          <BarChart3 size={14} />
          Quality Analysis
        </h3>
        <div className="space-y-6">
           {[
             { label: "Prompt Clarity", value: 98, color: "bg-violet-500" },
             { label: "Model Consistency", value: 94, color: "bg-indigo-500" },
             { label: "Output Reliability", value: 91, color: "bg-blue-500" },
           ].map((metric) => (
             <div key={metric.label}>
                <div className="flex justify-between items-center mb-2">
                   <span className="text-[12px] text-white/80 font-medium">{metric.label}</span>
                   <span className="text-[12px] font-bold text-white">{metric.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <div 
                     className={`h-full ${metric.color} rounded-full shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all duration-1000`} 
                     style={{ width: `${metric.value}%` }} 
                   />
                </div>
             </div>
           ))}
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
           <div className="text-[11px] text-[var(--text-muted)] mb-2 italic">"This prompt delivers exceptional results across all tested seeds."</div>
           <div className="text-[10px] font-bold text-emerald-400 flex items-center justify-center gap-1">
             <ShieldCheck size={10} />
             AUDITED & VERIFIED
           </div>
        </div>
      </section>
    </aside>
  );
}
