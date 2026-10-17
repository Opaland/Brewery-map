import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { verifierDonnees } from '../../src/core/garde-donnees'
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
