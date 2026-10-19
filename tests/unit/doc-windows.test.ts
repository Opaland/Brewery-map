import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/**
 * S302 CA6 (W4) : la doc écrivait `VAR=valeur commande` et `&&`, que
 * PowerShell 5.1 refuse, et le Chromium du conteneur cloud. Le 19/10, sur le
 * PC fixe, il fallait tout traduire de tête. README et CONTRIBUTING disent
 * donc la porte sous PowerShell.
 */
const section = (fichier: string): string => {
  const texte = readFileSync(fichier, 'utf8')
  const debut = texte.search(/^#{2,3} Sous Windows \(PowerShell\)$/m)
  expect(debut, `${fichier} : section « Sous Windows (PowerShell) » absente`).toBeGreaterThanOrEqual(0)
  const corps = texte.indexOf('\n', debut)
  const suite = texte.slice(corps).search(/^#{1,3} /m)
  return suite < 0 ? texte.slice(debut) : texte.slice(debut, corps + suite)
}

describe('la doc sous Windows', () => {
  for (const fichier of ['README.md', 'CONTRIBUTING.md']) {
    it(`${fichier} dit la porte en PowerShell, sans syntaxe bash`, () => {
      const s = section(fichier)
      expect(s).toContain('npm run porte')
      expect(s).toContain('npx playwright install chromium')
      expect(s).toMatch(/\$env:[A-Z_]+ = "/)
      expect(s).toContain('core.autocrlf')
      expect(s).not.toContain('/opt/pw-browsers')
      // La prose peut nommer `&&` ; les blocs PowerShell ne l'écrivent pas.
      const blocs = [...s.matchAll(/```powershell\n([\s\S]*?)```/g)].map((m) => m[1])
      expect(blocs.length).toBeGreaterThan(0)
      for (const b of blocs) {
        expect(b).not.toContain('&&')
        expect(b).not.toMatch(/^[A-Z_]+=\S+ /m)
      }
    })
  }
})
