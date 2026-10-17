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
  /** Pause smooth scroll (modals / sheets) */
  stop: () => void
  /** Resume smooth scroll */
  start: () => void
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

const TOUCH_SCROLL_MQ = '(max-width: 1023px), (pointer: coarse)'

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (reduced) {
      lenisRef.current = null
      setReady(true)
      return
    }

    const touchMq = window.matchMedia(TOUCH_SCROLL_MQ)

    const teardown = () => {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      lenisRef.current?.destroy()
      lenisRef.current = null
      setReady(false)
    }

    const setup = () => {
      teardown()

      const isTouch = touchMq.matches

      /*
        Touch / compact: native scroll only.
        Lenis + position:sticky subpixel-fights every frame → hero shake.
        Desktop keeps Lenis; nav scrollTo still smooth via native fallback.
      */
      if (isTouch) {
        setReady(true)
        window.setTimeout(() => ScrollTrigger.refresh(), 200)
        return
      }

      const lenis = new Lenis({
        duration: 0.9,
        easing: easeOutQuart,
        smoothWheel: true,
        wheelMultiplier: 1.15,
        syncTouch: false,
        allowNestedScroll: true,
        autoRaf: true,
      })

      lenis.on('scroll', ScrollTrigger.update)
      lenisRef.current = lenis
      setReady(true)
      document.documentElement.classList.add('lenis', 'lenis-smooth')
      window.setTimeout(() => ScrollTrigger.refresh(), 200)
    }

    setup()
    const onSettle = () => ScrollTrigger.refresh()
    window.addEventListener('load', onSettle)
    touchMq.addEventListener('change', setup)

    return () => {
      window.removeEventListener('load', onSettle)
      touchMq.removeEventListener('change', setup)
      teardown()
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
        if (!el) return
        const top =
          el.getBoundingClientRect().top + window.scrollY + offset
        window.scrollTo({
          top,
          behavior: reduced || options?.immediate ? 'auto' : 'smooth',
        })
        return
      }
      if (typeof target === 'number') {
        window.scrollTo({
          top: target,
          behavior: reduced || options?.immediate ? 'auto' : 'smooth',
        })
      } else {
        const top =
          target.getBoundingClientRect().top + window.scrollY + offset
        window.scrollTo({
          top,
          behavior: reduced || options?.immediate ? 'auto' : 'smooth',
        })
      }
    },
    [reduced]
  )

  const stop = useCallback(() => {
    lenisRef.current?.stop()
    document.documentElement.classList.add('lenis-stopped')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
  }, [])

  const start = useCallback(() => {
    document.documentElement.classList.remove('lenis-stopped')
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    lenisRef.current?.start()
  }, [])

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

  const value = useMemo(() => ({ scrollTo, stop, start }), [scrollTo, stop, start])
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
