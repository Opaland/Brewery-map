/**
 * Fabrique `public/og.jpg`, l'image d'aperçu d'un lien partagé (S28 ; audit
 * S26 m5 : sans elle, un lien collé dans une messagerie s'affichait nu).
 * 1200 × 630, le format attendu par Open Graph. Dessinée dans le style du
 * design system v2, avec une capture de l'application (`docs/captures/`,
 * refaites par `outils/captures.ts`).
 *
 * Usage : `npx tsx outils/image-partage.ts` (après les captures).
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from '@playwright/test'

const police = async (fichier: string) =>
  (await readFile(path.resolve('node_modules', fichier))).toString('base64')

const fraunces = await police('@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2')
const inter = await police('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')
const capture = (await readFile('docs/captures/telephone-accueil.png')).toString('base64')
const logo = (await readFile('public/icon.svg')).toString('base64')

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: F; src: url(data:font/woff2;base64,${fraunces}); font-weight: 100 900; }
@font-face { font-family: I; src: url(data:font/woff2;base64,${inter}); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; overflow: hidden; font-family: I, sans-serif;
  background: linear-gradient(135deg, #7a3410 0%, #9c4a17 60%, #b5651d 100%); color: #fff; display: flex; }
.texte { flex: 1; padding: 72px 0 72px 80px; display: flex; flex-direction: column; justify-content: center; gap: 28px; }
.marque { display: flex; align-items: center; gap: 20px; }
.marque img { width: 84px; height: 84px; border-radius: 20px; box-shadow: 0 6px 20px rgba(0,0,0,.3); }
h1 { font-family: F; font-weight: 750; font-size: 76px; line-height: 1; letter-spacing: -0.01em; }
.promesse { font-family: F; font-size: 40px; line-height: 1.2; font-weight: 600; max-width: 600px; }
.preuves { font-size: 24px; line-height: 1.5; opacity: .95; }
.telephone { width: 380px; margin: 40px 70px 0 0; align-self: flex-start; border-radius: 36px 36px 0 0;
  overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,.35); border: 10px solid #1f1a15; border-bottom: none; }
.telephone img { width: 100%; display: block; }
</style></head><body>
<div class="texte">
  <div class="marque"><img src="data:image/svg+xml;base64,${logo}" alt=""><h1>Mousse de Poche</h1></div>
  <p class="promesse">Avant de faire 20 km : savoir si on peut y boire une bière.</p>
  <p class="preuves">Toute la France · chaque fiche avec sa source<br>Sans compte · sans traceur · hors connexion</p>
</div>
<div class="telephone"><img src="data:image/png;base64,${capture}" alt=""></div>
</body></html>`

const navigateur = await chromium.launch(
  process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
)
try {
  const page = await navigateur.newPage({ viewport: { width: 1200, height: 630 } })
  await page.setContent(html)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 86 })
} finally {
  await navigateur.close()
}
