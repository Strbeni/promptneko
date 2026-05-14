"use client";

import { ChevronDown, ChevronRight, Hexagon, Moon, Settings, Sliders } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sidebarGroups } from "./marketplace-data";

type SidebarProps = {
  active: string;
  credits?: number;
  onAction: (action: string) => void;
  onTopUp?: () => void;
};

export function Sidebar({ active, onAction }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const parent = sidebarGroups
      .flatMap((group) => group.items)
      .find((item: any) => item.children?.some((child: any) => child.label === active));

    if (!parent) return;
    setExpandedItems((current) => {
      if (current.has(parent.label)) return current;
      const next = new Set(current);
      next.add(parent.label);
      return next;
    });
  }, [active]);

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
    <aside className="flex flex-col flex-[0_0_220px] h-screen px-4 py-5 border-r border-[#141b31]/80 [background:linear-gradient(180deg,#040711_0%,#070d19_100%)] select-none">
      {/* Brand Header */}
      <Link 
        className="flex items-center h-10 mb-6 gap-3 no-underline group" 
        href="/" 
        onClick={() => onAction("Home")}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#7b3cff] to-[#6530e9] shadow-[0_0_16px_rgba(123,60,255,0.3)] group-hover:shadow-[0_0_20px_rgba(123,60,255,0.5)] transition-all duration-300">
          <Hexagon className="text-white" size={18} strokeWidth={2.5} />
        </div>
        <span className="text-[19px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2e8f0] to-[#a46aff]">
          PromptNeko
        </span>
      </Link>

      {/* Navigation Groups */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto custom-scrollbar pr-1 -mr-1">
        {sidebarGroups.map((group) => (
          <section className="relative" key={group.title ?? "main"}>
            {group.title ? (
              <div className="flex items-center h-6 px-2 mb-2 text-[#657091] text-[10px] font-bold tracking-[0.15em] uppercase">
                <span>{group.title}</span>
              </div>
            ) : null}

            <div className="relative flex flex-col gap-0.5">
              {group.title === "Generate" && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-[#040711]/85 backdrop-blur-[2px] border border-white/5 cursor-not-allowed group">
                  <span className="text-[9px] font-extrabold text-white uppercase tracking-[0.12em] bg-gradient-to-r from-[#7b3cff] to-[#6530e9] px-3 py-1 rounded-full shadow-[0_0_15px_rgba(123,60,255,0.4)] opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
                    Under Development
                  </span>
                </div>
              )}
              
              {group.items.map((item) => {
                const { icon: Icon, label, href, children } = item as any;
                const isExpanded = expandedItems.has(label);
                const isActive = active === label || children?.some((child: any) => child.label === active);

                const baseItemClass = "flex items-center w-full h-[36px] gap-3 px-3 rounded-xl text-[13.5px] font-medium no-underline transition-all duration-200 relative group";
                const activeClass = "bg-gradient-to-r from-[#7b3cff]/20 via-[#7b3cff]/10 to-transparent text-white border border-[#7b3cff]/30 shadow-[0_0_12px_rgba(123,60,255,0.1)]";
                const inactiveClass = "bg-transparent text-[#9ba5c7] hover:text-white hover:bg-white/[0.04]";

                return (
                  <div key={label} className="flex flex-col">
                    {children ? (
                      <div className={`${baseItemClass} ${isActive ? activeClass : inactiveClass}`}>
                        <Link 
                          href={href} 
                          className="flex flex-1 items-center gap-3 no-underline text-inherit h-full"
                          onClick={() => {
                            if (href === "/" || href === "/explore" || href === "/categories") return;
                            onAction(label);
                          }}
                        >
                          <Icon className={`transition-colors ${isActive ? "text-white" : "text-[#7e89ac] group-hover:text-[#b4bfea]"}`} size={17} strokeWidth={2} />
                          <span className="flex-1 truncate">{label}</span>
                        </Link>
                        <button 
                          className="flex items-center justify-center h-full px-1 -mr-1 bg-transparent border-0 cursor-pointer text-[#657091] hover:text-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleExpand(label);
                          }}
                          aria-label="Toggle submenu"
                        >
                          {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                        </button>
                        {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#8751ff] rounded-r-full" />}
                      </div>
                    ) : (
                      <Link
                        className={`${baseItemClass} ${isActive ? activeClass : inactiveClass}`}
                        href={href}
                        onClick={() => {
                          if (href === "/" || href === "/explore") return;
                          onAction(label);
                        }}
                      >
                        <Icon className={`transition-colors ${isActive ? "text-white" : "text-[#7e89ac] group-hover:text-[#b4bfea]"}`} size={17} strokeWidth={2} />
                        <span className="truncate">{label}</span>
                        {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#8751ff] rounded-r-full" />}
                      </Link>
                    )}

                    {children && isExpanded && (
                      <div className="flex flex-col ml-7 pl-2.5 mt-1 mb-1.5 gap-0.5 border-l border-[#141b31] max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                        {children.map((child: any) => {
                          const isChildActive = active === child.label;
                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              className={`flex items-center h-[30px] px-2.5 rounded-lg text-[12.5px] no-underline transition-all duration-150
                                ${isChildActive 
                                  ? "text-[#a46aff] font-semibold bg-[#7b3cff]/10" 
                                  : "text-[#7e89ac] hover:text-white hover:bg-white/[0.03]"}`}
                              onClick={() => onAction(child.label)}
                            >
                              <span className="truncate">{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Footer Controls */}
      <div className="mt-auto pt-4 border-t border-[#141b31] flex items-center justify-between px-1 text-[#7e89ac]">
        <button 
          aria-label="Settings" 
          title="Settings"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer text-inherit hover:text-white hover:bg-white/5 transition-all duration-200" 
          onClick={() => onAction("Settings")}
        >
          <Settings size={17} />
        </button>
        <button 
          aria-label="Preferences" 
          title="Preferences"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer text-inherit hover:text-white hover:bg-white/5 transition-all duration-200" 
          onClick={() => onAction("Preferences")}
        >
          <Sliders size={17} />
        </button>
        <button 
          aria-label="Theme" 
          title="Toggle Theme"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer text-inherit hover:text-white hover:bg-white/5 transition-all duration-200" 
          onClick={() => onAction("Theme")}
        >
          <Moon size={17} />
        </button>
      </div>
    </aside>
  );
}
