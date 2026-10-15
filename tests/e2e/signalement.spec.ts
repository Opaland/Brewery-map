import { expect, test } from '@playwright/test'
import { sansTuiles } from './reseau'

const ANSE = { latitude: 45.9367, longitude: 4.7208 }

test.beforeEach(async ({ page }) => {
  await sansTuiles(page)
})

test.describe('« Signaler une erreur » (Une brasserie)', () => {
  test.use({ geolocation: ANSE, permissions: ['geolocation'] })

  test('la fiche ouvre une issue préremplie, sans la position ni la distance', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('autour-de-moi').click()
    await expect(page.getByTestId('compte')).toContainText('de votre position')
    const premiere = page.locator('button.ligne').first()
    const nom = (await premiere.getAttribute('data-nom')) ?? ''
    // La distance telle qu'affichée sur la ligne : elle ne doit pas partir.
    const lieu = (await premiere.locator('.ligne-lieu').textContent()) ?? ''
    const distance = lieu.split('·').at(-1)?.trim() ?? ''
    expect(distance).toMatch(/km|m$/)
    await premiere.click()

    const lien = page.getByTestId('fiche-signaler').getByRole('link')
    await expect(lien).toHaveText('Signaler une erreur sur cette fiche')
    await expect(lien).toHaveAttribute('target', '_blank')
    await expect(lien).toHaveAttribute('rel', /noreferrer/)
    const href = (await lien.getAttribute('href')) ?? ''
    const u = new URL(href)
    expect(u.origin + u.pathname).toBe('https://github.com/Opaland/Brewery-map/issues/new')
    expect(u.searchParams.get('title')).toContain(nom)
    // Lu par `URL`, pas par decodeURIComponent : celui-ci laisse les « + »
    // des espaces, et « 12,3 km » n'était jamais trouvé (vu passer avec la
    // distance injectée dans le lien, S10).
    const tout = [...u.searchParams.values()].join('\n')
    expect(tout).not.toContain('45.93')
    expect(tout).not.toContain('4.72')
    expect(tout).not.toContain(distance)
    expect(tout).not.toMatch(/position/i)
  })

  test('l’écran dit qu’il faut un compte GitHub et que le signalement est public', async ({
    page,
  }) => {
    await page.goto('/')
    await page.locator('button.ligne').first().click()
    const aide = page.getByTestId('fiche-signaler')
    await expect(aide).toContainText('compte GitHub')
    await expect(aide).toContainText('sera public')
  })

  test('une brasserie absente se signale depuis le pied de page', async ({ page }) => {
    await page.goto('/')
    const lien = page.getByTestId('signaler-absente').getByRole('link')
    const href = (await lien.getAttribute('href')) ?? ''
    expect(new URL(href).searchParams.get('title')).toBe('Brasserie absente : ')
    await expect(page.getByTestId('signaler-absente')).toContainText('signalement public')
  })
})
