"use client";

import { Bookmark, Heart, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { promptSlug, type PromptCardItem } from "./marketplace-data";

type PromptCardProps = {
  item: PromptCardItem;
  isSaved?: boolean;
  isLiked?: boolean;
  onOpen?: (item: PromptCardItem) => void;
  onSave?: (title: string) => void;
  onLike?: (title: string) => void;
};

export function PromptCard({ item, isSaved = false, isLiked = false, onOpen, onSave, onLike }: PromptCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        onOpen?.(item);
        router.push(`/prompt/${promptSlug(item.title)}`);
      }}
      style={{
        background: "var(--surface)", border: "1px solid var(--border-soft)", borderRadius: 14,
        overflow: "hidden", cursor: "pointer", transition: "all 0.22s ease", display: "flex", flexDirection: "column",
      }}
      onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-hover)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)"; }}
      onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-soft)"; }}
    >
      {/* Visual tile */}
      <div style={{ position: "relative", height: 160, overflow: "hidden", background: "var(--bg-alt)" }}>
        <div
          className={`w-full h-full bg-gradient-to-br ${item.gradient}`}
          style={{ transition: "transform 0.5s ease" }}
        />

        {/* Category badge */}
        <div style={{
          position: "absolute", top: 10, left: 10, padding: "3px 8px", borderRadius: 6,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", color: "white", fontSize: 10, fontWeight: 700,
        }}>
          {item.category}
        </div>

        {/* Video badge */}
        {item.isVideo && (
          <div
            style={{ position: "absolute", bottom: 10, left: 10, display: "flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 6, background: "rgba(0,0,0,0.7)", color: "white", fontSize: 10, fontWeight: 700 }}
          >
            <Play size={10} fill="white" />
            Video
          </div>
        )}

        {/* Bookmark button */}
        <button
          style={{
            position: "absolute", top: 8, right: 8, width: 30, height: 30, borderRadius: 9,
            background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center",
            border: 0, color: isSaved ? "#F59E0B" : "#6B7280", transition: "all 0.2s",
          }}
          onClick={(e) => { e.stopPropagation(); onSave?.(item.title); }}
        >
          <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "12px 14px 14px" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.title}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "var(--text-secondary)", marginBottom: 10 }}>
          <div
            style={{ width: 14, height: 14, borderRadius: "50%", background: "linear-gradient(135deg, #7B3CFF, #9B6DFF)" }}
          />
          <span style={{ fontWeight: 500 }}>{item.creator}</span>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 10, borderTop: "1px solid var(--border-soft)" }}>
          <button
            style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: isLiked ? "#EF4444" : "var(--text-muted)", fontWeight: 600 }}
            onClick={(e) => { e.stopPropagation(); onLike?.(item.title); }}
          >
            <Heart size={12} fill={isLiked ? "currentColor" : "none"} />
            {item.saves}
          </button>
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 16V4m0 0L3 8m4-4l4 4" />
              <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            {item.remixes}
          </span>
        </div>
      </div>
    </div>
  );
}

export type { PromptCardItem };
