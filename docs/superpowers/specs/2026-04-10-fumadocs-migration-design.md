# Fumadocs Migration Design

## Overview

Replace the Astro/Starlight docs app at `apps/docs` with a Next.js + Fumadocs app. Migrate all existing MDX content and add live component previews.

## Architecture

- **Framework:** Next.js 15 (app router)
- **Docs engine:** fumadocs-ui + fumadocs-core + fumadocs-mdx
- **Styling:** Tailwind v4 + @e412/rnui-themes for live component previews
- **Dark mode:** next-themes + Fumadocs built-in theme switching
- **Components:** @e412/rnui-react imported directly in MDX for live previews

## App Structure

```
apps/docs/
├── app/
│   ├── layout.tsx              (root layout: fonts, ThemeProvider, rnui CSS imports)
│   ├── page.tsx                (landing page — minimal hero)
│   ├── docs/[[...slug]]/
│   │   ├── page.tsx            (docs page renderer via fumadocs)
│   │   └── layout.tsx          (docs layout with sidebar)
│   └── layout.config.tsx       (fumadocs navigation config — sidebar structure)
├── components/
│   └── preview.tsx             (live component preview wrapper)
├── content/docs/               (migrated MDX files from Astro)
│   ├── getting-started.mdx
│   ├── theming.mdx
│   ├── components/             (65+ component pages)
│   ├── charts/                 (8 chart pages)
│   ├── utilities/              (3 utility pages)
│   ├── api-reference.mdx
│   └── changelog.mdx
├── source.config.ts            (fumadocs content source definition)
├── next.config.mjs             (with fumadocs MDX plugin)
├── package.json
├── tsconfig.json
└── tailwind.css                (imports @e412/rnui-themes + tw-animate-css)
```

## Preview Component

A `<Preview>` React component wraps live examples in docs:

```tsx
<Preview>
  <Button variant="outline">Click me</Button>
</Preview>
```

Renders the component inside a bordered container with padding, matching shadcn's docs style. Since Fumadocs runs on Next.js, React components work natively — no iframes, no islands.

## Content Migration

- Copy all `.mdx` files from current `apps/docs/src/content/docs/` to `apps/docs/content/docs/`
- Frontmatter stays the same (title, description)
- Code-only examples stay as-is
- Add `<Preview>` blocks around key examples for live rendering
- Remove Astro-specific imports (Starlight components like CardGrid, LinkCard)

## Sidebar

Same categories as current site, configured in `layout.config.tsx`:
- Getting Started, Theming
- Layout (6), Forms (25), Data Display (20), Feedback (9), Navigation (5)
- Charts (8), Utilities (3)
- API Reference, Changelog

## Dependencies

```json
{
  "dependencies": {
    "@e412/rnui-react": "workspace:*",
    "@e412/rnui-themes": "workspace:*",
    "fumadocs-core": "latest",
    "fumadocs-mdx": "latest",
    "fumadocs-ui": "latest",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "tw-animate-css": "^1.0.0",
    "lucide-react": "^0.500.0"
  }
}
```

## Landing Page

Minimal centered hero — same as current: title, tagline, two CTA buttons (Get Started, Browse Components).
