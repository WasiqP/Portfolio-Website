'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

type MagneticButtonProps = HTMLMotionProps<'button'> & {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 20, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 280, damping: 20, mass: 0.4 })

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        'inline-flex items-center justify-center border border-border-strong bg-fg px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-fg-inverse transition-opacity duration-[var(--dur-fast)] hover:opacity-85',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
