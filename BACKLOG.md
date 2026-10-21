# Backlog — Mousse de Poche

Ce qui n'est pas dans le sprint actif. Rien d'ici ne se développe sans sa story
(`docs/stories/`, CLAUDE.md §10bis). Une ligne livrée est barrée, avec sa preuve.

## Demande de Cédric du 16/10 — « dans un prochain sprint »

Ce qu'il a écrit, découpé ; rien n'est commencé, chaque sprint attend son go.

1. **Partir de n'importe quelle commune de France.** Plus de commune par
   défaut ni de liste déroulante : un champ de recherche sur toutes les
   communes. Piste : le Code officiel géographique de l'INSEE, ou le jeu
   « communes » d'Etalab (data.gouv.fr), avec coordonnées, **embarqué dans
   l'application** (environ 35 000 communes, poids à mesurer) plutôt qu'une
   API interrogée à chaque frappe : la commune tapée ne quitte pas le
   navigateur (CLAUDE.md §0) et la recherche marche hors ligne. Question :
   que montre l'écran avant le premier choix (aucune distance ?).
2. **Le mode PWA.** Il existe depuis S6 : manifeste, installation,
   service worker, fiches consultables hors ligne (`tests/e2e/hors-ligne.spec.ts`).
   À préciser par Cédric : ce qui lui manque (bouton « Installer » visible ?
   icône ? mise à jour ?).
3. **Coordonnées depuis l'open data** (téléphone, adresse, site). Pistes :
   OpenStreetMap (étiquettes `phone`, `website`, `opening_hours`), la base
   SIRENE (adresse du siège, pas le téléphone ; l'API des entreprises était
   injoignable depuis l'environnement le 16/10). Elles passent par des lots
   de propositions comme le reste — **sauf si Cédric change la règle du
   §0** (accord ligne par ligne) pour ces champs : à lui de dire.
4. **La vraie position de chaque brasserie.** 101 fiches ont une position
   communale (S59 : pas des centres de commune, `docs/PRECISION.md`). Piste : géocoder l'adresse avec la Base Adresse
   Nationale (api-adresse.data.gouv.fr) et proposer les coordonnées en lot
   (précision `address`), adresse par adresse.
5. **Chaque mois : nouvelles brasseries, changements, fermetures, par
   région.** La veille (S15) produit déjà le lot du mois, non armée. Il
   manque : un statut « fermée » dans le schéma (question déjà posée), et
   **à l'écran une icône qui ouvre les nouveautés du mois, classées par
   région puis par commune**. Ce qui s'affiche serait ce que Cédric a
   accepté, jamais une proposition non lue.

Ordre proposé : 4 et 3 (données, en lots), 1 (recherche de commune), 5
(statut « fermée » puis écran des nouveautés), 2 selon sa réponse.

**Suite (16/10)** : 1 et 2 faits en S21 (recherche de communes, bouton
« Installer », localisation). Pour 3 (open data), Cédric : « fais ce que tu
penses être le mieux » → des lots de propositions comme le reste (§0),
regroupés par source pour qu'un lot entier puisse s'accepter d'une phrase.
Restent 3, 4 et 5.

## Revue du 21/10 (S324)

- **Un point OSM renommé perd ses favoris.** « 3 Brasseurs (Poitiers) » est
  devenu « 3 Brasseurs » à la réextraction du 21/10 (`nomsUniques` : son
  homonyme a quitté la couche). L'identité tient au nom : un favori posé
  sous l'ancien nom est un orphelin. Même cause que S231 (identifiant
  stable, décision de Cédric).

## Constats sur `data/breweries.json` (relevés le 15/10, sans modification)

> **Chiffres du 15/10, sur 166 lignes.** Le fichier en compte 358 au
> 18/10 ; l'état actuel, champ par champ, est dans `curation/A-CHERCHER.md`
> (relecture S295, persona Cédric : deux sources donnaient deux états).

Relevés par lecture du fichier fourni (166 lignes). **Aucun n'a été corrigé** :
chacun demande une décision ou une vérification de source.

