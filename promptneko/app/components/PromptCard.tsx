"use client";

import { Bookmark, Heart, Play } from "lucide-react";
import { CropImage } from "./CropImage";

export type PromptCardItem = {
  title: string;
  model: string;
  author: string;
  likes: string;
  crop: string;
  category: string;
  video: boolean;
};

type PromptCardProps = {
  item: PromptCardItem;
  isSaved: boolean;
  isLiked: boolean;
  onOpen: (item: PromptCardItem) => void;
  onSave: (title: string) => void;
  onLike: (title: string) => void;
};

export function PromptCard({ item, isSaved, isLiked, onOpen, onSave, onLike }: PromptCardProps) {
  return (
    <div 
      className="relative h-[198px] overflow-hidden border border-[#202a4d] rounded-2xl bg-[#0a1020] cursor-pointer transition-all hover:border-[#6132bf] hover:-translate-y-px hover:shadow-xl duration-300"
      onClick={() => onOpen(item)}
    >
      <CropImage className={item.crop} />
      
      <button 
        className={`absolute top-[13px] right-[11px] z-10 grid place-items-center w-5 h-[23px] bg-transparent border-0 cursor-pointer transition-colors
          ${isSaved ? "text-[#ffd75c]" : "text-white hover:text-[#ffd75c]"}`}
        onClick={(e) => { e.stopPropagation(); onSave(item.title); }}
      >
        <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
      </button>

      <button 
        className={`absolute right-[13px] bottom-[14px] z-10 flex items-center gap-[5px] bg-transparent border-0 text-[11px] cursor-pointer transition-colors
          ${isLiked ? "text-[#ff4f9d]" : "text-[#d7ddea] hover:text-[#ff4f9d]"}`}
        onClick={(e) => { e.stopPropagation(); onLike(item.title); }}
      >
        <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
        {item.likes}
      </button>

      {item.video && (
        <div className="absolute top-3 left-3 z-10 text-white/80">
          <Play size={16} fill="currentColor" />
        </div>
      )}

      <div className="absolute inset-0 z-[1] [background:linear-gradient(180deg,rgba(0,0,0,0)_47%,rgba(2,4,10,0.18)_100%)] pointer-events-none" />
      
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        <h3 className="m-0 text-white text-[13px] font-bold truncate">{item.title}</h3>
        <div className="flex items-center gap-2 mt-1 text-[#aeb5ca] text-[10px]">
          <span className="w-[13px] h-[13px] rounded-full [background:linear-gradient(135deg,#56d06c,#cf69ff)]" />
          <span>{item.author}</span>
        </div>
      </div>
    </div>
  );
}
