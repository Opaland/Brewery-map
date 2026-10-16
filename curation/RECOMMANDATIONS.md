# Recommandations sur les six lots de curation en attente

Préparé le 16/10/2026 pour que Cédric décide en une phrase par lot. **Ce sont des recommandations, pas des décisions** : aucune ligne de `data/` n'a été touchée, aucun fichier du dépôt modifié (CLAUDE.md §0).

**Comment c'est fondé.** Pour chaque proposition, on a regardé : la source citée et son extrait, la date, la cohérence avec le schéma (`src/core/schema.ts`), et le risque d'envoyer Hugo, à vélo, faire 20 km pour rien. Les lentilles des personas : Cédric (ne jamais confondre production et accueil), Karim (types de bière justes), Hugo (« ouvert maintenant » fiable), Bernard (la fiche doit suffire sans réseau, donc le téléphone compte).

**Ce que l'agent a relu lui-même le 16/10/2026** (WebFetch, version résumée de la page, pas la page brute) :
- `malting-pot.com/adresses` : Lyon 7, « 263 Gdr de la Guillotière », « 09 70 95 27 78 », « LUNDI AU SAMEDI », « MIDI 12H À 14H / SOIR 17H À MINUIT ». C'est conforme au lot. La page ne dit pas où la bière est brassée.
- `twodudes-brasserie.com` : « 811 Route des Vignobles 71680 Crêches-sur-Saône », « Brasserie / Pierre 06 88 81 61 39 ». Aucune mention de Tournus ni d'un déménagement.
- `brasserie-libertane.fr/la-brasserie/horaires-douverture/` : la page a répondu **HTTP 503**. Elle n'a pas pu être relue.

**Un point de code qui pèse sur deux recommandations.** `ouvertMaintenant` (`src/core/horaires.ts`) lit les créneaux sans tenir compte des saisons. Quand un bloc porte une remarque, la fiche affiche « ouvert … selon les créneaux, sous réserve de la remarque ». Si on y entre des créneaux valables seulement en été, la fiche dira donc en octobre, un mardi à 16 h, « ouvert sous réserve ».

---
## s11-exemples-s4 : 5 propositions (empreinte ba8d79738e17)

Les cinq ajoutent seulement un contact (téléphone, site, et Untappd pour Nomade) à des fiches déjà en catégorie 1 ou 2. Le risque d'induire en erreur est faible : un numéro aide justement à vérifier avant de partir.

| N° | Fiche | Champ | Proposition | Reco | Raison |
|---:|---|---|---|---|---|
| 1 | Nomade Brewery | contact | tél. 04 72 50 88 53, site, Untappd | ACCEPTER | Le numéro est dans l'en-tête et dans le lien `tel:` de la page TapRoom. Le « 04 70… » écarté est bien une variante isolée. |
| 2 | GreDam | contact | tél. 04 78 33 84 95, site | ACCEPTER | C'est le fixe que la page met en avant (« Information au »). Les deux mobiles ne sont attribués à personne. |
| 3 | Brasserie Kachmar | contact | tél. 06 49 84 78 91, site | ACCEPTER | Seul numéro, dans le bloc Contact, à l'adresse de la fiche. |
| 4 | Microbrasserie de Montchat | contact | tél. 06 64 34 13 57, site | ACCEPTER | Seul numéro, à côté de l'adresse du brewpub. |
| 5 | Brasserie Stéphanoise | contact | tél. 09 81 94 27 79, site | ACCEPTER | Le 09 est cité en premier sur la page de la brasserie. Le mobile reste une option, pas une erreur. |

**Phrase pour Cédric :** « J'accepte s11-exemples-s4 en entier (ba8d79738e17). »

## s12-lot-1 : 3 propositions (empreinte 2587f92b8457)

| N° | Fiche | Champ | Proposition | Reco | Raison |
|---:|---|---|---|---|---|
| 1 | La Canute Lyonnaise | contact | site seul, source page Revendeurs | ACCEPTER | Le site est sûr. Écarter le 06 « pro » est juste : un bouton « Appeler » vers une ligne de commande en cartons tromperait un parent. Réponse proposée à la question posée : non, ne pas le reprendre. |
| 2 | Malting Pot | cat, conf, note, src, contact, horaires | cat 1 « moyenne », tél. 09 70 95 27 78, accueil lun–sam 12–14 h et 17 h–minuit | ACCEPTER | Relu le 16/10 : l'adresse de Lyon 7, le téléphone et les horaires correspondent. Brewpub avec cuisine et horaires midi et soir, donc catégorie 1. La confiance « moyenne » est honnête, car le lieu de brassage n'est pas précisé. Le dimanche reste « non précisé », pas « fermé » : c'est prudent. |
| 3 | Brasserie Georges | contact | tél. 04 72 56 54 54, site | ACCEPTER | Numéro du restaurant, publié par lui. Les horaires sont justement non proposés, puisque la fiche reste « À confirmer ». |

