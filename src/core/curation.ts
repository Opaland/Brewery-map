import { normaliser } from './recherche'
import { z } from './zod'
import { CATEGORIES } from './categories'
import { BRIGNAIS, distanceKm, kmFr, type Point } from './distance'
import { formaterCreneaux } from './horaires'
import {
  brasserieObjetSchema,
  brasserieSchema,
  brasseriesSchema,
  lienSchema,
  validerBrasseries,
  type Brasserie,
} from './schema'

/**
 * La curation (S11) : des **propositions**, jamais des écritures. Un agent
 * lit les sources et propose ; Cédric accepte ou refuse chaque proposition
 * par son numéro ; seules les acceptées entrent dans `data/` (CLAUDE.md §0).
 *
 * Ce module ne lit ni n'écrit aucun fichier : il valide un lot, le rend
 * lisible, et calcule le fichier qui résulterait des numéros acceptés.
 */

/**
  * Les champs qu'une proposition peut changer. Exclus (revue code S11) :
 * - l'identité (`n`, `c`, `d`) : déménager une fiche dans une autre commune
 *   n'est prévu par aucune procédure (S82) ;
 * - `km` : recalculé depuis Brignais quand la position change (S52) ;
 * - une coordonnée seule : la position (`lat`, `lon`, `coordPrecision`) se
 *   propose entière, jamais vers un point communal (S52, Cédric le
 *   17/10 : « la localisation ne correspond pas à l'adresse sur la carte ») ;
 * - `verifieLe` : c'est la date de la proposition qui s'écrit ; un champ à
 *   part affichait une date dans le diff et en écrivait une autre.
 */
const changementsSchema = brasserieObjetSchema
  .omit({ n: true, c: true, d: true, km: true, verifieLe: true })
  .partial()
  .refine((c) => Object.keys(c).length > 0, { message: 'une proposition change au moins un champ' })
  .refine(
    (c) => [c.lat, c.lon, c.coordPrecision].every((v) => v === undefined) || [c.lat, c.lon, c.coordPrecision].every((v) => v !== undefined),
    { message: 'une position se propose entière : lat, lon et coordPrecision' },
  )
    .refine((c) => c.coordPrecision !== 'commune', { message: 'une proposition ne ramène pas une fiche à une position communale' })
  // « osm » est la précision des fiches venues d'OpenStreetMap (S14, S25), pas
  // une position qu'un vérificateur affirme (revue adverse S54).
  .refine((c) => c.coordPrecision !== 'osm', { message: '« osm » est réservé aux fiches venues d’OpenStreetMap' })

export const propositionSchema = z
  .object({
    /** La fiche visée, par son nom exact. */
    n: z.string().min(1),
    changements: changementsSchema,
    /** Date de lecture des sources ; devient `verifieLe` de la fiche. */
    verifieLe: z.iso.date(),
    sources: z.array(lienSchema).min(1),
    /** Le passage lu, recopié : ce qui permet à Cédric de juger sans rouvrir la page. */
    extrait: z.string().trim().min(1),
    /**
     * Ce que le vérificateur a écarté, et pourquoi (deux numéros sur la page,
     * sources contradictoires) : affiché à Cédric, qui peut choisir autrement
     * (revue métier S11).
     */
    choix: z.string().trim().min(1).optional(),
    /** Le numéro de l'issue « Signalement : » d'où vient la proposition, s'il y en a une. */
    signalement: z.number().int().positive().optional(),
  })
  .strict()

/**
 * Une fiche nouvelle (S14, découverte) : entière, valide au schéma une fois
 * datée de `verifieLe`, avec ses sources et l'extrait lu. Elle n'entre dans
 * `data/` qu'acceptée, comme une proposition, et se numérote après elles.
 */
export const ajoutSchema = z
  .object({
    fiche: brasserieObjetSchema.omit({ verifieLe: true }),
    verifieLe: z.iso.date(),
    sources: z.array(lienSchema).min(1),
    extrait: z.string().trim().min(1),
    choix: z.string().trim().min(1).optional(),
  })
  .strict()
  .refine((a) => brasserieSchema.safeParse({ ...a.fiche, verifieLe: a.verifieLe }).success, {
    message: 'la fiche ajoutée ne passe pas le schéma d’une brasserie',
  })
  // Le centre IGN cite sa requête de commune, comme pour une proposition (S269).
  .refine((a) => a.fiche.coordPrecision !== 'centre' || a.sources.some(estUneRequeteDeCommune), {
    message: 'une fiche nouvelle au centre IGN cite une requête de commune au géocodeur (type=municipality)',
  })
  // Même règle que pour une proposition (S261) : le contact cite une page lue, ce jour-là.
  .superRefine((a, ctx) => {
    for (const message of blocsMalPrisDesSources(blocsDates(a.fiche.contact, a.fiche.horaires), a.sources, a.verifieLe)) {
      ctx.addIssue({ code: 'custom', message })
    }
  })

