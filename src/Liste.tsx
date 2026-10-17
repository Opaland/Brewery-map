import { t } from './i18n'
import { useEffect, useRef, useState } from 'react'
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
import { estDeOsm, noteDeLigne, siteOsm } from './core/osm-france'
import { lienDeFiche } from './core/partage'
import { NOTE_MAX } from './core/preferences'
import type { Resultat } from './core/recherche'
import type { Brasserie } from './core/schema'
import { lienSignalement, SANS_COMPTE, SUITE_SIGNALEMENT } from './core/signalement'
import { Bieres } from './Bieres'
import { Contact } from './Contact'
import { Horaires } from './Horaires'
import { YAller } from './YAller'
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

/**
 * Ce qu'un signalement implique, dit avant le geste (S10). Le lien n'emporte
 * que la fiche, déjà publique ; `noreferrer` : GitHub ne reçoit pas l'adresse
 * de la page d'où l'on vient.
 */
export const AIDE_SIGNALEMENT = `Ouvre GitHub dans un nouvel onglet, avec la fiche déjà recopiée. Il faut un compte GitHub (gratuit). ${SANS_COMPTE} Votre signalement sera public, sous votre nom de compte. Seule la fiche est transmise : ni votre position, ni vos favoris. ${SUITE_SIGNALEMENT}`

/** La même aide, dans la langue de l'interface (S49). */
const aideSignalement = () =>
  `${t('Ouvre GitHub dans un nouvel onglet, avec la fiche déjà recopiée. Il faut un compte GitHub (gratuit).')} ${t(SANS_COMPTE)} ${t('Votre signalement sera public, sous votre nom de compte. Seule la fiche est transmise : ni votre position, ni vos favoris.')} ${t(SUITE_SIGNALEMENT)}`

const idFiche = (nom: string) => `fiche-${encodeURIComponent(nom)}`

/**
 * Partager une fiche (S27) : le menu de partage du téléphone, ou le lien
 * copié. Le lien ne porte que le nom (`core/partage.ts`).
 */
function BoutonPartager({ nom }: { nom: string }) {
  const [etat, setEtat] = useState<'' | 'copie' | 'echec'>('')
  const partager = () => {
    const url = lienDeFiche(window.location.href, nom)
    if (typeof navigator.share === 'function') {
      // Refermer le menu de partage rejette la promesse : rien à dire.
      navigator.share({ title: `${nom} — Mousse de Poche`, url }).catch(() => undefined)
      return
    }
    // Certains navigateurs (page non sécurisée, vue intégrée) n'ont pas de
    // presse-papiers : l'écran le dit, sans erreur (revue S27).
    const pressePapiers = (navigator as { clipboard?: Clipboard }).clipboard
    if (pressePapiers === undefined) {
      setEtat('echec')
      return
    }
    pressePapiers.writeText(url).then(
      () => {
        setEtat('copie')
      },
      () => {
        setEtat('echec')
      },
    )
  }
  return (
    <>
      <button type="button" onClick={partager} data-testid="bouton-partager">
        {t('Partager')}
      </button>
      <span className="fiche-aide" role="status" data-testid="partage-etat">
        {etat === 'copie' ? t('Lien copié.') : etat === 'echec' ? t('Copie impossible ici.') : ''}
      </span>
    </>
  )
}

/**
 * La fiche détaillée, dépliée sous sa ligne. Pas de fenêtre par-dessus : sur
 * un téléphone, la liste reste le fil, et le retour est le même geste.
 */
