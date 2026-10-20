import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { build } from 'vite'
import { decouperDonnees } from '../../build/decouper-donnees'
import { validerDonnees } from '../../build/valider-donnees'
import { LIGNES_REELLES } from './lignes-reelles'

/**
 * Le build échoue-t-il vraiment sur une donnée invalide ?
 *
 * On construit un projet minuscule qui importe `data/breweries.json`, avec le
 * plugin du dépôt, dans un dossier temporaire. Tester le plugin seul ne
 * prouverait pas qu'il bloque `vite build` : c'est la construction entière
 * qui doit rougir.
 */
const dossiers: string[] = []

/**
 * Un projet minuscule qui importe le fichier comme l'application depuis S294 :
 * en deux parts, `?premier-ecran` et `?suite` (la seconde à la demande).
 */
function projet(donnees: unknown): string {
  const racine = mkdtempSync(join(tmpdir(), 'mousse-build-'))
  dossiers.push(racine)
  mkdirSync(join(racine, 'data'))
  writeFileSync(join(racine, 'data', 'breweries.json'), JSON.stringify(donnees))
  writeFileSync(
    join(racine, 'index.js'),
    "import b from './data/breweries.json?premier-ecran'\nconsole.log(b.length)\nvoid import('./data/breweries.json?suite').then((s) => console.log(s.default.length))\n",
  )
  return racine
}

async function construire(racine: string): Promise<void> {
  await build({
    root: racine,
    configFile: false,
    logLevel: 'silent',
    plugins: [validerDonnees(), decouperDonnees()],
    build: {
      outDir: join(racine, 'dist'),
      lib: { entry: join(racine, 'index.js'), formats: ['es'], fileName: 'x' },
    },
  })
}

afterEach(() => {
  for (const d of dossiers.splice(0)) rmSync(d, { recursive: true, force: true })
})

describe('vite build et les données', () => {
  it('construit avec les lignes réelles', async () => {
    await expect(construire(projet(LIGNES_REELLES))).resolves.toBeUndefined()
  })

  it('échoue sur une ligne invalide, en la nommant', async () => {
    const invalide = [...LIGNES_REELLES, { ...LIGNES_REELLES[0], cat: 7 }]
    await expect(construire(projet(invalide))).rejects.toThrow(/4\.cat/)
  })

  // S294 : la ligne invalide est dans la suite (Finistère), que le premier
  // écran n'importe pas ; le build échoue quand même.
  it('échoue sur une ligne invalide de la suite', async () => {
    const invalide = [...LIGNES_REELLES, { ...LIGNES_REELLES[0], d: '29', cat: 7 }]
    await expect(construire(projet(invalide))).rejects.toThrow(/cat/)
  })

  it('échoue sur un JSON illisible', async () => {
    const racine = projet([])
    writeFileSync(join(racine, 'data', 'breweries.json'), '[{')
    await expect(construire(racine)).rejects.toThrow(/JSON illisible/)
  })
})
