"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.replace("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon-wrap"><Lock size={22} /></div>
        <h1>New password</h1>
        <p className="auth-sub">Choose a strong password for your account.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="new-password">New password</label>
            <div className="auth-input-wrap">
              <Lock size={15} className="auth-input-icon" />
              <input id="new-password" type={showPw ? "text" : "password"} placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)} minLength={8} required autoComplete="new-password" />
              <button type="button" className="auth-pw-toggle" onClick={() => setShowPw(v => !v)}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn" disabled={loading} id="update-pw-btn">
            {loading ? <Loader2 size={17} className="auth-spinner" /> : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
