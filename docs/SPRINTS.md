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
| S3 | 500 k | 2 h | — | à venir |
| S4 | 500 k | 2 h | — | à venir |
| S5 | 375 k | 1 h 30 | — | à venir |
| S6 | 250 k | 1 h | — | à venir |

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

## S3 — Fiches et types de bière

1. **Objectif.** Une fiche qui dit ce qui est établi, d'où ça vient, et ce
   qui ne l'est pas.
2. **Périmètre.** Fiche détaillée ; source cliquable et date de
   vérification ; confiance (critères écrits dans `docs/DONNEES.md`) ;
   précision des coordonnées ; types de bière avec lien ou « non référencé » ;
   filtres catégorie et type.
3. **Critères de sortie.** Aucune valeur absente remplacée par une valeur
   fictive (test) ; « À confirmer » affiche sa raison ; un lien de bière n'est
   jamais une page d'accueil quand une page produit est connue ; porte verte.
4. **Persona juge.** Karim.
5. **Budget.** 500 k tokens, 2 h.
6. **Durée estimée.** 2 h.
7. **Exclus.** Curation de nouvelles données.
8. **Risques.** Peu de données de bière avant S5 : le filtre peut être pauvre.
9. **État final et restes.** —

## S4 — PWA et confidentialité

1. **Objectif.** Consulter les fiches sans réseau et utiliser « autour de
   moi » sans que la position sorte du navigateur.
2. **Périmètre.** `public/sw.js` écrit à la main et précaché au build
   (méthode Sentiers, décision du 15/10) ; manifeste ; repli explicite quand
   les tuiles manquent ; géolocalisation sur action ; préférences dans
   IndexedDB ; texte de confidentialité visible.
3. **Critères de sortie.** Test hors ligne qui interroge le cache
   (`caches.match`) et a été vu rouge sans l'entrée de précache ; test qui
   vérifie qu'aucune requête ne contient les coordonnées de l'utilisateur ;
   refus de géolocalisation → application utilisable ; porte verte.
4. **Personas juges.** Bernard et Léa.
5. **Budget.** 500 k tokens, 2 h.
6. **Durée estimée.** 2 h.
7. **Exclus.** Fond de carte hors ligne complet.
8. **Risques.** `context.setOffline` ne s'applique pas au service worker
   (CLAUDE.md §1).
9. **État final et restes.** —

## S5 — Curation et correction

1. **Objectif.** Deux lots de 25 brasseries vérifiés et proposés à Cédric
   sous forme de diff, plus un lien « Signaler une erreur ».
2. **Périmètre.** Agent `verificateur-de-brasserie` (lecture seule) ; skill
   `lot-de-curation` ; lien d'issue GitHub prérempli sans donnée personnelle.
3. **Critères de sortie.** Chaque proposition a source, date et statut de
   preuve ; aucune ligne de `data/` modifiée sans accord explicite ; porte
   verte.
4. **Persona juge.** Une brasserie.
5. **Budget.** 375 k tokens, 1 h 30.
6. **Durée estimée.** 1 h 30.
7. **Exclus.** Plus de deux lots.
8. **Risques.** Accès web : `curl` vers Overpass et data.gouv.fr échoue
   depuis le conteneur (audit du 15/10) ; WebFetch non testé.
9. **État final et restes.** —

## S6 — Livraison

1. **Objectif.** Vérifier chaque case du §8 du cahier des charges, ou dire
   pourquoi elle est bloquée.
2. **Périmètre.** Accessibilité, Lighthouse sur le build de production,
   revue globale, README, licence et attributions, captures, GIF, post.
3. **Critères de sortie.** Chaque case du §8 cochée avec sa preuve ou
   signalée bloquée avec sa cause.
4. **Personas juges.** Toutes.
5. **Budget.** 250 k tokens, 1 h.
6. **Durée estimée.** 1 h.
7. **Exclus.** Toute nouvelle fonctionnalité.
8. **Risques.** Lighthouse dans le conteneur : à mesurer.
9. **État final et restes.** —
