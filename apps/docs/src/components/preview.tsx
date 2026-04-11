import type { ReactNode } from 'react';

export function Preview({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose group relative w-full rounded-xl border border-fd-border/60 bg-fd-card/30 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_1px_1px,_var(--color-fd-border)_0.5px,_transparent_0)] bg-[size:20px_20px] opacity-50 transition-opacity duration-300 group-hover:opacity-70" />
      <div className="relative flex min-h-[150px] items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}
