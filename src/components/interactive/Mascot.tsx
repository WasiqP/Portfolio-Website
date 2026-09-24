'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

const quips = [
  'Stop poking me. I am debugging in my head.',
  'That tickles. Ship something instead.',
  'I contain multitudes. And caffeine.',
  'Petting the mascot will not fix production.',
]

type MascotProps = {
  className?: string
}

export function Mascot({ className }: MascotProps) {
  const progress = useScrollProgress()
  const reduced = usePrefersReducedMotion()
  const [pets, setPets] = useState(0)
  const [bubble, setBubble] = useState<string | null>(null)

  const onPet = useCallback(() => {
    const next = pets + 1
    setPets(next)
    setBubble(quips[next % quips.length])
    window.setTimeout(() => setBubble(null), 2200)
  }, [pets])

  const eyeShift = reduced ? 0 : (progress - 0.5) * 8

  return (
    <div className={cn('relative w-full max-w-[20rem]', className)}>
      <button
        type="button"
        onClick={onPet}
        aria-label="Interactive mascot. Click for a joke."
        className="group relative aspect-square w-full border border-border-strong bg-bg-elevated transition-colors duration-[var(--dur-fast)] hover:bg-accent-soft"
      >
        {/* Minimal geometric character — flat, no glow */}
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full p-6"
          aria-hidden
        >
          <rect
            x="30"
            y="40"
            width="140"
            height="120"
            fill="var(--fg)"
          />
          <rect x="50" y="70" width="40" height="28" fill="var(--bg)" />
          <rect x="110" y="70" width="40" height="28" fill="var(--bg)" />
          <motion.circle
            cx={70}
            cy={84}
            r="6"
            fill="var(--accent)"
            animate={reduced ? undefined : { cx: 70 + eyeShift }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />
          <motion.circle
            cx={130}
            cy={84}
            r="6"
            fill="var(--accent)"
            animate={reduced ? undefined : { cx: 130 + eyeShift }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />
          <rect
            x="70"
            y="120"
            width="60"
            height="10"
            fill="var(--bg)"
          />
          <rect
            x="20"
            y="90"
            width="10"
            height="40"
            fill="var(--fg)"
            className="origin-top transition-transform duration-[var(--dur-base)] group-hover:-rotate-12"
          />
          <rect
            x="170"
            y="90"
            width="10"
            height="40"
            fill="var(--fg)"
            className="origin-top transition-transform duration-[var(--dur-base)] group-hover:rotate-12"
          />
        </svg>

        <span className="absolute bottom-3 left-3 type-mono text-[0.65rem] text-fg-subtle">
          click me
        </span>
      </button>

      {bubble && (
        <div
          role="status"
          className="absolute -top-3 left-1/2 z-10 w-[min(100%,16rem)] -translate-x-1/2 -translate-y-full border border-border-strong bg-bg px-3 py-2 type-mono text-[0.7rem] leading-snug text-fg"
        >
          {bubble}
        </div>
      )}
    </div>
  )
}
