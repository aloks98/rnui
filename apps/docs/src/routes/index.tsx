import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export const Route = createFileRoute('/')({
  component: Home,
});

function ComponentShowcase() {
  return (
    <div className="relative grid grid-cols-2 gap-3 p-1">
      {/* Fake component cards that hint at the library */}
      <div className="rounded-xl border bg-fd-card p-4 space-y-2 shadow-sm">
        <div className="flex gap-2">
          <div className="h-8 px-4 rounded-lg bg-fd-primary text-fd-primary-foreground text-xs font-medium flex items-center">Button</div>
          <div className="h-8 px-4 rounded-lg border border-fd-border text-fd-foreground text-xs font-medium flex items-center">Outline</div>
        </div>
        <div className="flex gap-1.5">
          <div className="h-6 px-3 rounded-md bg-fd-secondary text-fd-secondary-foreground text-[10px] font-medium flex items-center">Badge</div>
          <div className="h-6 px-3 rounded-md bg-fd-primary/10 text-fd-primary text-[10px] font-medium flex items-center">Status</div>
        </div>
      </div>

      <div className="rounded-xl border bg-fd-card p-4 space-y-2 shadow-sm">
        <div className="h-2.5 w-full rounded-full bg-fd-secondary overflow-hidden">
          <div className="h-full w-3/4 rounded-full bg-fd-primary" />
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-full rounded bg-fd-secondary" />
          <div className="h-2 w-4/5 rounded bg-fd-secondary" />
          <div className="h-2 w-3/5 rounded bg-fd-secondary" />
        </div>
      </div>

      <div className="rounded-xl border bg-fd-card p-4 shadow-sm col-span-2">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-8 rounded-full bg-fd-primary/15 flex items-center justify-center text-fd-primary text-xs font-bold">A</div>
          <div className="flex-1 space-y-1">
            <div className="h-2 w-24 rounded bg-fd-foreground/80" />
            <div className="h-1.5 w-16 rounded bg-fd-muted-foreground/40" />
          </div>
          <div className="h-7 px-3 rounded-lg bg-fd-primary text-fd-primary-foreground text-[10px] font-medium flex items-center">Follow</div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-8 rounded-lg border border-fd-input bg-transparent px-3 flex items-center text-fd-muted-foreground text-[10px]">Search components...</div>
          <div className="h-8 w-8 rounded-lg bg-fd-secondary flex items-center justify-center text-fd-muted-foreground text-xs">⌘</div>
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
            <p className="text-fd-muted-foreground text-sm font-medium tracking-widest uppercase mb-4">
              @e412/rnui
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Components
              <br />
              that feel{' '}
              <em className="text-fd-primary">alive</em>
            </h1>
            <p className="text-fd-muted-foreground text-base max-w-sm mb-8 leading-relaxed">
              70+ React components built on Tailwind CSS. Accessible, themeable, and designed to have personality.
            </p>
            <div className="flex gap-3 items-center">
              <Link
                to="/docs/$"
                params={{ _splat: '' }}
                className="h-11 px-6 rounded-xl bg-fd-primary text-fd-primary-foreground font-semibold text-sm flex items-center transition-transform active:translate-y-px"
              >
                Get Started
              </Link>
              <Link
                to="/docs/$"
                params={{ _splat: 'components/button' }}
                className="h-11 px-6 rounded-xl border border-fd-border text-fd-foreground font-semibold text-sm flex items-center transition-colors hover:bg-fd-accent"
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
