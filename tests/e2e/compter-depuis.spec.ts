import { expect, test } from './position'
import { sansTuiles } from './reseau'

/**
 * S295, Marie : « Lyon » tapé dans la recherche de brasseries gardait
 * Brignais comme départ. La page propose d'en partir ; le choix exact se
 * fait dans la liste des communes, rien n'est deviné.
 */
test('une commune tapée dans la recherche se propose comme point de départ', async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await page.getByTestId('recherche').fill('lyon')
  const aide = page.getByTestId('compter-depuis')
  await expect(aide).toContainText('Les distances sont comptées depuis Brignais.')
  await aide.getByRole('button', { name: 'Compter depuis « lyon »' }).click()
  const champ = page.getByTestId('commune-depart')
  await expect(champ).toBeFocused()
  await expect(champ).toHaveValue('lyon')
  await expect(page.getByRole('option').first()).toBeVisible()
  await champ.press('Enter')
  await expect(page.getByTestId('depart').locator('legend')).toContainText('Point de départ : Lyon')
  // Le départ choisi, la proposition se retire.
  await expect(aide).toHaveCount(0)
  // Le champ, remonté pour le nouveau départ, ne reprend pas le focus : la
  // demande est ancienne (revue adverse S295).
  await expect(page.getByTestId('commune-depart')).not.toBeFocused()
})

test('un nom de brasserie tapé ne propose rien', async ({ page }) => {
  await sansTuiles(page)
  await page.goto('/')
  await page.getByTestId('recherche').fill('ninkasi')
  await expect(page.locator('button.ligne').first()).toBeVisible()
  await expect(page.getByTestId('compter-depuis')).toHaveCount(0)
})
