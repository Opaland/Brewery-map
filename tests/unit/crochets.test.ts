import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, utimesSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { argumentsGh, deciderCommit, deciderPlaywright, depotDe, estUnCommit, lireCommande, messageDeploiement } from '../../outils/crochets-claude'
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
      systemMessage: 'Porte avant commit : lint, typecheck, tests unitaires, garde de data/, build et e2e au vert.',
    })
  })

  // S306 (C2) : `git -C . commit` ou `git -c a=b commit` passaient sans porte,
  // le filtre de settings.json comme le motif `/git\s+commit/`.
  it('reconnaît un commit quelle que soit son écriture, et rien d’autre', () => {
    for (const c of [
      'git commit -m x',
      'git  commit -m x',
      'git -C . commit -m x',
      'git -C "C:/Users/Moretti Cédric/Documents/Claude/Mousse" commit -m x',
      'git -c user.name=x commit -m x',
      'git --no-pager commit',
      'git -c core.hooksPath=/dev/null -C . commit',
      'git.exe commit -q',
      '"C:/Program Files/Git/cmd/git.exe" commit',
      'npm test && git commit -m x',
      'npx vitest run; git -C . commit -F msg.txt',
      'GIT_AUTHOR_NAME=x git commit',
      // Revue adverse S306 : le `&` de cmd, les interpréteurs, les sous-shells.
      'git add . & git commit -m x',
      'bash -c "git commit -m x"',
      'sh -c "git add . && git commit"',
      'pwsh -Command "git commit -m x"',
      "powershell -c 'git commit -m x'",
      'cmd /c git commit',
      '(git commit -m x)',
      'echo $(git commit -m x)',
      '{ git commit -m x; }',
    ])
      expect(estUnCommit(c), c).toBe(true)
    for (const c of [
      'git status',
      'git commit-tree HEAD^{tree}',
      'git log --grep commit',
      'echo "git commit"',
      'git show HEAD --stat',
      'npx vitest run tests/unit/commit.test.ts',
      'git -C commit status',
      'npm run commit',
      'git log 2>&1 | head',
      'bash -c "git log --grep commit"',
    ])
      expect(estUnCommit(c), c).toBe(false)
  })

  it('un commit écrit `git -C . commit` lance la porte', () => {
    let lancee = 0
    deciderCommit('git -C . commit -m x', () => (lancee++, vert))
    expect(lancee).toBe(1)
  })

  it('settings.json lance le crochet de commit sur toute commande : un filtre `if` laissait passer `git -C . commit`', () => {
    const reglages = JSON.parse(readFileSync('.claude/settings.json', 'utf8')) as {
      hooks: { PreToolUse: { hooks: { command: string; if?: string }[] }[] }
    }
    const crochet = reglages.hooks.PreToolUse.flatMap((m) => m.hooks).find((h) => h.command.includes('porte-avant-commit'))
    expect(crochet).toBeDefined()
    expect(crochet?.if).toBeUndefined()
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

  // S306 (C3) : la garde de data/ tournait en CI seulement ; une ligne sans
  // accord ne rougissait qu'après le push.
  it('dans l’ordre : lint, typecheck, tests, garde de data/, build, e2e', () => {
    lancerPorte(lanceur([]))
    expect(lancees).toEqual(['lint', 'typecheck', 'tests', 'garde', 'build', 'build', 'e2e'])
  })

  it('une garde de data/ rouge empêche les e2e', () => {
    lancerPorte(lanceur(['garde']))
    expect(lancees).not.toContain('e2e')
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

  // S306 (C1) : trois runs tous workflows confondus ; une sonde de nuit rouge
  // déclenchait l'arrêt §9 à tort, trois nuits vertes cachaient une CI rouge.
  it('ne lit que le workflow de CI de main', () => {
    const args = argumentsGh('https://github.com/Opaland/Brewery-map.git') ?? []
    expect(args.slice(args.indexOf('--workflow'), args.indexOf('--workflow') + 2)).toEqual(['--workflow', 'ci.yml'])
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
    // S306 (C2) : en panne, le lanceur refuse aussi un commit écrit autrement.
    const autre = lancer(mjs, 'porte-avant-commit', entree('git -C . commit -m x'))
    expect(JSON.parse(autre.stdout)).toMatchObject({ hookSpecificOutput: { permissionDecision: 'deny' } })
  })

  it('un crochet au nom inconnu ne se tait pas : il sort en erreur, avec la raison', () => {
    const r = lancer('.claude/hooks/crochet.mjs', 'inconnu', entree('git status'))
    expect(r.status).toBe(1)
    expect(r.stderr).toContain('crochet inconnu')
  })
})
