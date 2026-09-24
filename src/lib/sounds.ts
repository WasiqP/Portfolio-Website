/** Sound stubs — muted by default. Wire real files under /public/sounds later. */

export type SoundId = 'toggle' | 'click' | 'success' | 'egg'

const enabledKey = 'portfolio-sounds'

export function soundsEnabled(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(enabledKey) === 'on'
  } catch {
    return false
  }
}

export function setSoundsEnabled(on: boolean) {
  try {
    localStorage.setItem(enabledKey, on ? 'on' : 'off')
  } catch {
    /* ignore */
  }
}

export function playSound(_id: SoundId) {
  if (!soundsEnabled()) return
  // Intentionally silent until assets exist — API stays stable.
}
