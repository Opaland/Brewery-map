import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { candidatsARelancer, compteRenduDuLot, estFichierDeLotDepartemental, lotDepartemental, paquetsDeCandidats, PAROLE_REGLE_21_10 } from '../../src/core/campagne'
import type { CandidatEnCause } from '../../src/core/candidats'

/** S340 — l'outil de campagne départementale (E36). */
const candidat = (cle: string, autre: Partial<CandidatEnCause> = {}): CandidatEnCause =>
  ({
    cle,
    nom: `BRASSERIE ${cle}`,
    communes: ['ORLEANS'],
    departement: '45',
    adresses: ['1 RUE X 45000 ORLEANS'],
    sources: ['sirene'],
    personne: false,
    sirets: [],
    osm: [],
    statut: 'nouveau',
    ...autre,
  })

describe('paquetsDeCandidats', () => {
  it('découpe par cinq au plus', () => {
    const c = Array.from({ length: 12 }, (_, i) => candidat(`sirene:${String(i)}`))
    const { paquets } = paquetsDeCandidats(c)
    expect(paquets.map((p) => p.length)).toEqual([5, 5, 2])
  })

  it('une entreprise individuelle sans enseigne, adresse, point ni site : à part, avec sa raison', () => {
    const rien = candidat('personne:1', { nom: null, personne: true, adresses: [], statut: 'nom-a-etablir' })
    const avecPoint = candidat('personne:2', { nom: null, personne: true, adresses: [], osm: ['node/1'] })
    const { paquets, sansRecherche } = paquetsDeCandidats([rien, avecPoint, candidat('sirene:9')])
    expect(sansRecherche).toEqual([{ cle: 'personne:1', raison: 'entreprise sans nom ni adresse : rien à chercher' }])
    expect(paquets.flat().map((p) => p.cle)).toEqual(['personne:2', 'sirene:9'])
  })

  it('aucun nom de personne ne part vers un agent : une entreprise individuelle n’a que son enseigne', () => {
    const ei = candidat('personne:3', { nom: 'THELEMITE', personne: true })
    const { paquets } = paquetsDeCandidats([ei])
    expect(paquets[0]?.[0]?.enseigne).toBe('THELEMITE (entrepreneur individuel : ne recopie jamais le nom de la personne ni son SIREN)')
    expect(JSON.stringify(paquets)).not.toMatch(/siren|sirets/)
  })
})

describe('compteRenduDuLot', () => {
  const candidats = [candidat('sirene:1'), candidat('sirene:2'), candidat('personne:1', { nom: null, personne: true, adresses: [] })]
  const base = {
    dep: '45',
    nomDuDepartement: 'le Loiret',
    sprint: 'S341',
    candidats,
    lus: ['sirene:1'],
    categories: [2],
    diff: '## Lot dep-45\n\nEmpreinte du lot : abc\n',
  }

  it('un candidat ni lu ni expliqué est refusé, avec sa clé', () => {
    expect(() => compteRenduDuLot({ ...base, raisons: { 'personne:1': 'rien à chercher' } })).toThrow(/sirene:2/)
  })

  it('le décompte est juste, et chaque non-proposé a sa ligne', () => {
    const md = compteRenduDuLot({ ...base, raisons: { 'sirene:2': 'registre seul', 'personne:1': 'rien à chercher' } })
    expect(md).toContain('**Décompte** : 3 candidats = 1 proposés + 2 non proposés')
    expect(md).toContain('| BRASSERIE sirene:2 (`sirene:2`) | registre seul |')
    expect(md).toContain('| Entreprise individuelle (`personne:1`) | rien à chercher |')
    expect(md).toContain('Catégories proposées : 0 « acheter et consommer », 1 « acheter seulement »')
    expect(md.endsWith('Empreinte du lot : abc\n')).toBe(true)
  })
})

describe('les garde-fous (revue adverse S340)', () => {
  const candidats = [candidat('sirene:1'), candidat('sirene:2')]
  const e = { dep: '45', nomDuDepartement: 'le Loiret', sprint: 'S341', candidats, raisons: { 'sirene:2': 'registre seul' }, diff: '' }
  it('une lecture en double, une clé hors des candidats ou une catégorie de trop sont refusées', () => {
    expect(() => compteRenduDuLot({ ...e, lus: ['sirene:1', 'sirene:1'], categories: [1, 1] })).toThrow(/double/)
    expect(() => compteRenduDuLot({ ...e, lus: ['sirene:1', 'zzz'], categories: [1, 1] })).toThrow(/zzz/)
    expect(() => compteRenduDuLot({ ...e, lus: ['sirene:1'], categories: [9] })).toThrow(/catégorie/)
    expect(() => compteRenduDuLot({ ...e, lus: ['sirene:1'], categories: [] })).toThrow(/catégorie/)
  })
  it('une taille de paquet nulle est refusée, au lieu de boucler', () => {
    expect(() => paquetsDeCandidats(candidats, 0)).toThrow()
  })
})

