import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { brasseriesOsm } from './osmFrance'
import { ouvrirStockage } from './stockage'
import { surveillerMiseAJour } from './nouvelleVersion'
import { appliquerTheme } from './theme'
import { choisirLangue, langueDe, t } from './i18n'
import { ecouterInvitationTot } from './invitationInstallation'

// Les réglages gardés sont lus avant le premier rendu : sinon la carte se
// cadrerait sur les réglages par défaut, puis sauterait (S9). `ouvrirStockage`
// ne rejette pas et répond en 2 s au plus (`DELAI_OUVERTURE_MS`) : sans
// IndexedDB, ou s'il ne répond pas, l'application part sans rien garder.
const DELAI_COUCHE_MS = 3000
const ABANDON_COUCHE_MS = 20_000

// Safari d'iPhone n'applique `:active` au toucher que si la page écoute les
// touchers (règle connue de Safari iOS ; S234). Non vérifiable en émulation :
// à constater sur un vrai iPhone (S96).
document.addEventListener('touchstart', () => undefined, { passive: true })

// L'invitation à installer, écoutée avant le rendu (S333, A29).
ecouterInvitationTot()

// La langue de l'interface, avant tout rendu (S48).
choisirLangue(langueDe(navigator.languages))
document.title = t('Mousse de Poche — brasseries artisanales')

const racine = document.getElementById('root')
if (racine) {
  // La couche « toute la France » (S25) se charge en même temps : arrivée
  // après l'écran, elle faisait bouger la liste sous le doigt. Sans elle
  // (connexion), l'application part avec les fiches vérifiées seules.
  //
  // Au plus 3 s d'attente, comme le stockage (2 s) : sans réponse, l'écran
  // part sans elle et le dit (revue adverse S25 : chunk jamais servi, page
  // blanche). 3 s : seuil de présentation (CLAUDE.md §2) — mesuré ≈ 1,9 s
  // pour le premier écran en 4G lente simulée avec la couche ; au-delà,
  // mieux vaut la liste vérifiée tout de suite.
  // Au-delà de 20 s, la couche est tenue pour absente : une requête jamais
  // servie laissait « arrivent encore » à l'écran pour toujours (S333).
  // Seuil de présentation (CLAUDE.md §2), au jugé : dix fois les ≈ 1,9 s
  // mesurées en 4G lente simulée.
  const coucheTardive = Promise.race([
    brasseriesOsm().catch(() => null),
    new Promise<null>((ok) => {
      setTimeout(() => {
        ok(null)
      }, ABANDON_COUCHE_MS)
    }),
  ])
  const couche = Promise.race([
    coucheTardive,
    new Promise<null>((ok) => {
      setTimeout(() => {
        ok(null)
      }, DELAI_COUCHE_MS)
    }),
  ])
  void Promise.all([ouvrirStockage(), couche]).then(([stockage, couche]) => {
    // Le thème choisi (S45), posé avant le premier rendu : pas d'éclair clair.
    appliquerTheme(stockage.initiales.theme)
    createRoot(racine).render(
      <StrictMode>
        <App stockage={stockage} couche={couche} coucheTardive={coucheTardive} />
      </StrictMode>,
    )
  })
}

// Le service worker n'est enregistré qu'en production : en développement, il
// servirait des fichiers périmés. Aucun module tiers : `public/sw.js`.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('./sw.js').then(surveillerMiseAJour)
  })
}
