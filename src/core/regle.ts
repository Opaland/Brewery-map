/**
 * S265 : la règle de Cédric du 18/10 (`docs/DECISIONS.md`) appliquée aux lots
 * en attente. Elle trie, elle n'écrit rien : chaque numéro accepté entre dans
 * `data/` par un accord de `curation/accords/`, que la garde S230 rejoue.
 *
 * - une proposition est acceptée si chaque source (hors lien OpenStreetMap
 *   et requête du géocodeur) est sur le site officiel de la fiche, et si sa
 *   confiance n'est pas « faible » ;
 * - le site officiel d'une fiche est un `contact.site` proposé pour elle dans
 *   un lot, ou déjà dans `data/`, hors plateformes ;
 * - deux propositions acceptables qui changent un même champ d'une fiche : la
 *   plus récente l'emporte, l'autre est montrée avec sa raison ;
 * - les fiches nouvelles des lots départementaux sont toutes acceptées ;
 *   celles d'autres lots ne sont pas dans la règle.
 */
import { PLATEFORMES, type Lot } from './curation'
import type { Brasserie } from './schema'

export interface LotNomme {
  nom: string
  lot: Lot
}

export interface AMontrer {
  lot: string
  numero: number
  n: string
  raison: string
}

/** Ni une source ni une preuve contraire : le lien OSM d'origine et la requête du géocodeur de l'IGN. */
const NEUTRES = new Set(['openstreetmap.org', 'data.geopf.fr'])

function hote(url: string): string | null {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return null
  }
}

/** Les champs qu'une proposition change ; la position compte pour un. */
function champs(changements: Record<string, unknown>): string[] {
  return [...new Set(Object.keys(changements).map((k) => (['lat', 'lon', 'coordPrecision'].includes(k) ? 'position' : k)))]
}

export function trierParRegle(
  lots: readonly LotNomme[],
  fichier: readonly Pick<Brasserie, 'n' | 'contact'>[] = [],
): { acceptees: Record<string, number[]>; aMontrer: AMontrer[] } {
  const officiels = new Map<string, Set<string>>()
  const ajouter = (n: string, site: string | undefined) => {
    const h = site === undefined ? null : hote(site)
    if (h === null || PLATEFORMES.has(h)) return
    officiels.set(n, (officiels.get(n) ?? new Set()).add(h))
  }
  for (const b of fichier) ajouter(b.n, b.contact?.site)
  for (const { lot } of lots) for (const p of lot.propositions) ajouter(p.n, p.changements.contact?.site)

  const aMontrer: AMontrer[] = []
  const candidates: { lot: string; ordre: number; numero: number; n: string; verifieLe: string; champs: string[] }[] = []
  const acceptees: Record<string, number[]> = {}
  const accepter = (lot: string, numero: number) => (acceptees[lot] = [...(acceptees[lot] ?? []), numero])

  lots.forEach(({ nom, lot }, ordre) => {
    lot.propositions.forEach((p, i) => {
      const numero = i + 1
      const montrer = (raison: string) => aMontrer.push({ lot: nom, numero, n: p.n, raison })
      if (p.changements.conf === 'faible') return montrer('confiance « faible »')
      const siens = officiels.get(p.n)
      if (siens === undefined) return montrer('aucun site officiel connu pour la fiche')
      const etrangere = p.sources.map(hote).find((h) => h === null || (!NEUTRES.has(h) && !siens.has(h)))
      if (etrangere !== undefined) return montrer(`source hors du site officiel : ${etrangere ?? 'lien illisible'}`)
      candidates.push({ lot: nom, ordre, numero, n: p.n, verifieLe: p.verifieLe, champs: champs(p.changements) })
    })
    ;(lot.ajouts ?? []).forEach((a, i) => {
      const numero = lot.propositions.length + i + 1
      if (nom.startsWith('dep-')) accepter(nom, numero)
      else aMontrer.push({ lot: nom, numero, n: a.fiche.n, raison: 'fiche nouvelle hors des lots départementaux : pas dans la règle' })
    })
  })

  // La plus récente d'abord ; à date égale, le lot venu le plus tard.
  const parRecence = [...candidates].sort((a, b) => (a.verifieLe === b.verifieLe ? b.ordre - a.ordre : a.verifieLe < b.verifieLe ? 1 : -1))
  const pris = new Map<string, Map<string, { lot: string; numero: number }>>()
  for (const c of parRecence) {
    const deLaFiche = pris.get(c.n) ?? new Map<string, { lot: string; numero: number }>()
    const conflits = c.champs.filter((k) => deLaFiche.has(k))
    const premier = conflits[0] === undefined ? undefined : deLaFiche.get(conflits[0])
    if (premier !== undefined) {
      aMontrer.push({ lot: c.lot, numero: c.numero, n: c.n, raison: `concurrente de ${premier.lot} n° ${String(premier.numero)} (${conflits.join(', ')}), plus récente` })
      continue
    }
    for (const k of c.champs) deLaFiche.set(k, { lot: c.lot, numero: c.numero })
    pris.set(c.n, deLaFiche)
    accepter(c.lot, c.numero)
  }
  for (const nom of Object.keys(acceptees)) acceptees[nom]?.sort((a, b) => a - b)
  aMontrer.sort((a, b) => {
    const oa = lots.findIndex((l) => l.nom === a.lot)
    const ob = lots.findIndex((l) => l.nom === b.lot)
    return oa === ob ? a.numero - b.numero : oa - ob
  })
  return { acceptees, aMontrer }
}
