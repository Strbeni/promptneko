"use client";

import { Bell, Command, MessageSquare, Plus, Search } from "lucide-react";
import { FormEvent } from "react";
import { CropImage } from "./CropImage";

type TopBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  onAction: (action: string) => void;
};

export function TopBar({ query, onQueryChange, onSearch, onAction }: TopBarProps) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <header className="flex items-center h-[58px] gap-[22px] px-5 pt-[11px] border-b border-[#141b31]">
      <form className="flex items-center w-[min(386px,32vw)] h-[34px] gap-3 px-[13px] border border-[#202746] rounded-xl bg-[#0b1020] text-[#8990aa] text-[13px] transition-all focus-within:border-[#7b3cff] focus-within:shadow-[0_0_15px_rgba(123,60,255,0.15)]" onSubmit={submit}>
        <Search size={18} />
        <input 
          className="flex-1 min-w-0 bg-transparent border-0 outline-none text-white font-inherit placeholder-[#8990aa]" 
          value={query} 
          onChange={(event) => onQueryChange(event.target.value)} 
          placeholder="Search prompts, models, users..." 
        />
        <kbd className="px-2 py-[2px] border border-[#29314f] rounded-lg bg-[#12182a] text-[#abb1c8] text-[11px] leading-none">
          <Command size={12} className="inline mr-1" />/
        </kbd>
      </form>

      <button 
        className="flex items-center h-[34px] gap-[9px] ml-auto px-[17px] rounded-xl text-white text-[13px] font-bold cursor-pointer [background:linear-gradient(180deg,#8751ff_0%,#6530e9_100%)] [box-shadow:0_0_24px_rgba(112,61,255,0.34)] transition-all hover:brightness-110 hover:scale-[1.02]" 
        onClick={() => onAction("Create Prompt")}
      >
        <Plus size={18} />
        Create Prompt
      </button>

      <button 
        className="relative grid place-items-center w-[27px] h-[34px] bg-transparent border-0 cursor-pointer text-[#d8def2]" 
        aria-label="Notifications" 
        onClick={() => onAction("Notifications")}
      >
        <Bell size={20} />
        <span className="absolute top-[2px] right-[1px] grid place-items-center w-[14px] h-[14px] rounded-full bg-[#ed3b76] text-white text-[9px] font-bold">
          3
        </span>
      </button>

      <button 
        className="grid place-items-center w-[27px] h-[34px] bg-transparent border-0 cursor-pointer text-[#d8def2]" 
        aria-label="Messages" 
        onClick={() => onAction("Messages")}
      >
        <MessageSquare size={20} />
      </button>

      <button 
        className="flex items-center gap-[10px] min-width-[153px] p-0 bg-transparent border-0 text-left cursor-pointer text-inherit" 
        onClick={() => onAction("Profile menu")}
      >
        <CropImage className="w-[38px] h-[38px] rounded-full" />
        <span className="flex flex-col">
          <strong className="block text-white text-[14px] leading-[1.05]">Lunaria</strong>
          <em className="inline-block mt-[2px] px-[6px] py-[1px] rounded-5 bg-[#4e36a1] text-white text-[10px] font-bold not-italic">Pro</em>
        </span>
      </button>
    </header>
  );
}
