import { describe, expect, it } from 'vitest'
import {
  adresseDeRue,
  avertissementHoraires,
  citeUnNumero,
  hoteDeSource,
  libelleConfiance,
  libellePrecision,
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

describe('libellePrecision', () => {
  it('un point OpenStreetMap n’est pas une adresse vérifiée (revue code S14)', () => {
    expect(libellePrecision('osm')).toBe('point placé sur OpenStreetMap, non vérifié sur place')
  })

  it('au centre IGN de la commune : le dit, et dit que ce n’est pas l’adresse (S268)', () => {
    expect(libellePrecision('centre')).toBe('au centre de la commune selon l’IGN : ce n’est pas l’adresse de la brasserie')
  })

  it('le point d’origine (« commune ») ne se dit pas centre : il ne l’est pas (S59, S268)', () => {
    expect(libellePrecision('commune')).not.toMatch(/centre/i)
  })

  it('avoue l’approximation sans promettre un centre ni un écart chiffré (S59)', () => {
    // Mesuré le 18/10 : 75 fiches sur 151 à plus de 2 km du centre de leur
    // commune, jusqu'à 14,4 km (docs/PRECISION.md).
    const libelle = libellePrecision('commune')
    expect(libelle).toBe(
      'approximative : ce point n’est pas l’adresse de la brasserie, et peut en être à plusieurs kilomètres',
    )
    expect(libelle).not.toMatch(/centre|\d/)
    expect(libellePrecision('address')).toBe('à l’adresse vérifiée')
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

describe('adresseDeRue (S295 : 125 fiches n’ont que la commune pour adresse)', () => {
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
