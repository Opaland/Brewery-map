import type { Brasserie } from './schema'

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
  if (hhmm === '00:00') return 'minuit'
  const [h = '0', m = '00'] = hhmm.split(':')
  return m === '00' ? `${String(Number(h))} h` : `${String(Number(h))} h ${m}`
}

export function formaterCreneaux(jour: Jour): string {
  if (jour === undefined) return 'non précisé'
  if (jour === 'heures-non-precisees') return 'ouvert, heures non précisées'
  if (jour.length === 0) return 'fermé'
  return jour
    .map(([d, f]) => {
      const lendemain = f <= d && f !== '00:00' ? ' (le lendemain)' : ''
      return `${formaterHeure(d)} – ${formaterHeure(f)}${lendemain}`
    })
    .join(', ')
}

export interface Maintenant {
  /** « sous-reserve » : ouvert selon les créneaux, mais une remarque les nuance. */
  etat: 'ouvert' | 'ferme' | 'sous-reserve' | 'inconnu'
  /** Fin du créneau en cours, « HH:MM ». */
  jusqua?: string
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
function aParis(instant: Date): { jour: CleJour; hhmm: string } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instant)
  const val = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  return { jour: ABREGE[val('weekday')] ?? 'lun', hhmm: `${val('hour')}:${val('minute')}` }
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
  const bloc = horaires?.find((b) => b.nature === nature)
  if (bloc === undefined) return { etat: 'inconnu' }
  const { jour, hhmm } = aParis(instant)
  const ouvert = (jusqua: string): Maintenant => ({
    etat: bloc.remarque === undefined ? 'ouvert' : 'sous-reserve',
    jusqua,
  })

  // La veille d'abord : un créneau qui a passé minuit.
  const veille = bloc[ORDRE[(ORDRE.indexOf(jour) + 6) % 7] ?? 'dim']
  if (Array.isArray(veille)) {
    for (const [d, f] of veille) {
      if (f <= d && f !== '00:00' && hhmm < f) return ouvert(f)
    }
  }

  const aujourdhui = bloc[jour]
  if (aujourdhui === undefined || aujourdhui === 'heures-non-precisees') return { etat: 'inconnu' }
  for (const [d, f] of aujourdhui) {
    const finDuJour = f <= d
    if (hhmm >= d && (finDuJour || hhmm < f)) return ouvert(f)
  }
  return { etat: 'ferme' }
}
