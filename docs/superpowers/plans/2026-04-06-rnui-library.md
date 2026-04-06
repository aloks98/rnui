# @e412/rnui Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a shadcn-based UI component library as a pnpm monorepo, published to npm as `@e412/rnui-react` and `@e412/rnui-themes`.

**Architecture:** pnpm workspace monorepo with two packages — `@e412/rnui-themes` (CSS variables + Tailwind v4 theme) and `@e412/rnui-react` (all shadcn components re-exported). Vite 8 library mode builds both. Changesets handles versioning.

**Tech Stack:** pnpm, Vite 8, TypeScript, Tailwind CSS v4, shadcn/ui (CLI v4), oxlint, oxfmt, Changesets

---

## File Structure

```
rnui/
├── packages/
│   ├── react/                          → @e412/rnui-react
│   │   ├── src/
│   │   │   ├── components/               (shadcn components added via CLI)
│   │   │   ├── hooks/                    (shadcn hooks)
│   │   │   ├── lib/
│   │   │   │   └── utils.ts              (cn() helper)
│   │   │   └── index.ts                  (barrel export)
│   │   ├── components.json               (shadcn CLI config)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   └── themes/                         → @e412/rnui-themes
│       ├── src/
│       │   ├── base.css                  (shared tokens: radius, font)
│       │   ├── light.css                 (:root color variables)
│       │   ├── dark.css                  (.dark color variables)
│       │   └── index.css                 (imports all + @theme block for Tailwind v4)
│       ├── package.json
│       └── vite.config.ts
│
├── .changeset/
│   └── config.json
├── .oxlintrc.json
├── .oxfmtrc.json
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.base.json
```

---

### Task 1: Initialize Git and Root Monorepo

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.base.json`
- Create: `.gitignore`

- [ ] **Step 1: Initialize git repo**

```bash
cd /home/aloks98/projects/rnui
git init
```

- [ ] **Step 2: Create root package.json**

Create `package.json`:

```json
{
  "name": "@e412/rnui",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "pnpm -r --filter @e412/rnui-themes run build && pnpm -r --filter @e412/rnui-react run build",
    "lint": "oxlint packages/",
    "format": "oxfmt packages/",
    "format:check": "oxfmt --check packages/",
    "changeset": "changeset",
    "release": "pnpm build && changeset version && pnpm publish -r"
  },
  "devDependencies": {
    "@changesets/cli": "^2.29.0",
    "oxlint": "^1.0.0",
    "oxfmt": "^0.1.0",
    "typescript": "^5.8.0"
  },
  "packageManager": "pnpm@10.8.0",
  "engines": {
    "node": ">=20"
  }
}
```

- [ ] **Step 3: Create pnpm-workspace.yaml**

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - "packages/*"
```

- [ ] **Step 4: Create tsconfig.base.json**

Create `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

- [ ] **Step 5: Create .gitignore**

Create `.gitignore`:

```
node_modules/
dist/
*.tsbuildinfo
.vite/
```

- [ ] **Step 6: Install dependencies**

```bash
pnpm install
```

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "chore: initialize monorepo with pnpm workspaces"
```

---

### Task 2: Set Up Linting and Formatting

**Files:**
- Create: `.oxlintrc.json`
- Create: `.oxfmtrc.json`

- [ ] **Step 1: Create .oxlintrc.json**

Create `.oxlintrc.json`:

```json
{
  "$schema": "https://raw.githubusercontent.com/oxc-project/oxc/main/npm/oxlint/configuration_schema.json",
  "categories": {
    "correctness": "error",
    "suspicious": "warn",
    "pedantic": "off",
    "style": "off"
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "warn"
  },
  "ignorePatterns": ["dist/", "node_modules/"]
}
```

- [ ] **Step 2: Create .oxfmtrc.json**

