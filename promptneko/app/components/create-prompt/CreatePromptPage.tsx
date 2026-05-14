"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";
import { PromptFormState } from "./types";
import { MarketplaceLayout } from "../MarketplaceLayout";
import { Step1Content } from "./Step1Content";
import { Step2Variables } from "./Step2Variables";
import { Step3Metadata } from "./Step3Metadata";
import { Step4Examples } from "./Step4Examples";
import { Step5Media } from "./Step5Media";
import { Step6Pricing } from "./Step6Pricing";
import { Step7Preview } from "./Step7Preview";

const INITIAL_STATE: PromptFormState = {
  content: "",
  variables: [],
  metadata: {
    title: "",
    shortDescription: "",
    longDescription: "",
    category: "",
    subcategory: "",
    modelCompatibility: [],
    primaryModel: "",
    tags: [],
    language: "English",
    nsfw: false,
  },
  examples: [],
  media: [],
  pricing: {
    type: "one-time",
    price: 9.99,
  },
};

const STEPS = [
  { label: "Content",   short: "Content" },
  { label: "Variables", short: "Vars" },
  { label: "Metadata",  short: "Meta" },
  { label: "Examples",  short: "Ex." },
  { label: "Media",     short: "Media" },
  { label: "Pricing",   short: "Price" },
  { label: "Preview",   short: "Review" },
];

export function CreatePromptPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PromptFormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const handleNext = () => { if (currentStep < STEPS.length - 1) setCurrentStep((p) => p + 1); };
  const handleBack = () => { if (currentStep > 0) setCurrentStep((p) => p - 1); };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/prompts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed");
      router.push(`/prompt/${json.slug}?submitted=1`);
    } catch (e: any) {
      setSubmitError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <MarketplaceLayout
      activeNav="Create"
      query={query}
      onQueryChange={setQuery}
      onSearch={() => router.push(query.trim() ? `/explore?q=${encodeURIComponent(query)}` : "/explore")}
      onAction={() => {}}
    >
      <main className="flex-1 overflow-hidden flex flex-col bg-[#030711] text-[#c5ccdd]">
        {/* Top progress bar + step header */}
        <div className="border-b border-[#141b31] bg-[#040c1a]/80 px-4 md:px-8 py-3">
          {/* Progress bar */}
          <div className="relative h-[3px] bg-[#141b31] rounded-full mb-3 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#a46aff] to-[#7b3cff] rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>

          {/* Step pills — scrollable on mobile */}
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {STEPS.map((step, idx) => {
              const done = idx < currentStep;
              const active = idx === currentStep;
              return (
                <button
                  key={step.label}
                  onClick={() => idx < currentStep && setCurrentStep(idx)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-medium whitespace-nowrap transition-colors ${
                    active  ? "text-white bg-[#a46aff]/15 border border-[#a46aff]/30" :
                    done    ? "text-[#a46aff] hover:bg-[#a46aff]/10 cursor-pointer" :
                              "text-[#565e78] cursor-default"
                  }`}
                  disabled={idx > currentStep}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                    done   ? "bg-[#a46aff]/20 text-[#a46aff]" :
                    active ? "bg-[#a46aff] text-white" :
                             "bg-[#1b2341] text-[#565e78]"
                  }`}>
                    {done ? <Check size={9} /> : idx + 1}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">{step.short}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-column layout: step content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[960px] mx-auto px-4 md:px-8 py-6">
            {/* Step title */}
            <div className="mb-5">
              <p className="text-[11px] text-[#565e78] uppercase tracking-widest font-semibold mb-0.5">
                Step {currentStep + 1} of {STEPS.length}
              </p>
              <h1 className="text-xl font-bold text-white">{STEPS[currentStep].label}</h1>
            </div>

            {/* Step card */}
            <div className="bg-[#07101f] border border-[#1a2240] rounded-2xl p-5 md:p-7">
              {currentStep === 0 && <Step1Content data={formData} updateData={setFormData} />}
              {currentStep === 1 && <Step2Variables data={formData} updateData={setFormData} />}
              {currentStep === 2 && <Step3Metadata data={formData} updateData={setFormData} />}
              {currentStep === 3 && <Step4Examples data={formData} updateData={setFormData} />}
              {currentStep === 4 && <Step5Media data={formData} updateData={setFormData} />}
              {currentStep === 5 && <Step6Pricing data={formData} updateData={setFormData} />}
              {currentStep === 6 && <Step7Preview data={formData} />}
            </div>

            {/* Navigation footer */}
            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium text-[#7f88a4] hover:text-white hover:bg-white/5 transition-colors disabled:opacity-25 disabled:pointer-events-none"
              >
                ← Back
              </button>

              <div className="flex flex-col items-end gap-1.5">
                {submitError && (
                  <p className="text-red-400 text-xs">{submitError}</p>
                )}
                {!isLastStep ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#a46aff] to-[#7b3cff] text-white text-[13px] font-bold hover:brightness-110 transition-all shadow-[0_0_16px_rgba(164,106,255,0.2)]"
                  >
                    Continue <ChevronRight size={15} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#00d9a8] to-[#00a882] text-white text-[13px] font-bold hover:brightness-110 transition-all shadow-[0_0_16px_rgba(0,217,168,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</>
                    ) : (
                      <>Submit for Review <ChevronRight size={15} /></>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </MarketplaceLayout>
  );
}
