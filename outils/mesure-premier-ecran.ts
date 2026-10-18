/**
 * S293 — mesure le premier écran d'une page construite, servie sur un port,
 * en émulation mobile : réseau « 4G lente » et processeur ralenti (CDP).
 *
 *   npx tsx outils/mesure-premier-ecran.ts http://localhost:4173/ [essais]
 *
 * Rend, en médiane sur les essais : le LCP, le temps jusqu'à la première
 * ligne de la liste peinte, et les octets transférés. Aucune requête ne
 * sort de la machine : la page est servie localement, les tuiles ne sont pas
 * demandées (la carte n'est pas ouverte).
 */
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://localhost:4173/'
const essais = Number(process.argv[3] ?? '5')

// « 4G lente » de Lighthouse (débit et latence) ; processeur ralenti 4 fois.
const RESEAU = { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 }
const RALENTI = 4

const mediane = (xs: number[]) => {
  const t = [...xs].sort((a, b) => a - b)
  return t[Math.floor(t.length / 2)] ?? NaN
}

const navigateur = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH })
const lcp: number[] = []
const ligne: number[] = []
const octets: number[] = []
for (let i = 0; i < essais; i++) {
  const contexte = await navigateur.newContext({ viewport: { width: 412, height: 839 }, isMobile: true, hasTouch: true })
  const page = await contexte.newPage()
  const cdp = await contexte.newCDPSession(page)
  await cdp.send('Network.enable')
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
  await cdp.send('Network.emulateNetworkConditions', RESEAU)
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: RALENTI })
  let total = 0
  cdp.on('Network.loadingFinished', (e: { encodedDataLength: number }) => {
    total += e.encodedDataLength
  })
  await page.addInitScript(() => {
    ;(window as unknown as { __lcp: number }).__lcp = 0
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) (window as unknown as { __lcp: number }).__lcp = e.startTime
    }).observe({ type: 'largest-contentful-paint', buffered: true })
  })
  const debut = Date.now()
  await page.goto(url)
  await page.locator('button.ligne').first().waitFor({ state: 'visible', timeout: 120_000 })
  ligne.push(Date.now() - debut)
  await page.waitForTimeout(500)
  lcp.push(await page.evaluate(() => (window as unknown as { __lcp: number }).__lcp))
  octets.push(total)
  await contexte.close()
}
await navigateur.close()
console.log(
  JSON.stringify({
    essais,
    lcpMs: Math.round(mediane(lcp)),
    premiereLigneMs: Math.round(mediane(ligne)),
    octetsTransferes: Math.round(mediane(octets)),
    brut: { lcp: lcp.map(Math.round), ligne, octets },
  }),
)
