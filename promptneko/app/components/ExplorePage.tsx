"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";

import { FilterBar } from "./FilterBar";
import { optimizedThumbnailUrl } from "./image-utils";
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
  const [activeTab, setActiveTab] = useState("Popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerAction, setDrawerAction] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("q") !== null) {
      setQuery(searchParams.get("q") || "");
    }
    if (searchParams.get("category") !== null) {
      setSelectedCategory(searchParams.get("category") || "All");
    }
  }, [searchParams]);

  // Reset pagination to page 1 when query, category, or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCategory, activeTab]);

  const { liked, saved, toggleLike, toggleSave } = usePromptInteractions(allPrompts);

  const visiblePrompts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let result = allPrompts.filter((prompt) => {
      const matchesQuery = !needle || 
        `${prompt.title} ${prompt.engine.provider} ${prompt.creator.handle} ${prompt.taxonomy.primaryCategory} ${prompt.description}`.toLowerCase().includes(needle);
      const matchesCategory = selectedCategory === "All" || prompt.taxonomy.primaryCategory === selectedCategory;
      const matchesFree = activeTab !== "Free" || !prompt.pricing?.priceCents;
      return matchesQuery && matchesCategory && matchesFree;
    });

    // Apply Sorting based on Active Tab
    result = [...result].sort((a, b) => {
      if (activeTab === "Newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (activeTab === "Top Rated") {
        return (b._db?.avgRating || 0) - (a._db?.avgRating || 0);
      }
      // Default to Popular (views + likes)
      return (b.stats.likes + b.stats.views) - (a.stats.likes + a.stats.views);
    });

    return result;
  }, [query, selectedCategory, activeTab, allPrompts]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(visiblePrompts.length / itemsPerPage) || 1;
  const paginatedPrompts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return visiblePrompts.slice(start, start + itemsPerPage);
  }, [visiblePrompts, currentPage]);

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
      <div className="flex flex-1 min-h-0 [grid-template-columns:minmax(0,1fr)_280px] lg:grid">
        <section className="flex-1 min-w-0 overflow-y-auto px-5 py-3 pb-7 lg:border-r lg:border-[#121930]/72">
          <FilterBar
            query={query}
            selectedCategory={selectedCategory}
            onQueryChange={setQuery}
            onCategoryChange={(category) => {
              setSelectedCategory(category);
              window.history.replaceState(null, '', `/explore?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`);
            }}
            onAction={openAction}
          />

          <ResultsTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            totalCount={visiblePrompts.length}
          />

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {paginatedPrompts.map((prompt) => (
                <PromptCard
                  item={prompt}
                  isSaved={saved.has(prompt.id)}
                  isLiked={liked.has(prompt.id)}
                  key={prompt.id}
                  onOpen={() => setDrawerAction(null)}
                  onSave={() => toggleSave(prompt)}
                  onLike={() => toggleLike(prompt)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedPrompts.map((prompt) => (
                <div 
                  key={prompt.id}
                  onClick={() => {
                    setDrawerAction(null);
                    router.push(`/prompt/${prompt.slug}`);
                  }}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-[#111111] border border-white/5 hover:border-white/10 cursor-pointer transition-all group"
                >
                  <div 
                    className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0 relative overflow-hidden"
                    style={{ backgroundImage: `url(${optimizedThumbnailUrl(prompt.assets[0]?.thumbnailUrl)})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-[14px] font-semibold m-0 truncate group-hover:text-[#a46aff] transition-colors">{prompt.title}</h3>
                    <p className="text-[#888] text-[12px] m-0 mt-0.5 truncate">{prompt.description}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#666]">
                      <span>{prompt.engine.provider}</span>
                      <span>•</span>
                      <span>{prompt.taxonomy.primaryCategory}</span>
                      <span>•</span>
                      <span className="text-[#00d9a8] font-medium">{prompt.pricing?.priceCents ? `$${(prompt.pricing.priceCents / 100).toFixed(2)}` : 'Free'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      className={`px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-colors ${saved.has(prompt.id) ? 'bg-white/10 text-white border-white/20' : 'bg-transparent text-white/60 border-white/5 hover:text-white hover:bg-white/5'}`}
                      onClick={(e) => { e.stopPropagation(); toggleSave(prompt); }}
                    >
                      {saved.has(prompt.id) ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <footer className="flex items-center justify-center h-[60px] mt-6 gap-1.5 border border-[#151d37] rounded-xl bg-[#090e1b] px-4">
              <button 
                aria-label="Previous page" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="grid place-items-center min-w-[30px] h-[30px] border border-[#1a2340] rounded-lg bg-[#0e1427] text-[#a5aec7] hover:text-white disabled:opacity-40 transition-all cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                <button 
                  className={`grid place-items-center min-w-[30px] h-[30px] border rounded-lg text-[12px] font-medium transition-all cursor-pointer
                    ${currentPage === page ? "border-[#7332f3] bg-[#682ee2] text-white shadow-md" : "border-[#1a2340] bg-[#0e1427] text-[#a5aec7] hover:text-white"}`} 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              
              {totalPages > 5 && <span className="text-[#666] px-1">...</span>}
              {totalPages > 5 && (
                <button 
                  className={`grid place-items-center min-w-[30px] h-[30px] border rounded-lg text-[12px] font-medium transition-all cursor-pointer
                    ${currentPage === totalPages ? "border-[#7332f3] bg-[#682ee2] text-white shadow-md" : "border-[#1a2340] bg-[#0e1427] text-[#a5aec7] hover:text-white"}`}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              )}

              <button 
                aria-label="Next page" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="grid place-items-center min-w-[30px] h-[30px] border border-[#1a2340] rounded-lg bg-[#0e1427] text-[#a5aec7] hover:text-white disabled:opacity-40 transition-all cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
              <span className="ml-auto text-[#8f98b4] text-[12px] hidden sm:inline">Page {currentPage} of {totalPages}</span>
            </footer>
          )}
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
