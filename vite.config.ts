/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { politiqueDeSecurite } from './build/csp.ts'
import { precacheServiceWorker } from './build/precache-sw.ts'
import { validerDonnees } from './build/valider-donnees.ts'

export default defineConfig({
  // Chemins relatifs : la page tient sous /Brewery-map/ comme à la racine.
  // Repris de Sentiers, où ce réglage évite par construction le piège du
  // chemin de base GitHub Pages.
  base: './',
  plugins: [react(), validerDonnees(), precacheServiceWorker(), politiqueDeSecurite()],
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
})
