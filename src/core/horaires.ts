import { langueCourante, t } from '../i18n'
import { dansLaPeriode, type Brasserie } from './schema'

export type Horaires = NonNullable<Brasserie['horaires']>
export type Bloc = Horaires[number]
type Jour = Bloc['lun']
export type CleJour = 'lun' | 'mar' | 'mer' | 'jeu' | 'ven' | 'sam' | 'dim'
export type Ouverture = 'oui' | 'non' | 'sous-reserve' | 'inconnu'

export const JOURS: readonly { cle: CleJour; nom: string }[] = [
  { cle: 'lun', nom: 'Lundi' },
  { cle: 'mar', nom: 'Mardi' },
  { cle: 'mer', nom: 'Mercredi' },
  { cle: 'jeu', nom: 'Jeudi' },
  { cle: 'ven', nom: 'Vendredi' },
  { cle: 'sam', nom: 'Samedi' },
  { cle: 'dim', nom: 'Dimanche' },
]

/**
 * Ouvert tel jour, pour telle nature (l'accueil du public par défaut) ?
 * « inconnu » dès que la source ne le dit pas ; « sous-reserve » quand une
 * remarque accompagne les horaires (saison, rendez-vous) : un « oui » sec la
 * contredirait. Rien n'est déduit du texte `note`.
 *
 * Pas encore branché à un filtre (BACKLOG) ; le sera quand des données
 * existeront.
 */
export function ouvertLe(
  horaires: Horaires | undefined,
  jour: CleJour,
  nature: Bloc['nature'] = 'accueil',
): Ouverture {
  const bloc = horaires?.find((b) => b.nature === nature)
  const valeur = bloc?.[jour]
  if (bloc === undefined || valeur === undefined) return 'inconnu'
  if (Array.isArray(valeur) && valeur.length === 0) return 'non'
  return bloc.remarque === undefined ? 'oui' : 'sous-reserve'
}

/** « 15:00 » → « 15 h », « 09:30 » → « 9 h 30 », « 00:00 » → « minuit ». */
export function formaterHeure(hhmm: string): string {
  if (hhmm === '00:00') return t('minuit')
  // En anglais, l'heure sur 24 h telle qu'elle est écrite : « 15:00 ».
  if (langueCourante() === 'en') return hhmm
  const [h = '0', m = '00'] = hhmm.split(':')
  return m === '00' ? `${String(Number(h))} h` : `${String(Number(h))} h ${m}`
}

export function formaterCreneaux(jour: Jour): string {
  if (jour === undefined) return t('non précisé')
  if (jour === 'heures-non-precisees') return t('ouvert, heures non précisées')
  if (jour.length === 0) return t('fermé')
  return jour
    .map(([d, f]) => {
      const lendemain = f <= d && f !== '00:00' ? t(' (le lendemain)') : ''
      return `${formaterHeure(d)} – ${formaterHeure(f)}${lendemain}`
    })
    .join(', ')
}

export interface Maintenant {
  /** « sous-reserve » : ouvert selon les créneaux, mais une remarque les nuance. */
  etat: 'ouvert' | 'ferme' | 'sous-reserve' | 'inconnu'
  /** Fin du créneau en cours, « HH:MM ». */
  jusqua?: string
  /** S299 : la source ne publie d'horaires que pour d'autres périodes de l'année. */
  horsPeriode?: boolean
}

/**
 * Le bloc de cette nature qui vaut ce jour « MM-JJ » (S299) : celui sans
 * période, ou celui dont la période couvre le jour. `horsPeriode` quand la
 * source a des blocs de cette nature, mais aucun pour ce jour.
 */
export function blocDuJour(
  horaires: Horaires | undefined,
  nature: Bloc['nature'],
  mmjj: string,
): { bloc?: Bloc; horsPeriode: boolean } {
  const blocs = (horaires ?? []).filter((b) => b.nature === nature)
  if (blocs.length === 0) return { horsPeriode: false }
  const bloc = blocs.find((b) => b.periode === undefined || dansLaPeriode(b.periode, mmjj))
  return bloc === undefined ? { horsPeriode: true } : { bloc, horsPeriode: false }
}

