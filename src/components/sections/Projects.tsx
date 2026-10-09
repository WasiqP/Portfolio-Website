'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { Reveal } from '@/components/ui/Reveal'
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMediaQuery'

const ease = [0.16, 1, 0.3, 1] as const

export function Projects() {
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
  const reduced = usePrefersReducedMotion()
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? '')
  const active =
    projects.find((p) => p.slug === activeSlug) ?? projects[0]
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !active?.video) return
    video.load()
    if (!reduced && canHover) {
      void video.play().catch(() => {})
    }
  }, [active?.slug, active?.video, reduced, canHover])

  return (
    <section
      id="work"
      className="page-pad scroll-mt-[var(--nav-h)] py-[var(--section-y)]"
    >
      <Reveal>
        <div className="mb-10 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="type-mono mb-3 text-xs uppercase tracking-[0.16em] text-fg-subtle">
              Selected work
            </p>
            <h2 className="type-display text-[clamp(2.15rem,8vw,4.75rem)]">
              Problem
              <span className="text-accent"> → </span>
              product.
            </h2>
          </div>
          <p className="max-w-xs type-description text-sm md:pb-1">
            Hover a brief to preview the build. Click to open the full case.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(28rem,1.2fr)] lg:items-start lg:gap-10 xl:gap-12">
        {/* Problem → product list */}
        <div>
          <div
            aria-hidden
            className="mb-2 hidden border-b border-border pb-3 sm:grid sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.85fr)] sm:gap-6"
          >
            <p className="type-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-subtle">
              The problem
            </p>
            <p className="type-mono text-right text-[0.65rem] uppercase tracking-[0.14em] text-fg-subtle">
              The product
            </p>
          </div>

          <ul className="border-t border-border">
            {projects.map((project, i) => {
              const isActive = activeSlug === project.slug

              return (
                <li key={project.slug}>
                  <Reveal delay={0.03 * i}>
                    <Link
                      href={`/projects/${project.slug}`}
                      onMouseEnter={() => {
                        if (canHover) setActiveSlug(project.slug)
                      }}
                      onFocus={() => {
                        if (canHover) setActiveSlug(project.slug)
                      }}
                      className={`group grid grid-cols-1 gap-2 border-b border-border py-5 transition-colors sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.85fr)] sm:items-center sm:gap-6 sm:py-6 ${
                        isActive && canHover ? 'bg-accent-soft/40' : ''
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <p className="type-mono mb-1.5 text-[0.6rem] uppercase tracking-[0.14em] text-fg-subtle sm:hidden">
                          Problem
                        </p>
                        <p
                          className={`type-heading text-[clamp(1.1rem,2.6vw,1.55rem)] !leading-[1.25] tracking-tight transition-colors ${
                            isActive && canHover
                              ? 'text-fg'
                              : 'text-fg-muted group-hover:text-fg'
                          }`}
                        >
                          {project.problem}
                        </p>
                      </div>

                      <div className="flex min-w-0 items-center justify-between gap-3 sm:justify-end">
                        <div className="min-w-0 sm:text-right">
                          <p className="type-mono mb-1 text-[0.6rem] uppercase tracking-[0.14em] text-fg-subtle sm:hidden">
                            Product
                          </p>
                          <p
                            className={`type-heading truncate text-base tracking-tight transition-colors sm:text-lg ${
                              isActive && canHover
                                ? 'text-accent'
                                : 'text-fg group-hover:text-accent'
                            }`}
                          >
                            {project.title}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-fg-muted sm:text-sm">
                            {project.tagline}
                          </p>
                        </div>
                        <span
                          aria-hidden
                          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs transition-colors ${
                            isActive && canHover
                              ? 'border-accent bg-accent text-accent-fg'
                              : 'border-border text-fg-muted group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg'
                          }`}
                        >
                          ↗
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Large sticky cinema stage — desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-h)+1.25rem)]">
            <p className="type-mono mb-3 text-[0.65rem] uppercase tracking-[0.14em] text-fg-subtle">
              Live preview
            </p>

            <Link
              href={`/projects/${active.slug}`}
              className="group/stage block overflow-hidden rounded-[var(--radius-shell)] border border-border bg-bg-inverse transition-colors hover:border-accent"
            >
              {/* Landscape stage — contain keeps full website demos in frame */}
              <div className="relative aspect-video bg-black">
                <AnimatePresence mode="wait">
                  {active ? (
                    <motion.div
                      key={active.slug}
                      className="absolute inset-0"
                      initial={
                        reduced
                          ? { opacity: 1 }
                          : { opacity: 0 }
                      }
                      animate={{ opacity: 1 }}
                      exit={
                        reduced
                          ? { opacity: 0 }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 0.35, ease }}
                    >
                      {active.video ? (
                        <video
                          ref={videoRef}
                          className="absolute inset-0 h-full w-full object-contain object-center"
                          src={active.video}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          autoPlay
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{ background: active.accent }}
                        />
                      )}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="border-t border-white/10 bg-bg-inverse p-5 xl:p-6">
                <AnimatePresence mode="wait">
                  {active ? (
                    <motion.div
                      key={`${active.slug}-meta`}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <p className="type-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                        {active.year} · case
                      </p>
                      <p className="type-heading mt-2 text-xl text-fg-inverse xl:text-2xl">
                        {active.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-fg-inverse/65">
                        {active.problem}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-accent-fg transition-opacity group-hover/stage:opacity-90">
                        Open case
                        <span aria-hidden>↗</span>
                      </span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Link>

            <p className="mt-3 type-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg-subtle">
              Hover rows to swap · click any row to open
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
