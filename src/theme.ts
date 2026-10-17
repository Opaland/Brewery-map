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
}
