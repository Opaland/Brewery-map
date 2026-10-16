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
    'Carte : elle se charge quand vous faites défiler jusqu’ici.',
  )

  await versLaCarte(page)
  expect(chunkCarte()).toHaveLength(1)
})

/**
 * Le chunk de la carte peut ne jamais arriver : 4G faible, ou fichier haché
 * disparu après un déploiement. La liste, déjà lue, doit rester (revues S20 :
 * sans frontière d'erreur, React démontait toute la page, liste comprise).
 */
test('si la carte ne se charge pas, la liste reste et la page peut être rechargée', async ({
  page,
}) => {
  await sansTuiles(page)
  const CHUNK = /\/assets\/Carte-[^/]*\.js$/
  await page.route(CHUNK, (route) => route.abort())
  await page.goto('/')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()

  await page.getByTestId('carte-en-attente').scrollIntoViewIfNeeded()
  const echec = page.getByTestId('carte-echec')
  await expect(echec).toContainText('La carte n’a pas pu se charger')
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Mousse de Poche', level: 1 })).toBeVisible()

  // « Recharger la page » : le navigateur garde en mémoire l'échec d'un
  // import dynamique, un nouvel import le rendait tel quel.
  await page.unroute(CHUNK)
  await echec.getByRole('button', { name: 'Recharger la page' }).click()
  await expect(page.getByTestId('liste').getByRole('listitem').first()).toBeVisible()
  await versLaCarte(page)
  await expect(page.getByTestId('carte')).toBeVisible()
})
