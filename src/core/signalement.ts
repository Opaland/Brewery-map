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
 * Garde-fou de test, pas une limite connue de GitHub (non mesurée) :
 * 2 000 caractères, sous les 2 083 d'Internet Explorer, valeur prudente
 * d'usage pour un lien. Mesuré le 16/10 : 1 446 au plus sur les 166 lignes
 * (929 le 15/10, avant le texte sur la suite donnée au signalement).
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

export function lienSignalement(b: Brasserie): string {
  const fiche = [
    '## La fiche telle qu’affichée',
    `- Nom : ${b.n}`,
    `- Commune : ${b.c} (${b.d})`,
    `- Adresse : ${b.addr}`,
    `- Ce qu’on peut y faire : ${CATEGORIES[b.cat]}`,
    `- Source : ${b.src === '' ? 'aucune' : b.src}`,
    `- Vérifiée le : ${b.verifieLe ?? 'non renseigné'}`,
  ].join('\n')
  return lien(`Signalement : ${b.n} (${b.c})`, `${fiche}\n\n${QUESTIONS}\n`)
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
