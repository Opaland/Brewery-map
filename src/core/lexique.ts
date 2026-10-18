/**
 * Les mots du métier que les notes emploient (S295, Marie : 27 notes sur
 * 358 disaient taproom, brewpub ou vente directe sans les expliquer). Le
 * sens est celui de la langue courante, pas une information sur la
 * brasserie : la note reste la seule source de ce qu'on peut y faire.
 * Choisis en comptant les notes du 18/10 ; « dégustation », « bouteille »
 * ou « cave » se comprennent sans aide.
 */
export const LEXIQUE: readonly { mot: string; motif: RegExp; sens: string }[] = [
  { mot: 'taproom', motif: /\btap ?rooms?\b/i, sens: 'la salle de la brasserie où l’on boit ses bières, souvent à la pression' },
  { mot: 'brewpub', motif: /\bbrew ?pubs?\b/i, sens: 'un bar ou un restaurant qui brasse lui-même la bière qu’il sert' },
  { mot: 'vente directe', motif: /\bvente directe\b/i, sens: 'la vente à la brasserie même, sans magasin entre les deux' },
  { mot: 'microbrasserie', motif: /\bmicro-?brasseries?\b/i, sens: 'une petite brasserie artisanale, qui brasse en petites quantités' },
  { mot: 'nanobrasserie', motif: /\bnano-?brasseries?\b/i, sens: 'une brasserie plus petite encore qu’une microbrasserie' },
  { mot: 'fût', motif: /(?<![\p{L}])fûts?\b/iu, sens: 'le tonneau d’où la bière est tirée à la pression' },
  { mot: 'growler', motif: /\bgrowlers?\b/i, sens: 'une grande bouteille qu’on fait remplir à la pression pour l’emporter' },
  { mot: 'click and collect', motif: /\bclick ?(?:&|and|et|-) ?collect\b/i, sens: 'commander en ligne, puis passer chercher sa commande' },
]

export function motsExpliques(texte: string): { mot: string; sens: string }[] {
  return LEXIQUE.map((m) => ({ ...m, rang: texte.search(m.motif) }))
    .filter((m) => m.rang >= 0)
    .sort((a, b) => a.rang - b.rang)
    .map(({ mot, sens }) => ({ mot, sens }))
}
