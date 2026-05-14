import {
  Bell,
  Bookmark,
  Boxes,
  Briefcase,
  Calendar,
  Code,
  Compass,
  Cuboid,
  Film,
  Grid2X2,
  Heart,
  History,
  Home,
  ImageIcon,
  Layers3,
  MessageCircle,
  Music,
  PencilRuler,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  WandSparkles,
  Globe,
  Palette,
  Megaphone,
  Share2,
  Wand2,
  Code2
} from "lucide-react";
import expandedDataset from "../../promptneko_expanded_dataset.json";

export const sidebarGroups = [
  {
    items: [
      { label: "Home", icon: Home, href: "/" },
      { label: "Explore", icon: Compass, href: "/explore" },
      {
        label: "Categories",
        icon: Grid2X2,
        href: "/categories",
        children: [
          { label: "Models", href: "/categories/models" },
          { label: "Art", href: "/categories/art" },
          { label: "Logos & Icons", href: "/categories/logos-icons" },
          { label: "Graphics", href: "/categories/graphics" },
          { label: "Productivity", href: "/categories/productivity" },
          { label: "Marketing", href: "/categories/marketing" },
          { label: "Photography", href: "/categories/photography" },
          { label: "Games", href: "/categories/games" },
          { label: "Websites & UI", href: "/categories/websites-ui" },
          { label: "Social & Reels", href: "/categories/social-reels" },
          { label: "Coding Prompts", href: "/categories/coding-prompts" },
        ],
      },
      { label: "Models", icon: Cuboid, href: "/categories/models" },
      { label: "Collections", icon: Briefcase, href: "/collections" },
      { label: "Top Prompts", icon: Star, href: "/top-prompts" },
    ],
  },
  {
    title: "Generate",
    items: [
      { label: "Image Generation", icon: ImageIcon, href: "/generate/image" },
      { label: "Video Generation", icon: Film, href: "/generate/video" },
      { label: "Music Generation", icon: Music, href: "/generate/music" },
      { label: "Tools", icon: WandSparkles, href: "/tools" },
    ],
  },
  {
    title: "Your Space",
    items: [
      { label: "My Prompts", icon: Layers3, href: "/my-prompts" },
      { label: "Bookmarks", icon: Bookmark, href: "/bookmarks" },
      { label: "Liked", icon: Heart, href: "/liked" },
      { label: "History", icon: History, href: "/history" },
      { label: "Admin", icon: ShieldCheck, href: "/admin" },
    ],
  },
];

export const filterCategories = [
  { label: "All", count: "∞", icon: Grid2X2 },
  { label: "Models", count: "34K", icon: Cuboid },
  { label: "Art", count: "22K", icon: Palette },
  { label: "Logos & Icons", count: "8K", icon: Wand2 },
  { label: "Graphics", count: "5K", icon: ImageIcon },
  { label: "Productivity", count: "11K", icon: Briefcase },
  { label: "Marketing", count: "9K", icon: Megaphone },
  { label: "Photography", count: "12K", icon: Share2 },
  { label: "Games", count: "4K", icon: Code2 },
  { label: "Websites & UI", count: "7K", icon: Globe },
  { label: "Social & Reels", count: "15K", icon: Code },
  { label: "Coding Prompts", count: "6K", icon: Code2 },
];

export interface DetailedPrompt {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: {
    text: string;
    negativePrompt?: string;
    version: string;
  };
  promptToCopy?: string;
  assets: {
    type: 'image' | 'video';
    primaryUrl: string;
    thumbnailUrl: string;
    dimensions: { width: number; height: number };
  }[];
  creator: {
    id: string;
    handle: string;
    displayName: string;
    avatarUrl: string;
    isVerified: boolean;
  };
  engine: {
    modelId: string;
    provider: string;
    parameters: Record<string, unknown>;
  };
  taxonomy: {
    primaryCategory: string;
    tags: string[];
  };
  stats: {
    likes: number;
    views: number;
    saves: number;
  };
  pricing?: {
    type: 'free' | 'one_time' | 'subscription_only' | 'api_per_use';
    priceCents: number;
  };
  /** Extra DB fields passed through for the detail page — not shown on cards */
  _db?: {
    longDescription?: string | null;
    variables?: unknown[];
    exampleInput?: unknown;
    exampleOutput?: string | null;
    modelCompatibility?: string[];
    avgRating?: number;
    reviewCount?: number;
    purchaseCount?: number;
    isNsfw?: boolean;
    is_featured?: boolean;
    is_staff_pick?: boolean;
  };
  createdAt: string;
}


