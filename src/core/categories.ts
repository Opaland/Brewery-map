/**
 * Les quatre catégories de vente, sans dépendance à Zod : ce fichier part dans
 * le bundle, le schéma n'y part pas (la validation a lieu au build).
 *
 * Les codes suivent le prompt v2 de Cédric : 0 est « À confirmer », une
 * catégorie à part entière et non une erreur.
 */
export const CATEGORIES = {
  0: 'À confirmer',
  1: 'Acheter et consommer sur place',
  2: 'Acheter seulement',
  3: 'Pas de vente',
} as const

/** Ordre d'affichage : de ce qu'on peut le plus faire à ce qui n'est pas établi. */
export const ORDRE_CATEGORIES = [1, 2, 3, 0] as const
