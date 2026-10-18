/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vite'
import base from './vite.config'

/**
 * Les tests sous Stryker (S239, mutation de nuit). Stryker instrumente les
 * fichiers de `src/core` dans son bac à sable : chaque texte y devient
 * `stryMutAct_…(…) ? "" : "texte"`, et le test des traductions, qui cherche
 * les appels `t('…')` dans le code, ne les trouve plus (29 « orphelines »,
 * première nuit du 18/10, reproduit avec `stryker run --dryRunOnly`). Ce test
 * garde les textes de l'interface, pas la logique du cœur : il reste dans la
 * porte et la CI, et sort seulement d'ici.
 */
export default mergeConfig(
  base,
  defineConfig({
    test: { exclude: ['tests/unit/i18n.test.ts', 'node_modules/**'] },
  }),
)
