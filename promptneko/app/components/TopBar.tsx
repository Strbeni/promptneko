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
      display: "flex", alignItems: "center", height: 50, gap: 14, padding: "0 18px",
      borderBottom: "1px solid var(--border-soft)", background: "var(--surface)", flexShrink: 0,
    }}>
      {/* Search */}
      <form onSubmit={submit} style={{
        display: "flex", alignItems: "center", gap: 8, width: "min(360px,32vw)", height: 34,
        padding: "0 12px", border: "1px solid var(--border)", borderRadius: 10,
        background: "var(--bg-alt)", fontSize: 13, color: "var(--text-muted)",
      }}>
        <Search size={14} style={{ flexShrink: 0 }} />
        <input
          value={query} onChange={(e) => onQueryChange(e.target.value)}
          placeholder='Search for anything... e.g. "product ad", "anime girl"'
          style={{ flex: 1, border: 0, outline: "none", background: "transparent", color: "var(--text-primary)", font: "inherit" }}
        />
        <kbd style={{
          padding: "2px 6px", border: "1px solid var(--border)", borderRadius: 5,
          background: "var(--surface)", color: "var(--text-muted)", fontSize: 10, lineHeight: 1, display: "flex", alignItems: "center", gap: 2,
        }}>
          <Command size={9} />/
        </kbd>
      </form>

      {/* Create */}
      <button onClick={() => onAction("Create Prompt")} style={{
        display: "flex", alignItems: "center", gap: 6, height: 34, padding: "0 14px", marginLeft: "auto",
        borderRadius: 9, background: "linear-gradient(135deg,#7B3CFF,#9B6DFF)", color: "white",
        fontSize: 13, fontWeight: 600, boxShadow: "0 2px 8px rgba(123,60,255,0.3)",
      }}>
        <Plus size={15} strokeWidth={2.5} /> Create Prompt
      </button>

      {/* Icons */}
      <button onClick={() => onAction("Notifications")} aria-label="Notifications" style={{
        position: "relative", width: 32, height: 32, borderRadius: 8, display: "flex",
        alignItems: "center", justifyContent: "center", border: "1px solid var(--border)", background: "var(--surface)",
      }}>
        <Bell size={15} style={{ color: "var(--text-secondary)" }} />
        <span style={{ position: "absolute", top: 5, right: 5, width: 6, height: 6, borderRadius: "50%", background: "#EF4444" }} />
      </button>
      <button onClick={() => onAction("Messages")} aria-label="Messages" style={{
        width: 32, height: 32, borderRadius: 8, display: "flex",
        alignItems: "center", justifyContent: "center", border: "1px solid var(--border)", background: "var(--surface)",
      }}>
        <MessageSquare size={15} style={{ color: "var(--text-secondary)" }} />
      </button>

      {/* Profile */}
      <button onClick={() => onAction("Profile menu")} style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#7B3CFF,#9B6DFF)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700,
        }}>L</div>
        <span style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <strong style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.1, color: "var(--text-primary)" }}>Lunaria</strong>
          <em style={{
            display: "inline-block", width: "fit-content", marginTop: 2, padding: "1px 6px", borderRadius: 999,
            background: "linear-gradient(135deg,#7B3CFF,#9B6DFF)", color: "white", fontSize: 9, fontWeight: 700, fontStyle: "normal",
          }}>Pro</em>
        </span>
      </button>
    </header>
  );
}
