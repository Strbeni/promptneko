"use client";

import { ChevronDown, ChevronRight, Coins, Hexagon, Moon, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { sidebarGroups } from "./marketplace-data";

type SidebarProps = {
  active: string;
  credits: number;
  onAction: (action: string) => void;
  onTopUp: () => void;
};

export function Sidebar({ active, credits, onAction, onTopUp }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(["Categories"]));

  const toggleExpand = (label: string) => {
    const next = new Set(expandedItems);
    if (next.has(label)) {
      next.delete(label);
    } else {
      next.add(label);
    }
    setExpandedItems(next);
  };

  return (
    <aside className="flex flex-col flex-[0_0_208px] h-screen px-[17px] py-4 border-r border-[#141b31] [background:linear-gradient(180deg,#070b16_0%,#07101c_100%)] ">
      <Link 
        className="flex items-center h-[38px] mb-[15px] gap-[9px] text-[22px] font-[760] tracking-[-0.01em] no-underline text-white" 
        href="/" 
        onClick={() => onAction("Home")}
      >
        <Hexagon className="text-[#7b3cff]" size={29} />
        <span>PromptHub</span>
      </Link>

      <div className="flex-1 flex flex-col gap-0 overflow-y-auto custom-scrollbar">
        {sidebarGroups.map((group) => (
          <section className="relative mt-[15px] first:mt-0" key={group.title ?? "main"}>
            {group.title ? (
              <div className="flex items-center h-[25px] mx-1 mb-2 gap-3 text-[#8c94ad] text-[11px] uppercase">
                <span>{group.title}</span>
                <i className="flex-1 h-px bg-[#141b31]" />
              </div>
            ) : null}

            <div className="relative">
              {group.title === "Generate" && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/20 backdrop-blur-[3px] border border-white/5 cursor-not-allowed group">
                  <span className="text-[9px] font-extrabold text-white uppercase tracking-[0.1em] bg-gradient-to-r from-[#7b3cff] to-[#6530e9] px-2.5 py-1 rounded-full shadow-[0_0_15px_rgba(123,60,255,0.4)] opacity-90 group-hover:opacity-100 transition-opacity">
                    Under Development
                  </span>
                </div>
              )}
              
              {group.items.map((item) => {
                const { icon: Icon, label, href, children } = item as any;
                const isExpanded = expandedItems.has(label);
                const isActive = active === label;

                return (
                  <div key={label} className="flex flex-col">
                    {children ? (
                      <button
                        className={`flex items-center w-full h-[35px] gap-3 px-[10px] mb-[3px] rounded-xl text-[14px] text-left border-0 cursor-pointer transition-all duration-200
                          ${isActive 
                            ? "border border-[#6540b6] [background:linear-gradient(90deg,rgba(124,60,255,0.35),rgba(124,60,255,0.08))] text-white" 
                            : "bg-transparent text-[#d8ddf2] hover:bg-white/5"}`}
                        onClick={() => toggleExpand(label)}
                      >
                        <Icon className={isActive ? "text-white" : "text-[#dce4ff]"} size={18} strokeWidth={1.85} />
                        <span className="flex-1">{label}</span>
                        <Link href=""></Link>
                        {isExpanded ? <ChevronDown className="text-[#818aa7]" size={16} /> : <ChevronRight className="text-[#818aa7]" size={16} />}
                      </button>
                    ) : (
                      <Link
                        className={`flex items-center w-full h-[35px] gap-3 px-[10px] mb-[3px] rounded-xl text-[14px] no-underline transition-all duration-200
                          ${isActive 
                            ? "border border-[#6540b6] [background:linear-gradient(90deg,rgba(124,60,255,0.35),rgba(124,60,255,0.08))] text-white" 
                            : "bg-transparent text-[#d8ddf2] hover:bg-white/5 hover:translate-x-1"}`}
                        href={href}
                        onClick={() => {
                          if (href === "/" || href === "/explore") return;
                          onAction(label);
                        }}
                      >
                        <Icon className={isActive ? "text-white" : "text-[#dce4ff]"} size={18} strokeWidth={1.85} />
                        <span>{label}</span>
                        {isActive ? <ChevronRight className="ml-auto text-[#a46aff]" size={16} /> : null}
                      </Link>
                    )}

                    {children && isExpanded && (
                      <div className="flex flex-col ml-8 mt-1 mb-2 gap-1 max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
                        {children.map((child: any) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`text-[13px] py-1.5 px-2 rounded-lg no-underline transition-colors
                              ${active === child.label ? "text-[#a46aff] font-semibold" : "text-[#8c94ad] hover:text-white hover:bg-white/5"}`}
                            onClick={() => onAction(child.label)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-4 p-3 border border-[#202746] rounded-2xl [background:linear-gradient(180deg,#0d1324,#0a101d)]">
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
          className="w-full h-[29px] rounded-lg text-white text-[13px] font-[650] cursor-pointer [background:linear-gradient(180deg,#8751ff_0%,#6530e9_100%)] [box-shadow:0_0_24px_rgba(112,61,255,0.34)] transition-all hover:brightness-110 hover:scale-[1.02]" 
          onClick={onTopUp}
        >
          Top Up
        </button>
      </section>

      <div className="flex justify-between px-[14px] pt-[22px] text-[#ccd5ee]">
        <button aria-label="Settings" className="bg-transparent border-0 cursor-pointer text-inherit hover:text-white hover:scale-110 transition-all duration-200" onClick={() => onAction("Settings")}><Settings size={19} /></button>
        <button aria-label="Preferences" className="bg-transparent border-0 cursor-pointer text-inherit hover:text-white hover:scale-110 transition-all duration-200" onClick={() => onAction("Preferences")}><Settings size={19} /></button>
        <button aria-label="Theme" className="bg-transparent border-0 cursor-pointer text-inherit hover:text-white hover:scale-110 transition-all duration-200" onClick={() => onAction("Theme")}><Moon size={19} /></button>
      </div>
    </aside>
  );
}
