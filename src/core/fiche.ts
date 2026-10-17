import { langueCourante, t } from '../i18n'
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
            return t('élevée')
        case 'moyenne':
      return t('moyenne')
        case 'faible':
      return t('faible')
    case '':
            return t('non évaluée (aucune preuve retenue)')
  }
}

/**
 * Ce que chaque niveau veut dire. Définition **proposée à partir des textes du
 * fichier**, à valider par Cédric : elle décrit la qualité de la preuve sur la
 * catégorie, pas une probabilité (cahier des charges §1.3). Voir
 * docs/DONNEES.md.
 *
 * Corrigée le 15/10 après la revue métier de S3 : la première version disait
 * « avec des horaires » pour `solide`, ce que cinq lignes du fichier
 * démentent (« heures non précisées », « horaires non publiés »…). Aucun
 * niveau ne parle donc des horaires : ils ne sont que dans la justification.
 */
export const SENS_CONFIANCE: Readonly<Record<Brasserie['conf'], string>> = {
  solide: 'La source décrit précisément ce qu’on peut faire sur place.',
  moyenne: 'La source cite la vente ou l’accueil, avec des réserves ou des manques.',
  faible:
    'La catégorie est déduite, probable, ou tirée d’une source ancienne ou indirecte.',
  '': 'Aucune source n’établit ce qu’on peut y faire.',
}

/**
 * Affiché sous toute confiance : elle porte sur la catégorie, jamais sur les
 * horaires. La revue métier de S3 a montré qu’« élevée » pouvait être lu
 * comme « ouvert samedi, c’est sûr ».
 *
 * « Appelez » seulement si un numéro est connu, au contact ou cité dans la
 * note : sinon la seule action proposée était impossible (revue métier S17,
 * Bernard).
 */
export function avertissementHoraires(b: Pick<Brasserie, 'note' | 'contact'>): string {
    return b.contact?.tel !== undefined || citeUnNumero(b.note)
    ? t('La confiance ne garantit pas les horaires : lisez ce que dit la source, et appelez en cas de doute.')
    : t(
        'La confiance ne garantit pas les horaires : lisez ce que dit la source. Aucun téléphone n’est encore connu pour les vérifier.',
      )
}

export function libellePrecision(precision: Brasserie['coordPrecision']): string {
  if (precision === 'commune') return t('approximative : centre de la commune, à environ 2 km près')
  if (precision === 'osm') return t('point placé sur OpenStreetMap, non vérifié sur place')
  return t('à l’adresse vérifiée')
}

/** Le site de la source, lisible (« nomadebiere.fr »), ou null s'il n'y en a pas. */
export function hoteDeSource(src: string): string | null {
  if (src === '') return null
  return new URL(src).hostname.replace(/^www\./, '')
}

const FORMAT_DATE = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' } as const
const DATE = {
  fr: new Intl.DateTimeFormat('fr-FR', FORMAT_DATE),
  en: new Intl.DateTimeFormat('en-GB', FORMAT_DATE),
}

/** Date de dernière vérification, ou l'aveu qu'elle manque. */
export function libelleVerification(iso: string | undefined): string {
  if (iso === undefined) return t('non renseignée')
  return DATE[langueCourante()].format(new Date(`${iso}T00:00:00Z`))
}

/** « 04 72 50 88 53 » → « tel:+33472508853 » : le format que tous les téléphones composent. */
export function lienTelephone(tel: string): string {
  return `tel:+33${tel.replace(/ /g, '').slice(1)}`
}

/**
 * Un numéro français cité dans la justification (`note`). Deux lignes du
 * fichier en contiennent un (revue métier S4) : la fiche ne doit pas dire
 * « non renseigné » juste au-dessus.
 */
export function citeUnNumero(texte: string): boolean {
  return /\b0[1-9](?:[ .]?\d{2}){4}\b/.test(texte)
}
