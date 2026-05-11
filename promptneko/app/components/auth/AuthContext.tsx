"use client";

import {
  createContext,
  useContext,
  useEffect,
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  // Fetch the public.users row for the current auth user
  const fetchDbUser = useCallback(async (uid: string) => {
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
    const { data: { user: authUser } } = await supabase.auth.getUser();
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
  }, []);

  const refreshDbUser = useCallback(async () => {
    if (!user) return;
    const d = await fetchDbUser(user.id);
    setDbUser(d);
  }, [user, fetchDbUser]);

  // Bootstrap session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchDbUser(session.user.id).then((d) => {
          setDbUser(d);
          // Show onboarding if this is a brand-new user
          const done = localStorage.getItem(ONBOARDING_DONE_KEY);
          if (!done && d && d.role !== "creator" && d.role !== "admin") {
            setNeedsOnboarding(true);
          } else if (d && (d.role === "creator" || d.role === "admin")) {
            localStorage.setItem(ONBOARDING_DONE_KEY, "1");
            setNeedsOnboarding(false);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchDbUser(session.user.id).then((d) => {
          setDbUser(d);
          const done = localStorage.getItem(ONBOARDING_DONE_KEY);
          if (!done && d && d.role !== "creator" && d.role !== "admin") {
            setNeedsOnboarding(true);
          } else if (d && (d.role === "creator" || d.role === "admin")) {
            localStorage.setItem(ONBOARDING_DONE_KEY, "1");
            setNeedsOnboarding(false);
          }
        });
      } else {
        setDbUser(null);
        setNeedsOnboarding(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchDbUser]);

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
