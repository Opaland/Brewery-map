import qrcode from 'qrcode-generator'

/**
 * Le QR code d'une fiche (S38), fabriqué dans le navigateur par
 * `qrcode-generator` (MIT, sans dépendance) : aucune requête. Il encode le
 * lien de la fiche, rien d'autre (`core/partage.ts`).
 *
 * Correction « M » (environ 15 % de l'image peut manquer) : une affichette
 * de comptoir se tache et se plie. Seuil de la norme ISO/IEC 18004, choisi
 * au jugé entre L (7 %) et Q (25 %, plus dense) — présentation seulement.
 */

/** La marge blanche (« quiet zone ») exigée par la norme : 4 modules. */
export const MARGE_QR = 4

export function matriceQr(texte: string): boolean[][] {
  const qr = qrcode(0, 'M')
  qr.addData(texte, 'Byte')
  qr.make()
  const n = qr.getModuleCount()
  const taille = n + 2 * MARGE_QR
  return Array.from({ length: taille }, (_, y) =>
    Array.from({ length: taille }, (_, x) => {
      const r = y - MARGE_QR
      const c = x - MARGE_QR
      return r >= 0 && c >= 0 && r < n && c < n && qr.isDark(r, c)
    }),
  )
}

/** Un carré d'une unité par module noir, pour un SVG de `viewBox="0 0 n n"`. */
export function cheminSvgQr(m: boolean[][]): string {
  const parts: string[] = []
  m.forEach((ligne, y) => {
    ligne.forEach((noir, x) => {
      if (noir) parts.push(`M${String(x)} ${String(y)}h1v1h-1z`)
    })
  })
  return parts.join('')
}