export type Ajout = z.infer<typeof ajoutSchema>

/**
 * Ce qui s'écrit dans la fiche comme preuve doit être la preuve lue (revue
 * code S11) : toute source écrite (`src`, `contact.source`,
 * `horaires[].source`) est une des `sources` de la proposition, et toute
 * date écrite est sa `verifieLe`. Sinon Cédric jugerait sur une page et la
 * fiche en citerait une autre.
 */
/** Le géocodeur de la Géoplateforme (IGN, Base Adresse Nationale). */
export const GEOCODEUR = 'https://data.geopf.fr/geocodage/search?'

/** Une requête du centre d'une commune au géocodeur de l'IGN (S268). */
export function estUneRequeteDeCommune(url: string): boolean {
  return url.startsWith(GEOCODEUR) && new URL(url).searchParams.get('type') === 'municipality'
}

function preuvesCoherentes(p: Proposition): string[] {
  const erreurs: string[] = []
  const lues = new Set(p.sources)
  const { src, contact, horaires } = p.changements
    if (src !== undefined && src !== '' && !lues.has(src)) erreurs.push('src n’est pas une des sources lues')
  // Une position « à l'adresse » vient du géocodeur de l'IGN (S52) : sa
  // requête est une des sources, pour que la position se rejoue.
  if (p.changements.coordPrecision === 'address' && !p.sources.some((u) => u.startsWith(GEOCODEUR))) {
    erreurs.push('une position « address » cite le géocodeur parmi ses sources')
  }
  // Le centre IGN d'une commune (S268) : une requête de commune au géocodeur.
  if (p.changements.coordPrecision === 'centre' && !p.sources.some(estUneRequeteDeCommune)) {
    erreurs.push('une position « centre » cite une requête de commune au géocodeur (type=municipality)')
  }
  erreurs.push(...blocsMalPrisDesSources(blocsDates(contact, horaires), p.sources, p.verifieLe))
  return erreurs
}

type BlocDate = { source: string; verifieLe: string }

function blocsDates(contact: BlocDate | undefined, horaires: readonly BlocDate[] | undefined): { nom: string; b: BlocDate }[] {
  return [...(contact === undefined ? [] : [{ nom: 'contact', b: contact }]), ...(horaires ?? []).map((b, i) => ({ nom: `horaires.${String(i)}`, b }))]
}

/**
 * La garde commune aux propositions et aux fiches nouvelles (S261, CLAUDE.md
 * §4) : chaque bloc daté (contact, horaires) cite une des sources lues, et
 * porte la date de la lecture.
 */
function blocsMalPrisDesSources(blocs: readonly { nom: string; b: BlocDate }[], sources: readonly string[], verifieLe: string): string[] {
  const lues = new Set(sources)
  const erreurs: string[] = []
  for (const { nom, b } of blocs) {
    if (!lues.has(b.source)) erreurs.push(`${nom}.source n’est pas une des sources lues`)
    if (b.verifieLe !== verifieLe) erreurs.push(`${nom}.verifieLe diffère de la date de la lecture`)
  }
  return erreurs
}

export const lotSchema = z
  .object({
    lot: z.string().min(1),
    propositions: z.array(propositionSchema),
    /**
     * Toutes les fiches revues par ce lot, avec ou sans proposition : le lot
     * suivant les passe (S13 — sans cela, les fiches revues sans résultat,
     * que `data/` ne garde pas, revenaient au lot suivant).
     */
    revues: z.array(z.string().min(1)).optional(),
    ajouts: z.array(ajoutSchema).optional(),
  })
  .strict()
  .refine((l) => l.revues === undefined || l.propositions.every((p) => l.revues?.includes(p.n)), {
    message: 'chaque fiche proposée figure dans « revues »',
  })

export type Proposition = z.infer<typeof propositionSchema>
export type Lot = z.infer<typeof lotSchema>

