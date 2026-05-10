"use client";

import { useState } from "react";
import { ActionDrawer } from "../ActionDrawer";
import { MarketplaceLayout } from "../MarketplaceLayout";
import type { PromptCardItem } from "../PromptCard";
import { PromptMedia } from "./PromptMedia";
import { PromptSidebar } from "./PromptSidebar";
import { PromptTabs } from "./PromptTabs";
import { RelatedPrompts } from "./RelatedPrompts";

type PromptDetailPageProps = {
  prompt: PromptCardItem;
};

export function PromptDetailPage({ prompt }: PromptDetailPageProps) {
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);

  if (!prompt) {
    return (
      <MarketplaceLayout
        activeNav="Explore"
        query={query}
        onQueryChange={setQuery}
        onSearch={() => {}}
        onAction={setDrawerAction}
      >
        <div className="flex flex-col items-center justify-center h-[60vh] text-white">
          <h1 className="text-4xl font-bold mb-4">Prompt Not Found</h1>
          <p className="text-[var(--text-muted)] mb-8">The prompt you're looking for doesn't exist or has been removed.</p>
          <a href="/" className="px-6 py-2 bg-violet-600 rounded-xl font-bold hover:bg-violet-700 transition-colors">
            Back to Explore
          </a>
        </div>
      </MarketplaceLayout>
    );
  }

  function openAction(action: string) {
    setDrawerAction(action);
  }

  return (
    <MarketplaceLayout
      activeNav="Explore"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => openAction(query ? `Search: ${query}` : "Search")}
      onAction={openAction}
    >
      <div className="main-scroll bg-[var(--bg)] !pt-6">
        {/* Breadcrumbs - Refined */}
        <div className="mb-8 flex items-center gap-3 text-[12px] font-medium text-[var(--text-muted)] px-4">
          <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Home</span>
          <span className="opacity-40">/</span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Explore</span>
          <span className="opacity-40">/</span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">{prompt.category}</span>
          <span className="opacity-40">/</span>
          <span className="text-[var(--text-primary)] font-semibold">Prompt Detail</span>
        </div>

        {/* 12-Column Responsive Grid */}
        <div className="grid grid-cols-12 gap-10 px-4 max-w-[1600px] mx-auto">
          {/* LEFT SECTION (8 columns) */}
          <main className="col-span-12 lg:col-span-8 min-w-0 space-y-10">
            <PromptMedia prompt={prompt} />
            <PromptTabs />
            <RelatedPrompts title={`More by ${prompt.creator}`} />
          </main>

          {/* RIGHT SIDEBAR (4 columns) */}
          <aside className="col-span-12 lg:col-span-4">
            <PromptSidebar prompt={prompt} onAction={openAction} />
          </aside>
        </div>
      </div>

      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}
