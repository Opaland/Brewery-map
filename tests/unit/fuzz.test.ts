import { describe, expect, it } from 'vitest'
import { ORDRE_CATEGORIES } from '../../src/core/categories'
import { ficheDuLien, lienDeFiche } from '../../src/core/partage'
import { lirePreferences, NOTE_MAX, PREFERENCES_DEFAUT, RAYON, type Preferences } from '../../src/core/preferences'
import { ELEMENTS_MAX, lireSauvegarde } from '../../src/core/sauvegarde'
import type { Brasserie } from '../../src/core/schema'
import { lienSignalement } from '../../src/core/signalement'

/**
 * S282 (repris d'ÉtapeForge, `serverFuzz.test.js`) : les portes d'entrée
 * venues de l'extérieur, essayées sur des milliers d'entrées qu'on n'a pas
 * imaginées. Graine fixe : un échec se rejoue à l'identique ; le message
 * donne la graine et le numéro du cas.
 */
const GRAINE = 20261018
const CAS = 2000

/** mulberry32 : un générateur pseudo-aléatoire de quelques lignes, rejouable. */
function hasard(graine: number) {
  let a = graine >>> 0
  const suivant = () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const entier = (n: number) => Math.floor(suivant() * n)
  const choisir = <T,>(xs: readonly T[]): T => xs[entier(xs.length)]
  return { suivant, entier, choisir }
}
type Hasard = ReturnType<typeof hasard>

const CHAINES = ['', ' ', 'a', 'Brasserie du Mont', '__proto__', 'constructor', 'toString', '🍺', '\ud83d', 'é'.repeat(600), 'x'.repeat(5000), '2026-10-18', '2026-02-30', 'auto', 'sombre', 'blonde', '<script>', '%', '%E0%A4%A']
function chaine(h: Hasard): string {
  if (h.suivant() < 0.6) return h.choisir(CHAINES)
  const n = h.entier(12)
  let s = ''
  for (let i = 0; i < n; i++) s += String.fromCharCode(h.entier(0x10000))
  return s
}
const NOMBRES = [0, -0, 1, 5, 30, 35, 100, 105, -5, 2.5, 1e308, -1e308, Number.MAX_SAFE_INTEGER, 7]
const CLES = ['version', 'rayonKm', 'categories', 'type', 'depart', 'favoris', 'favorisSeulement', 'avecOsm', 'visites', 'pasVisitees', 'notes', 'theme', 'nom', 'date', 'texte', 'application', 'preferences', '__proto__', 'constructor', 'autre']

/** Une valeur JSON quelconque, biaisée vers les formes des préférences. */
function valeur(h: Hasard, profondeur = 0): unknown {
  const r = h.entier(profondeur > 3 ? 4 : 7)
  if (r === 0) return null
  if (r === 1) return h.suivant() < 0.5
  if (r === 2) return h.choisir(NOMBRES)
  if (r === 3) return chaine(h)
  if (r === 4) return Array.from({ length: h.entier(6) }, () => valeur(h, profondeur + 1))
  const o: Record<string, unknown> = {}
  for (let i = h.entier(6); i > 0; i--) Object.defineProperty(o, h.choisir(CLES), { value: valeur(h, profondeur + 1), enumerable: true, configurable: true, writable: true })
  return o
}

/** Des préférences presque valides : chaque champ, juste ou faux au hasard. */
function presqueValides(h: Hasard): Record<string, unknown> {
  const juste = () => h.suivant() < 0.6
  return {
    version: juste() ? 1 : valeur(h),
    rayonKm: juste() ? 5 * (1 + h.entier(20)) : valeur(h),
    categories: juste() ? ORDRE_CATEGORIES.filter(() => h.suivant() < 0.7) : valeur(h),
    favoris: Array.from({ length: h.entier(5) }, () => (juste() ? h.choisir(['A', 'B', 'C']) : valeur(h))),
    visites: Array.from({ length: h.entier(5) }, () => (juste() ? { nom: h.choisir(['A', 'B']), date: h.choisir(['2026-10-18', '2026-13-01']) } : valeur(h))),
    notes: Array.from({ length: h.entier(5) }, () => (juste() ? { nom: h.choisir(['A', 'B']), texte: chaine(h) } : valeur(h))),
    theme: juste() ? h.choisir(['auto', 'clair', 'sombre']) : valeur(h),
    depart: juste() ? { type: 'brignais' } : valeur(h),
    [h.choisir(CLES)]: valeur(h),
  }
}