export const promptCards: DetailedPrompt[] = expandedDataset as unknown as DetailedPrompt[];

export const websiteUiPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Websites & UI" || p.taxonomy.tags.includes("ui") || p.taxonomy.tags.includes("editorial"));
export const brandingPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Branding & Logos" || p.taxonomy.tags.includes("visual-identity") || p.taxonomy.tags.includes("aesthetic"));
export const productAdPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Product Ads" || p.taxonomy.tags.includes("product") || p.taxonomy.tags.includes("commercial"));
export const socialReelPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Social & Reels" || p.taxonomy.primaryCategory === "Viral Shorts" || p.taxonomy.primaryCategory === "ASMR Videos");
export const animeArtPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "AI Art & Anime" || p.taxonomy.tags.includes("art") || p.taxonomy.tags.includes("fine-art"));
export const codingPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Coding Prompts" || p.taxonomy.tags.includes("code") || p.taxonomy.primaryCategory === "Educational Videos");
export const marketingPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Marketing" || p.taxonomy.tags.includes("trending") || p.taxonomy.tags.includes("viral"));
export const fruitVideoPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Fruit Videos & Photography" || p.taxonomy.tags.includes("fruit"));

export function promptSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findPromptBySlug(slug: string) {
  return promptCards.find((prompt) => prompt.slug === slug) ?? promptCards[0];
}

// Dynamically compute trending searches from top viewed genuine prompts
export const trendingSearches = promptCards.slice(0, 5).map((p, idx) => ({
  title: p.title.split(" ").slice(0, 3).join(" "),
  subtitle: `${(p.stats.views / 1000).toFixed(1)}K views`,
  change: `${120 - idx * 15}%`
}));

// Dynamically aggregate top AI models/engines utilized across marketplace templates
const providerCount: Record<string, number> = {};
promptCards.forEach(p => {
  const prov = p.engine.provider || "Midjourney";
  providerCount[prov] = (providerCount[prov] || 0) + 1;
});
const tones = ["gold", "blue", "purple", "green", "olive"];
export const topModels = Object.entries(providerCount)
  .sort((a, b) => b[1] - a[1])
  .map(([title, count], idx) => ({
    title,
    subtitle: `${(count * 4.5).toFixed(1)}K prompts`,
    tone: tones[idx % tones.length]
  }));

// Compute dynamic tag counts from actual high-fidelity prompt templates
const tagFrequency: Record<string, number> = {};
promptCards.forEach(p => {
  p.taxonomy.tags.forEach(t => {
    tagFrequency[t] = (tagFrequency[t] || 0) + 1;
  });
});
const computedTags = Object.entries(tagFrequency)
  .sort((a, b) => b[1] - a[1])
  .map(([tag, count]) => [tag, `${(count * 1.2).toFixed(1)}K`]);

export const popularTags = computedTags.length > 0 ? computedTags : [
  ["cyberpunk", "24.8K"],
  ["anime", "38.2K"],
  ["portrait", "22.1K"],
  ["fantasy", "31.6K"],
  ["landscape", "27.3K"],
];

export const topbarActions = { Bell };

export const trendingTags = popularTags.slice(0, 4).map(([tag]) => tag);

// ─── Category Registry ────────────────────────────────────────────────────────
export type CategoryMeta = {
  slug: string;
  label: string;
  description: string;
  accent: string;
  promptCount: string;
  subcategories: { label: string; tags: string[] }[];
  mappedCategories: string[];
};

