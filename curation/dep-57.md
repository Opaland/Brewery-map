# Lot dep-57 — la Moselle (S346)

Ce lot ajoute **8 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 33 candidats = 8 proposés + 25 non proposés (tableau ci-dessous).
Catégories proposées : 2 « acheter et consommer », 3 « acheter seulement », 0 « pas de vente », 3 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| BRASSERIE METEOR (`sirene:598500643`) | Météor a son siège à Hochfelden (67) ; aucun lieu ouvert lu en Moselle |
| BRASSERIE ST AVOLD (`sirene:830548079`) | annuaires seuls : à relancer |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE OVATA (`sirene:914425376`) | Ovata : page de l'office en 404 le 31/10, annuaires seuls : à relancer |
| L'AME HARELLE (`sirene:881603724`) | ni site, ni Untappd, ni office de tourisme trouvés : existence non établie |
| BRASSERIE DE LA FENSCH (`sirene:910841543`) | existence non établie ; piste d'un établissement fermé en 2022, non confirmée |
| BAR (`sirene:804396356`) | Brasserie Artisanale de Rodemack : même lieu que node/4935952224, traité avec lui |
| RICHEMENT BIERE (`sirene:920887726`) | un salon de la bière, pas un lieu |
| BRASSERIE SAINT REMI (`sirene:978196780`) | Saint-Rémi : un agrégateur seul : à relancer |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| SARL MALACURIA (`sirene:814398814`) | Malacuria : page de l'office en 404 le 31/10, annuaires seuls : à relancer |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| LA BRASSERIE DES PARAIGES (`sirene:978854487`) | ni site, ni Untappd, ni office de tourisme trouvés : existence non établie |
| NEEDLES BEE'R (`sirene:889704912`) | ni site, ni Untappd, ni office de tourisme trouvés : existence non établie |
| BRASSERIE BTB (`sirene:977605088`) | annuaire seul ; dite fermée par le registre depuis 2024 |
| Entreprise individuelle (`personne:5`) | annuaire seul, aucun site de la brasserie trouvé |
| BRASSERIE RICH'MOUSSE (`sirene:902397843`) | Rich'Mousse : adresse contradictoire, vente non lisible sur le site : à relancer |
| HOP GANG (`sirene:908449259`) | ni site, ni Untappd, ni office de tourisme trouvés : existence non établie |
| Entreprise individuelle (`personne:6`) | Yook Beer : page de l'office en 404 le 31/10, annuaires seuls : à relancer |
| Entreprise individuelle (`personne:7`) | entreprise sans nom ni adresse : rien à chercher |
| TOLAS HELANOSS S.A.S. (`sirene:953298452`) | registre seul |
| Brasserie Galibot (`node/11543788229`) | même nom que Brasserie Galibot, à Forbach ; aucune source ne la place ici |
| Brasserie Artisanale de Rodemack (`node/4935952224`) | Rodemack : la page dit « Vente et dégustation des produits », mais son certificat invalide empêche le contrôle de la relire : à relancer |
| La Taverne - Table de caractère (`way/123772677`) | La Taverne : une étiquette OSM seule ; le site parle d'un restaurant et ne dit pas qu'on y brasse |

## Les fiches proposées

## Lot dep-57 — 0 proposition(s), 8 fiche(s) nouvelle(s)

### 1. La Bière de Metz — fiche nouvelle

- n : (vide) → La Bière de Metz
- c : (vide) → Jury
- d : (vide) → 57
- lat : (vide) → 49.0727
- lon : (vide) → 6.25503
- km : (vide) → 394.4
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Le site de la brasserie dit vendre directement à ses clients dans son établissement, et publie ses horaires d'ouverture. Il ne parle ni de bar ni de dégustation sur place.
- addr : (vide) → Rue de la Fontaine à l'Auge, 57245 Jury
- src : (vide) → https://www.labieredemetz.fr
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 03 87 63 83 41
- contact.site : (vide) → https://www.labieredemetz.fr
- contact.source : (vide) → https://www.labieredemetz.fr/contact
- contact.verifieLe : (vide) → 2026-10-31
- horaires.0.nature : (vide) → vente
- horaires.0.mer : (vide) → 10 h – 12 h, 14 h – 18 h
- horaires.0.jeu : (vide) → 10 h – 12 h, 14 h – 18 h
- horaires.0.ven : (vide) → 10 h – 12 h, 14 h – 18 h
- horaires.0.sam : (vide) → 10 h – 12 h 30, 13 h 30 – 18 h
- horaires.0.source : (vide) → https://www.labieredemetz.fr/contact
- horaires.0.verifieLe : (vide) → 2026-10-31
- verifieLe : (vide) → 2026-10-31

