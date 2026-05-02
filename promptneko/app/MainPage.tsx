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
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";

const mainNav = [
  { icon: Home, label: "Home", active: true },
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
  { title: "Cyberpunk Nightshade", model: "Midjourney", author: "@VoidWalker", likes: "2.3K", crop: "crop-featured-1" },
  { title: "Lost in the Stars", model: "ChatGPT Image", author: "@astro.archer", likes: "1.8K", crop: "crop-featured-2" },
  { title: "Ethereal Beauty", model: "Stable Diffusion", author: "@raws.art", likes: "3.1K", crop: "crop-featured-3" },
  { title: "90s Retro Lounge", model: "Midjourney", author: "@pixel.muse", likes: "1.2K", crop: "crop-featured-4" },
  { title: "Dragon's Peak", model: "FLUX", author: "@fantasyforge", likes: "2.7K", crop: "crop-featured-5" },
];

const trending = [
  { rank: 1, title: "Neon Samurai", model: "Midjourney", likes: "4.5K", crop: "crop-trend-1" },
  { rank: 2, title: "Anime School Life", model: "Niji Journey", likes: "3.2K", crop: "crop-trend-2" },
  { rank: 3, title: "Dark Fantasy King", model: "Stable Diffusion", likes: "2.8K", crop: "crop-trend-3" },
  { rank: 4, title: "Floating Islands", model: "FLUX", likes: "2.3K", crop: "crop-trend-4" },
  { rank: 5, title: "Mecha City", model: "Midjourney", likes: "1.9K", crop: "crop-trend-5" },
  { rank: 6, title: "Portrait Study", model: "ChatGPT Image", likes: "1.6K", crop: "crop-trend-6" },
  { rank: 7, title: "Cosmic Whale", model: "Veo", likes: "1.4K", crop: "crop-trend-7" },
  { rank: 8, title: "Steampunk Girl", model: "Stable Diffusion", likes: "1.2K", crop: "crop-trend-8" },
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

function NavGroup({ title, items }: { title?: string; items: typeof mainNav }) {
  return (
    <div className="nav-group">
      {title ? (
        <div className="nav-label">
          <span>{title}</span>
          <span />
        </div>
      ) : null}
      <nav>
        {items.map(({ icon: Icon, label, active }) => (
          <button className={active ? "nav-item active" : "nav-item"} key={label}>
            <Icon size={18} />
            <span>{label}</span>
            {active ? <ChevronRight className="nav-chevron" size={16} /> : null}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Crop({ className }: { className: string }) {
  return <div className={`shot-crop ${className}`} />;
}

function FeaturedCard({ item }: { item: (typeof featured)[number] }) {
  return (
    <article className="featured-card">
      <div className="featured-art">
        <Crop className={item.crop} />
        <button className="save-button" aria-label={`Save ${item.title}`}>
          <Bookmark size={18} />
        </button>
        <span className="model-pill">
          <BadgeCheck size={10} />
          {item.model}
        </span>
      </div>
      <div className="card-meta">
        <h3>{item.title}</h3>
        <div>
          <span className="author-dot" />
          <span>{item.author}</span>
          <span className="likes">
            <Heart size={14} />
            {item.likes}
          </span>
        </div>
      </div>
    </article>
  );
}

function TrendingCard({ item }: { item: (typeof trending)[number] }) {
  return (
    <article className="trend-card">
      <div className="trend-art">
        <Crop className={item.crop} />
        <span className="rank">{item.rank}</span>
      </div>
      <div className="trend-body">
        <h3>{item.title}</h3>
        <p>{item.model}</p>
        <span>
          <Heart size={13} />
          {item.likes}
        </span>
      </div>
    </article>
  );
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="section-title">
      <div>
        {icon}
        <h2>{title}</h2>
      </div>
      <button>View all</button>
    </div>
  );
}

export default function MainPage() {
  return (
    <div className="prompt-shell">
      <aside className="left-sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Shield size={22} />
          </div>
          <span>PromptHub</span>
        </div>

        <NavGroup items={mainNav} />
        <NavGroup title="Generate" items={generateNav} />
        <NavGroup title="Community" items={communityNav} />
        <NavGroup title="Your Space" items={spaceNav} />

        <div className="credits">
          <div className="credits-top">
            <span>Your Credits</span>
            <ChevronRight size={15} />
          </div>
          <strong>
            1,250 <Coins size={15} />
          </strong>
          <button>Top Up</button>
        </div>

        <div className="sidebar-tools">
          <Settings size={20} />
          <SlidersHorizontal size={20} />
          <Moon size={20} />
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div className="top-search">
            <Search size={18} />
            <span>Search prompts, models, users...</span>
            <kbd>⌘ /</kbd>
          </div>
          <button className="create-button">
            <Plus size={19} />
            Create Prompt
          </button>
          <button className="icon-button alert" aria-label="Notifications">
            <Bell size={20} />
            <span>3</span>
          </button>
          <button className="icon-button" aria-label="Messages">
            <MessageCircle size={20} />
          </button>
          <div className="profile">
            <Crop className="profile-avatar" />
            <div>
              <strong>Lunaria</strong>
              <span>Pro</span>
            </div>
            <ChevronDown size={18} />
          </div>
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
                <div className="hero-search">
                  <Search size={19} />
                  <span>Search prompts, models, styles...</span>
                  <button aria-label="Search">
                    <Search size={24} />
                  </button>
                </div>
                <div className="tags">
                  <span>Popular searches:</span>
                  {["Cyberpunk", "Anime Girl", "Fantasy", "Photorealistic", "Dark Art"].map((tag) => (
                    <button key={tag}>{tag}</button>
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
                <div className="stat" key={label}>
                  <div>
                    <Icon size={25} />
                  </div>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
              <ChevronRight className="stats-chevron" size={18} />
            </section>

            <section>
              <SectionTitle icon={<Flame size={20} />} title="Featured Prompts" />
              <div className="featured-grid">
                {featured.map((item) => (
                  <FeaturedCard item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section>
              <SectionTitle icon={<Zap size={20} />} title="Trending This Week" />
              <div className="trending-grid">
                {trending.map((item) => (
                  <TrendingCard item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="categories-section">
              <SectionTitle icon={<Grid2X2 size={18} />} title="Explore by Categories" />
              <div className="category-grid">
                {categories.map((item) => (
                  <article className="category-card" key={item.title}>
                    <Crop className={item.crop} />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.count}</p>
                    </div>
                  </article>
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
                <button>Upgrade Now</button>
              </div>
            </section>

            <section className="side-card">
              <SectionTitle icon={null} title="Top Creators" />
              <div className="creator-list">
                {creators.map((creator) => (
                  <div className="creator-row" key={creator.name}>
                    <span className="creator-rank">{creator.rank}</span>
                    <Crop className={creator.crop} />
                    <div>
                      <strong>{creator.name}</strong>
                      <span>{creator.followers} Followers</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="side-card hot-card">
              <SectionTitle icon={null} title="Hot Right Now" />
              <div className="hot-list">
                {hot.map((item) => (
                  <div className="hot-row" key={item.title}>
                    <Crop className={item.crop} />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.uses}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
