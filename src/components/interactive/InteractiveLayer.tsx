'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useKonami } from '@/hooks/useKonami'
import { playSound } from '@/lib/sounds'

const Terminal = dynamic(
  () =>
    import('@/components/interactive/Terminal').then((m) => m.Terminal),
  { ssr: false }
)

export function InteractiveLayer() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 3200)
  }, [])

  const onKonami = useCallback(() => {
    playSound('egg')
    showToast('↑↑↓↓←→←→BA — you absolute legend.')
  }, [showToast])

  useKonami(onKonami)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (e.key === '`' || e.key === '~') {
        e.preventDefault()
        setTerminalOpen((v) => !v)
      }
    }

    const onTrigger = (e: Event) => {
      const t = e.target as HTMLElement
      if (t.closest('[data-terminal-trigger]')) {
        setTerminalOpen(true)
      }
    }

    window.addEventListener('keydown', onKey)
    document.addEventListener('click', onTrigger)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onTrigger)
    }
  }, [])

  return (
    <>
      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[130] w-[min(90vw,24rem)] -translate-x-1/2 border border-border-strong bg-bg px-4 py-3 type-mono text-xs text-fg"
        >
          {toast}
        </div>
      )}
    </>
  )
}
