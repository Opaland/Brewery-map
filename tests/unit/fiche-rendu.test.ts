import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Fiche } from '../../src/Fiche'
import type { Brasserie } from '../../src/core/schema'

/**
 * S308 — la fiche parle comme quelqu'un (Cédric, 20/10 : « personne ne parle
 * comme cela », « trop brouillon »). La fiche de Ninkasi Brignais telle
 * qu'elle était dans `data/breweries.json` le 20/10 : ni adresse, ni
 * téléphone, ni horaires, ni bières, confiance faible, pas de date.
 */
const vide: Brasserie = {
  n: 'Ninkasi Brignais',
  c: 'Brignais',
  d: '69',
  lat: 45.6747,
  lon: 4.75484,
  km: 0,
  cat: 1,
  conf: 'faible',
  note: 'Restaurant-bar du réseau Ninkasi ; vente de bouteilles à emporter déduite de la page Ninkasi, non vérifiée pour ce site.',
  addr: 'Brignais',
  src: 'https://www.ninkasi.fr/',
  coordPrecision: 'centre',
  beers: [],
}

/** Une fiche où tout est connu (valeurs d'exemple, pas une brasserie réelle). */
const complete: Brasserie = {
  ...vide,
  n: 'Brasserie Exemple',
  conf: 'solide',
  addr: '1 rue de l’Exemple, 69530 Brignais',
  coordPrecision: 'address',
  verifieLe: '2026-10-01',
  contact: { tel: '04 00 00 00 00', source: 'https://exemple.test/', verifieLe: '2026-10-01' },
  horaires: [{ nature: 'accueil', sam: [['10:00', '18:00']], source: 'https://exemple.test/', verifieLe: '2026-10-01' }],
  beers: [{ type: 'ipa' }],
}

const rendu = (b: Brasserie) =>
  renderToStaticMarkup(
    createElement(Fiche, {
      brasserie: b,
      favori: false,
      onBasculerFavori: () => undefined,
      visite: undefined,
      onBasculerVisite: () => undefined,
      note: '',
      onEcrireNote: () => undefined,
      onImprimer: () => undefined,
      onRefermer: () => undefined,
    }),
  )

/**
 * Le texte qu'on voit, de la tête de la fiche jusqu'à « Pour moi » (exclu,
 * inchangé) : sans ce qui n'est que pour le lecteur d'écran, ni le contenu
 * d'un repli fermé (§1bis : ce qui est peint, pas le `textContent`).
 */
function texteVu(html: string): string {
  return html
    .split('<h4 class="fiche-titre">Pour moi</h4>')[0]
    .replace(/<span class="lecteur-seul">[^<]*<\/span>/g, ' ')
    .replace(/<h3 class="lecteur-seul"[^>]*>[^<]*<\/h3>/g, ' ')
    .replace(/(<summary[^>]*>[\s\S]*?<\/summary>)[\s\S]*?<\/details>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    // Une balise retirée juste avant une ponctuation laissait une espace.
    .replace(/ ([.,])/g, '$1')
    .trim()
}

const mots = (texte: string) => texte.split(/[\s’']+/).filter((w) => /[\p{L}\d]/u.test(w)).length

describe('la fiche (S308)', () => {
  it('CA1 : ce qui manque se dit une fois, sans jargon de fichier', () => {
    const html = rendu(vide)
    expect(html.match(/data-testid="fiche-manque"/g)).toHaveLength(1)
    expect(texteVu(html)).toContain('Pas encore dans la fiche : son adresse, son téléphone, ses horaires et ses bières. Chercher sur Google Maps Ses bières sur Untappd Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.')
    expect(texteVu(html)).not.toMatch(/non renseigné|non référencé|non connue/i)
  })

  it('CA2 : une partie sans contenu disparaît ; avec du contenu, elle est là', () => {
    const html = rendu(vide)
    expect(html).not.toContain('data-testid="fiche-contact"')
    expect(html).not.toContain('data-testid="fiche-horaires"')
    expect(html).not.toContain('data-testid="fiche-bieres"')
    const plein = rendu(complete)
    expect(plein).toContain('data-testid="fiche-contact"')
    expect(plein).toContain('Appeler le 04 00 00 00 00')
    expect(plein).toContain('data-testid="fiche-horaires"')
    expect(plein).toContain('data-testid="fiche-bieres"')
    expect(plein).not.toContain('data-testid="fiche-manque"')
  })

  it('CA3 : la fiche de Ninkasi Brignais dit moins de la moitié des mots d’avant (341, compté le 20/10)', () => {
    expect(mots(texteVu(rendu(vide)))).toBeLessThan(341 / 2)
  })

  it('revue adverse S308 : seules les bières manquent, la phrase reste entière', () => {
    const html = rendu({ ...complete, beers: [] })
    expect(texteVu(html)).toContain('Pas encore dans la fiche : ses bières. Ses bières sur Untappd')
    // Pas de recherche Google Maps (l'itinéraire, lui, en a un lien).
    expect(html).not.toContain('data-testid="telephone-google-maps"')
  })

  it('l’avertissement sur les horaires se voit quand il y en a, et seulement alors (revues S308)', () => {
    // Visible, pas dans le repli : texteVu retire le contenu d'un repli fermé.
    expect(texteVu(rendu(complete))).toContain('La confiance ne garantit pas les horaires')
    expect(rendu(vide)).not.toContain('La confiance ne garantit pas les horaires')
  })

  it('CA4 : la provenance tient en un paragraphe ; le sens de la confiance est replié', () => {
    const html = rendu(vide)
    const provenance = /<p[^>]*data-testid="fiche-provenance"[^>]*>([\s\S]*?)<\/p>/.exec(html)
    expect(provenance).not.toBeNull()
    expect(texteVu(provenance?.[0] ?? '')).toMatch(/^Source : ninkasi\.fr\b/)
    expect(html).toMatch(/<details[^>]*data-testid="fiche-sens-confiance"[^>]*><summary>/)
  })

  it('sans adresse, où mène l’itinéraire se dit en une phrase, avec la commune', () => {
    expect(texteVu(rendu(vide))).toContain('L’itinéraire mène au centre de Brignais, pas à la brasserie.')
  })
})