function Fiche({
  brasserie,
  favori,
  onBasculerFavori,
  visite,
  onBasculerVisite,
  note,
  onEcrireNote,
  onImprimer,
  onRefermer,
}: {
  brasserie: Brasserie
  favori: boolean
  onBasculerFavori: () => void
  visite: string | undefined
  onBasculerVisite: () => void
  note: string
  onEcrireNote: (texte: string) => void
  onImprimer: () => void
  onRefermer: () => void
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
          {favori ? t('★ Retirer de mes favoris') : t('☆ Ajouter à mes favoris')}
        </button>
        {/* Mon carnet (S35) : le jour seulement, gardé sur l'appareil. */}
        <button type="button" onClick={onBasculerVisite} data-testid="bouton-visite">
          {visite === undefined
            ? t('J’y suis allé·e')
            : t('✓ Visitée le {date} — retirer du carnet', { date: libelleVerification(visite) })}
        </button>
        <BoutonPartager nom={brasserie.n} />
      </div>
      {/* Ma note (S36) : pour soi, gardée à la saisie, jamais envoyée. */}
      <label className="champ fiche-note">
        <span>{t('Ma note (sur cet appareil seulement)')}</span>
        <textarea
          value={note}
          maxLength={NOTE_MAX}
          rows={2}
          onChange={(e) => {
            onEcrireNote(e.target.value)
          }}
          placeholder={t('ex. la blanche était excellente')}
          data-testid="ma-note"
        />
      </label>
      <Contact brasserie={brasserie} />
      {/* Les horaires avant l'itinéraire : savoir si c'est ouvert avant d'y
          aller (revue Hugo S19). */}
      <Horaires brasserie={brasserie} />
      <YAller brasserie={brasserie} />
      <Bieres brasserie={brasserie} />
      <dl>
        {/* La note entière d'une fiche OSM, que la ligne abrège (S25). */}
        {estDeOsm(brasserie) && (
          <>
            <dt>{t('Pourquoi « À confirmer »')}</dt>
            <dd data-testid="fiche-note-osm">{brasserie.note}</dd>
          </>
        )}

        <dt>{t('Adresse')}</dt>
        <dd>{brasserie.addr}</dd>

        {siteOsm(brasserie) !== undefined && (
          <>
            <dt>{t('Site indiqué par OpenStreetMap')}</dt>
            <dd data-testid="fiche-site-osm">
              <a href={siteOsm(brasserie)} target="_blank" rel="noopener noreferrer">
                {hoteDeSource(siteOsm(brasserie) ?? '') ?? 'site'}
              </a>
            </dd>
          </>
        )}

        <dt>{t('Source')}</dt>
        <dd data-testid="fiche-source">
          {hote === null ? (
            t('Aucune source lue pour cette brasserie.')
          ) : (
            <a href={brasserie.src} target="_blank" rel="noopener noreferrer">
              {hote}
            </a>
          )}
        </dd>

        <dt>{t('Vérifiée le')}</dt>
        <dd data-testid="fiche-verification">{libelleVerification(brasserie.verifieLe)}</dd>

        {brasserie.fermee !== undefined && (
          <>
            <dt>{t('Fermée')}</dt>
            <dd data-testid="fiche-fermee">
              {t('Selon')}{' '}
              <a href={brasserie.fermee.source} target="_blank" rel="noopener noreferrer">
                {hoteDeSource(brasserie.fermee.source) ?? t('la source')}
              </a>
              {t(', lue le {date}.', { date: libelleVerification(brasserie.fermee.verifieLe) })}
            </dd>
          </>
        )}

        <dt>{t('Confiance')}</dt>
        <dd data-testid="fiche-confiance">
          {libelleConfiance(brasserie.conf)}
          {brasserie.conf === 'faible' && (
            <span className="fiche-aide" data-testid="fiche-verifier">
              {t('Vérifiez avant d’y aller : appelez, ou lisez la source.')}
            </span>
          )}
          <span className="fiche-aide">{SENS_CONFIANCE[brasserie.conf]}</span>
          <span className="fiche-aide" data-testid="fiche-avertissement">
            {avertissementHoraires(brasserie)}
          </span>
        </dd>

        <dt>{t('Position sur la carte')}</dt>
        <dd data-testid="fiche-precision">{libellePrecision(brasserie.coordPrecision)}</dd>
      </dl>
      <p className="fiche-signaler" data-testid="fiche-signaler">
        <a href={lienSignalement(brasserie)} target="_blank" rel="noopener noreferrer">
          {t('Signaler une erreur sur cette fiche')}
        </a>
        <span className="fiche-aide">{aideSignalement()}</span>
      </p>
      {/* Une fiche OSM se corrige d'abord à la source, pour tout le monde
          (revue persona S25 ; idée vue sur OpenBeerMap, veille S27). */}
      {estDeOsm(brasserie) && (
        <p className="fiche-aide" data-testid="corriger-osm">
          {t('Elle vient d’OpenStreetMap : vous pouvez aussi la corriger à la source, sur')}{' '}
          <a href={brasserie.src} target="_blank" rel="noopener noreferrer">
            openstreetmap.org
          </a>{' '}
          {t('(compte OpenStreetMap gratuit).')}
        </p>
      )}
      {/* L'affichette de comptoir (S38) : pour la brasserie elle-même. */}
      <p className="fiche-aide">
        <button type="button" className="bouton-lien" onClick={onImprimer} data-testid="imprimer-affichette">
          {t('Imprimer une affichette avec QR code')}
        </button>{' '}
        {t('Pour le comptoir de la brasserie : ce que dit cette fiche, et un QR code qui l’ouvre.')}
      </p>
      {/* La fiche dépasse un écran : refermer sans remonter jusqu'à sa ligne
          (revue UI/UX du 16/10, 1 073 px pour 839). */}
      <div className="depart-actions fiche-refermer">
        <button type="button" onClick={onRefermer} data-testid="refermer-fiche">
          {t('Refermer la fiche')}
        </button>
      </div>
    </div>
  )
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

  // La ligne choisie et sa fiche dépliée sont amenées à l'écran — depuis la
  // carte surtout. Viser le bouton seul laissait la fiche, rendue juste
  // après, hors champ sur un petit écran (revue code S3). Sans animation si
  // la personne a demandé moins de mouvement.
  useEffect(() => {
    if (selection === null) return
    const ligne = liste.current?.querySelector('li.ouverte')
    ligne?.scrollIntoView({ block: 'nearest', behavior: mouvementReduit() ? 'auto' : 'smooth' })
  }, [selection])

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
                  {brasserie.cat === 0 ? 'Pourquoi : ' : 'Ce que dit la source : '}
                </span>
                {noteDeLigne(brasserie)}
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
