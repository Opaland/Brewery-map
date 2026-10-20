import liste from '@etalab/decoupage-administratif/data/departements.json'

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

export const DEPARTEMENTS_PREMIER_ECRAN: ReadonlySet<string> = new Set(
  DEPARTEMENTS.filter((d) => d.region === REGION_DU_DEPART).map((d) => d.code),
)

export type Part = 'premier-ecran' | 'suite'

/** Les fiches d'une part, dans l'ordre du fichier. */
export function partDesFiches<T extends { d: string }>(fiches: readonly T[], part: Part): T[] {
  return fiches.filter((f) => DEPARTEMENTS_PREMIER_ECRAN.has(f.d) === (part === 'premier-ecran'))
}
