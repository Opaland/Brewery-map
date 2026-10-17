import { useState } from 'react'
import { planTournee, type EtapeImage } from './core/image-tournee'

/**
 * « Partager en image » (S34) : l'image de la tournée, dessinée dans le
 * téléphone (canvas) puis remise au menu de partage, ou téléchargée. Rien ne
 * part sur le réseau ; ce qu'elle dit est fixé par `core/image-tournee.ts`.
 */
async function dessiner(etapes: readonly EtapeImage[]): Promise<Blob> {
  const plan = planTournee(etapes)
  const canvas = document.createElement('canvas')
  canvas.width = plan.largeur
  canvas.height = plan.hauteur
  const ctx = canvas.getContext('2d')
  if (ctx === null) throw new Error('canvas')
  // Les couleurs de l'en-tête (design system v2, `docs/DESIGN.md`).
  const fond = ctx.createLinearGradient(0, 0, plan.largeur, plan.hauteur)
  fond.addColorStop(0, '#7a3410')
  fond.addColorStop(1, '#9c4a17')
  ctx.fillStyle = fond
  ctx.fillRect(0, 0, plan.largeur, plan.hauteur)
  // Les polices hébergées sont peut-être encore en chargement.
  await document.fonts.ready
  for (const t of plan.textes) {
    const famille = t.role === 'lieu' || t.role === 'adresse' ? "'Inter Variable', sans-serif" : "'Fraunces Variable', Georgia, serif"
    ctx.font = `${t.gras ? '700' : '400'} ${String(t.taille)}px ${famille}`
    ctx.fillStyle = t.role === 'lieu' || t.role === 'adresse' ? '#f6e6d6' : '#ffffff'
    ctx.fillText(t.texte, t.x, t.y)
  }
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b === null) reject(new Error('toBlob'))
      else resolve(b)
    }, 'image/png')
  })
}

export function ImageTournee({ etapes }: { etapes: readonly EtapeImage[] }) {
  const [etat, setEtat] = useState<'' | 'telecharge' | 'echec'>('')
  const partager = async () => {
    try {
      const fichier = new File([await dessiner(etapes)], 'tournee.png', { type: 'image/png' })
      if (typeof navigator.canShare === 'function' && navigator.canShare({ files: [fichier] })) {
        // Refermer le menu de partage rejette la promesse : rien à dire.
        await navigator.share({ files: [fichier], title: 'Ma tournée — Mousse de Poche' }).catch(() => undefined)
        return
      }
      const url = URL.createObjectURL(fichier)
      const a = document.createElement('a')
      a.href = url
      a.download = 'tournee.png'
      a.click()
      URL.revokeObjectURL(url)
      setEtat('telecharge')
    } catch {
      setEtat('echec')
    }
  }
  return (
    <>
      <button
        type="button"
        onClick={() => {
          void partager()
        }}
        data-testid="tournee-image"
      >
        Partager en image
      </button>
      <span className="champ-aide" role="status" data-testid="tournee-image-etat">
        {etat === 'telecharge'
          ? 'Image enregistrée dans vos téléchargements.'
          : etat === 'echec'
            ? 'L’image n’a pas pu être créée ici.'
            : ''}
      </span>
    </>
  )
}
