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
