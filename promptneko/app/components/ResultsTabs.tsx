"use client";

import { Grid2X2, List } from "lucide-react";

type ResultsTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export function ResultsTabs({ activeTab, onTabChange }: ResultsTabsProps) {
  return (
    <div
      className="flex items-center h-[48px] gap-1 mb-5 px-4 py-4"
      style={{
        border: "1px solid var(--border-soft)",
        borderRadius: "12px",
        background: "var(--surface)",
      }}
    >
      <div className="flex items-center gap-1 flex-1">
        {["Popular", "Newest", "Top Rated", "Free"].map((tab) => (
          <button
            key={tab}
            className="h-[30px] px-8 py-6 rounded-[8px] text-[13px] font-[500] transition-all"
            style={activeTab === tab
              ? { background: "var(--accent-soft)", color: "var(--accent)", fontWeight: 600 }
              : { background: "transparent", color: "var(--text-muted)" }}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <span className="text-[12px] mr-2" style={{ color: "var(--text-muted)" }}>8,241 prompts</span>

      <div className="flex items-center gap-1">
        <button
          className="flex items-center justify-center w-7 h-7 rounded-[7px] transition-all"
          style={activeTab === "Grid"
            ? { background: "var(--accent)", color: "white" }
            : { border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-muted)" }}
          onClick={() => onTabChange("Grid")}
        >
          <Grid2X2 size={14} />
        </button>
        <button
          className="flex items-center justify-center w-7 h-7 rounded-[7px] transition-all"
          style={activeTab === "List"
            ? { background: "var(--accent)", color: "white" }
            : { border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-muted)" }}
          onClick={() => onTabChange("List")}
        >
          <List size={14} />
        </button>
      </div>
    </div>
  );
}
