'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type TooltipProps = {
  content: string
  children: React.ReactNode
  className?: string
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [open, setOpen] = useState(false)

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[16rem] -translate-x-1/2 border border-border bg-bg px-3 py-2 type-mono text-[0.65rem] leading-snug text-fg shadow-none"
        >
          {content}
        </span>
      )}
    </span>
  )
}
