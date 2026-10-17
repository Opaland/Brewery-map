import type { Brasserie } from './schema'

type Biere = Brasserie['beers'][number]
export type TypeDeBiere = Biere['type']

/**
 * Les types de bière, avec une explication pour qui ne connaît pas le mot
 * (persona Marie). Descriptions générales des styles, pas des affirmations
 * sur une brasserie donnée. Même ordre et mêmes clés que `typeDeBiereSchema`
 * — `satisfies` le fait vérifier par le typage (§4ter).
 */
export const TYPES_BIERE = [
  { type: 'blonde', libelle: 'Blonde', explication: 'claire et légère' },
  // Ajoutée après la revue métier S5 : le style le plus courant tombait
  // sous « Autre ».
  { type: 'lager', libelle: 'Lager / Pils', explication: 'blonde nette et désaltérante' },
  { type: 'blanche', libelle: 'Blanche', explication: 'au blé, souvent trouble et rafraîchissante' },
  { type: 'ipa', libelle: 'IPA', explication: 'très houblonnée, souvent amère' },
  { type: 'ambree', libelle: 'Ambrée', explication: 'cuivrée, notes de caramel' },
  { type: 'brune', libelle: 'Brune', explication: 'foncée, notes torréfiées' },
  { type: 'stout', libelle: 'Stout', explication: 'noire, café et chocolat' },
  { type: 'sour', libelle: 'Sour', explication: 'acidulée, souvent fruitée' },
  // Pas de seuil chiffré : il varie selon les pays et les époques (revue
  // métier S5). L'étiquette fait foi.
  { type: 'sans-alcool', libelle: 'Sans alcool', explication: 'pas ou très peu d’alcool' },
  { type: 'autre', libelle: 'Autre', explication: 'un style précisé sur la fiche' },
] as const satisfies readonly { type: TypeDeBiere; libelle: string; explication: string }[]

/**
 * Le lien d'une bière, dans l'ordre du cahier des charges (§1.4) : la page
 * de la bière sur le site de la brasserie, sinon la fiche d'annuaire de la
 * brasserie, sinon rien — « non référencé ». Jamais une page d'accueil
 * mise à la place d'une page de bière.
 */
export function lienDeBiere(
  biere: Biere,
  brasserie: Brasserie,
): { url: string; nature: 'produit' | 'annuaire' } | null {
  if (biere.url !== undefined) return { url: biere.url, nature: 'produit' }
  if (brasserie.directoryUrl !== undefined) return { url: brasserie.directoryUrl, nature: 'annuaire' }
  return null
}

/** Nombre de brasseries qui proposent chaque type (une fois par brasserie). */
export function compterTypes(brasseries: readonly Brasserie[]): Map<TypeDeBiere, number> {
  const n = new Map<TypeDeBiere, number>(TYPES_BIERE.map((t) => [t.type, 0]))
  for (const b of brasseries) {
    for (const t of new Set(b.beers.map((x) => x.type))) n.set(t, (n.get(t) ?? 0) + 1)
  }
  return n
}

/**
 * Le type d'une bière d'après le style qu'Untappd affiche (S53). Le style
 * décide, jamais le nom : une « Ambrée » au style Brown Ale est une brune,
 * une « Blonde » au style Pale Ale reste « autre ». Ordre des règles : la
 * plus précise d'abord (« Lager - Amber / Red » est une ambrée, « Lager -
 * IPL » une lager). Tout style sans règle tombe en « autre », et le lot
 * recopie alors le style dans le libellé.
 */
const REGLES_UNTAPPD: readonly (readonly [RegExp, TypeDeBiere])[] = [
  [/Non-Alcoholic|Low Alcohol/i, 'sans-alcool'],
  [/^IPA\b/, 'ipa'],
  [/^Stout\b/, 'stout'],
  [/^Sour\b|Gose|Berliner|Lambic/, 'sour'],
  [/^Wheat Beer\b|Witbier|Weizen|Hefeweizen/, 'blanche'],
  [/Amber|^Red Ale\b/, 'ambree'],
  [/^Brown Ale\b|^Porter\b/, 'brune'],
  [/^Lager\b|^Pilsner\b|Helles|Kellerbier/, 'lager'],
  [/Blonde|^Golden\b/, 'blonde'],
]

export function typeDuStyleUntappd(style: string): TypeDeBiere {
  return REGLES_UNTAPPD.find(([motif]) => motif.test(style))?.[1] ?? 'autre'
}
