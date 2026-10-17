import { ajoutSchema, type Ajout, type Lot } from './curation'
import { classerCandidats, coeurDuNom, type CandidatClasse, type CandidatOsm } from './decouverte'
import { BRIGNAIS, distanceKm } from './distance'
import { normaliser } from './recherche'
import type { Brasserie } from './schema'

/**
 * L'outil « département » (S246, epic E25). Ce module ne lit pas le réseau :
 * il fusionne ce que `outils/departement.ts` a lu du registre SIRENE (code
 * 11.05Z) et la couche OpenStreetMap, puis assemble ce que les agents ont lu
 * en un lot que Cédric décide ligne par ligne. Rien n'entre dans `data/` ici.
 */

/** Un établissement SIRENE, tel que l'outil le garde de l'API. */
export interface EtablissementSirene {
  siren: string
  siret: string
  /**
   * Nature juridique 1xxx : le nom de l'entreprise est celui d'une personne.
   * Inconnue (`undefined`) : on suppose une personne (revue adverse S246).
   */
  entrepreneurIndividuel: boolean | undefined
  raisonSociale: string
  enseignes: string[]
  adresse: string
  commune: string
  codePostal: string
  lat?: number
  lon?: number
}

export interface Candidat {
  /** `sirene:<siren>` ou l'objet OSM : la clé que les lectures citent. */
  cle: string
  /** `null` : nom à établir par la lecture — jamais le nom d'une personne (S246). */
  nom: string | null
  communes: string[]
  departement: string
  adresses: string[]
  sources: ('sirene' | 'osm')[]
  /** Une personne : ni son nom, ni son SIREN, ni sa position ne se publient. */
  personne: boolean
  siren?: string
  sirets: string[]
  osm: string[]
  site?: string
  lat?: number
  lon?: number
}

const commune = (c: string) => normaliser(c).replace(/[^a-z0-9]+/g, ' ').trim()

/**
 * Le nom d'une entreprise : son enseigne d'abord ; sa raison sociale si ce
 * n'est pas une personne ; sinon aucun. Le nom d'un entrepreneur individuel
 * est une donnée personnelle, pas le nom d'une brasserie (docs/SIRENE.md).
 */
function nomDeLEntreprise(etabs: readonly EtablissementSirene[]): string | null {
  const enseigne = etabs.flatMap((e) => e.enseignes).find((e) => e.trim() !== '')
  if (enseigne !== undefined) return enseigne.trim()
  const e = etabs[0]
  if (e === undefined || e.entrepreneurIndividuel !== false) return null
  return e.raisonSociale.trim() === '' ? null : e.raisonSociale.trim()
}

/**
 * Une brasserie par candidat : les établissements d'une même entreprise
 * (même SIREN) ensemble, puis chaque point OSM rattaché à l'entreprise de sa
 * commune qui a le même cœur de nom. Sans cela, la même brasserie revenait
 * deux fois à Cédric.
 */
export function candidatsDuDepartement(
  sirene: readonly EtablissementSirene[],
  osm: readonly CandidatOsm[],
): Candidat[] {
  const parSiren = new Map<string, EtablissementSirene[]>()
  for (const e of sirene) parSiren.set(e.siren, [...(parSiren.get(e.siren) ?? []), e])
  const candidats: Candidat[] = []
  for (const [siren, etabs] of parSiren) {
    const premier = etabs[0] as EtablissementSirene
    const position = etabs.find((e) => e.lat !== undefined && e.lon !== undefined)
    candidats.push({
      cle: `sirene:${siren}`,
      nom: nomDeLEntreprise(etabs),
      communes: [...new Set(etabs.map((e) => e.commune))],
      departement: premier.codePostal.slice(0, 2),
      adresses: [...new Set(etabs.map((e) => e.adresse))],
      sources: ['sirene'],
      personne: etabs.some((e) => e.entrepreneurIndividuel !== false),
      siren,
      sirets: etabs.map((e) => e.siret),
      osm: [],
      ...(position?.lat === undefined || position.lon === undefined ? {} : { lat: position.lat, lon: position.lon }),
    })
  }
  for (const p of osm) {
    const coeur = coeurDuNom(p.nom)
    const adresse = adresseNormale(p.adresse)
    // Même commune, et même cœur de nom ou même adresse (« Travailleurs de la
    // Mer » et « … de l'Amer » au 23 route de Cherbourg, revue adverse S246).
    // Un candidat déjà rattaché à un point OSM en accueille un second : deux
    // points pour une brasserie ne font pas deux brasseries.
    const meme = candidats.find(
      (c) =>
        c.communes.some((x) => commune(x) === commune(p.commune)) &&
        ((c.nom !== null && coeur !== '' && coeurDuNom(c.nom) === coeur) ||
          (adresse !== '' && c.adresses.some((a) => adresseNormale(a) === adresse))),
    )
    if (meme !== undefined) {
      if (!meme.sources.includes('osm')) meme.sources.push('osm')
      meme.osm.push(p.osm)
      if (p.site !== undefined && meme.site === undefined) meme.site = p.site
      continue
    }
    candidats.push({
      cle: p.osm,
      nom: p.nom,
      communes: [p.commune],
      departement: p.departement,
      adresses: [p.adresse],
      sources: ['osm'],
      personne: false,
      sirets: [],
      osm: [p.osm],
      lat: p.lat,
      lon: p.lon,
      ...(p.site === undefined ? {} : { site: p.site }),
    })
  }
  return candidats
}

