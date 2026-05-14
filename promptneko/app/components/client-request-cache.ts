"use client";

type CacheEntry<T> = {
  data?: T;
  expiresAt: number;
  promise?: Promise<T | null>;
};

const jsonCache = new Map<string, CacheEntry<unknown>>();

export function getCachedJson<T>(url: string, ttlMs: number): Promise<T | null> {
  const now = Date.now();
  const existing = jsonCache.get(url) as CacheEntry<T> | undefined;

  if (existing?.data !== undefined && existing.expiresAt > now) {
    return Promise.resolve(existing.data);
  }

  if (existing?.promise) {
    return existing.promise;
  }

  const promise = fetch(url)
    .then((res) => (res.ok ? (res.json() as Promise<T>) : null))
    .then((data) => {
      jsonCache.set(url, { data: data ?? undefined, expiresAt: Date.now() + ttlMs });
      return data;
    })
    .catch((error) => {
      jsonCache.delete(url);
      throw error;
    });

  jsonCache.set(url, { promise, expiresAt: now + ttlMs });
  return promise;
}

export function setCachedJson<T>(url: string, data: T, ttlMs: number) {
  jsonCache.set(url, { data, expiresAt: Date.now() + ttlMs });
}

export function invalidateCachedJson(prefix: string) {
  for (const key of jsonCache.keys()) {
    if (key.startsWith(prefix)) jsonCache.delete(key);
  }
}
