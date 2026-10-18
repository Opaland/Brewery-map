# Backlog — Mousse de Poche

Ce qui n'est pas dans le sprint actif. Rien d'ici ne se développe avant la
publication, sauf décision explicite de Cédric.

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
- Contact : Brasserie Animus et Pleine Lune citent un numéro dans leur
  justification ; à vérifier et à proposer en `contact` lors d'un lot de
  curation (Animus : portable, et la brasserie a déménagé).
- Les cinq numéros d'exemple de S4 attendent l'accord de Cédric
  (SPRINTS.md, S4).
- Types de bière : saison, triple/dubbel, porter, NEIPA, lambic/gose restent
  sous « Autre » et ne se filtrent pas séparément (revue métier S5).
- Filtre « ouvert samedi » (ou « ouvert maintenant », Hugo S19) : `ouvertLe`
  existe (S6) mais aucune donnée ne le nourrit encore.
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
- Curation : **changer la commune ou la position** d'une fiche (Brasserie
  Animus a déménagé de Vaugneray à Grigny) n'est pas possible par
  proposition depuis S11 ; il faut une procédure à part (nouvelle position
  lue, `km` recalculé), à décider.
- Curation : 16 fiches n'ont aucune page à leur nom (liste dans
  SPRINTS.md §S12) ; la recherche web des agents n'ouvre ni Facebook, ni
  Instagram, ni Google Maps. Piste : les demander aux brasseries voisines,
  ou les passer « à retirer ? » avec l'accord de Cédric.

- Curation : le diff ne montre pas encore la fiche telle qu'elle
  s'affichera (badge de catégorie, titre « Horaires d'accueil du public »,
  bouton « Appeler ») ; Cédric doit le reconstituer (revue métier S12).
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

- Liste : la confiance (élevée, moyenne, faible) n'apparaît que dans la
  fiche dépliée ; sur la ligne, le badge et le filtre de catégorie sont les
  mêmes quelle que soit la preuve (revue métier S13). Décision de Cédric.
- Horaires : le schéma n'a pas de saisons ; les horaires d'été des
  Ursulines sont dans la remarque (lot S13).
- **e2e instable `hors-ligne.spec.ts:60`** (S17, S18) : cause trouvée en
  S18 (écoute de `offline` attachée après la lecture de l'état), corrigée
  dans l'application et le test. Si l'échec revient, la cause était autre.
- **Brasserie fermée** (revue métier S17, Bernard) : le schéma n'a pas de
  statut « fermée ». Dr D. Brewpub (Untappd : « no longer in business ») et
  Maltobar (brassage arrêté) resteraient « À confirmer », la raison en tête
  de note. Retirer la fiche, ou un statut à ajouter ? Décision de Cédric.
- Lot S17, pistes non suivies : `curation/s17-lot-4-sans-proposition.md`
  (La Dourbie, Grésiv'ale à rouvrir ; communes à confirmer pour La
  Montagnarde, Vellavia, Kiltin', Two Dudes). Horaires d'été de La Grange du
  Seigneur : saisons dans la remarque, comme les Ursulines.

- **Ouvert maintenant dans la liste** (revue Hugo S19) : l'état n'est que
  dans la fiche ; un indicateur ou un filtre dans la liste attend des
  horaires structurés (48 fiches sur 358 en ont au 18/10 ; revue S295 :
  à faire en S295 partie 4).
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
  - « Confiance : faible » donne la définition, pas quoi en faire (« vérifiez
    avant d'y aller ») : formulation à proposer à Cédric ;

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
  - **Les chiffres du README et de `docs/MARKETING.md`** (358 fiches, 24
    départements, 878 OSM, 34 960 communes) : exacts le 18/10, tenus par
    rien ; un test qui les calcule.
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
- **LD9, des entrées écrites par des agents lues sans schéma**
  (`JSON.parse(...) as T`, par exemple `outils/departement.ts:204` et
  `:238`, `outils/centres-ajouts.ts:24`) : une validation Zod à l'entrée.
- **LD10, les dépendances en retard** : React 19, TypeScript 7 et Vitest 5
  demandent chacune leur story ; les versions mineures (tsx, Playwright,
  Vite, MapLibre) peuvent suivre en une PR.

