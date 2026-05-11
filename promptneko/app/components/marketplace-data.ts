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
  SlidersHorizontal,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";

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
          { label: "Art", href: "/art" },
          { label: "Logos", href: "/logos" },
          { label: "Productivity", href: "/productivity" },
          { label: "Marketing", href: "/marketing" },
          { label: "Content", href: "/content" },
          { label: "Viral Videos", href: "/viral-videos" },
          { label: "Coding", href: "/coding" },
          { label: "Projects", href: "/projects" },
          { label: "Image Generation", href: "/image-generation" },
          { label: "Video Generation", href: "/video-generation" },
        ]
      },

      { label: "Models", icon: Cuboid, href: "/models" },
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
  // {
  //   title: "Community",
  //   items: [
  //     { label: "Feed", icon: SlidersHorizontal, href: "/feed" },
  //     { label: "Discussions", icon: MessageCircle, href: "/discussions" },
  //     { label: "Events", icon: Calendar, href: "/events" },
  //     { label: "Leaderboard", icon: Boxes, href: "/leaderboard" },
  //   ],
  // },
  {
    title: "Your Space",
    items: [
      { label: "My Prompts", icon: Layers3, href: "/my-prompts" },
      { label: "Bookmarks", icon: Bookmark, href: "/bookmarks" },
      { label: "Liked", icon: Heart, href: "/liked" },
      { label: "History", icon: History, href: "/history" },
    ],
  },
];

export const filterCategories = [
  { label: "All", count: "∞", icon: Grid2X2 },
  { label: "Anime", count: "38.2K", icon: Sparkles },
  { label: "Realistic", count: "42.7K", icon: Home },
  { label: "Cyberpunk", count: "26.1K", icon: Cuboid },
  { label: "Fantasy", count: "31.8K", icon: WandSparkles },
  { label: "Concept Art", count: "18.9K", icon: PencilRuler },
  { label: "Photography", count: "22.3K", icon: ImageIcon },
  { label: "3D Render", count: "15.4K", icon: Boxes },
  { label: "Architecture", count: "12.7K", icon: Code },
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
    parameters: Record<string, any>;
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
  createdAt: string;
}

