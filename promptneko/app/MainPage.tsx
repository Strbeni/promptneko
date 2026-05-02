"use client";

import {
  BadgeCheck,
  Bell,
  Bookmark,
  Box,
  Calendar,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Coins,
  Compass,
  Cpu,
  Flame,
  Grid2X2,
  Heart,
  History,
  Home,
  ImageIcon,
  List,
  MessageCircle,
  MessageSquare,
  Moon,
  Music,
  Plus,
  Search,
  Settings,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trophy,
  Video,
  Wand,
  X,
  Zap,
} from "lucide-react";
import { FormEvent, ReactNode, useMemo, useState } from "react";

const mainNav = [
  { icon: Home, label: "Home" },
  { icon: Compass, label: "Explore" },
  { icon: Grid2X2, label: "Categories" },
  { icon: Cpu, label: "Models" },
  { icon: Box, label: "Collections" },
  { icon: Star, label: "Top Prompts" },
];

const generateNav = [
  { icon: ImageIcon, label: "Image Generation" },
  { icon: Video, label: "Video Generation" },
  { icon: Music, label: "Music Generation" },
  { icon: Wand, label: "Tools" },
];

const communityNav = [
  { icon: List, label: "Feed" },
  { icon: MessageSquare, label: "Discussions" },
  { icon: Calendar, label: "Events" },
  { icon: Trophy, label: "Leaderboard" },
];

const spaceNav = [
  { icon: SlidersHorizontal, label: "My Prompts" },
  { icon: Bookmark, label: "Bookmarks" },
  { icon: Heart, label: "Liked" },
  { icon: History, label: "History" },
];

const featured = [
  { title: "Cyberpunk Nightshade", model: "Midjourney", author: "@VoidWalker", likes: 2300, crop: "crop-featured-1", category: "Cyberpunk" },
  { title: "Lost in the Stars", model: "ChatGPT Image", author: "@astro.archer", likes: 1800, crop: "crop-featured-2", category: "Sci-Fi" },
  { title: "Ethereal Beauty", model: "Stable Diffusion", author: "@raws.art", likes: 3100, crop: "crop-featured-3", category: "Portraits" },
  { title: "90s Retro Lounge", model: "Midjourney", author: "@pixel.muse", likes: 1200, crop: "crop-featured-4", category: "Retro" },
  { title: "Dragon's Peak", model: "FLUX", author: "@fantasyforge", likes: 2700, crop: "crop-featured-5", category: "Fantasy" },
];

const trending = [
  { rank: 1, title: "Neon Samurai", model: "Midjourney", likes: 4500, crop: "crop-trend-1", category: "Cyberpunk" },
  { rank: 2, title: "Anime School Life", model: "Niji Journey", likes: 3200, crop: "crop-trend-2", category: "Anime" },
  { rank: 3, title: "Dark Fantasy King", model: "Stable Diffusion", likes: 2800, crop: "crop-trend-3", category: "Fantasy" },
  { rank: 4, title: "Floating Islands", model: "FLUX", likes: 2300, crop: "crop-trend-4", category: "Landscape" },
  { rank: 5, title: "Mecha City", model: "Midjourney", likes: 1900, crop: "crop-trend-5", category: "Sci-Fi" },
  { rank: 6, title: "Portrait Study", model: "ChatGPT Image", likes: 1600, crop: "crop-trend-6", category: "Portraits" },
  { rank: 7, title: "Cosmic Whale", model: "Veo", likes: 1400, crop: "crop-trend-7", category: "Video" },
  { rank: 8, title: "Steampunk Girl", model: "Stable Diffusion", likes: 1200, crop: "crop-trend-8", category: "Portraits" },
];

const creators = [
  { rank: 1, name: "@VoidWalker", followers: "12.4K", crop: "avatar-1" },
  { rank: 2, name: "@raws.art", followers: "8.7K", crop: "avatar-2" },
  { rank: 3, name: "@astro.archer", followers: "6.1K", crop: "avatar-3" },
  { rank: 4, name: "@pixel.muse", followers: "5.8K", crop: "avatar-4" },
  { rank: 5, name: "@fantasyforge", followers: "4.3K", crop: "avatar-5" },
];

const hot = [
  { title: "Cyberpunk City", uses: "2.3K uses", crop: "hot-1" },
  { title: "Anime Character", uses: "1.8K uses", crop: "hot-2" },
  { title: "Fantasy Landscape", uses: "1.6K uses", crop: "hot-3" },
  { title: "Realistic Portrait", uses: "1.5K uses", crop: "hot-4" },
  { title: "Space Exploration", uses: "1.2K uses", crop: "hot-5" },
];

