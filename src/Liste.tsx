import { t } from './i18n'
import { EnFrancais } from './EnFrancais'
import { LienExterne } from './LienExterne'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CATEGORIES } from './core/categories'
import { formaterDistance } from './core/distance'
import { etatPourLaListe } from './core/horaires'
import { motsExpliques } from './core/lexique'
import {
  adresseDeRue,
  avertissementHoraires,
  hoteDeSource,
  libelleConfiance,
  libellePrecision,
  libelleVerification,
  SENS_CONFIANCE,
} from './core/fiche'
import { estDeOsm, noteDeFiche, noteDeLigne, siteOsm } from './core/osm-france'
import { lienDeFiche } from './core/partage'
import { NOTE_MAX } from './core/preferences'
import type { Resultat } from './core/recherche'
import type { Brasserie } from './core/schema'
import { lienSignalement, SANS_COMPTE, SUITE_SIGNALEMENT } from './core/signalement'
import { Bieres } from './Bieres'
import { Contact } from './Contact'
import { useMinute } from './crochets'
import { EnBref } from './EnBref'
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
 * Ce qu'un signalement implique, dit avant le geste (S10), dans la langue de
 * l'interface (S49). Le lien n'emporte que la fiche, déjà publique ;
 * `noreferrer` : GitHub ne reçoit pas l'adresse de la page d'où l'on vient.
 */
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
        <span className="lecteur-seul"> {nom}</span>
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
  const site = siteOsm(brasserie)
  // Le nom de la brasserie, pour qui parcourt les boutons sans la ligne (S295, Inès).
  const pour = <span className="lecteur-seul"> {brasserie.n}</span>
  const titre = `${idFiche(brasserie.n)}-titre`
  // S295 (la fiche face à la concurrence, Inès) : d'abord ce qu'on peut y
  // faire, l'état et le lieu ; puis joindre, quand, où, quoi boire, la
  // fiabilité ; ce qui est pour soi (favori, carnet, note) ensuite. Chaque
  // partie a son titre : un lecteur d'écran saute de l'une à l'autre.
  return (
    <section className="fiche" id={idFiche(brasserie.n)} aria-labelledby={titre} data-testid="fiche">
      <h3 className="lecteur-seul" id={titre}>
        {t('Fiche de {nom}', { nom: brasserie.n })}
      </h3>
      <EnBref brasserie={brasserie} />
      {/* Les mots du métier de la note, en langue courante (S295, Marie). */}
      {motsExpliques(brasserie.note).length > 0 && (
        <dl className="fiche-lexique" data-testid="fiche-lexique">
          {motsExpliques(brasserie.note).map((m) => (
            <div key={m.mot}>
              <dt>{t('« {mot} »', { mot: m.mot })}</dt>
              <dd>{t(m.sens)}</dd>
            </div>
          ))}
        </dl>
      )}
      <h4 className="fiche-titre">{t('Joindre la brasserie')}</h4>
      <Contact brasserie={brasserie} />
      <h4 className="fiche-titre">{t('Horaires')}</h4>
      {/* Les horaires avant l'itinéraire : savoir si c'est ouvert avant d'y
          aller (revue Hugo S19). */}
      <Horaires brasserie={brasserie} />
      <h4 className="fiche-titre">{t('Où')}</h4>
      <dl className="fiche-ou">
        <dt>{t('Adresse')}</dt>
        <dd data-testid="fiche-adresse">
          {adresseDeRue(brasserie)
            ? brasserie.addr
            : t('non connue : seulement la commune, {commune}.', { commune: brasserie.c })}
        </dd>
        <dt>{t('Position sur la carte')}</dt>
        <dd data-testid="fiche-precision">
          {libellePrecision(brasserie.coordPrecision)}
          {brasserie.coordPrecision === 'centre' && (
            <span className="fiche-aide">{t('IGN : l’Institut national de l’information géographique, qui publie le centre de chaque commune.')}</span>
          )}
        </dd>
      </dl>
      <YAller brasserie={brasserie} />
      <Bieres brasserie={brasserie} />
      <h4 className="fiche-titre">{t('D’où vient cette fiche')}</h4>
      <dl>
        {/* La note entière d'une fiche OSM, que la ligne abrège (S25). */}
        {estDeOsm(brasserie) && (
          <>
            <dt>{t('Pourquoi « À confirmer »')}</dt>
            <dd>
              <EnFrancais testid="fiche-note-osm">{noteDeFiche(brasserie)}</EnFrancais>
            </dd>
          </>
        )}

        {site !== undefined && (
          <>
            <dt>{t('Site indiqué par OpenStreetMap')}</dt>
            <dd data-testid="fiche-site-osm">
              <LienExterne href={site}>
                {hoteDeSource(site) ?? t('site')}
              </LienExterne>
            </dd>
          </>
        )}

        <dt>{t('Source')}</dt>
        <dd data-testid="fiche-source">
          {hote === null ? (
            t('Aucune source lue pour cette brasserie. Si c’est la vôtre, envoyez le lien de votre site par « Signaler une erreur », plus bas.')
          ) : (
            <LienExterne href={brasserie.src}>
              {hote}
            </LienExterne>
          )}
        </dd>

        <dt>{t('Vérifiée le')}</dt>
        <dd data-testid="fiche-verification">{libelleVerification(brasserie.verifieLe)}</dd>

        {brasserie.fermee !== undefined && (
          <>
            <dt>{t('Fermée')}</dt>
            <dd data-testid="fiche-fermee">
              {t('Selon')}{' '}
              <LienExterne href={brasserie.fermee.source}>
                {hoteDeSource(brasserie.fermee.source) ?? t('la source')}
              </LienExterne>
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
          <span className="fiche-aide">{t(SENS_CONFIANCE[brasserie.conf])}</span>
          <span className="fiche-aide" data-testid="fiche-avertissement">
            {avertissementHoraires(brasserie)}
          </span>
        </dd>
      </dl>
      <h4 className="fiche-titre">{t('Pour moi')}</h4>
      <div className="depart-actions">
        {/*
          Le libellé dit l'action, sans `aria-pressed` : les deux ensemble
          s'annonçaient « Retirer…, activé », contradictoire (revue code S9).
        */}
        <button type="button" onClick={onBasculerFavori} data-testid="bouton-favori">
          {favori ? t('★ Retirer de mes favoris') : t('☆ Ajouter à mes favoris')}
          {pour}
        </button>
        {/* Mon carnet (S35) : le jour seulement, gardé sur l'appareil. */}
        <button type="button" onClick={onBasculerVisite} data-testid="bouton-visite">
          {visite === undefined
            ? t('J’y suis allé·e')
            : t('✓ Visitée le {date} — retirer du carnet', { date: libelleVerification(visite) })}
          {pour}
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
      <p className="fiche-signaler" data-testid="fiche-signaler">
        <LienExterne href={lienSignalement(brasserie)}>
          {t('Signaler une erreur sur cette fiche')}
        </LienExterne>
        <span className="fiche-aide">{aideSignalement()}</span>
      </p>
      {/* Une fiche OSM se corrige d'abord à la source, pour tout le monde
          (revue persona S25 ; idée vue sur OpenBeerMap, veille S27). */}
      {estDeOsm(brasserie) && (
        <p className="fiche-aide" data-testid="corriger-osm">
          {t('Elle vient d’OpenStreetMap : vous pouvez aussi la corriger à la source, sur')}{' '}
          <LienExterne href={brasserie.src}>
            openstreetmap.org
          </LienExterne>{' '}
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
    </section>
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
  // et focus hors de l'écran (revue globale du 19/10, A5).
  useEffect(() => {
    if (selection === null) return
    const ligne = liste.current?.querySelector('li.ouverte')
    if (ligne === null || ligne === undefined) return
    const tropHaute = ligne.getBoundingClientRect().height > window.innerHeight
    ligne.scrollIntoView({ block: tropHaute ? 'start' : 'nearest', behavior: mouvementReduit() ? 'auto' : 'smooth' })
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
