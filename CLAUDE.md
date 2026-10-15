# Travailler sur Mousse de Poche

Ce fichier porte les règles qu'aucune machine ne peut vérifier à ma place.
Ce qui est mécanique est dans `.claude/hooks/` et s'exécute tout seul ; ce
qui relève du jugement est ici.

**D'où viennent ces règles.** Les §1 à §10 sont repris de Sentiers
(`Opaland/Rando-generator`, `CLAUDE.md`) : chacune y vient d'un raté réel et
daté, raconté là-bas en détail. Ici, chaque règle est gardée et raccourcie à
sa leçon ; les exemples restent ceux de Sentiers tant qu'aucun raté ne s'est
produit sur ce dépôt. **Une règle nouvelle ne s'ajoute qu'après un raté
observé ici**, daté, comme les autres.

---

## 0. Le contrat de ce projet

Cahier des charges v3 (15/10/2026), à relire en cas de doute. Ce qui prime,
dans l'ordre :

1. sécurité, confidentialité, intégrité du dépôt ;
2. les règles de ce fichier ;
3. **les agents proposent, Cédric décide** : aucune ligne de `data/` ne
   change sans son accord écrit, ligne par ligne ;
4. le budget de `docs/SPRINTS.md`, et l'arrêt quand il est épuisé ;
5. la définition de terminé (§8 du cahier des charges).

Aucune donnée inventée : ni catégorie de vente, ni horaire, ni type de bière,
ni lien, ni chiffre de test, de coût ou de performance. Ce qui n'est pas
établi s'affiche « À confirmer », avec sa raison.

La position de la personne ne quitte jamais le navigateur : aucune requête
(tuiles, liens, issue préremplie) ne la contient.

## 1. Un test qui ne peut pas échouer ne prouve rien

**Avant de croire un test, retirer le correctif et le regarder échouer.**
Un test écrit après coup qui passe du premier coup est suspect. Sur
Sentiers, un test « hors ligne » passait avec et sans le correctif :
`context.setOffline` ne s'applique pas aux requêtes du service worker.

Appliqué ici le 15/10 : le test « le build échoue sur une ligne invalide »
a été vu rouge validation retirée ; les trois règles croisées du schéma
(source, confiance) aussi.

## 1bis. Playwright appelle « visible » des choses que personne ne voit

`toBeVisible` accepte un élément écrêté par un ancêtre `overflow: hidden` ;
`toContainText` lit le `textContent`, `display: none` compris ; une mesure
prise pendant une transition ne dit rien de l'état final. Demander plutôt ce
qui est **peint** (`document.elementFromPoint`) et envelopper toute mesure
d'un `expect.poll`. **Une assertion qui pourrait passer pour une raison qu'on
n'a pas voulue n'est pas une assertion.** Une sonde jetable se configure
comme la vraie (tactile, largeur, état, taille de texte) avant de lire le
premier chiffre.

## 2. Ne pas inventer un seuil, et le dire quand on tranche quand même

Un seuil qui change **ce qui est calculé** ne s'invente pas : on livre le
reste et on écrit ce qu'il faudrait pour trancher. Un seuil qui ne change que
**la présentation** peut se trancher au jugement, à condition de l'écrire
dans le code avec les pistes écartées.

## 3. Une correction de texte se fait sur toutes les surfaces

Il y en a plus qu'on ne croit : composants, `index.html` (bloc
`<noscript>`), README, docs. **`grep` sur la formule, pas sur le fichier.**

## 4. Une garde transverse se nomme, elle ne se recopie pas

Dès qu'une condition est consultée par plusieurs actions, elle devient une
fonction nommée. Ici : `validerBrasseries` sert au build et aux tests, une
seule fois écrite.

## 4bis. Un commentaire qui justifie une existence est une affirmation

Quand une phrase dit « parce que X », X se vérifie, de préférence par un
test.

## 4ter. Deux listes qui disent la même règle ont le même trou

