'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { services } from '@/data/services'
import { profile } from '@/data/profile'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

const ease = [0.16, 1, 0.3, 1] as const

export function Services() {
  const reduced = usePrefersReducedMotion()
  const [activeId, setActiveId] = useState(services[0]?.id ?? '')
  const active =
    services.find((s) => s.id === activeId) ?? services[0]
  const activeIndex = services.findIndex((s) => s.id === active.id)

  return (
    <section id="services" className="page-pad scroll-mt-[var(--nav-h)] py-[var(--section-y)]">
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="type-mono mb-3 text-xs uppercase tracking-[0.16em] text-fg-subtle">
            Services
          </p>
          <h2 className="type-display max-w-3xl text-[clamp(2.15rem,8vw,4.75rem)]">
            What I can
            <br />
            <span className="text-accent">build</span> for you.
          </h2>
        </div>
        <p className="max-w-xs type-description text-sm md:pb-1">
          Hover or tap a lane. Full scope, stack, and deliverables — one focus
          at a time.
        </p>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-shell)] border border-border bg-bg-inverse text-fg-inverse">
        <div className="flex gap-2 overflow-x-auto border-b border-fg-inverse/10 p-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:p-4 md:grid md:grid-cols-3 md:gap-2 lg:grid-cols-6">
          {services.map((service, i) => {
            const on = service.id === active.id
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveId(service.id)}
                onMouseEnter={() => {
                  if (
                    !reduced &&
                    window.matchMedia('(min-width: 768px)').matches
                  ) {
                    setActiveId(service.id)
                  }
                }}
                className={`relative min-w-[9.5rem] shrink-0 rounded-xl px-4 py-4 text-left transition-colors md:min-w-0 ${
                  on
                    ? 'bg-accent text-accent-fg'
                    : 'bg-fg-inverse/5 text-fg-inverse/55 hover:bg-fg-inverse/10 hover:text-fg-inverse/85'
                }`}
              >
                <span className="type-mono text-[0.6rem] uppercase tracking-[0.14em] opacity-70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-2 block type-subheading text-sm leading-snug sm:text-[0.95rem]">
                  {service.title}
                </span>
              </button>
            )
          })}
        </div>

        <div className="relative p-5 sm:p-8 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
              className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-14"
            >
              <div>
                <p className="type-mono text-[0.65rem] uppercase tracking-[0.16em] text-fg-inverse/40">
                  Lane {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(services.length).padStart(2, '0')}
                </p>
                <h3 className="type-display mt-4 text-[clamp(2.1rem,5vw,3.75rem)]">
                  {active.title}
                </h3>
                <p className="mt-3 text-base font-medium text-fg-inverse/80 sm:text-lg">
                  {active.summary}
                </p>
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-fg-inverse/55 sm:text-base">
                  {active.description}
                </p>
                <p className="mt-6 max-w-xl rounded-xl border border-fg-inverse/15 bg-fg-inverse/5 px-4 py-3 text-sm text-fg-inverse/70">
                  <span className="type-mono text-[0.6rem] uppercase tracking-[0.12em] text-accent">
                    Best for
                  </span>
                  <span className="mt-1.5 block">{active.bestFor}</span>
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {active.stack.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-fg-inverse/20 px-3 py-1 type-mono text-[0.6rem] text-fg-inverse/65"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex h-full flex-col border-t border-fg-inverse/15 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-1">
                <p className="type-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-inverse/40">
                  What you get
                </p>
                <ul className="mt-5 space-y-4">
                  {active.deliverables.map((item, i) => (
                    <li key={item} className="flex gap-4">
                      <span className="type-mono shrink-0 text-[0.65rem] text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm leading-relaxed text-fg-inverse/80 sm:text-[0.95rem]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={profile.links.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-[3.75rem] w-full items-center justify-center gap-2 rounded-[var(--radius-shell)] bg-accent px-5 py-4 text-base font-bold tracking-tight text-accent-fg transition-opacity hover:opacity-90 sm:mt-10 sm:min-h-[5rem] sm:gap-3 sm:px-6 sm:py-5 sm:text-2xl md:text-3xl"
                >
                  Hire on Upwork
                  <span aria-hidden className="text-[1.1em]">
                    ↗
                  </span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