Create `.oxfmtrc.json`:

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all"
}
```

- [ ] **Step 3: Verify lint and format run without errors**

```bash
pnpm lint
pnpm format:check
```

Expected: Both pass (no files to check yet, no errors).

- [ ] **Step 4: Commit**

```bash
git add .oxlintrc.json .oxfmtrc.json
git commit -m "chore: add oxlint and oxfmt configuration"
```

---

### Task 3: Set Up Changesets

**Files:**
- Create: `.changeset/config.json`

- [ ] **Step 1: Initialize changesets**

```bash
pnpm changeset init
```

- [ ] **Step 2: Update .changeset/config.json**

Edit `.changeset/config.json` to:

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.1.1/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

Key: `"access": "public"` so `@e412/*` scoped packages publish as public.

- [ ] **Step 3: Commit**

```bash
git add .changeset/
git commit -m "chore: initialize changesets for versioning"
```

---

### Task 4: Create @e412/rnui-themes Package

**Files:**
- Create: `packages/themes/package.json`
- Create: `packages/themes/vite.config.ts`
- Create: `packages/themes/src/base.css`
- Create: `packages/themes/src/light.css`
- Create: `packages/themes/src/dark.css`
- Create: `packages/themes/src/index.css`

- [ ] **Step 1: Create packages/themes directory**

```bash
mkdir -p packages/themes/src
```

- [ ] **Step 2: Create packages/themes/package.json**

Create `packages/themes/package.json`:

```json
{
  "name": "@e412/rnui-themes",
  "version": "0.0.1",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/index.css",
  "exports": {
    ".": "./dist/index.css",
    "./base": "./dist/base.css",
    "./light": "./dist/light.css",
    "./dark": "./dist/dark.css"
  },
  "scripts": {
    "build": "vite build"
  },
  "devDependencies": {
    "vite": "^8.0.0"
  }
}
```

- [ ] **Step 3: Create packages/themes/vite.config.ts**

Create `packages/themes/vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.css'),
        base: resolve(__dirname, 'src/base.css'),
        light: resolve(__dirname, 'src/light.css'),
        dark: resolve(__dirname, 'src/dark.css'),
      },
      output: {
        assetFileNames: '[name][extname]',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
```

- [ ] **Step 4: Create packages/themes/src/base.css**

Create `packages/themes/src/base.css`:

```css
@layer base {
  *,
  *::before,
  *::after {
    border-color: var(--border);
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: oklch(var(--background));
    color: oklch(var(--foreground));
  }
}
```

- [ ] **Step 5: Create packages/themes/src/light.css**

Create `packages/themes/src/light.css` with shadcn's default light theme tokens using oklch format:

```css
:root {
  --background: 1 0 0;
  --foreground: 0.145 0 0;
  --card: 1 0 0;
  --card-foreground: 0.145 0 0;
  --popover: 1 0 0;
  --popover-foreground: 0.145 0 0;
  --primary: 0.205 0 0;
  --primary-foreground: 0.985 0 0;
  --secondary: 0.965 0 0;
  --secondary-foreground: 0.205 0 0;
  --muted: 0.965 0 0;
  --muted-foreground: 0.556 0 0;
  --accent: 0.965 0 0;
  --accent-foreground: 0.205 0 0;
  --destructive: 0.577 0.245 27.325;
  --destructive-foreground: 0.577 0.245 27.325;
  --border: 0.922 0 0;
  --input: 0.922 0 0;
  --ring: 0.708 0 0;
  --chart-1: 0.646 0.222 41.116;
  --chart-2: 0.6 0.118 184.704;
  --chart-3: 0.398 0.07 227.392;
  --chart-4: 0.828 0.189 84.429;
  --chart-5: 0.769 0.188 70.08;
  --radius: 0.625rem;
  --sidebar-background: 0.985 0 0;
  --sidebar-foreground: 0.145 0 0;
  --sidebar-primary: 0.205 0 0;
  --sidebar-primary-foreground: 0.985 0 0;
  --sidebar-accent: 0.965 0 0;
  --sidebar-accent-foreground: 0.205 0 0;
  --sidebar-border: 0.922 0 0;
  --sidebar-ring: 0.708 0 0;
}
```

- [ ] **Step 6: Create packages/themes/src/dark.css**

Create `packages/themes/src/dark.css`:

```css
.dark {
  --background: 0.145 0 0;
  --foreground: 0.985 0 0;
  --card: 0.145 0 0;
  --card-foreground: 0.985 0 0;
  --popover: 0.145 0 0;
  --popover-foreground: 0.985 0 0;
  --primary: 0.985 0 0;
  --primary-foreground: 0.205 0 0;
  --secondary: 0.269 0 0;
  --secondary-foreground: 0.985 0 0;
  --muted: 0.269 0 0;
  --muted-foreground: 0.708 0 0;
  --accent: 0.269 0 0;
  --accent-foreground: 0.985 0 0;
  --destructive: 0.577 0.245 27.325;
  --destructive-foreground: 0.577 0.245 27.325;
  --border: 0.269 0 0;
  --input: 0.269 0 0;
  --ring: 0.439 0 0;
  --chart-1: 0.488 0.243 264.376;
  --chart-2: 0.696 0.17 162.48;
  --chart-3: 0.769 0.188 70.08;
  --chart-4: 0.627 0.265 303.9;
  --chart-5: 0.645 0.246 16.439;
  --sidebar-background: 0.145 0 0;
  --sidebar-foreground: 0.985 0 0;
  --sidebar-primary: 0.488 0.243 264.376;
  --sidebar-primary-foreground: 0.985 0 0;
  --sidebar-accent: 0.269 0 0;
  --sidebar-accent-foreground: 0.985 0 0;
  --sidebar-border: 0.269 0 0;
  --sidebar-ring: 0.439 0 0;
}
```

- [ ] **Step 7: Create packages/themes/src/index.css**

Create `packages/themes/src/index.css`:

```css
@import './base.css';
@import './light.css';
@import './dark.css';

@theme inline {
  --color-background: oklch(var(--background));
  --color-foreground: oklch(var(--foreground));
  --color-card: oklch(var(--card));
  --color-card-foreground: oklch(var(--card-foreground));
  --color-popover: oklch(var(--popover));
  --color-popover-foreground: oklch(var(--popover-foreground));
  --color-primary: oklch(var(--primary));
  --color-primary-foreground: oklch(var(--primary-foreground));
  --color-secondary: oklch(var(--secondary));
  --color-secondary-foreground: oklch(var(--secondary-foreground));
  --color-muted: oklch(var(--muted));
  --color-muted-foreground: oklch(var(--muted-foreground));
  --color-accent: oklch(var(--accent));
  --color-accent-foreground: oklch(var(--accent-foreground));
  --color-destructive: oklch(var(--destructive));
  --color-destructive-foreground: oklch(var(--destructive-foreground));
  --color-border: oklch(var(--border));
  --color-input: oklch(var(--input));
  --color-ring: oklch(var(--ring));
  --color-chart-1: oklch(var(--chart-1));
  --color-chart-2: oklch(var(--chart-2));
  --color-chart-3: oklch(var(--chart-3));
  --color-chart-4: oklch(var(--chart-4));
  --color-chart-5: oklch(var(--chart-5));
  --color-sidebar-background: oklch(var(--sidebar-background));
  --color-sidebar-foreground: oklch(var(--sidebar-foreground));
  --color-sidebar-primary: oklch(var(--sidebar-primary));
  --color-sidebar-primary-foreground: oklch(var(--sidebar-primary-foreground));
  --color-sidebar-accent: oklch(var(--sidebar-accent));
  --color-sidebar-accent-foreground: oklch(var(--sidebar-accent-foreground));
  --color-sidebar-border: oklch(var(--sidebar-border));
  --color-sidebar-ring: oklch(var(--sidebar-ring));
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

This `@theme inline` block is how Tailwind v4 maps CSS variables to utility classes. Consumers get `bg-primary`, `text-foreground`, etc. just by importing this CSS.

- [ ] **Step 8: Install themes dependencies and build**

```bash
cd /home/aloks98/projects/rnui
pnpm install
pnpm --filter @e412/rnui-themes build
```

Expected: `packages/themes/dist/` contains `index.css`, `base.css`, `light.css`, `dark.css`.

- [ ] **Step 9: Commit**

```bash
git add packages/themes/
git commit -m "feat: add @e412/rnui-themes package with light and dark themes"
```

---

### Task 5: Create @e412/rnui-react Package Scaffold

**Files:**
- Create: `packages/react/package.json`
- Create: `packages/react/tsconfig.json`
- Create: `packages/react/vite.config.ts`
- Create: `packages/react/src/lib/utils.ts`
- Create: `packages/react/src/index.ts`

- [ ] **Step 1: Create packages/react directory structure**

```bash
mkdir -p packages/react/src/{components,hooks,lib}
```

- [ ] **Step 2: Create packages/react/package.json**

Create `packages/react/package.json`:

```json
{
  "name": "@e412/rnui-react",
  "version": "0.0.1",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    }
  },
  "scripts": {
    "build": "vite build"
  },
  "peerDependencies": {
    "@e412/rnui-themes": "workspace:*",
    "react": ">=18",
    "react-dom": ">=18",
    "tailwindcss": ">=4"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "vite": "^8.0.0",
    "vite-plugin-dts": "^4.5.0"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^3.0.0",
    "lucide-react": "^0.500.0",
    "tw-animate-css": "^1.0.0"
  }
}
```

- [ ] **Step 3: Create packages/react/tsconfig.json**

Create `packages/react/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Create packages/react/vite.config.ts**

Create `packages/react/vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      include: ['src'],
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@e412\/rnui-themes/,
      ],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
})
```

- [ ] **Step 5: Create packages/react/src/lib/utils.ts**

Create `packages/react/src/lib/utils.ts`:

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 6: Create packages/react/src/index.ts**

Create `packages/react/src/index.ts` (placeholder — will be populated after adding components):

```ts
export { cn } from './lib/utils'
```

- [ ] **Step 7: Install dependencies and verify build**

```bash
cd /home/aloks98/projects/rnui
pnpm install
pnpm --filter @e412/rnui-react build
```

Expected: `packages/react/dist/` contains `index.mjs`, `index.cjs`, `index.d.ts`.

- [ ] **Step 8: Commit**

```bash
git add packages/react/
git commit -m "feat: scaffold @e412/rnui-react package with vite library mode"
```

---

### Task 6: Configure shadcn CLI for Component Installation

**Files:**
- Create: `packages/react/components.json`

- [ ] **Step 1: Create packages/react/components.json**

Create `packages/react/components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../themes/src/index.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "ui": "@/components"
  }
}
```

Key settings:
- `rsc: false` — this is a library, not a Next.js app
- `tailwind.config: ""` — Tailwind v4 uses CSS-based config
- `tailwind.css` points to themes package CSS
- Aliases use `@/` which maps to `packages/react/src/` via tsconfig paths

- [ ] **Step 2: Verify shadcn CLI recognizes the config**

```bash
cd /home/aloks98/projects/rnui/packages/react
pnpm dlx shadcn@latest diff
```

Expected: CLI runs without config errors.

- [ ] **Step 3: Commit**

```bash
cd /home/aloks98/projects/rnui
git add packages/react/components.json
git commit -m "chore: add shadcn CLI configuration for react package"
```

---

### Task 7: Add All shadcn Components

**Files:**
- Create: `packages/react/src/components/*` (all shadcn components)
- Modify: `packages/react/src/index.ts` (add all exports)

- [ ] **Step 1: Add all shadcn components via CLI**

```bash
cd /home/aloks98/projects/rnui/packages/react
pnpm dlx shadcn@latest add --all --overwrite
```

This installs all shadcn components into `src/components/`, hooks into `src/hooks/`, and any lib utilities into `src/lib/`.

- [ ] **Step 2: Verify components were installed**

```bash
ls /home/aloks98/projects/rnui/packages/react/src/components/
ls /home/aloks98/projects/rnui/packages/react/src/hooks/
```

Expected: Component files (button.tsx, card.tsx, dialog.tsx, etc.) and hook files present.

- [ ] **Step 3: Update packages/react/src/index.ts with all exports**

Update `packages/react/src/index.ts` to re-export all components and hooks. The exact list depends on what `shadcn add --all` installs, but the pattern is:

```ts
// Utilities
export { cn } from './lib/utils'

// Components — export everything from each component file
// After running `shadcn add --all`, list all files in src/components/ and
// add an export line for each. Example pattern:
export * from './components/accordion'
export * from './components/alert'
export * from './components/alert-dialog'
export * from './components/aspect-ratio'
export * from './components/avatar'
export * from './components/badge'
export * from './components/breadcrumb'
export * from './components/button'
export * from './components/calendar'
export * from './components/card'
export * from './components/carousel'
export * from './components/chart'
export * from './components/checkbox'
export * from './components/collapsible'
export * from './components/command'
export * from './components/context-menu'
export * from './components/dialog'
export * from './components/drawer'
export * from './components/dropdown-menu'
export * from './components/form'
export * from './components/hover-card'
export * from './components/input'
export * from './components/input-otp'
export * from './components/label'
export * from './components/menubar'
export * from './components/navigation-menu'
export * from './components/pagination'
export * from './components/popover'
export * from './components/progress'
export * from './components/radio-group'
export * from './components/resizable'
export * from './components/scroll-area'
export * from './components/select'
export * from './components/separator'
export * from './components/sheet'
export * from './components/sidebar'
export * from './components/skeleton'
export * from './components/slider'
export * from './components/sonner'
export * from './components/switch'
export * from './components/table'
export * from './components/tabs'
export * from './components/textarea'
export * from './components/toast'
export * from './components/toggle'
export * from './components/toggle-group'
export * from './components/tooltip'

// Hooks
export * from './hooks/use-mobile'
export * from './hooks/use-toast'
```

**Important:** After `shadcn add --all` completes, inspect the actual files created in `src/components/` and `src/hooks/`. Adjust the exports to match exactly what was installed. Remove any export lines for files that don't exist. Add export lines for any additional files that were installed.

- [ ] **Step 4: Update dependencies in package.json**

After `shadcn add --all`, check what new dependencies were added. shadcn may have added packages like `@radix-ui/*`, `cmdk`, `embla-carousel-react`, `recharts`, `react-day-picker`, `vaul`, `sonner`, `input-otp`, `react-resizable-panels`, `next-themes` etc. to `package.json`. These need to be in `dependencies` (not `devDependencies`) so consumers get them transitively.

```bash
cd /home/aloks98/projects/rnui/packages/react
cat package.json
```

Review and ensure all runtime deps shadcn added are in `dependencies`.

- [ ] **Step 5: Build to verify everything compiles**

```bash
cd /home/aloks98/projects/rnui
pnpm install
pnpm --filter @e412/rnui-react build
```

Expected: Build succeeds, `dist/` contains `index.mjs`, `index.cjs`, `index.d.ts`.

- [ ] **Step 6: Fix any build errors**

If there are import errors or missing dependencies, fix them:
- Missing dependency → `pnpm --filter @e412/rnui-react add <package>`
- Import path issues → fix the import in the component file
- Type errors → fix the type or add to externals in vite.config.ts

Rebuild and verify:

```bash
pnpm --filter @e412/rnui-react build
```

- [ ] **Step 7: Commit**

```bash
cd /home/aloks98/projects/rnui
git add packages/react/
git commit -m "feat: add all shadcn components to @e412/rnui-react"
```

---

### Task 8: Full Build and Smoke Test

**Files:**
- No new files — validation only

- [ ] **Step 1: Clean build from root**

```bash
cd /home/aloks98/projects/rnui
rm -rf packages/themes/dist packages/react/dist
pnpm build
```

Expected: Both packages build successfully. Themes builds first, then react.

- [ ] **Step 2: Verify themes output**

```bash
ls -la packages/themes/dist/
cat packages/themes/dist/index.css | head -20
```

Expected: `index.css` contains the combined base + light + dark CSS with `@theme inline` block.

- [ ] **Step 3: Verify react output**

```bash
ls -la packages/react/dist/
```

Expected: `index.mjs`, `index.cjs`, `index.d.ts` (or `index.d.mts`/`index.d.cts`) present.

- [ ] **Step 4: Verify exports are correct in the built output**

```bash
node -e "import('@e412/rnui-react').then(m => console.log(Object.keys(m).slice(0, 20)))"
```

Or if that fails due to peer deps, just check the file:

```bash
head -50 packages/react/dist/index.mjs
```

Expected: Named exports visible for Button, Card, Dialog, etc.

- [ ] **Step 5: Run lint and format**

```bash
pnpm lint
pnpm format:check
```

Fix any issues found, then re-run.

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "chore: fix lint and format issues"
```

(Skip this step if no fixes were needed.)

---

### Task 9: Documentation — Consumer Setup Guide

**Files:**
- Create: `README.md`
- Create: `packages/react/README.md`
- Create: `packages/themes/README.md`

- [ ] **Step 1: Create root README.md**

Create `README.md`:

```markdown
# @e412/rnui

A shared UI component library built on shadcn/ui. Ships React components and prebuilt themes as separate npm packages.

## Packages

| Package | Description |
|---------|-------------|
| [@e412/rnui-react](./packages/react) | React components (all shadcn components) |
| [@e412/rnui-themes](./packages/themes) | CSS themes (light + dark) with Tailwind v4 support |

## Quick Start

```bash
npm install @e412/rnui-react @e412/rnui-themes
```

Import the theme CSS in your app entry:

```css
/* app.css or globals.css */
@import '@e412/rnui-themes';
@import 'tw-animate-css';
```

Use components:

```tsx
import { Button, Card } from '@e412/rnui-react'

