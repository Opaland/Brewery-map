import type { Brasserie } from './schema'

/**
 * Libellés de la fiche. Fonctions pures : tout ce que la fiche affiche passe
 * par ici, et rien d'absent n'y est remplacé par une valeur inventée.
 */

/**
 * Le fichier dit `solide` ; le cahier des charges dit « élevée ». Cédric a
 * choisi le mot du cahier (15/10). Vide = catégorie 0, aucune preuve retenue.
 */
export function libelleConfiance(conf: Brasserie['conf']): string {
  switch (conf) {
    case 'solide':
      return 'élevée'
    case 'moyenne':
      return 'moyenne'
    case 'faible':
      return 'faible'
    case '':
      return 'non évaluée (aucune preuve retenue)'
  }
}

/**
 * Ce que chaque niveau veut dire. Définition **proposée le 15/10 à partir des
 * textes du fichier**, à valider par Cédric : elle décrit la qualité de la
 * preuve, pas une probabilité (cahier des charges §1.3). Voir docs/DONNEES.md.
 */
export const SENS_CONFIANCE: Readonly<Record<Brasserie['conf'], string>> = {
  solide:
    'Une source qui décrit directement le lieu (site de la brasserie, office de tourisme) dit ce qu’on peut y faire, avec des horaires.',
  moyenne:
    'Une source cite la vente ou l’accueil, mais sans tout préciser (horaires partiels, source secondaire).',
  faible:
    'La catégorie est déduite ou repose sur une source ancienne ou indirecte : à vérifier avant de se déplacer.',
  '': 'Aucune source n’établit ce qu’on peut y faire.',
}

export function libellePrecision(precision: Brasserie['coordPrecision']): string {
  return precision === 'commune'
    ? 'approximative : centre de la commune, à environ 2 km près'
    : 'à l’adresse vérifiée'
}

/** Le site de la source, lisible (« nomadebiere.fr »), ou null s'il n'y en a pas. */
export function hoteDeSource(src: string): string | null {
  if (src === '') return null
  return new URL(src).hostname.replace(/^www\./, '')
}

const DATE = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

/** Date de dernière vérification, ou l'aveu qu'elle manque. */
export function libelleVerification(iso: string | undefined): string {
  if (iso === undefined) return 'non renseignée'
  return DATE.format(new Date(`${iso}T00:00:00Z`))
}
