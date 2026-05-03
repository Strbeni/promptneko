"use client";

import {
  Bookmark, Code2, Compass, Film, Globe, Heart, History, Home,
  LayoutDashboard, Layers3, Megaphone, Moon, Palette, Settings,
  Share2, Sun, Users, Wand2, Zap,
} from "lucide-react";
import Link from "next/link";

type SidebarProps = {
  active: string;
  theme: "light" | "dark";
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
      display: "flex", flexDirection: "column", width: 175, minWidth: 175, height: "100vh",
      padding: "14px 10px", borderRight: "1px solid var(--sidebar-border)", background: "var(--sidebar-bg)",
    }}>
      {/* Logo */}
      <Link href="/" onClick={() => onAction("Home")} style={{
        display: "flex", alignItems: "center", gap: 8, height: 36, marginBottom: 12, textDecoration: "none",
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#7B3CFF,#9B6DFF)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "white",
        }}>
          <Zap size={15} strokeWidth={2.5} />
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
          PromptHub
        </span>
      </Link>

      {/* Nav groups */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }} className="custom-scrollbar">
        {navGroups.map((group, gi) => (
          <div key={gi} style={{ marginTop: gi > 0 ? 14 : 0 }}>
            {group.title && (
              <div style={{
                fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
                color: "var(--text-muted)", padding: "0 8px", marginBottom: 4, height: 20, display: "flex", alignItems: "center",
              }}>
                {group.title}
              </div>
            )}
            {group.items.map(({ label, icon: Icon, href }) => {
              const isActive = active === label;
              return (
                <Link key={label} href={href} onClick={() => {
                  if (href !== "/" && href !== "/explore" && href !== "/categories") onAction(label);
                }} style={{
                  display: "flex", alignItems: "center", gap: 8, height: 33, padding: "0 8px", marginBottom: 1,
                  borderRadius: 8, fontSize: 13, fontWeight: isActive ? 600 : 500,
                  background: isActive ? "var(--sidebar-active-bg)" : "transparent",
                  color: isActive ? "var(--sidebar-active-text)" : "var(--text-secondary)",
                  transition: "all 0.15s", textDecoration: "none",
                }}>
                  <Icon size={15} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom: settings / theme / profile */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10,
        borderTop: "1px solid var(--border-soft)", marginTop: 8,
      }}>
        <button onClick={() => onAction("Settings")} style={{ width: 30, height: 30, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
          <Settings size={15} />
        </button>
        <button onClick={onToggleTheme} style={{ width: 30, height: 30, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
          {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
        </button>
        <button onClick={() => onAction("Profile")} style={{
          width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#7B3CFF,#9B6DFF)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 11, fontWeight: 700,
        }}>
          L
        </button>
      </div>
    </aside>
  );
}
