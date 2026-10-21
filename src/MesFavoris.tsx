import { t } from './i18n'
import { LienExterne } from './LienExterne'
import { useState, type ReactNode } from 'react'
import type { EtapeImage } from './core/image-tournee'
import { ImageTournee } from './ImageTournee'

interface Props {
  /** Les favoris encore présents dans les données. */
  nbFavoris: number
  /** Les favoris dont le nom n'est plus dans les données. */
  orphelins: readonly string[]
  onRetirerOrphelins: () => void
  /** Les brasseries de visites ou de notes qui ne sont plus dans les données (A16). */
  carnetOrphelins: readonly string[]
  onRetirerCarnetOrphelins: () => void
  seulement: boolean
  onSeulement: (v: boolean) => void
  /** Vrai quand ce navigateur ne laisse rien garder (navigation privée…). */
  stockageDisponible: boolean
  versionFuture: boolean
  onEffacer: () => void
  /** Ma tournée (S27) : les étapes dans l'ordre, et le lien qui les ouvre. */
  tournee?: { etapes: readonly string[]; image: readonly EtapeImage[]; lien: string; total: number }
  /** Mon carnet (S35) : combien de visites, et le filtre « pas encore visitées ». */
  nbVisites: number
  pasVisitees: boolean
  onPasVisitees: (v: boolean) => void
  /** Ce qui suit l'effacement dans le repli « gardés sur cet appareil » (S37 : la sauvegarde). */
  children?: ReactNode
}

/**
 * Les favoris et ce qui est gardé (S9). La phrase dit où vivent ces choix :
 * sur l'appareil, nulle part ailleurs — et comment les effacer.
 */
