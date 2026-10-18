import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { BASE_DE_DONNEES, indexerLots, nomDAccord, verifierDonnees } from '../../src/core/garde-donnees'
import { formaterDonnees, type Lot } from '../../src/core/curation'
import type { Brasserie } from '../../src/core/schema'

/** S230 : aucune ligne de data/ sans accord de Cédric, vérifié par la CI. */
const BASE = readFileSync('data/breweries.json', 'utf8')
const FICHES = JSON.parse(BASE) as Brasserie[]
const NOM = FICHES[0]?.n ?? ''

const lot: Lot = {
  lot: 'essai',
  propositions: [
    {
      n: NOM,
      changements: { contact: { tel: '04 72 50 88 53', source: 'https://exemple.fr/c', verifieLe: '2026-10-16' } },
      verifieLe: '2026-10-16',
      sources: ['https://exemple.fr/c'],
      extrait: 'Tél. 04 72 50 88 53',
    },
    {
      n: FICHES[1]?.n ?? '',
      changements: { note: 'Une autre note, lue.' },
      verifieLe: '2026-10-16',
      sources: ['https://exemple.fr/n'],
      extrait: 'Une autre note, lue.',
    },
  ],
}
const accord = { lot: 'essai', empreinte: 'abcdef012345', acceptees: [1], date: '2026-10-17', parole: 'j’accepte 1' }
const avecAccord = (texte: string) =>
  verifierDonnees(BASE, [{ nom: '2026-10-17-essai.json', accord, lot: { lot, empreinte: 'abcdef012345' } }], texte)

/** Le fichier qu'écrit l'accord : la proposition 1 seule. */
function attendu(numeros: number[]): string {
  const r = FICHES.map((b) => {
    if (numeros.includes(1) && b.n === NOM) return { ...b, contact: lot.propositions[0]?.changements.contact }
    if (numeros.includes(2) && b.n === FICHES[1]?.n) return { ...b, note: 'Une autre note, lue.', verifieLe: '2026-10-16' }
    return b
  })
  return formaterDonnees(r)
}

describe('la garde de data/ (S230)', () => {
  it('sans accord, le fichier du 15/10 passe tel quel', () => {
    expect(verifierDonnees(BASE, [], BASE).ok).toBe(true)
  })

  it('un fichier de base qui ne passe pas le schéma est refusé (mutation S239)', () => {
    const r = verifierDonnees('[{"n":""}]', [], '[]')
    expect(r).toEqual({ ok: false, erreurs: ['le fichier de base ne passe pas le schéma'] })
  })

  it('sans accord, une ligne changée est refusée', () => {
    const change = BASE.replace(NOM, `${NOM} bis`)
    expect(verifierDonnees(BASE, [], change).ok).toBe(false)
  })

  it('un accord rejoué donne exactement le fichier : accepté', () => {
    expect(avecAccord(attendu([1])).ok).toBe(true)
  })

  it('une proposition non acceptée dans le fichier : refusé', () => {
    expect(avecAccord(attendu([1, 2])).ok).toBe(false)
  })

  it('un accord sans le changement qu’il accepte : refusé', () => {
    expect(avecAccord(BASE).ok).toBe(false)
  })

  it('un lot changé depuis l’accord (empreinte différente) : refusé', () => {
    const r = verifierDonnees(
      BASE,
      [{ nom: '2026-10-17-essai.json', accord, lot: { lot, empreinte: '999999999999' } }],
      attendu([1]),
    )
    expect(r.ok).toBe(false)
  })

  it('un accord sans la parole de Cédric, ou sans son lot : refusé', () => {
    const sansParole = { ...accord, parole: '' }
    expect(verifierDonnees(BASE, [{ nom: 'a.json', accord: sansParole, lot: { lot, empreinte: 'abcdef012345' } }], attendu([1])).ok).toBe(false)
    expect(verifierDonnees(BASE, [{ nom: 'a.json', accord, lot: undefined }], attendu([1])).ok).toBe(false)
  })
})

