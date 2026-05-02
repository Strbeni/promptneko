"use client";

import { Grid2X2, List } from "lucide-react";

type ResultsTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export function ResultsTabs({ activeTab, onTabChange }: ResultsTabsProps) {
  return (
    <div className="flex items-center h-[53px] gap-2 mb-[15px] px-[21px] pr-[13px] border border-[#151d37] rounded-8 bg-gradient-to-b from-[#0c1122] to-[#090e1b]">
      <div className="flex items-center h-full gap-7">
        {["Popular", "Newest", "Top Rated", "Free"].map((tab) => (
          <button
            key={tab}
            className={`h-[34px] bg-transparent border-0 text-[12px] cursor-pointer transition-colors
              ${activeTab === tab 
                ? "border-b-2 border-[#d944d8] rounded-0 text-[#ff5fbb]" 
                : "text-[#8f98b4] hover:text-white"}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <span className="ml-auto text-[#9aa3bd] text-[11px]">8,241 prompts found</span>
      <button className={`grid place-items-center w-8 h-8 border rounded-7 cursor-pointer transition-colors
        ${activeTab === "Grid" ? "border-[#6c30e3] bg-[#4b23a4] text-white" : "border-[#1b2544] bg-[#0d1326] text-[#8f98b4]"}`}>
        <Grid2X2 size={16} />
      </button>
      <button className={`grid place-items-center w-8 h-8 border rounded-7 cursor-pointer transition-colors
        ${activeTab === "List" ? "border-[#6c30e3] bg-[#4b23a4] text-white" : "border-[#1b2544] bg-[#0d1326] text-[#8f98b4]"}`}>
        <List size={16} />
      </button>
    </div>
  );
}
