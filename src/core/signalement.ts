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
 * Garde-fou de test, pas une limite connue de GitHub (non mesurée) :
 * 2 000 caractères, sous les 2 083 d'Internet Explorer, valeur prudente
 * d'usage pour un lien. Mesuré le 15/10 : 929 au plus sur les 166 lignes.
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
  '',
  '',
  '## La bonne information',
  '',
  '',
  '## Une source qui le montre',
  '(site de la brasserie, page officielle, photo d’affiche… un lien si possible)',
  '',
  '',
  '## Vous êtes',
  '- [ ] la brasserie',
  '- [ ] un client ou une cliente',
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
