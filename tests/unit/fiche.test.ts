import { describe, expect, it } from 'vitest'
import {
  adresseDeRue,
  avertissementHoraires,
  ceQuiManque,
  deLaCommune,
  phraseConfiance,
  phraseDuManque,
  phrasePosition,
  citeUnNumero,
  hoteDeSource,
  libelleConfiance,
  libelleVerification,
} from '../../src/core/fiche'

describe('libelleConfiance', () => {
  it('dit « élevée » pour « solide » (décision de Cédric, 15/10)', () => {
    expect(libelleConfiance('solide')).toBe('élevée')
    expect(libelleConfiance('moyenne')).toBe('moyenne')
    expect(libelleConfiance('faible')).toBe('faible')
  })

  it('ne dit rien de faux quand rien n’est évalué', () => {
    expect(libelleConfiance('')).toBe('non évaluée (aucune preuve retenue)')
  })
})

describe('hoteDeSource', () => {
  it('rend le site, sans « www. »', () => {
    expect(hoteDeSource('https://www.nomadebiere.fr/la-taproom/')).toBe('nomadebiere.fr')
    expect(hoteDeSource('https://brasseriedulion.com/pages/le-bar-dulion')).toBe(
      'brasseriedulion.com',
    )
  })

  it('rend null sans source', () => {
    expect(hoteDeSource('')).toBeNull()
  })
})

describe('libelleVerification', () => {
  it('écrit une date ISO en français', () => {
    expect(libelleVerification('2026-10-15')).toBe('15 octobre 2026')
  })

  it('ne la remplace jamais par une date inventée', () => {
    expect(libelleVerification(undefined)).toBe('non renseignée')
  })
})

describe('citeUnNumero', () => {
  it('reconnaît les deux numéros cités dans le fichier, et rien d’autre', () => {
    expect(citeUnNumero('Horaires non publiés (tél. 04 75 85 47 19).')).toBe(true)
    expect(citeUnNumero('Contact : 06 95 10 82 98.')).toBe(true)
    expect(citeUnNumero('Ouvert depuis 2022, sam 15h-22h.')).toBe(false)
    expect(citeUnNumero('1932 route de Villefranche, 69480 Anse')).toBe(false)
  })
})

describe('avertissementHoraires', () => {
  const sans = { note: 'Aucune source fiable lue pour cette brasserie.' }
  it('ne dit « appelez » que si un numéro est connu (revue métier S17, Bernard)', () => {
    expect(avertissementHoraires(sans)).toBe(
      'La confiance ne garantit pas les horaires : lisez ce que dit la source. Aucun téléphone n’est encore connu pour les vérifier.',
    )
    const contact = { tel: '04 78 33 84 95', source: 'https://x.fr', verifieLe: '2026-10-16' }
    expect(avertissementHoraires({ ...sans, contact })).toContain('et appelez en cas de doute.')
    expect(avertissementHoraires({ note: 'Contact : 06 95 10 82 98.' })).toContain('et appelez en cas de doute.')
  })
})

describe('adresseDeRue (S295 : 113 fiches sur 348 n’ont que la commune pour adresse, le 20/10)', () => {
  const b = (addr: string, c = 'Oullins') => ({ addr, c })
  it('la commune seule, ou son code postal et elle, n’est pas une adresse', () => {
    expect(adresseDeRue(b('Oullins'))).toBe(false)
    expect(adresseDeRue(b(' oullins '))).toBe(false)
    expect(adresseDeRue(b('01110 Hauteville-Lompnes', 'Hauteville-Lompnes'))).toBe(false)
    expect(adresseDeRue(b('Saint-Étienne', 'Saint-Etienne'))).toBe(false)
  })
  it('une rue, un lieu-dit ou une zone d’activités en est une', () => {
    expect(adresseDeRue(b('12 rue de la Bière, 69600 Oullins'))).toBe(true)
    expect(adresseDeRue(b('Kermenguy, 29100 Le Juch', 'Le Juch'))).toBe(true)
  })
})

// S308 : ce qui manque se dit une fois, en langue courante.
describe('ceQuiManque et phraseDuManque', () => {
  const vide = { addr: 'Brignais', c: 'Brignais', note: '', beers: [] }
  it('liste ce qui manque, dans l’ordre de la fiche', () => {
    expect(ceQuiManque(vide)).toEqual(['adresse', 'telephone', 'horaires', 'bieres'])
    expect(phraseDuManque(ceQuiManque(vide))).toBe('Pas encore dans la fiche : son adresse, son téléphone, ses horaires et ses bières.')
  })
  it('un seul manque : sans « et »', () => {
    expect(phraseDuManque(['bieres'])).toBe('Pas encore dans la fiche : ses bières.')
    expect(phraseDuManque(['adresse', 'bieres'])).toBe('Pas encore dans la fiche : son adresse et ses bières.')
    expect(phraseDuManque([])).toBe('')
  })
  it('un numéro cité par la source n’est pas dit inconnu (revue métier S4)', () => {
    expect(ceQuiManque({ ...vide, note: 'Appeler au 04 72 00 00 00.' })).not.toContain('telephone')
  })
  it('une adresse de rue n’est plus un manque', () => {
    expect(ceQuiManque({ ...vide, addr: '2A route de Lyon, 69530 Brignais' })).not.toContain('adresse')
  })
})

describe('phrasePosition et phraseConfiance', () => {
  it('dit où mène l’itinéraire sans adresse, et le point avec ; rien à l’adresse vérifiée', () => {
    expect(phrasePosition({ coordPrecision: 'centre', c: 'Brignais', addr: 'Brignais' })).toBe('L’itinéraire mène au centre de Brignais, pas à la brasserie.')
    expect(phrasePosition({ coordPrecision: 'centre', c: 'Brignais', addr: '2A route de Lyon, 69530 Brignais' })).toBe('Sur la carte, le point est le centre de Brignais, pas la brasserie.')
    expect(phrasePosition({ coordPrecision: 'address', c: 'Brignais', addr: '2A route de Lyon' })).toBe('')
  })
  it('« appelez » seulement si un numéro est connu (revue métier S17)', () => {
    expect(phraseConfiance({ conf: 'faible', note: '' })).toBe('Confiance faible : lisez la source avant d’y aller.')
    expect(phraseConfiance({ conf: 'faible', note: '', contact: { tel: '04 00 00 00 00', source: 'https://x.test/', verifieLe: '2026-10-20' } })).toBe(
      'Confiance faible : appelez ou lisez la source avant d’y aller.',
    )
  })
})
describe('deLaCommune', () => {
  it('élide, contracte, ou laisse « de »', () => {
    expect(deLaCommune('Brignais')).toBe('de Brignais')
    expect(deLaCommune('Oullins')).toBe('d’Oullins')
    expect(deLaCommune('Écully')).toBe('d’Écully')
    expect(deLaCommune('Le Puy-en-Velay')).toBe('du Puy-en-Velay')
    expect(deLaCommune('Les Ollières')).toBe('des Ollières')
    expect(deLaCommune('La Mulatière')).toBe('de La Mulatière')
    expect(deLaCommune('Hauteville-Lompnes')).toBe('de Hauteville-Lompnes')
  })
})
