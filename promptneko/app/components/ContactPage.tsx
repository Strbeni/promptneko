"use client";

import { Mail, MessageSquare, MapPin, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarketplaceLayout } from "./MarketplaceLayout";

export function ContactPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);

  return (
    <MarketplaceLayout
      activeNav="Contact"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => router.push(`/explore?q=${encodeURIComponent(query)}`)}
      onAction={(a) => setDrawerAction(a)}
    >
      <div className="flex-1 overflow-y-auto px-6 pb-12 pt-5 min-h-0">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="border-b border-white/5 pb-6 mb-8">
            <span className="text-[#ff4f9d] text-[12px] font-bold tracking-wider uppercase bg-[#ff4f9d]/10 px-3 py-1 rounded-full">
              Get In Touch
            </span>
            <h1 className="m-0 mt-3 text-[32px] font-extrabold text-white tracking-tight flex items-center gap-3">
              <MessageSquare className="text-[#ff4f9d]" size={32} />
              Contact Us
            </h1>
            <p className="m-0 mt-2 text-[14px] text-[#8090b4]">
              Have a question about a prompt, our platform, or enterprise licensing? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5 flex items-start gap-4 hover:border-white/10 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#7b3cff]/10 flex items-center justify-center shrink-0">
                  <Mail className="text-[#a46aff]" size={20} />
                </div>
                <div>
                  <h2 className="text-white text-[16px] font-bold m-0 mb-1">Email Support</h2>
                  <p className="m-0 text-[#8090b4] text-[13px] mb-2">Our team typically responds within 24 hours.</p>
                  <a href="mailto:support@promptneko.com" className="text-[#a46aff] hover:text-white font-medium text-[14px] transition-colors">
                    support@promptneko.com
                  </a>
                </div>
              </section>

              <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5 flex items-start gap-4 hover:border-white/10 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#00d9a8]/10 flex items-center justify-center shrink-0">
                  <Globe className="text-[#00d9a8]" size={20} />
                </div>
                <div>
                  <h2 className="text-white text-[16px] font-bold m-0 mb-1">Partnerships & Business</h2>
                  <p className="m-0 text-[#8090b4] text-[13px] mb-2">For agency inquiries, volume licensing, and press.</p>
                  <a href="mailto:business@promptneko.com" className="text-[#00d9a8] hover:text-white font-medium text-[14px] transition-colors">
                    business@promptneko.com
                  </a>
                </div>
              </section>

              <section className="bg-[#0c1120] p-6 rounded-2xl border border-white/5 flex items-start gap-4 hover:border-white/10 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#ff9f21]/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-[#ff9f21]" size={20} />
                </div>
                <div>
                  <h2 className="text-white text-[16px] font-bold m-0 mb-1">Headquarters</h2>
                  <p className="m-0 text-[#8090b4] text-[13px] leading-relaxed">
                    PromptNeko Inc.<br />
                    123 AI Boulevard, Tech District<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </section>
            </div>

            {/* Contact Form Placeholder */}
            <div className="bg-[#0c1120] p-6 rounded-2xl border border-white/5">
              <h2 className="text-white text-[18px] font-bold m-0 mb-4">Send us a message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[#8090b4] text-[12px] font-semibold mb-1">Name</label>
                  <input type="text" className="w-full bg-[#050813] border border-white/10 rounded-xl px-4 py-2.5 text-white text-[14px] focus:outline-none focus:border-[#a46aff] transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-[#8090b4] text-[12px] font-semibold mb-1">Email</label>
                  <input type="email" className="w-full bg-[#050813] border border-white/10 rounded-xl px-4 py-2.5 text-white text-[14px] focus:outline-none focus:border-[#a46aff] transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-[#8090b4] text-[12px] font-semibold mb-1">Message</label>
                  <textarea rows={5} className="w-full bg-[#050813] border border-white/10 rounded-xl px-4 py-2.5 text-white text-[14px] focus:outline-none focus:border-[#a46aff] transition-colors resize-none" placeholder="How can we help?" />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-[#7b3cff] to-[#6530e9] hover:from-[#8751ff] hover:to-[#7b3cff] text-white font-bold text-[14px] py-3 rounded-xl transition-all shadow-[0_4px_14px_rgba(123,60,255,0.3)]">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

          </MarketplaceLayout>
  );
}
