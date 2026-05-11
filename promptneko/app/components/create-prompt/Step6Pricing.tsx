"use client";

import { PromptFormState } from "./types";
import { Check, Info } from "lucide-react";

export function Step6Pricing({ data, updateData }: { data: PromptFormState, updateData: (data: PromptFormState) => void }) {
  
  const handleTypeChange = (type: PromptFormState['pricing']['type']) => {
    updateData({ ...data, pricing: { ...data.pricing, type } });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) val = 0;
    updateData({ ...data, pricing: { ...data.pricing, price: val } });
  };

  const price = data.pricing.price || 0;
  const earnings = price * 0.8;
  const bulkEarnings = earnings * 100;

  return (
    <div className="h-full overflow-y-auto pr-2 max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Pricing Strategy</h2>
        <p className="text-[#7f88a4]">
          Choose how you want to monetize this prompt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          { id: 'free', title: 'Free', desc: 'Build your audience and reputation.' },
          { id: 'one-time', title: 'One-Time', desc: 'Standard marketplace sale.' },
          { id: 'subscription', title: 'Subscription', desc: 'Exclusive to your subscribers.' }
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => handleTypeChange(opt.id as any)}
            className={`relative p-6 rounded-2xl border text-left transition-all ${
              data.pricing.type === opt.id 
                ? "bg-[#18203b] border-[#a46aff] shadow-[0_0_20px_rgba(164,106,255,0.15)]" 
                : "bg-[#0c1122] border-[#202746] hover:border-[#4d5b94]"
            }`}
          >
            {data.pricing.type === opt.id && (
              <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#a46aff] text-white flex items-center justify-center">
                <Check size={12} strokeWidth={4} />
              </div>
            )}
            <h3 className={`text-lg font-bold mb-1 ${data.pricing.type === opt.id ? "text-white" : "text-[#c5ccdd]"}`}>{opt.title}</h3>
            <p className="text-xs text-[#7f88a4]">{opt.desc}</p>
          </button>
        ))}
      </div>

      {data.pricing.type === 'one-time' && (
        <div className="bg-[#11162a] border border-[#202746] rounded-2xl p-6 md:p-8">
          <div className="mb-6">
            <label className="block text-sm font-bold text-white mb-2">Price (USD)</label>
            <div className="relative max-w-xs">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7f88a4] font-bold">$</span>
              <input 
                type="number" 
                min="0.99" 
                max="99.99" 
                step="0.01"
                value={data.pricing.price}
                onChange={handlePriceChange}
                className="w-full h-12 pl-8 pr-4 bg-[#0c1122] border border-[#30395e] rounded-xl text-white text-lg font-bold focus:outline-none focus:border-[#a46aff] transition-colors"
              />
            </div>
            <p className="mt-2 text-xs text-[#7f88a4]">Suggested price for this category: $2.99 - $9.99</p>
          </div>

          <div className="bg-[#0c1122] rounded-xl p-5 border border-[#202746]">
            <div className="flex items-center gap-2 mb-4 text-[#a46aff] font-bold text-sm">
              <Info size={16} />
              Platform keeps 20%, you keep 80%.
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#7f88a4]">Your earnings per sale</span>
                <span className="text-white font-bold">${earnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-[#202746]">
                <span className="text-[#7f88a4]">If 100 people buy</span>
                <span className="text-[#00d9a8] font-bold text-lg">${bulkEarnings.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {data.pricing.type === 'subscription' && (
        <div className="bg-[#11162a] border border-[#202746] rounded-2xl p-6 md:p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[#a46aff]/20 text-[#a46aff] flex items-center justify-center mx-auto mb-4">
            <Check size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Subscription Exclusive</h3>
          <p className="text-[#7f88a4] max-w-md mx-auto">
            This prompt will be available to users who subscribe to your premium bundle. 
            Ensure you have active subscriptions set up in your creator dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
