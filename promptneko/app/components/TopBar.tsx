"use client";

import { Bell, Command, MessageSquare, Plus, Search } from "lucide-react";
import { FormEvent } from "react";

type TopBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  onAction: (action: string) => void;
};

export function TopBar({ query, onQueryChange, onSearch, onAction }: TopBarProps) {
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); onSearch(); }

  return (
    <header style={{
      display: "flex", alignItems: "center", height: "var(--topbar-height)", gap: 20, padding: "0 var(--content-padding)",
      borderBottom: "1px solid var(--border)", background: "transparent", flexShrink: 0,
      backdropFilter: "blur(12px)", zIndex: 10,
    }}>
      {/* Left section (empty or for branding on mobile) */}
      <div style={{ flex: "0 0 120px" }} />

      {/* Search - Centered and Wide */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <form onSubmit={submit} style={{
          display: "flex", alignItems: "center", gap: 10, width: "100%", maxWidth: 500, height: 36,
          padding: "0 16px", border: "1px solid var(--border)", borderRadius: 10,
          background: "rgba(255, 255, 255, 0.03)", fontSize: 14, color: "var(--text-secondary)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }} className="search-container focus-within:ring-1 focus-within:ring-[#8B5CF6]/50 focus-within:bg-white/[0.06]">
          <Search size={16} style={{ flexShrink: 0, opacity: 0.6 }} />
          <input
            value={query} onChange={(e) => onQueryChange(e.target.value)}
            placeholder='Search for premium AI prompts...'
            style={{ flex: 1, border: 0, outline: "none", background: "transparent", color: "var(--text-primary)", font: "inherit" }}
          />
          <kbd style={{
            padding: "2px 6px", border: "1px solid var(--border)", borderRadius: 4,
            background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", fontSize: 10, lineHeight: 1, display: "flex", alignItems: "center", gap: 2,
          }}>
            <Command size={10} />/
          </kbd>
        </form>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "0 0 auto" }}>
        <button onClick={() => onAction("Create Prompt")} style={{
          display: "flex", alignItems: "center", gap: 8, height: 34, padding: "0 14px",
          borderRadius: 8, background: "linear-gradient(135deg,#8B5CF6,#6366F1)", color: "white",
          fontSize: 13, fontWeight: 600, boxShadow: "0 4px 15px rgba(139, 92, 246, 0.25)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }} className="hover:scale-105 active:scale-95">
          <Plus size={16} strokeWidth={2.5} /> Create
        </button>

        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => onAction("Notifications")} aria-label="Notifications" style={{
            position: "relative", width: 34, height: 34, borderRadius: 8, display: "flex",
            alignItems: "center", justifyContent: "center", border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)",
            color: "var(--text-secondary)", transition: "all 0.2s",
          }} className="hover:bg-white/5">
            <Bell size={16} strokeWidth={2} />
            <span style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, borderRadius: "50%", background: "#F87171", boxShadow: "0 0 10px #F87171" }} />
          </button>
        </div>

        {/* Profile */}
        <button onClick={() => onAction("Profile menu")} style={{ 
          display: "flex", alignItems: "center", gap: 10, padding: "4px 4px 4px 12px", 
          borderRadius: 10, border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)",
          transition: "all 0.2s",
        }} className="hover:bg-white/5">
          <span style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <strong style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Lunaria</strong>
          </span>
          <div style={{
            width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg,#8B5CF6,#6366F1)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 11, fontWeight: 700,
          }}>L</div>
        </button>
      </div>
    </header>
  );
}
