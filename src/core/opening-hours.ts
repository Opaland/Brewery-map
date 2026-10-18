/**
 * S63 : une valeur `opening_hours` d'OpenStreetMap, lue dans le seul cas
 * simple — jours, plages de jours, créneaux. Tout le reste (commentaires,
 * jours fériés, mois, `off`, jour défini deux fois) se refuse avec sa raison :
 * une heure devinée serait une donnée inventée (CLAUDE.md §0).
 */
const JOURS = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'] as const
type Jour = (typeof JOURS)[number]
const OSM = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export type LectureOpeningHours = { jours: Partial<Record<Jour, [string, string][]>> } | { raison: string }

const JOUR = String.raw`(?:Mo|Tu|We|Th|Fr|Sa|Su)`
const HEURE = String.raw`(?:[01]\d|2[0-4]):[0-5]\d`
const REGLE = new RegExp(
  String.raw`^(${JOUR}(?:-${JOUR})?(?:,${JOUR}(?:-${JOUR})?)*)\s+(${HEURE}-${HEURE}(?:\s*,\s*${HEURE}-${HEURE})*)$`,
)

function jours(liste: string): Jour[] {
  return liste.split(',').flatMap((morceau) => {
    const [a, b] = morceau.split('-')
    const debut = OSM.indexOf(a ?? '')
    const fin = b === undefined ? debut : OSM.indexOf(b)
    const n = (fin - debut + 7) % 7
    return Array.from({ length: n + 1 }, (_, i) => JOURS[(debut + i) % 7] as Jour)
  })
}

export function lireOpeningHours(valeur: string): LectureOpeningHours {
  const resultat: Partial<Record<Jour, [string, string][]>> = {}
  for (const brute of valeur.split(';')) {
    const regle = brute.trim()
    if (regle === '') continue
    const m = REGLE.exec(regle)
    if (m === null) {
      if (new RegExp(`^${HEURE}\\s*-\\s*${HEURE}$`).test(regle)) return { raison: `règle sans jours : « ${regle} »` }
      return { raison: `commentaire ou mot non lu : « ${regle} »` }
    }
    const creneaux = (m[2] ?? '').split(',').map((c) => {
      const [debut = '', fin = ''] = c.trim().split('-')
      return [debut, fin === '24:00' ? '00:00' : fin] as [string, string]
    })
    const nul = creneaux.find(([d, f]) => d === f)
    if (nul !== undefined) return { raison: `créneau nul : ${nul[0]}-${nul[1]}` }
    for (const j of jours(m[1] ?? '')) {
      if (resultat[j] !== undefined) return { raison: `jour défini deux fois : ${j}` }
      resultat[j] = creneaux
    }
  }
  return { jours: resultat }
}
