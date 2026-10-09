export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'portfolio-theme'
export const THEME_ATTRIBUTE = 'data-theme'
export const THEME_CHANGE_EVENT = 'portfolio-theme-change'

export function normalizeTheme(value: string | null | undefined): Theme {
  if (value === 'dark' || value === 'brand') return 'dark'
  return 'light'
}

export function readDocumentTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return normalizeTheme(
    document.documentElement.getAttribute(THEME_ATTRIBUTE)
  )
}

export function applyDocumentTheme(theme: Theme) {
  const next = normalizeTheme(theme)
  document.documentElement.setAttribute(THEME_ATTRIBUTE, next)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next)
  } catch {
    /* private mode — ignore */
  }
  window.dispatchEvent(
    new CustomEvent(THEME_CHANGE_EVENT, { detail: next })
  )
  return next
}

/** Hydration-safe init: stored preference → system → light */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'dark' || stored === 'brand'
      ? 'dark'
      : stored === 'light'
        ? 'light'
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('${THEME_ATTRIBUTE}', theme);
  } catch (e) {
    document.documentElement.setAttribute('${THEME_ATTRIBUTE}', 'light');
  }
})();
`.trim()
