import { useState } from 'react'
import { t } from './i18n'
import { EnFrancais } from './EnFrancais'
import { LienExterne } from './LienExterne'
import { motsExpliques } from './core/lexique'
import {
  avertissementHoraires,
  ceQuiManque,
  hoteDeSource,
  idFiche,
  libelleConfiance,
  libelleVerification,
  phraseConfiance,
  phraseDuManque,
  SENS_CONFIANCE,
} from './core/fiche'
import { rechercheGoogleMaps } from './core/google-maps'
import { estDeOsm, noteDeFiche, siteOsm } from './core/osm-france'
import { lienDeFiche } from './core/partage'
import { NOTE_MAX } from './core/preferences'
import type { Brasserie } from './core/schema'
import { lienSignalement, SANS_COMPTE, SUITE_SIGNALEMENT } from './core/signalement'
import { rechercheUntappd } from './core/untappd'
import { Bieres } from './Bieres'
import { Contact } from './Contact'
import { EnBref } from './EnBref'
import { Horaires } from './Horaires'
import { YAller } from './YAller'

/**
 * Ce qu'un signalement implique, dit avant le geste (S10), dans la langue de
 * l'interface (S49). Le lien n'emporte que la fiche, déjà publique ;
 * `noreferrer` : GitHub ne reçoit pas l'adresse de la page d'où l'on vient.
 */
const aideSignalement = () =>
  `${t('Ouvre GitHub dans un nouvel onglet, avec la fiche déjà recopiée. Il faut un compte GitHub (gratuit).')} ${t(SANS_COMPTE)} ${t('Votre signalement sera public, sous votre nom de compte. Seule la fiche est transmise : ni votre position, ni vos favoris.')} ${t(SUITE_SIGNALEMENT)}`

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
 * Ce que la fiche ne sait pas encore, dit une fois, avec où le chercher
 * (S308, Cédric : « personne ne parle comme cela »). Avant, chaque partie
 * disait son propre vide : l'adresse absente l'était trois fois.
 */
export function CeQuiManque({ brasserie }: { brasserie: Brasserie }) {
  const manque = ceQuiManque(brasserie)
  if (manque.length === 0) return null
  const pour = <span className="lecteur-seul"> {brasserie.n}</span>
  // Google Maps : une recherche par le nom et la commune (S267). Pas pour une
  // fiche OpenStreetMap, dont la commune est souvent déduite de la position
  // (revue adverse S267).
  const parMaps = !estDeOsm(brasserie) && manque.some((m) => m !== 'bieres')
  const parUntappd = manque.includes('bieres')
  // La phrase, puis les recherches en liens à part : un lien de la fiche a
  // 44 px de haut (`.fiche a`), et au milieu d'une phrase il étirait chaque
  // ligne (vu sur la capture de S308). Phrase complète dans chaque cas (revue
  // adverse S308 : bières seules, elle finissait en « . ses bières sur
  // Untappd. »).
  return (
    <div className="fiche-manque" data-testid="fiche-manque">
      <p>{phraseDuManque(manque)}</p>
      {(parMaps || parUntappd) && (
        <p className="fiche-liens">
          {parMaps && (
            <LienExterne href={rechercheGoogleMaps(brasserie.n, brasserie.c)} testid="telephone-google-maps">
              {t('Chercher sur Google Maps')}
              {pour}
            </LienExterne>
          )}
          {parUntappd && (
            <LienExterne href={rechercheUntappd(brasserie.n)} testid="chercher-untappd">
              {t('Ses bières sur Untappd')}
              {pour}
            </LienExterne>
          )}
        </p>
      )}
      {parMaps && (
        <p className="fiche-aide">{t('Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.')}</p>
      )}
    </div>
  )
}

/**
 * La fiche détaillée, dépliée sous sa ligne. Pas de fenêtre par-dessus : sur
 * un téléphone, la liste reste le fil, et le retour est le même geste.
 *
 * S308 : ce qu'on sait s'affiche ; ce qu'on ne sait pas se dit une fois, en
 * tête ; une partie sans contenu disparaît ; la provenance tient en une
 * phrase. Chaque partie garde son titre : un lecteur d'écran saute de l'une
 * à l'autre (S295, Inès).
 */
