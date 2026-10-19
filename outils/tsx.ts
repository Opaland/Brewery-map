import { fileURLToPath } from 'node:url'

/**
 * Le JS de tsx, pour relancer un outil TypeScript par
 * `execFileSync(process.execPath, [TSX_CLI, outil, …])`, sous Linux comme
 * sous Windows (S302, W3). Ni `npx` (`npx.cmd` sous Windows, qu'`execFileSync`
 * sans shell refuse depuis Node 22), ni `node_modules/.bin/tsx` (un script
 * shell, que Windows ne lance pas).
 */
export const TSX_CLI = fileURLToPath(new URL('../node_modules/tsx/dist/cli.mjs', import.meta.url))
