import { lienDeBiere, TYPES_BIERE } from './core/bieres'
import type { Brasserie } from './core/schema'
import { t } from './i18n'

const LIBELLE = new Map(TYPES_BIERE.map((ty) => [ty.type, ty]))

/**
 * Les bières de la fiche (S5). Chaque type est un lien quand une page existe
 * — celle de la bière, sinon la fiche d'annuaire de la brasserie — et dit
 * « non référencé » sinon.
 */
export function Bieres({ brasserie }: { brasserie: Brasserie }) {
  if (brasserie.beers.length === 0) {
    return (
      <p className="fiche-bieres" data-testid="fiche-bieres">
        {t('Types de bière : non référencés pour l’instant. La recherche Untappd, plus haut, peut en montrer.')}
      </p>
    )
  }
  return (
    <div className="fiche-bieres" data-testid="fiche-bieres">
      <p className="fiche-titre">{t('Ses bières')}</p>
      <ul>
        {brasserie.beers.map((biere, i) => {
          const type = LIBELLE.get(biere.type)
          // Le nom de la bière ne dit pas son style : le type suit, sauf
          // « autre », dont le libellé porte déjà le style (revue métier S16).
          const montrerType =
            type !== undefined && (biere.libelle === undefined || biere.type !== 'autre')
          const nom =
            biere.libelle === undefined
                            ? type === undefined
                ? biere.type
                : t(type.libelle)
              : montrerType
                ? `${biere.libelle} · ${t(type.libelle)}`
                : biere.libelle
          const lien = lienDeBiere(biere, brasserie)
          return (
            <li key={`${biere.type}-${String(i)}`}>
              {lien === null ? (
                <>
                  {nom} <span className="fiche-aide-inline">{t('(non référencé)')}</span>
                </>
              ) : (
                <a href={lien.url} target="_blank" rel="noopener noreferrer">
                  {nom}
                  {lien.nature === 'annuaire' &&
                    t(' (page de la brasserie dans un annuaire, pas de cette bière)')}
                </a>
              )}
              {montrerType && <span className="fiche-aide-inline"> — {t(type.explication)}</span>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
