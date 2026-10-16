import { profile } from '@/data/profile'

/**
 * Soft doodle wallpaper — WhatsApp-chat energy.
 * One tile of line icons, repeated faintly behind the footer.
 */
function FooterWallpaper() {
  return (
    <div className="footer-wallpaper" aria-hidden="true">
      <svg className="footer-wallpaper-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="footer-doodle-tile"
            width="280"
            height="280"
            patternUnits="userSpaceOnUse"
          >
            {/* speech bubble */}
            <g transform="translate(18 22) rotate(-12)" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h28a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H16l-8 7v-7H4a6 6 0 0 1-6-6V10a6 6 0 0 1 6-6Z" transform="translate(6 0)" />
              <path d="M14 14h18M14 20h12" />
            </g>

            {/* coffee mug */}
            <g transform="translate(120 28) rotate(8)" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M4 8h16v18a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" />
              <path d="M20 12h4a5 5 0 0 1 0 10h-4" />
              <path d="M9 2c0 2.5 2.5 2.5 2.5 5M15 1c0 2.5 2.5 2.5 2.5 5" />
            </g>

            {/* star */}
            <g transform="translate(210 18) rotate(18)" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
              <path d="M14 2 16.5 10.5 25 11.2 18.5 16.8 20.5 25 14 20.5 7.5 25 9.5 16.8 3 11.2 11.5 10.5Z" />
            </g>

            {/* curly braces */}
            <g transform="translate(40 110) rotate(-6)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M12 2c-5 0-6 4-6 7.5S7.5 15 5 18s1.5 8 7 8" />
              <path d="M20 2c5 0 6 4 6 7.5S24.5 15 27 18s-1.5 8-7 8" />
            </g>

            {/* lightning / zap */}
            <g transform="translate(160 100) rotate(22)" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
              <path d="M14 2 4 16h8L8 30l16-18h-8L22 2Z" />
            </g>

            {/* code chevrons */}
            <g transform="translate(230 95) rotate(-14)" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 4 2 14l8 10M18 4l8 10-8 10" />
            </g>

            {/* sparkle dots */}
            <g transform="translate(90 150)" fill="currentColor">
              <circle cx="2" cy="2" r="1.2" />
              <circle cx="14" cy="8" r="0.9" />
              <circle cx="6" cy="16" r="1.1" />
            </g>

            {/* boom burst (small) */}
            <g transform="translate(20 190) rotate(10)" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round">
              <path d="M16 2 19 12l10 1.5-8 7 2.5 10L16 25l-7.5 5.5 2.5-10-8-7 10-1.5Z" />
            </g>

            {/* terminal prompt */}
            <g transform="translate(130 200) rotate(-8)" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round">
              <rect x="2" y="4" width="36" height="24" rx="3" />
              <path d="M10 16 14 20l-4 4M18 24h10" />
            </g>

            {/* paper plane */}
            <g transform="translate(220 185) rotate(28)" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round">
              <path d="M2 14 30 2 18 28 14 16Z" />
              <path d="M14 16 30 2" />
            </g>

            {/* speed ticks */}
            <g transform="translate(70 70) rotate(35)" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
              <path d="M2 4h18M0 10h22M4 16h14" />
            </g>

            {/* heart doodle */}
            <g transform="translate(180 155) rotate(-20)" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round">
              <path d="M12 22C4 15 2 10 2 7a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 3-2 8-10 15Z" />
            </g>

            {/* tiny ship tag */}
            <g transform="translate(95 235) rotate(6)" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <rect x="2" y="4" width="34" height="14" rx="2" />
              <path d="M8 11h6M18 11h12" />
            </g>

            {/* camera / frame */}
            <g transform="translate(245 230) rotate(-12)" fill="none" stroke="currentColor" strokeWidth="1.3">
              <rect x="2" y="6" width="22" height="16" rx="2" />
              <circle cx="13" cy="14" r="4" />
              <path d="M8 6 10 2h6l2 4" strokeLinecap="round" />
            </g>

            {/* plus spark */}
            <g transform="translate(55 250)" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
              <path d="M8 2v12M2 8h12" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-doodle-tile)" />
      </svg>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-comic page-pad relative overflow-hidden pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
      <FooterWallpaper />

      <div className="relative z-10 flex flex-col gap-5 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between sm:pt-12">
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
    </footer>
  )
}
