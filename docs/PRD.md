# Mousse de Poche — exigences produit (PRD)

> Format repris de BMAD (`docs/METHODE.md`). Le cahier des charges v3 du
> 15/10/2026 est cité par CLAUDE.md, mais **il n'est pas dans le dépôt**. Ce
> PRD le reconstitue à partir de CLAUDE.md, du README, de `docs/PERSONAS.md`
> et de `docs/DECISIONS.md`. **Cédric doit le valider, ou verser l'original.**

## 1. Le problème

« Avant de faire 20 km : savoir si on peut y boire une bière. » Les cartes
de brasseries disent où elles sont. Aucune ne dit honnêtement si l'on peut y
acheter, y boire sur place, ou si on ne le sait pas.

## 2. Pour qui

Les personas sont dans `docs/PERSONAS.md` :
- Marie, qui cherche une sortie ;
- Bernard, sur un téléphone ancien, à la campagne ;
- Hugo, à vélo ;
- Inès, au clavier et au lecteur d'écran ;
- Léa, attentive à sa vie privée ;
- Karim, amateur de types de bière ;
- une brasserie ;
- Cédric, qui tient les données.

## 3. Invariants

Repris de CLAUDE.md §0 ; ils priment sur toute exigence ci-dessous.

- **INV-1** Aucune donnée inventée : ni catégorie de vente, ni horaire, ni
  type de bière, ni lien, ni chiffre de test, de coût ou de performance. Ce
  qui n'est pas établi s'affiche « À confirmer », avec sa raison.
- **INV-2** La position de la personne ne quitte jamais le navigateur :
  aucune requête ne la contient (tuiles, liens, issue préremplie).
- **INV-3** Aucune ligne de `data/` ne change sans l'accord écrit de
  Cédric, ligne par ligne.
- **INV-4** Aucun serveur, aucun compte, aucun traceur.

## 4. Exigences fonctionnelles (déjà livrées, sauf mention)

| # | Exigence | Livrée en |
|---|---|---|
| EF-01 | Une liste et une carte des brasseries, triées par distance au point de départ | S2, S7 |
| EF-02 | Point de départ : « Autour de moi », ou l'une des communes de France | S8, S21 |
| EF-03 | Filtres : distance, ce qu'on peut y faire (5 catégories, la 5e depuis S368), type de bière, département | S3, S5, S27 |
| EF-04 | Une fiche par brasserie : source, confiance, adresse, contact, horaires, bières — ou « À confirmer » | S3–S6 |
| EF-05 | « Y aller » : la destination seule, jamais le départ | S19 |
| EF-06 | Favoris et réglages gardés sur l'appareil, effaçables | S9 |
| EF-07 | Signaler une erreur, ou une brasserie absente | S10 |
| EF-08 | Toute la France : couche OpenStreetMap, à part, marquée « À confirmer » | S25 |
| EF-09 | Ma tournée, partage d'une fiche, statut « fermée » | S27 |
| EF-10 | Premier écran sur téléphone : la liste tout de suite | S29 |
| EF-11 et suivantes | Voir `docs/EPICS.md` : carnet, partage en image, QR, langues… | S30 et après |

## 5. Exigences non fonctionnelles

| # | Exigence | Mesure |
|---|---|---|
| ENF-01 | Marche hors connexion après une première visite | `tests/e2e/hors-ligne.spec.ts` |
| ENF-02 | Accessible : axe sans violation, cibles de 44 px, clavier seul, 200 % de texte | `tests/e2e/accessibilite.spec.ts` |
| ENF-03 | Rapide sur un téléphone ancien | Lighthouse mobile mesuré : 99/100/100/100 à l'audit du 17/10 (`docs/AUDIT.md`) ; un seuil de CI est **à mesurer puis décider** (S77) |
| ENF-04 | Données validées au build : un fichier invalide ne se publie pas | `build/valider-donnees.ts`, tests |
| ENF-05 | Politique de sécurité du contenu stricte, sans `eval` | `build/csp.ts`, `tests/e2e/securite.spec.ts` |
| ENF-06 | Chromium, Firefox, Safari | Chromium seul testé ; les deux autres en S98 (CI), ou par un humain |

## 6. Hors périmètre

- Notes et avis d'utilisateurs, classements de popularité : rien qui puisse
  être inventé ou manipulé.
- Comptes, synchronisation par serveur, publicité, mesure d'audience.
  Un compteur sans cookie reste **une décision de Cédric**
  (`docs/MARKETING.md`).
- Itinéraire calculé par un service tiers depuis la position.
