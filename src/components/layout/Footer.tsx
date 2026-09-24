import { profile } from '@/data/profile'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="page-pad pb-8">
      <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-mono text-xs text-fg-muted">
          © {year} {profile.name}. Built with intent.
        </p>
        <button
          type="button"
          className="type-mono text-xs text-fg-subtle transition-colors hover:text-fg"
          data-terminal-trigger
          aria-label="Open terminal"
        >
          press ` to open terminal
        </button>
      </div>
    </footer>
  )
}
