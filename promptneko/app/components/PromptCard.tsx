"use client";

import { Bookmark, Heart, Copy, Play, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DetailedPrompt } from "./marketplace-data";

type PromptCardProps = {
  item: DetailedPrompt;
  isSaved?: boolean;
  isLiked?: boolean;
  onOpen?: (item: DetailedPrompt) => void;
  onSave?: (item: DetailedPrompt) => void;
  onLike?: (item: DetailedPrompt) => void;
};

export function PromptCard({ item, isSaved = false, isLiked = false, onOpen, onSave, onLike }: PromptCardProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const primaryAsset = item.assets[0];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.promptToCopy || item.content.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group flex flex-col overflow-hidden rounded-[20px] bg-[#111111] border border-white/5 cursor-pointer transition-colors hover:border-white/10"
      onClick={() => {
        onOpen?.(item);
        router.push(`/prompt/${item.slug}`);
      }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
          style={{ backgroundImage: `url(${primaryAsset.thumbnailUrl || '/main.png'})` }} 
        />
        
        {primaryAsset.type === 'video' && (
          <div className="absolute top-3 left-3 z-10 grid place-items-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white">
            <Play size={14} fill="currentColor" className="ml-0.5" />
          </div>
        )}

        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button 
            className={`grid place-items-center w-[30px] h-[30px] rounded-full bg-black/40 backdrop-blur-md border border-white/10 transition-colors ${isSaved ? 'text-white' : 'text-white/70 hover:text-white hover:bg-black/60'}`}
            onClick={(e) => { e.stopPropagation(); onSave?.(item); }}
          >
            <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
          </button>
          <button 
            className={`grid place-items-center w-[30px] h-[30px] rounded-full bg-black/40 backdrop-blur-md border border-white/10 transition-colors ${isLiked ? 'text-[#ff4f9d]' : 'text-white/70 hover:text-[#ff4f9d] hover:bg-black/60'}`}
            onClick={(e) => { e.stopPropagation(); onLike?.(item); }}
          >
            <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between p-4 bg-[#111111]">
        <div className="flex-1 min-w-0 pr-3">
          <h3 className="m-0 text-white text-[15px] font-semibold truncate">{item.title}</h3>
          <div className="mt-1 text-[#888] text-[13px] truncate">
            {item.taxonomy.primaryCategory || item.creator.handle}
          </div>
        </div>
        
        <button 
          className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-white/80 text-[12px] font-medium transition-colors hover:bg-white/10 hover:text-white"
          onClick={handleCopy}
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? "Ok!" : ""}
        </button>
      </div>
    </div>
  );
}
