import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { lirePointsWikidata } from '../../src/core/wikidata'

/**
 * S325 : les points des communes, lus dans la réponse CSV de Wikidata. Les
 * lignes sont celles que Wikidata a rendues le 21/10 ; près du méridien de
 * Greenwich, la longitude s'écrit en notation scientifique, et 8 communes
 * restaient sans point (S21 : « 9 communes sans point dans Wikidata »).
 */
describe('lirePointsWikidata', () => {
  it('lit une longitude écrite en notation scientifique', () => {
    const csv = 'insee,coord\n16077,Point(-2.77777E-4 45.639166666)\n33204,Point(5.55555E-4 44.544722222)\n'
    expect([...lirePointsWikidata(csv)]).toEqual([
      ['16077', [45.639166666, -2.77777e-4]],
      ['33204', [44.544722222, 5.55555e-4]],
    ])
  })

  it('lit un point ordinaire, en latitude puis longitude', () => {
    expect(lirePointsWikidata('insee,coord\n69027,Point(4.6629 45.6739)\n').get('69027')).toEqual([45.6739, 4.6629])
  })

  it('une commune à deux points garde le premier rendu', () => {
    const csv = 'insee,coord\n69027,Point(4.6 45.6)\n69027,Point(4.7 45.7)\n'
    expect(lirePointsWikidata(csv).get('69027')).toEqual([45.6, 4.6])
  })

  it('une ligne illisible est ignorée, pas lue comme un point faux', () => {
    const csv = 'insee,coord\n69027,Point(abc 45.6)\n2A004,Point(8.7 41.9)\n'
    expect([...lirePointsWikidata(csv).keys()]).toEqual(['2A004'])
  })
})

/** S325, CA2 : les huit communes près du méridien sont dans les fichiers publiés. */
describe('public/communes', () => {
  const huit: [string, string][] = [
    ['Champmillon', '16'], ['Bourdelles', '33'], ['Hure', '33'], ['Montagoudin', '33'],
    ['Puynormand', '33'], ['Juncalas', '65'], ['Neuvillalais', '72'], ['Saix', '86'],
  ]
  const france = JSON.parse(readFileSync('public/communes-france.json', 'utf8')) as [string, string, number, number][]
  it.each(huit)('%s (%s) a un point, dans le fichier national et dans celui de son département', (nom, dep) => {
    const n = france.find((c) => c[0] === nom && c[1] === dep)
    expect(n?.[3]).toBeCloseTo(0, 0)
    const parDep = JSON.parse(readFileSync(`public/communes/${dep}.json`, 'utf8')) as [string, number, number][]
    expect(parDep.some((c) => c[0] === nom)).toBe(true)
  })
})
