import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { assertionsNues, attentesNonJustifiees, identifiantsMorts, identifiantsVises } from '../../outils/audit-e2e'

/** S278 (repris de Sentiers, `audit-e2e.mjs`) : ce qu'une suite verte peut cacher. */
describe('attentesNonJustifiees', () => {
  it('une attente sans commentaire juste au-dessus est relevée', () => {
    const texte = ['await page.goto("/")', 'await page.waitForTimeout(500)', '// une raison', 'await page.waitForTimeout(800)'].join('\n')
    expect(attentesNonJustifiees(texte)).toEqual([2])
  })
  it('une attente par setTimeout en promesse compte aussi (revue adverse S278)', () => {
    expect(attentesNonJustifiees('await new Promise((r) => setTimeout(r, 500))')).toEqual([1])
    expect(attentesNonJustifiees('await page . waitForTimeout (5)')).toEqual([1])
  })
  it('un commentaire de bloc ou une ligne vide entre les deux ne comptent pas comme raison', () => {
    expect(attentesNonJustifiees('// raison\n\nawait page.waitForTimeout(1)')).toEqual([3])
    expect(attentesNonJustifiees('   // raison, indentée\n   await page.waitForTimeout(1)')).toEqual([])
  })
})

describe('identifiantsVises et identifiantsMorts', () => {
  it('lit getByTestId et [data-testid="…"]', () => {
    expect(identifiantsVises(`page.getByTestId('liste'); q('[data-testid="fiche-note"]')`)).toEqual(['liste', 'fiche-note'])
  })
  it('quels que soient les guillemets et les espaces (revue adverse S278)', () => {
    const texte = 'getByTestId("a") getByTestId(`b`) getByTestId(\n  \'h\',\n) [data-testid=c] [data-testid=\'e\']'
    expect(identifiantsVises(texte)).toEqual(['a', 'b', 'h', 'c', 'e'])
  })
  it('un identifiant absent de src est mort ; un identifiant construit compte pour ses formes', () => {
    const src = 'data-testid="liste" data-testid={`theme-${valeur}`}'
    expect(identifiantsMorts(['liste', 'theme-clair', 'fiche-note'], src)).toEqual(['fiche-note'])
  })
})

describe('assertionsNues', () => {
  it('relève expect(x) sans comparaison, pas expect(x).toBe(y)', () => {
    const texte = ['expect(a)', 'expect(b).toBe(1)', 'await expect(c)', 'await expect(d).toBeVisible()', 'expect.soft(e)', 'await expect.poll(() => f).toBe(1)'].join('\n')
    expect(assertionsNues(texte)).toEqual([1, 3, 5])
  })
  it('ni .resolves, .not, void, ni une flèche ne rendent une assertion complète (revue adverse S278)', () => {
    const texte = ['await expect(a).resolves', 'expect(b).not', 'void expect(c)', "test('t', () => expect(d))", 'await expect(e).resolves.toBe(1)'].join('\n')
    expect(assertionsNues(texte)).toEqual([1, 2, 3, 4])
  })
  it('une comparaison sur plusieurs lignes n’est pas nue', () => {
    expect(assertionsNues('await expect\n  .poll(() => 1)\n  .toBe(1)')).toEqual([])
  })
})

describe('la suite réelle', () => {
  const dossier = 'tests/e2e'
  const fichiers = readdirSync(dossier).filter((f) => f.endsWith('.ts'))
  const src = [
    readFileSync('index.html', 'utf8'),
    ...readdirSync('src', { recursive: true, encoding: 'utf8' })
      .filter((f) => /\.tsx?$/.test(f))
      .map((f) => readFileSync(join('src', f), 'utf8')),
  ].join('\n')

  it('chaque attente fixe a sa raison juste au-dessus', () => {
    const relevees = fichiers.flatMap((f) => attentesNonJustifiees(readFileSync(join(dossier, f), 'utf8')).map((l) => `${f}:${String(l)}`))
    expect(relevees).toEqual([])
  })
  it('aucun identifiant visé n’est mort', () => {
    const vises = fichiers.flatMap((f) => identifiantsVises(readFileSync(join(dossier, f), 'utf8')))
    expect(vises.length).toBeGreaterThan(50)
    expect(identifiantsMorts([...new Set(vises)], src)).toEqual([])
  })
  it('aucune assertion nue', () => {
    const relevees = fichiers.flatMap((f) => assertionsNues(readFileSync(join(dossier, f), 'utf8')).map((l) => `${f}:${String(l)}`))
    expect(relevees).toEqual([])
  })
})