/** `aujourdhui` (AAAA-MM-JJ) : une vérification ne peut pas être datée du futur. */
export function lireLot(
  brut: unknown,
  aujourdhui: string,
): { ok: true; lot: Lot } | { ok: false; erreurs: string[] } {
  const r = lotSchema.safeParse(brut)
  if (!r.success) {
    return {
      ok: false,
      erreurs: r.error.issues.map((i) => `${i.path.map(String).join('.') || '(racine)'} : ${i.message}`),
    }
  }
  const erreurs = r.data.propositions.flatMap((p, i) => {
    const e = preuvesCoherentes(p)
    if (p.verifieLe > aujourdhui) e.push(`vérification datée du futur (${p.verifieLe})`)
    return e.map((m) => `proposition ${String(i + 1)} (${p.n}) : ${m}`)
  })
  return erreurs.length > 0 ? { ok: false, erreurs } : { ok: true, lot: r.data }
}

/**
 * Les champs qui portent leur propre date de lecture. Changés seuls, ils ne
 * datent pas la fiche : sa « Vérifiée le » couvre ce qui n'a pas de date à
  * soi — statut, confiance, note, source, adresse, bières (docs/DONNEES.md).
 * Une position seule non plus (S52) : la catégorie n'a pas été revue.
 * Revue métier S11 : un téléphone ajouté faisait lire « vérifiée le 16/10 »
 * sur une catégorie que personne n'avait revue.
 */
const DATES_PROPRES = new Set(['contact', 'horaires', 'lat', 'lon', 'coordPrecision'])

/**
 * Le fichier qui résulterait des propositions acceptées (numérotées à partir
 * de 1, dans l'ordre du lot). Les autres lignes sont rendues telles quelles,
 * dans le même ordre. Le résultat passe par `validerBrasseries` : une
 * acceptation qui casserait une règle du schéma est refusée en entier.
 */
export function appliquerLot(
  brasseries: readonly Brasserie[],
  lot: Lot,
  acceptees: ReadonlySet<number>,
): { ok: true; brasseries: Brasserie[] } | { ok: false; erreurs: string[] } {
  const erreurs: string[] = []
  const ajouts = lot.ajouts ?? []
  const total = lot.propositions.length + ajouts.length
  for (const numero of acceptees) {
    if (!Number.isInteger(numero) || numero < 1 || numero > total) {
      erreurs.push(`proposition ${String(numero)} : n'existe pas dans le lot`)
    }
  }
  // Une fiche acceptée n'entre pas avec la précision des points
  // OpenStreetMap : elle s'afficherait « non vérifiée » (revue
  // d'architecture S295). Un ajout venu d'OSM se place d'abord au centre IGN
  // ou à son adresse.
  ajouts.forEach((a, i) => {
    const numero = lot.propositions.length + i + 1
    if (acceptees.has(numero) && a.fiche.coordPrecision === 'osm') {
      erreurs.push(`proposition ${String(numero)} (${a.fiche.n}) : « osm » est réservé à la couche OpenStreetMap ; la placer au centre IGN ou à son adresse`)
    }
  })
  const parNom = new Map<string, Proposition>()
  lot.propositions.forEach((p, i) => {
    if (!acceptees.has(i + 1)) return
    if (!brasseries.some((b) => b.n === p.n)) {
      erreurs.push(`proposition ${String(i + 1)} : aucune fiche « ${p.n} »`)
    } else if (parNom.has(p.n)) {
      erreurs.push(`proposition ${String(i + 1)} : « ${p.n} » est déjà visée par une autre acceptée`)
    } else {
      parNom.set(p.n, p)
    }
  })
  if (erreurs.length > 0) return { ok: false, erreurs }

  const modifiees = brasseries.map((b) => {
    const p = parNom.get(b.n)
    if (p === undefined) return b
    const dateeFiche = Object.keys(p.changements).some((c) => !DATES_PROPRES.has(c))
    const { lat, lon } = p.changements
    // `km` suit la position : arrondi au dixième, comme les lignes fournies.
    const km = lat === undefined || lon === undefined ? {} : { km: Math.round(distanceKm(BRIGNAIS, { lat, lon }) * 10) / 10 }
    return { ...b, ...p.changements, ...km, ...(dateeFiche ? { verifieLe: p.verifieLe } : {}) }
  })
  // Les ajouts acceptés vont en fin de fichier : aucune ligne existante ne bouge.
  const nouvelles = ajouts
    .filter((_, i) => acceptees.has(lot.propositions.length + i + 1))
    .map((a) => ({ ...a.fiche, verifieLe: a.verifieLe }))
  const resultat = [...modifiees, ...nouvelles]
  const v = validerBrasseries(resultat)
  if (!v.ok) {
    // Une erreur sur une ligne ajoutée cite le numéro du lot, pas le rang
    // dans le fichier (« 169.n » ne disait rien à Cédric, revues S14).
    const numerosAjoutes = ajouts
      .map((a, i) => ({ a, numero: lot.propositions.length + i + 1 }))
      .filter(({ numero }) => acceptees.has(numero))
    const lisibles = v.erreurs.map((e) => {
      const m = /^(\d+)\.(.*)$/.exec(e)
      const rang = m === null ? -1 : Number(m[1]) - modifiees.length
      const ajout = numerosAjoutes[rang]
      return ajout === undefined || m === null ? e : `proposition ${String(ajout.numero)} (${ajout.a.fiche.n}) : ${m[2] ?? ''}`
    })
    return { ok: false, erreurs: lisibles }
  }
  // Validé : le résultat est un tableau de fiches. On rend nos objets, pas la
  // sortie de Zod, qui réordonnerait les clés : à l'écriture, rien ne change
  // hors des fiches acceptées, pas même l'ordre des champs.
  return { ok: true, brasseries: resultat as Brasserie[] }
}

