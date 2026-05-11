"use client";

import { useState } from "react";
import { DetailedPrompt } from "../marketplace-data";

export function PromptTabs({ prompt, className = "" }: { prompt: DetailedPrompt; className?: string }) {
  const [active, setActive] = useState("Prompt");

  return (
    <section className={`mt-5 flex flex-col rounded-2xl border border-[#202746] bg-[#0a1020] p-4 ${className}`}>
      <div className="mb-4 flex gap-8 border-b border-[#202746]">
        {["Prompt", "Negative Prompt", "Raw Data"].map((tab) => (
          <button className={`pb-3 text-[13px] font-medium transition-colors ${active === tab ? "border-b-2 border-[#a463ff] text-white" : "text-[#8f98b4] hover:text-white"}`} key={tab} onClick={() => setActive(tab)}>
            {tab}
          </button>
        ))}
      </div>
      <pre className="flex-1 min-h-[200px] overflow-auto whitespace-pre-wrap rounded-xl border border-[#202746] bg-[#11162a] p-4 text-[13px] leading-relaxed text-[#c5ccdd] font-mono">
        {active === "Prompt" ? (prompt.promptToCopy || prompt.content.text) : active === "Negative Prompt" ? (prompt.content.negativePrompt || "No negative prompt provided.") : JSON.stringify(prompt.engine.parameters || {}, null, 2)}
      </pre>
    </section>
  );
}
