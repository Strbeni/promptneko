"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { supabase } from "../../../lib/supabase";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type DbUser = {
  id: string;
  email: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  role: "buyer" | "creator" | "admin";
  is_email_verified: boolean;
  is_creator_approved: boolean;
  is_banned: boolean;
};

type AuthContextValue = {
  user: User | null;
  dbUser: DbUser | null;
  session: Session | null;
  loading: boolean;
  /** true if user has signed in but hasn't completed onboarding yet */
  needsOnboarding: boolean;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshDbUser: () => Promise<void>;
  /** Call after onboarding is complete */
  completeOnboarding: () => void;
};

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

const ONBOARDING_DONE_KEY = "pn_onboarding_done";
const DB_USER_CACHE_MS = 5 * 60 * 1000;

type DbUserCacheEntry = {
  data?: DbUser | null;
  expiresAt: number;
  promise?: Promise<DbUser | null>;
};

const dbUserCache = new Map<string, DbUserCacheEntry>();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const latestSessionUserId = useRef<string | null>(null);

  // Fetch the public.users row for the current auth user
  const fetchDbUser = useCallback(async (uid: string, authUser?: User, force = false) => {
    const now = Date.now();
    const cached = dbUserCache.get(uid);
    if (!force && cached?.data !== undefined && cached.expiresAt > now) return cached.data;
    if (!force && cached?.promise) return cached.promise;

    const promise = (async () => {
      // Use maybeSingle() — returns null (not 406) when no row exists
      const { data } = await (supabase as any)
        .from("users")
        .select(
          "id, email, username, display_name, avatar_url, role, is_email_verified, is_creator_approved, is_banned"
        )
        .eq("id", uid)
        .maybeSingle();

      if (data) return data as DbUser;

      // ── Self-healing fallback ─────────────────────────────────────────────
      // If no public.users row exists (migration 002 not yet run), create one
      // from the current auth session so the UI isn't stuck in a broken state.
      if (!authUser) return null;

      const base = authUser.email?.split("@")[0]?.toLowerCase().replace(/[^a-z0-9_-]+/g, "_") ?? "user";
      const uname = base + Math.floor(Math.random() * 9000 + 1000);
      const dname =
        authUser.user_metadata?.full_name ??
        authUser.user_metadata?.name ??
        authUser.email?.split("@")[0] ??
        "User";

      const { data: created } = await (supabase as any)
        .from("users")
        .upsert({
          id: authUser.id,
          email: authUser.email,
          username: uname,
          display_name: dname,
          avatar_url: authUser.user_metadata?.avatar_url ?? null,
          is_email_verified: !!authUser.email_confirmed_at,
        }, { onConflict: "id" })
        .select("id, email, username, display_name, avatar_url, role, is_email_verified, is_creator_approved, is_banned")
        .maybeSingle();

      return (created as DbUser) ?? null;
    })();

    dbUserCache.set(uid, { promise, expiresAt: now + DB_USER_CACHE_MS });

    try {
      const resolved = await promise;
      dbUserCache.set(uid, { data: resolved, expiresAt: Date.now() + DB_USER_CACHE_MS });
      return resolved;
    } catch (error) {
      dbUserCache.delete(uid);
      throw error;
    }
  }, []);

  const refreshDbUser = useCallback(async () => {
    if (!user) return;
    const d = await fetchDbUser(user.id, user, true);
    setDbUser(d);
  }, [user, fetchDbUser]);

  const applySession = useCallback(async (nextSession: Session | null) => {
    const authUser = nextSession?.user ?? null;
    latestSessionUserId.current = authUser?.id ?? null;
    setSession(nextSession);
    setUser(authUser);

    if (!authUser) {
      setDbUser(null);
      setNeedsOnboarding(false);
      setLoading(false);
      return;
    }

    const d = await fetchDbUser(authUser.id, authUser);
    if (latestSessionUserId.current !== authUser.id) return;

    setDbUser(d);
    const done = localStorage.getItem(ONBOARDING_DONE_KEY);
    if (!done && d && d.role !== "creator" && d.role !== "admin") {
      setNeedsOnboarding(true);
    } else if (d && (d.role === "creator" || d.role === "admin")) {
      localStorage.setItem(ONBOARDING_DONE_KEY, "1");
      setNeedsOnboarding(false);
    } else {
      setNeedsOnboarding(false);
    }
    setLoading(false);
  }, [fetchDbUser]);

  // Bootstrap session on mount
  useEffect(() => {
    let disposed = false;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!disposed) void applySession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      void applySession(session);
    });

    return () => {
      disposed = true;
      subscription.unsubscribe();
    };
  }, [applySession]);

  // ── Actions ────────────────────────────────────────────────────────────────

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem(ONBOARDING_DONE_KEY);
  };

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_DONE_KEY, "1");
    setNeedsOnboarding(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        dbUser,
        session,
        loading,
        needsOnboarding,
        signUp,
        signIn,
        signOut,
        refreshDbUser,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
