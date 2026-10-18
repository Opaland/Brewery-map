import { describe, expect, it } from 'vitest'
import { lireOpeningHours } from '../../src/core/opening-hours'

describe('lireOpeningHours (S63)', () => {
  it('lit jours, plages, listes et plusieurs créneaux', () => {
    expect(lireOpeningHours('We-Fr 09:00-12:30, 15:00-19:30; Sa 09:00-19:30; Tu 15:00-19:30')).toEqual({
      jours: {
        mar: [['15:00', '19:30']],
        mer: [['09:00', '12:30'], ['15:00', '19:30']],
        jeu: [['09:00', '12:30'], ['15:00', '19:30']],
        ven: [['09:00', '12:30'], ['15:00', '19:30']],
        sam: [['09:00', '19:30']],
      },
    })
    expect(lireOpeningHours('Fr,Sa 11:30-00:15')).toEqual({ jours: { ven: [['11:30', '00:15']], sam: [['11:30', '00:15']] } })
  })

  it('lit 24:00 comme minuit, et une plage qui passe dimanche', () => {
    expect(lireOpeningHours('Th-Fr 17:30-24:00')).toEqual({ jours: { jeu: [['17:30', '00:00']], ven: [['17:30', '00:00']] } })
    expect(lireOpeningHours('Sa-Mo 10:00-12:00')).toEqual({
      jours: { sam: [['10:00', '12:00']], dim: [['10:00', '12:00']], lun: [['10:00', '12:00']] },
    })
  })

  it('refuse ce qu’il faudrait deviner, avec la raison', () => {
    expect(lireOpeningHours('We 15:00-21:00 "Bar"')).toEqual({ raison: 'commentaire ou mot non lu : « We 15:00-21:00 "Bar" »' })
    expect(lireOpeningHours('Mo-Fr 08:00-12:30; 14:00 - 17:00')).toEqual({ raison: 'règle sans jours : « 14:00 - 17:00 »' })
    expect(lireOpeningHours('We 09:00-12:00; We 15:00-21:00')).toEqual({ raison: 'jour défini deux fois : mer' })
    expect(lireOpeningHours('Mo-Fr 10:00-18:00; PH off')).toEqual({ raison: 'commentaire ou mot non lu : « PH off »' })
    expect(lireOpeningHours('Jan-Mar Sa 10:00-12:00')).toEqual({ raison: 'commentaire ou mot non lu : « Jan-Mar Sa 10:00-12:00 »' })
    expect(lireOpeningHours('Sa 10:00-10:00')).toEqual({ raison: 'créneau nul : 10:00-10:00' })
  })
})
