"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

type MarketplaceLayoutProps = {
  activeNav: string;
  query: string;
  children: ReactNode;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  onAction: (action: string) => void;
};

export function MarketplaceLayout({ activeNav, query, children, onQueryChange, onSearch, onAction }: MarketplaceLayoutProps) {
  const [credits, setCredits] = useState(1250);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex w-screen h-screen overflow-hidden bg-[#060913] text-[#f4f1ff] [background:radial-gradient(circle_at_72%_0%,rgba(81,44,173,0.15),transparent_30%),linear-gradient(180deg,#050813_0%,#07101b_100%)]">
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar
          active={activeNav}
          credits={credits}
          onAction={(action) => {
            onAction(action);
            setIsSidebarOpen(false);
          }}
          onTopUp={() => {
            setCredits((value) => value + 250);
            onAction("250 credits added");
          }}
        />
      </div>
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex flex-col flex-1 min-w-0">
        <TopBar 
          query={query} 
          onQueryChange={onQueryChange} 
          onSearch={onSearch} 
          onAction={onAction} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        {children}
      </main>
    </div>
  );
}
