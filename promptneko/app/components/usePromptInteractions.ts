"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "./auth/AuthContext";
import { DetailedPrompt } from "./marketplace-data";

type CounterPatch = {
  likes?: number;
  saves?: number;
  views?: number;
};

const LOCAL_KEY = "pn_static_interactions";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isDbPrompt(id: string) {
  return UUID_RE.test(id);
}

function readLocal() {
  if (typeof window === "undefined") return { liked: [] as string[], saved: [] as string[] };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? "{}");
    return {
      liked: Array.isArray(parsed.liked) ? parsed.liked : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return { liked: [] as string[], saved: [] as string[] };
  }
}

function writeLocal(liked: Set<string>, saved: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    LOCAL_KEY,
    JSON.stringify({
      liked: Array.from(liked).filter((id) => !isDbPrompt(id)),
      saved: Array.from(saved).filter((id) => !isDbPrompt(id)),
    })
  );
}

export function usePromptInteractions(prompts: DetailedPrompt[]) {
  const { user } = useAuth();
  const [liked, setLiked] = useState<Set<string>>(() => new Set(readLocal().liked));
  const [saved, setSaved] = useState<Set<string>>(() => new Set(readLocal().saved));
  const [counterPatches, setCounterPatches] = useState<Record<string, CounterPatch>>({});

  const dbIdsKey = useMemo(() => prompts.map((prompt) => prompt.id).filter(isDbPrompt).join(","), [prompts]);

  useEffect(() => {
    const local = readLocal();
    setLiked((current) => new Set([...local.liked, ...Array.from(current).filter(isDbPrompt)]));
    setSaved((current) => new Set([...local.saved, ...Array.from(current).filter(isDbPrompt)]));
  }, []);

  useEffect(() => {
    if (!user || !dbIdsKey) return;

    const controller = new AbortController();
    fetch(`/api/me/interactions?ids=${encodeURIComponent(dbIdsKey)}`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (!payload) return;
        const local = readLocal();
        setLiked(new Set([...local.liked, ...(payload.liked ?? [])]));
        setSaved(new Set([...local.saved, ...(payload.saved ?? [])]));
      })
      .catch(() => {});

    return () => controller.abort();
  }, [dbIdsKey, user]);

  const persistLocal = useCallback((nextLiked: Set<string>, nextSaved: Set<string>) => {
    writeLocal(nextLiked, nextSaved);
  }, []);

  const toggleLike = useCallback(
    async (prompt: DetailedPrompt) => {
      const wasLiked = liked.has(prompt.id);
      const next = new Set(liked);
      if (wasLiked) next.delete(prompt.id);
      else next.add(prompt.id);
      setLiked(next);
      persistLocal(next, saved);

      if (!isDbPrompt(prompt.id)) return { ok: true, localOnly: true };

      const res = await fetch(`/api/prompts/${prompt.id}/like`, { method: "POST" });
      if (!res.ok) {
        setLiked(liked);
        return { ok: false, status: res.status };
      }

      const payload = await res.json();
      setCounterPatches((current) => ({
        ...current,
        [prompt.id]: { ...current[prompt.id], likes: payload.likes },
      }));
      return { ok: true, localOnly: false };
    },
    [liked, persistLocal, saved]
  );

  const toggleSave = useCallback(
    async (prompt: DetailedPrompt) => {
      const wasSaved = saved.has(prompt.id);
      const next = new Set(saved);
      if (wasSaved) next.delete(prompt.id);
      else next.add(prompt.id);
      setSaved(next);
      persistLocal(liked, next);

      if (!isDbPrompt(prompt.id)) return { ok: true, localOnly: true };

      const res = await fetch(`/api/prompts/${prompt.id}/save`, { method: "POST" });
      if (!res.ok) {
        setSaved(saved);
        return { ok: false, status: res.status };
      }

      const payload = await res.json();
      setCounterPatches((current) => ({
        ...current,
        [prompt.id]: { ...current[prompt.id], saves: payload.saves },
      }));
      return { ok: true, localOnly: false };
    },
    [liked, persistLocal, saved]
  );

  const setViews = useCallback((promptId: string, views: number) => {
    setCounterPatches((current) => ({
      ...current,
      [promptId]: { ...current[promptId], views },
    }));
  }, []);

  return { liked, saved, counterPatches, toggleLike, toggleSave, setViews };
}
