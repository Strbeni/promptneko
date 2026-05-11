"use client";
// AuthGate renders the onboarding modal when the user needs onboarding.
// It lives outside all pages so it floats globally.
import { useAuth } from "./AuthContext";
import { OnboardingModal } from "./OnboardingModal";

export function AuthGate() {
  const { needsOnboarding, loading } = useAuth();
  if (loading || !needsOnboarding) return null;
  return <OnboardingModal />;
}
