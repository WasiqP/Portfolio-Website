'use client'

import { useRef, useState } from 'react'
import { profile } from '@/data/profile'
import { Reveal } from '@/components/ui/Reveal'
import { SmoothHashLink } from '@/components/ui/SmoothHashLink'

export function About() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  function toggleMute() {
    const video = videoRef.current
    if (!video) return
    const next = !muted
    video.muted = next
    setMuted(next)
    if (!next) {
      void video.play().catch(() => {})
    }
  }

  return (
    <section
      id="about"
      className="scroll-mt-[var(--nav-h)] bg-bg pb-[var(--section-y)] pt-4 sm:pt-6"
    >
      <div className="page-pad">
        <div className="overflow-hidden rounded-[var(--radius-shell)] border border-border bg-bg-soft">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="order-2 flex flex-col justify-between p-5 sm:p-8 md:p-12 lg:order-1 lg:p-14">
              <div>
                <Reveal>
                  <p className="type-mono mb-4 text-xs uppercase tracking-[0.16em] text-fg-subtle">
                    About
                  </p>
                  <h2 className="type-display text-[clamp(2.15rem,8vw,4.5rem)]">
                    Meet the
                    <br />
                    <span className="text-accent">builder.</span>
                  </h2>
                </Reveal>

                <Reveal delay={0.08}>
                  <p className="type-subheading mt-6 max-w-xl text-lg text-fg sm:mt-8 sm:text-2xl">
                    {profile.aboutLead}
                  </p>
                </Reveal>

                <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
                  {profile.about.map((para, i) => (
                    <Reveal key={para} delay={0.1 + i * 0.05}>
                      <p className="type-body max-w-xl text-[0.95rem] text-fg-muted sm:text-lg">
                        {para}
                      </p>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.28}>
                  <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                    <div>
                      <p className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle">
                        Currently
                      </p>
                      <p className="type-subheading mt-2 text-base">
                        {profile.current.title}
                      </p>
                      <p className="type-description text-sm">
                        {profile.current.company}
                      </p>
                    </div>
                    <div>
                      <p className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle">
                        Agency
                      </p>
                      <p className="type-subheading mt-2 text-base">
                        {profile.agency.name}
                      </p>
                      <p className="type-description text-sm">
                        {profile.agency.blurb}
                      </p>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-1">
                      <p className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle">
                        Education
                      </p>
                      <p className="type-subheading mt-2 text-base">
                        {profile.education.degree}
                      </p>
                      <p className="type-description text-sm">
                        {profile.education.school} · {profile.education.years}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.32}>
                <div className="mt-8 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-3">
                  <a
                    href={profile.links.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent-fg transition-opacity hover:opacity-90 sm:w-auto sm:px-6"
                  >
                    Hire on Upwork
                    <span aria-hidden>↗</span>
                  </a>
                  <a
                    href={profile.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto sm:px-6"
                    style={{
                      background:
                        'linear-gradient(135deg, #833AB4 0%, #C13584 40%, #E1306C 60%, #FD1D1D 80%, #F77737 100%)',
                    }}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    Follow @wasiqofficial_
                    <span aria-hidden>↗</span>
                  </a>
                  <SmoothHashLink
                    href="/#contact"
                    title={profile.jokes.hire}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-fg-muted transition-colors hover:text-fg sm:w-auto sm:px-6"
                  >
                    Message me
                  </SmoothHashLink>
                  <SmoothHashLink
                    href="/#work"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-fg-muted transition-colors hover:text-fg sm:w-auto sm:px-6"
                  >
                    See the work
                    <span aria-hidden>↓</span>
                  </SmoothHashLink>
                </div>
              </Reveal>
            </div>

            <div className="order-1 border-b border-border bg-bg-inverse p-3 sm:p-5 lg:order-2 lg:border-b-0 lg:border-l lg:p-6">
              <Reveal delay={0.1}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-shell)-0.35rem)] border border-accent/40 sm:aspect-[16/11] lg:aspect-[4/5] lg:min-h-full">
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    src={profile.introVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={`${profile.fullName} intro`}
                  />
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full border border-fg-inverse/25 bg-bg-inverse/80 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-fg-inverse backdrop-blur-sm transition-colors hover:border-accent hover:text-accent sm:bottom-4 sm:right-4 sm:px-3.5 sm:text-xs"
                    aria-label={muted ? 'Unmute intro video' : 'Mute intro video'}
                    aria-pressed={!muted}
                  >
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 fill-current"
                    >
                      {muted ? (
                        <>
                          <path d="M4 9v6h3l4 4V5L7 9H4z" />
                          <path
                            d="M16 9.5l5 5m0-5l-5 5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </>
                      ) : (
                        <>
                          <path d="M4 9v6h3l4 4V5L7 9H4z" />
                          <path
                            d="M15.5 8.5a5 5 0 010 7M18 6a8 8 0 010 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </>
                      )}
                    </svg>
                    {muted ? 'Unmute' : 'Mute'}
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
