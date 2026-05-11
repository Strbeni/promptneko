"use client";

import { useState } from "react";
import { Bookmark, Heart, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionDrawer } from "../ActionDrawer";
import { MarketplaceLayout } from "../MarketplaceLayout";
import { DetailedPrompt } from "../marketplace-data";
import { PromptMedia } from "./PromptMedia";
import { PromptSidebar } from "./PromptSidebar";
import { PromptTabs } from "./PromptTabs";
import { RelatedPrompts } from "./RelatedPrompts";
import { ReviewsPanel } from "./ReviewsPanel";

type PromptDetailPageProps = {
  prompt: DetailedPrompt;
  isPending?: boolean;
};

export function PromptDetailPage({ prompt, isPending }: PromptDetailPageProps) {
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
      <div className="min-h-0 overflow-y-auto bg-[#030711] px-4 md:px-6 py-4">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-[10px] md:text-[11px] text-[#7f8aa5]">
          <span>Home</span>
          <span>›</span>
          <span>Explore</span>
          <span>›</span>
          <span>{prompt.taxonomy.primaryCategory}</span>
          <span>›</span>
          <span className="text-[#c5ccdd]">Prompt Detail</span>
        </div>

        {isPending && (
          <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <h2 className="font-bold text-lg mb-1 flex items-center gap-2">
              <span>Your prompt has been submitted!</span>
            </h2>
            <p className="text-sm text-blue-300">
              It is currently pending review by an admin. It will be publicly available once approved.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_380px] gap-5 lg:min-h-[calc(100vh-180px)]">
          <main className="min-w-0 order-1 lg:order-none flex flex-col h-full">
            <PromptMedia prompt={prompt} />
            <div className="block lg:hidden mt-5">
              <PromptSidebar prompt={prompt} onAction={openAction} />
            </div>
            <PromptTabs prompt={prompt} className="flex-1" />
            <div className="lg:hidden mt-8">
              <RelatedPrompts title={`More by ${prompt.creator.displayName}`} />
            </div>
            {/* <ReviewsPanel /> */}
          </main>

          <div className="hidden lg:block space-y-6">
            <PromptSidebar prompt={prompt} onAction={openAction} />
            <RelatedPrompts title={`More by ${prompt.creator.displayName}`} />
          </div>
        </div>
      </div>

      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}