/** « 07-01 » → « 1er juillet » (français), « 1 July » (anglais). */
function dateEnMots(mmjj: string): string {
  const [m = 1, j = 1] = mmjj.split('-').map(Number)
  // Des appels littéraux : le test des traductions les retrouve (§4ter).
  const mois = [t('janvier'), t('février'), t('mars'), t('avril'), t('mai'), t('juin'), t('juillet'), t('août'), t('septembre'), t('octobre'), t('novembre'), t('décembre')][m - 1] ?? ''
  if (langueCourante() === 'en') return `${String(j)} ${mois}`
  return `${j === 1 ? '1er' : String(j)} ${mois}`
}

/** « du 1er juillet au 31 août » — la période d'un bloc de saison (S299). */
export function libellePeriode(periode: { du: string; au: string }): string {
  return t('du {du} au {au}', { du: dateEnMots(periode.du), au: dateEnMots(periode.au) })
}

const ORDRE: readonly CleJour[] = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim']
const ABREGE: Readonly<Record<string, CleJour>> = {
  Mon: 'lun',
  Tue: 'mar',
  Wed: 'mer',
  Thu: 'jeu',
  Fri: 'ven',
  Sat: 'sam',
  Sun: 'dim',
}

/** Le jour et l'heure à Paris, quel que soit le fuseau du téléphone. */
function aParis(instant: Date): { jour: CleJour; hhmm: string; mmjj: string } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    weekday: 'short',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instant)
  const val = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  return { jour: ABREGE[val('weekday')] ?? 'lun', hhmm: `${val('hour')}:${val('minute')}`, mmjj: `${val('month')}-${val('day')}` }
}

/** Le même instant, `n` jours plus tard (ou plus tôt) : pour la date du jour voisin à Paris. */
const decale = (instant: Date, n: number) => new Date(instant.getTime() + n * 86_400_000)

/** « MM-JJ » à Paris : le jour de l'année qui choisit le bloc de saison (S299). */
export function moisJourDeParis(instant: Date): string {
  return aParis(instant).mmjj
}

/** « HH:MM » à Paris, pour dire l'heure à laquelle l'état a été calculé. */
export function heureDeParis(instant: Date): string {
  return aParis(instant).hhmm
}

/**
 * Ouvert à cet instant, pour telle nature (S19, Hugo) ? Seulement d'après les
 * créneaux publiés : « inconnu » dès que la source ne dit rien du jour, ou
 * ne donne pas d'heures. Un créneau dont la fin précède le début (« 20:00 –
 * 02:00 ») couvre le début du jour suivant ; « 00:00 » en fin veut dire
 * minuit. Une remarque (saison, rendez-vous) rend le « ouvert » sous réserve,
 * comme dans `ouvertLe`.
 */
export function ouvertMaintenant(
  horaires: Horaires | undefined,
  instant: Date,
  nature: Bloc['nature'] = 'accueil',
): Maintenant {
  const { jour, hhmm, mmjj } = aParis(instant)
  const ouvert = (b: Bloc, jusqua: string): Maintenant => ({
    etat: b.remarque === undefined ? 'ouvert' : 'sous-reserve',
    jusqua,
  })

  // La veille d'abord : un créneau qui a passé minuit, d'après le bloc de la
  // veille (S299 : la veille peut être dans une autre saison).
  const hier = blocDuJour(horaires, nature, aParis(decale(instant, -1)).mmjj).bloc
  const veille = hier?.[ORDRE[(ORDRE.indexOf(jour) + 6) % 7] ?? 'dim']
  if (hier !== undefined && Array.isArray(veille)) {
    for (const [d, f] of veille) {
      if (f <= d && f !== '00:00' && hhmm < f) return ouvert(hier, f)
    }
  }

  const { bloc, horsPeriode } = blocDuJour(horaires, nature, mmjj)
  if (bloc === undefined) return horsPeriode ? { etat: 'inconnu', horsPeriode: true } : { etat: 'inconnu' }
  const aujourdhui = bloc[jour]
  if (aujourdhui === undefined || aujourdhui === 'heures-non-precisees') return { etat: 'inconnu' }
  for (const [d, f] of aujourdhui) {
    const finDuJour = f <= d
    if (hhmm >= d && (finDuJour || hhmm < f)) return ouvert(bloc, f)
  }
  return { etat: 'ferme' }
}

