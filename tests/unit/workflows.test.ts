import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * S334 (revue globale du 19/10, C6 à C9) : ce que le relecteur de workflows
 * vérifiait à la main, tenu par un test.
 */
const workflows = readdirSync('.github/workflows')
  .filter((f) => f.endsWith('.yml'))
  .map((f) => ({ f, texte: readFileSync(`.github/workflows/${f}`, 'utf8') }))

describe('les workflows', () => {
  it('C7 : chaque action est épinglée par un SHA complet, l’étiquette en commentaire', () => {
    const mal = workflows.flatMap(({ f, texte }) =>
      [...texte.matchAll(/uses:\s*([^\s#]+)(.*)$/gm)]
        .filter((m) => !/@[0-9a-f]{40}$/.test(m[1]) || !/#\s*v\d/.test(m[2]))
        .map((m) => `${f} : ${m[1]}`),
    )
    expect(mal).toEqual([])
  })

  it('C7 : Dependabot surveille les actions', () => {
    const d = readFileSync('.github/dependabot.yml', 'utf8')
    expect(d).toMatch(/package-ecosystem:\s*["']?github-actions/)
  })

  it('S351 : Dependabot propose npm une fois par mois, groupé, sans les majeures', () => {
    // Le bloc entier, ligne à ligne et sans commentaires : des expressions
    // éparses laissaient passer un groupe vide, un `ignore` en commentaire
    // ou inversé avec le groupe (revue adverse S351, sept mutations).
    const lignes = readFileSync('.github/dependabot.yml', 'utf8')
      .split('\n')
      .map((l) => l.replace(/\s+#.*$/, '').trimEnd())
      .filter((l) => l.trim() !== '' && !l.trim().startsWith('#'))
    const debut = lignes.indexOf('  - package-ecosystem: npm')
    expect(debut).toBeGreaterThan(-1)
    const fin = lignes.findIndex((l, i) => i > debut && l.startsWith('  - '))
    expect(lignes.slice(debut, fin === -1 ? undefined : fin)).toEqual([
      '  - package-ecosystem: npm',
      '    directory: /',
      '    schedule:',
      '      interval: monthly',
      '    open-pull-requests-limit: 1',
      '    groups:',
      '      mineures-et-correctifs:',
      '        patterns: ["*"]',
      '        update-types: ["minor", "patch"]',
      '    ignore:',
      '      - dependency-name: "*"',
      '        update-types: ["version-update:semver-major"]',
    ])
  })

  it('C8 : le déploiement de Pages ne coupe pas une publication en cours', () => {
    const ci = workflows.find((w) => w.f === 'ci.yml')?.texte ?? ''
    expect(ci).toMatch(/group:\s*pages/)
    expect(ci).not.toMatch(/group:\s*pages\s*\n(?:\s*#.*\n)*\s*cancel-in-progress:\s*true/)
  })

  it('C9 : la sonde de la page publiée reçoit l’empreinte du build de ce commit', () => {
    const ci = workflows.find((w) => w.f === 'ci.yml')?.texte ?? ''
    const sonde = ci.slice(ci.indexOf('\n  page-publiee:'))
    // Calculée avant la sonde, et jamais vide (revue adverse S334 : vide, la sonde se taisait).
    const calcul = sonde.indexOf('echo "MOUSSE_EMPREINTE=$E"')
    expect(calcul).toBeGreaterThan(-1)
    expect(sonde.indexOf('test -n "$E"')).toBeGreaterThan(-1)
    expect(sonde.indexOf('test -n "$E"')).toBeLessThan(calcul)
    expect(calcul).toBeLessThan(sonde.indexOf('Sonder la page publiée'))
    expect(readFileSync('tests/e2e/page-deployee.spec.ts', 'utf8')).toMatch(/process\.env\['MOUSSE_EMPREINTE'\]/)
  })

  it('C9 : chaque job de chaque workflow a son timeout-minutes (revue S334 : pas seulement ci.yml)', () => {
    const jobs = workflows.flatMap(({ f, texte }) =>
      texte
        .slice(texte.indexOf('\njobs:'))
        .split(/\n {2}(?=[\w-]+:\n)/)
        .slice(1)
        .map((j) => ({ nom: `${f} : ${j.split(':')[0] ?? ''}`, j })),
    )
    expect(jobs.length).toBeGreaterThan(6)
    expect(jobs.filter(({ j }) => !/\n {4}timeout-minutes:/.test(j)).map(({ nom }) => nom)).toEqual([])
  })
})

describe('visuel-references.yml : le job qui pousse ne committe que des images ordinaires (S360, #212)', () => {
  const texte = readFileSync('.github/workflows/visuel-references.yml', 'utf8')
  const job = texte.slice(texte.indexOf('\n  commit:'))
  const NOM = 'Refuser ce qui n’est pas une image ordinaire'
  // Le script de l'étape, tel que la CI l'exécute (bloc `run: |`, indentation retirée).
  const script = (() => {
    const debut = job.indexOf(`- name: ${NOM}`)
    if (debut < 0) return ''
    const lignes = job.slice(debut).split('\n')
    const run = lignes.findIndex((l) => l.trim() === 'run: |')
    const corps: string[] = []
    for (const l of lignes.slice(run + 1)) {
      if (l.trim() !== '' && !l.startsWith('          ')) break
      corps.push(l.slice(10))
    }
    return corps.join('\n')
  })()
  const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0])

  const essayer = (poser: (dossier: string, racine: string) => void): boolean => {
    const racine = mkdtempSync(join(tmpdir(), 's360-'))
    const dossier = join(racine, 'tests/e2e/visuel.spec.ts-snapshots')
    mkdirSync(dossier, { recursive: true })
    writeFileSync(join(dossier, 'ok-mobile.png'), PNG)
    poser(dossier, racine)
    try {
      execFileSync('bash', ['-e', '-c', script], { cwd: racine, stdio: 'pipe' })
      return true
    } catch {
      return false
    } finally {
      rmSync(racine, { recursive: true, force: true })
    }
  }

  it('l’étape existe et vient avant le git add', () => {
    expect(script, `étape « ${NOM} » introuvable dans le job commit`).not.toBe('')
    expect(job.indexOf(`- name: ${NOM}`)).toBeLessThan(job.indexOf("git add 'tests/e2e"))
  })

  it('des PNG ordinaires passent', () => {
    expect(essayer(() => undefined)).toBe(true)
  })

  it('un lien symbolique est refusé', () => {
    expect(
      essayer((dossier, racine) => {
        writeFileSync(join(racine, 'secret'), PNG)
        symlinkSync(join(racine, 'secret'), join(dossier, 'lien.png'))
      }),
    ).toBe(false)
  })

  it('le dossier lui-même en lien symbolique est refusé (revue adverse S360)', () => {
    expect(
      essayer((dossier, racine) => {
        const ailleurs = join(racine, 'ailleurs')
        mkdirSync(ailleurs)
        writeFileSync(join(ailleurs, 'ok-mobile.png'), PNG)
        rmSync(dossier, { recursive: true })
        symlinkSync(ailleurs, dossier)
      }),
    ).toBe(false)
  })

  it('le job qui pousse n’exécute que la garde et le commit : rien du dépôt ne voit son jeton', () => {
    const etapesRun = [...job.matchAll(/- name: ([^\n]+)\n {8}run:/g)].map((m) => m[1])
    expect(etapesRun).toEqual([NOM, 'Committer les références'])
    expect(job).not.toMatch(/\b(npm|npx|node|tsx)\b/)
  })

  it('un .png qui n’est pas une image, un autre fichier ou un dossier sont refusés', () => {
    expect(essayer((dossier) => { writeFileSync(join(dossier, 'faux.png'), 'pas une image'); })).toBe(false)
    expect(essayer((dossier) => { writeFileSync(join(dossier, 'note.txt'), PNG); })).toBe(false)
    expect(essayer((dossier) => { mkdirSync(join(dossier, 'sous-dossier')); })).toBe(false)
  })
})

describe('CODEOWNERS', () => {
  it('C6 : ce qui fait tourner la CI est sous la revue de Cédric', () => {
    const lignes = readFileSync('.github/CODEOWNERS', 'utf8')
      .split('\n')
      .map((l) => l.trim().split(/\s+/))
    for (const chemin of ['/package.json', '/package-lock.json', '/.claude/settings.json', '/playwright.config.ts', '/vite.config.ts'])
      expect(
        lignes.some(([motif, proprietaire]) => motif === chemin && proprietaire === '@Opaland'),
        chemin,
      ).toBe(true)
  })
})
