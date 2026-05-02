"use client";

import { 
  Bell, 
  Boxes, 
  ChevronRight, 
  Coins, 
  MessageSquare, 
  Search, 
  Sparkles, 
  Star 
} from "lucide-react";
import { filterCategories, promptCards } from "./marketplace-data";
import { RightRail } from "./RightRail";

type HomePageProps = {
  onAction: (action: string) => void;
  setSelectedPrompt: (prompt: any) => void;
  setDrawerAction: (action: string | null) => void;
};

export function HomePage({ onAction, setSelectedPrompt, setDrawerAction }: HomePageProps) {
  return (
    <div className="flex flex-1 min-h-0 [grid-template-columns:minmax(0,1fr)_300px] lg:grid overflow-hidden">
      <section className="flex-1 min-w-0 overflow-y-auto px-5 py-3 lg:border-r lg:border-[#121930]/72">
        {/* Hero */}
        <div className="relative h-[313px] overflow-hidden border border-[#202746] rounded-8 bg-[#101629] after:absolute after:inset-0 after:[background:linear-gradient(90deg,rgba(6,8,17,0.94),rgba(6,8,17,0.72)_39%,rgba(6,8,17,0.06)_74%)] after:content-['']">
          <div className="absolute inset-0 bg-no-repeat bg-[url('/main.png')] bg-[length:1536px_1024px] bg-[-228px_-58px]" />
          <div className="relative z-10 w-[520px] px-[39px] py-8">
            <p className="mb-[10px] text-[#dce0ef] text-[11px] font-semibold uppercase">Premium Market</p>
            <h1 className="m-0 text-white text-[39px] font-extrabold leading-[1.06]">
              Find The Best <span className="text-[#7b3cff]">Prompts</span> For Any Task
            </h1>
            <p className="mt-[11px] mb-[17px] text-[#d2d7e8] text-[14px] leading-[1.55]">
              Unlock your creative potential with our hand-picked collection of AI prompts.
            </p>
            
            <div className="flex items-center w-[450px] h-11 gap-3 px-[14px] pr-[2px] border border-[#30395e] rounded-8 bg-[#0c1122]/84">
              <input 
                className="flex-1 min-w-0 bg-transparent border-0 outline-none text-white font-inherit placeholder-[#8990aa]" 
                placeholder="What do you want to create?" 
              />
              <button className="grid place-items-center w-[42px] h-10 rounded-8 bg-gradient-to-b from-[#843fff] to-[#662de6] text-white cursor-pointer hover:brightness-110 transition-all">
                <Search size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-[15px]">
              <span className="text-[#dce0ef] text-[12px]">Trending:</span>
              {["Midjourney", "Stable Diffusion", "Logo", "Portrait"].map((tag) => (
                <button key={tag} className="h-[22px] px-[11px] border border-[#242d4a] rounded-full bg-[#151b2d] text-[#d3d8e8] text-[11px] hover:border-[#7b3cff] transition-colors cursor-pointer">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-4 h-[72px] mt-[15px] border border-[#202746] rounded-8 bg-gradient-to-b from-[#0d1325] to-[#090f1d]">
          {[
            { label: "Prompts", value: "158K+", icon: Sparkles, color: "text-[#a46aff] bg-[#7a23ff]/20" },
            { label: "Creators", value: "12.4K", icon: MessageSquare, color: "text-[#00d9a8] bg-[#00d2a4]/16" },
            { label: "Sales", value: "892K", icon: Coins, color: "text-[#ff9f21] bg-[#ff971f]/14" },
            { label: "Users", value: "2.1M", icon: Bell, color: "text-[#f0378e] bg-[#ec3684]/18" },
          ].map((stat, i) => (
            <button key={i} className="relative grid grid-cols-[40px_auto] gap-x-[15px] pl-[31px] bg-transparent border-0 text-left cursor-pointer group hover:bg-white/[0.02] transition-colors">
              <span className={`grid place-items-center w-[39px] h-[39px] row-span-2 self-center rounded-full ${stat.color}`}>
                <stat.icon size={20} />
              </span>
              <strong className="self-end text-white text-[20px] font-bold leading-none">{stat.value}</strong>
              <small className="self-start mt-[5px] text-[#aeb6cb] text-[11px]">{stat.label}</small>
              {i < 3 && <div className="absolute top-5 right-0 w-px h-[31px] bg-[#222b4b]" />}
            </button>
          ))}
          <ChevronRight className="absolute top-[27px] right-[13px] text-[#7f88a4]" size={16} />
        </div>

        {/* Featured */}
        <section className="mt-[18px]">
          <header className="flex items-center justify-between h-7 mb-[11px]">
            <div className="flex items-center gap-2">
              <Star className="text-[#ff9823] fill-[#ff9823]" size={18} />
              <h2 className="m-0 text-white text-[17px] font-bold">Featured Prompts</h2>
            </div>
            <button className="h-[29px] px-3 border border-[#2a1c58] rounded-7 bg-[#0f1024] text-[#a463ff] text-[12px] cursor-pointer hover:bg-[#1a1c3d] transition-colors">
              View All
            </button>
          </header>
          <div className="grid grid-cols-5 gap-3">
            {promptCards.slice(0, 5).map((prompt, i) => (
              <div 
                key={prompt.title} 
                className="relative h-[216px] overflow-hidden border border-[#273056] rounded-8 bg-[#080d19] cursor-pointer group hover:border-[#6132bf] transition-all"
                onClick={() => onAction(`Prompt: ${prompt.title}`)}
              >
                <div className={`absolute inset-0 bg-no-repeat bg-[url('/main.png')] bg-[length:1536px_1024px] bg-[-228px_-58px] brightness-[0.8] opacity-60 group-hover:opacity-100 group-hover:brightness-100 transition-all`} style={{ backgroundPosition: `-${(i%3)*400}px -${Math.floor(i/3)*300}px` }} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform bg-black/40 backdrop-blur-sm">
                  <strong className="block text-white text-[13px] truncate">{prompt.title}</strong>
                  <span className="text-[#c1c7d8] text-[10px]">{prompt.model}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending */}
        <section className="mt-[18px]">
          <header className="flex items-center justify-between h-7 mb-[11px]">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#ff9823]" size={18} />
              <h2 className="m-0 text-white text-[17px] font-bold">Trending Now</h2>
            </div>
            <button className="h-[29px] px-3 border border-[#2a1c58] rounded-7 bg-[#0f1024] text-[#a463ff] text-[12px] cursor-pointer hover:bg-[#1a1c3d] transition-colors">
              Market Trends
            </button>
          </header>
          <div className="grid grid-cols-8 gap-[10px]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="relative h-[154px] overflow-hidden border border-[#273056] rounded-8 bg-[#080d19] group hover:border-[#6132bf] transition-all cursor-pointer">
                <div className="absolute inset-0 bg-no-repeat bg-[url('/main.png')] bg-[length:1536px_1024px] opacity-40 group-hover:opacity-70 transition-opacity" style={{ backgroundPosition: `-${(i%4)*300}px -${Math.floor(i/4)*250 + 400}px` }} />
                <i className="absolute top-2 left-2 z-10 grid place-items-center w-[22px] h-[22px] rounded-full bg-gradient-to-b from-[#8c57ff] to-[#6433e9] text-white text-[12px] font-extrabold not-italic">
                  {i + 1}
                </i>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mt-[18px] mb-10">
          <header className="flex items-center justify-between h-7 mb-[11px]">
            <div className="flex items-center gap-2">
              <Boxes className="text-[#ff9823]" size={18} />
              <h2 className="m-0 text-white text-[17px] font-bold">Popular Categories</h2>
            </div>
            <button className="h-[29px] px-3 border border-[#2a1c58] rounded-7 bg-[#0f1024] text-[#a463ff] text-[12px] cursor-pointer hover:bg-[#1a1c3d] transition-colors">
              Browse More
            </button>
          </header>
          <div className="grid grid-cols-6 gap-[10px]">
            {filterCategories.slice(1, 7).map((cat, i) => (
              <button key={cat.label} className="relative h-[70px] overflow-hidden border border-[#273056] rounded-8 bg-[#080d19] text-left group hover:border-[#6132bf] transition-all cursor-pointer">
                <div className="absolute inset-0 opacity-20 bg-no-repeat bg-[url('/main.png')] bg-[length:1536px_1024px] group-hover:opacity-40 transition-opacity" style={{ backgroundPosition: `-${i*200}px -800px` }} />
                <strong className="relative z-10 block mt-3 ml-3 text-white text-[13px] font-bold">{cat.label}</strong>
                <small className="relative z-10 block mt-[2px] ml-3 text-[#c1c7d8] text-[10px]">{cat.count} Prompts</small>
              </button>
            ))}
          </div>
        </section>
      </section>

      <RightRail onAction={(action) => {
        setSelectedPrompt(null);
        setDrawerAction(action);
      }} />
    </div>
  );
}
