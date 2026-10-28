/**
 * Les cinq catégories de vente, sans dépendance à Zod : ce fichier part dans
 * le bundle, le schéma n'y part pas (la validation a lieu au build).
 *
 * Les codes suivent le prompt v2 de Cédric : 0 est « À confirmer », une
 * catégorie à part entière et non une erreur. Le 4 vient de sa demande du
 * 28/10 (S368, `docs/DECISIONS.md`) : on boit sur place, sans pouvoir
 * acheter à emporter.
 */
export const CATEGORIES = {
  0: 'À confirmer',
  1: 'Acheter et consommer sur place',
  2: 'Acheter seulement',
  3: 'Pas de vente',
  4: 'Consommer sur place seulement',
} as const

/**
 * Ordre d'affichage : de ce qu'on peut le plus faire à ce qui n'est pas
 * établi. Le 4 suit le 1 : on y boit aussi sur place.
 */
export const ORDRE_CATEGORIES = [1, 4, 2, 3, 0] as const
