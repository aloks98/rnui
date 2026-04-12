# rnui

A personal React component library with a rich theming system. Built on [Base UI](https://base-ui.com/), [shadcn/ui](https://ui.shadcn.com/) patterns, and Tailwind CSS v4.

```bash
pnpm add @e412/rnui-react @e412/rnui-themes
```

## Why

Most component libraries trade flexibility for consistency or the other way around. rnui tries to do both:

- **Consistency**: 70+ ready-made components, one import away
- **Flexibility**: swap the entire look (fonts, colors, radius) by setting a `data-theme` attribute — no rebuilds, no JS, just CSS
- **No AI-slop aesthetic**: deliberately avoids the default shadcn gray-on-white look. Ships opinionated themes with real personality

## Packages

| Package | Description |
| --- | --- |
| [`@e412/rnui-react`](./packages/react) | 70+ React components — buttons, forms, data grids, charts, drawers, command palettes |
| [`@e412/rnui-themes`](./packages/themes) | CSS themes — 8 built-in presets, OKLch color space, Tailwind v4 integration |

## Quick start

```css
/* app.css */
@import 'tailwindcss';
@import '@e412/rnui-themes';
@import '@e412/rnui-themes/presets';
@source "../node_modules/@e412/rnui-react/dist";
```

```html
<!-- Pick a theme -->
<html data-theme="ocean">

<!-- Dark mode -->
<html data-theme="ocean" class="dark">
```

```tsx
import { Button, Card, CardContent } from '@e412/rnui-react'

export function App() {
  return (
    <Card>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## Themes

Eight built-in presets, each with its own font pairing, border radius, and hue-harmonized palette:

| Theme | Personality | Font | Radius |
| --- | --- | --- | --- |
| **Oxide** | Editorial craft, warm copper | Bitter + DM Sans | `0.375rem` |
| **Ocean** | Smooth aquatic, deep teal | Plus Jakarta Sans | `0.875rem` |
| **Violet** | Luxury creative, rich purple | Outfit | `1rem` |
| **Forest** | Organic natural, deep emerald | Fraunces + Source Sans 3 | `0.5rem` |
| **Rose** | Soft & bubbly, warm pink | Nunito | `1.25rem` |
| **Amber** | Sharp & energetic, golden | Sora | `0.25rem` |
| **Slate** | Professional tech, cool blue-gray | Geist | `0.5rem` |
| **Crimson** | Brutalist bold, zero radius, scarlet | Instrument Sans | `0` |

Registering custom themes is just CSS:

```css
[data-theme="brand"] {
  --font-sans: 'My Brand Font', sans-serif;
  --radius: 0.75rem;
  --primary: oklch(0.55 0.2 180);
  /* anything not listed inherits from the defaults */
}

[data-theme="brand"].dark,
.dark [data-theme="brand"] {
  --primary: oklch(0.72 0.18 180);
}
```

See the [theming guide](./apps/docs/content/docs/theming.mdx) for the full token list and override patterns.

## Playground

Live demo of every theme applied to a real dashboard: run the docs site and open `/themes/`, or visit the deployed version.

```bash
pnpm install
pnpm docs:build    # builds the playground into docs/public/themes first
pnpm docs:dev
# → open http://localhost:3000/themes/
```

You can also run the playground on its own:

```bash
pnpm playground:dev
# → http://localhost:3001
```

## Repo layout

```
packages/
├── react/          # @e412/rnui-react — components
└── themes/         # @e412/rnui-themes — CSS themes
apps/
├── docs/           # Fumadocs + TanStack Start documentation site
├── storybook/      # Storybook for component development
└── theme-playground/  # Standalone theme demo (served at /themes/)
```

## Development

Requires Node 20+ and pnpm.

```bash
pnpm install        # install all workspaces
pnpm build          # build themes package, then react package
pnpm lint           # oxlint
pnpm format         # oxfmt
pnpm docs:dev       # run the docs site
pnpm storybook      # run Storybook
pnpm playground:dev # run the theme playground standalone
```

## Releases

Uses [Changesets](https://github.com/changesets/changesets) for versioning, with automated publishing via GitHub Actions.

### Day-to-day flow

When you make a change worth releasing, record it:

```bash
pnpm changeset      # pick packages, bump type, write a summary
git add .changeset/
git commit -m "..."
git push
```

### Automated release

The [`release` workflow](.github/workflows/release.yml) watches `main`:

1. If unreleased changesets exist → it opens/updates a **Version Packages** PR that bumps versions and generates changelogs
2. When that PR is merged → the workflow publishes the changed packages to npm with [provenance](https://docs.npmjs.com/generating-provenance-statements) enabled

No manual publish command needed on the main branch — merge the version PR, the bot handles the rest.

### Setup (one-time)

The release workflow requires an `NPM_TOKEN` secret:

1. Generate an npm automation token at [npmjs.com → Access Tokens](https://www.npmjs.com/settings/~/tokens) (choose **Automation** type)
2. Add it to GitHub at **Settings → Secrets and variables → Actions → New repository secret** as `NPM_TOKEN`

Provenance works automatically — the workflow already requests the `id-token: write` permission.

### Manual release (fallback)

If you need to cut a release outside CI:

```bash
pnpm release        # builds, versions, publishes
```

## License

MIT
