import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { brasseriesOsm } from './osmFrance'
import { ouvrirStockage } from './stockage'
import { surveillerMiseAJour } from './miseAJour'

// Les réglages gardés sont lus avant le premier rendu : sinon la carte se
// cadrerait sur les réglages par défaut, puis sauterait (S9). `ouvrirStockage`
// ne rejette pas et répond en 2 s au plus (`DELAI_OUVERTURE_MS`) : sans
// IndexedDB, ou s'il ne répond pas, l'application part sans rien garder.
const racine = document.getElementById('root')
if (racine) {
  // La couche « toute la France » (S25) se charge en même temps : arrivée
  // après l'écran, elle faisait bouger la liste sous le doigt. Sans elle
  // (connexion), l'application part avec les fiches vérifiées seules.
  void Promise.all([ouvrirStockage(), brasseriesOsm().catch(() => null)]).then(([stockage, couche]) => {
    createRoot(racine).render(
      <StrictMode>
        <App stockage={stockage} couche={couche} />
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
