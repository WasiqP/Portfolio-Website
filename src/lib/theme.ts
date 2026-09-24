export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'portfolio-theme'
export const THEME_ATTRIBUTE = 'data-theme'

/** Inline script — runs before paint to prevent theme flash */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'dark' || stored === 'light' ? stored : 'light';
    document.documentElement.setAttribute('${THEME_ATTRIBUTE}', theme);
  } catch (e) {
    document.documentElement.setAttribute('${THEME_ATTRIBUTE}', 'light');
  }
})();
`.trim()
