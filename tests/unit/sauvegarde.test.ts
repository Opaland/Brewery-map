import { describe, expect, it } from 'vitest'
import { PREFERENCES_DEFAUT, type Preferences } from '../../src/core/preferences'
import { lireSauvegarde, reunir, TAILLE_MAX, versSauvegarde } from '../../src/core/sauvegarde'

/** S37 — sauvegarder et transférer son carnet, sans serveur. */
const present: Preferences = {
  ...PREFERENCES_DEFAUT,
  depart: { type: 'autour' },
  favoris: ['A', 'B'],
  visites: [{ nom: 'A', date: '2026-10-01' }],
  notes: [{ nom: 'A', texte: 'ici' }],
}

describe('sauvegarde (S37)', () => {
  it('le fichier porte favoris, carnet, notes et réglages ; jamais de position', () => {
    const f = versSauvegarde(present, '2026-10-17')
    expect(f.application).toBe('mousse-de-poche')
    expect(f.version).toBe(1)
    expect(f.enregistreeLe).toBe('2026-10-17')
    expect(f.preferences.favoris).toEqual(['A', 'B'])
    expect(JSON.stringify(f)).not.toMatch(/"lat"|"lon"|latitude|position/)
  })

  it('une commune de départ ne voyage pas dans le fichier (revue adverse S37)', () => {
    const f = versSauvegarde(
      { ...present, depart: { type: 'commune', cle: 'Oullins|69', nom: 'Oullins', lat: 45.71, lon: 4.8 } },
      '2026-10-17',
    )
    expect(JSON.stringify(f)).not.toMatch(/Oullins|"lat"|"lon"|depart/)
  })

  it('la taille se compte en octets, pas en caractères (revue adverse S37)', () => {
    const texte = 'é'.repeat(600_000)
    expect(texte.length).toBeLessThan(TAILLE_MAX)
    expect(lireSauvegarde(texte)).toEqual({
      ok: false,
      raison: 'Ce fichier est trop gros pour une sauvegarde (plus de 1 Mo).',
    })
  })

  it('un fichier qui annonce plus de brasseries qu’il n’en existe est refusé (revue adverse S37)', () => {
    const favoris = Array.from({ length: 6000 }, (_, i) => `F${String(i)}`)
    const r = lireSauvegarde(JSON.stringify({ application: 'mousse-de-poche', version: 1, preferences: { favoris } }))
    expect(r.ok).toBe(false)
  })

  it('relit un fichier enregistré', () => {
    const r = lireSauvegarde(JSON.stringify(versSauvegarde(present, '2026-10-17')))
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.preferences.notes).toEqual([{ nom: 'A', texte: 'ici' }])
  })

  it('refuse ce qui n’est pas une sauvegarde, avec la raison', () => {
    expect(lireSauvegarde('pas du json')).toEqual({ ok: false, raison: 'Ce fichier n’est pas une sauvegarde lisible (JSON).' })
    expect(lireSauvegarde('{"application":"autre"}')).toEqual({
      ok: false,
      raison: 'Ce fichier ne vient pas de Mousse de Poche.',
    })
    expect(lireSauvegarde('x'.repeat(TAILLE_MAX + 1))).toEqual({
      ok: false,
      raison: 'Ce fichier est trop gros pour une sauvegarde (plus de 1 Mo).',
    })
  })

  it('un champ abîmé tombe seul, comme au stockage', () => {
    const r = lireSauvegarde(
      JSON.stringify({ application: 'mousse-de-poche', version: 1, preferences: { favoris: ['C'], visites: 'abîmé' } }),
    )
    expect(r.ok && r.preferences.favoris).toEqual(['C'])
    expect(r.ok && r.preferences.visites).toEqual([])
  })

  it('une position glissée dans le fichier n’est jamais reprise', () => {
    const r = lireSauvegarde(
      JSON.stringify({
        application: 'mousse-de-poche',
        version: 1,
        preferences: { depart: { type: 'position', point: { lat: 45, lon: 4 } } },
      }),
    )
    expect(r.ok && r.preferences.depart).toEqual({ type: 'brignais' })
  })

  it('réunir ajoute sans rien effacer ; la note de l’appareil reste', () => {
    const lue: Preferences = {
      ...PREFERENCES_DEFAUT,
      rayonKm: 80,
      favoris: ['B', 'C'],
      visites: [
        { nom: 'A', date: '2025-01-01' },
        { nom: 'C', date: '2026-09-01' },
      ],
      notes: [
        { nom: 'A', texte: 'ailleurs' },
        { nom: 'C', texte: 'nouvelle' },
      ],
    }
    const { preferences, ajouts } = reunir(present, lue)
    expect(preferences.favoris).toEqual(['A', 'B', 'C'])
    expect(preferences.visites).toEqual([
      { nom: 'A', date: '2026-10-01' },
      { nom: 'C', date: '2026-09-01' },
    ])
    expect(preferences.notes).toEqual([
      { nom: 'A', texte: 'ici' },
      { nom: 'C', texte: 'nouvelle' },
    ])
    // Les réglages de l'appareil restent : la sauvegarde ne les impose pas.
    expect(preferences.rayonKm).toBe(present.rayonKm)
    expect(ajouts).toEqual({ favoris: 1, visites: 1, notes: 1 })
  })
})
