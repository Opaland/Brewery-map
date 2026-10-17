/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { politiqueDeSecurite } from './build/csp.ts'
import { prechargerCoucheOsm } from './build/precharger.ts'
import { precacheServiceWorker } from './build/precache-sw.ts'
import { validerDonnees, validerDonneesOsm } from './build/valider-donnees.ts'
import { themeAuChoixPlugin } from './build/theme.ts'

export default defineConfig({
  // Chemins relatifs : la page tient sous /Brewery-map/ comme à la racine.
  // Repris de Sentiers, où ce réglage évite par construction le piège du
  // chemin de base GitHub Pages.
  base: './',
  plugins: [themeAuChoixPlugin(), react(), validerDonnees(), validerDonneesOsm(), precacheServiceWorker(), politiqueDeSecurite(), prechargerCoucheOsm()],
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
})
