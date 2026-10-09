'use client'

import { useEffect, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { profile } from '@/data/profile'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { useOptionalLenisScroll } from '@/components/layout/SmoothScroll'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/#about', id: 'about', label: 'About' },
  { href: '/#stack', id: 'stack', label: 'Stack' },
  { href: '/#services', id: 'services', label: 'Services' },
  { href: '/#work', id: 'work', label: 'Work' },
  { href: '/#contact', id: 'contact', label: 'Contact' },
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const lenis = useOptionalLenisScroll()
  const onHome = pathname === '/'

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function goToSection(e: MouseEvent<HTMLAnchorElement>, id: string) {
    if (!onHome) {
      // Let Next navigate to /#id — SmoothScroll handles the hash on arrival
      setOpen(false)
      return
    }

    e.preventDefault()
    setOpen(false)
    window.history.pushState(null, '', `/#${id}`)
    lenis?.scrollTo(`#${id}`, { duration: 1.25 })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/90 backdrop-blur-md">
      <div className="page-pad flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={(e) => {
            if (!onHome) return
            e.preventDefault()
            window.history.pushState(null, '', '/')
            lenis?.scrollTo(0, { duration: 1.1 })
          }}
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-full bg-accent transition-transform duration-[var(--dur-base)] group-hover:scale-105"
          >
            <span className="type-mono text-[0.7rem] font-semibold text-accent-fg">
              W
            </span>
          </span>
          <span className="type-subheading text-sm tracking-tight">
            {profile.name}
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-0.5 md:flex lg:gap-1"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => goToSection(e, link.id)}
              className="rounded-full px-2.5 py-2 text-[0.8rem] font-medium text-fg-muted transition-colors hover:bg-bg-soft hover:text-fg lg:px-3.5 lg:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href={profile.links.upwork}
            target="_blank"
            rel="noopener noreferrer"
            title="Hire on Upwork"
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-accent-fg transition-opacity hover:opacity-90 sm:inline-flex lg:px-5 lg:text-xs"
          >
            Hire on Upwork
            <span aria-hidden>↗</span>
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-4" aria-hidden>
              <span
                className={cn(
                  'absolute left-0 top-0 block h-[1.5px] w-full bg-fg transition-transform duration-[var(--dur-base)]',
                  open && 'top-[6px] rotate-45'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-[6px] block h-[1.5px] w-full bg-fg transition-opacity duration-[var(--dur-base)]',
                  open && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'absolute bottom-0 left-0 block h-[1.5px] w-full bg-fg transition-transform duration-[var(--dur-base)]',
                  open && 'bottom-[6px] -rotate-45'
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          'border-t border-border bg-bg md:hidden',
          open ? 'block' : 'hidden'
        )}
      >
        <nav className="page-pad flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => goToSection(e, link.id)}
              className="rounded-xl px-3 py-3.5 text-lg font-semibold tracking-tight text-fg transition-colors hover:bg-bg-soft"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={profile.links.upwork}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-accent-fg"
          >
            Hire on Upwork
            <span aria-hidden>↗</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
