"use client";

import { useState } from "react";
import { ActionDrawer } from "../ActionDrawer";
import { MarketplaceLayout } from "../MarketplaceLayout";
import type { PromptCardItem } from "../PromptCard";
import { PromptMedia } from "./PromptMedia";
import { PromptSidebar } from "./PromptSidebar";
import { PromptTabs } from "./PromptTabs";
import { RelatedPrompts } from "./RelatedPrompts";
import { ReviewsPanel } from "./ReviewsPanel";

type PromptDetailPageProps = {
  prompt: PromptCardItem;
};

export function PromptDetailPage({ prompt }: PromptDetailPageProps) {
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);

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
      <div className="min-h-0 overflow-y-auto bg-[#030711] px-6 py-4">
        <div className="mb-5 flex items-center gap-2 text-[11px] text-[#7f8aa5]">
          <span>Home</span>
          <span>›</span>
          <span>Explore</span>
          <span>›</span>
          <span>{prompt.category}</span>
          <span>›</span>
          <span className="text-[#c5ccdd]">Prompt Detail</span>
        </div>

        <div className="grid grid-cols-[minmax(0,1.15fr)_380px] gap-5">
          <main className="min-w-0">
            <PromptMedia prompt={prompt} />
            <PromptTabs />
            <RelatedPrompts title={`More by ${prompt.author}`} />
            <ReviewsPanel />
          </main>

          <PromptSidebar prompt={prompt} onAction={openAction} />
        </div>
      </div>

      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}
