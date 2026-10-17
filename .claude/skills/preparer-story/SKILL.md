---
name: preparer-story
description: Rédige la story suivante de Mousse de Poche (rôle de Scrum Master repris de BMAD, docs/METHODE.md) — lit docs/EPICS.md, BACKLOG.md et la dernière revue, et écrit docs/stories/Sxx.md avec ses critères d'acceptation reliés aux tests. À lancer avant de coder un sprint.
---

# Préparer la story suivante

**Une story s'écrit avant le code.** Ses critères sont ce que la revue
vérifiera ; un critère qu'aucun test ne peut prouver se réécrit ou se
déclare « preuve humaine » (CLAUDE.md §10).

## 1. Trouver la story

```bash
ls docs/stories/
grep -n "^| S" docs/EPICS.md
```

C'est le plus petit numéro de `docs/EPICS.md` qui n'a pas encore de fichier
`docs/stories/Sxx.md` avec un verdict. Si la story est marquée **[C]**,
elle ne livre que des propositions : l'écrire dans « Décisions de Cédric
requises ».

## 2. Lire ce qui la nourrit

- la ligne de l'epic et sa persona (`docs/PERSONAS.md`) ;
- `BACKLOG.md` : ce qui s'y rapporte, avec ses mesures et ses dates ;
- la dernière section de `docs/SPRINTS.md` : les restes de la revue
  précédente ;
- le code concerné : lire avant de promettre.

## 3. Écrire `docs/stories/Sxx.md`

Copier `docs/stories/MODELE.md`, puis remplir :

- **un objectif d'une phrase**, du point de vue de la persona ;
- **des critères d'acceptation** numérotés (CA1…), au format « étant
  donné, quand, alors ». Chacun nomme le test qui le prouvera, et la
  manière de le voir rouge ;
- **un hors-périmètre explicite** : ce qui serait tentant et n'est pas
  dans la story ;
- **aucun chiffre inventé** : une cible non mesurée s'écrit « À mesurer »,
  avec la méthode (§2, §6sexies).

## 4. Le go

Le démarrage d'un sprint reste soumis au go de Cédric. Le 17/10, il a
demandé d'enchaîner les sprints : la story s'écrit, puis le sprint
commence.
