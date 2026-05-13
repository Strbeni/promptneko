"use client";

import { ChevronDown, ChevronRight, SlidersHorizontal, Search, X } from "lucide-react";
import { FormEvent, useRef, useEffect, useState } from "react";
import { filterCategories } from "./marketplace-data";
import { useRouter } from "next/navigation";

type FilterBarProps = {
  query: string;
  selectedCategory: string;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onAction: (action: string) => void;
};

const MODEL_OPTIONS = [
  "All Models",
  "Midjourney",
  "Stable Diffusion",
  "FLUX",
  "ChatGPT Image",
  "DALL-E 3",
  "Leonardo Ai",
  "Gemini Image",
  "Grok Image",
  "Ideogram",
];

const PRICING_OPTIONS = [
  "All Pricing",
  "Free",
];

const LANGUAGE_OPTIONS = [
  "All Languages",
  "English",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Portuguese",
  "Korean",
  "Chinese",
];

function DropdownSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const displayValue = value === options[0] ? label : value;
  const isActive = value !== options[0];

  return (
    <div className="relative" ref={ref}>
      <button
        className={`flex items-center justify-between h-[37px] px-[13px] border rounded-xl text-[12px] cursor-pointer transition-all w-full ${
          isActive
            ? "border-[#7b3cff] bg-[#12102a] text-[#a463ff]"
            : open
            ? "border-[#3d2875] bg-[#0c1122] text-[#c5ccdd]"
            : "border-[#1d2545] bg-[#0c1122] text-[#c5ccdd] hover:border-[#3d2875]"
        }`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="truncate mr-2">{displayValue}</span>
        <div className="flex items-center gap-1 shrink-0">
          {isActive && (
            <span
              className="grid place-items-center w-4 h-4 rounded-full bg-[#7b3cff]/20 text-[#a463ff]"
              onClick={(e) => { e.stopPropagation(); onChange(options[0]); }}
            >
              <X size={10} />
            </span>
          )}
          <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 min-w-full w-[200px] rounded-xl border border-[#1d2545] bg-[#090e1b] shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              className={`w-full text-left px-4 py-2.5 text-[12px] transition-colors flex items-center justify-between ${
                value === opt
                  ? "bg-[#17102e] text-[#a463ff]"
                  : "text-[#c5ccdd] hover:bg-white/5"
              }`}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
              {value === opt && <span className="w-1.5 h-1.5 rounded-full bg-[#a463ff]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function FilterBar({ query, selectedCategory, onQueryChange, onCategoryChange, onAction }: FilterBarProps) {
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState(MODEL_OPTIONS[0]);
  const [selectedPricing, setSelectedPricing] = useState(PRICING_OPTIONS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_OPTIONS[0]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAction(query ? `Search: ${query}` : "Search");
  }

  function handleCategoryChange(label: string) {
    onCategoryChange(label);
    // If a real category slug exists, navigate to it
    if (label !== "All") {
      const slugMap: Record<string, string> = {
        "Models": "models",
        "Art": "art",
        "Logos & Icons": "logos-icons",
        "Graphics": "graphics",
        "Productivity": "productivity",
        "Marketing": "marketing",
        "Photography": "photography",
        "Games": "games",
        "Websites & UI": "websites-ui",
        "Social & Reels": "social-reels",
        "Coding Prompts": "coding-prompts",
      };
      const slug = slugMap[label];
      if (slug) {
        router.push(`/categories/${slug}`);
        return;
      }
    }
    window.history.replaceState(
      null,
      "",
      `/explore?q=${encodeURIComponent(query)}&category=${encodeURIComponent(label)}`
    );
  }

  return (
    <>
      <div className="mb-4 ml-[3px]">
        <h1 className="m-0 text-white text-[25px] font-[780] tracking-0 leading-[1.15]">Explore</h1>
        <p className="mt-[5px] text-[#8f98b3] text-[13px]">Discover amazing prompts from our community</p>
      </div>

      <div className="grid grid-cols-[minmax(200px,1.55fr)_repeat(3,minmax(120px,0.75fr))_100px] gap-2 mx-[3px] mb-5">
        <form
          className="flex items-center h-[37px] px-4 gap-3 border border-[#1d2545] rounded-xl bg-[#0c1122] text-[#c5ccdd] text-[12px]"
          onSubmit={submit}
        >
          <input
            className="flex-1 bg-transparent border-0 outline-none text-white placeholder-[#8990aa]"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search prompts..."
          />
          <Search className="text-[#aeb7d2]" size={18} />
        </form>

        <DropdownSelect
          label="All Models"
          options={MODEL_OPTIONS}
          value={selectedModel}
          onChange={setSelectedModel}
        />
        <DropdownSelect
          label="All Pricing"
          options={PRICING_OPTIONS}
          value={selectedPricing}
          onChange={setSelectedPricing}
        />
        <DropdownSelect
          label="All Languages"
          options={LANGUAGE_OPTIONS}
          value={selectedLanguage}
          onChange={setSelectedLanguage}
        />

        <button
          className="flex items-center justify-center h-[37px] gap-2 border border-[#3d2875] rounded-xl bg-[#0c1122] text-[#c5ccdd] text-[12px] cursor-pointer hover:bg-[#1a1c3d] transition-all"
          onClick={() => onAction("Filters")}
        >
          <SlidersHorizontal size={17} />
          Filters
        </button>
      </div>

      <div className="relative grid grid-cols-[68px_repeat(6,minmax(90px,1fr))_repeat(4,minmax(90px,1fr))_28px] gap-2 mb-[15px] p-2 border border-[#151d37] rounded-2xl bg-[#080d1a] overflow-x-auto">
        {filterCategories.map(({ icon: Icon, label, count }) => (
          <button
            className={`grid grid-cols-[24px_minmax(0,1fr)] grid-rows-[16px_15px] items-center min-w-0 h-[48px] gap-x-2 px-[9px] py-[7px] border rounded-xl text-left transition-all whitespace-nowrap
              ${selectedCategory === label
                ? "border-[#7b3cff] [box-shadow:inset_0_0_0_1px_rgba(122,53,255,0.45),0_0_28px_rgba(122,53,255,0.15)] text-white"
                : "border-[#1b2544] bg-[#0f1428] text-[#d8ddec] hover:border-[#3d2875] hover:bg-white/[0.02]"}`}
            key={label}
            onClick={() => handleCategoryChange(label)}
          >
            <span
              className={`grid place-items-center w-[24px] h-[24px] row-span-2 rounded-lg
                ${selectedCategory === label ? "bg-[#7a35ff]/28 text-white" : "bg-[#171d35] text-[#bcc5de]"}`}
            >
              <Icon size={16} />
            </span>
            <strong className="overflow-hidden text-[11px] font-[720] truncate">{label}</strong>
            <small className="text-[#808aa5] text-[11px]">{count}</small>
          </button>
        ))}
        <button
          className="grid place-items-center h-[48px] rounded-xl bg-[#10162a] text-[#a5aec8] hover:text-white cursor-pointer border-0 transition-all hover:bg-white/[0.05]"
          onClick={() => onAction("More categories")}
          aria-label="More categories"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
