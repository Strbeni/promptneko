import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "./supabase";

type RateEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateEntry>();

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export async function getRequestIdentity(scope: string) {
  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headerStore.get("x-real-ip")?.trim();
  return `${scope}:${forwardedFor || realIp || "anonymous"}`;
}

export async function rateLimit(scope: string, limit: number, windowMs: number) {
  const key = await getRequestIdentity(scope);
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0 };
  }

  entry.count += 1;
  return { ok: true, remaining: limit - entry.count };
}

export async function requireUser() {
  const cookieStore = await cookies();
  const authClient = createSupabaseServerClient(cookieStore);
  const {
    data: { user },
    error,
  } = await authClient.auth.getUser();

  if (error || !user) {
    return { user: null, authClient, error: "Unauthorized" as const };
  }

  return { user, authClient, error: null };
}
