import type { Plugin } from 'vite'

/**
 * Le thème au choix (S45) : clair, sombre ou automatique. La feuille de style
 * n'écrit ses couleurs sombres qu'une fois, sous
 * `@media (prefers-color-scheme: dark)`. Ce module en tire, au build :
 *
 * - le bloc d'origine, qui ne s'applique plus si la personne a choisi
 *   « clair » (`:root:not([data-theme='clair'])`) ;
 * - son double, sans condition de système, quand elle a choisi « sombre »
 *   (`:root[data-theme='sombre']`).
 *
 * Une seule source : un bloc sombre ajouté plus tard est pris d'office, sans
 * liste à tenir à jour (CLAUDE.md §4ter). Un bloc que ce module ne sait pas
 * lire fait échouer le build (§6quater).
 */
const SOMBRE = /\(prefers-color-scheme:\s*dark\)/

/** Les virgules de premier niveau seulement : celles de `:is(.a, .b)` restent. */
function decouper(selecteurs: string): string[] {
  const parts: string[] = []
  let profondeur = 0
  let courant = ''
  for (const c of selecteurs) {
    if (c === '(') profondeur++
    if (c === ')') profondeur--
    if (c === ',' && profondeur === 0) {
      parts.push(courant.trim())
      courant = ''
    } else courant += c
  }
  parts.push(courant.trim())
  return parts
}

function prefixer(selecteurs: string, prefixe: string): string {
  return decouper(selecteurs)
    .map((s) => {
      if (s === ':root') return prefixe
      if (/^:root[.:[]/.test(s) || s.startsWith(':root ')) return `${prefixe}${s.slice(5)}`
      if (s.includes(':root')) throw new Error(`theme : « :root » ailleurs qu'en tête : ${s}`)
      return `${prefixe} ${s}`
    })
    .join(', ')
}

function regles(corps: string): { selecteurs: string; declarations: string }[] {
  const sansCommentaires = corps.replace(/\/\*[\s\S]*?\*\//g, '')
  const trouvees: { selecteurs: string; declarations: string }[] = []
  const motif = /([^{}]+)\{([^{}]*)\}/g
  let reste = sansCommentaires
  for (const m of sansCommentaires.matchAll(motif)) {
    trouvees.push({ selecteurs: m[1].trim(), declarations: m[2].trim() })
    reste = reste.replace(m[0], '')
  }
  if (reste.trim() !== '' || trouvees.some((r) => r.selecteurs.startsWith('@'))) {
    throw new Error(`theme : bloc sombre illisible : ${corps.trim().slice(0, 80)}`)
  }
  return trouvees
}

export function themeAuChoix(source: string): string {
  // Sans commentaires : un « @media » écrit dans un commentaire était lu.
  const css = source.replace(/\/\*[\s\S]*?\*\//g, '')
  let sortie = ''
  let i = 0
  while (i < css.length) {
    const debut = css.indexOf('@media', i)
    if (debut === -1) break
    const accolade = css.indexOf('{', debut)
    const condition = css.slice(debut + '@media'.length, accolade).trim()
    // L'accolade fermante du bloc, en comptant les imbriquées.
    let profondeur = 0
    let fin = accolade
    for (; fin < css.length; fin++) {
      if (css[fin] === '{') profondeur++
      else if (css[fin] === '}' && --profondeur === 0) break
    }
    sortie += css.slice(i, debut)
    if (!SOMBRE.test(condition)) {
      sortie += css.slice(debut, fin + 1)
      i = fin + 1
      continue
    }
    // Seule la forme « [condition and] (prefers-color-scheme: dark) [and …] »
    // est comprise : une liste à virgules ou un « not » ferait un double faux.
    if (condition.includes(',') || /\bnot\b|\bonly\b/.test(condition)) {
      throw new Error(`theme : condition sombre non comprise : @media ${condition}`)
    }
    const corps = css.slice(accolade + 1, fin)
    const r = regles(corps)
    const auto = r.map((x) => `${prefixer(x.selecteurs, ":root:not([data-theme='clair'])")} { ${x.declarations} }`)
    const force = r.map((x) => `${prefixer(x.selecteurs, ":root[data-theme='sombre']")} { ${x.declarations} }`)
    sortie += `@media ${condition} {\n${auto.join('\n')}\n}`
    const autre = condition
      .replace(SOMBRE, '')
      .replace(/^\s*and\s+|\s+and\s*$/g, '')
      .trim()
    sortie += autre === '' ? `\n${force.join('\n')}` : `\n@media ${autre} {\n${force.join('\n')}\n}`
    i = fin + 1
  }
  return sortie + css.slice(i)
}

/** Le plugin : appliqué à la feuille de l'application. */
export function themeAuChoixPlugin(): Plugin {
  return {
    name: 'mousse-theme-au-choix',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('/src/index.css')) return null
      return { code: themeAuChoix(code), map: null }
    },
  }
}
