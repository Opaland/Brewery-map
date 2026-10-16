import { z } from 'zod'
import { distanceKm, type Point } from './distance'
import {
  brasserieObjetSchema,
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
 * - l'identité et la position (`n`, `c`, `d`, `lat`, `lon`, `coordPrecision`,
 *   `km`) : déplacer une fiche laisserait `km` périmé et n'est prévu par
 *   aucune procédure ;
 * - `verifieLe` : c'est la date de la proposition qui s'écrit ; un champ à
 *   part affichait une date dans le diff et en écrivait une autre.
 */
const changementsSchema = brasserieObjetSchema
  .omit({ n: true, c: true, d: true, lat: true, lon: true, coordPrecision: true, km: true, verifieLe: true })
  .partial()
  .refine((c) => Object.keys(c).length > 0, { message: 'une proposition change au moins un champ' })

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
 * Ce qui s'écrit dans la fiche comme preuve doit être la preuve lue (revue
 * code S11) : toute source écrite (`src`, `contact.source`,
 * `horaires[].source`) est une des `sources` de la proposition, et toute
 * date écrite est sa `verifieLe`. Sinon Cédric jugerait sur une page et la
 * fiche en citerait une autre.
 */
function preuvesCoherentes(p: Proposition): string[] {
  const erreurs: string[] = []
  const lues = new Set(p.sources)
  const { src, contact, horaires } = p.changements
  if (src !== undefined && src !== '' && !lues.has(src)) erreurs.push('src n’est pas une des sources lues')
  const blocs = [...(contact === undefined ? [] : [{ nom: 'contact', b: contact }]), ...(horaires ?? []).map((b, i) => ({ nom: `horaires.${String(i)}`, b }))]
  for (const { nom, b } of blocs) {
    if (!lues.has(b.source)) erreurs.push(`${nom}.source n’est pas une des sources lues`)
    if (b.verifieLe !== p.verifieLe) erreurs.push(`${nom}.verifieLe diffère de la date de la proposition`)
  }
  return erreurs
}

export const lotSchema = z
  .object({
    lot: z.string().min(1),
    propositions: z.array(propositionSchema),
  })
  .strict()

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
 * Revue métier S11 : un téléphone ajouté faisait lire « vérifiée le 16/10 »
 * sur une catégorie que personne n'avait revue.
 */
const DATES_PROPRES = new Set(['contact', 'horaires'])

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
  for (const numero of acceptees) {
    if (!Number.isInteger(numero) || numero < 1 || numero > lot.propositions.length) {
      erreurs.push(`proposition ${String(numero)} : n'existe pas dans le lot`)
    }
  }
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

  const resultat = brasseries.map((b) => {
    const p = parNom.get(b.n)
    if (p === undefined) return b
    const dateeFiche = Object.keys(p.changements).some((c) => !DATES_PROPRES.has(c))
    return { ...b, ...p.changements, ...(dateeFiche ? { verifieLe: p.verifieLe } : {}) }
  })
  const v = validerBrasseries(resultat)
  if (!v.ok) return { ok: false, erreurs: v.erreurs }
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
function aplatir(valeur: unknown, chemin: string, sortie: Map<string, string>): void {
  const sous = (cle: string) => (chemin === '' ? cle : `${chemin}.${cle}`)
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

const lisible = (v: string | undefined) => (v === undefined || v === '' ? '(vide)' : v)

/**
 * Le lot en Markdown, une section numérotée par proposition : chaque champ
 * qui change avec son avant et son après, les sources, l'extrait lu, la
 * date. C'est ce que Cédric lit pour répondre « j'accepte 1, 3, 4 ».
 */
export function diffLisible(brasseries: readonly Brasserie[], lot: Lot): string {
  const sections = lot.propositions.map((p, i) => {
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
    const lignes = chemins.map((c) => `- ${c} : ${lisible(avant.get(c))} → ${lisible(apres.get(c))}`)
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
  return [`## Lot ${lot.lot} — ${String(lot.propositions.length)} proposition(s)`, ...sections].join(
    '\n\n',
  )
}

/**
 * Les fiches « À confirmer » à revoir ensuite : jamais vérifiées d'abord, puis
 * la vérification la plus ancienne ; à égalité, la plus proche de l'origine.
 * Ordre du plan v2 (SPRINTS.md : « les 25 À confirmer les plus proches »).
 */
export function lotSuivant(brasseries: readonly Brasserie[], taille: number, origine: Point): string[] {
  return brasseries
    .filter((b) => b.cat === 0)
    .map((b) => ({ n: b.n, verifie: b.verifieLe ?? '', d: distanceKm(origine, b) }))
    .sort((a, b) => a.verifie.localeCompare(b.verifie) || a.d - b.d)
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
  const texte = JSON.stringify(
    brasseries,
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
 * tiret, espace insécable) ; « +33 4 » vaut « 04 » ; un chiffre collé avant
 * ou après fait échouer, pour ne pas lire un numéro dans un autre. Les
 * séparateurs ne sont pas retirés de toute la page : « 91 1932 Route » y
 * collait le numéro de rue au numéro (vu sur la page de Kachmar, 16/10).
 */
export function numeroSurLaPage(tel: string, page: string): boolean {
  const [premier = '', ...reste] = tel.replace(/\D/g, '').slice(1)
  const sep = '[\\s.\\-\\u2013\\u00a0]?'
  const corps = [premier, ...reste].join(sep)
  return new RegExp(`(?<![\\d+])(?:0|\\+33\\s?|0033\\s?)${corps}(?!\\d)`).test(page.replace(/&nbsp;/g, ' '))
}
