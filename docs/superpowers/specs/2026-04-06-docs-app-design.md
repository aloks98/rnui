# Docs & Example App Design

## Overview

An Astro + Starlight docs site at `apps/docs/` that serves as both documentation and a live component example gallery for `@e412/rnui`. Consumes `@e412/rnui-react` and `@e412/rnui-themes` as workspace dependencies.

## App Structure

```
apps/
└── docs/
    ├── src/
    │   ├── components/
    │   │   └── component-preview.tsx    (React: live preview + code toggle)
    │   ├── content/
    │   │   └── docs/
    │   │       ├── getting-started.mdx
    │   │       ├── theming.mdx
    │   │       └── components/
    │   │           ├── button.mdx
    │   │           ├── card.mdx
    │   │           └── dialog.mdx
    │   └── styles/
    │       └── custom.css               (imports @e412/rnui-themes + tw-animate-css)
    ├── astro.config.mjs
    ├── package.json
    └── tsconfig.json
```

**Workspace changes:**
- Update `pnpm-workspace.yaml` to include `apps/*`
- `apps/docs/package.json` declares workspace dependencies on `@e412/rnui-react` and `@e412/rnui-themes`

## Tech Stack

- **Astro** — static site framework
- **Starlight** — Astro's docs theme (sidebar, search, dark mode, MDX out of the box)
- **@astrojs/react** — React component islands for interactive previews
- **@astrojs/tailwind** — Tailwind CSS integration so rnui theme tokens work

## Component Preview System

A `ComponentPreview` React component used in MDX pages:

```tsx
<ComponentPreview code={`<Button variant="default">Click me</Button>`}>
  <Button variant="default">Click me</Button>
</ComponentPreview>
```

- `children` — live rendered React component
- `code` prop — source code string displayed in a toggleable code block
- Uses `client:load` directive in MDX for interactivity
- Inherits `.dark` class from Starlight's dark mode toggle, so `@e412/rnui-themes` tokens work automatically
- Intentionally simple — no sandboxing, no live editing. Preview + code toggle only.

## Starlight Configuration

**`astro.config.mjs`:**
- Starlight plugin with sidebar config
- `@astrojs/react` integration
- `@astrojs/tailwind` integration
- Site title: `@e412/rnui`

**Sidebar:**
```
Getting Started
Theming
Components/
  Button
  Card
  Dialog
```

**Dark mode:** Starlight's built-in toggle applies `.dark` class, which activates `@e412/rnui-themes` dark variables automatically.

**Custom CSS (`src/styles/custom.css`):**
```css
@import '@e412/rnui-themes';
@import 'tw-animate-css';
```

## Initial Pages

### Getting Started (`getting-started.mdx`)
- Installation command
- CSS setup (importing themes + tw-animate-css)
- Tailwind v4 integration (`@source` directive)
- Dark mode setup
- Quick Button example

### Theming (`theming.mdx`)
- How the theme system works (CSS variables + Tailwind v4 `@theme inline`)
- Available tokens (colors, radius)
- Light/dark switching
- Creating custom themes (override variables)

### Component Pages (button.mdx, card.mdx, dialog.mdx)
Each follows the same repeatable pattern:
- Import statement
- Live preview with default usage (ComponentPreview)
- Variants section with live previews
- Props table (manually written)

This pattern scales to all future component pages — add a new `.mdx` file per component.
