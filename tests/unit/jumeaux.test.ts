import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { hotesTiers, POLITIQUE } from '../../build/csp'
import { CACHE_TUILES } from '../../src/cacheTuiles'
import { ELEMENTS_MAX } from '../../src/core/sauvegarde'

/**
 * S285 : des règles écrites à deux endroits, trouvées par l'agent
 * `chasseur-de-jumeaux`, et tenues d'accord ici (CLAUDE.md §4ter).
 */
describe('les règles jumelles', () => {
  it('l’hôte des tuiles est le même pour la carte, le service worker et la politique de sécurité', () => {
    const carte = /tiles: \['https:\/\/([^/]+)\//.exec(readFileSync('src/Carte.tsx', 'utf8'))?.[1]
    const sw = /function estTuile\(url\) \{\s*return url\.hostname === '([^']+)'/.exec(readFileSync('public/sw.js', 'utf8'))?.[1]
    expect(carte).toBeDefined()
    // Changé dans la carte seule, le service worker cesserait en silence
    // de garder les tuiles (la CSP, elle, casserait bruyamment).
    expect(sw).toBe(carte)
    expect(hotesTiers(POLITIQUE)).toContain(carte)
  })

  it('la borne d’une sauvegarde reste bien au-dessus des brasseries de l’application', () => {
    const fiches = (JSON.parse(readFileSync('data/breweries.json', 'utf8')) as unknown[]).length
    const osm = (JSON.parse(readFileSync('src/donnees-osm/brasseries-osm.json', 'utf8')) as { brasseries: unknown[] }).brasseries.length
    expect(fiches + osm).toBeGreaterThan(1000)
    expect(ELEMENTS_MAX).toBeGreaterThan(2 * (fiches + osm))
  })

  it('« Tout effacer » vide le cache que le service worker remplit (S295)', () => {
    const sw = /const CACHE_TUILES = '([^']+)'/.exec(readFileSync('public/sw.js', 'utf8'))?.[1]
    // Renommé dans le service worker seul, l'effacement viserait un cache vide.
    expect(sw).toBe(CACHE_TUILES)
  })

  // S359 (#211) : des constantes dites dans la doc et dans le code.
  const constante = (fichier: string, nom: string): number => {
    const v = new RegExp(`const ${nom} = (\\d+)`).exec(readFileSync(fichier, 'utf8'))?.[1]
    expect(v, `${nom} introuvable dans ${fichier}`).toBeDefined()
    return Number(v)
  }

  it('docs/ARCHITECTURE.md dit les valeurs du service worker, de la carte et du premier rendu (S359)', () => {
    const archi = readFileSync('docs/ARCHITECTURE.md', 'utf8')
    const lu = (motif: RegExp): number => {
      const v = motif.exec(archi)?.[1]
      expect(v, `docs/ARCHITECTURE.md : ${String(motif)} introuvable`).toBeDefined()
      return Number(v)
    }
    expect(lu(/Les tuiles : (\d+) au plus/), 'docs/ARCHITECTURE.md : « Les tuiles : N au plus » doit valoir MAX_TUILES (public/sw.js)').toBe(constante('public/sw.js', 'MAX_TUILES'))
    expect(lu(/mais (\d+) s au plus quand le cache/) * 1000, 'docs/ARCHITECTURE.md : « mais N s au plus » doit valoir DELAI_RESEAU (public/sw.js)').toBe(constante('public/sw.js', 'DELAI_RESEAU'))
    expect(lu(/au zoom (\d+) au plus/), 'docs/ARCHITECTURE.md : « au zoom N au plus » doit valoir ZOOM_MAX (src/Carte.tsx)').toBe(constante('src/Carte.tsx', 'ZOOM_MAX'))
    expect(lu(/attente de (\d+) s au plus/) * 1000, 'docs/ARCHITECTURE.md : « attente de N s au plus » doit valoir DELAI_COUCHE_MS (src/main.tsx)').toBe(constante('src/main.tsx', 'DELAI_COUCHE_MS'))
  })

  it('docs/PORTE.md dit le délai du crochet de .claude/settings.json (S359)', () => {
    const reglages = JSON.parse(readFileSync('.claude/settings.json', 'utf8')) as {
      hooks: { PreToolUse: { hooks: { command: string; timeout: number }[] }[] }
    }
    const crochet = reglages.hooks.PreToolUse.flatMap((m) => m.hooks).find((h) => h.command.includes('porte-avant-commit'))
    const ecrit = /Le délai du hook passe de \d+ s à \*\*(\d+) s\*\*/.exec(readFileSync('docs/PORTE.md', 'utf8'))?.[1]
    expect(crochet, 'crochet porte-avant-commit introuvable dans .claude/settings.json').toBeDefined()
    expect(Number(ecrit), 'docs/PORTE.md : « passe de … à **N s** » doit valoir le timeout du crochet').toBe(crochet?.timeout)
  })

  it('une seule version de Node : .nvmrc, engines, workflows, README, CONTRIBUTING (S359)', () => {
    const version = readFileSync('.nvmrc', 'utf8').trim()
    expect(version).toMatch(/^\d+$/)
    const engines = (JSON.parse(readFileSync('package.json', 'utf8')) as { engines: { node: string } }).engines.node
    expect(engines, 'package.json : engines.node').toBe(`>=${version}`)
    const workflows = readdirSync('.github/workflows').filter((f) => f.endsWith('.yml'))
    const versions = workflows.flatMap((f) =>
      [...readFileSync(`.github/workflows/${f}`, 'utf8').matchAll(/node-version: *['"]?([^'"\s]+)/g)].map((m) => `${f} : ${m[1]}`),
    )
    expect(versions.length).toBeGreaterThan(0)
    expect(versions.filter((v) => !v.endsWith(` : ${version}`)), `node-version des workflows ≠ .nvmrc (${version})`).toEqual([])
    for (const doc of ['README.md', 'CONTRIBUTING.md']) {
      expect(readFileSync(doc, 'utf8'), `${doc} : écrire « Node ${version} (\`.nvmrc\`) »`).toContain(`Node ${version} (\`.nvmrc\`)`)
    }
  })

  it('le motif d’un département n’est écrit qu’une fois, dans src/core/schema.ts (S359)', () => {
    const fichiers = (dossier: string): string[] =>
      readdirSync(dossier, { recursive: true, encoding: 'utf8' })
        .filter((f) => /\.tsx?$/.test(f))
        .map((f) => `${dossier}/${f.replaceAll('\\', '/')}`)
    const copies = [...fichiers('src'), ...fichiers('outils')].filter(
      (f) => f !== 'src/core/schema.ts' && /2\[AB\]|2A\|2B/.test(readFileSync(f, 'utf8')),
    )
    expect(copies, 'reprendre MOTIF_DEPARTEMENT de src/core/schema.ts').toEqual([])
  })
})
