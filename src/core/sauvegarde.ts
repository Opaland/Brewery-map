import { lirePreferences, type Preferences } from './preferences'

/**
 * Sauvegarder et transférer son carnet (S37) : un fichier que la personne
 * garde ou envoie elle-même à son autre appareil. Aucun serveur.
 *
 * Le fichier porte ce que le stockage porte déjà, et rien de plus : jamais
 * la position (le départ « autour de moi » n'est qu'un choix, S21). Il est
 * relu par les mêmes règles que le stockage (`lirePreferences`), champ par
 * champ : un fichier abîmé ou modifié à la main ne fait tomber que ce qui
 * est illisible.
 */
export interface FichierSauvegarde {
  application: 'mousse-de-poche'
  version: 1
  /** AAAA-MM-JJ : le jour de l'enregistrement, pour s'y retrouver. */
  enregistreeLe: string
  /**
   * Sans le départ : une commune choisie y aurait son nom et son point, et
   * un fichier envoyé par courriel dirait où l'on habite (revue adverse
   * S37). La relecture ne reprend pas les réglages de toute façon.
   */
  preferences: Omit<Preferences, 'depart'>
}

/** 1 Mo, en octets : un carnet de mille brasseries tient en moins de 200 ko. */
export const TAILLE_MAX = 1_000_000

/**
 * Au plus 5 000 favoris, visites ou notes par fichier : il y a moins de
 * 1 200 brasseries dans l'application. Seuil de garde, au jugé (§2) : au
 * delà, c'est un fichier fabriqué, qui gonflerait le stockage (revue
 * adverse S37 : 60 000 favoris acceptés).
 */
export const ELEMENTS_MAX = 5_000

export function versSauvegarde(p: Preferences, aujourdhui: string): FichierSauvegarde {
  const sansDepart = Object.fromEntries(Object.entries(p).filter(([cle]) => cle !== 'depart')) as Omit<
    Preferences,
    'depart'
  >
  return { application: 'mousse-de-poche', version: 1, enregistreeLe: aujourdhui, preferences: sansDepart }
}

/** La taille en octets (UTF-8), pas en unités de texte (revue adverse S37). */
export const octets = (texte: string) => new TextEncoder().encode(texte).length

export type Lecture = { ok: true; preferences: Preferences } | { ok: false; raison: string }

export function lireSauvegarde(texte: string): Lecture {
  if (octets(texte) > TAILLE_MAX) {
    return { ok: false, raison: 'Ce fichier est trop gros pour une sauvegarde (plus de 1 Mo).' }
  }
  let brut: unknown
  try {
    brut = JSON.parse(texte)
  } catch {
    return { ok: false, raison: 'Ce fichier n’est pas une sauvegarde lisible (JSON).' }
  }
  const f = brut as Partial<FichierSauvegarde> | null
  if (typeof f !== 'object' || f === null || f.application !== 'mousse-de-poche') {
    return { ok: false, raison: 'Ce fichier ne vient pas de Mousse de Poche.' }
  }
  const preferences = lirePreferences(f.preferences)
  if (
    preferences.favoris.length > ELEMENTS_MAX ||
    preferences.visites.length > ELEMENTS_MAX ||
    preferences.notes.length > ELEMENTS_MAX
  ) {
    return { ok: false, raison: 'Ce fichier contient bien plus de brasseries que l’application n’en connaît : il n’est pas repris.' }
  }
  return { ok: true, preferences }
}

/**
 * Ajouter une sauvegarde à ce qui est sur l'appareil, sans rien effacer en
 * silence : favoris et visites réunis ; pour une visite ou une note
 * présente des deux côtés, celle de l'appareil reste. Les réglages de
 * l'appareil restent aussi. Rend ce qui a été ajouté, pour le dire.
 */
export function reunir(
  present: Preferences,
  lue: Preferences,
): { preferences: Preferences; ajouts: { favoris: number; visites: number; notes: number } } {
  const favoris = [...present.favoris, ...lue.favoris.filter((f) => !present.favoris.includes(f))]
  const visitesPresentes = new Set(present.visites.map((v) => v.nom))
  const visites = [...present.visites, ...lue.visites.filter((v) => !visitesPresentes.has(v.nom))]
  const notesPresentes = new Set(present.notes.map((n) => n.nom))
  const notes = [...present.notes, ...lue.notes.filter((n) => !notesPresentes.has(n.nom))]
  return {
    preferences: { ...present, favoris, visites, notes },
    ajouts: {
      favoris: favoris.length - present.favoris.length,
      visites: visites.length - present.visites.length,
      notes: notes.length - present.notes.length,
    },
  }
}
