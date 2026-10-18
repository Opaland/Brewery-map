/**
 * Le cache où le service worker garde le fond de carte déjà vu (S7). Le
 * même nom dans `public/sw.js` : `tests/unit/jumeaux.test.ts` les tient
 * d'accord (§4ter).
 */
export const CACHE_TUILES = 'mousse-tuiles-v1'

/**
 * « Tout effacer » retire aussi le fond de carte gardé : sur un appareil
 * partagé, il montrait la zone où l'on s'était trouvé (S295, Léa). Sans
 * l'interface `caches` (navigateur sans service worker), rien n'a été gardé.
 */
export async function oublierLesTuiles(): Promise<void> {
  if (typeof caches === 'undefined') return
  await caches.delete(CACHE_TUILES)
}
