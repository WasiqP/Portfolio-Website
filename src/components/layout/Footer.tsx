import { profile } from '@/data/profile'

/** Decorative comic props — scattered like they fell on the floor. */
function ComicGround() {
  return (
    <div className="footer-ground" aria-hidden="true">
      <div className="footer-ground-floor" />

      {/* Speech bubble — tipped over */}
      <svg
        className="footer-prop footer-prop--bubble"
        viewBox="0 0 120 88"
        fill="none"
      >
        <path
          d="M12 12h84a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H48l-18 16v-16H12A10 10 0 0 1 2 56V22A10 10 0 0 1 12 12Z"
          fill="var(--bg)"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M28 34h52M28 48h36"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {/* POW stamp */}
      <svg
        className="footer-prop footer-prop--pow"
        viewBox="0 0 140 90"
        fill="none"
      >
        <path
          d="M70 6 82 34l30 4-22 20 6 30-26-14-26 14 6-30-22-20 30-4Z"
          fill="var(--accent)"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <text
          x="70"
          y="54"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="Poppins, sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="1"
        >
          POW
        </text>
      </svg>

      {/* Halftone blob */}
      <svg
        className="footer-prop footer-prop--dots"
        viewBox="0 0 80 56"
        fill="currentColor"
      >
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 7 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={8 + col * 10}
              cy={8 + row * 10}
              r={1.6 + ((row + col) % 3) * 0.35}
              opacity={0.35 + ((row * col) % 4) * 0.1}
            />
          ))
        )}
      </svg>

      {/* Speed lines scrap */}
      <svg
        className="footer-prop footer-prop--lines"
        viewBox="0 0 100 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M4 8h72M10 20h80M6 32h60" opacity="0.55" />
      </svg>

      {/* Coffee mug */}
      <svg
        className="footer-prop footer-prop--mug"
        viewBox="0 0 72 64"
        fill="none"
      >
        <path
          d="M10 14h38v34a10 10 0 0 1-10 10H20A10 10 0 0 1 10 48V14Z"
          fill="var(--bg)"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M48 22h8a10 10 0 0 1 0 20h-8"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M22 6c0 4 4 4 4 8s-4 4-4 8M32 4c0 4 4 4 4 8s-4 4-4 8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>

      {/* Ink blot */}
      <svg
        className="footer-prop footer-prop--ink"
        viewBox="0 0 90 50"
        fill="currentColor"
      >
        <path
          d="M12 28c4-14 18-22 32-20 10 1 16 6 22 4 8-2 14 6 12 14-2 10-12 16-28 18-18 2-32-2-38-8-4-4-4-6 0-8Z"
          opacity="0.18"
        />
        <circle cx="68" cy="12" r="3" opacity="0.25" />
        <circle cx="76" cy="22" r="2" opacity="0.2" />
      </svg>

      {/* Comic panel corner */}
      <svg
        className="footer-prop footer-prop--panel"
        viewBox="0 0 70 70"
        fill="none"
      >
        <rect
          x="6"
          y="6"
          width="52"
          height="52"
          fill="var(--bg)"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          d="M18 44 34 22l12 14 8-10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Star burst */}
      <svg
        className="footer-prop footer-prop--star"
        viewBox="0 0 64 64"
        fill="var(--accent)"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      >
        <path d="M32 4 38 24l20 2-16 12 6 20-16-10-16 10 6-20L4 26l20-2Z" />
      </svg>

      {/* Curly braces scrap */}
      <svg
        className="footer-prop footer-prop--braces"
        viewBox="0 0 56 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      >
        <path d="M22 6c-8 0-10 6-10 12s2 8-2 12 2 12 10 12" />
        <path d="M34 6c8 0 10 6 10 12s-2 8 2 12-2 12-10 12" />
      </svg>

      {/* BAM chip */}
      <svg
        className="footer-prop footer-prop--bam"
        viewBox="0 0 100 44"
        fill="none"
      >
        <rect
          x="4"
          y="6"
          width="92"
          height="32"
          rx="4"
          fill="var(--accent)"
          stroke="currentColor"
          strokeWidth="3"
          transform="rotate(-3 50 22)"
        />
        <text
          x="50"
          y="28"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="Poppins, sans-serif"
          fontWeight="900"
          fontSize="16"
          letterSpacing="2"
        >
          SHIP IT
        </text>
      </svg>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-comic page-pad relative overflow-hidden pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
      <div className="relative z-10 flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-sm">
          <p className="type-mono text-xs text-fg-muted">
            © {year} {profile.fullName}
          </p>
          <p className="mt-1.5 text-sm font-medium text-fg">
            {profile.jokes.location}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:justify-end">
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
            className="type-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-subtle transition-colors hover:text-fg"
            data-terminal-trigger
            aria-label="Open terminal"
          >
            Hit ` for the terminal
          </button>
        </div>
      </div>

      <ComicGround />
    </footer>
  )
}
