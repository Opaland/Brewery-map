import { t } from '../i18n'
import { communeLaPlusProche, type CommuneFrance, type Rectangle } from './communes'
import { coeurDuNom } from './decouverte'
import { normaliser } from './recherche'
import { z } from './zod'
import { BRIGNAIS, distanceKm } from './distance'
import type { Brasserie } from './schema'

/**
 * Toute la France (S25, demande de Cédric du 16/10 : « ouvrir toute la
 * France »). Les brasseries qu'OpenStreetMap connaît (`craft=brewery`),
 * lues par `outils/osm-france.ts`, forment une couche **à part** de
 * `data/` : rien n'y entre sans l'accord de Cédric (CLAUDE.md §0). Ce module
 * ne lit pas le réseau ; il trie ce que l'outil a lu.
 */

/** Un élément tel que le rend Overpass (`out center tags`). */
export interface ElementOverpass {
  type: string
  id: number
  lat?: number
  lon?: number
  center?: { lat: number; lon: number }
  tags?: Record<string, string>
}

export interface BrasserieOsmBrute {
  osm: string
  nom: string
  lat: number
  lon: number
  cp?: string
  ville?: string
  pays?: string
  adresse: string
  site?: string
}

const texte = (v: string | undefined): string | undefined => {
  const t = v?.trim()
  return t === undefined || t === '' ? undefined : t
}

/** Un site seulement s'il est http(s) : le protocole lu sur l'URL analysée (CLAUDE.md §6bis). */
export function siteSur(v: string | undefined): string | undefined {
  const t = texte(v)
  if (t === undefined) return undefined
  try {
    const u = new URL(t)
    return u.protocol === 'https:' || u.protocol === 'http:' ? t : undefined
  } catch {
    return undefined
  }
}

/** Un élément nommé, avec une position ; `null` sinon (rien n'est deviné). */
export function lireElementOverpass(e: ElementOverpass): BrasserieOsmBrute | null {
  const tags = e.tags ?? {}
  // « Maison PIP;Maison Pip » : OSM sépare les variantes par « ; » (revue S25).
  const nom = texte((tags['name'] ?? tags['name:fr'])?.split(';')[0])
  const lat = e.lat ?? e.center?.lat
  const lon = e.lon ?? e.center?.lon
  if (nom === undefined || lat === undefined || lon === undefined) return null
  const cp = texte(tags['addr:postcode'])
  const ville = texte(tags['addr:city'])
  const pays = texte(tags['addr:country'])
  const rue = [texte(tags['addr:housenumber']), texte(tags['addr:street'])].filter(Boolean).join(' ')
  const lieu = [cp, ville].filter(Boolean).join(' ')
  const site = siteSur(tags['website'] ?? tags['contact:website'])
  return {
    osm: `${e.type}/${String(e.id)}`,
    nom,
    lat,
    lon,
    ...(cp === undefined ? {} : { cp }),
    ...(ville === undefined ? {} : { ville }),
    ...(pays === undefined ? {} : { pays }),
    adresse: [rue, lieu].filter((x) => x !== '').join(', '),
    ...(site === undefined ? {} : { site }),
  }
}

export type Rattachement = { commune: string; dep: string; deduite: boolean } | { exclu: string }

/**
 * Au-delà, un point n'est rattaché à aucune commune : la mer, ou l'étranger
 * dans le rectangle de la requête. 10 km : seuil qui change ce qui est
 * gardé (CLAUDE.md §2), tranché au jugement — en métropole, les communes
 * sont serrées (environ 35 000 pour 550 000 km²). Mesuré le 16/10 : 363
 * points écartés par cette règle, non revus un à un ; parmi les gardés, le
 * plus loin est à 9,6 km d'une commune. Un point étranger à moins de 10 km
 * de la frontière et sans code postal passe : il est dit « commune
 * déduite ».
 */
const RAYON_COMMUNE_KM = 10
/** Marge autour du rectangle des centres de communes d'un département. */
const MARGE_DEPARTEMENT_KM = 15

function departementDuCodePostal(cp: string): string {
  if (cp.startsWith('97')) return cp.slice(0, 3)
  if (cp.startsWith('20')) return cp < '20200' ? '2A' : '2B'
  return cp.slice(0, 2)
}

