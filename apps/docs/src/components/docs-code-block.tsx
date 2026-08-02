import {
  CodeBlock as CodeBlockBase,
  type CodeBlockProps,
  createCodeBlockHighlighter,
} from '@e412/rnui-react';

// Dogfoods the slim CodeBlock API: register only the languages the docs
// actually render, instead of importing `@e412/rnui-react/code-block-full`
// and having the build emit a chunk per shiki grammar.
const highlighter = createCodeBlockHighlighter({
  langs: {
    tsx: () => import('@shikijs/langs/tsx'),
    ts: () => import('@shikijs/langs/ts'),
    bash: () => import('@shikijs/langs/bash'),
    css: () => import('@shikijs/langs/css'),
    json: () => import('@shikijs/langs/json'),
  },
  themes: {
    'github-light-default': () => import('@shikijs/themes/github-light-default'),
    'github-dark-default': () => import('@shikijs/themes/github-dark-default'),
  },
});

export function CodeBlock(props: CodeBlockProps) {
  return <CodeBlockBase highlighter={highlighter} {...props} />;
}