const categories = [
  { title: "Anime", count: "28.7K prompts", crop: "cat-1" },
  { title: "Cyberpunk", count: "18.4K prompts", crop: "cat-2" },
  { title: "Fantasy", count: "22.1K prompts", crop: "cat-3" },
  { title: "Portraits", count: "16.3K prompts", crop: "cat-4" },
  { title: "Sci-Fi", count: "20.8K prompts", crop: "cat-5" },
  { title: "Landscapes", count: "15.6K prompts", crop: "cat-6" },
];

type PromptItem = (typeof featured)[number] | (typeof trending)[number];

function formatLikes(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K` : `${value}`;
}

function Crop({ className }: { className: string }) {
  return <div className={`shot-crop ${className}`} />;
}

function NavGroup({
  title,
  items,
  activeNav,
  onSelect,
}: {
  title?: string;
  items: typeof mainNav;
  activeNav: string;
  onSelect: (label: string) => void;
}) {
  return (
    <div className="nav-group">
      {title ? (
        <div className="nav-label">
          <span>{title}</span>
          <span />
        </div>
      ) : null}
      <nav>
        {items.map(({ icon: Icon, label }) => (
          <button className={activeNav === label ? "nav-item active" : "nav-item"} key={label} onClick={() => onSelect(label)}>
            <Icon size={18} />
            <span>{label}</span>
            {activeNav === label ? <ChevronRight className="nav-chevron" size={16} /> : null}
          </button>
        ))}
      </nav>
    </div>
  );
}

function SectionTitle({ icon, title, onViewAll }: { icon: ReactNode; title: string; onViewAll: () => void }) {
  return (
    <div className="section-title">
      <div>
        {icon}
        <h2>{title}</h2>
      </div>
      <button onClick={onViewAll}>View all</button>
    </div>
  );
}

export default function MainPage() {
  const [activeNav, setActiveNav] = useState("Home");
  const [query, setQuery] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);
  const [selectedPanel, setSelectedPanel] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [credits, setCredits] = useState(1250);
  const [isDark, setIsDark] = useState(true);

  const allPrompts = useMemo(() => [...featured, ...trending], []);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredFeatured = featured.filter((item) => {
    const haystack = `${item.title} ${item.model} ${item.author} ${item.category}`.toLowerCase();
    return (!normalizedQuery || haystack.includes(normalizedQuery)) && (!selectedCategory || item.category === selectedCategory);
  });
  const filteredTrending = trending.filter((item) => {
    const haystack = `${item.title} ${item.model} ${item.category}`.toLowerCase();
    return (!normalizedQuery || haystack.includes(normalizedQuery)) && (!selectedCategory || item.category === selectedCategory);
  });

  function openPanel(title: string) {
    setSelectedPanel(title);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSelectedPanel(query.trim() ? `Search results for "${query.trim()}"` : "Search");
  }

  function toggleSet(setter: (value: Set<string>) => void, current: Set<string>, title: string) {
    const next = new Set(current);
    if (next.has(title)) {
      next.delete(title);
    } else {
      next.add(title);
    }
    setter(next);
  }

  function PromptActions({ item }: { item: PromptItem }) {
    const isSaved = saved.has(item.title);
    const isLiked = liked.has(item.title);

    return (
      <>
        <button
          className={isSaved ? "save-button active" : "save-button"}
          aria-label={isSaved ? `Unsave ${item.title}` : `Save ${item.title}`}
          onClick={(event) => {
            event.stopPropagation();
            toggleSet(setSaved, saved, item.title);
          }}
        >
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>
        <span className={isLiked ? "likes active" : "likes"}>
          <button
            aria-label={isLiked ? `Unlike ${item.title}` : `Like ${item.title}`}
            onClick={(event) => {
              event.stopPropagation();
              toggleSet(setLiked, liked, item.title);
            }}
          >
            <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
          </button>
          {formatLikes(item.likes + (isLiked ? 1 : 0))}
        </span>
      </>
    );
  }

  function FeaturedCard({ item }: { item: (typeof featured)[number] }) {
    return (
      <article className="featured-card interactive-card" onClick={() => setSelectedPrompt(item)}>
        <div className="featured-art">
          <Crop className={item.crop} />
          <PromptActions item={item} />
          <span className="model-pill">
            <BadgeCheck size={10} />
            {item.model}
          </span>
        </div>
        <div className="card-meta">
          <h3>{item.title}</h3>
          <div>
            <span className="author-dot" />
            <button onClick={(event) => { event.stopPropagation(); openPanel(`${item.author} profile`); }}>{item.author}</button>
          </div>
        </div>
      </article>
    );
  }

  function TrendingCard({ item }: { item: (typeof trending)[number] }) {
    return (
      <article className="trend-card interactive-card" onClick={() => setSelectedPrompt(item)}>
        <div className="trend-art">
          <Crop className={item.crop} />
          <span className="rank">{item.rank}</span>
        </div>
        <div className="trend-body">
          <h3>{item.title}</h3>
          <p>{item.model}</p>
          <PromptActions item={item} />
        </div>
      </article>
    );
  }

  const shellClassName = isDark ? "prompt-shell" : "prompt-shell light-mode";

  return (
    <div className={shellClassName}>
      <aside className="left-sidebar">
        <button className="brand brand-button" onClick={() => { setActiveNav("Home"); setSelectedCategory(null); setQuery(""); }}>
          <div className="brand-mark">
            <Shield size={22} />
          </div>
          <span>PromptHub</span>
        </button>

        <NavGroup items={mainNav} activeNav={activeNav} onSelect={(label) => { setActiveNav(label); openPanel(label); }} />
        <NavGroup title="Generate" items={generateNav} activeNav={activeNav} onSelect={(label) => { setActiveNav(label); setQuery(label.replace(" Generation", "")); openPanel(label); }} />
        <NavGroup title="Community" items={communityNav} activeNav={activeNav} onSelect={(label) => { setActiveNav(label); openPanel(label); }} />
        <NavGroup title="Your Space" items={spaceNav} activeNav={activeNav} onSelect={(label) => { setActiveNav(label); openPanel(label); }} />

        <div className="credits">
          <button className="credits-top" onClick={() => openPanel("Credit history")}>
            <span>Your Credits</span>
            <ChevronRight size={15} />
          </button>
          <strong>
            {credits.toLocaleString()} <Coins size={15} />
          </strong>
          <button onClick={() => { setCredits((value) => value + 250); openPanel("250 credits added"); }}>Top Up</button>
        </div>

        <div className="sidebar-tools">
          <button aria-label="Settings" onClick={() => openPanel("Settings")}><Settings size={20} /></button>
          <button aria-label="Filters" onClick={() => openPanel("Filters")}><SlidersHorizontal size={20} /></button>
          <button aria-label="Toggle theme" onClick={() => setIsDark((value) => !value)}><Moon size={20} /></button>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <form className="top-search" onSubmit={submitSearch}>
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search prompts, models, users..." />
            <kbd>⌘ /</kbd>
          </form>
          <button className="create-button" onClick={() => openPanel("Create Prompt")}>
            <Plus size={19} />
            Create Prompt
          </button>
          <button className="icon-button alert" aria-label="Notifications" onClick={() => openPanel("Notifications")}>
            <Bell size={20} />
            <span>3</span>
          </button>
          <button className="icon-button" aria-label="Messages" onClick={() => openPanel("Messages")}>
            <MessageCircle size={20} />
          </button>
          <button className="profile" onClick={() => openPanel("Profile menu")}>
            <Crop className="profile-avatar" />
            <div>
              <strong>Lunaria</strong>
              <span>Pro</span>
            </div>
            <ChevronDown size={18} />
          </button>
        </header>

        <div className="workspace">
          <div className="main-scroll">
            <section className="hero">
              <Crop className="hero-crop" />
              <div className="hero-shade" />
              <div className="hero-copy">
                <p>AI Creativity Unleashed</p>
                <h1>
                  Find the perfect prompt.
                  <br />
                  Create <span>without limits.</span>
                </h1>
                <p className="hero-sub">
                  Explore 270K+ high-quality AI prompts for Midjourney,
                  <br />
                  ChatGPT, Stable Diffusion, Veo, FLUX and more.
                </p>
                <form className="hero-search" onSubmit={submitSearch}>
                  <Search size={19} />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search prompts, models, styles..." />
                  <button aria-label="Search">
                    <Search size={24} />
                  </button>
                </form>
                <div className="tags">
                  <span>Popular searches:</span>
                  {["Cyberpunk", "Anime", "Fantasy", "Photorealistic", "Dark Art"].map((tag) => (
                    <button key={tag} className={query === tag ? "active" : ""} onClick={() => { setQuery(tag); setSelectedCategory(null); }}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="stats">
              {[
                { icon: Box, value: "270K+", label: "Premium Prompts" },
                { icon: CircleCheck, value: "45K+", label: "Happy Creators" },
                { icon: Sparkles, value: "1.2M+", label: "Generations" },
                { icon: Heart, value: "98%", label: "Satisfaction Rate" },
              ].map(({ icon: Icon, value, label }) => (
                <button className="stat" key={label} onClick={() => openPanel(label)}>
                  <div>
                    <Icon size={25} />
                  </div>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </button>
              ))}
              <ChevronRight className="stats-chevron" size={18} />
            </section>

            <section>
              <SectionTitle icon={<Flame size={20} />} title="Featured Prompts" onViewAll={() => { setActiveNav("Top Prompts"); setSelectedCategory(null); setQuery(""); }} />
              <div className="featured-grid">
                {(filteredFeatured.length ? filteredFeatured : featured).map((item) => (
                  <FeaturedCard item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section>
              <SectionTitle icon={<Zap size={20} />} title="Trending This Week" onViewAll={() => { setActiveNav("Explore"); setSelectedCategory(null); setQuery(""); }} />
              <div className="trending-grid">
                {(filteredTrending.length ? filteredTrending : trending).map((item) => (
                  <TrendingCard item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="categories-section">
              <SectionTitle icon={<Grid2X2 size={18} />} title="Explore by Categories" onViewAll={() => { setActiveNav("Categories"); setSelectedCategory(null); }} />
              <div className="category-grid">
                {categories.map((item) => (
                  <button
                    className={selectedCategory === item.title ? "category-card active" : "category-card"}
                    key={item.title}
                    onClick={() => {
                      setSelectedCategory((current) => (current === item.title ? null : item.title));
                      setActiveNav("Categories");
                    }}
                  >
                    <Crop className={item.crop} />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.count}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="right-sidebar">
            <section className="pro-card">
              <Crop className="pro-crop" />
              <div className="pro-content">
                <h2>Upgrade to Pro</h2>
                {["Unlimited generations", "Priority queue", "Exclusive models", "Commercial license"].map((item) => (
                  <p key={item}>
                    <CircleCheck size={16} />
                    {item}
                  </p>
                ))}
                <button onClick={() => openPanel("Upgrade to Pro")}>Upgrade Now</button>
              </div>
            </section>

            <section className="side-card">
              <SectionTitle icon={null} title="Top Creators" onViewAll={() => openPanel("Creator leaderboard")} />
              <div className="creator-list">
                {creators.map((creator) => (
                  <button className="creator-row" key={creator.name} onClick={() => openPanel(`${creator.name} profile`)}>
                    <span className="creator-rank">{creator.rank}</span>
                    <Crop className={creator.crop} />
                    <div>
                      <strong>{creator.name}</strong>
                      <span>{creator.followers} Followers</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="side-card hot-card">
              <SectionTitle icon={null} title="Hot Right Now" onViewAll={() => openPanel("Hot prompts")} />
              <div className="hot-list">
                {hot.map((item) => (
                  <button className="hot-row" key={item.title} onClick={() => setQuery(item.title.replace(" City", "").replace(" Character", ""))}>
                    <Crop className={item.crop} />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.uses}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>

      {(selectedPrompt || selectedPanel) ? (
        <div className="action-drawer" role="dialog" aria-modal="true">
          <button className="drawer-close" aria-label="Close" onClick={() => { setSelectedPrompt(null); setSelectedPanel(null); }}>
            <X size={18} />
          </button>
          {selectedPrompt ? (
            <>
              <div className="drawer-art">
                <Crop className={selectedPrompt.crop} />
              </div>
              <h2>{selectedPrompt.title}</h2>
              <p>{selectedPrompt.model} prompt by {"author" in selectedPrompt ? selectedPrompt.author : "PromptHub"}</p>
              <div className="drawer-actions">
                <button onClick={() => toggleSet(setSaved, saved, selectedPrompt.title)}>
                  {saved.has(selectedPrompt.title) ? "Saved" : "Save"}
                </button>
                <button onClick={() => toggleSet(setLiked, liked, selectedPrompt.title)}>
                  {liked.has(selectedPrompt.title) ? "Liked" : "Like"}
                </button>
                <button onClick={() => openPanel("Checkout")}>Buy Prompt</button>
              </div>
            </>
          ) : (
            <>
              <h2>{selectedPanel}</h2>
              <p>{selectedPanel === "Create Prompt" ? "The creator flow is ready for the next marketplace step." : `Opened ${selectedPanel}.`}</p>
              <div className="drawer-actions">
                {allPrompts.slice(0, 3).map((item) => (
                  <button key={item.title} onClick={() => setSelectedPrompt(item)}>{item.title}</button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