function dansLeRectangle(r: Rectangle, lat: number, lon: number, margeKm: number): boolean {
  const [sud, ouest, nord, est] = r
  const dLat = margeKm / 111.32
  const dLon = margeKm / (111.32 * Math.cos((lat * Math.PI) / 180))
  return lat >= sud - dLat && lat <= nord + dLat && lon >= ouest - dLon && lon <= est + dLon
}

/**
 * La commune et le département d'une brasserie OSM, ou la raison de
 * l'écarter. Le code postal fait foi s'il est français et cohérent avec la
 * position (un code allemand à 5 chiffres se lirait comme un département
 * français lointain) ; sans ville, la commune la plus proche, **dite
 * déduite** à l'écran.
 */
export function rattacher(
  b: BrasserieOsmBrute,
  communes: readonly CommuneFrance[],
  rectangles: Readonly<Record<string, Rectangle>>,
): Rattachement {
  if (b.pays !== undefined && b.pays.toUpperCase() !== 'FR') return { exclu: 'pays étranger' }
  let dep: string | undefined
  if (b.cp !== undefined) {
    if (!/^\d{5}$/.test(b.cp)) return { exclu: 'code postal étranger' }
    const d = departementDuCodePostal(b.cp)
    const r = rectangles[d]
    if (r === undefined || !dansLeRectangle(r, b.lat, b.lon, MARGE_DEPARTEMENT_KM)) {
      return { exclu: 'code postal étranger' }
    }
    dep = d
  }
  const proche = communeLaPlusProche(communes, b)
  if (proche === undefined) return { exclu: 'loin de toute commune française' }
  if (dep === undefined && distanceKm(b, { lat: proche[2], lon: proche[3] }) > RAYON_COMMUNE_KM) {
    return { exclu: 'loin de toute commune française' }
  }
  if (b.ville !== undefined) return { commune: b.ville, dep: dep ?? proche[1], deduite: false }
  return { commune: proche[0], dep: dep ?? proche[1], deduite: true }
}

/**
 * Des noms uniques : les favoris, la sélection et la carte tiennent au nom
 * (S9). Un nom répété, ou déjà pris par le fichier, reçoit sa commune entre
 * parenthèses ; s'il se répète encore, l'objet OSM. Présentation seule : le
 * nom OSM reste lisible en tête.
 */
export function nomsUniques<T extends { n: string; c: string; osm: string }>(
  liste: readonly T[],
  pris: ReadonlySet<string> = new Set(),
): T[] {
  const compte = new Map<string, number>()
  for (const x of liste) compte.set(x.n, (compte.get(x.n) ?? 0) + 1)
  const avecCommune = new Map<string, number>()
  for (const x of liste) {
    const k = `${x.n} (${x.c})`
    avecCommune.set(k, (avecCommune.get(k) ?? 0) + 1)
  }
  return liste.map((x) => {
    if ((compte.get(x.n) ?? 0) === 1 && !pris.has(x.n)) return x
    const k = `${x.n} (${x.c})`
    if ((avecCommune.get(k) ?? 0) === 1 && !pris.has(k)) return { ...x, n: k }
    return { ...x, n: `${x.n} (${x.c}, ${x.osm})` }
  })
}

// ── Le fichier publié, relu par l'application ───────────────────────────

const ligneOsmSchema = z.tuple([
  z.string().min(1),
  z.string().regex(/^(node|way|relation)\/\d+$/),
  z.string().min(1),
  z.string().regex(/^(\d{2}|2A|2B|97\d)$/),
  z.number().min(-90).max(90),
  z.number().min(-180).max(180),
  z.string(),
  // Le site part dans un `href` : vide, ou http(s) lu sur l'URL analysée (CLAUDE.md §6bis).
  z.string().refine((v) => v === '' || siteSur(v) === v, 'site : seulement http(s)'),
  z.union([z.literal(0), z.literal(1)]),
])

export const fichierOsmSchema = z.object({
  source: z.string(),
  licence: z.string(),
  extrait: z.string(),
  brasseries: z.array(ligneOsmSchema),
})
export type FichierOsm = z.infer<typeof fichierOsmSchema>

