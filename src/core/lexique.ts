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

/** Un mot entier, accents compris : « Triplette » n'est pas une triple. */
const mot = (source: string) => new RegExp(`(?<![\\p{L}])(?:${source})(?![\\p{L}])`, 'iu')

/**
 * Les styles que les libellés des bières nomment sans les expliquer (S316,
 * revue Marie S308 : « L'Ébariole (tourbée) »). Choisis en comptant les 131
 * libellés « autre » de `data/` le 20/10. Comme pour les notes, c'est le
 * sens d'un mot, pas une information sur la bière.
 */
export const LEXIQUE_BIERES: readonly { mot: string; motif: RegExp; sens: string }[] = [
  // « fumée » n'est pas « tourbée » : un malt fumé au bois de hêtre n'a pas le
  // goût de la tourbe (revue adverse S316, « Blonde Fumée (fumée au bois de hêtre) »).
  { mot: 'tourbée', motif: mot('tourbée|peated'), sens: 'au goût fumé de la tourbe, comme certains whiskys' },
  { mot: 'fumée', motif: mot('fumée|smoked'), sens: 'au goût de fumée' },
  // Un nom de bière peut dire « triple » sans en être une (« Triple Salto ») :
  // le sens le dit (revue adverse S316).
  { mot: 'triple', motif: mot('triples?|tripels?|trippels?'), sens: 'le plus souvent, une bière forte de tradition belge' },
  { mot: 'pale ale', motif: mot('pale ales?|apa'), sens: 'une bière blonde ou ambrée, houblonnée' },
  { mot: 'porter', motif: mot('porters?'), sens: 'une bière brune, aux notes torréfiées' },
  { mot: 'saison', motif: mot('saisons?'), sens: 'une bière de tradition belge, sèche et rafraîchissante' },
  { mot: 'red ale', motif: mot('red ales?'), sens: 'une bière rousse' },
  { mot: 'gose', motif: mot('gose'), sens: 'une bière de blé acidulée, légèrement salée' },
  { mot: 'berliner weisse', motif: mot('berliner weisse'), sens: 'une bière de blé légère et acidulée' },
  { mot: 'bière de blé allemande', motif: mot('weissbier|hefeweizen|weizen'), sens: 'une bière de blé à l’allemande' },
  { mot: 'cervoise', motif: mot('cervoises?'), sens: 'un nom ancien de la bière, venu des Gaulois' },
  { mot: 'barley wine', motif: mot('barley wines?'), sens: 'une bière très forte, qui se déguste comme un vin' },
  { mot: 'grisette', motif: mot('grisettes?'), sens: 'une bière légère et sèche, de tradition belge' },
  { mot: 'scotch ale', motif: mot('scotch ales?'), sens: 'une bière écossaise forte et maltée' },
]

/** Les styles nommés par les libellés des bières d'une fiche, une fois chacun, dans l'ordre. */
export function motsDesBieres(libelles: readonly string[]): { mot: string; sens: string }[] {
  const texte = libelles.join(' ; ')
  return LEXIQUE_BIERES.map((m) => ({ ...m, rang: texte.search(m.motif) }))
    .filter((m) => m.rang >= 0)
    .sort((a, b) => a.rang - b.rang)
    .map(({ mot: m, sens }) => ({ mot: m, sens }))
}

export function motsExpliques(texte: string): { mot: string; sens: string }[] {
  return LEXIQUE.map((m) => ({ ...m, rang: texte.search(m.motif) }))
    .filter((m) => m.rang >= 0)
    .sort((a, b) => a.rang - b.rang)
    .map(({ mot, sens }) => ({ mot, sens }))
}