export const promptCards: DetailedPrompt[] = [
  {
    id: "p1",
    slug: "sakura-night",
    title: "Sakura Night",
    description: "A serene night scene with cherry blossoms under moonlight.",
    content: { text: "Serene night, cherry blossoms, moonlight, 8k", version: "1.0" },
    assets: [{ type: 'image', primaryUrl: "/images/stock/sakura-night.png", thumbnailUrl: "/images/stock/sakura-night.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u1", handle: "@VoidWalker", displayName: "Void Walker", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Anime", tags: ["nature", "night"] },
    stats: { likes: 2300, views: 12000, saves: 450 },
    createdAt: "2024-05-10T08:00:00Z"
  },
  {
    id: "p2",
    slug: "neon-tokyo-streets",
    title: "Neon Tokyo Streets",
    description: "Cyberpunk city streets with neon lights and rain.",
    content: { text: "Tokyo streets, neon, rain, cyberpunk, cinematic", version: "1.2" },
    assets: [{ type: 'video', primaryUrl: "/images/stock/neon-tokyo.png", thumbnailUrl: "/images/stock/neon-tokyo.png", dimensions: { width: 1920, height: 1080 } }],
    creator: { id: "u2", handle: "@astro.archer", displayName: "Astro Archer", avatarUrl: "", isVerified: false },
    engine: { modelId: "gpt-img", provider: "ChatGPT Image", parameters: {} },
    taxonomy: { primaryCategory: "Cyberpunk", tags: ["city", "neon"] },
    stats: { likes: 1800, views: 8500, saves: 320 },
    createdAt: "2024-05-10T09:00:00Z"
  },
  {
    id: "p3",
    slug: "ethereal-castle-in-clouds",
    title: "Ethereal Castle in Clouds",
    description: "A fantasy castle floating in the clouds.",
    content: { text: "Floating castle, clouds, ethereal, fantasy, high detail", version: "1.0" },
    assets: [{ type: 'image', primaryUrl: "/images/stock/ethereal-castle.png", thumbnailUrl: "/images/stock/ethereal-castle.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u3", handle: "@raws.art", displayName: "Raws Art", avatarUrl: "", isVerified: true },
    engine: { modelId: "sdxl", provider: "Stable Diffusion", parameters: {} },
    taxonomy: { primaryCategory: "Fantasy", tags: ["castle", "sky"] },
    stats: { likes: 3100, views: 15000, saves: 890 },
    createdAt: "2024-05-10T10:00:00Z"
  },
  {
    id: "p4",
    slug: "cybernetic-girl",
    title: "Cybernetic Girl",
    description: "A portrait of a girl with cybernetic enhancements.",
    content: { text: "Cybernetic girl, portrait, futuristic, neon details", version: "1.1" },
    assets: [{ type: 'image', primaryUrl: "/images/stock/cybernetic-girl.png", thumbnailUrl: "/images/stock/cybernetic-girl.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u4", handle: "@pixel.muse", displayName: "Pixel Muse", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Cyberpunk", tags: ["portrait", "cyborg"] },
    stats: { likes: 1200, views: 5000, saves: 210 },
    createdAt: "2024-05-10T11:00:00Z"
  },
  {
    id: "p5",
    slug: "lost-in-the-galaxy",
    title: "Lost in the Galaxy",
    description: "An astronaut floating in space with vibrant nebulae.",
    content: { text: "Astronaut, space, nebula, stars, cinematic lighting", version: "1.0" },
    assets: [{ type: 'video', primaryUrl: "/images/stock/lost-galaxy.png", thumbnailUrl: "/images/stock/lost-galaxy.png", dimensions: { width: 1920, height: 1080 } }],
    creator: { id: "u5", handle: "@fantasyforge", displayName: "Fantasy Forge", avatarUrl: "", isVerified: false },
    engine: { modelId: "flux", provider: "FLUX", parameters: {} },
    taxonomy: { primaryCategory: "Concept Art", tags: ["space", "astronaut"] },
    stats: { likes: 2700, views: 11000, saves: 640 },
    createdAt: "2024-05-10T12:00:00Z"
  },
  {
    id: "p6",
    slug: "cinematic-portrait",
    title: "Cinematic Portrait",
    description: "A high-end cinematic portrait with dramatic lighting.",
    content: { text: "Dramatic portrait, cinematic lighting, photorealistic, 8k", version: "1.0" },
    assets: [{ type: 'image', primaryUrl: "/images/stock/cinematic-portrait.png", thumbnailUrl: "/images/stock/cinematic-portrait.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u6", handle: "@elric.studios", displayName: "Elric Studios", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Realistic", tags: ["portrait", "cinematic"] },
    stats: { likes: 1900, views: 9000, saves: 420 },
    createdAt: "2024-05-10T13:00:00Z"
  },
];

export function promptSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findPromptBySlug(slug: string) {
  return promptCards.find((prompt) => prompt.slug === slug) ?? promptCards[1];
}

export const trendingSearches = [
  { title: "Cyberpunk City", subtitle: "24.5K searches", change: "126%" },
  { title: "Anime Girl", subtitle: "18.7K searches", change: "94%" },
  { title: "Fantasy Landscape", subtitle: "15.3K searches", change: "76%" },
  { title: "Realistic Portrait", subtitle: "13.2K searches", change: "58%" },
  { title: "Space Exploration", subtitle: "11.8K searches", change: "42%" },
];

export const topModels = [
  { title: "Midjourney", subtitle: "89.2K prompts", tone: "gold" },
  { title: "Stable Diffusion", subtitle: "67.3K prompts", tone: "blue" },
  { title: "FLUX", subtitle: "45.8K prompts", tone: "purple" },
  { title: "ChatGPT Image", subtitle: "38.6K prompts", tone: "green" },
  { title: "DALL-E 3", subtitle: "26.4K prompts", tone: "olive" },
];

export const popularTags = [
  ["cyberpunk", "24.8K"],
  ["anime", "38.2K"],
  ["portrait", "22.1K"],
  ["fantasy", "31.6K"],
  ["landscape", "27.3K"],
  ["scifi", "19.8K"],
  ["concept art", "18.7K"],
  ["photorealistic", "16.4K"],
  ["3d render", "14.2K"],
  ["dark", "12.9K"],
  ["cinematic", "22.3K"],
  ["neon", "18.1K"],
];

export const topbarActions = { Bell };
