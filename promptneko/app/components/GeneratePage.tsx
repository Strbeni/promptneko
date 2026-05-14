"use client";

import {
  Sparkles,
  Sliders,
  Play,
  RotateCcw,
  Download,
  Share2,
  Cpu,
  Layers,
  Image as ImageIcon,
  Film,
  Music,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { MarketplaceLayout } from "./MarketplaceLayout";

export function GeneratePage({ type }: { type: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [drawerAction, setDrawerAction] = useState<string | null>(null);
  const [promptText, setPromptText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [outputResult, setOutputResult] = useState<string | null>(null);

  const config = {
    image: {
      title: "Image Studio Playground",
      icon: ImageIcon,
      accent: "#a46aff",
      placeholder: "A breathtaking highly detailed visual scene mapping smooth multi-layer studio backlighting...",
      models: ["FLUX.1 Dev", "Midjourney v6.0", "Stable Diffusion XL", "DALL-E 3 HD"],
      preview: "/images/marketplace/coding_interface.png"
    },
    video: {
      title: "Cinematic Video Sandbox",
      icon: Film,
      accent: "#ff4f9d",
      placeholder: "Dynamic high-speed camera pan panning across hyper-engineered atmospheric urban structures...",
      models: ["Runway Gen-3", "Luma Dream Machine", "Kling AI v1.5"],
      preview: "/images/stock/neon-tokyo.png"
    },
    music: {
      title: "Audio & Music Synthesis",
      icon: Music,
      accent: "#00d9a8",
      placeholder: "Energetic synthwave ambient sequence layering warm analog bassline arpeggios at 124 BPM...",
      models: ["Suno AI v3.5", "Udio Premium Synthesis", "Stable Audio"],
      preview: "/images/stock/sakura-night.png"
    }
  }[type] || {
    title: "AI Studio Sandbox",
    icon: Sparkles,
    accent: "#ff9f21",
    placeholder: "Enter dynamic generative variables...",
    models: ["Default Core Engine"],
    preview: "/main.png"
  };

  const IconComp = config.icon;

  function handleGenerate() {
    if (!promptText.trim()) return;
    setGenerating(true);
    setOutputResult(null);
    setTimeout(() => {
      setGenerating(false);
      setOutputResult(config.preview);
    }, 2500);
  }

  return (
    <MarketplaceLayout
      activeNav={type === "image" ? "Image Generation" : type === "video" ? "Video Generation" : "Music Generation"}
      query={query}
      onQueryChange={setQuery}
      onSearch={() => router.push(`/explore?q=${encodeURIComponent(query)}`)}
      onAction={(a) => setDrawerAction(a)}
    >
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-5 min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="m-0 text-[28px] font-extrabold text-white tracking-tight flex items-center gap-3">
              <IconComp style={{ color: config.accent }} size={28} />
              {config.title}
            </h1>
            <p className="m-0 mt-1.5 text-[13px] text-[#6070a0]">
              Test structured variables and rendering tokens live inside an isolated engine telemetry sandbox.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-medium">
              <Cpu size={12} className="text-[#00d9a8]" /> Live Sandbox
            </span>
          </div>
        </div>

        {/* Generator grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-[#0c1120] border border-white/5 flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8090b4] mb-2">Target Model Engine</label>
                <select className="w-full h-10 px-3 rounded-xl bg-[#060b14] border border-white/10 text-white text-[12px] outline-none focus:border-[#a46aff]">
                  {config.models.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8090b4] mb-2">Prompt Input String</label>
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder={config.placeholder}
                  className="w-full h-32 p-3 rounded-xl bg-[#060b14] border border-white/10 text-white text-[13px] outline-none focus:border-[#a46aff] resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8090b4] mb-2">Negative Weights (Optional)</label>
                <input
                  type="text"
                  placeholder="blur, distortion, low quality artifacts"
                  className="w-full h-10 px-3 rounded-xl bg-[#060b14] border border-white/10 text-white text-[12px] outline-none focus:border-[#a46aff]"
                />
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <button 
                  onClick={() => setPromptText("")} 
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-white/40 hover:text-white text-[11px] transition-colors cursor-pointer"
                >
                  <RotateCcw size={12} /> Clear
                </button>

                <button
                  onClick={handleGenerate}
                  disabled={generating || !promptText.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8751ff] to-[#6530e9] text-white text-[13px] font-bold hover:brightness-110 disabled:opacity-40 transition-all cursor-pointer shadow-md"
                >
                  {generating ? (
                    <>
                      <div className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} /> Generate
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c1120] border border-white/5">
              <h3 className="text-white text-[13px] font-bold m-0 mb-3 flex items-center gap-2">
                <Sliders size={14} className="text-[#a46aff]" /> Advanced Settings
              </h3>
              <div className="space-y-3 text-[11px] text-[#8090b4]">
                <div className="flex justify-between items-center">
                  <span>Guidance Scale (CFG)</span>
                  <span className="text-white font-mono">7.5</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-[#a46aff] w-[60%] h-full rounded-full" />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span>Seed Variable</span>
                  <span className="text-white font-mono">Randomized</span>
                </div>
              </div>
            </div>
          </div>

          {/* Output Preview Column */}
          <div className="lg:col-span-2 flex flex-col h-full min-h-[400px]">
            <div className="flex-1 rounded-2xl bg-[#060b14] border border-white/5 flex flex-col items-center justify-center p-6 relative overflow-hidden group">
              {generating ? (
                <div className="flex flex-col items-center gap-4 text-center z-10">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-[#a46aff]/20 animate-pulse" />
                    <div className="absolute inset-0 rounded-full border-4 border-[#a46aff] border-t-transparent animate-spin" />
                    <Sparkles className="text-[#a46aff]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white text-[15px] font-bold m-0 mb-1">Synthesizing Sandbox Output</h3>
                    <p className="text-[#8090b4] text-[12px] m-0">Compiling inference target mapping arrays...</p>
                  </div>
                </div>
              ) : outputResult ? (
                <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black/40 backdrop-blur-[2px]">
                  <div className="flex justify-end gap-2 z-10">
                    <button className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white transition-colors backdrop-blur-md border border-white/10">
                      <Download size={14} />
                    </button>
                    <button className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white transition-colors backdrop-blur-md border border-white/10">
                      <Share2 size={14} />
                    </button>
                  </div>

                  <div 
                    className="absolute inset-0 bg-contain bg-no-repeat bg-center m-4"
                    style={{ backgroundImage: `url(${outputResult})` }}
                  />

                  <div className="relative z-10 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-white/80 line-clamp-2">
                    <strong className="text-[#a46aff]">Prompt used:</strong> {promptText}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-center max-w-sm">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20">
                    <IconComp size={24} />
                  </div>
                  <p className="text-[#6070a0] text-[13px] m-0 leading-relaxed">
                    Enter prompt parameters on the left to live-render evaluation demonstrations directly inside the interface stage.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      
    </MarketplaceLayout>
  );
}