| # | Constat | Mesure | À trancher en |
|---|---|---|---|
| D1 | `note` est un texte de justification, pas une note chiffrée. Le cahier des charges demande « une note et l'origine de cette note ». | 166/166 lignes | S3 — afficher `note` comme justification ; une note chiffrée reste absente tant qu'aucune origine n'existe |
| D2 | `conf` vaut `solide` / `moyenne` / `faible` ; le cahier des charges dit élevé / moyen / faible. | solide 18, moyenne 33, faible 14, vide 101 | S3 — libellé affiché « élevée » pour `solide` ? |
| D3 | Toutes les coordonnées sont `commune`. | 166/166 | S3 (affichage) ; S5 (curation) |
| D4 | 101 brasseries « À confirmer » (cat 0), dont 58 sans source. | cat 0 : 101 ; `src` vide : 58 | S5, deux lots de 25 au plus |
| D5 | Aucun type de bière renseigné. | `beers` vide : 166/166 | S5 ; le filtre par type sera vide avant (ordre de coupe n° 2) |
| D6 | `km` diffère de plus de 2 km de la distance à vol d'oiseau depuis Brignais pour deux lignes. | Brasserie Solstice 93 (calculé 96,2) ; Brasserie Kiltin' 93 (calculé 90,0) | **Tranché le 15/10** : l'application calcule ses distances (`core/distance.ts`) ; `km` reste dans le fichier, validé, jamais lu. Le retirer = modifier `data/`, à décider par Cédric. |
| D7 | Deux brasseries partagent exactement les mêmes coordonnées. | Le Brass'in et Single Track (même adresse, la note l'explique) | **Tranché le 15/10** : marqueurs groupés ; ces deux-là restent un groupe « 2 » à tout zoom (test e2e). |
| D9 | Catégorie 1 contredite par sa propre justification. | Val d'Ainan (« la FAQ dit pas de vente sur place »), L'Etincelle (« pas de licence pour servir de l'alcool au verre »), Bière bio des Monts d'Or (« fermée d'octobre à mai ») — revue métier S3 | **S12, en priorité** : vérification, proposition à Cédric |
| D10 | Justifications datées, non rafraîchies. | Brasserie du Dauphiné (« période 2024-2025 »), Ninkasi Fabriques (« Horaires 2024 ») | curation (S12 et suivants) |
| D8 | Une source est une page d'accueil générique avec une vente « déduite ». | Ninkasi Brignais (`https://www.ninkasi.fr/`, conf faible) | S5 |

## Fonctionnel

- Le point de départ (Brignais) est masqué par le groupe qui contient les
  brasseries de Brignais au zoom d'ouverture (constaté sur capture le 15/10).
  Il réapparaît en zoomant. À traiter si une revue de persona le juge gênant.
- ~~Contact : numéros d'outre-mer non gérés~~ — fait en S295 (#47) :
  `lienTelephone` donne son indicatif à l'outre-mer (`tests/unit/contact.test.ts`).
  Reste Saint-Pierre-et-Miquelon (+508), dont la numérotation nationale n'a
  pas été vérifiée ; aucune fiche n'y est.
- « Tout effacer » (S295) : si le stockage et le cache des tuiles échouent
  l'un sans l'autre, « rien n'a changé » est faux pour celui qui a réussi.
  Une nouvelle tentative suffit (les deux effacements se rejouent sans
  effet de bord) ; à dire plus juste si quelqu'un le rencontre.
- ~~Contact : Brasserie Animus et Pleine Lune~~ : relues en S326 (`curation/s326-relues-du-poste.md`) : le numéro de Pleine Lune est déjà celui de sa fiche ; le déménagement d'Animus est proposé, son portable attend la réponse de Cédric.
- Les cinq numéros d'exemple de S4 attendent l'accord de Cédric
  (SPRINTS.md, S4).
- Types de bière : saison, triple/dubbel, porter, NEIPA, lambic/gose restent
  sous « Autre » et ne se filtrent pas séparément (revue métier S5).
- ~~Filtre « ouvert samedi »~~ : fait en S70 (« Ouvertes ce week-end », `docs/stories/S70.md`).
- Carte : le repli « fond de carte incomplet ou indisponible » s'allume sur
  une seule tuile en échec et peut clignoter (revue code S7).
- Une brasserie choisie qui est dans un groupe n'a pas de retour visuel sur
  la carte (revue adverse S2).
- La carte (MapLibre) pèse 282 ko gzip, chargée à part de la liste (mesuré
  au build du 15/10). Mesure Lighthouse en S6.
- Scripts de garde de Sentiers non repris (`listes`, `textes`, `chemins`) :
  à reprendre si un raté de la même famille se produit ici.

- Favoris (S9) : le bouton n'est que dans la fiche dépliée ; l'étoile de la
  ligne n'est pas un bouton. À juger avec Inès (S18) : un second bouton par
  ligne double le nombre d'arrêts au clavier (revue Marie S9).
- Filtres : le bloc s'allonge à chaque sprint (départ, recherche, distance,
  catégories, type, favoris) et repousse la liste ; hauteur non mesurée sur
  téléphone — à mesurer en S18/S20 (revue Marie S9).
- Favoris cachés : la liste est bornée à cinq noms depuis S24 ; elle ne dit
  pas quel filtre les cache ; hors du mode « seulement », un favori hors rayon
  n'est pas signalé (revue Marie S9).

- Signalement (S10) : **décision de Cédric** — une voie hors GitHub (une
  adresse de courriel dédiée ?) pour une brasserie sans compte. Aucune
  adresse n'est inventée ; l'écran dit qu'il n'y a pas d'autre moyen pour
  l'instant (revue métier S10).
- Signalement (S10) : le texte recopié dans l'issue (nom, adresse, source)
  n'a pas de longueur maximale au schéma ; le test de longueur ne garde que
  les lignes présentes (revue code S10, risque théorique : 929 caractères au
  plus mesurés pour 2 000 retenus).

- Curation (lu le 16/10 pendant le lot s11-exemples-s4) : la page TapRoom
  de Nomade Brewery publie ses horaires (« Mardi-mercredi 12h-22h
  Jeudi-vendredi 12h-23h30 Samedi 14h30-19h ») ; à proposer en S12 comme
  bloc `accueil`, avec l'extrait. La même page porte aussi un « 04 70 50 88
  53 » sous les foodtrucks, à la même adresse : écarté.

- Curation : **décision de Cédric** — prévenir une brasserie quand son
  numéro est repris sur la carte (revue métier S11). Aucun canal n'existe
  hors des issues.
- Curation : les mobiles seuls publiés (Kachmar, Montchat, lot
  s11-exemples-s4) suivent la règle « publié pour ses clients » ; s'ils sont
  personnels, seul Cédric peut le juger (revue métier S11).

- Curation S12, **décisions de Cédric** (pistes lues, non proposées) :
  - Platypus Brewpub : horaires lus seulement sur des annuaires
    (Privateaser, Schlouk Map : lun–mer 17h–minuit, jeu–sam jusqu'à 1h),
    contredits sur le lundi par un troisième ; téléphone 09 83 50 85 00
    affiché par Schlouk Map seulement. Un annuaire peut-il servir de source ?
  - Brasserie des Roches : mobile 06 72 22 73 77 publié par l'office de
    tourisme, pas par la brasserie ; horaires de l'office (vendredi 18h–1h,
    janvier–juillet) sans nature (accueil ou vente).
  - La Dame de Malt : seule source, le catalogue d'un grossiste
    (Dauphi-Bières) ; une photo montre un panneau « vente de bière ».
  - DWYN Brewing : site en 503 et Untappd en 404 le 16/10 ; à rouvrir.
  - La Fabrique du Faubourg : brasse les Bières Georges à Vénissieux ;
    aucune page sur l'accueil ou la vente.
- ~~Curation : **changer la commune ou la position** d'une fiche~~ : fait en S322 (un déménagement par lot, accord de Cédric du 20/10).
- Curation : 16 fiches n'ont aucune page à leur nom (liste dans
  SPRINTS.md §S12) ; la recherche web des agents n'ouvre ni Facebook, ni
  Instagram, ni Google Maps. Piste : les demander aux brasseries voisines,
  ou les passer « à retirer ? » avec l'accord de Cédric.

