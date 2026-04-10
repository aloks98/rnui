# Fumadocs Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Astro/Starlight docs app with Next.js + Fumadocs, migrate all MDX content, and add live component previews.

**Architecture:** Next.js 15 app router with fumadocs-ui/fumadocs-core/fumadocs-mdx. MDX files in `content/docs/`. Live previews via direct React component imports. Tailwind v4 with rnui themes for component styling.

**Tech Stack:** Next.js 15, fumadocs-ui, fumadocs-core, fumadocs-mdx, Tailwind v4, @e412/rnui-react, @e412/rnui-themes

---

### Task 1: Remove Astro Docs App and Scaffold Fumadocs

**Files:**
- Delete: `apps/docs/` (entire directory)
- Create: `apps/docs/package.json`
- Create: `apps/docs/source.config.ts`
- Create: `apps/docs/next.config.mjs`
- Create: `apps/docs/tsconfig.json`
- Create: `apps/docs/mdx-components.tsx`
- Create: `apps/docs/postcss.config.mjs`
- Create: `apps/docs/lib/source.ts`
- Create: `apps/docs/app/layout.tsx`
- Create: `apps/docs/app/globals.css`
- Create: `apps/docs/app/page.tsx`
- Create: `apps/docs/app/layout.config.tsx`
- Create: `apps/docs/app/docs/layout.tsx`
- Create: `apps/docs/app/docs/[[...slug]]/page.tsx`
- Create: `apps/docs/app/api/search/route.ts`
- Create: `apps/docs/components/preview.tsx`
- Create: `apps/docs/content/docs/index.mdx`

- [ ] **Step 1: Delete old Astro docs app but preserve MDX content**

```bash
cd /home/aloks98/projects/rnui
# Save MDX content before deleting
cp -r apps/docs/src/content/docs /tmp/rnui-docs-content
rm -rf apps/docs
```

- [ ] **Step 2: Create apps/docs/package.json**

```json
{
  "name": "@e412/docs",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@e412/rnui-react": "workspace:*",
    "@e412/rnui-themes": "workspace:*",
    "@types/mdx": "^2.0.0",
    "fumadocs-core": "^15.0.0",
    "fumadocs-mdx": "^11.0.0",
    "fumadocs-ui": "^15.0.0",
    "lucide-react": "^0.500.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tw-animate-css": "^1.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.8.0"
  }
}
```

- [ ] **Step 3: Create apps/docs/source.config.ts**

```ts
import { defineDocs, defineConfig } from 'fumadocs-mdx/config'

export const docs = defineDocs({
  dir: 'content/docs',
})

export default defineConfig()
```

- [ ] **Step 4: Create apps/docs/next.config.mjs**

```js
import { createMDX } from 'fumadocs-mdx/next'

const config = {
  reactStrictMode: true,
  transpilePackages: ['@e412/rnui-react'],
}

const withMDX = createMDX()

export default withMDX(config)
```

- [ ] **Step 5: Create apps/docs/tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "collections/*": ["./.source/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".source/**/*.ts", "mdx-components.tsx"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 6: Create apps/docs/postcss.config.mjs**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

- [ ] **Step 7: Create apps/docs/mdx-components.tsx**

```tsx
import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { Preview } from '@/components/preview'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Preview,
    ...components,
  }
}
```

- [ ] **Step 8: Create apps/docs/lib/source.ts**

```ts
import { docs } from 'collections/server'
import { loader } from 'fumadocs-core/source'

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
})
```

- [ ] **Step 9: Create apps/docs/app/globals.css**

```css
@import 'tailwindcss';
@import 'fumadocs-ui/css/neutral.css';
@import 'fumadocs-ui/css/preset.css';
@import '@e412/rnui-themes';
@import 'tw-animate-css';
@source "../node_modules/@e412/rnui-react/dist";
@source "../node_modules/fumadocs-ui/dist";
```

- [ ] **Step 10: Create apps/docs/app/layout.tsx**

```tsx
import { RootProvider } from 'fumadocs-ui/provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '@e412/rnui',
  description: 'A production-ready UI component library built on shadcn/ui and Base UI.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 11: Create apps/docs/app/layout.config.tsx**

```tsx
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: '@e412/rnui',
  },
}
```

- [ ] **Step 12: Create apps/docs/app/docs/layout.tsx**

```tsx
import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { baseOptions } from '../layout.config'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  )
}
```

- [ ] **Step 13: Create apps/docs/app/docs/[[...slug]]/page.tsx**

```tsx
import { source } from '@/lib/source'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { getMDXComponents } from '../../../mdx-components'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import type { Metadata } from 'next'

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()
  return { title: page.data.title, description: page.data.description }
}
```

- [ ] **Step 14: Create apps/docs/app/api/search/route.ts**

```ts
import { source } from '@/lib/source'
import { createFromSource } from 'fumadocs-core/search/server'

