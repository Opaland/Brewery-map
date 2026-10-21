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
| S17 | 300 k | — | agents 211 k + revues 131 k (dépassement de 14 %) | terminé ; lot en attente de Cédric |
| S18 | 180 k | — | revues 115 k (le reste non relevé) | terminé |
| S19 | 180 k | — | revues 71 k (le reste non relevé) | terminé |
| S20 | 180 k | — | revues 86 k (le reste non relevé) | terminé |
| S21 | 180 k | — | revues 139 k (le reste non relevé) | terminé |

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
| S21 | Partout en France *(ajouté le 16/10, retours de Cédric)* : commune de départ cherchée partout (fin de la liste déroulante), 100 km d'abord ; « Autour de moi » proposé d'emblée, qui marche et se souvient ; bouton « Installer ». | Léa, Cédric |
| S22 | Revue globale de l'application, et ses corrections. | toutes |
| S23 | Livraison : README, licence, attributions, captures, GIF, post LinkedIn. | toutes |

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

## S17 — Curation, lot 4 *(terminé le 16/10 ; lot en attente de Cédric)*

1. **Objectif.** Les 26 derniers « À confirmer » jamais revus : après ce
   lot, chacun des 101 l'a été au moins une fois.
2. **Périmètre.** `lot 30` (26 fiches restantes) ; six agents ; aucun
   signalement ouvert le 16/10. Les leçons de S16 sont données aux agents :
   type de bière lu dans la description, catalogue complet, aucun fait
   absent des pages dans `choix`.
3. **Persona juge.** Bernard : ce qu'il voit d'une fiche encore « À
   confirmer » une fois tout revu.
