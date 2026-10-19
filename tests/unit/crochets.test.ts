import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { argumentsGh, deciderCommit, deciderPlaywright, depotDe, lireCommande, messageDeploiement } from '../../outils/crochets-claude'
import { pourquoiDistPerime } from '../../outils/dist'
import { ETAPES, lancerPorte, type Etape, type Resultat } from '../../outils/etapes-porte'

/**
 * S302 CA5 (W2) : les crochets en Node. En bash, sans `jq`, la commande lue
 * était vide et la porte avant commit sortait en 0 sans rien lancer : un
 * commit passait sans porte, et sans le dire (vu le 19/10 sur le PC fixe).
 */
const entree = (command: string) => JSON.stringify({ tool_input: { command } })
const vert: Resultat[] = [{ nom: 'lint', ok: true, sortie: '' }]

describe('la porte avant commit', () => {
  it('lit la commande sans jq ; une entrée illisible ne vaut aucune commande', () => {
    expect(lireCommande(entree('git commit -m x'))).toBe('git commit -m x')
    expect(lireCommande('pas du json')).toBe('')
    expect(lireCommande('{}')).toBe('')
  })

  it('un commit lance la porte', () => {
    let lancee = 0
    deciderCommit('git commit -m "S302"', () => (lancee++, vert))
    expect(lancee).toBe(1)
  })

  it('une porte rouge refuse le commit, en nommant l’étape et sa sortie', () => {
    const rouge: Resultat[] = [
      { nom: 'lint', ok: true, sortie: '' },
      { nom: 'tests', ok: false, sortie: 'FAIL tests/unit/x.test.ts' },
    ]
    const sortie = deciderCommit('git commit -m x', () => rouge) as {
      hookSpecificOutput: { permissionDecision: string; permissionDecisionReason: string }
    }
    expect(sortie.hookSpecificOutput.permissionDecision).toBe('deny')
    expect(sortie.hookSpecificOutput.permissionDecisionReason).toContain('tests en échec')
    expect(sortie.hookSpecificOutput.permissionDecisionReason).toContain('FAIL tests/unit/x.test.ts')
  })

  it('une porte verte laisse passer, et le dit', () => {
    expect(deciderCommit('git commit -m x', () => vert)).toEqual({
      systemMessage: 'Porte avant commit : lint, typecheck, tests unitaires, build et e2e au vert.',
    })
  })

  it('une autre commande passe sans lancer la porte (sinon, pas de rouge-puis-vert)', () => {
    let lancee = 0
    expect(deciderCommit('npx vitest run', () => (lancee++, vert))).toBeNull()
    expect(lancee).toBe(0)
  })
})

describe('les étapes de la porte', () => {
  const lancees: string[] = []
  const lanceur =
    (rouges: string[]) =>
    (e: Etape): Resultat => {
      lancees.push(e.nom)
      return { nom: e.nom, ok: !rouges.includes(e.nom), sortie: '' }
    }
  afterEach(() => {
    lancees.length = 0
  })

  it('dans l’ordre : lint, typecheck, tests, build, e2e', () => {
    lancerPorte(lanceur([]))
    expect(lancees).toEqual(['lint', 'typecheck', 'tests', 'build', 'build', 'e2e'])
  })

  it('les e2e ne tournent pas après une étape rouge', () => {
    lancerPorte(lanceur(['tests']))
    expect(lancees).not.toContain('e2e')
    expect(lancees).toContain('build')
  })

  it('un tsc -b rouge arrête le build : pas de vite build sur du code non vérifié', () => {
    lancerPorte(lanceur(['build']))
    expect(lancees.filter((n) => n === 'build')).toHaveLength(1)
  })

  it('chaque étape lance le JS d’un outil, jamais npx ni node_modules/.bin (W3)', () => {
    for (const e of ETAPES) {
      expect(e.args[0]).toMatch(/node_modules[\\/].+\.(js|mjs)$|typescript[\\/]bin[\\/]tsc$/)
      expect(e.args[0]).not.toMatch(/\.bin|npx/)
    }
  })
})