export function Fiche({
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
  return (
    <section className="fiche" id={idFiche(brasserie.n)} aria-labelledby={titre} data-testid="fiche">
      <h3 className="lecteur-seul" id={titre}>
        {t('Fiche de {nom}', { nom: brasserie.n })}
      </h3>
      <EnBref brasserie={brasserie} />
      <CeQuiManque brasserie={brasserie} />
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
      {/* Joindre, Horaires, Bières : chacune se tait sans rien à dire (S308).
          Les horaires avant l'itinéraire : savoir si c'est ouvert avant d'y
          aller (revue Hugo S19). */}
      <Contact brasserie={brasserie} />
      <Horaires brasserie={brasserie} />
      <h4 className="fiche-titre">{t('Y aller')}</h4>
      <YAller brasserie={brasserie} />
      <Bieres brasserie={brasserie} />
      <h4 className="fiche-titre">{t('D’où vient cette fiche')}</h4>
      {/* La note entière d'une fiche OSM, que la ligne abrège (S25). */}
      {estDeOsm(brasserie) && (
        <p data-testid="fiche-note-osm-bloc">
          <strong>{t('Pourquoi « À confirmer » : ')}</strong>
          <EnFrancais testid="fiche-note-osm">{noteDeFiche(brasserie)}</EnFrancais>
        </p>
      )}
      <p className="fiche-provenance" data-testid="fiche-provenance">
        <span data-testid="fiche-source">
          {hote === null ? (
            t('Source : aucune pour l’instant. Si c’est votre brasserie, envoyez le lien de votre site par « Signaler une erreur », plus bas.')
          ) : (
            <>
              {t('Source : ')}
              <LienExterne href={brasserie.src}>{hote}</LienExterne>
              {site !== undefined && (
                <>
                  {t(' ; site indiqué par OpenStreetMap : ')}
                  <LienExterne href={site} testid="fiche-site-osm">
                    {hoteDeSource(site) ?? t('site')}
                  </LienExterne>
                </>
              )}
              .
            </>
          )}
        </span>{' '}
        {/* Sans date de lecture, rien : « date de vérification inconnue » ne
            disait qu'un trou (revue Marie S308) ; la réserve est portée par
            la confiance, juste après. */}
        {brasserie.verifieLe !== undefined && (
          <>
            <span data-testid="fiche-verification">
              {t('Vérifiée le {date}.', { date: libelleVerification(brasserie.verifieLe) })}
            </span>{' '}
          </>
        )}
        <span data-testid="fiche-confiance">{phraseConfiance(brasserie)}</span>
      </p>
      {/* La confiance porte sur la catégorie, jamais sur les horaires (revue
          métier S3) : dit en clair dès qu'il y a des horaires. Sans horaires,
          rien à prévenir (revue Marie S308 : la phrase parlait d'horaires
          absents). Pas dans le repli : la revue adverse S308 l'y a vue cachée. */}
      {brasserie.horaires !== undefined && (
        <p className="fiche-aide" data-testid="fiche-avertissement">
          {avertissementHoraires(brasserie)}
        </p>
      )}
      {brasserie.fermee !== undefined && (
        <p data-testid="fiche-fermee">
          {t('Fermée, selon')}{' '}
          <LienExterne href={brasserie.fermee.source}>
            {hoteDeSource(brasserie.fermee.source) ?? t('la source')}
          </LienExterne>
          {t(', lue le {date}.', { date: libelleVerification(brasserie.fermee.verifieLe) })}
        </p>
      )}
      {brasserie.conf !== '' && (
        <details className="fiche-aide" data-testid="fiche-sens-confiance">
          <summary>{t('Que veut dire « confiance {niveau} » ?', { niveau: libelleConfiance(brasserie.conf) })}</summary>
          <p>{t(SENS_CONFIANCE[brasserie.conf])}</p>
        </details>
      )}
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
