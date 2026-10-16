'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Top progress bar for App Router navigations (no router.events in App Router).
 * Starts on internal link click; clears when the pathname settles.
 */
export function NavigationProgress() {
  const pathname = usePathname()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(false)
  }, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const anchor = (e.target as HTMLElement | null)?.closest('a')
      if (!anchor) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return
      }
      if (/^https?:\/\//i.test(href) && !href.startsWith(window.location.origin)) {
        return
      }

      const url = new URL(href, window.location.href)
      if (url.pathname === window.location.pathname && url.hash) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return
      }

      setActive(true)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-busy={active}
      aria-label={active ? 'Loading page' : undefined}
    >
      <div
        className={`h-full w-full origin-left bg-accent ${
          active ? 'nav-progress-bar--active' : 'opacity-0'
        }`}
      />
    </div>
  )
}
