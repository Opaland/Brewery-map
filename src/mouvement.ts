/**
 * La personne a-t-elle demandé moins de mouvement (réglage du système) ?
 * Lu à chaque geste, pas une fois : le réglage peut changer en cours de route.
 * Une seule fonction pour la liste et la carte (CLAUDE.md §4).
 */
export function mouvementReduit(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
