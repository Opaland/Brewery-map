import { useEffect, useRef } from 'react'
import { CATEGORIES } from './core/categories'
import { formaterDistance } from './core/distance'
import {
  avertissementHoraires,
  hoteDeSource,
  libelleConfiance,
  libellePrecision,
  libelleVerification,
  SENS_CONFIANCE,
} from './core/fiche'
import type { Resultat } from './core/recherche'
import type { Brasserie } from './core/schema'
import { lienSignalement, SANS_COMPTE, SUITE_SIGNALEMENT } from './core/signalement'
import { Bieres } from './Bieres'
import { Contact } from './Contact'
import { Horaires } from './Horaires'

interface Props {
  resultats: readonly Resultat[]
  selection: string | null
  onChoisir: (nom: string) => void
  favoris: ReadonlySet<string>
  onBasculerFavori: (nom: string) => void
}

/**
 * Ce qu'un signalement implique, dit avant le geste (S10). Le lien n'emporte
 * que la fiche, déjà publique ; `noreferrer` : GitHub ne reçoit pas l'adresse
 * de la page d'où l'on vient.
 */
export const AIDE_SIGNALEMENT = `Ouvre GitHub dans un nouvel onglet, avec la fiche déjà recopiée. Il faut un compte GitHub (gratuit). ${SANS_COMPTE} Votre signalement sera public, sous votre nom de compte. Seule la fiche est transmise : ni votre position, ni vos favoris. ${SUITE_SIGNALEMENT}`

const idFiche = (nom: string) => `fiche-${encodeURIComponent(nom)}`

/**
 * La fiche détaillée, dépliée sous sa ligne. Pas de fenêtre par-dessus : sur
 * un téléphone, la liste reste le fil, et le retour est le même geste.
 */
function Fiche({
  brasserie,
  favori,
  onBasculerFavori,
}: {
  brasserie: Brasserie
  favori: boolean
  onBasculerFavori: () => void
}) {
  const hote = hoteDeSource(brasserie.src)
  return (
    <div className="fiche" id={idFiche(brasserie.n)} data-testid="fiche">
      <div className="depart-actions">
        {/*
          Le libellé dit l'action, sans `aria-pressed` : les deux ensemble
          s'annonçaient « Retirer…, activé », contradictoire (revue code S9).
        */}
        <button type="button" onClick={onBasculerFavori} data-testid="bouton-favori">
          {favori ? '★ Retirer de mes favoris' : '☆ Ajouter à mes favoris'}
        </button>
      </div>
      <Contact brasserie={brasserie} />
      <Horaires brasserie={brasserie} />
      <Bieres brasserie={brasserie} />
      <dl>
        <dt>Adresse</dt>
        <dd>{brasserie.addr}</dd>

        <dt>Source</dt>
        <dd data-testid="fiche-source">
          {hote === null ? (
            'Aucune source lue pour cette brasserie.'
          ) : (
            <a href={brasserie.src} target="_blank" rel="noopener noreferrer">
              {hote}
            </a>
          )}
        </dd>

        <dt>Vérifiée le</dt>
        <dd data-testid="fiche-verification">{libelleVerification(brasserie.verifieLe)}</dd>

        <dt>Confiance</dt>
        <dd data-testid="fiche-confiance">
          {libelleConfiance(brasserie.conf)}
          <span className="fiche-aide">{SENS_CONFIANCE[brasserie.conf]}</span>
          <span className="fiche-aide" data-testid="fiche-avertissement">
            {avertissementHoraires(brasserie)}
          </span>
        </dd>

        <dt>Position sur la carte</dt>
        <dd data-testid="fiche-precision">{libellePrecision(brasserie.coordPrecision)}</dd>
      </dl>
      <p className="fiche-signaler" data-testid="fiche-signaler">
        <a href={lienSignalement(brasserie)} target="_blank" rel="noopener noreferrer">
          Signaler une erreur sur cette fiche
        </a>
        <span className="fiche-aide">{AIDE_SIGNALEMENT}</span>
      </p>
    </div>
  )
}

export function Liste({ resultats, selection, onChoisir, favoris, onBasculerFavori }: Props) {
  const liste = useRef<HTMLOListElement>(null)

  // La ligne choisie et sa fiche dépliée sont amenées à l'écran — depuis la
  // carte surtout. Viser le bouton seul laissait la fiche, rendue juste
  // après, hors champ sur un petit écran (revue code S3).
  useEffect(() => {
    if (selection === null) return
    const ligne = liste.current?.querySelector('li.ouverte')
    ligne?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [selection])

  return (
    <ol
      ref={liste}
      className="liste"
      aria-label="Brasseries, de la plus proche à la plus lointaine"
      data-testid="liste"
    >
      {resultats.map(({ brasserie, distanceKm }) => {
        const ouverte = selection === brasserie.n
        const favori = favoris.has(brasserie.n)
        return (
          <li key={brasserie.n} className={ouverte ? 'ouverte' : undefined}>
            <button
              type="button"
              className="ligne"
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
                    <span className="lecteur-seul">(favori)</span>
                  </span>
                )}
              </span>
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
                tronqué — un texte coupé cache justement la réserve. Libellé
                « Ce que dit la source » : décision de Cédric du 15/10, `note`
                n'est pas une note chiffrée.
              */}
              <span className="ligne-note">
                <span className="ligne-note-titre">
                  {brasserie.cat === 0 ? 'Pourquoi : ' : 'Ce que dit la source : '}
                </span>
                {brasserie.note}
              </span>
            </button>
            {ouverte && (
              <Fiche
                brasserie={brasserie}
                favori={favori}
                onBasculerFavori={() => {
                  onBasculerFavori(brasserie.n)
                }}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
