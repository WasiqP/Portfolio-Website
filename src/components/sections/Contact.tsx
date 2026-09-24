'use client'

import { useState } from 'react'
import { profile } from '@/data/profile'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

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
    <section id="contact" className="pb-[var(--section-y)] pt-6">
      <div className="page-pad">
        <div className="overflow-hidden rounded-[var(--radius-shell)] bg-bg-inverse px-6 py-14 text-fg-inverse sm:px-10 sm:py-16 md:px-14 md:py-20">
          <Reveal>
            <h2 className="type-display max-w-4xl text-[clamp(2.75rem,8vw,5.5rem)] text-fg-inverse">
              Let&apos;s work
              <br />
              together.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="type-description mt-6 max-w-md text-base text-fg-inverse/65">
              Briefs, half-baked ideas, and “we need this yesterday” emails
              welcome.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={0.1}>
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
                    value: 'Hire on Upwork',
                  },
                  {
                    label: 'GitHub',
                    href: profile.links.github,
                    value: 'github',
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
                      className="group flex items-center justify-between border-b border-fg-inverse/15 py-4"
                    >
                      <span className="type-mono text-xs uppercase tracking-[0.12em] text-fg-inverse/45">
                        {item.label}
                      </span>
                      <span className="text-sm text-fg-inverse transition-colors group-hover:text-accent">
                        {item.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
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
