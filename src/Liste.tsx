import { CATEGORIES } from './core/categories'
import { formaterDistance } from './core/distance'
import type { Resultat } from './core/recherche'

interface Props {
  resultats: readonly Resultat[]
  selection: string | null
  onChoisir: (nom: string) => void
}

export function Liste({ resultats, selection, onChoisir }: Props) {
  return (
    <ol className="liste" aria-label="Brasseries, de la plus proche à la plus lointaine" data-testid="liste">
      {resultats.map(({ brasserie, distanceKm }) => (
        <li key={brasserie.n}>
          <button
            type="button"
            className="ligne"
            aria-pressed={selection === brasserie.n}
            data-nom={brasserie.n}
            onClick={() => {
              onChoisir(brasserie.n)
            }}
          >
            <span className="ligne-nom">{brasserie.n}</span>
            <span className="ligne-lieu">
              {brasserie.c} ({brasserie.d}) · {formaterDistance(distanceKm)}
            </span>
            <span className={`badge cat-${String(brasserie.cat)}`}>
              <span className="pastille" aria-hidden="true" />
              {CATEGORIES[brasserie.cat]}
            </span>
            {/*
              Le texte de justification du fichier, en entier : en catégorie 0
              c'est la raison du « À confirmer » (CLAUDE.md §0) ; ailleurs, il
              dit souvent quand le lieu accueille (revue Cédric S1). Pas
              tronqué — un texte coupé cache justement la réserve.
            */}
            <span className="ligne-note">
              {brasserie.cat === 0 ? 'Pourquoi : ' : ''}
              {brasserie.note}
            </span>
          </button>
        </li>
      ))}
    </ol>
  )
}
