"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../components/auth/AuthContext";
import Link from "next/link";

type Mode = "login" | "signup";

export default function AuthPage({ defaultMode = "login" }: { defaultMode?: Mode }) {
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signedUp, setSignedUp] = useState(false); // email-sent state

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "signup") {
      const { error } = await signUp(email, password);
      setLoading(false);
      if (error) { setError(error); return; }
      setSignedUp(true);
    } else {
      const { error } = await signIn(email, password);
      setLoading(false);
      if (error) { setError(error); return; }
      router.push("/");
    }
  }

  // ── Email-sent confirmation screen ──────────────────────────────────────
  if (signedUp) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-icon-wrap success">
            <Mail size={28} />
          </div>
          <h1>Check your inbox</h1>
          <p className="auth-sub">
            We sent a verification link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <p className="auth-note">Link expires in 24 hours. Check spam if you don't see it.</p>
          <button className="auth-btn" onClick={() => { setSignedUp(false); setMode("login"); }}>
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-icon-wrap">
            <Sparkles size={22} />
          </div>
          <span>PromptNeko</span>
        </div>

        <h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="auth-sub">
          {mode === "login"
            ? "Sign in to access your prompts and dashboard."
            : "Join thousands of creators and buyers."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email */}
          <div className="auth-field">
            <label htmlFor="auth-email">Email</label>
            <div className="auth-input-wrap">
              <Mail size={15} className="auth-input-icon" />
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <div className="auth-label-row">
              <label htmlFor="auth-password">Password</label>
              {mode === "login" && (
                <Link href="/auth/reset-password" className="auth-forgot">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="auth-input-wrap">
              <Lock size={15} className="auth-input-icon" />
              <input
                id="auth-password"
                type={showPw ? "text" : "password"}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder={mode === "signup" ? "At least 8 characters" : "••••••••"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={mode === "signup" ? 8 : 1}
                required
              />
              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn" disabled={loading} id="auth-submit-btn">
            {loading ? (
              <Loader2 size={17} className="auth-spinner" />
            ) : (
              <>
                {mode === "login" ? "Sign in" : "Create account"}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
