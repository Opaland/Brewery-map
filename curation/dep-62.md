# Lot dep-62 — le Pas-de-Calais (S344)

Ce lot ajoute **10 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 70 candidats = 10 proposés + 60 non proposés (tableau ci-dessous).
Catégories proposées : 6 « acheter et consommer », 1 « acheter seulement », 0 « pas de vente », 3 « à confirmer ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| BRASSERIE DE SAINT-OMER (`sirene:455502088`) | lu le 28/10 : la même brasserie industrielle que Goudale (Arques), sans lieu ouvert à cette adresse |
| LA BRASSERIE DU GOULOT (`sirene:854024254`) | lu le 28/10 : le site répond 404 au contrôle, bien qu’il réponde à un navigateur ; à relancer |
| AHBA (`sirene:812526374`) | lu le 28/10 : un annuaire seul |
| LE CAMPAGNON (`sirene:949587646`) | lu le 28/10 : aucune source |
| L'ARRAS'IN (`sirene:850242306`) | lu le 28/10 : Untappd seul, rien sur ce qu’on peut y faire |
| BRASSERIE DE LA LYS (`sirene:103526588`) | lu le 28/10 : une brasserie historique fermée |
| BRASSERIE DUBOIS (`sirene:879179786`) | lu le 28/10 : aucune source |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| SARL MICROBRASSERIE BON VENT (`sirene:910591346`) | lu le 28/10 : un article de presse seul |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE ARTESIENNE (`sirene:499451045`) | lu le 28/10 : site en erreur 503, annuaires seuls ; à relancer quand le site répond |
| MICROBRASSERIE GAUDIA (`sirene:944313824`) | lu le 28/10 : aucune source |
| Entreprise individuelle (`personne:5`) | lu le 28/10 : le registre seul |
| BRASSERIE DE LA HAUTE VALLEE (`sirene:532525250`) | lu le 28/10 : un annuaire seul |
| LES VENTS SAUVAGES (`sirene:908620693`) | lu le 28/10 : aucune source |
| Entreprise individuelle (`personne:6`) | lu le 28/10 : aucune source |
| BRUSSEL'S CAFFE (`sirene:432424539`) | lu le 28/10 : aucune source ; rien ne dit qu’il brasse |
| BRASSERIE L'INTEMPORELLE (`sirene:830231056`) | lu le 28/10 : l’office seul, qui ne dit pas qu’on y brasse ; à relancer, pour le comparer à Funquet et Clairmarais (catégorie 0 sur office) |
| BCA2 (`sirene:843527326`) | lu le 28/10 : son site dit « Pas d’ouverture au public » |
| LES BRASSEURS DES TERRES D'OPALE (`sirene:840053771`) | lu le 28/10 : site en maintenance ; à relancer |
| BRASSERIE PERSYN (`sirene:989657648`) | lu le 28/10 : une annonce légale seule |
| BRASSERIE ARTISANALE WHITE STAR (`sirene:847719226`) | lu le 28/10 : un annuaire seul |
| Entreprise individuelle (`personne:7`) | lu le 28/10 : aucune source |
| BRASSERIE LA FLIBUSTIERE (`sirene:902026764`) | lu le 28/10 : aucune source |
| CHRISTOPHE NOYON BRASSEUR (`sirene:447931015`) | lu le 28/10 : même lieu que « Brasserie des 2 Caps » (node/4829087299) ; voir sa raison |
| NPDC BOISSONS (`sirene:452672942`) | lu le 28/10 : le registre seul |
| AUTOBRASSEUR (`sirene:801339425`) | lu le 28/10 : aucune source |
| MICRO BRASSERIE COTE D'HOP (`sirene:925180184`) | lu le 28/10 : annuaires seuls |
| NORD COAST DISTRIBUTION (`sirene:951612001`) | lu le 28/10 : le registre seul ; un distributeur |
| BARON CERF (`sirene:850700170`) | lu le 28/10 : aucune source |
| Entreprise individuelle (`personne:8`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:9`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE REGIONALE BERNEVILLOISE (`sirene:106125008`) | lu le 28/10 : aucune source |
| Entreprise individuelle (`personne:10`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE GORA (`sirene:947876793`) | lu le 28/10 : même adresse que la Brasserie des 7 Bonnettes (way/245646436) ; voir sa raison |
| Entreprise individuelle (`personne:11`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE BLANC MONT (`sirene:948579982`) | lu le 28/10 : aucune source |
| LES CRAPAUDS FOUS (`sirene:939459087`) | lu le 28/10 : un article de presse seul ; site introuvable |
| BRASSERIE GRANDES MAREES (`sirene:950790048`) | lu le 28/10 : un annuaire seul |
| Entreprise individuelle (`personne:12`) | entreprise sans nom ni adresse : rien à chercher |
| LA BRECHE BRASSERIE CRAFT (`sirene:901257766`) | lu le 28/10 : le registre seul |
| M.Y CAVE (`sirene:901499871`) | lu le 28/10 : aucune source |
| LA BRASSERIE DES 3 CLOCHERS (`sirene:814499448`) | lu le 28/10 : aucune source |
| VOXEL BREWING (`sirene:922047782`) | lu le 28/10 : aucune source |
| LA LICQUOISE (`sirene:911574572`) | lu le 28/10 : une page de marque régionale seule |
| LA CONFRERIE DU HOUBLON (`sirene:912195666`) | lu le 28/10 : aucune source |
| THOR BOYAUX (`sirene:923118145`) | lu le 28/10 : aucune source |
| Entreprise individuelle (`personne:13`) | entreprise sans nom ni adresse : rien à chercher |
| BCA2 – La Riviere (`node/10098741164`) | lu le 28/10 : son site dit « Pas d’ouverture au public » |
| La Chope de l’Artois (`node/11968427517`) | lu le 28/10 : un article seul |
| Micro brasserie L'estoupette (`node/11978102348`) | lu le 28/10 : quota de recherches épuisé ; à relancer |
| At Home Bière Athies (`node/12459262301`) | lu le 28/10 : un atelier de brassage, pas une brasserie qui vend |
| Brasserie de La Lawe (`node/12459402001`) | lu le 28/10 : quota de recherches épuisé ; à relancer |
| Brasserie des 2 Caps (`node/4829087299`) | lu le 28/10 : le site (2caps.fr) refuse la lecture automatique (403) : le contrôle ne peut pas relire l’extrait ; à relancer |
| Brasserie Brebis Galeuse (`node/8293229023`) | lu le 28/10 : son site renvoie vers une brasserie de Roubaix ; rien à Roëllecourt |
| MINE DE RIEN (`way/106130196`) | lu le 28/10 : aucune source |
| Brasserie des 7 Bonnettes (`way/245646436`) | lu le 28/10 : le site refuse la lecture automatique (406) : le contrôle ne peut pas relire l’extrait ; à relancer |
| Brasserie Paysanne de l'Artois (`way/641318870`) | lu le 28/10 : site en erreur 503 ; à relancer quand le site répond |

## Les fiches proposées

## Lot dep-62 — 0 proposition(s), 10 fiche(s) nouvelle(s)

### 1. Brasserie Castelain — fiche nouvelle

- n : (vide) → Brasserie Castelain
- c : (vide) → Bénifontaine
- d : (vide) → 62
- lat : (vide) → 50.4858
- lon : (vide) → 2.83154
- km : (vide) → 553.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Le Spot, musée de la brasserie, avec un espace de dégustation et une boutique, d’après un portail de tourisme.
- addr : (vide) → 13 rue Pasteur, 62410 Bénifontaine
- src : (vide) → https://www.francevelotourisme.com/loisirs/musees-et-sites-touristiques/le-spot-musee-de-la-brasserie-castelain
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 21 08 68 68
- contact.site : (vide) → http://brasseriecastelain.com/
- contact.source : (vide) → http://brasseriecastelain.com/
- contact.verifieLe : (vide) → 2026-10-28
- verifieLe : (vide) → 2026-10-28

Sources (vérifiée le 2026-10-28) : https://www.francevelotourisme.com/loisirs/musees-et-sites-touristiques/le-spot-musee-de-la-brasserie-castelain ; http://brasseriecastelain.com/ ; https://data.geopf.fr/geocodage/search?q=13+rue+Pasteur%2C+62410+B%C3%A9nifontaine&limit=5

Extrait lu : « L’espace muséal, l’espace dégustation, l’espace extérieur et la boutique vous feront vivre une expérience 360° »

Choix du vérificateur : Site relu à la main le 28/10. Source de la catégorie : un portail de tourisme, d’où la confiance moyenne. Téléphone du site de la brasserie ; celui du portail écarté. Horaires d’annuaire non repris.

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 01:35, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 13 rue Pasteur, 62410 Bénifontaine
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Castelain+B%C3%A9nifontaine)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Castelain&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 03 21 08 68 68](tel:+33321086868)
> - [Site de la brasserie](http://brasseriecastelain.com/)
> - Lu sur [francevelotourisme.com](https://www.francevelotourisme.com/loisirs/musees-et-sites-touristiques/le-spot-musee-de-la-brasserie-castelain) le 28 octobre 2026. Lu sur [brasseriecastelain.com](http://brasseriecastelain.com/) le 28 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 2. Brasserie Saint-Germain (Page 24) — fiche nouvelle

- n : (vide) → Brasserie Saint-Germain (Page 24)
- c : (vide) → Aix-Noulette
- d : (vide) → 62
- lat : (vide) → 50.42527
- lon : (vide) → 2.71352
- km : (vide) → 549.6
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Magasin et TapRoom à la brasserie, d’après son site.
- addr : (vide) → 26 route d'Arras, 62160 Aix-Noulette
- src : (vide) → https://www.page24.fr/nous-visiter
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 21 72 24 24
- contact.site : (vide) → https://www.page24.fr/
- contact.source : (vide) → https://www.page24.fr/nous-visiter
- contact.verifieLe : (vide) → 2026-10-28
- horaires.0.nature : (vide) → accueil
- horaires.0.mer : (vide) → 14 h – 20 h
- horaires.0.jeu : (vide) → 14 h – 20 h
- horaires.0.ven : (vide) → 14 h – 22 h
- horaires.0.sam : (vide) → 9 h – 18 h
- horaires.0.remarque : (vide) → TapRoom ; fermé les jours fériés.
- horaires.0.source : (vide) → https://www.page24.fr/nous-visiter
- horaires.0.verifieLe : (vide) → 2026-10-28
- verifieLe : (vide) → 2026-10-28

Sources (vérifiée le 2026-10-28) : https://www.page24.fr/nous-visiter ; https://data.geopf.fr/geocodage/search?q=26+route+d%27Arras%2C+62160+Aix-Noulette&limit=5

Extrait lu : « A côté de notre magasin se cache notre TapRoom où il vous est possible de déguster nos bières. »

Choix du vérificateur : Site relu à la main le 28/10. Seul numéro publié. Horaires du bar (TapRoom) ; ceux du magasin, sur la même page, ne passent pas le contrôle (heures de midi non relues) : non saisis.

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 01:35, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 1 h 35 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 14 h, sous réserve.
> - Adresse
> - 26 route d'Arras, 62160 Aix-Noulette
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Saint-Germain+%28Page+24%29&type=brewery)
> - Joindre la brasserie
> - [Appeler le 03 21 72 24 24](tel:+33321722424)
> - [Site de la brasserie](https://www.page24.fr/)
> - Horaires
> - À savoir : TapRoom ; fermé les jours fériés.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 14 h – 20 h
> - Jeudi | 14 h – 20 h
> - Vendredi | 14 h – 22 h
> - Samedi | 9 h – 18 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [page24.fr](https://www.page24.fr/nous-visiter) le 28 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 3. Brasserie Goudale — fiche nouvelle

- n : (vide) → Brasserie Goudale
- c : (vide) → Arques
- d : (vide) → 62
- lat : (vide) → 50.72892
- lon : (vide) → 2.33027
- km : (vide) → 590
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Visite guidée de la brasserie, du lundi au vendredi, qui se termine au bar par une dégustation ; une boutique vend ses bières. Le bar n’a pas d’horaires publiés hors visite. Pas d’accueil le samedi.
- addr : (vide) → 365 Avenue Isaac Newton, 62510 Arques
- src : (vide) → https://brasserie-goudale.com/en/visit-goudale/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 03 66 10 01 60
- contact.site : (vide) → https://brasserie-goudale.com/
- contact.source : (vide) → https://brasserie-goudale.com/en/visit-goudale/
- contact.verifieLe : (vide) → 2026-10-28
- verifieLe : (vide) → 2026-10-28

Sources (vérifiée le 2026-10-28) : https://brasserie-goudale.com/en/visit-goudale/ ; https://data.geopf.fr/geocodage/search?q=365+Avenue+Isaac+Newton%2C+62510+Arques&limit=5

Extrait lu : « Your visit will end at the brewery bar with a tasting session. »

Choix du vérificateur : Site relu à la main le 28/10. Confiance moyenne : on boit sur place à la fin d’une visite guidée, pas dans un bar ouvert à heures fixes. Téléphone de la page des visites. Horaires de la boutique non saisis : le site et l’office se contredisent sur le samedi.

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 01:35, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 365 Avenue Isaac Newton, 62510 Arques
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Goudale+Arques)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Goudale&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 03 66 10 01 60](tel:+33366100160)
> - [Site de la brasserie](https://brasserie-goudale.com/)
> - Lu sur [brasserie-goudale.com](https://brasserie-goudale.com/en/visit-goudale/) le 28 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 4. Brasserie du Funquet — fiche nouvelle

- n : (vide) → Brasserie du Funquet
- c : (vide) → Escœuilles
- d : (vide) → 62
- lat : (vide) → 50.7274
- lon : (vide) → 1.92314
- km : (vide) → 599.6
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Microbrasserie installée en 2014, d’après l’office de tourisme de Saint-Omer. Ce qu’on peut y faire n’est pas écrit en toutes lettres : à confirmer.
- addr : (vide) → 19 rue de la Tirée, 62850 Escœuilles
- src : (vide) → https://en.tourisme-saintomer.com/offres/brasserie-du-funquet-escoeuilles-en-3606376/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-28

Sources (vérifiée le 2026-10-28) : https://en.tourisme-saintomer.com/offres/brasserie-du-funquet-escoeuilles-en-3606376/ ; https://data.geopf.fr/geocodage/search?q=19+rue+de+la+Tir%C3%A9e%2C+62850+Esc%C5%93uilles&limit=5

Extrait lu : « The Funquet brewery is a traditional microbrewery, set up in 2014 in the heart of the village of Escœuilles »

Choix du vérificateur : Site relu à la main le 28/10. Office de tourisme seul ; son mobile n’est pas repris, ses horaires sont marqués non garantis. Le site de la brasserie refuse la lecture (403).

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 01:35, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 19 rue de la Tirée, 62850 Escœuilles
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+du+Funquet+Esc%C5%93uilles)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Funquet&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [en.tourisme-saintomer.com](https://en.tourisme-saintomer.com/offres/brasserie-du-funquet-escoeuilles-en-3606376/) le 28 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 5. Brasserie Quentovic — fiche nouvelle

- n : (vide) → Brasserie Quentovic
- c : (vide) → Beaurainville
- d : (vide) → 62
- lat : (vide) → 50.4226
- lon : (vide) → 1.89932
- km : (vide) → 568.9
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Boutique et bar à la brasserie : on boit ses bières à côté des cuves et on les achète à emporter, d’après son site.
- addr : (vide) → Beaurainville
- src : (vide) → https://quentovic.com/vente-emporter-biere-artisanale-epicerie-cavisite/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 09 51 67 48 49
- contact.site : (vide) → https://quentovic.com/
- contact.source : (vide) → https://quentovic.com/contact/
- contact.verifieLe : (vide) → 2026-10-28
- horaires.0.nature : (vide) → accueil
- horaires.0.ven : (vide) → 15 h – 19 h
- horaires.0.sam : (vide) → 10 h – 18 h
- horaires.0.remarque : (vide) → Aussi le jeudi de 15h à 19h en juillet et août. Fermée les jours fériés et pendant les fêtes de fin d’année.
- horaires.0.periode.du : (vide) → 05-01
- horaires.0.periode.au : (vide) → 09-30
- horaires.0.source : (vide) → https://quentovic.com/vente-emporter-biere-artisanale-epicerie-cavisite/
- horaires.0.verifieLe : (vide) → 2026-10-28
- horaires.1.nature : (vide) → accueil
- horaires.1.ven : (vide) → 15 h – 19 h
- horaires.1.remarque : (vide) → Fermée les jours fériés et pendant les fêtes de fin d’année.
- horaires.1.periode.du : (vide) → 10-01
- horaires.1.periode.au : (vide) → 04-30
- horaires.1.source : (vide) → https://quentovic.com/vente-emporter-biere-artisanale-epicerie-cavisite/
- horaires.1.verifieLe : (vide) → 2026-10-28
- verifieLe : (vide) → 2026-10-28

Sources (vérifiée le 2026-10-28) : https://quentovic.com/vente-emporter-biere-artisanale-epicerie-cavisite/ ; https://quentovic.com/contact/ ; https://data.geopf.fr/geocodage/search?q=Beaurainville&type=municipality&limit=5

Extrait lu : « Dégustez nos bières à côté des cuves. D’autres boissons sont disponibles. »

Choix du vérificateur : Site relu à la main le 28/10. Horaires par saison, tels que le site les écrit (« Mai à Septembre : Vendredi de 15h à 19h, Samedi de 10h à 18h » ; « Octobre à Avril : Vendredi de 15h à 19h ») ; le jeudi de juillet et d’août et la fermeture des jours fériés restent en remarque. Seul téléphone publié, page contact. Adresse non saisie : le site n’en publie pas.

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 01:35, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 1 h 35 (heure de Paris), accueil du public : la source ne dit pas les heures de ce jour.
> - Pas encore dans la fiche : son adresse et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Quentovic+Beaurainville)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Quentovic&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 09 51 67 48 49](tel:+33951674849)
> - [Site de la brasserie](https://quentovic.com/)
> - Horaires
> - À savoir : Aussi le jeudi de 15h à 19h en juillet et août. Fermée les jours fériés et pendant les fêtes de fin d’année.
> - Horaires d’accueil du public, du 1er mai au 30 septembre
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 15 h – 19 h
> - Samedi | 10 h – 18 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - À savoir : Fermée les jours fériés et pendant les fêtes de fin d’année.
> - Horaires d’accueil du public, du 1er octobre au 30 avril
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 15 h – 19 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [quentovic.com](https://quentovic.com/vente-emporter-biere-artisanale-epicerie-cavisite/) le 28 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 6. Brasserie de Mai — fiche nouvelle

- n : (vide) → Brasserie de Mai
- c : (vide) → Carvin
- d : (vide) → 62
- lat : (vide) → 50.49173
- lon : (vide) → 2.95623
- km : (vide) → 552
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Brasserie avec bar, restauration et vente à emporter (bouteilles et fûts), d’après son site.
- addr : (vide) → 50 rue Édouard Plachez, 62220 Carvin
- src : (vide) → https://brasseriedemai.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 84 21 14 53
- contact.site : (vide) → https://brasseriedemai.fr
- contact.source : (vide) → https://brasseriedemai.fr
- contact.verifieLe : (vide) → 2026-10-28
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 10 h – 12 h 30, 14 h – 19 h
- horaires.0.mer : (vide) → 10 h – 19 h
- horaires.0.jeu : (vide) → 10 h – 19 h
- horaires.0.ven : (vide) → 10 h – 21 h
- horaires.0.sam : (vide) → 10 h – 19 h
- horaires.0.remarque : (vide) → Dimanche fermé, sauf événements.
- horaires.0.source : (vide) → https://brasseriedemai.fr
- horaires.0.verifieLe : (vide) → 2026-10-28
- verifieLe : (vide) → 2026-10-28

Sources (vérifiée le 2026-10-28) : https://brasseriedemai.fr ; https://data.geopf.fr/geocodage/search?q=50+rue+%C3%89douard+Plachez%2C+62220+Carvin&limit=5

Extrait lu : « Vente à emporter (bières en bouteille et en fût) »

Choix du vérificateur : Site relu à la main le 28/10. La même ligne du site annonce le bar sur place. Téléphone de la brasserie retenu ; le mobile des mentions légales écarté. Horaires du site ; le dimanche « fermé, sauf événements » en remarque.

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 01:35, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 1 h 35 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 10 h, sous réserve.
> - Adresse
> - 50 rue Édouard Plachez, 62220 Carvin
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+Mai&type=brewery)
> - Joindre la brasserie
> - [Appeler le 09 84 21 14 53](tel:+33984211453)
> - [Site de la brasserie](https://brasseriedemai.fr)
> - Horaires
> - À savoir : Dimanche fermé, sauf événements.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 10 h – 12 h 30, 14 h – 19 h
> - Mercredi | 10 h – 19 h
> - Jeudi | 10 h – 19 h
> - Vendredi | 10 h – 21 h
> - Samedi | 10 h – 19 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedemai.fr](https://brasseriedemai.fr) le 28 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 7. Wattbeer (La Drache) — fiche nouvelle

- n : (vide) → Wattbeer (La Drache)
- c : (vide) → Carvin
- d : (vide) → 62
- lat : (vide) → 50.49544
- lon : (vide) → 2.95354
- km : (vide) → 552.5
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → La brasserie ouvre au public un samedi par mois seulement, le premier, de 10h à 19h : visite, dégustation d’une bière et vente directe, d’après son site. Fermée au public les autres jours.
- addr : (vide) → 67 rue Victor Hugo, 62220 Carvin
- src : (vide) → https://www.ladrache.fr/visites-ouvertures/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.ladrache.fr/
- contact.source : (vide) → https://www.ladrache.fr/
- contact.verifieLe : (vide) → 2026-10-28
- verifieLe : (vide) → 2026-10-28

Sources (vérifiée le 2026-10-28) : https://www.ladrache.fr/visites-ouvertures/ ; https://www.ladrache.fr/ ; https://data.geopf.fr/geocodage/search?q=67+rue+Victor+Hugo%2C+62220+Carvin&limit=5

Extrait lu : « vous pourrez déguster l’une de nos bières fraîchement brassée »

Choix du vérificateur : Site relu à la main le 28/10. Confiance moyenne : une ouverture par mois. Horaires non saisis : « le premier samedi du mois » ne s’écrit pas en semaine type. Pas de téléphone publié.

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 01:35, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 67 rue Victor Hugo, 62220 Carvin
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Wattbeer+%28La+Drache%29+Carvin)[Ses bières sur Untappd](https://untappd.com/search?q=Wattbeer+%28La+Drache%29&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.ladrache.fr/)
> - Lu sur [ladrache.fr](https://www.ladrache.fr/visites-ouvertures/) le 28 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 8. Brasserie de l'Abbaye de Clairmarais — fiche nouvelle

- n : (vide) → Brasserie de l'Abbaye de Clairmarais
- c : (vide) → Clairmarais
- d : (vide) → 62
- lat : (vide) → 50.77724
- lon : (vide) → 2.34147
- km : (vide) → 594.8
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie de bières d’abbaye à la ferme de l’abbaye, d’après l’office de tourisme de Saint-Omer. Ce qu’on peut y acheter ou y boire n’est pas écrit : à confirmer.
- addr : (vide) → 1 voie communale des murs, Ferme de l'Abbaye, 62500 Clairmarais
- src : (vide) → https://en.tourisme-saintomer.com/offres/brasserie-de-labbaye-de-clairmarais-clairmarais-en-3606411/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-28

Sources (vérifiée le 2026-10-28) : https://en.tourisme-saintomer.com/offres/brasserie-de-labbaye-de-clairmarais-clairmarais-en-3606411/ ; https://data.geopf.fr/geocodage/search?q=Clairmarais&type=municipality&limit=5

Extrait lu : « to brew abbey-style beers, as Clairmarais Abbey once housed a brewery »

Choix du vérificateur : Site relu à la main le 28/10. Office de tourisme seul ; son mobile n’est pas repris, ses horaires sont marqués non garantis.

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 01:35, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 1 voie communale des murs, Ferme de l'Abbaye, 62500 Clairmarais
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+de+l%27Abbaye+de+Clairmarais+Clairmarais)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+l%27Abbaye+de+Clairmarais&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [en.tourisme-saintomer.com](https://en.tourisme-saintomer.com/offres/brasserie-de-labbaye-de-clairmarais-clairmarais-en-3606411/) le 28 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 9. Brasserie Delbeke — fiche nouvelle

- n : (vide) → Brasserie Delbeke
- c : (vide) → Lorgies
- d : (vide) → 62
- lat : (vide) → 50.56481
- lon : (vide) → 2.78332
- km : (vide) → 563.1
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → faible
- note : (vide) → Visites et retrait de commande en semaine, sur rendez-vous, d’après son site ; la vente à la brasserie n’y est dite qu’ainsi.
- addr : (vide) → 141 route d'Estaires, 62840 Lorgies
- src : (vide) → https://www.brasseriedelbeke.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 27 61 37 27
- contact.site : (vide) → https://www.brasseriedelbeke.fr
- contact.source : (vide) → https://www.brasseriedelbeke.fr
- contact.verifieLe : (vide) → 2026-10-28
- verifieLe : (vide) → 2026-10-28

Sources (vérifiée le 2026-10-28) : https://www.brasseriedelbeke.fr ; https://data.geopf.fr/geocodage/search?q=141+route+d%27Estaires%2C+62840+Lorgies&limit=5

Extrait lu : « N'hésitez pas à nous contacter pour toute visite ou retrait de commande »

Choix du vérificateur : Site relu à la main le 28/10. Catégorie 2 en confiance faible : on retire une commande, sur rendez-vous. Seul numéro publié, un mobile : retenu. Pas d’horaires (« sur rendez-vous »).

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 01:35, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement (à vérifier)
> - Adresse
> - 141 route d'Estaires, 62840 Lorgies
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Delbeke+Lorgies)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Delbeke&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 27 61 37 27](tel:+33627613727)
> - [Site de la brasserie](https://www.brasseriedelbeke.fr)
> - Lu sur [brasseriedelbeke.fr](https://www.brasseriedelbeke.fr) le 28 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 10. Brasserie Chromatique — fiche nouvelle

- n : (vide) → Brasserie Chromatique
- c : (vide) → Outreau
- d : (vide) → 62
- lat : (vide) → 50.70685
- lon : (vide) → 1.60715
- km : (vide) → 606.1
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Son site annonce un taproom où déguster et acheter ses bières, « ouverture prochainement » : ce qu’on peut y faire aujourd’hui est à confirmer.
- addr : (vide) → 9-11 Rue du Chat Noir, 62230 Outreau
- src : (vide) → https://www.brasserie-chromatique.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.brasserie-chromatique.com
- contact.source : (vide) → https://www.brasserie-chromatique.com
- contact.verifieLe : (vide) → 2026-10-28
- verifieLe : (vide) → 2026-10-28

Sources (vérifiée le 2026-10-28) : https://www.brasserie-chromatique.com ; https://data.geopf.fr/geocodage/search?q=9-11+Rue+du+Chat+Noir%2C+62230+Outreau&limit=5

Extrait lu : « Taproom : Venez déguster et acheter nos bières directement à la brasserie ( ouverture prochainement) »

Choix du vérificateur : Site relu à la main le 28/10. Catégorie 0 : la vente et la dégustation sont annoncées « prochainement ». Téléphone et Untappd non retrouvés sur la page relue : non repris.

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 01:35, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 9-11 Rue du Chat Noir, 62230 Outreau
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Chromatique+Outreau)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Chromatique&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.brasserie-chromatique.com)
> - Lu sur [brasserie-chromatique.com](https://www.brasserie-chromatique.com) le 28 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

Empreinte du lot : e8982823308c
