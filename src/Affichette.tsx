import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CATEGORIES } from './core/categories'
import { noteDeLigne } from './core/osm-france'
import { lienDeFiche } from './core/partage'
import { cheminSvgQr, matriceQr } from './core/qr'
import type { Brasserie } from './core/schema'

/**
 * L'affichette de comptoir d'une fiche (S38) : ce que dit la fiche, telle
 * qu'elle s'affiche, et un QR code qui l'ouvre. Rendue hors de l'arbre de la
 * page (`body`) ; à l'impression, elle seule est peinte (`index.css`,
 * `@media print`). « À confirmer » reste « À confirmer », avec sa raison :
 * l'affichette ne dit rien de plus que la fiche (CLAUDE.md §0).
 *
 * Elle reste en français quelle que soit la langue de l'interface (S49) :
 * elle s'affiche au comptoir d'une brasserie française, pas sur l'écran de
 * qui l'imprime.
 *
 * Montée, elle s'imprime ; puis elle se démonte (`onFin`). La règle
 * d'impression ne vaut que pendant ce temps (`body.imprime-affichette`) :
 * posée en permanence, Ctrl+P imprimait une page blanche (revue adverse
 * S38). `afterprint` peut ne pas venir (Safari sur iPhone) : la fin de
 * l'impression se lit aussi sur `matchMedia('print')`.
 */
export default function Affichette({ brasserie, onFin }: { brasserie: Brasserie; onFin: () => void }) {
  const lien = lienDeFiche(window.location.href, brasserie.n)
  const m = matriceQr(lien)
  useEffect(() => {
    const corps = document.body
    const impression = window.matchMedia('print')
    const fin = () => {
      corps.classList.remove('imprime-affichette')
      onFin()
    }
    const surChangement = (e: MediaQueryListEvent) => {
      if (!e.matches) fin()
    }
    corps.classList.add('imprime-affichette')
    window.addEventListener('afterprint', fin)
    impression.addEventListener('change', surChangement)
    window.print()
    return () => {
      window.removeEventListener('afterprint', fin)
      impression.removeEventListener('change', surChangement)
      corps.classList.remove('imprime-affichette')
    }
    // Une impression par montage : la clé du composant en change à chaque clic.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return createPortal(
    <section className="affichette" aria-label={`Affichette de ${brasserie.n}`} data-testid="affichette">
      <p className="affichette-marque">Mousse de Poche</p>
      <h2>{brasserie.n}</h2>
      <p className="affichette-lieu">
        {brasserie.c} ({brasserie.d})
      </p>
      <p className="affichette-categorie">{CATEGORIES[brasserie.cat]}</p>
      <p className="affichette-note">
        {brasserie.cat === 0 ? 'Pourquoi : ' : 'Ce que dit la source : '}
        {noteDeLigne(brasserie)}
      </p>
      <svg
        className="affichette-qr"
        viewBox={`0 0 ${String(m.length)} ${String(m.length)}`}
        role="img"
        aria-label="QR code de la fiche"
        data-testid="affichette-qr"
        shapeRendering="crispEdges"
      >
        <rect width={m.length} height={m.length} fill="#fff" />
        <path d={cheminSvgQr(m)} fill="#000" />
      </svg>
      <p className="affichette-lien">Scannez pour ouvrir la fiche : {lien}</p>
    </section>,
    document.body,
  )
}
