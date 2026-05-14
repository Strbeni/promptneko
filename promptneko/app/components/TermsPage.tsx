"use client";

import { FileText, Scale, CheckCircle2, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarketplaceLayout } from "./MarketplaceLayout";

export function TermsPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);

  return (
    <MarketplaceLayout
      activeNav="Terms"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => router.push(`/explore?q=${encodeURIComponent(query)}`)}
      onAction={(a) => setDrawerAction(a)}
    >
      <div className="flex-1 overflow-y-auto px-6 pb-12 pt-5 min-h-0">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="border-b border-white/5 pb-6 mb-8">
            <span className="text-[#00d9a8] text-[12px] font-bold tracking-wider uppercase bg-[#00d9a8]/10 px-3 py-1 rounded-full">
              Legal Agreement
            </span>
            <h1 className="m-0 mt-3 text-[32px] font-extrabold text-white tracking-tight flex items-center gap-3">
              <FileText className="text-[#00d9a8]" size={32} />
              Terms of Service
            </h1>
            <p className="m-0 mt-2 text-[14px] text-[#8090b4]">
              Effective Date: May 14, 2026. Please read these terms carefully before accessing our prompt marketplace.
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-8 text-[#a0b0d0] text-[14px] leading-relaxed">
            <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5">
              <h2 className="text-white text-[18px] font-bold m-0 mb-3 flex items-center gap-2">
                <Scale className="text-[#00d9a8]" size={20} />
                1. Acceptance of Terms & Marketplace Access
              </h2>
              <p className="m-0">
                By accessing, browsing, testing variables, or purchasing creative assets on PromptNeko, you agree to be bound unconditionally by these operational Terms of Service. If you do not accept these operational stipulations in their entirety, you must immediately suspend all access to our programmatic interfaces and asset catalogs.
              </p>
            </section>

            <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5 space-y-3">
              <h2 className="text-white text-[18px] font-bold m-0 flex items-center gap-2">
                <CheckCircle2 className="text-[#a46aff]" size={20} />
                2. Licensing & Intellectual Property Rights
              </h2>
              <p className="m-0">
                All prompt text files, variables, structural instructions, and system parameters listed within our marketplace are protected by digital copyright protections. 
              </p>
              <ul className="list-disc list-inside m-0 space-y-1 text-[#8090b4]">
                <li>Purchased prompts grant the buyer a non-exclusive commercial license to utilize the string logic to generate client or internal application outputs.</li>
                <li>Buyers are strictly prohibited from reselling, redistributing, or mirroring raw unedited string outputs onto rival prompt marketplace interfaces.</li>
              </ul>
            </section>

            <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5 space-y-3">
              <h2 className="text-white text-[18px] font-bold m-0 flex items-center gap-2">
                <AlertTriangle className="text-[#ff9f21]" size={20} />
                3. Content Standards & Acceptable Use Policy
              </h2>
              <p className="m-0">
                Users agree to interact with generation tools responsibly. You shall not submit negative weights arrays or string configurations designed to bypass target engine model guardrails to generate explicit, illegal, defamatory, or deceptive imagery/code outputs.
              </p>
            </section>

            <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5">
              <h2 className="text-white text-[18px] font-bold m-0 mb-3">
                4. Disclaimer of Warranties & Limitation of Liability
              </h2>
              <p className="m-0">
                Because underlying target generative AI engines (including Midjourney, FLUX, Runway, and Luma) update their parameters and model routing independently, PromptNeko cannot guarantee static pixel-perfect recreation outcomes perpetually. Assets are provided on an &quot;as-is&quot; basis without express or implied warranty representations.
              </p>
            </section>
          </div>
        </div>
      </div>

          </MarketplaceLayout>
  );
}
