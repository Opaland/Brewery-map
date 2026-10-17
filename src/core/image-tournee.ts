/**
 * L'image de « Ma tournée » (S34), décrite comme un plan de dessin : une
 * liste de textes placés. Le dessin sur un canvas est dans `ImageTournee`
 * (le DOM) ; ici, ce qui est dit, testé sans navigateur.
 *
 * Ce que l'image ne porte jamais : le départ, la position, une distance
 * comptée depuis le départ (CLAUDE.md §0). Une image se transfère, se
 * republie : elle ne doit rien dire de la personne.
 */
export interface EtapeImage {
  nom: string
  commune: string
  departement: string
}

export interface TexteImage {
  texte: string
  x: number
  y: number
  taille: number
  gras: boolean
  role: 'titre' | 'etape' | 'lieu' | 'marque' | 'adresse'
}

export interface PlanImage {
  largeur: number
  hauteur: number
  textes: TexteImage[]
}

/** 1080 × 1350 : le format portrait que les messageries montrent en grand. */
const LARGEUR = 1080
const HAUTEUR = 1350
const MARGE = 96
/**
 * Caractères par ligne, au jugé pour la taille de 56 px de Fraunces sur
 * 888 px utiles (§2 : présentation seulement) ; une mesure exacte demande
 * le canvas, absent ici.
 */
const MAX_NOM = 28
const MAX_LIEU = 40

/** Coupe un texte trop long à un mot, avec des points de suspension. */
export function couper(texte: string, max: number): string {
  if (texte.length <= max) return texte
  const debut = texte.slice(0, max - 1)
  const espace = debut.lastIndexOf(' ')
  return `${(espace > max / 2 ? debut.slice(0, espace) : debut).trimEnd()}…`
}

export function planTournee(etapes: readonly EtapeImage[]): PlanImage {
  const textes: TexteImage[] = [
    { texte: 'Ma tournée', x: MARGE, y: 200, taille: 88, gras: true, role: 'titre' },
  ]
  let y = 360
  etapes.forEach((e, i) => {
    textes.push({ texte: `${String(i + 1)}. ${couper(e.nom, MAX_NOM)}`, x: MARGE, y, taille: 56, gras: true, role: 'etape' })
    textes.push({
      texte: couper(`${e.commune} (${e.departement})`, MAX_LIEU),
      x: MARGE + 64,
      y: y + 60,
      taille: 38,
      gras: false,
      role: 'lieu',
    })
    y += 190
  })
  textes.push({ texte: 'Mousse de Poche', x: MARGE, y: HAUTEUR - 150, taille: 52, gras: true, role: 'marque' })
  textes.push({ texte: 'opaland.github.io/Brewery-map', x: MARGE, y: HAUTEUR - 90, taille: 34, gras: false, role: 'adresse' })
  return { largeur: LARGEUR, hauteur: HAUTEUR, textes }
}
