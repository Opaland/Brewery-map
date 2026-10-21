import liste from '@etalab/decoupage-administratif/data/departements.json'
import regions from '@etalab/decoupage-administratif/data/regions.json'

/**
 * Les fiches en deux temps (S294). Le premier écran ne porte que les
 * départements de la région du départ par défaut (Brignais, Rhône :
 * Auvergne-Rhône-Alpes) ; les autres arrivent juste après, dans un seul
 * fichier, le même pour tout le monde et toujours demandé : le réseau
 * n'apprend rien de la position (revue d'architecture S295, AR3). Le
 * découpage se fait au build, `data/breweries.json` reste la source (AR8) :
 * `build/decouper-donnees.ts`.
 *
 * Une région administrative plutôt qu'un rayon : la règle se lit dans le
 * Code officiel géographique, sans seuil à inventer (CLAUDE.md §2).
 */
const DEPARTEMENT_DU_DEPART = '69'

const DEPARTEMENTS = liste as readonly { code: string; region: string }[]
const REGION_DU_DEPART = DEPARTEMENTS.find((d) => d.code === DEPARTEMENT_DU_DEPART)?.region

/**
 * Le nom de cette région, tel que le Code officiel géographique l'écrit. Les
 * textes de l'écran qui la nomment (« hors d'Auvergne-Rhône-Alpes ») sont
 * tenus d'accord avec lui par `tests/unit/region.test.ts` (S331) : importer
 * ce module dans la page y mettrait la liste des départements.
 */
export const NOM_REGION_DU_DEPART = (regions as readonly { code: string; nom: string }[]).find(
  (r) => r.code === REGION_DU_DEPART,
)?.nom

export const DEPARTEMENTS_PREMIER_ECRAN: ReadonlySet<string> = new Set(
  DEPARTEMENTS.filter((d) => d.region === REGION_DU_DEPART).map((d) => d.code),
)

export type Part = 'premier-ecran' | 'suite'

/** Les fiches d'une part, dans l'ordre du fichier. */
export function partDesFiches<T extends { d: string }>(fiches: readonly T[], part: Part): T[] {
  return fiches.filter((f) => DEPARTEMENTS_PREMIER_ECRAN.has(f.d) === (part === 'premier-ecran'))
}
