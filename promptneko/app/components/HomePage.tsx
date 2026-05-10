"use client";

import {
  ArrowRight, Bookmark, ChevronRight, Eye, Flame, Heart,
  Lightbulb, Play, Search, Sparkles, Star, TrendingUp, Wand2, Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  trendingPrompts, useCaseCategories, viralContentPrompts,
  websiteUiPrompts, brandingPrompts, productAdPrompts,
  socialReelPrompts, animeArtPrompts, codingPrompts,
  topCreators, howItWorks,
  type PromptCardItem,
} from "./marketplace-data";

type HomePageProps = { setDrawerAction: (a: string | null) => void };

const heroPlaceholders = [
  'e.g. "product ad", "anime girl"',
  'e.g. "SaaS landing page"',
  'e.g. "luxury perfume ad"',
  'e.g. "banana drama video"',
];
const popularPills = ["Landing Page", "Anime", "Logo Design", "Cinematic", "UI Design", "Product Ad"];

/* ═══ PROMPT CARD (inline for pixel control) ═══ */
function PromptCardInline({ item, badge }: { item: PromptCardItem; badge?: string }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/prompt/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`)}
      style={{
        background: "var(--surface)", border: "1px solid var(--border-soft)", borderRadius: 14,
        overflow: "hidden", cursor: "pointer", transition: "all 0.22s ease",
      }}
      onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-hover)"; }}
      onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
    >
      {/* Image area */}
      <div style={{ position: "relative", height: 155, overflow: "hidden" }}>
        <div className={`w-full h-full bg-gradient-to-br ${item.gradient}`} style={{ transition: "transform 0.3s" }} />
        {/* Category badge */}
        {badge && (
          <span style={{
            position: "absolute", top: 8, left: 8, padding: "3px 8px", borderRadius: 6,
            background: item.category.includes("Product") ? "#E8F5E9" : item.category.includes("Website") || item.category.includes("SaaS") ? "#E3F2FD" : item.category.includes("Reel") || item.category.includes("Viral") || item.category.includes("TikTok") ? "#FFF3E0" : item.category.includes("Anime") || item.category.includes("Ghibli") ? "#F3E5F5" : item.category.includes("Logo") || item.category.includes("Brand") ? "#FBE9E7" : "#F5F5F5",
            color: item.category.includes("Product") ? "#2E7D32" : item.category.includes("Website") || item.category.includes("SaaS") ? "#1565C0" : item.category.includes("Reel") || item.category.includes("Viral") || item.category.includes("TikTok") ? "#E65100" : item.category.includes("Anime") || item.category.includes("Ghibli") ? "#7B1FA2" : item.category.includes("Logo") || item.category.includes("Brand") ? "#BF360C" : "#616161",
            fontSize: 10, fontWeight: 600,
          }}>
            {badge}
          </span>
        )}
        {/* Bookmark */}
        <button style={{
          position: "absolute", top: 8, right: 8, width: 26, height: 26, borderRadius: 7,
          background: "rgba(255,255,255,0.85)", display: "flex", alignItems: "center", justifyContent: "center",
          color: "#9E9E9E", border: 0,
        }}>
          <Bookmark size={12} />
        </button>
        {/* Video badge */}
        {item.isVideo && (
          <span style={{
            position: "absolute", bottom: 8, left: 8, display: "flex", alignItems: "center", gap: 4,
            padding: "3px 8px", borderRadius: 6, background: "rgba(0,0,0,0.55)", color: "white", fontSize: 10, fontWeight: 600,
          }}>
            <Play size={8} fill="white" /> Video
          </span>
        )}
      </div>
      {/* Meta */}
      <div style={{ padding: "9px 11px 11px" }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 4 }}>
          {item.title}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)" }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "linear-gradient(135deg,#7B3CFF,#9B6DFF)", flexShrink: 0 }} />
          <span>{item.creator}</span>
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 3 }}>
            <Heart size={10} /> {item.saves}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══ SECTION HEADER ═══ */
function SH({ icon, title, href }: { icon?: React.ReactNode; title: string; href?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        {icon}
        <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>{title}</h2>
      </div>
      {href && <a href={href} style={{ fontSize: 12, fontWeight: 500, color: "var(--accent)" }}>View all</a>}
    </div>
  );
}

/* ═══ MAIN HOMEPAGE ═══ */
export function HomePage({ setDrawerAction }: HomePageProps) {
  const [pidx, setPidx] = useState(0);
  useEffect(() => { const t = setInterval(() => setPidx(i => (i + 1) % heroPlaceholders.length), 3500); return () => clearInterval(t); }, []);
  const [sq, setSq] = useState("");

  return (
    <div className="main-scroll" style={{ background: "var(--bg)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>

        {/* ═══ 1. HERO ═══ */}
        <section style={{
          position: "relative", height: 260, borderRadius: 16, overflow: "hidden", marginBottom: 18,padding:"20px 42px",
          background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
        }}>
          {/* Orbs */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 350, height: 350, borderRadius: "50%", opacity: 0.2, background: "radial-gradient(circle,#7B3CFF,transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -40, right: 160, width: 250, height: 250, borderRadius: "50%", opacity: 0.12, background: "radial-gradient(circle,#9B6DFF,transparent 70%)", pointerEvents: "none" }} />
          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", height: "100%", padding: "0 36px" }}>
            <div style={{ flex: 1, maxWidth: 480 }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>
                AI Creativity, Unlimited Possibilities
              </p>
              <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15, color: "white", marginBottom: 12, letterSpacing: "-0.02em" }}>
                Discover. Create.<br />Bring <span style={{ color: "#A78BFA" }}>Ideas</span> to Life.
              </h1>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", marginBottom: 16, maxWidth: 400 }}>
                Explore amazing AI prompts with real examples. Copy, customize and create something incredible.
              </p>
              {/* Search */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8, height: 38, padding: "0 4px 0 14px",
                borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
              }}>
                <Search size={14} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                <input
                  value={sq} onChange={e => setSq(e.target.value)}
                  placeholder={heroPlaceholders[pidx]}
                  style={{ flex: 1, border: 0, outline: "none", background: "transparent", color: "white", fontSize: 12, fontFamily: "inherit" }}
                  onKeyDown={e => e.key === "Enter" && setDrawerAction(`Search: ${sq}`)}
                />
                <button onClick={() => setDrawerAction(`Search: ${sq}`)} style={{
                  width: 32, height: 30, borderRadius: 8, background: "var(--accent)", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Search size={13} />
                </button>
              </div>
              {/* Popular pills */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Popular right now:</span>
                {popularPills.map(p => (
                  <button key={p} style={{
                    height: 22, padding: "0 9px", borderRadius: 999, fontSize: 10, fontWeight: 500,
                    background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)",
                  }}>{p}</button>
                ))}
              </div>
            </div>
            {/* Right art mosaic (simplified) */}
            <div className="hidden lg:block" style={{ width: 300, flexShrink: 0, marginLeft: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {[
                  { g: "from-indigo-400 to-purple-600", h: 105 },
                  { g: "from-amber-300 to-pink-500", h: 105 },
                  { g: "from-emerald-400 to-cyan-600", h: 80 },
                  { g: "from-yellow-300 to-red-500", h: 80 },
                  { g: "from-fuchsia-400 to-violet-700", h: 68 },
                  { g: "from-sky-400 to-indigo-600", h: 68 },
                ].map((t, i) => (
                  <div key={i} className={`bg-gradient-to-br ${t.g}`} style={{ height: t.h, borderRadius: 10, opacity: 0.85 }} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ VALUE PROPS ═══ */}
        <section style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 22,
        }}>
          {[
            { icon: <Eye size={16} />, title: "Real Outputs", sub: "See what's possible" },
            { icon: <Lightbulb size={16} />, title: "Proven Prompts", sub: "Tested and working" },
            { icon: <Wand2 size={16} />, title: "Easy to Customize", sub: "Edit & make it yours" },
            { icon: <Zap size={16} />, title: "Generate Instantly", sub: "Create in seconds" },
          ].map(v => (
            <div key={v.title} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
              background: "var(--surface)", border: "1px solid var(--border-soft)", borderRadius: 12,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: "var(--lavender)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0,
              }}>{v.icon}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{v.title}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>{v.sub}</div>
              </div>
            </div>
          ))}
        </section>

        {/* ═══ 2. TRENDING PROMPTS ═══ */}
        <section style={{ marginBottom: 22 }}>
          <SH icon={<Flame size={16} style={{ color: "#FF6B35" }} />} title="Trending Prompts" href="/explore" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
            {trendingPrompts.slice(0, 5).map(p => (
              <PromptCardInline key={p.title} item={p} badge={p.category} />
            ))}
          </div>
        </section>

        {/* ═══ 3. BROWSE BY USE CASE ═══ */}
        <section style={{ marginBottom: 22 }}>
          <SH title="Browse by Use Case" href="/categories" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10 }}>
            {useCaseCategories.map(({ label, icon: Icon, gradient, count, href }) => (
              <a key={label} href={href} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "16px 8px",
                background: "var(--surface)", border: "1px solid var(--border-soft)", borderRadius: 12, textDecoration: "none",
                transition: "all 0.15s",
              }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-soft)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                <div className={`bg-gradient-to-br ${gradient}`} style={{
                  width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                }}>
                  <Icon size={18} />
                </div>
                <strong style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", textAlign: "center" }}>{label}</strong>
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{count} Prompts</span>
              </a>
            ))}
          </div>
        </section>

        {/* ═══ 4. VIRAL AI CONTENT ═══ */}
        <section style={{ marginBottom: 22 }}>
          <SH icon={<TrendingUp size={15} style={{ color: "#FF6B35" }} />} title="Viral AI Creations" href="/create/social" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
            {viralContentPrompts.slice(0, 5).map(p => (
              <PromptCardInline key={p.title} item={p} badge={p.category} />
            ))}
          </div>
        </section>

        {/* ═══ 5. WEBSITES & UI ═══ */}
        <section style={{ marginBottom: 22 }}>
          <SH title="Websites & UI" href="/create/website" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
            {websiteUiPrompts.map(p => <PromptCardInline key={p.title} item={p} badge={p.category} />)}
          </div>
        </section>

        {/* ═══ 6. BRANDING & LOGOS ═══ */}
        <section style={{ marginBottom: 22 }}>
          <SH title="Branding & Logos" href="/create/branding" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
            {brandingPrompts.map(p => <PromptCardInline key={p.title} item={p} badge={p.category} />)}
          </div>
        </section>

        {/* ═══ 7. PRODUCT ADS ═══ */}
        <section style={{ marginBottom: 22 }}>
          <SH title="Product Ads" href="/create/ads" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
            {productAdPrompts.map(p => <PromptCardInline key={p.title} item={p} badge={p.category} />)}
          </div>
        </section>

        {/* ═══ 8. SOCIAL MEDIA & REELS ═══ */}
        <section style={{ marginBottom: 22 }}>
          <SH title="Social Media & Reels" href="/create/social" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
            {socialReelPrompts.map(p => <PromptCardInline key={p.title} item={p} badge={p.category} />)}
          </div>
        </section>

        {/* ═══ 9. ANIME & ART ═══ */}
        <section style={{ marginBottom: 22 }}>
          <SH title="Anime & Art" href="/create/anime" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
            {animeArtPrompts.map(p => <PromptCardInline key={p.title} item={p} badge={p.category} />)}
          </div>
        </section>

        {/* ═══ 10. CODING & DEVELOPMENT ═══ */}
        <section style={{ marginBottom: 22 }}>
          <SH title="Coding & Development" href="/create/coding" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
            {codingPrompts.map(p => <PromptCardInline key={p.title} item={p} badge={p.category} />)}
          </div>
        </section>

        {/* ═══ 11. TOP CREATORS ═══ */}
        <section style={{ marginBottom: 22 }}>
          <SH title="Top Creators" href="/creators" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10 }}>
            {topCreators.map(c => (
              <div key={c.handle} style={{
                display: "flex", alignItems: "center", gap: 9, padding: "10px 12px",
                background: "var(--surface)", border: "1px solid var(--border-soft)", borderRadius: 12,
                cursor: "pointer", transition: "all 0.15s",
              }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-soft)"; }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                  background: `linear-gradient(135deg, ${c.gradient.includes("indigo") ? "#7B3CFF,#9B6DFF" : c.gradient.includes("amber") ? "#F59E0B,#EF4444" : c.gradient.includes("emerald") ? "#10B981,#06B6D4" : c.gradient.includes("stone") ? "#78716C,#F59E0B" : c.gradient.includes("yellow") ? "#EAB308,#F97316" : "#3B82F6,#7B3CFF"})`,
                  display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700,
                }}>{c.name[0]}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.handle}</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{c.followers} Followers</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 12. HOW IT WORKS ═══ */}
        <section style={{ marginBottom: 22 }}>
          <SH icon={<Sparkles size={15} style={{ color: "var(--accent)" }} />} title="How it Works" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {howItWorks.map((s, i) => (
              <div key={s.step} style={{
                display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 14px",
                background: "var(--surface)", border: "1px solid var(--border-soft)", borderRadius: 12,
              }}>
                <div className={`bg-gradient-to-br ${s.gradient}`} style={{
                  width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                }}>
                  <s.icon size={17} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", marginBottom: 3 }}>{s.title}</div>
                  <div style={{ fontSize: 11, lineHeight: 1.45, color: "var(--text-muted)" }}>{s.description}</div>
                </div>
                {i < 3 && <ArrowRight size={14} style={{ color: "var(--text-muted)", marginTop: 8, flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 13. CTA FOOTER ═══ */}
        <section style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 32px",
          borderRadius: 16, background: "linear-gradient(135deg, #1A1A2E, #2D2D5E)", marginBottom: 8,
        }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 4 }}>Ready to create something amazing?</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Join thousands of creators using the best prompts to bring their ideas to life.</p>
          </div>
          <button onClick={() => setDrawerAction("Get Started")} style={{
            height: 40, padding: "0 20px", borderRadius: 10,
            background: "var(--accent)", color: "white", fontSize: 13, fontWeight: 600, flexShrink: 0,
            boxShadow: "0 2px 12px rgba(123,60,255,0.4)",
          }}>
            Create Your First Prompt
          </button>
        </section>

      </div>
    </div>
  );
}
