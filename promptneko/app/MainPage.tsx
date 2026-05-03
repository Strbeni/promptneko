"use client";

import { useState } from "react";
import { MarketplaceLayout } from "./components/MarketplaceLayout";
import { HomePage } from "./components/HomePage";
import { ActionDrawer } from "./components/ActionDrawer";

export default function MainPage() {
  const [query, setQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Home");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);

  function openAction(action: string) {
    setDrawerAction(action);
  }

  return (
    <MarketplaceLayout
      query={query}
      onQueryChange={setQuery}
      onSearch={() => openAction(query ? `Search: ${query}` : "Search")}
      activeNav={activeNav}
      onAction={(action) => {
        setActiveNav(action);
        openAction(action);
      }}
    >
      <HomePage setDrawerAction={setDrawerAction} />

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