**Phrase pour Cédric :** « J'accepte s12-lot-1 en entier (2587f92b8457), sans le 06 pro de la Canute. »

## s13-lot-2 : 3 propositions (empreinte eefa6ea1e0d6)

| N° | Fiche | Champ | Proposition | Reco | Raison |
|---:|---|---|---|---|---|
| 1 | L'Affoleuse | cat, conf, note, contact, horaires | cat 1 « moyenne », accueil le vendredi 15 h–19 h 30, tél. fixe | ACCEPTER | « vente à la ferme / bar guinguette le vendredi de 15h à 19h30 » vient de la brasserie elle-même : c'est bien vente et consommation. La remarque dit que le week-end est inconnu, sans le déclarer fermé. |
| 2 | Brasserie des Ursulines | cat, conf, note, src, contact, horaires | cat 1 « moyenne », source = site de la brasserie, horaires hors été | ACCEPTER | La source est la brasserie, et la page est découpée en saisons. Les créneaux d'hiver sont tous **inclus** dans ceux d'été : l'été, la fiche ne dira jamais « ouvert » à tort. Elle sera seulement trop prudente. À relire mi-juin. On pourrait viser « solide », mais « moyenne » n'est pas faux. |
| 3 | La Mousse du Guiers | cat, conf, note, src, contact | cat 1 « faible », source = fiche de l'office (2024), tél. de la brasserie | ACCEPTER | « Sales on site » et « Individual tasting » correspondent à la définition de la catégorie 1. « faible » dit honnêtement que la source est indirecte. La note demande de téléphoner, et le numéro proposé est justement celui que la brasserie donne pour cela. |

**Phrase pour Cédric :** « J'accepte s13-lot-2 en entier (eefa6ea1e0d6). »

## s14-decouverte : 119 ajouts (empreinte 9e17904c31bc)

**Question posée :** faut-il encore faire entrer ces fiches dans `data/`, alors que S25 ajoute une couche OpenStreetMap à part ?

**Recommandation : non, pas en bloc.**
- **La couche couvre déjà presque tout.** On a comparé l'objet OSM (`node/…`, `way/…`) de chaque ajout avec `src/donnees-osm/brasseries-osm.json`. **106 des 119** y sont déjà, affichées « À confirmer ».
- **Les 13 autres sont écartées par S25 pour une raison.** Douze sont des « noms proches » d'une fiche existante, que S25 traite comme la même brasserie. La treizième (n° 100) est un restaurant de station.
- **Une entrée dans `data/` n'apporterait rien de vérifié.** Ce serait une catégorie 0 avec OSM pour seule source, comme dans la couche. Cela gonflerait le fichier de Cédric (166 → 285 lignes) de lignes qu'il n'a pas vérifiées, et brouillerait la frontière que S25 vient de tracer.
- **La bonne porte d'entrée est un lot de curation.** Une brasserie de la couche devrait entrer dans `data/` quand un lot y trouve quelque chose de sourcé : une catégorie, un contact ou des horaires.
- **Les candidates prioritaires sont les plus proches de Brignais** : n° 2 Karnotzet, 5 Bière du Berger, 7 Bee King, 9 Vienne Brewing, 10 Virage 7, 11 La Tit'Mousse.

**Réserve.** La couche S25 n'est **pas encore commitée** : `src/donnees-osm/` et `src/core/osm-france.ts` sont non suivis dans l'arbre de travail au moment de cette lecture. Cette recommandation suppose que S25 soit mergé. Sinon, ce raisonnement ne tient pas, et les ajouts « REFUSER, déjà dans S25 » redeviennent des candidats.

**Remarque en passant, pour S25 et pas pour `data/`.** Les objets que OSM étiquette aussi `amenity=restaurant/bar/pub` (n° 4, 21, 32, 42, 43, 48, 67, 73, 82, 83, 85, 88, 89, 90, 95, 101, 107, 115–117), et des noms comme « Grand Café de la Mairie » ou « Café Rétro, McDrive », sont dans la couche. Ce sont probablement des bars qui servent de la bière, pas des brasseries. Hugo pourrait y aller pour rien. À regarder dans S25.

