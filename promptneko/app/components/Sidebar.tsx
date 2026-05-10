"use client";

import {
  Bookmark, Code2, Compass, Film, Globe, Heart, History, Home,
  LayoutDashboard, Layers3, Megaphone, Moon, Palette, Settings,
  Share2, Sun, Users, Wand2, Zap,
} from "lucide-react";
import Link from "next/link";

type SidebarProps = {
  active: string;
  theme: "light";
  onAction: (action: string) => void;
  onToggleTheme: () => void;
};

const navGroups = [
  {
    items: [
      { label: "Home", icon: Home, href: "/" },
      { label: "Explore", icon: Compass, href: "/explore" },
      { label: "Categories", icon: Layers3, href: "/categories" },
      { label: "Collections", icon: Bookmark, href: "/collections" },
      { label: "Creators", icon: Users, href: "/creators" },
    ],
  },
  {
    title: "Create",
    items: [
      { label: "Create Website", icon: Globe, href: "/create/website" },
      { label: "Branding & Logos", icon: Palette, href: "/create/branding" },
      { label: "Product Ads", icon: Megaphone, href: "/create/ads" },
      { label: "Social Media & Reels", icon: Share2, href: "/create/social" },
      { label: "UI & Dashboards", icon: LayoutDashboard, href: "/create/ui" },
      { label: "Anime & Art", icon: Wand2, href: "/create/anime" },
      { label: "Video Generation", icon: Film, href: "/create/video" },
      { label: "Coding Prompts", icon: Code2, href: "/create/coding" },
    ],
  },
  {
    title: "Your Space",
    items: [
      { label: "Saved", icon: Bookmark, href: "/saved" },
      { label: "Liked", icon: Heart, href: "/liked" },
      { label: "History", icon: History, href: "/history" },
    ],
  },
];

export function Sidebar({ active, theme, onAction, onToggleTheme }: SidebarProps) {
  return (
    <aside style={{
      display: "flex", flexDirection: "column", width: "var(--sidebar-width)", minWidth: "var(--sidebar-width)", height: "100vh",
      padding: "24px 16px", borderRight: "1px solid var(--sidebar-border)", background: "var(--sidebar-bg)",
      transition: "all 0.3s ease",
      backdropFilter: "blur(20px)",
    }}>
      {/* Logo */}
      <Link href="/" onClick={() => onAction("Home")} style={{
        display: "flex", alignItems: "center", gap: 12, height: 40, marginBottom: 32, textDecoration: "none",
        padding: "0 12px",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#8B5CF6,#6366F1)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "white",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
        }}>
          <Zap size={18} strokeWidth={2.5} />
        </div>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
          PromptNeko
        </span>
      </Link>

      {/* Nav groups */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 24 }} className="custom-scrollbar">
        {navGroups.map((group, gi) => (
          <div key={gi}>
            {group.title && (
              <div style={{
                fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
                color: "var(--text-muted)", padding: "0 12px", marginBottom: 12, height: 20, display: "flex", alignItems: "center",
              }}>
                {group.title}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {group.items.map(({ label, icon: Icon, href }) => {
                const isActive = active === label;
                return (
                  <Link key={label} href={href} onClick={() => {
                    if (href !== "/" && href !== "/explore" && href !== "/categories") onAction(label);
                  }} style={{
                    position: "relative",
                    display: "flex", alignItems: "center", gap: 12, height: 40, padding: "0 12px",
                    borderRadius: 12, fontSize: 14, fontWeight: isActive ? 600 : 500,
                    background: isActive ? "var(--sidebar-active-bg)" : "transparent",
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", textDecoration: "none",
                  }}>
                    {isActive && (
                      <div style={{
                        position: "absolute", left: -16, width: 4, height: 20, 
                        background: "var(--accent)", borderRadius: "0 4px 4px 0",
                        boxShadow: "0 0 15px var(--accent)",
                      }} />
                    )}
                    <Icon size={18} strokeWidth={isActive ? 2 : 1.5} style={{ 
                      flexShrink: 0, 
                      color: isActive ? "var(--accent)" : "var(--text-secondary)",
                      transition: "color 0.2s",
                    }} />
                    <span style={{ whiteSpace: "nowrap" }}>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom: settings / theme / profile */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 12px 0",
        borderTop: "1px solid var(--border-soft)", marginTop: 16,
      }}>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={() => onAction("Settings")} style={{ 
            width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", 
            color: "var(--text-secondary)", transition: "all 0.2s",
          }} className="hover:bg-white/5">
            <Settings size={18} strokeWidth={1.5} />
          </button>
          <button onClick={onToggleTheme} style={{ 
            width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", 
            color: "var(--text-secondary)", transition: "all 0.2s",
          }} className="hover:bg-white/5">
            {theme === "light" ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
          </button>
        </div>
        <button onClick={() => onAction("Profile")} style={{
          width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#8B5CF6,#6366F1)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700,
          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.2)",
        }}>
          L
        </button>
      </div>
    </aside>
  );
}
