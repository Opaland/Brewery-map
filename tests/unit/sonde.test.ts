import { describe, expect, it } from 'vitest'
import { hotesTiers, POLITIQUE } from '../../build/csp'
import { SERVICES } from '../../outils/services-sondes'
import { bilanDesSondes, jugerReponse } from '../../src/core/sonde'

/** S277 : la sonde de nuit contre les vrais services. */
const TUILES = { nom: 'Tuiles de la carte', url: 'https://tile.openstreetmap.org/0/0/0.png', attendu: 'PNG' }

describe('jugerReponse', () => {
  it('une réponse 200 qui contient l’attendu est bonne', () => {
    expect(jugerReponse(TUILES, { statut: 200, debut: '\u0089PNG\r\n' })).toEqual({ ok: true })
  })
  it('un statut d’erreur dit son code', () => {
    expect(jugerReponse(TUILES, { statut: 503, debut: '' })).toEqual({ ok: false, raison: 'HTTP 503' })
  })
  it('un 200 sans l’attendu est un contenu inattendu', () => {
    expect(jugerReponse(TUILES, { statut: 200, debut: '<html>maintenance' })).toEqual({ ok: false, raison: 'contenu inattendu' })
  })
  it('une erreur de réseau ou un délai se disent tels quels', () => {
    expect(jugerReponse(TUILES, { erreur: 'délai dépassé' })).toEqual({ ok: false, raison: 'délai dépassé' })
    expect(jugerReponse(TUILES, { erreur: 'ECONNRESET' })).toEqual({ ok: false, raison: 'réseau : ECONNRESET' })
  })
})

describe('bilanDesSondes', () => {
  it('tout répond : code 0', () => {
    const b = bilanDesSondes([{ service: TUILES, verdict: { ok: true } }])
    expect(b.code).toBe(0)
    expect(b.texte).toContain('tout répond')
  })
  it('une panne nomme le service, son hôte et sa raison : code 1', () => {
    const b = bilanDesSondes([
      { service: TUILES, verdict: { ok: false, raison: 'HTTP 503' } },
      { service: { nom: 'Page publiée', url: 'https://opaland.github.io/Brewery-map/', attendu: 'Mousse' }, verdict: { ok: true } },
    ])
    expect(b.code).toBe(1)
    expect(b.texte).toContain('Tuiles de la carte (tile.openstreetmap.org) : HTTP 503')
    expect(b.texte).not.toContain('tout répond')
    expect(b.texte).toContain('Page publiée')
  })
})

describe('SERVICES', () => {
  it('chaque hôte de la politique de sécurité de la page est sondé', () => {
    const sondes = new Set(SERVICES.map((s) => new URL(s.url).hostname))
    // Non vide, sinon la garde passerait à vide (revue adverse S277).
    expect(hotesTiers(POLITIQUE).length).toBeGreaterThan(0)
    expect(hotesTiers(POLITIQUE).filter((h) => !sondes.has(h))).toEqual([])
  })

  // Réponses vides réelles, relevées le 18/10 (revue adverse S277) : un
  // service qui ne trouve plus rien répond 200 et recopie la requête ; il
  // doit être jugé en panne, pas bon.
  it.each([
    ['data.geopf.fr', '{"type":"FeatureCollection","features":[],"query":"Brignais"}'],
    ['recherche-entreprises.api.gouv.fr', '{"results":[],"total_results":0,"page":1,"per_page":1,"total_pages":0}'],
    ['overpass.openstreetmap.fr', '{ "version": 0.6, "generator": "Overpass API", "elements": [ ] }'],
  ])('%s : une réponse vide est une panne', (hote, vide) => {
    const service = SERVICES.find((s) => new URL(s.url).hostname === hote)
    expect(service).toBeDefined()
    if (service) expect(jugerReponse(service, { statut: 200, debut: vide }).ok).toBe(false)
  })
  it('chaque URL est en https et sans coordonnées de personne (§0)', () => {
    for (const s of SERVICES) {
      expect(new URL(s.url).protocol, s.nom).toBe('https:')
      // Une position se lirait comme deux décimales à 3 chiffres ou plus.
      expect(s.url, s.nom).not.toMatch(/\d+\.\d{3,}/)
    }
  })
})
