import { lienDeBiere, TYPES_BIERE } from './core/bieres'
import type { Brasserie } from './core/schema'

const LIBELLE = new Map(TYPES_BIERE.map((t) => [t.type, t]))

/**
 * Les bières de la fiche (S5). Chaque type est un lien quand une page existe
 * — celle de la bière, sinon la fiche d'annuaire de la brasserie — et dit
 * « non référencé » sinon.
 */
export function Bieres({ brasserie }: { brasserie: Brasserie }) {
  if (brasserie.beers.length === 0) {
    return (
      <p className="fiche-bieres" data-testid="fiche-bieres">
        Types de bière : non référencés pour l’instant.
      </p>
    )
  }
  return (
    <div className="fiche-bieres" data-testid="fiche-bieres">
      <p className="fiche-titre">Ses bières</p>
      <ul>
        {brasserie.beers.map((biere, i) => {
          const type = LIBELLE.get(biere.type)
          const nom = biere.libelle ?? type?.libelle ?? biere.type
          const lien = lienDeBiere(biere, brasserie)
          return (
            <li key={`${biere.type}-${String(i)}`}>
              {lien === null ? (
                <>
                  {nom} <span className="fiche-aide-inline">(non référencé)</span>
                </>
              ) : (
                <a href={lien.url} target="_blank" rel="noopener noreferrer">
                  {nom}
                  {lien.nature === 'annuaire' && ' (fiche d’annuaire)'}
                </a>
              )}
              {type !== undefined && biere.libelle === undefined && (
                <span className="fiche-aide-inline"> — {type.explication}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
