import type { ReactNode } from 'react';

export function Preview({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose flex min-h-[150px] w-full items-center justify-center rounded-xl border border-fd-border/60 bg-fd-card/50 p-6 shadow-sm">
      {children}
    </div>
  );
}
