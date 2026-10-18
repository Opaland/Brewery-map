import { langueCourante, t } from '../i18n'
import { normaliser } from './recherche'
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
  if (precision === 'centre') return t('au centre de la commune selon l’IGN : ce n’est pas l’adresse de la brasserie')
  if (precision === 'commune') return t('approximative : ce point n’est pas l’adresse de la brasserie, et peut en être à plusieurs kilomètres')
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

/**
 * Les départements d'outre-mer ont leur propre indicatif, suivi du numéro
 * national sans son 0 : « 02 62 12 34 56 » se compose +262 262 12 34 56
 * (#47). Plan de numérotation de l'ARCEP, fixes et mobiles.
 */
const INDICATIFS_OUTRE_MER: Readonly<Record<string, string>> = {
  '0262': '262', '0269': '262', '0639': '262', '0692': '262', '0693': '262', // La Réunion, Mayotte
  '0590': '590', '0690': '590', '0691': '590', // Guadeloupe, Saint-Martin, Saint-Barthélemy
  '0594': '594', '0694': '594', // Guyane
  '0596': '596', '0696': '596', '0697': '596', // Martinique
}

/** « 04 72 50 88 53 » → « tel:+33472508853 » : le format que tous les téléphones composent. */
export function lienTelephone(tel: string): string {
  const chiffres = tel.replace(/ /g, '')
  const indicatif = INDICATIFS_OUTRE_MER[chiffres.slice(0, 4)] ?? '33'
  return `tel:+${indicatif}${chiffres.slice(1)}`
}

/**
 * Un numéro français cité dans la justification (`note`). Deux lignes du
 * fichier en contiennent un (revue métier S4) : la fiche ne doit pas dire
 * « non renseigné » juste au-dessus.
 */
export function citeUnNumero(texte: string): boolean {
  return /\b0[1-9](?:[ .]?\d{2}){4}\b/.test(texte)
}

/**
 * L'adresse dit-elle plus que la commune ? 125 fiches sur 358 n'ont pour
 * adresse que leur commune, parfois précédée du code postal (S295, la fiche
 * face à la concurrence) : la fiche dit alors « adresse non connue » au lieu
 * de répéter le nom de la commune.
 */
export function adresseDeRue(b: Pick<Brasserie, 'addr' | 'c'>): boolean {
  const sansCode = b.addr.replace(/\b\d{5}\b/g, ' ')
  return normaliser(sansCode) !== normaliser(b.c)
}