/** S356 — la relance d'une campagne, sous un lot à part (#217). */
describe('candidatsARelancer', () => {
  const candidats = [candidat('sirene:1'), candidat('sirene:2'), candidat('sirene:3'), candidat('node/4')]
  it('garde les seuls candidats dont la raison dit « relancer », jamais un candidat lu', () => {
    const raisons = {
      'sirene:2': 'registre seul ; quota épuisé : à relancer',
      'sirene:3': 'Relancer avec le point OSM',
      'node/4': 'fermée en 2024',
      'sirene:1': 'à relancer',
    }
    expect(candidatsARelancer(candidats, raisons, ['sirene:1']).map((c) => c.cle)).toEqual(['sirene:2', 'sirene:3'])
  })
  it('rien à relancer : une liste vide', () => {
    expect(candidatsARelancer(candidats, { 'sirene:2': 'annuaire seul' }, [])).toEqual([])
  })
})

describe('lotDepartemental', () => {
  it('un département seul, ou suivi d’un passage -r2 à -r9', () => {
    expect(lotDepartemental('21')).toEqual({ dep: '21', id: '21', lot: 'dep-21' })
    expect(lotDepartemental('2A-r2')).toEqual({ dep: '2A', id: '2A-r2', lot: 'dep-2A-r2' })
  })
  it('le fichier d’un lot départemental, relance comprise, se reconnaît (revue adverse S356 : osm-retirer l’ignorait)', () => {
    expect(['dep-21.json', 'dep-2B.json', 'dep-21-r2.json'].every(estFichierDeLotDepartemental)).toBe(true)
    expect(['dep-21-candidats.json', 'dep-21.md', 'dep-21-x.json', 'dep-21-r2-candidats.json'].some(estFichierDeLotDepartemental)).toBe(false)
  })
  it('un identifiant mal formé est refusé', () => {
    for (const x of ['21-x', '2A-r1', '21-r10', '1', '21r2', '../21', '21-r2/']) expect(lotDepartemental(x)).toBeNull()
  })
})

describe('la règle de Cédric du 21/10, citée telle qu’elle est écrite (S362, #215)', () => {
  const decisions = readFileSync('docs/DECISIONS.md', 'utf8')
  const debut = decisions.indexOf('## Règle de Cédric du 21/10')
  const section = decisions.slice(debut, decisions.indexOf('\n## ', debut + 1))
  // Les citations de DECISIONS.md se coupent aux fins de ligne : on compare espaces réduits.
  const aplatir = (t: string) => t.replace(/\s+/g, ' ')

  it('chaque citation de PAROLE_REGLE_21_10 se lit telle quelle dans docs/DECISIONS.md', () => {
    expect(debut).toBeGreaterThan(-1)
    const citations = [...PAROLE_REGLE_21_10.matchAll(/« ([^»]+) »/g)].map((m) => m[1])
    expect(citations.length).toBeGreaterThan(3)
    expect(
      citations.filter((c) => !aplatir(section).includes(`« ${c} »`)),
      'src/core/campagne.ts : PAROLE_REGLE_21_10 doit citer docs/DECISIONS.md caractère pour caractère (apostrophes comprises)',
    ).toEqual([])
  })

  it('le tableau ne laisse à Cédric que le retrait et la brasserie d’un annuaire seul', () => {
    const resteACedric = section
      .split('\n')
      .filter((l) => l.startsWith('| ') && !l.startsWith('| Ce qui') && !l.startsWith('|---'))
      .map((l) => l.split('|')[2]?.trim() ?? '')
      .filter((c) => c !== '')
    expect(resteACedric.join(' '), 'DECISIONS.md : le retrait d’une fiche reste à Cédric').toMatch(/Retirer une fiche/)
    expect(resteACedric.join(' '), 'DECISIONS.md : la brasserie d’un annuaire seul reste à Cédric').toMatch(/annuaire seul/)
    for (const cellule of resteACedric) {
      expect(cellule, 'DECISIONS.md : l’extension du 21/10 a fait entrer déménagements, fermetures et portables dans la règle').not.toMatch(/portable|fermée|déménag/i)
    }
  })
})
