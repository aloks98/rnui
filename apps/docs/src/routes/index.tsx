import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { Button, Badge, Progress, Avatar, AvatarFallback, Input } from '@e412/rnui-react';

export const Route = createFileRoute('/')({
  component: Home,
});

function ComponentShowcase() {
  return (
    <div className="relative grid grid-cols-2 gap-3 p-1">
      <div className="animate-hero-card rounded-xl border bg-fd-card p-4 space-y-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: '400ms' }}>
        <div className="flex gap-2">
          <Button size="sm">Button</Button>
          <Button size="sm" variant="outline">Outline</Button>
        </div>
        <div className="flex gap-1.5">
          <Badge>Default</Badge>
          <Badge variant="secondary">Status</Badge>
        </div>
      </div>

      <div className="animate-hero-card rounded-xl border bg-fd-card p-4 space-y-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: '500ms' }}>
        <Progress value={75} />
        <div className="space-y-1.5">
          <div className="h-2 w-full rounded bg-fd-secondary" />
          <div className="h-2 w-4/5 rounded bg-fd-secondary" />
          <div className="h-2 w-3/5 rounded bg-fd-secondary" />
        </div>
      </div>

      <div className="animate-hero-card rounded-xl border bg-fd-card p-4 shadow-sm col-span-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: '600ms' }}>
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="h-2 w-24 rounded bg-fd-foreground/80" />
            <div className="h-1.5 w-16 rounded bg-fd-muted-foreground/40" />
          </div>
          <Button size="sm">Follow</Button>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Search components..." className="h-8 text-xs" />
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — Typography-driven message */}
          <div>
            <p className="animate-hero-text text-fd-muted-foreground text-sm font-medium tracking-widest uppercase mb-4" style={{ animationDelay: '0ms' }}>
              @e412/rnui
            </p>
            <h1 className="animate-hero-text text-5xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] mb-6" style={{ fontFamily: "'Instrument Serif', serif", animationDelay: '100ms' }}>
              Components
              <br />
              that feel{' '}
              <em className="text-fd-primary">alive</em>
            </h1>
            <p className="animate-hero-text text-fd-muted-foreground text-base max-w-sm mb-8 leading-relaxed" style={{ animationDelay: '200ms' }}>
              70+ React components built on Tailwind CSS. Accessible, themeable, and designed to have personality.
            </p>
            <div className="animate-hero-text flex gap-3 items-center" style={{ animationDelay: '300ms' }}>
              <Link
                to="/docs/$"
                params={{ _splat: '' }}
                className="h-11 px-6 rounded-xl bg-fd-primary text-fd-primary-foreground font-semibold text-sm flex items-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-px"
              >
                Get Started
              </Link>
              <Link
                to="/docs/$"
                params={{ _splat: 'components/button' }}
                className="h-11 px-6 rounded-xl border border-fd-border text-fd-foreground font-semibold text-sm flex items-center transition-all duration-200 hover:bg-fd-accent hover:-translate-y-0.5"
              >
                Browse Components
              </Link>
            </div>
          </div>

          {/* Right — Live component showcase */}
          <div className="relative">
            <div className="absolute inset-0 -m-4 rounded-2xl bg-[radial-gradient(circle_at_1px_1px,_var(--color-fd-border)_1px,_transparent_0)] bg-[size:24px_24px] opacity-50" />
            <div className="relative">
              <ComponentShowcase />
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