/**
 * Une adresse comparable : sans accents ni ponctuation, sans le code postal
 * ni la commune (qui suivent le numéro et la voie). Vide si elle n'a pas de
 * numéro de voie : « Gathemo » seul ne désigne pas un lieu.
 */
function adresseNormale(a: string): string {
  const t = normaliser(a).replace(/[^a-z0-9]+/g, ' ').trim()
  const voie = /^(\d+\s*(?:b|bis|t|ter)?\s+[a-z ]+?)(?:\s\d{5}|$)/.exec(t)
  return voie?.[1]?.trim() ?? ''
}

/** Le préfixe des codes postaux d'un département : « 20 » pour la Corse. */
export function prefixePostal(dep: string): string {
  return dep === '2A' || dep === '2B' ? '20' : dep
}

/**
 * La position qu'une réponse du géocodeur de l'IGN donne pour une fiche,
 * ou `null`. Raté du 17/10 (S248) : « 37 rue Louis Blériot, Martin-Église »
 * est revenu à Bruay-la-Buissière (62), et rien ne le refusait. Revue
 * adverse : la commune n'était pas vérifiée (« Sainte-Marguerite » rendait
 * Sainte-Marguerite-sur-Duclair). Une réponse n'est retenue que dans le
 * département attendu (lu dans `context`, qui distingue 2A de 2B ; le code
 * postal à défaut) et dans la commune attendue ; « à l'adresse » exige un
 * numéro de voie (une rue seule n'en est pas une, S247).
 */
export function positionDuGeocodeur(
  reponse: unknown,
  dep: string,
  communeAttendue: string,
  attendu: 'address' | 'commune' = 'address',
): { lat: number; lon: number; precision: 'address' | 'commune' } | null {
  type Resultat = {
    geometry?: { coordinates?: unknown }
    properties?: { postcode?: unknown; type?: unknown; city?: unknown; context?: unknown }
  }
  const departementDe = (p: Resultat['properties']) =>
    typeof p?.context === 'string'
      ? p.context.split(',')[0]?.trim()
      : typeof p?.postcode === 'string' && p.postcode.startsWith(prefixePostal(dep))
        ? dep
        : undefined
  const f = ((reponse as { features?: Resultat[] }).features ?? []).find((r) => {
    const c = r.geometry?.coordinates
    const p = r.properties
    return (
      Array.isArray(c) &&
      typeof c[0] === 'number' &&
      typeof c[1] === 'number' &&
      departementDe(p) === dep &&
      typeof p?.city === 'string' &&
      commune(p.city) === commune(communeAttendue) &&
      p.type === (attendu === 'address' ? 'housenumber' : 'municipality')
    )
  })
  const coord = f?.geometry?.coordinates as [number, number] | undefined
  if (coord === undefined) return null
  return { lat: Math.round(coord[1] * 1e5) / 1e5, lon: Math.round(coord[0] * 1e5) / 1e5, precision: attendu }
}

export type CandidatEnCause = Candidat & {
  statut: CandidatClasse['statut'] | 'nom-a-etablir'
  fiche?: string
}

/**
 * Le classement de S14 (présent, homonyme, doublon, ambigu, nouveau) pour
 * les candidats nommés. Un candidat sans nom n'est classé ni par nom ni comme
 * doublon d'un autre sans nom : la lecture établira son nom.
 */
export function classerDuDepartement(candidats: readonly Candidat[], fiches: readonly Brasserie[]): CandidatEnCause[] {
  const nommes = candidats.filter((c): c is Candidat & { nom: string } => c.nom !== null)
  // La commune où une fiche existe, s'il y en a une : un candidat à deux
  // communes était classé sur la première seulement (revue adverse S246).
  const communeDe = (c: Candidat) =>
    c.communes.find((x) => fiches.some((f) => commune(f.c) === commune(x))) ?? c.communes[0] ?? ''
  const classes = classerCandidats(
    nommes.map((c) => ({
      osm: c.cle,
      nom: c.nom,
      lat: c.lat ?? Number.NaN,
      lon: c.lon ?? Number.NaN,
      commune: communeDe(c),
      departement: c.departement,
      adresse: c.adresses[0] ?? '',
    })),
    fiches,
  )
  const parCle = new Map(classes.map((k) => [k.osm, k]))
  const parNom = new Map(nommes.map((c) => [c.nom, c]))
  return candidats.map((c) => {
    if (c.nom === null) return { ...c, statut: 'nom-a-etablir' as const }
    const k = parCle.get(c.cle)
    let statut: CandidatEnCause['statut'] = k?.statut ?? 'nouveau'
    // `classerCandidats` dit « doublon » sur le nom seul. Dans une autre
    // commune, c'est peut-être une autre brasserie : proposée, comme ambiguë.
    if (statut === 'doublon' && k?.fiche !== undefined) {
      const autre = parNom.get(k.fiche)
      if (autre !== undefined && !autre.communes.some((x) => c.communes.some((y) => commune(x) === commune(y)))) statut = 'ambigu'
    }
    return { ...c, statut, ...(k?.fiche === undefined ? {} : { fiche: k.fiche }) }
  })
}

