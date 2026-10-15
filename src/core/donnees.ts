import brute from '../../data/breweries.json'
import type { Brasserie } from './schema'

/**
 * Les brasseries embarquées dans l'application.
 *
 * La conversion de type est sûre parce que le fichier ne peut pas entrer dans
 * le bundle sans avoir passé `validerBrasseries` : le plugin
 * `build/valider-donnees.ts` fait échouer `vite build` sinon, et
 * `tests/unit/donnees.test.ts` vérifie le même fichier avec le même schéma.
 * Valider une seconde fois à l'exécution ferait embarquer Zod pour rien.
 */
export const BRASSERIES = brute as unknown as readonly Brasserie[]
