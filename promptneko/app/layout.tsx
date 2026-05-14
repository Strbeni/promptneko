import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./globals copy.css";
import { AuthProvider } from "./components/auth/AuthContext";
import { AuthGate } from "./components/auth/AuthGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PromptNeko - Find Prompts For Any Task",
  description: "Discover, save, and buy marketplace prompts for creative AI workflows.",
  other: {
    "google-adsense-account": "ca-pub-6845864108687354",
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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6845864108687354"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <AuthProvider>
          <AuthGate />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
