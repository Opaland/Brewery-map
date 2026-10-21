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
   change sans son accord écrit, ligne par ligne — ou par la règle qu'il a
   écrite le 18/10 (`docs/DECISIONS.md`), chaque PR listant ses lignes ;
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
prise pendant une transition ne dit rien de l'état final. Sur téléphone,
`innerWidth` et `clientWidth` s'élargissent au contenu qui déborde : un test
de reflow les comparait à `scrollWidth` et restait vert à 544 px pour un
écran de 320 (vu à l'audit du 17/10) — comparer à la largeur posée. Demander plutôt ce
qui est **peint** (`document.elementFromPoint`) et envelopper toute mesure
d'un `expect.poll`. **Une assertion qui pourrait passer pour une raison qu'on
n'a pas voulue n'est pas une assertion.** Une sonde jetable se configure
comme la vraie (tactile, largeur, état, taille de texte) avant de lire le
premier chiffre.

Vu ici le 18/10 (S287) : le test des recouvrements passait avec un bouton
déplacé exprès sur un autre — la transition CSS du bouton laissait la
première lecture à l'ancienne place, et le `expect.poll` s'arrêtait sur
elle. Transitions coupées pour la mesure ; le rouge s'est vu ensuite.

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
`vitest`, la garde de `data/`, `build`, `playwright`.

- **`npx tsc --noEmit` ne vérifie rien ici** : références de projet, il faut
  `tsc -b`.
- **Rebuild avant les e2e** : Playwright sert `dist/`.
  `tests/e2e/dist-a-jour.ts` refuse un `dist/` périmé.
- **`PW_CHROMIUM_PATH=/opt/pw-browsers/chromium`** pour toute commande qui
  lance Playwright, **dans le conteneur cloud seulement** ; sous Windows,
  `npx playwright install chromium` suffit (S302).
- **`npm run porte`** lance toute la porte, sous Linux comme sous Windows ;
  le crochet avant commit (`.claude/hooks/crochet.mjs`) lance la même, sans
  `jq` ni Git Bash. Sous PowerShell : `$env:NOM = "valeur"`, pas de `&&`.
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

## 10bis. La story avant le code, toujours (méthode BMAD adaptée)

Raté du 17/10 : S51 à S54 ont été codés avant que leur story existe, et une
story commune a couvert deux sprints ; la revue a ensuite trouvé quatre
défauts que des critères écrits d'avance auraient posés. Depuis, à la
demande de Cédric (« appliquer la méthode BMAD de façon permanente ») :
**aucun code d'un sprint avant son fichier `docs/stories/Sxx.md`**, critères
et preuves compris (`/preparer-story`, `docs/METHODE.md`).

## 11. La revue adverse se calibre (repris d'ÉtapeForge §11)

Un agent `relecteur-adverse` coûte 50 k à 200 k tokens par passage
(constaté sur ÉtapeForge). Obligatoire pour un changement de code, de
logique ou de sécurité ; pas pour une curation déjà relue par Cédric.

---

## État de reprise

À lire après un `/clear`. Tenu à jour à chaque fin de tâche.

- **S1 à S6 terminés le 15/10** (S4–S6 : code livré, données de contact, bières et horaires encore absentes) (page publiée : https://opaland.github.io/Brewery-map/).
- **Plan v2 validé le 15/10** : 20 sprints de plus (S3 → S22, devenu S23 avec l'ajout de S21 « Partout en France » le 16/10), budget ≈ 4,6 M,
  revue code + revue métier corrigées dans chaque sprint (`docs/SPRINTS.md`).
- **Plan v4 (17/10), demandé par Cédric** (« refais 20 sprints », puis « monte à 100 sprints ; regarde BMAD ») : 100 stories S29 → S128 en douze epics (`docs/EPICS.md`) ; méthode BMAD adaptée sans l'installer (`docs/METHODE.md`, `docs/PRD.md`, `docs/ARCHITECTURE.md`) ; une story par sprint dans `docs/stories/`, écrite avant le code par `/preparer-story`. Faits le 17/10 :
  - S29, premier écran sur téléphone ;
  - S30, la méthode ;
  - S31, restes de S27 ;
  - S32, aperçu sur la carte ;
  - S33, mousse animée ;
  - S34, tournée en image ;
  - S35, carnet des visites ;
  - S36, notes ;
  - S37, sauvegarde par fichier ;
  - S38, QR et affichette ;
  - S39 à S41, la carte ;
  - S42, communes hors ligne ;
  - S43, mesuré, sans changement.
Une PR par sprint ou petit groupe, revue adverse, merge vert, page sondée. Prochaine story : voir l'entrée la plus récente ci-dessous (les numéros anciens d'EPICS.md sans fichier ne sont pas tous à faire).
- **Plan v3 (16–17/10), demandé par Cédric** : S24 finitions ; S25 toute la France (couche OpenStreetMap à part de `data/`, 994 brasseries) ; décisions tranchées (`docs/DECISIONS.md`, `curation/RECOMMANDATIONS.md`) ; audit applicatif (`docs/AUDIT.md`) et S26 correctif ; S27 idées de la veille (`docs/VEILLE-CONCURRENCE.md` : département, tournée, partage d'une fiche, statut fermée) ; S28 design system v2 (`docs/DESIGN.md`), image de partage, `docs/MARKETING.md`, `docs/APPRENDRE.md` ; 40 issues créées (#27–#66).
- **S7 à S23 terminés (15–16/10), puis revue UI/UX globale (16/10, PR #24 : compte collant sans masquer le focus, filtres en colonnes sur ordinateur, zoom 44 px, « Refermer la fiche »)** ; S23 : README, captures (`outils/captures.ts`), brouillon LinkedIn (`docs/LINKEDIN.md`), licence des données à décider par Cédric ; S22 : revue globale corrigée (repli du service worker sur 404, bandeau de nouvelle version, zone vide guidée) ; S21 : communes de France cherchées (fin de la liste déroulante), localisation refaite, bouton « Installer » ; S18 : accessibilité mesurée (`tests/e2e/accessibilite.spec.ts`) ; S19 : « Y aller » (destination seule) et « ouvert maintenant » ; S20 : carte chargée à l'approche (Lighthouse mobile 64 → 100), frontière d'erreur ; les 101 « À confirmer » ont tous été revus une fois ; la veille (S15) attend « arme la veille » de Cédric ; six lots attendent la décision de Cédric (`curation/s11-exemples-s4.md`, `curation/s12-lot-1.md`, `curation/s13-lot-2.md`, `curation/s14-decouverte-resume.md`, `curation/s16-lot-3.md`, `curation/s17-lot-4.md`) ; enchaînement S9 → S22 demandé par Cédric (« enchaîne les sprints avec revue + revue globale »).
- **Plan v5 (17/10), demandé par Cédric** : 200 sprints (`docs/EPICS.md`, S29 → S228), « en agentic total ». S48–S50 (anglais) livrés (PR #80). Ses remarques du 17/10 (Untappd absent, position ≠ adresse, bières absentes) traitées en S51–S54 : recherche Untappd dans la fiche, procédure de position, et deux lots à décider : `curation/s53-untappd-bieres.md` (42) et `curation/s54-positions.md` (73).
- **17/10 (suite)** : PR #81 et #82 mergées et déployées. Revue d'architecture (`docs/REVUE-ARCHITECTURE.md`) : rester en JSON + IndexedDB, agentique d'abord en CI après une garde de `data/` ; stories S229–S243 exécutées avant S56. S229, S230, S232–S239 faits (PR #83, #84 : garde de `data/`, position gardée dans les e2e, WebKit et Firefox en CI informatif `docs/NAVIGATEURS.md`, budget de poids, tests de composants, crochets, versions du stockage, mutation `docs/MUTATION.md`) ; S244 fait (`docs/SIRENE.md` : SIRENE trouve 2 à 4 fois plus qu'OSM). Lots en attente de Cédric : `curation/s53-untappd-bieres.md`, `s54-positions.md`, `s134-sites-bieres.md` ; décisions demandées : dates des bières (règle S11), procédure de déménagement (10 brasseries dans une autre commune, 12 lignes, `s55-positions-2.md`). Prochaine story : S240 (tests visuels), puis S241, S245–S247 (pilote Manche–Calvados).
- **18/10** : S250 parties 1 à 6 mergées (PR #94 : 75 fiches proposées en Pays de la Loire et Indre-et-Loire ; quota de recherches épuisé, 7 candidats d'Indre-et-Loire « À relancer », puis 45, 41, 18, 36, 28). Sans recherche web : S59 (la fiche ne promet plus « centre de la commune, à environ 2 km près », `docs/PRECISION.md`, PR #95), S60 (étiquettes OSM des fiches, `curation/s60-etiquettes-osm.md`, PR #96), S61 (lot de 8 sites venus d'OSM, S62 fondue, PR #97). S63 (7 propositions d'horaires). Prochaine story : S64 (SIRENE, adresses de siège).
- **18/10, règle de Cédric** (`docs/DECISIONS.md`, « site officiel + contrôlé », PR listant ses lignes) : S264–S265 (PR #99, tri `curation/decision-regle.md`), S266 (62 propositions, 44 fiches dans `data/`, aucun mobile, PR #100) ; S239 suite (mutation de nuit réparée, PR #101) ; S267 (téléphone sur Google Maps, sauf fiches OSM ; feuille de route E26 et E27, `docs/DEPOTS-FRERES.md`, PR #102) ; S268 (139 fiches au centre IGN, précision `centre`, PR #103) ; S269 (36 fiches de Normandie, PR #104) ; S270 (81 fiches de Bretagne, PR #105) ; S271 (75 fiches des Pays de la Loire et d'Indre-et-Loire, 358 en tout ; couche OSM à 878 ; budget du premier écran refixé, S293 prévue). S272 (liste « à montrer » par groupe, `curation/A-MONTRER.md`, en attente des réponses de Cédric). S293 (premier écran mesuré, `docs/PREMIER-ECRAN.md` : chargement par département, S294, à faire avant 600 fiches), PR #107. S273 (hôtes de la CSP nommés dans le texte de confidentialité) et S274 (point de rupture 900 px, une seule règle), PR #108 ; S275 (`navigator.storage.persist` après un geste qui ajoute au carnet), PR #109 ; S276 (bloc `<noscript>` testé) et S277 (sonde de nuit des sept services, `.github/workflows/sonde-nuit.yml`), PR #110 ; S278 (audit de la suite e2e dans la porte, `outils/audit-e2e.ts`), PR #111 ; S279 (`docs/LIVRAISON.md`, 16 gestes sur un vrai téléphone, **à dérouler par Cédric**), PR #112 ; S280 (requêtes des outils comptées par hôte, `outils/requetes.ts`), PR #113 ; S281 (`docs/CONTINUITE.md`), PR #114 ; S282 (fuzz à graine fixe des entrées non sûres, `tests/unit/fuzz.test.ts`), PR #115 ; S283 (`npm audit` : bloquant pour ce que la page embarque, chaque nuit pour l'arbre entier), PR #116 ; S284 (agent `relecteur-de-promesses` ; premier passage : deux textes corrigés, trois promesses au BACKLOG), PR #117 ; S285 (agent `chasseur-de-jumeaux` ; premier passage : deux désaccords corrigés, quatre paires tenues, quatre au BACKLOG), PR #118 ; S286 (le singe, `SINGE=1`, hors de la porte), PR #119 ; S287 (règles d'écran : 4 largeurs × 2 tailles de texte, rien ne déborde ni ne se recouvre), PR #120 ; S288 (deux angles de revue : workflows, contributrice externe ; `CONTRIBUTING.md`, `visuel-references` en deux jobs). Suite : E27 (S289 →, [C]), S294 avant que `data/` passe 600 fiches.
- **19–20/10, reprise sur le PC fixe sous Windows** : revue globale du 19/10 (`docs/REVUE-GLOBALE-2026-10-19.md`) ; S302 (groupe W, plus W6 à W8 vus sur le poste) : la porte tourne sous PowerShell, `npm run porte`, crochets en Node, port local 4317. Suite, dans l'ordre de la revue : A10, A3, A1, A5, A6, A11, puis A4 et A7 ; T1 à T6 ; C1 à C4.
- **20/10, PC fixe** : porte verte sur `main` ; S303 (A10, A3, A1, A5, A6, A11 ; E29 dans EPICS.md ; PR #144) ; S304 (A4, A7, et W9 : `fs.rmSync` muet dans un chemin accentué sous Node 24, d'où `build/vider-dist.ts`). **Budget du premier écran à 25 octets près : S294 avant toute nouvelle fonction du premier écran.** S305 (T1 à T6 : chiffres de la doc tenus par `tests/unit/chiffres-ecrits.test.ts`). S306 (C1 à C4 : état de `main` lu sur `ci.yml` seul, tout commit reconnu quelle que soit son écriture, garde de `data/` dans la porte locale, test instable rouge en CI). S307 (A8, A9 : couleurs sur la carte en thème sombre). S294 (fiches en deux temps : premier écran 189 402 octets, budget 208 000 ; PR #149, déployée). S308, demande de Cédric (« personne ne parle comme cela ») : la fiche dit ce qui manque une fois, les parties vides disparaissent, la provenance en une phrase (PR #150, déployée). S310 : ce que le premier écran attend, mesuré sans changement. S309 et S311 : lots `curation/s309-rhone-adresses` et `curation/s311-adresses-lyon-2` (30 fiches sans adresse autour de Lyon, 14 propositions, dont Ninkasi Brignais ; PR #151) **en attente de la réponse de Cédric**, quatre questions dans la PR. S312 : dates dites une fois par site, « maintenant » une fois (PR #152). S313 : captures du README refaites. S314 : troisième lot d'adresses (11 propositions, PR #154) **en attente de Cédric**, comme S309 et S311. S315 : le compte n'accuse plus le carnet à tort (`videAussiSans`). S316 : lexique des styles de bière. S317 : une annonce redite est un nouveau nœud de la région vivante. **Question posée à Cédric** : remplacer « Confiance faible / moyenne / élevée » par des phrases (son choix du mot « élevée » le 15/10, et le cahier des charges, en dépendent). Suite : le BACKLOG (signalement sans GitHub, palette sur autoroute, LD9), et les 68 fiches sans adresse restantes, par lots, une fois les trois lots en attente tranchés.
- **20/10, soir, réponses de Cédric** (consignées dans `docs/DECISIONS.md`, « Réponses de Cédric du 20/10 ») : S319 (barre décollée, le focus reste près du geste, PR #160) ; S320 (la confiance dite en phrases, PR #161) ; S322 (une fiche peut déménager par lot, PR #162) ; S321 et S322 données (sept fermées d'après SIRENE, trois déménagements) ajoutées à la **PR #159**, qui porte aussi les adresses S309/S311 et **attend la revue de Cédric** ; S323 (quatrième lot d'adresses, 7 propositions, PR #163) **en attente de ses numéros**, comme S314 (PR #154 mergée, lot sans réponse) et le reste de S309/S311. Portables de Manev'Ale et Chanaz : gardés quand leurs propositions seront acceptées. Suite : les fiches sans adresse restantes sont loin de Lyon (la suivante à 407 km) ; BACKLOG.
- **21/10, PC fixe, revue de reprise** (go de Cédric : « autonome toute la journée » ; revue, puis tâches internet, puis epics + stories, sprints d'un epic au plus, revue + démo persona à chaque sprint). E30, « ce que le PC connecté débloque » : S324-S325 (couche OSM réextraite, 880 points, le serveur Overpass principal refuse l'usage automatisé ; `contact:*` lu ; huit communes retrouvées, notation scientifique de Wikidata ; PR #164) ; S326-S327 (lots `s326-relues-du-poste`, `s327-a-relancer`, PR #165) ; S328 (cinq lots du Centre-Val de Loire, 19 fiches, PR #166). Tous **en attente de Cédric**, avec la PR #159. Puis E31 à E35 (`docs/EPICS.md`) : S329 (cet état), S330-S331 (ce que l'écran dit de faux), S332 (finitions), S333 (stockage), S334 (CI et outils). **Prochaine story : S330.**
- **En attente de Cédric** : accord sur 5 numéros d'exemple (SPRINTS.md, S4) et permission d'écrire dans `data/` (refusée par le contrôle de la session le 15/10).
- Décision de Cédric (15/10) : **autonome dans les PR** — une PR verte et
  sans conflit se merge sans attendre, et le déploiement se vérifie après.
  Le démarrage d'un sprint reste soumis à son go.
- Données : `data/breweries.json`, fourni par Cédric le 15/10 (166
  lignes), modifié depuis seulement par ses accords et sa règle du 18/10 :
  348 lignes le 20/10.
- Suite : `BACKLOG.md` (dont la demande de Cédric du 16/10 : communes de France, open data, vraie position, nouveautés du mois).
