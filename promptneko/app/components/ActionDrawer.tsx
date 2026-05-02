"use client";

import { X } from "lucide-react";
import { CropImage } from "./CropImage";
import type { PromptCardItem } from "./PromptCard";

type ActionDrawerProps = {
  action: string | null;
  prompt: PromptCardItem | null;
  onClose: () => void;
};

export function ActionDrawer({ action, prompt, onClose }: ActionDrawerProps) {
  if (!action && !prompt) {
    return null;
  }

  return (
    <aside className="fixed top-0 right-0 z-[100] w-[320px] h-screen p-5 border-l border-[#202746] bg-[#070b16] [box-shadow:-20px_0_40px_rgba(0,0,0,0.4)] animate-in slide-in-from-right duration-300" role="dialog" aria-modal="true">
      <button className="absolute top-4 right-4 grid place-items-center w-8 h-8 rounded-full bg-white/5 border-0 text-[#d8def2] cursor-pointer hover:bg-white/10 transition-colors" aria-label="Close" onClick={onClose}>
        <X size={18} />
      </button>
      {prompt ? (
        <>
          <CropImage className={`w-full aspect-square rounded-8 mb-5 ${prompt.crop}`} />
          <h2 className="m-0 text-white text-[22px] font-bold">{prompt.title}</h2>
          <p className="mt-2 text-[#aeb5ca] text-[14px] leading-relaxed">
            {prompt.model} prompt by {prompt.author}. Ready for preview, checkout, and save workflows.
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <button className="w-full h-11 rounded-8 bg-white/10 border-0 text-white text-[14px] font-bold cursor-pointer hover:bg-white/15 transition-colors">Preview Prompt</button>
            <button className="w-full h-11 rounded-8 bg-[#7b3cff] border-0 text-white text-[14px] font-bold cursor-pointer hover:bg-[#6a2ce6] transition-colors">Buy Prompt</button>
            <button className="w-full h-11 rounded-8 bg-transparent border border-[#202746] text-[#d8def2] text-[14px] font-bold cursor-pointer hover:bg-white/5 transition-colors">Open Creator</button>
          </div>
        </>
      ) : (
        <>
          <h2 className="m-0 mt-8 text-white text-[22px] font-bold">{action}</h2>
          <p className="mt-2 text-[#aeb5ca] text-[14px] leading-relaxed">
            This control is wired and ready for the production route or modal behind {action}.
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <button className="w-full h-11 rounded-8 bg-[#7b3cff] border-0 text-white text-[14px] font-bold cursor-pointer hover:bg-[#6a2ce6] transition-colors">Open</button>
            <button className="w-full h-11 rounded-8 bg-transparent border border-[#202746] text-[#d8def2] text-[14px] font-bold cursor-pointer hover:bg-white/5 transition-colors">Save View</button>
          </div>
        </>
      )}
    </aside>
  );
}
