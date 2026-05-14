"use client";

import { Info, Cpu, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarketplaceLayout } from "./MarketplaceLayout";

export function AboutPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);

  return (
    <MarketplaceLayout
      activeNav="About"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => router.push(`/explore?q=${encodeURIComponent(query)}`)}
      onAction={(a) => setDrawerAction(a)}
    >
      <div className="flex-1 overflow-y-auto px-6 pb-12 pt-5 min-h-0">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="border-b border-white/5 pb-6 mb-8 text-center">
            <h1 className="m-0 text-[40px] font-extrabold text-white tracking-tight flex items-center justify-center gap-4">
              <Info className="text-[#00d9a8]" size={36} />
              About PromptNeko
            </h1>
            <p className="m-0 mt-3 text-[16px] text-[#8090b4] max-w-2xl mx-auto leading-relaxed">
              We are building the premier destination for production-grade AI prompts, empowering creators and engineers to build extraordinary things with artificial intelligence.
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-8 text-[#a0b0d0] text-[15px] leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0c1120] p-6 rounded-2xl border border-white/5 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#7b3cff]/10 flex items-center justify-center mb-4">
                  <Zap className="text-[#a46aff]" size={24} />
                </div>
                <h3 className="text-white text-[16px] font-bold m-0 mb-2">High-Utility Focus</h3>
                <p className="text-[#8090b4] text-[13px] m-0">We curate prompts that solve real-world professional problems, not just generic visual experiments.</p>
              </div>
              <div className="bg-[#0c1120] p-6 rounded-2xl border border-white/5 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#00d9a8]/10 flex items-center justify-center mb-4">
                  <Cpu className="text-[#00d9a8]" size={24} />
                </div>
                <h3 className="text-white text-[16px] font-bold m-0 mb-2">Engine Agnostic</h3>
                <p className="text-[#8090b4] text-[13px] m-0">Our marketplace spans Midjourney, FLUX, Claude, GPT-4o, and Runway for a comprehensive AI toolkit.</p>
              </div>
              <div className="bg-[#0c1120] p-6 rounded-2xl border border-white/5 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#ff9f21]/10 flex items-center justify-center mb-4">
                  <Users className="text-[#ff9f21]" size={24} />
                </div>
                <h3 className="text-white text-[16px] font-bold m-0 mb-2">Elite Community</h3>
                <p className="text-[#8090b4] text-[13px] m-0">An invite-only roster of prompt architects guarantees the highest baseline quality in the industry.</p>
              </div>
            </div>

            <section className="bg-[#0c1120] p-8 rounded-3xl border border-white/5 mt-8">
              <h2 className="text-white text-[22px] font-bold m-0 mb-4">Our Mission</h2>
              <p className="mb-4">
                The shift towards generative AI is the most significant technological leap of our generation. However, the true power of these models is often locked behind esoteric prompting techniques and undocumented parameter behaviors.
              </p>
              <p className="mb-4">
                At PromptNeko, our mission is to democratize advanced AI utilization. We bridge the gap between complex machine learning capabilities and practical, production-ready implementation by providing a centralized, quality-controlled marketplace of expert-crafted prompt blueprints.
              </p>
              <p className="m-0">
                Whether you are a solo developer building a SaaS application, an agency director planning a global campaign, or a motion designer rendering cinematic sequences, PromptNeko gives you the foundation to execute flawlessly.
              </p>
            </section>
          </div>
        </div>
      </div>

          </MarketplaceLayout>
  );
}
