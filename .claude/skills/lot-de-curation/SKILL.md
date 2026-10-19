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
vérifiés ; à égalité, les plus proches de Brignais.

**Puis les signalements ouverts, quelle que soit la catégorie de la fiche**
(revue métier S11) :

1. Lister les issues ouvertes du dépôt dont le titre commence par
   « Signalement : » (outil GitHub `search_issues`, ou la page Issues).
2. Pour chacune, retrouver la fiche :
   `npx tsx outils/curation.ts signalement "<titre exact>"`. Sans réponse
   (titre retouché), rattacher à la main et le dire.
3. Garder, pour l'agent, le **numéro** de l'issue et son **texte** (ce qui
   est faux, la bonne information, la source donnée par la personne).

## 2. Les faire vérifier

Lancer l'agent `verificateur-de-brasserie` par paquets de 5 fiches au plus
(un paquet par agent, en parallèle), avec le nom du lot, la date du jour et,
pour une fiche signalée, **le numéro et le texte de l'issue**. Recopier
chaque bloc JSON rendu dans `curation/<lot>.json`, en un seul lot, avec le
champ `revues` : **toutes** les fiches revues, avec ou sans proposition
(sinon elles reviennent au lot suivant, vu en S13).

## 3. Valider, sans rien croire

```bash
npx tsx outils/curation.ts diff curation/<lot>.json
```

Sous chaque numéro, le diff montre la fiche telle que la page la montrera,
rendue par ses composants, et ce qui ne s'affichera plus (S300).

- Un lot que le schéma refuse se corrige **à la source** (on relance
  l'agent sur la fiche), pas à la main dans le JSON.
- Relire chaque proposition contre son extrait : l'extrait dit-il vraiment
  la valeur proposée ? Une proposition dont l'extrait ne porte pas la valeur
  est **retirée** du lot, et le compte rendu le dit.
- Contrôle mécanique, obligatoire :
  `npx tsx outils/curation.ts controler curation/<lot>.json` — chaque source
  répond, chaque numéro proposé figure sur sa page. Un écart se règle avant
  de présenter le lot.
- Ouvrir soi-même au moins une source sur cinq, au hasard, pour ce que le
  contrôle ne lit pas (catégorie, horaires), et le noter.

## 4. Présenter à Cédric

Le diff Markdown, tel que l'outil le rend (avec son **empreinte**), dans une
PR qui n'ajoute que `curation/<lot>.json` et `curation/<lot>.md`. **Aucune
ligne de `data/` dans cette PR.** Lui demander de répondre par les numéros
acceptés : « j'accepte 1, 3, 4 ». Chaque « Choix du vérificateur » est une
question pour lui (un autre numéro, un autre lien) : la lui poser.

## 5. Appliquer ce qu'il a accepté, et cela seulement

```bash
npx tsx outils/curation.ts appliquer curation/<lot>.json 1,3,4                       # vérifie, n'écrit rien
PAROLE_DE_CEDRIC="<ses mots, recopiés>" \
  npx tsx outils/curation.ts appliquer curation/<lot>.json 1,3,4 --ecrire <empreinte>  # écrit data/ et l'accord
```

L'outil écrit aussi `curation/accords/<date>-<lot>.json` (lot, empreinte,
numéros, date, ses mots). La CI rejoue ces accords sur le fichier du 15/10 et
refuse toute ligne de `data/` qui n'en vient pas (S230,
`outils/garde-donnees.ts`). Une PR qui touche `data/` ou
`curation/accords/` attend la revue de Cédric (CODEOWNERS), même verte.

Les numéros sont **ceux de sa réponse écrite**, recopiés ; rien n'est
ajouté « parce que c'était évident ». L'empreinte est celle du diff qu'il a
lu : si le lot a bougé depuis, l'outil refuse, et le lot repasse par l'étape
4. Puis la porte complète (`/porte`), un commit qui cite sa réponse, et une
PR.

## 6. Répondre à chaque signalement

Une fois la PR de données mergée (ou la proposition refusée), un commentaire
sur chaque issue de signalement du lot, puis la fermer :

- **acceptée** : « La fiche est corrigée : <ce qui a changé>. Merci. » et le
  lien du commit ;
- **refusée** : la raison telle que Cédric l'a donnée (pas de source, source
  contradictoire…), et ce qui permettrait de la reprendre ;
- **sans proposition** (rien de lisible dans les sources) : le dire, et
  demander une source.

La personne qui a signalé n'a pas d'autre moyen de savoir (revue métier S11).

## Ce qui vaut arrêt

- Une écriture dans `data/` sans réponse écrite de Cédric.
- Un refus du contrôle de permissions sur `data/` : ne pas le contourner,
  le dire.
- Une proposition sans extrait, ou dont l'extrait ne dit pas la valeur.
