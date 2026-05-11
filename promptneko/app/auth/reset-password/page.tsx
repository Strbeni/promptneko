"use client";
import { useState, FormEvent } from "react";
import { supabase } from "../../../lib/supabase";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-icon-wrap success"><CheckCircle2 size={28} /></div>
          <h1>Email sent</h1>
          <p className="auth-sub">Check <strong>{email}</strong> for a password reset link.</p>
          <Link href="/auth/login" className="auth-btn" style={{ display: "flex", justifyContent: "center" }}>Back to sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon-wrap"><Mail size={22} /></div>
        <h1>Reset password</h1>
        <p className="auth-sub">Enter your email and we'll send you a reset link.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="reset-email">Email</label>
            <div className="auth-input-wrap">
              <Mail size={15} className="auth-input-icon" />
              <input id="reset-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn" disabled={loading} id="reset-submit-btn">
            {loading ? <Loader2 size={17} className="auth-spinner" /> : "Send reset link"}
          </button>
        </form>
        <p className="auth-switch">
          <Link href="/auth/login" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <ArrowLeft size={13} /> Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