/**
 * Ce qui se publie dans `curation/` (dépôt public), et la correspondance qui
 * reste locale. Une personne (entrepreneur individuel) ne publie ni SIREN, ni
 * SIRET, ni position — son SIREN retrouve son nom, sa position son domicile
 * (revue adverse S246) ; sans nom, ni adresse non plus. Dans tous les cas, sa clé devient
 * `personne:<n>` (sans le SIREN).
 */
export function publiables(candidats: readonly CandidatEnCause[]): {
  publies: CandidatEnCause[]
  correspondance: Record<string, string>
} {
  const correspondance: Record<string, string> = {}
  let n = 0
  const publies = candidats.map((c) => {
    if (!c.personne) return c
    const reste: CandidatEnCause = { ...c }
    delete reste.siren
    delete reste.lat
    delete reste.lon
    n++
    const cle = `personne:${String(n)}`
    correspondance[cle] = c.cle
    return { ...reste, cle, sirets: [], ...(c.nom === null ? { adresses: [] } : {}) }
  })
  return { publies, correspondance }
}

export interface Lecture {
  candidat: string
  ajout: unknown
}

/**
 * Ce que les agents ont lu, en lot : chaque lecture valide au schéma d'un
 * ajout (S14) y entre ; les autres sont rendues avec leur raison, jamais
 * corrigées en silence.
 */
export function assemblerLot(
  nom: string,
  lectures: readonly Lecture[],
  connus: { cles: readonly string[]; noms: readonly string[] },
): { lot: Lot; refus: { candidat: string; raison: string }[] } {
  const ajouts: Ajout[] = []
  const refus: { candidat: string; raison: string }[] = []
  const cles = new Set(connus.cles)
  const lus = new Set<string>()
  const noms = new Set(connus.noms)
  for (const l of lectures) {
    const r = ajoutSchema.safeParse(l.ajout)
    let raison: string | undefined
    if (!cles.has(l.candidat)) raison = 'candidat inconnu de ce département'
    else if (lus.has(l.candidat)) raison = 'seconde lecture du même candidat'
    else if (!r.success) raison = r.error.issues.map((i) => `${i.path.join('.')} : ${i.message}`).join(' ; ')
    else if (noms.has(r.data.fiche.n)) raison = `nom déjà pris : « ${r.data.fiche.n} »`
    if (raison !== undefined || !r.success) {
      refus.push({ candidat: l.candidat, raison: raison ?? 'invalide' })
      continue
    }
    lus.add(l.candidat)
    noms.add(r.data.fiche.n)
    ajouts.push(r.data)
  }
  return { lot: { lot: nom, propositions: [], ajouts }, refus }
}

/**
 * Ce qu'un vérificateur a lu d'un candidat, relu ensuite par une personne
 * (`curation/dep-XX-lus.json`, S248). `contact` (S261) : ce que la page
 * `contact.source` publie — site, lien Untappd, téléphone.
 */
export interface LectureAgent {
  cle: string
  n: string
  c: string
  adresse: string | null
  cat: number
  conf: string
  note: string
  src: string
  extrait: string
  beers: unknown[]
  choix?: string
  contact?: { tel?: string; site?: string; untappd?: string; source: string }
}

/**
 * La lecture devenue fiche nouvelle, à la position déjà gardée
 * (`positionDuGeocodeur`) : datée du jour, avec ses sources dans l'ordre
 * `src`, page du contact, requête du géocodeur. Non validée ici :
 * `assemblerLot` passe chaque ajout au schéma.
 */
export function ajoutDeLecture(
  l: LectureAgent,
  dep: string,
  pos: { lat: number; lon: number; precision: 'address' | 'commune' },
  geocodeur: string | undefined,
  aujourdhui: string,
): { candidat: string; ajout: { fiche: Record<string, unknown>; verifieLe: string; sources: string[]; extrait: string; choix?: string } } {
  const fiche = {
    n: l.n,
    c: l.c,
    d: dep,
    lat: pos.lat,
    lon: pos.lon,
    km: Math.round(distanceKm(BRIGNAIS, pos) * 10) / 10,
    cat: l.cat,
    conf: l.conf,
    note: l.note,
    addr: l.adresse ?? l.c,
    src: l.src,
    coordPrecision: pos.precision,
    beers: l.beers,
    ...(l.contact === undefined ? {} : { contact: { ...l.contact, verifieLe: aujourdhui } }),
  }
  const sources = [...new Set([l.src, ...(l.contact === undefined ? [] : [l.contact.source]), ...(geocodeur === undefined ? [] : [geocodeur])])]
  return {
    candidat: l.cle,
    ajout: { fiche, verifieLe: aujourdhui, sources, extrait: l.extrait, ...(l.choix === undefined ? {} : { choix: l.choix }) },
  }
}
