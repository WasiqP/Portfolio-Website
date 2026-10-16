export default function ProjectLoading() {
  return (
    <div className="bg-bg pb-[var(--section-y)]" aria-busy="true" aria-live="polite">
      <div className="sticky top-[var(--nav-h)] z-40 border-b border-border bg-bg/95 backdrop-blur-md">
        <div className="page-pad flex h-14 items-center">
          <div className="h-9 w-36 animate-pulse rounded-full bg-bg-soft" />
        </div>
      </div>

      <div className="page-pad pt-4 md:pt-6">
        <div className="overflow-hidden rounded-[var(--radius-shell)] bg-bg-inverse">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8">
            <div className="h-3 w-24 animate-pulse rounded bg-white/15" />
            <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
          </div>
          <div className="grid gap-8 p-6 sm:p-8 md:p-12 lg:grid-cols-2 lg:p-14">
            <div className="space-y-4">
              <div className="h-3 w-40 animate-pulse rounded bg-accent/40" />
              <div className="h-10 w-4/5 max-w-md animate-pulse rounded bg-white/15" />
              <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white/10" />
              <div className="h-4 w-3/4 max-w-md animate-pulse rounded bg-white/10" />
            </div>
            <div className="aspect-video animate-pulse rounded-2xl bg-white/10" />
          </div>
        </div>

        <p className="mt-8 text-center type-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg-subtle">
          Loading case study…
        </p>
      </div>
    </div>
  )
}
