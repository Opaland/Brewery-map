import { expect, test } from '@playwright/test'
import { sansTuiles, versLaCarte } from './reseau'

/**
 * La carte ne se charge qu'à l'approche (S20, persona Bernard). Mesuré le
 * 16/10, Lighthouse 13.5 mobile simulé : performance 64 → 100, blocage du
 * fil principal 1 640 ms → 10 ms, poids au chargement 389 → 101 Kio. Ce test
 * garde la cause, pas le score : le chunk de la carte n'est pas demandé tant
 * que la carte n'approche pas de l'écran.
 */
test('au chargement, la carte n’est pas téléchargée ; elle l’est quand on y arrive', async ({
  page,
}) => {
  await sansTuiles(page)
  const demandes: string[] = []
  page.on('request', (r) => demandes.push(new URL(r.url()).pathname))
  const chunkCarte = () => demandes.filter((p) => /\/assets\/Carte-[^/]*\.js$/.test(p))

  await page.goto('/')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  // Le temps qu'un chargement eager aurait eu pour partir (il partait au
  // montage, avant même la liste).
  await page.waitForLoadState('networkidle')
  expect(chunkCarte()).toEqual([])
  await expect(page.getByTestId('carte-en-attente')).toHaveText(
    'La carte se charge quand vous y arrivez.',
  )

  await versLaCarte(page)
  expect(chunkCarte()).toHaveLength(1)
})
