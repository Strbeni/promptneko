"use client";

import { useState } from "react";
import { PromptFormState } from "./types";
import { Trash2, Image as ImageIcon, Link, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

function isValidUrl(str: string) {
  try { new URL(str); return true; } catch { return false; }
}

function isImageUrl(url: string) {
  return /\.(jpg|jpeg|png|webp|gif|avif|svg)(\?.*)?$/i.test(url);
}

export function Step5Media({ data, updateData }: { data: PromptFormState; updateData: (data: PromptFormState) => void }) {
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState<string | null>(null);

  const addUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!isValidUrl(trimmed)) { setUrlError("Not a valid URL"); return; }
    if (data.media.includes(trimmed)) { setUrlError("Already added"); return; }
    if (data.media.length >= 10) { setUrlError("Maximum 10 images"); return; }
    setUrlError(null);
    setUrlInput("");
    updateData({ ...data, media: [...data.media, trimmed] });
  };

  const removeMedia = (index: number) => {
    const next = [...data.media];
    next.splice(index, 1);
    updateData({ ...data, media: next });
    if (previewing === data.media[index]) setPreviewing(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); addUrl(); }
  };

  return (
    <div className="h-full overflow-y-auto pr-1">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-white mb-1">Output Gallery</h2>
        <p className="text-sm text-[#7f88a4]">
          Paste URLs of AI-generated images to showcase your prompt's output.{" "}
          <span className="text-[#00d9a8]">First image = thumbnail.</span>
        </p>
      </div>

      {/* URL input row */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className={`flex-1 flex items-center gap-2 h-10 px-3 rounded-xl border bg-[#080f1e] text-[13px] transition-all ${
            urlError ? "border-red-500/60" : "border-[#202746] focus-within:border-[#a46aff] focus-within:shadow-[0_0_12px_rgba(164,106,255,0.12)]"
          }`}>
            <Link size={14} className="text-[#7f88a4] shrink-0" />
            <input
              className="flex-1 bg-transparent outline-none text-white placeholder-[#7f88a4]"
              placeholder="https://cdn.example.com/output.png"
              value={urlInput}
              onChange={(e) => { setUrlInput(e.target.value); setUrlError(null); }}
              onKeyDown={handleKeyDown}
            />
            {urlInput && isValidUrl(urlInput) && (
              <CheckCircle2 size={14} className="text-[#00d9a8] shrink-0" />
            )}
            {urlInput && !isValidUrl(urlInput) && urlInput.length > 8 && (
              <XCircle size={14} className="text-red-400 shrink-0" />
            )}
          </div>
          <button
            onClick={addUrl}
            disabled={data.media.length >= 10 || !urlInput.trim()}
            className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#a46aff] to-[#7b3cff] text-white text-[13px] font-semibold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(164,106,255,0.18)]"
          >
            Add
          </button>
        </div>
        {urlError && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
            <AlertCircle size={12} /> {urlError}
          </p>
        )}
        <p className="mt-1.5 text-[11px] text-[#565e78]">
          Supports: jpg, png, webp, gif · {data.media.length}/10 added
        </p>
      </div>

      {/* Empty state */}
      {data.media.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-52 border-2 border-dashed border-[#1e2640] rounded-2xl text-[#565e78]">
          <ImageIcon size={32} className="mb-3 text-[#30395e]" />
          <p className="text-sm font-medium text-[#7f88a4]">No images added yet</p>
          <p className="text-xs mt-1">Paste a URL above to add your first output</p>
        </div>
      ) : (
        <>
          {/* Preview large */}
          {previewing && (
            <div className="mb-4 relative aspect-video rounded-xl overflow-hidden bg-[#080f1e] border border-[#202746]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewing} alt="Preview" className="w-full h-full object-contain" />
              <button
                onClick={() => setPreviewing(null)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <XCircle size={16} />
              </button>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {data.media.map((url, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#080f1e] border border-[#202746] cursor-pointer"
                onClick={() => setPreviewing(url === previewing ? null : url)}
              >
                {isImageUrl(url) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={url}
                    alt={`Output ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-2 gap-1">
                    <ImageIcon size={20} className="text-[#7f88a4]" />
                    <p className="text-[10px] text-[#7f88a4] text-center break-all line-clamp-3">{url}</p>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); removeMedia(idx); }}
                    className="w-8 h-8 rounded-full bg-red-500/90 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Thumbnail badge */}
                {idx === 0 && (
                  <div className="absolute top-1.5 left-1.5 bg-[#a46aff] text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                    Thumbnail
                  </div>
                )}

                {/* Index badge */}
                <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
