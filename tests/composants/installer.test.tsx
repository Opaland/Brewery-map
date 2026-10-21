// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Installer } from '../../src/Installer'
import { ecouterInvitationTot } from '../../src/invitationInstallation'

/**
 * S333 (revue globale du 19/10, A29) : `beforeinstallprompt` peut arriver
 * avant le premier rendu ; le bouton « Installer » ne paraissait alors
 * jamais. L'écoute commence dans `main.tsx`, avant le rendu.
 */
beforeEach(() => {
  window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener: () => undefined, removeEventListener: () => undefined })) as unknown as typeof window.matchMedia
})
afterEach(() => {
  cleanup()
})

describe('Installer', () => {
  it('une invitation arrivée avant le rendu donne le bouton', () => {
    ecouterInvitationTot()
    const e = Object.assign(new Event('beforeinstallprompt', { cancelable: true }), {
      prompt: () => Promise.resolve(),
      userChoice: Promise.resolve({ outcome: 'dismissed' as const }),
    })
    window.dispatchEvent(e)
    render(<Installer />)
    expect(screen.getByTestId('bouton-installer')).toBeTruthy()
  })
})

describe('main.tsx', () => {
  it('écoute l’invitation avant le premier rendu (sans cet appel, le test ci-dessus ne prouve rien)', async () => {
    const { readFileSync } = await import('node:fs')
    const source = readFileSync('src/main.tsx', 'utf8')
    const ecoute = source.indexOf('ecouterInvitationTot()')
    expect(ecoute).toBeGreaterThan(-1)
    expect(ecoute).toBeLessThan(source.indexOf('createRoot('))
  })
})
