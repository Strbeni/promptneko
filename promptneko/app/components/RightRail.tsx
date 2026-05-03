"use client";

// RightRail is no longer used on the homepage (removed in redesign).
// Kept as a stub to prevent build errors from any lingering imports.

type RightRailProps = {
  onAction: (action: string) => void;
};

export function RightRail({ onAction: _ }: RightRailProps) {
  return null;
}