/**
 * Une valeur aplatie en lignes « chemin : valeur », pour qu'un humain la
 * lise. Les tableaux aussi, élément par élément (revue code S11 : un bloc
 * d'horaires comparé en JSON était illisible, et sensible à l'ordre des
 * clés). Un tableau vide garde une ligne « [] ».
 */
const JOUR_D_HORAIRES = /^horaires\.\d+\.(lun|mar|mer|jeu|ven|sam|dim)$/

function aplatir(valeur: unknown, chemin: string, sortie: Map<string, string>): void {
  const sous = (cle: string) => (chemin === '' ? cle : `${chemin}.${cle}`)
  // Un jour d'horaires se lit comme sur la fiche, en une ligne (revue métier
  // S12 : « horaires.0.lun.1.1 : 00:00 » ne se décide pas).
  if (JOUR_D_HORAIRES.test(chemin)) {
    sortie.set(chemin, formaterCreneaux(valeur as Parameters<typeof formaterCreneaux>[0]))
    return
  }
  if (Array.isArray(valeur) && valeur.length > 0) {
    valeur.forEach((v: unknown, i) => {
      aplatir(v, sous(String(i)), sortie)
    })
    return
  }
  if (valeur !== null && typeof valeur === 'object' && !Array.isArray(valeur)) {
    for (const [cle, v] of Object.entries(valeur)) aplatir(v, sous(cle), sortie)
    return
  }
  sortie.set(chemin, typeof valeur === 'string' ? valeur : JSON.stringify(valeur))
}

/** Une valeur pour un humain ; une catégorie porte son libellé (revue S12). */
function lisible(v: string | undefined, chemin: string): string {
  if (v === undefined || v === '') return '(vide)'
  if (chemin === 'cat' && v in CATEGORIES) return `${v} (${CATEGORIES[Number(v) as keyof typeof CATEGORIES]})`
  return v
}

/**
 * Le lot en Markdown, une section numérotée par proposition : chaque champ
 * qui change avec son avant et son après, les sources, l'extrait lu, la
 * date. C'est ce que Cédric lit pour répondre « j'accepte 1, 3, 4 ».
 */
