/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../../../lib/supabase";
import { ShoppingBag, Wand2, X, Loader2, ChevronRight } from "lucide-react";

const SPECIALIZATION_OPTIONS = [
  "Writing & Copy", "Image Generation", "Code & Dev", "Marketing",
  "Business", "Research", "Education", "Productivity", "Finance", "Design",
];

export function OnboardingModal() {
  const { dbUser, refreshDbUser, completeOnboarding } = useAuth();
  const [step, setStep] = useState<"role" | "creator-profile">("role");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Creator profile fields
  const [displayName, setDisplayName] = useState(dbUser?.display_name ?? "");
  const [tagline, setTagline] = useState("");
  const [specs, setSpecs] = useState<string[]>([]);

  async function chooseBuyer() {
    // Just mark onboarding done — role defaults to 'buyer' in DB
    completeOnboarding();
  }

  async function chooseCreator() {
    setStep("creator-profile");
  }

  function toggleSpec(s: string) {
    setSpecs((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function submitCreatorProfile() {
    if (!dbUser) return;
    setLoading(true);
    setError(null);

    // 1. Update users row: role → creator, display_name
    const { error: userErr } = await (supabase as any)
      .from("users")
      .update({ role: "creator", display_name: displayName })
      .eq("id", dbUser.id);

    if (userErr) { setError(userErr.message); setLoading(false); return; }

    // 2. Create creator_profiles row
    const { error: cpErr } = await (supabase as any)
      .from("creator_profiles")
      .upsert({
        user_id: dbUser.id,
        tagline: tagline || null,
        specializations: specs,
      }, { onConflict: "user_id" });

    if (cpErr) { setError(cpErr.message); setLoading(false); return; }

    // 3. Notify admin via API (fire-and-forget)
    fetch("/api/admin/notify-creator-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: dbUser.id, displayName }),
    }).catch(() => {});

    await refreshDbUser();
    setLoading(false);
    completeOnboarding();
  }

  // ── Role selection step ────────────────────────────────────────────────
  if (step === "role") {
    return (
      <div className="modal-backdrop">
        <div className="onboarding-modal">
          <h2>Welcome to PromptNeko 🎉</h2>
          <p className="onboarding-sub">How will you primarily use the platform?</p>

          <div className="onboarding-cards">
            <button className="onboarding-card" onClick={chooseBuyer} id="onboarding-buyer-btn">
              <div className="onboarding-card-icon buyer">
                <ShoppingBag size={28} />
              </div>
              <strong>I'm a Buyer</strong>
              <span>Discover and purchase high-quality AI prompts for any task.</span>
              <div className="onboarding-card-arrow"><ChevronRight size={18} /></div>
            </button>

            <button className="onboarding-card" onClick={chooseCreator} id="onboarding-creator-btn">
              <div className="onboarding-card-icon creator">
                <Wand2 size={28} />
              </div>
              <strong>I'm a Creator</strong>
              <span>Build and sell prompt packages. Earn revenue from your AI expertise.</span>
              <div className="onboarding-card-arrow"><ChevronRight size={18} /></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Creator profile step ───────────────────────────────────────────────
  return (
    <div className="modal-backdrop">
      <div className="onboarding-modal">
        <button
          className="onboarding-close"
          onClick={() => setStep("role")}
          aria-label="Back"
        >
          <X size={18} />
        </button>

        <div className="onboarding-card-icon creator" style={{ marginBottom: 12 }}>
          <Wand2 size={24} />
        </div>
        <h2>Set up your creator profile</h2>
        <p className="onboarding-sub">
          Your application will be reviewed by our team. You'll get an email once approved.
        </p>

        <div className="auth-form" style={{ marginTop: 20 }}>
          <div className="auth-field">
            <label htmlFor="ob-display-name">Display name</label>
            <div className="auth-input-wrap">
              <input
                id="ob-display-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How you'll appear on the marketplace"
                maxLength={60}
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="ob-tagline">Tagline <span style={{ color: "var(--dim)" }}>(optional)</span></label>
            <div className="auth-input-wrap">
              <input
                id="ob-tagline"
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. 'Expert in marketing copy & SEO prompts'"
                maxLength={100}
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Specializations</label>
            <div className="spec-grid">
              {SPECIALIZATION_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`spec-chip ${specs.includes(s) ? "active" : ""}`}
                  onClick={() => toggleSpec(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="button"
            className="auth-btn"
            disabled={loading || !displayName.trim()}
            onClick={submitCreatorProfile}
            id="submit-creator-profile-btn"
          >
            {loading ? <Loader2 size={17} className="auth-spinner" /> : "Submit application"}
          </button>
        </div>
      </div>
    </div>
  );
}
