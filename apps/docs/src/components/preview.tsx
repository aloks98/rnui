'use client';

import { type ReactNode, useState } from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

export function Preview({
  children,
  code,
}: {
  children: ReactNode;
  code?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="not-prose w-full rounded-xl border border-fd-border/60 overflow-hidden bg-fd-card/50 shadow-sm">
      <div className="flex min-h-[150px] items-center justify-center bg-background p-6">
        {children}
      </div>
      {code && (
        <>
          <div className="border-t border-fd-border/60 px-4 py-2 flex items-center bg-fd-muted/30">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="text-sm text-fd-muted-foreground hover:text-fd-primary transition-colors cursor-pointer"
            >
              {open ? 'Hide Code' : 'Show Code'}
            </button>
          </div>
          {open && (
            <div className="border-t border-fd-border/60 [&_figure]:my-0 [&_figure]:rounded-none [&_figure]:border-0">
              <DynamicCodeBlock lang="tsx" code={code} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
