import { defineConfig, devices } from '@playwright/test'

/**
 * Repris de Sentiers, allégé de ce qui n'existe pas encore ici (relais
 * réseau, service worker).
 *
 * `MOUSSE_URL` désigne une page **déjà publiée** : elle n'est posée que par le
 * workflow de déploiement, pour `page-deployee.spec.ts`. Dans ce mode il n'y a
 * ni serveur local à lancer ni `dist/` à comparer aux sources.
 */
const CIBLE = process.env.MOUSSE_URL

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Un seul exécutant hors CI : sur Sentiers, le parallélisme local rendait
  // des échecs au hasard sur des budgets de temps (mesuré le 03/09, #491).
  workers: process.env.CI ? undefined : 1,
  // Refuse de démarrer sur un `dist/` périmé (CLAUDE.md §6quater) : le
  // contrôle vit dans le processus de test, sans intervalle avec l'usage.
  ...(CIBLE === undefined ? { globalSetup: './tests/e2e/dist-a-jour.ts' } : {}),
  globalTimeout: 30 * 60 * 1000,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    // Le service worker intercepte les requêtes et court-circuiterait les
    // `page.route` des tests (leçon de Sentiers) : bloqué par défaut, permis
    // dans le seul fichier qui l'exerce (tests/e2e/hors-ligne.spec.ts).
    serviceWorkers: 'block',
    ...(process.env.PW_CHROMIUM_PATH
      ? { launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } }
      : {}),
  },
  projects: [{ name: 'mobile', use: { ...devices['Pixel 7'] } }],
  ...(CIBLE === undefined
    ? {
        webServer: {
          command: 'npm run preview',
          url: 'http://localhost:4173',
          reuseExistingServer: !process.env.CI,
        },
      }
    : {}),
})
