import { lienDeBiere, TYPES_BIERE } from './core/bieres'
import type { Brasserie } from './core/schema'
import { rechercheUntappd } from './core/untappd'
import { t } from './i18n'
import { LienExterne } from './LienExterne'

const LIBELLE = new Map(TYPES_BIERE.map((ty) => [ty.type, ty]))

/**
 * Les bières de la fiche (S5). Chaque type est un lien quand une page existe
 * — celle de la bière, sinon la fiche d'annuaire de la brasserie — et dit
 * « non référencé » sinon. Une adresse que toutes partagent est la page des
 * bières de la brasserie : un seul lien (S295).
 */
export function Bieres({ brasserie }: { brasserie: Brasserie }) {
  const titre = <h4 className="fiche-titre">{t('Ses bières')}</h4>
  // Pour une bière sans page, une piste : la recherche Untappd par le nom de
  // la brasserie (S295, Karim et Marie : « plus haut » ne désignait rien).
  const untappd = (
    <p className="fiche-aide" data-testid="bieres-untappd">
      <LienExterne href={rechercheUntappd(brasserie.n)}>{t('Chercher ses bières sur Untappd')}</LienExterne>{' '}
      {t('(Untappd, une application d’avis sur les bières ; la recherche se fait par le nom de la brasserie)')}
    </p>
  )
  if (brasserie.beers.length === 0) {
    return (
      <div className="fiche-bieres" data-testid="fiche-bieres">
        {titre}
        <p>{t('Types de bière : non référencés pour l’instant.')}</p>
        {untappd}
      </div>
    )
  }
  const liens = brasserie.beers.map((b) => lienDeBiere(b, brasserie))
  // Toutes à la même adresse : c'est la page des bières de la brasserie. Un
  // seul lien, dit comme tel, plutôt que le même sous chaque nom (S295).
  const premier = liens[0]
  const catalogue =
    premier !== null && premier !== undefined && premier.nature === 'catalogue' && liens.every((l) => l?.url === premier.url)
      ? premier.url
      : undefined
  return (
    <div className="fiche-bieres" data-testid="fiche-bieres">
      {titre}
      {catalogue !== undefined && (
        <p data-testid="bieres-catalogue">
          <LienExterne href={catalogue}>{t('La page des bières de la brasserie')}</LienExterne>
        </p>
      )}
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
          const lien = liens[i] ?? null
          return (
            <li key={`${biere.type}-${String(i)}`}>
              {catalogue !== undefined ? (
                nom
              ) : lien === null ? (
                <>
                  {nom} <span className="fiche-aide-inline">{t('(non référencé)')}</span>
                </>
              ) : (
                <LienExterne href={lien.url}>
                  {nom}
                  {lien.nature === 'annuaire' &&
                    t(' (page de la brasserie dans un annuaire, pas de cette bière)')}
                  {lien.nature === 'catalogue' && t(' (page des bières de la brasserie, pas de cette seule bière)')}
                </LienExterne>
              )}
              {montrerType && <span className="fiche-aide-inline"> — {t(type.explication)}</span>}
            </li>
          )
        })}
      </ul>
      {liens.some((l) => l === null) && untappd}
    </div>
  )
}