- Curation S12 : Brasserie Animus retirée du lot (mobile 06 95 10 82 98
  publié sur sa page Contact, note à corriger) en attendant la procédure de
  déplacement ; La Canute Lyonnaise : faut-il reprendre le 06 24 11 06 71,
  ligne de commande des professionnels ?

- Curation S13, **décisions de Cédric** (pistes lues, non proposées) :
  - Fiches dont l'identité, la commune ou l'adresse semble avoir changé
    (procédure de déplacement à décider) : La Gaudine (Brasserie de la
    Semène) — point de vente rouvert à Marlhes, nom « La Gaudine » introuvable ;
    Brasserie de la Sanne — annuaires à Salaise-sur-Sanne ; Brasserie
    Longue Vie — son lien mène à une brasserie de Saint-Félicien ; Malt
    Emoi — reprise sous le nom « Brasserie l'Ain Pressure » (résumés de
    recherche seulement).
  - Numéros publiés par un annuaire ou un office, pas par la brasserie :
    Bière des Frères Clavel (06 72 92 89 06), La Margau (04 82 28 37 86),
    Brasserie Longue Vie (06 72 71 67 45), Brasserie de la Sanne
    (06 52 50 53 05).
  - Miellerie Gachet : vente sur les marchés et en point de vente
    collectif ; catégorie 2 ou non ?
  - La Cadole : « vente de différents types de bières », sans dire où.
  - Pages illisibles ou mortes le 16/10 : Mozel'âne (domaine introuvable :
    la note « site bloqué » est à revoir), Graine 2 Bulles (403), Casino de
    Montrond (403), page « Où nous trouver » de Brasserie de la Loire.

