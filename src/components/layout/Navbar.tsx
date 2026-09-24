'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/#work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-bg/95">
      <div className="page-pad flex h-[var(--nav-h)] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-xl bg-accent"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-bg-inverse" />
          </span>
          <span className="type-subheading text-sm tracking-tight">
            {profile.name}
          </span>
        </Link>

        <button
          type="button"
          className="hidden items-center gap-2 type-body text-sm text-fg md:inline-flex"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="flex flex-col gap-1.5">
            <span className="block h-[2px] w-5 bg-fg" />
            <span className="block h-[2px] w-5 bg-fg" />
          </span>
          Menu
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/#contact"
            title={profile.jokes.hire}
            className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-accent px-4 py-2.5 text-xs font-semibold tracking-wide text-accent-fg transition-opacity duration-[var(--dur-fast)] hover:opacity-90 sm:px-5"
          >
            Hire me
            <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-2 type-body text-sm md:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        className={cn(
          'absolute inset-x-0 top-[var(--nav-h)] border-b border-border bg-bg',
          open ? 'block' : 'hidden'
        )}
      >
        <nav className="page-pad flex flex-col py-4 md:flex-row md:gap-10 md:py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-4 type-heading text-3xl tracking-tight last:border-b-0 md:border-b-0 md:py-0 md:text-base md:font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
