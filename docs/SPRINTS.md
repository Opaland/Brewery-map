# Sprints — Mousse de Poche

Six sprints, un seul actif à la fois. Un sprint est **Terminé** quand tous
ses critères de sortie sont vérifiés et que sa porte est verte ; sinon il est
**Suspendu** (budget épuisé, décision attendue) ou **Bloqué** (dépendance
externe). Il ne se réduit pas après coup pour être déclaré terminé.

## Budget global

Validé par Cédric le 15/10/2026 : **2,5 M tokens** et **10 h** de travail
agentique, répartis selon le cahier des charges (§6).

**Ce qui se mesure réellement, et ce qui ne se mesure pas.** L'agent voit un
compteur de tokens restants, mais ce compteur **repart de zéro à chaque
message de Cédric** (constaté : 15 000 000 au début du premier et du second
message). La consommation se relève donc *par tour* (début → fin), puis se
somme ici. Le coût monétaire n'est pas visible : il n'est pas estimé. La
durée se relève sur l'horodatage des commits.

| Sprint | Budget tokens | Durée cible | Consommé (relevé) | État |
|---|---:|---:|---:|---|
| S1 | 375 k | 1 h 30 | ≈ 245 k (audit compris) | **terminé** le 15/10 |
| S2 | 500 k | 2 h | ≈ 185 k (dont revues : 59 k) | **terminé** le 15/10 |
| S3–S6 (plan v1) | — | — | — | remplacés par le plan v2 (validé le 15/10) |
| S3 | 180 k | — | ≈ 110 k (dont revues : 56 k) | **terminé** le 15/10 |
| S4 | 180 k | — | ≈ 95 k (dont revues : 44 k) | **terminé** le 15/10 (code ; données en attente) |
| S5 | 180 k | — | ≈ 90 k (dont revues : 44 k) | **terminé** le 15/10 (code ; données absentes) |
| S6 | 180 k | — | ≈ 110 k (dont revues : 49 k) | **terminé** le 15/10 (code ; données absentes) |
| S7 | 180 k | — | ≈ 110 k (dont revues : 49 k) | terminé, page publiée sondée (porte, déploiement, sonde vertes) |
| S8 | 180 k | — | non relevé précisément (revues comprises) | terminé, mergé (#8), page publiée sondée |
| S9 | 180 k | — | non relevé précisément (revues : 77 k) | terminé, mergé (#9), page publiée sondée |
| S10 | 180 k | — | non relevé précisément (revues : ≥ 66 k) | terminé, mergé (#10), page publiée sondée |
| S11 | 200 k | — | non relevé précisément (revues : 92 k ; vérification du lot : 88 k) | mergé (#11), lot en attente de Cédric |
| S12 | 300 k | — | agents 167 k + revues 92 k | terminé (#12) ; lot en attente de Cédric |
| S13 | 300 k | — | agents 157 k + revues 78 k | terminé (#13) ; lot en attente de Cédric |
| S14 | 200 k | — | revues 115 k (code non relevé) | terminé (#14) ; lot en attente de Cédric |
| S15 | 200 k | — | revues 68 k | terminé (#15) ; armement en attente |
| S16 | 300 k | — | agents ≈ 222 k + revues 101 k (dépassement de 8 %) | terminé ; lot en attente de Cédric |

Une tâche qui dépasse deux fois son estimation s'arrête et se signale.

---

## S1 — Socle

1. **Objectif.** Un dépôt qui se construit, se vérifie et se publie, avec la
   méthode de Sentiers en place et un schéma de données qui fait échouer le
   build.
2. **Périmètre.** Vite + React + TypeScript strict ; ESLint, Vitest,
   Playwright repris de Sentiers ; schéma Zod d'une brasserie et plugin de
   build qui le fait respecter ; hook `porte-avant-commit.sh`, skills `porte`,
   `revue-sprint`, `revue-globale`, agents `relecteur-adverse`,
   `verificateur-de-tests`, `relecteur-de-persona` ; workflows CI et Pages ;
   coquille d'application (titre, pied de page avec la mention alcool) ;
   `CLAUDE.md`, `BACKLOG.md`.
3. **Critères de sortie.**
   - `npm run lint`, `npx tsc -b --noEmit`, `npx vitest run`, `npm run build`,
     `npx playwright test` verts en local ;
   - un JSON de brasseries invalide **fait échouer `vite build`** — montré
     rouge puis vert (CLAUDE.md §1) ;
   - CI verte sur la PR ; après merge, la page Pages répond et la sonde
     `page-deployee.spec.ts` est verte dans le workflow de déploiement.
4. **Persona juge.** Cédric — peut-il ouvrir l'URL publique sur son téléphone
   et comprendre ce que l'application promet, sans croire qu'elle tient déjà
   ce qu'elle ne tient pas ?
5. **Budget.** 375 k tokens, 1 h 30.
6. **Durée estimée.** 1 h 30.
7. **Exclus.** Carte, données réelles, service worker, géolocalisation.
8. **Risques et dépendances.** GitHub Pages doit être activé (source :
   GitHub Actions) dans les réglages du dépôt — action de Cédric. La sonde de
   la page publiée ne tourne que dans le workflow : Chromium ne sort pas du
   conteneur (mesuré sur Sentiers le 27/08).
9. **État final et restes.** **Terminé le 15/10.** PR #1 mergée
   (`31cbd21`) ; run « CI et déploiement » n° 5 sur `main` : porte,
   déploiement et sonde `page-publiee` verts. Page
   https://opaland.github.io/Brewery-map/ : 200, titre attendu, les deux
   assets en 200 (relevé `curl` depuis le conteneur).

   *Historique — suspendu le 15/10 en attente de Cédric :*
   - Fait et vérifié : porte locale verte (lint, `tsc -b`, 14 tests
     unitaires, build, 4 e2e + 1 sautée) ; build rouge sur ligne invalide,
     vu rouge sans la validation ; les 166 lignes réelles passent le schéma ;
     sonde de la page publiée vue verte (racine) et rouge (sous-chemin
     inexistant) contre `vite preview` ; hook de porte vu refuser un commit
     cassé. PR #1 ouverte.
   - Reste, et qui le débloque : activer GitHub Pages (Source : GitHub
     Actions) dans les réglages du dépôt — **Cédric** ; CI verte sur la PR ;
     merge — **Cédric** ; sonde de la page publiée verte dans le workflow.
   - Consommé : audit ≈ 118 k tokens + S1 ≈ 112 k au moment de la PR, soit
     ≈ 230 k sur 375 k (relevé sur le compteur par tour, voir « Budget »).
     Durée : non mesurée de façon fiable (pas d'horodatage de début).
   - **Revue de persona — Cédric** (faite en ligne, sans agent, pour tenir
     le budget ; constats vérifiés par lecture du code et du fichier) :
     - *Bloquant, attendu en S1* : la page publiée n'affiche aucune
       brasserie ; elle le dit (`etat-construction`, testé dans
       `accueil.spec.ts`).
     - *Bloquant à venir (S2/S3)* : la catégorie 1 « Acheter et consommer
       sur place » ne dit pas **quand**. Sur les 36 lignes en catégorie 1, 16
       ne mentionnent pas le samedi dans `note`, et 4 reposent sur une vente
       « déduite » ou « non vérifiée » (Ninkasi Brignais, La Chénou, Ninkasi
       Saint-Étienne, L'Agrivoise). Exemple : Bière bio des Monts d'Or est
       en catégorie 1, mais sa note dit « fermée d'octobre à mai ». Le
       15/10, Cédric s'y rendrait pour rien. → S3 : afficher `note` en
       entier sur la fiche et sur la liste, sans le résumer ;
       BACKLOG D1.
     - *Vérifié sans obstacle* : la mention sanitaire est dans le pied de
       page (testé) ; les quatre catégories sont nommées en clair (testé).

## S2 — Carte et découverte

1. **Objectif.** Trouver une brasserie par nom, commune ou rayon, sur une
   liste qui ne dépend pas de la carte.
2. **Périmètre.** Import de `data/breweries.json` tel qu'il est (sans
   curation) avec table de correspondance documentée vers le schéma ; carte
   MapLibre (moteur de Sentiers) ; liste synchronisée ; quatre catégories ;
   recherche nom/commune ; rayon ≤ 100 km depuis Brignais (45.6745, 4.7545) ;
   attribution OSM visible.
3. **Critères de sortie.** Le JSON réel passe le schéma ou chaque rejet est
   expliqué et tranché par Cédric ; un test e2e trouve une brasserie par
   commune **sans toucher la carte** ; les quatre catégories ont un libellé
   en clair ; porte verte.
4. **Persona juge.** Marie.
5. **Budget.** 500 k tokens, 2 h.
6. **Durée estimée.** 2 h.
7. **Exclus.** Fiche détaillée, types de bière, hors-ligne, clustering si
   les mesures ne le justifient pas.
8. **Risques et dépendances.** Levé : `data/breweries.json` fourni le 15/10.
   Décisions de Cédric au go : distances calculées par l'application,
   marqueurs groupés.
9. **État final et restes.** Critères de sortie tenus en local le 15/10 :
   les 166 lignes passent le schéma (et l'unicité des noms, ajoutée) ;
   `decouverte.spec.ts` trouve une brasserie par commune sans toucher la
   carte ; les quatre catégories sont nommées en clair et filtrent ; porte
   verte (lint, `tsc -b`, 31 tests unitaires, build, 16 e2e + 1 sauté).
   **Terminé le 15/10** : PR #2 verte puis mergée (`11b03ca`) ; run
   « CI et déploiement » sur `main` : porte, déploiement et sonde
   `page-publiee` verts. Relevé `curl` sur la page publiée : page, CSS, JS
   principal, morceau `Carte` et worker MapLibre en 200 ; les données
   (« Soucieu-en-Jarrest ») sont dans le JS servi.

   **Revue de persona — Marie** (agent `relecteur-de-persona`, 22 k tokens) :
   aucun bloquant. Gênants : « À confirmer » sans raison dans la liste (101
   lignes sur 166) → **corrigé**, la raison (`note`) s'affiche, test vu
   rouge sans elle ; « Lyon » absent de l'exemple de recherche → **corrigé** ;
   distances comptées depuis Brignais alors qu'elle pense « près de Lyon » →
   **laissé** : l'origine par défaut est fixée par le cahier des charges,
   « autour de moi » arrive en S4. Non prouvé : les cibles de 44 px (aucun
   test ne les mesure → S6).

   **Revue adverse** (agent `relecteur-adverse`, 37 k tokens) :
   - « st etienne » ne trouvait pas « Saint-Étienne », « brassin » ne
     trouvait pas « Le Brass'in » → **corrigé** (alias st/ste, forme collée
     des apostrophes), tests vus rouges avant ;
   - la carte se recentrait à chaque frappe → **corrigé** ;
   - rien n'imposait l'unicité des noms, dont dépend la sélection →
     **ajouté au schéma**, test vu rouge avant ;
   - un groupe qui ne se sépare pas au zoom max n'ouvre que sa première
     brasserie → **non atteignable avec ces données** : seules les
     coordonnées identiques restent groupées (paires voisines toutes à
     plus de 640 m, rayon de groupe ≈ 240 m au zoom 14), écrit dans le
     code ;
   - une brasserie choisie à l'intérieur d'un groupe n'a pas de retour
     visuel sur la carte → BACKLOG.

   Mesures et constats relevés :
   - **Web Worker non retenu** : `rechercher` sur les 166 lignes coûte
     0,33 ms par appel (Node, conteneur 4 cœurs, 2 000 appels après 200 de
     chauffe, le 15/10). Sur un téléphone ancien, l'écart n'est pas mesuré ;
     même à 20 fois plus lent, on resterait sous une image (16 ms) — c'est
     une estimation, pas une mesure.
   - **Raté du jour, attrapé par une capture et non par un test** : la carte
     s'affichait sans aucun marqueur (couche de texte sans police, puis
     worker MapLibre introuvable après bundling) alors que le test « la carte
     se dessine » était vert — il ne regardait que le canvas (§1bis). Les
     tests comptent maintenant les marqueurs ; ils ont été vus rouges sur ce
     défaut réel (attendu 44, reçu 0).
   - Tests vus rouges sans leur correctif : distance sans lire `km` ; repli
     sans WebGL ; aucun hôte tiers hors tuiles OSM.

## Plan v2 — 20 sprints de plus (S3 → S22), **validé par Cédric le 15/10**

Budget validé : ≈ 4,6 M tokens pour tout le projet. Untappd confirmé.
Décisions S3 : confiance affichée « élevée » pour `solide` ; `note` affichée
comme « Ce que dit la source ».

Demandé par Cédric le 15/10 : au moins 20 sprints, une revue **code** et une
revue **métier** après chaque sprint, corrigées dans le sprint, d'autres
personnages si besoin, et trois besoins nouveaux — le téléphone de la
brasserie, un lien vers sa page Untappd *(« un tape » compris comme Untappd,
à confirmer)*, et la reconfirmation des « À confirmer » quand une brasserie
apparaît ou change de statut.

Ce plan remplace S3–S6 du plan v1, dont le contenu est repris et réparti.
Le cahier des charges limitait le projet à six sprints pour éviter un
périmètre sans fin : ce changement est une décision de Cédric, notée ici
comme telle.

### La règle commune à chaque sprint

1. Développement sur `src/core` en TDD ; porte verte avant chaque commit.
2. **Revue code** : agent `relecteur-adverse` sur le diff du sprint.
3. **Revue métier** : agent `relecteur-de-persona` avec **la** persona du
   sprint (deux au plus).
4. **Correction dans le sprint** de ce que les deux revues trouvent ; ce qui
   ne tient pas dans le sprint va dans `BACKLOG.md`, nommé.
5. PR, CI verte, merge (autonomie accordée le 15/10), sonde de la page
   publiée. Le sprint est **terminé** seulement là.
6. Le sprint suivant attend le go de Cédric — sauf s'il décide d'enchaîner.

**Aucune ligne de `data/` ne change sans son accord écrit, ligne par ligne**,
y compris dans une PR verte : l'autonomie dans les PR ne couvre pas les
données (CLAUDE.md §0).

### Les sprints

| # | Objectif en une phrase | Persona juge |
|---|---|---|
| S3 | Une fiche détaillée : source cliquable, date de vérification, confiance expliquée, précision des coordonnées, justification en entier. | Cédric |
| S4 | Contact : schéma `tel`, `site`, `untappd` ; bouton « Appeler » (`tel:`), lien site, lien Untappd ; « non renseigné » sinon. | Cédric |
| S5 | Types de bière : liens produit → annuaire → « non référencé » ; filtre par type expliqué en mots simples. | Karim |
| S6 | Horaires structurés quand une source les donne ; « ouvert samedi ? » sans jamais déduire. | Cédric |
| S7 | PWA installable, `sw.js` maison, fiches consultables hors ligne, repli de carte sans tuiles. | Bernard |
| S8 | Point de départ au choix : Brignais, « autour de moi » (sur action, la position reste dans le navigateur, et l'écran le dit) ou une commune des données — demande de Cédric du 15/10 : « pouvoir faire plus loin que Brignais ». | Léa |
| S9 | Préférences et favoris dans IndexedDB, sur l'appareil seulement. | Marie |
| S10 | « Signaler une erreur » : issue GitHub préremplie, sans backend ni donnée personnelle. | Une brasserie |
| S11 | Outillage de curation : agent `verificateur-de-brasserie` (lecture seule), skill `lot-de-curation`, champ `verifieLe`, diff lisible. | Une brasserie |
| S12 | Curation, lot 1 : 25 « À confirmer » les plus proches — statut, téléphone, site, Untappd, horaires. | Cédric |
| S13 | Curation, lot 2 : les 25 suivants. | Marie |
| S14 | Nouvelles brasseries : comparer OSM (`craft=brewery`) et data.gouv.fr au fichier, proposer les ajouts — y compris au-delà des 100 km de Brignais où s'arrête le fichier (demande du 15/10). | Cédric |
| S15 | Veille : une tâche planifiée revérifie chaque mois les fiches les plus anciennes et les nouveautés, et ouvre une PR de **proposition**. | Une brasserie |
| S16 | Curation, lot 3. | Karim |
| S17 | Curation, lot 4 (les 101 « À confirmer » sont alors tous revus au moins une fois). | Bernard |
| S18 | Accessibilité : lecteur d'écran, clavier, contrastes et cibles de 44 px **mesurés**. | Inès *(nouvelle)* |
| S19 | « Y aller » : lien vers une application de navigation avec la **destination seule**, jamais l'origine. | Hugo *(nouveau)* |
| S20 | Performance et téléphones anciens : Lighthouse sur le build de production, poids de la carte. | Bernard |
| S21 | Revue globale de l'application, et ses corrections. | toutes |
| S22 | Livraison : README, licence, attributions, captures, GIF, post LinkedIn. | toutes |

### Comment les « À confirmer » se reconfirment

Il n'y a pas de serveur : rien ne peut « écouter » une brasserie qui change.
La reconfirmation est donc **périodique et proposée**, jamais automatique :

1. **Signalement** (S10) : une brasserie ou un visiteur ouvre une issue
   préremplie ; elle entre dans la file du lot suivant.
2. **Découverte** (S14) : comparaison entre OSM, data.gouv.fr et le fichier ;
   les brasseries absentes du fichier deviennent des propositions d'ajout,
   en « À confirmer » tant qu'aucune source ne dit plus.
3. **Veille** (S15) : chaque mois, une session planifiée revérifie les fiches
   dont `verifieLe` est le plus ancien, plus les signalements ouverts, et
   ouvre une PR qui **propose** les changements, chacun avec sa source et sa
   date.
4. **Décision** : Cédric accepte ou refuse ligne par ligne ; seules les
   lignes acceptées entrent dans `data/`.

### Ce qui est vérifié, et ce qui ne l'est pas, sur l'accès au web (15/10)

- **Sites officiels : lisibles.** WebFetch sur la page TapRoom de Nomade
  Brewery rend le téléphone et les horaires. La page porte **deux numéros**
  (la brasserie et un food truck) : l'agent devra dire lequel il retient et
  pourquoi.
- **Overpass (OSM) : 503** à l'essai du 15/10. Peut-être passager ; à
  réessayer en S14, sinon S14 est bloqué et le sera écrit.
- **Untappd** : `robots.txt` n'interdit que `/brewery-claims` aux robots.
  On **lie** vers une page Untappd vérifiée ; on ne recopie ni notes ni avis.
- **Téléphones** : seulement un numéro que la brasserie publie elle-même
  pour ses clients, avec sa source. Un numéro de portable trouvé ailleurs
  (une note du fichier en cite un, Brasserie Animus) n'est pas repris sans
  l'accord de Cédric.

### Budget proposé

Mesuré : S1 ≈ 245 k tokens (audit compris), S2 ≈ 185 k dont 59 k pour les
deux revues. Les sprints de curation coûteront plus (25 pages lues par lot) ;
ce n'est pas encore mesuré.

| Type | Sprints | Par sprint (estimé) | Total |
|---|---|---:|---:|
| Fonctionnalité | S3–S10, S18–S20 (11) | 180 k | 1 980 k |
| Outillage, découverte, veille | S11, S14, S15 (3) | 200 k | 600 k |
| Curation (lot de 25) | S12, S13, S16, S17 (4) | 300 k | 1 200 k |
| Revue globale, livraison | S21, S22 (2) | 200 k | 400 k |
| **Total S3–S22** | 20 | | **≈ 4,2 M** |

Soit environ 4,6 M pour tout le projet (2,5 M validés au départ) : **validé
le 15/10**. Durée : non estimable de façon fiable — la durée de S1 et S2
n'a pas été mesurée.

---

## S3 — Fiche détaillée *(terminé le 15/10)*

1. **Objectif.** Une fiche qui dit ce qui est établi, d'où ça vient, et ce
   qui ne l'est pas.
2. **Périmètre.** Fiche dépliée sous sa ligne : adresse, source cliquable
   (ou « aucune source »), date de vérification (ou « non renseignée »),
   confiance et son sens, précision de la position ; justification titrée
   « Ce que dit la source » ; champ `verifieLe` au schéma ;
   `docs/DONNEES.md`.
3. **Critères de sortie.** Aucune valeur absente remplacée par une valeur
   inventée (tests) ; tests vus rouges sans la fiche ; revues code et métier
   faites et corrigées ; porte verte ; page publiée sondée.
4. **Persona juge.** Cédric.
5. **Budget.** 180 k tokens.
6. **Exclus.** Téléphone, site, Untappd (S4), types de bière (S5), horaires
   structurés (S6).
7. **État final et restes.** **Terminé le 15/10** : PR #3 verte puis
   mergée (`1ea0ecb`) ; run sur `main` : porte, déploiement et sonde
   `page-publiee` verts ; le JS servi contient l'avertissement sur les
   horaires (relevé `curl`).

   **Revue métier — Cédric** (agent, 27 k tokens) : aucun bloquant.
   - **Corrigé** : la définition de « élevée » promettait des horaires, ce
     que cinq lignes `solide` démentent ; nouvelle définition sans horaires,
     et un avertissement sous chaque confiance (« la confiance ne garantit
     pas les horaires »), testé.
   - **Données, non modifiées** (§0) : trois lignes en catégorie 1
     contredites par leur propre justification (Val d'Ainan, L'Etincelle,
     Bière bio des Monts d'Or) → BACKLOG D9, priorité du lot S12 ;
     justifications datées → D10.
   - Fraîcheur : `verifieLe` absent partout, la fiche le dit ; rempli par la
     curation.

   **Revue code** (agent, 29 k tokens) : aucun bloquant.
   - **Corrigé** : choisie depuis la carte, la fiche pouvait s'ouvrir hors
     champ (on faisait défiler le bouton, pas la ligne dépliée) ; test
     ajouté.
   - **Corrigé** : le test de la fiche reposait sur `toBeVisible` et
     `toContainText`, que §1bis déconseille ; il demande maintenant ce qui
     est peint (`elementFromPoint`) et lit le libellé seul.
   - Choix documenté dans le code : la carte ouvre toujours, seule la liste
     referme.
   - Vérifié sans défaut : `hoteDeSource` ne peut pas lever sur une source
     validée ; `z.iso.date()` refuse les dates que `new Date` décalerait ;
     exhaustivité des libellés imposée par le typage ; ids uniques.

---

## S4 — Contact *(terminé le 15/10 — code ; données en attente)*

1. **Objectif.** Joindre la brasserie depuis sa fiche : appeler, ouvrir son
   site, sa page Untappd — ou savoir que ce n'est pas renseigné.
2. **Périmètre.** Schéma `contact` (tel, site, untappd, source, verifieLe ;
   source et date obligatoires) ; bloc contact en tête de fiche ; bouton
   « Appeler » (`tel:+33…`) ; liens externes sans référent ; « non
   renseigné » sinon ; docs/DONNEES.md.
3. **Critères de sortie.** Un numéro sans source refusé par le schéma
   (test) ; rendu du contact testé (avec et sans) ; aucun numéro inventé
   (e2e) ; revues code et métier faites et corrigées ; porte verte ; page
   publiée sondée.
4. **Persona juge.** Cédric.
5. **Données.** Cinq numéros d'exemple relevés le 15/10 sur les sites
   officiels (Nomade Brewery, GreDam, Brasserie Kachmar, Microbrasserie de
   Montchat, Brasserie Stéphanoise). **Leur écriture dans `data/` a été
   refusée par le contrôle de permissions de la session** — conforme à la
   règle §0 : elles attendent l'accord explicite de Cédric, ligne par ligne.
   Le code est livré sans elles ; la fiche dit « non renseigné » partout.
6. **État final et restes.** Revues faites (code 24 k, métier 20 k
   tokens), corrections appliquées le 15/10 :
   - **Revue métier (Cédric)** — bloquant hors code : aucune ligne n'a de
     contact, il ne peut appeler personne tant que les exemples ne sont pas
     acceptés. Corrigé : deux justifications citent un numéro (Animus,
     Pleine Lune) ; la fiche ne dit plus « non renseigné » mais « la source
     en cite un, non revérifié » (e2e sur Animus) ; « Page Untappd » devient
     « Untappd (avis sur les bières) ».
   - **Revue code** — corrigé : 08 (numéros spéciaux) refusés ; contact
     vide refusé ; nom de la brasserie ajouté au nom accessible des liens ;
     test des liens externes qui ne dépend plus de l'ordre des attributs et
     compte tous les liens http. Documenté et inscrit au BACKLOG : numéros
     d'outre-mer non gérés (aucun dans le fichier).
   - Porte : 51 tests unitaires, 23 e2e. PR #4 verte puis mergée
     (`f44ef5b`) ; run sur `main` : porte, déploiement, sonde verts ; le JS
     publié contient « Téléphone : non renseigné ».
   - **Critère d'usage non atteint** (§10) : personne n'est appelable tant
     que les numéros d'exemple n'ont pas l'accord de Cédric.

---

## S5 — Types de bière *(terminé le 15/10 — code ; données absentes)*

1. **Objectif.** Dire quelles bières une brasserie propose, avec un lien
   quand il existe, et filtrer par type en mots simples.
2. **Périmètre.** Section « Ses bières » dans la fiche : lien vers la page
   de la bière, sinon fiche d'annuaire de la brasserie, sinon « non
   référencé » ; chaque type expliqué (« IPA — très houblonnée, plus
   amère ») ; filtre par type qui ne propose que les types présents, et le
   dit quand il n'y en a aucun.
3. **Critères de sortie.** Ordre des liens testé ; types affichés et schéma
   d'accord (test) ; filtre testé ; aucune bière inventée ; revues code et
   métier faites et corrigées ; porte verte ; page publiée sondée.
4. **Persona juge.** Karim.
5. **Données.** Aucune brasserie n'a de bière au 15/10 : la fiche dit « non
   référencés », le filtre dit qu'il est vide. Les types se rempliront par
   la curation (S12 et suivants), avec l'accord de Cédric.
6. **État final et restes.** Revues faites (code 22 k, métier 22 k).
   - **Revue métier (Karim)** — bloquant hors code : aucune bière ni fiche
     d'annuaire dans le fichier ; **le critère n'est pas atteint sur les
     données réelles** (§10), seulement prouvé par les tests. Corrigé : le
     lien d'annuaire dit « page de la brasserie dans un annuaire, pas de
     cette bière » ; type « Lager / Pils » ajouté ; explications nuancées
     (blanche « souvent trouble », IPA « souvent amère », sans alcool sans
     seuil chiffré) et relues mot pour mot par un test. Restent sous
     « Autre » : saison, triple, porter, NEIPA… (BACKLOG).
   - **Revue code** — corrigé : le menu du filtre, jamais rendu faute de
     données, est sorti dans `FiltreType.tsx` et son rendu rempli est
     testé ; le nombre par type dit « au total » ; le test e2e « sans
     bière » prend une brasserie sans bière dans les données au lieu de la
     coder en dur.
   - PR #5 verte puis mergée (`22d673e`) ; run sur `main` : porte,
     déploiement, sonde verts ; le JS publié contient la section bières.

---

## S6 — Horaires *(terminé le 15/10 — code ; données absentes)*

1. **Objectif.** Savoir si c'est ouvert tel jour quand une source le dit —
   et l'entendre clairement quand elle ne le dit pas.
2. **Périmètre.** Schéma `horaires` (nature accueil ou vente, créneaux par
   jour, `[]` = fermé, absent = non précisé, source et date obligatoires) ;
   `ouvertLe` (oui / non / inconnu) ; tableau des sept jours dans la fiche ;
   sinon « pas d'horaires vérifiés jour par jour, appelez avant de vous
   déplacer ».
3. **Critères de sortie.** Créneau mal écrit ou à l'envers refusé ; rien
   déduit du texte `note` (test) ; rendu testé avec et sans ; revues code
   et métier faites et corrigées ; porte verte ; page publiée sondée.
4. **Persona juge.** Cédric.
5. **Données.** Aucune ligne n'a d'horaires structurés ; ils viendront de la
   curation, avec l'accord de Cédric. Le filtre « ouvert samedi » n'est pas
   livré tant qu'il n'y a pas de données pour le nourrir (BACKLOG).
6. **État final et restes.** Revues faites (code 23 k, métier 26 k) ; le
   format a été refait d'après elles, le 15/10 :
   - **Revue métier (Cédric)** — bloquant : le format ne savait pas dire
     « fermée d'octobre à mai », « sur rendez-vous », « en saison » (sept
     cas réels) ; une fois saisi, le tableau aurait fait autorité sur la
     phrase qui le contredit. **Corrigé** : `remarque` affichée « À savoir »
     au-dessus du tableau, et `ouvertLe` répond « sous réserve » quand elle
     existe (test vu rouge sans) ; un bloc par nature (accueil, vente) pour
     Caribrew, Single Track, Ninkasi ; « heures-non-precisees » pour
     « mar-sam » sans heures ; le texte sans horaires renvoie à « Ce que dit
     la source » au lieu de doubler l'avertissement.
   - **Revue code** — corrigé : créneaux qui passent minuit acceptés
     (Platypus « 17h-1h », Brasserie des Roches, du Merle) et affichés
     « (le lendemain) » ; chevauchements et désordre refusés ; `ouvertLe`
     tient compte de la nature ; tableau avec `<caption>`.
   - Rien n'est encore saisi : aucune ligne n'a d'horaires structurés.
   - PR #6 verte puis mergée (`31568e8`) ; run sur `main` : porte,
     déploiement, sonde verts ; le JS publié contient le texte sans
     horaires.

---

## S7 — PWA et hors ligne *(terminé le 15/10)*

Enchaînement des sprints demandé par Cédric le 15/10 (« enchaîne les
sprints avec revue + revue globale »).

1. **Objectif.** Installer l'application et consulter toutes les fiches
   sans réseau ; dire clairement ce qui manque hors ligne.
2. **Périmètre.** `public/sw.js` écrit à la main (repris et allégé de
   Sentiers) : précache de tous les fichiers construits (liste et empreinte
   injectées au build par `build/precache-sw.ts`, qui échoue si un marqueur
   reste), réseau d'abord pour l'application, cache d'abord pour les tuiles
   OSM (600 au plus), ménage des seuls anciens caches d'application ;
   manifeste et icônes ; bandeau « hors connexion » ; repli « fond de carte
   indisponible ».
3. **Critères de sortie.** Le cache contient chaque fichier précaché (test
   qui interroge `caches.match`, vu rouge quand l'installation ne précache
   rien) ; manifeste installable (icônes 192 et 512 servies) ; bandeau et
   repli testés ; revues code et métier faites et corrigées ; porte verte ;
   page publiée sondée.
4. **Persona juge.** Bernard.
5. **Non mesuré.** L'installation réelle sur un téléphone, et Lighthouse
   (S20). `context.setOffline` ne coupe pas les requêtes du service worker :
   aucun test ne prétend « recharger hors ligne ».
6. **État final et restes.** Revues faites (code 25 k, métier 24 k),
   corrections appliquées le 15/10 :
   - **Revue code** — corrigé : précache « tout ou rien » (`Promise.all`)
     relu sans cache HTTP (`cache: 'reload'`) — un fichier en échec laissait
     s'installer un cache partiel puis effaçait l'ancien ; plus de
     `skipWaiting` — un onglet ouvert sur l'ancienne version perdait sa
     carte ; le test vise le cache de la version courante et un fichier que
     seule l'installation peut y mettre (icône masquable), vu rouge sans
     précache. Restant : le repli « fond indisponible » peut clignoter sur
     une seule tuile en échec (BACKLOG).
   - **Revue métier (Bernard)** — corrigé : l'écran dit « Prête pour une
     utilisation hors connexion » une fois le précache fini, sinon « gardez
     la page ouverte avec du réseau » ; une ligne explique comment
     installer ; le repli ne promet plus des « zones déjà vues » à la
     première visite. Mesuré : 1,85 Mo d'assets non compressés (dont 1 Mo
     pour la carte, 0,5 Mo pour son worker) ; temps en 4G faible non
     mesuré (S20).

---

## S8 — Point de départ et « autour de moi » *(terminé le 15/10)*

1. **Objectif.** Compter les distances depuis Brignais, depuis sa position
   (sur action) ou depuis une commune des données — « plus loin que
   Brignais », demande de Cédric du 15/10.
2. **Périmètre.** `core/origine.ts` (Brignais, position, commune ; la
   position d'une commune est la moyenne de ses brasseries, dite
   « centre approché ») ; `PointDeDepart.tsx` : bouton « Autour de moi »
   (géolocalisation demandée au toucher seulement, refus et erreurs dits,
   rien ne change alors), choix d'une commune sans recherche en ligne,
   retour à Brignais ; texte de confidentialité exact (la position ne part
   nulle part ; la carte charge les images de la zone affichée) ; repère
   et cadre de la carte qui suivent le départ.
3. **Critères de sortie.** Aucune requête ne contient la position (test vu
   rouge avec une fuite injectée) ; refus → application utilisable ;
   départ depuis une commune testé ; revues code et métier faites et
   corrigées ; porte verte ; page publiée sondée.
4. **Persona juge.** Léa.
5. **Limite.** Les données s'arrêtent à 100 km de Brignais : partir de
   plus loin ne montre que ce qui est dans le fichier ; l'élargir est S14.
6. **État final et restes.** Revues faites, corrections appliquées le
   15/10 :
   - **Revue code** — corrigé : le test de fuite ne cherchait que les
     chiffres « 45.93 » et ne pouvait voir ni une tuile ni une fuite écrite
     autrement ; il est devenu une liste blanche (l'application, `data:`,
     des tuiles OSM z/x/y au zoom 14 au plus), **vu rouge** avec un
     `fetch` injecté qui emportait la latitude ; le texte minimisait ce
     que voit le serveur de tuiles ; Brignais recopié en dur remplacé par
     `ORIGINE_DEFAUT` ; rechoisir la même commune ne recadre plus la
     carte ; les communes sont regroupées par commune **et** département
     (deux « Saint-Martin » restent deux, ordre stable).
   - **Revue métier (Léa)** — corrigé : le texte de confidentialité est
     lu **avant** le bouton (testé sur l'ordre du document) et dit tout :
     les coordonnées ne sont envoyées à personne, mais les images de la
     carte chargées auprès d'OpenStreetMap révèlent la zone, à quelques
     kilomètres près, et l'adresse IP ; partir d'une commune l'évite.
   - **Reste** : les données s'arrêtent à 100 km de Brignais (S14) ; le
     zoom 14, une tuile couvre environ 1,7 km de côté à la latitude de Lyon (40 075 km × cos 45,9° ÷ 2¹⁴) — c'est le
     prix d'une carte en ligne, dit à l'écran, pas supprimé.

## S9 — Favoris et préférences *(terminé le 15/10)*

1. **Objectif.** Retrouver d'une visite à l'autre ses brasseries préférées
   et ses réglages, sans compte et sans que rien parte de l'appareil.
2. **Périmètre.** `core/preferences.ts` (schéma Zod de ce qui est gardé,
   relu tout ou rien ; la position n'est **jamais** gardée : « autour de
   moi » redevient Brignais) ; `stockage.ts` (IndexedDB, une clé ; repli
   sans stockage, dit à l'écran) ; favoris par nom, bouton dans la fiche,
   étoile sur la ligne ; « seulement mes favoris » ; favoris cachés par la
   distance ou les filtres nommés ; « Effacer favoris et réglages ».
3. **Critères de sortie.** Favori et réglages retrouvés après
   rechargement ; position absente du stockage ; sans IndexedDB
   l'application marche et le dit ; tests vus rouges par mutation ; revues
   code et métier faites et corrigées ; porte verte ; page publiée sondée.
4. **Persona juge.** Marie.
5. **Vu en route.** Les tests e2e ont rougi au hasard : un rechargement
   partait avant la fin de l'écriture IndexedDB. Ils attendent désormais que
   le stockage contienne la valeur voulue (35/35 sur cinq passages). Une
   ligne ouverte porte maintenant deux boutons : un test de S2 qui visait
   « le » bouton de la ligne a été précisé.
6. **État final et restes.** Revues faites, corrections appliquées le
   15/10 :
   - **Revue code** — corrigé :
     - « Effacer » n'effaçait rien : l'effet de sauvegarde réécrivait
       aussitôt les valeurs par défaut, et le test attendait cette
       réécriture. On n'écrit plus que ce qui diffère de ce qui est gardé ;
       le test exige un stockage **vide** (vu rouge en remettant l'écriture
       systématique).
     - Le test « la position n'est jamais gardée » lisait l'écriture
       d'avant le clic : il passait avec la position stockée. Un réglage
       témoin changé après le clic le fait attendre la bonne écriture
       (vu rouge 3 fois sur 3 avec la position stockée).
     - Relecture tout ou rien : un seul champ périmé coûtait tous les
       favoris. Relecture champ par champ ; favoris dédoublonnés plutôt que
       perdus ; rien n'est réécrit au simple chargement.
     - Favoris disparus des données : dits, et retirables d'un bouton.
     - Focus perdu en retirant un favori en mode « seulement » : posé sur
       le compte, qui annonce le retrait.
     - `aria-pressed` avec un libellé qui change : retiré, le libellé dit
       l'action.
     - `indexedDB.open` sans réponse donnait une page blanche : repli sans
       stockage après 2 s (seuil de présentation, justifié dans
       `stockage.ts`) ; fermeture sur `versionchange`.
   - **Revue métier (Marie)** — corrigé : la ligne de compte dit « Seulement
     vos favoris » et, si la liste est vide, comment en sortir ; effacer se
     confirme ; l'étoile prend la couleur du texte (l'or mesurait 2,27:1 sur
     blanc, sous les 3:1 de WCAG 1.4.11) ; un message dit chaque ajout,
     retrait et effacement.
   - **Reste** (BACKLOG) : deux onglets s'écrasent ; bouton favori dans la
     fiche seulement ; longueur du bloc de filtres ; message des favoris
     cachés sans limite.

## S10 — Signaler une erreur *(terminé le 16/10)*

1. **Objectif.** Une brasserie, ou un client, corrige une fiche sans
   serveur : un lien ouvre une issue GitHub préremplie.
2. **Périmètre.** `core/signalement.ts` : `lienSignalement(brasserie)`
   (titre, fiche telle qu'affichée, trois questions : ce qui est faux, la
   bonne information, une source) et `lienAjout()` (brasserie absente).
   Les fonctions ne reçoivent que la ligne du fichier : ni distance, ni
   départ, ni favoris ne peuvent partir. Lien dans la fiche et au pied de
   page, `noreferrer`, avec ce que cela implique dit avant le geste
   (compte GitHub, signalement public).
3. **Critères de sortie.** Aucun paramètre hors `title` et `body` ; ni
   position ni distance dans le lien (test e2e vu rouge avec la distance
   injectée) ; longueur mesurée ; revues code et métier faites et
   corrigées ; porte verte ; page publiée sondée.
4. **Persona juge.** Une brasserie.
5. **Vu en route.**
   - Le premier test e2e de fuite était creux : `decodeURIComponent` laisse
     les « + » des espaces, la distance « 12,3 km » n'y était jamais
     trouvée. Vu passer avec la distance injectée, corrigé (lecture par
     `URL`), vu rouge ensuite.
   - Un test de S2 lisait la liste sans attendre (`allTextContents`) ;
     depuis S9 le rendu suit la lecture d'IndexedDB : il échouait en suite
     complète seulement. Il attend désormais la première ligne.
   - Longueur mesurée : 929 caractères au plus sur les 166 lignes (avant
     l'ajout de la suite et des consignes, que le test de longueur couvre).
6. **État final et restes.** Revues faites (au moins 66 k : 36 k et 30 k
   comptés après une reprise sur limite d'usage, la première passe non
   comptée), corrections appliquées le 16/10 :
   - **Revue code** — corrigé : le test e2e de fuite cherchait encore des
     fragments (« ≈ 3 km ») et laissait passer « 3,2 km » ou « 46.0 N ». Il
     compare désormais le lien d'une même fiche depuis Brignais et depuis
     la position : identique au caractère près. Vu rouge avec la distance à
     une décimale injectée. Le pied de page est aussi testé (`noreferrer`,
     nouvel onglet). Reste : longueur des champs recopiés (BACKLOG).
   - **Revue métier (Une brasserie)** — corrigé : l'écran et l'issue disent
     ce qui se passe ensuite (l'éditeur décide, sans source rien ne change,
     aucun délai garanti) ; l'absence d'autre voie que GitHub est dite telle
     quelle ; exemples sous « Ce qui est faux » et « La bonne
     information » ; consigne de preuve pour la brasserie ; le pied de page
     dit où trouver le lien d'une fiche. Reste à **décider par Cédric** :
     une voie hors GitHub (BACKLOG).

## S11 — Outillage de curation *(terminé le 16/10 — code ; lot en attente de Cédric)*

1. **Objectif.** Qu'une fiche puisse être revérifiée et corrigée sans
   qu'aucune ligne de `data/` change sans l'accord de Cédric, et que sa
   décision tienne en « j'accepte 1, 3, 4 ».
2. **Périmètre.**
   - `core/curation.ts` : schéma d'une proposition (fiche visée, champs
     changés, date, sources, **extrait lu**) ; `appliquerLot` (seuls les
     numéros acceptés, résultat revalidé par `validerBrasseries`, autres
     lignes intactes) ; `diffLisible` (avant → après par champ) ;
     `lotSuivant` ; `formaterDonnees` (format exact du fichier).
   - `outils/curation.ts` (`npx tsx`) : `lot`, `diff`, `appliquer`
     (n'écrit qu'avec `--ecrire`).
   - Agent `verificateur-de-brasserie` (lecture seule, rend du JSON) et
     skill `lot-de-curation` (de la sélection à la PR de proposition).
   - `schema.ts` : l'objet nu `brasserieObjetSchema`, que Zod accepte de
     découper (il refuse `pick`/`omit` sur un schéma raffiné).
   - `tsx` ajouté aux dépendances de développement (4.19.2) : aucun
     exécuteur TypeScript n'était installé. Le lockfile ne fait qu'ajouter
     des paquets (vérifié : aucun retiré, aucune version changée).
3. **Critères de sortie.** Tests vus rouges par mutation sur les gardes
   (revalidation, champ inconnu ou vide, double acceptation) ; réécriture
   du fichier réel à l'octet près ; un premier lot réel passé par l'outil ;
   revues code et métier faites et corrigées ; porte verte.
4. **Persona juge.** Une brasserie (sa correction arrive-t-elle jusqu'à la
   fiche, et comment le saurait-elle ?).
5. **Vu en route.** La réécriture du fichier perdait le « .0 » des
   flottants entiers (`"km": 6.0` → `6`) : le fichier vient de Python. Vu
   par le test d'aller-retour, corrigé pour `lat`, `lon`, `km`.
   Le contrôle mécanique des numéros a d'abord manqué celui de Kachmar,
   présent sur la page : « 91 1932 Route » collait le numéro de rue au
   numéro. Cas réel ajouté au test, vu rouge, corrigé.
6. **État final et restes.** Premier lot réel : `curation/s11-exemples-s4`
   (les 5 numéros de S4, relus le 16/10 avec leur extrait, 5/5 retrouvés
   par `controler`, deux sources rouvertes à la main). **En attente de
   l'accord de Cédric** ; `data/` inchangé. Revues faites (code 54 k,
   métier 38 k), corrections appliquées le 16/10 :
   - **Revue code** — corrigé :
     - le diff montrait une `verifieLe` que l'outil n'écrivait pas :
       `verifieLe` n'est plus un champ modifiable ;
     - une source ou une date écrite dans la fiche pouvait n'avoir rien à
       voir avec la preuve lue : elles doivent être celles de la
       proposition ; pas de date future ;
     - une proposition pouvait déplacer ou renommer une fiche : `n`, `c`,
       `d`, coordonnées, précision et `km` sont exclus ;
     - `--ecrire` n'était gardé par rien : il exige l'**empreinte** du lot
       affichée dans le diff que Cédric a lu (test de l'outil en dossier
       jetable, vu rouge sans la garde) ;
     - numéros lus trop largement (`0x1`, `1.0`) : refusés ;
     - tableaux affichés en bloc : élément par élément ; suppression d'un
       champ désormais testée ;
     - une source sur cinq seulement rouverte : commande `controler`
       (pages qui répondent, numéro présent sur sa source).
   - **Revue métier (Une brasserie)** — corrigé :
     - un signalement n'entrait dans aucun lot : le skill liste les issues,
       `signalement` retrouve la fiche par le titre, l'agent reçoit le texte
       de l'issue et traite **sa** demande, quelle que soit la catégorie ;
     - personne ne répondait à la brasserie : étape 6 du skill, un
       commentaire puis la fermeture de chaque issue ;
     - un téléphone ajouté datait toute la fiche : la date de fiche ne
       couvre que ce qui n'a pas de date à soi (`docs/DONNEES.md`) ;
     - le choix entre plusieurs numéros restait dans le compte rendu :
       champ `choix`, affiché à Cédric (et rempli pour les 5 du lot).
   - **Reste** (BACKLOG) : prévenir une brasserie que son numéro est repris
     (décision de Cédric) ; mobiles seuls publiés (Kachmar, Montchat) à
     juger par lui.

## S12 — Curation, lot 1 *(terminé le 16/10 — mergé (#12), page publiée sondée ; lot en attente de Cédric)*

1. **Objectif.** Les 25 « À confirmer » les plus proches de Brignais
   revérifiés, sous forme de **propositions** que Cédric accepte ou refuse
   numéro par numéro. Aucune ligne de `data/` dans ce sprint.
2. **Périmètre.** `outils/curation.ts lot 25` ; aucune issue de
   signalement ouverte le 16/10 (liste vide) ; cinq agents
   `verificateur-de-brasserie` en parallèle, 5 fiches chacun ; statut,
   contact, horaires. Les types de bière sont hors de ce lot, pour tenir le
   coût.
3. **Critères de sortie.** Lot valide au schéma ; `controler` sans écart ;
   une source sur cinq rouverte à la main ; diff et empreinte présentés à
   Cédric dans une PR sans `data/` ; revue métier (Cédric) faite.
4. **Persona juge.** Cédric : peut-il décider sur le diff seul ?
5. **Budget.** Mesuré en S11 : 88 k pour vérifier 5 fiches. 25 fiches
   coûteraient donc ≈ 440 k, au-dessus des 300 k estimés mais sous le
   double (600 k), seuil d'arrêt de CLAUDE.md §9. Dit avant de lancer, et
   le coût réel sera relevé. **Réel : 167 k** pour les cinq agents
   (34 + 30 + 32 + 36 + 36 k) : beaucoup de fiches n'avaient aucune page à
   lire.
6. **Résultat du lot** (`curation/s12-lot-1`, empreinte finale `2587f92b8457`) :
   - **4 propositions** : La Canute Lyonnaise (téléphone de commande pro,
     mobile), Malting Pot (catégorie 1 en confiance moyenne, contact,
     horaires lun–sam), Brasserie Animus (note corrigée : adresse de
     Grigny publiée ; mobile), Brasserie Georges (contact, horaires du
     restaurant).
   - **21 fiches sans proposition** : 16 sans aucune page trouvée à leur
     nom (Bulles d'Orge, Brasserie Krüger, Coldie Brewery, Brasserie
     Demi-Lune, Maltazar, Autour de la Bière, Les Aubépines, Brasserie des
     Monts du Lyonnais, FFAKE Brasserie, Misso, Brasserie du Mont Popey,
     Hoodo, Brasserie 767, La Voie Maltée, L'Agarithe, Les Roches
     Précieuses) ; 5 avec des pistes qui ne suffisent pas (DWYN Brewing,
     La Fabrique du Faubourg, Platypus Brewpub, La Dame de Malt, Brasserie
     des Roches) — détail au BACKLOG.
   - `controler` sans écart ; Malting Pot relu à la main (catégorie, et
     horaires du bloc Lyon 7 de la page Adresses).
   - Vu en route : le contrôle ne lisait pas « +33 (0)4 … » (page de
     Georges) ; cas réel ajouté au test, vu rouge, corrigé.
7. **État final et restes.** Revues faites (métier Cédric 45 k, code
   47 k), corrections appliquées le 16/10. **Le lot final compte 3
   propositions, en attente de Cédric** ; `data/` inchangé.
   - **Revue métier (Cédric)** — corrigé :
     - Georges : les horaires du restaurant auraient paru « Horaires
       d'accueil du public » sous « À confirmer » — retirés, téléphone et
       site seuls ;
     - Animus : acceptée seule, la fiche aurait gardé l'adresse et la
       position de Vaugneray à côté d'une note sur Grigny — **retirée du
       lot** jusqu'à une procédure de déplacement (BACKLOG) ;
     - Canute : le mobile est une ligne de commande pro, qui deviendrait
       un bouton « Appeler » — site seul, le numéro devient une question ;
     - Malting Pot : la remarque dit « services du midi et du soir » ;
     - outil : « 1 3 » au lieu de « 1,3 » n'appliquait que la 1 sans un mot
       (refusé désormais, testé) ; la simulation renumérotait (numéros du
       lot gardés) ; catégories nommées en clair ; un jour d'horaires lu en
       une ligne, comme sur la fiche.
   - **Revue code** — corrigé : la remarque de Georges portait un bandeau
     « Fête des Lumières » daté de décembre 2025, absent de l'extrait
     (retiré avec les horaires) ; écritures de numéros encore refusées
     (`+33-4-…`, `(+33)4`, `00 33`, deux espaces, `+330…`) : acceptées,
     testées. Constaté sans effet : une parenthèse mal placée (« +33 (04 … »)
     passe parce que « 04 … » est bien sur la page.
   - **Reste** : le rendu exact de la fiche (badge, titres) n'est pas encore
     dans le diff (BACKLOG).

## S13 — Curation, lot 2 *(terminé le 16/10 — mergé (#13), page publiée sondée ; lot en attente de Cédric)*

1. **Objectif.** Les 25 « À confirmer » suivants, en propositions.
2. **Vu avant de lancer.** `lot 25` aurait rendu les **mêmes** 25 fiches
   qu'en S12 : une fiche revue sans proposition ne laisse aucune trace dans
   `data/`. Corrigé : champ `revues` d'un lot (il contient les fiches
   proposées, testé) et `curation/revues.json` pour S12, dont le fichier
   n'est pas touché (son empreinte est celle que Cédric lit). Après S12 et
   S13, il reste **51** « À confirmer » jamais revus (101 − 50, mesuré).
3. **Persona juge.** Marie : ce qu'une proposition ferait afficher se
   comprend-il sans le vocabulaire du milieu ?
4. **Résultat du lot** (`curation/s13-lot-2`, empreinte `eefa6ea1e0d6`) : 25
   fiches revues par cinq agents (157 k), **3 propositions** — L'Affoleuse
   (catégorie 1 moyenne, téléphone, vendredi 15h–19h30), Brasserie des
   Ursulines (catégorie 1 moyenne, téléphone, horaires hors été et été en
   remarque), La Mousse du Guiers (catégorie 1 **faible**, mobile, horaires
   de la brasserie dans la note). 22 fiches sans proposition ; pistes et
   fiches à déplacer au BACKLOG. Chaque extrait relu mot pour mot sur la
   page brute ; `controler` sans écart.
5. **État final et restes.** Revues faites (métier Marie 41 k, code 37 k),
   corrections appliquées le 16/10. **Lot en attente de Cédric** ; `data/`
   inchangé.
   - **Revue métier (Marie)** — corrigé : « en semaine » disait lundi à
     vendredi alors que le vendredi est ouvert (« du lundi au jeudi ») ; la
     remarque dit « pas d'ouverture sans rendez-vous » ; Ursulines sans
     horaire ni téléphone alors que le site les publie (page « Horaire » et
     page Contact lues, proposées) ; La Mousse du Guiers : source indirecte
     → confiance **faible** (définition de `DONNEES.md`), et la note ne
     promet plus des horaires qu'elle ne donne pas.
   - **Revue code** — corrigé : la page Contact de La Mousse du Guiers
     publie des horaires que la proposition disait absents (dans la note,
     nature non dite) ; le test du champ `revues` survivait à `every` →
     `some` (cas à deux propositions, vu rouge) ; la lecture des fiches
     déjà revues ignorait un contenu mal formé et un nom mal écrit :
     `revuesDesFichiers` (cœur, testée, vue rouge) échoue en nommant le
     fichier.
   - **Reste** (décision de Cédric) : sur la liste, un badge de confiance
     faible ou moyenne ressemble à un badge élevé — la réserve n'est que
     dans la fiche dépliée (revue métier S13, BACKLOG).

## S14 — Découverte de brasseries absentes *(terminé le 16/10 — mergé (#14) ; lot en attente de Cédric)*

1. **Objectif.** Proposer les brasseries qu'OpenStreetMap connaît et que
   le fichier n'a pas, **y compris au-delà des 100 km de Brignais**
   (demande de Cédric du 15/10), en fiches « À confirmer » à décider ligne
   par ligne.
2. **Accès au réseau, mesuré le 16/10.**
   - Overpass (prévu au plan) : `overpass-api.de` coupé par le proxy de
     sortie de l'environnement ; deux miroirs (kumi.systems,
     private.coffee) rendent la même page d'erreur Apache de 646 octets ;
     mail.ru en 504. Inutilisable.
   - API publique des entreprises (`recherche-entreprises.api.gouv.fr`) :
     connexion refusée. Inutilisable.
   - WebFetch atteint Overpass, mais rend un résumé écrit par un petit
     modèle : des coordonnées recopiées par un modèle ne sont pas des
     données (CLAUDE.md §0). Écarté.
   - **Nominatim** (`nominatim.openstreetmap.org`) répond : point exact,
     objet OSM, type `craft=brewery`. Retenu, à une requête par seconde.
3. **Périmètre.**
   - `core/decouverte.ts` : lecture d'un résultat Nominatim (rien de
     deviné : sans nom, commune ou code postal, ou en Corse, écarté) ;
     rapprochement par le cœur du nom (mots génériques retirés, liste
     fermée, chaque rapprochement montré) ; fiche proposée « À confirmer »,
     note qui dit l'origine OSM, point de l'objet (`address`), `km` depuis
     Brignais.
   - Lot : champ `ajouts` (fiche entière, valide au schéma, sources,
     extrait), numérotés après les propositions, ajoutés en fin de fichier
     s'ils sont acceptés ; plages « 1-12 » acceptées par l'outil.
   - `outils/decouverte.ts` : tuiles d'un demi-degré sur la région,
     coupées en quatre au-delà de 50 résultats ; candidats bruts gardés
     (`curation/osm-<date>.json`) ; lot `curation/s14-decouverte.json`.
4. **Persona juge.** Cédric : la carte ne doit pas se remplir de points
   qu'il ne pourrait pas garantir.
5. **Résultat** (lu le 16/10, 66 requêtes) : 153 brasseries OSM en
   Auvergne-Rhône-Alpes. **119 fiches nouvelles proposées** (lot
   `curation/s14-decouverte`, empreinte `9e17904c31bc` ; résumé en tableau
   `s14-decouverte-resume.md`), dont 14 au nom proche d'une fiche et 21
   qu'OSM décrit aussi comme café, bar ou enseigne — signalées. Non
   proposées (`s14-rapprochements.md`) : 26 déjà dans le fichier, 4
   homonymes d'une fiche d'une autre commune, 4 doublons dans OSM. Une
   bonne part est à plus de 100 km de Brignais : elles ne se voient qu'en
   partant d'une commune (S8).
6. **État final et restes.** Revues faites (métier Cédric 61 k, code
   54 k), corrections appliquées le 16/10. **Lot en attente de Cédric** ;
   `data/` inchangé.
   - **Revues (Cédric et code)** — corrigé :
     - 7 ajouts reprenaient exactement le nom d'une fiche : « 1-131 »
       était refusé, avec des numéros de ligne du fichier. Rapprochement
       refait : même cœur **et même commune** = déjà là (la fiche « la plus
       proche » ne valait rien, les fiches étant au centre de leur
       commune) ; même nom ailleurs = homonyme, écarté et listé ; doublons
       OSM (casse comprise) écartés ; l'outil vérifie que tout accepter
       passe avant d'écrire le lot, et `controler` aussi ; un refus cite le
       numéro du lot ;
     - l'avertissement « nom proche » citait parfois la mauvaise fiche (à
       93 km au lieu de la même commune) : même commune d'abord ;
     - rien ne signalait un café : étiquettes OSM `amenity`, `shop`,
       `brand`, `cuisine`, `opening_hours` gardées et montrées ; même
       adresse que deux propositions, signalée ;
     - « à l'adresse vérifiée » pour un point OSM : nouvelle précision
       `osm` (« point placé sur OpenStreetMap, non vérifié sur place ») ;
     - note sans jargon, l'objet OSM en source de la fiche ;
     - 3 000 lignes sans résumé : tableau d'une ligne par fiche ;
     - « 1-999999999 » saturait la mémoire : plage bornée au lot.
   - **Reste, décisions de Cédric** : accepter ou non des fiches « À
     confirmer » qui feraient passer leur part de 61 % à environ 70 % de la
     liste (revue métier S14) ; les 4 homonymes (déménagement, second site
     ou autre brasserie ?). Overpass et l'API des entreprises restent
     injoignables depuis l'environnement.

## S15 — Veille mensuelle *(terminé le 16/10 — mergé (#15) ; armement en attente de Cédric)*

1. **Objectif.** Que les fiches se revérifient chaque mois sans que rien ne
   change sans Cédric : signalements, fiches les plus anciennes, nouvelles
   brasseries OSM, en une PR de propositions.
2. **Périmètre.** `lotSuivant(…, { toutes })` et `lot --veille` (toutes
   catégories, la vérification la plus ancienne d'abord ; une fiche revue
   sans résultat reste passée, une fiche datée revient à son tour) ; skill
   `veille` ; `docs/VEILLE.md` avec le message exact de la tâche.
3. **Ce qui attend Cédric.** L'**armement** de la tâche planifiée (le 1er
   du mois, une session neuve, une PR à décider) : une action hors de la
   session, qui se répète seule. Rien n'est armé sans son accord.
4. **Vu en route.** Depuis S14, `lot` refusait de tourner sur `main` : le
   fichier brut `curation/osm-2026-10-16.json` était lu comme un lot
   (la lecture stricte de S13 l'a fait échouer bruyamment, comme voulu).
   Les fichiers `osm-*` sont désormais passés ; test de l'outil en dossier
   jetable, vu rouge.
5. **Persona juge.** Une brasserie : son signalement est-il repris chaque
   mois, et le sait-elle ?
6. **État final et restes.** Revues faites (code 35 k, métier 33 k),
   corrections appliquées le 16/10. **Armement en attente de Cédric.**
   - **Revue code** — corrigé : le nouveau filtre ramenait en mode normal
     une fiche « À confirmer » revue et datée (latent : aucune fiche datée) ;
     les deux modes ont leur règle, testée ; la veille ne répondait à aucun
     signalement (commentaire de revue, puis réponse finale après la
     décision) ; un échec d'OSM arrêtait tout (« continue les autres ») ;
     300 k invérifiables (20 fiches au plus) ; relancer la découverte
     écrasait le lot S14 en attente (`--lot`, refus d'écraser, test vu
     rouge) ; contrôle `data/` avant la PR.
   - **Revue métier (Une brasserie)** — corrigé : la veille ne prend plus
     que les catégories 1 à 3, catégorie 1 en tête quand rien n'est daté
     (elle reprenait les 10 fiches les plus proches, et recoupait les « À
     confirmer ») ; `docs/VEILLE.md` dit les délais réels (moins de 31 jours
     pour un signalement si la veille est armée ; 7 mois pour revoir les 65
     fiches vendues) et la limite (une fiche revue sans résultat ne revient
     que sur signalement).
   - **Reste** : l'armement (Cédric) ; une voie hors GitHub (BACKLOG).

## S16 — Curation, lot 3 *(terminé le 16/10 ; lot en attente de Cédric)*

1. **Objectif.** Les 25 « À confirmer » suivants, en propositions, **avec
   les types de bière** quand la brasserie les liste elle-même (persona
   Karim : des types justes, un lien vers la bière, sinon « non
   référencé »).
2. **Périmètre.** `lot 25` (fiches jamais revues) ; cinq agents ; statut,
   contact, horaires, bières (type lu dans le texte de la brasserie, jamais
   déduit du nom ; lien vers la page de la bière sur son site, sinon aucun).
3. **Persona juge.** Karim.
4. **État final et restes.** 25 fiches revues, 8 propositions
   (`curation/s16-lot-3.md`, empreinte `aa5a27525065`) : 6 téléphones,
   32 bières typées sur 3 fiches (Sornin 24, Kokine 4, Ours Barbu 4 ;
   aucune page par bière), une catégorie 1 en confiance faible (La
   Valentinoise), des horaires « accueil » d'après un annuaire (Kan Mêm).
   Revues faites (métier Karim 52 k, code 49 k), corrections appliquées le
   16/10. Budget dépassé de 8 % (≈ 323 k pour 300 k), sous le seuil d'arrêt.
   - **Revue métier (Karim)** — corrigé :
     - la fiche montrait « Cluny 4 » sans dire que c'est une blonde : une
       bière nommée affiche son type (« Cluny 4 · Blonde ») et son
       explication, sauf « autre », dont le libellé porte le style ; test
       unitaire vu rouge. Pas d'e2e : aucune ligne de `data/` n'a de bière ;
     - le filtre disait « 3 brasseries au total », comme si trois brasseries
       seulement brassaient une IPA : il dit « 3 fiches renseignées », et
       sous le menu combien de fiches sur 166 ont leurs bières ;
     - Sornin : le type venait du seul en-tête (« Bière fruitée ! Castagne »
       pour une bière que la description dit ambrée) et l'Eduenne et les
       quatre cervoises manquaient ; catalogue refait (24 bières), type tiré
       de la description, sinon de l'en-tête, chaque phrase citée et relue
       sur la page brute ; deux arbitrages posés à Cédric (Trouille brune,
       Grand Béréby IPA).
   - **Autres points des revues** — corrigé : Weissbier en « blanche » (traduction
     littérale, dite dans le choix) ; « click and collect » absent des
     pages, retiré ; La Valentinoise « non datée » alors que la page dit
     « Modified on Feb. 16, 2024 », corrigé.
   - **Reste, décisions de Cédric** : les 8 propositions ; des horaires
     « accueil » tirés d'un annuaire sur une fiche « À confirmer » (Kan Mêm,
     même question que Georges en S12) ; la commune de Paille (le site dit
     Lournand, la fiche Château).

