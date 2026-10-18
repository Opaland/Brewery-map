/**
 * Le point de rupture (S274) : à partir de 900 px de large, l'écran est
 * celui d'un ordinateur (filtres ouverts, carte à côté de la liste) ; en
 * dessous, celui d'un téléphone. `src/index.css` reprend ces deux requêtes
 * mot pour mot : `tests/unit/point-de-rupture.test.ts` les tient d'accord.
 */
export const ECRAN_LARGE = '(min-width: 900px)'
export const ECRAN_ETROIT = '(max-width: 899px)'
