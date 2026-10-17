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

const PROJETS: Partial<Record<string, { name: string; use: Record<string, unknown> }>> = {
  mobile: { name: 'mobile', use: { ...devices['Pixel 7'], locale: 'fr-FR' } },
  webkit: { name: 'webkit-iphone', use: { ...devices['iPhone 13'], locale: 'fr-FR' } },
  // Firefox n'émule pas le mobile (`isMobile`) : un écran de téléphone, le
  // toucher et l'agent de Firefox pour Android, comme dans la vraie vie.
  firefox: {
    name: 'firefox-android',
    use: {
      browserName: 'firefox',
      viewport: { width: 412, height: 839 },
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (Android 14; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
      locale: 'fr-FR',
    },
  },
}

/**
 * Un nom de moteur mal tapé lançait Chromium sans le dire, et le job
 * « navigateurs » restait vert (revue adverse S234) : on refuse plutôt.
 */
function projetChoisi(nom = process.env.PW_NAVIGATEUR ?? 'mobile') {
  const projet = PROJETS[nom]
  if (projet === undefined) {
    throw new Error(`PW_NAVIGATEUR=${nom} inconnu : ${Object.keys(PROJETS).join(', ')}`)
  }
  return projet
}

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
    ...(process.env.PW_CHROMIUM_PATH && process.env.PW_NAVIGATEUR === undefined
      ? { launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } }
      : {}),
  },
  // En français : le profil Pixel 7 parle anglais par défaut, et l'interface
  // suivra la langue du navigateur dès S50 (les tests anglais la posent).
  //
  // S234 : `PW_NAVIGATEUR` choisit un autre moteur, en CI seulement (le
  // conteneur n'a que Chromium) : Safari d'iPhone (WebKit) ou Firefox pour
  // Android.
  projects: [projetChoisi()],
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