export type Prochaine =
  | { etat: 'connue'; jour: CleJour; heure: string; dansJours: number; sousReserve: boolean }
  | { etat: 'inconnue' }

/**
 * La prochaine ouverture d'après les créneaux publiés (S295 : « fermé »
 * seul ne disait pas quand revenir ; Google Maps le dit). On avance jour
 * par jour depuis maintenant ; un jour que la source ne dit pas, ou ouvert
 * sans heures, arrête tout : il pourrait être ouvert, rien ne se déduit au
 * delà. Une semaine entière sans créneau : rien à annoncer.
 */
export function prochaineOuverture(
  horaires: Horaires | undefined,
  instant: Date,
  nature: Bloc['nature'] = 'accueil',
): Prochaine {
  const { jour, hhmm } = aParis(instant)
  const depart = ORDRE.indexOf(jour)
  // Jusqu'au même jour de la semaine suivante : ouvert le seul samedi
  // matin, samedi après-midi doit dire « samedi » (revue adverse S295).
  // Chaque jour lit le bloc de sa saison ; hors de toute période, rien ne
  // s'annonce (S299).
  for (let n = 0; n <= 7; n++) {
    const cle = ORDRE[(depart + n) % 7] ?? 'lun'
    const { bloc } = blocDuJour(horaires, nature, aParis(decale(instant, n)).mmjj)
    if (bloc === undefined) return { etat: 'inconnue' }
    const valeur = bloc[cle]
    if (valeur === undefined || valeur === 'heures-non-precisees') return { etat: 'inconnue' }
    const debut = valeur.map(([d]) => d).find((d) => n > 0 || d > hhmm)
    if (debut !== undefined) return { etat: 'connue', jour: cle, heure: debut, dansJours: n, sousReserve: bloc.remarque !== undefined }
  }
  return { etat: 'inconnue' }
}

/** « Prochaine ouverture : vendredi à 14 h. » — ou rien de déduit (S295, RF3). */
export function phraseProchaine(bloc: Bloc, instant: Date): string {
  const p = prochaineOuverture([bloc], instant, bloc.nature)
  if (p.etat === 'inconnue') return t('La source ne dit pas quand elle rouvre.')
  const heure = formaterHeure(p.heure)
  const quand =
    p.dansJours === 0
      ? t('aujourd’hui à {heure}', { heure })
      : p.dansJours === 1
        ? t('demain à {heure}', { heure })
        : t('{jour} à {heure}', { jour: nomDuJour(p.jour), heure })
  return p.sousReserve ? t('Prochaine ouverture : {quand}, sous réserve.', { quand }) : t('Prochaine ouverture : {quand}.', { quand })
}


/**
 * L'état court de la ligne de liste (S295, Hugo : il fallait ouvrir chaque
 * fiche pour savoir). L'accueil du public d'abord, sinon la vente ; rien
 * quand la source ne dit rien de l'instant : la ligne ne devine pas.
 */
export function etatPourLaListe(horaires: Horaires | undefined, instant: Date): string | undefined {
  const nature = horaires?.some((b) => b.nature === 'accueil') === true ? 'accueil' : horaires?.[0]?.nature
  if (nature === undefined) return undefined
  const m = ouvertMaintenant(horaires, instant, nature)
  if (m.etat === 'inconnu') return undefined
  const ouvert = m.etat !== 'ferme'
  const texte =
    nature === 'accueil'
      ? ouvert
        ? t('Ouvert au public maintenant')
        : t('Fermé au public maintenant')
      : ouvert
        ? t('Vente ouverte maintenant')
        : t('Vente fermée maintenant')
  return m.etat === 'sous-reserve' ? t('{etat}, sous réserve', { etat: texte }) : texte
}

/** « samedi » en français, « Saturday » en anglais : les jours anglais prennent une majuscule. */
function nomDuJour(cle: CleJour): string {
  const nom = t(JOURS.find((j) => j.cle === cle)?.nom ?? '')
  return langueCourante() === 'fr' ? nom.toLowerCase() : nom
}
