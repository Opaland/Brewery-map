import { z } from 'zod'

/**
 * Le schéma d'une brasserie, calqué sur `data/breweries.json` tel qu'il est.
 *
 * ## D'où vient chaque règle
 *
 * La forme a été relevée sur les cinquante premières lignes du fichier, collées
 * par Cédric le 15/10 (le collage s'arrêtait à la cinquante-et-unième). Rien
 * n'a été inventé : chaque contrainte ci-dessous correspond à ce que ces
 * lignes montrent toutes.
 *
 * - `note` est un **texte de justification**, pas une note chiffrée. Le cahier
 *   des charges parle d'une « note et origine de cette note » : l'écart est
 *   inscrit dans `BACKLOG.md`, à trancher en S3, pas ici.
 * - `conf` vaut `solide`, `moyenne` ou `faible`, et **vide en catégorie 0**.
 *   Toutes les lignes lues respectent cet accord ; il est donc gardé.
 * - `src` est vide **seulement en catégorie 0** (« Aucune source fiable
 *   lue ») : une catégorie de vente affirmée sans source est refusée.
 * - `km` est une distance déjà calculée depuis Brignais. L'application
 *   calculera la sienne (S2) ; le champ est validé, pas encore lu.
 *
 * Le schéma est `strict` : un champ non décrit fait échouer la validation,
 * pour qu'aucun champ ne traverse l'application sans que personne l'ait lu.
 */

/**
 * Les quatre catégories de vente. Les codes suivent le prompt v2 de Cédric :
 * 0 est « À confirmer », une catégorie à part entière et non une erreur.
 */
export const CATEGORIES = {
  0: 'À confirmer',
  1: 'Acheter et consommer sur place',
  2: 'Acheter seulement',
  3: 'Pas de vente',
} as const

export const categorieSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
])

/**
 * Qualité des preuves, pas une probabilité. Valeurs du fichier ; critères à
 * écrire dans `docs/DONNEES.md` (S3). Vide = aucune preuve évaluée.
 */
export const confianceSchema = z.enum(['solide', 'moyenne', 'faible', ''])

/**
 * `commune` : coordonnées du centre de la commune, à environ 2 km près.
 * Ne jamais les présenter comme l'emplacement de l'établissement.
 */
export const precisionSchema = z.enum(['address', 'commune'])

export const typeDeBiereSchema = z.enum([
  'blonde',
  'blanche',
  'ipa',
  'ambree',
  'brune',
  'stout',
  'sour',
  'sans-alcool',
  'autre',
])

/**
 * Une URL qui part dans un `href`. Seuls `http:` et `https:` passent.
 *
 * Une regex sans ancre accepte `javascript:alert(1)#https://x` — trouvé par
 * mutation sur Sentiers (CLAUDE.md §6bis). On lit donc le protocole sur l'URL
 * analysée, pas sur la chaîne.
 */
export const lienSchema = z.string().refine(
  (valeur) => {
    try {
      const url = new URL(valeur)
      return url.protocol === 'https:' || url.protocol === 'http:'
    } catch {
      return false
    }
  },
  { message: 'lien http(s) attendu' },
)

export const biereSchema = z
  .object({
    type: typeDeBiereSchema,
    /** Libellé affiché ; obligatoire pour `autre`, qui ne dit rien seul. */
    libelle: z.string().min(1).optional(),
    /** Page de la bière (site officiel) ou fiche d'annuaire. Absent = « non référencé ». */
    url: lienSchema.optional(),
  })
  .strict()
  .refine((b) => b.type !== 'autre' || b.libelle !== undefined, {
    message: 'un type « autre » doit porter un libellé',
  })

export const brasserieSchema = z
  .object({
    n: z.string().trim().min(1),
    c: z.string().trim().min(1),
    /** Département : deux chiffres, ou 2A / 2B. */
    d: z.string().regex(/^(\d{2}|2[AB])$/, 'département attendu (ex. « 69 »)'),
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
    km: z.number().min(0),
    cat: categorieSchema,
    conf: confianceSchema,
    /** Justification du statut ; en catégorie 0, c'est la raison affichée. */
    note: z.string().trim().min(1),
    addr: z.string().trim().min(1),
    src: z.union([lienSchema, z.literal('')]),
    coordPrecision: precisionSchema,
    beers: z.array(biereSchema),
    directoryUrl: lienSchema.optional(),
  })
  .strict()
  .refine((b) => b.cat === 0 || b.src !== '', {
    message: 'une catégorie de vente affirmée (1 à 3) exige une source',
    path: ['src'],
  })
  .refine((b) => (b.cat === 0) === (b.conf === ''), {
    message: 'la confiance est vide en catégorie 0, et seulement en catégorie 0',
    path: ['conf'],
  })

export const brasseriesSchema = z.array(brasserieSchema)

export type Brasserie = z.infer<typeof brasserieSchema>

/**
 * Valide un contenu de fichier et rend un message lisible par ligne fautive.
 * Partagé par le plugin de build et les tests : une seule règle (§4).
 */
export function validerBrasseries(
  donnees: unknown,
): { ok: true; brasseries: Brasserie[] } | { ok: false; erreurs: string[] } {
  const resultat = brasseriesSchema.safeParse(donnees)
  if (resultat.success) return { ok: true, brasseries: resultat.data }
  const erreurs = resultat.error.issues.map((issue) => {
    const chemin = issue.path.map(String).join('.')
    return `${chemin === '' ? '(racine)' : chemin} : ${issue.message}`
  })
  return { ok: false, erreurs }
}
