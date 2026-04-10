# RNUI Docs Site Design

## Overview

Add a documentation website for the @e412/rnui component library using Fumadocs + TanStack Start (static SPA). Scaffolded via `create-fumadocs-app`. Lives at `apps/docs/` in the existing monorepo.

## Tech Stack

- **Framework:** TanStack Start (SPA, static site output)
- **Docs engine:** fumadocs-ui + fumadocs-core + fumadocs-mdx
- **Styling:** Tailwind v4 + Fumadocs built-in theme + @e412/rnui-themes (for component previews)
- **Dark mode:** Fumadocs built-in (next-themes under the hood)
- **Search:** Fumadocs built-in Orama (no external service)
- **Scaffolding:** `create-fumadocs-app` CLI with TanStack Start option

## Setup

- Scaffold with `create-fumadocs-app` selecting TanStack Start framework
- App lives at `apps/docs/`
- Static SPA output — no SSR
- Workspace dependencies on `@e412/rnui-react` and `@e412/rnui-themes`
- Adapt file structure to whatever the CLI generates rather than prescribing it

## Content Structure

```
content/docs/
├── index.mdx               (quick start)
├── getting-started.mdx
├── theming.mdx
├── components/
│   ├── meta.json           (sidebar ordering)
│   ├── button.mdx
│   ├── card.mdx
│   └── ... (65+ component pages)
├── charts/
│   ├── meta.json
│   └── ... (8 chart pages)
└── utilities/
    ├── meta.json
    └── ... (3 utility pages)
```

## Sidebar Categories

- Getting Started
- Theming
- Components
  - Layout (6): AspectRatio, Card, Resizable, ScrollArea, Separator, Collapsible
  - Forms (25): Button, ButtonGroup, Input, InputGroup, InputOTP, Select, NativeSelect, Textarea, Checkbox, Switch, Toggle, ToggleGroup, RadioGroup, Slider, NumberField, Combobox, Autocomplete, Command, Label, ColorPicker, DateSelector, DatePicker, Calendar, FileUpload, Filters
  - Data Display (20): Table, DataGrid, Tabs, Accordion, Breadcrumb, Pagination, Tree, Timeline, Stepper, StatusIndicator, Empty, EmptyState, KBD, Skeleton, JsonViewer, StatCard, Avatar, Badge, HoverCard, Tooltip
  - Feedback (9): Alert, AlertDialog, Dialog, Drawer, Sheet, Popover, Toast (Sonner), Spinner, Progress
  - Navigation (5): DropdownMenu, ContextMenu, NavigationMenu, Menubar, Sidebar
- Charts (8): BarChart, LineChart, AreaChart, PieChart, RadarChart, ScatterChart, EChart, Chart (wrapper)
- Utilities (3): CodeBlock, CopyButton, SortableList

## Component Page Pattern

Each component MDX page follows this structure:

1. **Description** — brief explanation of what the component does and when to use it
2. **Import snippet** — copy-pasteable import statement
3. **Default preview** — `<Preview>` block showing the basic usage
4. **Variants/sizes** — grouped smartly (e.g., one preview showing all button variants side by side, one showing all sizes)
5. **Real-world examples** — practical usage scenarios (e.g., "Button in a form", "Dialog with form content", "Card with image and actions")
6. **Props reference** — table of props with types and defaults

Examples are grouped smartly: instead of showing every combination individually, group related variants into single previews (all variants in one block, all sizes in another) and add practical real-world usage examples.

## Preview Component

A `<Preview>` React component wraps live examples in docs:

```tsx
<Preview>
  <Button variant="outline">Click me</Button>
</Preview>
```

- Bordered container with padding
- Renders children directly — no iframes, no sandboxing
- Works natively since Fumadocs on TanStack Start supports React components in MDX
- Inherits dark mode from Fumadocs theme toggle

## Landing Page

Compact animated hero:
- **Animated gradient headline** — "Build beautiful interfaces" with CSS shifting color gradient (no JS animation library)
- **One-line tagline** — "A modern, accessible React component library built on Tailwind CSS"
- **Two CTA buttons** — "Get Started" (primary, links to /docs) and "Browse Components" (outline, links to /docs/components)
- **Subtle background animation** — grid pattern or radial gradient pulse
- **Nothing below the hero** — page ends, docs sidebar takes over on click-through

## General Pages

### Quick Start (index.mdx)
- Install command (`pnpm add @e412/rnui-react @e412/rnui-themes`)
- CSS setup (importing themes + tw-animate-css)
- Tailwind v4 integration
- Dark mode setup
- Quick example with a Button component

### Getting Started (getting-started.mdx)
- Prerequisites (React 18+, Tailwind v4)
- Detailed installation walkthrough
- Project setup step by step
- First component usage

### Theming (theming.mdx)
- How the theme system works (CSS variables + Tailwind v4 @theme inline)
- Available tokens (colors, radius, spacing)
- Light/dark mode switching
- Creating custom themes (override CSS variables)
- OKLch color space explanation

## Dependencies

```json
{
  "@e412/rnui-react": "workspace:*",
  "@e412/rnui-themes": "workspace:*",
  "fumadocs-core": "latest",
  "fumadocs-mdx": "latest",
  "fumadocs-ui": "latest",
  "@tanstack/react-start": "latest",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwindcss": "^4.0.0",
  "tw-animate-css": "^1.0.0",
  "lucide-react": "^0.500.0"
}
```

## Key Decisions

- **TanStack Start over Next.js** — static SPA, simpler deployment, no server needed
- **Fumadocs default theme** — customization deferred to later; use built-in styling for now
- **No interactive props playground** — just visual previews with code, keep it simple
- **Smart grouping** — variants/sizes shown together in one preview, not one-per-combination
- **Scaffold-first approach** — use `create-fumadocs-app` CLI, adapt to generated structure
