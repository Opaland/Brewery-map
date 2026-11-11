import { z } from './zod'

/**
 * S380 — Le mot du mois. Le code calcule les faits ; Claude n'écrit que le
 * texte (`outils/mot-du-mois.ts`), qui est refusé s'il contient un nombre ou
 * un nom de brasserie absent des faits (AGENTS.md §0 : aucune donnée
 * inventée). Repris de Netatmo (`collector/insights.py`, `unknown_numbers`),
 * avec une garde de plus, sur les noms.
 *
 * Fonctions pures : rien ici n'appelle le réseau.
 */

/** Ce que les faits lisent d'une fiche : des données publiques seulement. */
export interface FicheDuMois {
  n: string
  c: string
  d: string
  /** Absente sur une partie des fiches (schéma : optionnelle). */
  verifieLe?: string | undefined
}

export interface NouveauteDuMois {
  date: string
  texte: string
}

export interface Faits {
  /** AAAA-MM. */
  mois: string
  fichesEnTout: number
  departementsEnTout: number
  /** Les nouveautés datées de ce mois, de la plus ancienne à la plus récente. */
  nouveautes: NouveauteDuMois[]
  /** Les fiches vérifiées ce mois-là, triées par nom. */
  fichesDuMois: { nom: string; commune: string; departement: string }[]
  fichesDuMoisEnTout: number
}

export function faitsDuMois(
  fiches: readonly FicheDuMois[],
  nouveautes: readonly NouveauteDuMois[],
  mois: string,
): Faits {
  const duMois = fiches
    .filter((f) => f.verifieLe?.startsWith(`${mois}-`) === true)
    .map((f) => ({ nom: f.n, commune: f.c, departement: f.d }))
    .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
  return {
    mois,
    fichesEnTout: fiches.length,
    departementsEnTout: new Set(fiches.map((f) => f.d)).size,
    nouveautes: nouveautes
      .filter((n) => n.date.startsWith(`${mois}-`))
      .map((n) => ({ date: n.date, texte: n.texte }))
      .sort((a, b) => a.date.localeCompare(b.date)),
    fichesDuMois: duMois,
    fichesDuMoisEnTout: duMois.length,
  }
}

/**
 * Un nombre écrit : « 1 200 » (espace, insécable ou fine), « 1,5 », « 1.5 »,
 * « 812 ». Les nombres en lettres (« dix ») ne sont pas lus : la consigne du
 * modèle les interdit, et Cédric relit (S380, limite écrite).
 */
const NOMBRE = /\d{1,3}(?:[  ]\d{3})+(?![\d,.])|\d+(?:[.,]\d+)?/g

const normaliser = (n: string) => n.replace(/[  ]/g, '')

/** « le 1er novembre », « les 10 et 11 novembre 2026 », « du 3 au 9 novembre ». */
const DATE =
  /(?:\d{1,2}(?:er)?\s*(?:,|et|au|à)?\s*)+(?:janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre)(?:\s+(\d{4}))?/gi

/** Retire du texte les dates bien formées : un jour n'y est pas un compte. */
function sansDates(texte: string, annee: string): string {
  return texte.replace(DATE, (date: string, an: string | undefined) => {
    const jours = [...date.matchAll(/\d{1,2}(?=er|\s|,|$)/g)].map((m) => Number(m[0]))
    const valide = jours.every((j) => j >= 1 && j <= 31) && (an === undefined || an === annee)
    return valide ? ' '.repeat(date.length) : date
  })
}

/**
 * Les nombres permis : les comptes des faits, ceux écrits dans les nouveautés
 * du mois, et l'année. Ni les dates des nouveautés ni les codes de
 * département ne légitiment un compte (revue adverse S380).
 */
function nombresPermis(faits: Faits): Set<string> {
  const permis = new Set<string>([
    String(faits.fichesEnTout),
    String(faits.departementsEnTout),
    String(faits.fichesDuMoisEnTout),
    faits.mois.slice(0, 4),
  ])
  for (const n of faits.nouveautes) for (const m of n.texte.matchAll(NOMBRE)) permis.add(normaliser(m[0]))
  return permis
}

/** Les nombres du texte qu'aucun fait ne porte, dans l'ordre du texte. */
export function nombresInconnus(texte: string, faits: Faits): string[] {
  const permis = nombresPermis(faits)
  const inconnus: string[] = []
  for (const m of sansDates(texte, faits.mois.slice(0, 4)).matchAll(NOMBRE)) {
    const n = normaliser(m[0])
    if (!permis.has(n) && !inconnus.includes(m[0])) inconnus.push(m[0])
  }
  return inconnus
}

/** Sans accents ni casse, pour comparer des noms. */
const plier = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
const echapper = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
/** Le nom, en mot entier : « Banz » n'est pas dans « Banzaï ». */
const nomme = (textePlie: string, nom: string) =>
  new RegExp(`(?<![\\p{L}\\p{N}])${echapper(plier(nom))}(?![\\p{L}\\p{N}])`, 'u').test(textePlie)

/**
 * Les brasseries de la carte que le texte nomme sans qu'elles soient dans
 * les faits du mois, sans tenir compte de la casse ni des accents. Un nom
 * contenu dans un nom permis que le texte cite (« La Poule » dans « La Poule
 * Rousse ») n'est pas un écart. Une brasserie que la carte n'a pas ne peut
 * pas être détectée par son nom : la consigne l'interdit, et Cédric relit.
 */
export function nomsInconnus(texte: string, faits: Faits, fiches: readonly FicheDuMois[]): string[] {
  const t = plier(texte)
  const permis = faits.fichesDuMois.map((f) => f.nom)
  const permisPlies = new Set(permis.map(plier))
  const citesPermis = permis.filter((p) => nomme(t, p)).map(plier)
  const inconnus: string[] = []
  for (const f of fiches) {
    const p = plier(f.n)
    if (permisPlies.has(p) || inconnus.includes(f.n) || !nomme(t, f.n)) continue
    if (citesPermis.some((c) => c.includes(p))) continue
    inconnus.push(f.n)
  }
  return inconnus
}

export function ecarts(
  texte: string,
  faits: Faits,
  fiches: readonly FicheDuMois[],
): { nombres: string[]; noms: string[] } {
  return { nombres: nombresInconnus(texte, faits), noms: nomsInconnus(texte, faits, fiches) }
}

export const sansEcart = (e: { nombres: string[]; noms: string[] }) =>
  e.nombres.length === 0 && e.noms.length === 0

/**
 * Le fichier proposé (`curation/ia/mot-du-mois-AAAA-MM.json`). Le job du
 * workflow qui ouvre la PR, sans clé ni modèle, le valide par ce schéma
 * avant de rien écrire (S380, CA8).
 */
export const motDuMoisSchema = z
  .object({
    mois: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
    genereLe: z.iso.datetime(),
    modele: z.string().regex(/^claude-[a-z0-9-]+$/).max(60),
    redigePar: z.literal('IA (Claude), relu par Cédric avant toute publication'),
    texte: z.string().min(1).max(2000),
    verifie: z.boolean(),
    ecartsRestants: z.object({ nombres: z.array(z.string().max(40)), noms: z.array(z.string().max(120)) }).strict(),
    faits: z.unknown(),
    usage: z
      .object({
        requetes: z.number().int().min(1).max(2),
        jetonsEntree: z.number().int().nonnegative(),
        jetonsSortie: z.number().int().nonnegative(),
        jetonsCacheLus: z.number().int().nonnegative(),
        coutUsd: z.number().nonnegative(),
      })
      .strict(),
  })
  .strict()
export type MotDuMois = z.infer<typeof motDuMoisSchema>
