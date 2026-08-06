# design-sync notes

## The repo

- User: this is basically a shadcn-style system — Base UI primitives + shadcn/ui patterns + Tailwind CSS v4. Styling idiom is Tailwind utility classes over CSS custom properties from `@e412/rnui-themes` (OKLch, `data-theme`/`.dark` switchable).
- pnpm monorepo. `packages/react` (`@e412/rnui-react`, the DS), `packages/themes` (`@e412/rnui-themes`, CSS-only theme presets), Storybook at `apps/storybook`, docs at `apps/docs` (fumadocs MDX).
- Build both packages with root `pnpm run build` (themes first, then react — the root script already orders them).

## Config decisions ([GENERAL])

- `cfg` paths resolve relative to **PKG_DIR** (`packages/react`), not the repo root. That's why `docsDir` is `../../apps/docs/content/docs` and `entry` is `dist/index.mjs`. A repo-root-relative path silently prints `not found — skipped`.
- `--node-modules packages/react/node_modules` — it contains react/react-dom, so no need for the repo-root one.
- **No CSS ships in `packages/react/dist`** (Tailwind v4 compiles at app level, shadcn-style). `[CSS_FROM_STORYBOOK]` scrapes the compiled stylesheet out of `.design-sync/sb-reference` instead. This is the intended path here — do NOT set `cfg.cssEntry`.
- `titleMap` covers 4 storybook titles that aren't export names: `Resizable`→`ResizablePanelGroup`, `Sonner`→`Toaster`, `Advanced`(Charts/Advanced)→`EChart`, and `useFileUpload`→`null` (a hook, deliberately excluded).
- `docsMap` pins the 3 components whose doc filename doesn't slug-match: `ResizablePanelGroup`→resizable.mdx, `Sortable`→sortable-list.mdx, `Toaster`→sonner.mdx. Docs are 72/72 with these.
- `overrides.cardMode: "column"` on the wide components (charts, Card, Tabs, DateSelector, AspectRatio, CopyButton, ScrollArea, Stepper, EChart) and `"single"` on `Progress` (its stories flag GRID_OVERFLOW `escape`, which column can't fix).
- `overrides.Separator.skip: ["components-separator--horizontal"]` — that story is args-only (`<Separator orientation="horizontal" />` with no sized container), so a bare 1px rule collapses to nothing in storybook's centered canvas. It is `sb-error` in **storybook itself**, not a preview defect; `Default` and `Vertical` both match.
- `readmeHeader` resolves from the **config home** = the dir `.design-sync/` hangs off (the repo root), NOT PKG_DIR. So the value is `.design-sync/conventions.md`. (Different base from `docsDir`/`entry` — easy to get wrong; the build says `not found at the config home` when you do.)

## Known-benign warnings (triaged — do not re-chase)

- `! preview decorator bundle failed: Could not resolve "tailwindcss"` — `.storybook/preview.tsx` imports `../src/styles.css`, which `@import`s tailwindcss; esbuild can't resolve that. **Harmless here**: the decorators only toggle `.light`/`.dark` on `<html>` and set body colors. Light-theme tokens live on `:root` in `@e412/rnui-themes`, so unwrapped previews render exactly like the default (light) storybook. No React context is lost. `cfg.provider` is deliberately NOT set.
- `[TOKENS_MISSING]` for `--accordion-panel-height`, `--tw`, `--shiki-light`, `--shiki-dark`, `--shiki-light-bg`, `--shiki-dark-bg` — all injected at runtime (Base UI accordion measurement, a Tailwind internal, shiki's highlighter). Verified visually: CodeBlock's syntax highlighting renders correctly in previews.

## [GENERAL] Harness bug: `noscript` first-child causes a false `sb-error`

`compare.mjs`'s content wait is `SB_CONTENT = ':is(#storybook-root,#root) > :not(style,script,link,meta,template)'`.
Its own comment says the exclusion list exists so `waitForSelector` doesn't lock
onto a non-content first child — but `noscript` was omitted. `input-otp` renders
`createElement("noscript", …)` (its NoScriptCSSFallback) as the **first** child,
so the wait locked onto a 0×0 node, timed out after 8s, and both InputOTP stories
were falsely reported `sb-error: no storybook root content`.

Probe evidence: `#storybook-root` children are `[noscript 0×0, div 208×32]`; the
old selector's first match is `noscript`, the fixed one's is `div`.

**Fix applied:** added `noscript` to that exclusion list in
`.ds-sync/storybook/compare.mjs`. After it, both InputOTP stories capture and match.

⚠️ **`.ds-sync/` is gitignored and re-copied from the skill on every sync, so this
patch does NOT survive.** A future sync must re-apply it (or the skill upstream
must fix it) or InputOTP will falsely `sb-error` again. Do **not** "fix" it with
`cfg.overrides.InputOTP.skip` — the story is healthy. This can hit any story whose
root's first child is a `noscript`/hidden element.

## [GENERAL] echarts subpath imports must ride the bundle's own copy

`charts/advanced.stories.tsx` does `import { GaugeChart } from 'echarts/charts'` +
`echarts.use([GaugeChart])` at module scope. By default an unknown package subpath
is **bundled fresh** into `_preview/EChart.js`, so `echarts.use()` registered a
*second copy's* GaugeChart — a class extending a different echarts base — over the
working registration from `packages/react/src/components/charts/core.ts`. The gauge
then painted a blank canvas (with a `gauge exists.` double-registration warning)
while every other chart type was unaffected.

**Fix:** `"extraEntries": ["echarts/charts"]`. That bundles the subpath once into
`_ds_bundle.js` (esbuild dedupes it against the DS's own echarts, so it's the SAME
class) and, because the specifier is now an entry name, the story's import shims to
`window.RnuiReact` instead of bundling a copy. Verified: the CPU gauge renders
identically to storybook.

Note this defect was **preview-only** — the shipped `_ds_bundle.js` always had
GaugeChart registered correctly, so designs were never affected.

⚠️ `extraEntries` is part of the **global** grade slice (`configSlicesFor` in
`lib/sync-hashes.mjs`), so changing it clears **every** component's grade. If you
ever need to touch `extraEntries`/`storyImports`/`provider`, do it as early in a
campaign as possible. `overrides.<Name>.skip` is per-component; `cardMode`/
`primaryStory` are excluded from keying entirely.

## ⚠️ REPO BUG: percentage-width story roots are invisible in this repo's own Storybook

`apps/storybook/.storybook/preview.tsx` sets a **global `layout: 'centered'`**. A centered
storybook root is shrink-to-fit, so a story whose ROOT element has a percentage width
(`className="w-[60%]"`) resolves that width against a 0px parent — the element mounts with
the full Base UI DOM but measures **0px wide** and renders nothing visible. Base UI's
indicator even computes `--start-position: NaN%` / `Infinity%`.

Exactly 5 stories in 2 files hit this (`grep -rn 'w-\[[0-9]*%\]' apps/storybook/src/stories`):

- `slider.stories.tsx` → `Default`, `Range`
- `progress.stories.tsx` → `Default`, `Empty`, `Full`

**This is a defect in the repo, not in the sync.** The DS previews render these correctly
(see `ds-bundle/_screenshots/components__Slider.png` — track, filled range, thumbs at 50 and
25/75), so the shipped components are fine; only the storybook oracle is blind to them.

Because compare can't photograph a 0px reference, they are skipped via
`cfg.overrides.{Slider,Progress}.skip`. **Consequence: Slider has only those 2 stories, so its
picker card has no cells** (the component still ships with bundle, `.d.ts` and `.prompt.md`).

**The real fix is 1 line in the repo** — add `parameters: { layout: 'padded' }` to the meta of
`slider.stories.tsx` and `progress.stories.tsx` (exactly what `date-selector.stories.tsx`
already does, which is why its `w-full max-w-xl` stories render), or wrap the story in a
fixed-width box. After that, rebuild `.design-sync/sb-reference`, drop these two `skip`
entries, and re-verify — Slider gets a real card back.

## `[REFERENCE_STALE?]` after a converter-level config change is a false positive

That warn fires when the bundle hash moves but `.design-sync/sb-reference` doesn't.
Adding `extraEntries` changed the bundle **without any DS source change**, so it
fired spuriously. Verified: `packages/react/dist/index.mjs` predates
`sb-reference/iframe.html`, and `git status packages/react/src packages/themes
apps/storybook/src` was clean. Before rebuilding the reference (minutes), check
those two things — if the DS source really did move, rebuild both together.

## [GENERAL] Framing: `max-w-*` stories look wider in previews

Storybook's `layout: 'centered'` shrink-wraps an element to its intrinsic width
(a bare `<input>` ≈156px) while the preview page renders it at its full
`max-w-*` (e.g. `max-w-sm` = 384px). This affects most form components and is
**container width, not a component defect** — grade it as framing per the §4
rubric. Do not author an owned preview to "fix" it; that would permanently
shadow the generated one.

## [GENERAL] Grading gotcha: remote images need a warm CDN

Avatar stories load `https://github.com/shadcn.png`. On a cold connection that URL took ~15s here (redirect to avatars.githubusercontent.com); the preview panel hit its `networkidle` timeout and captured the **fallback initials** while the storybook panel got the real image — an asymmetric false mismatch that `[ASSETS_BLOCKED]` does NOT catch (that warn only fires when BOTH panels fail).

**Before grading any image-bearing story a mismatch**, warm the URL (`curl -sL -o /dev/null <url>` a few times) and recapture with `--force --components <Name>`. After warming, Avatar matched on all 5 stories.

## Re-sync risks

- **`.design-sync/sb-reference` and the package `dist/` must be rebuilt together.** Any change to `packages/react/src` or the stories requires both, or every grade compares against a stale reference (`[REFERENCE_STALE?]`).
- **Story caps.** Button was captured at `--max-stories 14` (full); BarChart (7) and CodeBlock (10) were graded on their first 6 stories only, as were other components with >6 stories. Their tail stories are trusted, never individually image-judged. If a tail story carries a distinct variant, raise `--max-stories` for it.
- **Component grouping is flat.** The picker gets 2 groups (`components`, `charts`) from the storybook titles. `apps/docs/content/docs/*/meta.json` has a much richer grouping (Layout / Forms / Data Display / Feedback / Navigation / Utilities), but the converter only reads a `category:` **frontmatter** key, and doc categories are only applied when the component's group is generic — storybook already supplies a named group, so it wins. Wiring the meta.json grouping would need forks of both `docs.mjs` and `source-storybook.mjs`; judged not worth the permanent fork surface. Revisit if the converter ever gains a `groupMap` config key.
- **`navigation-menu.mdx` is truncated** at the 8000-char doc cap (8077 → 8049). Harmless today; if that doc grows, the tail is what's lost from `NavigationMenu.prompt.md`.
- Dialog/overlay stories render only their trigger button on both panels (they need a click to open). That's faithful to the repo's own storybook, but the product card for those components shows only buttons.
