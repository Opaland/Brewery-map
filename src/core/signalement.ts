import { CATEGORIES } from './categories'
import type { Brasserie } from './schema'

/**
 * « Signaler une erreur » (S10) : une issue GitHub préremplie, sans serveur.
 *
 * **Ce que le lien emporte** : seulement ce qui est déjà public dans
 * `data/breweries.json` pour cette brasserie. Ni distance, ni point de
 * départ, ni favoris : les fonctions ne reçoivent que la ligne du fichier,
 * elles ne peuvent rien emporter d'autre (CLAUDE.md §0).
 *
 * **Ce que la personne doit savoir** (dit à l'écran) : il faut un compte
 * GitHub, et l'issue est publique, sous son nom de compte.
 */
const DEPOT = 'https://github.com/Opaland/Brewery-map/issues/new'

/**
 * Ce qui se passe après l'envoi, dit à l'écran **et** dans l'issue (revue
 * métier S10). Vrai d'après le processus du plan (SPRINTS.md, « Comment les
 * À confirmer se reconfirment ») et CLAUDE.md §0 : Cédric décide ligne par
 * ligne. Aucun délai n'est établi : il n'en est promis aucun.
 */
export const SUITE_SIGNALEMENT =
  'Chaque signalement est lu par l’éditeur de la carte, qui décide de changer ou non la fiche. Sans source qui montre l’information, la fiche ne change pas. Aucun délai n’est garanti.'

/** Dit tel quel faute d'autre voie : aucune adresse de contact n'a été décidée (BACKLOG). */
export const SANS_COMPTE = 'Pas de compte GitHub ? Il n’y a pas d’autre moyen pour l’instant.'

/**
 * Pas une limite connue de GitHub (non mesurée) : 2 000 caractères, sous
 * les 2 083 d'Internet Explorer, valeur prudente d'usage pour un lien.
 * Mesuré le 16/10 : 1 446 au plus sur les 166 lignes. Tenue par
 * `lienSignalement` lui-même depuis #54 : une fiche future aux champs longs
 * ne la dépasse pas non plus.
 */
export const LONGUEUR_MAX_URL = 2000

function lien(titre: string, corps: string): string {
  const u = new URL(DEPOT)
  u.searchParams.set('title', titre)
  u.searchParams.set('body', corps)
  return u.toString()
}

const QUESTIONS = [
  '## Ce qui est faux',
  '(par exemple : « on ne peut pas consommer sur place », « l’adresse a changé »)',
  '',
  '',
  '## La bonne information',
  '(par exemple : « bar ouvert le samedi de 15 h à 20 h »)',
  '',
  '',
  '## Une source qui le montre',
  '(site de la brasserie, page officielle, photo d’affiche… un lien si possible)',
  '',
  '',
  '## Vous êtes',
  '- [ ] la brasserie — un lien vers une page de votre site officiel aide à vérifier',
  '- [ ] un client ou une cliente',
  '',
  '---',
  SUITE_SIGNALEMENT,
].join('\n')

/** En français, quelle que soit la langue de l'interface : l'issue est lue par Cédric. */
const CONFIANCE: Readonly<Record<Brasserie['conf'], string>> = {
  solide: 'élevée',
  moyenne: 'moyenne',
  faible: 'faible',
  '': 'non évaluée',
}
const PRECISION: Readonly<Record<Brasserie['coordPrecision'], string>> = {
  address: 'à l’adresse vérifiée',
  centre: 'au centre de la commune selon l’IGN',
  commune: 'approximatif',
  osm: 'placé sur OpenStreetMap',
}

/** Au moins ce nombre de caractères reste d'un champ coupé : assez pour le reconnaître. */
const COUPE_MIN = 8

/** Coupé par caractères (pas par unités UTF-16 : un emoji n'est pas coupé en deux). */
function couper(texte: string, longueur: number): string {
  const car = Array.from(texte)
  return car.length <= longueur ? texte : `${car.slice(0, longueur - 1).join('')}…`
}

/**
 * Le lien tient toujours sous `LONGUEUR_MAX_URL` (#54, revue code S10 : la
 * garde ne valait que pour les lignes présentes). Trop long, le champ le plus
 * long est raccourci, puis le suivant, jusqu'à tenir ; un champ garde au
 * moins `COUPE_MIN` caractères, assez pour reconnaître la fiche.
 */
export function lienSignalement(b: Brasserie): string {
  // Tous les champs recopiés, y compris ceux que le schéma borne déjà
  // (département, date) : la garde ne dépend pas de lui.
  const champs: Record<'n' | 'c' | 'd' | 'addr' | 'src' | 'verifie' | 'fermee', string> = {
    n: b.n,
    c: b.c,
    d: b.d,
    verifie: b.verifieLe ?? 'non renseigné',
    addr: b.addr,
    src: b.src,
    fermee: b.fermee?.source ?? '',
  }
  const construire = () => {
    const fiche = [
      '## La fiche telle qu’affichée',
      `- Nom : ${champs.n}`,
      `- Commune : ${champs.c} (${champs.d})`,
      `- Adresse : ${champs.addr}`,
      `- Ce qu’on peut y faire : ${CATEGORIES[b.cat]}`,
      `- Source : ${champs.src === '' ? 'aucune' : champs.src}`,
      `- Vérifiée le : ${champs.verifie}`,
      // Ce qu'une brasserie vient le plus souvent corriger : sans ces lignes,
      // elle devait redire ce que la fiche affiche (S295).
      `- Confiance : ${CONFIANCE[b.conf]}`,
      `- Point sur la carte : ${PRECISION[b.coordPrecision]}`,
      ...(b.fermee === undefined ? [] : [`- Dite fermée, selon : ${champs.fermee}`]),
    ].join('\n')
    return lien(`Signalement : ${champs.n} (${champs.c})`, `${fiche}\n\n${QUESTIONS}\n`)
  }
  let url = construire()
  while (url.length > LONGUEUR_MAX_URL) {
    const [cle, valeur] = Object.entries(champs).sort(([, a], [, z]) => Array.from(z).length - Array.from(a).length)[0] ?? ['n', '']
    const n = Array.from(valeur).length
    if (n <= COUPE_MIN) break
    champs[cle as keyof typeof champs] = couper(valeur, Math.max(COUPE_MIN, Math.floor(n * 0.8)))
    url = construire()
  }
  return url
}

export function lienAjout(): string {
  const corps = [
    '## La brasserie',
    '- Nom : ',
    '- Commune : ',
    '- Adresse : ',
    '',
    '## Ce qu’on peut y faire',
    '(acheter sur place ? consommer sur place ? quels jours ?)',
    '',
    '',
    '## Une source qui le montre',
    '(site de la brasserie, page officielle… un lien si possible)',
    '',
  ].join('\n')
  return lien('Brasserie absente : ', corps)
}
