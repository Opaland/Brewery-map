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
| S5 | 180 k | — | ≈ 90 k (dont revues : 44 k) | en cours |

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
| S8 | « Autour de moi » sur action explicite ; la position reste dans le navigateur, et l'écran le dit. | Léa |
| S9 | Préférences et favoris dans IndexedDB, sur l'appareil seulement. | Marie |
| S10 | « Signaler une erreur » : issue GitHub préremplie, sans backend ni donnée personnelle. | Une brasserie |
| S11 | Outillage de curation : agent `verificateur-de-brasserie` (lecture seule), skill `lot-de-curation`, champ `verifieLe`, diff lisible. | Une brasserie |
| S12 | Curation, lot 1 : 25 « À confirmer » les plus proches — statut, téléphone, site, Untappd, horaires. | Cédric |
| S13 | Curation, lot 2 : les 25 suivants. | Marie |
| S14 | Nouvelles brasseries : comparer OSM (`craft=brewery`) et data.gouv.fr au fichier, proposer les ajouts. | Cédric |
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

## S5 — Types de bière *(en cours)*

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
