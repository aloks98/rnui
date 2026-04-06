# @e412/rnui — Shared UI Component Library

## Overview

A shadcn-based UI component library published to npm as separate packages. React-first, with a monorepo structure designed to expand to other frameworks (Svelte, Vue) in the future.

## Monorepo Structure

```
rnui/
├── packages/
│   ├── react/                → @e412/rnui-react
│   │   ├── src/
│   │   │   ├── components/     (all shadcn components)
│   │   │   ├── hooks/          (shadcn hooks: use-mobile, use-toast, etc.)
│   │   │   ├── lib/            (utilities: cn(), etc.)
│   │   │   └── index.ts        (barrel export)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   └── themes/               → @e412/rnui-themes
│       ├── src/
│       │   ├── base.css        (reset + shared tokens: radius, font-family)
│       │   ├── light.css       (:root variables)
│       │   ├── dark.css        (.dark class variables)
│       │   ├── index.css       (imports base + light + dark)
│       │   └── tailwind-preset.ts
│       ├── package.json
│       └── vite.config.ts
│
├── pnpm-workspace.yaml
├── package.json                (root: scripts, devDeps)
├── tsconfig.base.json          (shared TS config)
└── .changeset/                 (versioning config)
```

## Packages

### @e412/rnui-react

React component library. All shadcn components re-exported as-is (thin re-export, no wrapper layer).

**Build (Vite 8 library mode):**
- ESM: `dist/index.mjs`
- CJS: `dist/index.cjs`
- Types: `dist/index.d.ts` (via `vite-plugin-dts`)

**Peer dependencies:**
- `react` >= 18
- `react-dom` >= 18
- `@e412/rnui-themes`
- `tailwindcss` >= 4

**Adding components:**
1. Run `npx shadcn@latest add <component>` into `packages/react/src/components/`
2. Component goes in its own directory (e.g., `components/button/button.tsx`)
3. Add export to barrel `index.ts`

**Consumer usage:**
```tsx
import { Button, Card, Dialog } from '@e412/rnui-react'
```

### @e412/rnui-themes

Framework-agnostic theming via CSS variables + a Tailwind preset.

**CSS variables** follow shadcn's HSL convention:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  /* ... all shadcn tokens */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

**Tailwind preset** maps CSS variables to utilities:
```ts
export default {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... all tokens
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
}
```

**Build output:**
- `dist/index.css` — bundled CSS
- `dist/preset.mjs` + `dist/preset.d.ts` — Tailwind preset

**Shipped themes:** Light (default) + Dark (`.dark` class). Adding future themes: create a new CSS file (e.g., `ocean.css`) with the same variables under `.theme-ocean`, add to index, publish.

**Theme switching:** Toggle `.dark` class on `<html>`. No runtime JS from the library.

**Consumer setup:**
```ts
// tailwind.config.ts
import rnuiPreset from '@e412/rnui-themes/preset'

export default {
  presets: [rnuiPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@e412/rnui-react/dist/**/*.{js,mjs}',
  ],
}
```

```tsx
// app entry
import '@e412/rnui-themes'
```

## Tooling

- **Package manager:** pnpm workspaces
- **Build:** Vite 8 library mode (per-package)
- **Linting:** oxlint
- **Formatting:** oxfmt
- **Versioning/publishing:** Changesets (`@changesets/cli`)
  - Each package versioned independently
  - `pnpm changeset` to create entries
  - `pnpm release` to version + publish

## Root Scripts

- `pnpm build` — builds all packages (themes first via dependency graph, then react)
- `pnpm lint` — oxlint across workspace
- `pnpm format` — oxfmt across workspace
- `pnpm changeset` — create a changeset
- `pnpm release` — version + publish

## Build Order

Themes builds first (react depends on themes via peer dep). pnpm workspace dependency graph handles ordering automatically.

## Future Expansion

- New framework packages: `@e412/rnui-svelte`, `@e412/rnui-vue` etc.
- New themes: additional CSS files in `@e412/rnui-themes`
- All framework packages share `@e412/rnui-themes` as the single source of truth for design tokens
