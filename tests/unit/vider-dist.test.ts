import { existsSync, mkdirSync, mkdtempSync, readdirSync, writeFileSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { build } from 'vite'
import { viderDist } from '../../build/vider-dist'

/**
 * W9 (vu le 20/10 sur le PC fixe, S304) : sous Node 24 et Windows,
 * `fs.rmSync` ne supprime rien dans un chemin non ASCII (« Cédric »), sans
 * erreur. Vite vide `dist/` par lui : les morceaux d'un build précédent
 * restaient, et `poids.spec.ts` en trouvait quatre. Le projet de test vit
 * dans un dossier accentué, comme le dépôt sur ce poste. Sous Linux, le
 * test passe aussi sans le plugin : il ne rougit que sous Windows.
 */
const dossiers: string[] = []

afterEach(async () => {
  for (const d of dossiers.splice(0)) await rm(d, { recursive: true, force: true })
})

describe('le build vide dist/ avant d’écrire', () => {
  it('retire un fichier d’un build précédent, même dans un chemin accentué', async () => {
    const racine = mkdtempSync(join(tmpdir(), 'mousse-Cédric-'))
    dossiers.push(racine)
    writeFileSync(join(racine, 'index.js'), 'console.log(1)\n')
    mkdirSync(join(racine, 'dist', 'assets'), { recursive: true })
    const ancien = join(racine, 'dist', 'assets', 'Carte-ancien.js')
    writeFileSync(ancien, '// build précédent')
    await build({
      root: racine,
      configFile: false,
      logLevel: 'silent',
      plugins: [viderDist()],
      build: {
        outDir: join(racine, 'dist'),
        lib: { entry: join(racine, 'index.js'), formats: ['es'], fileName: 'x' },
      },
    })
    expect(existsSync(ancien)).toBe(false)
    expect(readdirSync(join(racine, 'dist')).some((f) => f.startsWith('x.'))).toBe(true)
  })
})
