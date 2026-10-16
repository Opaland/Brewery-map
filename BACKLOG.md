# Backlog — Mousse de Poche

Ce qui n'est pas dans le sprint actif. Rien d'ici ne se développe avant la
publication, sauf décision explicite de Cédric.

## Constats sur `data/breweries.json` (relevés le 15/10, sans modification)

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
- Contact : numéros d'outre-mer non gérés (le lien `tel:+33…` serait faux ;
  revue code S4). Aucune brasserie du fichier n'y est.
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
- Recherche : les ligatures (œ, æ) ne sont pas décomposées ; aucune n'existe
  dans les données au 15/10 (revue adverse S2).
- La carte (MapLibre) pèse 282 ko gzip, chargée à part de la liste (mesuré
  au build du 15/10). Mesure Lighthouse en S6.
- Scripts de garde de Sentiers non repris (`listes`, `textes`, `chemins`) :
  à reprendre si un raté de la même famille se produit ici.

- Favoris (S9) : deux onglets ouverts s'écrasent — chacun réécrit l'objet
  entier depuis sa mémoire ; un favori ajouté dans l'un disparaît si l'autre
  écrit ensuite (revue code S9, déduit du code, non exercé).
- Favoris (S9) : le bouton n'est que dans la fiche dépliée ; l'étoile de la
  ligne n'est pas un bouton. À juger avec Inès (S18) : un second bouton par
  ligne double le nombre d'arrêts au clavier (revue Marie S9).
- Filtres : le bloc s'allonge à chaque sprint (départ, recherche, distance,
  catégories, type, favoris) et repousse la liste ; hauteur non mesurée sur
  téléphone — à mesurer en S18/S20 (revue Marie S9).
- Favoris cachés : le message liste tous les noms sans limite et ne dit pas
  quel filtre les cache ; hors du mode « seulement », un favori hors rayon
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

## Lots de curation non faits

*(rempli en S5)*
