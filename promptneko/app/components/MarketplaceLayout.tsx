"use client";

import { ReactNode, useEffect, useState } from "react";
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
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  return (
    <div
      className="prompt-shell fixed inset-0 flex overflow-hidden"
    >
      <Sidebar
        active={activeNav}
        theme={theme}
        onAction={onAction}
        onToggleTheme={toggleTheme}
      />
      <main className="content flex-1 min-w-0 flex flex-col">
        <TopBar
          query={query}
          onQueryChange={onQueryChange}
          onSearch={onSearch}
          onAction={onAction}
        />
        {children}
      </main>
    </div>
  );
}
