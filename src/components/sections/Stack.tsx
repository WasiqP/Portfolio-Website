'use client'

import { stack } from '@/data/stack'
import { profile } from '@/data/profile'
import { Reveal } from '@/components/ui/Reveal'
import { Tooltip } from '@/components/ui/Tooltip'

function StackCard({
  item,
  dup,
}: {
  item: (typeof stack)[number]
  dup?: boolean
}) {
  return (
    <li
      className="min-w-[13.5rem] shrink-0 rounded-[var(--radius-shell)] border border-border bg-bg p-4 sm:min-w-[18rem] sm:p-6"
      aria-hidden={dup || undefined}
    >
      <p className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle">
        {item.category}
      </p>
      <h3 className="type-heading mt-3 text-xl sm:mt-4 sm:text-3xl">{item.name}</h3>
      <p className="type-description mt-2 text-sm sm:mt-3">{item.note}</p>
    </li>
  )
}

export function Stack() {
  const loop = [...stack, ...stack]

  return (
    <section id="stack" className="scroll-mt-[var(--nav-h)] overflow-hidden py-10 sm:py-14">
      <div className="page-pad">
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Tooltip content={profile.jokes.stack}>
                <p className="type-mono mb-4 inline-flex cursor-default text-xs uppercase tracking-[0.16em] text-fg-subtle">
                  Stack
                </p>
              </Tooltip>
              <h2 className="type-display text-[clamp(2.15rem,8vw,4.5rem)]">
                Tools, not toys.
              </h2>
            </div>
            <p className="type-description max-w-xs text-sm md:pb-2">
              Frameworks, languages, libraries, and tools for real briefs.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-bg to-transparent sm:w-16"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-bg to-transparent sm:w-16"
        />

        <div className="overflow-hidden">
          <ul className="stack-marquee flex w-max gap-3 pr-3">
            {loop.map((item, i) => (
              <StackCard
                key={`${item.name}-${i}`}
                item={item}
                dup={i >= stack.length}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
