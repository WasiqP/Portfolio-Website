'use client'

import { useState } from 'react'
import { services } from '@/data/services'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

export function Services() {
  const [openId, setOpenId] = useState(services[0]?.id ?? '')

  return (
    <section id="services" className="bg-bg-soft py-[var(--section-y)]">
      <div className="page-pad">
        <Reveal>
          <p className="type-mono mb-4 text-xs uppercase tracking-[0.16em] text-fg-subtle">
            Services
          </p>
          <h2 className="type-display max-w-4xl text-[clamp(2.5rem,7vw,4.75rem)]">
            Everything your
            <br />
            <span className="text-accent">product</span> needs.
          </h2>
          <p className="type-description mt-6 max-w-lg text-base">
            AI systems, SaaS MVPs, and mobile apps — scoped to ship, not to
            inflate a roadmap.
          </p>
        </Reveal>

        <ul className="mt-14 border-t border-border">
          {services.map((service, i) => {
            const open = openId === service.id
            return (
              <li key={service.id} className="border-b border-border">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 py-7 text-left sm:py-8"
                  onClick={() => setOpenId(open ? '' : service.id)}
                  aria-expanded={open}
                >
                  <div className="flex gap-4 sm:gap-6">
                    <span className="type-mono pt-2 text-xs text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="type-heading text-2xl sm:text-3xl md:text-4xl">
                        {service.title}
                      </h3>
                      {open && (
                        <div className="mt-4">
                          <p className="type-description max-w-xl text-sm sm:text-base">
                            {service.description}
                          </p>
                          <ul className="mt-4 space-y-2 pb-2">
                            {service.bullets.map((b) => (
                              <li
                                key={b}
                                className="type-mono text-[0.7rem] text-fg-muted"
                              >
                                — {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    className={cn(
                      'mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-lg transition-transform duration-[var(--dur-base)]',
                      open && 'rotate-45 bg-fg text-fg-inverse'
                    )}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
