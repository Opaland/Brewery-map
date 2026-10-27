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

  // S359 (#211) : des constantes dites dans la doc et dans le code. Les
  // phrases citées sont tenues mot pour mot : reformulées, elles se
  // réécrivent ici aussi.
  const constante = (fichier: string, nom: string): number => {
    const v = new RegExp(`const ${nom} = (\\d+)\\b`).exec(readFileSync(fichier, 'utf8'))?.[1]
    expect(v, `${fichier} : « const ${nom} = <nombre> » introuvable (ce test lit cette écriture-là)`).toBeDefined()
    return Number(v)
  }
  const PAIRES: readonly { doc: string; phrase: RegExp; facteur: number; fichier: string; nom: string }[] = [
    { doc: 'docs/ARCHITECTURE.md', phrase: /Les tuiles : (\d+) au plus/, facteur: 1, fichier: 'public/sw.js', nom: 'MAX_TUILES' },
    { doc: 'docs/ARCHITECTURE.md', phrase: /mais (\d+) s au plus quand le cache/, facteur: 1000, fichier: 'public/sw.js', nom: 'DELAI_RESEAU' },
    { doc: 'docs/ARCHITECTURE.md', phrase: /au zoom (\d+) au plus/, facteur: 1, fichier: 'src/Carte.tsx', nom: 'ZOOM_MAX' },
    { doc: 'docs/ARCHITECTURE.md', phrase: /attente de (\d+) s au plus/, facteur: 1000, fichier: 'src/main.tsx', nom: 'DELAI_COUCHE_MS' },
    { doc: 'docs/CONTINUITE.md', phrase: /Jusqu'à (\d+) tuiles/, facteur: 1, fichier: 'public/sw.js', nom: 'MAX_TUILES' },
    { doc: 'docs/CONTINUITE.md', phrase: /au bout de (\d+) s même si le réseau/, facteur: 1000, fichier: 'public/sw.js', nom: 'DELAI_RESEAU' },
    { doc: 'docs/DONNEES.md', phrase: /La carte s'arrête au zoom (\d+)/, facteur: 1, fichier: 'src/Carte.tsx', nom: 'ZOOM_MAX' },
  ]

  it.each(PAIRES)('$doc dit $nom ($fichier) (S359)', ({ doc, phrase, facteur, fichier, nom }) => {
    const attendu = constante(fichier, nom)
    const ecrit = phrase.exec(readFileSync(doc, 'utf8'))?.[1]
    expect(ecrit, `${doc} : phrase ${String(phrase)} introuvable (elle est tenue mot pour mot par ce test)`).toBeDefined()
    expect(Number(ecrit) * facteur, `${doc} : écrire ${String(attendu / facteur)} dans ${String(phrase)}, la valeur de ${nom} (${fichier})`).toBe(attendu)
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
    expect(engines, `package.json : écrire engines.node « >=${version} », la version de .nvmrc`).toBe(`>=${version}`)
    const workflows = readdirSync('.github/workflows').filter((f) => f.endsWith('.yml'))
    const versions = workflows.flatMap((f) =>
      [...readFileSync(`.github/workflows/${f}`, 'utf8').matchAll(/node-version: *['"]?([^'"\s]+)/g)].map((m) => `${f} : ${m[1]}`),
    )
    expect(versions.length, 'aucun « node-version: » dans .github/workflows (un « node-version-file » se lit à part : adapter ce test)').toBeGreaterThan(0)
    expect(versions.filter((v) => !v.endsWith(` : ${version}`)), `node-version des workflows ≠ .nvmrc (${version})`).toEqual([])
    for (const doc of ['README.md', 'CONTRIBUTING.md']) {
      // « Node 24 » ailleurs dans la doc est le poste de Cédric (S302, W9), pas la version du projet.
      expect(readFileSync(doc, 'utf8'), `${doc} : écrire « Node ${version} (\`.nvmrc\`) »`).toContain(`Node ${version} (\`.nvmrc\`)`)
    }
    expect(readFileSync('docs/REPRISE-POWERSHELL.md', 'utf8'), `docs/REPRISE-POWERSHELL.md : écrire « Git, Node ${version}, GitHub CLI »`).toContain(`Git, Node ${version}, GitHub CLI`)
  })

  it('le motif d’un département n’est écrit qu’une fois, dans src/core/schema.ts (S359)', () => {
    const fichiers = (dossier: string): string[] =>
      readdirSync(dossier, { recursive: true, encoding: 'utf8' })
        .filter((f) => /\.(tsx?|m?js)$/.test(f))
        .map((f) => `${dossier}/${f.replaceAll('\\', '/')}`)
    const copies = ['src', 'outils', 'build', 'tests', '.claude/hooks'].flatMap(fichiers).filter(
      (f) => !['src/core/schema.ts', 'tests/unit/jumeaux.test.ts'].includes(f) && /2\[AB\]|2\[A-B\]|2A\|2B/.test(readFileSync(f, 'utf8')),
    )
    expect(copies, 'reprendre MOTIF_DEPARTEMENT de src/core/schema.ts').toEqual([])
  })
})
