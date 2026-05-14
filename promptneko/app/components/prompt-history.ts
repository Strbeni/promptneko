"use client";

import { DetailedPrompt } from "./marketplace-data";

export type PromptHistoryEntry = {
  id: string;
  slug: string;
  viewedAt: string;
};

const HISTORY_KEY = "pn_prompt_history";
const HISTORY_LIMIT = 80;

export function readPromptHistory(): PromptHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(HISTORY_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is PromptHistoryEntry => (
        typeof item?.id === "string" &&
        typeof item?.slug === "string" &&
        typeof item?.viewedAt === "string"
      ))
      .slice(0, HISTORY_LIMIT);
  } catch {
    return [];
  }
}

export function writePromptHistory(entries: PromptHistoryEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, HISTORY_LIMIT)));
}

export function recordPromptView(prompt: DetailedPrompt) {
  const nextEntry: PromptHistoryEntry = {
    id: prompt.id,
    slug: prompt.slug,
    viewedAt: new Date().toISOString(),
  };
  const existing = readPromptHistory().filter((entry) => entry.id !== prompt.id && entry.slug !== prompt.slug);
  writePromptHistory([nextEntry, ...existing]);
}

export function clearPromptHistory() {
  writePromptHistory([]);
}