describe('l’ordre des accords (revue adverse S230)', () => {
  // Deux lots changent la même note : l'ordre d'acceptation décide.
  const lotA: Lot = { lot: 'a', propositions: [{ n: NOM, changements: { note: 'Note A.' }, verifieLe: '2026-10-16', sources: ['https://exemple.fr/a'], extrait: 'Note A.' }] }
  const lotB: Lot = { lot: 'b', propositions: [{ n: NOM, changements: { note: 'Note B.' }, verifieLe: '2026-10-16', sources: ['https://exemple.fr/b'], extrait: 'Note B.' }] }
  const accordDe = (lot: string) => ({ lot, empreinte: 'abcdef012345', acceptees: [1], date: '2026-10-17', parole: 'oui' })
  const apresB = formaterDonnees(FICHES.map((b) => (b.n === NOM ? { ...b, note: 'Note B.', verifieLe: '2026-10-16' } : b)))

  it('les accords se rejouent dans l’ordre où ils ont été écrits, même le même jour', () => {
    const premier = nomDAccord(new Date('2026-10-17T08:00:00Z'), 'b')
    const second = nomDAccord(new Date('2026-10-17T09:30:00Z'), 'a')
    const r = verifierDonnees(
      BASE,
      [
        { nom: second, accord: accordDe('a'), lot: { lot: lotA, empreinte: 'abcdef012345' } },
        { nom: premier, accord: accordDe('b'), lot: { lot: lotB, empreinte: 'abcdef012345' } },
      ],
      formaterDonnees(FICHES.map((b) => (b.n === NOM ? { ...b, note: 'Note A.', verifieLe: '2026-10-16' } : b))),
    )
    expect(r).toEqual({ ok: true })
    expect(apresB).not.toBe(BASE)
  })

  it('deux accords du même lot le même jour ont des noms différents', () => {
    expect(nomDAccord(new Date('2026-10-17T08:00:00Z'), 'x')).not.toBe(nomDAccord(new Date('2026-10-17T08:00:01Z'), 'x'))
  })
})

describe('la base de la garde ne se déplace pas seule (revue adverse S230)', () => {
  // Jusqu'au 18/10, « Quoi de neuf ? » fixait la même empreinte. Depuis les
  // premiers accords (S266), data/ a avancé et la base reste : elle est
  // fixée ici en dur, à part, pour qu'un seul changement ne la déplace pas.
  it('son empreinte est celle du fichier du 15/10', () => {
    expect(BASE_DE_DONNEES.sha256.startsWith('f683cca8c5f69ef3')).toBe(true)
  })
})

describe('les lots relus par la garde (revue d’architecture S295)', () => {
  const texte = (l: unknown) => JSON.stringify(l)

  it('un lot que le schéma d’aujourd’hui ne lit plus est dit illisible, pas introuvable', () => {
    const casse = { ...lot, propositions: [{ ...lot.propositions[0], verifieLe: 'hier' }] }
    const index = indexerLots([{ chemin: 'curation/essai.json', texte: texte(casse) }], () => 'abcdef012345')
    expect(index.lots.size).toBe(0)
    expect(index.illisibles.get('essai')).toMatch(/verifieLe/)
    const r = verifierDonnees(BASE, [{ nom: 'a.json', accord, lot: undefined, illisible: index.illisibles.get('essai') }], attendu([1]))
    expect(r.ok).toBe(false)
    expect(!r.ok && r.erreurs.join()).toMatch(/lot « essai » illisible avec le schéma d’aujourd’hui/)
    expect(!r.ok && r.erreurs.join()).not.toMatch(/introuvable/)
  })

  it('deux fichiers d’un même nom de lot sont refusés : le dernier lu gagnait sans bruit', () => {
    const index = indexerLots([
      { chemin: 'curation/a.json', texte: texte(lot) },
      { chemin: 'curation/b.json', texte: texte(lot) },
    ], () => 'abcdef012345')
    expect(index.doublons).toEqual(['lot « essai » : curation/a.json et curation/b.json'])
    // Même quand l'un des deux ne se lit plus.
    const casse = { ...lot, propositions: [{ ...lot.propositions[0], verifieLe: 'hier' }] }
    const mixte = indexerLots([
      { chemin: 'curation/a.json', texte: texte(lot) },
      { chemin: 'curation/c.json', texte: texte(casse) },
    ], () => 'abcdef012345')
    expect(mixte.doublons).toEqual(['lot « essai » : curation/a.json et curation/c.json'])
  })

  it('un JSON qui n’est pas un lot (candidats OSM bruts) n’est ni lot, ni illisible', () => {
    const index = indexerLots([
      { chemin: 'curation/osm.json', texte: '{"elements":[]}' },
      { chemin: 'curation/rompu.json', texte: '{' },
    ], () => 'abcdef012345')
    expect(index.lots.size).toBe(0)
    expect(index.illisibles.size).toBe(0)
  })
})
