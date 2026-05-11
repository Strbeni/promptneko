"use client";

import { PromptFormState, Variable, VariableType } from "./types";
import { Plus, Trash2 } from "lucide-react";

export function Step2Variables({ data, updateData }: { data: PromptFormState, updateData: (data: PromptFormState) => void }) {
  const handleUpdate = (index: number, updates: Partial<Variable>) => {
    const newVars = [...data.variables];
    newVars[index] = { ...newVars[index], ...updates };
    updateData({ ...data, variables: newVars });
  };

  const addOption = (index: number) => {
    const newVars = [...data.variables];
    newVars[index].options.push("");
    updateData({ ...data, variables: newVars });
  };

  const updateOption = (varIndex: number, optIndex: number, val: string) => {
    const newVars = [...data.variables];
    newVars[varIndex].options[optIndex] = val;
    updateData({ ...data, variables: newVars });
  };

  const removeOption = (varIndex: number, optIndex: number) => {
    const newVars = [...data.variables];
    newVars[varIndex].options.splice(optIndex, 1);
    updateData({ ...data, variables: newVars });
  };

  return (
    <div className="h-full overflow-y-auto pr-2">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Variables Configuration</h2>
        <p className="text-sm text-[#7f88a4]">
          We detected {data.variables.length} variable{data.variables.length !== 1 && 's'} in your prompt. Configure how they should appear to buyers.
        </p>
      </div>

      {data.variables.length === 0 ? (
        <div className="flex items-center justify-center h-[300px] border-2 border-dashed border-[#202746] rounded-2xl text-[#565e78]">
          No variables detected. Go back and add [variable_name] to your prompt.
        </div>
      ) : (
        <div className="space-y-6">
          {data.variables.map((v, i) => (
            <div key={v.name} className="bg-[#11162a] border border-[#202746] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5 border-b border-[#202746] pb-4">
                <span className="bg-amber-500/20 text-amber-300 font-mono px-2 py-1 rounded text-sm font-bold border border-amber-500/30">
                  [{v.name}]
                </span>
                <span className="text-[#7f88a4] text-sm">Configure this variable</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Display Name</label>
                  <input 
                    type="text" 
                    value={v.displayName} 
                    onChange={e => handleUpdate(i, { displayName: e.target.value })}
                    className="w-full h-10 px-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Type</label>
                  <select 
                    value={v.type} 
                    onChange={e => handleUpdate(i, { type: e.target.value as VariableType })}
                    className="w-full h-10 px-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors appearance-none"
                  >
                    <option value="text">Short Text</option>
                    <option value="textarea">Long Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Toggle (Yes/No)</option>
                    <option value="select">Single Select</option>
                    <option value="multi_select">Multi Select</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Description / Instructions</label>
                  <input 
                    type="text" 
                    value={v.description} 
                    onChange={e => handleUpdate(i, { description: e.target.value })}
                    placeholder="e.g., Enter the main subject of the image..."
                    className="w-full h-10 px-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Default Value</label>
                  <input 
                    type="text" 
                    value={v.defaultValue} 
                    onChange={e => handleUpdate(i, { defaultValue: e.target.value })}
                    className="w-full h-10 px-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors"
                  />
                </div>

                <div className="flex items-center h-full pt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={v.required}
                      onChange={e => handleUpdate(i, { required: e.target.checked })}
                      className="w-5 h-5 rounded border-[#30395e] bg-[#0c1122] checked:bg-[#a46aff] focus:ring-[#a46aff] focus:ring-offset-0 focus:ring-1"
                    />
                    <span className="text-sm font-semibold text-white">Required Field</span>
                  </label>
                </div>

                {/* Conditional Fields based on Type */}
                {(v.type === 'text' || v.type === 'textarea') && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Max Length (Optional)</label>
                    <input 
                      type="number" 
                      value={v.maxLength || ''} 
                      onChange={e => handleUpdate(i, { maxLength: e.target.value ? parseInt(e.target.value) : undefined })}
                      className="w-full h-10 px-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors"
                    />
                  </div>
                )}

                {v.type === 'number' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Min Value</label>
                      <input 
                        type="number" 
                        value={v.min ?? ''} 
                        onChange={e => handleUpdate(i, { min: e.target.value ? parseFloat(e.target.value) : undefined })}
                        className="w-full h-10 px-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Max Value</label>
                      <input 
                        type="number" 
                        value={v.max ?? ''} 
                        onChange={e => handleUpdate(i, { max: e.target.value ? parseFloat(e.target.value) : undefined })}
                        className="w-full h-10 px-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors"
                      />
                    </div>
                  </>
                )}

                {(v.type === 'select' || v.type === 'multi_select') && (
                  <div className="md:col-span-2 space-y-3 mt-2 pt-4 border-t border-[#202746]">
                    <label className="text-xs font-bold text-[#aeb6cb] uppercase tracking-wider">Options</label>
                    {v.options.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-2">
                        <input 
                          type="text" 
                          value={opt} 
                          onChange={e => updateOption(i, optIdx, e.target.value)}
                          placeholder="Option value..."
                          className="flex-1 h-10 px-3 bg-[#0c1122] border border-[#30395e] rounded-lg text-white text-sm focus:outline-none focus:border-[#a46aff] transition-colors"
                        />
                        <button 
                          onClick={() => removeOption(i, optIdx)}
                          className="w-10 h-10 grid place-items-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => addOption(i)}
                      className="flex items-center gap-2 text-sm text-[#a46aff] hover:text-white transition-colors"
                    >
                      <Plus size={16} /> Add Option
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
