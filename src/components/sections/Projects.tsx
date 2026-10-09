'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

const ease = [0.16, 1, 0.3, 1] as const

export function Projects() {
  const reduced = usePrefersReducedMotion()
  const [open, setOpen] = useState<number | null>(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const active = open !== null ? projects[open] : null

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (open === i && !reduced) {
        void video.play().catch(() => {})
      } else {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [open, reduced])

  return (
    <section id="work" className="page-pad scroll-mt-[var(--nav-h)] py-[var(--section-y)]">
      <div className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="type-mono mb-3 text-xs uppercase tracking-[0.16em] text-fg-subtle">
            Selected work
          </p>
          <h2 className="type-display text-[clamp(2.15rem,8vw,4.75rem)]">
            Open a title.
          </h2>
        </div>
        <p className="max-w-xs type-description text-sm md:pb-1">
          Pick a case from the grid — the build unfolds below.
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {projects.map((project, i) => {
          const isOpen = open === i
          return (
            <li key={project.slug}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`group flex h-full min-h-[8.5rem] w-full flex-col justify-between rounded-[var(--radius-shell)] border p-5 text-left transition-colors duration-[var(--dur-base)] sm:min-h-[9.5rem] sm:p-6 ${
                  isOpen
                    ? 'border-accent bg-accent text-accent-fg'
                    : 'border-border-strong bg-bg hover:border-accent hover:bg-accent-soft'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`type-mono text-[0.65rem] ${
                      isOpen ? 'text-accent-fg/70' : 'text-fg-subtle'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 type-mono text-[0.55rem] uppercase tracking-[0.1em] transition-colors ${
                      isOpen
                        ? 'border-accent-fg/40 text-accent-fg'
                        : 'border-border text-fg-muted group-hover:border-accent group-hover:text-accent'
                    }`}
                  >
                    {isOpen ? 'Close' : 'Open'}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden
                      className={`transition-transform duration-[var(--dur-base)] ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      <path
                        d="M7 1.5v11M1.5 7h11"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>

                <div>
                  <span className="type-heading mt-4 block text-[clamp(1.35rem,2.5vw,1.85rem)] tracking-tight">
                    {project.title}
                  </span>
                  <span
                    className={`mt-1.5 block text-sm ${
                      isOpen ? 'text-accent-fg/75' : 'text-fg-muted'
                    }`}
                  >
                    {project.tagline}
                  </span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      <AnimatePresence initial={false} mode="wait">
        {active && open !== null ? (
          <motion.div
            key={active.slug}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease }}
            className="mt-4 overflow-hidden rounded-[var(--radius-shell)] border border-border-strong sm:mt-5"
          >
            <div className="grid lg:grid-cols-[1.4fr_0.9fr]">
              <div
                className="relative aspect-[16/10] sm:aspect-[16/9]"
                style={{ background: active.accent }}
              >
                {active.video ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[open] = el
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                    src={active.video}
                    muted
                    playsInline
                    loop
                    preload="metadata"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 type-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/70 sm:bottom-5 sm:left-5">
                  {active.year} · preview
                </p>
              </div>

              <div className="flex flex-col justify-between gap-6 bg-bg p-5 sm:gap-8 sm:p-8">
                <div>
                  <p className="type-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-subtle">
                    {active.role}
                  </p>
                  <h3 className="type-display mt-3 text-[clamp(1.85rem,4vw,2.75rem)]">
                    {active.title}
                  </h3>
                  <p className="type-subheading mt-3 text-xl text-fg">
                    {active.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted sm:text-base">
                    {active.description.length > 280
                      ? `${active.description.slice(0, 280).trim()}…`
                      : active.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {active.stack.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-border px-3 py-1 type-mono text-[0.6rem] text-fg-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                  <Link
                    href={`/projects/${active.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-bg-inverse px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-fg-inverse transition-opacity hover:opacity-90 sm:w-auto sm:px-6"
                  >
                    Full case
                    <span aria-hidden>↗</span>
                  </Link>
                  {open < projects.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setOpen(open + 1)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border-strong px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-fg transition-colors hover:bg-bg-soft sm:w-auto"
                    >
                      Next title
                      <span aria-hidden>→</span>
                    </button>
                  ) : null}
                  <a
                    href={profile.links.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent-fg transition-opacity hover:opacity-90 sm:w-auto"
                  >
                    Hire on Upwork
                    <span aria-hidden>↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-fg-muted transition-colors hover:text-fg sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