describe('dist/ à jour avant Playwright', () => {
  let dossier = ''
  afterEach(() => {
    rmSync(dossier, { recursive: true, force: true })
  })

  it('refuse un dist/ absent, puis plus vieux qu’une source ; laisse passer un dist/ neuf', () => {
    dossier = mkdtempSync(join(tmpdir(), 'dist-'))
    mkdirSync(join(dossier, 'src'))
    writeFileSync(join(dossier, 'src', 'a.ts'), '')
    expect(pourquoiDistPerime(dossier)).toContain('n’existe pas')
    mkdirSync(join(dossier, 'dist'))
    writeFileSync(join(dossier, 'dist', 'index.html'), '')
    const avant = new Date(Date.now() - 60_000)
    utimesSync(join(dossier, 'dist', 'index.html'), avant, avant)
    expect(pourquoiDistPerime(dossier)).toContain('src')
    const apres = new Date(Date.now() + 60_000)
    utimesSync(join(dossier, 'dist', 'index.html'), apres, apres)
    expect(pourquoiDistPerime(dossier)).toBeNull()
  })

  it('un tsconfig plus récent que dist/ le rend périmé aussi (le crochet bash le comparait déjà)', () => {
    dossier = mkdtempSync(join(tmpdir(), 'dist-'))
    mkdirSync(join(dossier, 'dist'))
    writeFileSync(join(dossier, 'dist', 'index.html'), '')
    const avant = new Date(Date.now() - 60_000)
    utimesSync(join(dossier, 'dist', 'index.html'), avant, avant)
    writeFileSync(join(dossier, 'tsconfig.app.json'), '{}')
    expect(pourquoiDistPerime(dossier)).toContain('tsconfig.app.json')
  })

  it('ne juge que Playwright, et jamais la sonde de la page publiée', () => {
    const perime = () => 'périmé'
    expect(deciderPlaywright('npm run build', undefined, perime)).toBeNull()
    expect(deciderPlaywright('MOUSSE_URL=https://x npx playwright test', undefined, perime)).toBeNull()
    expect(deciderPlaywright('$env:MOUSSE_URL = "https://x"; npx playwright test', undefined, perime)).toBeNull()
    expect(deciderPlaywright('npx playwright test', 'https://x', perime)).toBeNull()
    expect(deciderPlaywright('npx playwright test', undefined, perime)).toMatchObject({
      hookSpecificOutput: { permissionDecision: 'deny', permissionDecisionReason: 'périmé' },
    })
  })
})

describe('l’état du déploiement au démarrage', () => {
  const contexte = (s: unknown) => (s as { hookSpecificOutput: { additionalContext: string } }).hookSpecificOutput.additionalContext

  it('dit un main rouge, un main vert, et l’absence de gh', () => {
    expect(contexte(messageDeploiement([{ name: 'CI', conclusion: 'failure' }]))).toMatch(/^⚠ Déploiement de main EN ÉCHEC — CI: failure/)
    expect(contexte(messageDeploiement([{ name: 'CI', conclusion: 'success' }, { name: 'Pages', conclusion: null }]))).toBe(
      'Déploiement de main : CI: success · Pages: en cours',
    )
    expect(contexte(messageDeploiement(null))).toContain('gh absent')
    expect(contexte(messageDeploiement([]))).toContain('indisponible')
  })

  it('lit le dépôt depuis une URL https ou ssh', () => {
    expect(depotDe('https://github.com/Opaland/Brewery-map.git\n')).toBe('Opaland/Brewery-map')
    expect(depotDe('git@github.com:Opaland/Brewery-map.git')).toBe('Opaland/Brewery-map')
    expect(depotDe('https://exemple.org/x')).toBeNull()
  })

  it('ne se tait que sans dépôt distant ; une URL de mandataire laisse gh deviner (revue adverse S302)', () => {
    expect(argumentsGh('')).toBeNull()
    expect(argumentsGh('https://github.com/Opaland/Brewery-map.git')).toContain('Opaland/Brewery-map')
    const mandataire = argumentsGh('http://local_proxy@127.0.0.1:41234/git/Opaland/Brewery-map')
    expect(mandataire).not.toBeNull()
    expect(mandataire).not.toContain('--repo')
  })
})

describe('le lanceur .claude/hooks/crochet.mjs', () => {
  let dossier = ''
  afterEach(() => {
    rmSync(dossier, { recursive: true, force: true })
  })
  const lancer = (mjs: string, nom: string, stdin: string) =>
    spawnSync(process.execPath, [mjs, nom], { input: stdin, encoding: 'utf8' })

  it('laisse passer une commande qui n’est pas un commit, sans rien lancer', () => {
    const r = lancer('.claude/hooks/crochet.mjs', 'porte-avant-commit', entree('git status'))
    expect(r.status).toBe(0)
    expect(r.stdout).toBe('')
  })

  it('refuse le commit quand la porte ne peut pas démarrer (tsx absent) : une porte en panne ne laisse rien passer', () => {
    dossier = mkdtempSync(join(tmpdir(), 'crochet-'))
    mkdirSync(join(dossier, '.claude', 'hooks'), { recursive: true })
    copyFileSync('.claude/hooks/crochet.mjs', join(dossier, '.claude', 'hooks', 'crochet.mjs'))
    const mjs = join(dossier, '.claude', 'hooks', 'crochet.mjs')
    const commit = lancer(mjs, 'porte-avant-commit', entree('git commit -m x'))
    expect(JSON.parse(commit.stdout)).toMatchObject({ hookSpecificOutput: { permissionDecision: 'deny' } })
    expect(lancer(mjs, 'porte-avant-commit', entree('git status')).stdout).toBe('')
  })

  it('un crochet au nom inconnu ne se tait pas : il sort en erreur, avec la raison', () => {
    const r = lancer('.claude/hooks/crochet.mjs', 'inconnu', entree('git status'))
    expect(r.status).toBe(1)
    expect(r.stderr).toContain('crochet inconnu')
  })
})