export function diffLisible(
  brasseries: readonly Brasserie[],
  lot: Lot,
  seulement?: ReadonlySet<number>,
): string {
  // Les numéros restent ceux du lot complet, même quand on n'en montre
  // qu'une partie : « j'accepte 1, 3 » vise ce que Cédric a lu (revue S12).
  const sections = lot.propositions.flatMap((p, i) => {
    if (seulement !== undefined && !seulement.has(i + 1)) return []
    const titre = `### ${String(i + 1)}. ${p.n}`
    const avantFiche = brasseries.find((b) => b.n === p.n)
    if (avantFiche === undefined) return `${titre}\n\n**Aucune fiche de ce nom dans les données.**`
    const avant = new Map<string, string>()
    const apres = new Map<string, string>()
    for (const cle of Object.keys(p.changements)) {
      aplatir((avantFiche as Record<string, unknown>)[cle], cle, avant)
      aplatir((p.changements as Record<string, unknown>)[cle], cle, apres)
    }
    const chemins = [...new Set([...avant.keys(), ...apres.keys()])].filter(
      (c) => avant.get(c) !== apres.get(c),
    )
        const lignes = chemins.map(
      (c) => `- ${c} : ${lisible(avant.get(c), c)} → ${lisible(apres.get(c), c)}`,
    )
    const { lat, lon } = p.changements
    if (lat !== undefined && lon !== undefined) {
      const ecart = distanceKm(avantFiche, { lat, lon })
      lignes.push(`- déplacement sur la carte : ${kmFr(ecart)} km`)
    }
    return [
      titre,
      '',
      ...(lignes.length > 0 ? lignes : ['- (aucun champ ne change)']),
      '',
      `Sources (vérifiée le ${p.verifieLe}) : ${p.sources.join(' ; ')}`,
      '',
      `Extrait lu : « ${p.extrait} »`,
      ...(p.choix === undefined ? [] : ['', `Choix du vérificateur : ${p.choix}`]),
      ...(p.signalement === undefined
        ? []
        : ['', `Signalement : https://github.com/Opaland/Brewery-map/issues/${String(p.signalement)}`]),
    ].join('\n')
  })
  const base = lot.propositions.length
  const sectionsAjouts = (lot.ajouts ?? []).flatMap((a, i) => {
    const numero = base + i + 1
    if (seulement !== undefined && !seulement.has(numero)) return []
    const champs = new Map<string, string>()
    aplatir({ ...a.fiche, verifieLe: a.verifieLe }, '', champs)
    return [
      [
        `### ${String(numero)}. ${a.fiche.n} — fiche nouvelle`,
        '',
        ...[...champs].map(([c, v]) => `- ${c} : (vide) → ${lisible(v, c)}`),
        '',
        `Sources (vérifiée le ${a.verifieLe}) : ${a.sources.join(' ; ')}`,
        '',
        `Extrait lu : « ${a.extrait} »`,
        ...(a.choix === undefined ? [] : ['', `Choix du vérificateur : ${a.choix}`]),
      ].join('\n'),
    ]
  })
  const titre = `## Lot ${lot.lot} — ${String(lot.propositions.length)} proposition(s)${(lot.ajouts ?? []).length > 0 ? `, ${String((lot.ajouts ?? []).length)} fiche(s) nouvelle(s)` : ''}`
  return [titre, ...sections, ...sectionsAjouts].join(
    '\n\n',
  )
}

/**
 * Les fiches « À confirmer » à revoir ensuite : jamais vérifiées d'abord, puis
 * la vérification la plus ancienne ; à égalité, la plus proche de l'origine.
 * Ordre du plan v2 (SPRINTS.md : « les 25 À confirmer les plus proches »).
 */
export function lotSuivant(
  brasseries: readonly Brasserie[],
  taille: number,
  origine: Point,
  dejaRevues: ReadonlySet<string> = new Set(),
  { toutes = false }: { toutes?: boolean } = {},
): string[] {
  // Mode normal : les « À confirmer » jamais revus ; une fiche revue est
  // passée, même datée (revue code S15).
  // Veille (`toutes`, S15) : les catégories 1 à 3, qui affirment quelque
  // chose et peuvent vieillir — les « À confirmer » restent au mode normal,
  // sans doublon. Une fiche revue sans résultat est passée ; une fiche datée
  // revient à son tour.
  const retenue = (b: Brasserie) =>
    toutes ? b.cat !== 0 && !(dejaRevues.has(b.n) && b.verifieLe === undefined) : b.cat === 0 && !dejaRevues.has(b.n)
  // Sans date, la veille prend la catégorie 1 d'abord (« acheter et consommer
  // sur place », le critère de Cédric), puis 2 et 3 : ordre de présentation
  // tranché au jugement (CLAUDE.md §2) ; écarté : la distance seule, qui
  // revoyait toujours les mêmes fiches proches (revue métier S15).
  const rangCategorie = (b: Brasserie) => (toutes ? b.cat : 0)
  return brasseries
    .filter(retenue)
    .map((b) => ({ n: b.n, verifie: b.verifieLe ?? '', rang: rangCategorie(b), d: distanceKm(origine, b) }))
    .sort((a, b) => a.verifie.localeCompare(b.verifie) || a.rang - b.rang || a.d - b.d)
    .slice(0, taille)
    .map((x) => x.n)
}

/**
 * Le texte du fichier de données, au format exact de `data/breweries.json`
 * (une espace d'indentation, pas de saut de ligne final) : une écriture ne
 * change que les lignes acceptées, et le diff Git reste lisible. Vérifié sur
 * le fichier réel par `tests/unit/curation.test.ts`.
 */
const FLOTTANTS = new Set(['lat', 'lon', 'km'])
const MARQUE = '\u0000flottant:'

