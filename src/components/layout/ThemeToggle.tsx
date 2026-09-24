'use client'

import { useTheme } from '@/hooks/useTheme'
import { playSound } from '@/lib/sounds'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => {
        toggleTheme()
        playSound('toggle')
      }}
      className={cn(
        'grid h-10 w-10 place-items-center rounded-full border border-border text-sm transition-colors duration-[var(--dur-fast)] hover:border-border-strong',
        className
      )}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Too dark?' : 'Lights out'}
    >
      <span aria-hidden>{isDark ? '☾' : '☀'}</span>
    </button>
  )
}
