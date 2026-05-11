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
  Globe,
  Palette,
  Megaphone,
  Share2,
  Wand2,
  Code2
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
          { label: "Websites & UI", href: "/create/website" },
          { label: "Branding & Logos", href: "/create/branding" },
          { label: "Product Ads", href: "/create/ads" },
          { label: "Social & Reels", href: "/create/social" },
          { label: "AI Art & Anime", href: "/create/anime" },
          { label: "Coding Prompts", href: "/create/coding" },
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
  { label: "Websites & UI", count: "12K", icon: Globe },
  { label: "Branding & Logos", count: "8K", icon: Palette },
  { label: "Product Ads", count: "5K", icon: Megaphone },
  { label: "Social & Reels", count: "15K", icon: Share2 },
  { label: "AI Art & Anime", count: "22K", icon: Wand2 },
  { label: "Coding Prompts", count: "3K", icon: Code2 },
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
  };
  createdAt: string;
}


export const promptCards: DetailedPrompt[] = [
  // AI Art & Anime
  {
    id: "p1", slug: "sakura-night", title: "Sakura Night", description: "A serene night scene with cherry blossoms under moonlight.",
    content: { text: "Serene night, cherry blossoms, moonlight, 8k", version: "1.0" }, promptToCopy: "Serene night, cherry blossoms, moonlight, 8k",
    assets: [{ type: 'image', primaryUrl: "/images/stock/sakura-night.png", thumbnailUrl: "/images/stock/sakura-night.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u1", handle: "@VoidWalker", displayName: "Void Walker", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "AI Art & Anime", tags: ["nature", "night"] },
    stats: { likes: 2300, views: 12000, saves: 450 }, createdAt: "2024-05-10T08:00:00Z"
  },
  {
    id: "p3", slug: "ethereal-castle-in-clouds", title: "Ethereal Castle in Clouds", description: "A fantasy castle floating in the clouds.",
    content: { text: "Floating castle, clouds, ethereal, fantasy, high detail", version: "1.0" }, promptToCopy: "Floating castle, clouds, ethereal, fantasy, high detail",
    assets: [{ type: 'image', primaryUrl: "/images/stock/ethereal-castle.png", thumbnailUrl: "/images/stock/ethereal-castle.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u3", handle: "@raws.art", displayName: "Raws Art", avatarUrl: "", isVerified: true },
    engine: { modelId: "sdxl", provider: "Stable Diffusion", parameters: {} },
    taxonomy: { primaryCategory: "AI Art & Anime", tags: ["castle", "sky"] },
    stats: { likes: 3100, views: 15000, saves: 890 }, createdAt: "2024-05-10T10:00:00Z"
  },
  {
    id: "p4", slug: "cybernetic-girl", title: "Cybernetic Girl", description: "A portrait of a girl with cybernetic enhancements.",
    content: { text: "Cybernetic girl, portrait, futuristic, neon details", version: "1.1" }, promptToCopy: "Cybernetic girl, portrait, futuristic, neon details",
    assets: [{ type: 'image', primaryUrl: "/images/stock/cybernetic-girl.png", thumbnailUrl: "/images/stock/cybernetic-girl.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u4", handle: "@pixel.muse", displayName: "Pixel Muse", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "AI Art & Anime", tags: ["portrait", "cyborg"] },
    stats: { likes: 1200, views: 5000, saves: 210 }, createdAt: "2024-05-10T11:00:00Z"
  },
  {
    id: "p11", slug: "ghibli-summer", title: "Studio Ghibli Summer Day", description: "Vibrant summer landscape in the style of Studio Ghibli.",
    content: { text: "Ghibli style, summer landscape, lush green hills, blue sky, cumulus clouds", version: "1.0" }, promptToCopy: "Ghibli style, summer landscape, lush green hills, blue sky, cumulus clouds",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/ghibli_summer.png", thumbnailUrl: "/images/marketplace/ghibli_summer.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u11", handle: "@ghibli.fan", displayName: "Ghibli Fan", avatarUrl: "", isVerified: false },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "AI Art & Anime", tags: ["ghibli", "summer", "landscape"] },
    stats: { likes: 4500, views: 25000, saves: 1200 }, createdAt: "2024-05-12T08:00:00Z"
  },
  {
    id: "p12", slug: "neon-samurai", title: "Neon Samurai 2077", description: "A high-tech samurai standing in a rainy cyberpunk alley.",
    content: { text: "Cyberpunk samurai, neon armor, rainy night, katana, glowing eyes", version: "1.0" }, promptToCopy: "Cyberpunk samurai, neon armor, rainy night, katana, glowing eyes",
    assets: [{ type: 'image', primaryUrl: "/images/stock/neon-tokyo.png", thumbnailUrl: "/images/stock/neon-tokyo.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u12", handle: "@cyber.blade", displayName: "Cyber Blade", avatarUrl: "", isVerified: true },
    engine: { modelId: "flux", provider: "FLUX", parameters: {} },
    taxonomy: { primaryCategory: "AI Art & Anime", tags: ["samurai", "cyberpunk", "neon"] },
    stats: { likes: 3800, views: 18000, saves: 900 }, createdAt: "2024-05-12T09:00:00Z"
  },

  // Websites & UI
  {
    id: "p7", slug: "luxury-perfume-landing", title: "Luxury Perfume Landing Page", description: "Minimalist SaaS landing page for a high-end perfume brand.",
    content: { text: "Luxury perfume, landing page, minimalist, gold accents, glassmorphism", version: "1.0" }, promptToCopy: "Luxury perfume, landing page, minimalist, gold accents, glassmorphism",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/perfume_landing.png", thumbnailUrl: "/images/marketplace/perfume_landing.png", dimensions: { width: 1440, height: 900 } }],
    creator: { id: "u7", handle: "@designflow", displayName: "DesignFlow", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Websites & UI", tags: ["minimal", "luxury", "saas"] },
    stats: { likes: 2400, views: 12000, saves: 450 }, createdAt: "2024-05-11T08:00:00Z"
  },
  {
    id: "p13", slug: "fintech-dashboard", title: "Modern Fintech Dashboard", description: "Sleek and data-rich dashboard for a crypto trading platform.",
    content: { text: "Fintech dashboard, dark mode, vibrant charts, glassmorphism, clean UI", version: "1.0" }, promptToCopy: "Fintech dashboard, dark mode, vibrant charts, glassmorphism, clean UI",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/fintech_dashboard.png", thumbnailUrl: "/images/marketplace/fintech_dashboard.png", dimensions: { width: 1920, height: 1080 } }],
    creator: { id: "u13", handle: "@ui_wizard", displayName: "UI Wizard", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Websites & UI", tags: ["fintech", "dashboard", "darkmode"] },
    stats: { likes: 1900, views: 9500, saves: 310 }, createdAt: "2024-05-12T10:00:00Z"
  },
  {
    id: "p14", slug: "travel-app-ui", title: "Explore Travel App UI", description: "Vibrant and immersive UI for a travel booking application.",
    content: { text: "Travel app, mobile UI, high-quality photography, smooth transitions, clean typography", version: "1.0" }, promptToCopy: "Travel app, mobile UI, high-quality photography, smooth transitions, clean typography",
    assets: [{ type: 'image', primaryUrl: "/images/stock/lost-galaxy.png", thumbnailUrl: "/images/stock/lost-galaxy.png", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u14", handle: "@pixel.perfection", displayName: "Pixel Perfection", avatarUrl: "", isVerified: false },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Websites & UI", tags: ["travel", "mobile", "app"] },
    stats: { likes: 1500, views: 7000, saves: 220 }, createdAt: "2024-05-12T11:00:00Z"
  },
  {
    id: "p15", slug: "saas-landing-2024", title: "Next-Gen SaaS Landing Page", description: "Bento-style landing page for a modern productivity tool.",
    content: { text: "SaaS landing page, bento grid layout, minimalist, pastel colors, 3d elements", version: "1.0" }, promptToCopy: "SaaS landing page, bento grid layout, minimalist, pastel colors, 3d elements",
    assets: [{ type: 'image', primaryUrl: "/images/stock/ethereal-castle.png", thumbnailUrl: "/images/stock/ethereal-castle.png", dimensions: { width: 1440, height: 900 } }],
    creator: { id: "u15", handle: "@creative.layouts", displayName: "Creative Layouts", avatarUrl: "", isVerified: true },
    engine: { modelId: "flux", provider: "FLUX", parameters: {} },
    taxonomy: { primaryCategory: "Websites & UI", tags: ["saas", "bento", "landing"] },
    stats: { likes: 3200, views: 15000, saves: 850 }, createdAt: "2024-05-12T12:00:00Z"
  },
  {
    id: "p16", slug: "ecommerce-fashion", title: "Premium Fashion Store", description: "Clean and editorial-style e-commerce layout for luxury fashion.",
    content: { text: "E-commerce website, luxury fashion, minimalist, high-end photography, editorial grid", version: "1.0" }, promptToCopy: "E-commerce website, luxury fashion, minimalist, high-end photography, editorial grid",
    assets: [{ type: 'image', primaryUrl: "/images/stock/cinematic-portrait.png", thumbnailUrl: "/images/stock/cinematic-portrait.png", dimensions: { width: 1440, height: 900 } }],
    creator: { id: "u16", handle: "@vogue.design", displayName: "Vogue Design", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Websites & UI", tags: ["ecommerce", "fashion", "luxury"] },
    stats: { likes: 2800, views: 13000, saves: 540 }, createdAt: "2024-05-12T13:00:00Z"
  },

  // Branding & Logos
  {
    id: "p9", slug: "tech-brand-kit", title: "Tech Brand Identity Kit", description: "Comprehensive branding for a modern tech startup.",
    content: { text: "Tech startup, branding, logo design, visual identity, modern, minimal", version: "1.0" }, promptToCopy: "Tech startup, branding, logo design, visual identity, modern, minimal",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/tech_branding.png", thumbnailUrl: "/images/marketplace/tech_branding.png", dimensions: { width: 2000, height: 2000 } }],
    creator: { id: "u9", handle: "@brandingpro", displayName: "BrandingPro", avatarUrl: "", isVerified: true },
    engine: { modelId: "dalle-3", provider: "DALL-E 3", parameters: {} },
    taxonomy: { primaryCategory: "Branding & Logos", tags: ["tech", "minimal", "branding"] },
    stats: { likes: 950, views: 5000, saves: 85 }, createdAt: "2024-05-11T10:00:00Z"
  },
  {
    id: "p17", slug: "organic-coffee-branding", title: "Organic Coffee Brand", description: "Warm and earthy visual identity for a sustainable coffee roastery.",
    content: { text: "Coffee brand, organic, rustic logo, earthy tones, packaging design, sustainable", version: "1.0" }, promptToCopy: "Coffee brand, organic, rustic logo, earthy tones, packaging design, sustainable",
    assets: [{ type: 'image', primaryUrl: "/images/stock/sakura-night.png", thumbnailUrl: "/images/stock/sakura-night.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u17", handle: "@nature.designs", displayName: "Nature Designs", avatarUrl: "", isVerified: false },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Branding & Logos", tags: ["coffee", "organic", "branding"] },
    stats: { likes: 1400, views: 6000, saves: 190 }, createdAt: "2024-05-13T08:00:00Z"
  },
  {
    id: "p18", slug: "cyber-energy-drink", title: "Cyber Energy Branding", description: "Futuristic and high-contrast branding for an energy drink.",
    content: { text: "Energy drink, cyberpunk aesthetic, neon colors, bold typography, futuristic packaging", version: "1.0" }, promptToCopy: "Energy drink, cyberpunk aesthetic, neon colors, bold typography, futuristic packaging",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/energy_drink.png", thumbnailUrl: "/images/marketplace/energy_drink.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u18", handle: "@glow.studio", displayName: "Glow Studio", avatarUrl: "", isVerified: true },
    engine: { modelId: "flux", provider: "FLUX", parameters: {} },
    taxonomy: { primaryCategory: "Branding & Logos", tags: ["energydrink", "cyberpunk", "neon"] },
    stats: { likes: 2200, views: 10000, saves: 420 }, createdAt: "2024-05-13T09:00:00Z"
  },
  {
    id: "p19", slug: "minimal-monogram", title: "Minimal Monogram Logo", description: "Sophisticated and timeless monogram for a luxury brand.",
    content: { text: "Monogram logo, minimalist, luxury, serif typography, black and white, professional", version: "1.0" }, promptToCopy: "Monogram logo, minimalist, luxury, serif typography, black and white, professional",
    assets: [{ type: 'image', primaryUrl: "/images/stock/ethereal-castle.png", thumbnailUrl: "/images/stock/ethereal-castle.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u19", handle: "@logo.master", displayName: "Logo Master", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Branding & Logos", tags: ["logo", "minimal", "monogram"] },
    stats: { likes: 1100, views: 5500, saves: 150 }, createdAt: "2024-05-13T10:00:00Z"
  },
  {
    id: "p20", slug: "skincare-identity", title: "Lumina Skincare Identity", description: "Soft and clean visual identity for a premium skincare line.",
    content: { text: "Skincare brand, soft colors, elegant logo, product mockups, clean, minimalist", version: "1.0" }, promptToCopy: "Skincare brand, soft colors, elegant logo, product mockups, clean, minimalist",
    assets: [{ type: 'image', primaryUrl: "/images/stock/cinematic-portrait.png", thumbnailUrl: "/images/stock/cinematic-portrait.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u20", handle: "@beauty.brander", displayName: "Beauty Brander", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Branding & Logos", tags: ["skincare", "beauty", "branding"] },
    stats: { likes: 1800, views: 8000, saves: 310 }, createdAt: "2024-05-13T11:00:00Z"
  },

  // Social & Reels
  {
    id: "p8", slug: "banana-drama-reel", title: "Banana Drama Viral Reel", description: "Humorous and surreal fruit animation for social media.",
    content: { text: "Banana, drama, viral reel, humor, 3d animation, tiktok style", version: "1.0" }, promptToCopy: "Banana, drama, viral reel, humor, 3d animation, tiktok style",
    assets: [{ type: 'video', primaryUrl: "/images/marketplace/banana_drama.png", thumbnailUrl: "/images/marketplace/banana_drama.png", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u8", handle: "@vfxmaster", displayName: "VFXMaster", avatarUrl: "", isVerified: true },
    engine: { modelId: "luma", provider: "Luma AI", parameters: {} },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["viral", "humor", "fruit"] },
    stats: { likes: 1800, views: 45000, saves: 442 }, createdAt: "2024-05-11T09:00:00Z"
  },
  {
    id: "p21", slug: "hyper-speed-travel", title: "Hyper-Speed Travel Reel", description: "Fast-paced cinematic travel reel with seamless transitions.",
    content: { text: "Travel reel, fast cuts, motion blur, cinematic color grading, immersive transitions", version: "1.0" }, promptToCopy: "Travel reel, fast cuts, motion blur, cinematic color grading, immersive transitions",
    assets: [{ type: 'video', primaryUrl: "/images/stock/lost-galaxy.png", thumbnailUrl: "/images/stock/lost-galaxy.png", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u21", handle: "@travel.cuts", displayName: "Travel Cuts", avatarUrl: "", isVerified: true },
    engine: { modelId: "pika", provider: "Pika Labs", parameters: {} },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["travel", "viral", "video"] },
    stats: { likes: 3500, views: 82000, saves: 1100 }, createdAt: "2024-05-14T08:00:00Z"
  },
  {
    id: "p22", slug: "aesthetic-lifestyle", title: "Minimal Lifestyle Reel", description: "Calming and aesthetic lifestyle snippets for Instagram.",
    content: { text: "Aesthetic lifestyle, slow motion, warm lighting, cozy vibes, clean composition", version: "1.0" }, promptToCopy: "Aesthetic lifestyle, slow motion, warm lighting, cozy vibes, clean composition",
    assets: [{ type: 'video', primaryUrl: "/images/stock/sakura-night.png", thumbnailUrl: "/images/stock/sakura-night.png", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u22", handle: "@moody.vibes", displayName: "Moody Vibes", avatarUrl: "", isVerified: false },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["lifestyle", "aesthetic", "shorts"] },
    stats: { likes: 2100, views: 35000, saves: 580 }, createdAt: "2024-05-14T09:00:00Z"
  },  {
    id: "p23", slug: "3d-product-reveal", title: "3D Product Reveal", description: "Stunning 3D reveal animation for a new tech gadget.",
    content: { text: "Product reveal, 3d animation, tech gadget, cinematic lighting, sleek transitions", version: "1.0" }, promptToCopy: "Product reveal, 3d animation, tech gadget, cinematic lighting, sleek transitions",
    assets: [{ type: 'video', primaryUrl: "/images/stock/cybernetic-girl.png", thumbnailUrl: "/images/stock/cybernetic-girl.png", dimensions: { width: 1080, height: 1350 } }],
    creator: { id: "u23", handle: "@vfx.wizard", displayName: "VFX Wizard", avatarUrl: "", isVerified: true },
    engine: { modelId: "luma", provider: "Luma AI", parameters: {} },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["3d", "product", "reveal"] },
    stats: { likes: 2900, views: 56000, saves: 920 }, createdAt: "2024-05-14T10:00:00Z"
  },
  {
    id: "p30", slug: "street-food-tour", title: "Street Food Tour Reel", description: "Fast-paced and mouth-watering street food exploration.",
    content: { text: "Street food, vlog, fast cuts, vibrant colors, close-up shots, food photography", version: "1.0" }, promptToCopy: "Street food, vlog, fast cuts, vibrant colors, close-up shots, food photography",
    assets: [{ type: 'video', primaryUrl: "/images/stock/sakura-night.png", thumbnailUrl: "/images/stock/sakura-night.png", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u30", handle: "@foodie.vlogs", displayName: "Foodie Vlogs", avatarUrl: "", isVerified: true },
    engine: { modelId: "pika", provider: "Pika Labs", parameters: {} },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["food", "vlog", "shorts"] },
    stats: { likes: 4100, views: 95000, saves: 1500 }, createdAt: "2024-05-17T08:00:00Z"
  },
  {
    id: "p31", slug: "fashion-lookbook", title: "Minimalist Lookbook", description: "Clean and editorial-style fashion lookbook for social media.",
    content: { text: "Fashion lookbook, minimalist, slow motion, elegant transitions, clean background", version: "1.0" }, promptToCopy: "Fashion lookbook, minimalist, slow motion, elegant transitions, clean background",
    assets: [{ type: 'video', primaryUrl: "/images/marketplace/fashion_lookbook.png", thumbnailUrl: "/images/marketplace/fashion_lookbook.png", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u31", handle: "@style.editor", displayName: "Style Editor", avatarUrl: "", isVerified: true },
    engine: { modelId: "luma", provider: "Luma AI", parameters: {} },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["fashion", "aesthetic", "reels"] },
    stats: { likes: 3300, views: 68000, saves: 840 }, createdAt: "2024-05-17T09:00:00Z"
  },

  // Product Ads & Marketing
  {
    id: "p10", slug: "ai-fruit-marketing", title: "Premium Fruit Ad Campaign", description: "High-end marketing visual for organic fruit products.",
    content: { text: "Organic fruit, premium marketing, product photography, dramatic lighting", version: "1.0" }, promptToCopy: "Organic fruit, premium marketing, product photography, dramatic lighting",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/fruit_marketing.png", thumbnailUrl: "/images/marketplace/fruit_marketing.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u10", handle: "@marketing.guru", displayName: "Marketing Guru", avatarUrl: "", isVerified: false },
    engine: { modelId: "flux", provider: "FLUX", parameters: {} },
    taxonomy: { primaryCategory: "Product Ads", tags: ["fruit", "marketing", "ads"] },
    stats: { likes: 1200, views: 8000, saves: 210 }, createdAt: "2024-05-11T11:00:00Z"
  },
  {
    id: "p24", slug: "luxury-watch-ad", title: "Classic Luxury Watch", description: "Cinematic product shot of a luxury watch with leather straps.",
    content: { text: "Luxury watch, macro photography, dramatic lighting, leather texture, high-end ad", version: "1.0" }, promptToCopy: "Luxury watch, macro photography, dramatic lighting, leather texture, high-end ad",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/watch_ad.png", thumbnailUrl: "/images/marketplace/watch_ad.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u24", handle: "@ad.master", displayName: "Ad Master", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Product Ads", tags: ["watch", "luxury", "ads"] },
    stats: { likes: 1600, views: 7200, saves: 340 }, createdAt: "2024-05-15T08:00:00Z"
  },
  {
    id: "p25", slug: "modern-sneaker-ad", title: "Futuristic Sneaker Ad", description: "Dynamic and colorful ad for a high-performance running shoe.",
    content: { text: "Sneaker ad, futuristic design, vibrant colors, floating product, dynamic composition", version: "1.0" }, promptToCopy: "Sneaker ad, futuristic design, vibrant colors, floating product, dynamic composition",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/sneaker_ad.png", thumbnailUrl: "/images/marketplace/sneaker_ad.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u25", handle: "@kicks.creative", displayName: "Kicks Creative", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Product Ads", tags: ["sneaker", "fashion", "ads"] },
    stats: { likes: 2100, views: 11000, saves: 480 }, createdAt: "2024-05-15T09:00:00Z"
  },
  {
    id: "p26", slug: "gourmet-burger-ad", title: "Gourmet Burger Visual", description: "Mouth-watering close-up of a gourmet burger for a food campaign.",
    content: { text: "Gourmet burger, food photography, macro, steam, vibrant colors, professional lighting", version: "1.0" }, promptToCopy: "Gourmet burger, food photography, macro, steam, vibrant colors, professional lighting",
    assets: [{ type: 'image', primaryUrl: "/images/stock/sakura-night.png", thumbnailUrl: "/images/stock/sakura-night.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u26", handle: "@food.focus", displayName: "Food Focus", avatarUrl: "", isVerified: false },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Marketing", tags: ["food", "burger", "marketing"] },
    stats: { likes: 3200, views: 25000, saves: 890 }, createdAt: "2024-05-15T10:00:00Z"
  },
  {
    id: "p32", slug: "perfume-minimal-ad", title: "Minimalist Perfume Ad", description: "Clean and elegant visual for a new fragrance launch.",
    content: { text: "Perfume bottle, minimalist, white background, soft shadows, high-end photography", version: "1.0" }, promptToCopy: "Perfume bottle, minimalist, white background, soft shadows, high-end photography",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/perfume_landing.png", thumbnailUrl: "/images/marketplace/perfume_landing.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u32", handle: "@essence.studio", displayName: "Essence Studio", avatarUrl: "", isVerified: true },
    engine: { modelId: "flux", provider: "FLUX", parameters: {} },
    taxonomy: { primaryCategory: "Product Ads", tags: ["perfume", "minimal", "ads"] },
    stats: { likes: 1900, views: 8500, saves: 280 }, createdAt: "2024-05-17T10:00:00Z"
  },
  {
    id: "p33", slug: "organic-skincare-ad", title: "Organic Skincare Visual", description: "Fresh and natural visual identity for organic skincare products.",
    content: { text: "Skincare product, organic, natural lighting, leaves, water drops, fresh aesthetic", version: "1.0" }, promptToCopy: "Skincare product, organic, natural lighting, leaves, water drops, fresh aesthetic",
    assets: [{ type: 'image', primaryUrl: "/images/stock/cinematic-portrait.png", thumbnailUrl: "/images/stock/cinematic-portrait.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u33", handle: "@natural.glow", displayName: "Natural Glow", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Marketing", tags: ["skincare", "organic", "marketing"] },
    stats: { likes: 2500, views: 12000, saves: 460 }, createdAt: "2024-05-17T11:00:00Z"
  },

  // Coding & Technical
  {
    id: "p27", slug: "python-automation-script", title: "Python Automation Expert", description: "Prompt for generating robust automation scripts in Python.",
    content: { text: "Python script, automation, selenium, error handling, robust, efficient code", version: "1.0" }, promptToCopy: "Python script, automation, selenium, error handling, robust, efficient code",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/coding_interface.png", thumbnailUrl: "/images/marketplace/coding_interface.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u27", handle: "@code.wizard", displayName: "Code Wizard", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4", provider: "OpenAI", parameters: {} },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["python", "automation", "scripts"] },
    stats: { likes: 1200, views: 5000, saves: 620 }, createdAt: "2024-05-16T08:00:00Z"
  },
  {
    id: "p28", slug: "react-component-pro", title: "React Component Architect", description: "Generate scalable and typed React components with Tailwind CSS.",
    content: { text: "React component, typescript, tailwind css, scalable, best practices, reusable", version: "1.0" }, promptToCopy: "React component, typescript, tailwind css, scalable, best practices, reusable",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/coding_interface.png", thumbnailUrl: "/images/marketplace/coding_interface.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u28", handle: "@react.master", displayName: "React Master", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4", provider: "OpenAI", parameters: {} },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["react", "frontend", "typescript"] },
    stats: { likes: 2100, views: 9000, saves: 940 }, createdAt: "2024-05-16T09:00:00Z"
  },
  {
    id: "p29", slug: "sql-optimizer", title: "SQL Query Optimizer", description: "Expert prompt for optimizing complex SQL queries and database schemas.",
    content: { text: "SQL optimization, complex queries, database schema, performance, indexing", version: "1.0" }, promptToCopy: "SQL optimization, complex queries, database schema, performance, indexing",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/coding_interface.png", thumbnailUrl: "/images/marketplace/coding_interface.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u29", handle: "@db.pro", displayName: "DB Pro", avatarUrl: "", isVerified: false },
    engine: { modelId: "gpt-4", provider: "OpenAI", parameters: {} },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["sql", "database", "optimization"] },
    stats: { likes: 850, views: 3000, saves: 210 }, createdAt: "2024-05-16T10:00:00Z"
  },
  {
    id: "p34", slug: "node-api-boilerplate", title: "Node.js API Boilerplate", description: "Generate a production-ready Node.js API with Express and JWT auth.",
    content: { text: "Node.js, Express, API boilerplate, JWT authentication, best practices, structured", version: "1.0" }, promptToCopy: "Node.js, Express, API boilerplate, JWT authentication, best practices, structured",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/coding_interface.png", thumbnailUrl: "/images/marketplace/coding_interface.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u34", handle: "@backend.pro", displayName: "Backend Pro", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4", provider: "OpenAI", parameters: {} },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["nodejs", "express", "api"] },
    stats: { likes: 1700, views: 7500, saves: 430 }, createdAt: "2024-05-18T08:00:00Z"
  },
  {
    id: "p35", slug: "docker-config-wizard", title: "Docker Config Wizard", description: "Expert prompt for creating optimized Dockerfiles and Compose files.",
    content: { text: "Dockerfile, Docker Compose, optimization, multi-stage builds, production-ready", version: "1.0" }, promptToCopy: "Dockerfile, Docker Compose, optimization, multi-stage builds, production-ready",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/coding_interface.png", thumbnailUrl: "/images/marketplace/coding_interface.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u35", handle: "@devops.ninja", displayName: "DevOps Ninja", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4", provider: "OpenAI", parameters: {} },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["docker", "devops", "config"] },
    stats: { likes: 1300, views: 6000, saves: 310 }, createdAt: "2024-05-18T09:00:00Z"
  },
  {
    id: "p36", slug: "luxury-car-ad", title: "Midnight Luxury Car", description: "Dramatic and cinematic product ad for a high-end sports car.",
    content: { text: "Luxury car, sports car, midnight, cinematic lighting, rain, reflection, 8k", version: "1.0" }, promptToCopy: "Luxury car, sports car, midnight, cinematic lighting, rain, reflection, 8k",
    assets: [{ type: 'image', primaryUrl: "/images/stock/neon-tokyo.png", thumbnailUrl: "/images/stock/neon-tokyo.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u36", handle: "@auto.visuals", displayName: "Auto Visuals", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: {} },
    taxonomy: { primaryCategory: "Product Ads", tags: ["car", "luxury", "ads"] },
    stats: { likes: 5200, views: 30000, saves: 1400 }, createdAt: "2024-05-18T10:00:00Z"
  },
  {
    id: "p37", slug: "organic-drink-ad", title: "Fresh Organic Juice", description: "Vibrant and refreshing ad for a natural fruit juice brand.",
    content: { text: "Organic juice, fruit splash, natural lighting, fresh, vibrant colors, marketing visual", version: "1.0" }, promptToCopy: "Organic juice, fruit splash, natural lighting, fresh, vibrant colors, marketing visual",
    assets: [{ type: 'image', primaryUrl: "/images/stock/sakura-night.png", thumbnailUrl: "/images/stock/sakura-night.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u37", handle: "@fresh.media", displayName: "Fresh Media", avatarUrl: "", isVerified: false },
    engine: { modelId: "flux", provider: "FLUX", parameters: {} },
    taxonomy: { primaryCategory: "Product Ads", tags: ["juice", "organic", "ads"] },
    stats: { likes: 1300, views: 6500, saves: 190 }, createdAt: "2024-05-18T11:00:00Z"
  }
];

export const websiteUiPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Websites & UI");
export const brandingPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Branding & Logos");
export const productAdPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Product Ads");
export const socialReelPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Social & Reels");
export const animeArtPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "AI Art & Anime");
export const codingPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Coding Prompts");
export const marketingPrompts = promptCards.filter(p => p.taxonomy.primaryCategory === "Marketing" || p.taxonomy.tags.includes("marketing"));
export const fruitVideoPrompts = promptCards.filter(p => p.taxonomy.tags.includes("fruit"));

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

export const trendingTags = ["Story Telling Website", "Premium Logo"];

