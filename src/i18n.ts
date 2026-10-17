import { EN } from './textes/en'

/**
 * L'interface en anglais (S48–S50), pour les visiteurs étrangers (epic E10).
 *
 * La clé d'un texte est le texte français lui-même (à la gettext) : le code
 * reste lisible, et une phrase française oubliée dans le dictionnaire se
 * voit. `tests/unit/i18n.test.ts` lit tous les appels `t('…')` du code et
 * exige leur traduction, et aucune traduction orpheline (CLAUDE.md §4ter).
 *
 * Les fiches (justifications, notes, adresses) restent en français : ce
 * sont des citations de leurs sources, pas des textes de l'application.
 *
 * L'anglais ne s'allume qu'une fois tous les écrans traduits
 * (`ANGLAIS_PRET`, S50) : une interface à moitié traduite serait pire
 * qu'une interface française.
 */
export type Langue = 'fr' | 'en'

export const ANGLAIS_PRET = false

/** La langue de l'interface : la première langue du navigateur que l'on sait parler. */
export function langueDe(langues: readonly string[], anglaisPret: boolean = ANGLAIS_PRET): Langue {
  for (const l of langues) {
    const code = l.toLowerCase().slice(0, 2)
    if (code === 'fr') return 'fr'
    if (code === 'en' && anglaisPret) return 'en'
  }
  return 'fr'
}

let langue: Langue = 'fr'

export function choisirLangue(l: Langue): void {
  langue = l
  if (typeof document !== 'undefined') document.documentElement.lang = l
}

export function langueCourante(): Langue {
  return langue
}

/**
 * Le texte dans la langue de l'interface. `{nom}` est remplacé par
 * `params.nom`, dans les deux langues.
 */
export function t(fr: string, params?: Readonly<Record<string, string | number>>): string {
  const texte = langue === 'en' ? (EN[fr] ?? fr) : fr
  return params === undefined ? texte : texte.replace(/\{(\w+)\}/g, (m, k: string) => String(params[k] ?? m))
}
