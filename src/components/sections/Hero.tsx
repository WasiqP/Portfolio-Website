'use client'

import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { Tooltip } from '@/components/ui/Tooltip'
import { SmoothHashLink } from '@/components/ui/SmoothHashLink'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

export function Hero() {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="top"
      className="page-pad flex flex-col justify-center py-3 sm:py-4 md:py-6 lg:h-[calc(100dvh-var(--nav-h))]"
    >
      <div className="relative flex min-h-0 flex-1 overflow-hidden rounded-[var(--radius-shell)] border border-border bg-bg-inverse text-fg-inverse">
        <div className="relative grid min-h-0 w-full flex-1 lg:grid-cols-[1.15fr_0.95fr]">
          <div className="relative z-10 flex flex-col justify-between gap-8 p-5 sm:gap-10 sm:p-8 md:p-12 lg:p-14">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Tooltip content={profile.jokes.location}>
                <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-fg-inverse/10 px-3 py-1.5 type-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-inverse/85">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {profile.location}
                </span>
              </Tooltip>
              <span className="type-mono max-w-full text-[0.65rem] uppercase tracking-[0.14em] text-fg-inverse/45">
                {profile.agency.name} · {profile.current.company}
              </span>
            </div>

            <div className="max-w-3xl py-2 sm:py-6 md:py-10">
              {/* Mobile: headline + circular portrait side by side */}
              <div className="flex items-center gap-3 sm:gap-5 lg:block">
                <motion.h1
                  className="type-display min-w-0 flex-1 text-[clamp(1.85rem,7.5vw,6.5rem)] !leading-[1.08] text-fg-inverse"
                  initial={reduced ? false : { opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  Ideas into products
                  <br />
                  that <span className="text-accent">ship.</span>
                </motion.h1>

                <motion.div
                  className="relative shrink-0 lg:hidden"
                  initial={reduced ? false : { opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 16,
                    delay: 0.08,
                  }}
                >
                  <div className="relative grid h-[6.5rem] w-[6.5rem] place-items-center sm:h-[8rem] sm:w-[8rem]">
                    {/* Availability beacon rings */}
                    {!reduced
                      ? [0, 1].map((i) => (
                          <motion.span
                            key={i}
                            aria-hidden
                            className="absolute inset-0 rounded-full border border-accent/50"
                            initial={{ scale: 0.92, opacity: 0.55 }}
                            animate={{ scale: 1.35, opacity: 0 }}
                            transition={{
                              duration: 2.4,
                              repeat: Infinity,
                              delay: i * 1.2,
                              ease: 'easeOut',
                            }}
                          />
                        ))
                      : null}

                    {/* Orbital dashed track */}
                    <motion.svg
                      aria-hidden
                      viewBox="0 0 100 100"
                      className="absolute inset-0 h-full w-full"
                      animate={reduced ? undefined : { rotate: 360 }}
                      transition={
                        reduced
                          ? undefined
                          : {
                              duration: 14,
                              repeat: Infinity,
                              ease: 'linear',
                            }
                      }
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="1.25"
                        strokeDasharray="3 7"
                        strokeLinecap="round"
                        opacity="0.75"
                      />
                      <circle
                        cx="50"
                        cy="4"
                        r="2.4"
                        fill="var(--accent)"
                      />
                    </motion.svg>

                    {/* Portrait disc */}
                    <div className="relative z-10 h-[4.85rem] w-[4.85rem] overflow-hidden rounded-full bg-accent ring-2 ring-accent/80 sm:h-[6rem] sm:w-[6rem]">
                      <motion.img
                        src={profile.photo}
                        alt={profile.fullName}
                        className="absolute inset-x-0 bottom-0 mx-auto h-[118%] w-auto max-w-none object-cover object-top"
                        animate={
                          reduced
                            ? undefined
                            : { scale: [1, 1.06, 1] }
                        }
                        transition={
                          reduced
                            ? undefined
                            : {
                                duration: 7,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }
                        }
                      />
                    </div>
                  </div>

                  <motion.p
                    className="mt-2 inline-flex w-full items-center justify-center gap-1.5 type-mono text-[0.55rem] uppercase tracking-[0.14em] text-accent sm:text-[0.6rem]"
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      {!reduced ? (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                      ) : null}
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    {profile.name}
                  </motion.p>
                </motion.div>
              </div>

              <motion.p
                className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-fg-inverse/70 sm:mt-7 sm:text-lg"
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
                className="mt-7 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <SmoothHashLink
                  href="/#contact"
                  title={profile.jokes.hire}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-fg-inverse px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-bg-inverse transition-opacity hover:opacity-90 sm:w-auto sm:px-6"
                >
                  Contact
                  <span aria-hidden>↗</span>
                </SmoothHashLink>
                <a
                  href={profile.links.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-accent px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent-fg transition-opacity hover:opacity-90 sm:w-auto sm:px-6"
                >
                  Hire on Upwork
                  <span aria-hidden>↗</span>
                </a>
                <SmoothHashLink
                  href="/#work"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-fg-inverse/30 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-fg-inverse transition-colors hover:border-fg-inverse sm:w-auto sm:px-6"
                >
                  View work
                </SmoothHashLink>
              </motion.div>
            </div>

            <p className="type-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg-inverse/50 sm:text-[0.65rem] sm:tracking-[0.14em]">
              Next.js · React · React Native · Python · OpenAI
            </p>
          </div>

          {/* Full portrait panel — desktop / large tablet only */}
          <div className="relative hidden min-h-0 overflow-hidden bg-accent lg:block">
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-accent-fg/10 blur-2xl" />
              <div className="absolute bottom-16 left-6 h-28 w-28 rounded-full bg-accent-fg/10 blur-2xl" />
            </div>

            <div className="absolute left-7 top-7 z-30 max-w-[70%]">
              <p className="type-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent-fg/85">
                Available for hire
              </p>
              <p className="type-display mt-2 text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.03em] text-accent-fg">
                {profile.name}.
              </p>
              <p className="mt-1 max-w-[14rem] text-sm text-accent-fg/80">
                {profile.role}
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photo}
              alt={profile.fullName}
              className="absolute inset-x-0 bottom-0 z-20 mx-auto h-[92%] w-auto max-w-[min(100%,28rem)] object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
            />

            <p className="absolute bottom-7 left-7 z-30 type-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent-fg/80">
              Scroll ↓
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
