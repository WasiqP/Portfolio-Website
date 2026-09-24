'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const moods = [
  { id: 'focus', label: 'Deep focus', line: 'Headphones on. Slack muted.' },
  { id: 'ship', label: 'Ship mode', line: 'Bugs fear me. CI fears me more.' },
  { id: 'chaos', label: 'Controlled chaos', line: 'Six tabs. One good idea.' },
  { id: 'human', label: 'Human mode', line: 'Walk. Water. Then code.' },
] as const

export function MoodSwitcher() {
  const [active, setActive] = useState<(typeof moods)[number]>(moods[0])

  return (
    <div className="rounded-[var(--radius-shell)] border border-border bg-bg p-6">
      <p className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle">
        Mood switcher
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {moods.map((mood) => (
          <button
            key={mood.id}
            type="button"
            onClick={() => setActive(mood)}
            className={cn(
              'rounded-[var(--radius-pill)] border px-3 py-2 type-mono text-[0.65rem] uppercase tracking-[0.08em] transition-colors duration-[var(--dur-fast)]',
              active.id === mood.id
                ? 'border-border-strong bg-fg text-fg-inverse'
                : 'border-border text-fg-muted hover:border-border-strong hover:text-fg'
            )}
          >
            {mood.label}
          </button>
        ))}
      </div>
      <p className="type-description mt-4 text-sm" role="status">
        {active.line}
      </p>
    </div>
  )
}
