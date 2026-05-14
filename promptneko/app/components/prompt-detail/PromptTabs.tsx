"use client";

import { useState } from "react";
import { DetailedPrompt } from "../marketplace-data";

export function PromptTabs({ prompt, className = "" }: { prompt: DetailedPrompt; className?: string }) {
  const [active, setActive] = useState("Prompt");

  const tabs = ["Prompt", "Variables", "Example Output", "Negative Prompt", "Raw Data"];

  const variables = Array.isArray(prompt._db?.variables) ? prompt._db.variables : [];
  const exampleInput = prompt._db?.exampleInput;
  const exampleOutput = prompt._db?.exampleOutput;
  const formattedExampleInput =
    exampleInput === null || exampleInput === undefined
      ? ""
      : typeof exampleInput === "object"
        ? JSON.stringify(exampleInput, null, 2)
        : String(exampleInput);

  return (
    <section className={`mt-5 flex flex-col rounded-2xl border border-[#202746] bg-[#0a1020] p-4 ${className}`}>
      <div className="mb-4 flex flex-wrap gap-6 border-b border-[#202746]">
        {tabs.map((tab) => (
          <button 
            className={`pb-3 text-[13px] font-medium transition-colors relative ${
              active === tab ? "text-white font-semibold" : "text-[#8f98b4] hover:text-white"
            }`} 
            key={tab} 
            onClick={() => setActive(tab)}
          >
            {tab}
            {active === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a463ff] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-[200px] flex flex-col">
        {active === "Prompt" && (
          <pre className="flex-1 overflow-auto whitespace-pre-wrap rounded-xl border border-[#202746] bg-[#11162a] p-4 text-[13px] leading-relaxed text-[#c5ccdd] font-mono">
            {prompt.promptToCopy || prompt.content.text}
          </pre>
        )}

        {active === "Variables" && (
          <div className="flex-1 overflow-auto rounded-xl border border-[#202746] bg-[#11162a] p-4">
            {variables.length > 0 ? (
              <div className="space-y-3">
                {variables.map((v: any, i: number) => {
                  const name = typeof v === "object" && v !== null ? (v.name || v.key) : String(v);
                  const desc = typeof v === "object" && v !== null ? v.description : "";
                  const defValue = typeof v === "object" && v !== null ? v.default : "";

                  return (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-[#0a1020] border border-[#202746]">
                      <div>
                        <span className="font-mono text-[12px] font-bold text-[#a463ff] bg-[#7b3cff]/10 px-2 py-0.5 rounded border border-[#7b3cff]/20">
                          {`{{${name}}}`}
                        </span>
                        {desc && <p className="mt-1 text-[11px] text-[#8f98b4]">{desc}</p>}
                      </div>
                      {defValue && (
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-[#657091] uppercase tracking-wider block font-bold">Default</span>
                          <span className="font-mono text-[11px] text-[#e2e8f0]">{String(defValue)}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-8 text-[#657091]">
                <p className="text-[12px]">No dynamic variables required for this prompt.</p>
              </div>
            )}
          </div>
        )}

        {active === "Example Output" && (
          <div className="flex-1 overflow-auto rounded-xl border border-[#202746] bg-[#11162a] p-4 space-y-4">
            {formattedExampleInput && (
              <div>
                <h4 className="text-[11px] font-bold text-[#a463ff] uppercase tracking-wider mb-1.5">Example Input Parameters</h4>
                <pre className="p-2.5 rounded-lg bg-[#0a1020] border border-[#202746] text-[12px] font-mono text-[#c5ccdd]">
                  {formattedExampleInput}
                </pre>
              </div>
            )}

            <div>
              <h4 className="text-[11px] font-bold text-[#00d9a8] uppercase tracking-wider mb-1.5">Generated Output</h4>
              {exampleOutput ? (
                <pre className="p-3 rounded-lg bg-[#0a1020] border border-[#202746] text-[13px] font-mono text-[#e2e8f0] whitespace-pre-wrap leading-relaxed">
                  {exampleOutput}
                </pre>
              ) : (
                <p className="text-[12px] text-[#657091] italic">No text output demonstration available.</p>
              )}
            </div>
          </div>
        )}

        {active === "Negative Prompt" && (
          <pre className="flex-1 overflow-auto whitespace-pre-wrap rounded-xl border border-[#202746] bg-[#11162a] p-4 text-[13px] leading-relaxed text-[#c5ccdd] font-mono">
            {prompt.content.negativePrompt || "No negative prompt parameters provided for this engine configuration."}
          </pre>
        )}

        {active === "Raw Data" && (
          <pre className="flex-1 overflow-auto whitespace-pre-wrap rounded-xl border border-[#202746] bg-[#11162a] p-4 text-[13px] leading-relaxed text-[#c5ccdd] font-mono">
            {JSON.stringify(prompt.engine.parameters || {}, null, 2)}
          </pre>
        )}
      </div>
    </section>
  );
}
