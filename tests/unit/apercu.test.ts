import { describe, expect, it } from 'vitest'
import { apercuDeFiche, apercuDuNumero, texteDuRendu } from '../../src/apercu'
import type { Lot } from '../../src/core/curation'
import type { Brasserie } from '../../src/core/schema'
import { LIGNES_REELLES } from './lignes-reelles'

const TOUTES = LIGNES_REELLES as unknown as Brasserie[]
const A_CONFIRMER = TOUTES.find((b) => b.cat === 0 && b.contact === undefined)
if (A_CONFIRMER === undefined) throw new Error('lignes-reelles doit contenir une catégorie 0 sans contact')
// Un lundi d'octobre, 15 h à Paris.
const MAINTENANT = new Date('2026-10-19T13:00:00Z')
const src = { source: 'https://exemple.fr/horaires', verifieLe: '2026-10-16' }

describe('S300 : la fiche en texte, par les composants de la page', () => {
  it('CA1 : catégorie, « Appeler le … », titre des horaires, viennent des composants', () => {
    const texte = apercuDeFiche(
      {
        ...A_CONFIRMER,
        cat: 2,
        contact: { tel: '04 72 50 88 53', source: 'https://exemple.fr/contact', verifieLe: '2026-10-16' },
        horaires: [{ nature: 'accueil', lun: [['10:00', '18:00']], ...src }],
      },
      MAINTENANT,
    )
    expect(texte).toContain('Acheter seulement')
    expect(texte).toContain('Appeler le 04 72 50 88 53')
    expect(texte).toContain('Horaires d’accueil du public')
    expect(texte).toContain('Lundi | 10 h – 18 h')
    // L'état du moment, calculé à l'heure donnée.
    expect(texte).toContain('ouvert jusqu’à 18 h')
  })

  it('CA2 : ce qui n’est pas peint n’y est pas, et un lien garde son adresse', () => {
    const html =
      '<p>Voir <a href="https://exemple.fr/">le site<span class="lecteur-seul"> (nouvel onglet)</span></a> &amp; c’est tout</p><dl><dt>Où</dt><dd>Lyon</dd></dl>'
    expect(texteDuRendu(html)).toBe('Voir [le site](https://exemple.fr/) & c’est tout\nOù\nLyon')
    expect(apercuDeFiche(A_CONFIRMER, MAINTENANT)).not.toContain('nouvel onglet')
    // `.fiche-aide` est peinte en bloc (`display: block`) : une ligne à elle.
    expect(texteDuRendu('<dd>Vente<span class="fiche-aide">Confiance élevée.</span></dd>')).toBe('Vente\nConfiance élevée.')
  })

  it('CA4 : la fiche après la ligne seule, et ce qui ne s’affichera plus', () => {
    const lot: Lot = {
      lot: 'essai',
      propositions: [
        {
          n: A_CONFIRMER.n,
          changements: {
            contact: { tel: '04 72 50 88 53', source: 'https://exemple.fr/contact', verifieLe: '2026-10-16' },
          },
          verifieLe: '2026-10-16',
          sources: ['https://exemple.fr/contact'],
          extrait: 'Téléphone : 04 72 50 88 53',
        },
      ],
    }
    const texte = apercuDuNumero(TOUTES, lot, 1, MAINTENANT)
    expect(texte).toContain('Appeler le 04 72 50 88 53')
    // « Téléphone : non renseigné. » était sur la fiche avant : il disparaît.
    expect(texte).toMatch(/Ne s’affichera plus[^]*Téléphone : non renseigné\./)
    expect(texte).toContain('19 octobre 2026')
    // En Markdown, des lignes de citation se fondraient en un paragraphe :
    // chaque ligne de la fiche est un élément de liste.
    expect(texte).toContain('> - [Appeler le 04 72 50 88 53](tel:')
    // Un numéro hors du lot n'a pas d'aperçu.
    expect(apercuDuNumero(TOUTES, lot, 2, MAINTENANT)).toBeUndefined()
  })
})
