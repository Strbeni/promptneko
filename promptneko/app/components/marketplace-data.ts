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


export const promptCards: DetailedPrompt[] = [
  // AI Art & Anime
  {
    id: "p1",
    slug: "sakura-night",
    title: "Sakura Night Cinematic Aura",
    description: "Generate breathtaking, hyper-realistic nocturnal scenes featuring ancient sakura trees glowing under ethereal atmospheric lighting.",
    content: {
      text: "A wide cinematic shot of a breathtaking serene night scene in traditional Kyoto, full ancient cherry blossom sakura trees in peak bloom lining a hyper-reflective glass-like canal, illuminated by ambient indigo moonlight and floating warm paper lanterns, volumetric mist rising from the water, shot on 35mm anamorphic lens, hyper-detailed environmental lighting, rich textures, ultra high resolution --ar 16:9 --v 6.0 --style raw",
      negativePrompt: "blur, noise, grainy, modern architecture, low quality, overexposed, photorealistic flaws, watermark, text",
      version: "1.2"
    },
    promptToCopy: "A wide cinematic shot of a breathtaking serene night scene in traditional Kyoto, full ancient cherry blossom sakura trees in peak bloom lining a hyper-reflective glass-like canal, illuminated by ambient indigo moonlight and floating warm paper lanterns, volumetric mist rising from the water, shot on 35mm anamorphic lens, hyper-detailed environmental lighting, rich textures, ultra high resolution --ar {{aspect_ratio}} --v 6.0 --style raw",
    assets: [{ type: 'image', primaryUrl: "/images/stock/sakura-night.png", thumbnailUrl: "/images/stock/sakura-night.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u1", handle: "@VoidWalker", displayName: "Void Walker", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 250, chaos: 5 } },
    taxonomy: { primaryCategory: "AI Art & Anime", tags: ["nature", "night", "cinematic"] },
    stats: { likes: 2300, views: 12000, saves: 450 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      longDescription: "Masterful ambient lighting prompt tailored for Midjourney v6. Imbues wide environmental framing with natural atmospheric volume, perfect reflections, and localized depth of field without relying on excessive post-processing keywords.",
      variables: [
        { name: "aspect_ratio", description: "Target resolution aspect ratio", default: "16:9" },
        { name: "time_of_day", description: "Specific lighting hue (e.g. moonlight, twilight)", default: "indigo moonlight" }
      ],
      exampleInput: { aspect_ratio: "2:1", time_of_day: "crimson twilight" },
      exampleOutput: "[Midjourney Engine Execution: Completed]\nResolution: 2048x1024\nFidelity metrics: Volumetric light ray accuracy 98.4%, texture noise threshold optimal. Render details showcase pristine individual falling blossoms against deep atmospheric black-point curves.",
      modelCompatibility: ["Midjourney v6", "Midjourney v5.2", "Niji 6"],
      avgRating: 4.9,
      reviewCount: 142,
      purchaseCount: 520,
      is_featured: true,
      is_staff_pick: true
    },
    createdAt: "2024-05-10T08:00:00Z"
  },
  {
    id: "p3",
    slug: "ethereal-castle-in-clouds",
    title: "Ethereal Citadel in the Clouds",
    description: "Vast, epic high-fantasy architecture concept art featuring zero-gravity floating monoliths and hyper-detailed masonry.",
    content: {
      text: "Epic masterwork concept art of an impossible crystalline fantasy castle floating gracefully within sunlit cumulus cloud layer, hyper-detailed white marble masonry with luminescent blue vein fractures, cascading waterfalls pouring into open sky, god rays breaking through atmospheric haze, dramatic high contrast composition, Octane render aesthetic, sharp focus, 8k resolution",
      negativePrompt: "flat lighting, untextured surfaces, repetitive patterns, disjointed perspectives, text, signature, watermark",
      version: "1.0"
    },
    promptToCopy: "Epic masterwork concept art of an impossible crystalline fantasy castle floating gracefully within sunlit cumulus cloud layer, hyper-detailed white marble masonry with luminescent blue vein fractures, cascading waterfalls pouring into open sky, god rays breaking through atmospheric haze, dramatic high contrast composition, Octane render aesthetic, sharp focus, 8k resolution",
    assets: [{ type: 'image', primaryUrl: "/images/stock/ethereal-castle.png", thumbnailUrl: "/images/stock/ethereal-castle.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u3", handle: "@raws.art", displayName: "Raws Art", avatarUrl: "", isVerified: true },
    engine: { modelId: "sdxl", provider: "Stable Diffusion", parameters: { steps: 40, cfg_scale: 7.5, sampler: "DPM++ 2M Karras" } },
    taxonomy: { primaryCategory: "AI Art & Anime", tags: ["castle", "sky", "fantasy"] },
    stats: { likes: 3100, views: 15000, saves: 890 },
    pricing: { type: 'one_time', priceCents: 499 },
    _db: {
      longDescription: "Engineered specifically for Stable Diffusion XL base models. Fully utilizes multi-prompt weighting to separate distinct micro-textures on complex multi-tiered spires while preventing cloud formation bleeding.",
      variables: [
        { name: "architecture_style", description: "Primary visual base material", default: "white marble masonry" },
        { name: "lighting_mood", description: "Atmospheric cloud scattering behavior", default: "sunlit cumulus" }
      ],
      exampleInput: { architecture_style: "obsidian gothic spires", lighting_mood: "thunderstorm updraft" },
      exampleOutput: "[Stable Diffusion XL Output Generated]\nSeed: 849102934\nCFG Scale: 7.5\nOutput delivers ultra-crisp edge detection across floating islands with zero spatial artifacts. Depth buffer maps perfectly to post-render composition pipelines.",
      modelCompatibility: ["SDXL 1.0", "Juggernaut XL", "DreamShaper XL"],
      avgRating: 4.8,
      reviewCount: 94,
      purchaseCount: 310
    },
    createdAt: "2024-05-10T10:00:00Z"
  },
  {
    id: "p4",
    slug: "cybernetic-girl",
    title: "Neo-Tokyo Cybernetic Portrait",
    description: "Highly polished futuristic close-up character study incorporating sub-surface cybernetic wiring and high-fashion neon contours.",
    content: {
      text: "A stunning close-up fashion portrait of a female Japanese android in year 2099, flawless porcelain synthetic skin with delicate sub-surface glowing fiber optic circuitry patterns along the jawline, deep reflective cybernetic ocular lenses capturing neon billboard arrays, damp skin texture, Rim lighting from turquoise and magenta ambient strips, hyper-realistic photographic quality --v 6.0 --style raw",
      negativePrompt: "distorted face, extra limbs, non-symmetrical optics, cartoonish rendering, low resolution, cross-eyed",
      version: "1.1"
    },
    promptToCopy: "A stunning close-up fashion portrait of a female Japanese android in year 2099, flawless porcelain synthetic skin with delicate sub-surface glowing fiber optic circuitry patterns along the jawline, deep reflective cybernetic ocular lenses capturing neon billboard arrays, damp skin texture, Rim lighting from turquoise and magenta ambient strips, hyper-realistic photographic quality --v 6.0 --style raw",
    assets: [{ type: 'image', primaryUrl: "/images/stock/cybernetic-girl.png", thumbnailUrl: "/images/stock/cybernetic-girl.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u4", handle: "@pixel.muse", displayName: "Pixel Muse", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 300 } },
    taxonomy: { primaryCategory: "AI Art & Anime", tags: ["portrait", "cyborg", "neon"] },
    stats: { likes: 1200, views: 5000, saves: 210 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "neon_palette", description: "Reflected accent colors", default: "turquoise and magenta" }],
      exampleInput: { neon_palette: "amber and electric blue" },
      exampleOutput: "[Image Generated successfully]\nExtreme macro detail captures fine synthetic skin weave alongside perfect optical specularity. Optimal lighting vectors for high-end graphic design integration.",
      modelCompatibility: ["Midjourney v6"],
      avgRating: 4.7,
      reviewCount: 38
    },
    createdAt: "2024-05-10T11:00:00Z"
  },
  {
    id: "p11",
    slug: "ghibli-summer",
    title: "Ghibli Nostalgic Summer Vista",
    description: "Achieve authentic hand-painted aesthetic landscapes invoking classic studio animation textures and warm organic palettes.",
    content: {
      text: "Authentic 1990s Studio Ghibli cel-shaded animation still of an idyllic countryside hillside on a breezy midsummer afternoon, tall swaying emerald green grass with scattered wild sunflowers, immense majestic cumulus clouds dominating a deep azure sky, distant small rural train passing peacefully, warm sun-drenched lighting, authentic film grain, masterpiece artistic simplicity",
      negativePrompt: "3d render, hyperrealistic, sharp digital borders, modern vectors, plastic textures, CGI look",
      version: "1.0"
    },
    promptToCopy: "Authentic 1990s Studio Ghibli cel-shaded animation still of an idyllic countryside hillside on a breezy midsummer afternoon, tall swaying emerald green grass with scattered wild sunflowers, immense majestic cumulus clouds dominating a deep azure sky, distant small rural train passing peacefully, warm sun-drenched lighting, authentic film grain, masterpiece artistic simplicity --ar 16:9 --style raw",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/ghibli_summer.png", thumbnailUrl: "/images/marketplace/ghibli_summer.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u11", handle: "@ghibli.fan", displayName: "Ghibli Fan", avatarUrl: "", isVerified: false },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { niji: true } },
    taxonomy: { primaryCategory: "AI Art & Anime", tags: ["ghibli", "summer", "landscape"] },
    stats: { likes: 4500, views: 25000, saves: 1200 },
    pricing: { type: 'one_time', priceCents: 299 },
    _db: {
      variables: [{ name: "environment_element", description: "Foreground visual focus", default: "scattered wild sunflowers" }],
      exampleInput: { environment_element: "a small mossy stone shrine" },
      exampleOutput: "Provides immaculate cel-painted stroke outlines matching classic animation workflows. Highly stable color consistency across multiple generation seeds.",
      modelCompatibility: ["Niji 6", "Midjourney v6"],
      avgRating: 5.0,
      reviewCount: 210
    },
    createdAt: "2024-05-12T08:00:00Z"
  },
  {
    id: "p12",
    slug: "neon-samurai",
    title: "Cyber-Katana Rain Still",
    description: "High-voltage character dynamic frame engineered for FLUX generation models requiring tight structural edge control.",
    content: {
      text: "A highly dynamic full body character concept of a cybernetically enhanced ronin samurai standing center frame in a dark rain-slicked Tokyo alleyway, heavy advanced tactical carbon-fiber samurai armor glowing with thin neon crimson trim, holding a drawn thermal katana blade emitting heat waves, volumetric water splash reacting to blade illumination, ultra sharp focus, photographic depth",
      negativePrompt: "blurry, poorly drawn hands, missing sword handle, distorted weapon geometry, flat colors",
      version: "1.0"
    },
    promptToCopy: "A highly dynamic full body character concept of a cybernetically enhanced ronin samurai standing center frame in a dark rain-slicked Tokyo alleyway, heavy advanced tactical carbon-fiber samurai armor glowing with thin neon crimson trim, holding a drawn thermal katana blade emitting heat waves, volumetric water splash reacting to blade illumination, ultra sharp focus, photographic depth",
    assets: [{ type: 'image', primaryUrl: "/images/stock/neon-tokyo.png", thumbnailUrl: "/images/stock/neon-tokyo.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u12", handle: "@cyber.blade", displayName: "Cyber Blade", avatarUrl: "", isVerified: true },
    engine: { modelId: "flux", provider: "FLUX", parameters: { guidance_scale: 3.5 } },
    taxonomy: { primaryCategory: "AI Art & Anime", tags: ["samurai", "cyberpunk", "neon"] },
    stats: { likes: 3800, views: 18000, saves: 900 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "blade_energy", description: "Sword light behavior", default: "thermal katana blade emitting heat waves" }],
      exampleInput: { blade_energy: "crackling high-voltage arc sabre" },
      exampleOutput: "[FLUX.1-dev Engine Result]\nFlawless visual parsing of advanced composite armor plates. Edge lighting behaves dynamically against surrounding environment maps.",
      avgRating: 4.8,
      reviewCount: 88
    },
    createdAt: "2024-05-12T09:00:00Z"
  },

  // Websites & UI
  {
    id: "p7",
    slug: "luxury-perfume-landing",
    title: "Premium Glassmorphism Landing Page",
    description: "Complete UI template prompt optimized for extracting perfect layout structures, clear font pairing, and sleek contemporary spacing.",
    content: {
      text: "A high-end editorial website user interface landing page for an exclusive luxury fragrance brand called 'AURA', full-bleed top minimalist navigation bar, striking hero section showcasing an elegant dark glass perfume bottle floating amidst floating liquid gold droplets, deep charcoal abstract background, sophisticated editorial serif typography headings, translucent glassmorphism product specification cards with soft drop shadows, clean modern grid structure, award winning UI UX web design --ar 16:10 --v 6.0",
      negativePrompt: "cluttered layout, generic stock photo feel, unaligned text, bad kerning, misaligned grid, extra buttons",
      version: "1.0"
    },
    promptToCopy: "A high-end editorial website user interface landing page for an exclusive luxury fragrance brand called '{{brand_name}}', full-bleed top minimalist navigation bar, striking hero section showcasing an elegant dark glass perfume bottle floating amidst floating liquid gold droplets, deep charcoal abstract background, sophisticated editorial serif typography headings, translucent glassmorphism product specification cards with soft drop shadows, clean modern grid structure, award winning UI UX web design --ar 16:10 --v 6.0",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/perfume_landing.png", thumbnailUrl: "/images/marketplace/perfume_landing.png", dimensions: { width: 1440, height: 900 } }],
    creator: { id: "u7", handle: "@designflow", displayName: "DesignFlow", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 180 } },
    taxonomy: { primaryCategory: "Websites & UI", tags: ["minimal", "luxury", "saas"] },
    stats: { likes: 2400, views: 12000, saves: 450 },
    pricing: { type: 'one_time', priceCents: 999 },
    _db: {
      variables: [
        { name: "brand_name", description: "Target brand textual focus", default: "AURA" },
        { name: "product_focus", description: "Central hero asset description", default: "elegant dark glass perfume bottle" }
      ],
      exampleInput: { brand_name: "LUMINA", product_focus: "minimalist sleek obsidian cosmetic jar" },
      exampleOutput: "Renders structurally immaculate wireframe zones. Typeface generation maintains clean layout hierarchy suitable for immediate extraction to frontend component libraries.",
      modelCompatibility: ["Midjourney v6"],
      avgRating: 4.9,
      reviewCount: 156,
      purchaseCount: 420
    },
    createdAt: "2024-05-11T08:00:00Z"
  },
  {
    id: "p13",
    slug: "fintech-dashboard",
    title: "Institutional Crypto Dashboard Interface",
    description: "Multi-layered real-time metrics command center UI optimized for clean data layouts and high visual data density.",
    content: {
      text: "A beautiful professional web application dark mode user interface dashboard for an institutional cryptocurrency trading analytics engine, multiple well-structured analytical panels featuring high fidelity custom smooth spline area charts with gradient glowing fills, multi-column order book display, left compact icon-based side navigation drawer, clear monospaced financial data tickers, deep slate blue background palette with vibrant neon cyan and emerald interactive highlight buttons, hyper-clean contemporary SaaS layout design --ar 16:9 --v 6.0",
      negativePrompt: "messy data elements, illegible numbers, overlapping interface panels, non-standard visual elements",
      version: "1.0"
    },
    promptToCopy: "A beautiful professional web application dark mode user interface dashboard for an institutional cryptocurrency trading analytics engine, multiple well-structured analytical panels featuring high fidelity custom smooth spline area charts with gradient glowing fills, multi-column order book display, left compact icon-based side navigation drawer, clear monospaced financial data tickers, deep slate blue background palette with vibrant neon cyan and emerald interactive highlight buttons, hyper-clean contemporary SaaS layout design --ar 16:9 --v 6.0",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/fintech_dashboard.png", thumbnailUrl: "/images/marketplace/fintech_dashboard.png", dimensions: { width: 1920, height: 1080 } }],
    creator: { id: "u13", handle: "@ui_wizard", displayName: "UI Wizard", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 150 } },
    taxonomy: { primaryCategory: "Websites & UI", tags: ["fintech", "dashboard", "darkmode"] },
    stats: { likes: 1900, views: 9500, saves: 310 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "primary_accent", description: "Interface visual focus states", default: "neon cyan and emerald" }],
      exampleInput: { primary_accent: "electric violet and gold" },
      exampleOutput: "Excellent structural fidelity. Provides flawless dashboard layout zones easily translatable to layout grid systems like Tailwind CSS.",
      avgRating: 4.6,
      reviewCount: 45
    },
    createdAt: "2024-05-12T10:00:00Z"
  },
  {
    id: "p14",
    slug: "travel-app-ui",
    title: "Immersive Mobile Travel Booking App",
    description: "Mobile viewport UI layout focusing on fluid touch targets, immersive imagery cards, and high contrast clean typography.",
    content: {
      text: "A pixel-perfect smartphone mobile app user interface display showing a modern immersive destination travel guide app, edge-to-edge layout, prominent vertical responsive scrolling cards featuring high dynamic range photography of scenic mountain ranges, integrated top floating semi-transparent search pill, clean sans-serif editorial typography metadata labels, soft bottom sticky navigation interface, clean modern aesthetic, dribbble inspiration award winning layout --ar 9:16 --v 6.0",
      negativePrompt: "cluttered phone frame, standard phone shell rendering, text overlap, ugly icons, misaligned margins",
      version: "1.0"
    },
    promptToCopy: "A pixel-perfect smartphone mobile app user interface display showing a modern immersive destination travel guide app, edge-to-edge layout, prominent vertical responsive scrolling cards featuring high dynamic range photography of scenic mountain ranges, integrated top floating semi-transparent search pill, clean sans-serif editorial typography metadata labels, soft bottom sticky navigation interface, clean modern aesthetic, dribbble inspiration award winning layout --ar 9:16 --v 6.0",
    assets: [{ type: 'image', primaryUrl: "/images/stock/lost-galaxy.png", thumbnailUrl: "/images/stock/lost-galaxy.png", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u14", handle: "@pixel.perfection", displayName: "Pixel Perfection", avatarUrl: "", isVerified: false },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 200 } },
    taxonomy: { primaryCategory: "Websites & UI", tags: ["travel", "mobile", "app"] },
    stats: { likes: 1500, views: 7000, saves: 220 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "destination_theme", description: "Hero background theme", default: "scenic mountain ranges" }],
      exampleInput: { destination_theme: "tropical pristine turquoise coastlines" },
      exampleOutput: "Outputs perfect screen layout divisions optimized for immediate translation into production frameworks like React Native or Flutter.",
      avgRating: 4.5,
      reviewCount: 22
    },
    createdAt: "2024-05-12T11:00:00Z"
  },
  {
    id: "p15",
    slug: "saas-landing-2024",
    title: "Next-Gen Bento Grid Layout UI",
    description: "Cutting-edge modular presentation architecture utilizing highly balanced asymmetric card blocks and micro-3D product render assets.",
    content: {
      text: "A state-of-the-art modern SaaS web application landing page user interface using a beautiful advanced asymmetrical bento box grid architecture, clean soft off-white background layout, each rounded card container featuring custom smooth 3D extruded utility icons and real-time visual progress metrics, premium sans-serif typography, subtle pastel violet and mint accent tokens, clean spatial organization, hyper-minimalist premium visual feel",
      negativePrompt: "skewed layouts, low contrast text, generic placeholder blocks, distorted icon shapes",
      version: "1.0"
    },
    promptToCopy: "A state-of-the-art modern SaaS web application landing page user interface using a beautiful advanced asymmetrical bento box grid architecture, clean soft off-white background layout, each rounded card container featuring custom smooth 3D extruded utility icons and real-time visual progress metrics, premium sans-serif typography, subtle pastel violet and mint accent tokens, clean spatial organization, hyper-minimalist premium visual feel",
    assets: [{ type: 'image', primaryUrl: "/images/stock/ethereal-castle.png", thumbnailUrl: "/images/stock/ethereal-castle.png", dimensions: { width: 1440, height: 900 } }],
    creator: { id: "u15", handle: "@creative.layouts", displayName: "Creative Layouts", avatarUrl: "", isVerified: true },
    engine: { modelId: "flux", provider: "FLUX", parameters: { guidance_scale: 3.0 } },
    taxonomy: { primaryCategory: "Websites & UI", tags: ["saas", "bento", "landing"] },
    stats: { likes: 3200, views: 15000, saves: 850 },
    pricing: { type: 'one_time', priceCents: 599 },
    _db: {
      variables: [{ name: "accent_colors", description: "Primary layout styling tokens", default: "pastel violet and mint" }],
      exampleInput: { accent_colors: "soft monochrome and crimson accent" },
      exampleOutput: "Renders flawless Bento Grid structures directly matchable to CSS grid specification parameters. Exceptional vector crispness.",
      avgRating: 4.9,
      reviewCount: 112,
      purchaseCount: 280
    },
    createdAt: "2024-05-12T12:00:00Z"
  },
  {
    id: "p16",
    slug: "ecommerce-fashion",
    title: "Minimalist Editorial Fashion Storefront",
    description: "Editorial layout prompt mapping large high-end model lookbooks directly into functional interactive shop interface zones.",
    content: {
      text: "A premium high-fashion minimalist e-commerce digital storefront website user interface layout, full-height multi-column editorial photography layout featuring avant-garde models in raw structured clothing, deep monochrome aesthetic with ultra-clean negative space, bold striking modern serif product titles, ultra-thin border dividing lines, discrete micro-interactive purchasing controls, clean high-end aesthetic --ar 16:9 --v 6.0",
      negativePrompt: "standard ecommerce templates, generic sales banners, clutter, bad text alignment, overly complex navigation",
      version: "1.0"
    },
    promptToCopy: "A premium high-fashion minimalist e-commerce digital storefront website user interface layout, full-height multi-column editorial photography layout featuring avant-garde models in raw structured clothing, deep monochrome aesthetic with ultra-clean negative space, bold striking modern serif product titles, ultra-thin border dividing lines, discrete micro-interactive purchasing controls, clean high-end aesthetic --ar 16:9 --v 6.0",
    assets: [{ type: 'image', primaryUrl: "/images/stock/cinematic-portrait.png", thumbnailUrl: "/images/stock/cinematic-portrait.png", dimensions: { width: 1440, height: 900 } }],
    creator: { id: "u16", handle: "@vogue.design", displayName: "Vogue Design", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 220 } },
    taxonomy: { primaryCategory: "Websites & UI", tags: ["ecommerce", "fashion", "luxury"] },
    stats: { likes: 2800, views: 13000, saves: 540 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "clothing_style", description: "Target editorial collection look", default: "avant-garde models in raw structured clothing" }],
      exampleInput: { clothing_style: "high-contrast minimalist activewear lines" },
      exampleOutput: "Generates high fidelity digital web composition perfectly balancing photo frames with surrounding text anchors.",
      avgRating: 4.7,
      reviewCount: 51
    },
    createdAt: "2024-05-12T13:00:00Z"
  },

  // Branding & Logos
  {
    id: "p9",
    slug: "tech-brand-kit",
    title: "Complete Enterprise Brand Kit Matrix",
    description: "Generate structured multi-view presentation suites displaying unified brand marks across stationery, devices, and minimal logotypes.",
    content: {
      text: "A comprehensive professional corporate brand identity kit layout for an advanced enterprise AI infrastructure platform called 'NEXUS', neatly organized bento-style presentation arrangement showing a premium geometric isometric 3D logo design, full custom typographic specification manual, letterhead mockups, clean matte black business cards with subtle spot UV silver foil debossing, custom icon suite set on clean grey slate background, photorealistic commercial presentation studio lighting",
      negativePrompt: "cluttered, low-res preview, broken geometry, illegible text overlays, standard generic clip-art marks",
      version: "1.0"
    },
    promptToCopy: "A comprehensive professional corporate brand identity kit layout for an advanced enterprise AI infrastructure platform called '{{company_name}}', neatly organized bento-style presentation arrangement showing a premium geometric isometric 3D logo design, full custom typographic specification manual, letterhead mockups, clean matte black business cards with subtle spot UV silver foil debossing, custom icon suite set on clean grey slate background, photorealistic commercial presentation studio lighting",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/tech_branding.png", thumbnailUrl: "/images/marketplace/tech_branding.png", dimensions: { width: 2000, height: 2000 } }],
    creator: { id: "u9", handle: "@brandingpro", displayName: "BrandingPro", avatarUrl: "", isVerified: true },
    engine: { modelId: "dalle-3", provider: "DALL-E 3", parameters: { quality: "hd" } },
    taxonomy: { primaryCategory: "Branding & Logos", tags: ["tech", "minimal", "branding"] },
    stats: { likes: 950, views: 5000, saves: 85 },
    pricing: { type: 'one_time', priceCents: 1299 },
    _db: {
      variables: [
        { name: "company_name", description: "Target corporate name parameter", default: "NEXUS" },
        { name: "brand_mark_style", description: "Core icon structural language", default: "premium geometric isometric 3D logo" }
      ],
      exampleInput: { company_name: "CYPHER", brand_mark_style: "interlocking minimalist vector continuous line emblem" },
      exampleOutput: "Outputs perfect flat layout presentation matrix showing structural variations in beautiful isolated perspective sets.",
      modelCompatibility: ["DALL-E 3"],
      avgRating: 4.9,
      reviewCount: 31,
      purchaseCount: 180
    },
    createdAt: "2024-05-11T10:00:00Z"
  },
  {
    id: "p17",
    slug: "organic-coffee-branding",
    title: "Artisanal Organic Roastery Identity",
    description: "Craft warm, hyper-textured sustainable branding arrays mapping hand-drawn illustrative elements to premium product packaging.",
    content: {
      text: "A highly sophisticated rustic visual identity presentation setup for a premium organic small-batch artisanal coffee roastery, showcasing premium unbleached textured kraft paper coffee bean pouches with simple continuous line minimalist foil-stamped illustrations, matching raw linen aprons, distinct custom warm earthy pantone color palette cards, soft top-down natural sunlit photography studio table setup --ar 1:1 --v 6.0",
      negativePrompt: "plastic finish, generic glossy packaging, over-saturated colors, low quality text rendering",
      version: "1.0"
    },
    promptToCopy: "A highly sophisticated rustic visual identity presentation setup for a premium organic small-batch artisanal coffee roastery, showcasing premium unbleached textured kraft paper coffee bean pouches with simple continuous line minimalist foil-stamped illustrations, matching raw linen aprons, distinct custom warm earthy pantone color palette cards, soft top-down natural sunlit photography studio table setup --ar 1:1 --v 6.0",
    assets: [{ type: 'image', primaryUrl: "/images/stock/sakura-night.png", thumbnailUrl: "/images/stock/sakura-night.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u17", handle: "@nature.designs", displayName: "Nature Designs", avatarUrl: "", isVerified: false },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 120 } },
    taxonomy: { primaryCategory: "Branding & Logos", tags: ["coffee", "organic", "branding"] },
    stats: { likes: 1400, views: 6000, saves: 190 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "packaging_material", description: "Main physical texture application", default: "unbleached textured kraft paper" }],
      exampleInput: { packaging_material: "recycled premium minimalist soft matte white tin cans" },
      exampleOutput: "Delivers wonderful texture fidelity across real package substrate simulations. Lighting remains beautifully soft and ambient.",
      avgRating: 4.4,
      reviewCount: 19
    },
    createdAt: "2024-05-13T08:00:00Z"
  },
  {
    id: "p18",
    slug: "cyber-energy-drink",
    title: "Hyper-Contrast Neon Beverage Suite",
    description: "Explosive, hyper-vibrant product identity set tailored for futuristic consumer brands requiring high shelf visual impact.",
    content: {
      text: "An explosive cyberpunk product packaging design suite showcasing a set of sleek futuristic metallic aluminum energy drink cans called 'VOLT', high contrast ultra-saturated matte black surface finish featuring razor-sharp aggressive neon lime green and electric violet geometric typography, dynamic product display surrounded by localized dry ice vapor rings, dramatic localized backlighting, ultra-high detail visual aesthetic",
      negativePrompt: "flat lighting, distorted can shape, basic standard beverage labels, blurry text edges",
      version: "1.0"
    },
    promptToCopy: "An explosive cyberpunk product packaging design suite showcasing a set of sleek futuristic metallic aluminum energy drink cans called 'VOLT', high contrast ultra-saturated matte black surface finish featuring razor-sharp aggressive neon lime green and electric violet geometric typography, dynamic product display surrounded by localized dry ice vapor rings, dramatic localized backlighting, ultra-high detail visual aesthetic",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/energy_drink.png", thumbnailUrl: "/images/marketplace/energy_drink.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u18", handle: "@glow.studio", displayName: "Glow Studio", avatarUrl: "", isVerified: true },
    engine: { modelId: "flux", provider: "FLUX", parameters: { guidance_scale: 4.0 } },
    taxonomy: { primaryCategory: "Branding & Logos", tags: ["energydrink", "cyberpunk", "neon"] },
    stats: { likes: 2200, views: 10000, saves: 420 },
    pricing: { type: 'one_time', priceCents: 399 },
    _db: {
      variables: [{ name: "beverage_brand", description: "Target drink moniker", default: "VOLT" }],
      exampleInput: { beverage_brand: "HYPERION" },
      exampleOutput: "Outputs perfect structural can mockups with absolute material precision. Superb metallic anisotropic reflection profiles.",
      avgRating: 4.8,
      reviewCount: 62
    },
    createdAt: "2024-05-13T09:00:00Z"
  },
  {
    id: "p19",
    slug: "minimal-monogram",
    title: "Timeless Luxury Interlocking Monogram",
    description: "Generates high-precision, infinitely scalable continuous curve logotype combinations optimal for premium lifestyle brands.",
    content: {
      text: "A stunning ultra-minimalist vector line art interlocking monogram logo design combining the letters 'K' and 'V' seamlessly, perfectly balanced geometric proportions, continuous elegant stroke width, set against a pristine absolute white background, high-end timeless luxury jewelry house aesthetic, extreme design simplicity, professional graphic design masterpiece --no gradient, text, 3d effects --v 6.0",
      negativePrompt: "gradient, text, 3d effects, complex drop shadows, jagged edges, low resolution artifacts",
      version: "1.0"
    },
    promptToCopy: "A stunning ultra-minimalist vector line art interlocking monogram logo design combining the letters '{{letter_1}}' and '{{letter_2}}' seamlessly, perfectly balanced geometric proportions, continuous elegant stroke width, set against a pristine absolute white background, high-end timeless luxury jewelry house aesthetic, extreme design simplicity, professional graphic design masterpiece --no gradient, text, 3d effects --v 6.0",
    assets: [{ type: 'image', primaryUrl: "/images/stock/ethereal-castle.png", thumbnailUrl: "/images/stock/ethereal-castle.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u19", handle: "@logo.master", displayName: "Logo Master", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 80 } },
    taxonomy: { primaryCategory: "Branding & Logos", tags: ["logo", "minimal", "monogram"] },
    stats: { likes: 1100, views: 5500, saves: 150 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [
        { name: "letter_1", description: "First target monogram letter", default: "K" },
        { name: "letter_2", description: "Second target monogram letter", default: "V" }
      ],
      exampleInput: { letter_1: "A", letter_2: "X" },
      exampleOutput: "Flawless monochrome line extraction with exceptional vector tracking parameters. Easy vector tracing compatibility.",
      avgRating: 4.7,
      reviewCount: 28
    },
    createdAt: "2024-05-13T10:00:00Z"
  },
  {
    id: "p20",
    slug: "skincare-identity",
    title: "Serene Botanical Cosmetic Suite",
    description: "Highly polished multi-product presentation template applying clean modern san-serif anchors to smooth frosted bottle collections.",
    content: {
      text: "A stunning sophisticated cosmetics brand identity kit presentation for an organic skincare laboratory named 'LUMINA', high-end photography displaying custom matte frosted cosmetic dropper bottles arranged systematically alongside pure water droplets and fresh natural eucalyptus leaves, premium delicate light grey pastel background, clean crisp sans-serif minimalist packaging typography, premium commercial visual staging --ar 16:9 --v 6.0",
      negativePrompt: "clutter, standard cheap stock product jars, high contrast lighting shadows, unreadable texts",
      version: "1.0"
    },
    promptToCopy: "A stunning sophisticated cosmetics brand identity kit presentation for an organic skincare laboratory named 'LUMINA', high-end photography displaying custom matte frosted cosmetic dropper bottles arranged systematically alongside pure water droplets and fresh natural eucalyptus leaves, premium delicate light grey pastel background, clean crisp sans-serif minimalist packaging typography, premium commercial visual staging --ar 16:9 --v 6.0",
    assets: [{ type: 'image', primaryUrl: "/images/stock/cinematic-portrait.png", thumbnailUrl: "/images/stock/cinematic-portrait.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u20", handle: "@beauty.brander", displayName: "Beauty Brander", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 140 } },
    taxonomy: { primaryCategory: "Branding & Logos", tags: ["skincare", "beauty", "branding"] },
    stats: { likes: 1800, views: 8000, saves: 310 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "botanical_accent", description: "Fresh natural accessory element", default: "fresh natural eucalyptus leaves" }],
      exampleInput: { botanical_accent: "subtle dried lavender stalks" },
      exampleOutput: "Pristine product mapping layout. Exceptional container refraction quality suitable for digital shop catalogs.",
      avgRating: 4.8,
      reviewCount: 42
    },
    createdAt: "2024-05-13T11:00:00Z"
  },

  // Social & Reels
  {
    id: "p8",
    slug: "banana-drama-reel",
    title: "Surreal Viral Fruit Loop Animation",
    description: "Engineered video generator text input driving high-engagement surrealistic 3D rendering loops tailored for TikTok and Instagram feeds.",
    content: {
      text: "A highly dynamic hyper-surreal cinematic vertical video loop intended for a viral social media feed, a highly detailed anthropomorphic photorealistic single yellow banana wearing tiny oversized luxury black sunglasses walking dramatically in ultra slow-motion down an infinite brightly illuminated pastel neon fashion runway, ambient studio lighting with dense volumetric fog, extreme hyper-detail character animation, dynamic tracking shot, ultra smooth motion interpolation",
      negativePrompt: "jerky frames, artifacting, low resolution frame rendering, untextured surfaces, text, watermark",
      version: "1.0"
    },
    promptToCopy: "A highly dynamic hyper-surreal cinematic vertical video loop intended for a viral social media feed, a highly detailed anthropomorphic photorealistic single yellow banana wearing tiny oversized luxury black sunglasses walking dramatically in ultra slow-motion down an infinite brightly illuminated pastel neon fashion runway, ambient studio lighting with dense volumetric fog, extreme hyper-detail character animation, dynamic tracking shot, ultra smooth motion interpolation",
    assets: [{ type: 'video', primaryUrl: "/images/marketplace/banana_drama.png", thumbnailUrl: "/images/marketplace/banana_drama.png", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u8", handle: "@vfxmaster", displayName: "VFXMaster", avatarUrl: "", isVerified: true },
    engine: { modelId: "luma", provider: "Luma AI", parameters: { motion_scale: 8 } },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["viral", "humor", "fruit"] },
    stats: { likes: 1800, views: 45000, saves: 442 },
    pricing: { type: 'one_time', priceCents: 799 },
    _db: {
      variables: [{ name: "character_prop", description: "Humorous contextual accessory", default: "tiny oversized luxury black sunglasses" }],
      exampleInput: { character_prop: "a highly realistic miniature leather satchel" },
      exampleOutput: "[Luma Dream Machine Render Completion]\nFrame sequence delivered at 60fps vertical format. Extreme temporal consistency across continuous geometric walking loops.",
      modelCompatibility: ["Luma Dream Machine", "Runway Gen-3 Alpha"],
      avgRating: 4.9,
      reviewCount: 78,
      purchaseCount: 210
    },
    createdAt: "2024-05-11T09:00:00Z"
  },
  {
    id: "p21",
    slug: "hyper-speed-travel",
    title: "Cinematic High-Speed Transit Reel",
    description: "Temporal consistency prompt built for high-energy motion generators driving cinematic rapid editing loops with pristine optical motion blur.",
    content: {
      text: "A stunning seamless high-speed hyperlapse tracking video sequence traveling swiftly down the center of an illuminated architectural hyper-futuristic tunnel in neo-Tokyo, dramatic streak optical motion blur on peripheral lighting arrays, perfectly centered cinematic composition, hyper-detailed surface tracking, vivid dynamic range grading, smooth 60fps playback rendering interpolation",
      negativePrompt: "stuttering camera, unstable center path tracking, low resolution, warped textures",
      version: "1.0"
    },
    promptToCopy: "A stunning seamless high-speed hyperlapse tracking video sequence traveling swiftly down the center of an illuminated architectural hyper-futuristic tunnel in neo-Tokyo, dramatic streak optical motion blur on peripheral lighting arrays, perfectly centered cinematic composition, hyper-detailed surface tracking, vivid dynamic range grading, smooth 60fps playback rendering interpolation",
    assets: [{ type: 'video', primaryUrl: "/images/stock/lost-galaxy.png", thumbnailUrl: "/images/stock/lost-galaxy.png", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u21", handle: "@travel.cuts", displayName: "Travel Cuts", avatarUrl: "", isVerified: true },
    engine: { modelId: "pika", provider: "Pika Labs", parameters: { camera_zoom: "in_fast" } },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["travel", "viral", "video"] },
    stats: { likes: 3500, views: 82000, saves: 1100 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "transit_environment", description: "Main spatial environment parameter", default: "architectural hyper-futuristic tunnel in neo-Tokyo" }],
      exampleInput: { transit_environment: "dense towering misty neon cyberpunk skyscrapers" },
      exampleOutput: "Generates high fidelity multi-frame sequences optimized for engaging quick-cut social montages. Excellent edge consistency.",
      avgRating: 4.8,
      reviewCount: 96
    },
    createdAt: "2024-05-14T08:00:00Z"
  },
  {
    id: "p22",
    slug: "aesthetic-lifestyle",
    title: "Cozy Morning Sunbeam Stillness",
    description: "Highly calibrated aesthetic photography string creating perfectly lit warm interior spaces with hyper-realistic soft fabric textures.",
    content: {
      text: "A highly cinematic tranquil lifestyle close-up shot capturing a slow morning moment, warm organic morning golden hour sunbeams casting strong clean parallel shadows across a rustic bleached white wooden kitchen surface, a single handcrafted ceramic mug emitting gentle wisps of rising steam, a partially opened minimal hardback book, pristine Scandinavian minimalist decor aesthetic, hyper-detailed surface textures --ar 9:16 --v 6.0",
      negativePrompt: "cluttered surface, distorted cup geometry, harsh artificial flashes, text rendering artifacts",
      version: "1.0"
    },
    promptToCopy: "A highly cinematic tranquil lifestyle close-up shot capturing a slow morning moment, warm organic morning golden hour sunbeams casting strong clean parallel shadows across a rustic bleached white wooden kitchen surface, a single handcrafted ceramic mug emitting gentle wisps of rising steam, a partially opened minimal hardback book, pristine Scandinavian minimalist decor aesthetic, hyper-detailed surface textures --ar 9:16 --v 6.0",
    assets: [{ type: 'video', primaryUrl: "/images/stock/sakura-night.png", thumbnailUrl: "/images/stock/sakura-night.png", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u22", handle: "@moody.vibes", displayName: "Moody Vibes", avatarUrl: "", isVerified: false },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 130 } },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["lifestyle", "aesthetic", "shorts"] },
    stats: { likes: 2100, views: 35000, saves: 580 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "surface_item", description: "Secondary focal prop object", default: "a partially opened minimal hardback book" }],
      exampleInput: { surface_item: "freshly sliced sourdough crust on a linen cloth" },
      exampleOutput: "Outputs perfect deep-warm highlight gradients. Excellent visual asset foundation for atmospheric digital storytelling.",
      avgRating: 4.7,
      reviewCount: 34
    },
    createdAt: "2024-05-14T09:00:00Z"
  },
  {
    id: "p23",
    slug: "3d-product-reveal",
    title: "Cinematic Micro-Rotation Launch Asset",
    description: "Precision spatial rotation prompting driving clean continuous orbital lighting sequences against isolated premium product marks.",
    content: {
      text: "A striking high-end commercial vertical video product launch animation showcasing a hyper-sleek minimal matte black metallic smartphone rotating smoothly in perfect mid-air orbit, localized single source tracking rim lighting casting sleek edge illumination along curved bezel contours, ultra dark studio background with volumetric gradient falloff, extreme detail rendering, cinematic commercial grade 3D sequence",
      negativePrompt: "unstable tracking, background artifacts, distorted geometry, low resolution textures",
      version: "1.0"
    },
    promptToCopy: "A striking high-end commercial vertical video product launch animation showcasing a hyper-sleek minimal matte black metallic smartphone rotating smoothly in perfect mid-air orbit, localized single source tracking rim lighting casting sleek edge illumination along curved bezel contours, ultra dark studio background with volumetric gradient falloff, extreme detail rendering, cinematic commercial grade 3D sequence",
    assets: [{ type: 'video', primaryUrl: "/images/stock/cybernetic-girl.png", thumbnailUrl: "/images/stock/cybernetic-girl.png", dimensions: { width: 1080, height: 1350 } }],
    creator: { id: "u23", handle: "@vfx.wizard", displayName: "VFX Wizard", avatarUrl: "", isVerified: true },
    engine: { modelId: "luma", provider: "Luma AI", parameters: { orbit: "left_360" } },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["3d", "product", "reveal"] },
    stats: { likes: 2900, views: 56000, saves: 920 },
    pricing: { type: 'one_time', priceCents: 899 },
    _db: {
      variables: [{ name: "product_device", description: "Central electronic item target", default: "hyper-sleek minimal matte black metallic smartphone" }],
      exampleInput: { product_device: "custom audiophile noise-canceling brushed titanium headphones" },
      exampleOutput: "[Luma AI Engine Task Log]\nTrajectory mapping validated. Orbital lighting rotation updates pixel reflection matrices at native resolution with absolute continuous flow.",
      avgRating: 4.9,
      reviewCount: 84,
      purchaseCount: 220
    },
    createdAt: "2024-05-14T10:00:00Z"
  },
  {
    id: "p30",
    slug: "street-food-tour",
    title: "Hyper-Dynamic Street Gastronomy Cuts",
    description: "Highly focused temporal generator framework creating extreme focus macro food rendering arrays with dynamic ambient steam movement.",
    content: {
      text: "An ultra close-up mouth-watering tracking video clip of authentic Japanese street food preparation, dynamic pan across a hyper-detailed sizzling cast-iron grill surface cooking thick yakitori skewers coated in deep dark bubbling sweet soy glaze, dense volumetric warm steam reacting directly to localized golden string lights overhead, hyper-realistic macro food cinematography, shallow depth of field, high motion fidelity",
      negativePrompt: "blurry foreground, static unmoving steam, low contrast, unrealistic textures, discolored ingredients",
      version: "1.0"
    },
    promptToCopy: "An ultra close-up mouth-watering tracking video clip of authentic Japanese street food preparation, dynamic pan across a hyper-detailed sizzling cast-iron grill surface cooking thick yakitori skewers coated in deep dark bubbling sweet soy glaze, dense volumetric warm steam reacting directly to localized golden string lights overhead, hyper-realistic macro food cinematography, shallow depth of field, high motion fidelity",
    assets: [{ type: 'video', primaryUrl: "https://i.ibb.co/VGDhfdn/1cb96527-d65b-466c-9d1c-d7fbba507fea.jpg", thumbnailUrl: "https://i.ibb.co/VGDhfdn/1cb96527-d65b-466c-9d1c-d7fbba507fea.jpg", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u30", handle: "@foodie.vlogs", displayName: "Foodie Vlogs", avatarUrl: "", isVerified: true },
    engine: { modelId: "pika", provider: "Pika Labs", parameters: { camera_pan: "right" } },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["food", "vlog", "shorts"] },
    stats: { likes: 4100, views: 95000, saves: 1500 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "food_subject", description: "Gastronomic preparation subject", default: "thick yakitori skewers coated in deep dark bubbling sweet soy glaze" }],
      exampleInput: { food_subject: "fresh crispy tempura prawn batter frying in hot golden peanut oil" },
      exampleOutput: "Incredible macro depth. Simulates dynamic thermal particle interactions with absolute photo-grade precision.",
      avgRating: 4.8,
      reviewCount: 110
    },
    createdAt: "2024-05-17T08:00:00Z"
  },
  {
    id: "p31",
    slug: "fashion-lookbook",
    title: "Minimalist High-Fashion Motion Reel",
    description: "Editorial video prompting system generating flawless high-end clothing movement against clean continuous infinity-wall environments.",
    content: {
      text: "A highly sophisticated minimalist fashion lookbook motion clip, centered vertical framing showing an elegant avant-garde runway model turning gracefully in slow motion while wearing an architectural layered oversized raw unbleached trench coat, clean neutral infinity studio lighting background, soft pristine highlight diffusion, ultra clean commercial fashion aesthetic",
      negativePrompt: "warped fabric physics, blurry edges, inconsistent model tracking, bad shadows",
      version: "1.0"
    },
    promptToCopy: "A highly sophisticated minimalist fashion lookbook motion clip, centered vertical framing showing an elegant avant-garde runway model turning gracefully in slow motion while wearing an architectural layered oversized raw unbleached trench coat, clean neutral infinity studio lighting background, soft pristine highlight diffusion, ultra clean commercial fashion aesthetic",
    assets: [{ type: 'video', primaryUrl: "/images/marketplace/fashion_lookbook.png", thumbnailUrl: "/images/marketplace/fashion_lookbook.png", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u31", handle: "@style.editor", displayName: "Style Editor", avatarUrl: "", isVerified: true },
    engine: { modelId: "luma", provider: "Luma AI", parameters: { motion_scale: 4 } },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["fashion", "aesthetic", "reels"] },
    stats: { likes: 3300, views: 68000, saves: 840 },
    pricing: { type: 'one_time', priceCents: 499 },
    _db: {
      variables: [{ name: "garment_design", description: "Target fashion styling logic", default: "architectural layered oversized raw unbleached trench coat" }],
      exampleInput: { garment_design: "flowing liquid silk metallic minimalist cocktail dress" },
      exampleOutput: "Flawless physical cloth tracking parameters. Ideal workflow generation output for social media brand launches.",
      avgRating: 4.9,
      reviewCount: 82,
      purchaseCount: 190
    },
    createdAt: "2024-05-17T09:00:00Z"
  },

  // Product Ads & Marketing
  {
    id: "p10",
    slug: "ai-fruit-marketing",
    title: "High-Fidelity Commercial Produce Still",
    description: "Highly focused texture rendering string driving commercial quality sub-surface droplet scatter and vibrant deep saturation profiles.",
    content: {
      text: "An award-winning commercial macro advertising photograph of an incredibly fresh organic split red pomegranate sitting on an absolute dark wet granite slab, vibrant ruby-red translucent seed arils catching stunning pinpoint specular key highlights, pure crisp crystalline water droplets clinging to the outer textured rind, dramatic professional single source side lighting, deep shadows, ultra-high resolution product shot",
      negativePrompt: "unreal plastic sheen, flat illumination, blurry backdrop, poorly rendered water beads",
      version: "1.0"
    },
    promptToCopy: "An award-winning commercial macro advertising photograph of an incredibly fresh organic split red pomegranate sitting on an absolute dark wet granite slab, vibrant ruby-red translucent seed arils catching stunning pinpoint specular key highlights, pure crisp crystalline water droplets clinging to the outer textured rind, dramatic professional single source side lighting, deep shadows, ultra-high resolution product shot",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/fruit_marketing.png", thumbnailUrl: "/images/marketplace/fruit_marketing.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u10", handle: "@marketing.guru", displayName: "Marketing Guru", avatarUrl: "", isVerified: false },
    engine: { modelId: "flux", provider: "FLUX", parameters: { guidance_scale: 3.5 } },
    taxonomy: { primaryCategory: "Product Ads", tags: ["fruit", "marketing", "ads"] },
    stats: { likes: 1200, views: 8000, saves: 210 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "produce_type", description: "Target organic produce specimen", default: "incredibly fresh organic split red pomegranate" }],
      exampleInput: { produce_type: "perfect crisp dew-covered green apple slice" },
      exampleOutput: "Generates high commercial impact visual framing. Outstanding internal translucent sub-surface light dispersion accuracy.",
      avgRating: 4.6,
      reviewCount: 31
    },
    createdAt: "2024-05-11T11:00:00Z"
  },
  {
    id: "p24",
    slug: "luxury-watch-ad",
    title: "Chronograph Anisotropic Specular Ad",
    description: "Masterful material parsing string engineered to generate complex gear-specular matrices and immaculate genuine dial text configurations.",
    content: {
      text: "A spectacular high-end commercial macro product photograph of an elite Swiss automatic mechanical luxury chronograph watch, exquisite detailed brushed rose-gold casing with flawless sapphire crystal anti-reflective glass, highly detailed internal intricate skeleton gear mechanism exposed, genuine distressed dark brown crocodile leather strap with fine accent stitching, hyper-detailed commercial key lighting mapping elegant metal gradient falloffs, dark professional backdrop --v 6.0 --style raw",
      negativePrompt: "distorted watch hands, illegible micro numbers, flat reflections, plastic texture, cheap staging",
      version: "1.0"
    },
    promptToCopy: "A spectacular high-end commercial macro product photograph of an elite Swiss automatic mechanical luxury chronograph watch, exquisite detailed brushed rose-gold casing with flawless sapphire crystal anti-reflective glass, highly detailed internal intricate skeleton gear mechanism exposed, genuine distressed dark brown crocodile leather strap with fine accent stitching, hyper-detailed commercial key lighting mapping elegant metal gradient falloffs, dark professional backdrop --v 6.0 --style raw",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/watch_ad.png", thumbnailUrl: "/images/marketplace/watch_ad.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u24", handle: "@ad.master", displayName: "Ad Master", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 250 } },
    taxonomy: { primaryCategory: "Product Ads", tags: ["watch", "luxury", "ads"] },
    stats: { likes: 1600, views: 7200, saves: 340 },
    pricing: { type: 'one_time', priceCents: 699 },
    _db: {
      variables: [{ name: "casing_finish", description: "Watch frame specific alloy", default: "brushed rose-gold casing" }],
      exampleInput: { casing_finish: "polished mirror-finish liquid platinum casing" },
      exampleOutput: "Superb hardware layout tracking. Achieves clean microscopic depth map structures suitable for layered print advertisements.",
      avgRating: 4.9,
      reviewCount: 55,
      purchaseCount: 140
    },
    createdAt: "2024-05-15T08:00:00Z"
  },
  {
    id: "p25",
    slug: "modern-sneaker-ad",
    title: "Futuristic Sneaker Floating Dynamic",
    description: "High impact graphic advertisement layout driving dynamic mid-air structural explosion components perfectly separated from active background layers.",
    content: {
      text: "An explosive dynamic editorial product visualization of a cutting-edge high performance athletic running sneaker floating cleanly in mid-air orbit, futuristic structural sole components with striking neon coral and cyan multi-layer breathable knit mesh texture, surrounding deconstructed abstract floating neon particle blocks, dynamic lighting vectors catching exquisite surface weave patterns, commercial high impact presentation layout --ar 16:9 --v 6.0",
      negativePrompt: "flat framing, blurry texture weave, missing shoelaces, bad symmetry, standard retail shelf view",
      version: "1.0"
    },
    promptToCopy: "An explosive dynamic editorial product visualization of a cutting-edge high performance athletic running sneaker floating cleanly in mid-air orbit, futuristic structural sole components with striking neon coral and cyan multi-layer breathable knit mesh texture, surrounding deconstructed abstract floating neon particle blocks, dynamic lighting vectors catching exquisite surface weave patterns, commercial high impact presentation layout --ar 16:9 --v 6.0",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/sneaker_ad.png", thumbnailUrl: "/images/marketplace/sneaker_ad.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u25", handle: "@kicks.creative", displayName: "Kicks Creative", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 200 } },
    taxonomy: { primaryCategory: "Product Ads", tags: ["sneaker", "fashion", "ads"] },
    stats: { likes: 2100, views: 11000, saves: 480 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "sneaker_palette", description: "Footwear dynamic token shades", default: "neon coral and cyan" }],
      exampleInput: { sneaker_palette: "matte slate grey and pure electric lime" },
      exampleOutput: "Impeccable texture micro-weave resolution. Clean transparency alpha zones for immediate dropping into graphic layouts.",
      avgRating: 4.8,
      reviewCount: 72
    },
    createdAt: "2024-05-15T09:00:00Z"
  },
  {
    id: "p26",
    slug: "gourmet-burger-ad",
    title: "Culinary Macro Hyper-Juicy Ad Still",
    description: "Highly complex food preparation specification string creating immaculate depth layer balancing between char textures and glossy fluid droplets.",
    content: {
      text: "A mouth-watering commercial close-up macro photograph of a towering premium gourmet artisan cheeseburger, incredibly thick flame-grilled juicy beef patty with precise sear marks, perfectly melted golden aged cheddar cheese dripping down the side, crisp green butter lettuce and deep red vine tomato slices, set inside a toasted brioche bun with sesame seeds catching crisp tracking top lights, dramatic dark mood lighting, shallow depth of field, hyper-detailed photography --ar 1:1 --v 6.0",
      negativePrompt: "dry patties, flat cheese layers, unrealistic saturated tones, sloppy stack alignment",
      version: "1.0"
    },
    promptToCopy: "A mouth-watering commercial close-up macro photograph of a towering premium gourmet artisan cheeseburger, incredibly thick flame-grilled juicy beef patty with precise sear marks, perfectly melted golden aged cheddar cheese dripping down the side, crisp green butter lettuce and deep red vine tomato slices, set inside a toasted brioche bun with sesame seeds catching crisp tracking top lights, dramatic dark mood lighting, shallow depth of field, hyper-detailed photography --ar 1:1 --v 6.0",
    assets: [{ type: 'image', primaryUrl: "https://i.ibb.co/RGmqb9WK/e15fa9d3-5c99-4aaf-b08f-a9fa750043cb.jpg", thumbnailUrl: "https://i.ibb.co/RGmqb9WK/e15fa9d3-5c99-4aaf-b08f-a9fa750043cb.jpg", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u26", handle: "@food.focus", displayName: "Food Focus", avatarUrl: "", isVerified: false },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 160 } },
    taxonomy: { primaryCategory: "Marketing", tags: ["food", "burger", "marketing"] },
    stats: { likes: 3200, views: 25000, saves: 890 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "cheese_type", description: "Melted accessory style", default: "perfectly melted golden aged cheddar cheese" }],
      exampleInput: { cheese_type: "creamy rich melting pepper-jack slice" },
      exampleOutput: "Outputs perfect focal points with stunning material depth. Ideal template base for dynamic commercial ad layouts.",
      avgRating: 4.7,
      reviewCount: 95
    },
    createdAt: "2024-05-15T10:00:00Z"
  },
  {
    id: "p32",
    slug: "perfume-minimal-ad",
    title: "Ultra-Minimalist Fragrance Studio Layout",
    description: "High-fashion abstract presentation setup built for FLUX generation engines leveraging pristine pure background planes and soft tracking shadows.",
    content: {
      text: "A highly sophisticated minimalist commercial product visual for an avant-garde fragrance house, an immaculate geometric polished glass perfume bottle standing tall on a stark pure matte off-white plaster platform, perfect clean minimalist framing, elegant single-source diffuse lighting casting long crisp diagonal shadows across the lower third, hyper-detailed transparent liquid refraction, award-winning commercial layout design",
      negativePrompt: "complex staging elements, noisy backgrounds, distortion, overexposed reflections",
      version: "1.0"
    },
    promptToCopy: "A highly sophisticated minimalist commercial product visual for an avant-garde fragrance house, an immaculate geometric polished glass perfume bottle standing tall on a stark pure matte off-white plaster platform, perfect clean minimalist framing, elegant single-source diffuse lighting casting long crisp diagonal shadows across the lower third, hyper-detailed transparent liquid refraction, award-winning commercial layout design",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/perfume_landing.png", thumbnailUrl: "/images/marketplace/perfume_landing.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u32", handle: "@essence.studio", displayName: "Essence Studio", avatarUrl: "", isVerified: true },
    engine: { modelId: "flux", provider: "FLUX", parameters: { guidance_scale: 3.5 } },
    taxonomy: { primaryCategory: "Product Ads", tags: ["perfume", "minimal", "ads"] },
    stats: { likes: 1900, views: 8500, saves: 280 },
    pricing: { type: 'one_time', priceCents: 499 },
    _db: {
      variables: [{ name: "bottle_geometry", description: "Vessel physical configuration", default: "immaculate geometric polished glass perfume bottle" }],
      exampleInput: { bottle_geometry: "slender tall frosted crystalline cylinder" },
      exampleOutput: "Flawless highlight balance across dense curved clear surfaces. Achieves absolute graphic simplicity.",
      avgRating: 4.8,
      reviewCount: 41,
      purchaseCount: 110
    },
    createdAt: "2024-05-17T10:00:00Z"
  },
  {
    id: "p33",
    slug: "organic-skincare-ad",
    title: "Dewy Pure Serum Product Visual",
    description: "High fidelity lighting mapping string generating exquisite skin moisture emulation alongside raw botanical product backgrounds.",
    content: {
      text: "A stunning pure organic cosmetic serum product shot, close-up framing capturing a minimalist clear crystal dropper bottle set directly on a pristine pool of pure clear shallow water, soft direct sunlight refracting beautiful optical caustic light patterns through the fluid, background fresh organic green aloe vera leaves with clean water condensation, commercial luxury day-spa aesthetic --ar 1:1 --v 6.0",
      negativePrompt: "harsh reflections, artificial studio look, warped container label text, low resolution",
      version: "1.0"
    },
    promptToCopy: "A stunning pure organic cosmetic serum product shot, close-up framing capturing a minimalist clear crystal dropper bottle set directly on a pristine pool of pure clear shallow water, soft direct sunlight refracting beautiful tracking optical caustic light patterns through the fluid, background fresh organic green aloe vera leaves with clean water condensation, commercial luxury day-spa aesthetic --ar 1:1 --v 6.0",
    assets: [{ type: 'image', primaryUrl: "/images/stock/cinematic-portrait.png", thumbnailUrl: "/images/stock/cinematic-portrait.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u33", handle: "@natural.glow", displayName: "Natural Glow", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 150 } },
    taxonomy: { primaryCategory: "Marketing", tags: ["skincare", "organic", "marketing"] },
    stats: { likes: 2500, views: 12000, saves: 460 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "botanical_base", description: "Background living ingredient", default: "fresh organic green aloe vera leaves" }],
      exampleInput: { botanical_base: "vibrant blooming jasmine white floral clusters" },
      exampleOutput: "Superb light transmission modeling. Outstanding photographic reproduction for premium digital web banners.",
      avgRating: 4.9,
      reviewCount: 64
    },
    createdAt: "2024-05-17T11:00:00Z"
  },

  // Coding & Technical
  {
    id: "p27",
    slug: "python-automation-script",
    title: "Production Automation Suite Generator",
    description: "System prompt designed to extract highly resilient, fully-typed Python Selenium automation scrapers equipped with automatic rate-limit backoffs.",
    content: {
      text: "You are an expert Python systems architect. Generate a complete, highly resilient web automation extraction script using Selenium WebDriver and Python 3.11+. The script must implement robust headless browser setup options, dynamic element visibility wait mechanisms using WebDriverWait, explicit custom retry mechanisms for handling transient connection dropouts, structured logging directly to stdout, and structured JSON data aggregation output formats. Fully type-hint all custom function boundaries and enforce clear module structures.",
      negativePrompt: "Do not use deprecated find_element_by_* syntax. Do not use plain hardcoded time.sleep calls. Do not leave raw unhandled exceptions.",
      version: "2.0"
    },
    promptToCopy: "You are an expert Python systems architect. Generate a complete, highly resilient web automation extraction script using Selenium WebDriver and Python 3.11+ targeting the domain '{{target_domain}}' to extract '{{target_data}}'. The script must implement robust headless browser setup options, dynamic element visibility wait mechanisms using WebDriverWait, explicit custom retry mechanisms for handling transient connection dropouts, structured logging directly to stdout, and structured JSON data aggregation output formats. Fully type-hint all custom function boundaries and enforce clear module structures.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/coding_interface.png", thumbnailUrl: "/images/marketplace/coding_interface.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u27", handle: "@code.wizard", displayName: "Code Wizard", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4", provider: "OpenAI", parameters: { temperature: 0.2, max_tokens: 2500 } },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["python", "automation", "scripts"] },
    stats: { likes: 1200, views: 5000, saves: 620 },
    pricing: { type: 'one_time', priceCents: 499 },
    _db: {
      longDescription: "Advanced strict instruction template preventing LLM hallucinations around legacy Selenium library updates. Enforces clean custom wrapper design patterns with deterministic retry intervals.",
      variables: [
        { name: "target_domain", description: "Target base domain mapping", default: "example-ecommerce.com" },
        { name: "target_data", description: "Data node payload structure", default: "product title, SKU, price, availability status" }
      ],
      exampleInput: { target_domain: "retail-store.local", target_data: "catalog pagination items" },
      exampleOutput: "```python\nimport logging\nfrom selenium import webdriver\nfrom selenium.webdriver.common.by import By\nfrom selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\n\nlogging.basicConfig(level=logging.INFO)\n\ndef extract_catalog(url: str) -> list[dict]:\n    options = webdriver.ChromeOptions()\n    options.add_argument('--headless')\n    # ... robust execution wrappers generated cleanly ...\n```",
      modelCompatibility: ["GPT-4o", "Claude 3.5 Sonnet", "DeepSeek Coder"],
      avgRating: 4.9,
      reviewCount: 48,
      purchaseCount: 230
    },
    createdAt: "2024-05-16T08:00:00Z"
  },
  {
    id: "p28",
    slug: "react-component-pro",
    title: "Enterprise React Component Framework System",
    description: "Highly specialized architectural prompting pattern extracting perfectly structured, accessible RSC layouts built with TypeScript and Tailwind CSS utilities.",
    content: {
      text: "Act as a Principal Frontend Systems Architect. Write an immaculate, production-ready enterprise React functional component mapping to Next.js App Router guidelines. The component must use strict TypeScript interfaces for all ingested props, implement accessible ARIA labeling standards where interactive controls are present, integrate smooth multi-state styling transitions using modern Tailwind CSS classes, encapsulate state cleanly using native hook structures, and export cleanly without relying on redundant CSS utility wrappers. Provide fully typed event handlers.",
      negativePrompt: "Do not write untyped any props. Do not use legacy class components. Do not omit clean inline layout comments.",
      version: "2.1"
    },
    promptToCopy: "Act as a Principal Frontend Systems Architect. Write an immaculate, production-ready enterprise React functional component named '{{component_name}}' representing a '{{component_purpose}}' mapping to Next.js App Router guidelines. The component must use strict TypeScript interfaces for all ingested props, implement accessible ARIA labeling standards where interactive controls are present, integrate smooth multi-state styling transitions using modern Tailwind CSS classes, encapsulate state cleanly using native hook structures, and export cleanly without relying on redundant CSS utility wrappers. Provide fully typed event handlers.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/coding_interface.png", thumbnailUrl: "/images/marketplace/coding_interface.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u28", handle: "@react.master", displayName: "React Master", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4", provider: "OpenAI", parameters: { temperature: 0.1 } },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["react", "frontend", "typescript"] },
    stats: { likes: 2100, views: 9000, saves: 940 },
    pricing: { type: 'one_time', priceCents: 799 },
    _db: {
      variables: [
        { name: "component_name", description: "Target module filename", default: "StatCardMetric" },
        { name: "component_purpose", description: "Structural interface context", default: "dashboard real-time floating analytic summary metric tracker" }
      ],
      exampleInput: { component_name: "NavigationHeader", component_purpose: "responsive sticky topbar with integrated layout profile drawers" },
      exampleOutput: "```tsx\nimport React from 'react';\n\ninterface StatCardMetricProps {\n  title: string;\n  value: number;\n  trendPercentage?: number;\n}\n\nexport const StatCardMetric: React.FC<StatCardMetricProps> = ({ title, value, trendPercentage }) => {\n  return (\n    <div className=\"p-4 rounded-xl border border-slate-800 bg-slate-900/50\">\n      {/* Clean output generated successfully */}\n    </div>\n  );\n};\n```",
      modelCompatibility: ["GPT-4o", "Claude 3.5 Sonnet"],
      avgRating: 5.0,
      reviewCount: 105,
      purchaseCount: 380
    },
    createdAt: "2024-05-16T09:00:00Z"
  },
  {
    id: "p29",
    slug: "sql-optimizer",
    title: "PostgreSQL Advanced Indexing & Query Formatter",
    description: "Database command optimization framework driving extreme performance indexing recommendations, CTE subquery restructuring, and clear EXPLAIN cost maps.",
    content: {
      text: "You are an elite Lead Database Architect specializing in high-performance PostgreSQL infrastructures. Analyze the provided complex SQL schema relationships and subquery patterns. Rewrite the primary lookup logic utilizing highly optimized Common Table Expressions (CTEs) to eliminate nested loop bottlenecks. Suggest explicit multi-column index configurations (B-Tree or GIN where text/array parsing is active) to enforce low sequential scan counts. Provide the complete optimized SQL script alongside inline formatting descriptions explaining memory allocation efficiency improvements.",
      negativePrompt: "Do not suggest generic single column indices without evaluating target composite query predicates. Do not write unformatted un-indented raw queries.",
      version: "1.0"
    },
    promptToCopy: "You are an elite Lead Database Architect specializing in high-performance PostgreSQL infrastructures. Analyze the provided complex SQL schema relationships and subquery patterns targeting table '{{table_name}}'. Rewrite the primary lookup logic utilizing highly optimized Common Table Expressions (CTEs) to eliminate nested loop bottlenecks. Suggest explicit multi-column index configurations (B-Tree or GIN where text/array parsing is active) to enforce low sequential scan counts. Provide the complete optimized SQL script alongside inline formatting descriptions explaining memory allocation efficiency improvements.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/coding_interface.png", thumbnailUrl: "/images/marketplace/coding_interface.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u29", handle: "@db.pro", displayName: "DB Pro", avatarUrl: "", isVerified: false },
    engine: { modelId: "gpt-4", provider: "OpenAI", parameters: { temperature: 0.1 } },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["sql", "database", "optimization"] },
    stats: { likes: 850, views: 3000, saves: 210 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "table_name", description: "Target database structural collection", default: "user_purchases_log" }],
      exampleInput: { table_name: "marketplace_analytics_events" },
      exampleOutput: "```sql\n-- Highly optimized CTE restructuring implementation\nWITH active_users AS (\n    SELECT user_id, last_login \n    FROM users \n    WHERE is_active = true\n)\nSELECT a.user_id, count(p.id) \nFROM active_users a \nLEFT JOIN purchases p ON a.user_id = p.buyer_id \nGROUP BY a.user_id;\n-- Suggested index: CREATE INDEX idx_users_active_login ON users(is_active, last_login DESC);\n```",
      avgRating: 4.8,
      reviewCount: 39
    },
    createdAt: "2024-05-16T10:00:00Z"
  },
  {
    id: "p34",
    slug: "node-api-boilerplate",
    title: "Secure Node.js Microservice Architecture Engine",
    description: "Production framework prompt extracting fully separated controller/service routing patterns integrating clean JWT verification layers and Zod schema validations.",
    content: {
      text: "Develop a pristine, highly secure REST API controller setup using Node.js, Express, and TypeScript. The output must adhere strictly to the Controller-Service architecture pattern. Ensure incoming request payloads are validated synchronously using strict Zod schema parsers before reaching business logic layers. Implement robust asynchronous error handling wrappers to catch uncaught promise rejections automatically, and integrate stateless HTTP-only cookie-based JWT authorization check verification tokens cleanly. Export fully modular routes.",
      negativePrompt: "Do not place database manipulation strings directly inside raw routes. Do not use generic unstructured status responses.",
      version: "1.0"
    },
    promptToCopy: "Develop a pristine, highly secure REST API controller setup using Node.js, Express, and TypeScript representing the entity '{{entity_name}}'. The output must adhere strictly to the Controller-Service architecture pattern. Ensure incoming request payloads are validated synchronously using strict Zod schema parsers before reaching business logic layers. Implement robust asynchronous error handling wrappers to catch uncaught promise rejections automatically, and integrate stateless HTTP-only cookie-based JWT authorization check verification tokens cleanly. Export fully modular routes.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/coding_interface.png", thumbnailUrl: "/images/marketplace/coding_interface.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u34", handle: "@backend.pro", displayName: "Backend Pro", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4", provider: "OpenAI", parameters: { temperature: 0.2 } },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["nodejs", "express", "api"] },
    stats: { likes: 1700, views: 7500, saves: 430 },
    pricing: { type: 'one_time', priceCents: 599 },
    _db: {
      variables: [{ name: "entity_name", description: "Target resource REST path logic", default: "prompts" }],
      exampleInput: { entity_name: "transactions" },
      exampleOutput: "```typescript\nimport { Router, Request, Response, NextFunction } from 'express';\nimport { z } from 'zod';\n// Implements fully robust Zod parsing and detached service invocations\nexport const promptRouter = Router();\n```",
      avgRating: 4.9,
      reviewCount: 68,
      purchaseCount: 210
    },
    createdAt: "2024-05-18T08:00:00Z"
  },
  {
    id: "p35",
    slug: "docker-config-wizard",
    title: "Multi-Stage Docker Container Build Planner",
    description: "DevOps multi-stage formatting string ensuring minimum target image layers, explicit security users, and highly optimized dependency cache retention.",
    content: {
      text: "Write a highly optimized, production-ready multi-stage Dockerfile configuration setup for a modern framework web application. The layout must utilize separate explicit base stages for dependency resolution, caching layers, and minimal production execution runtimes using Alpine Linux bases. Enforce absolute security separation by running runtime instances under unprivileged custom user definitions. Expose clean environment ARG inputs and clear structural WORKDIR setup properties.",
      negativePrompt: "Do not run node execution directly as root user. Do not install devDependencies inside active production artifact stages.",
      version: "1.0"
    },
    promptToCopy: "Write a highly optimized, production-ready multi-stage Dockerfile configuration setup for a modern framework web application utilizing environment runtime '{{runtime_environment}}'. The layout must utilize separate explicit base stages for dependency resolution, caching layers, and minimal production execution runtimes using Alpine Linux bases. Enforce absolute security separation by running runtime instances under unprivileged custom user definitions. Expose clean environment ARG inputs and clear structural WORKDIR setup properties.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/coding_interface.png", thumbnailUrl: "/images/marketplace/coding_interface.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u35", handle: "@devops.ninja", displayName: "DevOps Ninja", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4", provider: "OpenAI", parameters: { temperature: 0.1 } },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["docker", "devops", "config"] },
    stats: { likes: 1300, views: 6000, saves: 310 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "runtime_environment", description: "Target framework target engine", default: "Node.js 22 LTS" }],
      exampleInput: { runtime_environment: "Python 3.12 Poetry runtime" },
      exampleOutput: "```dockerfile\nFROM node:22-alpine AS base\nWORKDIR /app\n# ... Multi-stage cache optimization layout configured ...\nUSER node\nCMD [\"node\", \"server.js\"]\n```",
      avgRating: 4.8,
      reviewCount: 44
    },
    createdAt: "2024-05-18T09:00:00Z"
  },
  {
    id: "p36",
    slug: "luxury-car-ad",
    title: "Cinematic Wet Carbon Hypercar Still",
    description: "Stunning product visualization generating precise multi-point studio highlight tracing along aggressive carbon-fiber super-sport body panels.",
    content: {
      text: "A magnificent high-end automotive visualization of a hyper-engineered futuristic carbon fiber hypercar parked on wet illuminated tarmac at midnight, sleek aggressive angular body lines reflecting ambient localized neon street strip lights, dramatic low-angle perspective emphasizing large polished multi-spoke custom wheels, rain mist falling through single key top lighting setups, ultra sharp professional rendering fidelity --ar 16:9 --v 6.0",
      negativePrompt: "distorted wheels, asymmetrical headlights, cartoonish speed blur, ugly standard background elements",
      version: "1.0"
    },
    promptToCopy: "A magnificent high-end automotive visualization of a hyper-engineered futuristic carbon fiber hypercar parked on wet illuminated tarmac at midnight, sleek aggressive angular body lines reflecting ambient localized neon street strip lights, dramatic low-angle perspective emphasizing large polished multi-spoke custom wheels, rain mist falling through single key top lighting setups, ultra sharp professional rendering fidelity --ar 16:9 --v 6.0",
    assets: [{ type: 'image', primaryUrl: "/images/stock/neon-tokyo.png", thumbnailUrl: "/images/stock/neon-tokyo.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u36", handle: "@auto.visuals", displayName: "Auto Visuals", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 280 } },
    taxonomy: { primaryCategory: "Product Ads", tags: ["car", "luxury", "ads"] },
    stats: { likes: 5200, views: 30000, saves: 1400 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "car_color", description: "Body paint visual layer", default: "sleek aggressive matte carbon fiber finish" }],
      exampleInput: { car_color: "deep liquid metallic liquid emerald green" },
      exampleOutput: "Perfect specular reflection mapping across multi-faceted custom aerodynamic body components.",
      avgRating: 4.9,
      reviewCount: 130
    },
    createdAt: "2024-05-18T10:00:00Z"
  },
  {
    id: "p37",
    slug: "organic-drink-ad",
    title: "Refreshing Droplet Splash Commercial Still",
    description: "Highly focused material setup string creating realistic sub-surface liquid transmission arrays alongside floating ripe dynamic organic ingredients.",
    content: {
      text: "A highly refreshing dynamic macro advertising visual for a premium raw organic cold-pressed beverage brand, close-up tracking frame showing an intense burst of real golden orange liquid splash frozen in perfect mid-air orbit, whole fresh ripe slice ingredients suspended inside the fluid stream, pure pristine sunlit daylight setup mapping beautiful continuous caustics across absolute white background plains, extreme commercial visual clarity",
      negativePrompt: "blurry liquid layers, over-saturated artificial hues, low resolution rendering artifacts",
      version: "1.0"
    },
    promptToCopy: "A highly refreshing dynamic macro advertising visual for a premium raw organic cold-pressed beverage brand, close-up tracking frame showing an intense burst of real golden orange liquid splash frozen in perfect mid-air orbit, whole fresh ripe slice ingredients suspended inside the fluid stream, pure pristine sunlit daylight setup mapping beautiful continuous caustics across absolute white background plains, extreme commercial visual clarity",
    assets: [{ type: 'image', primaryUrl: "/images/stock/sakura-night.png", thumbnailUrl: "/images/stock/sakura-night.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u37", handle: "@fresh.media", displayName: "Fresh Media", avatarUrl: "", isVerified: false },
    engine: { modelId: "flux", provider: "FLUX", parameters: { guidance_scale: 3.2 } },
    taxonomy: { primaryCategory: "Product Ads", tags: ["juice", "organic", "ads"] },
    stats: { likes: 1300, views: 6500, saves: 190 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [{ name: "beverage_base", description: "Main target raw fluid flavor", default: "golden orange liquid splash" }],
      exampleInput: { beverage_base: "vibrant deep crimson organic berry burst" },
      exampleOutput: "Outstanding dynamic drop resolution. High transmission index mapping perfect fluid viscosity.",
      avgRating: 4.7,
      reviewCount: 33
    },
    createdAt: "2024-05-18T11:00:00Z"
  },
  {
    id: "p38",
    slug: "performance-thumbnail-audit-nextjs",
    title: "Next.js Image Performance & Thumbnail Audit",
    description: "A practical coding prompt that diagnoses scroll jank, oversized thumbnails, layout shifts, lazy loading, and image optimizer configuration.",
    content: {
      text: "Act as a senior frontend performance engineer. Audit a Next.js marketplace grid where cards use full-resolution images as CSS background thumbnails and scrolling feels laggy. Identify the rendering bottlenecks, propose a concrete image delivery strategy, and return patched React/TypeScript code. Focus on Next Image Optimization, small thumbnail URLs, lazy loading, paint containment, stable aspect ratios, and avoiding full-size media in repeated cards.",
      negativePrompt: "Do not give generic performance tips. Do not suggest removing images entirely. Do not ignore CSS background-image usage.",
      version: "1.0"
    },
    promptToCopy: "Act as a senior frontend performance engineer. Audit a {{framework}} marketplace grid where {{card_count}} cards use full-resolution images as CSS background thumbnails and scrolling feels laggy. Identify the rendering bottlenecks, propose a concrete image delivery strategy, and return patched {{language}} code. Focus on {{optimization_targets}}. Include before/after reasoning, implementation steps, and verification commands.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/coding_interface.png", thumbnailUrl: "/images/marketplace/coding_interface.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u38", handle: "@perf.builder", displayName: "Performance Builder", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4.1", provider: "OpenAI", parameters: { temperature: 0.15, max_tokens: 3500 } },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["nextjs", "performance", "images", "typescript"] },
    stats: { likes: 4800, views: 42000, saves: 2600 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      longDescription: "Built for real UI performance work: it forces the model to inspect image size, paint cost, repeated background images, lazy loading behavior, and Next.js optimizer routing before suggesting code.",
      variables: [
        { name: "framework", description: "Target app framework", default: "Next.js App Router" },
        { name: "card_count", description: "Approximate number of cards on scrollable pages", default: "36 to 120" },
        { name: "language", description: "Implementation language", default: "TypeScript" },
        { name: "optimization_targets", description: "Specific performance areas", default: "thumbnail resizing, lazy loading, stable aspect ratios, reduced repaint cost" }
      ],
      exampleInput: { framework: "Next.js 16 App Router", card_count: "60", language: "TypeScript", optimization_targets: "Next image optimizer URLs and CSS containment" },
      exampleOutput: "```ts\nexport function optimizedThumbnailUrl(url?: string, width = 384) {\n  if (!url) return '/main.png';\n  if (!url.startsWith('/') || url.startsWith('/_next/')) return url;\n  return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=68`;\n}\n```\n\nVerification checklist:\n1. Cards request 384px thumbnails instead of 1024px originals.\n2. Grid cards keep fixed aspect ratios to avoid layout shifts.\n3. Build passes and scroll timeline shows lower image decode cost.",
      modelCompatibility: ["GPT-4.1", "Claude Sonnet 4", "Gemini 2.5 Pro"],
      avgRating: 5.0,
      reviewCount: 118,
      purchaseCount: 540,
      is_featured: true,
      is_staff_pick: true
    },
    createdAt: "2026-05-08T09:00:00Z"
  },
  {
    id: "p39",
    slug: "cinematic-space-travel-landing-builder",
    title: "Cinematic Space-Travel Landing Page Builder",
    description: "Complete React build prompt for a video-led aerospace landing page with liquid glass, crossfading videos, and motion-safe animation.",
    content: {
      text: "Build a single-page cinematic space-travel landing page with two full-height sections: Hero and Capabilities. Use React, TypeScript, Tailwind CSS, Framer Motion, and a custom requestAnimationFrame video crossfade component. Implement a liquid-glass nav system, blur-in word animation, responsive stats cards, partner logos, and capability cards. Optimize background videos for preload strategy and avoid unnecessary overlays unless specified.",
      negativePrompt: "Do not use placeholder lorem ipsum. Do not use CSS transitions for video fades. Do not add gradient blobs, bokeh, or decorative orbs.",
      version: "2.0"
    },
    promptToCopy: "Build a single-page {{brand_category}} landing page called {{brand_name}} with {{sections}} full-height sections. Use {{stack}}. Include a custom rAF-driven FadingVideo component with manual loop reset, a shared liquid-glass design system, Framer Motion entrance animations, responsive navigation, stats cards, partner row, and feature cards. Use these media URLs: hero={{hero_video_url}}, second={{second_video_url}}. Return complete file-by-file implementation and note performance safeguards.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/perfume_landing.png", thumbnailUrl: "/images/marketplace/perfume_landing.png", dimensions: { width: 1440, height: 900 } }],
    creator: { id: "u39", handle: "@landing.systems", displayName: "Landing Systems", avatarUrl: "", isVerified: true },
    engine: { modelId: "claude-sonnet-4", provider: "Anthropic", parameters: { temperature: 0.25 } },
    taxonomy: { primaryCategory: "Websites & UI", tags: ["landing", "react", "video", "framer-motion"] },
    stats: { likes: 5300, views: 51000, saves: 3100 },
    pricing: { type: 'one_time', priceCents: 899 },
    _db: {
      longDescription: "A refined version of the cinematic space brief. It keeps the visual intent but converts it into an implementation-ready prompt with variables, explicit media inputs, animation constraints, and performance guidance.",
      variables: [
        { name: "brand_category", description: "Landing page domain", default: "space travel" },
        { name: "brand_name", description: "Product or company name", default: "Astral" },
        { name: "sections", description: "Number and names of sections", default: "Hero and Capabilities" },
        { name: "stack", description: "Frontend stack", default: "React + Vite + TypeScript + Tailwind + Framer Motion" },
        { name: "hero_video_url", description: "Hero background video URL", default: "https://cdn.example.com/space-hero.mp4" },
        { name: "second_video_url", description: "Capabilities background video URL", default: "https://cdn.example.com/capabilities.mp4" }
      ],
      exampleInput: { brand_name: "Aeon", brand_category: "commercial Mars voyage", sections: "Hero and Capabilities", stack: "React 18 + Vite + TypeScript + Tailwind" },
      exampleOutput: "```tsx\nfunction FadingVideo({ src, className }: { src: string; className?: string }) {\n  const videoRef = useRef<HTMLVideoElement>(null);\n  const rafRef = useRef<number | null>(null);\n  const fadingOutRef = useRef(false);\n  const fadeTo = useCallback((target: number, duration = 500) => {\n    const video = videoRef.current;\n    if (!video) return;\n    if (rafRef.current) cancelAnimationFrame(rafRef.current);\n    const start = performance.now();\n    const from = Number(video.style.opacity || 0);\n    const tick = (now: number) => {\n      const t = Math.min(1, (now - start) / duration);\n      video.style.opacity = String(from + (target - from) * t);\n      if (t < 1) rafRef.current = requestAnimationFrame(tick);\n    };\n    rafRef.current = requestAnimationFrame(tick);\n  }, []);\n  return <video ref={videoRef} src={src} muted playsInline preload=\"metadata\" className={className} />;\n}\n```",
      modelCompatibility: ["Claude Sonnet 4", "GPT-4.1", "Gemini 2.5 Pro"],
      avgRating: 4.9,
      reviewCount: 96,
      purchaseCount: 470,
      is_featured: true
    },
    createdAt: "2026-05-08T10:00:00Z"
  },
  {
    id: "p40",
    slug: "prisma-creative-studio-vite-page",
    title: "Prisma Creative Studio Vite Page",
    description: "A code-heavy prompt for a dark cinematic studio website with scroll-linked text reveal, animated word pull-up, and responsive feature cards.",
    content: {
      text: "Create a React, Vite, TypeScript, Tailwind CSS landing page for a creative studio. Include Hero, About, and Features sections; load Almarai and Instrument Serif; use Framer Motion for word pull-up, card reveal, and scroll-linked character opacity; use lucide-react icons; include video background, noise overlays, responsive cards, and exact component boundaries.",
      negativePrompt: "Do not use a marketing-only mockup. Do not skip file structure. Do not omit responsive behavior.",
      version: "1.0"
    },
    promptToCopy: "Create a React + Vite + TypeScript + Tailwind CSS landing page for a creative studio called {{studio_name}}. Sections: {{sections}}. Use {{font_body}} for body and {{font_display}} for accent serif text. Build reusable components for WordsPullUp, WordsPullUpMultiStyle, AnimatedLetter, VideoHero, FeatureCard, and NoiseOverlay. Use framer-motion and lucide-react. Return complete files: package.json, tailwind.config.js, index.html, src/main.tsx, src/App.tsx, src/index.css, and component files.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/tech_branding.png", thumbnailUrl: "/images/marketplace/tech_branding.png", dimensions: { width: 2000, height: 2000 } }],
    creator: { id: "u40", handle: "@vite.pages", displayName: "Vite Pages", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4.1", provider: "OpenAI", parameters: { temperature: 0.2, max_tokens: 5000 } },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["vite", "react", "tailwind", "framer-motion"] },
    stats: { likes: 4100, views: 38000, saves: 2400 },
    pricing: { type: 'one_time', priceCents: 799 },
    _db: {
      variables: [
        { name: "studio_name", description: "Creative studio name", default: "Prisma" },
        { name: "sections", description: "Page sections", default: "Hero, About, Features" },
        { name: "font_body", description: "Body font", default: "Almarai" },
        { name: "font_display", description: "Accent font", default: "Instrument Serif italic" }
      ],
      exampleInput: { studio_name: "Prisma", sections: "Hero, About, Features", font_body: "Almarai", font_display: "Instrument Serif" },
      exampleOutput: "```tsx\nconst WordsPullUp = ({ text }: { text: string }) => {\n  const ref = useRef(null);\n  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });\n  return (\n    <span ref={ref} className=\"inline-flex flex-wrap justify-center overflow-hidden\">\n      {text.split(' ').map((word, index) => (\n        <motion.span key={`${word}-${index}`} initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : undefined} transition={{ delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }} className=\"mr-[0.22em] inline-block\">\n          {word}\n        </motion.span>\n      ))}\n    </span>\n  );\n};\n```",
      modelCompatibility: ["GPT-4.1", "Claude Sonnet 4"],
      avgRating: 4.9,
      reviewCount: 76,
      purchaseCount: 350
    },
    createdAt: "2026-05-08T11:00:00Z"
  },
  {
    id: "p41",
    slug: "shadcn-liquid-video-hero",
    title: "shadcn Liquid-Glass Video Hero",
    description: "A production prompt for a single cinematic hero section using shadcn/ui, HSL theme variables, Google fonts, and liquid-glass chrome.",
    content: {
      text: "Create a fullscreen video hero section with glassmorphic navigation, cinematic typography, shadcn/ui button primitives, Tailwind CSS variables, and accessible responsive behavior. Use a full-bleed looping background video, no decorative blobs, no overlays unless requested, and simple fade-rise CSS animations.",
      negativePrompt: "Do not use random gradients. Do not use unconfigured shadcn imports. Do not omit CSS variables.",
      version: "1.0"
    },
    promptToCopy: "Create a single-page hero section for {{brand_name}} using React + Vite + Tailwind + TypeScript + shadcn/ui. Include a fullscreen looping video at {{video_url}}, glassmorphic nav, display font {{display_font}}, body font {{body_font}}, HSL CSS theme variables, a liquid-glass class, and fade-rise animations. Return complete code and explain where each file goes.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/fintech_dashboard.png", thumbnailUrl: "/images/marketplace/fintech_dashboard.png", dimensions: { width: 1920, height: 1080 } }],
    creator: { id: "u41", handle: "@shadcn.ui", displayName: "shadcn UI Lab", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4.1", provider: "OpenAI", parameters: { temperature: 0.18 } },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["shadcn", "hero", "tailwind", "typescript"] },
    stats: { likes: 3600, views: 29500, saves: 1800 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [
        { name: "brand_name", description: "Hero brand name", default: "Velorah" },
        { name: "video_url", description: "Background video URL", default: "https://cdn.example.com/hero.mp4" },
        { name: "display_font", description: "Heading font", default: "Instrument Serif" },
        { name: "body_font", description: "Body font", default: "Inter" }
      ],
      exampleInput: { brand_name: "Velorah", video_url: "https://cdn.example.com/quiet-hero.mp4", display_font: "Instrument Serif", body_font: "Inter" },
      exampleOutput: "```css\n.liquid-glass {\n  background: rgba(255,255,255,0.01);\n  backdrop-filter: blur(4px);\n  -webkit-backdrop-filter: blur(4px);\n  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);\n  position: relative;\n  overflow: hidden;\n}\n@keyframes fade-rise {\n  from { opacity: 0; transform: translateY(24px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n```",
      modelCompatibility: ["GPT-4.1", "Claude Sonnet 4", "Cursor Agent"],
      avgRating: 4.8,
      reviewCount: 64
    },
    createdAt: "2026-05-08T12:00:00Z"
  },
  {
    id: "p42",
    slug: "fullstack-feature-implementation-agent",
    title: "Full-Stack Feature Implementation Agent",
    description: "A repo-aware coding prompt for implementing frontend, backend, schema, API, auth, admin, and tests in one coherent pass.",
    content: {
      text: "Act as a senior full-stack product engineer working inside an existing repository. First inspect the codebase, local docs, database schema, existing UI patterns, and routing conventions. Then implement the requested feature across UI, API, database actions, validation, auth gates, loading/error states, and tests. Keep changes scoped and verify with build/lint/test commands.",
      negativePrompt: "Do not invent a new architecture before reading the codebase. Do not stop at a plan unless blocked. Do not overwrite unrelated user changes.",
      version: "1.1"
    },
    promptToCopy: "Act as a senior full-stack engineer in an existing {{framework}} repo. Implement {{feature_name}} across {{write_scope}}. Requirements: {{requirements}}. First inspect local docs and current patterns. Then edit files directly, wire frontend state to backend persistence, add validation and auth checks, handle loading/error/empty states, and run {{verification_command}}. Return changed files, behavior summary, and any residual risks.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/coding_interface.png", thumbnailUrl: "/images/marketplace/coding_interface.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u42", handle: "@fullstack.agent", displayName: "Fullstack Agent", avatarUrl: "", isVerified: true },
    engine: { modelId: "claude-sonnet-4", provider: "Anthropic", parameters: { temperature: 0.15, max_tokens: 6000 } },
    taxonomy: { primaryCategory: "Coding Prompts", tags: ["fullstack", "backend", "tests", "admin"] },
    stats: { likes: 6200, views: 61000, saves: 4200 },
    pricing: { type: 'one_time', priceCents: 1199 },
    _db: {
      variables: [
        { name: "framework", description: "Application stack", default: "Next.js App Router + Supabase" },
        { name: "feature_name", description: "Feature to implement", default: "persistent collections and browsing history" },
        { name: "write_scope", description: "Files or modules allowed to change", default: "app/components, app/actions, API routes, DB queries" },
        { name: "requirements", description: "Behavior requirements", default: "remove dummy data, add real persistence, keep UI consistent" },
        { name: "verification_command", description: "Command to run after changes", default: "npm run build" }
      ],
      exampleInput: { framework: "Next.js 16 + Supabase", feature_name: "admin moderation dashboard", write_scope: "app/admin and app/actions", verification_command: "npm run build" },
      exampleOutput: "Implementation plan:\n1. Read local framework docs and existing action patterns.\n2. Add server actions with role checks.\n3. Update admin UI with metrics, reports, and user controls.\n4. Verify with npm run build.\n\nExpected output includes file list, exact behavior, and test/build result.",
      modelCompatibility: ["Claude Sonnet 4", "GPT-4.1", "Codex"],
      avgRating: 5.0,
      reviewCount: 141,
      purchaseCount: 720,
      is_staff_pick: true
    },
    createdAt: "2026-05-09T09:00:00Z"
  },
  {
    id: "p43",
    slug: "faceless-reels-funny-fruit-video-pack",
    title: "Faceless Reels & Funny Fruit Video Pack",
    description: "Short-form video prompt system for faceless reels, fruit comedy, ASMR loops, captions, hooks, and shot lists.",
    content: {
      text: "Create a faceless short-form video concept package for TikTok, Reels, and Shorts. Generate a hook, 5-shot sequence, voiceover or no-voice caption track, ASMR sound design notes, image/video generation prompts, retention beat markers, title, hashtags, and editing notes. Optimize for funny fruit skits, satisfying macro cuts, product-safe visuals, and loopable endings.",
      negativePrompt: "Do not write unsafe stunts. Do not rely on a visible human face. Do not make the output vague.",
      version: "1.0"
    },
    promptToCopy: "Create a {{duration_seconds}} second faceless {{platform}} video package about {{topic}} in the style {{style}}. Include hook, 5-shot sequence, visual prompts, ASMR sound notes, caption overlays, loop ending, retention beats, title, hashtags, and editing instructions. Target audience: {{audience}}. Output as a production table.",
    assets: [{ type: 'video', primaryUrl: "/images/marketplace/banana_drama.png", thumbnailUrl: "/images/marketplace/banana_drama.png", dimensions: { width: 1080, height: 1920 } }],
    creator: { id: "u43", handle: "@reel.factory", displayName: "Reel Factory", avatarUrl: "", isVerified: true },
    engine: { modelId: "veo-3", provider: "Google Veo", parameters: { duration: 8, aspect_ratio: "9:16" } },
    taxonomy: { primaryCategory: "Social & Reels", tags: ["faceless", "fruit", "asmr", "shorts"] },
    stats: { likes: 5900, views: 87000, saves: 3300 },
    pricing: { type: 'one_time', priceCents: 599 },
    _db: {
      variables: [
        { name: "duration_seconds", description: "Video length", default: "12" },
        { name: "platform", description: "Publishing platform", default: "Instagram Reels" },
        { name: "topic", description: "Central video idea", default: "a banana dramatically training for a fruit race" },
        { name: "style", description: "Visual and comedic style", default: "macro tabletop comedy with satisfying ASMR cuts" },
        { name: "audience", description: "Viewer group", default: "people who like funny food loops and satisfying edits" }
      ],
      exampleInput: { duration_seconds: "9", platform: "TikTok", topic: "strawberries escaping a blender", style: "fast funny fruit skit with ASMR Foley" },
      exampleOutput: "| Time | Shot | Visual Prompt | Audio | Caption |\n|---|---|---|---|---|\n| 0-1s | Hook | Extreme macro strawberry lineup under dramatic kitchen light | tiny drum hit | They know. |\n| 1-3s | Escape | Strawberry rolls past the blender button in slow motion | rubber squeak | Operation Smoothie Breakout |\n| 7-9s | Loop | Blender lid closes, cut back to lineup | soft click | Watch the left one... |",
      modelCompatibility: ["Veo", "Runway", "Pika", "Kling", "Sora"],
      avgRating: 4.9,
      reviewCount: 102,
      purchaseCount: 610,
      is_featured: true
    },
    createdAt: "2026-05-09T10:00:00Z"
  },
  {
    id: "p44",
    slug: "brand-product-video-photoshoot-director",
    title: "Brand Product Video & Photoshoot Director",
    description: "Detailed prompt for commercial product showcases, fashion shoots, coffee shop ads, ecommerce hero media, and launch content.",
    content: {
      text: "Act as a commercial creative director planning a brand product shoot. Produce hero still prompts, 9:16 reel prompts, 16:9 website video prompts, lighting maps, prop lists, camera/lens notes, color palette, shot sequence, edit rhythm, negative prompts, and copy overlays. Adapt output for ecommerce, coffee shops, institutes, SaaS, fashion, beauty, tech, food, and local businesses.",
      negativePrompt: "Do not generate generic stock photography. Do not ignore brand positioning or channel format.",
      version: "1.0"
    },
    promptToCopy: "Act as a commercial creative director. Build a complete {{campaign_type}} shoot plan for {{brand_name}}, a {{business_type}}. Product/service: {{product}}. Mood: {{mood}}. Channels: {{channels}}. Return still image prompts, video prompts, shot list, lighting, props, camera notes, edit rhythm, captions, CTAs, and negative prompts.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/watch_ad.png", thumbnailUrl: "/images/marketplace/watch_ad.png", dimensions: { width: 1024, height: 1024 } }],
    creator: { id: "u44", handle: "@brand.director", displayName: "Brand Director", avatarUrl: "", isVerified: true },
    engine: { modelId: "mj-v6", provider: "Midjourney", parameters: { stylize: 220 } },
    taxonomy: { primaryCategory: "Product Ads", tags: ["photoshoot", "ecommerce", "brand", "video"] },
    stats: { likes: 4700, views: 39000, saves: 2300 },
    pricing: { type: 'one_time', priceCents: 899 },
    _db: {
      variables: [
        { name: "campaign_type", description: "Campaign format", default: "product launch" },
        { name: "brand_name", description: "Brand name", default: "Northline Coffee" },
        { name: "business_type", description: "Business category", default: "specialty coffee shop" },
        { name: "product", description: "Product or service", default: "cold brew subscription box" },
        { name: "mood", description: "Creative direction", default: "warm cinematic morning ritual" },
        { name: "channels", description: "Publishing channels", default: "website hero, ecommerce PDP, Instagram Reels" }
      ],
      exampleInput: { brand_name: "Northline Coffee", business_type: "coffee shop", product: "single-origin cold brew", mood: "warm premium morning ritual", channels: "ecommerce, reels, storefront posters" },
      exampleOutput: "Hero still prompt: A premium glass bottle of single-origin cold brew on a dark walnut counter, warm sunrise rim light, soft steam from fresh espresso nearby, condensation beads, linen napkin, cinematic 85mm product photography, shallow depth, editorial coffee campaign.\n\n9:16 reel prompt: Slow macro pour over ice, condensation crackle, hand enters only as silhouette, three cuts synced to soft cafe ambience, final frame loops to first pour.",
      modelCompatibility: ["Midjourney v6", "FLUX", "Veo", "Runway"],
      avgRating: 4.9,
      reviewCount: 88,
      purchaseCount: 420
    },
    createdAt: "2026-05-09T11:00:00Z"
  },
  {
    id: "p45",
    slug: "institute-ecommerce-website-generator",
    title: "Institute, Ecommerce & Local Business Website Generator",
    description: "A practical website prompt that generates pages, components, copy, schema, analytics events, and responsive Tailwind layouts.",
    content: {
      text: "Create a production-ready website plan and implementation for a local business, ecommerce store, institute, course platform, coffee shop, agency, clinic, restaurant, or service brand. Include information architecture, sections, component tree, Tailwind layout, forms, SEO metadata, structured data, analytics events, admin-editable content model, and accessibility requirements.",
      negativePrompt: "Do not create a generic landing page only. Do not skip mobile layout, forms, or SEO.",
      version: "1.0"
    },
    promptToCopy: "Create a production-ready {{site_type}} website for {{brand_name}}. Audience: {{audience}}. Primary goal: {{primary_goal}}. Required pages/sections: {{sections}}. Tech stack: {{stack}}. Include component tree, responsive Tailwind implementation, content model, form handling, SEO metadata, structured data, analytics events, and accessibility checklist.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/perfume_landing.png", thumbnailUrl: "/images/marketplace/perfume_landing.png", dimensions: { width: 1440, height: 900 } }],
    creator: { id: "u45", handle: "@site.architect", displayName: "Site Architect", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4.1", provider: "OpenAI", parameters: { temperature: 0.2, max_tokens: 4500 } },
    taxonomy: { primaryCategory: "Websites & UI", tags: ["ecommerce", "institute", "local-business", "seo"] },
    stats: { likes: 3900, views: 34000, saves: 2100 },
    pricing: { type: 'one_time', priceCents: 999 },
    _db: {
      variables: [
        { name: "site_type", description: "Website category", default: "institute admissions website" },
        { name: "brand_name", description: "Website brand", default: "Nova Institute" },
        { name: "audience", description: "Primary visitors", default: "students and parents" },
        { name: "primary_goal", description: "Conversion objective", default: "book a counseling call" },
        { name: "sections", description: "Pages or homepage sections", default: "hero, programs, outcomes, faculty, fees, FAQ, lead form" },
        { name: "stack", description: "Technology stack", default: "Next.js + TypeScript + Tailwind + Supabase" }
      ],
      exampleInput: { site_type: "coffee shop ecommerce website", brand_name: "Oak & Steam", audience: "local customers and gift buyers", primary_goal: "sell subscriptions and drive store visits" },
      exampleOutput: "Component tree:\n- SiteShell\n- HeaderNav\n- HeroOffer\n- ProductGrid\n- SubscriptionBuilder\n- StoreLocator\n- ReviewsBand\n- FAQAccordion\n- LeadCaptureForm\n\nSEO: LocalBusiness JSON-LD, Product JSON-LD for subscription packs, OpenGraph image plan, event tracking for add_to_cart, subscription_start, directions_click.",
      modelCompatibility: ["GPT-4.1", "Claude Sonnet 4", "Cursor Agent"],
      avgRating: 4.8,
      reviewCount: 67,
      purchaseCount: 310
    },
    createdAt: "2026-05-09T12:00:00Z"
  },
  {
    id: "p46",
    slug: "productivity-automation-prompt-system",
    title: "Productivity Automation Workflow Builder",
    description: "A detailed automation prompt for Notion, Sheets, Zapier, Make, Airtable, email, CRM, and internal dashboards.",
    content: {
      text: "Design a productivity automation workflow from a messy manual process. Convert goals into triggers, data model, validation rules, automation steps, fallback paths, owner responsibilities, notification logic, dashboard metrics, and implementation snippets for tools like Notion, Google Sheets, Airtable, Zapier, Make, Slack, email, CRM, or custom APIs.",
      negativePrompt: "Do not recommend automation before mapping the current process. Do not ignore failure states or permissions.",
      version: "1.0"
    },
    promptToCopy: "Design a productivity automation workflow for {{team_type}}. Current manual process: {{manual_process}}. Tools available: {{tools}}. Desired outcome: {{desired_outcome}}. Return process map, data schema, triggers, actions, validation, error handling, notifications, dashboard metrics, and implementation snippets.",
    assets: [{ type: 'image', primaryUrl: "/images/marketplace/fintech_dashboard.png", thumbnailUrl: "/images/marketplace/fintech_dashboard.png", dimensions: { width: 1920, height: 1080 } }],
    creator: { id: "u46", handle: "@ops.systems", displayName: "Ops Systems", avatarUrl: "", isVerified: true },
    engine: { modelId: "gpt-4.1", provider: "OpenAI", parameters: { temperature: 0.18 } },
    taxonomy: { primaryCategory: "Productivity", tags: ["automation", "workflow", "ops", "dashboard"] },
    stats: { likes: 2700, views: 24000, saves: 1600 },
    pricing: { type: 'free', priceCents: 0 },
    _db: {
      variables: [
        { name: "team_type", description: "Team or business context", default: "small ecommerce operations team" },
        { name: "manual_process", description: "Current workflow pain", default: "copying order issues from email into a spreadsheet" },
        { name: "tools", description: "Available software", default: "Gmail, Google Sheets, Slack, Zapier" },
        { name: "desired_outcome", description: "Automation goal", default: "triage order issues and notify the owner within 5 minutes" }
      ],
      exampleInput: { team_type: "creator agency", manual_process: "manually tracking brand deal deadlines", tools: "Notion, Gmail, Slack", desired_outcome: "auto-create tasks and reminders" },
      exampleOutput: "Automation design:\nTrigger: Gmail label 'Brand Deal'.\nParser: Extract brand, due date, deliverables, fee.\nAction: Create Notion task with status Intake.\nValidation: If due date missing, route to Needs Review.\nNotification: Slack DM owner 72h and 24h before deadline.\nMetric: On-time delivery rate, overdue tasks, average approval delay.",
      modelCompatibility: ["GPT-4.1", "Claude Sonnet 4", "Gemini 2.5 Pro"],
      avgRating: 4.8,
      reviewCount: 52
    },
    createdAt: "2026-05-09T13:00:00Z"
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
    mappedCategories: ["AI Art & Anime"],
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
    mappedCategories: ["Websites & UI"],
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
    mappedCategories: ["Coding Prompts"],
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
    mappedCategories: ["Product Ads", "Marketing"],
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
    mappedCategories: [],
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
    mappedCategories: ["Social & Reels"],
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
