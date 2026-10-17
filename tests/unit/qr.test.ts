import jsQR from 'jsqr'
import { describe, expect, it } from 'vitest'
import { cheminSvgQr, MARGE_QR, matriceQr } from '../../src/core/qr'

/** S38 — le QR code d'une fiche : il dit exactement le lien, et se lit. */
const rasteriser = (m: boolean[][], px = 4) => {
  const n = m.length * px
  const data = new Uint8ClampedArray(n * n * 4)
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const noir = m[Math.floor(y / px)][Math.floor(x / px)]
      const i = (y * n + x) * 4
      data[i] = data[i + 1] = data[i + 2] = noir ? 0 : 255
      data[i + 3] = 255
    }
  return { data, n }
}

describe('QR code (S38)', () => {
  const lien = 'https://opaland.github.io/Brewery-map/#fiche=Tom%20%26%20Co'

  it('encode exactement le lien, relu par un décodeur indépendant', () => {
    const { data, n } = rasteriser(matriceQr(lien))
    expect(jsQR(data, n, n)?.data).toBe(lien)
  })

  it('garde une marge blanche de quatre modules tout autour', () => {
    const m = matriceQr(lien)
    expect(MARGE_QR).toBe(4)
    for (let i = 0; i < MARGE_QR; i++) {
      expect(m[i].every((c) => !c)).toBe(true)
      expect(m[m.length - 1 - i].every((c) => !c)).toBe(true)
      expect(m.every((ligne) => !ligne[i] && !ligne[ligne.length - 1 - i])).toBe(true)
    }
  })

  it('le dessin SVG a un carré par module noir', () => {
    const m = matriceQr(lien)
    const noirs = m.flat().filter(Boolean).length
    expect(cheminSvgQr(m).match(/M/g)?.length).toBe(noirs)
  })
})
