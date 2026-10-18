import { z } from './zod'

// Zod est configuré sans compilation à la volée dans `./zod` (S24, S38).

/**
 * Le schéma d'une brasserie, calqué sur `data/breweries.json` tel qu'il est.
 *
 * ## D'où vient chaque règle
 *
 * La forme a été relevée sur le fichier fourni par Cédric le 15/10 (166
 * lignes, toutes conformes). Rien n'a été inventé : chaque contrainte
 * ci-dessous correspond à ce que ces lignes montrent toutes.
 *
 * - `note` est un **texte de justification**, pas une note chiffrée. Le cahier
 *   des charges parle d'une « note et origine de cette note » : l'écart est
 *   inscrit dans `BACKLOG.md`, à trancher en S3, pas ici.
 * - `conf` vaut `solide`, `moyenne` ou `faible`, et **vide en catégorie 0**.
 *   Toutes les lignes lues respectent cet accord ; il est donc gardé.
 * - `src` est vide **seulement en catégorie 0** (« Aucune source fiable
 *   lue ») : une catégorie de vente affirmée sans source est refusée.
 * - `km` est une distance déjà calculée depuis Brignais. L'application
 *   calcule la sienne (`core/distance.ts`, décision de Cédric du 15/10) ; le
 *   champ reste validé mais n'est lu nulle part.
 *
 * Le schéma est `strict` : un champ non décrit fait échouer la validation,
 * pour qu'aucun champ ne traverse l'application sans que personne l'ait lu.
 */

export { CATEGORIES } from './categories'

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
 * `commune` : point qui n'est pas l'adresse : ni un centre de commune, ni
 * un écart connu (mesuré en S59 : jusqu'à 14 km du centre, docs/PRECISION.md).
 * Ne jamais les présenter comme l'emplacement de l'établissement.
 * `osm` : point placé par un contributeur d'OpenStreetMap (S14, fiches
 * découvertes), ni une adresse vérifiée, ni un centre de commune ; pour un
 * bâtiment (« way »), Nominatim en donne le centre.
 */
/**
 * Où est le point d'une fiche :
 * - `address` : à l'adresse, vérifiée au géocodeur de l'IGN (S52) ;
 * - `centre` : au centre de la commune selon l'IGN (S268, Cédric le 18/10) ;
 * - `commune` : le point d'origine du fichier, non vérifié (généré par une IA,
 *   Cédric le 18/10), ou celui d'une fiche nouvelle des lots départementaux ;
 * - `osm` : posé par un contributeur d'OpenStreetMap.
 */
export const precisionSchema = z.enum(['address', 'centre', 'commune', 'osm'])

