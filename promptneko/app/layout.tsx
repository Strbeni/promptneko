import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Note: globals copy.css removed — dark theme replaced by CSS variable system

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PromptHub — Discover AI Prompts That Create Incredible Results",
  description: "The best curated platform to discover AI prompts for websites, branding, ads, videos, social media, and more. Output-first. Inspiration-driven.",
  keywords: ["AI prompts", "prompt marketplace", "AI workflows", "branding prompts", "UI design prompts", "viral AI content"],
  openGraph: {
    title: "PromptHub — Discover AI Prompts That Create Incredible Results",
    description: "Curated AI prompts for websites, branding, product ads, viral reels, anime art, and coding.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