/**
 * Le fichier OSM est valide, ses noms uniques, et aucun ne reprend un nom
 * du fichier de Cédric : les favoris et la sélection tiennent au nom (S9).
 * Appelée par le build (`build/valider-donnees.ts`) et les tests : une seule
 * fois écrite (CLAUDE.md §4).
 */
export function validerFichierOsm(
  contenu: unknown,
  nomsDuFichier: ReadonlySet<string>,
  /**
   * Les fiches du fichier, pour la règle « même brasserie » (nom voisin, à
   * moins de `RAYON_MEME_BRASSERIE_KM`) : elle ne tournait que si l'on
   * pensait à lancer `outils/osm-retirer.ts` (revue d'architecture S295,
   * §6quater). Le build la passe toujours.
   */
  fiches: readonly Pick<Brasserie, 'n' | 'lat' | 'lon'>[] = [],
): { ok: true } | { ok: false; erreurs: string[] } {
  const r = fichierOsmSchema.safeParse(contenu)
  if (!r.success) return { ok: false, erreurs: r.error.issues.map((i) => `${i.path.join('.')} : ${i.message}`) }
  const erreurs: string[] = []
  const vus = new Set<string>()
  for (const ligne of r.data.brasseries) {
    const [nom, osm] = ligne
    if (nomsDuFichier.has(nom)) erreurs.push(`${osm} : « ${nom} » est déjà un nom du fichier`)
    if (vus.has(nom)) erreurs.push(`${osm} : « ${nom} » est en double`)
    vus.add(nom)
    const [, , , , lat, lon] = ligne
    const meme = fiches.find((b) => b.n !== nom && designeLaFiche({ nom, lat, lon }, b))
    if (meme !== undefined) erreurs.push(`${osm} : « ${nom} » désigne la fiche « ${meme.n} » (npx tsx outils/osm-retirer.ts)`)
  }
  return erreurs.length === 0 ? { ok: true } : { ok: false, erreurs }
}

export const NOTE_OSM =
  'Repérée sur OpenStreetMap (carte collaborative) comme brasserie ; rien d’autre n’est vérifié : ni la vente, ni l’accueil, ni si elle est encore en activité.'
export const NOTE_COMMUNE_DEDUITE = ' La commune est déduite de sa position : OpenStreetMap ne la donne pas.'

/** Une fiche de la couche OSM : son site, s'il est connu d'OSM (revue persona S25). */
export type BrasserieOsm = Brasserie & { siteOsm?: string }

/** Les lignes du fichier OSM en fiches « À confirmer », comme celles de S14 (`ajoutDepuisOsm`). */
export function brasseriesDepuisFichierOsm(f: FichierOsm): BrasserieOsm[] {
  return f.brasseries.map(([n, osm, c, d, lat, lon, adresse, site, deduite]) => ({
    ...(site === '' ? {} : { siteOsm: site }),
    n,
    c,
    d,
    lat,
    lon,
    km: Math.round(distanceKm(BRIGNAIS, { lat, lon }) * 10) / 10,
    cat: 0,
    conf: '',
    note: deduite === 1 ? NOTE_OSM + NOTE_COMMUNE_DEDUITE : NOTE_OSM,
    // Une rue sans commune se lirait n'importe où : la commune s'ajoute, dite
    // déduite (revue adverse S25 : 123 adresses sans commune ni code postal).
    addr: adresse === '' ? c : deduite === 1 ? `${adresse}, ${c} (commune déduite)` : adresse,
    src: `https://www.openstreetmap.org/${osm}`,
    coordPrecision: 'osm',
    beers: [],
  }))
}

/**
 * Au-delà, deux noms voisins sont deux brasseries. 20 km : seuil qui change
 * ce qui est gardé (CLAUDE.md §2), tranché sur la mesure du 16/10 — des 55
 * paires de noms voisins entre OSM et le fichier, toutes celles à moins de
 * 20 km étaient la même brasserie (Caribrew à 6,6 km, Kura à 18,6 km), et
 * au-delà, des homonymes (« Chez Georges » à 427 km de Brasserie Georges).
 */
const RAYON_MEME_BRASSERIE_KM = 20

const contientMot = (a: string, b: string) => ` ${a} `.includes(` ${b} `)
/** « guiers » et « guier » : le pluriel ne fait pas une autre brasserie (revue adverse S25). */
const auSingulier = (k: string) =>
  k
    .split(' ')
    .map((m) => (m.length > 3 && m.endsWith('s') ? m.slice(0, -1) : m))
    .join(' ')

