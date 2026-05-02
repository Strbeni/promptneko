"use client";

import { ChevronDown, ChevronRight, SlidersHorizontal, Search } from "lucide-react";
import { FormEvent } from "react";
import { filterCategories } from "./marketplace-data";

type FilterBarProps = {
  query: string;
  selectedCategory: string;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onAction: (action: string) => void;
};

export function FilterBar({ query, selectedCategory, onQueryChange, onCategoryChange, onAction }: FilterBarProps) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAction(query ? `Search: ${query}` : "Search");
  }

  return (
    <>
      <div className="mb-4 ml-[3px]">
        <h1 className="m-0 text-white text-[25px] font-[780] tracking-0 leading-[1.15]">Explore</h1>
        <p className="mt-[5px] text-[#8f98b3] text-[13px]">Discover amazing prompts from our community</p>
      </div>

      <div className="grid grid-cols-[minmax(240px,1.55fr)_repeat(4,minmax(130px,0.75fr))_108px] gap-2 mx-[3px] mb-5">
        <form className="flex items-center h-[37px] px-4 gap-3 border border-[#1d2545] rounded-7 bg-[#0c1122] text-[#c5ccdd] text-[12px]" onSubmit={submit}>
          <input 
            className="flex-1 bg-transparent border-0 outline-none text-white placeholder-[#8990aa]" 
            value={query} 
            onChange={(event) => onQueryChange(event.target.value)} 
            placeholder="Search prompts..." 
          />
          <Search className="text-[#aeb7d2]" size={18} />
        </form>
        {["All Categories", "All Models", "All Pricing", "All Languages"].map((label) => (
          <button 
            className="flex items-center justify-between h-[37px] px-[13px] border border-[#1d2545] rounded-7 bg-[#0c1122] text-[#c5ccdd] text-[12px] cursor-pointer hover:border-[#3d2875]" 
            key={label} 
            onClick={() => onAction(label)}
          >
            {label}
            <ChevronDown size={15} />
          </button>
        ))}
        <button 
          className="flex items-center justify-center h-[37px] gap-2 border border-[#3d2875] rounded-7 bg-[#0c1122] text-[#c5ccdd] text-[12px] cursor-pointer hover:bg-[#1a1c3d]" 
          onClick={() => onAction("Filters")}
        >
          <SlidersHorizontal size={17} />
          Filters
        </button>
      </div>

      <div className="relative grid grid-cols-[68px_repeat(8,minmax(95px,1fr))_28px] gap-2 mb-[15px] p-2 border border-[#151d37] rounded-8 bg-[#080d1a]">
        {filterCategories.map(({ icon: Icon, label, count }) => (
          <button 
            className={`grid grid-cols-[26px_minmax(0,1fr)] grid-rows-[16px_15px] items-center min-w-0 h-[48px] gap-x-2 px-[9px] py-[7px] border rounded-7 text-left transition-all
              ${selectedCategory === label 
                ? "border-[#7b3cff] [box-shadow:inset_0_0_0_1px_rgba(122,53,255,0.45),0_0_28px_rgba(122,53,255,0.15)] text-white" 
                : "border-[#1b2544] bg-[#0f1428] text-[#d8ddec] hover:border-[#3d2875]"}`} 
            key={label} 
            onClick={() => onCategoryChange(label)}
          >
            <span className={`grid place-items-center w-[26px] h-[26px] row-span-2 rounded-6 
              ${selectedCategory === label ? "bg-[#7a35ff]/28 text-white" : "bg-[#171d35] text-[#bcc5de]"}`}>
              <Icon size={18} />
            </span>
            <strong className="overflow-hidden text-[11px] font-[720] truncate">{label}</strong>
            <small className="text-[#808aa5] text-[11px]">{count}</small>
          </button>
        ))}
        <button 
          className="grid place-items-center h-[48px] rounded-7 bg-[#10162a] text-[#a5aec8] hover:text-white cursor-pointer border-0" 
          onClick={() => onAction("More categories")} 
          aria-label="More categories"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
