import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { Node } from '@tiptap/pm/model';

const VARIABLE_REGEX = /\[([A-Za-z][A-Za-z0-9_\s]{0,49})\]/g;

function findVariables(doc: Node) {
  const decorations: Decoration[] = [];

  doc.descendants((node, pos) => {
    if (!node.isText) {
      return;
    }

    const text = node.text;
    if (!text) return;

    let match;
    VARIABLE_REGEX.lastIndex = 0;
    while ((match = VARIABLE_REGEX.exec(text)) !== null) {
      const from = pos + match.index;
      const to = from + match[0].length;
      decorations.push(
        Decoration.inline(from, to, {
          class: 'bg-amber-500/20 text-amber-300 font-mono px-1 rounded border border-amber-500/30',
        })
      );
    }
  });

  return DecorationSet.create(doc, decorations);
}

export const VariableHighlighter = Extension.create({
  name: 'variableHighlighter',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('variableHighlighter'),
        state: {
          init(_, { doc }) {
            return findVariables(doc);
          },
          apply(tr, old) {
            if (!tr.docChanged) {
              return old.map(tr.mapping, tr.doc);
            }
            return findVariables(tr.doc);
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});