/**
 * Le nom de la fiche du fichier qui est probablement la même brasserie :
 * même cœur de nom, ou l'un contient l'autre, à moins de 20 km.
 */
export function dejaDansLeFichier(
  c: { nom: string; lat: number; lon: number },
  fichier: readonly Brasserie[],
): string | undefined {
  return fichier.find((b) => designeLaFiche(c, b))?.n
}

/**
 * La règle de `dejaDansLeFichier`, pour une paire : même cœur de nom, ou
 * l'un contient l'autre, à moins de 20 km. Partagée avec le rapprochement
 * des étiquettes (S60), pour qu'une seule règle dise « même brasserie » (§4).
 */
export function designeLaFiche(
  c: { nom: string; lat: number; lon: number },
  b: Pick<Brasserie, 'n' | 'lat' | 'lon'>,
): boolean {
  const k = auSingulier(coeurDuNom(c.nom))
  const kb = auSingulier(coeurDuNom(b.n))
  if (k === '' || kb === '' || !(kb === k || contientMot(kb, k) || contientMot(k, kb))) return false
  return distanceKm(c, b) < RAYON_MEME_BRASSERIE_KM
}

/** Ce qui dit la bière dans un nom (« brasserie », « brew », « bière », « malt »…). */
const MOTS_BIERE = /bras|brew|bier|beer|malt|houblon|\bhop|brau|brouw|taproom|zythum|cervoise/
/** Ce qui dit la restauration sans ambiguïté. */
const MOTS_REPAS = /pizz|sushi|kebab|burger|mcdrive|mcdo|creperie|snack|traiteur|restaurant/
const AMENITES_REPAS = new Set(['restaurant', 'cafe', 'fast_food', 'bar', 'pub', 'biergarten', 'nightclub'])
const MOTS_FERMEE = /\b(ancienne?|incertaine?|fermee?|desaffectee?)\b/

/**
 * Pourquoi écarter un objet `craft=brewery`, ou `undefined` (revue persona
 * S25 : « brasserie » est aussi un restaurant, et « Tutti Pizza » envoyait
 * Hugo vers une pizzeria). Mesuré le 16/10 sur les 1 071 gardées avant ce filtre :
 * - un nom de restauration écarte, sauf s'il dit aussi la bière ;
 * - un café, un bar, un restaurant selon OSM (`amenity`) écarte s'il n'y a
 *   aucune preuve qu'on y brasse (`product=beer`, `microbrewery=yes`, un mot
 *   de la bière dans le nom) : 29 lieux, dont « Le Gambetta », mais aussi
 *   La Singulière, vraie brasserie étiquetée bar — perte acceptée ;
 * - les noms qui disent « ancienne », « incertaine », « fermée ».
 * Les 242 sans preuve ni étiquette de restauration restent : « Kataclysm »,
 * « Moulins d'Ascq » sont de vraies brasseries.
 */
export function raisonDEcarter(nom: string, etiquettes: Readonly<Record<string, string>>): string | undefined {
  const n = normaliser(nom)
  if (MOTS_FERMEE.test(n)) return 'fermée ou incertaine'
  const biereDansLeNom = MOTS_BIERE.test(n)
  if (MOTS_REPAS.test(n) && !biereDansLeNom) return 'restauration'
  const preuve =
    (etiquettes['product'] ?? '').includes('beer') || etiquettes['microbrewery'] === 'yes' || biereDansLeNom
  if (!preuve && AMENITES_REPAS.has(etiquettes['amenity'] ?? '')) return 'restauration'
  return undefined
}

/** La fiche vient de la couche OpenStreetMap (S25). */
export function estDeOsm(b: Brasserie): boolean {
  return b.coordPrecision === 'osm' && b.src.startsWith('https://www.openstreetmap.org/')
}

/** Le site d'une fiche OSM, tel qu'OSM le donne ; `undefined` ailleurs. */
export function siteOsm(b: Brasserie): string | undefined {
  return (b as BrasserieOsm).siteOsm
}

