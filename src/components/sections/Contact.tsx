'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

const IG_HANDLE = 'wasiqofficial_'

type Status = 'idle' | 'loading' | 'success' | 'error'

function InstagramConnect() {
  const [copied, setCopied] = useState(false)

  async function copyHandle(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(`@${IG_HANDLE}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked — still open profile via parent */
    }
  }

  return (
    <motion.a
      href={profile.links.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[calc(var(--radius-shell)-0.5rem)] p-5 text-white sm:p-8"
      style={{
        background:
          'linear-gradient(135deg, #833AB4 0%, #C13584 35%, #E1306C 55%, #FD1D1D 75%, #F77737 90%, #FCAF45 100%)',
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 85% 15%, rgba(252,175,69,0.55), transparent 45%), radial-gradient(ellipse at 10% 90%, rgba(131,58,180,0.45), transparent 40%)',
        }}
      />

      <div className="relative">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <p className="type-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/80">
            Say hi on IG
          </p>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/35 bg-black/25 px-2.5 py-1 type-mono text-[0.6rem] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Online for DMs
          </span>
        </div>

        <p className="type-heading mt-4 text-xl text-white sm:text-3xl">
          Follow{' '}
          <span className="break-all underline decoration-white/40 underline-offset-4">
            @{IG_HANDLE}
          </span>
        </p>
        <p className="mt-2 max-w-xs text-sm text-white/80">
          Quick questions, project vibes, or just a hello — I reply on Instagram.
        </p>
      </div>

      <div className="relative mt-8 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-black transition-opacity group-hover:opacity-90">
          Open Instagram
          <span aria-hidden>↗</span>
        </span>
        <button
          type="button"
          onClick={copyHandle}
          className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-colors hover:bg-black/35"
        >
          {copied ? 'Copied' : 'Copy @'}
        </button>
      </div>
    </motion.a>
  )
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    const form = new FormData(e.currentTarget)
    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      message: String(form.get('message') || ''),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok) throw new Error(data.error || 'Something broke.')
      setStatus('success')
      setMessage('Got it. I will reply like a human.')
      e.currentTarget.reset()
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Failed to send.')
    }
  }

  return (
    <section id="contact" className="scroll-mt-[var(--nav-h)] pb-[var(--section-y)] pt-6">
      <div className="page-pad">
        <div className="overflow-hidden rounded-[var(--radius-shell)] border border-border bg-bg-inverse px-4 py-10 text-fg-inverse sm:px-10 sm:py-16 md:px-14 md:py-20">
          <Reveal>
            <h2 className="type-display max-w-4xl text-[clamp(2.25rem,9vw,5.5rem)] text-fg-inverse">
              Let&apos;s work
              <br />
              together.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="type-description mt-5 max-w-lg text-[0.95rem] text-fg-inverse/65 sm:mt-6 sm:text-base">
              Briefs, half-baked ideas, and “we need this yesterday” emails
              welcome. Hire on Upwork, or tap Instagram for a faster hello.
            </p>
          </Reveal>

          <div className="mt-7 grid gap-3 sm:mt-8 lg:grid-cols-2 lg:items-stretch">
            <Reveal delay={0.1}>
              <a
                href={profile.links.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col gap-3 rounded-[calc(var(--radius-shell)-0.5rem)] bg-accent px-5 py-5 text-accent-fg transition-opacity hover:opacity-90 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7"
              >
                <div>
                  <p className="type-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent-fg/75">
                    Preferred way to hire
                  </p>
                  <p className="type-heading mt-2 text-xl sm:text-3xl">
                    Hire me on Upwork
                  </p>
                  <p className="mt-1 text-sm text-accent-fg/80">
                    Verified profile · Fast contracts · Clear scope
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-bg-inverse px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-fg-inverse sm:self-auto">
                  Open profile
                  <span aria-hidden>↗</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.14}>
              <InstagramConnect />
            </Reveal>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={0.12}>
              <ul className="space-y-0">
                {[
                  {
                    label: 'Email',
                    href: `mailto:${profile.links.email}`,
                    value: profile.links.email,
                  },
                  {
                    label: 'Upwork',
                    href: profile.links.upwork,
                    value: 'Open profile ↗',
                  },
                  {
                    label: 'Instagram',
                    href: profile.links.instagram,
                    value: `@${IG_HANDLE}`,
                  },
                  {
                    label: 'GitHub',
                    href: profile.links.github,
                    value: 'github.com/WasiqPatel',
                  },
                  {
                    label: 'LinkedIn',
                    href: profile.links.linkedin,
                    value: 'linkedin',
                  },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        item.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="group flex items-center justify-between gap-4 border-b border-fg-inverse/15 py-4"
                    >
                      <span className="type-mono shrink-0 text-xs uppercase tracking-[0.12em] text-fg-inverse/45">
                        {item.label}
                      </span>
                      <span className="truncate text-right text-sm text-fg-inverse transition-colors group-hover:text-accent">
                        {item.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <form onSubmit={onSubmit} className="space-y-5">
                <label className="block">
                  <span className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-inverse/45">
                    Name
                  </span>
                  <input
                    name="name"
                    required
                    className="mt-2 w-full border-b border-fg-inverse/25 bg-transparent py-3 text-sm text-fg-inverse outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="block">
                  <span className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-inverse/45">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full border-b border-fg-inverse/25 bg-transparent py-3 text-sm text-fg-inverse outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="block">
                  <span className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-inverse/45">
                    Project notes
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="mt-2 w-full resize-y border-b border-fg-inverse/25 bg-transparent py-3 text-sm text-fg-inverse outline-none transition-colors focus:border-accent"
                  />
                </label>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-accent px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent-fg transition-opacity hover:opacity-90',
                      status === 'loading' && 'opacity-60'
                    )}
                  >
                    {status === 'loading' ? 'Sending…' : 'Send message'}
                    <span aria-hidden>→</span>
                  </button>
                  {message && (
                    <p className="type-mono text-xs text-fg-inverse/70" role="status">
                      {message}
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