export function MesFavoris({
  nbFavoris,
  orphelins,
  onRetirerOrphelins,
  carnetOrphelins,
  onRetirerCarnetOrphelins,
  seulement,
  onSeulement,
  stockageDisponible,
  versionFuture,
  onEffacer,
  tournee,
  nbVisites,
  pasVisitees,
  onPasVisitees,
  children,
}: Props) {
  // Effacer se confirme : un toucher de travers ne doit pas coûter tous les
  // favoris (revue Marie S9).
  const [confirmer, setConfirmer] = useState(false)
  return (
    <fieldset className="depart" data-testid="mes-favoris">
      <legend>{t('Mes favoris')}</legend>
      <label className="case">
        <input
          type="checkbox"
          checked={seulement}
          onChange={(e) => {
            onSeulement(e.target.checked)
          }}
          data-testid="favoris-seulement"
        />
        {t('Afficher seulement mes favoris ({n})', { n: nbFavoris })}
      </label>
      <label className="case">
        <input
          type="checkbox"
          checked={pasVisitees}
          onChange={(e) => {
            onPasVisitees(e.target.checked)
          }}
          data-testid="pas-visitees"
        />
        {nbVisites > 1 ? t('Seulement les brasseries pas encore visitées ({n} visitées)', { n: nbVisites }) : t('Seulement les brasseries pas encore visitées ({n} visitée)', { n: nbVisites })}
      </label>
      {nbFavoris === 0 && (
        <p className="champ-aide">
          {t('Touchez une brasserie de la liste, puis « Ajouter à mes favoris ».')}
        </p>
      )}
      {/* Ma tournée (S27 ; idée vue sur les circuits des distilleries
          écossaises et la route du cidre). */}
      {tournee !== undefined && tournee.etapes.length >= 2 && (
        <div className="tournee" data-testid="tournee">
          <p className="champ-aide">
            {t('Ma tournée :')}{' '}
            {tournee.etapes.join(' → ')}
            {tournee.total > tournee.etapes.length
              ? ` ${t('(les {n} plus proches sur {total} : Google Maps n’en ouvre pas plus d’un coup sur téléphone)', { n: tournee.etapes.length, total: tournee.total })}`
              : ''}
            .
          </p>
          <LienExterne className="bouton-lien" href={tournee.lien} testid="tournee-lien">
            {t('Ouvrir la tournée dans Google Maps')}
          </LienExterne>
          {/* L'image de la tournée (S34), composée dans ce téléphone. */}
          <div className="depart-actions">
            <ImageTournee etapes={tournee.image} />
          </div>
          <p className="fiche-aide">
            {t('L’ordre se calcule dans ce téléphone, de proche en proche depuis votre départ. Le lien ne contient que les brasseries ; Google Maps part de votre position s’il y a accès. Vérifiez avant de partir que chacune vous accueille. L’image ne nomme que les étapes, dans l’ordre : elle ne dit pas d’où vous partez, mais la première étape est la plus proche de vous.')}
          </p>
        </div>
      )}
      {orphelins.length > 0 && (
        <div className="champ-aide" data-testid="favoris-orphelins">
          <p>
            {orphelins.length === 1
              ? t('Un favori n’est plus dans la liste des brasseries (renommée ou retirée) : {liste}.', { liste: orphelins.join(', ') })
              : t('{n} favoris ne sont plus dans la liste des brasseries (renommée ou retirée) : {liste}.', {
                  n: orphelins.length,
                  liste: orphelins.join(', '),
                })}
          </p>
          <div className="depart-actions">
            <button type="button" onClick={onRetirerOrphelins} data-testid="retirer-orphelins">
              {t('Les retirer de mes favoris')}
            </button>
          </div>
        </div>
      )}
      {carnetOrphelins.length > 0 && (
        <div className="champ-aide" data-testid="carnet-orphelins">
          <p>
            {carnetOrphelins.length === 1
              ? t('Votre carnet garde une visite ou une note sur une brasserie qui n’est plus dans l’application (renommée ou retirée) : {liste}. Elles ne s’affichent plus nulle part.', {
                  liste: carnetOrphelins.join(', '),
                })
              : t('Votre carnet garde des visites ou des notes sur {n} brasseries qui ne sont plus dans l’application (renommées ou retirées) : {liste}. Elles ne s’affichent plus nulle part.', {
                  n: carnetOrphelins.length,
                  liste: carnetOrphelins.join(', '),
                })}
          </p>
          <div className="depart-actions">
            <button type="button" onClick={onRetirerCarnetOrphelins} data-testid="retirer-carnet-orphelins">
              {t('Effacer ces visites et ces notes')}
            </button>
          </div>
        </div>
      )}
      {/* Replié derrière une phrase : déplié, ce bloc faisait 294 px avant la
          liste sur téléphone (S24). Sans stockage, l'avertissement reste
          visible : il change ce que la personne doit savoir. */}
      {stockageDisponible ? (
        <details
          className="confidentialite"
          data-testid="stockage-details"
          // Refermé, il ne garde pas « Oui, tout effacer » prêt à un toucher
          // (revue adverse S24).
          onToggle={(e) => {
            if (!e.currentTarget.open) setConfirmer(false)
          }}
        >
          <summary>{t('Gardés sur cet appareil seulement')}</summary>
          <p className="champ-aide" data-testid="stockage-texte">
            {t('Vos favoris, votre carnet de visites (le nom et le jour, rien d’autre), vos notes et vos réglages (distance, départ, filtres) sont gardés sur cet appareil seulement. Ils ne sont envoyés à personne. Pour « Autour de moi », seul ce choix est gardé, jamais la position : elle se redemande au retour, sans fenêtre si le navigateur l’a déjà permise. Le fond de carte déjà vu est gardé ici aussi, pour servir sans connexion ; « Effacer » le retire avec le reste.')}
          </p>
          <div className="depart-actions">
            {confirmer ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmer(false)
                    onEffacer()
                  }}
                  data-testid="confirmer-effacer"
                >
                  {t('Oui, tout effacer')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmer(false)
                  }}
                >
                  {t('Annuler')}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setConfirmer(true)
                }}
                data-testid="tout-effacer"
              >
                {t('Effacer favoris, carnet, notes et réglages')}
              </button>
            )}
          </div>
          {children}
        </details>
      ) : versionFuture ? (
        <div className="confidentialite">
          <p className="champ-aide" data-testid="stockage-texte">
            {t('Une version plus récente de Mousse de Poche a gardé vos favoris, votre carnet, vos notes et vos réglages sur cet appareil : cette page les lit sans les modifier. Rechargez-la pour retrouver la dernière version.')}
          </p>
          {children}
        </div>
      ) : (
        <p className="champ-aide" data-testid="stockage-texte">
          {t('Ce navigateur ne permet pas de garder vos favoris, votre carnet, vos notes et vos réglages (navigation privée, ou stockage bloqué) : ils seront oubliés en fermant la page.')}
        </p>
      )}
    </fieldset>
  )
}
