import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { ouvrirStockage } from './stockage'

// Les réglages gardés sont lus avant le premier rendu : sinon la carte se
// cadrerait sur les réglages par défaut, puis sauterait (S9). `ouvrirStockage`
// ne rejette pas et répond en 2 s au plus (`DELAI_OUVERTURE_MS`) : sans
// IndexedDB, ou s'il ne répond pas, l'application part sans rien garder.
const racine = document.getElementById('root')
if (racine) {
  void ouvrirStockage().then((stockage) => {
    createRoot(racine).render(
      <StrictMode>
        <App stockage={stockage} />
      </StrictMode>,
    )
  })
}

// Le service worker n'est enregistré qu'en production : en développement, il
// servirait des fichiers périmés. Aucun module tiers : `public/sw.js`.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('./sw.js')
  })
}
