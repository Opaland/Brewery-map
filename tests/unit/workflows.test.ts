import { readdirSync, readFileSync } from 'node:fs'
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
