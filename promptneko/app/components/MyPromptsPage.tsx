"use client";

import {
  Bookmark,
  ChevronRight,
  Copy,
  Check,
  Edit3,
  Eye,
  Heart,
  Layers3,
  PenSquare,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActionDrawer } from "./ActionDrawer";
import { MarketplaceLayout } from "./MarketplaceLayout";
import { promptCards, DetailedPrompt } from "./marketplace-data";

// ─── Static placeholder — replace with real user data when auth is ready ───────

const MY_PROMPTS: (DetailedPrompt & { status: "published" | "pending" | "draft" })[] = promptCards
  .slice(0, 8)
  .map((p, i) => ({
    ...p,
    status: (["published", "published", "pending", "published", "draft", "published", "pending", "published"] as const)[i],
  }));

const STATUS_CONFIG = {
  published: { label: "Published", icon: CheckCircle2, color: "#2ee87a", bg: "#12382a" },
  pending: { label: "Pending Review", icon: AlertCircle, color: "#f5a623", bg: "#2a2010" },
  draft: { label: "Draft", icon: Clock, color: "#8090b4", bg: "#12182a" },
};

// ─── Prompt Management Card ────────────────────────────────────────────────────

function ManageCard({ item }: { item: (typeof MY_PROMPTS)[0] }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const cfg = STATUS_CONFIG[item.status];
  const StatusIcon = cfg.icon;
  const asset = item.assets[0];

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-[16px] bg-[#0c1120] border border-white/5 transition-all hover:border-[#7b3cff]/40"
    >
      {/* Thumbnail */}
      <div
        className="relative aspect-[4/3] bg-cover bg-center cursor-pointer overflow-hidden"
        style={{ backgroundImage: `url(${asset?.thumbnailUrl || "/main.png"})` }}
        onClick={() => router.push(`/prompt/${item.slug}`)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Status */}
        <span
          className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border"
          style={{ color: cfg.color, background: cfg.bg, borderColor: `${cfg.color}30` }}
        >
          <StatusIcon size={9} /> {cfg.label}
        </span>

        {/* Hover actions overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
          <button
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-white text-[11px] font-semibold hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); router.push(`/prompt/${item.slug}`); }}
          >
            <Eye size={12} /> View
          </button>
          <button
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#7b3cff]/20 backdrop-blur-sm border border-[#7b3cff]/30 text-[#a463ff] text-[11px] font-semibold hover:bg-[#7b3cff]/30 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Edit3 size={12} /> Edit
          </button>
          <button
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-400 text-[11px] font-semibold hover:bg-red-500/20 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="m-0 text-[13px] font-semibold text-white truncate">{item.title}</h3>
          <div className="mt-0.5 flex items-center gap-3 text-[11px] text-[#5060a0]">
            <span className="flex items-center gap-1"><Eye size={10} /> {item.stats.views.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Heart size={10} className="text-[#ff4f9d]" /> {item.stats.likes.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Bookmark size={10} /> {item.stats.saves.toLocaleString()}</span>
          </div>
        </div>
        <button
          className="shrink-0 grid place-items-center w-7 h-7 rounded-lg bg-white/5 border border-white/5 text-white/50 text-[11px] hover:bg-white/10 hover:text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(item.promptToCopy || item.content.text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
        </button>
      </div>
    </article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function MyPromptsPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "published" | "pending" | "draft">("all");
  const [searchQ, setSearchQ] = useState("");

  const filtered = MY_PROMPTS.filter((p) => {
    const matchTab = activeTab === "all" || p.status === activeTab;
    const matchSearch = !searchQ || p.title.toLowerCase().includes(searchQ.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = {
    all: MY_PROMPTS.length,
    published: MY_PROMPTS.filter((p) => p.status === "published").length,
    pending: MY_PROMPTS.filter((p) => p.status === "pending").length,
    draft: MY_PROMPTS.filter((p) => p.status === "draft").length,
  };

  const totalViews = MY_PROMPTS.reduce((s, p) => s + p.stats.views, 0);
  const totalLikes = MY_PROMPTS.reduce((s, p) => s + p.stats.likes, 0);

  return (
    <MarketplaceLayout
      activeNav="My Prompts"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => router.push(`/explore?q=${encodeURIComponent(query)}`)}
      onAction={(a) => setDrawerAction(a)}
    >
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-5 min-h-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="m-0 text-[28px] font-extrabold text-white tracking-tight">My Prompts</h1>
            <p className="m-0 mt-1.5 text-[13px] text-[#6070a0]">Manage and track all your published and draft prompts.</p>
          </div>
          <button
            className="flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-[#7b3cff] to-[#6028d4] text-white text-[13px] font-semibold hover:brightness-110 transition-all shadow-[0_0_24px_rgba(123,60,255,0.3)]"
            onClick={() => router.push("/create")}
          >
            <Plus size={16} /> Create Prompt
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          {[
            { label: "Total Prompts", value: counts.all.toString(), icon: Layers3, accent: "#a463ff" },
            { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye, accent: "#78c7ff" },
            { label: "Total Likes", value: totalLikes.toLocaleString(), icon: Heart, accent: "#ff78c8" },
            { label: "Pending Review", value: counts.pending.toString(), icon: AlertCircle, accent: "#f5a623" },
          ].map(({ label, value, icon: Icon, accent }) => (
            <div key={label} className="flex items-center gap-4 px-5 py-4 rounded-[16px] border border-white/5 bg-[#0c1120]">
              <div className="grid place-items-center w-10 h-10 rounded-xl shrink-0" style={{ background: `${accent}15`, color: accent }}>
                <Icon size={18} />
              </div>
              <div>
                <strong className="block text-[20px] font-extrabold leading-none text-white">{value}</strong>
                <span className="mt-0.5 block text-[11px] text-[#6070a0]">{label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + Search */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#080d1a] border border-[#141c32]">
            {(["all", "published", "pending", "draft"] as const).map((tab) => {
              const cfg = tab === "all" ? null : STATUS_CONFIG[tab];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 h-[32px] px-4 rounded-lg text-[12px] font-semibold transition-all capitalize ${
                    activeTab === tab
                      ? "bg-[#7b3cff]/20 text-[#a463ff] border border-[#7b3cff]/30"
                      : "text-[#6070a0] hover:text-white"
                  }`}
                >
                  {cfg && <cfg.icon size={12} style={{ color: activeTab === tab ? cfg.color : undefined }} />}
                  {tab === "all" ? "All" : cfg!.label}
                  <span className={`ml-1 text-[10px] ${activeTab === tab ? "text-[#a463ff]" : "text-[#3a4a6a]"}`}>
                    {counts[tab]}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center h-[34px] px-3 gap-2 border border-[#1e2840] rounded-xl bg-[#0b1020]">
            <Search size={14} className="text-[#4a5a80]" />
            <input
              className="bg-transparent border-0 outline-none text-white text-[12px] placeholder:text-[#4a5a80] w-[180px]"
              placeholder="Search my prompts..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((p) => <ManageCard key={p.id} item={p} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <PenSquare size={48} className="text-[#1e2840] mb-5" />
            <h3 className="m-0 text-[16px] font-bold text-white mb-2">No prompts yet</h3>
            <p className="m-0 text-[13px] text-[#6070a0] mb-6 max-w-[300px]">
              Share your creativity with the world. Create your first prompt and start earning.
            </p>
            <button
              className="flex items-center gap-2 h-10 px-6 rounded-xl bg-gradient-to-r from-[#7b3cff] to-[#6028d4] text-white text-[13px] font-semibold hover:brightness-110 transition-all"
              onClick={() => router.push("/create")}
            >
              <Plus size={16} /> Create First Prompt
            </button>
          </div>
        )}
      </div>
      <ActionDrawer action={drawerAction} prompt={null} onClose={() => setDrawerAction(null)} />
    </MarketplaceLayout>
  );
}
