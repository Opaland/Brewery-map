<!-- Voir CONTRIBUTING.md. Un seul sujet par PR, partie de main à jour. -->

Closes #

Story : `docs/stories/Sxx.md` (écrite avant le code ; modèle : `docs/stories/MODELE.md`).

## Ce qui change

## Preuves

- Chaque test ajouté a été vu rouge sans le correctif, puis vert.
- `npm run porte` verte en local (lint, `tsc -b`, vitest, garde de `data/`, build, Playwright).

## Données

Une des deux :

- `data/` n'est pas touché.
- `data/` est touché : chaque ligne ajoutée ou modifiée est listée ci-dessous, avec l'accord écrit du mainteneur ou la règle qui la couvre (`docs/DECISIONS.md`).
