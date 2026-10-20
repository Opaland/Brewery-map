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
  lecturesDeLaFiche,
  type Lecture,
  libelleVerification,
  phraseConfiance,
  phraseDuManque,
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

// Des fonctions : la langue est choisie après le chargement du module.
const CE_QUI_EST_LU: Readonly<Record<Lecture['quoi'], () => string>> = {
  fiche: () => t('la fiche'),
  coordonnees: () => t('les coordonnées'),
  horaires: () => t('les horaires'),
}

/**
 * D'où vient la fiche, en une phrase (S308), chaque site cité une fois avec
 * ce qu'on y a lu et quand (S312 ; revue Marie S308 : trois dates, le même
 * site trois fois). Aussi rendue par l'aperçu des lots (`src/apercu.ts`).
 */
export function Provenance({ brasserie }: { brasserie: Brasserie }) {
  const groupes = lecturesDeLaFiche(brasserie)
  const site = siteOsm(brasserie)
  return (
    <p className="fiche-provenance" data-testid="fiche-provenance">
      <span data-testid="fiche-source">
        {groupes.length === 0
          ? t('Source : aucune pour l’instant. Si c’est votre brasserie, envoyez le lien de votre site par « Signaler une erreur », plus bas.')
          : groupes.map((g, i) => {
              // Sans date de lecture, la source seule : rien d'inventé, et pas
              // de phrase qui ne dit qu'un trou (revue Marie S308).
              const datees = g.lectures.filter((l) => l.date !== undefined)
              const dates = new Set(datees.map((l) => l.date))
              const lien = <LienExterne href={g.url}>{g.hote}</LienExterne>
              // Une seule date pour tout ce qui a été lu sur ce site : dite une
              // fois. Sinon, chaque lecture datée avec sa date ; une lecture
              // sans date n'en reçoit pas d'une autre (revue adverse S312).
              const uneDate = dates.size === 1 && datees.length === g.lectures.length
              return (
                <span key={g.hote}>
                  {i > 0 && ' '}
                  {datees.length === 0 ? (
                    <>
                      {t('Source : ')}
                      {lien}
                    </>
                  ) : uneDate ? (
                    <>
                      {t('Lu sur ')}
                      {lien}
                      {t(' le {date}', { date: libelleVerification(datees[0]?.date) })}
                    </>
                  ) : (
                    <>
                      {t('Lu sur ')}
                      {lien}
                      {t(' : ')}
                      {datees.map((l, j) => (
                        <span key={l.quoi}>
                          {j > 0 && ', '}
                          {/* La page précise, quand ce n'est pas celle du site
                              (revue adverse S312 : le lien du contact se perdait). */}
                          {l.url === g.url ? (
                            CE_QUI_EST_LU[l.quoi]()
                          ) : (
                            <LienExterne href={l.url}>{CE_QUI_EST_LU[l.quoi]()}</LienExterne>
                          )}
                          {t(' le {date}', { date: libelleVerification(l.date) })}
                        </span>
                      ))}
                    </>
                  )}
                  .
                </span>
              )
            })}
        {site !== undefined && (
          <>
            {t(' Site indiqué par OpenStreetMap : ')}
            <LienExterne href={site} testid="fiche-site-osm">
              {hoteDeSource(site) ?? t('site')}
            </LienExterne>
            .
          </>
        )}
      </span>{' '}
      <span data-testid="fiche-confiance">{phraseConfiance(brasserie)}</span>
    </p>
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
      <Provenance brasserie={brasserie} />
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
