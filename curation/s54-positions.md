# Lot S54 — les positions à l'adresse

**Ta remarque du 17/10** : « la localisation des brasseries ne correspond pas
à l'adresse sur la carte ». C'est exact : les 166 fiches sont toutes placées
au **centre de leur commune** (`coordPrecision: commune`), à 1,9 km en
moyenne (médiane) de leur adresse, jusqu'à 15 km.

**Ce que propose ce lot** : 73 fiches placées à leur adresse. Chaque adresse
vient soit de la fiche elle-même (`addr`), soit d'une page lue le 17/10 (site
de la brasserie le plus souvent). Elle est ensuite géocodée par la
Géoplateforme de l'IGN (Base Adresse Nationale), et seulement quand le
numéro de rue est trouvé dans la bonne commune. `km` est recalculé ; la date
de vérification de la fiche ne change pas (sa catégorie n'a pas été revue).

**18 propositions portent une réserve** (« Choix du vérificateur ») : score
faible du géocodeur, ou adresse lue sur un annuaire. À regarder d'abord.

**Pour décider** : réponds « j'accepte 1, 3, 4… », ou « j'accepte tout sauf
2, 7 ». Rien n'entre dans `data/` sans cette réponse (CLAUDE.md §0).

## Non proposées (31)

Le géocodeur n'a pas trouvé le numéro, ou l'adresse est dans une autre
commune que la fiche (brasserie déménagée, ou commune fausse sur la fiche :
procédure à décider, S82).

| Fiche | Ce que donne le géocodeur | Pourquoi |
|---|---|---|
| La Canute Lyonnaise | 75 Chemin d'Yvours 69310 Oullins-Pierre-Bénite | autre commune que la fiche (Pierre-Bénite) |
| La Chénou | Route de Soucieu 69440 Saint-Laurent-d'Agny | street |
| Malting Pot | Lyon 7e Arrondissement | municipality |
| Brasserie Animus | 63 Rue André Sabatier 69520 Grigny-sur-Rhône | autre commune que la fiche (Vaugneray) |
| La Bière des Loups | Route de Chavagneux 69440 Chaussan | street |
| FFAKE Brasserie | Rillieux-la-Pape | municipality |
| Les Roches Précieuses | 12 Place de la Fontaine 42140 Viricelles | autre commune que la fiche (Chazelles-sur-Lyon) |
| Ninkasi Fabriques | Tarare | municipality |
| L'Ours qui brasse | Rue Louis Braille 42000 Saint-Étienne | street |
| Brasserie de la Sanne | Impasse du Renivet 38150 Salaise-sur-Sanne | street |
| La Gaudine (Brasserie de la Semène) | 4215 Route de Jonzieux 42660 Marlhes | autre commune que la fiche (Saint-Genest-Malifaux) |
| Les Bières du Temps | Allée des Acacias 38260 Champier | street |
| La Cadole | (rien) | échec |
| Brasserie Cabule | 140 Impasse des Freesias 26140 Albon | autre commune que la fiche (Le Grand-Serre) |
| Brasserie des Sarments | Route de-la Cabane 07340 Talencieux | street |
| Brasserie Longue Vie | Route de Corsas 07410 Saint-Victor | street |
| La Germanoise | Avenue de Pralong 42260 Saint-Germain-Laval | street |
| Brasserie Saint-Clair (La Bressane) | Route de Pont d'Ain 01250 Montagnat | street |
| Brasserie Grange Noire | 10 Route de Chamagnat 01450 Saint-Alban | autre commune que la fiche (Poncin) |
| La Poulette des Ebaudis | Allée des Chênes 01310 Curtafond | street |
| Brasserie du Bugey | Rue Centrale 01110 Plateau d'Hauteville | street |
| Domaine du Bélier Rouge | Grande Rue 38160 Saint Antoine l'Abbaye | street |
| Brasserie de l'Emblavez | ZA La Croix Vincent (Saint-James) 50240 Saint-James | locality |
| Brasserie Caquot | Rue du Clergeon 73410 Entrelacs | street |
| Brasserie Teddy Beer | 455 route de la carreze 71220 Beaubery | autre commune que la fiche (Pressy-sous-Dondin) |
| Brasserie Maltobar | Rue Très-Cloîtres 38000 Grenoble | street |
| La Bonne Fabrique | Route de la Jacobine 38700 Le Sappey-en-Chartreuse | street |
| L'Etincelle | Route de Genève 01130 Nantua | street |
| Brasserie du Merle | Chemin de Nant 73190 Puygros | street |
| Brasserie Two Dudes | Le Pas Fleury 71700 Tournus | locality |
| La Mousse du Hérisson | Clape Loup 69280 Sainte-Consorce | street |

## Lot s54-positions — 73 proposition(s)

### 1. Ninkasi Brignais

- lat : 45.676 → 45.677612
- lon : 4.751 → 4.769167
- addr : Brignais → 2 A Route de Lyon, 69530 Brignais
- coordPrecision : commune → address
- déplacement sur la carte : 1,4 km

Sources (vérifiée le 2026-10-17) : https://www.ninkasi.fr/lieux/ninkasi-brignais/ ; https://data.geopf.fr/geocodage/search?limit=1&q=2%20A%20Route%20de%20Lyon%2C%2069530%20Brignais

Extrait lu : « Adresse lue : « 2 A Route de Lyon69530, Brignais » (https://www.ninkasi.fr/lieux/ninkasi-brignais/). Géoplateforme (BAN) : « 2a Route de Lyon 69530 Brignais », numéro trouvé (score 0.793). »

### 2. Caribrew

- lat : 45.6667 → 45.686542
- lon : 4.6867 → 4.703345
- coordPrecision : commune → address
- déplacement sur la carte : 2,6 km

Sources (vérifiée le 2026-10-17) : https://www.montsdulyonnaistourisme.fr/degustation/microbrasserie-artisanale-caribrew-soucieu-en-jarrest/ ; https://data.geopf.fr/geocodage/search?limit=1&q=4%20Parc%20d%27Activit%C3%A9s%20d%27Arbora%2C%20Route%20de%20Brindas%2C%2069510%20Soucieu-en-Jarrest

Extrait lu : « Adresse lue : « 4 Parc d’Activités d'Arbora Route de Brindas 69510 Soucieu-en-Jarrest » (https://www.montsdulyonnaistourisme.fr/degustation/microbrasserie-artisanale-caribrew-soucieu-en-jarrest/). Géoplateforme (BAN) : « 4 Route de Brindas 69510 Soucieu-en-Jarrest », numéro trouvé (score 0.551). »

Choix du vérificateur : score faible (0.551) : comparer l'adresse trouvée, « 4 Route de Brindas 69510 Soucieu-en-Jarrest », à l'adresse demandée, « 4 Parc d'Activités d'Arbora, Route de Brindas, 69510 Soucieu-en-Jarrest » ; refuser si ce n'est pas la même rue ; adresse lue sur un annuaire ou un office de tourisme, pas sur le site de la brasserie

### 3. Autour de la Bière (Taluyers)

- lat : 45.6333 → 45.63693
- lon : 4.7167 → 4.732954
- coordPrecision : commune → address
- déplacement sur la carte : 1,3 km

Sources (vérifiée le 2026-10-17) : https://www.autourdelabiere.fr/ ; https://data.geopf.fr/geocodage/search?limit=1&q=12%20Chemin%20des%20Erables%2C%20ZA%20de%20la%20Ronze%2C%2069440%20Taluyers

Extrait lu : « Adresse lue : « 12 Chemin des Erables, ZA De La Ronze, 69440 TALUYERS, France » (https://www.autourdelabiere.fr/). Géoplateforme (BAN) : « 12 Chemin des Erables 69440 Taluyers », numéro trouvé (score 0.612). »

Choix du vérificateur : score faible (0.612) : comparer l'adresse trouvée, « 12 Chemin des Erables 69440 Taluyers », à l'adresse demandée, « 12 Chemin des Erables, ZA de la Ronze, 69440 Taluyers » ; refuser si ce n'est pas la même rue

### 4. Coldie Brewery

- lat : 45.7335 → 45.745488
- lon : 4.8328 → 4.845547
- coordPrecision : commune → address
- déplacement sur la carte : 1,7 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=82%20rue%20Jaboulay%2C%2069007%20Lyon

Extrait lu : « Adresse de la fiche : « 82 rue Jaboulay, 69007 Lyon ». Géoplateforme (BAN) : « 82 Rue Jaboulay 69007 Lyon », numéro trouvé (score 0.974). »

### 5. Brasserie Georges

- lat : 45.749 → 45.748432
- lon : 4.827 → 4.828264
- coordPrecision : commune → address
- déplacement sur la carte : 0,1 km

Sources (vérifiée le 2026-10-17) : https://www.brasseriegeorges.com ; https://data.geopf.fr/geocodage/search?limit=1&q=30%20Cours%20de%20Verdun%2C%2069002%20Lyon

Extrait lu : « Adresse lue : « 30 Cours de Verdun 69002 Lyon Perrache » (https://www.brasseriegeorges.com). Géoplateforme (BAN) : « 30 Cours de Verdun Perrache 69002 Lyon », numéro trouvé (score 0.671). »

Choix du vérificateur : score faible (0.671) : comparer l'adresse trouvée, « 30 Cours de Verdun Perrache 69002 Lyon », à l'adresse demandée, « 30 Cours de Verdun, 69002 Lyon » ; refuser si ce n'est pas la même rue

### 6. Ferme de la Quintillière

- lat : 45.6 → 45.590253
- lon : 4.6 → 4.637056
- coordPrecision : commune → address
- déplacement sur la carte : 3,1 km

Sources (vérifiée le 2026-10-17) : http://www.fermedelaquintilliere.com/ ; https://data.geopf.fr/geocodage/search?limit=1&q=520%20route%20de%20Combe%20Boiron%2C%2069440%20Saint-Maurice-sur-Dargoire

Extrait lu : « Adresse lue : « 520, route de Combe Boiron — 69440 Saint Maurice sur Dargoire » (http://www.fermedelaquintilliere.com/). Géoplateforme (BAN) : « 520 Route de Combe Boiron 69440 Chabanière », numéro trouvé (score 0.948). »

### 7. Platypus Brewpub

- lat : 45.756 → 45.746276
- lon : 4.83 → 4.823643
- coordPrecision : commune → address
- déplacement sur la carte : 1,2 km

Sources (vérifiée le 2026-10-17) : https://www.privateaser.com/lieu/43617-platypus-brewpub-brasserie-artisanale ; https://data.geopf.fr/geocodage/search?limit=1&q=32%20Cours%20Charlemagne%2C%2069002%20Lyon

Extrait lu : « Adresse lue : « 32 Cours Charlemagne, 69002 Lyon » (https://www.privateaser.com/lieu/43617-platypus-brewpub-brasserie-artisanale). Géoplateforme (BAN) : « 32 Cours Charlemagne 69002 Lyon », numéro trouvé (score 0.971). »

Choix du vérificateur : adresse lue sur un annuaire ou un office de tourisme, pas sur le site de la brasserie ; annuaire, pas le site de la brasserie

### 8. La Beer Fabrique

- lat : 45.769 → 45.769044
- lon : 4.832 → 4.834216
- coordPrecision : commune → address
- déplacement sur la carte : 0,2 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=10%20rue%20Saint-Polycarpe%2C%2069001%20Lyon

Extrait lu : « Adresse de la fiche : « 10 rue Saint-Polycarpe, 69001 Lyon ». Géoplateforme (BAN) : « 10 Rue Saint Polycarpe 69001 Lyon », numéro trouvé (score 0.961). »

### 9. Tom & Co

- lat : 45.77 → 45.769109
- lon : 4.833 → 4.832711
- coordPrecision : commune → address
- déplacement sur la carte : 0,1 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=5%20rue%20des%20Capucins%2C%2069001%20Lyon

Extrait lu : « Adresse de la fiche : « 5 rue des Capucins, 69001 Lyon ». Géoplateforme (BAN) : « 5 Rue des Capucins 69001 Lyon », numéro trouvé (score 0.966). »

### 10. Microbrasserie de Montchat

- lat : 45.758 → 45.745508
- lon : 4.886 → 4.885456
- coordPrecision : commune → address
- déplacement sur la carte : 1,4 km

Sources (vérifiée le 2026-10-17) : https://bieredemontchat.com/ ; https://data.geopf.fr/geocodage/search?limit=1&q=65%20rue%20Trarieux%2C%2069003%20Lyon

Extrait lu : « Adresse lue : « 65 rue Trarieux – 69003 Lyon » (https://bieredemontchat.com/). Géoplateforme (BAN) : « 65 Rue Trarieux 69003 Lyon », numéro trouvé (score 0.977). »

### 11. La Soyeuse

- lat : 45.6064 → 45.659236
- lon : 4.6039 → 4.63239
- coordPrecision : commune → address
- déplacement sur la carte : 6,3 km

Sources (vérifiée le 2026-10-17) : https://lasoyeuse.fr/ ; https://data.geopf.fr/geocodage/search?limit=1&q=237%20route%20de%20Fondrieu%2C%2069510%20Rontalon

Extrait lu : « Adresse lue : « FERME-BRASSERIE LA SOYEUSE 237 route de Fondrieu 69510 Rontalon » (https://lasoyeuse.fr/). Géoplateforme (BAN) : « 237 Route de Fondrieu 69510 Rontalon », numéro trouvé (score 0.948). »

### 12. La Loupiote

- lat : 45.72 → 45.71083
- lon : 4.54 → 4.468726
- coordPrecision : commune → address
- déplacement sur la carte : 5,6 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=175%20route%20de%20Lyon%2C%2069610%20Saint-Genis-l%27Argenti%C3%A8re

Extrait lu : « Adresse de la fiche : « 175 route de Lyon, 69610 Saint-Genis-l'Argentière ». Géoplateforme (BAN) : « 175 Route de Lyon 69610 Saint-Genis-l'Argentière », numéro trouvé (score 0.951). »

### 13. Brasserie des Roches

- lat : 45.4 → 45.451533
- lon : 4.8083 → 4.821797
- coordPrecision : commune → address
- déplacement sur la carte : 5,8 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=1167%20all%C3%A9e%20des%20Muriers%2C%2038200%20Chonas-l%27Amballan

Extrait lu : « Adresse de la fiche : « 1167 allée des Muriers, 38200 Chonas-l'Amballan ». Géoplateforme (BAN) : « 1167 Allée des Mûriers 38121 Chonas-l'Amballan », numéro trouvé (score 0.75). »

### 14. Le Brass'in

- lat : 45.8267 → 45.83369
- lon : 4.8483 → 4.847644
- coordPrecision : commune → address
- déplacement sur la carte : 0,8 km

Sources (vérifiée le 2026-10-17) : https://www.lebrassin.fr/ ; https://data.geopf.fr/geocodage/search?limit=1&q=17%20rue%20Pierre%20Carbon%2C%2069270%20Fontaines-sur-Sa%C3%B4ne

Extrait lu : « Adresse lue : « 17 Rue Pierre Carbon — 69270 Fontaines sur Saône » (https://www.lebrassin.fr/). Géoplateforme (BAN) : « 17 Rue Pierre Carbon 69270 Fontaines-sur-Saône », numéro trouvé (score 0.958). »

### 15. Brasserie Dulion

- lat : 45.8208 → 45.81713
- lon : 4.8981 → 4.874419
- coordPrecision : commune → address
- déplacement sur la carte : 1,9 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=130%20avenue%20de%20l%27Industrie%2C%2069140%20Rillieux-la-Pape

Extrait lu : « Adresse de la fiche : « 130 avenue de l'Industrie, 69140 Rillieux-la-Pape ». Géoplateforme (BAN) : « 130 Avenue de l'Industrie 69140 Rillieux-la-Pape », numéro trouvé (score 0.965). »

### 16. Nomade Brewery

- lat : 45.7306 → 45.731331
- lon : 5.0053 → 4.982764
- coordPrecision : commune → address
- déplacement sur la carte : 1,8 km

Sources (vérifiée le 2026-10-17) : https://www.nomadebiere.fr/la-taproom/ ; https://data.geopf.fr/geocodage/search?limit=1&q=388%20rue%20Antoine%20Pinay%2C%2069740%20Genas

Extrait lu : « Adresse lue : « 388 rue Antoine Pinay 69740 GENAS » (https://www.nomadebiere.fr/la-taproom/). Géoplateforme (BAN) : « 388 Rue Antoine Pinay 69740 Genas », numéro trouvé (score 0.96). »

### 17. Single Track

- lat : 45.8267 → 45.83369
- lon : 4.8483 → 4.847644
- coordPrecision : commune → address
- déplacement sur la carte : 0,8 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=17%20rue%20Pierre%20Carbon%2C%2069270%20Fontaines-sur-Sa%C3%B4ne

Extrait lu : « Adresse de la fiche : « 17 rue Pierre Carbon, 69270 Fontaines-sur-Saône ». Géoplateforme (BAN) : « 17 Rue Pierre Carbon 69270 Fontaines-sur-Saône », numéro trouvé (score 0.958). »

### 18. GreDam

- lat : 45.8664 → 45.858319
- lon : 4.7186 → 4.705645
- coordPrecision : commune → address
- déplacement sur la carte : 1,3 km

Sources (vérifiée le 2026-10-17) : https://gredambrasserie.com/ ; https://data.geopf.fr/geocodage/search?limit=1&q=20%20chemin%20du%20Pontet%2C%2069380%20Civrieux-d%27Azergues

Extrait lu : « Adresse lue : « Située au 20 chemin du Pontet 69380 Civrieux-D'Azergues, Rhone-Alpes, » (https://gredambrasserie.com/). Géoplateforme (BAN) : « 20 Chemin du Pontet 69380 Civrieux-d'Azergues », numéro trouvé (score 0.951). »

### 19. Bière bio des Monts d'Or

- lat : 45.87 → 45.869667
- lon : 4.83 → 4.819369
- coordPrecision : commune → address
- déplacement sur la carte : 0,8 km

Sources (vérifiée le 2026-10-17) : https://www.bieresbio.fr/ ; https://data.geopf.fr/geocodage/search?limit=1&q=18%20chemin%20des%20Carri%C3%A8res%2C%2069250%20Curis-au-Mont-d%27Or

Extrait lu : « Adresse lue : « 18, Chemin des Carrières, 69250 Curis-au-Mont-d'Or » (https://www.bieresbio.fr/). Géoplateforme (BAN) : « 18 Chemin des Carrières 69250 Curis-au-Mont-d'Or », numéro trouvé (score 0.949). »

Choix du vérificateur : extrait rendu par l'outil de lecture, pas mot pour mot

### 20. Domaine du Manchot

- lat : 45.8767 → 45.927344
- lon : 4.7036 → 4.691937
- coordPrecision : commune → address
- déplacement sur la carte : 5,7 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=28%20chemin%20de%20l%27Audience%2C%2069480%20Lachassagne

Extrait lu : « Adresse de la fiche : « 28 chemin de l'Audience, 69480 Lachassagne ». Géoplateforme (BAN) : « 28 Chemin de l’Audience 69480 Lachassagne », numéro trouvé (score 0.943). »

### 21. La Farlodoise

- lat : 45.64215 → 45.634668
- lon : 4.3763 → 4.398967
- coordPrecision : commune → address
- déplacement sur la carte : 1,9 km

Sources (vérifiée le 2026-10-17) : https://www.loiretourisme.com/en/get-out-and-move/enjoying-yourself/tastings/brewery-la-farlodoise-chazelles-sur-lyon-en-3621823/ ; https://data.geopf.fr/geocodage/search?limit=1&q=3%20avenue%20du%208%20Mai%201945%2C%2042140%20Chazelles-sur-Lyon

Extrait lu : « Adresse lue : « Address: 3 Avenue du 8 mai 1945, 42140 Chazelles-sur-Lyon » (https://www.loiretourisme.com/en/get-out-and-move/enjoying-yourself/tastings/brewery-la-farlodoise-chazelles-sur-lyon-en-3621823/). Géoplateforme (BAN) : « 3 Avenue du 8 Mai 1945 42140 Chazelles-sur-Lyon », numéro trouvé (score 0.953). »

Choix du vérificateur : adresse lue sur un annuaire ou un office de tourisme, pas sur le site de la brasserie

### 22. Brasserie Kachmar

- lat : 45.9367 → 45.954343
- lon : 4.7208 → 4.71512
- coordPrecision : commune → address
- déplacement sur la carte : 2,0 km

Sources (vérifiée le 2026-10-17) : https://www.brasserie-kachmar.fr/la-brasserie ; https://data.geopf.fr/geocodage/search?limit=1&q=1932%20Route%20de%20Villefranche%2C%2069480%20Anse

Extrait lu : « Adresse lue : « 1932 Route de Villefranche69480 Anse » (https://www.brasserie-kachmar.fr/la-brasserie). Géoplateforme (BAN) : « 1932 Route de Villefranche 69480 Anse », numéro trouvé (score 0.966). »

### 23. Terre de Bières

- lat : 45.9908 → 45.979583
- lon : 4.7194 → 4.726651
- addr : 592 bd Albert Camus, 69400 Villefranche-sur-Saône → Parc Avenue, 592 Boulevard Albert Camus, Bâtiment G, 69400 Villefranche-sur-Saône
- coordPrecision : commune → address
- déplacement sur la carte : 1,4 km

Sources (vérifiée le 2026-10-17) : https://www.terredebieres.fr/ ; https://data.geopf.fr/geocodage/search?limit=1&q=Parc%20Avenue%2C%20592%20Boulevard%20Albert%20Camus%2C%20B%C3%A2timent%20G%2C%2069400%20Villefranche-sur-Sa%C3%B4ne

Extrait lu : « Adresse lue : « Parc Avenue, 592 Boulevard Albert Camus Bâtiment G, 69400 Villefranche-sur-Saône » (https://www.terredebieres.fr/). Géoplateforme (BAN) : « 592 Boulevard Albert Camus 69400 Villefranche-sur-Saône », numéro trouvé (score 0.634). »

Choix du vérificateur : score faible (0.634) : comparer l'adresse trouvée, « 592 Boulevard Albert Camus 69400 Villefranche-sur-Saône », à l'adresse demandée, « Parc Avenue, 592 Boulevard Albert Camus, Bâtiment G, 69400 Villefranche-sur-Saône » ; refuser si ce n'est pas la même rue

### 24. L'Affoleuse

- lat : 45.997 → 46.007949
- lon : 4.673 → 4.639198
- addr : Denicé → 3 impasse de Montromand, 69640 Denicé
- coordPrecision : commune → address
- déplacement sur la carte : 2,9 km

Sources (vérifiée le 2026-10-17) : https://laffoleuse.net/contact ; https://data.geopf.fr/geocodage/search?limit=1&q=3%20impasse%20de%20Montromand%2C%2069640%20Denic%C3%A9

Extrait lu : « Adresse lue : « 3 impasse de Montromand, 69640 Denicé, phone 04 74 62 86 05 » (https://laffoleuse.net/contact). Géoplateforme (BAN) : « 3 Impasse de Montromand 69640 Denicé », numéro trouvé (score 0.945). »

### 25. Brasserie Stéphanoise

- lat : 45.4397 → 45.416064
- lon : 4.3872 → 4.391308
- addr : 11 bis rue Buffon, 42100 Saint-Étienne → 11bis rue Buffon, Quartier Bellevue, site Mosser, 42100 Saint-Étienne
- coordPrecision : commune → address
- déplacement sur la carte : 2,6 km

Sources (vérifiée le 2026-10-17) : https://www.labrasseriestephanoise.com/ ; https://data.geopf.fr/geocodage/search?limit=1&q=11bis%20rue%20Buffon%2C%20Quartier%20Bellevue%2C%20site%20Mosser%2C%2042100%20Saint-%C3%89tienne

Extrait lu : « Adresse lue : « 11bis rue Buffon Quartier Bellevue site Mosser 42100 - Saint-Étienne (site officiel, résumé de l'outil) » (https://www.labrasseriestephanoise.com/). Géoplateforme (BAN) : « 11bis Rue Buffon 42100 Saint-Étienne », numéro trouvé (score 0.505). »

Choix du vérificateur : score faible (0.505) : comparer l'adresse trouvée, « 11bis Rue Buffon 42100 Saint-Étienne », à l'adresse demandée, « 11bis rue Buffon, Quartier Bellevue, site Mosser, 42100 Saint-Étienne » ; refuser si ce n'est pas la même rue

### 26. Ninkasi Saint-Étienne

- lat : 45.42775 → 45.453711
- lon : 4.3886 → 4.389186
- addr : Saint-Étienne → Sam Center, 11 rue Barrouin, 42000 Saint-Étienne
- coordPrecision : commune → address
- déplacement sur la carte : 2,9 km

Sources (vérifiée le 2026-10-17) : https://www.ninkasi.fr/lieux/ninkasi-saint-etienne/ ; https://data.geopf.fr/geocodage/search?limit=1&q=Sam%20Center%2C%2011%20rue%20Barrouin%2C%2042000%20Saint-%C3%89tienne

Extrait lu : « Adresse lue : « Sam Center, 11 rue Barrouin, 42000 Saint-Étienne (site officiel du réseau, résumé de l'outil) » (https://www.ninkasi.fr/lieux/ninkasi-saint-etienne/). Géoplateforme (BAN) : « 11 Rue Barrouin 42000 Saint-Étienne », numéro trouvé (score 0.68). »

Choix du vérificateur : score faible (0.68) : comparer l'adresse trouvée, « 11 Rue Barrouin 42000 Saint-Étienne », à l'adresse demandée, « Sam Center, 11 rue Barrouin, 42000 Saint-Étienne » ; refuser si ce n'est pas la même rue

### 27. Brasserie des Ursulines

- lat : 45.7228 → 45.725979
- lon : 5.2503 → 5.25319
- coordPrecision : commune → address
- déplacement sur la carte : 0,4 km

Sources (vérifiée le 2026-10-17) : https://www.biere-les-ursulines.com ; https://data.geopf.fr/geocodage/search?limit=1&q=4%20c%C3%B4te%20Chausson%2C%2038460%20Cr%C3%A9mieu

Extrait lu : « Adresse lue : « 4 côte chausson – 38460 Crémieu (site officiel, résumé de l'outil) » (https://www.biere-les-ursulines.com). Géoplateforme (BAN) : « 4 Côte Chausson 38460 Crémieu », numéro trouvé (score 0.951). »

### 28. La Margau

- lat : 45.51 → 45.523663
- lon : 4.27 → 4.236306
- coordPrecision : commune → address
- déplacement sur la carte : 3,0 km

Sources (vérifiée le 2026-10-17) : https://www.rendezvousenforez.com/en/degustation/la-margau-brasserie-artisanale-bonson/ ; https://data.geopf.fr/geocodage/search?limit=1&q=5b%20rue%20du%20pr%C3%A9%20du%20clerc%2C%2042160%20Bonson

Extrait lu : « Adresse lue : « 5b rue du pré du clerc, 42160 Bonson (office de tourisme Forez, pas le site de la brasserie ; résumé de l'outil) » (https://www.rendezvousenforez.com/en/degustation/la-margau-brasserie-artisanale-bonson/). Géoplateforme (BAN) : « 5B Rue du Pré du Clerc 42160 Bonson », numéro trouvé (score 0.957). »

### 29. Brasserie de la Loire

- lat : 45.5003 → 45.510094
- lon : 4.2606 → 4.236792
- coordPrecision : commune → address
- déplacement sur la carte : 2,2 km

Sources (vérifiée le 2026-10-17) : https://www.loiretourisme.com/en/offers/the-loire-brewery-saint-just-saint-rambert-en-3354722 ; https://data.geopf.fr/geocodage/search?limit=1&q=29%20chemin%20du%20B%C3%A9chet%2C%2042170%20Saint-Just-Saint-Rambert

Extrait lu : « Adresse lue : « 29, Chemin du Bechet, 42170 Saint-Just-Saint-Rambert (Loire Tourisme, résumé de l'outil). Le site officiel donne « 29 chemin du Béchet » sans code postal. » (https://www.loiretourisme.com/en/offers/the-loire-brewery-saint-just-saint-rambert-en-3354722). Géoplateforme (BAN) : « 29 Chemin du Béchet 42170 Saint-Just-Saint-Rambert », numéro trouvé (score 0.957). »

Choix du vérificateur : adresse lue sur un annuaire ou un office de tourisme, pas sur le site de la brasserie

### 30. La Part des Autres

- lat : 45.8883 → 45.893982
- lon : 4.275 → 4.244652
- coordPrecision : commune → address
- déplacement sur la carte : 2,4 km

Sources (vérifiée le 2026-10-17) : https://www.roannais-tourisme.com/en/degustation-produits-locaux/brasserie-la-part-des-autres/ ; https://data.geopf.fr/geocodage/search?limit=1&q=153%20rue%20des%20%C3%89coles%2C%2042540%20Saint-Just-la-Pendue

Extrait lu : « Adresse lue : « 153 rue des Écoles / 42540 Saint-Just-la-Pendue (confirmé par https://www.cybevasion.fr/tourisme-la-part-des-autres-saint-just-la-pendue-l74601.html : « 153 rue des Écoles - 42540 SAINT-JUST LA PENDUE »). Citation issue d'un résumé d'outil. Annuaire/tourisme : le site officiel ne donne que « Au cœur du village de Saint-Just-la-Pendue ». » (https://www.roannais-tourisme.com/en/degustation-produits-locaux/brasserie-la-part-des-autres/). Géoplateforme (BAN) : « 153 Rue des Ecoles 42540 Saint-Just-la-Pendue », numéro trouvé (score 0.954). »

Choix du vérificateur : adresse lue sur un annuaire ou un office de tourisme, pas sur le site de la brasserie

### 31. Brasserie du Pilat

- lat : 45.2706 → 45.318314
- lon : 4.6531 → 4.63067
- coordPrecision : commune → address
- déplacement sur la carte : 5,6 km

Sources (vérifiée le 2026-10-17) : https://www.loiretourisme.com/en/get-out-and-move/enjoying-yourself/tastings/la-brasserie-du-pilat-saint-julien-molin-molette-en-3352315/ ; https://data.geopf.fr/geocodage/search?limit=1&q=56%20Zone%20artisanale%20du%20Grand%20Pr%C3%A9%202%2C%2042220%20Saint-Julien-Molin-Molette

Extrait lu : « Adresse lue : « 56 Zone artisanale du Grand Pré 2, 42220 Saint-Julien-Molin-Molette. Citation issue d'un résumé d'outil. Fiche de tourisme : le site officiel brasseriedupilat.com ne donne que « St-Julien-Molin-Molette ». » (https://www.loiretourisme.com/en/get-out-and-move/enjoying-yourself/tastings/la-brasserie-du-pilat-saint-julien-molin-molette-en-3352315/). Géoplateforme (BAN) : « 56 Za du Grand Pre 2 42220 Saint-Julien-Molin-Molette », numéro trouvé (score 0.643). »

Choix du vérificateur : score faible (0.643) : comparer l'adresse trouvée, « 56 Za du Grand Pre 2 42220 Saint-Julien-Molin-Molette », à l'adresse demandée, « 56 Zone artisanale du Grand Pré 2, 42220 Saint-Julien-Molin-Molette » ; refuser si ce n'est pas la même rue ; adresse lue sur un annuaire ou un office de tourisme, pas sur le site de la brasserie

### 32. Brasserie Amalthée

- lat : 46.1081 → 46.107115
- lon : 4.7503 → 4.73163
- coordPrecision : commune → address
- déplacement sur la carte : 1,4 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=12%20rue%20du%20Bois%20Baron%2C%20b%C3%A2t.%204%2C%2069220%20Belleville-en-Beaujolais

Extrait lu : « Adresse de la fiche : « 12 rue du Bois Baron, bât. 4, 69220 Belleville-en-Beaujolais ». Géoplateforme (BAN) : « 12 Rue du Bois Baron 69220 Belleville-en-Beaujolais », numéro trouvé (score 0.779). »

### 33. Bière des Frères Clavel

- lat : 45.5 → 45.488656
- lon : 5.4 → 5.360537
- coordPrecision : commune → address
- déplacement sur la carte : 3,3 km

Sources (vérifiée le 2026-10-17) : https://nosproduits-ishere.fr/producteur/la-biere-des-freres-clavel/ ; https://data.geopf.fr/geocodage/search?limit=1&q=28%20chemin%20du%20ferrand%2C%2038690%20Biol

Extrait lu : « Adresse lue : « « 28 chemin du ferrand, 38690 Biol ». Citation issue d'un résumé d'outil. Annuaire de producteurs. » (https://nosproduits-ishere.fr/producteur/la-biere-des-freres-clavel/). Géoplateforme (BAN) : « 28 Chemin du Ferrand 38690 Biol », numéro trouvé (score 0.949). »

Choix du vérificateur : adresse lue sur un annuaire ou un office de tourisme, pas sur le site de la brasserie

### 34. BIM Brasserie Indépendante Montbrisonnaise

- lat : 45.6078 → 45.611213
- lon : 4.0653 → 4.065888
- coordPrecision : commune → address
- déplacement sur la carte : 0,4 km

Sources (vérifiée le 2026-10-17) : https://brasseriebim.com ; https://data.geopf.fr/geocodage/search?limit=1&q=2%20rue%20de%20Feurs%2C%2042600%20Montbrison

Extrait lu : « Adresse lue : « 2, rue de Feurs, 42600 Montbrison (site officiel, extrait rendu par l'outil de lecture ; Cirkwi donne « 2 Rue de Feurs 42600 Montbrison »). C'est déjà `addr` dans la fiche. » (https://brasseriebim.com). Géoplateforme (BAN) : « 2 Rue de Feurs 42600 Montbrison », numéro trouvé (score 0.959). »

### 35. La Poule

- lat : 46.1667 → 46.163362
- lon : 4.8667 → 5.007183
- coordPrecision : commune → address
- déplacement sur la carte : 10,8 km

Sources (vérifiée le 2026-10-17) : https://www.dombes-tourisme.com/en/offers/brasserie-la-poule-neuville-les-dames-en-2921916/ ; https://data.geopf.fr/geocodage/search?limit=1&q=113%20route%20de%20Bourg%2C%2001400%20Neuville-les-Dames

Extrait lu : « Adresse lue : « 113, route de Bourg, 01400 Neuville-les-Dames (fiche d'office de tourisme, pas le site de la brasserie ; extrait rendu par l'outil de lecture). Le site bierelapoule.fr est « en travaux ». C'est déjà `addr` dans la fiche. » (https://www.dombes-tourisme.com/en/offers/brasserie-la-poule-neuville-les-dames-en-2921916/). Géoplateforme (BAN) : « 113 Route de Bourg 01400 Neuville-les-Dames », numéro trouvé (score 0.954). »

Choix du vérificateur : adresse lue sur un annuaire ou un office de tourisme, pas sur le site de la brasserie

### 36. Brasserie Beauseigne

- lat : 45.265 → 45.339422
- lon : 4.2692 → 4.31366
- coordPrecision : commune → address
- déplacement sur la carte : 9,0 km

Sources (vérifiée le 2026-10-17) : https://brasserie-beauseigne.com/ ; https://data.geopf.fr/geocodage/search?limit=1&q=2%20rue%20du%20Bas%20Vernay%2C%2043240%20Saint-Just-Malmont

Extrait lu : « Adresse lue : « 2 rue du Bas Vernay, 43240 Sain-Just-Malmont (faute « Sain- » sur le site, corrigée ici ; extrait rendu par l'outil de lecture). C'est déjà `addr` dans la fiche. » (https://brasserie-beauseigne.com/). Géoplateforme (BAN) : « 2 Rue du Bas Vernay 43240 Saint-Just-Malmont », numéro trouvé (score 0.958). »

### 37. Brasserie de Chambaran

- lat : 45.3667 → 45.351627
- lon : 5.3833 → 5.33749
- coordPrecision : commune → address
- déplacement sur la carte : 4,0 km

Sources (vérifiée le 2026-10-17) : http://www.labinche.fr/ ; https://data.geopf.fr/geocodage/search?limit=1&q=110%20bis%20route%20de%20l%27a%C3%A9roport%2C%2038590%20Saint-%C3%89tienne-de-Saint-Geoirs

Extrait lu : « Adresse lue : « BRASSERIE DE CHAMBARAN - 110 ROUTE DE L'AEROPORT 38590 SAINT ETIENNE DE SAINT GEOIRS (site officiel ; le « bis » vient de la fiche alpes-isere.com, absent de l'extrait du site). Déjà `addr`. » (http://www.labinche.fr/). Géoplateforme (BAN) : « 110bis Route de l’Aéroport 38590 Saint-Étienne-de-Saint-Geoirs », numéro trouvé (score 0.831). »

### 38. La Canaille

- lat : 45.7439 → 45.733902
- lon : 3.9894 → 3.969058
- coordPrecision : commune → address
- déplacement sur la carte : 1,9 km

Sources (vérifiée le 2026-10-17) : https://www.brasserielacanaille.com ; https://data.geopf.fr/geocodage/search?limit=1&q=1%20mont%C3%A9e%20des%20Curistes%2C%2042890%20Sail-sous-Couzan

Extrait lu : « Adresse lue : « 1 montée des curistes à Sail-sous-Couzan (site officiel ; le code postal 42890 n'apparaît que dans le lien Google Maps ; extrait rendu par l'outil de lecture). Déjà `addr`. » (https://www.brasserielacanaille.com). Géoplateforme (BAN) : « 1 Montée des Curistes 42890 Sail-sous-Couzan », numéro trouvé (score 0.943). »

### 39. Miellerie Gachet

- lat : 45.5333 → 45.548251
- lon : 4 → 3.98155
- coordPrecision : commune → address
- déplacement sur la carte : 2,2 km

Sources (vérifiée le 2026-10-17) : https://www.loiretourisme.com/offres/miel-etc-ferme-o-gachet-chazelles-sur-lavieu-fr-3356040/ ; https://data.geopf.fr/geocodage/search?limit=1&q=116%20chemin%20de%20la%20miellerie%2C%20lieu-dit%20Le%20Bost%2C%2042560%20Chazelles-sur-Lavieu

Extrait lu : « Adresse lue : « 116 chemin de la miellerie lieu dit le bost, 42560 Chazelles-sur-Lavieu (fiche Loire Tourisme, pas site propre ; extrait rendu par l'outil de lecture). Le « lieu-dit Le Bost » est en plus de l'`addr` actuelle. » (https://www.loiretourisme.com/offres/miel-etc-ferme-o-gachet-chazelles-sur-lavieu-fr-3356040/). Géoplateforme (BAN) : « 116 Chemin de la Miellerie 42560 Chazelles-sur-Lavieu », numéro trouvé (score 0.64). »

Choix du vérificateur : score faible (0.64) : comparer l'adresse trouvée, « 116 Chemin de la Miellerie 42560 Chazelles-sur-Lavieu », à l'adresse demandée, « 116 chemin de la miellerie, lieu-dit Le Bost, 42560 Chazelles-sur-Lavieu » ; refuser si ce n'est pas la même rue ; adresse lue sur un annuaire ou un office de tourisme, pas sur le site de la brasserie

### 40. Rivière d'Ain

- lat : 46.05 → 46.049628
- lon : 5.3833 → 5.388373
- coordPrecision : commune → address
- déplacement sur la carte : 0,4 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=5%20rue%20Samuel%20P%C3%A9ry%2C%2001640%20Jujurieux

Extrait lu : « Adresse de la fiche : « 5 rue Samuel Péry, 01640 Jujurieux ». Géoplateforme (BAN) : « 5 Rue Samuel Pery 01640 Jujurieux », numéro trouvé (score 0.952). »

### 41. Brasserie Challit

- lat : 45.9969 → 46.001237
- lon : 4.0653 → 3.955634
- coordPrecision : commune → address
- déplacement sur la carte : 8,5 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=1190%20chemin%20des%20Potiers%2C%2042155%20Lentigny

Extrait lu : « Adresse de la fiche : « 1190 chemin des Potiers, 42155 Lentigny ». Géoplateforme (BAN) : « 1190 Chemin des Pothiers 42155 Lentigny », numéro trouvé (score 0.795). »

### 42. La Mousse du Guiers

- lat : 45.6 → 45.599416
- lon : 5.6 → 5.631528
- coordPrecision : commune → address
- déplacement sur la carte : 2,5 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=41-51%20rue%20du%208%20Mai%201945%2C%2073240%20Saint-Genix-sur-Guiers

Extrait lu : « Adresse de la fiche : « 41-51 rue du 8 Mai 1945, 73240 Saint-Genix-sur-Guiers ». Géoplateforme (BAN) : « 51 Rue du 8 mai 1945 73240 Saint-Genix-les-Villages », numéro trouvé (score 0.815). »

### 43. Brasserie Free Mousse

- lat : 45.0667 → 45.076593
- lon : 4.8 → 4.815939
- coordPrecision : commune → address
- déplacement sur la carte : 1,7 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=1%20chemin%20des%20%C3%8Eles%2C%2007300%20Saint-Jean-de-Muzols

Extrait lu : « Adresse de la fiche : « 1 chemin des Îles, 07300 Saint-Jean-de-Muzols ». Géoplateforme (BAN) : « 1 Chemin des Iles 07300 Saint-Jean-de-Muzols », numéro trouvé (score 0.951). »

### 44. Brasserie CCB

- lat : 45.075 → 45.054266
- lon : 4.915 → 4.929222
- coordPrecision : commune → address
- déplacement sur la carte : 2,6 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=1000%20route%20de%20Romans%2C%20Les%20Hauches%2C%2026600%20Chanos-Curson

Extrait lu : « Adresse de la fiche : « 1000 route de Romans, Les Hauches, 26600 Chanos-Curson ». Géoplateforme (BAN) : « 1000 Route de Romans 26600 Chanos-Curson », numéro trouvé (score 0.672). »

Choix du vérificateur : score faible (0.672) : comparer l'adresse trouvée, « 1000 Route de Romans 26600 Chanos-Curson », à l'adresse demandée, « 1000 route de Romans, Les Hauches, 26600 Chanos-Curson » ; refuser si ce n'est pas la même rue

### 45. Les Brasseurs du Sornin

- lat : 46.1333 → 46.132917
- lon : 4.1167 → 4.108592
- coordPrecision : commune → address
- déplacement sur la carte : 0,6 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=400%20route%20de%20Roanne%2C%2042720%20Pouilly-sous-Charlieu

Extrait lu : « Adresse de la fiche : « 400 route de Roanne, 42720 Pouilly-sous-Charlieu ». Géoplateforme (BAN) : « 400 Rue de Roanne 42720 Pouilly-sous-Charlieu », numéro trouvé (score 0.763). »

### 46. Les Deux Branches

- lat : 46.11 → 46.187152
- lon : 4.08 → 4.245736
- coordPrecision : commune → address
- déplacement sur la carte : 15,4 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=236%20rue%20de%20l%27Auberge%2C%2042750%20Maizilly

Extrait lu : « Adresse de la fiche : « 236 rue de l'Auberge, 42750 Maizilly ». Géoplateforme (BAN) : « 236 Rue de l’Auberge 42750 Maizilly », numéro trouvé (score 0.941). »

### 47. Brasserie de la Pérouze

- lat : 46.3 → 46.354087
- lon : 4.95 → 4.982324
- coordPrecision : commune → address
- déplacement sur la carte : 6,5 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=360%20route%20de%20Boissey%2C%2001380%20B%C3%A2g%C3%A9-Dommartin

Extrait lu : « Adresse de la fiche : « 360 route de Boissey, 01380 Bâgé-Dommartin ». Géoplateforme (BAN) : « 360 Route de Boissey 01380 Bâgé-Dommartin », numéro trouvé (score 0.945). »

### 48. Brasserie du Val d'Ainan (La Dauphine)

- lat : 45.45 → 45.459889
- lon : 5.6333 → 5.642282
- coordPrecision : commune → address
- déplacement sur la carte : 1,3 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=82%20voie%20de%20la%20Martinette%2C%2038620%20Saint-Geoire-en-Valdaine

Extrait lu : « Adresse de la fiche : « 82 voie de la Martinette, 38620 Saint-Geoire-en-Valdaine ». Géoplateforme (BAN) : « 82 Voie de la Martinette 38620 Saint-Geoire-en-Valdaine », numéro trouvé (score 0.948). »

### 49. Brasserie Romanaise (Bière Jacquemart)

- lat : 45.0433 → 45.049947
- lon : 5.0525 → 5.090126
- coordPrecision : commune → address
- déplacement sur la carte : 3,0 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=16%20rue%20Claude%20Bernard%2C%2026100%20Romans-sur-Is%C3%A8re

Extrait lu : « Adresse de la fiche : « 16 rue Claude Bernard, 26100 Romans-sur-Isère ». Géoplateforme (BAN) : « 16 Rue Claude Bernard 26100 Romans-sur-Isère », numéro trouvé (score 0.966). »

### 50. Brasserie L'Attract'Yves

- lat : 45.35 → 45.360914
- lon : 5.6 → 5.617048
- coordPrecision : commune → address
- déplacement sur la carte : 1,8 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=192%20chemin%20des%20Verch%C3%A8res%2C%2038500%20Coublevie

Extrait lu : « Adresse de la fiche : « 192 chemin des Verchères, 38500 Coublevie ». Géoplateforme (BAN) : « 192 Chemin des Verchères 38500 Coublevie », numéro trouvé (score 0.955). »

### 51. L'Écume du Guiers

- lat : 45.5833 → 45.538628
- lon : 5.7167 → 5.708836
- coordPrecision : commune → address
- déplacement sur la carte : 5,0 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=125%20rue%20du%20Chef%20Lieu%2C%2073330%20Domessin

Extrait lu : « Adresse de la fiche : « 125 rue du Chef Lieu, 73330 Domessin ». Géoplateforme (BAN) : « 125 Rue du chef lieu 73330 Domessin », numéro trouvé (score 0.957). »

### 52. La Grange du Seigneur

- lat : 44.91 → 44.959641
- lon : 4.64 → 4.736025
- coordPrecision : commune → address
- déplacement sur la carte : 9,4 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=455%20chemin%20de%20la%20Grange%20du%20Seigneur%2C%2007440%20Champis

Extrait lu : « Adresse de la fiche : « 455 chemin de la Grange du Seigneur, 07440 Champis ». Géoplateforme (BAN) : « 455 Chemin de la Grange du Seigneur 07440 Champis », numéro trouvé (score 0.937). »

### 53. L'Agrivoise

- lat : 45.0067 → 45.01518
- lon : 4.3967 → 4.386633
- coordPrecision : commune → address
- déplacement sur la carte : 1,2 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=15%20chemin%20de%20Pontardieu%2C%20Saint-Agr%C3%A8ve

Extrait lu : « Adresse de la fiche : « 15 chemin de Pontardieu, Saint-Agrève ». Géoplateforme (BAN) : « 15 Chemin de Pontardieu 07320 Saint-Agrève », numéro trouvé (score 0.951). »

### 54. Brasserie du Mont Blanc

- lat : 45.6 → 45.591818
- lon : 5.8667 → 5.887661
- coordPrecision : commune → address
- déplacement sur la carte : 1,9 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=128%20avenue%20Ren%C3%A9%20Cassin%2C%2073290%20La%20Motte-Servolex

Extrait lu : « Adresse de la fiche : « 128 avenue René Cassin, 73290 La Motte-Servolex ». Géoplateforme (BAN) : « 128 Avenue rené cassin 73290 La Motte-Servolex », numéro trouvé (score 0.96). »

### 55. Brasserie de la Pleine Lune

- lat : 44.9014 → 44.899371
- lon : 5.0172 → 5.007961
- coordPrecision : commune → address
- déplacement sur la carte : 0,8 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=10%20rue%20Gustave%20Eiffel%2C%20ZA%20La%20Grue%2C%2026120%20Chabeuil

Extrait lu : « Adresse de la fiche : « 10 rue Gustave Eiffel, ZA La Grue, 26120 Chabeuil ». Géoplateforme (BAN) : « 10 Rue Gustave Eiffel 26120 Chabeuil », numéro trouvé (score 0.668). »

Choix du vérificateur : score faible (0.668) : comparer l'adresse trouvée, « 10 Rue Gustave Eiffel 26120 Chabeuil », à l'adresse demandée, « 10 rue Gustave Eiffel, ZA La Grue, 26120 Chabeuil » ; refuser si ce n'est pas la même rue

### 56. Brasserie Kura

- lat : 46.2833 → 46.289769
- lon : 4.3833 → 4.320105
- coordPrecision : commune → address
- déplacement sur la carte : 4,9 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=ZA%20la%20Croix-Bouthier%2C%201%20rue%20du%20Montillet%2C%2071800%20Varennes-sous-Dun

Extrait lu : « Adresse de la fiche : « ZA la Croix-Bouthier, 1 rue du Montillet, 71800 Varennes-sous-Dun ». Géoplateforme (BAN) : « 1 route du Montillet 71800 Varennes-sous-Dun », numéro trouvé (score 0.58). »

Choix du vérificateur : score faible (0.58) : comparer l'adresse trouvée, « 1 route du Montillet 71800 Varennes-sous-Dun », à l'adresse demandée, « ZA la Croix-Bouthier, 1 rue du Montillet, 71800 Varennes-sous-Dun » ; refuser si ce n'est pas la même rue

### 57. Brasserie des Cuves

- lat : 45.2 → 45.206261
- lon : 5.67 → 5.681381
- coordPrecision : commune → address
- déplacement sur la carte : 1,1 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=5%20rue%20de%20la%20Maladi%C3%A8re%2C%2038360%20Sassenage

Extrait lu : « Adresse de la fiche : « 5 rue de la Maladière, 38360 Sassenage ». Géoplateforme (BAN) : « 5 Rue de la Maladière 38360 Sassenage », numéro trouvé (score 0.958). »

### 58. Brasserie La Furieuse

- lat : 45.20405 → 45.206911
- lon : 5.6641 → 5.680575
- coordPrecision : commune → address
- déplacement sur la carte : 1,3 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=7%20rue%20de%20la%20Maladi%C3%A8re%2C%2038360%20Sassenage

Extrait lu : « Adresse de la fiche : « 7 rue de la Maladière, 38360 Sassenage ». Géoplateforme (BAN) : « 7 Rue de la Maladière 38360 Sassenage », numéro trouvé (score 0.958). »

### 59. La Marmotte Masquée

- lat : 45.3333 → 45.317145
- lon : 5.8 → 5.789534
- coordPrecision : commune → address
- déplacement sur la carte : 2,0 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=507%20chemin%20du%20Clot%20Perrier%2C%2038380%20Saint-Pierre-de-Chartreuse

Extrait lu : « Adresse de la fiche : « 507 chemin du Clot Perrier, 38380 Saint-Pierre-de-Chartreuse ». Géoplateforme (BAN) : « 507 Chemin du Clot Perrier 38380 Saint-Pierre-de-Chartreuse », numéro trouvé (score 0.948). »

### 60. Brasserie des Cimes

- lat : 45.6886 → 45.707135
- lon : 5.9156 → 5.915144
- coordPrecision : commune → address
- déplacement sur la carte : 2,1 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=152%20avenue%20de%20Saint%20Simond%2C%2073100%20Aix-les-Bains

Extrait lu : « Adresse de la fiche : « 152 avenue de Saint Simond, 73100 Aix-les-Bains ». Géoplateforme (BAN) : « 152 Avenue de Saint Simond 73100 Aix-les-Bains », numéro trouvé (score 0.975). »

### 61. Brasserie La Dourbie

- lat : 45.1917 → 45.204067
- lon : 5.6833 → 5.687332
- coordPrecision : commune → address
- déplacement sur la carte : 1,4 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=2%20rue%20Baptiste%20Marcet%2C%2038600%20Fontaine

Extrait lu : « Adresse de la fiche : « 2 rue Baptiste Marcet, 38600 Fontaine ». Géoplateforme (BAN) : « 2 Rue Baptiste Marcet 38600 Fontaine », numéro trouvé (score 0.96). »

### 62. Brasserie Irvoy

- lat : 45.17655 → 45.182166
- lon : 5.7259 → 5.746305
- coordPrecision : commune → address
- déplacement sur la carte : 1,7 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=14%20rue%20Claude%20Genin%2C%2038000%20Grenoble

Extrait lu : « Adresse de la fiche : « 14 rue Claude Genin, 38000 Grenoble ». Géoplateforme (BAN) : « 14 Rue Claude Genin 38100 Grenoble », numéro trouvé (score 0.792). »

### 63. P'tit Labo (Brasserie de Grenoble)

- lat : 45.18432 → 45.187466
- lon : 5.69299 → 5.710979
- coordPrecision : commune → address
- déplacement sur la carte : 1,5 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=46%20rue%20d%27Alembert%2C%2038000%20Grenoble

Extrait lu : « Adresse de la fiche : « 46 rue d'Alembert, 38000 Grenoble ». Géoplateforme (BAN) : « 46 Rue d'Alembert 38000 Grenoble », numéro trouvé (score 0.98). »

### 64. Brasserie Solstice

- lat : 45.1724 → 45.182825
- lon : 5.75825 → 5.717794
- coordPrecision : commune → address
- déplacement sur la carte : 3,4 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=47%20rue%20de%20Turenne%2C%2038000%20Grenoble

Extrait lu : « Adresse de la fiche : « 47 rue de Turenne, 38000 Grenoble ». Géoplateforme (BAN) : « 47 Rue de Turenne 38000 Grenoble », numéro trouvé (score 0.975). »

### 65. Brasserie Kiltin'

- lat : 45.22326 → 45.193467
- lon : 5.71203 → 5.730897
- coordPrecision : commune → address
- déplacement sur la carte : 3,6 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=9%20rue%20Chenoise%2C%2038000%20Grenoble

Extrait lu : « Adresse de la fiche : « 9 rue Chenoise, 38000 Grenoble ». Géoplateforme (BAN) : « 9 Rue Chenoise 38000 Grenoble », numéro trouvé (score 0.973). »

### 66. Brasserie Archimalt

- lat : 45.5833 → 45.575139
- lon : 5.95 → 5.949677
- coordPrecision : commune → address
- déplacement sur la carte : 0,9 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=95%20rue%20de%20Bolliet%2C%2073230%20Saint-Alban-Leysse

Extrait lu : « Adresse de la fiche : « 95 rue de Bolliet, 73230 Saint-Alban-Leysse ». Géoplateforme (BAN) : « 95 Rue de Bolliet 73230 Saint-Alban-Leysse », numéro trouvé (score 0.95). »

### 67. Brasserie Les Dameuses

- lat : 45.1167 → 45.110875
- lon : 5.6667 → 5.665991
- coordPrecision : commune → address
- déplacement sur la carte : 0,7 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=43%20all%C3%A9e%20des%20Giteaux%2C%2038640%20Claix

Extrait lu : « Adresse de la fiche : « 43 allée des Giteaux, 38640 Claix ». Géoplateforme (BAN) : « 43 Allee des Giteaux 38640 Claix », numéro trouvé (score 0.962). »

### 68. Une Petite Mousse

- lat : 45.1458 → 45.143542
- lon : 5.7167 → 5.690639
- coordPrecision : commune → address
- déplacement sur la carte : 2,1 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=32%20rue%20de%20Comboire%2C%20b%C3%A2t.%20H%2C%20%C3%89chirolles

Extrait lu : « Adresse de la fiche : « 32 rue de Comboire, bât. H, Échirolles ». Géoplateforme (BAN) : « 32 Rue de Comboire 38130 Échirolles », numéro trouvé (score 0.732). »

### 69. Brasserie du Dauphiné

- lat : 45.1833 → 45.184125
- lon : 5.7589 → 5.774585
- coordPrecision : commune → address
- déplacement sur la carte : 1,2 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=33%20rue%20de%20Champ%20Roman%2C%2038400%20Saint-Martin-d%27H%C3%A8res

Extrait lu : « Adresse de la fiche : « 33 rue de Champ Roman, 38400 Saint-Martin-d'Hères ». Géoplateforme (BAN) : « 33 Rue du Champ Roman 38400 Saint-Martin-d'Hères », numéro trouvé (score 0.812). »

### 70. Brasserie Motueka

- lat : 45.0358 → 45.045275
- lon : 3.9231 → 3.924978
- coordPrecision : commune → address
- déplacement sur la carte : 1,1 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=2%20route%20de%20Coubon%2C%2043700%20Brives-Charensac

Extrait lu : « Adresse de la fiche : « 2 route de Coubon, 43700 Brives-Charensac ». Géoplateforme (BAN) : « 2 Route de Coubon 43700 Brives-Charensac », numéro trouvé (score 0.956). »

### 71. La Barbue

- lat : 45.5667 → 45.543929
- lon : 5.9833 → 5.959488
- coordPrecision : commune → address
- déplacement sur la carte : 3,1 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=330%20rue%20Archim%C3%A8de%2C%2073490%20La%20Ravoire

Extrait lu : « Adresse de la fiche : « 330 rue Archimède, 73490 La Ravoire ». Géoplateforme (BAN) : « 330 R Archimede 73490 La Ravoire », numéro trouvé (score 0.774). »

### 72. Brasserie Quardin

- lat : 45.5167 → 45.528547
- lon : 6 → 6.002646
- coordPrecision : commune → address
- déplacement sur la carte : 1,3 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=26%20chemin%20de%20la%20Tour%20de%20Montagny%2C%2073800%20Chignin

Extrait lu : « Adresse de la fiche : « 26 chemin de la Tour de Montagny, 73800 Chignin ». Géoplateforme (BAN) : « 26 Chemin de la tour de montagny 73800 Chignin », numéro trouvé (score 0.946). »

### 73. Brasserie Grésiv'ale

- lat : 45.45 → 45.429444
- lon : 5.9833 → 5.983194
- coordPrecision : commune → address
- déplacement sur la carte : 2,3 km

Sources (vérifiée le 2026-10-17) : https://data.geopf.fr/geocodage/search?limit=1&q=37%20chemin%20des%20g%C3%AEtes%2C%2038530%20Barraux

Extrait lu : « Adresse de la fiche : « 37 chemin des gîtes, 38530 Barraux ». Géoplateforme (BAN) : « 37 Chemin des Gîtes 38530 Barraux », numéro trouvé (score 0.952). »

Empreinte du lot : d9a586a73d3d
