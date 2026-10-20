import { createElement, Fragment } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Bieres } from './Bieres'
import { Contact } from './Contact'
import { appliquerLot, nomDuNumero, numerosDuLot, type Lot } from './core/curation'
import type { Brasserie } from './core/schema'
import { EnBref } from './EnBref'
import { CeQuiManque, Provenance } from './Fiche'
import { Horaires } from './Horaires'

/**
 * La fiche telle que la page la montrera, en texte, pour le diff d'un lot
 * (S300, issue #57). Rendue par les composants de la page eux-mêmes : une
 * phrase changée dans un composant change l'aperçu, sans liste à tenir
 * d'accord (CLAUDE.md §4ter).
 */
export function apercuDeFiche(brasserie: Brasserie, maintenant: Date): string {
  const html = renderToStaticMarkup(
    createElement(
      Fragment,
      null,
      createElement(EnBref, { brasserie, maintenant }),
      createElement(CeQuiManque, { brasserie }),
      createElement(Contact, { brasserie }),
      createElement(Horaires, { brasserie, maintenant }),
      createElement(Bieres, { brasserie }),
      // D'où et quand : sans elle, un lot qui change une source ou une date
      // ne se voyait plus (revue adverse S312).
      createElement(Provenance, { brasserie }),
    ),
  )
  return texteDuRendu(html)
}

const BLOCS = /<\/?(?:p|div|dl|dt|dd|ul|ol|li|table|caption|thead|tbody|tr|h[1-6]|section|br)\b[^>]*>/g
const ENTITES: Readonly<Record<string, string>> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

function decoder(texte: string): string {
  return texte.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e: string) => {
    if (e.startsWith('#x') || e.startsWith('#X')) return String.fromCodePoint(parseInt(e.slice(2), 16))
    if (e.startsWith('#')) return String.fromCodePoint(parseInt(e.slice(1), 10))
    return ENTITES[e] ?? m
  })
}

/**
 * Le HTML rendu, réduit à ce qui est peint : le texte réservé aux lecteurs
 * d'écran (`lecteur-seul`) part, un lien s'écrit `[texte](adresse)`, une
 * ligne de tableau s'écrit « cellule | cellule ».
 */
export function texteDuRendu(html: string): string {
  const texte = html
    .replace(/<span class="(?:[^"]* )?lecteur-seul(?: [^"]*)?">[^<]*<\/span>/g, '')
    .replace(/<a\b[^>]*?href="([^"]*)"[^>]*>([^]*?)<\/a>/g, (_, href: string, dedans: string) => {
      const mots = dedans.replace(/<[^>]+>/g, '').trim()
      return `[${mots}](${href})`
    })
    // `.fiche-aide` est peinte en bloc (`display: block`, `index.css`).
    .replace(/<span class="fiche-aide"[^>]*>/g, '\n')
    .replace(/<\/t[hd]>/g, '\u0000')
    .replace(BLOCS, '\n')
    .replace(/<[^>]+>/g, '')
  return texte
    .split('\n')
    .map((ligne) =>
      decoder(
        ligne
          .split('\u0000')
          .map((c) => c.replace(/\s+/g, ' ').trim())
          .filter((c) => c !== '')
          .join(' | '),
      ),
    )
    .filter((ligne) => ligne !== '')
    .join('\n')
}

const HEURE_DE_PARIS = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris',
  dateStyle: 'full',
  timeStyle: 'short',
})

// En Markdown, des lignes de citation se fondent en un paragraphe : chaque
// ligne de la fiche y est un élément de liste.
const citer = (lignes: readonly string[]): string => lignes.map((l) => `> - ${l}`).join('\n')

/**
 * L'aperçu d'un numéro du lot, appliqué seul : la fiche après en entier, et
 * de la fiche avant les lignes qui disparaissent. Montrer les deux en
 * entier doublait la longueur d'un lot ; ne montrer que les lignes qui
 * changent perdait le contexte (sous quel badge s'affichent ces horaires).
 * Un retrait n'en a pas : la fiche quitte la carte.
 */
export function apercuDuNumero(
  brasseries: readonly Brasserie[],
  lot: Lot,
  numero: number,
  maintenant: Date,
): string | undefined {
  const sansRetraits = numerosDuLot(lot) - (lot.retraits ?? []).length
  if (!Number.isInteger(numero) || numero < 1 || numero > sansRetraits) return undefined
  const nom = nomDuNumero(lot, numero)
  const r = appliquerLot(brasseries, lot, new Set([numero]))
  const ajout = (lot.ajouts ?? []).at(numero - 1 - lot.propositions.length)
  if (!r.ok) {
    const refus = `Ce numéro ne peut pas être appliqué tel quel : ${r.erreurs.join(' ; ')}`
    // Un ajout porte sa fiche entière : elle se montre quand même, pour que
    // Cédric décide en la voyant (revue adverse S300, lot s14-decouverte).
    if (numero <= lot.propositions.length || ajout === undefined) return refus
    const fiche = { ...ajout.fiche, verifieLe: ajout.verifieLe }
    return [refus, '', '**La fiche telle que le lot l’écrit :**', '', citer(apercuDeFiche(fiche, maintenant).split('\n'))].join('\n')
  }
  const apres = r.brasseries.find((b) => b.n === nom)
  if (apres === undefined) return undefined
  const lignesApres = apercuDeFiche(apres, maintenant).split('\n')
  const avant = brasseries.find((b) => b.n === nom)
  const disparues =
    avant === undefined
      ? []
      : apercuDeFiche(avant, maintenant)
          .split('\n')
          .filter((l) => !lignesApres.includes(l))
  return [
    `**Aperçu de la fiche** (état du moment calculé le ${HEURE_DE_PARIS.format(maintenant)}, heure de Paris) :`,
    '',
    citer(lignesApres),
    ...(disparues.length === 0 ? [] : ['', 'Ne s’affichera plus :', '', citer(disparues)]),
  ].join('\n')
}