/**
 * La note d'une fiche OSM dans la langue de l'interface (S50) : elle est
 * écrite par l'application, pas citée d'une source. Ailleurs, la note du
 * fichier, en français : c'est une citation.
 */
export function noteDeFiche(b: Brasserie): string {
  if (!estDeOsm(b) || !b.note.startsWith(NOTE_OSM)) return b.note
  return t(NOTE_OSM) + (b.note.endsWith(NOTE_COMMUNE_DEDUITE) ? t(NOTE_COMMUNE_DEDUITE) : '')
}

/**
 * La note sur la ligne de liste : courte pour une fiche OSM, la même pour
 * toutes (la longue reste dans la fiche) ; ailleurs, la note du fichier.
 * Revue persona S25 : 200 caractères répétés à chaque ligne.
 */
export function noteDeLigne(b: Brasserie): string {
  if (!estDeOsm(b)) return b.note
    return b.note.endsWith(NOTE_COMMUNE_DEDUITE)
    ? t('Repérée sur OpenStreetMap ; rien d’autre n’est vérifié. Commune déduite de sa position.')
    : t('Repérée sur OpenStreetMap ; rien d’autre n’est vérifié.')
}

/**
 * S269 : une brasserie de la couche OSM qui devient une fiche du fichier en
 * sort, sans nouvelle requête Overpass : même nom, ou même brasserie selon
 * `dejaDansLeFichier` (la règle de la génération, S25), ou même site web à
 * moins de 20 km (revue adverse S269 : « Les Travailleurs de l'Amer », point
 * OSM de la fiche « Les Travailleurs de la Mer »), ou objet OSM qu'un lot a
 * dit être une fiche, sous un nom sans rapport (`memes`, revue adverse S270 :
 * « Penn ar Batz » est la Microbrasserie PAB). Les retirées sont rendues,
 * pour que l'outil les dise.
 */
export function retirerCeQuiADesFiches(
  couche: FichierOsm,
  fiches: readonly Brasserie[],
  memes: ReadonlyMap<string, string> = new Map(),
): { couche: FichierOsm; retirees: { osm: string; nom: string; fiche: string }[] } {
  const noms = new Set(fiches.map((b) => b.n))
  const hote = (u: string | undefined) => {
    try {
      return u === undefined || u === '' ? undefined : new URL(u).hostname.replace(/^www\./, '')
    } catch {
      return undefined
    }
  }
  const memeSite = (site: string, lat: number, lon: number) => {
    const h = hote(site)
    return h === undefined
      ? undefined
      : fiches.find((b) => (hote(b.contact?.site) === h || hote(b.src) === h) && distanceKm(b, { lat, lon }) < 20)?.n
  }
  const retirees: { osm: string; nom: string; fiche: string }[] = []
  const gardees = couche.brasseries.filter(([nom, osm, , , lat, lon, , site]) => {
    const dite = memes.get(osm)
    const fiche = noms.has(nom)
      ? nom
      : (dejaDansLeFichier({ nom, lat, lon }, fiches) ?? memeSite(site, lat, lon) ?? (dite !== undefined && noms.has(dite) ? dite : undefined))
    if (fiche === undefined) return true
    retirees.push({ osm, nom, fiche })
    return false
  })
  return { couche: { ...couche, brasseries: gardees }, retirees }
}

/**
 * Les objets OSM qu'un lot dit être une de ses fiches, dans le `choix` d'un
 * ajout : « Même brasserie que le point OSM node/… » (revue adverse S271 :
 * deux doublons que `retirerCeQuiADesFiches` ne voyait pas). Seules les
 * fiches présentes dans le fichier comptent ; seul le premier objet cité
 * juste après la formule est retenu.
 */
export function equivalencesDesLots(
  lots: readonly { ajouts?: readonly { fiche: { n: string }; choix?: string }[] }[],
  noms: ReadonlySet<string>,
): Map<string, string> {
  const memes = new Map<string, string>()
  for (const lot of lots) {
    for (const a of lot.ajouts ?? []) {
      if (!noms.has(a.fiche.n) || a.choix === undefined) continue
      for (const m of a.choix.matchAll(/Même brasserie que le point OSM ((?:node|way|relation)\/\d+)/g)) {
        if (m[1] !== undefined) memes.set(m[1], a.fiche.n)
      }
    }
  }
  return memes
}
