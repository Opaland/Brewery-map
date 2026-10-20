/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { politiqueDeSecurite } from './build/csp.ts'
import { prechargerCoucheOsm } from './build/precharger.ts'
import { precacheServiceWorker } from './build/precache-sw.ts'
import { validerDonnees, validerDonneesOsm } from './build/valider-donnees.ts'
import { themeAuChoixPlugin } from './build/theme.ts'
import { viderDist } from './build/vider-dist.ts'

export default defineConfig({
  // Chemins relatifs : la page tient sous /Brewery-map/ comme à la racine.
  // Repris de Sentiers, où ce réglage évite par construction le piège du
  // chemin de base GitHub Pages.
  base: './',
  plugins: [viderDist(), themeAuChoixPlugin(), react(), validerDonnees(), validerDonneesOsm(), precacheServiceWorker(), politiqueDeSecurite(), prechargerCoucheOsm()],
  test: {
    // S236 : l'étage « composants » (jsdom, choisi par fichier).
    include: ['tests/unit/**/*.test.ts', 'tests/composants/**/*.test.tsx'],
    environment: 'node',
  },
})