export function formaterDonnees(brasseries: readonly Brasserie[]): string {
  // Le fichier a été écrit en Python : un flottant entier s'y lit « 6.0 »,
  // que JSON.stringify écrirait « 6 » (vu au premier essai du test, ligne
  // « km »). Ces champs gardent donc leur « .0 ».
  // L'ordre des champs est celui du schéma, comme à la relecture du fichier :
  // sinon deux accords appliqués en mémoire et les mêmes appliqués un par un
  // (fichier relu entre les deux) donnaient deux textes, et la garde refusait
  // le second à l'octet près (S266).
  const lu = brasseriesSchema.safeParse(brasseries)
  const texte = JSON.stringify(
    lu.success ? lu.data : brasseries,
    (cle, valeur: unknown) =>
      FLOTTANTS.has(cle) && typeof valeur === 'number' && Number.isInteger(valeur)
        ? `${MARQUE}${valeur.toFixed(1)}`
        : valeur,
    1,
  )
  return texte.replace(/"\\u0000flottant:([^"]+)"/g, '$1')
}

/**
 * La fiche visée par une issue « Signalement : <nom> (<commune>) », titre
 * que pose `lienSignalement` (S10). Nom **et** commune exacts, sinon `null` :
 * un titre retouché se rattache à la main, il ne se devine pas.
 */
export function ficheDuSignalement(titre: string, brasseries: readonly Brasserie[]): string | null {
  const m = /^Signalement : (.+) \(([^()]+)\)$/.exec(titre.trim())
  if (m === null) return null
  const [, nom, commune] = m
  return brasseries.find((b) => b.n === nom && b.c === commune)?.n ?? null
}

/**
 * Le numéro proposé figure-t-il sur la page lue ? Contrôle mécanique de
 * l'extrait (revue code S11 : seule une source sur cinq était rouverte à la
 * main). Entre les chiffres du numéro, un séparateur au plus (espace, point,
 * tiret, espace insécable) ; « +33 4 », « +33 (0)4 », « (+33)4 », « 00 33 4 »
 * valent « 04 » ; un chiffre collé avant
 * ou après fait échouer, pour ne pas lire un numéro dans un autre. Les
 * séparateurs ne sont pas retirés de toute la page : « 91 1932 Route » y
 * collait le numéro de rue au numéro (vu sur la page de Kachmar, 16/10).
 */
export function numeroSurLaPage(tel: string, page: string): boolean {
  const [premier = '', ...reste] = tel.replace(/\D/g, '').slice(1)
  // Uniquement des séparateurs : jamais une lettre, donc jamais un numéro
  // recomposé à travers du texte. Jusqu'à deux (« 04  72 », revue S12).
  const sep = '[\\s.\\-\\u2013\\u00a0]{0,2}'
  const corps = [premier, ...reste].join(sep)
  const international = `(?:\\(?\\+33\\)?|00${sep}33)${sep}(?:\\(0\\)${sep}|0)?`
  return new RegExp(`(?<![\\d+])(?:0|${international})${corps}(?!\\d)`).test(page.replace(/&nbsp;/g, ' '))
}

/**
 * Les hôtes partagés par des milliers de pages : y être ne dit pas qu'on est
 * sur le site d'une brasserie (revue adverse S261).
 */
export const PLATEFORMES = new Set(['facebook.com', 'instagram.com', 'untappd.com', 'linktr.ee', 'sites.google.com'])

type ChampContact = 'tel' | 'site' | 'untappd'

/**
 * Ce que la page du contact montre de lui (S261).
 * - `tel` : par `numeroSurLaPage`.
 * - `site` : la page lue est sur ce site (même hôte ; sur une plateforme
 *   partagée, même adresse ou en dessous), ou la page cite une adresse de
 *   cet hôte exact — pas un hôte qui le contient, pas un paramètre.
 * - `untappd` : la page cite ce lien, ou une page sous lui (`…/beer`) ; ou
 *   la page lue est ce lien. La racine d'Untappd ne vaut rien.
 * `absents` : ce qui manque. `parLaPageMeme` : ce qui ne vaut que parce que
 * c'est la page lue, à dire comme tel (sinon « trouvé » laisserait croire
 * à une lecture).
 */
