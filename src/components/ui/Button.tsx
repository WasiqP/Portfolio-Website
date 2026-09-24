import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  external?: boolean
  'aria-label'?: string
  title?: string
}

const variants = {
  primary:
    'rounded-[var(--radius-pill)] bg-accent text-accent-fg hover:opacity-90',
  secondary:
    'rounded-[var(--radius-pill)] border border-border-strong bg-transparent text-fg hover:bg-bg-soft',
  ghost: 'rounded-[var(--radius-pill)] text-fg-muted hover:text-fg',
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  type = 'button',
  external,
  ...rest
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] transition-opacity duration-[var(--dur-fast)]',
    variants[variant],
    className
  )

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  )
}
