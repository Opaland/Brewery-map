---
name: lot-de-curation
description: Prépare un lot de curation de Mousse de Poche — choisir les fiches, les faire vérifier par l'agent verificateur-de-brasserie, valider les propositions et les présenter à Cédric pour décision ligne par ligne. N'écrit dans data/ qu'après son accord écrit, numéro par numéro.
---

# Lot de curation

**Les agents proposent, Cédric décide** (CLAUDE.md §0). Ce skill produit une
décision à prendre, jamais un fichier de données modifié en douce.

## 1. Choisir les fiches

```bash
npx tsx outils/curation.ts lot 25
```

Les « À confirmer » jamais vérifiés d'abord, puis les plus anciennement
vérifiés ; à égalité, les plus proches de Brignais. Y ajouter les fiches des
**signalements ouverts** (issues GitHub du dépôt dont le titre commence par
« Signalement : »), en les nommant.

## 2. Les faire vérifier

Lancer l'agent `verificateur-de-brasserie` par paquets de 5 fiches au plus
(un paquet par agent, en parallèle), avec le nom du lot et la date du jour.
Recopier chaque bloc JSON rendu dans `curation/<lot>.json`, en un seul lot.

## 3. Valider, sans rien croire

```bash
npx tsx outils/curation.ts diff curation/<lot>.json
```

- Un lot que le schéma refuse se corrige **à la source** (on relance
  l'agent sur la fiche), pas à la main dans le JSON.
- Relire chaque proposition contre son extrait : l'extrait dit-il vraiment
  la valeur proposée ? Une proposition dont l'extrait ne porte pas la valeur
  est **retirée** du lot, et le compte rendu le dit.
- Ouvrir soi-même au moins une source sur cinq, au hasard, et le noter.

## 4. Présenter à Cédric

Le diff Markdown, tel que l'outil le rend, dans une PR qui n'ajoute que
`curation/<lot>.json` et `curation/<lot>.md` (le diff). **Aucune ligne de
`data/` dans cette PR.** Lui demander de répondre par les numéros acceptés :
« j'accepte 1, 3, 4 ».

## 5. Appliquer ce qu'il a accepté, et cela seulement

```bash
npx tsx outils/curation.ts appliquer curation/<lot>.json 1,3,4           # vérifie, n'écrit rien
npx tsx outils/curation.ts appliquer curation/<lot>.json 1,3,4 --ecrire  # écrit data/breweries.json
```

Les numéros sont **ceux de sa réponse écrite**, recopiés ; rien n'est
ajouté « parce que c'était évident ». Puis la porte complète (`/porte`), un
commit qui cite sa réponse, et une PR.

## Ce qui vaut arrêt

- Une écriture dans `data/` sans réponse écrite de Cédric.
- Un refus du contrôle de permissions sur `data/` : ne pas le contourner,
  le dire.
- Une proposition sans extrait, ou dont l'extrait ne dit pas la valeur.