| N° | Fiche | Champ | Proposition | Reco | Raison |
|---:|---|---|---|---|---|
| 1 | Microbrasserie Caribrew (Brignais) | fiche entière | ajout en cat. 0, source node/6067436077 | À REVOIR | Pas un ajout : doublon probable, mais commune à vérifier sur la fiche existante — Caribrew : OSM à Brignais, la fiche à Soucieu-en-Jarrest (6,6 km). |
| 2 | Karnotzet (Taluyers) | fiche entière | ajout en cat. 0, source node/9502816456 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 3 | Microbrasserie La Chénou (Orliénas) | fiche entière | ajout en cat. 0, source node/6821847386 | À REVOIR | Pas un ajout : doublon probable, mais commune à vérifier sur la fiche existante — La Chénou : OSM à Orliénas, la fiche à Saint-Laurent-d'Agny (3,5 km). |
| 4 | Funky Monky (Lyon) | fiche entière | ajout en cat. 0, source node/6954907667 | REFUSER | OSM la dit aussi amenity=restaurant : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 5 | La Bière du Berger (Saint-André-la-Côte) | fiche entière | ajout en cat. 0, source node/10690528103 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 6 | Ferme de la Quintillière - Bière Busard (Chabanière) | fiche entière | ajout en cat. 0, source way/138335054 | REFUSER | Doublon probable de « Ferme de la Quintillière (Chabanière, 3,0 km) » ; S25 l'écarte aussi. |
| 7 | Bee King (Saint-Priest) | fiche entière | ajout en cat. 0, source node/12112532052 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 8 | Grand Café de la Mairie (Vaulx-en-Velin) | fiche entière | ajout en cat. 0, source node/259977338 | REFUSER | Nom de café : rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 9 | Vienne Brewing Company (Vienne) | fiche entière | ajout en cat. 0, source node/2725880047 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 10 | Virage 7 (L'Arbresle) | fiche entière | ajout en cat. 0, source node/11729944892 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 11 | La Tit'Mousse (Pélussin) | fiche entière | ajout en cat. 0, source way/312322647 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 12 | Brasserie des Dauphins (Cour-et-Buis) | fiche entière | ajout en cat. 0, source node/11270901233 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 13 | Ninkasi (Tarare) | fiche entière | ajout en cat. 0, source node/5984999103 | REFUSER | Doublon probable de « Ninkasi Fabriques (Tarare, 0,5 km) » ; S25 l'écarte aussi. |
| 14 | Phylum Fungi (Saint-Étienne) | fiche entière | ajout en cat. 0, source node/9723624824 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 15 | Brasserie "Le Berliet" (Meximieux) | fiche entière | ajout en cat. 0, source node/11847786363 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 16 | Brasserie de la Semène (Saint-Genest-Malifaux) | fiche entière | ajout en cat. 0, source node/8928658771 | REFUSER | Doublon probable de « La Gaudine (Brasserie de la Semène) (même commune, 2,0 km) » ; S25 l'écarte aussi. |
| 17 | Brasserie les Bulles Foréziennes (Cleppé) | fiche entière | ajout en cat. 0, source node/9012551612 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 18 | BIM (Montbrison) | fiche entière | ajout en cat. 0, source node/7816207070 | REFUSER | Doublon probable de « BIM Brasserie Indépendante Montbrisonnaise (même commune, 0,4 km) » ; S25 l'écarte aussi. |
| 19 | La Brasserie des Plantes (Saint-Didier-en-Velay) | fiche entière | ajout en cat. 0, source node/3034324702 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 20 | Brasserie Thetys (Saint-Clair-de-la-Tour) | fiche entière | ajout en cat. 0, source node/9154020202 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 21 | Brasserie du Loup Blanc (Saint-Barthélemy-de-Vals) | fiche entière | ajout en cat. 0, source node/7784568139 | REFUSER | OSM la dit aussi amenity=bar : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 22 | La Bi'nche (Saint-Étienne-de-Saint-Geoirs) | fiche entière | ajout en cat. 0, source node/5109474454 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 23 | Free Mousse (Saint-Victor) | fiche entière | ajout en cat. 0, source node/5939247507 | À REVOIR | Pas un ajout : doublon probable, mais commune à vérifier sur la fiche existante — Free Mousse : OSM à Saint-Victor, la fiche à Saint-Jean-de-Muzols (9,5 km). |
| 24 | La limaille (Le Coteau) | fiche entière | ajout en cat. 0, source node/11359140324 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 25 | Auberge de Longue Vie (Saint-Victor) | fiche entière | ajout en cat. 0, source node/5939247511 | REFUSER | Doublon probable de « Brasserie Longue Vie (Saint-Victor, 5,5 km) » ; S25 l'écarte aussi. |
| 26 | Microbrasserie Ancan (Crottet) | fiche entière | ajout en cat. 0, source node/14087207290 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 27 | Sarl Hugo Bar (Roanne) | fiche entière | ajout en cat. 0, source node/6369991923 | REFUSER | Nom de bar (« hugo bar ») : rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 28 | La Gevrinoise - Brasserie artisanale (Andert-et-Condon) | fiche entière | ajout en cat. 0, source node/12294229332 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 29 | La Dauphine (Saint-Geoire-en-Valdaine) | fiche entière | ajout en cat. 0, source way/218919148 | REFUSER | Doublon probable de « Brasserie du Val d'Ainan (La Dauphine) (même commune, 1,3 km) » ; S25 l'écarte aussi. |
| 30 | La Maiz' (Saint-Nicolas-de-Macherin) | fiche entière | ajout en cat. 0, source node/8377692238 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 31 | O' Saint-Paul (Saint-Paul-lès-Romans) | fiche entière | ajout en cat. 0, source node/6528350586 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 32 | L'écume du Guier (Domessin) | fiche entière | ajout en cat. 0, source node/6659874286 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 33 | Micro Brasserie la Virgule (Champagne-en-Valromey) | fiche entière | ajout en cat. 0, source node/12294231064 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 34 | Tarz (Saint-André-en-Royans) | fiche entière | ajout en cat. 0, source node/13076354249 | REFUSER | « Tarz » et « La Tarz » : même rue, deux objets OSM pour un lieu ; rien de vérifié. Déjà dans la couche S25. |
| 35 | La Tarz (Saint-André-en-Royans) | fiche entière | ajout en cat. 0, source node/3731778122 | REFUSER | « Tarz » et « La Tarz » : même rue, deux objets OSM pour un lieu ; rien de vérifié. Déjà dans la couche S25. |
| 36 | Mazesté (Mazet-Saint-Voy) | fiche entière | ajout en cat. 0, source node/14133015102 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 37 | L’Antre 2 Bières (Entre-deux-Guiers) | fiche entière | ajout en cat. 0, source node/12212783479 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 38 | Brasserie L'étincelle (Nantua) | fiche entière | ajout en cat. 0, source way/138474252 | À REVOIR | Pas un ajout : doublon probable, mais commune à vérifier sur la fiche existante — L'Étincelle : OSM à Nantua, la fiche à Belleydoux (9,1 km). |
| 39 | 3:6:9 Bière Craft (Soyons) | fiche entière | ajout en cat. 0, source way/68332734 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 40 | Brasserie Distillerie du Mont Blanc (La Motte-Servolex) | fiche entière | ajout en cat. 0, source way/181203951 | REFUSER | Doublon probable de « Brasserie du Mont Blanc (même avenue René Cassin, 1,9 km) » ; S25 l'écarte aussi. |
| 41 | Le Mel'in (Chambéry) | fiche entière | ajout en cat. 0, source node/3299319777 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 42 | Saubadia (Voglans) | fiche entière | ajout en cat. 0, source node/14032095781 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 43 | Brasserie Les Rois Malts (Drumettaz-Clarafond) | fiche entière | ajout en cat. 0, source node/6655491144 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 44 | Micro-brasserie Noisigotte (Saint-Pierre-d'Entremont) | fiche entière | ajout en cat. 0, source way/165706832 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 45 | La bonne fabrique (brasserie et atelier bois) (Le Sappey-en-Chartreuse) | fiche entière | ajout en cat. 0, source node/11163082026 | REFUSER | Doublon probable de « La Bonne Fabrique (même commune, 1,9 km) » ; S25 l'écarte aussi. |
| 46 | Brewhouse (Grenoble) | fiche entière | ajout en cat. 0, source node/9205148848 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 47 | Brasserie du Slalom (La Chapelle-en-Vercors) | fiche entière | ajout en cat. 0, source way/522015980 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 48 | Mandrin (Saint-Martin-d'Hères) | fiche entière | ajout en cat. 0, source way/61400110 | REFUSER | OSM la dit aussi amenity=pub : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 49 | Brasserie de la Dent de Crolles (Saint-Hilaire) | fiche entière | ajout en cat. 0, source way/787169310 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 50 | Les Brasseurs Savoyards (Alby-sur-Chéran) | fiche entière | ajout en cat. 0, source way/62717373 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 51 | La Baujue (Lescheraines) | fiche entière | ajout en cat. 0, source node/7562350358 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 52 | Petite Bière Dezaillons (Aillon-le-Jeune) | fiche entière | ajout en cat. 0, source way/1024946038 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 53 | Bombardos (Annecy) | fiche entière | ajout en cat. 0, source node/12384165644 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 54 | Les funambules (Rotherens) | fiche entière | ajout en cat. 0, source node/9157511087 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 55 | La petite fabrique (Annecy) | fiche entière | ajout en cat. 0, source node/6166335749 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 56 | Brasserie Après l'Orage (Die) | fiche entière | ajout en cat. 0, source way/72740368 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 57 | Brasserie du Mont Salève (Neydens) | fiche entière | ajout en cat. 0, source way/78492082 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 58 | La Brasserie du Mont Aiguille (Clelles) | fiche entière | ajout en cat. 0, source node/6928795915 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 59 | Brasserie L'Ale Ouët (Chirols) | fiche entière | ajout en cat. 0, source node/6837153696 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 60 | Brasserie Volane (Vals-les-Bains) | fiche entière | ajout en cat. 0, source way/898123607 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 61 | La Matheysine (Nantes-en-Rattier) | fiche entière | ajout en cat. 0, source node/11898294497 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 62 | Bière de l'Oisans (Le Bourg-d'Oisans) | fiche entière | ajout en cat. 0, source node/9366608484 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 63 | Drac (Jaujac) | fiche entière | ajout en cat. 0, source node/8939615919 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 64 | Brasserie du pèreSaint'Oy (Diou) | fiche entière | ajout en cat. 0, source node/10929096211 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 65 | Brasserie du Grand Pic (Épierre) | fiche entière | ajout en cat. 0, source node/10539043798 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 66 | La Bascule (Châtillon-en-Diois) | fiche entière | ajout en cat. 0, source node/9956628805 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 67 | Brasserie Gessienne (Maconnex) | fiche entière | ajout en cat. 0, source node/9021286942 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 68 | Bières Du Galta (Grignon) | fiche entière | ajout en cat. 0, source node/11123927661 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 69 | Back in Malt (Varennes-sur-Allier) | fiche entière | ajout en cat. 0, source node/10865053092 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 70 | Brasserie Artisanale La Fabrique (Montélimar) | fiche entière | ajout en cat. 0, source node/13125588440 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 71 | Brew Vernet (Broût-Vernet) | fiche entière | ajout en cat. 0, source way/391271892 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 72 | La vieille mule (Le Poët-Laval) | fiche entière | ajout en cat. 0, source way/829374816 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 73 | Bières le Plan B (Clermont-Ferrand) | fiche entière | ajout en cat. 0, source node/1804850834 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 74 | Brasserie du jugement dernier (Mazerier) | fiche entière | ajout en cat. 0, source node/7568278437 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 75 | Kazan CraftBeer (Chamalières) | fiche entière | ajout en cat. 0, source node/11310220269 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 76 | Brasserie des Neiges Maurienne (Saint-Jean-de-Maurienne) | fiche entière | ajout en cat. 0, source node/14054524469 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 77 | Brasserie BE HERE Factory (Ville-la-Grand) | fiche entière | ajout en cat. 0, source way/158604347 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 78 | La Rochebière (Largentière) | fiche entière | ajout en cat. 0, source node/13227343955 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 79 | La Brasserie des Voirons (Lucinges) | fiche entière | ajout en cat. 0, source way/63593358 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 80 | Brasserie du Haut Buech (BHB) (Lus-la-Croix-Haute) | fiche entière | ajout en cat. 0, source node/4221229812 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 81 | Bières Du Faucigny (Viuz-en-Sallaz) | fiche entière | ajout en cat. 0, source way/798744550 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 82 | L'Étoile des Neiges (Saint-Martin-de-Belleville) | fiche entière | ajout en cat. 0, source way/181948095 | REFUSER | OSM la dit aussi amenity=restaurant : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 83 | La Voûte (Saint-Martin-de-Belleville) | fiche entière | ajout en cat. 0, source way/181942942 | REFUSER | OSM la dit aussi amenity=restaurant : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 84 | La Birra Menta (Beaufort) | fiche entière | ajout en cat. 0, source node/10000388698 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 85 | Brasserie Galibier (Valloire) | fiche entière | ajout en cat. 0, source node/8542143945 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 86 | Brasserie du Sancy (Besse-et-Saint-Anastaise) | fiche entière | ajout en cat. 0, source node/13810536073 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 87 | Lou Cabistou (Saint-Remèze) | fiche entière | ajout en cat. 0, source node/13072108394 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 88 | Le Medzé-ry (Saint-Martin-de-Belleville) | fiche entière | ajout en cat. 0, source way/181943199 | REFUSER | OSM la dit aussi amenity=restaurant : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 89 | Le Capricorne (Saint-Martin-de-Belleville) | fiche entière | ajout en cat. 0, source way/181947968 | REFUSER | OSM la dit aussi amenity=restaurant : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 90 | La p'tite ravine (Demi-Quartier) | fiche entière | ajout en cat. 0, source way/157667497 | REFUSER | OSM la dit aussi amenity=restaurant : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 91 | Brasserie Bergoïata (Bourg-Saint-Andéol) | fiche entière | ajout en cat. 0, source node/7352560827 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 92 | Café Rétro (Moulins) | fiche entière | ajout en cat. 0, source node/9459121056 | REFUSER | Nom de café, adresse « mcdrive » : rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 93 | Dark Lab (Les Roches) | fiche entière | ajout en cat. 0, source node/13061456701 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 94 | Brasserie la Croix d'or (Pierrelatte) | fiche entière | ajout en cat. 0, source node/4756665335 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 95 | Châlet d'Emilie (Combloux) | fiche entière | ajout en cat. 0, source way/246557753 | REFUSER | OSM la dit aussi amenity=restaurant : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 96 | La Ringale (Cervens) | fiche entière | ajout en cat. 0, source way/823063300 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 97 | Brassin Versant - Bière de Granier (Aime-la-Plagne) | fiche entière | ajout en cat. 0, source node/11608083502 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 98 | Le Bistrot des Quais (Sallanches) | fiche entière | ajout en cat. 0, source node/6328825664 | REFUSER | Nom de bistrot : rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 99 | Outer Range Brewing Co. (Sallanches) | fiche entière | ajout en cat. 0, source node/797390082 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 100 | Le Rendez-Vous (Saint-Martin-de-Belleville) | fiche entière | ajout en cat. 0, source way/46799920 | REFUSER | OSM la dit aussi amenity=restaurant : lieu de service, rien ne dit qu'on y brasse. Absente de la couche S25. |
| 101 | Le Postillon (Combloux) | fiche entière | ajout en cat. 0, source way/246557762 | REFUSER | OSM la dit aussi amenity=restaurant : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 102 | Brasserie l'Antidote (Bozel) | fiche entière | ajout en cat. 0, source way/196320681 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 103 | Brasserie des Estives (Allanche) | fiche entière | ajout en cat. 0, source node/13012188555 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 104 | La Fa’briquette (Vagnas) | fiche entière | ajout en cat. 0, source node/13937935301 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 105 | Brasserie artisanale du Léman (Allinges) | fiche entière | ajout en cat. 0, source node/8923062535 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 106 | Bivouak (Sainte-Jalle) | fiche entière | ajout en cat. 0, source way/615387760 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 107 | Brasserie des Sagnes (Menat) | fiche entière | ajout en cat. 0, source way/150209158 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 108 | Brasserie des Montagnes (Gelles) | fiche entière | ajout en cat. 0, source node/13702345820 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 109 | La Peiserote (Peisey-Nancroix) | fiche entière | ajout en cat. 0, source node/14097432469 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 110 | Les Névés (Bourg-Saint-Maurice) | fiche entière | ajout en cat. 0, source node/9511111887 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 111 | Brasserie du Petit st Bernard (Bourg-Saint-Maurice) | fiche entière | ajout en cat. 0, source node/11084024884 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 112 | L'Artense (Saint-Sauves-d'Auvergne) | fiche entière | ajout en cat. 0, source node/9934130694 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 113 | Brasserie de l'Etoile (Buis-les-Baronnies) | fiche entière | ajout en cat. 0, source node/2118315994 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 114 | Brasserie Artisanale d'Oé (Aussois) | fiche entière | ajout en cat. 0, source node/7365991540 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 115 | L'hexagone (Évian-les-Bains) | fiche entière | ajout en cat. 0, source way/66975401 | REFUSER | OSM la dit aussi amenity=pub : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 116 | Stories (Chamonix-Mont-Blanc) | fiche entière | ajout en cat. 0, source node/12803724069 | REFUSER | OSM la dit aussi amenity=bar : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 117 | Micro Brasserie de Chamonix (Chamonix-Mont-Blanc) | fiche entière | ajout en cat. 0, source node/278074798 | REFUSER | OSM la dit aussi amenity=pub : lieu de service, rien ne dit qu'on y brasse. Déjà dans la couche S25. |
| 118 | Brasserie 360 (Saint-Martin-Valmeroux) | fiche entière | ajout en cat. 0, source way/927596016 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |
| 119 | Les 3 caves (Aurillac) | fiche entière | ajout en cat. 0, source node/12768455883 | REFUSER | Déjà affichée « À confirmer » par la couche S25 (même objet OSM) ; data/ n'y ajouterait rien de vérifié. |

**Phrase pour Cédric :** « Je refuse s14-decouverte en entier (9e17904c31bc). La couche S25 les montre déjà. Les n° 1, 3, 23 et 38 deviennent des questions de commune pour un prochain lot. »

*(Si Cédric préfère quand même un noyau dans `data/` : « J'accepte s14-decouverte n° 2, 5, 7, 9, 10, 11 seulement ». Ce sont les plus proches, aucune n'est signalée, et elles restent toutes en catégorie 0.)*

## s16-lot-3 : 8 propositions (empreinte aa5a27525065)

| N° | Fiche | Champ | Proposition | Reco | Raison |
|---:|---|---|---|---|---|
| 1 | Les Brasseurs du Sornin | beers, contact | 24 bières typées, tél. 04 77 60 82 28, site | ACCEPTER | Chaque type vient de la couleur écrite dans la description. Les deux arbitrages tiennent : Trouille « Bière brune » donne brune, et NEIPA est un style d'IPA. Les couleurs rouge, cuivrée et rose sont en « autre », avec un libellé. C'est juste pour Karim. |
| 2 | Brasserie Kokine | beers, contact | 4 bières, mobile, site | ACCEPTER | Seul numéro du site. « Motueka Pale Ale » est en « autre » sans rien déduire. |
| 3 | La Valentinoise | cat, conf, note, src | cat 1 « faible » sur un témoignage de voyageur (2024) | À REVOIR | Garder la note et la source, mais **laisser la catégorie à 0**. Une enseigne rapportée par un voyageur, sans horaire ni téléphone, ne suffit pas à afficher « consommer sur place » à quelqu'un qui fait 20 km. Le vérificateur le dit lui-même : « à refuser si un témoignage ne suffit pas ». |
| 4 | Brasserie de Cluny | contact | mobile, site, Untappd | ACCEPTER | Le numéro vient avec l'invitation de la brasserie à appeler avant de venir : c'est exactement ce dont la fiche a besoin. |
| 5 | Brasserie Paille | contact | mobile, site | ACCEPTER | Le contact est juste. L'écart de commune (Lournand d'après le site, Château dans la fiche, environ 5 km) est une **question séparée** pour Cédric. Le téléphone aide justement à lever le doute. |
| 6 | Brasserie de l'Ours Barbu | beers, contact | 4 bières (Weissbier → blanche), mobile, site | ACCEPTER | « Weissbier » se traduit couramment par « bière blanche » : ce n'est pas une déduction. Porter et Belgian Ale sont en « autre », sans forcer. |
| 7 | Brasserie du Bugey | contact | mobile, site | ACCEPTER | Seul numéro, avec « Merci de nous contacter avant de nous rendre visite ». |
| 8 | Brasserie Kan Mêm | note, horaires | note + bloc accueil le vendredi 17–19 h tiré d'un annuaire | À REVOIR | Garder la note, qui cite déjà « vendredi 17h–19h (annuaire touristique) », mais **retirer le bloc horaires**. Sur une fiche « À confirmer », il s'afficherait « Horaires d'accueil du public » et « ouvert maintenant » le vendredi, sur la seule foi d'un annuaire. C'est la même règle que pour Georges en S12. |

**Phrase pour Cédric :** « J'accepte s16-lot-3 (aa5a27525065) sauf 3 et 8. Pour le 3, garder note et source en catégorie 0. Pour le 8, la note seule, sans horaires. »

## s17-lot-4 : 12 propositions (empreinte b977dc4582d3)

| N° | Fiche | Champ | Proposition | Reco | Raison |
|---:|---|---|---|---|---|
| 1 | La Grange du Seigneur | cat, conf, note, src, beers, contact, horaires | cat 1 « moyenne », 8 bières avec lien, mobile, bloc « vente » mar–dim 15–19 h | À REVOIR | Catégorie, note, bières et contact sont bien fondés. Mais **les créneaux ne valent qu'en juillet et août**. Le reste de l'année, c'est sur rendez-vous, et le schéma ne connaît pas de saison : en octobre, la fiche dira « ouvert … sous réserve » un mardi à 16 h. Il faut accepter tout **sans le bloc horaires**, la note disant déjà « juillet-août ». La page source a répondu 503 le 16/10 à la relecture. |
| 2 | Brasserie du Mont Blanc | contact | tél. 04 79 62 96 76 (bar / restaurant / vente à emporter), site | ACCEPTER | C'est le numéro du lieu ouvert au public, à l'adresse de la fiche. La ligne « Entreprise » est justement écartée. |
| 3 | Brasserie La Furieuse | contact | site seul | ACCEPTER | Le lien vient de la fiche de l'office et ne présente aucun risque. Le téléphone de l'office est justement écarté. |
| 4 | La Marmotte Masquée | contact | site seul | ACCEPTER | Le lien vient d'une fiche de l'office datée du 24/04/2026. Aucun risque. |
| 5 | P'tit Labo (Brasserie de Grenoble) | cat, conf, note, src | cat 1 « moyenne », source office de Grenoble | ACCEPTER | « selling its production on site in a bar/restaurant », à l'adresse de la fiche : c'est explicite. Privateaser, la source faible, est retirée. « moyenne » parce que la page n'est pas datée. |
| 6 | Brasserie Caquot | beers, contact | 6 bières avec page, fixe, site | ACCEPTER | Chaque type vient de la ligne « Type : … » de chaque page. Petite réserve : FuzZzy est dite éphémère par sa page. |
| 7 | Brasserie Dr D. Brewpub | note, src | « Fermée selon Untappd » | ACCEPTER | Cela évite un trajet pour rien. Une question reste à part pour Cédric : **retirer la ligne** du fichier ? |
| 8 | Brasserie Maltobar | note | « Brassage arrêté » en tête de note | ACCEPTER | Cela retire une fausse promesse (mercredi et vendredi 15–19 h) que l'ancienne note faisait encore. Même question de retrait que pour le n° 7, à poser à Cédric. |
| 9 | La Bonne Fabrique | note | vente au marché et à l'épicerie du Sappey, pas à la brasserie | ACCEPTER | La note est plus juste et plus prudente. La catégorie reste à 0. |
| 10 | La Barbue | beers, contact | 5 bières, mobile, site | ACCEPTER | IPA, Blanche et Stout sont écrits tels quels. Dorée et Rubis restent en « autre », sans rien rapprocher. |
| 11 | Brasserie Quardin | beers, contact | 7 bières, fixe, site | ACCEPTER | Les types viennent des mots écrits sur la page. Brune pour Porter suit l'en-tête de la page. |
| 12 | Brasserie Two Dudes | contact | mobile « Brasserie / Pierre », site | À REVOIR | Relu le 16/10 : le site place la brasserie à Crêches-sur-Saône, sans aucune mention de Tournus, alors que la fiche est à Tournus (environ 35 km). Ajouter le site et le téléphone donnerait l'air vérifié à un point probablement faux. **Trancher la commune d'abord**, puis accepter ce contact. |

**Phrase pour Cédric :** « J'accepte s17-lot-4 (b977dc4582d3) sauf 1 et 12. Pour le 1, tout sauf le bloc horaires. Pour le 12, j'attends de trancher la commune. »

## Questions à part, que les propositions ne savent pas porter

Ces points ne changent rien aux phrases ci-dessus. Il faut juste que Cédric y réponde un jour :

- **Communes à trancher.**
  - Brasserie Paille : Château ou Lournand ?
  - Two Dudes : Tournus ou Crêches-sur-Saône ?
  - Venues de S14 : Caribrew, La Chénou, Free Mousse et L'Étincelle.
- **Lignes fermées à retirer ?** Dr D. Brewpub, et Maltobar en pause.
- **Le 06 pro de la Canute.** La recommandation est de ne pas le reprendre.
