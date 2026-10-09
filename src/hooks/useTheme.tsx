'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  THEME_CHANGE_EVENT,
  applyDocumentTheme,
  normalizeTheme,
  readDocumentTheme,
  type Theme,
} from '@/lib/theme'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    setThemeState(readDocumentTheme())

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<Theme>).detail
      setThemeState(normalizeTheme(detail ?? readDocumentTheme()))
    }
    window.addEventListener(THEME_CHANGE_EVENT, onChange)
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onChange)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    applyDocumentTheme(next)
  }, [])

  const toggleTheme = useCallback(() => {
    // Flip from the live DOM attribute — React state can lag the init script
    // and would otherwise re-apply the same theme on the first click.
    const current = readDocumentTheme()
    applyDocumentTheme(current === 'dark' ? 'light' : 'dark')
  }, [])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
