import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">@e412/rnui</h1>
      <p className="max-w-md text-lg text-muted-foreground">
        65+ React components, 6 chart types, and a complete theme system — built on shadcn/ui and Base UI.
      </p>
      <div className="flex gap-3">
        <Link
          href="/docs/getting-started"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Get Started
        </Link>
        <Link
          href="/docs/components/button"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Browse Components
        </Link>
      </div>
    </main>
  )
}
