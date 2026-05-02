"use client";

import { useState } from "react";

const promptText = `Ultra-cinematic sci-fi storm sequence,
a glowing green containment canister being violently ejected from
the open rear airlock of a sleek silver alien spacecraft during
atmospheric descent,
the craft flying through raging thunderclouds and torrential rain,
rear hatch partially open as the cylindrical canister tumbles
backward into the storm,
bright emerald liquid swirling inside the transparent container,
lightning flashes illuminating the canister and underside of the ship,
rain streaking across the frame,
blue engine thrusters blazing downward through dense clouds,
atmospheric turbulence and motion blur creating extreme speed and
danger,
no characters visible, only the canister and the ship,
dramatic perspective from behind and below the craft,
cinematic realism, Unreal Engine 5 quality, volumetric storm clouds,
reflective metallic surfaces, emotional sacrificial sci-fi moment,
60fps cinematic frame, immersive science fiction atmosphere.`;

export function PromptTabs() {
  const [active, setActive] = useState("Prompt");

  return (
    <section className="mt-5 rounded-2xl border border-[#202746] bg-[#0a1020] p-4">
      <div className="mb-4 flex gap-8 border-b border-[#202746]">
        {["Prompt", "Negative Prompt", "Raw Data"].map((tab) => (
          <button className={`pb-3 text-[13px] ${active === tab ? "border-b-2 border-[#d944d8] text-[#ff5fbb]" : "text-[#9aa3bd]"}`} key={tab} onClick={() => setActive(tab)}>
            {tab}
          </button>
        ))}
      </div>
      <pre className="max-h-[380px] overflow-hidden whitespace-pre-wrap rounded-xl border border-[#202746] bg-[#070c18] p-4 text-[13px] leading-relaxed text-[#d7ddea]">
        {active === "Prompt" ? promptText : active === "Negative Prompt" ? "low quality, blurry, distorted anatomy, extra objects, unreadable text, bad composition" : JSON.stringify({ model: "Seedream 5", size: "3072x3072", quality: 4.5 }, null, 2)}
      </pre>
      <button className="mx-auto mt-3 block text-[12px] text-[#d944d8]">Show less ^</button>
    </section>
  );
}
