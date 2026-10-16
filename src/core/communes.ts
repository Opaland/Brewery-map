import { distanceKm, type Point } from './distance'
import { ABREVIATIONS, APOSTROPHES, normaliser } from './recherche'

/**
 * Une commune de France : nom, département, latitude, longitude. Le fichier
 * `public/communes-france.json` (fait par `outils/communes.ts`) les range de
 * la plus peuplée à la moins peuplée : l'ordre sert le classement.
 */
export type CommuneFrance = readonly [nom: string, dep: string, lat: number, lon: number]

/**
 * Le département d'un code postal : les deux premiers chiffres, trois outre-mer
 * (97x) ; en Corse, 200 et 201 pour la Corse-du-Sud (2A), 202 à 206 pour la
 * Haute-Corse (2B) — « 20000 » ne désignait aucun département (revue code S21).
 */
function departementDuCodePostal(cp: string): string {
  if (cp.startsWith('97')) return cp.slice(0, 3)
  if (cp.startsWith('20')) return cp < '20200' ? '2A' : '2B'
  return cp.slice(0, 2)
}

/** Ce qui est tapé, séparé en mots du nom et en indice de département. */
function lire(texte: string): { mots: string[]; dep: string | undefined } {
  const mots: string[] = []
  let dep: string | undefined
  for (const mot of normaliser(texte.replace(APOSTROPHES, '')).split(' ')) {
    if (/^\d{5}$/.test(mot)) dep = departementDuCodePostal(mot)
    else if (/^(\d{2,3}|2a|2b)$/.test(mot)) dep = mot.toUpperCase()
    else if (mot !== '') mots.push(ABREVIATIONS[mot] ?? mot)
  }
  return { mots, dep }
}

/**
 * Les communes qui répondent à un texte tapé (demande de Cédric du 16/10 :
 * « Je veux pouvoir chercher partout »). D'abord celles dont le nom commence
 * par le texte, puis celles dont un mot du nom commence par chaque mot tapé ;
 * dans chaque groupe, l'ordre du fichier (la population). Un nombre de deux
 * ou trois chiffres, ou un code postal, désigne le département : « Château
 * 71 ». Rien avant deux lettres : une seule lettre rendrait la moitié de la
 * France, sans aider à choisir.
 */
export interface CommuneIndexee {
  commune: CommuneFrance
  forme: string
  sansApostrophe: string
}

/**
 * Les formes comparables, calculées une fois au chargement : les refaire à
 * chaque frappe, pour 35 000 communes, coûterait sur un vieux téléphone.
 */
export function indexerCommunes(liste: readonly CommuneFrance[]): CommuneIndexee[] {
  return liste.map((commune) => {
    const sansApostrophe = normaliser(commune[0].replace(APOSTROPHES, ''))
    return { commune, forme: ` ${normaliser(commune[0])}`, sansApostrophe }
  })
}

/**
 * Avec `depuis`, chaque groupe se range du plus proche au plus loin : c'est
 * la recherche « près du départ », sur les communes à moins de 100 km.
 * Sans, l'ordre du fichier (la population) : la recherche dans toute la
 * France.
 */
export function chercherCommunes(
  index: readonly CommuneIndexee[],
  texte: string,
  max = 8,
  depuis?: Point,
): CommuneFrance[] {
  const { mots, dep } = lire(texte)
  const debut = mots.join(' ')
  if (debut.replace(/ /g, '').length < 2) return []
  const premiers: CommuneFrance[] = []
  const autres: CommuneFrance[] = []
  // Près du départ, il faut tout parcourir pour garder les plus proches ;
  // dans toute la France, les premiers trouvés sont les plus peuplés.
  const plafond = depuis === undefined ? max : Infinity
  for (const c of index) {
    if (dep !== undefined && c.commune[1] !== dep) continue
    // « labergement » trouve « L'Abergement » par la forme sans apostrophe ;
    // une forme où tous les mots étaient collés faisait trouver
    // « Saint-Étienne » par « sainte » (revue code S21).
    if (c.forme.startsWith(` ${debut}`) || c.sansApostrophe.startsWith(debut)) {
      premiers.push(c.commune)
      if (premiers.length >= plafond) break
    } else if (autres.length < plafond && mots.every((m) => c.forme.includes(` ${m}`))) {
      autres.push(c.commune)
    }
  }
  if (depuis !== undefined) {
    const loin = (c: CommuneFrance) => distanceKm(depuis, { lat: c[2], lon: c[3] })
    premiers.sort((a, b) => loin(a) - loin(b))
    autres.sort((a, b) => loin(a) - loin(b))
  }
  return [...premiers, ...autres].slice(0, max)
}

/** Sud, ouest, nord, est d'un département (`public/communes/departements.json`). */
export type Rectangle = readonly [number, number, number, number]

/** Les départements dont un point est à moins de `km` du départ. */
export function departementsProches(
  rectangles: Readonly<Record<string, Rectangle>>,
  depart: Point,
  km: number,
): string[] {
  return Object.entries(rectangles)
    .filter(([, [s, o, n, e]]) => {
      const plusPres = {
        lat: Math.min(Math.max(depart.lat, s), n),
        lon: Math.min(Math.max(depart.lon, o), e),
      }
      return distanceKm(depart, plusPres) <= km
    })
    .map(([dep]) => dep)
}

/**
 * La commune la plus proche d'une position, pour dire « près de … » après
 * « Autour de moi » : calculée dans le téléphone, rien n'est demandé à
 * personne (CLAUDE.md §0).
 */
export function communeLaPlusProche(
  liste: readonly CommuneFrance[],
  position: Point,
): CommuneFrance | undefined {
  let meilleure: CommuneFrance | undefined
  let mieux = Infinity
  for (const c of liste) {
    const d = distanceKm(position, { lat: c[2], lon: c[3] })
    if (d < mieux) {
      mieux = d
      meilleure = c
    }
  }
  return meilleure
}
