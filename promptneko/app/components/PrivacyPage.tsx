"use client";

import { ShieldCheck, Lock, Eye, Database, Cookie } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarketplaceLayout } from "./MarketplaceLayout";

export function PrivacyPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);

  return (
    <MarketplaceLayout
      activeNav="Privacy"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => router.push(`/explore?q=${encodeURIComponent(query)}`)}
      onAction={(a) => setDrawerAction(a)}
    >
      <div className="flex-1 overflow-y-auto px-6 pb-12 pt-5 min-h-0">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="border-b border-white/5 pb-6 mb-8">
            <span className="text-[#a46aff] text-[12px] font-bold tracking-wider uppercase bg-[#a46aff]/10 px-3 py-1 rounded-full">
              Legal Disclosure
            </span>
            <h1 className="m-0 mt-3 text-[32px] font-extrabold text-white tracking-tight flex items-center gap-3">
              <ShieldCheck className="text-[#a46aff]" size={32} />
              Privacy Policy
            </h1>
            <p className="m-0 mt-2 text-[14px] text-[#8090b4]">
              Effective Date: May 14, 2026. Last Updated: May 14, 2026.
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-8 text-[#a0b0d0] text-[14px] leading-relaxed">
            <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5">
              <h2 className="text-white text-[18px] font-bold m-0 mb-3 flex items-center gap-2">
                <Eye className="text-[#a46aff]" size={20} />
                1. Introduction & Overview
              </h2>
              <p className="m-0">
                Welcome to PromptNeko. We respect your personal privacy and are committed to maintaining full transparency regarding how we collect, utilize, process, and protect your personal information when you access our marketplace, APIs, and community tools.
              </p>
            </section>

            <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5 space-y-4">
              <h2 className="text-white text-[18px] font-bold m-0 flex items-center gap-2">
                <Cookie className="text-[#ff9f21]" size={20} />
                2. Advertising & Google AdSense Cookies
              </h2>
              <p className="m-0">
                We use Google AdSense and third-party vendor advertising networks to serve relevant contextual advertisements when you visit our website. These external companies may utilize anonymous data tracking tokens (not including your name, physical address, email address, or telephone number) regarding your browsing actions on this and other digital platforms to provide highly tailored promotional inventory about products and services of interest to you.
              </p>
              <div className="p-4 rounded-xl bg-white/5 space-y-2 border-l-2 border-[#ff9f21]">
                <h3 className="text-white text-[14px] font-bold m-0">Google DoubleClick DART Cookie Policy:</h3>
                <ul className="list-disc list-inside m-0 space-y-1 text-[#8090b4]">
                  <li>Google, acting as a third-party advertisement vendor, uses custom cookies to serve ads on PromptNeko.</li>
                  <li>Google's deployment of DART cookies enables it to serve dynamic ads to our audience based on their historical site visits across the broader internet.</li>
                  <li>Users may immediately opt out of the deployment of the DART cookie by visiting the official <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer" className="text-[#a46aff] underline hover:text-white">Google Ad and Content Network Privacy Policy</a>.</li>
                </ul>
              </div>
            </section>

            <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5">
              <h2 className="text-white text-[18px] font-bold m-0 mb-3 flex items-center gap-2">
                <Database className="text-[#00d9a8]" size={20} />
                3. Data Collection & Consent Management (CMP)
              </h2>
              <p className="m-0">
                In strict adherence to the General Data Protection Regulation (GDPR) and regional guidelines established within the European Economic Area (EEA), the United Kingdom, and Switzerland, PromptNeko utilizes a fully certified Google Consent Management Platform (CMP). When accessing our platform from applicable jurisdictions, you are presented with explicit consent options regarding data collection for tracking, analytical diagnostic profiling, and personalized ad selection. You retain the unencumbered right to manage, adjust, or fully withdraw your processing parameters at any point via our global consent toggle interface.
              </p>
            </section>

            <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5">
              <h2 className="text-white text-[18px] font-bold m-0 mb-3 flex items-center gap-2">
                <Lock className="text-[#ff4f9d]" size={20} />
                4. Third-Party Vendor Data Transmission
              </h2>
              <p className="m-0">
                Our application incorporates secure direct integration scripts referencing verified authentication providers, database layers, and certified ad exchange networks. Information collected is shared strictly with infrastructure service providers operating under rigorous data processing agreements to guarantee continuous data integrity, network uptime availability, and robust zero-trust access control protocols.
              </p>
            </section>

            <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5">
              <h2 className="text-white text-[18px] font-bold m-0 mb-3">
                5. Direct Contact & Remediation Channels
              </h2>
              <p className="m-0">
                If you have specific inquiries concerning these privacy declarations, direct programmatic cookie interactions, or GDPR data erasure requests, please contact our administrative data operations team at <span className="text-white font-mono">privacy@promptneko.com</span>.
              </p>
            </section>
          </div>
        </div>
      </div>

          </MarketplaceLayout>
  );
}
