import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { choisirLangue, langueDe, t } from '../../src/i18n'
import { EN } from '../../src/textes/en'
import { DONNEES, NOUVEAUTES } from '../../src/core/nouveautes'
import { SANS_COMPTE, SUITE_SIGNALEMENT } from '../../src/core/signalement'
import { CATEGORIES } from '../../src/core/categories'
import { RAISONS } from '../../src/core/sauvegarde'
import { JOURS } from '../../src/core/horaires'
import { TYPES_BIERE } from '../../src/core/bieres'
import { LEXIQUE, LEXIQUE_BIERES } from '../../src/core/lexique'
import { MESSAGES_LOCALISATION } from '../../src/localisation'
import { NOTE_COMMUNE_DEDUITE, NOTE_OSM } from '../../src/core/osm-france'

/**
 * Les textes passés à `t()` par une constante, que la lecture du code ne
 * voit pas : listés ici, et exigés comme les autres.
 */
const CLES_PAR_CONSTANTE = [
  ...Object.values(CATEGORIES),
  DONNEES.phrase, ...NOUVEAUTES.map((n) => n.texte), SANS_COMPTE, SUITE_SIGNALEMENT, ...Object.values(RAISONS),
  ...JOURS.map((j) => j.nom),
  ...TYPES_BIERE.flatMap((ty) => [ty.libelle, ty.explication]),
  ...LEXIQUE.map((m) => m.sens),
  ...LEXIQUE_BIERES.map((m) => m.sens),
  ...Object.values(MESSAGES_LOCALISATION),
  NOTE_OSM,
  NOTE_COMMUNE_DEDUITE,
]

/** Les clés de tous les appels `t('…')` ou `t("…")` du code de src/. */
function clesDuCode(): Set<string> {
  const cles = new Set<string>()
  const parcourir = (dossier: string) => {
    for (const e of readdirSync(dossier, { withFileTypes: true })) {
      const chemin = `${dossier}/${e.name}`
      if (e.isDirectory()) parcourir(chemin)
      else if (/\.(ts|tsx)$/.test(e.name) && !chemin.includes('/textes/') && chemin !== 'src/i18n.ts') {
        const code = readFileSync(chemin, 'utf8')
        for (const m of code.matchAll(/\bt\(\s*'((?:[^'\\]|\\.)*)'/g)) cles.add(m[1].replace(/\\'/g, "'"))
        for (const m of code.matchAll(/\bt\(\s*"((?:[^"\\]|\\.)*)"/g)) cles.add(m[1].replace(/\\"/g, '"'))
      }
    }
  }
  parcourir('src')
  for (const c of CLES_PAR_CONSTANTE) cles.add(c)
  return cles
}

describe('l’interface en anglais (S48)', () => {
  it('chaque texte de l’interface a sa traduction, et aucune traduction n’est orpheline', () => {
    const cles = clesDuCode()
    const manquantes = [...cles].filter((c) => !(c in EN))
    const orphelines = Object.keys(EN).filter((c) => !cles.has(c))
    expect(manquantes).toEqual([])
    expect(orphelines).toEqual([])
  })

  it('les paramètres d’un texte sont les mêmes dans les deux langues', () => {
    const params = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort()
    for (const [fr, en] of Object.entries(EN)) expect(params(en), fr).toEqual(params(fr))
  })

  it('la langue : le français d’abord, l’anglais seulement quand il est prêt', () => {
    expect(langueDe(['en-US', 'fr-FR'], false)).toBe('fr')
    expect(langueDe(['en-US'], true)).toBe('en')
    expect(langueDe(['de-DE', 'fr-FR'], true)).toBe('fr')
    expect(langueDe(['de-DE'], true)).toBe('fr')
  })

  it('t remplace les paramètres, et rend le français quand la langue l’est', () => {
    choisirLangue('fr')
    expect(t('{n} brasseries', { n: 3 })).toBe('3 brasseries')
  })
})
