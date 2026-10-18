/**
 * S60 : ce qu'OpenStreetMap dit du téléphone, du site et des horaires des
 * fiches vérifiées. Des pistes pour les lots S61 à S63, jamais des valeurs
 * écrites dans `data/` (CLAUDE.md §0).
 */
import { designeLaFiche, lireElementOverpass, siteSur, type ElementOverpass } from './osm-france'
import type { Brasserie } from './schema'

export interface EtiquettesDeContact {
  tel?: string
  site?: string
  /** `opening_hours` tel qu'OSM l'écrit : la traduction en blocs est S63. */
  horaires?: string
}

const texte = (v: string | undefined): string | undefined => {
  const t = v?.trim()
  return t === undefined || t === '' ? undefined : t
}

export function etiquettesDeContact(tags: Record<string, string>): EtiquettesDeContact {
  const tel = texte(tags['phone']) ?? texte(tags['contact:phone'])
  const site = siteSur(tags['website'] ?? tags['contact:website'])
  const horaires = texte(tags['opening_hours'])
  return {
    ...(tel === undefined ? {} : { tel }),
    ...(site === undefined ? {} : { site }),
    ...(horaires === undefined ? {} : { horaires }),
  }
}

export interface ElementRapproche {
  osm: string
  nom: string
  etiquettes: EtiquettesDeContact
}

export interface FicheRapprochee {
  fiche: string
  elements: ElementRapproche[]
  /**
   * Aucun élément n'est choisi : deux éléments ou plus désignent la fiche, ou
   * son élément en désigne aussi une autre (« La Fabrique » pour « La
   * Fabrique du Faubourg » et « La Beer Fabrique », le 18/10).
   */
  ambigue: boolean
  raison?: string
}

export function rapprocherDuFichier(
  elements: readonly ElementOverpass[],
  fichier: readonly Pick<Brasserie, 'n' | 'lat' | 'lon'>[],
): FicheRapprochee[] {
  const lus = elements.flatMap((e) => {
    const b = lireElementOverpass(e)
    return b === null ? [] : [{ b, etiquettes: etiquettesDeContact(e.tags ?? {}) }]
  })
  const parFiche = fichier.map((f) => ({
    f,
    designants: lus.filter(({ b }) => designeLaFiche(b, f)).map(({ b, etiquettes }) => ({ osm: b.osm, nom: b.nom, etiquettes })),
  }))
  const fichesDe = new Map<string, string[]>()
  for (const { f, designants } of parFiche) for (const e of designants) fichesDe.set(e.osm, [...(fichesDe.get(e.osm) ?? []), f.n])
  return parFiche.map(({ f, designants }) => {
    const autres = [...new Set(designants.flatMap((e) => fichesDe.get(e.osm) ?? []))].filter((n) => n !== f.n)
    const raison =
      designants.length > 1
        ? 'plusieurs éléments'
        : autres.length > 0
          ? `élément partagé avec ${autres.map((n) => `« ${n} »`).join(', ')}`
          : undefined
    return { fiche: f.n, elements: designants, ambigue: raison !== undefined, ...(raison === undefined ? {} : { raison }) }
  })
}

/**
 * Un mobile français (06, 07), écrit en national, en +33 ou en 0033. La
 * règle des lots (S261) ne reprend pas les mobiles, et un mobile peut être
 * le numéro d'une personne : le rapport S60 ne les recopie pas.
 */
export function estUnMobile(tel: string): boolean {
  const chiffres = tel.replace(/\D/g, '').replace(/^(?:0033|33)/, '0')
  return /^0[67]\d{8}$/.test(chiffres)
}

/** Chaque numéro d'une valeur OSM (« ; » les sépare) : les mobiles deviennent « mobile ». */
export function masquerLesMobiles(tel: string): string {
  return tel
    .split(';')
    .map((n) => (estUnMobile(n) ? 'mobile' : n.trim()))
    .join('; ')
}
