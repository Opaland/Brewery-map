/**
 * Le point de rupture (S274) : à partir de 900 px de large, l'écran est
 * celui d'un ordinateur (filtres ouverts, carte à côté de la liste) ; en
 * dessous, celui d'un téléphone. `src/index.css` reprend ces deux requêtes
 * mot pour mot : `tests/unit/point-de-rupture.test.ts` les tient d'accord.
 *
 * 899,98 et non 899 : entre 899 et 900 px (zoom, densité de pixels
 * fractionnaire), aucune des deux règles ne s'appliquait (revue globale du
 * 19/10, A28). Il reste 0,02 px sans règle (899,99) : la convention reprise
 * de Bootstrap, faute de mieux sans la syntaxe de plage. Écarté : la syntaxe de plage `(width < 900px)`, inconnue de
 * Safari avant 16.4, que garde un vieux téléphone.
 */
export const ECRAN_LARGE = '(min-width: 900px)'
export const ECRAN_ETROIT = '(max-width: 899.98px)'
