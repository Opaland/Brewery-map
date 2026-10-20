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

/**
 * Où mènent le point de la carte et l'itinéraire, en une phrase (S308) ;
 * vide quand le point est à l'adresse vérifiée. Sans adresse de rue,
 * l'itinéraire va au point (`core/itineraire.ts`) : la phrase le dit.
 */
export function phrasePosition(b: Pick<Brasserie, 'coordPrecision' | 'c' | 'addr'>): string {
  if (b.coordPrecision === 'osm') return t('L’itinéraire mène au point placé sur OpenStreetMap, non vérifié sur place.')
  if (b.coordPrecision === 'address') return ''
  if (adresseDeRue(b)) {
    return b.coordPrecision === 'centre'
      ? t('Sur la carte, le point est le centre {deCommune}, pas la brasserie.', { deCommune: deLaCommune(b.c) })
      : t('Sur la carte, le point est approximatif, parfois à plusieurs kilomètres de la brasserie.')
  }
  return b.coordPrecision === 'centre'
    ? t('L’itinéraire mène au centre {deCommune}, pas à la brasserie.', { deCommune: deLaCommune(b.c) })
    : t('L’itinéraire mène à un point approximatif, parfois à plusieurs kilomètres de la brasserie.')
}

/**
 * « de Brignais », « d’Oullins », « du Puy-en-Velay », « des Ollières » ; en
 * anglais, le nom seul (la préposition est dans la phrase). Pas d’élision
 * devant H : h muet ou aspiré ne se lit pas dans le nom.
 */
export function deLaCommune(c: string): string {
  if (langueCourante() === 'en') return c
  if (c.startsWith('Le ')) return `du ${c.slice(3)}`
  if (c.startsWith('Les ')) return `des ${c.slice(4)}`
  if (/^[AEIOUYÀÂÉÈÊÎÔ]/i.test(c)) return `d’${c}`
  return `de ${c}`
}

/** Ce que la fiche ne sait pas encore (S308), dit une fois, en tête. */
export type Manque = 'adresse' | 'telephone' | 'horaires' | 'bieres'

export function ceQuiManque(b: Pick<Brasserie, 'addr' | 'c' | 'contact' | 'note' | 'horaires' | 'beers'>): Manque[] {
  const manque: Manque[] = []
  if (!adresseDeRue(b)) manque.push('adresse')
  // Un numéro cité par la source n'est pas « inconnu » : la partie « Joindre »
  // le dit, non revérifié (revue métier S4).
  if (b.contact?.tel === undefined && !citeUnNumero(b.note)) manque.push('telephone')
  if (b.horaires === undefined) manque.push('horaires')
  if (b.beers.length === 0) manque.push('bieres')
  return manque
}

/**
 * « Pas encore dans la fiche : son adresse, son téléphone, ses horaires et
 * ses bières. » ; vide si rien ne manque. « Dans la fiche » : c'est elle
 * qui ne sait pas, et rien ne promet qu'elle saura (revue Marie S308 :
 * « pas encore connus » le laissait entendre).
 */
export function phraseDuManque(manque: readonly Manque[]): string {
  const mots: Readonly<Record<Manque, string>> = {
    adresse: t('son adresse'),
    telephone: t('son téléphone'),
    horaires: t('ses horaires'),
    bieres: t('ses bières'),
  }
  const liste = manque.map((m) => mots[m])
  if (liste.length === 0) return ''
  const fin = liste.pop() ?? ''
  const texte = liste.length === 0 ? fin : `${liste.join(', ')}${t(' et ')}${fin}`
  return t('Pas encore dans la fiche : {liste}.', { liste: texte })
}

/**
 * La confiance, dite comme un conseil (S308). « Appelez » seulement si un
 * numéro est connu (revue métier S17, Bernard).
 */
export function phraseConfiance(b: Pick<Brasserie, 'conf' | 'note' | 'contact'>): string {
  const telephone = b.contact?.tel !== undefined || citeUnNumero(b.note)
  switch (b.conf) {
    case 'solide':
      return t('Confiance élevée.')
    case 'moyenne':
      return t('Confiance moyenne.')
    case 'faible':
      return telephone
        ? t('Confiance faible : appelez ou lisez la source avant d’y aller.')
        : t('Confiance faible : lisez la source avant d’y aller.')
    case '':
      return t('Rien n’établit encore ce qu’on peut y faire.')
  }
}

/** Ce qu'une lecture date : la fiche elle-même, ses coordonnées, ses horaires. */
export interface Lecture {
  quoi: 'fiche' | 'coordonnees' | 'horaires'
  /** La page lue : chaque lecture garde la sienne (revue adverse S312 : le lien du contact se perdait derrière celui de la fiche). */
  url: string
  date?: string
}

/** Les lectures d'un même site : il n'est cité qu'une fois. */
export interface LecturesDUnSite {
  hote: string
  url: string
  lectures: Lecture[]
}

/**
 * D'où vient la fiche, groupé par site, dans l'ordre de la fiche (S312 ;
 * revue Marie S308 : le même site cité trois fois, à trois dates, dans trois
 * parties). Rien n'est inventé : une fiche sans date garde sa source seule.
 */
export function lecturesDeLaFiche(b: Pick<Brasserie, 'src' | 'verifieLe' | 'contact' | 'horaires'>): LecturesDUnSite[] {
  const brutes: { quoi: Lecture['quoi']; url: string; date: string | undefined }[] = []
  if (b.src !== '') brutes.push({ quoi: 'fiche', url: b.src, date: b.verifieLe })
  if (b.contact !== undefined) brutes.push({ quoi: 'coordonnees', url: b.contact.source, date: b.contact.verifieLe })
  for (const bloc of b.horaires ?? []) brutes.push({ quoi: 'horaires', url: bloc.source, date: bloc.verifieLe })
  const groupes: LecturesDUnSite[] = []
  for (const l of brutes) {
    const hote = hoteDeSource(l.url) ?? l.url
    let groupe = groupes.find((g) => g.hote === hote)
    if (groupe === undefined) {
      groupe = { hote, url: l.url, lectures: [] }
      groupes.push(groupe)
    }
    // Deux blocs d'horaires lus le même jour sur le même site : une lecture.
    if (groupe.lectures.some((x) => x.quoi === l.quoi && x.date === l.date)) continue
    groupe.lectures.push(l.date === undefined ? { quoi: l.quoi, url: l.url } : { quoi: l.quoi, url: l.url, date: l.date })
  }
  return groupes
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
 * L'adresse dit-elle plus que la commune ? 113 fiches sur 348 n'ont pour
 * adresse que leur commune (compté le 20/10), parfois précédée du code postal (S295, la fiche
 * face à la concurrence) : la fiche dit alors « adresse non connue » au lieu
 * de répéter le nom de la commune.
 */
export function adresseDeRue(b: Pick<Brasserie, 'addr' | 'c'>): boolean {
  const sansCode = b.addr.replace(/\b\d{5}\b/g, ' ')
  return normaliser(sansCode) !== normaliser(b.c)
}

/** L'identifiant de la fiche dans la page : le lien « #fiche= » et le défilement y mènent. */
export const idFiche = (nom: string) => `fiche-${encodeURIComponent(nom)}`
