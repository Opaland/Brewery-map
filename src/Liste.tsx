import { useEffect, useRef } from 'react'
import { CATEGORIES } from './core/categories'
import { formaterDistance } from './core/distance'
import {
  AVERTISSEMENT_HORAIRES,
  hoteDeSource,
  libelleConfiance,
  libellePrecision,
  libelleVerification,
  SENS_CONFIANCE,
} from './core/fiche'
import type { Resultat } from './core/recherche'
import type { Brasserie } from './core/schema'
import { Contact } from './Contact'

interface Props {
  resultats: readonly Resultat[]
  selection: string | null
  onChoisir: (nom: string) => void
}

const idFiche = (nom: string) => `fiche-${encodeURIComponent(nom)}`

/**
 * La fiche détaillée, dépliée sous sa ligne. Pas de fenêtre par-dessus : sur
 * un téléphone, la liste reste le fil, et le retour est le même geste.
 */
function Fiche({ brasserie }: { brasserie: Brasserie }) {
  const hote = hoteDeSource(brasserie.src)
  return (
    <div className="fiche" id={idFiche(brasserie.n)} data-testid="fiche">
      <Contact brasserie={brasserie} />
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
            {AVERTISSEMENT_HORAIRES}
          </span>
        </dd>

        <dt>Position sur la carte</dt>
        <dd data-testid="fiche-precision">{libellePrecision(brasserie.coordPrecision)}</dd>
      </dl>
    </div>
  )
}

export function Liste({ resultats, selection, onChoisir }: Props) {
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
            {ouverte && <Fiche brasserie={brasserie} />}
          </li>
        )
      })}
    </ol>
  )
}
