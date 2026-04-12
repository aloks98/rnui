import { useEffect, useState } from 'react'
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Avatar,
  AvatarFallback,
  Progress,
  Separator,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Alert,
  AlertTitle,
  AlertDescription,
  StatusIndicator,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  BarChart,
  AreaChart,
  PieChart,
  Checkbox,
  Slider,
} from '@e412/rnui-react'

// ---------------------------------------------------------------------------
// Theme metadata
// ---------------------------------------------------------------------------

interface ThemeInfo {
  id: string
  name: string
  tagline: string
  font: string
  radius: string
  fontUrl: string
}

const themes: readonly ThemeInfo[] = [
  { id: 'oxide', name: 'Oxide', tagline: 'Editorial Craft', font: 'Bitter + DM Sans', radius: '0.375rem', fontUrl: 'https://fonts.googleapis.com/css2?family=Bitter:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap' },
  { id: 'ocean', name: 'Ocean', tagline: 'Smooth Aquatic', font: 'Plus Jakarta Sans', radius: '0.875rem', fontUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap' },
  { id: 'violet', name: 'Violet', tagline: 'Luxury Creative', font: 'Outfit', radius: '1rem', fontUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap' },
  { id: 'forest', name: 'Forest', tagline: 'Organic Natural', font: 'Fraunces + Source Sans 3', radius: '0.5rem', fontUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Source+Sans+3:wght@400;500;600;700&display=swap' },
  { id: 'rose', name: 'Rose', tagline: 'Soft & Bubbly', font: 'Nunito', radius: '1.25rem', fontUrl: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap' },
  { id: 'amber', name: 'Amber', tagline: 'Sharp & Energetic', font: 'Sora', radius: '0.25rem', fontUrl: 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap' },
  { id: 'slate', name: 'Slate', tagline: 'Professional Tech', font: 'Geist', radius: '0.5rem', fontUrl: 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&display=swap' },
  { id: 'crimson', name: 'Crimson', tagline: 'Brutalist Bold', font: 'Instrument Sans', radius: '0', fontUrl: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap' },
] as const

// ---------------------------------------------------------------------------
// Chart data
// ---------------------------------------------------------------------------

const barData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 3800 },
  { name: 'Mar', value: 5100 },
  { name: 'Apr', value: 4600 },
  { name: 'May', value: 5800 },
  { name: 'Jun', value: 6200 },
]

const areaCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const areaSeries = [
  { name: 'Revenue', data: [4200, 3800, 5100, 4600, 5800, 6200], smooth: true },
  { name: 'Expenses', data: [3100, 2900, 3400, 3200, 3800, 4100], smooth: true },
]

const pieData = [
  { name: 'Direct', value: 42 },
  { name: 'Organic', value: 28 },
  { name: 'Referral', value: 18 },
  { name: 'Social', value: 12 },
]

// ---------------------------------------------------------------------------
// Pre-load fonts for all themes (runs once at app start, before React mounts)
// ---------------------------------------------------------------------------

function preloadThemeFonts() {
  if (typeof document === 'undefined') return
  for (const theme of themes) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = theme.fontUrl
    document.head.appendChild(link)
  }
}
preloadThemeFonts()

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

function App() {
  const [activeThemeId, setActiveThemeId] = useState<string>(() => {
    // Read whatever data-theme was set in index.html as the initial value
    return document.documentElement.getAttribute('data-theme') ?? 'oxide'
  })
  const [isDark, setIsDark] = useState(false)

  const theme = themes.find((t) => t.id === activeThemeId) ?? themes[0]

  // Apply data-theme synchronously during render — BEFORE child components'
  // useMemo runs. Charts compute gradient colors from CSS variables inside
  // useMemo during render, so the attribute must be set first. The condition
  // makes this safe and idempotent across re-renders and strict mode.
  if (
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-theme') !== theme.id
  ) {
    document.documentElement.setAttribute('data-theme', theme.id)
  }

  useEffect(() => {
    const html = document.documentElement
    if (isDark) html.classList.add('dark')
    else html.classList.remove('dark')
  }, [isDark])

  // Force chart re-mount so ECharts re-reads CSS variables with the new theme
  const chartKey = `${theme.id}-${isDark ? 'dark' : 'light'}`

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-sm font-medium text-muted-foreground transition-opacity hover:opacity-70"
            >
              ← Back to docs
            </a>
            <Separator orientation="vertical" className="h-5" />
            <h1
              className="text-lg font-semibold"
              style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}
            >
              Theme Playground
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground sm:inline-block">
              {theme.font}
            </span>
            <span className="hidden rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground sm:inline-block">
              radius: {theme.radius || '0'}
            </span>

            <Select value={activeThemeId} onValueChange={(v) => v && setActiveThemeId(v)}>
              <SelectTrigger className="w-52">
                <span className="flex-1 text-left">{theme.name}</span>
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name} <span className="text-xs opacity-60">— {t.tagline}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{isDark ? '🌙' : '☀️'}</span>
              <Switch checked={isDark} onCheckedChange={setIsDark} />
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          {[
            { title: 'Revenue', value: '$12,480', trend: 12.5, positive: true },
            { title: 'Users', value: '2,847', trend: 8.2, positive: true },
            { title: 'Orders', value: '1,234', trend: 3.1, positive: true },
            { title: 'Open Issues', value: '3', trend: 2, positive: false },
          ].map((stat) => (
            <Card key={stat.title}>
              <CardContent className="px-4 pt-0">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}
                >
                  {stat.value}
                </p>
                <div className="flex items-center gap-1 text-xs">
                  <StatusIndicator state={stat.positive ? 'active' : 'down'} size="sm" />
                  <span className={stat.positive ? 'text-success-foreground' : 'text-destructive-foreground'}>
                    +{stat.trend}%
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}>
                Revenue Overview
              </CardTitle>
              <CardDescription>Monthly revenue and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart key={chartKey} categories={areaCategories} series={areaSeries} gradient height={260} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}>
                Traffic Sources
              </CardTitle>
              <CardDescription>Where users come from</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart key={chartKey} data={pieData} donut height={260} />
            </CardContent>
          </Card>
        </div>

        {/* Activity + Bar */}
        <div className="mb-6 grid grid-cols-5 gap-4">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}>
                Recent Activity
              </CardTitle>
              <CardDescription>Latest deployments and system events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Deploy v2.4.1', state: 'active' as const, badge: 'success' as const, label: 'Success', time: '2m ago' },
                { name: 'API migration', state: 'fixing' as const, badge: 'warning' as const, label: 'Pending', time: '15m ago' },
                { name: 'Auth service restart', state: 'down' as const, badge: 'destructive' as const, label: 'Error', time: '1h ago' },
                { name: 'Database backup', state: 'idle' as const, badge: 'info' as const, label: 'Running', time: '2h ago' },
                { name: 'CDN cache purge', state: 'active' as const, badge: 'success' as const, label: 'Done', time: '3h ago' },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <StatusIndicator state={item.state} size="sm" />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                  <Badge variant={item.badge}>{item.label}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}>
                Monthly Sales
              </CardTitle>
              <CardDescription>Units sold per month</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart key={chartKey} data={barData} height={220} />
            </CardContent>
          </Card>
        </div>

        {/* Components Row */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}>
                Buttons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}>
                Form Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Email address" />
              <Input placeholder="Password" type="password" />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="demo-terms" defaultChecked />
                  <label htmlFor="demo-terms" className="text-sm">Accept terms</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="demo-news" />
                  <label htmlFor="demo-news" className="text-sm">Subscribe to newsletter</label>
                </div>
              </div>
              <Slider defaultValue={[65]} max={100} />
              <div className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}>
                Badges & More
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Error</Badge>
                <Badge variant="focus">Focus</Badge>
                <Badge variant="invert">Invert</Badge>
              </div>
              <Separator />
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Details</TabsTrigger>
                  <TabsTrigger value="tab2">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="pt-3">
                  <div className="space-y-2">
                    <Progress value={75} />
                    <p className="text-xs text-muted-foreground">75% of storage used</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2" className="pt-3">
                  <p className="text-xs text-muted-foreground">Settings content</p>
                </TabsContent>
              </Tabs>
              <Alert>
                <AlertTitle>System Update</AlertTitle>
                <AlertDescription>Maintenance Saturday 2:00 AM UTC.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}>
                User Profile
              </CardTitle>
              <CardDescription>Preview with avatars</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Alok Kumar</p>
                  <p className="text-xs text-muted-foreground">alok@example.com</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Jane Smith</p>
                  <p className="text-xs text-muted-foreground">jane@example.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}>
                Status Metrics
              </CardTitle>
              <CardDescription>System health at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Storage</span>
                  <span className="text-muted-foreground">75%</span>
                </div>
                <Progress value={75} />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Bandwidth</span>
                  <span className="text-muted-foreground">42%</span>
                </div>
                <Progress value={42} />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span className="text-muted-foreground">89%</span>
                </div>
                <Progress value={89} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ fontFamily: 'var(--font-heading, var(--font-sans))' }}>
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email alerts</span>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">Push notifications</span>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">Weekly digest</span>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default App
