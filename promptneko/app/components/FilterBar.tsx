"use client";

import { ChevronDown, ChevronRight, SlidersHorizontal, Search } from "lucide-react";
import { FormEvent } from "react";
import { useCaseCategories } from "./marketplace-data";

type FilterBarProps = {
  query: string;
  selectedCategory: string;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onAction: (action: string) => void;
};

export function FilterBar({ query, selectedCategory, onQueryChange, onCategoryChange, onAction }: FilterBarProps) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAction(query ? `Search: ${query}` : "Search");
  }

  return (
    <>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, tracking: "-0.04em", color: "var(--text-primary)", marginBottom: "4px" }}>Explore</h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Discover the best curated AI prompts from our community</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <form
          style={{ 
            display: "flex", alignItems: "center", flex: 1, maxWidth: "420px", height: "42px", 
            padding: "0 16px", gap: "10px", transition: "all 0.2s",
            border: "1px solid var(--border)", borderRadius: "12px", background: "var(--surface)", 
            color: "var(--text-muted)", fontSize: "14px",
            boxShadow: "var(--shadow-sm)"
          }}
          onSubmit={submit}
        >
          <Search size={16} style={{ flexShrink: 0, color: "var(--text-muted)" }} />
          <input
            style={{ flex: 1, background: "transparent", border: 0, outline: "none", color: "var(--text-primary)", font: "inherit" }}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search thousands of prompts..."
          />
        </form>
        {["Category", "Sort by", "Tags"].map((label) => (
          <button
            key={label}
            style={{ 
              display: "flex", alignItems: "center", gap: "8px", 
              height: "42px", padding: "0 14px",
              fontSize: "13px", fontWeight: 500, transition: "all 0.2s",
              border: "1px solid var(--border)", borderRadius: "12px", background: "var(--surface)", 
              color: "var(--text-secondary)", cursor: "pointer"
            }}
            onClick={() => onAction(label)}
          >
            {label} <ChevronDown size={14} />
          </button>
        ))}
        <button
          style={{ 
            display: "flex", alignItems: "center", gap: "8px", height: "42px", padding: "0 16px", 
            fontSize: "13px", fontWeight: 600, marginLeft: "auto", transition: "all 0.2s",
            border: "1px solid var(--accent-border)", borderRadius: "12px", background: "var(--accent-soft)", 
            color: "var(--accent)", cursor: "pointer"
          }}
          onClick={() => onAction("Filters")}
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {/* Category pills */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", overflowX: "auto", paddingBottom: "8px" }} className="custom-scrollbar">
        <button
          style={{
            flexShrink: 0, height: "32px", padding: "0 16px", borderRadius: "99px", 
            fontSize: "12px", fontWeight: 600, transition: "all 0.2s", cursor: "pointer",
            ...(selectedCategory === "All"
              ? { background: "var(--accent)", color: "white", boxShadow: "0 4px 10px rgba(123,60,255,0.25)" }
              : { border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-secondary)" })
          }}
          onClick={() => onCategoryChange("All")}
        >
          All
        </button>
        {useCaseCategories.map(({ label, icon: Icon }) => (
          <button
            key={label}
            style={{
              flexShrink: 0, display: "flex", alignItems: "center", gap: "6px", 
              height: "32px", padding: "0 16px", borderRadius: "99px", 
              fontSize: "12px", fontWeight: 600, transition: "all 0.2s", cursor: "pointer",
              ...(selectedCategory === label
                ? { background: "var(--accent)", color: "white", boxShadow: "0 4px 10px rgba(123,60,255,0.25)" }
                : { border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-secondary)" })
            }}
            onClick={() => onCategoryChange(label)}
          >
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>
    </>
  );
}
