import { describe, expect, it } from 'vitest'
import { estUnMobile, etiquettesDeContact, masquerLesMobiles, rapprocherDuFichier } from '../../src/core/osm-etiquettes'
import type { Brasserie } from '../../src/core/schema'

describe('etiquettesDeContact (S60)', () => {
  it('lit le téléphone, le site et les horaires', () => {
    expect(
      etiquettesDeContact({ phone: '+33 4 78 00 00 00', website: 'https://exemple.fr/', opening_hours: 'Th-Fr 16:00-19:00' }),
    ).toEqual({ tel: '+33 4 78 00 00 00', site: 'https://exemple.fr/', horaires: 'Th-Fr 16:00-19:00' })
  })

  it('se replie sur contact:phone et contact:website', () => {
    expect(etiquettesDeContact({ 'contact:phone': '04 78 00 00 00', 'contact:website': 'http://exemple.fr' })).toEqual({
      tel: '04 78 00 00 00',
      site: 'http://exemple.fr',
    })
  })

  it('ne rend ni étiquette vide ni site hors http(s) (CLAUDE.md §6bis)', () => {
    expect(etiquettesDeContact({ phone: '  ', website: 'javascript:alert(1)#https://x', opening_hours: '' })).toEqual({})
    expect(etiquettesDeContact({})).toEqual({})
  })
})

const fiche = (n: string, lat: number, lon: number) => ({ n, lat, lon }) as unknown as Brasserie

describe('rapprocherDuFichier (S60)', () => {
  const fichier = [fiche('Brasserie du Mont Popey', 45.86, 4.29), fiche('La Soyeuse', 45.66, 4.62)]

  it('donne à chaque fiche les éléments OSM qui la désignent (même règle que dejaDansLeFichier)', () => {
    const r = rapprocherDuFichier(
      [
        { type: 'node', id: 1, lat: 45.87, lon: 4.3, tags: { name: 'Mont Popey', phone: '04 74 00 00 00' } },
        { type: 'node', id: 2, lat: 48.85, lon: 2.35, tags: { name: 'La Soyeuse' } },
      ],
      fichier,
    )
    expect(r.map((x) => [x.fiche, x.elements.map((e) => e.osm)])).toEqual([
      ['Brasserie du Mont Popey', ['node/1']],
      ['La Soyeuse', []],
    ])
    expect(r[0]?.elements[0]?.etiquettes).toEqual({ tel: '04 74 00 00 00' })
  })

  it('marque ambiguë une fiche que deux éléments désignent, sans choisir', () => {
    const r = rapprocherDuFichier(
      [
        { type: 'node', id: 1, lat: 45.66, lon: 4.62, tags: { name: 'La Soyeuse' } },
        { type: 'way', id: 9, center: { lat: 45.67, lon: 4.63 }, tags: { name: 'Brasserie La Soyeuse' } },
      ],
      fichier,
    )
    expect(r[1]).toMatchObject({ fiche: 'La Soyeuse', ambigue: true })
    expect(r[1]?.elements).toHaveLength(2)
    expect(r[0]).toMatchObject({ ambigue: false, elements: [] })
  })

  it('n’attribue pas un élément qui désigne deux fiches : les deux sont ambiguës (vu sur le fichier réel le 18/10)', () => {
    const deux = [fiche('La Fabrique du Faubourg', 45.7, 4.88), fiche('La Beer Fabrique', 45.77, 4.83)]
    const r = rapprocherDuFichier([{ type: 'node', id: 7, lat: 45.72, lon: 4.86, tags: { name: 'La Fabrique' } }], deux)
    expect(r.map((x) => x.ambigue)).toEqual([true, true])
    expect(r[0]?.raison).toBe('élément partagé avec « La Beer Fabrique »')
  })
})

describe('estUnMobile (S60)', () => {
  it('reconnaît un mobile français, écrit en national ou en +33', () => {
    expect(['06 79 58 66 85', '+33679586685', '+33 7 61 02 18 92', '0033 6 01 02 03 04'].map(estUnMobile)).toEqual([true, true, true, true])
  })

  it('ne prend pas un fixe pour un mobile', () => {
    expect(['04 72 56 54 54', '+33 4 72 56 54 54', '09 84 19 89 54'].map(estUnMobile)).toEqual([false, false, false])
  })
})

describe('masquerLesMobiles (S60)', () => {
  it('masque chaque mobile d’une valeur OSM à plusieurs numéros, garde les fixes (vu sur le fichier réel le 18/10)', () => {
    expect(masquerLesMobiles('+33 4 75 30 70 76; +33 6 75 54 33 75')).toBe('+33 4 75 30 70 76; mobile')
    expect(masquerLesMobiles('06 79 58 66 85')).toBe('mobile')
    expect(masquerLesMobiles('04 72 56 54 54')).toBe('04 72 56 54 54')
  })
})

describe('mobiles sous les formes saisies dans OSM (revue adverse S60)', () => {
  it('reconnaît (0), un 0 après +33, et (+33)', () => {
    expect(['+33 (0)6 12 34 56 78', '+33 (0) 6 12 34 56 78', '+33 06 12 34 56 78', '(+33)6 12 34 56 78'].map(estUnMobile)).toEqual([
      true,
      true,
      true,
      true,
    ])
  })

  it('masque un mobile quel que soit le séparateur, et garde le fixe', () => {
    expect(masquerLesMobiles('06 12 34 56 78 / 04 72 00 00 00')).toBe('mobile / 04 72 00 00 00')
    expect(masquerLesMobiles('04 72 00 00 00, 06 12 34 56 78')).toBe('04 72 00 00 00, mobile')
    expect(masquerLesMobiles('04 72 00 00 00 ou +33 (0)6 12 34 56 78')).toBe('04 72 00 00 00 ou mobile')
    expect(masquerLesMobiles('+33 6 12 34 56 78 poste 2')).toBe('mobile poste 2')
  })
})

describe('repli du site (revue adverse S60)', () => {
  it('se replie sur contact:website quand website est vide ou n’est pas un lien http(s)', () => {
    for (const website of ['', 'facebook', 'ftp://x']) {
      expect(etiquettesDeContact({ website, 'contact:website': 'https://a.fr' })).toEqual({ site: 'https://a.fr' })
    }
  })
})