export function App() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}
```

## Adding Theme to Tailwind v4

The theme CSS includes a `@theme inline` block that registers all design tokens with Tailwind v4. Just importing `@e412/rnui-themes` in your CSS gives you utilities like `bg-primary`, `text-muted-foreground`, etc.

Make sure your Tailwind content config includes the library:

```css
@source "../node_modules/@e412/rnui-react/dist";
```

## Dark Mode

Add the `dark` class to your `<html>` element:

```html
<html class="dark">
```

## Development

```bash
pnpm install
pnpm build
pnpm lint
pnpm format
```

## Versioning

This project uses [Changesets](https://github.com/changesets/changesets).

```bash
pnpm changeset        # create a changeset
pnpm release          # version + publish
```
```

- [ ] **Step 2: Create packages/react/README.md**

Create `packages/react/README.md`:

```markdown
# @e412/rnui-react

All shadcn/ui components, packaged for reuse across projects.

## Install

```bash
npm install @e412/rnui-react @e412/rnui-themes
```

## Peer Dependencies

- `react` >= 18
- `react-dom` >= 18
- `tailwindcss` >= 4
- `@e412/rnui-themes`

## Usage

```tsx
import { Button } from '@e412/rnui-react'
```

See the [root README](../../README.md) for full setup instructions.
```

