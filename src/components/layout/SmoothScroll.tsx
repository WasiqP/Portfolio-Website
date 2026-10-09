'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { ScrollTrigger } from '@/lib/gsap'

/** Ease-out quart — settles softly instead of snapping */
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

type ScrollToOptions = {
  offset?: number
  duration?: number
  immediate?: boolean
}

type LenisContextValue = {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: ScrollToOptions
  ) => void
}

const LenisContext = createContext<LenisContextValue | null>(null)

function navOffset() {
  if (typeof window === 'undefined') return -72
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--nav-h')
    .trim()
  const px = Number.parseFloat(raw)
  return Number.isFinite(px) ? -px - 8 : -80
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (reduced) {
      lenisRef.current = null
      setReady(false)
      return
    }

    const lenis = new Lenis({
      // Smooth but responsive — not floaty
      duration: 0.9,
      easing: easeOutQuart,
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.2,
      autoRaf: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const onSettle = () => ScrollTrigger.refresh()
    window.addEventListener('load', onSettle)
    const refreshTimer = window.setTimeout(onSettle, 400)

    lenisRef.current = lenis
    setReady(true)
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    return () => {
      window.removeEventListener('load', onSettle)
      window.clearTimeout(refreshTimer)
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      lenis.destroy()
      lenisRef.current = null
      setReady(false)
    }
  }, [reduced])

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: ScrollToOptions) => {
      const offset = options?.offset ?? navOffset()
      const duration = options?.duration ?? 1.2
      const lenis = lenisRef.current

      if (lenis && !reduced) {
        lenis.scrollTo(target, {
          offset,
          duration,
          easing: easeOutQuart,
          immediate: options?.immediate,
        })
        return
      }

      if (typeof target === 'string') {
        const el = document.querySelector(target)
        el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
        return
      }
      if (typeof target === 'number') {
        window.scrollTo({
          top: target,
          behavior: reduced ? 'auto' : 'smooth',
        })
      }
    },
    [reduced]
  )

  // Arrive on a hash route (e.g. /#contact from another page)
  useEffect(() => {
    if (!ready && !reduced) return
    const hash = window.location.hash
    if (!hash) return

    const id = window.setTimeout(() => {
      scrollTo(hash, { duration: 1.25 })
    }, 60)

    return () => window.clearTimeout(id)
  }, [pathname, ready, reduced, scrollTo])

  const value = useMemo(() => ({ scrollTo }), [scrollTo])

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  )
}

export function useLenisScroll() {
  const ctx = useContext(LenisContext)
  if (!ctx) {
    throw new Error('useLenisScroll must be used within SmoothScroll')
  }
  return ctx
}

/** Safe hook when provider may be absent */
export function useOptionalLenisScroll() {
  return useContext(LenisContext)
}
