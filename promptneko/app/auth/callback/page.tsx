"use client";
// /app/auth/callback/page.tsx
// Supabase email links redirect here. We just show a loading spinner;
// the AuthContext listener will pick up the session automatically.

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Exchange the code/token in the URL for a session
    supabase.auth.getSession().then(() => {
      router.replace("/");
    });
  }, [router]);

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ alignItems: "center", gap: 16 }}>
        <Loader2 size={32} className="auth-spinner" style={{ color: "var(--purple)" }} />
        <p style={{ color: "var(--muted)", fontSize: 14 }}>Confirming your account…</p>
      </div>
    </div>
  );
}
