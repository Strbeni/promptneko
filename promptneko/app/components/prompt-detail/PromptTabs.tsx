"use client";

import { useState } from "react";

export function PromptTabs() {
  const [active, setActive] = useState("Prompt");

  return (
    <section className="relative rounded-[24px] border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl">
      {/* Tab Header */}
      <div className="flex items-center gap-1 p-1.5 bg-white/[0.03] border-b border-white/5">
        {["Prompt", "Negative Prompt", "Raw Data"].map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-6 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-300 ${isActive ? "bg-white/10 text-white shadow-lg" : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"}`}
            >
              {tab}
            </button>
          );
        })}
        
        {/* Editor Controls */}
        <div className="ml-auto flex items-center gap-2 pr-4">
           <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
           </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative p-8 group">
        {/* Floating Copy Button */}
        <button className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 text-[11px] font-bold text-violet-400 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-violet-600/40">
           <Copy size={14} />
           COPY TO CLIPBOARD
        </button>

        <div className="flex gap-6 font-mono">
           {/* Line Numbers */}
           <div className="text-[var(--text-muted)] text-[13px] text-right select-none opacity-30 leading-relaxed pt-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>{String(i + 1).padStart(2, "0")}</div>
              ))}
           </div>

           {/* The Prompt Text */}
           <div className="flex-1">
              <pre className="text-[15px] leading-relaxed text-[var(--text-secondary)] whitespace-pre-wrap selection:bg-violet-500/30">
                {active === "Prompt" ? (
                  <span className="block">
                    <span className="text-violet-400">Ultra-cinematic</span> sci-fi storm sequence, <br />
                    a <span className="text-emerald-400">glowing green</span> containment canister being <span className="text-red-400">violently ejected</span> from <br />
                    the open rear airlock of a <span className="text-blue-400">sleek silver</span> alien spacecraft...
                    <div className="mt-4 opacity-80">{promptText.split("\n").slice(3).join("\n")}</div>
                  </span>
                ) : active === "Negative Prompt" ? (
                  <span className="text-red-400/80 italic">
                    low quality, blurry, distorted anatomy, extra objects, unreadable text, bad composition
                  </span>
                ) : (
                  <code className="text-emerald-400">
                    {JSON.stringify({ model: "Seedream 5", size: "3072x3072", quality: 4.5 }, null, 2)}
                  </code>
                )}
              </pre>
           </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between px-8 py-4 bg-white/[0.01] border-t border-white/5">
         <div className="flex items-center gap-4 text-[12px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5"><Sparkles size={12} /> 240 Tokens</span>
            <span className="flex items-center gap-1.5"><Code2 size={12} /> Seed: 420912384</span>
         </div>
         <button className="text-[12px] font-bold text-violet-400 hover:text-violet-300 transition-colors uppercase tracking-wider">
           Expand View
         </button>
      </div>
    </section>
  );
}

const promptText = `Ultra-cinematic sci-fi storm sequence,
a glowing green containment canister being violently ejected from
the open rear airlock of a sleek silver alien spacecraft during
atmospheric descent,
the craft flying through raging thunderclouds and torrential rain,
rear hatch partially open as the cylindrical canister tumbles
backward into the storm,
bright emerald liquid swirling inside the transparent container,
lightning flashes illuminating the canister and underside of the ship,
rain streaking across the frame,
blue engine thrusters blazing downward through dense clouds,
atmospheric turbulence and motion blur creating extreme speed and
danger,
no characters visible, only the canister and the ship,
dramatic perspective from behind and below the craft,
cinematic realism, Unreal Engine 5 quality, volumetric storm clouds,
reflective metallic surfaces, emotional sacrificial sci-fi moment,
60fps cinematic frame, immersive science fiction atmosphere.`;

import { Code2, Copy, Sparkles } from "lucide-react";
