"use client";

import {
  WandSparkles,
  Sparkles,
  Layers,
  Sliders,
  Code,
  Terminal,
  Cpu,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActionDrawer } from "./ActionDrawer";
import { MarketplaceLayout } from "./MarketplaceLayout";

export function ToolsPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);

  const toolsList = [
    {
      title: "Prompt Optimizer",
      desc: "Automatically refines structural keywords and balances weights for midjourney and stable diffusion models.",
      icon: Sliders,
      badge: "Beta",
      color: "#a46aff"
    },
    {
      title: "Variable Injector CLI",
      desc: "Test structured variable templates locally against pre-configured system engine endpoints.",
      icon: Terminal,
      badge: "Coming Soon",
      color: "#00d9a8"
    },
    {
      title: "Negative Prompt Sanitizer",
      desc: "Filters common redundant style artifacts and outputs crisp anti-weights arrays.",
      icon: WandSparkles,
      badge: "v1.2",
      color: "#ff9f21"
    },
    {
      title: "Engine Compatibility Analyzer",
      desc: "Cross-checks prompt syntax tokens against FLUX, Midjourney v6, and DALL-E parameter constraints.",
      icon: Cpu,
      badge: "New",
      color: "#ff4f9d"
    }
  ];

  return (
    <MarketplaceLayout
      activeNav="Tools"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => router.push(`/explore?q=${encodeURIComponent(query)}`)}
      onAction={(a) => setDrawerAction(a)}
    >
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-5 min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="m-0 text-[28px] font-extrabold text-white tracking-tight flex items-center gap-3">
              <WandSparkles className="text-[#a46aff]" size={28} />
              Creator Studio Tools
            </h1>
            <p className="m-0 mt-1.5 text-[13px] text-[#6070a0]">
              Advanced utility toolkits designed to audit, optimize, and test complex prompt frameworks.
            </p>
          </div>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolsList.map((t, idx) => (
            <div 
              key={idx}
              className="relative flex flex-col justify-between p-5 rounded-2xl bg-[#0c1120] border border-white/5 hover:border-white/10 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5"
                    style={{ color: t.color }}
                  >
                    <t.icon size={20} />
                  </div>
                  <span 
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded border"
                    style={{ color: t.color, borderColor: `${t.color}30`, backgroundColor: `${t.color}10` }}
                  >
                    {t.badge}
                  </span>
                </div>
                <h3 className="text-white text-[15px] font-bold m-0 mb-1 group-hover:text-[#a46aff] transition-colors">{t.title}</h3>
                <p className="text-[#8090b4] text-[12px] m-0 leading-relaxed">{t.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-[#5060a0]">Integrated utility suite</span>
                <button 
                  onClick={() => setDrawerAction(t.title)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Launch Tool
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}
