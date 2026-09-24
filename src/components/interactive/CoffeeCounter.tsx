'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const KEY = 'portfolio-coffee'

export function CoffeeCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(KEY) || '0')
      if (!Number.isNaN(stored)) setCount(stored)
    } catch {
      /* ignore */
    }
  }, [])

  function bump() {
    setCount((c) => {
      const next = c + 1
      try {
        localStorage.setItem(KEY, String(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }

  return (
    <div className="rounded-[var(--radius-shell)] border border-border bg-bg p-6">
      <p className="type-mono text-[0.65rem] uppercase tracking-[0.12em] text-fg-subtle">
        Coffee counter
      </p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <p className="type-display text-5xl tabular-nums">{count}</p>
        <button
          type="button"
          onClick={bump}
          className="rounded-[var(--radius-pill)] bg-fg px-4 py-2 type-mono text-[0.65rem] uppercase tracking-[0.1em] text-fg-inverse transition-opacity hover:opacity-85"
        >
          +1 cup
        </button>
      </div>
      <p className="type-description mt-4 text-sm">
        {count === 0
          ? 'Hydration starts here.'
          : count < 5
            ? 'Warming up the compilers.'
            : count < 12
              ? 'Now we are dangerous.'
              : 'Please touch grass. After this PR.'}
      </p>
    </div>
  )
}