4. **État final et restes.** 26 fiches revues : `lot 200` ne rend plus
   rien, les 101 « À confirmer » ont tous été revus une fois. 12
   propositions (`curation/s17-lot-4.md`, empreinte `b977dc4582d3`) : deux
   catégories 1 (La Grange du Seigneur, P'tit Labo), 6 téléphones, 26
   bières typées sur 4 fiches, deux fermetures dites en tête de note (Dr D.,
   Maltobar). Les 14 fiches sans proposition sont expliquées une à une dans
   `curation/s17-lot-4-sans-proposition.md`. Budget dépassé de 14 %
   (≈ 342 k pour 300 k), sous le seuil d'arrêt.
   - **Revue métier (Bernard, 50 k)** — corrigé :
     - « appelez en cas de doute » s'affichait sur les 166 fiches, dont
       aucune n'a de téléphone : l'avertissement ne le dit plus que si un
       numéro est connu (contact ou note) ; test unitaire vu rouge, e2e mis
       à jour ;
     - « Seuls ceux cités dans "Ce que dit la source" sont connus »
       promettait des horaires à des notes qui n'en citent pas : « S'il y en
       a de connus, ils sont cités… » ; test vu rouge ;
     - 14 fiches revues sans un mot sur ce qui avait été cherché : compte
       rendu par fiche ;
     - fermetures lisibles seulement en fin de note : « Fermée selon
       Untappd », « Brassage arrêté » en tête.
   - **Revue adverse (80 k)** — corrigé :
     - Two Dudes : le site dit Crêches-sur-Saône, la fiche Tournus ; dit
       dans le choix, à décider ;
     - Caquot : l'Aix Riviera, mise en « autre » par ma relecture, est
       « Type : Blonde » sur sa page — remise en blonde, la preuve citée ;
     - La Grange du Seigneur : le site de la brasserie, donné pour en panne,
       répondait ; la proposition est refaite depuis lui (vente et bar sur
       place, horaires d'été en « vente », mobile publié par la brasserie,
       huit bières avec leur page) ;
     - P'tit Labo : Privateaser ne prouvait pas la vente, retiré ; un seul
       numéro, pas deux ;
     - Maltobar : la note dit que la fiche de l'office n'est peut-être pas à
       jour ;
     - La Bonne Fabrique : le site est celui du lieu associatif, il n'est
       plus proposé comme « site de la brasserie ».
   - **Reste, décisions de Cédric** : les 12 propositions ; un statut
     « fermée » (BACKLOG) ; les communes de Two Dudes, La Montagnarde,
     Vellavia et Kiltin'.

## S18 — Accessibilité *(terminé le 16/10)*

1. **Objectif.** Que le parcours d'Inès (trouver une brasserie, lire sa
   fiche, appeler, au clavier et au lecteur d'écran, sans la carte) soit
   **mesuré**, pas supposé.
2. **Périmètre.** `tests/e2e/accessibilite.spec.ts` :
   - axe-core 4.13.0 (`@axe-core/playwright`, version de plus de deux
     semaines), règles WCAG 2.2 A et AA, thèmes clair et sombre, liste et
     fiche ouverte ;
   - cibles : 44 px hors carte (WCAG 2.5.5, choisi par le plan v2), 24 px
     dans la carte (WCAG 2.5.8 ; exception « equivalent » : la liste fait ce
     que fait un marqueur) ; un lien dans une phrase est exempté (« inline ») ;
   - focus visible à chaque arrêt du clavier, carte comprise (WCAG 2.4.7) ;
   - contraste des pastilles de catégorie, 3:1 (WCAG 1.4.11), deux thèmes ;
   - nom des marqueurs pour le lecteur d'écran ;
   - le parcours d'Inès au clavier seul.
   Chaque test vu rouge sur une régression injectée — deux ne l'étaient
   pas au premier passage, vus par la revue code et corrigés (ci-dessous).
   Le premier état mesuré : aucune violation axe hors carte ; « Code
   source » (82×16) et l'attribution de la carte (169×15) trop petits,
   corrigés.
3. **Persona juge.** Inès.
4. **État final et restes.** 17 tests d'accessibilité, tous vus rouges.
   Revues faites (Inès 62 k, code 53 k), corrections appliquées le 16/10.
   - **Revue métier (Inès)** — corrigé, chaque point par un test vu rouge :
     - un seul titre dans la page, pas de `<main>` : une région principale
       et trois titres (Rechercher et filtrer, Carte, Brasseries), lus
       seulement au lecteur d'écran ;
     - quinze arrêts de carte avant la liste : un lien « Aller à la liste
       des brasseries », caché jusqu'au focus ;
     - choisir un marqueur n'annonçait rien : le focus va sur la ligne
       ouverte ;
     - « Map », « Zoom in » dans une page en français : textes de MapLibre
       traduits ;
     - le curseur lu « 30 » : « 30 km » ;
     - le nom d'une ligne lu d'une traite : des virgules invisibles marquent
       les pauses ;
     - les animations ignoraient « réduire les mouvements » : défilement et
       carte sans animation quand il est demandé (non testé : rien de
       mesurable dans un test sans regarder l'animation) ;
     - 320 px de large (zoom 400 %) : aucun débordement (WCAG 1.4.10).
   - **Revue code** — corrigé :
     - le test du focus acceptait l'ombre permanente des marqueurs comme
       focus : l'ombre ne compte que si elle diffère sans le focus ; il
       vérifie aussi avoir traversé marqueurs, liste et pied ;
     - les marqueurs étaient sautés par la mesure des cibles (10 px
       passaient) : mesurés, après attente de leur rendu — la mesure
       passait aussi parce qu'elle était prise avant (§1bis) ;
     - « dans une phrase » était un écart de 10 caractères au jugé : le
       paragraphe doit contenir d'autres mots ;
     - toutes les pastilles mesurées sur leur fond réel ; grand écran
       (1280 × 800) ajouté.
   - **Vu en route** : le bandeau hors connexion manquait parfois (S17,
     S18) — l'écoute de `offline` s'attachait après la lecture de l'état ;
     l'état est relu à l'abonnement, et le test attend l'application
     montée. Cause déduite du code ; l'échec n'a pas été reproduit à la
     demande (60 répétitions vertes après correction).
   - **Reste** : « Appeler » n'est atteignable sur aucune fiche (aucune n'a
     de téléphone : données, pas code, CLAUDE.md §10) ; aucun lecteur
     d'écran réel n'a servi — longueur du nom des lignes, « ≈ », annonces à
     chaque frappe : à écouter avec une vraie personne.

## S19 — « Y aller » et « ouvert maintenant » *(terminé le 16/10)*

1. **Objectif.** Le critère de Hugo : savoir si c'est ouvert maintenant, et
   lancer l'itinéraire sans que sa position parte ailleurs que dans
   l'application de navigation qu'il choisit.
2. **Périmètre.**
   - `src/core/itineraire.ts` : la destination est l'adresse écrite quand
     `addr` dit plus que le nom de la commune (98 fiches sur 166), sinon le
     point de la fiche, placé à environ 2 km près — et la fiche le dit. Quatre liens : Google Maps, Plans (Apple), Waze, `geo:` (Android).
     Le test énumère les paramètres permis de chaque lien : aucun départ ne
     peut s'y glisser ; en e2e, les liens sont identiques avec ou sans
     « autour de moi » (vu rouge sur un paramètre ajouté).
   - `ouvertMaintenant` : à l'heure de Paris, créneaux qui passent minuit,
     « sous réserve » si une remarque nuance, « inconnu » quand la source ne
     dit rien du jour. Affiché dans les horaires, d'après les créneaux
     publiés seulement.
3. **Persona juge.** Hugo.
4. **État final et restes.** Revues faites (Hugo 28 k, code 44 k),
   corrections appliquées le 16/10.
   - **Revue métier (Hugo)** — corrigé :
     - deux liens sur quatre ne marchaient pas sur son téléphone (`geo:` sur
       iPhone, Plans d'Apple sur Android) : la liste suit l'appareil, lu
       dans l'agent du navigateur sans rien envoyer ; quatre liens quand on
       ne sait pas ;
     - « Y aller » venait avant les horaires : les horaires d'abord ;
     - quatre fiches avec une rue sans code postal étaient dites « adresse
       inconnue » : toute `addr` qui dit plus que la commune est une adresse
       (98 fiches ; 68 restent sans adresse).
   - **Revue code** — corrigé :
     - « centre de la commune » n'est pas établi pour toutes les fiches (25
       communes ont plusieurs points) : l'écran dit « le point de la carte, à
       environ 2 km près » ;
     - le `geo:` portait le nom entre parenthèses, cassé par un nom qui en
       contient : sans libellé, URL testée en entier ;
     - « Maintenant » restait figé sur une fiche ouverte : l'heure de
       référence est écrite (« À 18 h (heure de Paris) ») ;
     - cinq mutations de `ouvertMaintenant` survivaient : cas de minuit, de
       fin à l'instant exact, du dimanche vers lundi ajoutés ; trois tombent,
       deux sont équivalentes (un `geo` chaîne parcourue lettre à lettre, un
       créneau dont le début égale la fin).
   - **Reste** : Hugo ne peut pas savoir ce qui est ouvert maintenant —
     aucune fiche de `data/` n'a d'horaires structurés (données, pas code,
     CLAUDE.md §10) ; pas d'indicateur dans la liste (BACKLOG). Sur un vrai
     iPhone et un vrai Android, l'ouverture des liens n'est pas vérifiée.

## S20 — Performance et téléphones anciens *(terminé le 16/10)*

1. **Objectif.** Que la page s'ouvre vite sur un vieux téléphone en 4G
   faible (persona Bernard), **mesuré**.
2. **Mesure de départ** (16/10, Lighthouse 13.5.0 lancé par `npx`, mobile
   simulé : 150 ms de latence, 1,6 Mbit/s, processeur ralenti 4×, sur
   `vite preview` du build de production) : performance 64, accessibilité
   100, bonnes pratiques 100 ; premier affichage 2,3 s, plus grand affichage
   3,3 s, blocage du fil principal 1 640 ms, interactif à 6,1 s, poids
   389 Kio. Cause : le chunk de la carte (MapLibre) prenait 3,8 s du fil
   principal dès l'ouverture, alors que la carte commence sous l'écran
   (1 289 px pour 839 px de haut sur le Pixel 7 des tests).
3. **Fait.** `src/CarteDifferee.tsx` : la carte se charge à 300 px de
   l'écran. Mesure après (trois passages identiques) : performance 100 ;
   1,4 s, 1,7 s, blocage 10 ms, interactif à 1,7 s, poids 101 Kio. Le coût
   de la carte n'a pas disparu : il arrive quand on fait défiler jusqu'à
   elle. Test `tests/e2e/performance.spec.ts` (le chunk n'est pas demandé au
   chargement), vu rouge avec la carte chargée d'emblée ; les tests qui
   supposaient la carte chargée y vont désormais (`versLaCarte`, appelé à
   quinze endroits, plus les deux balayages axe sur téléphone après la revue
   code) ; la sonde de déploiement aussi.
4. **Persona juge.** Bernard.
5. **État final et restes.** Revues faites (Bernard 31 k, code 56 k),
   corrections appliquées le 16/10.
   - **Les deux revues, bloquant** — si le chunk de la carte ne venait pas
     (4G faible, fichier disparu après un déploiement), React démontait
     toute la page, liste comprise, au moment où Bernard la lisait. Une
     frontière d'erreur n'efface plus que la carte et dit « La carte n'a pas
     pu se charger (connexion ?) », avec « Recharger la page » : un nouvel
     import ne suffit pas, le navigateur garde en mémoire l'échec d'un import
     dynamique (vu au test). Test qui coupe le chunk, vu rouge.
   - **Revue code** — les balayages axe sur téléphone ne voyaient plus la
     carte : ils y vont ; le décompte de SPRINTS.md corrigé.
   - **Vu en route** : `versLaCarte` comptait puis faisait défiler, et
     tombait entre les deux (attente pas encore rendue, ou déjà remplacée sur
     grand écran) : il boucle sur l'état voulu (§6ter) ; trois suites
     complètes vertes d'affilée.
   - **Texte d'attente** : « Carte : elle se charge quand vous faites
     défiler jusqu'ici. »
   - **Reste** : Lighthouse ne fait pas défiler — le coût de la carte au
     défilement n'est pas mesuré, ni sur un vrai vieux téléphone ; à la
     première visite, le service worker précache tout, carte comprise (le
     poids de 101 Kio est celui de l'ouverture, pas de la visite entière).

## S21 — Partout en France *(terminé le 16/10 ; ajouté le 16/10)*

1. **Pourquoi.** Retours de Cédric du 16/10, sur son téléphone : pas de
   lien pour installer ; la localisation (« la carte ne suit pas », « message
   refusé », « rien ne se passe », « il faut redemander ») ; « surtout il
   reste la liste déroulante » ; « Je veux pouvoir chercher partout » ;
   proposer d'emblée « autour de moi » ou sa commune ; chercher d'abord à
   100 km, toute la France sinon. Le plan est décalé : revue globale en S22,
   livraison en S23.
2. **Données.** `outils/communes.ts` fait `public/communes-france.json`
   (34 960 communes ; 469 Ko compressé) et `public/communes/<dép>.json`
   (3 Ko pour le Rhône) : les communes actuelles du paquet
   `@etalab/decoupage-administratif` 6.0.0 (COG de l'INSEE), leur point
   tiré de Wikidata (CC0) par le code INSEE — `geo.api.gouv.fr` est
   injoignable depuis l'environnement. 9 communes sans point dans Wikidata,
   écartées et nommées par l'outil ; aucun point à plus de 150 km du centre
   de son département (vérifié). Ces fichiers ne sont pas `data/` (la règle
   du §0 porte sur les brasseries).
3. **Fait.**
   - Champ « Ou partir d'une commune, partout en France » (motif ARIA
     combobox) à la place de la liste : départements à moins de 100 km
     chargés d'avance, la plus proche d'abord ; rien près (Lille depuis
     Lyon) ou « Chercher dans toute la France » : le fichier entier. Même
     origine : la commune tapée ne part nulle part (test).
   - Tant que rien n'est choisi, le bloc s'appelle « Par où commencer ? ».
   - « Autour de moi » : un essai précis (position d'au plus une minute,
     au lieu de dix), puis un essai moins exigeant ; la précision dite
     au-delà d'1 km ; « près de … » (commune la plus proche, calculée dans
     le téléphone) ; après un refus, comment réautoriser ; le *choix* se
     garde (jamais la position) et, au retour, la position est redemandée
     sans fenêtre si le navigateur l'a déjà permise.
   - Un nom tapé cherche les brasseries à toute distance ; le compte le dit.
     À zéro, le compte dit d'où et jusqu'où.
   - Bouton « Installer l'application » (Android, Chrome) ; le geste de
     Safari sur iPhone.
   Chaque test nouveau vu rouge sur une mutation.
4. **Personas juges.** Léa (S8, la position) et Cédric (ses retours).
5. **État final et restes.** Revues faites (Léa et Cédric 64 k, code 75 k),
   corrections appliquées le 16/10, chaque test nouveau vu rouge.
   - **Bloquant, les deux revues** — après « Autour de moi », les fichiers des
     départements à moins de 100 km de la personne étaient demandés : le
     serveur de la page voyait sa zone (Brest → 22, 29, 56). Avec une
     position pour départ, seul le fichier entier, le même pour tous, est
     demandé (« près de » et recherche, rangée par distance). Test : rien
     de `/communes/<dép>.json` après le geste, vu rouge.
   - **Bloquant, revue Léa** — `MesFavoris` disait « Autour de moi n'est
     jamais gardé » : texte refait ; celui de confidentialité dit aussi
     qu'une commune choisie fait charger les images de sa zone.
   - **Revue code** :
     - le choix « autour » était effacé du stockage dès l'ouverture sans
       permission : il est gardé tant qu'aucun autre choix n'est fait, et
       l'écran dit « touchez Autour de moi pour la reprendre » ;
     - une localisation tardive écrasait une commune choisie entre-temps :
       le dernier geste l'emporte (test avec un GPS retardé de 3 s) ;
     - les codes postaux corses (20xxx) ne trouvaient rien : 2A, 2B ;
     - « ste » trouvait « Saint-Étienne » : la forme collée est retirée ;
     - anciens résultats pendant un rechargement : le champ est remonté à
       chaque nouveau départ ; l'option active reste dans la liste ;
     - le test « flèche puis Entrée » n'appuyait sur aucune flèche : il le
       fait, `aria-activedescendant` vérifié ;
     - l'outil : `ORDER BY` (deux lancements, sortie identique au hachage
       près), attente sur 429, arrêt sur une erreur définitive ;
     - sources des communes nommées en pied de page (INSEE, Licence
       ouverte ; Wikidata, CC0).
   - **Reste** :
     - rien n'est essayé sur un vrai téléphone (installation réelle,
       permission « demander à chaque fois », délais du GPS) ;
     - « la carte ne suit pas » : la carte se recentre à chaque départ,
       mais ne suit pas en continu un déplacement (pas de `watchPosition`)
       — à demander à Cédric si c'est ce qu'il voulait ;
     - avec un nom tapé, la carte reste cadrée sur le rayon ;
     - une commune choisie fait demander au serveur de la page les fichiers
       de ses départements voisins (c'est un choix, pas la position).

## S22 — Revue globale de l'application *(terminé le 16/10)*

1. **Pourquoi.** Plan v2 : une revue de l'application entière, pas des
   diffs (`/revue-globale`), puis ses corrections.
2. **Revues.** Personas (Cédric, Marie, Hugo, Léa, Inès) 84 k ; revue
   adverse du code entier 133 k.
3. **Corrigé.**
   - Service worker : une réponse 404 ou 500 du réseau remplaçait la copie
     gardée ; elle sert désormais de repli, comme une coupure (test unitaire
     qui exécute `sw.js`, vu rouge).
   - Nouvelle version : rien ne prévenait, l'ancienne restait servie. Un
     bandeau « Une nouvelle version de Mousse de Poche est prête » avec un bouton qui l'active
     et recharge ; jamais de rechargement sans ce geste.
   - Recherche : un texte fait de ponctuation seule (« - ») levait le rayon
     (« toutes distances ») sans rien chercher ; les deux recherches lisent
     désormais les mêmes mots (`motsCherches`, test vu rouge).
   - Zone vide (Lille) : l'écran dit la brasserie la plus proche du fichier,
     à quelle distance, et les 9 départements qu'il couvre.
   - Haut de page : le texte de confidentialité est replié derrière
     « Votre position reste dans ce téléphone. Ce qui part sur le réseau » ;
     il dit aussi qu'une commune choisie fait demander au site la liste des
     communes de sa région. La liste commence à 1,98 écran (Pixel 7, mesuré
     le 16/10) au lieu de 2,2 : mieux, pas assez (BACKLOG).
   - Deux champs confondus : « Chercher une brasserie (nom ou commune) »
     face à « Ou partir d'une commune, partout en France ».
   - Pied de page hors ligne : dit ce qui marche sans réseau, et que la
     recherche de commune le demande la première fois.
   - Liens d'attribution de la carte (OpenStreetMap) : nouvel onglet, sans
     adresse d'origine (test).
   - Deux commentaires faux corrigés (Carte : « 640 m » ; signalement : la
     longueur maximale de l'URL, 1 446).
4. **Mesuré sans défaut.** Porte complète : lint, `tsc -b`, 223 tests
   unitaires, build, 83 e2e (1 sauté : la page publiée, hors CI).
5. **Reste** (BACKLOG) : cadrage de la carte après un nom tapé ; communes
   indisponibles hors ligne avant une première recherche ; pas de CSP ;
   haut de page encore long ; aucun essai sur un vrai téléphone ; les trous
   de données (téléphones, horaires, bières) attendent les lots de Cédric.

## S23 — Livraison *(terminé le 16/10)*

1. **Pourquoi.** Plan v2 : README, licence, attributions, captures, GIF,
   post LinkedIn.
2. **Fait.**
   - `README.md` refait : il disait « sprint 2 sur 6 » et « pas de mode hors
     ligne ». Il donne maintenant le lien de la page, ce qu'elle fait, ce qui
     reste dans le téléphone, les captures, puis les sources et licences.
     Chaque chiffre a été recompté sur les fichiers : 166 brasseries, 9
     départements, 34 960 communes, 0 fiche avec téléphone, horaires ou
     bières.
   - Licences : code MIT (`LICENSE`, inchangé) ; communes sous Licence
     Ouverte (COG de l'INSEE via Etalab, paquet MIT) et CC0 (Wikidata) ;
     fond de carte OpenStreetMap sous ODbL ; MapLibre sous BSD-3 (lu dans
     `node_modules`). **La licence de `data/breweries.json` reste à décider
     par Cédric** : aucune n'est inventée.
   - `outils/captures.ts` produit les captures et le GIF depuis le build
     (téléphone clair et sombre : accueil, fiche, carte ; ordinateur ;
     parcours « une commune tapée, une fiche ouverte »), dans
     `docs/captures/` (3,3 Mo).
   - `docs/LINKEDIN.md` est un brouillon que Cédric publiera s'il le veut.
     Chaque chiffre renvoie à sa mesure.
3. **Vu en faisant les captures** (corrigé dans la revue UI/UX qui suit) :
   - la recherche de commune annonce « 3 communes à moins de 100 km » en
     comptant Villefranche-d'Allier (03), à plus de 100 km de Brignais. Les
     départements sont chargés à 100 km, leurs communes non filtrées.
   - « Votre position reste dans ce téléphone. Ce qui part sur le réseau »
     n'a pas de marque visible de dépliage.
4. **`main` rouge après S22** (sonde de la page publiée, 16/10) : « Cannot
   read properties of undefined (reading 'waiting') ». Le bandeau de
   nouvelle version supposait un enregistrement du service worker ; Playwright,
   service worker bloqué, rend `undefined`. La suite locale ne lisait pas les
   erreurs JavaScript : un test le fait désormais (vu rouge, puis vert avec la
   garde dans `surveillerMiseAJour`). Un navigateur réel n'était pas touché.
5. **Reste** : l'installation réelle sur un téléphone, et la publication du
   post, sont à faire par Cédric.

## Revue UI/UX globale *(16/10, demandée par Cédric après S23)*

1. **Revue.** Marie (téléphone, découvre) et Hugo (à vélo) sur le build
   servi, téléphone clair et sombre, puis ordinateur 1280×800 (64 k). Deux
   défauts relevés pendant les captures de S23 s'y ajoutent.
2. **Corrigé** (`tests/e2e/uiux.spec.ts`, chaque test vu rouge sans sa
   correction).
   - **Compte trop loin du réglage.** Le compte était 400 px sous le
     curseur, hors de l'écran. Il est maintenant collé au bas de l'écran tant
     qu'il est plus bas : on règle et on lit aussitôt le résultat. Le test
     demande ce qui est peint (`elementFromPoint`).
   - **Ordinateur.** Aucune brasserie dans le premier écran : la première
     ligne était à 1 081 px pour 800. Au-delà de 900 px, les filtres passent
     sur deux colonnes de texte, dans l'ordre du document. Première ligne à
     728 px, et toujours dans l'écran après le choix d'un départ.
   - **Zoom de la carte.** 29 px mesurés, maintenant 44 px.
   - **Fiche plus haute qu'un écran** (1 073 px pour 839). Un bouton
     « Refermer la fiche » en bas rend le focus et l'écran à sa ligne.
   - **Distance de la ligne.** Elle était en petit gris ; elle passe à la
     taille du texte, en encre pleine.
   - **Couture entre la ligne ouverte et sa fiche.** Même bord de 2 px, coins
     du bas droits.
   - **Statut des communes.** Il dit « dans les départements à moins de
     100 km » : Villefranche-d'Allier y figurait, à plus de 100 km.
   - **Repli de confidentialité.** Il a retrouvé son triangle (`display:
     list-item`).
3. **Revue adverse** (48 k), deux trouvailles mesurées, corrigées, tests vus
   rouges :
   - **Bloquant** — le compte collant couvrait le focus clavier (WCAG
     2.4.11) : une case sur Pixel 7, cinq contrôles à 320 px. Sa hauteur,
     suivie par `ResizeObserver`, devient `scroll-padding-bottom` ;
   - à 320 px, la liste des communes s'ouvrait sous le compte : l'option
     active est amenée à l'écran.
4. **Non fait** (BACKLOG) :
   - « Confiance : faible » donne la définition, pas quoi en faire. C'est une
     question de formulation, à proposer à Cédric.
   - Les liens de la fiche étirent leur ligne à 44 px.
   - Sur téléphone, la liste commence encore à près de 2 écrans. Le compte
     collant en ôte la gêne principale.

## Plan v3 — après S23 *(demande de Cédric du 16/10)*

« Termine le développement en agentic de cette PWA ; une fois tous les
sprints faits, un audit applicatif avec Playwright, puis un sprint correctif ;
ensuite cherche les applications proches (vin, whisky…) et prends les
meilleures idées. » Puis : « ouvrir toute la France », « pour les issues
bloquées, regarde si des personas ou toi-même ne peut pas décider », et à
la fin « revue UI/UX, changement de design system, comment marketer
l'appli ».

| Sprint | Contenu | Estimation |
|---|---|---|
| S24 | Finitions du BACKLOG (code seul) | 300 k |
| S25 | Toute la France : couche OpenStreetMap à part de `data/` | 500 k |
| Décisions | Ce que les personas ou l'agent peuvent trancher, tracé | 200 k |
| Audit | Audit applicatif (Playwright, axe, Lighthouse, sécurité, hors ligne) | 300 k |
| S26 | Correctif de l'audit | 300 k |
| S27 | Les meilleures idées de la veille (`docs/VEILLE-CONCURRENCE.md`) | 400 k |
| S28 | Revue UI/UX, design system, marketing | 500 k |

## S24 — Finitions *(terminé le 16/10)*

1. **Pourquoi.** Les restes du BACKLOG qui ne demandent ni données ni
   décision de Cédric.
2. **Fait** (chaque test vu rouge sans sa correction) :
   - **Content-Security-Policy** en `<meta>`, posée au build (`build/csp.ts`).
     Seuls ce site et les tuiles OpenStreetMap sont permis.
     `tests/e2e/securite.spec.ts` vérifie qu'une ressource tierce est
     bloquée, et que tout le parcours (commune, fiche, carte) passe sans
     violation. Avec les vraies tuiles : 4 tuiles chargées, 0 violation.
     Zod essayait `Function('')`, ce que la politique refuse :
     `z.config({ jitless: true })` (lu dans la source de Zod :
     `jit && allowsEval.value`).
   - **Ligatures** : « baroeul » trouve Marcq-en-Barœul (5 communes ont une
     ligature).
   - **Un nom tapé cadre la carte sur ce qu'il trouve**, même hors du rayon
     (`empriseDesPoints`). Le cadre est comparé par valeur : toucher un
     favori ne recadre plus.
   - **Favoris entre onglets** (`BroadcastChannel`) : un favori ajouté dans
     chacun de deux onglets reste. « Tout effacer » dans l'un remet l'autre à
     zéro sans réécrire le stockage.
   - **Liste des favoris cachés** bornée à cinq noms (`listeCourte`).
   - **Haut de page** : le texte de stockage et « Effacer » sont repliés
     (294 px), et la note du filtre type est raccourcie.
   - Les liens de la fiche ne s'étirent plus (`inline-flex`).
3. **Revue adverse** (52 k) : trois trouvailles, toutes corrigées.
   - « Tout effacer » était défait par l'autre onglet : corrigé, test.
   - Toucher un favori recadrait la carte : corrigé, test.
   - La confirmation d'effacement restait prête une fois le bloc refermé :
     elle se remet à zéro.
4. **Décidé sans corriger** : le cartouche d'attribution OSM reste clair en
   thème sombre, parce que les tuiles le restent aussi.

## S25 — Toute la France *(16/10)*

1. **Pourquoi.** Cédric, le 16/10 : « Aucune brasserie à moins de 30 km de
   Porcelette (57)… → ouvrir toute la France ».
2. **La décision.** Le fichier de Cédric ne grandit pas sans son accord, ligne
   par ligne (CLAUDE.md §0). Une **couche à part** s'y ajoute donc :
   `src/donnees-osm/brasseries-osm.json`, les brasseries OpenStreetMap
   (`craft=brewery`, ODbL). Chacune est affichée « À confirmer » : OSM dit
   qu'une brasserie existe, pas ce qu'on peut y faire. Cédric peut la
   retirer d'un mot.
3. **Les données** (`outils/osm-france.ts`, extrait OSM du 16/10).
   - Lecture sur `overpass.openstreetmap.fr` : le serveur principal coupe la
     connexion depuis l'environnement, et le miroir n'a pas les zones, d'où
     des rectangles.
   - 2 132 éléments lus. Écartés :
     - 52 sans nom ;
     - 38 restaurants ou cafés sans rien qui dise qu'on y brasse
       (« Tutti Pizza », « Le Gambetta ») — et La Singulière, vraie
       brasserie étiquetée bar : perte acceptée, dite dans le code ;
     - 20 dont le nom dit « ancienne », « incertaine » ou « fermée » ;
     - 438 avec un code postal étranger ;
     - 142 avec un pays étranger ;
     - 358 à plus de 10 km de toute commune ;
     - 30 à l'étranger selon Nominatim, parmi ceux à commune déduite (revue
       adverse : Orval, Westvleteren, Birtel… rattachés à une commune
       française voisine) ;
     - 47 déjà dans le fichier (même nom dans la même commune, ou nom voisin
       à moins de 20 km : sur les 55 paires de noms voisins mesurées, toutes
       celles à moins de 20 km étaient la même brasserie) ;
     - 13 dessinés deux fois.
   - **994 gardées**, dont 638 dont la commune est déduite de la position :
     c'est dit sur la fiche. 84 sont dans les 9 départements du fichier :
     des lieux que le fichier n'a pas, gardés.
4. **Fait.**
   - La couche est chargée en même temps que les réglages, avant le premier
     écran. Arrivée après, elle faisait bouger la liste sous le doigt (vu en
     test).
   - Elle est dans son propre morceau (`brasseries-osm-*.js`), précaché comme
     le reste.
   - Le build refuse un fichier invalide, un nom en double, ou un nom repris
     du fichier (`validerDonneesOsm`). Vu rouge en remplaçant un nom par
     « Ninkasi Brignais ».
   - Pied de page : attribution ODbL et date de l'extrait. La zone vide
     (Mende, 10 km) dit la plus proche, puis d'où viennent les fiches.
   - Tests : `tests/unit/osm-france.test.ts` (15, mutations vues rouges sur
     les codes postaux étrangers et la limite de 10 km) ; le cas de Cédric,
     Porcelette, en e2e.
5. **Revue de persona** (Cédric, Hugo ; 77 k). Huit trouvailles :
   - **restaurants « brasserie »** : écartés (voir plus haut) ;
   - **rien ne distinguait une fiche OSM** d'une fiche vérifiée : badge
     « · OpenStreetMap » sur la ligne, note courte dans la liste, note
     entière dans la fiche ;
   - **pas de moyen de masquer la couche** : une case « Inclure les … brasseries
     repérées sur OpenStreetMap », gardée dans les réglages ;
   - **« Y aller » parlait d'un point « à 2 km près »** : une fiche OSM va au
     point posé sur la carte, et le dit ;
   - **le site connu d'OSM était jeté** : affiché, validé http(s) au build ;
   - **noms bruts** : « A;B » coupé au premier, doublons sans tenir compte de
     la casse à moins d'1 km ;
   - **signalement** : une fiche OSM dit aussi où la corriger à la source ;
   - les 84 fiches dans les départements du fichier : gardées, voir plus haut.
6. **Décisions** : `docs/DECISIONS.md`, et les recommandations ligne par
   ligne des lots dans `curation/RECOMMANDATIONS.md`. Le lot S14 (119 fiches
   OSM) est recommandé au refus : 106 sont déjà dans la couche.
7. **Revue adverse** (73 k), cinq trouvailles, toutes corrigées :
   - **28 brasseries étrangères** avaient une commune française déduite
     (Orval à « Margny ») : le pays de chaque point à commune déduite est lu
     par Nominatim (cache `outils/cache/pays-osm.json`), 30 sont écartés ;
   - **« Y aller » envoyait une rue sans commune** : il va au point OSM, et
     l'adresse affichée reçoit sa commune, dite déduite ;
   - **couche absente** : l'écran ne le disait pas ; il le dit, avec un
     bouton « Recharger la page » (test : morceau refusé) ;
   - **page blanche possible** : au plus 3 s d'attente (test : morceau jamais
     servi). Le morceau est préchargé dès le HTML (`modulepreload`) : le
     premier écran attendait 600 ms de plus en 4G lente simulée ;
   - **un doublon manqué** (« L'écume du Guier » / « Guiers ») : le pluriel
     ne distingue plus.
   - Lien ODbL en pied de page ; texte du filtre type précisé.

## S27 — Les meilleures idées de la veille *(16/10)*

1. **Pourquoi.** Cédric : « recherche si une application existe déjà ou
   proche (vin, whisky…) et prends les meilleures idées ». La veille est
   dans `docs/VEILLE-CONCURRENCE.md` ; deux décisions de `docs/DECISIONS.md`
   (#35, #39) s'y ajoutent.
2. **Fait** (tests : `tests/e2e/idees.spec.ts`, `tests/unit/tournee`,
   `partage`, `departements`, `recherche`, `schema`).
   - **Parcourir un département**, idée vue sur biere-tourisme.fr. Un menu
     liste les départements avec le nombre de brasseries de chacun (noms du
     COG via Etalab). Choisir un département montre toutes ses brasseries, à
     toute distance.
   - **Ma tournée**, idée des circuits de distilleries et de la route du
     cidre. Les favoris sont rangés de proche en proche depuis le départ,
     dans le téléphone, puis ouverts d'un lien dans Google Maps. Le lien
     porte quatre étapes au plus, la limite des navigateurs de téléphone
     selon la documentation de Google lue le 16/10. Il n'a pas d'`origin` :
     Google part de la position de l'appareil s'il y a accès, et ce site ne
     l'envoie pas.
   - **Légende de la carte**, sous la carte, idée vue sur Open Brewery Map.
   - **« Vérifiez avant de partir »** près de « Y aller », idée vue sur la
     carte de la Scotch Whisky Association. Pour une confiance faible,
     « vérifiez avant d'y aller » s'affiche dès la ligne et dans la fiche
     (décision #39).
   - **Statut « fermée »** au schéma, facultatif, avec sa source et sa date
     (décision #35). Une fiche fermée sort de la liste et ne se trouve plus
     que par son nom. Aucune ligne de `data/` ne l'a encore.
   - **Partager une fiche** : le menu de partage du téléphone, ou le lien
     copié. Le lien `#fiche=Nom` ouvre la fiche, même hors du rayon. Il ne
     porte que le nom, dans le fragment, que le navigateur n'envoie pas au
     serveur. C'est le levier marketing n° 1 (`docs/MARKETING.md`).
   - **« Corriger sur OpenStreetMap »** : fait en S25.
3. **Revue adverse** (45 k). Deux défauts reproduits, corrigés et testés :
   - **département « fantôme »** : un département qui n'avait que des fiches
     OSM restait actif, invisible, quand on décochait la couche OSM. Il
     tombe désormais.
   - **« Partager » sans presse-papiers** (vue intégrée, page non sécurisée) :
     l'erreur n'était pas rattrapée. L'écran dit « Copie impossible ici. ».

   Un troisième point, lu dans le code : les fiches fermées comptaient dans
   le nombre affiché par département. Elles n'y comptent plus.
4. **Restes** (BACKLOG) :
   - un favori fermé est dit « caché par la distance ou les filtres » ;
     aucune ligne n'est encore fermée ;
   - le texte prérempli par un lien partagé reste dans le champ de
     recherche ;
   - les nombres par département ignorent les catégories cochées.

## Audit applicatif *(16–17/10)*

Demande de Cédric : « un audit applicatif sur la PWA avec Playwright MCP ».
Aucun serveur MCP Playwright n'était disponible dans la session. L'audit a
donc été fait avec Playwright en direct (même moteur Chromium), axe 4.13 et
Lighthouse 13.5, sur la page publiée. Rapport complet : `docs/AUDIT.md`.

- **Lighthouse** : mobile 99 / 100 / 100 / 100, bureau 100 / 100 / 100 / 100.
- **axe** : 0 violation sur 5 des 7 états ; dans les 2 autres, seuls des
  marqueurs de carte sont signalés, couverts par l'exception « équivalent ».
- **Réseau** : 0 requête sur 215 ne contient la position.
- **Hors ligne** : réseau réellement coupé, service worker compris ; liste,
  fiche, couche France et onglet neuf marchent.
- **Trouvailles** : 0 bloquant, 2 majeures, 5 mineures, 9 pour information.

## S26 — Correctif de l'audit *(17/10)*

Tests : `tests/e2e/audit.spec.ts` et `tests/unit/mise-a-jour.test.ts`, tous vus
rouges avant correction, sauf m2 et m5 (voir 2).

1. **Corrigé.**
   - **M1 — à 200 % de texte, la page défilait de côté** (544 px pour 320).
     Les champs peuvent désormais rétrécir et les badges passer à la ligne.
     Le test de reflow de S18 était creux : il comparait `scrollWidth` à
     `clientWidth`, qui s'élargit au contenu sur téléphone. Il compare
     maintenant à la largeur de l'écran. La leçon est ajoutée à CLAUDE.md
     §1bis.
   - **M2 — depuis Paris, « Lyon » ne proposait pas Lyon** sans toucher
     « Chercher dans toute la France ».
     - **Première correction, abandonnée** : élargir à la France dès
       qu'aucun nom exact n'est proche. La revue adverse a montré que,
       pendant la frappe, tout préfixe est « non exact » : le fichier de
       toute la France (1,2 Mo) partait dès la deuxième lettre, et hors
       ligne le statut annonçait une erreur sous de bons résultats.
     - **Retenu** : le bouton nomme ce qui est cherché, « Chercher « lyon »
       dans toute la France », et le nom exact passe en tête une fois
       l'élargissement fait. Le test de S21 tape désormais lettre par
       lettre, comme une personne.
   - **m1 — « Recharger » restait sans effet dans un second onglet** : si plus
     rien n'attend, la page se recharge.
   - **m2 — la pastille « Plusieurs brasseries » était invisible en thème
     sombre** (contraste 1,17:1) : elle a maintenant un bord blanc.
   - **m3 — la confidentialité promet « à quelques kilomètres près »**, mais
     zoomer demandait des tuiles de moins d'un kilomètre. Les tuiles
     s'arrêtent au zoom 14 (environ 1,7 km de côté vers 45° de latitude) et
     sont agrandies au-delà.
   - **m5** : balises de partage (Open Graph, Twitter) ajoutées, et
     `favicon.ico`, précaché.
2. **Tests sans rouge observé.**
   - m2 : le test vérifie que la pastille a un bord blanc. Il ne mesure pas
     le contraste lui-même.
   - m5 : écrit avec sa correction, pas vu rouge avant.
3. **Revue adverse** (42 k) : M2 refait (voir plus haut). Le test m3 n'avait
   pas été vu rouge : il l'a été depuis, en remettant `maxzoom: 19` (tuile
   de zoom 15 demandée).
4. **Reporté en S28** (refonte visuelle) :
   - m4 : sur téléphone, la liste commence à 2,3 écrans ;
   - l'image de partage (`og:image`).

## S28 — Design system, revue UI/UX, marketing *(17/10)*

1. **Pourquoi.** Cédric : « revue UI/UX, correction et changement de design
   system », « la rendre sexy », « comment marketer l'appli ».
2. **Fait.**
   - **Design system v2 « cuivre et houblon »** (`docs/DESIGN.md`) :
     polices hébergées (Fraunces, Inter), jetons clair et sombre, en-tête
     cuivré avec logo, cartes, puces, barre de compte, fiche animée.
   - **Image de partage** `public/og.jpg`, fabriquée par
     `outils/image-partage.ts`, avec `og:image`.
   - **Captures** refaites.
   - **Marketing et apprentissage** : `docs/MARKETING.md`, `docs/APPRENDRE.md`.
3. **Revue UI/UX** (designer, Marie, Inès ; 68 k) : dix trouvailles,
   corrigées.
   - Focus de l'en-tête à 1,51:1 : il est désormais blanc.
   - Bord des champs à 1,30:1 : `--bord-champ`, à 3:1 au moins.
   - « À confirmer » confondu avec le cuivre : bande rayée.
   - Bande de catégorie effilée dans l'arrondi : désormais franche.
   - Survol du bouton principal à 4,09:1 : cuivre plus sombre.
   - Légende hors de son cadre sur deux lignes : désormais flottante.
   - Compte qui couvrait 17 % d'un petit écran : il ne colle plus sous
     700 px de hauteur.
   - Puces irrégulières : grille de deux colonnes.
   - Aide d'installation repliée ; trait entre la ligne et sa fiche retiré.
   - La règle de 200 % de texte, retestée : colonnes et puces rétrécissent.
4. **Revue adverse** (62 k) :
   - **régression** : le compte décollé sous 700 px de haut sortait de
     l'écran pendant qu'on réglait la distance (921 px pour 640). Il reste
     collé, plus fin ; un test à 360 × 640 couvre ce cas ;
   - l'anneau de focus du repli « Installer l'application » mordait sur le
     sous-titre : le texte est recentré dans ses 44 px ;
   - le texte d'exemple des champs était à 3,75:1 en sombre : il prend
     l'encre douce ;
   - le reste a été mesuré sans défaut : polices précachées, CSP tenue, pas
     de décalage de mise en page au chargement des polices, Lighthouse
     mobile 96–97 en local, contre 85–98 sur la base, sans écart
     attribuable. Non vérifié : Firefox et Safari.
5. **Proposé, pas fait** (BACKLOG) :
   - mettre la liste avant la carte sur téléphone, avec les filtres repliés ;
   - les trois idées « wow » de la revue : mousse animée dans l'en-tête,
     image de la tournée à partager, fiche en feuille basculante.

## Plan v4 — S29 à S128 *(demandes de Cédric du 17/10)*

« Refais 20 sprints », « enchaîne en agentic », puis « monte à 100 sprints ;
regarde BMAD pour l'implémentation de l'application ». Les 100 stories, en
douze epics, sont dans `docs/EPICS.md` ; la méthode, reprise de BMAD et
adaptée aux règles de ce dépôt, arrive en S30 (`docs/METHODE.md`).

Rien ne touche `data/` sans l'accord de Cédric : les stories de données ne
livrent que des propositions. Firefox et Safari ne sont pas installés dans le
conteneur (seul Chromium) : leur essai passe par la CI (S98) ou par un
humain. **Budget** : environ 150 k par sprint revue comprise, soit 15 M pour
les cent ; c'est à peu près tout ce qui reste à la session. L'ordre des
numéros est donc aussi l'ordre de priorité, et l'arrêt du §9 s'applique.

## S29 — Premier écran sur téléphone *(17/10)*

1. **Pourquoi.** Sur téléphone, la première brasserie était à 1 764 px,
   soit 2,1 écrans (Pixel 7, mesuré le 17/10), derrière le département,
   les catégories, le type, les favoris, puis la carte.
2. **Fait.**
   - Les filtres secondaires sont repliés sous « Plus de filtres et mes
     favoris ». Le résumé dit combien sont actifs et combien de favoris on
     a (`core/filtres.ts`). Le repli est ouvert sur ordinateur, et à
     l'ouverture si un filtre gardé est actif.
   - La liste passe avant la carte dans le document.
   - La barre du compte est placée en fin de zone principale : elle reste
     collée en bas pendant toute la lecture (filtres, liste, carte). Son
     bouton dit « Carte », ou « Liste » quand la carte est à l'écran, et le
     focus suit.
   - Au clavier, un lien d'évitement « Aller à la carte » précède la liste.
   - L'en-tête et l'espacement des filtres sont plus serrés sous 900 px.
   - Résultat sur Pixel 7 : la **première ligne est à 746 px**. Au moins
     44 px en sont lisibles au-dessus de la barre (test), contre 1 764 px
     avant.
   - Sur ordinateur, la liste est à gauche et la carte à droite, dans l'ordre
     du document. La carte reste collée en haut pendant qu'on lit.
3. **Tests vus rouges** :
   - la ligne lisible au-dessus de la barre (espacement d'avant remis) ;
   - le bouton « Carte » à l'écran au milieu de la liste (barre remise avant
     la liste) ;
   - le repli ouvert par un filtre gardé (condition retirée).
4. **Revue adverse** (54 k). Quatre trouvailles :
   - **(haute)** la barre, placée avant la liste, partait avec le
     défilement : le bouton « Carte » restait introuvable dans la liste, et
     la carte était à plus de 9 000 px. Corrigé, voir plus haut ;
   - **(moyenne)** « première ligne à 827 px » ne laissait que 12 px
     lisibles, et le test passait à 1 px. Il exige désormais 44 px ;
   - **(basse)** le repli ne s'ouvrait pas au passage à 900 px de large
     (tablette tournée). Il s'ouvre maintenant ;
   - **(basse)** colonnes inversées sur ordinateur : choix assumé (ordre du
     document), noté ci-dessus.
   Sans défaut : la synchronisation du repli, le filtre caché qui se dit,
   le chargement de la carte par le bouton, la largeur à 320 px et à 200 %
   de texte.

## S30 — La méthode BMAD, adaptée *(17/10)*

1. **Pourquoi.** Cédric : « regarde BMAD pour l'implémentation de
   l'application ».
2. **Lu.** Le README de BMAD-METHOD, la branche V6.12, trois pages de la
   documentation et les notes de version 6.11 (sources dans
   `docs/METHODE.md`). Le dépôt n'a pas pu être parcouru en entier depuis
   le conteneur (403) : ce qui n'a pas été lu est marqué « non vérifié ».
3. **Décidé.** On n'installe pas BMAD : la v7 est en alpha, et son
   installeur écrirait dans `.claude/`, à côté des hooks et des agents. On
   reprend ses formats :
   - `docs/PRD.md` : exigences numérotées et invariants du §0. Le cahier
     des charges v3 n'est pas dans le dépôt ; Cédric doit le verser, ou
     valider ce résumé ;
   - `docs/ARCHITECTURE.md` ;
   - `docs/EPICS.md` : 12 epics, 100 stories ;
   - `docs/stories/MODELE.md`, avec critères d'acceptation reliés aux tests,
     définition de terminé et porte qualité ;
   - le skill `/preparer-story`, pour le rôle de Scrum Master.
4. **Conflits réglés en faveur de CLAUDE.md** (`docs/METHODE.md` §4) :
   - les données ne sont que des propositions ;
   - aucun objectif chiffré non mesuré ;
   - aucune API qui recevrait la position ;
   - le budget passe avant l'autonomie.

## S31 — Restes de S27 *(17/10)*

1. **Fait** (story : `docs/stories/S31.md`) :
   - `passeLesFiltres`, une seule garde (catégories, type, « seulement mes
     favoris »), lue par la recherche et par le compte des départements
     (§4) ;
   - les nombres du menu des départements suivent les filtres. Un
     département à 0 reste dans le menu, et le compte dit alors que ce sont
     les filtres ;
   - un favori fermé n'est plus dit « caché par les filtres ». Il est nommé
     comme fermé, écarté de la liste et de la tournée, et retrouvable par
     son nom ;
   - après un lien partagé, un bouton « Voir les brasseries autour du
     départ » efface la recherche, retire `#fiche=` de l'adresse et pose le
     focus sur le compte.
2. **Tests vus rouges** : `favorisCaches` (fermée comptée comme cachée) et
   le compte filtré, en unitaire ; le menu filtré en e2e (ancien compte
   remis).
3. **Revue adverse** (34 k) :
   - **(moyenne)** le focus tombait en haut de la page après le bouton :
     corrigé ;
   - **(moyenne)** `#fiche=` restait dans l'adresse, et recharger rouvrait la
     fiche : corrigé ;
   - **(basse)** un département à 0 choisi laissait une liste vide sans
     raison : le compte la dit ;
   - **(basse)** la phrase du favori fermé disait « n'apparaît plus dans la
     liste » alors que son nom le retrouve : reformulée ;
   - **(basse)** le test du type ne prouvait que l'exclusion : une
     brasserie d'essai prouve l'inclusion.

## S32 — Aperçu sur la carte *(17/10)*

1. **Pourquoi.** EPICS.md prévoyait une fiche en feuille basculante. Une
   décision écrite dans `Liste.tsx` la refuse : « pas de fenêtre
   par-dessus, la liste reste le fil ». Le vrai besoin vient de S29 : la
   liste passant avant la carte, toucher un marqueur ramenait la page à la
   ligne, des milliers de pixels plus haut (`docs/stories/S32.md`).
2. **Fait.**
   - Sous 900 px, un marqueur touché montre un aperçu dans la carte : nom,
     lieu, distance, catégorie, « Voir la fiche » et « Fermer ». Le focus
     va sur l'aperçu ; Échap le ferme et rend le focus au marqueur.
   - Sur ordinateur, rien ne change.
   - Un groupe touché au zoom maximal va droit à la liste.
3. **Tests vus rouges** : l'aperçu dans la carte à 320 px et 200 % de texte
   (sans hauteur maximale), et l'aperçu retiré quand la recherche ne le
   garde plus.
4. **Revue adverse** (40 k) :
   - **(moyenne)** à 320 px et 200 %, l'aperçu (371 px) sortait de la carte
     (288 px) : il a désormais une hauteur maximale et défile en lui-même ;
   - **(basse)** l'aperçu restait en mémoire quand la recherche ne le
     gardait plus, et revenait seul ensuite : il est retiré ;
   - **(basse)** un groupe au zoom maximal ouvrait un aperçu sans marqueur,
     et « Fermer » perdait le focus : le groupe va à la liste, et le focus
     revient à la carte faute de marqueur.
   - L'agent de revue a contourné le contrôle du `dist/` périmé pour lancer
     ses sondes. Ses mesures portaient sur `Carte.tsx`, inchangé depuis le
     build. Noté ici ; c'est contraire au §6quater.

## S33 — Du mouvement, sans en imposer *(17/10)*

1. **Fait** (`docs/stories/S33.md`) :
   - le logo passe en SVG dans la page. Sa mousse monte une fois à
     l'ouverture (700 ms, sans boucle : WCAG 2.2.2) ;
   - une ligne touchée s'enfonce un peu ;
   - sous « moins d'animations », une garde globale coupe toute animation
     et toute transition, y compris celles qu'un sprint futur oublierait de
     conditionner.
2. **Tests vus rouges** : la garde globale. Avec la mousse animée sans
   condition, le test « rien ne tourne » passe grâce à elle, puis échoue
   quand on la retire.

## S34 — Ma tournée en image *(17/10)*

1. **Fait** (`docs/stories/S34.md`) :
   - `core/image-tournee.ts` décrit l'image : titre, étapes numérotées et
     communes, marque, adresse de l'application. Ni départ, ni distance ;
   - `ImageTournee` la dessine sur un canvas, dans le téléphone. Elle part
     par le menu de partage s'il accepte les fichiers, sinon elle se
     télécharge ;
   - aucune requête réseau pendant la composition (test).
2. **Revue adverse** (33 k) :
   - **(moyenne)** tout refus du partage était avalé, sans repli ni
     message : seule l'annulation est muette, le reste se replie sur le
     téléchargement (test) ;
   - **(moyenne)** les noms étaient coupés au caractère, et 28 « M »
     dépassaient l'image : chaque texte est désormais mesuré sur le canvas
     et réduit jusqu'à tenir dans sa largeur ;
   - **(basse)** deux touchers rapides lançaient deux images : le bouton
     se désactive pendant la préparation ;
   - **(basse)** un état périmé restait affiché : il est remis à zéro à
     chaque toucher ;
   - **(basse)** le lien de téléchargement était révoqué aussitôt, ce qui
     risque l'annulation hors de Chromium : il l'est après une minute ;
   - **(basse)** les graisses de police sont chargées explicitement ;
   - **(test creux)** un canvas vide passait : le test vérifie maintenant
     une PNG de plus de 20 ko ;
   - **(confidentialité)** l'ordre des étapes part de la plus proche de la
     personne. C'est une fuite faible, désormais dite à l'écran plutôt que
     « jamais votre départ ».
3. **Non vérifié** : le partage de fichiers sur iPhone et Firefox. Seul
   Chromium est installé.

## S35 — Mon carnet : les brasseries visitées *(17/10)*

1. **Fait** (`docs/stories/S35.md`) :
   - « J'y suis allé·e » dans la fiche note la visite du jour. La ligne
     montre ✓, lu « visitée le … » au lecteur d'écran ;
   - la case « Seulement les brasseries pas encore visitées » passe par
     la même garde que les autres filtres ;
   - les visites sont gardées comme `{ nom, date }`, rien d'autre, et
     relues une par une ;
   - « tout effacer » vide aussi le carnet ;
   - le carnet passe d'un onglet à l'autre, comme les favoris.
2. **Tests vus rouges** :
   - en unitaire, une visite illisible tombe seule (avec « tout ou rien »,
     le test échoue) ;
   - en e2e, deux onglets gardent leurs deux visites (le partage entre
     onglets retiré, le test échoue).
3. **Revue adverse** (43 k) :
   - **(haute)** un onglet resté ouvert réécrivait l'objet entier et
     effaçait les visites de l'autre : le canal porte maintenant le
     carnet ;
   - **(moyenne)** CA5 et CA6 citaient des fichiers qui ne les testaient
     pas : des tests réels sont écrits. Le lien copié est lu, et la date
     n'y figure pas ;
   - **(basse)** liste vide sous « pas encore visitées » : le compte dit
     que c'est le carnet ;
   - **(basse)** le nombre de visites comptait des brasseries invisibles
     (couche OSM décochée) : il ne compte que celles qu'on peut voir ;
   - **(basse)** l'annonce d'effacement omettait le carnet.
   - Le reste de S33 : un test injecte un élément animé, pour prouver la
     garde « moins d'animations » en permanence.

## S36 — Mes notes *(17/10)*

1. **Fait** (`docs/stories/S36.md`) :
   - « Ma note (sur cet appareil seulement) » dans la fiche, gardée à la
     saisie, 500 caractères au plus ;
   - la ligne signale une note (✎, lu « avec ma note ») ;
   - les notes passent d'un onglet à l'autre ;
   - « tout effacer » les vide ;
   - jamais dans un lien : signalement et lien copié vérifiés.
2. **Revue adverse** (36 k) :
   - **(basse)** une espace tapée sur tout le texte effaçait la note : seul
     un champ vide la retire (vu rouge) ;
   - **(basse)** la coupe à 500 pouvait laisser une moitié d'emoji
     (vu rouge) ;
   - **(moyenne)** une note n'était visible que dans la fiche ouverte : la
     ligne la signale.
   - **Reportés au BACKLOG** :
     - le curseur saute quand l'autre onglet écrit la même note (S104) ;
     - les notes et visites orphelines ne sont pas listées (S103) ;
     - l'écriture à chaque frappe n'est pas mesurée sur un téléphone lent
       (S111).

## S37 — Sauvegarder et transférer son carnet *(17/10)*

1. **Fait** (`docs/stories/S37.md`) :
   - « Enregistrer une sauvegarde » produit un fichier JSON compact :
     favoris, carnet, notes et réglages, **sans le départ**. « Ouvrir une
     sauvegarde » le relit champ par champ ;
   - la sauvegarde **s'ajoute** à ce qui est sur l'appareil, sans rien
     effacer ; l'appareil garde ses notes, ses visites et ses réglages ;
   - aucune requête réseau, ni à l'enregistrement ni à l'ouverture
     (test sur deux contextes) ;
   - le bloc est replié dans « Gardés sur cet appareil seulement ». Ouvert,
     il repoussait la liste sous le premier écran d'ordinateur (la porte
     l'a vu : 904 px pour 800).
2. **Revue adverse** (45 k) :
   - **(moyenne)** la taille était comptée en caractères : elle l'est en
     octets (vu rouge) ;
   - **(moyenne)** un fichier de 300 Mo était lu en entier avant d'être
     refusé : la taille est vérifiée d'abord ;
   - **(moyenne)** 60 000 favoris fabriqués étaient acceptés : 5 000 au
     plus par liste (vu rouge) ;
   - **(moyenne)** une commune de départ partait dans le fichier (nom et
     point) : le départ ne voyage plus ;
   - **(test)** l'absence de requête n'était vérifiée qu'à
     l'enregistrement : elle l'est aussi à l'ouverture.
   - **Non traité** : une note ou une visite différente des deux côtés
     n'est pas reprise et ce n'est pas dit. C'est la règle de CA3, notée au
     BACKLOG.

## S38 — QR code et affichette par fiche *(17/10)*

1. **Fait** (`docs/stories/S38.md`) :
   - « Imprimer une affichette avec QR code » dans la fiche. L'affichette
     montre le nom, la commune, ce que dit la fiche (« À confirmer » compris,
     avec sa raison), un QR de 6 cm et l'adresse de la fiche ;
   - le QR est fabriqué dans le navigateur par `qrcode-generator` 2.0.4
     (MIT, sans dépendance). Il est relu par `jsqr` 1.4.0 (Apache-2.0, en
     développement seulement) dans les tests unitaires et e2e ;
   - le QR est chargé au premier clic, dans un morceau à part de 22 ko.
2. **Revue adverse** (30 k) :
   - **(haute)** Ctrl+P sans affichette imprimait une page blanche. La règle
     d'impression ne vaut plus que pendant l'affichette
     (`body.imprime-affichette`) ;
   - **(moyenne)** si `afterprint` ne vient pas (iPhone), l'affichette
     restait montée : la fin se lit aussi sur `matchMedia('print')` ;
   - **(moyenne)** un second clic sur la même brasserie ne réimprimait pas :
     un numéro par clic ;
   - **(moyenne)** le QR alourdissait le paquet principal : il est chargé à
     la demande.
3. **Régression attrapée par la porte locale** : ce découpage du paquet a
   évalué les schémas de `preferences.ts` avant le `z.config({ jitless })`
   de `schema.ts`. La CSP a signalé un `eval` (test « aucune violation »).
   Zod est désormais configuré dans un seul module, `core/zod.ts`, dont tout
   `src/core` importe `z`. Un test unitaire interdit l'import direct de
   « zod ».
4. **À dire à Cédric** : une brasserie qui imprime l'affichette montre ce
   que dit sa fiche aujourd'hui, « À confirmer » compris.

## S39 à S41 — La carte *(17/10)*

1. **S39** : le repère de départ est peint au-dessus des marqueurs
   (`z-index: 1`) et ne capte pas le toucher. Le constat du 15/10 parlait du
   zoom d'ouverture ; mesuré le 17/10, il se produit au zoom d'ouverture
   + 2 (vu rouge).
2. **S40** : un groupe qui contient la brasserie choisie porte un anneau, et
   son nom accessible dit « dont « X », choisie ».
3. **S41** : le repli « fond de carte incomplet » ne s'allume qu'après trois
   tuiles en échec d'affilée. Une seule tuile perdue le faisait clignoter
   (vu rouge, `MutationObserver`).
4. **Revue adverse groupée** (48 k) :
   - **(moyenne)** à `z-index: 3`, le repère se peignait sur les contrôles
     de zoom et sur l'attribution OSM : il est à 1, sous les contrôles
     (test) ;
   - **(basse)** une réponse tardive de `getClusterLeaves` remarquait un
     groupe après la fermeture de la fiche : elle est ignorée si le choix a
     changé, et ses erreurs sont attrapées ;
   - **non mesuré** : le coût de `getClusterLeaves(…, Infinity)` sur un
     très grand groupe (S111).

## S42 — Les communes, hors ligne d'avance *(17/10)*

1. **Fait** : le service worker garde d'avance `communes-france.json` et
   `communes/departements.json`, soit 469 ko compressé une fois par
   version. Le pied de page ne dit plus « demande le réseau la première
   fois ».
2. **Vu rouge** : le test du précache, sans les deux fichiers.
3. **Trouvé en route** : le repli sur le fichier entier, quand un fichier de
   département manque, existait déjà dans `ChoixCommune`. Le repli ajouté
   dans `communesFrance.ts` était redondant ; il est retiré, et le test qui
   le gardait est renommé pour dire ce qu'il garde.
4. **Revue adverse** : groupée avec S43.

## S43 — Couche OSM : mesurée, inchangée *(17/10)*

La couche est déjà compacte : 994 n-uplets, 47 ko compressés. Le gain
possible est inférieur à 2 ko. Pas de changement (`docs/stories/S43.md`).

## S44 — « Quoi de neuf ? » *(17/10)*

1. **Fait** : un repli dans le pied de page, avec les nouveautés datées et
   une phrase sur les fiches. Cette phrase est liée à l'empreinte de
   `data/breweries.json` par un test : changer une fiche sans la réécrire
   fait échouer la porte.
2. **Revue adverse** (groupée avec S42, 36 k) : la phrase est vraie (un
   seul commit sur `data/`, le 15/10), les dates sont sans décalage, et le
   précache de S42 est servi compressé, hors ligne compris.
   - **(basse)** une personne qui a encore l'ancien service worker voit
     « communes de départ » dans le pied de page avant l'activation du
     nouveau : noté au BACKLOG.

## S45 — Thème clair, sombre ou comme le téléphone *(17/10)*

1. **Fait** (`docs/stories/S45.md`) :
   - « Apparence » dans le pied de page, gardée avec les réglages, remise à
     « comme le téléphone » par « tout effacer » ;
   - `build/theme.ts`, un plugin Vite, tire des blocs
     `prefers-color-scheme: dark` les règles du thème forcé : une seule
     source de couleurs ;
   - le thème est posé avant le premier rendu par `public/theme-precoce.js`
     (un fichier, la CSP refusant les scripts en ligne), à partir d'un
     miroir dans `localStorage`.
2. **Tests vus rouges** : sans le plugin, les deux tests de couleur ; sans
   le script du `<head>`, le thème avant le rendu (code de l'application
   bloqué).
3. **Revue adverse** (49 k) :
   - **(moyenne)** le thème choisi ne venait qu'après IndexedDB, d'où un
     éclair du thème du système : corrigé ;
   - **(moyenne)** des tests trop faibles : la couleur exacte et « tout
     effacer » sont maintenant vérifiés ;
   - **(latent)** le parseur maltraitait `:is(.a, .b)`, `:root` en milieu de
     sélecteur, les conditions à virgule ou avec `not`, et un `@media` en
     commentaire. Il les gère, ou fait échouer le build (tests unitaires) ;
   - **sans régression** en sombre automatique : spécificités vérifiées sur
     le CSS émis.

## S46 — Raccourcis de l'application installée *(17/10)*

1. **Fait** (`docs/stories/S46.md`) :
   - « Autour de moi » et « Mes favoris » dans le manifeste. Un test lie le
     manifeste à la liste que l'application comprend ;
   - l'adresse est nettoyée après lecture ;
   - la barre d'état prend le cuivre de l'en-tête (`theme_color` et
     `<meta>`).
2. **Écarté** : un écran d'accueil à la première visite. « Par où
   commencer ? » joue déjà ce rôle, et un écran de plus repousserait la
   liste.
3. **Revue adverse** (30 k) :
   - **(moyenne)** « Mes favoris » devenait permanent : chaque lancement
     suivant s'ouvrait sur les seuls favoris. C'est maintenant une vue, et
     le réglage gardé ne change que si la personne touche la case (vu
     rouge) ;
   - **(moyenne)** « Autour de moi » ne demandait jamais la position sans
     permission accordée d'avance. Le raccourci est le geste de la
     personne : il la demande (vu rouge).

## S47 — Accessibilité, seconde passe *(17/10)*

Axe et cibles de 44 px sur tous les écrans venus depuis S29, dépliés, en
clair et en sombre, aperçu de la carte compris, ainsi qu'avec le thème forcé
à l'inverse du système : **aucune violation**. Des tests le gardent
(`docs/stories/S47.md`).

## S48 — Interface en anglais (1/3) : le socle *(17/10)*

1. **Fait** (`docs/stories/S48.md`) :
   - `src/i18n.ts` : `t()`, dont la clé est le texte français lui-même ;
     la langue est choisie au démarrage, et l'anglais reste éteint
     (`ANGLAIS_PRET`) tant que tout n'est pas traduit ;
   - un dictionnaire, `src/textes/en.ts`, de 76 entrées pour l'écran
     principal ;
   - `tests/unit/i18n.test.ts` lit tous les appels `t('…')` du code. Il
     exige leur traduction, refuse une traduction orpheline et compare les
     paramètres. Les textes passés par une constante (« Quoi de neuf ? »,
     signalement) y sont listés ;
   - les tests de bout en bout tournent en français (`locale: 'fr-FR'`).
2. **Vu rouge** : 67 clés manquantes avant le dictionnaire.
3. **Revue adverse** : avec S49, sur l'ensemble de la traduction.

## S49 — Interface en anglais (2/3) : les composants *(17/10)*

1. **Fait** (`docs/stories/S49.md`) : les quatorze autres composants passent
   par `t()` ; le dictionnaire compte 225 entrées. Les refus de lecture
   d'une sauvegarde sont nommés (`RAISONS`). L'affichette reste en
   français, exprès.
2. **Vu rouge** : deux traductions retirées, deux clés signalées.
3. **Revue adverse** : avec S50, sur l'ensemble de la traduction.

## S50 — Interface en anglais (3/3) : les textes du cœur, et l'allumage *(17/10)*

1. **Fait** (`docs/stories/S50.md`) :
   - les textes écrits par `src/core` passent par `t()` : dates (en-GB),
     heures (24 h), jours, types de bière, confiance, précision, départ,
     résumé des filtres, localisation, note des fiches OpenStreetMap ;
   - le titre de la page se traduit ;
   - `ANGLAIS_PRET = true` : un navigateur anglais reçoit l'anglais ;
   - 296 entrées au dictionnaire ;
   - persona Emma, visiteuse étrangère (`docs/PERSONAS.md`).
2. **Vu rouge** : anglais éteint, 3 tests sur 4 rouges ; un texte de
   `Contact.tsx` laissé en français, le test de la fiche rouge.
3. **Une sonde jetable** a lu tout l'écran en anglais : elle a trouvé
   « Pourquoi : » / « Ce que dit la source : » sur chaque ligne et la note
   longue des fiches OSM, restés en français. Corrigés.
4. **Revue adverse S48–S50** (296 entrées relues, écran peint en anglais
   sur dix états) : deux trouvailles, corrigées —
   - l'attribution de la carte, constante de module, restait « contributeurs
     OpenStreetMap » : le style est désormais construit à la création de la
     carte. Test ajouté, vu rouge sans le correctif ;
   - « Chargement de la carte… » en dur dans `CarteDifferee.tsx`.
   Une réserve suivie : le test recopiait le texte d'erreur de la carte au lieu
   de le lire (§4ter) ; le texte est maintenant un `t('…')` littéral, vu par
   la garde. Manifeste, `<noscript>` et métadonnées restent en français
   (statique) : inscrit au BACKLOG, et en S188.

## S51 à S54 — Les remarques de Cédric du 17/10 *(17/10)*

Cédric : « monte à 200 sprints, en agentic total » ; « lien vers Untappd
absent » ; « la localisation des brasseries ne correspond pas à l'adresse
sur la carte » ; « type de bière non affiché ».

**Constat** : le code affiche contacts, Untappd et bières depuis S4–S5 ;
les 166 fiches n'en ont aucun, et toutes sont au centre de leur commune.
Les données n'entrent que par lot accepté (CLAUDE.md §0).

1. **S51** : sans lien Untappd vérifié, la fiche offre « Chercher sur
   Untappd » (le nom seul), dite comme une recherche ; la section des
   bières y renvoie. Vu rouge : URL concaténée à la main.
2. **S52** : un lot peut proposer une position entière ; `km` recalculé ;
   la fiche n'est pas datée ; le diff dit le déplacement. Tests écrits
   d'abord, vus rouges.
3. **S53** (`curation/s53-untappd-bieres.md`) : 42 propositions.
   - 8 agents ont lu 80 fiches. Rendement Untappd faible : la recherche web
     trouve mal les pages Untappd, et la recherche d'Untappd demande un compte
     (non contournée).
   - Une sonde directe des pages untappd.com/<Nom> sur les 166 fiches en a
     trouvé 17 de plus dans la bonne commune. Chaque page a été relue et ses
     bières en sont tirées, avec leur style.
4. **S54** (`curation/s54-positions.md`) : 73 positions à l'adresse
   (Géoplateforme de l'IGN, numéro trouvé dans la bonne commune), 31 non
   proposées et expliquées. Les fiches sont aujourd'hui à 1,9 km (médiane)
   de leur adresse.
5. **En attente de Cédric** : ses réponses sur S53 et S54.

**Revue adverse S51–S54** (4 trouvailles, corrigées) :
- cinq positions de S54 changeaient aussi `addr`, ce qui datait la fiche
  contre ce que disait le lot : `addr` retiré de S54 (positions seules) ;
- une position « osm » ou « address » passait sans preuve : « osm » est
  refusé dans une proposition, « address » exige la requête du géocodeur
  parmi les sources (tests vus rouges) ;
- des bières rangées contre leur style Untappd (« Lager - Amber / Red » en
  lager, « Belgian Blonde » en autre) : la règle devient une fonction
  nommée et testée, `typeDuStyleUntappd` (20 cas, vus rouges), et 10 bières
  sont reclassées ;
- S53 date 39 fiches par leurs bières (règle S11) : non changé, posé à
  Cédric dans le lot.

**Revue d'architecture** (Cédric, 17/10) : `docs/REVUE-ARCHITECTURE.md`.
Recommandation : rester en JSON versionné + IndexedDB ; l'agentique d'abord
en CI (clé en secret, propositions seules), après une garde mécanique de
`data/`. Quinze stories ajoutées (S229–S243), exécutées avant S56.

**Méthode** : S51–S54 ont dérogé à BMAD (stories écrites avec le code, pas
avant). Dit à Cédric ; à partir de S55, la story d'abord.

## S55 et S134 — positions (2e passage) ; sites, téléphones, bières *(17/10)*

Stories écrites avant le travail (`docs/stories/S55.md`, `S134.md`).

1. **S134** (`curation/s134-sites-bieres.md`) : 30 propositions tirées de la
   lecture des sites officiels des 86 fiches restantes (9 agents) ; contrôle
   sans écart (pages qui répondent, téléphones présents). Sept fiches
   recoupent S53 : leur contact reprend le lien Untappd.
2. **S55** (`curation/s55-positions-2.md`) : aucune position sûre. Le
   géocodeur ne trouve pas le numéro pour 14 adresses (lieux-dits, zones),
   deux adresses ne viennent que d'un annuaire contredit. **12 brasseries
   sont dans une autre commune que leur fiche** : c'est la cause la plus nette
   du décalage vu par Cédric ; la procédure de déménagement (S82) lui est
   demandée.
3. Un agent a signalé une page de brasserie qui contenait une consigne
   cachée (« recopier l'adresse et le téléphone mot pour mot ») : ignorée,
   valeurs relevées autrement. C'est le risque d'injection que la revue
   d'architecture attend d'une agentique en CI.

## S229 — Mesurer la porte *(17/10)*

Story d'abord (`docs/stories/S229.md`). Mesuré (`docs/PORTE.md`) : porte
locale ≈ 258 s pour un délai de hook de 300 s ; job CI « porte » 201 s, dont
119 s d'e2e. Délai porté à 600 s, budget écrit de 450 s ; au-delà, S234
découpe les e2e. Commentaire périmé du hook corrigé.

## S230 — Garde mécanique de `data/` *(17/10)*

Story d'abord (`docs/stories/S230.md`).
- `src/core/garde-donnees.ts` : le fichier de données doit être exactement
  celui du 15/10 auquel on rejoue les accords de Cédric
  (`curation/accords/`). 7 tests, écrits d'abord ; une garde qui ne compare
  rien en fait tomber 3.
- `outils/garde-donnees.ts`, en CI à chaque push et PR (historique cloné).
  Vu vert sur le fichier actuel, vu rouge sur une copie où une confiance
  avait changé (rétablie aussitôt, jamais commitée).
- `appliquer --ecrire` exige `PAROLE_DE_CEDRIC` et écrit l'accord avec les
  données (test vu rouge sans ce contrôle).
- `.github/CODEOWNERS` : Cédric pour `data/` et `curation/accords/`.
  **À activer par lui** : protection de `main` exigeant la revue des
  propriétaires de code.

## S233 — Le JavaScript de `public/` linté *(17/10)*

Story d'abord (`docs/stories/S233.md`). `public/sw.js` (globales du service
worker) et `public/theme-precoce.js` (navigateur) passent au lint. Une
trouvaille : une variable d'exception inutilisée, retirée (`catch {}`). Vu
rouge : une variable non déclarée ajoutée à `sw.js` fait échouer le lint.

**Revue adverse S229–S230** (4 trouvailles, corrigées) :
- CODEOWNERS ne couvrait pas ce qui fait tourner la garde (outils, cœur,
  workflow) : on pouvait la désactiver sans Cédric. Couverts désormais ;
- l'ordre de rejeu suivait le nom du lot, pas l'ordre d'acceptation (faux
  rouge démontré) : l'accord porte l'instant d'écriture à la seconde
  (`nomDAccord`), comparaison de chaînes simple ; test vu rouge comparateur
  inversé ;
- accepter un lot en deux fois le même jour plantait (EEXIST) : noms à la
  seconde, message clair ;
- la base de la garde n'était tenue par aucun test : elle est dans
  `BASE_DE_DONNEES` et un test la lie à l'empreinte de « Quoi de neuf ? ».
Le relecteur a déclenché par mégarde la porte dans une copie : c'était la
cause des deux échecs e2e « connexion refusée » du commit S232.

## S234 (2/2) — premier tri des échecs WebKit *(17/10)*

Premier passage en CI sur WebKit (profil iPhone 13) : 167 réussis, 13
échecs, 3 instables. Tri :
- **presse-papiers** (3 tests) : WebKit ne connaît pas la permission
  `clipboard-write` → les tests relèvent ce que l'application copie
  (`releverCopies`), quel que soit le moteur ;
- **« Installer » (Android)** : API propre à Chrome → Chromium seulement,
  raison écrite ;
- **écrans émulés** (ordinateur 1280, 320 px, premier écran du Pixel 7) :
  calibrés sur Chromium → restreints, raison écrite. **Constat réel** : sur
  iPhone 13, la première brasserie passe sous la barre (BACKLOG) ;
- **ligne qui s'enfonce au toucher** : Safari n'applique `:active` que si
  la page écoute les touchers → correctif dans `main.tsx` ;
- **carte** (5 tests) : aucune tuile demandée, ni carte ni message. Possible
  défaut réel sur Safari, non reproductible ici (pas de WebKit dans le
  conteneur) → test de diagnostic `carte-moteurs.spec.ts` (erreurs de la
  page dans le message) et rapport Playwright gardé en CI ;
- **couche OSM jamais servie** : le chargement de page de WebKit attend la
  requête pendante → le test attend le document.

## S236 — L'étage « composants » des tests *(17/10)*

Story d'abord (`docs/stories/S236.md`). `jsdom` et Testing Library en
dépendances de développement (aucune alerte ajoutée ; les deux alertes
modérées de `npm audit` viennent de `tsx`, d'avant). L'environnement se
choisit par fichier : les tests existants restent en node.
`tests/composants/ChoixCommune.test.tsx` : clavier (flèche, Entrée, Échap)
et confidentialité — avec la position pour départ, aucun fichier « par
département » n'est demandé (vu rouge en forçant l'appel), témoin inverse.

## S237 (1/n) — `App.tsx` découpé en crochets *(17/10)*

Story d'abord (`docs/stories/S237.md`). Sortis dans `src/crochets.ts` :
`useConnexion`, `useCarteEnVue`, `useHauteurBarre`,
`useCarnetEntreOnglets`. `App.tsx` passe de 982 à 855 lignes, sans
changement visible (suite e2e entière à la porte). Le carnet entre onglets
a son test de composant (deux onglets montés, favori, visite, note,
effacement, pas d'écho) : vu rouge sans l'envoi des favoris, et sans la
mémoire anti-écho des favoris (celles des visites et des notes : voir la
correction de la revue adverse, plus bas).

## S234 (3/3) — WebKit, deuxième passage *(17/10)*

173 réussis, 2 échecs, 4 instables. La carte arrive plus lentement sous
WebKit (≈ 1 Mo) — le test de diagnostic acceptait alors la carte *ou* son
message, il ne prouvait donc pas qu'elle s'affiche (corrigé plus bas)
→ `versLaCarte` attend 15 s (attente de test). L'adresse `?raccourci=` lue
trop tôt → `expect.poll`. La pression simulée à la souris ne donne pas
`:active` sous WebKit émulé → Chromium seulement, iPhone réel en S96.

## S239 — Mutation outillée *(17/10)*

Story d'abord (`docs/stories/S239.md`). Stryker sur `src/core`, job de nuit
informatif (`docs/MUTATION.md`). Installé pour le job seulement : son ajout
désaccordait le verrouillage (`npm ci` cassé, vu en local, rétabli). Les
mutants statiques sortaient survivants à tort (vérifié à la main) : ignorés.
Première trouvaille : aucun test ne refusait un fichier de base invalide
dans la garde de `data/` — test ajouté (66 % au lieu de 58 %).

## S234 (4/4) — Firefox, premier tri *(17/10)*

134 réussis, 45 échecs, presque tous sur la carte : sans écran en CI,
Firefox n'a pas WebGL, et la carte dit alors qu'elle ne peut pas
s'afficher — le bon comportement (`carte-moteurs.spec.ts` réussit). Les
tests qui ont besoin de la carte dessinée ne portent pas sur ce moteur
(`versLaCarte` le dit et passe ; sous Chromium, une carte absente échoue).
Le profil Firefox de bureau devient **Firefox pour Android** (écran de
téléphone, toucher, agent Android) : les tests du téléphone et de « Y
aller » (liens Android) s'y appliquent.

## PR #84 — corrections de la revue adverse *(17/10)*

- **S238** : avec un stockage d'une version plus récente, l'écran disait
  « navigation privée » et retirait la sauvegarde par fichier. Il dit
  maintenant la vraie raison, et la sauvegarde reste (`versionFuture`). La
  garde n'était lue qu'à l'ouverture : un onglet ouvert avant réécrivait ce
  qu'une version plus récente gardait ensuite. Elle est relue à l'écriture,
  dans la même transaction (test e2e ajouté).
- **S237** : la mémoire anti-écho des visites et des notes n'était tenue par
  aucun test (mutant survivant). Deux tests ajoutés, vus rouges chacun sans
  sa mémoire.
- **S234** : `versLaCarte` sautait sur tout message « carte absente » hors
  Chromium, donc une carte cassée sous WebKit devenait un saut vert. Il ne
  saute plus que si la page n'a pas WebGL ; `carte-moteurs.spec.ts` exige la
  carte là où WebGL existe. Trois sauts « écran émulé sur Chromium
  seulement » retirés (la taille se pose sur tout moteur). Un
  `PW_NAVIGATEUR` inconnu échoue au lieu de lancer Chromium. Le tri est
  rassemblé dans `docs/NAVIGATEURS.md`, cité mais absent jusque-là.

## S244 — SIRENE contre OpenStreetMap, trois départements *(17/10)*

Story d'abord (`docs/stories/S244.md`). Mesure, sans ligne de `data/`.
Le code 11.05Z voit 22 établissements dans la Manche, 64 dans le Rhône et
75 dans le Finistère. La couche OSM en a 8, 7 et 31. Dans la Manche, 17
établissements n'existent que dans SIRENE, et 3 vraies brasseries que dans
OSM. Recommandation pour S246 : SIRENE pour trouver, OSM en complément, puis
chaque candidat est vérifié et décidé par Cédric (`docs/SIRENE.md`).
Constaté en relançant les jobs WebKit après la revue de #84 : les tests sur
écran d'ordinateur et à 320 px, qui ne sont plus sautés, échouent sous
WebKit. Ils sont ajoutés au tri de `docs/NAVIGATEURS.md`.

## S240 — Tests visuels sur cinq écrans figés *(17/10)*

Story d'abord (`docs/stories/S240.md`). `tests/e2e/visuel.spec.ts` couvre
cinq écrans : la liste, une fiche, la carte sans tuiles, le carnet et la
liste à 200 %. Ils sont figés : heure posée, thème clair, animations
coupées, aucune tuile. La spec ne tourne qu'avec `PW_VISUEL=1`, et la porte
ne la voit pas (0 test listé). Le job CI `visuel` est informatif.

- **Instable d'abord** (revue adverse) : la barre collée en bas varie de
  13 à 15 pixels d'une exécution à l'autre sur la même machine (2 rouges sur
  8). Couper le flou n'y changeait rien (8 rouges sur 10). Elle est masquée
  dans les captures (ses textes sont tenus par les e2e) : 12 exécutions
  vertes sur 12.
- **Le premier « vu rouge » était faux** : la couleur changée
  (`--encre-douce`, ligne 25) est redéfinie plus bas par le design system
  v2, et le rouge venait de l'instabilité. Refait sur la couleur appliquée
  (#5f5447 → #5f5457) : avec la tolérance par défaut de Playwright, 5 verts
  ; en comparaison exacte, 4 rouges (la carte n'emploie pas cette couleur).
- **Première trouvaille** : sans tuiles, l'attribution OSM recouvre la fin
  du message de repli (BACKLOG).
- La capture d'une fiche seule la faisait passer sous le compte collant.
  Elle est remplacée par l'écran tel qu'il est vu.
- **Première exécution en CI (CA5)** : les 5 écrans diffèrent d'environ
  10 % des pixels (34 421 pour la liste à 200 %). Le rendu du runner n'est
  pas celui du conteneur. **Décision** : les références sont produites par
  la CI elle-même (workflow `visuel-references.yml`, committées dans la
  branche, relues dans le diff), et la comparaison reste exacte. Aucune
  tolérance n'est inventée. Conséquence : la spec ne se lance plus en local.
  La preuve du rouge (CA2) a été faite dans le conteneur, avec ses propres
  références. En CI, seule la stabilité se prouve (job vert sans nouvel
  essai, sur les références du robot, commit 9321c67, barre masquée).

## S241 — Sonde publiée étendue *(17/10)*

Story d'abord (`docs/stories/S241.md`). `page-deployee.spec.ts` passe d'un
test à quatre :
- l'ouverture d'une fiche, avec sa source et « Y aller » ;
- la CSP publiée, qui doit être exactement `POLITIQUE` de `build/csp.ts` ;
- le précache du `sw.js` publié, lu dans le cache de cette version.

La lecture du précache est partagée avec `hors-ligne.spec.ts`
(`tests/e2e/precache.ts`, §4).

Vu vert en local, `MOUSSE_URL` pointant vers `vite preview`, puis vu rouge
sur trois `dist/` servis qui le contredisent :
- l'attribut « Y aller » renommé ;
- `object-src *` ;
- un fichier promis jamais mis en cache.

Deux premières mutations étaient fausses et ont été refaites :
- les apostrophes de la CSP sont écrites `&#39;` dans le HTML ;
- `vite preview` répond 200 avec la page pour un fichier absent.

Revue adverse : le test de la fiche passait sans source (`fiche-source`
est rendu même vide, 58 fiches sur 166). Il ouvre maintenant une fiche qui
a une source, choisie dans les données, et compare le lien. Vu rouge sur un
`dist/` où ce lien change.

Reste CA5 : la sonde verte sur la vraie page, après le merge.

## S246 — L'outil « département » *(17/10)*

Story d'abord (`docs/stories/S246.md`). Le module `src/core/candidats.ts`
est écrit test d'abord, et chaque garde a été vue rouge.

**Fusion** :
- même SIREN ;
- puis même commune, avec même cœur de nom ou même adresse ;
- plusieurs points OSM peuvent rejoindre un même candidat.

**Noms** :
- un entrepreneur individuel sans enseigne n'a pas de nom ;
- une nature juridique inconnue est traitée comme une personne.

**Classement** : celui de S14, sur la commune où une fiche existe. Un même
nom dans deux communes est « ambigu », pas un doublon écarté.

**Assemblage** : sont refusés le candidat inconnu, la seconde lecture, le
nom répété ou déjà dans le fichier, et la lecture invalide.

**Revue adverse, une fuite trouvée avant tout push.** Les 4 candidats sans
nom publiaient leur SIREN, leur SIRET et leur position à 12 décimales :
c'est le domicile retiré par ailleurs, et le SIREN retrouve le nom. Une
personne ne publie plus ni SIREN, ni SIRET, ni position. Sans nom, elle ne
publie pas non plus son adresse. Sa clé devient `personne:<n>`, et la
correspondance reste dans le cache ignoré par git. Vérifié sur la Manche :
aucun SIREN, nom ni latitude d'entrepreneur individuel dans `curation/`.

**Autres corrections de la revue** :
- page d'erreur de l'API gardée en cache, qui empoisonnait la reprise ;
- la Corse (codes postaux en 20) ;
- second point OSM traité comme une autre brasserie ;
- doublon décidé sur le nom seul ;
- candidat à deux communes classé sur la première ;
- `assembler` sans lien avec le candidat ;
- compteur de requêtes figé dans le message.

**Manche** : 22 établissements SIRENE et 8 points OSM donnent 26
candidats : 21 nouveaux, 1 ambigu (« Brasserie de la Baie », Pontorson et
Huisnes-sur-Mer) et 4 à nommer. La relance fait 0 requête à l'API (compte
réel).

**Écart avec S244.** S244 comptait 5 communs, sur la commune seule. L'outil
en fusionne 3 :
- Captain James ;
- Fée d'Orge ;
- les Travailleurs de la Mer, par l'adresse.

Les 2 autres de S244 étaient des rapprochements de commune sans même nom.

## S247 (1/2) — Pilote Manche : un lot de 9 fiches pour Cédric *(17/10)*

Story d'abord (`docs/stories/S247.md`). Les 26 candidats de la Manche ont
été lus par 5 agents `verificateur-de-brasserie`. Les positions viennent du
géocodeur de l'IGN, au numéro de la voie seulement : une rue sans numéro
donne le centre de la commune.

Le lot `curation/dep-50.{json,md}` (empreinte dans le `.md`) compte
9 fiches nouvelles :
- 5 avec une catégorie lue :
  - Les Travailleurs de la Mer et L'Écume des Falaises, en 1 ;
  - Captain James, en 2 ;
  - Léopard et La Moussette, en 1, confiance faible ;
- 4 « À confirmer » : Fée d'Orge (Bréhal, près de Coutances), Bifrost,
  Cotentine et Pinte de Saire.

17 candidats ne sont pas proposés, chacun avec sa raison. Aucune page
Untappd n'a été vérifiée.

**Trouvé en route (§1bis)** : `controler` ne lisait que les propositions et
répondait « sans écart » sur un lot d'ajouts qu'il n'avait pas ouvert.
`extraitSurLaPage` a été écrite test d'abord, et ses deux mutants sont
tués. `controler` rouvre maintenant chaque source d'une fiche nouvelle et y
cherche l'extrait. Trois extraits n'étaient pas mot pour mot sur leur page :
ils ont été remplacés par le texte lu. Résultat sur le lot : 9 sur 9.

Un agent avait proposé la catégorie 3 (« Pas de vente ») pour une brasserie
dont l'extrait dit « dégustation et vente » ; la catégorie 1 a été retenue.

## S247 (2/2) — Calvados : un lot de 10 fiches *(17/10)*

L'outil sort 34 candidats, sans aucune fuite de personne (vérifié). Les
agents ont lu ces candidats avec un outil qui résume les pages : ils
l'ont tous dit. Leurs extraits ont donc été relus dans le texte même des
pages avant d'entrer dans le lot.

`curation/dep-14.{json,md}` compte 10 fiches nouvelles :
- Trip-Hop (Lisieux) en catégorie 1 ;
- en catégorie 2 : La Lie, l'Odon, Baya (confiance faible) et Sagesse
  (confiance faible) ;
- 5 « À confirmer ».

24 candidats ne sont pas proposés, chacun avec sa raison. Parmi eux, deux
pages ne se lisent pas sans JavaScript (Valdal, Fort Mignonne). Le
contrôle donne 10 sur 10.

**Bilan du pilote** :
- 60 candidats ;
- 19 fiches proposées ;
- 0 page Untappd vérifiable (la recherche d'Untappd demande un compte) ;
- les bières dont le style est lu, sur 6 fiches.

Le circuit tient. Pour la suite (S248 et après), deux enseignements :
- l'outil de lecture des agents résume les pages, d'où la relecture
  mécanique de chaque extrait ;
- les sites en JavaScript restent hors de portée.

## S240 (suite) — Le message de repli de la carte n'est plus recouvert *(17/10)*

Story d'abord (`docs/stories/S240-suite.md`). Le défaut avait été trouvé
par les tests visuels. Le test, écrit avant le correctif, a été vu rouge
(« se croisent », à 412 et à 320 px). Le message passe en haut, à gauche
des boutons de zoom. Le test vérifie maintenant trois choses :
- les cadres du message et de la mention ne se croisent pas ;
- les cadres du message et des boutons de zoom non plus ;
- le bas du message est bien peint (`elementFromPoint`).

Les références visuelles sont refaites par la CI.

## S248 — Orne, Eure, Seine-Maritime : 17 fiches de plus *(17/10)*

Story d'abord (`docs/stories/S248.md`). Il y a 75 candidats, sans aucune
fuite de personne.
- Les 57 candidats nommés ont été lus par 7 agents.
- Les 18 sans nom n'ont pas été lus : aucun des 8 du pilote n'avait été
  trouvé.
- Chaque extrait a été relu dans le texte de sa page.

Les lots `dep-61` (3 fiches), `dep-27` (4) et `dep-76` (10) passent
`controler`.

**Raté trouvé en route, et corrigé** : le géocodeur de l'IGN a placé
« 37 rue Louis Blériot, Martin-Église » à Bruay-la-Buissière (62). Rien ne
le refusait, et la position venait d'un script jetable, hors du dépôt.
- `positionDuGeocodeur` a été écrite test d'abord, et ses deux mutants sont
  tués. Elle refuse une position hors du département ou sans numéro de
  voie, et retient la première réponse qui tombe dans le département
  (communes homonymes).
- Le géocodage entre dans l'outil (`outils/departement.ts lectures`), et les
  lectures retenues sont versionnées (`curation/dep-XX-lus.json`).
- Rejoué sur les lots déjà présentés : la position de Paillette (lot
  `dep-14`) était celle de Saint-Arnoult en **Seine-Maritime**. Elle est
  corrigée, et l'empreinte du lot change. Cédric n'avait pas encore décidé.

**Normandie, bilan** : 135 candidats, 36 fiches proposées en 5 lots.

### S248 — corrections de la revue adverse *(17/10)*

1. **La garde du géocodeur ne vérifiait pas la commune.** « Sainte-Marguerite »
   tombait sur Sainte-Marguerite-sur-Duclair, dans le même département.
   - Elle exige maintenant la commune attendue (sans accents ni casse).
   - Elle lit le département dans `context`, ce qui distingue 2A de 2B.
   - Tests écrits d'abord, et les deux mutants sont tués.
   - Rejouée sur les 36 fiches, une seule réponse est refusée : Oissel,
     écrite désormais sous son nom officiel, Oissel-sur-Seine.
2. **Le message de repli de la carte**, posé en haut, cachait 6 marqueurs
   sur 9 à 320 px, et débordait du cadre à 200 % de texte. Il passe
   **sous la carte**, dans le flux. Le test compare maintenant le message à
   la carte entière, à 412 et à 320 px, et à 200 % de texte. Il a été vu
   rouge avec l'ancien CSS (3 sur 3), puis vert.
3. **Catégories qui dépassaient leur extrait** : La Moussette (l'article
   parle du bar, pas de la brasserie) et Brasserie Léopard (annonce
   « dès le 1er juillet » sans année) passent en « À confirmer », avec
   leur raison. Les empreintes des lots changent.


## S249 — Bretagne : 81 fiches proposées en 4 lots *(17/10)*

Les quatre départements bretons suivent le circuit de la Normandie
(`docs/stories/S249.md`).

| Lot | À lire | Proposées | Acheter et consommer | Acheter seulement | Pas de vente | À confirmer |
|---|---:|---:|---:|---:|---:|---:|
| `dep-29` | 60 | 19 | 5 | 5 | 0 | 9 |
| `dep-22` | 53 | 22 | 4 | 5 | 0 | 13 |
| `dep-35` | 50 | 17 | 3 | 4 | 0 | 10 |
| `dep-56` | 58 | 23 | 3 | 6 | 0 | 14 |

Chaque lot dit, pour chaque candidat non proposé, pourquoi : doublon d'une
fiche proposée, site injoignable, en JavaScript, fermé, pas une brasserie,
ou introuvable. Les quatre passent `controler` sans écart.

**Ce que la relecture a changé** : l'outil de lecture des agents résume les
pages, et un extrait sur trois ne se retrouvait pas tel quel.
- Chaque extrait a été cherché dans le texte brut de sa page ; ceux qui
  manquaient ont été remplacés par la phrase réelle, ou la fiche écartée
  (Cézon et Torr Penn injoignables, Dinan derrière une porte d'âge en
  JavaScript, L'Ombre sans texte, deux pages en 404).
- **Six catégories redescendues**, parce que la phrase de la page ne les
  porte pas : Grain du Ponant, Alchimistes Ivres, Barque, Gwennili et Akène
  (« acheter seulement » → « à confirmer ») ; Kerpiton (une dégustation de
  visite n'est pas un bar : « acheter et consommer » → « acheter
  seulement »).
- **Confiances relevées** à « moyenne » quand la phrase vient du site de la
  brasserie : Bonne Humeur, Drao, Guerlédan.
- Les doublons entre SIRENE et OSM sont fusionnés sous une seule fiche (16).

**Écarts à la story, dits ici** :
- les paquets faisaient 10 candidats, non 7 ;
- le quota de recherches web de la session s'est épuisé pendant les
  paquets 14 à 23 : 12 candidats n'ont été cherchés qu'une fois au plus,
  marqués « À relancer » dans leur lot (BACKLOG) ;
- l'outil `lectures` n'a pas de champ contact : les liens Untappd ouverts
  par un agent (Arvarus, Smash, Louarn, Horla) et les téléphones restent
  dans les notes, non proposés.

### S249 — corrections de la revue adverse *(17/10)*

1. **La brasserie des Marais** : « pas de vente » reposait sur une réponse
   à un commentaire de juin 2020, temporaire (déménagement). Elle passe en
   « à confirmer », avec la date dans la note.
2. **Deux doublons affirmés sans preuve** : « Brasserie du Merlin »
   (Plougastel) et « Brasserie Horla » (`personne:6`) étaient écartés comme
   « même brasserie » sur le seul nom. Ils restent écartés, mais avec
   « lien non établi » et sans page propre à eux.
3. **An Alarc'h** : la note la rattachait à Tri Martolod, ce que sa source
   ne dit pas. Le rattachement est retiré.
4. **Adresses ignorées** : Merlin (40 Impasse Ru Land, Penmarc'h) et
   Tri Martolod (17 rue Aimé Césaire, Concarneau) étaient publiées sur la
   page citée. Elles sont reprises et géocodées.
5. **Extraits trop courts** pour porter la catégorie : Sainte Colombe
   (« Bar & Vente Directe : … ») et Choque (« … + heure de taproom ») citent
   maintenant la phrase entière.

Les trois lots modifiés repassent `controler` sans écart ; leurs empreintes
changent.

## S261 — Les lots départementaux portent les contacts lus *(17/10)*

`docs/stories/S261.md`. Les liens Untappd et les téléphones lus en Bretagne
restaient dans les notes : `outils/departement.ts lectures` n'avait pas de
champ pour eux.
- `ajoutDeLecture` (`src/core/candidats.ts`) fait d'une lecture une fiche
  nouvelle, contact compris. Elle est écrite test d'abord.
- La règle « le contact cite une page lue, ce jour-là » ne valait que pour
  les propositions. Elle devient une fonction partagée avec les fiches
  nouvelles (`ajoutSchema`), CLAUDE.md §4.
- `controler` relit le contact sur sa page (`contactSurLaPage`) : le
  téléphone par `numeroSurLaPage`, le lien Untappd entier (un lien tronqué
  ne passe pas).
- Lots bretons : 47 fiches portent un contact, avec 45 sites, 9 téléphones
  fixes et 6 liens Untappd (Arvarus, Smash, Skumenn, Choque, Horla, Lion
  d'Or). Les quatre lots passent `controler` sans écart. Leurs empreintes
  changent.

### S261 — corrections de la revue adverse *(17/10)*

1. **Le site était accepté trop facilement.**
   - Un hôte contenu dans un autre passait : `bar.fr` dans `foobar.fr`.
   - Un hôte cité en paramètre d'une autre adresse passait aussi : un annuaire qui renvoie vers la brasserie.
   - Sur Facebook, n'importe quelle autre page de la plateforme passait.
   - Correction : `contactSurLaPage` compare maintenant les hôtes exacts des adresses citées. Sur une plateforme partagée, il exige l'adresse elle-même ou une page en dessous.
2. **« trouvé » laissait croire à une lecture** quand le site ou le lien Untappd était la page lue elle-même : c'est le cas des 45 sites et de deux liens Untappd. `controler` le dit maintenant (« site = la page lue elle-même »).
3. **La racine d'Untappd** (`https://untappd.com/`) passait. Elle est refusée. Une page sous le lien de la brasserie (`…/240180/beer`) vaut toujours, et c'est maintenant testé.
4. **Les horaires** étaient gardés par `ajoutSchema` sans qu'aucun test le prouve. Un test est ajouté ; il a été vu rouge en retirant les horaires de la garde.
5. **Lion d'Or** : sa page Untappd ne donne pas la commune. Le lot dit sur quoi tient le rattachement : ses quatre bières, les mêmes que celles de l'annuaire.

Tests vus rouges avant le correctif (8), puis verts. Mutations : la garde des
horaires retirée, ou l'ancienne comparaison par sous-chaîne remise, et un
test échoue chaque fois. Les quatre lots repassent `controler` sans écart.

## S262 — Les lots départementaux portent les horaires lus *(17/10)*

`docs/stories/S262.md`. C'est le même chemin que le contact (S261).
- `ajoutDeLecture` porte les blocs d'horaires, datés du jour, et leurs
  sources.
- `horairesSurLaPage` cherche chaque heure de chaque créneau sur la page du
  bloc. Il reconnaît « 14h », « 14:00 », « 14 h 30 », « minuit » et les
  plages « 17-22 h ». Une heure lue dans un autre nombre ne compte pas.
- Il contrôle la présence des heures, pas leur sens : un jour interverti
  passerait. C'est dit dans le code, et la relecture humaine reste.
- Lots bretons : 17 fiches, 18 blocs, tous trouvés par `controler`. Les
  empreintes changent.

### S262 — corrections de la revue adverse *(17/10)*

1. **Faux positifs du contrôle d'heure** : quatre écritures faisaient lire une heure qui n'était pas sur la page.
   - « 14 h 30 » valait 14:00.
   - « 12 hectolitres » valait 12:00.
   - « Midi-Pyrénées » valait midi.
   - Une durée « visite 2-3 h » fabriquait 02:00.

   Le « h » ne compte plus quand il ouvre un mot, l'heure pleine n'est plus suivie d'autres minutes, « midi » et « minuit » doivent être des mots isolés, et une plage ne se normalise qu'à partir de 6 h. « de 17 à 22h » se lit maintenant. Les tests ont été écrits d'abord et vus rouges (3), puis verts.
2. **Deux remarques sans appui sur leur page** :
   - Skumenn : « Hors événements. » est retiré.
   - Domani : « Retrait des commandes » est retiré ; le samedi d'été reste.
3. **Le verdict de la story disait plus que le contrôle** (« retrouvés heure par heure ») : c'est un contrôle de présence, et le verdict le dit maintenant. Les blocs ont été relus un par un par la revue.

Les quatre lots repassent `controler` sans écart.

## S250 (1/…) — Loire-Atlantique : 32 fiches proposées *(17/10)*

`docs/stories/S250.md`. C'est le premier département des Pays de la Loire, traité seul pour tenir dans le quota de recherches.

| Lot | À lire | Proposées | Acheter et consommer | Acheter seulement | À confirmer | Contacts | Horaires |
|---|---:|---:|---:|---:|---:|---:|---:|
| `dep-44` | 85 | 32 | 9 | 11 | 12 | 17 | 9 |

- Les agents ont lu en 13 paquets de 7. Chaque extrait a été relu dans le texte brut de sa page. Les phrases trop faibles ou absentes ont été remplacées par la phrase réelle de la page.
- Trois catégories sont redescendues :
  - La Déviation et la Divatte : une dégustation de visite n'est pas un bar.
  - Vestibule : la page dit « ouverte » sans dire pour quoi.
- Les doublons entre SIRENE et OSM ont été fusionnés : Les Brassés, San Roce, Philmore.
- **Défaut du contrôle, corrigé** : les entités typographiques des CMS (`&rsquo;`) n'étaient pas décodées. Un extrait juste était donc dit « ABSENT ». La correction a un test, vu rouge.
- Restent pour Cédric : une chaîne (3 Brasseurs) et deux brasseries à la même adresse (AERoFAB et La Hulotte), dites dans le lot.

### S250 (1) — corrections de la revue adverse *(17/10)*

- Deux notes disaient plus que leur page :
  - Côte de Jade : « dégustation lors des visites seulement » ; le « seulement » n'est pas sur la page.
  - Bouffay : la salle de dégustation était dite « pour groupes ».
- La règle de catégorie est maintenant écrite dans le lot et dans les choix : une dégustation liée à une visite n'est pas un bar, alors qu'une dégustation ouverte au public avec la vente en est un. C'est ce qui sépare BACA de la Divatte.
- Papas Brasseurs : la contradiction de la page (« lundi au samedi » contre un tableau qui ferme le lundi) est dite dans le choix.

## S250 (2/…) — Maine-et-Loire : 11 fiches proposées *(17/10)*

| Lot | À lire | Proposées | Acheter et consommer | Acheter seulement | À confirmer | Contacts | Horaires |
|---|---:|---:|---:|---:|---:|---:|---:|
| `dep-49` | 30 | 11 | 3 | 5 | 3 | 7 | 4 |

Les liens Untappd de La Côale et de La Bestiole sont lus sur leur site. La Belle de Maine reste en « acheter seulement » : sa dégustation se fait sur rendez-vous, et la règle écrite en partie 1 s'applique.

## S250 (3/…) — Vendée : 17 fiches proposées *(17/10)*

| Lot | À lire | Proposées | Acheter et consommer | Acheter seulement | À confirmer | Contacts | Horaires |
|---|---:|---:|---:|---:|---:|---:|---:|
| `dep-85` | 33 | 17 | 10 | 4 | 3 | 8 | 3 |

- Beaucoup de bars de brasserie sur le littoral. Six fiches reposent sur une fiche de tourisme (dont Beer Workshop), une sur un annuaire ; toutes sont en confiance « faible ».
- Une seconde enseigne 3 Brasseurs est proposée (La Roche-sur-Yon), signalée comme la première.
- Deux sociétés sont rattachées à leur brasserie par l'adresse seulement (MK Production, SARL Bonnin), et le lot le dit.

### S250 (2-3) — corrections de la revue adverse *(17/10)*

La revue a relu chaque page par curl. Aucune erreur grave ; corrigé :
1. **La N'O** : « acheter et consommer » n'est pas écrit (la dégustation suit les visites). Elle passe en « acheter seulement », avec l'extrait de la boutique.
2. **La Muette** : le lot disait les horaires « dans une image » ; ils sont en texte. La catégorie tient maintenant sur la page « Brasserie » (« LA STABUL : Vente directe de bière et restauration sur place et à emporter »). Le téléphone fixe et le lien Untappd (`nostradaMusse`, page Untappd « La Ferme-Brasserie La Muette ») sont repris. Les horaires restent hors bloc : deux pages du site diffèrent pour le vendredi midi.
3. **La Côale** : la note suggérait un accueil sur rendez-vous ; la page dit le contraire. Source, extrait (« boire une bière sur place ») et horaires du jeudi et du vendredi repris.
4. **La Rombière** : des titres de rubriques ne prouvent pas la vente. Elle passe « à confirmer ».
5. **« Aucun lien Untappd »** était écrit en dur dans l'en-tête des lots, faux pour 49 et 85. Le compte vient maintenant des fiches.
6. **Beer Workshop** passe en confiance « faible », comme les autres fiches de tourisme, et la phrase de la partie 3 est corrigée.

## S250 (4-5/…) — Sarthe et Mayenne : 7 et 4 fiches proposées *(17/10)*

| Lot | À lire | Proposées | Acheter et consommer | Acheter seulement | À confirmer | Contacts | Horaires |
|---|---:|---:|---:|---:|---:|---:|---:|
| `dep-72` | 19 | 7 | 4 | 2 | 1 | 6 | 4 |
| `dep-53` | 9 | 4 | 1 | 0 | 3 | 1 | 1 |

- Mage Malte passe en « acheter et consommer » : la page dit « Vente directe* et TAP ROOM », que le rapport de l'agent n'avait pas vu.
- Septante-Deux tient sur son propre site (« servie sur place, en direct des cuves »), et non plus sur un guide.
- Jolicoeur : la commune de Laigné-en-Belin s'appelle aujourd'hui Laigné-Saint-Gervais pour le géocodeur ; la fiche n'était pas écrite. Elle l'est, et le lot le dit.
- La Mayenne a peu de pages de brasseries : trois fiches sur quatre restent « à confirmer ».

### S250 (4-5) — revue adverse *(17/10)*

Toutes les pages ont été relues par curl, et les décomptes recomptés. Deux trouvailles :
1. **La Muette (85)** : « sur place » ne qualifie que la restauration ; la page ne dit pas que la bière s'y boit. La fiche passe en « acheter seulement ».
2. **Brasserie Cousin (53)** : l'enseigne porte le nom de famille du brasseur, que la page nomme. Le nom de la personne n'est repris nulle part ; le lot le signale à Cédric.

## S250 (6/…) — Indre-et-Loire : 4 fiches proposées, quota épuisé *(17/10)*

| Lot | À lire | Proposées | Acheter et consommer | Acheter seulement | Pas de vente | À confirmer | Contacts | Horaires |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `dep-37` | 27 | 4 | 1 | 1 | 0 | 2 | 2 | 0 |

- Le quota de recherches web de la session s'est épuisé pendant la lecture. Sept candidats n'ont eu qu'une recherche ; le lot les marque « À relancer ». Le Centre-Val de Loire reprend dans une session suivante (37 à relancer, puis 45, 41, 18, 36, 28).
- Sans recherche web, rien d'autre de ce département ne peut être lu proprement : la suite de la session va aux stories qui n'en ont pas besoin.
- `controler` a signalé deux fois un écart fugace (connexion coupée par le proxy), disparu à la relance. Le lot n'est présenté qu'après une relance sans écart.
- Revue adverse du lot 37 : « pas ouvert au public » n'est pas « pas de vente » (la Pigeonnelle vend des fûts aux particuliers). La fiche passe « à confirmer » ; un type de bière lu sur une page non citée est retiré. Les trois autres fiches sont confirmées sur leur page.

## S59 — « Centre de la commune » : les points mesurés, la promesse retirée *(18/10)*

`docs/stories/S59.md`. Le quota de recherches web étant épuisé, la session passe à une story sans recherche.

- **Défaut sur la page publiée.** Chaque fiche disait « approximative : centre de la commune, à environ 2 km près ». La mesure (`outils/precision.ts`, `docs/PRECISION.md`) dit autre chose : sur 151 fiches dont la commune a un centre connu de l'IGN, 75 sont à plus de 2 km de ce centre, et l'écart va jusqu'à 14,4 km.
- **Le texte dit maintenant ce qui est établi** : le point n'est pas l'adresse, et il peut en être à plusieurs kilomètres. La même chose sur toutes les surfaces : la fiche, « Y aller », la note des distances de la liste, la traduction anglaise, `docs/DONNEES.md`, et les commentaires qui justifiaient un choix par « ≈ 2 km ».
- **Garde** : `tests/unit/textes-precision.test.ts` lit `src/`, `index.html` et `docs/DONNEES.md`. Il a vu les 13 occurrences avant le correctif, plus une que la réécriture avait elle-même introduite.
- `outils/geocodeur.ts` : la requête au géocodeur, avec ses reprises, est partagée par `departement.ts` et `precision.ts` (§4).

## S60 — Étiquettes OSM des fiches vérifiées *(18/10)*

`docs/stories/S60.md`. Toujours sans recherche web : OpenStreetMap se lit par le miroir Overpass.

| Fiches | Rapprochées | Ambiguës | Sans élément | Téléphones | dont mobiles (non recopiés) | Sites | Horaires |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 166 | 45 | 10 | 111 | 26 | 15 | 32 | 17 |

- `outils/osm-etiquettes.ts` écrit `curation/s60-etiquettes-osm.{json,md}` : des pistes pour S61 à S63, pas des propositions.
- La règle « même brasserie » de la couche OSM est extraite (`designeLaFiche`) et partagée ; la requête Overpass aussi (`outils/overpass.ts`).
- Quatre défauts, chacun mis en test rouge avant correction : un élément partagé par deux fiches et un mobile caché dans une valeur à deux numéros (vus sur le vrai fichier) ; des formes de mobile non masquées et un repli de site perdu (revue adverse).
- À trancher en S61 : Brasserie des Roches (élément OSM à Seyssuel) et Les Deux Branches (élément sans ville).

## S61 — Lot de contacts venus d'OSM *(18/10)*

`docs/stories/S61.md`. S62 (« sites ») y est fondue : `contact` est un seul objet, et deux lots s'écraseraient.

- `curation/s61-contacts-osm.md` : 8 propositions (8 sites officiels) sur les 45 fiches rapprochées en S60 ; 8 écartées (site en erreur, Facebook, autre établissement, mobile seul) ; 20 en attente d'un lot déjà soumis à Cédric.
- Revue adverse : la première version ne lisait que les lots S53 à S134 ; quatre fiches avaient un contact proposé dans S11, S12 ou S13. Accepter les deux lots en aurait écrasé un (un téléphone fixe de la Brasserie Stéphanoise perdu). Tous les lots de `curation/` sont maintenant lus.
- Chaque site a été ouvert et nomme la brasserie ; `controler` sans écart. Aucun mobile.

## S63 — Lot d'horaires venus d'OSM *(18/10)*

`docs/stories/S63.md`.

- `lireOpeningHours` (TDD) lit le cas simple d'`opening_hours` et refuse le reste avec sa raison.
- `curation/s63-horaires-osm.md` : 7 propositions (8 blocs) sur 17 fiches à horaires OSM ; 10 écartées. Les créneaux sont ceux de la page de la brasserie : deux fois elle contredit OSM.
- Revue adverse : deux raisons d'écart fausses (Stéphanoise, Nomade), dont une venue d'un faux négatif de `horairesSurLaPage` (« 19h 388 rue… »), corrigé test d'abord ; Pleine Lune écartée (nature déduite, pas écrite) ; `lireOpeningHours` refuse maintenant ce que le schéma refuse, et sert au rapport S60.
- `controler` relit maintenant les horaires des propositions, pas seulement ceux des fiches nouvelles (vu rouge sur un lot faussé).


## S264–S266 — La règle de Cédric, puis les premières lignes de `data/` *(18/10)*

`docs/stories/S264.md` à `S266.md`. Cédric, le 18/10 : « site officiel + contrôlé », sa règle vaut accord, chaque PR liste ses lignes (`docs/DECISIONS.md`).

| Fiches | Changées | Contacts | dont téléphones (fixes) | Bières | Horaires | Positions à l'adresse | Propositions | Accords |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 166 | 44 | 38 | 19 | 17 | 10 | 14 | 62 | 8 |

- S265 : `trierParRegle` et `outils/curation.ts trier` écrivent `curation/decision-regle.md` (acceptées par lot, et la liste « à montrer » avec ses raisons).
- S266 : les 62 propositions retenues entrent dans `data/` ; la liste lisible est `curation/s266-lignes.md`.
- Trois défauts vus en écrivant, chacun en test rouge d'abord : 14 mobiles acceptés (maintenant montrés), un ordre de clés qui faisait refuser la garde, une sortie de `controler` tronquée dans un tube.
- Sur ordinateur, le filtre par type de bière repoussait la liste sous le premier écran : « Plus de filtres » se partage entre les deux colonnes.

## S302 — La porte tourne sous Windows et PowerShell *(19–20/10)*

`docs/stories/S302.md`. Revue globale du 19/10, groupe W, sur le PC fixe de Cédric (Windows 11, PowerShell 5.1, Node 24).

- Avant : lint, tsc, build et e2e rouges (casse de `MiseAJour.tsx` / `miseAJour.ts`), 13 échecs vitest (CRLF, `npx`, séparateur de chemin), et la porte avant commit sortait en 0 sans rien lancer, faute de `jq`.
- W1 `.gitattributes` (`* text=auto eol=lf`) et `.editorconfig` ; W6 `src/miseAJour.ts` devient `src/nouvelleVersion.ts`, et un test refuse deux modules qui ne diffèrent que par la casse ; W7 chemins écrits avec « / » ; W3 `process.execPath` et `outils/tsx.ts` au lieu de `npx` et `.bin/tsx`.
- W2 : les trois crochets passent en Node (`.claude/hooks/crochet.mjs` → `outils/crochet.ts`, décisions pures dans `outils/crochets-claude.ts`) ; `npm run porte` (`outils/etapes-porte.ts`) ; une porte qui ne démarre pas refuse le commit. `outils/dist.ts` : une seule réponse pour le crochet et le `globalSetup` de Playwright.
- W8, vu en lançant la porte : un `vite preview` de Sentiers tenait 4173, et Playwright a testé Sentiers (209 e2e rouges). Mousse sert sur 4317, `--strictPort`.
- Deux courses des e2e que Windows rend visibles : axe mesurait la fiche pendant son fondu (4 balayages rouges à chaque fois), et deux tests rechargeaient avant l'écriture IndexedDB. Les tests attendent maintenant la fin des animations et la garde (`tests/e2e/garde.ts`).
- W4 : sections « Sous Windows (PowerShell) » dans README et CONTRIBUTING, blocs bash marqués, `CLAUDE.md` §6.
- Revue adverse : trois trouvailles, toutes corrigées avec un test vu rouge (crochet de démarrage muet sur une URL de mandataire, branche `tsconfig` de `dist/` non testée, crochet au nom inconnu silencieux).
- Porte complète mesurée sur ce poste : 257 s, dont 3,2 min d'e2e (222 tests).

## S303 — Les majeurs courts de la revue du 19/10 *(20/10)*

`docs/stories/S303.md`. A10, A3, A1, A5, A6, A11 de `docs/REVUE-GLOBALE-2026-10-19.md`.

- A10 : les cases longues (couche OSM, week-end) prennent la ligne par une classe `case-large`, plus par `:last-child`.
- A3 : le service worker rend la réponse du réseau même quand l'écriture en cache échoue (appareil plein).
- A1 : une seule frontière d'erreur, `LimiteDeChargement`, pour la carte et l'affichette ; une affichette absente le dit dans la barre du compte, la liste reste.
- A5 : une fiche plus haute que l'écran s'ouvre par son haut depuis la carte (le défaut ne se voyait qu'avec le défilement animé).
- A6 : toutes catégories décochées, le compte le dit ; « la plus proche » passe les filtres et n'est jamais fermée.
- A11 : « ouvertes ce week-end » n'est accusé que s'il vide la liste à lui seul, et ne dit plus « n'ouvre ».
- Revue adverse : une assertion durcie, trois restes au BACKLOG.

## S304 — Le premier écran d'ordinateur, la barre collée à 200 % *(20/10)*

`docs/stories/S304.md`. A4 et A7 de la revue du 19/10, plus W9 vu en lançant la porte.

- A4 : filtres en `columns: 3 min(22rem, 34vw)` sur ordinateur ; à 1280 × 800, la première brasserie passe de 778 à 621 px, son nom peint au-dessus de la barre (751 px). Le test qui gardait A4 (`top < 800`) ne pouvait pas échouer : réécrit sur ce qui est peint.
- A7 : au-delà d'un quart de l'écran, la barre collée se décolle ; elle se recolle sous le cinquième.
- W9 : sous Node 24 et Windows, `fs.rmSync` ne supprime rien dans un chemin accentué ; Vite laissait d'anciens morceaux dans `dist/`. Plugin `build/vider-dist.ts`.
- Budget du premier écran : 73 octets de trop ; CSS morte retirée (dette D), 218 975 pour 219 000. S294 devient urgente.
- Revue adverse : quatre trouvailles corrigées, cinq restes au BACKLOG.

## S305 — Les chiffres écrits disent les données *(20/10)*

`docs/stories/S305.md`. T1 à T6 de la revue du 19/10.

- 358 → 348 fiches (README, ETAT, LINKEDIN, MARKETING), 259 → 258 sans horaires, 130 → 214 placées au centre (« Quoi de neuf », français et anglais).
- `tests/unit/chiffres-ecrits.test.ts` : fiches, départements et leur liste, brasseries OSM, communes, bilan de complétude et fiches au centre, lus dans la doc et comparés aux données.
- Commentaires chiffrés remis à jour et datés (`fiche.ts`, `sauvegarde.ts`, contrastes de l'en-tête) ; `LienExterne.tsx` ne se dit plus seul à poser `_blank` ; `docs/DESIGN.md` dit ce que fait le compte sous 700 px ; l'état de reprise ne dit plus « 166 lignes, jamais modifié ».

## S306 — Les crochets et la CI disent vrai *(20/10)*

`docs/stories/S306.md`. C1 à C4 de la revue du 19/10.

- C1 : le crochet de démarrage ne lit que `ci.yml` (`--workflow ci.yml`).
- C2 : `estUnCommit` reconnaît `git -C . commit`, `git -c a=b commit`, `git.exe commit`, un commit dans une chaîne ; le filtre `if: "Bash(git commit*)"` de `settings.json` est retiré (il empêchait le crochet de voir ces écritures) ; porte en panne, le lanceur refuse tout ce qui mentionne un commit.
- C3 : la garde de `data/` entre dans la porte locale, après les tests unitaires. `npm audit` reste en CI (registre npm requis).
- C4 : `failOnFlakyTests` en CI : un test qui ne passe qu'au second essai rougit.
- Vu en committant : le crochet n'était branché que sur l'outil Bash ; les commits faits par l'outil PowerShell (S303 à S306) passaient sans lui. `"matcher": "Bash|PowerShell"`, tenu par un test.

## S307 — Les marqueurs se lisent sur la carte, en thème sombre aussi *(20/10)*

`docs/stories/S307.md`. A8 et A9 de la revue du 19/10.

- A8 : la carte et sa légende gardent les couleurs du thème clair (les tuiles restent claires) ; chaque couleur tient 3:1 contre les fonds du style openstreetmap-carto (`tests/unit/couleurs-carte.test.ts`). Anneau du marqueur choisi `#241c14`, focus `#7a3410`.
- A9 : un marqueur choisi et focalisé montre les deux contours.
- Budget du premier écran : CSS v1 écrasée par la v2 retirée ; 218 981 octets pour 219 000.

## S294 — Les fiches en deux temps *(20/10)*

`docs/stories/S294.md`. Le premier écran ne porte plus que les fiches d'Auvergne-Rhône-Alpes (148) ; les 200 autres arrivent juste après, dans un seul fichier, le même pour tout le monde (AR3 tenue par construction, prouvée par un e2e Lyon / Brest).

- Découpage au build (`build/decouper-donnees.ts`, `src/core/decoupage.ts`) depuis `data/breweries.json`, après la validation.
- Premier écran : 218 991 → 189 402 octets gzip (budget refixé à 208 000) ; LCP 1 916 → 1 808 ms sur le PC fixe.
- En attendant la suite, le compte dit « Chargement des fiches des autres régions… » ; sans elle, un message et « Recharger la page ».
- `carnet.spec.ts` stabilisé (5 échecs sur 15 sous Windows, sur `main` aussi).


## S308 — La fiche parle comme quelqu'un *(20/10)*

`docs/stories/S308.md`. Demande de Cédric du 20/10 (« personne ne parle comme cela », « trop brouillon »).

- Ce qui manque est dit une fois, sous « En bref » : « Pas encore dans la fiche : son adresse, son téléphone, ses horaires et ses bières. », puis deux liens, « Chercher sur Google Maps » et « Ses bières sur Untappd » (hors de la phrase : un lien de fiche a 44 px de haut et étirait les lignes, vu sur la capture).
- Joindre, Horaires et Bières ne s'affichent plus sans contenu ; « En bref » n'a que ce qui est connu ; « Y aller » dit en une phrase où mène l'itinéraire, avec la commune (« au centre d'Oullins »).
- La provenance en une phrase ; le sens de la confiance replié ; l'avertissement sur les horaires visible dès qu'il y a des horaires.
- La fiche sort de `Liste.tsx` (`src/Fiche.tsx`) ; Ninkasi Brignais : 341 mots avant, moins de la moitié après (`tests/unit/fiche-rendu.test.ts`).

## S312 — Une fiche riche dit ses dates une fois, et « maintenant » une fois *(20/10)*

`docs/stories/S312.md`. Restes de S308 (revue Marie).

- La provenance groupe les lectures par site : « Lu sur labrasseriestephanoise.com : la fiche le 17 octobre 2026, les coordonnées le 16 octobre 2026, les horaires le 18 octobre 2026. » ; chaque lecture garde le lien de sa page. Le contact et le tableau ne disent plus « Lu le … sur ».
- `natureEnTete` (l'accueil, sinon la vente) : une règle pour la liste, « En bref » et le tableau ; « En bref » porte l'heure de référence, le tableau ne redit pas l'état de cette nature.
- L'aperçu des lots rend la provenance : un lot qui change une source ou une date se voit (revue adverse).

## S313 — Les captures du README montrent l'application d'aujourd'hui *(20/10)*

`docs/stories/S313.md`. Sept captures refaites (`outils/captures.ts`) ; le GIF gardé (pas de `ffmpeg` sur le poste). Vu sur la capture : les liens de la provenance écartaient les lignes ; un lien au fil d'un texte reste en ligne.

## S315 — Le compte n'accuse plus le carnet à tort *(20/10)*

`docs/stories/S315.md`. Restes de la revue adverse S303.

- `videAussiSans` (`src/core/recherche.ts`) : la liste resterait-elle vide sans ce critère ? Une règle pour le week-end (A11, calculé à la main jusque-là) et pour le carnet.
- Carnet vide, ou une autre cause qui vide la liste : le compte ne dit plus « Toutes celles qui correspondent sont dans votre carnet ».
- « La plus proche pas encore visitée : … » quand le carnet écarte les visitées.

## S316 — Les bières se lisent sans jargon *(20/10)*

`docs/stories/S316.md`. Reste de S308 (revue Marie).

- `LEXIQUE_BIERES` (`src/core/lexique.ts`) : les styles nommés par les libellés des bières « autre » (tourbée, fumée, triple, saison, gose…) expliqués sous la liste, comme les mots de la note.
- La glose d'un type (« — claire et légère ») n'est dite qu'à sa première bière.
- Revue adverse : « fumée » n'est plus « tourbée », plus de contradiction avec la glose de l'IPA, sens réécrits au plus sûr.

## S317 — Une annonce redite est redite au lecteur d'écran *(20/10)*

`docs/stories/S317.md`. Reste de la revue adverse S303. L'annonce du compte porte un compteur qui sert de clé à son nœud : à texte égal, un second échec de l'affichette ajoute un nouveau nœud à la région vivante, donc il est lu. Preuve : `tests/e2e/affichette.spec.ts`, rouge sans la clé.

## S318 — Ce qu'un agent écrit est lu par un schéma *(20/10)*

`docs/stories/S318.md`. LD9. `lireLecturesAgent` (Zod) lit les lectures d'agents de `outils/departement.ts lectures` ; `nomDeFichierDeLecture` nomme leur fichier sans chemin possible (une clé `..\` écrivait hors du dossier sous Windows). Revue adverse : clés en collision et clé trop longue refusées.

## S319 — Barre décollée, le focus reste près du geste *(20/10)*

`docs/stories/S319.md`. Reste de la revue adverse S304. Barre décollée (texte agrandi), « Voir les brasseries autour du départ » et le retrait d'un favori en mode « seulement » ne posent plus le focus sur le compte, en fin de page : `focusApresGeste` vise le champ de recherche, ou la ligne voisine, cadrée par son haut après le rendu. Revue adverse : nom coupé en haut sur une ligne plus haute que l'écran, corrigé et testé ; clavier virtuel non mesuré, au BACKLOG.
## S320 — La confiance se dit en phrases *(20/10)*

`docs/stories/S320.md`. Cédric, le 20/10 : « oui ». `phraseConfiance` dit chaque niveau en une phrase tirée de sa définition (`docs/DONNEES.md`) ; le volet « Que veut dire « confiance … » ? » disparaît ; l'avertissement sur les horaires ne nomme plus la confiance. Le champ `conf` ne change pas. Réponses de Cédric du 20/10 consignées dans `docs/DECISIONS.md`. Revue adverse : test anglais, phrase « faible » trop affirmative, réserves perdues pour « moyenne », corrigés.
## S322 — Une fiche peut déménager *(20/10)*

`docs/stories/S322.md`. Cédric, le 20/10 : « OK » aux trois déménagements. `changementsSchema` accepte `c` et `d`, ensemble, avec l'adresse et une position entière (à l'adresse ou au centre IGN) ; le nom reste exclu. Le lot des trois fiches suit dans une PR de données.

## S323 — Les adresses autour de Lyon, quatrième lot *(20/10)*

`docs/stories/S323.md`. 12 fiches (84 à 97 km), 7 propositions dans `curation/s323-adresses-lyon-4` : trois adresses, une note, une fermée d'après SIRENE, deux déménagements (S322). En attente de Cédric.

## S324–S325 — Ce que le PC connecté débloque, premier sprint *(21/10, epic E30)*

`docs/stories/S324.md`, `S325.md`. Demande de Cédric du 21/10. La couche OSM réextraite par le miroir français (878 → 880 points ; le serveur principal refuse l'usage automatisé, écrit dans `docs/CONTINUITE.md`) ; `contact:*` lu comme `addr:*` (55 adresses gagnées, vu par la revue adverse sur l'Atelier 235). Les huit communes sans point l'étaient à cause d'une longitude en notation scientifique, mal lue (`src/core/wikidata.ts`) : 34 968 communes. `data/` intact.

## S326–S327 — Ce que le PC connecté débloque, second sprint *(21/10, epic E30)*

`docs/stories/S326.md`, `S327.md`. Deux lots de propositions, en attente de Cédric. `curation/s326-relues-du-poste` : 19 fiches que le conteneur n'avait pas pu lire (registre sans réponse, pages en 403, issue #45), 6 propositions, dont le déménagement d'Animus à Grigny-sur-Rhône. `curation/s327-a-relancer` : 19 candidats « À relancer », 3 fiches nouvelles (Kapsyl, Kerblei, Loch'Ale) ; les 16 autres sont introuvables une deuxième fois. Le serveur Overpass principal et les recherches web : voir S324.


## S328 — Le Centre-Val de Loire hors Indre-et-Loire *(21/10, epic E30)*

`docs/stories/S328.md`. Cinq lots de fiches nouvelles, en attente de Cédric : `curation/dep-45` (8), `dep-41` (1), `dep-18` (4), `dep-36` (2), `dep-28` (4), soit 19 fiches pour 84 candidats, chaque non-proposé avec sa raison. `controler` sans écart. La persona a fait redescendre Bos (moyenne) et L'Arnon (à confirmer). Fin de l'epic E30.