export const { GET } = createFromSource(source)
```

- [ ] **Step 15: Create apps/docs/app/page.tsx**

```tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">@e412/rnui</h1>
      <p className="max-w-md text-lg text-muted-foreground">
        65+ React components, 6 chart types, and a complete theme system — built on shadcn/ui and Base UI.
      </p>
      <div className="flex gap-3">
        <Link
          href="/docs/getting-started"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Get Started
        </Link>
        <Link
          href="/docs/components/button"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Browse Components
        </Link>
      </div>
    </main>
  )
}
```

- [ ] **Step 16: Create apps/docs/components/preview.tsx**

```tsx
import type { ReactNode } from 'react'

export function Preview({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`not-prose flex min-h-[150px] items-center justify-center rounded-lg border border-border bg-background p-6 ${className ?? ''}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 17: Create initial content file**

```bash
mkdir -p apps/docs/content/docs
```

Create `apps/docs/content/docs/index.mdx`:

```mdx
---
title: Welcome
description: A production-ready UI component library built on shadcn/ui and Base UI.
---

Welcome to @e412/rnui documentation.
```

- [ ] **Step 18: Install dependencies and verify dev server**

```bash
cd /home/aloks98/projects/rnui
pnpm install
cd apps/docs
pnpm dev
```

- [ ] **Step 19: Commit**

```bash
cd /home/aloks98/projects/rnui
git add -A
git commit -m "feat: replace Astro docs with Next.js + Fumadocs"
```

---

### Task 2: Migrate MDX Content

**Files:**
- Copy from `/tmp/rnui-docs-content/` to `apps/docs/content/docs/`

- [ ] **Step 1: Copy all MDX files from saved backup**

```bash
cp -r /tmp/rnui-docs-content/* /home/aloks98/projects/rnui/apps/docs/content/docs/
```

- [ ] **Step 2: Remove Astro-specific imports from MDX files**

Remove any lines importing from `@astrojs/starlight/components` (Card, CardGrid, LinkCard) since Fumadocs has its own components. The landing page was already recreated in Task 1.

Remove the old `index.mdx` that was copied (we created a new one).

- [ ] **Step 3: Verify build**

```bash
cd /home/aloks98/projects/rnui/apps/docs
pnpm build
```

Fix any MDX compilation errors.

- [ ] **Step 4: Commit**

```bash
cd /home/aloks98/projects/rnui
git add -A
git commit -m "docs: migrate all MDX content from Astro to Fumadocs"
```

---

### Task 3: Add Live Component Previews

**Files:**
- Modify: Select component MDX files to add `<Preview>` blocks

- [ ] **Step 1: Add live previews to key component pages**

Update these MDX files to add `<Preview>` blocks with actual imported components. Example for `content/docs/components/button.mdx`:

```mdx
import { Button } from '@e412/rnui-react'

## Live Preview

<Preview>
  <div className="flex gap-2">
    <Button>Default</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
</Preview>
```

Add previews to: button, badge, card, alert, input, checkbox, switch, toggle, avatar, separator, skeleton, progress, kbd.

- [ ] **Step 2: Verify previews render correctly**

```bash
cd /home/aloks98/projects/rnui/apps/docs
pnpm dev
```

Check component pages — live previews should render with correct rnui theme.

- [ ] **Step 3: Commit**

```bash
cd /home/aloks98/projects/rnui
git add -A
git commit -m "docs: add live component previews to key pages"
```

---

### Task 4: Update Root Scripts and Verify Full Build

**Files:**
- Modify: `package.json` (root)

- [ ] **Step 1: Update root package.json scripts**

Update `docs:dev` and `docs:build` scripts:

```json
"docs:dev": "pnpm --filter @e412/docs dev",
"docs:build": "pnpm --filter @e412/docs build"
```

- [ ] **Step 2: Full build**

```bash
cd /home/aloks98/projects/rnui
pnpm docs:build
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: update root scripts for Fumadocs"
```