/** Les demi-paires UTF-16 isolées (une paire complète, un emoji, n'en est pas). */
const DEMI_PAIRE = /[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/g
const bienForme = (s: string) => !new RegExp(DEMI_PAIRE.source).test(s)

const CLES_PERMISES = new Set(Object.keys(PREFERENCES_DEFAUT).concat('type'))
const DATE = /^\d{4}-\d{2}-\d{2}$/

/** Ce que des préférences relues doivent tenir, quoi qu'on leur ait donné. */
function enDefaut(p: Preferences): string[] {
  const d: string[] = []
  if (Object.keys(p).some((k) => !CLES_PERMISES.has(k))) d.push(`clé en trop : ${Object.keys(p).join(',')}`)
  if (!Number.isInteger(p.rayonKm) || p.rayonKm < RAYON.min || p.rayonKm > RAYON.max || p.rayonKm % RAYON.pas !== 0) d.push(`rayon ${String(p.rayonKm)}`)
  if (p.categories.some((c) => !(ORDRE_CATEGORIES as readonly number[]).includes(c)) || new Set(p.categories).size !== p.categories.length) d.push('catégories')
  if (p.favoris.some((f) => typeof f !== 'string' || f === '') || new Set(p.favoris).size !== p.favoris.length) d.push('favoris')
  if (p.visites.some((v) => typeof v.nom !== 'string' || v.nom === '' || !DATE.test(v.date))) d.push('visites')
  if (new Set(p.visites.map((v) => v.nom)).size !== p.visites.length) d.push('visites en double')
  if (p.notes.some((n) => n.texte === '' || n.texte.length > NOTE_MAX)) d.push('notes')
  if (!['auto', 'clair', 'sombre'].includes(p.theme)) d.push('thème')
  return d
}

describe('le fuzz des entrées non sûres (graine ' + String(GRAINE) + ')', () => {
  it(`lirePreferences : ${String(CAS)} valeurs quelconques et presque valides`, () => {
    const h = hasard(GRAINE)
    for (let i = 0; i < CAS; i++) {
      const brut = i % 2 === 0 ? valeur(h) : presqueValides(h)
      const p = lirePreferences(brut)
      expect(enDefaut(p), `cas ${String(i)} : ${(JSON.stringify(brut) as string | undefined ?? 'undefined').slice(0, 300)}`).toEqual([])
      // Relu après un passage par JSON (le stockage, la sauvegarde) : le même.
      expect(lirePreferences(JSON.parse(JSON.stringify(p))), `cas ${String(i)}`).toEqual(p)
    }
  })

  // Une note reçue mal formée (demi-paire isolée, fichier forgé) est gardée
  // telle quelle et s'affiche « � » ; ce que le code promet, c'est de ne pas
  // en créer en coupant une note bien formée (revue adverse S36).
  it(`lirePreferences : couper ${String(CAS)} notes bien formées n'en abîme aucune`, () => {
    const h = hasard(GRAINE + 4)
    for (let i = 0; i < CAS; i++) {
      const texte = 'a'.repeat(NOTE_MAX - 3 + h.entier(6)) + h.choisir(['🍺', 'é', '🍺🍺', 'x']) + chaine(h).replace(DEMI_PAIRE, '')
      const note = lirePreferences({ notes: [{ nom: 'A', texte }] }).notes.at(0)
      expect(note !== undefined && bienForme(note.texte) && note.texte.length <= NOTE_MAX, `cas ${String(i)}`).toBe(true)
    }
  })

  it(`lireSauvegarde : ${String(CAS)} textes et fichiers presque valides`, () => {
    const h = hasard(GRAINE + 1)
    for (let i = 0; i < CAS; i++) {
      const texte =
        i % 3 === 0 ? chaine(h) : JSON.stringify(i % 3 === 1 ? valeur(h) : { application: 'mousse-de-poche', version: 1, preferences: presqueValides(h) })
      const l = lireSauvegarde(texte)
      if (l.ok) {
        expect(enDefaut(l.preferences), `cas ${String(i)}`).toEqual([])
        expect(Math.max(l.preferences.favoris.length, l.preferences.visites.length, l.preferences.notes.length)).toBeLessThanOrEqual(ELEMENTS_MAX)
      } else {
        expect(l.raison, `cas ${String(i)}`).not.toBe('')
      }
    }
  })

  // Le générateur ne fait pas de listes de 5 000 : la borne a son cas à elle.
  it('lireSauvegarde : au-delà de 5 000 favoris, visites ou notes, le fichier n’est pas repris', () => {
    for (const champ of ['favoris', 'visites', 'notes'] as const) {
      const liste = Array.from({ length: ELEMENTS_MAX + 1 }, (_, i) =>
        champ === 'favoris' ? `B${String(i)}` : champ === 'visites' ? { nom: `B${String(i)}`, date: '2026-10-18' } : { nom: `B${String(i)}`, texte: 'n' },
      )
      const l = lireSauvegarde(JSON.stringify({ application: 'mousse-de-poche', version: 1, preferences: { [champ]: liste } }))
      expect(l.ok, champ).toBe(false)
    }
  })

  it(`ficheDuLien : ${String(CAS)} fragments quelconques, et l'aller-retour d'un nom bien formé`, () => {
    const h = hasard(GRAINE + 2)
    for (let i = 0; i < CAS; i++) {
      const fragment = h.choisir(['', '#', '#fiche=', '#fiche=%', '#autre=x']) + chaine(h)
      const nom = ficheDuLien(fragment)
      expect(nom === undefined || (typeof nom === 'string' && nom !== ''), `cas ${String(i)}`).toBe(true)
      const nomBienForme = chaine(h).replace(DEMI_PAIRE, '') || 'Brasserie'
      const lien = new URL(lienDeFiche('https://opaland.github.io/Brewery-map/?x=1#y', nomBienForme))
      expect(ficheDuLien(lien.hash), `cas ${String(i)} : ${nomBienForme}`).toBe(nomBienForme)
    }
  })

  it(`lienSignalement : ${String(CAS)} fiches aux champs quelconques`, () => {
    const h = hasard(GRAINE + 3)
    for (let i = 0; i < CAS; i++) {
      const b = { n: chaine(h) || 'X', c: chaine(h), d: chaine(h), addr: chaine(h), cat: h.choisir([0, 1, 2, 3]), src: chaine(h), verifieLe: h.suivant() < 0.5 ? undefined : chaine(h) } as unknown as Brasserie
      const u = new URL(lienSignalement(b))
      expect(`${u.origin}${u.pathname}`, `cas ${String(i)}`).toBe('https://github.com/Opaland/Brewery-map/issues/new')
      // Une demi-paire isolée part en « \ufffd » dans l'URL (encodage UTF-8).
      expect(u.searchParams.get('body')?.includes(b.n.replace(DEMI_PAIRE, '\ufffd')), `cas ${String(i)}`).toBe(true)
    }
  })
})