export const typeDeBiereSchema = z.enum([
  'blonde',
  'lager',
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

/** Un lien vers une page d'untappd.com (ou www.untappd.com), rien d'autre. */
const lienUntappdSchema = lienSchema.refine(
  (valeur) => /^(www\.)?untappd\.com$/.test(new URL(valeur).hostname),
  { message: 'lien untappd.com attendu' },
)

/**
 * Comment joindre la brasserie (S4). Chaque contact porte sa source et sa
 * date : un numéro sans origine ne passe pas. Seul un numéro que la
 * brasserie publie elle-même pour ses clients y entre (plan v2).
 */
export const contactSchema = z
  .object({
    /**
     * Numéro français en paires : « 04 72 50 88 53 ». Les 08 (numéros
     * spéciaux, souvent surtaxés) sont refusés : pas un bouton « Appeler »
     * vers un numéro payant (revue code S4). **Métropole seulement** : le
     * lien `tel:+33…` serait faux pour l'outre-mer (+590, +262…) ; aucune
     * brasserie du fichier n'y est (BACKLOG).
     */
    tel: z
      .string()
      .regex(/^0[1-79]( \d{2}){4}$/, 'numéro attendu au format « 04 72 50 88 53 », hors 08')
      .optional(),
    site: lienSchema.optional(),
    untappd: lienUntappdSchema.optional(),
    /** La page où ces informations ont été lues. */
    source: lienSchema,
    verifieLe: z.iso.date(),
  })
  .strict()
  // Un contact vide afficherait « coordonnées lues le … » sur rien.
  .refine((c) => c.tel !== undefined || c.site !== undefined || c.untappd !== undefined, {
    message: 'un contact donne au moins un téléphone, un site ou un lien Untappd',
  })

const HEURE = /^([01]\d|2[0-3]):[0-5]\d$/

/**
 * Un créneau [ouverture, fermeture], au format 24 h. Une fermeture plus tôt
 * que l'ouverture veut dire **le lendemain** : « 17h-1h » s'écrit
 * ["17:00", "01:00"], « 17h-0h » ["17:00", "00:00"] (Platypus, Brasserie des
 * Roches — revue code S6). Seul le créneau nul est refusé.
 */
const creneauSchema = z
  .tuple([z.string().regex(HEURE), z.string().regex(HEURE)])
  .refine(([debut, fin]) => debut !== fin, { message: 'créneau nul' })

/** Un créneau qui passe minuit ne peut être que le dernier de la journée. */
const passeMinuit = ([debut, fin]: readonly [string, string]) => fin <= debut

/**
 * Un jour : ses créneaux, dans l'ordre et sans chevauchement ; `[]` = fermé ;
 * « heures-non-precisees » = ouvert, la source ne dit pas à quelle heure ;
 * absent = la source ne dit rien de ce jour.
 */
const jourSchema = z
  .union([
    z.array(creneauSchema).refine(
      (cr) =>
        cr.every((c, i) => {
          const suivant = cr[i + 1]
          if (suivant === undefined) return true
          return !passeMinuit(c) && c[1] <= suivant[0]
        }),
      { message: 'créneaux dans le désordre ou qui se chevauchent' },
    ),
    z.literal('heures-non-precisees'),
  ])
  .optional()

/**
 * Un bloc d'horaires (S6) — **seulement quand une source les donne**, jamais
 * déduits du texte `note`. `nature` dit ce qu'il couvre : l'accueil du
 * public (bar, dégustation) ou la vente seule ; une brasserie peut avoir les
 * deux (Caribrew : vente en semaine, brewpub jeudi-samedi). `remarque` porte
 * ce que les créneaux ne savent pas dire (« fermée d'octobre à mai », « sur
 * rendez-vous »), affichée au-dessus du tableau (revue métier S6).
 */
const blocHorairesSchema = z
  .object({
    nature: z.enum(['accueil', 'vente']),
    lun: jourSchema,
    mar: jourSchema,
    mer: jourSchema,
    jeu: jourSchema,
    ven: jourSchema,
    sam: jourSchema,
    dim: jourSchema,
    remarque: z.string().trim().min(1).optional(),
    source: lienSchema,
    verifieLe: z.iso.date(),
  })
  .strict()

export const horairesSchema = z
  .array(blocHorairesSchema)
  .min(1)
  .refine((blocs) => new Set(blocs.map((b) => b.nature)).size === blocs.length, {
    message: 'un seul bloc par nature (accueil, vente)',
  })

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

/**
 * L'objet nu, sans les règles croisées : sert à décrire une partie d'une
 * fiche (une proposition de curation, S11), que Zod refuse de découper sur
 * un schéma raffiné. Les règles croisées s'appliquent ensuite à la fiche
 * entière, par `brasserieSchema`.
 */
export const brasserieObjetSchema = z
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
    /**
     * Date de la dernière vérification (AAAA-MM-JJ). Absente des 166 lignes
     * fournies le 15/10 (la fiche dit alors « non renseignée ») ; remplie
     * par la curation (S11 et suivants, dans `data/` depuis S266), jamais
     * devinée.
     */
    verifieLe: z.iso.date().optional(),
    contact: contactSchema.optional(),
    horaires: horairesSchema.optional(),
    /**
     * Fermée (décision #35, `docs/DECISIONS.md`) : la source qui le dit, et
     * quand on l'a lue. Une fiche fermée sort de la liste par défaut et
     * reste trouvable par son nom. Marquer une fiche fermée est une ligne de
     * `data/` : un lot, accepté par Cédric (CLAUDE.md §0).
     */
    fermee: z.object({ source: lienSchema, verifieLe: z.iso.date() }).strict().optional(),
  })
  .strict()

export const brasserieSchema = brasserieObjetSchema
  .refine((b) => b.cat === 0 || b.src !== '', {
    message: 'une catégorie de vente affirmée (1 à 3) exige une source',
    path: ['src'],
  })
  .refine((b) => (b.cat === 0) === (b.conf === ''), {
    message: 'la confiance est vide en catégorie 0, et seulement en catégorie 0',
    path: ['conf'],
  })

/**
 * Les noms sont uniques : l'application choisit une brasserie par son nom
 * (liste, carte, clé React). Vrai des 166 lignes au 15/10 ; la règle le
 * garde pour la suite (revue adverse du 15/10).
 */
export const brasseriesSchema = z.array(brasserieSchema).superRefine((lignes, ctx) => {
  const vus = new Map<string, number>()
  lignes.forEach((b, i) => {
    const avant = vus.get(b.n)
    if (avant !== undefined) {
      ctx.addIssue({ code: 'custom', path: [i, 'n'], message: `nom déjà utilisé ligne ${String(avant)}` })
    } else {
      vus.set(b.n, i)
    }
  })
})

export type Brasserie = z.infer<typeof brasserieSchema>
export type Categorie = z.infer<typeof categorieSchema>

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
