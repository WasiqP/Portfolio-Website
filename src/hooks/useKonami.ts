'use client'

import { useEffect, useRef } from 'react'

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useKonami(onUnlock: () => void) {
  const index = useRef(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const expected = SEQUENCE[index.current]
      if (key === expected || (expected.length === 1 && key === expected)) {
        index.current += 1
        if (index.current === SEQUENCE.length) {
          index.current = 0
          onUnlock()
        }
      } else {
        index.current = key === SEQUENCE[0] ? 1 : 0
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onUnlock])
}
