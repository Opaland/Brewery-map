/**
 * Captures d'écran et GIF du README (S23). Lancer `npm run build`, puis
 * `npm run preview` dans un autre terminal, puis :
 *
 *   npx tsx outils/captures.ts
 *
 * Ce qui est montré est l'application telle que construite, sur les données
 * de `data/` : rien n'est mis en scène, sauf le point de départ (une commune
 * tapée, jamais une position). Les tuiles viennent d'OpenStreetMap, une
 * fois par lancement. Sortie : `docs/captures/`. Le GIF demande `ffmpeg`.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { chromium, devices, type Browser, type Page } from '@playwright/test'

const URL_APP = 'http://localhost:4317/'
const SORTIE = 'docs/captures'
const VIDEO = join(SORTIE, 'video-brute')

async function attendreListe(page: Page): Promise<void> {
  await page.goto(URL_APP)
  await page.getByTestId('liste').getByRole('listitem').first().waitFor()
}

async function versLaCarte(page: Page): Promise<void> {
  for (let i = 0; i < 20; i++) {
    await page.evaluate(() => {
      document.querySelector('[data-testid="carte-en-attente"]')?.scrollIntoView()
    })
    if ((await page.locator('[data-testid="carte"]').count()) > 0) break
    await page.waitForTimeout(250)
  }
  await page.locator('.maplibregl-marker.marqueur').first().waitFor()
  // Laisser les tuiles arriver : la capture montre ce qu'une personne voit.
  await page.waitForLoadState('networkidle')
}

async function telephone(navigateur: Browser, sombre: boolean): Promise<void> {
  const contexte = await navigateur.newContext({
    ...devices['Pixel 7'],
    // 1,5 au lieu de 2,625 : lisible dans le README, quatre fois plus léger.
    deviceScaleFactor: 1.5,
    colorScheme: sombre ? 'dark' : 'light',
    locale: 'fr-FR',
  })
  const page = await contexte.newPage()
  const suffixe = sombre ? '-sombre' : ''
  await attendreListe(page)
  await page.screenshot({ path: join(SORTIE, `telephone-accueil${suffixe}.png`) })

  await page.getByTestId('liste').getByRole('listitem').first().getByRole('button').first().click()
  const fiche = page.getByTestId('fiche').first()
  await fiche.waitFor()
  await fiche.scrollIntoViewIfNeeded()
  await page.screenshot({ path: join(SORTIE, `telephone-fiche${suffixe}.png`) })

  await versLaCarte(page)
  await page.getByTestId('carte').scrollIntoViewIfNeeded()
  await page.screenshot({ path: join(SORTIE, `telephone-carte${suffixe}.png`) })
  await contexte.close()
}

async function ordinateur(navigateur: Browser): Promise<void> {
  const contexte = await navigateur.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'fr-FR',
  })
  const page = await contexte.newPage()
  await attendreListe(page)
  await versLaCarte(page)
  await page.evaluate(() => {
    window.scrollTo(0, 0)
  })
  await page.screenshot({ path: join(SORTIE, 'ordinateur.png') })
  await contexte.close()
}

/** Le parcours du GIF : une commune tapée, la liste, une fiche. */
async function parcours(navigateur: Browser): Promise<void> {
  rmSync(VIDEO, { recursive: true, force: true })
  const contexte = await navigateur.newContext({
    ...devices['Pixel 7'],
    locale: 'fr-FR',
    recordVideo: { dir: VIDEO, size: { width: 412, height: 839 } },
  })
  const page = await contexte.newPage()
  await attendreListe(page)
  await page.waitForTimeout(800)
  const champ = page.getByTestId('commune-depart')
  await champ.scrollIntoViewIfNeeded()
  await champ.pressSequentially('villefranche', { delay: 90 })
  await page.waitForTimeout(700)
  await page.getByRole('option').first().click()
  await page.waitForTimeout(900)
  await page.getByTestId('compte').scrollIntoViewIfNeeded()
  await page.waitForTimeout(900)
  await page.getByTestId('liste').getByRole('listitem').first().getByRole('button').first().click()
  await page.getByTestId('fiche').first().scrollIntoViewIfNeeded()
  await page.waitForTimeout(2000)
  await contexte.close()

  const brute = readdirSync(VIDEO).find((f) => f.endsWith('.webm'))
  if (brute === undefined) throw new Error('aucune vidéo enregistrée')
  const webm = join(SORTIE, 'parcours.webm')
  renameSync(join(VIDEO, brute), webm)
  rmSync(VIDEO, { recursive: true, force: true })
  const palette = join(SORTIE, 'palette.png')
  const filtre = 'fps=6,scale=300:-1:flags=lanczos'
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', webm, '-vf', `${filtre},palettegen`, palette])
  execFileSync('ffmpeg', [
    '-y',
    '-loglevel',
    'error',
    '-i',
    webm,
    '-i',
    palette,
    '-lavfi',
    `${filtre}[x];[x][1:v]paletteuse`,
    join(SORTIE, 'parcours.gif'),
  ])
  rmSync(palette)
  rmSync(webm)
}

mkdirSync(SORTIE, { recursive: true })
const navigateur = await chromium.launch(
  process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
)
try {
  await telephone(navigateur, false)
  await telephone(navigateur, true)
  await ordinateur(navigateur)
  await parcours(navigateur)
} finally {
  await navigateur.close()
}