- [ ] **Step 3: Create packages/themes/README.md**

Create `packages/themes/README.md`:

```markdown
# @e412/rnui-themes

Prebuilt themes (light + dark) with CSS variables and Tailwind v4 integration.

## Install

```bash
npm install @e412/rnui-themes
```

## Usage

```css
@import '@e412/rnui-themes';
```

This gives you:
- Light theme (default on `:root`)
- Dark theme (activated via `.dark` class on `<html>`)
- Tailwind v4 `@theme` integration for utility classes

## Individual Themes

```css
@import '@e412/rnui-themes/base';
@import '@e412/rnui-themes/light';
```
```

- [ ] **Step 4: Commit**

```bash
cd /home/aloks98/projects/rnui
git add README.md packages/react/README.md packages/themes/README.md
git commit -m "docs: add README files with consumer setup guide"
```

---

## Adding New Components (Future Workflow)

Not a task — reference for ongoing use:

```bash
cd packages/react
pnpm dlx shadcn@latest add <component-name>
```

Then add the export to `src/index.ts`:

```ts
export * from './components/<component-name>'
```

Rebuild and publish:

```bash
cd /home/aloks98/projects/rnui
pnpm build
pnpm changeset
pnpm release
```

## Adding New Themes (Future Workflow)

1. Create `packages/themes/src/<theme-name>.css` with all variables under `.<theme-name>` class
2. Add `@import './<theme-name>.css'` to `index.css`
3. Add the export to `packages/themes/package.json` exports map
4. Rebuild and publish
