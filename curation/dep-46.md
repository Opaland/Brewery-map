# Lot dep-46 — le Lot (S348)

Ce lot ajoute **7 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 20 candidats = 7 proposés + 13 non proposés (tableau ci-dessous).
Catégories proposées : 2 « acheter et consommer », 3 « acheter seulement », 0 « pas de vente », 2 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| KEG & MALT SOCIETY (`sirene:877660480`) | aucune page à ce nom (22/11) |
| LA KALOT (`sirene:900297219`) | un annuaire seulement (22/11) |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE DU SOL DE L'OSTE (`sirene:898906177`) | aucune page à ce nom (22/11) |
| BRASSERIE DUNE (`sirene:895392306`) | aucune page à ce nom (22/11) |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| MICRO BRASSERIE MENEKET (`sirene:841374960`) | un annuaire seulement, à une autre commune (22/11) |
| La cuvée des Dracs (`node/13401912380`) | aucune page à ce nom (22/11) |
| Brasserie Artisanale Ratz (`node/6617820661`) | même lieu que sirene:435093281 (Brasserie Artisanale Ratz) |
| Brasserie du Matou (`node/7761735285`) | à relancer : son site répondait 503 ; l'office ne dit ni vente ni bar (22/11) |
| Brasserie Les Bartas (`way/1385648157`) | aucune page à ce nom (22/11) |
| Brasserie La Boheme (`way/618503204`) | son domaine n'existe plus ; aucune autre page (22/11) |

## Les fiches proposées

## Lot dep-46 — 0 proposition(s), 7 fiche(s) nouvelle(s)

### 1. Brasserie Artisanale Ratz — fiche nouvelle

- n : (vide) → Brasserie Artisanale Ratz
- c : (vide) → Fontanes
- d : (vide) → 46
- lat : (vide) → 44.34763
- lon : (vide) → 1.47429
- km : (vide) → 297.1
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Brasserie près de Cahors : boutique ouverte du lundi au samedi de 9 h à 19 h d'avril à octobre et de 9 h à 18 h de novembre à mars, fermée le dimanche et les jours fériés ; bar à l'intérieur ou terrasse (beer garden) selon la saison, sans heures dites ; visites sur rendez-vous, d'après son site.
- addr : (vide) → 725 route de Saint-Exupéry, 46230 Fontanes
- src : (vide) → https://biereratz.fr/la-boutique-et-le-bar/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 05 65 53 05 63
- contact.site : (vide) → https://www.biereratz.fr
- contact.source : (vide) → https://www.biereratz.fr
- contact.verifieLe : (vide) → 2026-11-22
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 9 h – 19 h
- horaires.0.mar : (vide) → 9 h – 19 h
- horaires.0.mer : (vide) → 9 h – 19 h
- horaires.0.jeu : (vide) → 9 h – 19 h
- horaires.0.ven : (vide) → 9 h – 19 h
- horaires.0.sam : (vide) → 9 h – 19 h
- horaires.0.dim : (vide) → fermé
- horaires.0.periode.du : (vide) → 04-01
- horaires.0.periode.au : (vide) → 10-31
- horaires.0.source : (vide) → https://biereratz.fr/la-boutique-et-le-bar/
- horaires.0.verifieLe : (vide) → 2026-11-22
- horaires.1.nature : (vide) → vente
- horaires.1.lun : (vide) → 9 h – 18 h
- horaires.1.mar : (vide) → 9 h – 18 h
- horaires.1.mer : (vide) → 9 h – 18 h
- horaires.1.jeu : (vide) → 9 h – 18 h
- horaires.1.ven : (vide) → 9 h – 18 h
- horaires.1.sam : (vide) → 9 h – 18 h
- horaires.1.dim : (vide) → fermé
- horaires.1.periode.du : (vide) → 11-01
- horaires.1.periode.au : (vide) → 03-31
- horaires.1.source : (vide) → https://biereratz.fr/la-boutique-et-le-bar/
- horaires.1.verifieLe : (vide) → 2026-11-22
- verifieLe : (vide) → 2026-11-22

