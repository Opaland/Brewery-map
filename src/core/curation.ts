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

/** Les champs qu'une proposition peut changer : tous, sauf le nom (la clé) et `km`. */
const changementsSchema = brasserieObjetSchema
  .omit({ n: true, km: true })
  .partial()
  .strict()
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
  })
  .strict()

export const lotSchema = z
  .object({
    lot: z.string().min(1),
    propositions: z.array(propositionSchema),
  })
  .strict()

export type Proposition = z.infer<typeof propositionSchema>
export type Lot = z.infer<typeof lotSchema>

export function lireLot(brut: unknown): { ok: true; lot: Lot } | { ok: false; erreurs: string[] } {
  const r = lotSchema.safeParse(brut)
  if (r.success) return { ok: true, lot: r.data }
  return {
    ok: false,
    erreurs: r.error.issues.map((i) => `${i.path.map(String).join('.') || '(racine)'} : ${i.message}`),
  }
}

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
    return p === undefined ? b : { ...b, ...p.changements, verifieLe: p.verifieLe }
  })
  const v = validerBrasseries(resultat)
  if (!v.ok) return { ok: false, erreurs: v.erreurs }
  // Validé : le résultat est un tableau de fiches. On rend nos objets, pas la
  // sortie de Zod, qui réordonnerait les clés : à l'écriture, rien ne change
  // hors des fiches acceptées, pas même l'ordre des champs.
  return { ok: true, brasseries: resultat as Brasserie[] }
}

/** Une valeur aplatie en lignes « chemin : valeur », pour qu'un humain la lise. */
function aplatir(valeur: unknown, chemin: string, sortie: Map<string, string>): void {
  if (valeur !== null && typeof valeur === 'object' && !Array.isArray(valeur)) {
    for (const [cle, v] of Object.entries(valeur)) aplatir(v, chemin === '' ? cle : `${chemin}.${cle}`, sortie)
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
    ].join('\n')
  })
  return [`## Lot ${lot.lot} — ${String(lot.propositions.length)} proposition(s)`, '', ...sections].join(
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
