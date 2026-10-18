---
name: revue-sprint
description: Relit le diff d'un sprint de Mousse de Poche en cherchant ce qu'on y a cassé plutôt que ce qu'on y a réparé, puis lance la revue de la persona du sprint. À lancer à la fin de chaque sprint, avant le suivant.
---

# Revue de sprint

**Le but n'est pas de vérifier que ça marche — la porte le fait. Le but est
de trouver ce que le sprint a cassé, et ce que sa persona ne peut toujours
pas faire.**

## 1. Le diff, à l'envers

```bash
git diff <base-du-sprint> HEAD --stat
git diff <base-du-sprint> HEAD -- src/ build/ data/
```

Pour chaque changement, poser la question inverse : qu'a-t-il pu retirer ?
Lancer l'agent `relecteur-adverse` sur ce diff **seulement s'il touche du
code** (src/, build/, workflows) : sur ÉtapeForge, un agent par PR quel que
soit son contenu a vidé le quota hebdomadaire (CLAUDE.md d'ÉtapeForge §11,
12/10/2026).

## 2. Les angles propres à ce projet

| Angle | Pourquoi |
|---|---|
| Une catégorie de vente affichée sans source ? | Promesse centrale (cahier des charges §1.2) |
| Une requête qui emporte la position ? | Promesse de confidentialité (§2.4) |
| Une ligne de `data/` modifiée sans accord écrit ? | `git diff -- data/`, ligne par ligne |
| Une valeur absente remplacée par une valeur inventée ? | §1.3 |
| Des coordonnées « commune » présentées comme exactes ? | §2.3 |
| Une frontière déplacée (module, stockage, réseau) sans `docs/ARCHITECTURE.md` mis à jour ? | Revue lead S295 : le fichier était resté à S29 |
| `data/` changé sans `curation/A-CHERCHER.md` régénéré ? | `tests/unit/completude.test.ts` le refuse ; le bilan de la PR cite ses chiffres |

Si le sprint écrit ou change une **promesse** (un texte affiché, un
commentaire « parce que », une phrase de doc avec « jamais », « aucun »,
« seul »), lancer aussi l'agent `relecteur-de-promesses` sur ces phrases
(S284).

## 3. La persona du sprint

Lancer l'agent `relecteur-de-persona` avec **la** persona désignée dans
`docs/SPRINTS.md` (deux en S4, toutes en S6). Jamais un avis moyen.

## 4. Vérifier avant de rapporter

Un soupçon n'est pas une trouvaille. Mesurer, puis rapporter.

## La sortie

Dans `docs/SPRINTS.md`, rubrique « État final » du sprint :

- ce qui a été trouvé, et que c'était de mon fait ;
- ce qui a été vérifié sans suite, avec la mesure ;
- ce que la persona ne peut toujours pas faire ;
- ce qui part dans `BACKLOG.md`.
