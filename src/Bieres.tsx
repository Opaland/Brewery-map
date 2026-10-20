import { lienDeBiere, TYPES_BIERE } from './core/bieres'
import { motsDesBieres } from './core/lexique'
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
  // Sans bière connue, la partie ne s'affiche pas : la fiche le dit une
  // fois, en tête, avec la recherche Untappd (S308).
  if (brasserie.beers.length === 0) return null
  const liens = brasserie.beers.map((b) => lienDeBiere(b, brasserie))
  // Les seules bières « autre » : les autres ont déjà la glose de leur type,
  // et « pale ale » contredisait celle de l'IPA (revue adverse S316).
  const lexique = motsDesBieres(brasserie.beers.filter((b) => b.type === 'autre').map((b) => b.libelle ?? ''))
  const glose = (b: Brasserie['beers'][number]) => LIBELLE.has(b.type) && (b.libelle === undefined || b.type !== 'autre')
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
          // La glose d'un type, à sa première bière seulement (S316, revue
          // Marie S308 : huit gloses pour huit bières).
          // (une « autre » à libellé n'a pas de glose : elle ne compte pas).
          const premiereDuType = brasserie.beers.findIndex((x) => x.type === biere.type && glose(x)) === i
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
              {montrerType && premiereDuType && <span className="fiche-aide-inline"> — {t(type.explication)}</span>}
            </li>
          )
        })}
      </ul>
      {/* Les styles que les libellés nomment, en langue courante (S316), comme
          les mots de la note (S295). */}
      {lexique.length > 0 && (
        <dl className="fiche-lexique" data-testid="bieres-lexique">
          {lexique.map((m) => (
            <div key={m.mot}>
              <dt>{t('« {mot} »', { mot: m.mot })}</dt>
              <dd>{t(m.sens)}</dd>
            </div>
          ))}
        </dl>
      )}
      {liens.some((l) => l === null) && untappd}
    </div>
  )
}
