"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ActionDrawer } from "./ActionDrawer";
import { FilterBar } from "./FilterBar";
import { MarketplaceLayout } from "./MarketplaceLayout";
import { PromptCard } from "./PromptCard";
import { ResultsTabs } from "./ResultsTabs";
import { promptCards } from "./marketplace-data";

export function ExplorePage() {
  const [activeNav, setActiveNav] = useState("Explore");
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Popular");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [drawerAction, setDrawerAction] = useState<string | null>(null);

  const visiblePrompts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return promptCards.filter((prompt) => {
      const matchesQuery = !needle || `${prompt.title} ${prompt.creator} ${prompt.category}`.toLowerCase().includes(needle);
      const matchesCategory = selectedCategory === "All" || prompt.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  function openAction(action: string) {
    setActiveNav(action);
    setDrawerAction(action);
  }

  function toggle(setter: (value: Set<string>) => void, current: Set<string>, key: string) {
    const next = new Set(current);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setter(next);
  }

  return (
    <MarketplaceLayout
      activeNav={activeNav}
      query={query}
      onQueryChange={setQuery}
      onSearch={() => openAction(query ? `Search: ${query}` : "Search")}
      onAction={openAction}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden", background: "var(--bg)" }}>
        <section style={{ flex: 1, minWidth: 0, overflowY: "auto", padding: "24px 32px 60px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <FilterBar
              query={query}
              selectedCategory={selectedCategory}
              onQueryChange={setQuery}
              onCategoryChange={(category) => setSelectedCategory(category)}
              onAction={openAction}
            />

            <ResultsTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", 
              gap: "20px",
              marginBottom: "40px"
            }}>
              {(visiblePrompts.length ? visiblePrompts : promptCards).map((prompt) => (
                <PromptCard
                  item={prompt}
                  isSaved={saved.has(prompt.title)}
                  isLiked={liked.has(prompt.title)}
                  key={prompt.title}
                  onOpen={() => setDrawerAction(null)}
                  onSave={(title) => toggle(setSaved, saved, title)}
                  onLike={(title) => toggle(setLiked, liked, title)}
                />
              ))}
            </div>

            {/* Pagination */}
            <footer style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: "10px", 
              marginTop: "48px", 
              paddingTop: "32px", 
              borderTop: "1px solid var(--border-soft)" 
            }}>
              <button style={{ 
                display: "flex", alignItems: "center", justifyContent: "center", 
                width: "36px", height: "36px", borderRadius: "10px", 
                border: "1px solid var(--border)", background: "var(--surface)", 
                color: "var(--text-secondary)", cursor: "pointer", transition: "all 0.2s" 
              }}>
                <ChevronLeft size={18} />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", 
                    width: "36px", height: "36px", borderRadius: "10px", 
                    fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                    ...(page === 1 
                      ? { background: "var(--accent)", color: "white", border: "1px solid var(--accent)", boxShadow: "0 4px 12px rgba(123,60,255,0.3)" } 
                      : { border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-secondary)" })
                  }}
                >
                  {page}
                </button>
              ))}
              <button style={{ 
                display: "flex", alignItems: "center", justifyContent: "center", 
                width: "36px", height: "36px", borderRadius: "10px", 
                border: "1px solid var(--border)", background: "var(--surface)", 
                color: "var(--text-secondary)", cursor: "pointer", transition: "all 0.2s" 
              }}>
                <ChevronRight size={18} />
              </button>
            </footer>
          </div>
        </section>
      </div>
      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}
