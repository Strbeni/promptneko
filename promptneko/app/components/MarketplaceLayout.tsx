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

  return (
    <div className="fixed inset-0 flex w-screen h-screen overflow-hidden bg-[#060913] text-[#f4f1ff] [background:radial-gradient(circle_at_72%_0%,rgba(81,44,173,0.15),transparent_30%),linear-gradient(180deg,#050813_0%,#07101b_100%)]">
      <Sidebar
        active={activeNav}
        credits={credits}
        onAction={onAction}
        onTopUp={() => {
          setCredits((value) => value + 250);
          onAction("250 credits added");
        }}
      />
      <main className="flex flex-col flex-1 min-w-0">
        <TopBar query={query} onQueryChange={onQueryChange} onSearch={onSearch} onAction={onAction} />
        {children}
      </main>
    </div>
  );
}
