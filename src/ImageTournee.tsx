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
  // Les graisses dessinées, chargées pour de bon : `fonts.ready` n'attend
  // pas une graisse que la page n'a pas encore demandée (revue adverse S34).
  await Promise.all([
    document.fonts.load("700 56px 'Fraunces Variable'"),
    document.fonts.load("400 38px 'Inter Variable'"),
  ]).catch(() => undefined)
  for (const t of plan.textes) {
    const famille =
      t.role === 'lieu' || t.role === 'adresse'
        ? "'Inter Variable', Arial, sans-serif"
        : "'Fraunces Variable', Georgia, serif"
    // Mesuré, pas compté : la taille baisse jusqu'à tenir dans la largeur.
    let taille = t.taille
    ctx.font = `${t.gras ? '700' : '400'} ${String(taille)}px ${famille}`
    while (ctx.measureText(t.texte).width > t.largeurMax && taille > 20) {
      taille -= 2
      ctx.font = `${t.gras ? '700' : '400'} ${String(taille)}px ${famille}`
    }
    ctx.fillStyle = t.role === 'lieu' || t.role === 'adresse' ? '#f6e6d6' : '#ffffff'
    ctx.fillText(t.texte, t.x, t.y, t.largeurMax)
  }
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b === null) reject(new Error('toBlob'))
      else resolve(b)
    }, 'image/png')
  })
}

function telecharger(fichier: File) {
  const url = URL.createObjectURL(fichier)
  const a = document.createElement('a')
  a.href = url
  a.download = 'tournee.png'
  a.click()
  // Révoquer tout de suite peut annuler le téléchargement hors de Chromium
  // (revue adverse S34) : une minute, largement assez.
  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 60_000)
}

export function ImageTournee({ etapes }: { etapes: readonly EtapeImage[] }) {
  const [etat, setEtat] = useState<'' | 'partagee' | 'telecharge' | 'echec'>('')
  const [enCours, setEnCours] = useState(false)
  const partager = async () => {
    setEtat('')
    setEnCours(true)
    try {
      const fichier = new File([await dessiner(etapes)], 'tournee.png', { type: 'image/png' })
      if (typeof navigator.canShare === 'function' && navigator.canShare({ files: [fichier] })) {
        try {
          await navigator.share({ files: [fichier], title: 'Ma tournée — Mousse de Poche' })
          setEtat('partagee')
          return
        } catch (e) {
          // Refermer le menu, c'est annuler : rien à dire. Tout autre refus
          // (geste expiré pendant le dessin, sur iPhone) se replie sur le
          // téléchargement plutôt que de ne rien faire (revue adverse S34).
          if (e instanceof DOMException && e.name === 'AbortError') return
        }
      }
      telecharger(fichier)
      setEtat('telecharge')
    } catch {
      setEtat('echec')
    } finally {
      setEnCours(false)
    }
  }
  return (
    <>
      <button
        type="button"
        disabled={enCours}
        onClick={() => {
          void partager()
        }}
        data-testid="tournee-image"
      >
        {enCours ? 'Image en préparation…' : 'Partager en image'}
      </button>
      <span className="champ-aide" role="status" data-testid="tournee-image-etat">
        {etat === 'partagee'
          ? 'Image remise au menu de partage.'
          : etat === 'telecharge'
            ? 'Image enregistrée dans vos téléchargements.'
            : etat === 'echec'
              ? 'L’image n’a pas pu être créée ici.'
              : ''}
      </span>
    </>
  )
}
