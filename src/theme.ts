import type { Theme } from './core/preferences'

/**
 * Le thème au choix (S45) : `data-theme` sur la racine, lu par les règles
 * que `build/theme.ts` tire des blocs sombres de la feuille. « auto » le
 * retire : le système décide.
 */
export function appliquerTheme(theme: Theme): void {
  const racine = document.documentElement
  if (theme === 'auto') delete racine.dataset['theme']
  else racine.dataset['theme'] = theme
  // Le miroir que `public/theme-precoce.js` lit avant le premier rendu.
  try {
    if (theme === 'auto') localStorage.removeItem(CLE_THEME)
    else localStorage.setItem(CLE_THEME, theme)
  } catch {
    // Stockage refusé : pas de miroir, le thème vient au rendu.
  }
}

export const CLE_THEME = 'mousse-de-poche-theme'
