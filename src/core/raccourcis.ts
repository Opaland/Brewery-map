/**
 * Les raccourcis de l'application installée (S46) : un appui long sur son
 * icône propose « Autour de moi » et « Mes favoris ». Ils ouvrent l'adresse
 * `?raccourci=…` ; rien d'autre n'est lu dans l'adresse, et un test vérifie
 * que le manifeste et cette liste disent la même chose (CLAUDE.md §4ter).
 */
export const RACCOURCIS = ['autour', 'favoris'] as const
export type Raccourci = (typeof RACCOURCIS)[number]

export function lireRaccourci(recherche: string): Raccourci | undefined {
  const r = new URLSearchParams(recherche).get('raccourci')
  return RACCOURCIS.find((x) => x === r)
}
