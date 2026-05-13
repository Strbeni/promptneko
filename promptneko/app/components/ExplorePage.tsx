"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import { ActionDrawer } from "./ActionDrawer";
import { FilterBar } from "./FilterBar";
import { MarketplaceLayout } from "./MarketplaceLayout";
import { PromptCard } from "./PromptCard";
import { ResultsTabs } from "./ResultsTabs";
import { RightRail } from "./RightRail";
import { DetailedPrompt } from "./marketplace-data";
import { usePromptInteractions } from "./usePromptInteractions";

function ExplorePageInner({ allPrompts = [] }: { allPrompts?: DetailedPrompt[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";
  
  const [activeNav, setActiveNav] = useState("Explore");
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("q") !== null) {
      setQuery(searchParams.get("q") || "");
    }
    if (searchParams.get("category") !== null) {
      setSelectedCategory(searchParams.get("category") || "All");
    }
  }, [searchParams]);

  const [activeTab, setActiveTab] = useState("Popular");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const { liked, saved, toggleLike, toggleSave } = usePromptInteractions(allPrompts);

  const visiblePrompts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allPrompts.filter((prompt) => {
      const matchesQuery = !needle || 
        `${prompt.title} ${prompt.engine.provider} ${prompt.creator.handle} ${prompt.taxonomy.primaryCategory}`.toLowerCase().includes(needle);
      const matchesCategory = selectedCategory === "All" || prompt.taxonomy.primaryCategory === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory, allPrompts]);

  function openAction(action: string) {
    setActiveNav(action);
    setDrawerAction(action);
  }

  function handleSearch() {
    if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query)}`);
    } else {
      router.push(`/explore`);
    }
  }

  return (
    <MarketplaceLayout
      activeNav={activeNav}
      query={query}
      onQueryChange={setQuery}
      onSearch={handleSearch}
      onAction={openAction}
    >
      <div className="flex flex-1 min-h-0 [grid-template-columns:minmax(0,1fr)_300px] lg:grid">
        <section className="flex-1 min-w-0 overflow-y-auto px-5 py-3 pb-7 lg:border-r lg:border-[#121930]/72">
          <FilterBar
            query={query}
            selectedCategory={selectedCategory}
            onQueryChange={setQuery}
            onCategoryChange={(category) => {
              setSelectedCategory(category);
              // Update URL without a full reload for copy-paste sharing
              window.history.replaceState(null, '', `/explore?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`);
            }}
            onAction={openAction}
          />

          <ResultsTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(visiblePrompts.length || query || selectedCategory !== "All" ? visiblePrompts : allPrompts).map((prompt) => (
              <PromptCard
                item={prompt}
                isSaved={saved.has(prompt.id)}
                isLiked={liked.has(prompt.id)}
                key={prompt.id}
                onOpen={() => {
                  setDrawerAction(null);
                }}
                onSave={() => toggleSave(prompt)}
                onLike={() => toggleLike(prompt)}
              />
            ))}
          </div>

          <footer className="flex items-center justify-center h-[60px] mt-4 gap-[9px] border border-[#151d37] border-t-0 rounded-[8px] bg-[#090e1b]">
            <button aria-label="Previous page" className="grid place-items-center min-w-[30px] h-[30px] border border-[#1a2340] rounded-[7px] bg-[#0e1427] text-[#a5aec7] hover:text-white"><ChevronLeft size={17} /></button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button 
                className={`grid place-items-center min-w-[30px] h-[30px] border rounded-[7px] text-[12px] 
                  ${page === 1 ? "border-[#7332f3] bg-[#682ee2] text-white" : "border-[#1a2340] bg-[#0e1427] text-[#a5aec7]"}`} 
                key={page}
              >
                {page}
              </button>
            ))}
            <button className="grid place-items-center min-w-[30px] h-[30px] border border-[#1a2340] rounded-7 bg-[#0e1427] text-[#a5aec7]">1059</button>
            <button aria-label="Next page" className="grid place-items-center min-w-[30px] h-[30px] border border-[#1a2340] rounded-7 bg-[#0e1427] text-[#a5aec7] hover:text-white"><ChevronRight size={17} /></button>
            <span className="ml-auto text-[#8f98b4] text-[12px]">Go to page</span>
            <button className="grid place-items-center min-w-[30px] h-[30px] border border-[#1a2340] rounded-7 bg-[#0e1427] text-[#a5aec7]">1</button>
          </footer>
        </section>

        <RightRail
          isCollapsed={false}
          onToggle={() => {}}
          onAction={(action) => {
            setQuery(action);
            setDrawerAction(action);
          }}
        />
      </div>
      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}

export function ExplorePage({ allPrompts = [] }: { allPrompts?: DetailedPrompt[] }) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Loading...</div>}>
      <ExplorePageInner allPrompts={allPrompts} />
    </Suspense>
  );
}
