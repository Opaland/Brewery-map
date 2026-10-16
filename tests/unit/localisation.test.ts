import { describe, expect, it } from 'vitest'
import { localiser, MESSAGES_LOCALISATION } from '../../src/localisation'

type Rappel = (succes: PositionCallback, echec: PositionErrorCallback, options?: PositionOptions) => void

/** Une géolocalisation qui répond, essai après essai, ce qu'on lui dit. */
function fausse(reponses: ('ok' | 1 | 2 | 3)[], precision = 25) {
  const options: PositionOptions[] = []
  const getCurrentPosition: Rappel = (succes, echec, o) => {
    options.push(o ?? {})
    const r = reponses.shift()
    if (r === 'ok') {
      succes({ coords: { latitude: 45.76, longitude: 4.78, accuracy: precision } } as GeolocationPosition)
    } else {
      echec({ code: r ?? 2, message: '' } as GeolocationPositionError)
    }
  }
  return { geo: { getCurrentPosition } as unknown as Geolocation, options }
}

describe('localiser (S21 : « rien ne se passe », « la carte ne suit pas »)', () => {
  it('demande d’abord une position précise et récente', async () => {
    const { geo, options } = fausse(['ok'])
    await expect(localiser(geo)).resolves.toEqual({ point: { lat: 45.76, lon: 4.78 }, precisionM: 25 })
    expect(options[0]).toMatchObject({ enableHighAccuracy: true, maximumAge: 60_000 })
  })

  it('si le téléphone ne trouve pas ou tarde, réessaie sans exiger la précision', async () => {
    for (const code of [2, 3] as const) {
      const { geo, options } = fausse([code, 'ok'], 1800)
      await expect(localiser(geo)).resolves.toEqual({ point: { lat: 45.76, lon: 4.78 }, precisionM: 1800 })
      expect(options).toHaveLength(2)
      expect(options[1]).toMatchObject({ enableHighAccuracy: false })
    }
  })

  it('un refus ne se réessaie pas : il se dit, avec la façon de réautoriser', async () => {
    const { geo, options } = fausse([1, 'ok'])
    await expect(localiser(geo)).rejects.toThrow(MESSAGES_LOCALISATION.refus)
    expect(options).toHaveLength(1)
    expect(MESSAGES_LOCALISATION.refus).toContain('réglages du navigateur')
  })

  it('deux échecs : le message le dit', async () => {
    const { geo } = fausse([3, 3])
    await expect(localiser(geo)).rejects.toThrow(MESSAGES_LOCALISATION.tropLong)
  })
})
