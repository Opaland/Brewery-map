import { describe, expect, it } from 'vitest'
import { empreinteDuPrecache } from '../../build/precache-sw'

/**
 * S333 (revue globale du 19/10, A18) : l'empreinte du précache suivait les
 * seuls noms hachés ; une nouvelle version de `communes-france.json` ou de
 * `theme-precoce.js` gardait l'ancienne copie en cache.
 */
describe('empreinteDuPrecache', () => {
  const assets = ['index-abc.js', 'index-def.css']
  it('change quand le contenu d’un fichier non haché change', () => {
    const avant = empreinteDuPrecache(assets, [{ nom: './communes-france.json', contenu: '[["Lyon"]]' }])
    const apres = empreinteDuPrecache(assets, [{ nom: './communes-france.json', contenu: '[["Lyon"],["Hure"]]' }])
    expect(apres).not.toBe(avant)
  })
  it('ne change pas pour un build identique', () => {
    const f = [{ nom: './theme-precoce.js', contenu: 'x' }]
    expect(empreinteDuPrecache(assets, f)).toBe(empreinteDuPrecache([...assets], [...f]))
  })
  it('change quand un nom haché change', () => {
    expect(empreinteDuPrecache(['index-abc.js'], [])).not.toBe(empreinteDuPrecache(['index-xyz.js'], []))
  })
})
