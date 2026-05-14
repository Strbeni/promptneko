"use client";

import { Cookie, ShieldAlert, Settings, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarketplaceLayout } from "./MarketplaceLayout";

export function CookiePolicyPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);

  // Function to manually trigger the Google CMP message
  // In a real app, this would use the CMP's javascript API, e.g., googlefc.callbackQueue.push(googlefc.showRevocationMessage)
  const triggerConsentManagement = () => {
    alert("This action will open the Google CMP consent management interface in production.");
  };

  return (
    <MarketplaceLayout
      activeNav="Cookies"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => router.push(`/explore?q=${encodeURIComponent(query)}`)}
      onAction={(a) => setDrawerAction(a)}
    >
      <div className="flex-1 overflow-y-auto px-6 pb-12 pt-5 min-h-0">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="border-b border-white/5 pb-6 mb-8">
            <span className="text-[#ff9f21] text-[12px] font-bold tracking-wider uppercase bg-[#ff9f21]/10 px-3 py-1 rounded-full">
              Legal Disclosure
            </span>
            <h1 className="m-0 mt-3 text-[32px] font-extrabold text-white tracking-tight flex items-center gap-3">
              <Cookie className="text-[#ff9f21]" size={32} />
              Cookie Policy & Consent
            </h1>
            <p className="m-0 mt-2 text-[14px] text-[#8090b4]">
              Detailed information on how PromptNeko uses cookies, trackers, and manages your consent preferences.
            </p>
          </div>

          {/* Manage Consent Banner */}
          <div className="bg-gradient-to-r from-[#7b3cff]/10 to-[#6530e9]/5 border border-[#7b3cff]/20 p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-white text-[18px] font-bold m-0 mb-1 flex items-center gap-2">
                <Settings className="text-[#a46aff]" size={18} />
                Manage Your Consent
              </h2>
              <p className="text-[#a0b0d0] text-[14px] m-0">
                Update your preferences or withdraw your consent for personalized advertising and analytics cookies.
              </p>
            </div>
            <button 
              onClick={triggerConsentManagement}
              className="shrink-0 bg-[#a46aff] hover:bg-[#8751ff] text-white px-5 py-2.5 rounded-xl font-bold text-[14px] transition-colors"
            >
              Update Preferences
            </button>
          </div>

          {/* Content sections */}
          <div className="space-y-8 text-[#a0b0d0] text-[14px] leading-relaxed">
            <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5">
              <h2 className="text-white text-[18px] font-bold m-0 mb-3 flex items-center gap-2">
                <Info className="text-[#00d9a8]" size={20} />
                1. What are cookies?
              </h2>
              <p className="m-0">
                Cookies are small text files that are stored on your browser or device by websites, apps, online media, and advertisements. They are widely used to remember you and your preferences, either for a single visit (through a "session cookie") or for multiple repeat visits (using a "persistent cookie").
              </p>
            </section>

            <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5 space-y-4">
              <h2 className="text-white text-[18px] font-bold m-0 flex items-center gap-2">
                <ShieldAlert className="text-[#ff4f9d]" size={20} />
                2. Types of Cookies We Use
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border-l-2 border-[#00d9a8]">
                  <h3 className="text-white text-[15px] font-bold m-0 mb-1">Essential Cookies</h3>
                  <p className="m-0 text-[#8090b4]">These are necessary for the website to function properly. They include cookies that enable you to log into secure areas, use a shopping cart, or make use of e-billing services. You cannot opt out of these.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border-l-2 border-[#ff9f21]">
                  <h3 className="text-white text-[15px] font-bold m-0 mb-1">Advertising & Google AdSense</h3>
                  <p className="m-0 text-[#8090b4] mb-2">We use Google AdSense to serve contextual and personalized ads. Google and its third-party vendors use cookies to serve ads based on your prior visits to our website or other websites.</p>
                  <ul className="list-disc list-inside m-0 text-[#8090b4] text-[13px] space-y-1">
                    <li>The DoubleClick DART cookie enables Google to serve targeted ads.</li>
                    <li>You can manage Google's ad personalization via <a href="https://adssettings.google.com/" className="text-[#a46aff] hover:underline" target="_blank" rel="noreferrer">Google Ad Settings</a>.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border-l-2 border-[#7b3cff]">
                  <h3 className="text-white text-[15px] font-bold m-0 mb-1">Analytics & Performance</h3>
                  <p className="m-0 text-[#8090b4]">These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works.</p>
                </div>
              </div>
            </section>

            <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5">
              <h2 className="text-white text-[18px] font-bold m-0 mb-3">
                3. Consent Management Platform (CMP)
              </h2>
              <p className="m-0">
                To comply with the GDPR (General Data Protection Regulation) and UK/Swiss equivalents, we use a Google-certified Consent Management Platform. When you first visit our site from a regulated region, you are presented with a clear choice to consent to, or reject, non-essential cookies. Your preferences are recorded and strictly adhered to. You can change these settings at any time using the "Update Preferences" button at the top of this page.
              </p>
            </section>
          </div>
        </div>
      </div>

          </MarketplaceLayout>
  );
}
