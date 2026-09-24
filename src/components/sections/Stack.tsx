'use client'

import { stack } from '@/data/stack'
import { profile } from '@/data/profile'
import { Reveal } from '@/components/ui/Reveal'
import { Tooltip } from '@/components/ui/Tooltip'

export function Stack() {
  return (
    <section id="stack" className="overflow-hidden py-[var(--section-y)]">
      <div className="page-pad">
        <Reveal>
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Tooltip content={profile.jokes.stack}>
                <p className="type-mono mb-4 inline-flex cursor-default text-xs uppercase tracking-[0.16em] text-fg-subtle">
                  Stack
                </p>
              </Tooltip>
              <h2 className="type-display text-[clamp(2.5rem,7vw,4.5rem)]">
                Tools, not toys.
              </h2>
            </div>
            <p className="type-description max-w-xs text-sm md:pb-2">
              The shortlist when the brief is real.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <ul className="flex animate-none gap-3 overflow-x-auto px-[var(--gutter)] pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {stack.map((item) => (
            <li
              key={item.name}
              className="min-w-[16rem] shrink-0 rounded-[var(--radius-shell)] border border-border bg-bg p-6 sm:min-w-[18rem]"
            >
              <p className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle">
                {item.category}
              </p>
              <h3 className="type-heading mt-4 text-2xl sm:text-3xl">
                {item.name}
              </h3>
              <p className="type-description mt-3 text-sm">{item.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
