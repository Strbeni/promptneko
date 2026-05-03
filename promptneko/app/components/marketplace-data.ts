import {
  Globe, Palette, Megaphone, Share2, LayoutDashboard, Wand2, Film, Code2,
  Rocket, Sparkles, TrendingUp, Zap, Search
} from "lucide-react";

export interface PromptCardItem {
  title: string;
  creator: string;
  category: string;
  saves: string;
  remixes: string;
  gradient: string;
  tags: string[];
  isVideo?: boolean;
}

export const promptSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const findPromptBySlug = (slug: string) => promptCards.find(p => promptSlug(p.title) === slug);

export const trendingPrompts: PromptCardItem[] = [
  {
    title: "Luxury Perfume Landing Page",
    creator: "DesignFlow",
    category: "Website & UI",
    saves: "2.4k",
    remixes: "128",
    gradient: "from-stone-300 via-stone-400 to-stone-500",
    tags: ["Minimal", "Luxury", "SaaS"]
  },
  {
    title: "Banana Drama Viral Reel",
    creator: "VFXMaster",
    category: "Social Media",
    saves: "1.8k",
    remixes: "442",
    gradient: "from-yellow-300 via-orange-400 to-red-500",
    tags: ["Viral", "Humor", "TikTok"],
    isVideo: true
  },
  {
    title: "Tech Brand Identity Kit",
    creator: "BrandingPro",
    category: "Branding",
    saves: "950",
    remixes: "85",
    gradient: "from-blue-600 via-indigo-700 to-violet-800",
    tags: ["Modern", "Minimal", "Tech"]
  },
  {
    title: "AI Vision Pro Ad Campaign",
    creator: "CreativeAI",
    category: "Product Ads",
    saves: "3.2k",
    remixes: "512",
    gradient: "from-fuchsia-500 via-purple-600 to-indigo-700",
    tags: ["Cinematic", "Tech", "Futuristic"],
    isVideo: true
  },
  {
    title: "SaaS Dashboard Dark Mode",
    creator: "UI_Wizard",
    category: "UI Design",
    saves: "1.5k",
    remixes: "210",
    gradient: "from-slate-800 via-slate-900 to-black",
    tags: ["Dashboard", "SaaS", "Glassmorphism"]
  }
];

export const useCaseCategories = [
  { label: "Websites & UI", description: "SaaS, Landing Pages, Apps", icon: Globe, gradient: "from-blue-400 to-indigo-600", count: "12k", href: "/create/website" },
  { label: "Branding & Logos", description: "Identity, Logos, Guidelines", icon: Palette, gradient: "from-amber-400 to-rose-600", count: "8k", href: "/create/branding" },
  { label: "Product Ads", description: "Campaigns, Photography", icon: Megaphone, gradient: "from-emerald-400 to-cyan-600", count: "5k", href: "/create/ads" },
  { label: "Social & Reels", description: "TikTok, Reels, Shorts", icon: Share2, gradient: "from-pink-400 to-purple-600", count: "15k", href: "/create/social" },
  { label: "AI Art & Anime", description: "Midjourney, Stable Diffusion", icon: Wand2, gradient: "from-orange-400 to-red-600", count: "22k", href: "/create/anime" },
  { label: "Coding Prompts", description: "Cursor, Agents, Fullstack", icon: Code2, gradient: "from-sky-400 to-blue-700", count: "3k", href: "/create/coding" },
];

export const viralContentPrompts = trendingPrompts;
export const websiteUiPrompts = trendingPrompts;
export const brandingPrompts = trendingPrompts;
export const productAdPrompts = trendingPrompts;
export const socialReelPrompts = trendingPrompts;
export const animeArtPrompts = trendingPrompts;
export const codingPrompts = trendingPrompts;
export const promptCards = trendingPrompts;

export const topCreators = [
  { name: "Lunaria", handle: "@lunaria.pro", specialty: "UI Design", followers: "12k", prompts: "142", featuredGradient: "from-indigo-500 to-purple-600", gradient: "indigo" },
  { name: "VFXMaster", handle: "@vfx.master", specialty: "Video Gen", followers: "8.5k", prompts: "86", featuredGradient: "from-amber-400 to-rose-500", gradient: "amber" },
  { name: "DesignFlow", handle: "@design.flow", specialty: "SaaS Layouts", followers: "15k", prompts: "210", featuredGradient: "from-emerald-400 to-cyan-500", gradient: "emerald" },
  { name: "CodeWizard", handle: "@code.wizard", specialty: "AI Agents", followers: "5k", prompts: "45", featuredGradient: "from-sky-400 to-blue-500", gradient: "blue" },
  { name: "BrandingPro", handle: "@brand.pro", specialty: "Identity", followers: "9.2k", prompts: "112", featuredGradient: "from-orange-400 to-red-500", gradient: "orange" },
  { name: "AnimeMuse", handle: "@anime.muse", specialty: "Anime Art", followers: "20k", prompts: "320", featuredGradient: "from-fuchsia-400 to-pink-500", gradient: "fuchsia" },
];

export const howItWorks = [
  { step: 1, title: "Discover", description: "Browse thousands of proven AI prompts with real outputs.", icon: Search, gradient: "from-blue-400 to-indigo-500" },
  { step: 2, title: "Remix", description: "Customize the prompt to fit your specific vision and needs.", icon: Zap, gradient: "from-amber-400 to-orange-500" },
  { step: 3, title: "Generate", description: "Paste into your favorite AI tool and get incredible results.", icon: Sparkles, gradient: "from-emerald-400 to-teal-500" },
  { step: 4, title: "Share", description: "Post your results and join the community of creators.", icon: TrendingUp, gradient: "from-rose-400 to-pink-500" },
];