export function contactSurLaPage(
  contact: { tel?: string; site?: string; untappd?: string; source: string },
  page: string,
): { absents: ChampContact[]; parLaPageMeme: ChampContact[] } {
  const hote = (u: URL) => u.hostname.toLowerCase().replace(/^www\./, '')
  const chemin = (u: URL) => u.pathname.toLowerCase().replace(/\/+$/, '')
  const dessous = (a: URL, b: URL) => hote(a) === hote(b) && (chemin(a) === chemin(b) || chemin(a).startsWith(`${chemin(b)}/`))
  const source = new URL(contact.source)
  const cites = [...page.matchAll(/https?:\/\/[^\s"'<>()]+/gi)].flatMap((m) => {
    try {
      return [new URL(m[0].replace(/&amp;/g, '&'))]
    } catch {
      return []
    }
  })
  const absents: ChampContact[] = []
  const parLaPageMeme: ChampContact[] = []
  if (contact.tel !== undefined && !numeroSurLaPage(contact.tel, page)) absents.push('tel')
  if (contact.site !== undefined) {
    const site = new URL(contact.site)
    const surLeSite = PLATEFORMES.has(hote(site)) ? dessous(source, site) : hote(source) === hote(site)
    if (surLeSite) parLaPageMeme.push('site')
    else if (!cites.some((u) => (PLATEFORMES.has(hote(site)) ? dessous(u, site) : hote(u) === hote(site)))) absents.push('site')
  }
  if (contact.untappd !== undefined) {
    const lien = new URL(contact.untappd)
    if (chemin(lien) === '') absents.push('untappd')
    else if (dessous(source, lien) && chemin(source) === chemin(lien)) parLaPageMeme.push('untappd')
    else if (!cites.some((u) => dessous(u, lien))) absents.push('untappd')
  }
  return { absents, parLaPageMeme }
}

const JOURS_DE_LA_SEMAINE = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'] as const

/** Une heure « 14:30 » telle qu'une page l'écrit : « 14h30 », « 14:30 », « 14 h 30 » ; « 14h » ou « 14h00 » pour l'heure pleine ; « minuit », « midi ». */
function heureSurLaPage(heure: string, texte: string): boolean {
  const [hh = '', mm = ''] = heure.split(':')
  const h = String(Number(hh))
  // « h » seul ou « heure(s) », jamais le début d'un mot (« 12 hectolitres ») ;
  // l'heure pleine n'est pas suivie d'autres minutes (« 14 h 30 » n'est pas 14:00).
  const separateur = '(?:heures?(?![a-zà-ÿ])|h(?![a-zà-ÿ])|:)'
  // « 19h 388 rue… » : un nombre qui n'a pas la forme de minutes (deux chiffres) ne
  // les donne pas (revue adverse S63).
  const minutes = mm === '00' ? '(?:\\s*00)?(?!\\s*[0-5]\\d(?!\\d))' : `\\s*${mm}(?!\\d)`
  const ecrite = new RegExp(`(?<!\\d)0?${h}\\s*${separateur}${minutes}`, 'i')
  // « midi », « minuit » en mots isolés : « Midi-Pyrénées » n'est pas midi.
  const enMots = (heure === '00:00' && /(?<!\p{L})minuit(?![\p{L}-])/iu.test(texte)) || (heure === '12:00' && /(?<!\p{L})midi(?![\p{L}-])/iu.test(texte))
  return enMots || ecrite.test(texte)
}

/**
 * Les heures d'un bloc d'horaires que sa page ne montre pas (S262), sous la
 * forme « ven 22:00 ». Contrôle de présence, pas de sens : il attrape une
 * heure inventée ou mal recopiée, pas un jour interverti. Un jour fermé ou
 * « heures non précisées » ne demande rien.
 */
export function horairesSurLaPage(bloc: Readonly<Record<string, unknown>>, page: string): string[] {
  // « 17-22 h », « de 17 à 22h » : la première heure de la plage prend le
  // « h » de la seconde. Seulement à partir de 6 h : en dessous, c'est une
  // durée (« visite 2-3 h »), pas une heure d'ouverture (revue adverse S262).
  const texte = page
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/(?<!\d)(\d{1,2})(\s*(?:[-–]|à)\s*\d{1,2}\s*h(?![a-zà-ÿ]))/gi, (m, debut: string, reste: string) =>
      Number(debut) >= 6 ? `${debut}h${reste}` : m,
    )
  const absentes: string[] = []
  for (const jour of JOURS_DE_LA_SEMAINE) {
    const creneaux = bloc[jour]
    if (!Array.isArray(creneaux)) continue
    for (const heure of new Set((creneaux as [string, string][]).flat())) {
      if (!heureSurLaPage(heure, texte)) absentes.push(`${jour} ${heure}`)
    }
  }
  return absentes
}

// Les entités typographiques des CMS courants (WordPress écrit « l&rsquo;année ») :
// sans elles, un extrait juste était dit absent (Vestibule, S250).
const ENTITES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  rsquo: '\u2019',
  lsquo: '\u2018',
  rdquo: '\u201d',
  ldquo: '\u201c',
  laquo: '«',
  raquo: '»',
  ndash: '\u2013',
  mdash: '\u2014',
  hellip: '…',
}

