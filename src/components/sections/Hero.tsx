'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { Tooltip } from '@/components/ui/Tooltip'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

export function Hero() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="top" className="page-pad pb-6 pt-2 md:pb-10">
      <div className="relative overflow-hidden rounded-[var(--radius-shell)] bg-bg-inverse text-fg-inverse">
        <div className="relative grid min-h-[calc(100dvh-var(--nav-h)-2rem)] md:grid-cols-[1.25fr_0.9fr]">
          {/* Copy column */}
          <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-14">
            <div className="flex flex-wrap items-center gap-3">
              <Tooltip content={profile.jokes.location}>
                <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-fg-inverse/10 px-3 py-1.5 type-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-inverse/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {profile.location}
                </span>
              </Tooltip>
              <span className="type-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-inverse/45">
                {profile.agency.name} · {profile.current.company}
              </span>
            </div>

            <div className="max-w-3xl py-14 md:py-16">
              <motion.h1
                className="type-display text-[clamp(2.75rem,8.5vw,6.5rem)] text-fg-inverse"
                initial={reduced ? false : { opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                I build AI products
                <br />
                that <span className="text-accent">ship.</span>
              </motion.h1>

              <motion.p
                className="mt-7 max-w-lg text-base text-fg-inverse/70 sm:text-lg"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {profile.subhead}
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap items-center gap-3"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href="/#contact"
                  title={profile.jokes.hire}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-fg-inverse px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-bg-inverse transition-opacity hover:opacity-90"
                >
                  Hire me
                  <span aria-hidden>↗</span>
                </Link>
                <Link
                  href="/#work"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-fg-inverse/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-fg-inverse transition-colors hover:border-fg-inverse"
                >
                  View work
                </Link>
              </motion.div>
            </div>

            <p className="type-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-inverse/50">
              FastAPI · Next.js · Claude · React Native · Flutter
            </p>
          </div>

          {/* Accent plane — Stodio-style media panel, sharp not blurred */}
          <div className="relative min-h-[16rem] md:min-h-full">
            <div className="absolute inset-0 bg-accent" />
            <div
              aria-hidden
              className="absolute inset-6 rounded-[calc(var(--radius-shell)-0.5rem)] border border-bg-inverse/20 sm:inset-8"
            />
            <div className="relative z-10 flex h-full min-h-[16rem] flex-col justify-between p-6 sm:p-8 md:p-10">
              <p className="type-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent-fg/80">
                Available for hire
              </p>
              <div>
                <p className="type-display text-[clamp(3rem,6vw,5rem)] text-accent-fg">
                  {profile.name}.
                </p>
                <p className="mt-3 max-w-[14rem] text-sm text-accent-fg/80">
                  {profile.role}
                </p>
              </div>
              <p className="type-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent-fg/70">
                Scroll ↓
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
