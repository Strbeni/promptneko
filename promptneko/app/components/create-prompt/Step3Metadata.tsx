"use client";

import { PromptFormState } from "./types";
import { X } from "lucide-react";
import { useState } from "react";

const CATEGORIES = ["AI Art & Anime", "Websites & UI", "Branding & Logos", "Product Ads", "Coding Prompts", "Marketing", "Social & Reels"];
const MODELS = ["Midjourney v6", "DALL-E 3", "Stable Diffusion XL", "FLUX", "ChatGPT-4", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"];

export function Step3Metadata({ data, updateData }: { data: PromptFormState, updateData: (data: PromptFormState) => void }) {
  const [tagInput, setTagInput] = useState("");

  const handleUpdate = (updates: Partial<PromptFormState['metadata']>) => {
    updateData({ ...data, metadata: { ...data.metadata, ...updates } });
  };

  const toggleModel = (model: string) => {
    const current = data.metadata.modelCompatibility;
    if (current.includes(model)) {
      handleUpdate({ modelCompatibility: current.filter(m => m !== model) });
      if (data.metadata.primaryModel === model) {
        handleUpdate({ primaryModel: "" });
      }
    } else {
      handleUpdate({ modelCompatibility: [...current, model] });
    }
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() && data.metadata.tags.length < 10) {
      e.preventDefault();
      if (!data.metadata.tags.includes(tagInput.trim())) {
        handleUpdate({ tags: [...data.metadata.tags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    handleUpdate({ tags: data.metadata.tags.filter(t => t !== tag) });
  };

  return (
    <div className="h-full overflow-y-auto pr-2 space-y-8">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-white mb-2">Prompt Details</h2>
        <p className="text-sm text-[#7f88a4]">
          Provide metadata to help buyers find and understand your prompt.
        </p>
      </div>

      <div className="space-y-6 max-w-3xl">
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Title *</label>
            <span className="text-xs text-[#565e78]">{data.metadata.title.length}/100</span>
          </div>
          <input 
            type="text" 
            maxLength={100}
            value={data.metadata.title} 
            onChange={e => handleUpdate({ title: e.target.value })}
            placeholder="e.g., Cinematic Sci-Fi Cityscape"
            className="w-full h-10 px-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Short Description *</label>
            <span className="text-xs text-[#565e78]">{data.metadata.shortDescription.length}/250</span>
          </div>
          <textarea 
            maxLength={250}
            rows={2}
            value={data.metadata.shortDescription} 
            onChange={e => handleUpdate({ shortDescription: e.target.value })}
            placeholder="A brief pitch shown on the marketplace cards..."
            className="w-full p-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Long Description *</label>
            <span className="text-xs text-[#565e78]">{data.metadata.longDescription.length} chars (min 100)</span>
          </div>
          <textarea 
            rows={6}
            value={data.metadata.longDescription} 
            onChange={e => handleUpdate({ longDescription: e.target.value })}
            placeholder="Explain what the prompt does, best practices, and why it's valuable. Markdown is supported."
            className="w-full p-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Category *</label>
            <select 
              value={data.metadata.category} 
              onChange={e => handleUpdate({ category: e.target.value })}
              className="w-full h-10 px-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors appearance-none"
            >
              <option value="">Select a category...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Language</label>
            <select 
              value={data.metadata.language} 
              onChange={e => handleUpdate({ language: e.target.value })}
              className="w-full h-10 px-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors appearance-none"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Japanese">Japanese</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Compatible Models</label>
          <div className="flex flex-wrap gap-2">
            {MODELS.map(model => {
              const isSelected = data.metadata.modelCompatibility.includes(model);
              return (
                <button
                  key={model}
                  onClick={() => toggleModel(model)}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                    isSelected ? "bg-[#a46aff]/20 border-[#a46aff] text-white" : "bg-[#0c1122] border-[#30395e] text-[#7f88a4] hover:text-[#c5ccdd] hover:border-[#4d5b94]"
                  }`}
                >
                  {model}
                </button>
              );
            })}
          </div>
        </div>

        {data.metadata.modelCompatibility.length > 0 && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Primary Model (Optimized For)</label>
            <select 
              value={data.metadata.primaryModel} 
              onChange={e => handleUpdate({ primaryModel: e.target.value })}
              className="w-full h-10 px-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors appearance-none"
            >
              <option value="">Select primary model...</option>
              {data.metadata.modelCompatibility.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}

        <div className="space-y-1.5">
          <div className="flex justify-between">
            <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Tags</label>
            <span className="text-xs text-[#565e78]">{data.metadata.tags.length}/10</span>
          </div>
          <div className="p-2 min-h-12 bg-[#0c1122] border border-[#30395e] rounded-lg focus-within:border-[#a46aff] transition-colors flex flex-wrap gap-2 items-center">
            {data.metadata.tags.map(tag => (
              <div key={tag} className="flex items-center gap-1 bg-[#1b2341] text-[#c5ccdd] px-2 py-1 rounded text-xs font-semibold">
                #{tag}
                <button onClick={() => removeTag(tag)} className="text-[#7f88a4] hover:text-white"><X size={12} /></button>
              </div>
            ))}
            {data.metadata.tags.length < 10 && (
              <input 
                type="text" 
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={addTag}
                placeholder={data.metadata.tags.length === 0 ? "Type and press Enter..." : ""}
                className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-white text-sm"
              />
            )}
          </div>
        </div>

        <div className="pt-4">
          <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-[#30395e] bg-[#0c1122]">
            <input 
              type="checkbox" 
              checked={data.metadata.nsfw}
              onChange={e => handleUpdate({ nsfw: e.target.checked })}
              className="w-5 h-5 rounded border-[#30395e] bg-[#11162a] checked:bg-red-500 focus:ring-red-500 focus:ring-offset-0 focus:ring-1"
            />
            <div>
              <span className="block text-sm font-bold text-white mb-0.5">NSFW / Adult Content</span>
              <span className="block text-xs text-[#7f88a4]">Check this if your prompt generates adult, graphic, or restricted content.</span>
            </div>
          </label>
        </div>

      </div>
    </div>
  );
}
