# @e412/rnui-themes

CSS themes for [`@e412/rnui-react`](../react) — 8 built-in presets, a `data-theme` attribute system, full Tailwind CSS v4 integration, and the OKLch color space for perceptually uniform palettes.

```bash
pnpm add @e412/rnui-themes
```

## Quick start

```css
@import 'tailwindcss';
@import '@e412/rnui-themes';
```

That gives you the warm-neutral default theme. Add presets to unlock the built-in themes:

```css
@import '@e412/rnui-themes';
@import '@e412/rnui-themes/presets';
```

```html
<html data-theme="ocean">
```

## Built-in presets

| Theme | Personality | Font | Radius |
| --- | --- | --- | --- |
| `oxide` | Editorial craft, warm copper | Bitter + DM Sans | `0.375rem` |
| `ocean` | Smooth aquatic, deep teal | Plus Jakarta Sans | `0.875rem` |
| `violet` | Luxury creative, rich purple | Outfit | `1rem` |
| `forest` | Organic natural, deep emerald | Fraunces + Source Sans 3 | `0.5rem` |
| `rose` | Soft & bubbly, warm pink | Nunito | `1.25rem` |
| `amber` | Sharp & energetic, golden | Sora | `0.25rem` |
| `slate` | Professional tech, blue-gray | Geist | `0.5rem` |
| `crimson` | Brutalist bold, scarlet | Instrument Sans | `0` |

Themes declare `--font-sans` and sometimes `--font-heading`, but **don't load the fonts** — that's your choice (Google Fonts, `next/font`, self-hosted). Each preset's CSS file documents the Google Fonts URL in its header comment.

## Dark mode

The docs and most apps expect a `.dark` class on `<html>`:

```html
<html data-theme="ocean" class="dark">
```

You can also scope themes to containers:

```html
<div data-theme="rose">...</div>
```

## Custom themes

Define any `[data-theme="..."]` selector in your CSS:

```css
@import '@e412/rnui-themes';
@import '@e412/rnui-themes/presets';

[data-theme="brand"] {
  --font-sans: 'My Brand Font', sans-serif;
  --radius: 0.75rem;
  --primary: oklch(0.55 0.2 180);
  --primary-foreground: oklch(0.97 0.01 180);
  /* Anything not listed inherits from the defaults */
}

[data-theme="brand"].dark,
.dark [data-theme="brand"] {
  --primary: oklch(0.72 0.18 180);
  --primary-foreground: oklch(0.15 0.03 180);
}
```

## Extending a preset

Since themes are plain CSS, your overrides cascade naturally:

```css
@import '@e412/rnui-themes/presets';

/* Start from Ocean, customize the primary */
[data-theme="ocean"] {
  --primary: oklch(0.48 0.15 220);
}
```

## Runtime switching

```ts
document.documentElement.dataset.theme = 'violet'
```

## Available tokens

**Colors**: `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--success`, `--info`, `--warning`, `--border`, `--input`, `--ring`, `--focus`, `--invert` — each with a matching `-foreground` pair.

**Charts**: `--chart-1` through `--chart-5` — each theme tunes these to harmonize with its primary hue.

**Sidebar**: `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-border`, `--sidebar-ring`.

**Shape**: `--radius`. Derived sizes (`--radius-sm` through `--radius-4xl`) are computed via `@theme inline`.

**Typography**: `--font-sans`, `--font-heading` (falls back to `--font-sans`).

## Imports

```css
@import '@e412/rnui-themes';          /* everything: base + light + dark */
@import '@e412/rnui-themes/base';     /* reset + body font + heading */
@import '@e412/rnui-themes/light';    /* light variables on :root */
@import '@e412/rnui-themes/dark';     /* dark variables on .dark */
@import '@e412/rnui-themes/presets';  /* all 8 presets as [data-theme] */

/* Individual presets (sets :root directly — use for single-theme apps) */
@import '@e412/rnui-themes/oxide';
@import '@e412/rnui-themes/ocean';
@import '@e412/rnui-themes/violet';
@import '@e412/rnui-themes/forest';
@import '@e412/rnui-themes/rose';
@import '@e412/rnui-themes/amber';
@import '@e412/rnui-themes/slate';
@import '@e412/rnui-themes/crimson';
```

## License

MIT
