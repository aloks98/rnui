# @e412/rnui-react

70+ React components built on [Base UI](https://base-ui.com/) primitives and Tailwind CSS v4. Headless accessibility from Base UI, shadcn/ui-style composability, distinctive themes from [`@e412/rnui-themes`](../themes).

```bash
pnpm add @e412/rnui-react @e412/rnui-themes
```

## Peer dependencies

- `react` ≥ 18
- `react-dom` ≥ 18
- `tailwindcss` ≥ 4
- `@e412/rnui-themes`

## Usage

```tsx
import { Button, Card, Input, DataGrid } from '@e412/rnui-react'
```

Make sure Tailwind scans the library for classes:

```css
@source "../node_modules/@e412/rnui-react/dist";
```

## What's included

- **Layout**: Card, Separator, ScrollArea, Resizable, AspectRatio, Collapsible
- **Forms**: Button, Input, Select, Combobox, DatePicker, Slider, Checkbox, Switch, RadioGroup, NumberField, InputOTP, ColorPicker, and more
- **Data**: Table, DataGrid (virtual, DnD), Tree, Timeline, Stepper, Pagination, JSON viewer
- **Feedback**: Alert, Dialog, Drawer, Sheet, Popover, Tooltip, Sonner toasts, Progress, Skeleton, Spinner
- **Navigation**: Tabs, Breadcrumb, Sidebar, NavigationMenu, Menubar, ContextMenu, DropdownMenu, Carousel
- **Charts**: Bar, Line, Area, Pie, Radar, Scatter (ECharts-based, themed automatically)
- **Utilities**: CodeBlock, CopyButton, Avatar, Badge, StatusIndicator, Kbd, Tag

See the full component list and examples on the [docs site](https://github.com/aloks98/rnui).

## License

MIT
