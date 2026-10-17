import { t } from './i18n'
import type { Point } from './core/distance'

/**
 * Demander la position (S21, retours de Cédric du 16/10 : « rien ne se
 * passe », « la carte ne suit pas »). Avant, un seul essai, peu précis, qui
 * acceptait une position vieille de 10 minutes : à vélo, elle était déjà
 * fausse. Désormais :
 *
 * 1. une position précise et d'au plus une minute ;
 * 2. si le téléphone ne trouve pas ou tarde, un second essai sans exiger la
 *    précision (réseau, Wi-Fi), plus patient ;
 * 3. un refus ne se réessaie pas : il se dit, avec la façon de réautoriser.
 *
 * Délais : 10 s puis 20 s, tranchés au jugé (CLAUDE.md §2, présentation) :
 * moins, le GPS d'un vieux téléphone n'a pas le temps ; plus, l'écran semble
 * figé. La position ne quitte pas le téléphone (CLAUDE.md §0).
 */
export const MESSAGES_LOCALISATION = {
  refus:
    'Vous avez refusé la localisation. Rien n’a changé. Pour la réautoriser : dans les réglages du navigateur, autorisations du site, « Position » ; puis touchez de nouveau « Autour de moi ». Ou choisissez une commune.',
  introuvable:
    'Votre position est introuvable pour l’instant. Rien n’a changé : réessayez dehors ou près d’une fenêtre, ou choisissez une commune.',
  tropLong:
    'La localisation a pris trop de temps. Rien n’a changé : réessayez, ou choisissez une commune.',
  absent: 'Ce navigateur ne sait pas donner votre position. Choisissez une commune.',
} as const

export interface Localisation {
  point: Point
  /** Rayon d'incertitude donné par le téléphone, en mètres. */
  precisionM: number
}

/** L'échec du navigateur, avec son code (1 refus, 2 introuvable, 3 délai). */
class EchecPosition extends Error {
  constructor(readonly code: number) {
    super(`position : code ${String(code)}`)
  }
}

function essai(geo: Geolocation, options: PositionOptions): Promise<Localisation> {
  return new Promise((resolve, reject) => {
    geo.getCurrentPosition(
      (pos) => {
        resolve({
          point: { lat: pos.coords.latitude, lon: pos.coords.longitude },
          precisionM: pos.coords.accuracy,
        })
      },
      (err) => {
        reject(new EchecPosition(err.code))
      },
      options,
    )
  })
}

export async function localiser(geo: Geolocation | undefined): Promise<Localisation> {
  if (geo === undefined) throw new Error(MESSAGES_LOCALISATION.absent)
  try {
    return await essai(geo, { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 })
  } catch (e) {
    if (e instanceof EchecPosition && e.code === 1) {
      throw new Error(MESSAGES_LOCALISATION.refus, { cause: e })
    }
  }
  try {
    return await essai(geo, { enableHighAccuracy: false, timeout: 20_000, maximumAge: 300_000 })
  } catch (e) {
    const code = e instanceof EchecPosition ? e.code : 2
    if (code === 1) throw new Error(MESSAGES_LOCALISATION.refus, { cause: e })
    throw new Error(code === 3 ? MESSAGES_LOCALISATION.tropLong : MESSAGES_LOCALISATION.introuvable, {
      cause: e,
    })
  }
}

/**
 * Au-delà d'un kilomètre d'incertitude, l'écran le dit : la carte et les
 * distances peuvent être décalées d'autant. Seuil de présentation, au jugé
 * (§2) : en deçà, l'écart ne change pas l'ordre des brasseries d'une liste
 * graduée de 5 km en 5 km.
 */
export function avertissementPrecision(precisionM: number): string | null {
  if (precisionM <= 1000) return null
  const km = Math.round(precisionM / 1000)
    return t(
    'Position approximative : le téléphone la donne à environ {km} km près. Les distances et la carte peuvent être décalées d’autant.',
    { km },
  )
}
