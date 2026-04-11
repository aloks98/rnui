'use client';

import { type ReactNode, useState } from 'react';

export function Preview({
  children,
  code,
}: {
  children: ReactNode;
  code?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="not-prose w-full rounded-xl border overflow-hidden">
      <div className="flex min-h-[150px] items-center justify-center bg-background p-6">
        {children}
      </div>
      {code && (
        <>
          <div className="border-t px-4 py-2 flex items-center">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {open ? 'Hide Code' : 'Show Code'}
            </button>
          </div>
          {open && (
            <div className="border-t bg-fd-secondary/50 overflow-x-auto">
              <pre className="p-4 text-sm">
                <code>{code}</code>
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}
