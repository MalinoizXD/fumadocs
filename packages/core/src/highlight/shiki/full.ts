import { createShikiFactory } from '.';

export const defaultShikiFactory = createShikiFactory({
  async init(options) {
    const { createHighlighter, createJavaScriptRegexEngine } = await import('shiki');

    return createHighlighter({
      langs: [],
      themes: [],
      langAlias: options?.langAlias,
      engine: createJavaScriptRegexEngine(),
    });
  },
});

/** factory using the WASM powered Regex engine */
export const wasmShikiFactory = createShikiFactory({
  async init(options) {
    const { createHighlighter } = await import('shiki');
    const { createOnigurumaEngine } = await import('shiki/engine/oniguruma');

    return createHighlighter({
      langs: [],
      themes: [],
      langAlias: options?.langAlias,
      engine: createOnigurumaEngine(import('shiki/wasm')),
    });
  },
});
