import { echecs, lancerPorte, lanceurReel } from './etapes-porte'

/** `npm run porte` : la porte complète, étape par étape (S302, W2). */
const resultats = lancerPorte((etape) => {
  process.stdout.write(`… ${etape.nom}\n`)
  return lanceurReel(etape)
})
for (const r of resultats.filter((x) => !x.ok)) console.error(`\n=== ${r.nom} ===\n${r.sortie}`)
const rouges = echecs(resultats)
if (rouges.length > 0) {
  console.error(`\nPorte : ${rouges.join(', ')} en échec.`)
  process.exit(1)
}
console.log('Porte : lint, typecheck, tests unitaires, garde de data/, build et e2e au vert.')