- Liste : la confiance (dite en phrase depuis S320) n'apparaît que dans la
  fiche dépliée ; sur la ligne, le badge et le filtre de catégorie sont les
  mêmes quelle que soit la preuve (revue métier S13). Décision de Cédric.
- ~~Horaires : le schéma n'a pas de saisons~~ : fait en S299 (`periodeSchema`, `src/core/schema.ts`).
- **e2e instable `hors-ligne.spec.ts:60`** (S17, S18) : cause trouvée en
  S18 (écoute de `offline` attachée après la lecture de l'état), corrigée
  dans l'application et le test. Si l'échec revient, la cause était autre.
- ~~**Brasserie fermée**~~ : le statut existe (`fermee`, `src/core/schema.ts`) ; Cédric a choisi le 20/10 le statut « fermée » pour les fermées d'après SIRENE (`docs/DECISIONS.md`, #35 et réponses du 20/10). Les sept premières sont dans la PR #159, non mergée.
- Lot S17, pistes non suivies : `curation/s17-lot-4-sans-proposition.md`
  (La Dourbie, Grésiv'ale à rouvrir ; communes à confirmer pour La
  Montagnarde, Vellavia, Kiltin', Two Dudes). Horaires d'été de La Grange du
  Seigneur : saisons dans la remarque, comme les Ursulines.

- ~~**Ouvert maintenant dans la liste** (revue Hugo S19)~~ : fait en S295
  (`etatPourLaListe`, `tests/e2e/horaires.spec.ts`). Reste un filtre
  « ouvert maintenant », utile quand plus de 48 fiches sur 358 auront des
  horaires.
- ~~**« Centre de la commune »** (revue code S19)~~ : fait en S59. Les points
  ne sont pas des centres (mesure dans `docs/PRECISION.md`) ; la fiche ne le
  promet plus. Reste la question à Cédric : d'où viennent ces points ?

- Revue globale S22 — restes :
  - ~~la liste commence encore à 1,98 écran sur téléphone~~ : fait en S29
    (première ligne à 827 px sur Pixel 7) ;
  - ~~la recherche de commune ne marche hors ligne qu'après une première
    recherche en ligne~~ : fait en S42 (communes précachées,
    `tests/e2e/hors-ligne.spec.ts`) ;
  - rien n'est essayé sur un vrai téléphone.

- Revue UI/UX du 16/10 — restes :
  - ~~« Confiance : faible » donne la définition, pas quoi en faire~~ : fait en S27 (#39), puis S320 (une phrase par niveau) ;

- ~~S27 — restes de la revue adverse~~ : faits en S31.

- S28 — proposé par la revue UI/UX, pas fait :
  - ~~sur téléphone, la liste avant la carte, filtres repliés~~ : fait en S29 ;
  - mousse animée (SVG) dans l'en-tête, arrêtée si l'on demande moins de
    mouvement ;
  - « Partager ma tournée » : une image composée sur un canvas, dans le
    téléphone ;
  - fiche en feuille basculante (« bottom sheet ») sur téléphone.

## Lots de curation non faits

*(rempli en S5)*

- **S249, à relancer** : 12 candidats bretons cherchés une fois au plus,
  le quota de recherches web de la session étant épuisé (listés « À
  relancer » dans `curation/dep-35.md` et `curation/dep-56.md`).
- **Après S261-S262** : relire les lots normands (S247-S248) pour leurs
  contacts et horaires ; le lien Untappd de Louarn, à rattacher par une
  page qui le cite ; `horairesSurLaPage` ne lit pas l'anglais (« 3pm »,
  sOavenn).

- S36 — restes de la revue adverse :
  - deux onglets qui écrivent la même note : le dernier gagne, et le
    curseur de l'autre saute en fin de texte (S104) ;
  - notes et visites d'une brasserie disparue des données : gardées,
    invisibles, effacées seulement par « tout effacer » (S103) ;
  - une écriture IndexedDB à chaque frappe d'une note : non mesurée sur un
    téléphone lent (S111).
- S37 : à l'ouverture d'une sauvegarde, une note ou une visite présente
  des deux côtés avec un contenu différent garde celle de l'appareil, sans
  le dire (revue adverse S37).
- S42 : avec l'ancien service worker encore actif (mise à jour pas encore
  activée), le pied de page annonce déjà les communes hors ligne. Vérifier
  la présence du fichier dans le cache avant de le dire (revue S42/S44).

- **Anglais (revue adverse S50)** : le manifeste (`name`, `description`,
  raccourcis, `lang: fr`), le bloc `<noscript>` et les `<meta>` d'`index.html`
  restent en français : fichiers statiques, servis avant toute langue. Une
  PWA installée sur un téléphone anglais montre ses raccourcis en français.
  Story S188.

- **iPhone : la première brasserie sous la barre (S234, mesuré en CI sur
  WebKit, profil iPhone 13)** : 664 px utiles, la première ligne commence à
  772 px pour une barre à 619 px. Le test du premier écran est calibré sur le
  Pixel 7 ; il faut le même pour l'iPhone, et un premier écran plus court
  (story à préparer, epic E1).

- **`tsx` et deux avis « modérés » sur `esbuild` (S283, mesuré le 18/10)** :
  `npm audit` relève `esbuild` ≤ 0.24.2 sous `tsx` 4.19.2 (GHSA-67mh-4wv8-2f99,
  le serveur de développement d'esbuild, que `tsx` ne lance pas). Outil de
  développement seulement ; la porte ne bloque qu'au niveau « haute ». Mettre
  `tsx` à jour dans sa propre story, outils relancés.

- **Promesses non tenues, relevées par `relecteur-de-promesses` (S284, 18/10)**
  — chacune demande sa story :
  - **« Fiches vérifiées »** (`src/App.tsx:643`, `:652`, `:833`,
    `src/core/nouveautes.ts`, `en.ts` « checked ») désigne toutes les fiches
    de `data/`, dont 189 « À confirmer », 146 sans date de vérification et
    57 sans source (mesuré sur `data/breweries.json`). Le mot oppose à tort
    `data/` à la couche OSM « non vérifiée ». Proposer un mot juste
    (« fiches relues », « sélection ») à Cédric, puis toutes les surfaces
    (§3).
  - **Un lien partagé (ou le QR d'une affichette) annonce « Fiche ouverte
    depuis un lien partagé » sans montrer la fiche** quand les filtres
    gardés l'écartent (seulement les favoris, pas encore visitées, une
    catégorie ou un type décochés, couche OSM décochée) : `passeLesFiltres`
    (`src/core/recherche.ts`). Mesuré par sonde : `rechercher(…, texte:
    'Caribrew')` rend `[]` avec `seulement` ou `exclure`. Le lien devrait
    ouvrir la fiche quels que soient les filtres, ou le dire.
  - **« Sauvegarde lue : rien de nouveau, tout était déjà sur cet
    appareil »** (`src/Sauvegarde.tsx:57`) quand une note ou une date de
    visite différente du fichier a été écartée au profit de celle de
    l'appareil (`reunir`) : le dire (« 1 note différente gardée telle que
    sur cet appareil »).
  - **À préciser** : « vos coordonnées ne sont envoyées à personne » vaut
    pour ce site, pas pour le service de localisation du navigateur (« ce
    site ne les envoie à personne ») ; « seul ce choix est gardé, jamais la
    position » laisse croire que l'appareil ne garde rien de la zone, alors
    que le cache des tuiles (`public/sw.js`, 600 tuiles) garde la carte vue
    autour, et « Effacer » n'y touche pas.

- **Règles jumelles relevées par `chasseur-de-jumeaux` (S285, 18/10)** :
  - **`trier` relit le texte de `controler`** (`outils/curation.ts`, motif
    `/ABSENT|injoignable|: [45]\d\d$/`) alors que `controler` compte comme
    écart **tout** statut non 2xx : une source qui répond 999 (LinkedIn) ou
    302 serait un écart pour `controler`, mais « acceptée par la règle »
    pour `trier`, donc candidate à `data/`. Latent (aucune source LinkedIn
    dans `curation/` le 18/10). Remède : que `controler` rende la liste des
    numéros en écart, et que `trier` l'appelle au lieu de relire du texte.
  - ~~**Les chiffres du README et de `docs/MARKETING.md`**~~ : tenus par `tests/unit/chiffres-ecrits.test.ts` depuis S305.
  - **Les couleurs de `docs/DESIGN.md`** contre `src/index.css`, le
    manifeste et `index.html` : identiques le 18/10, tenues par rien.
  - **« plus de 1 Mo »** écrit en dur (`src/core/sauvegarde.ts`, `en.ts`)
    contre `TAILLE_MAX` : d'accord, tenu par rien.

- **Workflows, relevés par l'angle « relecteur de workflows » (S288, 18/10)** :
  - **Réglage de Cédric** : la garde de `data/` et CODEOWNERS ne protègent
    `main` que si la protection de branche exige la revue des propriétaires
    de code (une PR exécute sa propre version de `ci.yml` et pourrait
    retirer la garde) ; et « Require approval for outside collaborators »
    dans les réglages Actions. Non vérifiable depuis la session (403).
  - Les actions officielles sont fixées par tag (`@v4`), pas par SHA ;
    `deploy-pages` tourne avec `id-token: write`. Fixer par SHA et laisser
    Dependabot (`github-actions`) les tenir à jour.
  - `push` sur toutes les branches plus `pull_request` : une PR d'une
    branche du dépôt passe deux fois la porte (un coût, pas un risque).
  - `mutation.yml` installe Stryker par `npm install --no-save` : ses
    dépendances ne sont pas verrouillées (job en lecture seule, sans secret).
  - Un commit poussé par `visuel-references` (jeton du dépôt) ne relance pas
    la CI : un commit suivant la relance (déjà la pratique).
- **Contribution, relevé par l'angle « contributrice externe » (S288)** : le
  README parle de « Cédric » sans le présenter, renvoie à `docs/SPRINTS.md`
  (interne), et la licence des données est « à préciser » — à trancher par
  Cédric (une contribution aux fiches ne sait pas sous quelle licence elle
  serait reversée).

## Relecture d'ensemble S295 — restes

Le détail et les preuves sont dans `docs/REVUE-ENSEMBLE.md`.

- **BE2, le précache tout ou rien** (Bernard) : 5 Mo, dont 1,7 Mo de
  communes, à installer en une fois sur une 4G faible. Le « tout ou rien »
  vient de la revue S7 : un cache partiel effaçait l'ancien. Il faut une
  story pour sortir les communes de l'installation sans perdre la garantie.
- **AR5, deux PR de données en parallèle sont toujours en conflit** : les
  ajouts vont en fin de tableau, et l'empreinte des nouveautés change.
  Remède : une commande `curation.ts reconstruire`, qui écrit `data/` depuis
  la base et les accords avec le code de la garde. D'ici là, une PR de
  données à la fois.
- **LD7, presque aucun test de composant** pour App (861 lignes), Carte et
  Liste : chaque changement d'interface paie le build et les e2e.
  Commencer par Liste (fiche, favori, signalement), avec Testing Library.
- ~~LD9~~ — fait en S318 pour `outils/departement.ts lectures` (schéma, nom de fichier sûr) ; `assembler` relit ses propres fichiers. Constat d'origine : **des entrées écrites par des agents lues sans schéma**
  (`JSON.parse(...) as T`, par exemple `outils/departement.ts:204` et
  `:238`, `outils/centres-ajouts.ts:24`) : une validation Zod à l'entrée.
- **LD10, les dépendances en retard** : React 19, TypeScript 7 et Vitest 5
  demandent chacune leur story ; les versions mineures (tsx, Playwright,
  Vite, MapLibre) peuvent suivre en une PR.


- **S298 (revue adverse)** : `controler` n’ouvre pas les sources d’un retrait. Sans gravité tant que la règle ne l’accepte jamais, mais un retrait mériterait le même contrôle de page qu’une proposition.

## Reprise sous Windows S302 — restes

- **W5** (mineur) : `outils/geocodeur.ts:14` appelle `sleep`, `outils/requetes.ts:29` `curl`, `outils/captures.ts:110` `ffmpeg` ; `package.json` n'a pas de champ `engines`. Remède : `node:timers/promises`, `fetch` compté, `"engines": {"node": ">=22"}`.
- **Un réglage changé juste avant de fermer l'onglet peut se perdre** : `garderSaufVersionFuture` (`src/stockage.ts`) lit puis écrit dans une transaction que la fermeture interrompt. Vu par deux e2e qui rechargeaient trop tôt sous Windows (S302). Rien n'est perdu au-delà de quelques millisecondes ; à mesurer avant d'y toucher.
- ~~**C2 reste ouvert**~~ : fait en S306 (`estUnCommit`, filtre `if` retiré).
- **Restes de la revue adverse S306** : un alias git (`git ci`) n'est pas résolu ; une ligne `git commit` dans un heredoc ou un corps de PR lance la porte pour rien (côté sûr) ; la garde de `data/` dans un clone superficiel sans le commit `31cbd21` lèverait une pile au lieu d'un message lisible (inféré, non mesuré) ; le crochet de commit coûte ~225 ms par commande Bash (mesuré).
- **`gh` introuvable pour Node** quand Claude Code est lancé d'un terminal ouvert avant l'installation de `gh` : le crochet de démarrage dit alors « gh absent ». Ouvrir un nouveau terminal (noté dans `docs/REPRISE-POWERSHELL.md`).

## S305 — restes

- **Le tableau des jetons de `docs/DESIGN.md` est incomplet** (T4) : le comparer aux jetons de `src/index.css` par un test, comme `chiffres-ecrits.test.ts` le fait pour les chiffres.
- **Chiffres datés sans test** : `docs/DONNEES.md` (tableau « au 18/10 » : 227 `centre`, 13 `commune` ; 214 et 12 le 20/10), « 1 226 » de `sauvegarde.ts` et « 113 sur 348 » de `fiche.ts` (exacts le 20/10, revue adverse S305).
- **« 151 complétées les 18 et 19 octobre »** (« Quoi de neuf ») n'est tenu par aucun test : il se compte dans les accords (`curation/accords/`), pas dans `data/`.

## Revue adverse S304 — restes

- ~~**Budget du premier écran à 25 octets près**~~ : S294 l'a ramené à 189 402 octets pour un budget de 208 000 (`docs/PREMIER-ECRAN.md`, `tests/e2e/poids.spec.ts`).
- **S319 : le clavier virtuel après « Voir les brasseries autour du départ »** : barre décollée, le focus va au champ de recherche ; sur un vrai téléphone, cela ouvre peut-être le clavier sans qu'on ait demandé à saisir. Playwright ne le simule pas : à essayer avec `docs/LIVRAISON.md`. Repli possible : un titre visible, `tabIndex={-1}`.
- **Barre décollée, l'annonce d'un geste n'est plus à l'écran** pour la personne voyante. Piste : un retour près du bouton.
- **De 900 à ~1 150 px, la première brasserie reste sous la barre** (787 px à 1 024 et 1 100 px, mesuré le 20/10) : deux colonnes de filtres.
- **Les fragments de « Plus de filtres » sur trois colonnes** ne sont mesurés ni en anglais ni avec « Plus de filtres » replié.
- **W9 ailleurs** : `outils/curation.ts:243` et `outils/captures.ts` appellent `rmSync` ; sous Node 24 et Windows, dans un chemin accentué, il ne supprime rien. Le dossier temporaire de `curation.ts` est sous `tmpdir()` (nom court, ASCII, sur ce poste) : à vérifier, puis passer à `fs.promises.rm`.

## S294 — restes

- ~~La couche OSM attendue avant le premier rendu ; la suite demandée seulement après~~ — mesuré en S310 (`docs/PREMIER-ECRAN.md`) : ne plus attendre la couche gagne moins que le bruit (84 ms pour un écart de 120) ; annoncer la suite dans le HTML perd 88 ms. Rien changé ; à refaire quand le premier écran grossit.
- **Une visite notée juste avant de recharger ou de fermer l'onglet peut se perdre** : vu par `carnet.spec.ts` (5 échecs sur 15 sous Windows, le 20/10), qui attend maintenant l'écriture. Rejoint le reste « réglage perdu » de S302.

## Revue adverse S307 — restes

- **Marqueurs sur autoroute et voie rapide : 2,2 à 3,2:1** (fonds `#e892a2` et `#f9b29c` d'openstreetmap-carto), sous les 3:1 de WCAG 1.4.11 ; le bord blanc et l'ombre du marqueur aident sans suffire à la mesure. Y tenir 3:1 demande une palette des catégories plus sombre, sur toute l'application : décision de design, à prendre à part. `tests/unit/couleurs-carte.test.ts` borne l'écart à 2,2.
- **Focus d'un marqueur choisi** : `#7a3410` contre `#241c14`, 1,86:1 ; c'est le second anneau (ombre de 7 px) qui les distingue, pas la couleur.

## Revue adverse S303 — restes

- ~~« Pas encore visitées » accuse le carnet à tort~~ — fait en S315 (`videAussiSans`). Constat d'origine : (`texteDuCompte`, `src/App.tsx`) : avec « Ouvertes ce week-end » aussi coché, ou un carnet vide, une liste vide dit « Toutes celles qui correspondent sont dans votre carnet ». Même classe que A11 : ne le dire que si la liste serait non vide sans `exclure`.
- ~~« La plus proche » et le carnet~~ — fait en S315 (« La plus proche pas encore visitée »). Constat d'origine : : « pas encore visitées » coché et tout le rayon visité, le compte dit « tout est dans votre carnet » et, dessous, « La plus proche : X, à 280 km » (une non visitée). Vrai, mais se lit comme une contradiction ; à formuler (« la plus proche pas encore visitée »).
- **« Aucune brasserie dans le département … avec ces filtres » n'a plus d'e2e** : le test S31 (`idees.spec.ts`) y arrivait en décochant toutes les catégories, cas qui a désormais son propre message (S303). Le retrouver par un autre filtre qui vide un département, et vérifier qu'il n'accuse pas les filtres quand c'est le texte qui vide la liste.
- ~~Une annonce identique ne se ré-annonce pas~~ — fait en S317 (nouveau nœud à chaque annonce). Constat d'origine : (région live de `annonce`) : un second échec de l'affichette, ou deux fois le même geste, ne dit rien au lecteur d'écran. Vaut pour toutes les annonces.

## S322 — restes

- **Un signalement ouvert avant un déménagement ne se rattache plus** : `ficheDuSignalement` exige le nom et la commune du titre, posés à l'époque. Garder l'ancienne commune quelque part, ou chercher par le nom seul quand il est unique.

## S308 — restes (revues du 20/10 : adverse, persona Marie)

- ~~Trois dates sur une fiche riche~~ — fait en S312 (une phrase par site, chaque lecture avec sa date et sa page). Constat d'origine : : « Lu le 16 octobre » (contact), « Lus le 18 octobre » (horaires), « Vérifiée le 17 octobre » (fiche) ; 14 fiches complètes sur 32 ont trois dates différentes. Marie ne sait pas laquelle compte. Piste : une seule date, la plus ancienne, dans la provenance.
- ~~« Maintenant » dit deux fois~~ — fait en S312 (`natureEnTete` : « En bref » le dit avec l'heure ; le tableau, seulement pour l'autre nature).
- **Signaler sans compte GitHub** : la fiche demande à la brasserie d'envoyer son site par « Signaler une erreur », qui exige GitHub (rejoint la décision de Cédric sur une voie hors GitHub, S10).
- **L'affichette de comptoir** ferme chaque fiche avec un texte adressé à la brasserie, pas à la personne.
- ~~Bières « autre »~~ — fait en S316 (lexique des styles, glose une fois par type). Constat d'origine : (« L'A Cha Peu (ginger Ale) », « L'Ébariole (tourbée) ») sans explication ; huit gloses pour huit bières, lourd sur un petit écran.
- **L'aperçu des lots** (`src/apercu.ts`) rend la tête de fiche et la provenance (S312), pas « Y aller » : le renvoi « Ce que dit la source, plus haut » n'y a pas de cible.
- ~~**Les captures du README**~~ : refaites en S313.
