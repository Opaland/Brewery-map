import type { Brasserie } from './schema'

export type Horaires = NonNullable<Brasserie['horaires']>
type Creneaux = Horaires['lun']
export type CleJour = 'lun' | 'mar' | 'mer' | 'jeu' | 'ven' | 'sam' | 'dim'

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
 * Ouvert tel jour ? « inconnu » dès que la source ne le dit pas : pas
 * d'horaires structurés, ou jour non précisé. Rien n'est déduit du texte.
 */
export function ouvertLe(h: Horaires | undefined, jour: CleJour): 'oui' | 'non' | 'inconnu' {
  const creneaux = h?.[jour]
  if (creneaux === undefined) return 'inconnu'
  return creneaux.length === 0 ? 'non' : 'oui'
}

/** « 15:00 » → « 15 h », « 09:30 » → « 9 h 30 ». */
function heure(hhmm: string): string {
  const [h = '0', m = '00'] = hhmm.split(':')
  return m === '00' ? `${String(Number(h))} h` : `${String(Number(h))} h ${m}`
}

export function formaterCreneaux(creneaux: Creneaux): string {
  if (creneaux === undefined) return 'non précisé'
  if (creneaux.length === 0) return 'fermé'
  return creneaux.map(([d, f]) => `${heure(d)} – ${heure(f)}`).join(', ')
}
