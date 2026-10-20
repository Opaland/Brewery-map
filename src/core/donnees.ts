import premierEcran from '../../data/breweries.json?premier-ecran'
import type { Brasserie } from './schema'

/**
 * Les brasseries embarquées dans l'application, en deux temps (S294) : celles
 * de la région du départ par défaut dans le premier écran, les autres dans
 * un seul fichier, le même pour tous, demandé juste après le premier rendu
 * (`src/core/decoupage.ts`, `build/decouper-donnees.ts`).
 *
 * La conversion de type est sûre parce que le fichier ne peut pas entrer dans
 * le bundle sans avoir passé `validerBrasseries` : le plugin
 * `build/valider-donnees.ts` fait échouer `vite build` sinon, pour chaque part,
 * et `tests/unit/donnees.test.ts` vérifie le même fichier avec le même schéma.
 * Le revalider à chaque ouverture ne prouverait rien de plus : le fichier ne
 * change pas entre le build et l'écran. (Zod est tout de même embarqué depuis
 * S9, pour relire les réglages gardés dans le téléphone, `preferences.ts`.)
 */
export const FICHES_PREMIER_ECRAN = premierEcran as readonly Brasserie[]

/**
 * La suite : toujours la même demande, quelle que soit la position (AR3,
 * `docs/ARCHITECTURE.md` §4). Rejette si le fichier ne vient pas (hors
 * ligne, sans cache).
 */
export const chargerSuite = (): Promise<readonly Brasserie[]> =>
  import('../../data/breweries.json?suite').then((m) => m.default as readonly Brasserie[])