Sources (vérifiée le 2026-10-31) : https://www.labieredemetz.fr ; https://www.labieredemetz.fr/contact ; https://data.geopf.fr/geocodage/search?q=Jury&type=municipality&limit=5

Extrait lu : « nous vendons directement à nos clients dans notre établissement »

Choix du vérificateur : Rouverte à la relecture : l'agent n'avait qu'un résumé. Fixe publié par la brasserie. Types de bière sans lien par bière : laissés vides.

**Aperçu de la fiche** (état du moment calculé le samedi 31 octobre 2026 à 17:26, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 17 h 26 (heure de Paris), vente : ouvert jusqu’à 18 h, d’après les horaires publiés.
> - Adresse
> - Rue de la Fontaine à l'Auge, 57245 Jury
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=La+Bi%C3%A8re+de+Metz&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 87 63 83 41](tel:+33387638341)
> - [Site de la brasserie](https://www.labieredemetz.fr)
> - Horaires
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 10 h – 12 h, 14 h – 18 h
> - Jeudi | 10 h – 12 h, 14 h – 18 h
> - Vendredi | 10 h – 12 h, 14 h – 18 h
> - Samedi | 10 h – 12 h 30, 13 h 30 – 18 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [labieredemetz.fr](https://www.labieredemetz.fr) le 31 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 2. La Grenouille Assoiffée — fiche nouvelle

- n : (vide) → La Grenouille Assoiffée
- c : (vide) → Vahl-lès-Bénestroff
- d : (vide) → 57
- lat : (vide) → 48.91358
- lon : (vide) → 6.78387
- km : (vide) → 391.3
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Son site vend en ligne ; l'office de Sarreguemines parle de visites finies par une dégustation. Rien ne dit qu'on achète ou qu'on boit à la brasserie hors d'une visite. L'adresse varie selon les sources (2 rue de l'église sur le site, 26 Grande rue pour l'office) : point au centre de la commune.
- addr : (vide) → Vahl-lès-Bénestroff
- src : (vide) → https://sarreguemines-tourisme.com/en/fiches/947003297-la-grenouille-assoiffee
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 06 37 29 17 58
- contact.site : (vide) → http://la-grenouille-assoiffee.fr
- contact.source : (vide) → http://la-grenouille-assoiffee.fr
- contact.verifieLe : (vide) → 2026-10-31
- verifieLe : (vide) → 2026-10-31

Sources (vérifiée le 2026-10-31) : https://sarreguemines-tourisme.com/en/fiches/947003297-la-grenouille-assoiffee ; http://la-grenouille-assoiffee.fr ; https://data.geopf.fr/geocodage/search?q=Vahl-l%C3%A8s-B%C3%A9nestroff&type=municipality&limit=5

Extrait lu : « At the end of the visit, they also offer a tasting session. »

Choix du vérificateur : Catégorie 0, redescendue à la relecture : une dégustation en fin de visite n'est pas une vente au comptoir (même choix que Chablis et Quiotte). Téléphone : le portable publié par la brasserie sur son site ; le fixe et l'autre portable de l'office, en désaccord avec lui, écartés. Horaires des offices contradictoires, écartés.

**Aperçu de la fiche** (état du moment calculé le samedi 31 octobre 2026 à 17:26, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Pas encore dans la fiche : son adresse, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Grenouille+Assoiff%C3%A9e+Vahl-l%C3%A8s-B%C3%A9nestroff)[Ses bières sur Untappd](https://untappd.com/search?q=La+Grenouille+Assoiff%C3%A9e&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 37 29 17 58](tel:+33637291758)
> - [Site de la brasserie](http://la-grenouille-assoiffee.fr)
> - Lu sur [sarreguemines-tourisme.com](https://sarreguemines-tourisme.com/en/fiches/947003297-la-grenouille-assoiffee) le 31 octobre 2026. Lu sur [la-grenouille-assoiffee.fr](http://la-grenouille-assoiffee.fr) le 31 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 3. Brasserie des 200 Brasses — fiche nouvelle

- n : (vide) → Brasserie des 200 Brasses
- c : (vide) → Ay-sur-Moselle
- d : (vide) → 57
- lat : (vide) → 49.24083
- lon : (vide) → 6.20923
- km : (vide) → 411.3
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe d'après l'office de tourisme de Metz (projet communal, en activité depuis 2015, dans le bâtiment d'une boutique de producteurs), mais la page ne dit pas si l'on peut y acheter ou boire sur place.
- addr : (vide) → 2 rue Jean Auguste Schleiter, 57300 Ay-sur-Moselle
- src : (vide) → https://www.tourisme-metz.com/en/page/1368001829-brasserie-des-200-brasses
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-31

Sources (vérifiée le 2026-10-31) : https://www.tourisme-metz.com/en/page/1368001829-brasserie-des-200-brasses ; https://data.geopf.fr/geocodage/search?q=2+rue+Jean+Auguste+Schleiter%2C+57300+Ay-sur-Moselle&limit=5

Extrait lu : « Wishing to revive its brewing past, the municipality launched a brewery project at the end of 2012. »

Choix du vérificateur : Pas de site officiel lu. Le portable de la page de l'office n'est pas repris (règle du 31/10). Aucun horaire de la brasserie.

**Aperçu de la fiche** (état du moment calculé le samedi 31 octobre 2026 à 17:26, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 2 rue Jean Auguste Schleiter, 57300 Ay-sur-Moselle
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+des+200+Brasses+Ay-sur-Moselle)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+des+200+Brasses&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [tourisme-metz.com](https://www.tourisme-metz.com/en/page/1368001829-brasserie-des-200-brasses) le 31 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 4. Brasserie Bon Poison — fiche nouvelle

- n : (vide) → Brasserie Bon Poison
- c : (vide) → Metz
- d : (vide) → 57
- lat : (vide) → 49.10379
- lon : (vide) → 6.16531
- km : (vide) → 395.8
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → La brasserie tient un bar et un shop à Metz : bouteilles à emporter, ou pression et bouteille sur place, avec une terrasse.
- addr : (vide) → 13A rue du XXe Corps Américain, 57000 Metz
- src : (vide) → https://bonpoison.com/le-shop-le-bar/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://bonpoison.com/
- contact.source : (vide) → https://bonpoison.com/le-shop-le-bar/
- contact.verifieLe : (vide) → 2026-10-31
- horaires.0.nature : (vide) → accueil
- horaires.0.mer : (vide) → 16 h – 22 h
- horaires.0.jeu : (vide) → 16 h – 22 h
- horaires.0.ven : (vide) → 16 h – 22 h
- horaires.0.sam : (vide) → 10 h 30 – 12 h 30, 15 h – 22 h
- horaires.0.source : (vide) → https://bonpoison.com/le-shop-le-bar/
- horaires.0.verifieLe : (vide) → 2026-10-31
- verifieLe : (vide) → 2026-10-31

Sources (vérifiée le 2026-10-31) : https://bonpoison.com/le-shop-le-bar/ ; https://data.geopf.fr/geocodage/search?q=13A+rue+du+XXe+Corps+Am%C3%A9ricain%2C+57000+Metz&limit=5

Extrait lu : « Bière bouteille à emporter ou pression/bouteille sur place »

Choix du vérificateur : Confiance relevée à la relecture : la page le dit en toutes lettres. Adresse du bar, publiée par le site ; le registre donne la production à Marly. Téléphone non repris : le seul numéro est dit « Contact pro (uniquement) ». Pas de lien Untappd sur la page.

**Aperçu de la fiche** (état du moment calculé le samedi 31 octobre 2026 à 17:26, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 17 h 26 (heure de Paris), accueil du public : ouvert jusqu’à 22 h, d’après les horaires publiés.
> - Adresse
> - 13A rue du XXe Corps Américain, 57000 Metz
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Bon+Poison+Metz)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Bon+Poison&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://bonpoison.com/)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 16 h – 22 h
> - Jeudi | 16 h – 22 h
> - Vendredi | 16 h – 22 h
> - Samedi | 10 h 30 – 12 h 30, 15 h – 22 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [bonpoison.com](https://bonpoison.com/le-shop-le-bar/) le 31 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 5. Brasserie La Tuilerie — fiche nouvelle

- n : (vide) → Brasserie La Tuilerie
- c : (vide) → Augny
- d : (vide) → 57
- lat : (vide) → 49.07453
- lon : (vide) → 6.12587
- km : (vide) → 391.9
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → La brasserie existe : son site publie ses bières et son contact. Il ne dit ni vente à emporter ni dégustation ouverte, ni horaires ; il annonce seulement une soirée à son taproom. Rien n'établit ce qu'on peut y faire d'ordinaire.
- addr : (vide) → 332 rue du Lieutenant colonel Dagnaux, 57685 Augny
- src : (vide) → https://www.brasserielatuilerie.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 51 09 90 89
- contact.site : (vide) → https://www.brasserielatuilerie.fr/
- contact.source : (vide) → https://www.brasserielatuilerie.fr/
- contact.verifieLe : (vide) → 2026-10-31
- verifieLe : (vide) → 2026-10-31

Sources (vérifiée le 2026-10-31) : https://www.brasserielatuilerie.fr/ ; https://data.geopf.fr/geocodage/search?q=332+rue+du+Lieutenant+colonel+Dagnaux%2C+57685+Augny&limit=5

Extrait lu : « Soirée Taproom & DJ set »

Choix du vérificateur : Seul numéro publié : un portable, sur le site de la brasserie. Taproom cité pour un événement, pas comme un accueil permanent : catégorie 0.

**Aperçu de la fiche** (état du moment calculé le samedi 31 octobre 2026 à 17:26, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 332 rue du Lieutenant colonel Dagnaux, 57685 Augny
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+La+Tuilerie+Augny)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+La+Tuilerie&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 51 09 90 89](tel:+33651099089)
> - [Site de la brasserie](https://www.brasserielatuilerie.fr/)
> - Lu sur [brasserielatuilerie.fr](https://www.brasserielatuilerie.fr/) le 31 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 6. Brasserie Papyllon — fiche nouvelle

- n : (vide) → Brasserie Papyllon
- c : (vide) → Sierck-les-Bains
- d : (vide) → 57
- lat : (vide) → 49.44481
- lon : (vide) → 6.36527
- km : (vide) → 436.3
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → faible
- note : (vide) → Le site de la brasserie propose le retrait à la boutique des bières commandées en ligne, avec ses horaires. La buvette du jeudi et du vendredi est au Parc Valette, ailleurs qu'à la brasserie. La page ne dit pas qu'on peut acheter sans commande : à confirmer.
- addr : (vide) → 13 rue de l'Europe, 57480 Sierck-les-Bains
- src : (vide) → https://brasseriepapyllon.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 49 27 75 10
- contact.site : (vide) → https://brasseriepapyllon.com/
- contact.source : (vide) → https://brasseriepapyllon.com/clickcollect/
- contact.verifieLe : (vide) → 2026-10-31
- horaires.0.nature : (vide) → vente
- horaires.0.mer : (vide) → 15 h – 18 h 30
- horaires.0.jeu : (vide) → 15 h – 18 h 30
- horaires.0.ven : (vide) → 15 h – 18 h 30
- horaires.0.remarque : (vide) → Et le samedi de 9h à 12h.
- horaires.0.source : (vide) → https://brasseriepapyllon.com/clickcollect/
- horaires.0.verifieLe : (vide) → 2026-10-31
- verifieLe : (vide) → 2026-10-31

Sources (vérifiée le 2026-10-31) : https://brasseriepapyllon.com/ ; https://brasseriepapyllon.com/clickcollect/ ; https://data.geopf.fr/geocodage/search?q=13+rue+de+l%27Europe%2C+57480+Sierck-les-Bains&limit=5

Extrait lu : « Achetez vos bières en ligne et venez les chercher à la boutique ! »

Choix du vérificateur : Catégorie 2 : aucune dégustation libre à la brasserie n'est citée. Confiance moyenne : la page ne dit pas qu'on peut acheter sans commande. Seul numéro publié : un portable, sur le site. Enseigne du registre différente du nom d'usage ; même adresse. Samedi laissé dans la remarque : la page écrit « 12h00 13 Rue… », que le contrôle ne relit pas comme une heure, et cette garde reste.

**Aperçu de la fiche** (état du moment calculé le samedi 31 octobre 2026 à 17:26, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement (à vérifier)
> - Maintenant
> - À 17 h 26 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 13 rue de l'Europe, 57480 Sierck-les-Bains
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Papyllon&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 49 27 75 10](tel:+33649277510)
> - [Site de la brasserie](https://brasseriepapyllon.com/)
> - Horaires
> - À savoir : Et le samedi de 9h à 12h.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 15 h – 18 h 30
> - Jeudi | 15 h – 18 h 30
> - Vendredi | 15 h – 18 h 30
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriepapyllon.com](https://brasseriepapyllon.com/) le 31 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 7. Brasserie Galibot — fiche nouvelle

- n : (vide) → Brasserie Galibot
- c : (vide) → Forbach
- d : (vide) → 57
- lat : (vide) → 49.20624
- lon : (vide) → 6.90442
- km : (vide) → 424.6
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Le site du taproom de la brasserie donne ses heures d'ouverture ; le samedi, une semaine sur deux, des visites sur réservation et une ouverture au public de 17h à 23h. La vente à emporter n'est pas écrite (réponse de Cédric du 29/10 : catégorie 1, confiance faible).
- addr : (vide) → 5 Rue Jules Verne, 57600 Forbach
- src : (vide) → https://galibot-taproom.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 47 29 59 66
- contact.site : (vide) → https://galibot-taproom.com
- contact.source : (vide) → https://galibot-taproom.com
- contact.verifieLe : (vide) → 2026-10-31
- horaires.0.nature : (vide) → accueil
- horaires.0.jeu : (vide) → 17 h – 21 h
- horaires.0.ven : (vide) → 17 h – 21 h
- horaires.0.source : (vide) → https://galibot-taproom.com
- horaires.0.verifieLe : (vide) → 2026-10-31
- verifieLe : (vide) → 2026-10-31

Sources (vérifiée le 2026-10-31) : https://galibot-taproom.com ; https://data.geopf.fr/geocodage/search?q=5+Rue+Jules+Verne%2C+57600+Forbach&limit=5

Extrait lu : « Jeudi et Vendredi de 17h à 21h. »

Choix du vérificateur : Seule ligne publiée : un portable, sur le site. Samedi laissé dans la note : une semaine sur deux. Le point OSM node/11543788229, à Stiring-Wendel, est le même nom : aucune source ne l'y place, une seule fiche.

**Aperçu de la fiche** (état du moment calculé le samedi 31 octobre 2026 à 17:26, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Maintenant
> - À 17 h 26 (heure de Paris), accueil du public : la source ne dit pas les heures de ce jour.
> - Adresse
> - 5 Rue Jules Verne, 57600 Forbach
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Galibot&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 47 29 59 66](tel:+33647295966)
> - [Site de la brasserie](https://galibot-taproom.com)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | 17 h – 21 h
> - Vendredi | 17 h – 21 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [galibot-taproom.com](https://galibot-taproom.com) le 31 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 8. Brasserie Régal Potes — fiche nouvelle

- n : (vide) → Brasserie Régal Potes
- c : (vide) → Bibiche
- d : (vide) → 57
- lat : (vide) → 49.32221
- lon : (vide) → 6.45569
- km : (vide) → 425.2
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → On peut acheter à la brasserie du lundi au vendredi, sur rendez-vous ou l'après-midi, d'après son site. Il ne parle ni de bar ni de dégustation ouverte sur place.
- addr : (vide) → 11 rue des Lilas, 57320 Bibiche
- src : (vide) → https://www.brasserie-regal-potes.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 66 50 79 83
- contact.site : (vide) → https://www.brasserie-regal-potes.com/
- contact.source : (vide) → https://www.brasserie-regal-potes.com/
- contact.verifieLe : (vide) → 2026-10-31
- verifieLe : (vide) → 2026-10-31

Sources (vérifiée le 2026-10-31) : https://www.brasserie-regal-potes.com/ ; https://data.geopf.fr/geocodage/search?q=11+rue+des+Lilas%2C+57320+Bibiche&limit=5

Extrait lu : « directement à la brasserie du lundi au vendredi sur rendez-vous ou l'après-midi : la boutique est ouverte de 14 h à 17 h »

Choix du vérificateur : Seule ligne publiée : un portable, sur le site. Horaires non repris : la même page dit 14h-17h et, en pied de page, 9h30-16h. Pas de lien Untappd.

**Aperçu de la fiche** (état du moment calculé le samedi 31 octobre 2026 à 17:26, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 11 rue des Lilas, 57320 Bibiche
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+R%C3%A9gal+Potes+Bibiche)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+R%C3%A9gal+Potes&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 66 50 79 83](tel:+33666507983)
> - [Site de la brasserie](https://www.brasserie-regal-potes.com/)
> - Lu sur [brasserie-regal-potes.com](https://www.brasserie-regal-potes.com/) le 31 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : e21cc647a624
