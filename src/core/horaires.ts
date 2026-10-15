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
function heure(hhmm: string): string {
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
      return `${heure(d)} – ${heure(f)}${lendemain}`
    })
    .join(', ')
}
