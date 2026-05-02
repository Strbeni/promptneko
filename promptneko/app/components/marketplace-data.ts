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
      { label: "Categories", icon: Grid2X2, href: "/categories" },
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
  {
    title: "Community",
    items: [
      { label: "Feed", icon: SlidersHorizontal, href: "/feed" },
      { label: "Discussions", icon: MessageCircle, href: "/discussions" },
      { label: "Events", icon: Calendar, href: "/events" },
      { label: "Leaderboard", icon: Boxes, href: "/leaderboard" },
    ],
  },
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

export const promptCards = [
  { title: "Sakura Night", model: "Midjourney", author: "@VoidWalker", likes: "2.3K", crop: "shot-card-1", category: "Anime", video: false },
  { title: "Neon Tokyo Streets", model: "ChatGPT Image", author: "@astro.archer", likes: "1.8K", crop: "shot-card-2", category: "Cyberpunk", video: true },
  { title: "Ethereal Castle in Clouds", model: "Stable Diffusion", author: "@raws.art", likes: "3.1K", crop: "shot-card-3", category: "Fantasy", video: false },
  { title: "Cybernetic Girl", model: "Midjourney", author: "@pixel.muse", likes: "1.2K", crop: "shot-card-4", category: "Cyberpunk", video: false },
  { title: "Lost in the Galaxy", model: "FLUX", author: "@fantasyforge", likes: "2.7K", crop: "shot-card-5", category: "Concept Art", video: true },
  { title: "Cinematic Portrait", model: "Midjourney", author: "@elric.studios", likes: "1.9K", crop: "shot-card-6", category: "Realistic", video: false },
  { title: "90s Retro Room", model: "ChatGPT Image", author: "@retro.dreams", likes: "1.6K", crop: "shot-card-7", category: "3D Render", video: true },
  { title: "Dragon Awakening", model: "Stable Diffusion", author: "@beastmind", likes: "2.9K", crop: "shot-card-8", category: "Fantasy", video: false },
  { title: "Mystic Forest", model: "Midjourney", author: "@dreamweaver", likes: "1.3K", crop: "shot-card-9", category: "Fantasy", video: false },
  { title: "Future Metropolis", model: "FLUX", author: "@city.arch", likes: "2.2K", crop: "shot-card-10", category: "Architecture", video: true },
  { title: "Anime School Girl", model: "SDXL", author: "@waifu.lab", likes: "1.4K", crop: "shot-card-11", category: "Anime", video: false },
  { title: "Space Station", model: "Midjourney", author: "@galactic.visuals", likes: "1.1K", crop: "shot-card-12", category: "Concept Art", video: false },
];

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
