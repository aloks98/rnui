import type { ReactNode } from 'react';

export function Preview({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose flex min-h-[150px] w-full items-center justify-center rounded-xl border bg-background p-6">
      {children}
    </div>
  );
}