Sources (vérifiée le 2026-11-22) : https://biereratz.fr/la-boutique-et-le-bar/ ; https://www.biereratz.fr ; https://data.geopf.fr/geocodage/search?q=725+route+de+Saint-Exup%C3%A9ry%2C+46230+Fontanes&limit=5

Extrait lu : « Retrouvez nos bières artisanales en vente dans la boutique de la Brasserie »

Choix du vérificateur : Site officiel et fiche de l'office d'Occitanie relus sur la page brute le 22/11 (« Avril - Octobre : Du lundi au samedi 9H - 19H », « Novembre - Mars : Du lundi au samedi 9H - 18H », « Fermeture le dimanche et les jours fériés. »). Le point OSM de Fontanes est la même brasserie. Fixe publié par la brasserie.

**Aperçu de la fiche** (état du moment calculé le dimanche 22 novembre 2026 à 08:14, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 8 h 14 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 9 h.
> - Adresse
> - 725 route de Saint-Exupéry, 46230 Fontanes
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Artisanale+Ratz&type=brewery)
> - Joindre la brasserie
> - [Appeler le 05 65 53 05 63](tel:+33565530563)
> - [Site de la brasserie](https://www.biereratz.fr)
> - Horaires
> - Horaires de vente, du 1er avril au 31 octobre
> - Lundi | 9 h – 19 h
> - Mardi | 9 h – 19 h
> - Mercredi | 9 h – 19 h
> - Jeudi | 9 h – 19 h
> - Vendredi | 9 h – 19 h
> - Samedi | 9 h – 19 h
> - Dimanche | fermé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Horaires de vente, du 1er novembre au 31 mars
> - Lundi | 9 h – 18 h
> - Mardi | 9 h – 18 h
> - Mercredi | 9 h – 18 h
> - Jeudi | 9 h – 18 h
> - Vendredi | 9 h – 18 h
> - Samedi | 9 h – 18 h
> - Dimanche | fermé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [biereratz.fr](https://biereratz.fr/la-boutique-et-le-bar/) le 22 novembre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 2. Zymotik — fiche nouvelle

- n : (vide) → Zymotik
- c : (vide) → Cahors
- d : (vide) → 46
- lat : (vide) → 44.44131
- lon : (vide) → 1.40549
- km : (vide) → 296.6
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Micro-brasserie école : vente à la brasserie tous les vendredis de 17 h à 19 h et sur les marchés, stages de brassage, d'après l'office de tourisme d'Occitanie et son site. Aucun bar ni dégustation dits.
- addr : (vide) → 585 chemin de Rode Limau, 46000 Cahors
- src : (vide) → https://www.tourisme-occitanie.com/fr/fiche/degustation/micro-brasserie-ecole-zymotik-cahors_TFODEGMIP046V51D2AX/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.zymotik.fr/
- contact.source : (vide) → https://www.zymotik.fr/
- contact.verifieLe : (vide) → 2026-11-22
- horaires.0.nature : (vide) → vente
- horaires.0.ven : (vide) → 17 h – 19 h
- horaires.0.source : (vide) → https://www.tourisme-occitanie.com/fr/fiche/degustation/micro-brasserie-ecole-zymotik-cahors_TFODEGMIP046V51D2AX/
- horaires.0.verifieLe : (vide) → 2026-11-22
- verifieLe : (vide) → 2026-11-22

Sources (vérifiée le 2026-11-22) : https://www.tourisme-occitanie.com/fr/fiche/degustation/micro-brasserie-ecole-zymotik-cahors_TFODEGMIP046V51D2AX/ ; https://www.zymotik.fr/ ; https://data.geopf.fr/geocodage/search?q=585+chemin+de+Rode+Limau%2C+46000+Cahors&limit=5

Extrait lu : « Vente directement à la brasserie tous les vendredis de 17h à 19h »

Choix du vérificateur : Fiche de l'office d'Occitanie et site officiel relus sur la page brute le 22/11 (« Zymotik est ouvert tous les vendredis de 17h à 19h »). Le portable de l'office est écarté ; le site n'en publie aucun.

**Aperçu de la fiche** (état du moment calculé le dimanche 22 novembre 2026 à 08:14, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 8 h 14 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 585 chemin de Rode Limau, 46000 Cahors
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Zymotik+Cahors)[Ses bières sur Untappd](https://untappd.com/search?q=Zymotik&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.zymotik.fr/)
> - Horaires
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 17 h – 19 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [tourisme-occitanie.com](https://www.tourisme-occitanie.com/fr/fiche/degustation/micro-brasserie-ecole-zymotik-cahors_TFODEGMIP046V51D2AX/) le 22 novembre 2026. Lu sur [zymotik.fr](https://www.zymotik.fr/) le 22 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 3. Les Bières de Julien — fiche nouvelle

- n : (vide) → Les Bières de Julien
- c : (vide) → Martel
- d : (vide) → 46
- lat : (vide) → 44.93655
- lon : (vide) → 1.60708
- km : (vide) → 259.4
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Rendez-vous tous les vendredis après-midi de 14 h à 18 h sur le lieu de production, à Layrac, d'après son site, qui donne un numéro pour les commandes de bouteilles ; le mot « vente » n'y est pas, ni bar ni dégustation. Pas de carte bancaire.
- addr : (vide) → Layrac, 46600 Martel
- src : (vide) → https://www.lesbieresdejulien.fr/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 09 51 46 04 61
- contact.site : (vide) → https://www.lesbieresdejulien.fr/
- contact.source : (vide) → https://www.lesbieresdejulien.fr/
- contact.verifieLe : (vide) → 2026-11-22
- horaires.0.nature : (vide) → vente
- horaires.0.ven : (vide) → 14 h – 18 h
- horaires.0.remarque : (vide) → Rendez-vous au lieu de production ; le site parle de commandes de bouteilles.
- horaires.0.source : (vide) → https://www.lesbieresdejulien.fr/
- horaires.0.verifieLe : (vide) → 2026-11-22
- verifieLe : (vide) → 2026-11-22

Sources (vérifiée le 2026-11-22) : https://www.lesbieresdejulien.fr/ ; https://data.geopf.fr/geocodage/search?q=Martel&type=municipality&limit=5

Extrait lu : « Tous les vendredi après-midi de 14 h à 18 h. »

Choix du vérificateur : Site officiel relu sur la page brute le 22/11. Fixe publié par la brasserie ; son portable est écarté, puisqu'un fixe existe. L'office donne une autre heure de fermeture : le site est retenu. Une fermeture exceptionnelle sans année n'est pas reprise. Confiance moyenne : le site ne dit pas « vente » en toutes lettres (revue de la persona du 22/11).

**Aperçu de la fiche** (état du moment calculé le dimanche 22 novembre 2026 à 08:14, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 8 h 14 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - Layrac, 46600 Martel
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Les+Bi%C3%A8res+de+Julien&type=brewery)
> - Joindre la brasserie
> - [Appeler le 09 51 46 04 61](tel:+33951460461)
> - [Site de la brasserie](https://www.lesbieresdejulien.fr/)
> - Horaires
> - À savoir : Rendez-vous au lieu de production ; le site parle de commandes de bouteilles.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 14 h – 18 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [lesbieresdejulien.fr](https://www.lesbieresdejulien.fr/) le 22 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 4. Brasserie Les Acolytes — fiche nouvelle

- n : (vide) → Brasserie Les Acolytes
- c : (vide) → Luzech
- d : (vide) → 46
- lat : (vide) → 44.48158
- lon : (vide) → 1.27682
- km : (vide) → 303.5
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie bio au château Les Croisille, à Fages : visites couplées du château et de la brasserie, d'après l'office de tourisme d'Occitanie. Ni vente ni dégustation ne sont dites.
- addr : (vide) → Fages, 46140 Luzech
- src : (vide) → https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-les-acolytes-luzech_TFODEGMIP046V51KLQ1/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.site : (vide) → https://www.brasserielesacolytes.fr/
- contact.source : (vide) → https://www.brasserielesacolytes.fr/
- contact.verifieLe : (vide) → 2026-11-22
- verifieLe : (vide) → 2026-11-22

Sources (vérifiée le 2026-11-22) : https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-les-acolytes-luzech_TFODEGMIP046V51KLQ1/ ; https://www.brasserielesacolytes.fr/ ; https://data.geopf.fr/geocodage/search?q=Luzech&type=municipality&limit=5

Extrait lu : « Visite couplée du château Les Croisille et de la brasserie Les Acolytes. »

Choix du vérificateur : Fiche de l'office d'Occitanie et site officiel relus sur la page brute le 22/11. Le portable de l'office est écarté ; le site n'en publie aucun.

**Aperçu de la fiche** (état du moment calculé le dimanche 22 novembre 2026 à 08:14, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - Fages, 46140 Luzech
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Les+Acolytes+Luzech)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Les+Acolytes&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.brasserielesacolytes.fr/)
> - Lu sur [tourisme-occitanie.com](https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-les-acolytes-luzech_TFODEGMIP046V51KLQ1/) le 22 novembre 2026. Lu sur [brasserielesacolytes.fr](https://www.brasserielesacolytes.fr/) le 22 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 5. Brasserie Malt'O'Vadrouille — fiche nouvelle

- n : (vide) → Brasserie Malt'O'Vadrouille
- c : (vide) → Concorès
- d : (vide) → 46
- lat : (vide) → 44.65692
- lon : (vide) → 1.39467
- km : (vide) → 286.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Bières brassées et vendues sur place, à boire sur place ou à emporter, et sur les marchés, d'après son site ; heures d'ouverture non dites. Visite payante avec dégustation, sur réservation, les samedis après-midi de juin à septembre (14 h-17 h).
- addr : (vide) → 75 Route de Cahors, 46310 Concorès
- src : (vide) → https://www.maltovadrouille.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 64 56 12 30
- contact.site : (vide) → https://www.maltovadrouille.fr/
- contact.source : (vide) → https://www.maltovadrouille.fr/
- contact.verifieLe : (vide) → 2026-11-22
- verifieLe : (vide) → 2026-11-22

Sources (vérifiée le 2026-11-22) : https://www.maltovadrouille.fr/ ; https://data.geopf.fr/geocodage/search?q=75+Route+de+Cahors%2C+46310+Concor%C3%A8s&limit=5

Extrait lu : « disponibles à la vente sur place »

Choix du vérificateur : Site officiel et fiche de l'office d'Occitanie relus sur la page brute le 22/11. Adresse de l'office et du registre (Concorès), comme le titre du site. Le seul numéro publié par la brasserie est un portable (règle du 21/10). Catégorie 1 : le site dit « boire un verre sur place » et la vente sur place (revue de la persona du 22/11). Les heures de visite, sur réservation, restent dans la note.

**Aperçu de la fiche** (état du moment calculé le dimanche 22 novembre 2026 à 08:14, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 75 Route de Cahors, 46310 Concorès
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Malt%27O%27Vadrouille+Concor%C3%A8s)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Malt%27O%27Vadrouille&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 64 56 12 30](tel:+33664561230)
> - [Site de la brasserie](https://www.maltovadrouille.fr/)
> - Lu sur [maltovadrouille.fr](https://www.maltovadrouille.fr/) le 22 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 6. Bière KOS – Mas du Verdier — fiche nouvelle

- n : (vide) → Bière KOS – Mas du Verdier
- c : (vide) → Cajarc
- d : (vide) → 46
- lat : (vide) → 44.51656
- lon : (vide) → 1.85665
- km : (vide) → 261.4
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie et miellerie bio qui se visite : visite d'environ une heure, terminée par une dégustation, sur contact, d'après son site. La vente sur place et les horaires ne sont pas dits.
- addr : (vide) → 725 chemin du Pigeonnier, Le Verdier, 46160 Cajarc
- src : (vide) → https://www.masduverdier.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 76 96 16 53
- contact.site : (vide) → https://www.masduverdier.fr/
- contact.source : (vide) → https://www.masduverdier.fr/
- contact.verifieLe : (vide) → 2026-11-22
- verifieLe : (vide) → 2026-11-22

Sources (vérifiée le 2026-11-22) : https://www.masduverdier.fr/ ; https://data.geopf.fr/geocodage/search?q=725+chemin+du+Pigeonnier%2C+Le+Verdier%2C+46160+Cajarc&limit=5

Extrait lu : « nous organisons des visites de notre brasserie »

Choix du vérificateur : Site officiel et fiche de l'office d'Occitanie relus sur la page brute le 22/11. Catégorie 2 : la dégustation est liée à la visite. La brasserie ne publie que deux portables ; le premier, aussi donné par l'office, est repris (règle du 21/10). Adresse du site (revue de la persona du 22/11).

**Aperçu de la fiche** (état du moment calculé le dimanche 22 novembre 2026 à 08:14, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 725 chemin du Pigeonnier, Le Verdier, 46160 Cajarc
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Bi%C3%A8re+KOS+%E2%80%93+Mas+du+Verdier+Cajarc)[Ses bières sur Untappd](https://untappd.com/search?q=Bi%C3%A8re+KOS+%E2%80%93+Mas+du+Verdier&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 76 96 16 53](tel:+33676961653)
> - [Site de la brasserie](https://www.masduverdier.fr/)
> - Lu sur [masduverdier.fr](https://www.masduverdier.fr/) le 22 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 7. Buvett — fiche nouvelle

- n : (vide) → Buvett
- c : (vide) → Assier
- d : (vide) → 46
- lat : (vide) → 44.67958
- lon : (vide) → 1.87905
- km : (vide) → 251.1
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Bar d'Assier inspiré des pubs, qui brasse ses bières sur place, ouvert les jeudis, vendredis et samedis soir, d'après l'office de tourisme d'Occitanie. La vente à emporter n'est pas dite ; aucun horaire précis publié.
- addr : (vide) → 46320 Assier
- src : (vide) → https://www.tourisme-occitanie.com/fr/fiche/restauration/buvett-assier_TFORESMIP046V52KYJZ/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- verifieLe : (vide) → 2026-11-22

Sources (vérifiée le 2026-11-22) : https://www.tourisme-occitanie.com/fr/fiche/restauration/buvett-assier_TFORESMIP046V52KYJZ/ ; https://data.geopf.fr/geocodage/search?q=Assier&type=municipality&limit=5

Extrait lu : « L’activité principale reste la production de bières artisanales, brassées sur place avec des ingrédients locaux »

Choix du vérificateur : Fiche de l'office d'Occitanie relue sur la page brute le 22/11. Catégorie 0 : un bar sans vente dite (règle du 18/11). Les adresses du registre et d'un annuaire diffèrent : la fiche part au centre de la commune. La page de l'office nomme les gérants : aucun nom repris. Le fixe de l'office n'est pas rattaché à la brasserie avec certitude : non repris.

**Aperçu de la fiche** (état du moment calculé le dimanche 22 novembre 2026 à 08:14, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Pas encore dans la fiche : son adresse, son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Buvett+Assier)[Ses bières sur Untappd](https://untappd.com/search?q=Buvett&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [tourisme-occitanie.com](https://www.tourisme-occitanie.com/fr/fiche/restauration/buvett-assier_TFORESMIP046V52KYJZ/) le 22 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

Empreinte du lot : 8c8b8e692899
