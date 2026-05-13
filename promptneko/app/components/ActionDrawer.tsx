"use client";

import { Check, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DetailedPrompt } from "./marketplace-data";

type ActionDrawerProps = {
  action: string | null;
  prompt: DetailedPrompt | null;
  onClose: () => void;
};

export function ActionDrawer({ action, prompt, onClose }: ActionDrawerProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!action && !prompt) {
    return null;
  }

  const routeMap: Record<string, string> = {
    Home: "/",
    Explore: "/explore",
    Categories: "/categories",
    Collections: "/collections",
    Bookmarks: "/bookmarks",
    Liked: "/liked",
    "My Prompts": "/my-prompts",
    Create: "/create",
  };

  async function buyPrompt() {
    if (!prompt) return;
    setPending(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/prompts/${prompt.id}/purchase`, { method: "POST" });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(payload.error ?? "Purchase could not be started.");
        return;
      }
      setMessage(payload.message ?? "Purchase recorded.");
    } finally {
      setPending(false);
    }
  }

  function openActionRoute() {
    const route = action ? routeMap[action] : null;
    if (route) {
      router.push(route);
      onClose();
      return;
    }

    if (action?.startsWith("Search:")) {
      router.push(`/explore?q=${encodeURIComponent(action.replace("Search:", "").trim())}`);
      onClose();
    }
  }

  return (
    <aside className="fixed top-0 right-0 z-[100] w-[320px] h-screen p-5 border-l border-[#202746] bg-[#070b16] [box-shadow:-20px_0_40px_rgba(0,0,0,0.4)] animate-in slide-in-from-right duration-300" role="dialog" aria-modal="true">
      <button className="absolute top-4 right-4 grid place-items-center w-8 h-8 rounded-full bg-white/5 border-0 text-[#d8def2] cursor-pointer hover:bg-white/10 transition-colors" aria-label="Close" onClick={onClose}>
        <X size={18} />
      </button>
      {prompt ? (
        <>
          <div 
            className="w-full aspect-square rounded-2xl mb-5 bg-cover bg-center" 
            style={{ backgroundImage: `url(${prompt.assets[0].thumbnailUrl})` }} 
          />
          <h2 className="m-0 text-white text-[22px] font-bold">{prompt.title}</h2>
          <p className="mt-2 text-[#aeb5ca] text-[14px] leading-relaxed">
            {prompt.engine.provider} prompt by {prompt.creator.handle}. Ready for preview, checkout, and save workflows.
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <button className="w-full h-11 rounded-xl bg-white/10 border-0 text-white text-[14px] font-bold cursor-pointer hover:bg-white/15 transition-all" onClick={() => router.push(`/prompt/${prompt.slug}`)}>Preview Prompt</button>
            <button className="w-full h-11 rounded-xl bg-[#7b3cff] border-0 text-white text-[14px] font-bold cursor-pointer hover:bg-[#6a2ce6] transition-all disabled:cursor-not-allowed disabled:opacity-70" onClick={buyPrompt} disabled={pending}>
              {pending ? <Loader2 className="inline mr-2 animate-spin" size={16} /> : null}
              {prompt.pricing?.priceCents ? "Buy Prompt" : "Get Prompt"}
            </button>
            <button className="w-full h-11 rounded-xl bg-transparent border border-[#202746] text-[#d8def2] text-[14px] font-bold cursor-pointer hover:bg-white/5 transition-all" onClick={() => router.push(`/profile?creator=${encodeURIComponent(prompt.creator.id)}`)}>Open Creator</button>
          </div>
          {message ? (
            <p className="mt-4 rounded-xl border border-[#202746] bg-[#0a1020] p-3 text-[12px] leading-relaxed text-[#c5ccdd]">
              <Check className="mr-2 inline text-emerald-400" size={14} />
              {message}
            </p>
          ) : null}
        </>
      ) : (
        <>
          <h2 className="m-0 mt-8 text-white text-[22px] font-bold">{action}</h2>
          <p className="mt-2 text-[#aeb5ca] text-[14px] leading-relaxed">
            {routeMap[action ?? ""] ? `Open the ${action} section.` : `Search and marketplace controls now route through the live app shell.`}
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <button className="w-full h-11 rounded-xl bg-[#7b3cff] border-0 text-white text-[14px] font-bold cursor-pointer hover:bg-[#6a2ce6] transition-all" onClick={openActionRoute}>Open</button>
            <button className="w-full h-11 rounded-xl bg-transparent border border-[#202746] text-[#d8def2] text-[14px] font-bold cursor-pointer hover:bg-white/5 transition-all" onClick={() => router.push("/bookmarks")}>Saved Prompts</button>
          </div>
        </>
      )}
    </aside>
  );
}
