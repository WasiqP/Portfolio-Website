'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { terminalCommands } from '@/lib/easter-eggs'
import { playSound } from '@/lib/sounds'
import { applyDocumentTheme, normalizeTheme } from '@/lib/theme'

type Line = { type: 'in' | 'out' | 'sys'; text: string }

type TerminalProps = {
  open: boolean
  onClose: () => void
}

export function Terminal({ open, onClose }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([
    { type: 'sys', text: 'portfolio.exe — type `help` to begin' },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight })
  }, [lines, open])

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    setLines((prev) => [...prev, { type: 'in', text: `› ${raw}` }])

    if (cmd === 'exit' || cmd === 'close') {
      setLines((prev) => [
        ...prev,
        { type: 'out', text: 'Bye. Try not to break production.' },
      ])
      window.setTimeout(onClose, 400)
      return
    }

    if (cmd.startsWith('theme ')) {
      const arg = cmd.slice(6).trim()
      if (arg !== 'dark' && arg !== 'brand' && arg !== 'light') {
        setLines((prev) => [
          ...prev,
          { type: 'out', text: 'Usage: theme light | theme dark' },
        ])
        return
      }
      const next = normalizeTheme(arg)
      applyDocumentTheme(next)
      setLines((prev) => [
        ...prev,
        {
          type: 'out',
          text:
            next === 'dark'
              ? 'Dark theme — black / white / lime.'
              : 'Light theme — white / black / lime.',
        },
      ])
      return
    }

    if (cmd.startsWith('open ')) {
      const slug = cmd.slice(5).trim()
      setLines((prev) => [
        ...prev,
        { type: 'out', text: `Opening /projects/${slug}…` },
      ])
      window.setTimeout(() => {
        window.location.href = `/projects/${slug}`
      }, 300)
      return
    }

    const match = terminalCommands[cmd]
    if (!match) {
      setLines((prev) => [
        ...prev,
        { type: 'out', text: `Command not found: ${cmd}. Try help.` },
      ])
      return
    }

    if (match.action === 'clear') {
      setLines([])
      return
    }

    if (match.action === 'egg') {
      playSound('egg')
    }

    setLines((prev) => [
      ...prev,
      ...match.output.map((text) => ({ type: 'out' as const, text })),
    ])
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    run(input)
    setInput('')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-x-3 bottom-3 z-[120] mx-auto w-auto max-w-2xl border border-border-strong bg-bg sm:inset-x-auto sm:right-6 sm:bottom-6 sm:left-auto sm:w-[min(100%,36rem)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Terminal"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="type-mono text-[0.65rem] text-fg-muted">
              terminal · wasiq
            </span>
            <button
              type="button"
              onClick={onClose}
              className="type-mono text-[0.65rem] text-fg-muted hover:text-fg"
            >
              exit
            </button>
          </div>
          <div
            ref={scroller}
            className="max-h-64 overflow-y-auto px-4 py-3 type-mono text-[0.75rem] leading-relaxed"
          >
            {lines.map((line, i) => (
              <p
                key={`${i}-${line.text}`}
                className={
                  line.type === 'in'
                    ? 'text-accent'
                    : line.type === 'sys'
                      ? 'text-fg-subtle'
                      : 'text-fg-muted'
                }
              >
                {line.text}
              </p>
            ))}
          </div>
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-border px-4 py-3"
          >
            <span className="type-mono text-accent">›</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent type-mono text-[0.75rem] outline-none"
              placeholder="type a command"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal command"
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
