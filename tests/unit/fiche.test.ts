import { describe, expect, it } from 'vitest'
import {
  adresseDeRue,
  avertissementHoraires,
  ceQuiManque,
  deLaCommune,
  phraseConfiance,
  phraseDuManque,
  phrasePosition,
  citeDesHoraires,
  citeUnNumero,
  hoteDeSource,
  libelleVerification,
} from '../../src/core/fiche'

describe('phraseConfiance (S320, Cédric le 20/10 : des phrases)', () => {
  it('dit chaque niveau en une phrase, sans le mot « confiance »', () => {
    const phrases = (['solide', 'moyenne', 'faible', ''] as const).map((conf) => phraseConfiance({ conf, note: '' }))
    expect(phrases).toEqual([
      'La source décrit précisément ce qu’on peut faire sur place.',
      'La source cite la vente ou l’accueil, avec des réserves ou des manques.',
      'Ce qu’on peut y faire est probable, pas établi par la source : lisez-la avant d’y aller.',
      'Rien n’établit encore ce qu’on peut y faire.',
    ])
    for (const p of phrases) expect(p.toLowerCase()).not.toContain('confiance')
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

describe('citeDesHoraires', () => {
  it('un jour et une heure : vrai', () => {
    expect(citeDesHoraires('mercredi 16 h – 19 h, jeudi et vendredi 16 h – 21 h 30')).toBe(true)
    expect(citeDesHoraires('Chaque vendredi 16h-21h toute l’année')).toBe(true)
    expect(citeDesHoraires('Ouvert tous les jours de 10h à 18h')).toBe(true)
    expect(citeDesHoraires('Ouvert 7/7 en continu de 10h à 19h')).toBe(true)
  })
  it('un jour abrégé suivi d’un jour ou d’une heure : vrai (revue S383)', () => {
    expect(citeDesHoraires('Lun-mer 17h-0h, jeu-sam 17h-1h')).toBe(true)
    expect(citeDesHoraires('Retrait sur place possible (lun-ven 9h-17h)')).toBe(true)
    expect(citeDesHoraires('Mer 9h-18h, ven 17h-21h')).toBe(true)
    expect(citeDesHoraires('Ven. au dim. de 15 h à 22 h')).toBe(true)
  })
  it('« mer » ou « mar » seuls ne sont pas des jours', () => {
    expect(citeDesHoraires('Vue sur la mer, ouvert depuis 10 h de route')).toBe(false)
    expect(citeDesHoraires('Une mar- brune, 12 h de brassage')).toBe(false)
  })
  it('sans jour ou sans heure : faux', () => {
    expect(citeDesHoraires('Ouvert depuis 2022, brassée sur place.')).toBe(false)
    expect(citeDesHoraires('Ouvert le samedi matin.')).toBe(false)
    expect(citeDesHoraires('1932 route de Villefranche, 69480 Anse')).toBe(false)
    expect(citeDesHoraires('Bière à 5 % vol., de 10 à 12 hectolitres par an')).toBe(false)
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
      'Les horaires ne sont pas garantis : lisez ce que dit la source. Aucun téléphone n’est encore connu pour les vérifier.',
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
  // S383 (#281) : des horaires cités par la note ne sont pas « absents ».
  it('une note qui cite des horaires : « ses horaires en tableau (la note en cite) »', () => {
    const b = { ...vide, note: 'Horaires d’hiver : mercredi 16 h – 19 h, samedi 15 h – 19 h.' }
    expect(ceQuiManque(b)).toContain('horairesEnNote')
    expect(ceQuiManque(b)).not.toContain('horaires')
    expect(phraseDuManque(['horairesEnNote'])).toBe('Pas encore dans la fiche : ses horaires en tableau (la note en cite).')
  })
  it('avec une grille, aucun manque d’horaires ; sans heure dans la note, « ses horaires » comme avant', () => {
    const grille = [{ nature: 'vente', source: 'https://exemple.fr/', verifieLe: '2026-11-27' }] as unknown as NonNullable<Parameters<typeof ceQuiManque>[0]['horaires']>
    const avec = ceQuiManque({ ...vide, note: 'mercredi 16 h – 19 h', horaires: grille })
    expect(avec).not.toContain('horaires')
    expect(avec).not.toContain('horairesEnNote')
    expect(ceQuiManque({ ...vide, note: 'Ouvert depuis 2022, le samedi matin.' })).toContain('horaires')
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
    expect(phraseConfiance({ conf: 'faible', note: '' })).toBe('Ce qu’on peut y faire est probable, pas établi par la source : lisez-la avant d’y aller.')
    expect(phraseConfiance({ conf: 'faible', note: '', contact: { tel: '04 00 00 00 00', source: 'https://x.test/', verifieLe: '2026-10-20' } })).toBe(
      'Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.',
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