Une fonction partagée ; sinon un test qui asserte que les deux sont
d'accord ; sinon une issue. Jamais un commentaire « penser à mettre à jour
l'autre ».

## 5. Ce qu'on affirme dans une PR, on l'a vérifié

Si une phrase commence par « fonctionne », « garantit » ou « couvre », soit
une commande ou un test la prouve, soit la phrase change.

## 6. Le protocole de développement

Commits en français. TDD sur `src/core`. **La porte avant de committer** —
le hook la lance, `/porte` l'explique : `lint`, `tsc -b --noEmit`,
`vitest`, `build`, `playwright`.

- **`npx tsc --noEmit` ne vérifie rien ici** : références de projet, il faut
  `tsc -b`.
- **Rebuild avant les e2e** : Playwright sert `dist/`.
  `tests/e2e/dist-a-jour.ts` refuse un `dist/` périmé.
- **`PW_CHROMIUM_PATH=/opt/pw-browsers/chromium`** pour toute commande qui
  lance Playwright dans le conteneur.
- **Un seul exécutant Playwright hors CI** : `playwright.config.ts` le pose.

## 6bis. La mutation trouve les tests creux qu'on ne voit pas

Sur Sentiers, `/^https?:\/\//` privée de son `^` acceptait
`javascript:alert(1)#https://x`, qui partait dans un `href`. D'où
`lienSchema`, qui lit le protocole sur l'URL analysée.

## 6ter. Un test qui suppose un ordre échoue seulement en suite complète

Cesser de chercher un ordre sûr ; boucler sur l'état final voulu.

## 6quater. Un contrôle qu'il faut penser à lire ne garde rien

Un contrôle placé avant l'action ne garde que ce que l'action n'a pas encore
changé : il vit là où l'action se produit. D'où la validation des données
**dans** le build (plugin `build/valider-donnees.ts`) plutôt que dans un
script à lancer avant. Ne jamais reconstruire pendant qu'une porte tourne.

## 6quinquies. Un test qui ne regarde qu'un écran ne garde qu'un écran

Ce qui est replié par défaut est ce qu'une sonde oublie par défaut.

## 6sexies. Ce qui est mesurable se mesure ; le reste se décide, et se dit

Un seuil emprunté à une norme se nomme (WCAG 2.5.8 : 24 px).

## 7. Le déploiement se vérifie avant, pas après

Ne rien empiler sur un `main` rouge. La sonde `page-deployee.spec.ts` tourne
après chaque publication ; un déploiement vert sans elle ne prouve rien.

## 8. Après chaque sprint, une revue ; à la fin, une vraie revue globale

`/revue-sprint` relit le diff et lance **la** persona du sprint.
`/revue-globale` regarde l'application, une fois, en S6.

## 9. Ce qui vaut arrêt

- `main` rouge non corrigé.
- Une ligne de `data/` modifiée sans accord écrit de Cédric.
- Une requête qui emporte la position de la personne.
- Le budget du sprint épuisé, ou une tâche à deux fois son estimation.

## 10. Ce qu'on ne ferme pas en prétendant l'avoir fini

Le code peut être fini quand le critère ne l'est pas (une case du §8 qui
demande une preuve humaine, une page publiée non sondée). Le dire.

## 11. La revue adverse se calibre (repris d'ÉtapeForge §11)

Un agent `relecteur-adverse` coûte 50 k à 200 k tokens par passage
(constaté sur ÉtapeForge). Obligatoire pour un changement de code, de
logique ou de sécurité ; pas pour une curation déjà relue par Cédric.

---

## État de reprise

À lire après un `/clear`. Tenu à jour à chaque fin de tâche.

- **Sprint actif : S1 — Socle** (voir `docs/SPRINTS.md`).
- Données : `data/breweries.json` versionné tel que fourni par Cédric le
  15/10 (166 lignes, toutes valides au schéma). Non encore lu par
  l'application.
- Reste à faire en S1 : voir la rubrique « État final » de S1.
- Suite : `BACKLOG.md`.
