"use client";

import { useState } from "react";
import { MarketplaceLayout } from "./components/MarketplaceLayout";
import { HomePage } from "./components/HomePage";
import { ActionDrawer } from "./components/ActionDrawer";

import { DetailedPrompt } from "./components/marketplace-data";

import { useRouter } from "next/navigation";

export default function MainPage({ allPrompts = [] }: { allPrompts?: DetailedPrompt[] }) {
  const [query, setQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Home");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const router = useRouter();

  function openAction(action: string) {
    setDrawerAction(action);
  }

  function handleSearch() {
    if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query)}`);
    } else {
      router.push(`/explore`);
    }
  }

  return (
    <MarketplaceLayout
      query={query}
      onQueryChange={setQuery}
      onSearch={handleSearch}
      activeNav={activeNav}
      onAction={(action) => {
        setActiveNav(action);
        openAction(action);
      }}
    >
      <HomePage 
        setDrawerAction={setDrawerAction} 
        allPrompts={allPrompts}
      />

      <ActionDrawer 
        action={drawerAction} 
        prompt={null} 
        onClose={() => {
          setDrawerAction(null);
        }} 
      />
    </MarketplaceLayout>
  );
}
