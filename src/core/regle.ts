/**
 * S265 : la règle de Cédric du 18/10 (`docs/DECISIONS.md`) appliquée aux lots
 * en attente. Elle trie, elle n'écrit rien : chaque numéro accepté entre dans
 * `data/` par un accord de `curation/accords/`, que la garde S230 rejoue.
 *
 * - une proposition est acceptée si chaque source (hors lien OpenStreetMap
 *   et requête du géocodeur) est sur le site officiel de la fiche, si l'une au
 *   moins y est, et si sa confiance n'est pas « faible » ;
 * - le centre IGN de la commune (S268) est accepté quand ses seules sources
 *   sont la requête de commune au géocodeur (et le lien OSM d'origine) ;
 * - un téléphone mobile n'est jamais accepté : la règle dit « téléphones
 *   fixes », et un mobile peut être le numéro d'une personne (revue S266 :
 *   14 propositions en écrivaient un) ;
 * - le site officiel d'une fiche est un `contact.site` proposé pour elle dans
 *   un lot, ou déjà dans `data/`, hors plateformes, offices et annuaires ;
 * - deux propositions acceptables qui changent un même champ d'une fiche : la
 *   plus récente l'emporte, l'autre est montrée avec sa raison ;
 * - les fiches nouvelles des lots départementaux sont toutes acceptées ;
 *   celles d'autres lots ne sont pas dans la règle.
 */
import { estUneRequeteDeCommune, PLATEFORMES, type Lot } from './curation'
import { estUnMobile } from './osm-etiquettes'
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

/**
 * Ce qui ne peut pas être le site d'une brasserie, même proposé comme tel :
 * offices de tourisme, annuaires, guides et agrégateurs (DECISIONS #37 ; revue
 * adverse S265). Le motif est volontairement étroit : les 59 sites proposés
 * au 18/10 sont tous des sites de brasserie, et aucun ne le croise.
 */