/** Le texte lu d'une page : sans balises, entités décodées, sans accents ni casse, espaces réduits. */
function texteComparable(t: string): string {
  return normaliser(
    t
      .replace(/<[^>]*>/g, ' ')
      .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
      .replace(/&#x([0-9a-f]+);/gi, (_, n: string) => String.fromCodePoint(parseInt(n, 16)))
      .replace(/&([a-z]+)acute;|&([a-z]+)grave;|&([a-z]+)circ;|&([a-z]+)uml;|&([a-z]+)cedil;/gi, (_m, ...g: (string | undefined)[]) => g.find((x) => x !== undefined) ?? '')
      .replace(/&([a-z]+);/gi, (m, n: string) => ENTITES[n.toLowerCase()] ?? m)
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u2013\u2014]/g, '-'),
  )
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * L'extrait d'une fiche nouvelle est-il sur la page de sa source (S247) ?
 * Sans ce contrôle, « controler » ne lisait que les propositions et disait
 * « sans écart » d'un lot d'ajouts qu'il n'avait pas ouvert.
 */
export function extraitSurLaPage(extrait: string, page: string): boolean {
  const e = texteComparable(extrait)
  return e !== '' && texteComparable(page).includes(e)
}

/**
 * Les fiches déjà revues, d'après les fichiers de `curation/` : le champ
 * `revues` de chaque lot (ou, à défaut, ses propositions) et
 * `curation/revues.json` ({ "<lot>": [noms…] }, clés « _… » ignorées) pour
 * les lots d'avant ce champ. **Échoue en nommant le fichier** sur un contenu
 * mal formé ou un nom absent des données : ignorer sans bruit faisait
 * revenir une fiche au lot suivant (revue code S13).
 */
export function revuesDesFichiers(
  fichiers: readonly { nom: string; contenu: unknown }[],
  noms: ReadonlySet<string>,
): { ok: true; revues: Set<string> } | { ok: false; erreurs: string[] } {
  const revues = new Set<string>()
  const erreurs: string[] = []
  const listeDeNoms = z.array(z.string().min(1))
  const ajouter = (fichier: string, liste: readonly string[]) => {
    for (const n of liste) {
      if (noms.has(n)) revues.add(n)
      else erreurs.push(`${fichier} : « ${n} » n'est pas une fiche de data/`)
    }
  }
  for (const { nom, contenu } of fichiers) {
    if (nom === 'revues.json') {
      const r = z.record(z.string(), z.unknown()).safeParse(contenu)
      if (!r.success) {
        erreurs.push(`${nom} : objet { "<lot>": [noms…] } attendu`)
        continue
      }
      for (const [cle, valeur] of Object.entries(r.data)) {
        if (cle.startsWith('_')) continue
        const l = listeDeNoms.safeParse(valeur)
        if (l.success) ajouter(nom, l.data)
        else erreurs.push(`${nom} : « ${cle} » n'est pas une liste de noms`)
      }
      continue
    }
    const l = lotSchema.safeParse(contenu)
    if (!l.success) {
      erreurs.push(`${nom} : lot invalide (${l.error.issues.map((i) => i.message).join(' ; ')})`)
      continue
    }
    ajouter(nom, l.data.revues ?? l.data.propositions.map((p) => p.n))
  }
  return erreurs.length > 0 ? { ok: false, erreurs } : { ok: true, revues }
}

/**
 * « 1,3,4 » ou « 1-12,15 » et rien d'autre : ni « 0x1 », ni « 1.0 », ni
 * espaces (revue code S11) ; une plage va du plus petit au plus grand (S14 :
 * un lot de découverte compte des dizaines de fiches), bornée au lot :
 * « 1-999999999 » saturait la mémoire (revue code S14). Sortie de
 * `outils/curation.ts` en S295 pour se tester sans lancer l'outil.
 */
export function lireNumeros(
  texte: string | undefined,
  total: number,
): { ok: true; numeros: number[] } | { ok: false; erreur: string } {
  const morceau = '\\d+(?:-\\d+)?'
  if (texte === undefined || !new RegExp(`^${morceau}(?:,${morceau})*$`).test(texte)) {
    return { ok: false, erreur: 'numéros acceptés attendus, ex. « 1,3,4 » ou « 1-12,15 »' }
  }
  const numeros: number[] = []
  for (const m of texte.split(',')) {
    const [debut = 0, fin = debut] = m.split('-').map(Number)
    if (fin < debut) return { ok: false, erreur: `plage à l'envers : « ${m} »` }
    if (fin > total) return { ok: false, erreur: `« ${m} » dépasse le lot, qui compte ${String(total)} numéros` }
    for (let k = debut; k <= fin; k++) numeros.push(k)
  }
  return { ok: true, numeros }
}