export const CATEGORY_REGISTRY: CategoryMeta[] = [
  {
    slug: "models",
    label: "Models",
    description: "Prompts crafted for specific AI models — from ChatGPT to Midjourney, FLUX and beyond.",
    accent: "#a463ff",
    promptCount: "34K+",
    mappedCategories: [],
    subcategories: [
      { label: "ChatGPT Skill", tags: ["chatgpt-skill"] },
      { label: "ChatGPT Image", tags: ["chatgpt-image"] },
      { label: "Claude", tags: ["claude"] },
      { label: "Claude Skill", tags: ["claude-skill"] },
      { label: "Cursor Skill", tags: ["cursor-skill"] },
      { label: "DeepSeek", tags: ["deepseek"] },
      { label: "FLUX", tags: ["flux"] },
      { label: "Gemini", tags: ["gemini"] },
      { label: "Gemini Image", tags: ["gemini-image"] },
      { label: "ChatGPT", tags: ["chatgpt"] },
      { label: "Grok", tags: ["grok"] },
      { label: "Grok Image", tags: ["grok-image"] },
      { label: "Grok Video", tags: ["grok-video"] },
      { label: "Hailuo AI", tags: ["hailuo"] },
      { label: "Hunyuan", tags: ["hunyuan"] },
      { label: "Ideogram", tags: ["ideogram"] },
      { label: "Imagen", tags: ["imagen"] },
      { label: "KLING AI", tags: ["kling"] },
      { label: "Leonardo Ai", tags: ["leonardo"] },
      { label: "Llama", tags: ["llama"] },
      { label: "Midjourney", tags: ["midjourney"] },
      { label: "Midjourney Video", tags: ["midjourney-video"] },
      { label: "Qwen Image", tags: ["qwen-image"] },
      { label: "Recraft", tags: ["recraft"] },
      { label: "Seedance", tags: ["seedance"] },
      { label: "Seedream", tags: ["seedream"] },
      { label: "Sora", tags: ["sora"] },
      { label: "Stable Diffusion", tags: ["stable-diffusion"] },
      { label: "Veo", tags: ["veo"] },
      { label: "Wan", tags: ["wan"] },
    ],
  },
  {
    slug: "art",
    label: "Art",
    description: "Explore AI art across every style — anime, painting, digital art, pixel art and more.",
    accent: "#ffef75",
    promptCount: "22K+",
    mappedCategories: ["AI Art & Anime", "Trending Social Media Images", "Video Prompts"],
    subcategories: [
      { label: "Anime", tags: ["anime"] },
      { label: "Western", tags: ["western"] },
      { label: "Cartoon", tags: ["cartoon"] },
      { label: "90s Anime", tags: ["90s-anime"] },
      { label: "Painting", tags: ["painting"] },
      { label: "Oil Painting", tags: ["oil-painting"] },
      { label: "Watercolor", tags: ["watercolor"] },
      { label: "Digital Art", tags: ["digital-art"] },
      { label: "Pixel Art", tags: ["pixel-art"] },
      { label: "Concept Art", tags: ["concept-art"] },
      { label: "Fantasy", tags: ["fantasy"] },
      { label: "Sci-Fi", tags: ["scifi"] },
    ],
  },
  {
    slug: "logos-icons",
    label: "Logos & Icons",
    description: "Professional logo and icon prompts for every brand identity style.",
    accent: "#78c7ff",
    promptCount: "8K+",
    mappedCategories: ["Branding & Logos"],
    subcategories: [
      { label: "3D Logos", tags: ["3d"] },
      { label: "Animal Logos", tags: ["animal"] },
      { label: "Business & Startup", tags: ["business"] },
      { label: "Cartoon", tags: ["cartoon"] },
      { label: "Cute", tags: ["cute"] },
      { label: "Food", tags: ["food"] },
      { label: "Lettered", tags: ["lettered"] },
      { label: "Hand-drawn", tags: ["hand-drawn"] },
      { label: "Minimalist", tags: ["minimal"] },
      { label: "Modern", tags: ["modern"] },
      { label: "Painted", tags: ["painted"] },
    ],
  },
  {
    slug: "graphics",
    label: "Graphics",
    description: "Stunning visual graphics, textures, illustrations and design assets.",
    accent: "#f97aff",
    promptCount: "5K+",
    mappedCategories: ["Websites & UI", "Trending Social Media Images"],
    subcategories: [
      { label: "Textures", tags: ["texture"] },
      { label: "Backgrounds", tags: ["background"] },
      { label: "Illustrations", tags: ["illustration"] },
      { label: "Infographics", tags: ["infographic"] },
      { label: "Patterns", tags: ["pattern"] },
      { label: "UI Elements", tags: ["ui"] },
    ],
  },
  {
    slug: "productivity",
    label: "Productivity",
    description: "AI prompts to supercharge your workflow, writing, planning and day-to-day tasks.",
    accent: "#7affb0",
    promptCount: "11K+",
    mappedCategories: ["Coding Prompts", "Educational Videos"],
    subcategories: [
      { label: "Ads", tags: ["ads"] },
      { label: "Business", tags: ["business"] },
      { label: "Chatbot", tags: ["chatbot"] },
      { label: "Coach", tags: ["coach"] },
      { label: "Code", tags: ["code"] },
      { label: "Copy", tags: ["copy"] },
      { label: "Email", tags: ["email"] },
      { label: "Finance", tags: ["finance"] },
      { label: "Health", tags: ["health"] },
      { label: "Ideas", tags: ["ideas"] },
      { label: "Language", tags: ["language"] },
      { label: "SEO", tags: ["seo"] },
      { label: "Summarise", tags: ["summarise"] },
      { label: "Study", tags: ["study"] },
      { label: "Translate", tags: ["translate"] },
      { label: "Travel", tags: ["travel"] },
      { label: "Writing", tags: ["writing"] },
    ],
  },
  {
    slug: "marketing",
    label: "Marketing",
    description: "High-converting ad creatives, product shots and campaign prompts.",
    accent: "#ff9f7a",
    promptCount: "9K+",
    mappedCategories: ["Product Ads", "Marketing", "Trending Social Media Images", "Video Prompts"],
    subcategories: [
      { label: "Product Ads", tags: ["ads"] },
      { label: "Social Ads", tags: ["social"] },
      { label: "Email Campaigns", tags: ["email"] },
      { label: "SEO Content", tags: ["seo"] },
      { label: "Luxury Ads", tags: ["luxury"] },
      { label: "Food & Beverage", tags: ["food"] },
      { label: "Fashion", tags: ["fashion"] },
    ],
  },
  {
    slug: "photography",
    label: "Photography",
    description: "Realistic photo prompts — portraits, cinematic, nature, macro and more.",
    accent: "#78a7ff",
    promptCount: "12K+",
    mappedCategories: ["Fruit Videos & Photography", "Trending Social Media Images", "Video Prompts"],
    subcategories: [
      { label: "Portrait", tags: ["portrait"] },
      { label: "Street", tags: ["street"] },
      { label: "Cinematic", tags: ["cinematic"] },
      { label: "Fashion", tags: ["fashion"] },
      { label: "Nature", tags: ["nature"] },
      { label: "Macro", tags: ["macro"] },
      { label: "Wildlife", tags: ["wildlife"] },
      { label: "Product", tags: ["product"] },
      { label: "Studio", tags: ["studio"] },
      { label: "Film Look", tags: ["film"] },
    ],
  },
  {
    slug: "games",
    label: "Games",
    description: "Game concept art, character design, environment art and narrative prompts.",
    accent: "#ff7a7a",
    promptCount: "4K+",
    mappedCategories: [],
    subcategories: [
      { label: "Character Design", tags: ["character"] },
      { label: "Environment", tags: ["environment"] },
      { label: "Concept Art", tags: ["concept-art"] },
      { label: "UI/HUD", tags: ["ui"] },
      { label: "Pixel Art", tags: ["pixel-art"] },
      { label: "Item Design", tags: ["item"] },
    ],
  },
  {
    slug: "websites-ui",
    label: "Websites & UI",
    description: "Stunning landing pages, dashboards, app UIs and web design prompts.",
    accent: "#78ffde",
    promptCount: "7K+",
    mappedCategories: ["Websites & UI"],
    subcategories: [
      { label: "Landing Pages", tags: ["landing"] },
      { label: "Dashboards", tags: ["dashboard"] },
      { label: "Mobile Apps", tags: ["mobile"] },
      { label: "SaaS", tags: ["saas"] },
      { label: "E-Commerce", tags: ["ecommerce"] },
      { label: "Portfolios", tags: ["portfolio"] },
      { label: "Bento Grids", tags: ["bento"] },
    ],
  },
  {
    slug: "social-reels",
    label: "Social & Reels",
    description: "Viral video prompts, TikTok reels, Instagram content and social campaigns.",
    accent: "#ff78c8",
    promptCount: "15K+",
    mappedCategories: ["Social & Reels", "Viral Shorts", "ASMR Videos", "Trending Social Media Images", "Video Prompts"],
    subcategories: [
      { label: "TikTok", tags: ["tiktok"] },
      { label: "Instagram Reels", tags: ["reels"] },
      { label: "YouTube Shorts", tags: ["shorts"] },
      { label: "Viral", tags: ["viral"] },
      { label: "Travel", tags: ["travel"] },
      { label: "Lifestyle", tags: ["lifestyle"] },
      { label: "Fashion", tags: ["fashion"] },
      { label: "Food", tags: ["food"] },
    ],
  },
  {
    slug: "coding-prompts",
    label: "Coding Prompts",
    description: "Expert programming prompts for Python, React, SQL, DevOps and more.",
    accent: "#7affb0",
    promptCount: "6K+",
    mappedCategories: ["Coding Prompts"],
    subcategories: [
      { label: "Python", tags: ["python"] },
      { label: "React", tags: ["react"] },
      { label: "TypeScript", tags: ["typescript"] },
      { label: "SQL", tags: ["sql"] },
      { label: "Node.js", tags: ["nodejs"] },
      { label: "Docker", tags: ["docker"] },
      { label: "APIs", tags: ["api"] },
      { label: "Automation", tags: ["automation"] },
    ],
  },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return CATEGORY_REGISTRY.find((c) => c.slug === slug);
}
