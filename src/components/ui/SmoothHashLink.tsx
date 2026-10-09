'use client'

import type { MouseEvent, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useOptionalLenisScroll } from '@/components/layout/SmoothScroll'

type Props = {
  href: string
  className?: string
  title?: string
  children: ReactNode
}

/** In-page hash links with relaxed Lenis scroll when already on home */
export function SmoothHashLink({ href, className, title, children }: Props) {
  const pathname = usePathname()
  const lenis = useOptionalLenisScroll()
  const hash = href.includes('#') ? href.slice(href.indexOf('#')) : ''

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (!hash || pathname !== '/') return
    e.preventDefault()
    window.history.pushState(null, '', href.startsWith('/') ? href : `/${hash}`)
    lenis?.scrollTo(hash, { duration: 1.25 })
  }

  return (
    <Link href={href} className={className} title={title} onClick={onClick}>
      {children}
    </Link>
  )
}
