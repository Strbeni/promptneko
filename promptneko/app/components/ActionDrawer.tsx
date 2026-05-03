"use client";

import { ArrowRight, Bookmark, X } from "lucide-react";
import type { PromptCardItem } from "./PromptCard";

type ActionDrawerProps = {
  action: string | null;
  prompt: PromptCardItem | null;
  onClose: () => void;
};

export function ActionDrawer({ action, prompt, onClose }: ActionDrawerProps) {
  if (!action && !prompt) return null;

  return (
    <aside
      className="fixed top-0 right-0 z-[100] w-[340px] h-screen p-6 animate-in slide-in-from-right duration-300"
      style={{
        background: "var(--surface)",
        borderLeft: "1px solid var(--border)",
        boxShadow: "-20px 0 60px rgba(0,0,0,0.08)",
      }}
      role="dialog"
      aria-modal="true"
    >
      <button
        className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full transition-all"
        style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
        aria-label="Close"
        onClick={onClose}
      >
        <X size={15} />
      </button>

      {prompt ? (
        <>
          <div className={`w-full h-[180px] rounded-[16px] mb-5 bg-gradient-to-br ${prompt.gradient}`} />
          <h2 className="text-[20px] font-[700] tracking-[-0.02em] mb-2" style={{ color: "var(--text-primary)" }}>{prompt.title}</h2>
          <p className="text-[13px] leading-[1.6] mb-6" style={{ color: "var(--text-secondary)" }}>
            {prompt.category} prompt by {prompt.creator}. Ready to copy, remix, and generate your own version.
          </p>
          <div className="flex flex-col gap-3">
            <button
              className="w-full h-11 rounded-[12px] text-white text-[14px] font-[600] transition-all hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 2px 12px rgba(99,102,241,0.3)" }}
            >
              Copy Prompt
            </button>
            <button
              className="w-full h-11 rounded-[12px] text-[14px] font-[600] flex items-center justify-center gap-2 transition-all"
              style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
            >
              <Bookmark size={15} /> Save to Collection
            </button>
            <button
              className="w-full h-11 rounded-[12px] text-[14px] font-[500] transition-all"
              style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
            >
              View Creator
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-[20px] font-[700] tracking-[-0.02em] mb-2 mt-8" style={{ color: "var(--text-primary)" }}>{action}</h2>
          <p className="text-[13px] leading-[1.6] mb-6" style={{ color: "var(--text-secondary)" }}>
            This section is ready for the full production experience behind &quot;{action}&quot;.
          </p>
          <div className="flex flex-col gap-3">
            <button
              className="w-full h-11 rounded-[12px] text-white text-[14px] font-[600] flex items-center justify-center gap-2 transition-all hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
            >
              Open <ArrowRight size={15} />
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
