import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex flex-col items-center justify-center text-center flex-1 px-4 py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 animate-hero-gradient bg-gradient-to-r from-fd-primary via-purple-500 to-blue-500 bg-[length:200%_auto] bg-clip-text text-transparent">
          Build beautiful interfaces
        </h1>
        <p className="text-fd-muted-foreground text-lg max-w-md mb-8">
          A modern, accessible React component library built on Tailwind CSS.
        </p>
        <div className="flex gap-3">
          <Link
            to="/docs/$"
            params={{ _splat: '' }}
            className="px-5 py-2.5 rounded-lg bg-fd-primary text-fd-primary-foreground font-semibold text-sm"
          >
            Get Started
          </Link>
          <Link
            to="/docs/$"
            params={{ _splat: 'components/button' }}
            className="px-5 py-2.5 rounded-lg border border-fd-border text-fd-foreground font-semibold text-sm"
          >
            Browse Components
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}
