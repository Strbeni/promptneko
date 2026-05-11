"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { VariableHighlighter } from './VariableHighlighter';
import { PromptFormState, Variable } from './types';
import { useEffect, useMemo } from 'react';
import { AlertCircle, Eye } from 'lucide-react';

const VARIABLE_REGEX = /\[([A-Za-z][A-Za-z0-9_\s]{0,49})\]/g;

export function Step1Content({ data, updateData }: { data: PromptFormState, updateData: (data: PromptFormState) => void }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Enter your prompt here. Use [variable_name] to insert dynamic fields...',
      }),
      VariableHighlighter,
    ],
    content: data.content,
    editorProps: {
      attributes: {
        class: 'max-w-none focus:outline-none min-h-[300px] text-[15px] leading-relaxed',
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      
      // Extract variables
      const foundVariables = new Set<string>();
      let match;
      VARIABLE_REGEX.lastIndex = 0;
      while ((match = VARIABLE_REGEX.exec(text)) !== null) {
        foundVariables.add(match[1]);
      }

      // Merge with existing variables
      const newVariables: Variable[] = Array.from(foundVariables).map(name => {
        const existing = data.variables.find(v => v.name === name);
        return existing || {
          name,
          displayName: name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' '),
          description: '',
          type: 'text',
          defaultValue: '',
          required: true,
          options: []
        };
      });

      updateData({
        ...data,
        content: editor.getHTML(),
        variables: newVariables
      });
    },
  });

  // Extract raw text for validations
  const rawText = editor ? editor.getText() : '';
  const isTooShort = rawText.length > 0 && rawText.length < 50;
  const hasPII = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(rawText) || /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(rawText);
  const hasKeys = /(sk-[a-zA-Z0-9]{20,}|Bearer\s+[a-zA-Z0-9\-\.]{20,})/.test(rawText);

  // Live preview tokens
  const previewSegments = useMemo(() => {
    if (!rawText) return [];
    const segments = [];
    let lastIndex = 0;
    let match;
    VARIABLE_REGEX.lastIndex = 0;
    while ((match = VARIABLE_REGEX.exec(rawText)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ type: 'text', content: rawText.substring(lastIndex, match.index) });
      }
      segments.push({ type: 'var', content: match[1] });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < rawText.length) {
      segments.push({ type: 'text', content: rawText.substring(lastIndex) });
    }
    return segments;
  }, [rawText]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Editor Side */}
      <div className="flex flex-col h-full border-r border-[#202746] pr-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white mb-2">Prompt Content</h2>
          <p className="text-sm text-[#7f88a4]">
            Write your prompt. Wrap variables in brackets like <code className="bg-[#1b2341] px-1.5 py-0.5 rounded text-amber-300">[subject]</code> or <code className="bg-[#1b2341] px-1.5 py-0.5 rounded text-amber-300">[style]</code>.
          </p>
        </div>

        <div className="flex-1 rounded-xl border border-[#202746] bg-[#0c1122] p-4 cursor-text overflow-y-auto" onClick={() => editor?.commands.focus()}>
          <EditorContent editor={editor} />
        </div>

        {/* Warnings */}
        <div className="mt-4 space-y-2">
          {isTooShort && (
            <div className="flex items-center gap-2 text-amber-400 text-sm bg-amber-400/10 p-3 rounded-lg border border-amber-400/20">
              <AlertCircle size={16} />
              Prompt is under 50 characters. Consider adding more detail for better results.
            </div>
          )}
          {hasPII && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              <AlertCircle size={16} />
              Warning: Detected potential PII (Email or Phone Number).
            </div>
          )}
          {hasKeys && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              <AlertCircle size={16} />
              Warning: Detected potential API keys or credentials. Do not hardcode secrets.
            </div>
          )}
        </div>
      </div>

      {/* Preview Side */}
      <div className="flex flex-col h-full">
        <div className="mb-4 flex items-center gap-2 text-[#7f88a4]">
          <Eye size={18} />
          <h2 className="text-sm font-bold uppercase tracking-wider">Live Preview</h2>
        </div>
        
        <div className="flex-1 rounded-xl border border-[#202746] bg-[#11162a] p-6 overflow-y-auto">
          {previewSegments.length === 0 ? (
            <p className="text-[#565e78] text-sm italic">Start typing to see the preview...</p>
          ) : (
            <div className="text-[#d2d7e8] leading-loose whitespace-pre-wrap font-mono text-sm">
              {previewSegments.map((seg, i) => (
                seg.type === 'text' ? (
                  <span key={i}>{seg.content}</span>
                ) : (
                  <span key={i} className="inline-block mx-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold whitespace-nowrap">
                    {seg.content}
                  </span>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
