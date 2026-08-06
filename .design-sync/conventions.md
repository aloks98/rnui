# Building with rnui

rnui is a shadcn/ui-style system: Base UI primitives, styled with Tailwind CSS v4
utilities that resolve to OKLch CSS custom properties from `@e412/rnui-themes`.

## Setup — no theme provider

Theming is **pure CSS**. There is no `ThemeProvider` and nothing to wrap for
colors, fonts, or radius. Set attributes on a root element instead:

```jsx
const { Button, Card, CardHeader, CardTitle, CardContent } = window.RnuiReact;

// data-theme picks a preset; add `dark` for dark mode. Both are optional —
// omitting them gives the default warm-neutral light theme.
<div data-theme="ocean" className="bg-background text-foreground p-6">
  <Card>
    <CardHeader><CardTitle>Monthly revenue</CardTitle></CardHeader>
    <CardContent className="flex gap-3 items-center">
      <Button>Save</Button>
      <Button variant="outline">Cancel</Button>
    </CardContent>
  </Card>
</div>
```

Presets: `oxide`, `ocean`, `violet`, `forest`, `rose`, `amber`, `slate`,
`crimson`. Each changes colors, radius, and the `--font-sans`/`--font-heading`
values — but **their web fonts are not bundled**, so type falls back to the
system stack unless you load the font yourself. The default theme uses a system
stack by design and always renders correctly.

Three components need a wrapper, and only these three:

- `Tooltip*` — wrap the subtree in `TooltipProvider`, or tooltips never open.
- `Sidebar*` — wrap in `SidebarProvider` (`SidebarTrigger`/`useSidebar` need it).
- Toasts — render `<Toaster />` once near the root, then call `toast(...)`.

## The styling idiom — use only pre-compiled utilities

Tailwind v4 compiles at **build time**. There is no compiler here, so only the
utilities already in `_ds_bundle.css` resolve; an unlisted class silently does
nothing. Prefer library components for structure, and keep your own layout glue
inside these families:

| Concern | Available |
|---|---|
| Layout | `flex` `grid` `block` `inline-flex` `hidden`, `grid-cols-1..3`, `items-*`, `justify-*` |
| Gap | `gap-0` `gap-0.5` `gap-1` `gap-1.5` `gap-2` `gap-2.5` `gap-3` `gap-3.5` `gap-4` `gap-5` `gap-6` `gap-10` |
| Padding | `p-`/`px-`/`py-`/`pt-`/`pb-`/`pl-`/`pr-` at `0 1 2 2.5 3 4 6 8` (not every side has every step) |
| Margin | `m-`/`mx-`/`my-`/`mt-`/`mb-`/`ml-`/`mr-` at `0 0.5 1 2 3 4 5 10` |
| Stacking | `space-y-1` `space-y-2` `space-y-3` `space-y-4` `space-y-6` `space-y-8`, `space-x-1` `space-x-2` `space-x-4` |
| Type | `text-xs` `text-sm` `text-base` `text-lg` `text-2xl` `text-3xl`, `font-medium`, `font-semibold` |
| Radius | `rounded-xs` `rounded-sm` `rounded-md` `rounded-lg` `rounded-xl` `rounded-full` `rounded-none` |
| Color | `bg-`/`text-`/`border-` + `background` `foreground` `card` `popover` `primary` `secondary` `muted` `accent` `destructive` `success` `info` `warning` `border` `input` `ring` `sidebar`, plus `-foreground` pairs and `/10 /30 /50` opacities |

Never invent a color: `bg-primary` + `text-primary-foreground` always pair, and
the same holds for `card`, `popover`, `muted`, `accent`, `destructive`,
`success`, `info`, `warning`, `sidebar`.

For anything the table doesn't cover, use an inline style against a token rather
than an uncompiled class — tokens always resolve:

```jsx
<div style={{ marginTop: 'var(--radius-2xl)', color: 'var(--muted-foreground)' }} />
```

## Where the truth lives

- `styles.css` — the single entry; its `@import` closure is `tokens/*.css`
  (every theme preset) plus `_ds_bundle.css` (all component styles). Read
  `tokens/light.css` for the full custom-property list.
- `components/<group>/<Name>/<Name>.prompt.md` — real usage examples and variant
  tables for that component. Read it before composing anything non-obvious.
- `components/<group>/<Name>/<Name>.d.ts` — the exact prop contract.

Charts are echarts-based: `BarChart`, `LineChart`, `AreaChart`, `PieChart`,
`RadarChart`, `ScatterChart` for the common cases, and `EChart` with `echarts` +
`chartConfig` when you need a custom option object. They read `--chart-1`…
`--chart-5` from the active theme, so they restyle with `data-theme` for free.

`cn(...)` is exported for conditional class merging.