const NON_OFFICIELS =
  /touris|annuaire|pagesjaunes|petitfute|wanderlog|tripadvisor|privateaser|lefooding|sluurpy|xerfi|atlantic-loire-valley|guide-de-la-vendee|destination-mayenne|tourainevaldeloire/
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
    if (h === null || PLATEFORMES.has(h) || NON_OFFICIELS.test(h)) return
    officiels.set(n, (officiels.get(n) ?? new Set()).add(h))
  }
  for (const b of fichier) ajouter(b.n, b.contact?.site)
  for (const { lot } of lots) for (const p of lot.propositions) ajouter(p.n, p.changements.contact?.site)

  const aMontrer: AMontrer[] = []
  const candidates: { lot: string; ordre: number; numero: number; n: string; verifieLe: string; champs: string[]; centre: boolean }[] = []
  const acceptees: Record<string, number[]> = {}
  const accepter = (lot: string, numero: number) => (acceptees[lot] = [...(acceptees[lot] ?? []), numero])

  lots.forEach(({ nom, lot }, ordre) => {
    lot.propositions.forEach((p, i) => {
      const numero = i + 1
      const montrer = (raison: string) => aMontrer.push({ lot: nom, numero, n: p.n, raison })
      if (p.changements.conf === 'faible') return montrer('confiance « faible »')
      const tel = p.changements.contact?.tel
      if (tel !== undefined && estUnMobile(tel)) return montrer('téléphone mobile : peut être le numéro d’une personne')
      // Le centre IGN de la commune (S268) : la réponse de Cédric du 18/10
      // (« Centre de commune IGN ») vaut pour toute fiche sans adresse
      // vérifiée ; la source est la requête de commune, pas le site.
      // La position seule : une catégorie ou une note dans la même
      // proposition n'a pas de preuve (revue adverse S268).
      const centreIgn =
        p.changements.coordPrecision === 'centre' &&
        champs(p.changements).join() === 'position' &&
        p.sources.some(estUneRequeteDeCommune) &&
        p.sources.every((u) => estUneRequeteDeCommune(u) || hote(u) === 'openstreetmap.org')
      if (centreIgn) {
        candidates.push({ lot: nom, ordre, numero, n: p.n, verifieLe: p.verifieLe, champs: champs(p.changements), centre: true })
        return
      }
      const siens = officiels.get(p.n)
      if (siens === undefined) return montrer('aucun site officiel connu pour la fiche')
      const etrangere = p.sources.map(hote).find((h) => h === null || (!NEUTRES.has(h) && !siens.has(h)))
      if (etrangere !== undefined) return montrer(`source hors du site officiel : ${etrangere ?? 'lien illisible'}`)
      // Des sources toutes neutres (géocodeur, OSM) ne viennent pas du site officiel (revue adverse S265).
      if (!p.sources.some((u) => siens.has(hote(u) ?? ''))) return montrer('aucune source sur le site officiel')
      candidates.push({ lot: nom, ordre, numero, n: p.n, verifieLe: p.verifieLe, champs: champs(p.changements), centre: false })
    })
    ;(lot.ajouts ?? []).forEach((a, i) => {
      const numero = lot.propositions.length + i + 1
      if (nom.startsWith('dep-')) accepter(nom, numero)
      else aMontrer.push({ lot: nom, numero, n: a.fiche.n, raison: 'fiche nouvelle hors des lots départementaux : pas dans la règle' })
    })
    // S298 : retirer une fiche n'est pas dans la règle du 18/10.
    ;(lot.retraits ?? []).forEach((r, i) => {
      const numero = lot.propositions.length + (lot.ajouts ?? []).length + i + 1
      aMontrer.push({ lot: nom, numero, n: r.n, raison: 'retrait : seulement sur l’accord écrit de Cédric' })
    })
  })

  // Un centre IGN passe après tout le reste : une adresse vérifiée, même plus
  // ancienne, est plus précise (revue adverse S268). Puis la plus récente
  // d'abord ; à date égale, le lot venu le plus tard.
  const parRecence = [...candidates].sort((a, b) =>
    a.centre !== b.centre ? Number(a.centre) - Number(b.centre) : a.verifieLe === b.verifieLe ? b.ordre - a.ordre : a.verifieLe < b.verifieLe ? 1 : -1,
  )
  const pris = new Map<string, Map<string, { lot: string; numero: number; centre: boolean }>>()
  for (const c of parRecence) {
    const deLaFiche = pris.get(c.n) ?? new Map<string, { lot: string; numero: number; centre: boolean }>()
    const conflits = c.champs.filter((k) => deLaFiche.has(k))
    const premier = conflits[0] === undefined ? undefined : deLaFiche.get(conflits[0])
    if (premier !== undefined) {
      const pourquoi = c.centre && !premier.centre ? 'plus précise' : 'plus récente'
      aMontrer.push({ lot: c.lot, numero: c.numero, n: c.n, raison: `concurrente de ${premier.lot} n° ${String(premier.numero)} (${conflits.join(', ')}), ${pourquoi}` })
      continue
    }
    for (const k of c.champs) deLaFiche.set(k, { lot: c.lot, numero: c.numero, centre: c.centre })
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

/**
 * S272 : un numéro qu'un accord a déjà fait entrer dans `data/` (même lot,
 * même empreinte : `curation/accords/`) ne se décide plus ; il sort des deux
 * listes, et il est compté à part. Un accord à une autre empreinte (le lot a
 * changé depuis) ne compte pas : mieux vaut montrer deux fois qu'oublier.
 */
export function sansLesAppliquees(
  acceptees: Readonly<Record<string, readonly number[]>>,
  aMontrer: readonly AMontrer[],
  accords: readonly { lot: string; empreinte: string; acceptees: readonly number[] }[],
  empreintes: ReadonlyMap<string, string>,
): { acceptees: Record<string, number[]>; aMontrer: AMontrer[]; appliquees: Record<string, number[]> } {
  const faits = new Map<string, Set<number>>()
  for (const a of accords) {
    if (empreintes.get(a.lot) !== a.empreinte) continue
    const s = faits.get(a.lot) ?? new Set<number>()
    for (const k of a.acceptees) s.add(k)
    faits.set(a.lot, s)
  }
  const fait = (lot: string, k: number) => faits.get(lot)?.has(k) ?? false
  return {
    acceptees: Object.fromEntries(Object.entries(acceptees).map(([lot, nums]) => [lot, nums.filter((k) => !fait(lot, k))])),
    aMontrer: aMontrer.filter((m) => !fait(m.lot, m.numero)),
    appliquees: Object.fromEntries([...faits].map(([lot, s]) => [lot, [...s].sort((x, y) => x - y)])),
  }
}
