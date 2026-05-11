"use client";

import { PromptFormState } from "./types";
import { DetailedPrompt } from "../marketplace-data";
import { PromptMedia } from "../prompt-detail/PromptMedia";
import { PromptSidebar } from "../prompt-detail/PromptSidebar";
import { PromptTabs } from "../prompt-detail/PromptTabs";

export function Step7Preview({ data }: { data: PromptFormState }) {
  // Map our form data into the structure expected by the detail page components
  const mockPrompt: DetailedPrompt = {
    id: "preview-1",
    slug: "preview-prompt",
    title: data.metadata.title || 'Untitled Prompt',
    description: data.metadata.shortDescription || 'No description provided.',
    content: {
      text: data.content,
      negativePrompt: "",
      version: "1.0",
    },
    promptToCopy: data.content,
    assets: data.media.length > 0 
      ? data.media.map(url => ({
          type: 'image',
          primaryUrl: url,
          thumbnailUrl: url,
          dimensions: { width: 1024, height: 1024 }
        }))
      : [{
          type: 'image',
          primaryUrl: "https://source.unsplash.com/random/1024x1024/?placeholder",
          thumbnailUrl: "https://source.unsplash.com/random/1024x1024/?placeholder",
          dimensions: { width: 1024, height: 1024 }
        }],
    creator: {
      id: "u-current",
      handle: "@You",
      displayName: "You (Preview)",
      avatarUrl: "",
      isVerified: true
    },
    engine: {
      modelId: data.metadata.primaryModel || "Unknown Model",
      provider: "Platform",
      parameters: {}
    },
    taxonomy: {
      primaryCategory: data.metadata.category || "Uncategorized",
      tags: data.metadata.tags
    },
    stats: {
      likes: 0,
      views: 0,
      saves: 0
    },
    createdAt: new Date().toISOString()
  };

  return (
    <div className="h-full overflow-y-auto pr-2">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Final Review</h2>
        <p className="text-[#7f88a4]">
          This is exactly how your prompt will appear to buyers on the marketplace.
        </p>
      </div>

      <div className="bg-[#030711] border border-[#202746] rounded-2xl overflow-hidden p-4 md:p-6 shadow-2xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_380px] gap-5">
          <main className="min-w-0 order-1 lg:order-none flex flex-col h-full">
            <PromptMedia prompt={mockPrompt} />
            <div className="block lg:hidden mt-5">
              <PromptSidebar prompt={mockPrompt} onAction={() => {}} />
            </div>
            <PromptTabs prompt={mockPrompt} className="flex-1 mt-6" />
          </main>

          <div className="hidden lg:block space-y-6">
            <PromptSidebar prompt={mockPrompt} onAction={() => {}} />
          </div>
        </div>

        {/* Prevent actual interaction during preview */}
        <div className="absolute inset-0 z-50 pointer-events-none" />
      </div>
    </div>
  );
}
