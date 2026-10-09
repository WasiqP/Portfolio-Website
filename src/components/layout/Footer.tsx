import { profile } from '@/data/profile'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="page-pad pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-mono text-xs text-fg-muted">
          © {year} {profile.name}. Built with intent.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-6">
          <a
            href={profile.links.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="type-mono text-xs font-semibold uppercase tracking-[0.1em] text-accent transition-opacity hover:opacity-80"
          >
            Hire on Upwork ↗
          </a>
          <a
            href={profile.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="type-mono text-xs font-semibold uppercase tracking-[0.1em] text-fg-muted transition-colors hover:text-accent"
          >
            Instagram ↗
          </a>
          <button
            type="button"
            className="type-mono text-xs text-fg-subtle transition-colors hover:text-fg"
            data-terminal-trigger
            aria-label="Open terminal"
          >
            press ` to open terminal
          </button>
        </div>
      </div>
    </footer>
  )
}
