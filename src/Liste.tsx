import { t } from './i18n'
import { EnFrancais } from './EnFrancais'
import { useEffect, useMemo, useRef } from 'react'
import { CATEGORIES } from './core/categories'
import { formaterDistance } from './core/distance'
import { etatPourLaListe } from './core/horaires'
import { idFiche, libelleVerification } from './core/fiche'
import { estDeOsm, noteDeLigne } from './core/osm-france'
import type { Resultat } from './core/recherche'
import type { Brasserie } from './core/schema'
import { useMinute } from './crochets'
import { Fiche } from './Fiche'
import { mouvementReduit } from './mouvement'

interface Props {
  resultats: readonly Resultat[]
  selection: string | null
  /** Change à chaque choix fait sur la carte : le focus va sur la ligne. */
  focaliser?: number
  onChoisir: (nom: string) => void
  favoris: ReadonlySet<string>
  onBasculerFavori: (nom: string) => void
  /** Mon carnet (S35) : nom → date de la visite (AAAA-MM-JJ). */
  visites?: ReadonlyMap<string, string>
  onBasculerVisite?: (nom: string) => void
  /** Mes notes (S36) : nom → texte. */
  notes?: ReadonlyMap<string, string>
  onEcrireNote?: (nom: string, texte: string) => void
  /** L'affichette de comptoir (S38). */
  onImprimer?: (b: Brasserie) => void
}

