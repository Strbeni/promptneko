"use client";

import { useState, useMemo } from "react";
import { 
  Bell, 
  Boxes, 
  ChevronRight, 
  Coins, 
  Code,
  MessageSquare, 
  Search, 
  Sparkles, 
  Star 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { filterCategories, DetailedPrompt, trendingTags } from "./marketplace-data";
import { RightRail } from "./RightRail";
import { PromptCard } from "./PromptCard";

type HomePageProps = {
  setDrawerAction: (action: string | null) => void;
  allPrompts?: DetailedPrompt[];
};

export function HomePage({ setDrawerAction, allPrompts = [] }: HomePageProps) {
  const router = useRouter();
  const [isRightRailCollapsed, setIsRightRailCollapsed] = useState(false);
  const [homeQuery, setHomeQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!homeQuery.trim()) return [];
    const needle = homeQuery.trim().toLowerCase();
    return allPrompts.filter(p => 
      `${p.title} ${p.engine.provider} ${p.taxonomy.primaryCategory} ${p.creator.handle}`.toLowerCase().includes(needle)
    ).slice(0, 5);
  }, [homeQuery, allPrompts]);

  const handleHomeSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (homeQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(homeQuery)}`);
    } else {
      router.push(`/explore`);
    }
  };

  const featuredPrompts = allPrompts.filter(p => p._db?.is_featured || p.stats.views > 100);
  const trendingPrompts = [...allPrompts].sort((a, b) => b.stats.views - a.stats.views);
  
  // Group by category helper
  const getPromptsByCat = (catName: string) => 
    allPrompts.filter(p => p.taxonomy.primaryCategory === catName);

  const websiteUiPrompts = getPromptsByCat("UI Mockup");
  const brandingPrompts = getPromptsByCat("Logo/Brand");
  const fruitVideoPrompts = getPromptsByCat("Product Ad");
  const marketingPrompts = getPromptsByCat("Ad Copy");
  const codingPrompts = getPromptsByCat("Code Development");
  const socialReelPrompts = getPromptsByCat("Social Media");
  const animeArtPrompts = getPromptsByCat("Anime/Manga");

  function openPrompt(prompt: DetailedPrompt) {
    router.push(`/prompt/${prompt.slug}`);
  }

  return (
    <div className={`flex flex-col lg:flex-row flex-1 min-h-0 lg:grid overflow-hidden transition-all duration-300 ${isRightRailCollapsed ? 'lg:[grid-template-columns:minmax(0,1fr)_60px]' : 'lg:[grid-template-columns:minmax(0,1fr)_300px]'}`}>
      <section className="flex-1 min-w-0 overflow-y-auto px-4 md:px-8 py-6 md:py-4 lg:border-r lg:border-[#121930]/72 space-y-4 md:space-y-2">
        {/* Hero */}
        <div className="relative h-[280px] md:h-[313px] overflow-visible border border-[#202746] rounded-2xl bg-[#101629] after:absolute after:inset-0 after:[background:linear-gradient(90deg,rgba(6,8,17,0.94),rgba(6,8,17,0.72)_39%,rgba(6,8,17,0.06)_74%)] after:content-[''] after:pointer-events-none">
          <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/hero.png')] rounded-2xl overflow-hidden" />
          <div className="relative z-20 w-full max-w-[520px] px-6 md:px-[39px] py-6 md:py-8">
            <p className="mb-1 md:mb-[10px] text-[#dce0ef] text-[10px] md:text-[11px] font-semibold uppercase">Premium Market</p>
            <h1 className="m-0 text-white text-2xl md:text-[39px] font-extrabold leading-tight md:leading-[1.06]">
              Find The Best <span className="text-[#7b3cff]">Prompts</span> For Any Task
            </h1>
            <p className="mt-2 md:mt-[11px] mb-4 md:mb-[17px] text-[#d2d7e8] text-xs md:text-[14px] leading-relaxed md:leading-[1.55]">
              Unlock your creative potential with our hand-picked collection of AI prompts.
            </p>
            
            <div className="relative w-full max-w-[450px]">
              <form 
                onSubmit={handleHomeSearch}
                className="flex items-center w-full h-10 md:h-11 gap-3 px-3 md:px-[14px] pr-[2px] border border-[#30395e] rounded-xl bg-[#0c1122]/84 focus-within:border-[#7b3cff] focus-within:shadow-[0_0_12px_rgba(123,60,255,0.12)] transition-all relative z-30"
              >
                <input 
                  className="flex-1 min-w-0 bg-transparent border-0 outline-none text-white font-inherit placeholder-[#8990aa]" 
                  placeholder="What do you want to create?" 
                  value={homeQuery}
                  onChange={(e) => {
                    setHomeQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                <button type="submit" className="grid place-items-center w-[42px] h-10 rounded-lg bg-gradient-to-b from-[#843fff] to-[#662de6] text-white cursor-pointer hover:brightness-110 transition-all">
                  <Search size={20} />
                </button>
              </form>
              
              {/* Autocomplete Suggestions */}
              {showSuggestions && homeQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#080d1a] border border-[#1e2640] rounded-xl shadow-2xl overflow-hidden z-40">
                  {suggestions.length > 0 ? (
                    <ul>
                      {suggestions.map((p) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => openPrompt(p)}
                            className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-[#141b31] last:border-0"
                          >
                            <Search size={14} className="text-[#8990aa] shrink-0" />
                            <div className="flex flex-col min-w-0">
                              <span className="text-white text-sm font-medium truncate">{p.title}</span>
                              <span className="text-[#8990aa] text-xs truncate">in {p.taxonomy.primaryCategory}</span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-[#8990aa] text-sm">No results found for "{homeQuery}"</div>
                  )}
                </div>
              )}
            </div>

            {/* Trending bar */}
            <div className="flex flex-wrap items-center w-full max-w-[450px] gap-2 mt-3 md:mt-[15px]">
              <span className="text-[#dce0ef] text-[10px] md:text-[12px]">Trending:</span>
              {trendingTags.map((tag) => (
                <button 
                  key={tag} 
                  onClick={() => router.push(`/explore?q=${encodeURIComponent(tag)}`)}
                  className="h-5 md:h-[22px] px-2 md:px-[11px] border border-[#242d4a] rounded-full bg-[#151b2d] text-[#d3d8e8] text-[9px] md:text-[10px] whitespace-nowrap hover:border-[#7b3cff] transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 min-h-[72px]  border border-[#202746] rounded-2xl bg-gradient-to-b from-[#0d1325] to-[#090f1d] py-3 md:py-0">
          {[
            { label: "Prompts", value: "158K+", icon: Sparkles, color: "text-[#a46aff] bg-[#7a23ff]/20" },
            { label: "Creators", value: "12.4K", icon: MessageSquare, color: "text-[#00d9a8] bg-[#00d2a4]/16" },
            { label: "Sales", value: "892K", icon: Coins, color: "text-[#ff9f21] bg-[#ff971f]/14" },
            { label: "Users", value: "2.1M", icon: Bell, color: "text-[#f0378e] bg-[#ec3684]/18" },
          ].map((stat, i) => (
            <button key={i} className={`relative grid grid-cols-[32px_auto] md:grid-cols-[40px_auto] gap-x-2 md:gap-x-[15px] pl-4 md:pl-[31px] bg-transparent border-0 text-left cursor-pointer group hover:bg-white/[0.02] transition-colors py-2 md:py-0`}>
              <span className={`grid place-items-center w-8 md:w-[39px] h-8 md:h-[39px] row-span-2 self-center rounded-full ${stat.color}`}>
                <stat.icon size={16} />
              </span>
              <strong className="self-end text-white text-base md:text-[20px] font-bold leading-none">{stat.value}</strong>
              <small className="self-start mt-1 md:mt-[5px] text-[#aeb6cb] text-[10px] md:text-[11px]">{stat.label}</small>
              {i < 3 && i !== 1 && <div className="hidden md:block absolute top-5 right-0 w-px h-[31px] bg-[#222b4b]" />}
            </button>
          ))}
          <ChevronRight className="absolute top-[27px] right-[13px] text-[#7f88a4] hidden md:block" size={16} />
        </div>

        {/* Featured */}
        {featuredPrompts.length > 0 && (
          <section >
            <header className="flex items-center justify-between h-10 mb-5">
              <div className="flex items-center gap-2">
                <Star className="text-[#ff9823] fill-[#ff9823]" size={18} />
                <h2 className="m-0 text-white text-[17px] font-bold">Featured Prompts</h2>
              </div>
              <button className="h-[29px] px-3 border border-[#2a1c58] rounded-full bg-[#0f1024] text-[#a463ff] text-[12px] cursor-pointer hover:bg-[#1a1c3d] transition-colors">
                View All
              </button>
            </header>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featuredPrompts.slice(0, 5).map((prompt) => (
                <PromptCard key={prompt.id} item={prompt} onOpen={openPrompt} />
              ))}
            </div>
          </section>
        )}

        {/* Trending */}
        <section >
          <header className="flex items-center justify-between h-10 mb-5">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#ff9823]" size={18} />
              <h2 className="m-0 text-white text-[17px] font-bold">Trending Now</h2>
            </div>
            <button className="h-[29px] px-3 border border-[#2a1c58] rounded-full bg-[#0f1024] text-[#a463ff] text-[11px] md:text-[12px] cursor-pointer hover:bg-[#1a1c3d] transition-colors">
              Market Trends
            </button>
          </header>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {trendingPrompts.slice(0, 8).map((prompt, i) => (
              <div key={prompt.id} onClick={() => openPrompt(prompt)} className="relative h-[120px] md:h-[154px] overflow-hidden border border-[#273056] rounded-2xl bg-[#080d19] group hover:border-[#6132bf] hover:scale-[1.05] transition-all duration-300 cursor-pointer">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-70 transition-opacity duration-500" 
                  style={{ backgroundImage: `url(${prompt.assets[0]?.thumbnailUrl || `/images/stock/${['sakura-night', 'neon-tokyo', 'ethereal-castle', 'cybernetic-girl', 'lost-galaxy', 'cinematic-portrait'][i % 6]}.png`})` }} 
                />
                <i className="absolute top-2 left-2 z-10 grid place-items-center w-[18px] md:w-[22px] h-[18px] md:h-[22px] rounded-full bg-gradient-to-b from-[#8c57ff] to-[#6433e9] text-white text-[10px] md:text-[12px] font-extrabold not-italic">
                  {i + 1}
                </i>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section >
          <header className="flex items-center justify-between h-10 mb-5">
            <div className="flex items-center gap-2">
              <Boxes className="text-[#ff9823]" size={18} />
              <h2 className="m-0 text-white text-[17px] font-bold">Popular Categories</h2>
            </div>
            <button className="h-[29px] px-3 border border-[#2a1c58] rounded-full bg-[#0f1024] text-[#a463ff] text-[12px] cursor-pointer hover:bg-[#1a1c3d] transition-colors">
              Browse More
            </button>
          </header>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filterCategories.slice(1, 7).map((cat, i) => (
              <button key={cat.label} className="relative h-[60px] md:h-[70px] overflow-hidden border border-[#273056] rounded-xl bg-[#080d19] text-left group hover:border-[#6132bf] hover:scale-[1.05] transition-all duration-300 cursor-pointer">
                <div 
                  className="absolute inset-0 opacity-20 bg-cover bg-center group-hover:opacity-40 transition-opacity duration-500" 
                  style={{ backgroundImage: `url(/images/stock/${['sakura-night', 'neon-tokyo', 'ethereal-castle', 'cybernetic-girl', 'lost-galaxy', 'cinematic-portrait'][i % 6]}.png)` }} 
                />
                <strong className="relative z-10 block mt-2 md:mt-3 ml-3 text-white text-[12px] md:text-[13px] font-bold">{cat.label}</strong>
                <small className="relative z-10 block mt-0 ml-3 text-[#c1c7d8] text-[9px] md:text-[10px]">{allPrompts.filter(p => p.taxonomy.primaryCategory === cat.label || cat.label === 'All').length} Prompts</small>
              </button>
            ))}
          </div>
        </section>

        {/* Websites & UI */}
        {websiteUiPrompts.length > 0 && (
        <section >
          <header className="flex items-center justify-between h-10 mb-5">
            <div className="flex items-center gap-2">
              <Star className="text-[#a46aff]" size={18} />
              <h2 className="m-0 text-white text-[17px] font-bold">Websites & UI</h2>
            </div>
          </header>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {websiteUiPrompts.slice(0, 5).map((prompt) => (
              <PromptCard key={prompt.id} item={prompt} onOpen={openPrompt} />
            ))}
          </div>
        </section>
        )}

        {/* Branding & Logos */}
        {brandingPrompts.length > 0 && (
        <section >
          <header className="flex items-center justify-between h-10 mb-5">
            <div className="flex items-center gap-2">
              <Star className="text-[#00d9a8]" size={18} />
              <h2 className="m-0 text-white text-[17px] font-bold">Branding & Logos</h2>
            </div>
          </header>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {brandingPrompts.slice(0, 5).map((prompt) => (
              <PromptCard key={prompt.id} item={prompt} onOpen={openPrompt} />
            ))}
          </div>
        </section>
        )}

        {/* AI Fruit & Marketing */}
        {(fruitVideoPrompts.length > 0 || marketingPrompts.length > 0) && (
        <section >
          <header className="flex items-center justify-between h-10 mb-5">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#ff9f21]" size={18} />
              <h2 className="m-0 text-white text-[17px] font-bold">AI Fruit & Marketing</h2>
            </div>
          </header>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...new Set([...fruitVideoPrompts, ...marketingPrompts])].slice(0, 5).map((prompt) => (
              <PromptCard key={prompt.id} item={prompt} onOpen={openPrompt} />
            ))}
          </div>
        </section>
        )}

        {/* Coding & Technical */}
        {codingPrompts.length > 0 && (
        <section >
          <header className="flex items-center justify-between h-10 mb-5">
            <div className="flex items-center gap-2">
              <Code className="text-[#00d9a8]" size={18} />
              <h2 className="m-0 text-white text-[17px] font-bold">Coding & Technical</h2>
            </div>
          </header>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {codingPrompts.slice(0, 5).map((prompt) => (
              <PromptCard key={prompt.id} item={prompt} onOpen={openPrompt} />
            ))}
          </div>
        </section>
        )}

        {/* Social & Reels */}
        {socialReelPrompts.length > 0 && (
        <section >
          <header className="flex items-center justify-between h-10 mb-5">
            <div className="flex items-center gap-2">
              <Star className="text-[#f0378e]" size={18} />
              <h2 className="m-0 text-white text-[17px] font-bold">Social Media & Reels</h2>
            </div>
          </header>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {socialReelPrompts.slice(0, 5).map((prompt) => (
              <PromptCard key={prompt.id} item={prompt} onOpen={openPrompt} />
            ))}
          </div>
        </section>
        )}

        {/* AI Art & Anime */}
        {animeArtPrompts.length > 0 && (
        <section>
          <header className="flex items-center justify-between h-10 mb-5">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#7b3cff]" size={18} />
              <h2 className="m-0 text-white text-[17px] font-bold">AI Art & Anime</h2>
            </div>
          </header>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {animeArtPrompts.slice(0, 5).map((prompt) => (
              <PromptCard key={prompt.id} item={prompt} onOpen={openPrompt} />
            ))}
          </div>
        </section>
        )}
      </section>

      <div className="hidden lg:block">
        <RightRail 
          isCollapsed={isRightRailCollapsed}
          onToggle={() => setIsRightRailCollapsed(!isRightRailCollapsed)}
          onAction={(action) => {
            setDrawerAction(action);
          }} 
        />
      </div>
    </div>
  );
}
