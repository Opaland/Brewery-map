import { t } from '../i18n'

/**
 * Le dimanche de Pâques (calendrier grégorien), « MM-JJ » : l'algorithme
 * anonyme dit de Meeus, Jones et Butcher.
 */
function paques(annee: number): { mois: number; jour: number } {
  const a = annee % 19
  const b = Math.floor(annee / 100)
  const c = annee % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const mois = Math.floor((h + l - 7 * m + 114) / 31)
  const jour = ((h + l - 7 * m + 114) % 31) + 1
  return { mois, jour }
}

const mmjj = (date: Date): string =>
  `${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`

/**
 * Le jour férié de France métropolitaine qui tombe ce jour « MM-JJ » de
 * cette année, nommé ; `undefined` un jour ordinaire (S91). Les onze jours
 * du code du travail (L3133-1) ; ni l'Alsace-Moselle ni les outre-mer, où
 * aucune fiche n'a d'horaires au 19/10.
 */
export function jourFerie(annee: number, jour: string): string | undefined {
  const fixes: Readonly<Record<string, string>> = {
    '01-01': t('jour de l’an'),
    '05-01': t('1er mai'),
    '05-08': t('8 mai'),
    '07-14': t('14 juillet'),
    '08-15': t('15 août'),
    '11-01': t('Toussaint'),
    '11-11': t('11 novembre'),
    '12-25': t('Noël'),
  }
  const fixe = fixes[jour]
  if (fixe !== undefined) return fixe
  const p = paques(annee)
  const apres = (n: number) => mmjj(new Date(Date.UTC(annee, p.mois - 1, p.jour + n)))
  if (jour === apres(1)) return t('lundi de Pâques')
  if (jour === apres(39)) return t('Ascension')
  if (jour === apres(50)) return t('lundi de Pentecôte')
  return undefined
}