export function Liste({
  resultats,
  selection,
  focaliser = 0,
  onChoisir,
  favoris,
  onBasculerFavori,
  visites = new Map<string, string>(),
  onBasculerVisite = () => undefined,
  notes = new Map<string, string>(),
  onEcrireNote = () => undefined,
  onImprimer = () => undefined,
}: Props) {
  const liste = useRef<HTMLOListElement>(null)
  // L'état « maintenant » de chaque ligne suit l'heure (S295, Hugo).
  const instant = useMinute()
  // Une fois par ligne et par minute, pas à chaque rendu (revue adverse S295).
  const etats = useMemo(
    () => new Map(resultats.map((r) => [r.brasserie.n, etatPourLaListe(r.brasserie.horaires, instant)])),
    [resultats, instant],
  )

  // La ligne choisie et sa fiche dépliée sont amenées à l'écran — depuis la
  // carte surtout. Viser le bouton seul laissait la fiche, rendue juste
  // après, hors champ sur un petit écran (revue code S3). Sans animation si
  // la personne a demandé moins de mouvement. Une fiche plus haute que
  // l'écran s'aligne par son haut : « nearest » l'amenait par son bas, nom
  // et focus hors de l'écran (revue globale du 19/10, A5). Aussi quand la
  // ligne n'arrive qu'après le choix : un lien partagé vers une fiche de la
  // suite (S294) l'ouvrait hors de l'écran (revue adverse S294).
  const selectionPresente = selection !== null && resultats.some((r) => r.brasserie.n === selection)
  useEffect(() => {
    if (!selectionPresente) return
    const ligne = liste.current?.querySelector('li.ouverte')
    if (ligne === null || ligne === undefined) return
    const tropHaute = ligne.getBoundingClientRect().height > window.innerHeight
    ligne.scrollIntoView({ block: tropHaute ? 'start' : 'nearest', behavior: mouvementReduit() ? 'auto' : 'smooth' })
  }, [selection, selectionPresente])

  useEffect(() => {
    if (focaliser === 0) return
    liste.current?.querySelector<HTMLButtonElement>('li.ouverte > .ligne')?.focus({ preventScroll: true })
  }, [focaliser])

  return (
    <ol
      ref={liste}
      className="liste"
      aria-label={t('Brasseries, de la plus proche à la plus lointaine')}
      data-testid="liste"
    >
      {resultats.map(({ brasserie, distanceKm }) => {
        const ouverte = selection === brasserie.n
        const favori = favoris.has(brasserie.n)
        const visite = visites.get(brasserie.n)
        return (
          <li key={brasserie.n} className={ouverte ? 'ouverte' : undefined}>
            <button
              type="button"
              className={`ligne cat-${String(brasserie.cat)}`}
              aria-expanded={ouverte}
              aria-controls={ouverte ? idFiche(brasserie.n) : undefined}
              data-nom={brasserie.n}
              onClick={() => {
                onChoisir(brasserie.n)
              }}
            >
              <span className="ligne-nom">
                {brasserie.n}
                {favori && (
                  <span className="ligne-favori" data-testid="marque-favori">
                    {' '}
                    <span aria-hidden="true">★</span>
                    <span className="lecteur-seul">{t('(favori)')}</span>
                  </span>
                )}
                {notes.has(brasserie.n) && (
                  <span className="ligne-visite" data-testid="marque-note">
                    {' '}
                    <span aria-hidden="true">✎</span>
                    <span className="lecteur-seul">{t('(avec ma note)')}</span>
                  </span>
                )}
                {visite !== undefined && (
                  <span className="ligne-visite" data-testid="marque-visite">
                    {' '}
                    <span aria-hidden="true">✓</span>
                    <span className="lecteur-seul">{t('(visitée le {date})', { date: libelleVerification(visite) })}</span>
                  </span>
                )}
              </span>
              {/* Les virgules invisibles : des pauses à l'écoute entre les
                  parties du nom lu (revue Inès S18). */}
              <span className="lecteur-seul">, </span>
              <span className="ligne-lieu">
                {brasserie.c} ({brasserie.d}) ·{' '}
                <span className="ligne-distance">{formaterDistance(distanceKm)}</span>
              </span>
              {etats.get(brasserie.n) !== undefined && (
                <>
                  <span className="lecteur-seul">, </span>
                  <span className="ligne-ouvert" data-testid="ligne-ouvert">
                    {etats.get(brasserie.n)}
                  </span>
                </>
              )}
              <span className="lecteur-seul">, </span>
              <span className={`badge cat-${String(brasserie.cat)}`}>
                <span className="pastille" aria-hidden="true" />
                {t(CATEGORIES[brasserie.cat])}
                {/* Distincte du vérifié sans ouvrir la fiche (revue persona S25). */}
                {estDeOsm(brasserie) && (
                  <span className="badge-osm" data-testid="badge-osm">
                    {' '}
                    · OpenStreetMap
                  </span>
                )}
                {/* Décision #39 : la confiance faible dit quoi faire, dès la ligne. */}
                {brasserie.conf === 'faible' && (
                  <span className="badge-verifier" data-testid="badge-verifier">
                    {' '}
                    {t('Vérifiez avant d’y aller.')}
                  </span>
                )}
                {/* Décision #35 : une fiche fermée ne paraît que cherchée par son nom. */}
                {brasserie.fermee !== undefined && (
                  <span className="badge-fermee" data-testid="badge-fermee">
                    {' '}
                    · {t('fermée')}
                  </span>
                )}
              </span>
              <span className="lecteur-seul">, </span>
              {/*
                Le texte de justification du fichier, en entier : en catégorie 0
                c'est la raison du « À confirmer » (CLAUDE.md §0) ; ailleurs, il
                dit souvent quand le lieu accueille (revue Cédric S1). Pas
                tronqué — un texte coupé cache justement la réserve. Libellé
                « Ce que dit la source » : décision de Cédric du 15/10, `note`
                n'est pas une note chiffrée.
              */}
              <span className="ligne-note">
                <span className="ligne-note-titre">
                  {brasserie.cat === 0 ? t('Pourquoi : ') : t('Ce que dit la source : ')}
                </span>
                <EnFrancais>{noteDeLigne(brasserie)}</EnFrancais>
              </span>
            </button>
            {ouverte && (
              <Fiche
                brasserie={brasserie}
                favori={favori}
                onBasculerFavori={() => {
                  onBasculerFavori(brasserie.n)
                }}
                visite={visite}
                onBasculerVisite={() => {
                  onBasculerVisite(brasserie.n)
                }}
                note={notes.get(brasserie.n) ?? ''}
                onEcrireNote={(texte) => {
                  onEcrireNote(brasserie.n, texte)
                }}
                onImprimer={() => {
                  onImprimer(brasserie)
                }}
                onRefermer={() => {
                  // Le focus et l'écran reviennent sur la ligne : on reprend
                  // la liste là où on l'avait laissée.
                  const ligne = liste.current?.querySelector<HTMLButtonElement>('li.ouverte > .ligne')
                  onChoisir(brasserie.n)
                  ligne?.focus({ preventScroll: true })
                  ligne?.scrollIntoView({ block: 'nearest' })
                }}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
