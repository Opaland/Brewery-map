/**
 * S380 — Le mot du mois, rédigé par Claude, proposé à Cédric.
 *
 *   npx tsx outils/mot-du-mois.ts [AAAA-MM]          rédige (mois courant par défaut)
 *   npx tsx outils/mot-du-mois.ts --valider <fichier> vérifie un fichier proposé
 *
 * Écrit `curation/ia/mot-du-mois-AAAA-MM.json`, jamais `data/`. Sans clé
 * `ANTHROPIC_API_KEY`, s'arrête sans erreur en disant où l'ajouter. Ce qui
 * part chez Anthropic : les faits agrégés du mois et des noms de brasseries
 * publics ; aucune position, aucune donnée de personne.
 */
import Anthropic from '@anthropic-ai/sdk'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { ecarts, faitsDuMois, motDuMoisSchema, sansEcart, type FicheDuMois, type MotDuMois } from '../src/core/mot-du-mois'
import { NOUVEAUTES } from '../src/core/nouveautes'
import { rediger } from './mot-du-mois-redaction'

const args = process.argv.slice(2)

if (args[0] === '--valider') {
  const chemin = args[1]
  if (!chemin || !/^curation\/ia\/mot-du-mois-\d{4}-\d{2}\.json$/.test(chemin)) {
    console.error('Chemin refusé : seul curation/ia/mot-du-mois-AAAA-MM.json est accepté.')
    process.exit(1)
  }
  const r = motDuMoisSchema.safeParse(JSON.parse(readFileSync(chemin, 'utf8')))
  if (!r.success) {
    console.error(`Fichier invalide : ${r.error.message}`)
    process.exit(1)
  }
  if (!chemin.endsWith(`mot-du-mois-${r.data.mois}.json`)) {
    console.error('Le mois du fichier ne correspond pas à son nom.')
    process.exit(1)
  }
  // Le job qui valide n'a ni clé ni modèle : il recalcule les faits depuis le
  // dépôt et revérifie le texte, au lieu de croire le champ `verifie`.
  const fichesDuDepot = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as FicheDuMois[]
  const faitsDuDepot = faitsDuMois(fichesDuDepot, NOUVEAUTES, r.data.mois)
  if (JSON.stringify(faitsDuDepot) !== JSON.stringify(r.data.faits)) {
    console.error('Les faits du fichier ne sont pas ceux que le dépôt donne pour ce mois.')
    process.exit(1)
  }
  const e = ecarts(r.data.texte, faitsDuDepot, fichesDuDepot)
  if (sansEcart(e) !== r.data.verifie) {
    console.error('Le champ verifie ne dit pas ce que la vérification du texte trouve.')
    process.exit(1)
  }
  console.log(`Fichier valide : ${chemin}`)
  process.exit(0)
}

const mois = args[0] ?? new Date().toISOString().slice(0, 7)
if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(mois)) {
  console.error(`Mois illisible : « ${mois} » (attendu AAAA-MM).`)
  process.exit(1)
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.log(
    'Pas de clé ANTHROPIC_API_KEY : rien n’est rédigé. Pour l’ajouter : créer la clé sur console.anthropic.com ' +
      '(avec un plafond de dépense), puis GitHub → Settings → Secrets and variables → Actions → New repository secret.',
  )
  process.exit(0)
}

const fiches = JSON.parse(readFileSync('data/breweries.json', 'utf8')) as FicheDuMois[]
const faits = faitsDuMois(fiches, NOUVEAUTES, mois)
if (faits.nouveautes.length === 0 && faits.fichesDuMoisEnTout === 0) {
  console.log(`Rien de neuf en ${mois} : aucun mot du mois.`)
  process.exit(0)
}

const client = new Anthropic()
const resultat = await rediger((p) => client.beta.messages.create(p), faits, fiches)

if (resultat.statut === 'refus') {
  console.log(`Le modèle a décliné (catégorie : ${resultat.raison}) : rien n’est écrit.`)
  process.exit(0)
}

const fichier: MotDuMois = motDuMoisSchema.parse({
  mois,
  genereLe: new Date().toISOString(),
  modele: resultat.modele,
  redigePar: 'IA (Claude), relu par Cédric avant toute publication',
  texte: resultat.texte,
  verifie: resultat.verifie,
  ecartsRestants: resultat.ecartsRestants,
  faits,
  usage: resultat.usage,
})
mkdirSync('curation/ia', { recursive: true })
const chemin = `curation/ia/mot-du-mois-${mois}.json`
writeFileSync(chemin, `${JSON.stringify(fichier, null, 2)}\n`)
// Le journal du run est public : des comptes, pas le texte.
console.log(
  `${chemin} écrit : ${fichier.verifie ? 'vérifié' : 'NON vérifié (écarts restants)'}, ` +
    `${fichier.usage.requetes} requête(s), environ ${fichier.usage.coutUsd} $.`,
)
