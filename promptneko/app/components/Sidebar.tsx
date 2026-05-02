"use client";

import { ChevronRight, Coins, Hexagon, Moon, Settings } from "lucide-react";
import Link from "next/link";
import { sidebarGroups } from "./marketplace-data";

type SidebarProps = {
  active: string;
  credits: number;
  onAction: (action: string) => void;
  onTopUp: () => void;
};

export function Sidebar({ active, credits, onAction, onTopUp }: SidebarProps) {
  return (
    <aside className="flex flex-col flex-[0_0_208px] h-screen px-[17px] py-4 border-r border-[#141b31] [background:linear-gradient(180deg,#070b16_0%,#07101c_100%)]">
      <Link 
        className="flex items-center h-[38px] mb-[15px] gap-[9px] text-[22px] font-[760] tracking-[-0.01em] no-underline text-white" 
        href="/" 
        onClick={() => onAction("Home")}
      >
        <Hexagon className="text-[#7b3cff]" size={29} />
        <span>PromptHub</span>
      </Link>

      <div className="flex flex-col gap-0">
        {sidebarGroups.map((group) => (
          <section className="mt-[15px] first:mt-0" key={group.title ?? "main"}>
            {group.title ? (
              <div className="flex items-center h-[25px] mx-1 mb-2 gap-3 text-[#8c94ad] text-[11px] uppercase">
                <span>{group.title}</span>
                <i className="flex-1 h-px bg-[#141b31]" />
              </div>
            ) : null}
            {group.items.map(({ icon: Icon, label, href }) => (
              <Link
                className={`flex items-center w-full h-[35px] gap-3 px-[10px] mb-[3px] rounded-8 text-[14px] no-underline transition-colors
                  ${active === label 
                    ? "border border-[#6540b6] [background:linear-gradient(90deg,rgba(124,60,255,0.35),rgba(124,60,255,0.08))] text-white" 
                    : "bg-transparent text-[#d8ddf2] hover:bg-white/5"}`}
                href={href}
                key={label}
                onClick={() => {
                  if (href === "/" || href === "/explore") return;
                  onAction(label);
                }}
              >
                <Icon className={active === label ? "text-white" : "text-[#dce4ff]"} size={18} strokeWidth={1.85} />
                <span>{label}</span>
                {active === label ? <ChevronRight className="ml-auto text-[#a46aff]" size={16} /> : null}
              </Link>
            ))}
          </section>
        ))}
      </div>

      <section className="mt-auto p-3 border border-[#202746] rounded-8 [background:linear-gradient(180deg,#0d1324,#0a101d)]">
        <button 
          className="flex justify-between w-full p-0 bg-transparent border-0 text-[#c7cce0] text-[11px] cursor-pointer"
          onClick={() => onAction("Credit history")}
        >
          <span>Your Credits</span>
          <ChevronRight size={14} />
        </button>
        <strong className="flex items-center gap-[6px] my-2 text-[20px] font-500 text-white">
          {credits.toLocaleString()} <Coins className="fill-[#f4a11b] text-[#f4a11b]" size={14} />
        </strong>
        <button 
          className="w-full h-[29px] rounded-6 text-white text-[13px] font-[650] cursor-pointer [background:linear-gradient(180deg,#8751ff_0%,#6530e9_100%)] [box-shadow:0_0_24px_rgba(112,61,255,0.34)]" 
          onClick={onTopUp}
        >
          Top Up
        </button>
      </section>

      <div className="flex justify-between px-[14px] pt-[22px] text-[#ccd5ee]">
        <button aria-label="Settings" className="bg-transparent border-0 cursor-pointer text-inherit" onClick={() => onAction("Settings")}><Settings size={19} /></button>
        <button aria-label="Preferences" className="bg-transparent border-0 cursor-pointer text-inherit" onClick={() => onAction("Preferences")}><Settings size={19} /></button>
        <button aria-label="Theme" className="bg-transparent border-0 cursor-pointer text-inherit" onClick={() => onAction("Theme")}><Moon size={19} /></button>
      </div>
    </aside>
  );
}
