import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex flex-col items-center justify-center text-center flex-1 gap-4">
        <h1 className="font-semibold text-3xl">@e412/rnui</h1>
        <p className="text-fd-muted-foreground text-lg max-w-md">
          A modern React component library built with Tailwind CSS.
        </p>
        <div className="flex gap-3 mt-2">
          <Link
            to="/docs/$"
            params={{ _splat: 'getting-started' }}
            className="px-4 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm"
          >
            Get Started
          </Link>
          <Link
            to="/docs/$"
            params={{ _splat: 'components/button' }}
            className="px-4 py-2 rounded-lg border border-fd-border font-medium text-sm"
          >
            Components
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}
