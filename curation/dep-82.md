# Lot dep-82 — le Tarn-et-Garonne (S348)

Ce lot ajoute **9 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 18 candidats = 9 proposés + 9 non proposés (tableau ci-dessous).
Catégories proposées : 0 « acheter et consommer », 6 « acheter seulement », 0 « pas de vente », 3 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| BRASSERIE L'OURS BLANC (`sirene:940479298`) | aucune page ne cite une brasserie de ce nom à Orgueil : existence non établie |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE BELIER (`sirene:890887011`) | seul un annuaire la cite : existence non établie |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| Tasca Ti Celeste (`node/12619039255`) | aucune page ne cite ce lieu, ni ne dit qu'on y brasse : existence non établie |
| Brasserie de la Halle (`node/9812712905`) | classé en restauration ; aucune page lue ne dit qu'on y brasse (la fiche d'office répond 404) |
| Iron (`way/127748637`) | même brasserie que sirene:829515469 (Iron), dont le site la place route de Saint-Nauphary, à Montauban |
| Les Cabanes du Port (`way/427451690`) | guinguette, bar et restaurant d'après les offices ; aucune page ne dit qu'on y brasse |
| Chez Isa (`way/59128182`) | restaurant-brasserie (« cuisine familiale et traditionnelle », office d'Occitanie) ; aucune page ne dit qu'on y brasse |

## Les fiches proposées

## Lot dep-82 — 0 proposition(s), 9 fiche(s) nouvelle(s)

### 1. La Sun Microbrasserie — fiche nouvelle

- n : (vide) → La Sun Microbrasserie
- c : (vide) → Montauban
- d : (vide) → 82
- lat : (vide) → 44.01984
- lon : (vide) → 1.36271
- km : (vide) → 324.5
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Microbrasserie de Montauban qui loue des fûts pour tireuses, d'après son site ; l'office de Montauban dit le site « not open to the public », ouvert sur réservation, et ses bières en vente chez des cavistes de la ville.
- addr : (vide) → chemin du Ramierou, 82000 Montauban
- src : (vide) → https://lasun-biere.fr
- coordPrecision : (vide) → centre
- beers : (vide) → []
- verifieLe : (vide) → 2026-11-27

Sources (vérifiée le 2026-11-27) : https://lasun-biere.fr ; https://data.geopf.fr/geocodage/search?q=Montauban&type=municipality&limit=5

Extrait lu : « nous proposons à la location des fûts de bières pour tireuses professionnelles »

Choix du vérificateur : Site officiel et fiche de l'office relus sur la page brute le 27/11. La clé SIRENE (Délices Sun) est à la même rue. Le site écrit 2215, l'office et SIRENE 2115 : numéro de voie omis. Le portable du lien d'appel du site, aussi écrit sur l'office, n'est pas repris : le lieu n'accueille pas.

**Aperçu de la fiche** (état du moment calculé le vendredi 27 novembre 2026 à 08:30, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - chemin du Ramierou, 82000 Montauban
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Sun+Microbrasserie+Montauban)[Ses bières sur Untappd](https://untappd.com/search?q=La+Sun+Microbrasserie&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [lasun-biere.fr](https://lasun-biere.fr) le 27 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 2. Iron — fiche nouvelle

- n : (vide) → Iron
- c : (vide) → Montauban
- d : (vide) → 82
- lat : (vide) → 43.97467
- lon : (vide) → 1.41329
- km : (vide) → 324.2
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → solide
- note : (vide) → Brasserie et distillerie de Montauban, avec une boutique sur place, du lundi au vendredi de 9 h à 17 h, sur les horaires de production, d'après son site. Rien ne dit qu'on peut y boire sur place. Téléphone publié par la brasserie : 06 45 15 84 10.
- addr : (vide) → 4905 route de Saint-Nauphary, 82000 Montauban
- src : (vide) → https://brasserie-iron.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://brasserie-iron.com/
- contact.source : (vide) → https://brasserie-iron.com/
- contact.verifieLe : (vide) → 2026-11-27
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 9 h – 17 h
- horaires.0.mar : (vide) → 9 h – 17 h
- horaires.0.mer : (vide) → 9 h – 17 h
- horaires.0.jeu : (vide) → 9 h – 17 h
- horaires.0.ven : (vide) → 9 h – 17 h
- horaires.0.remarque : (vide) → Sur les horaires de production.
- horaires.0.source : (vide) → https://brasserie-iron.com/
- horaires.0.verifieLe : (vide) → 2026-11-27
- verifieLe : (vide) → 2026-11-27

Sources (vérifiée le 2026-11-27) : https://brasserie-iron.com/ ; https://data.geopf.fr/geocodage/search?q=4905+route+de+Saint-Nauphary%2C+82000+Montauban&limit=5

Extrait lu : « Boutique sur place »

Choix du vérificateur : Site officiel relu sur la page brute le 27/11. Le point OSM de Saint-Nauphary est la même brasserie. Seul numéro publié, un portable écrit avec des points, que le contrôle ne relit pas : dans la note (règle du 21/10).

**Aperçu de la fiche** (état du moment calculé le vendredi 27 novembre 2026 à 08:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 8 h 30 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 9 h, sous réserve.
> - Adresse
> - 4905 route de Saint-Nauphary, 82000 Montauban
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Iron&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 45 15 84 10 (numéro cité par la source, non revérifié)](tel:+33645158410)
> - [Site de la brasserie](https://brasserie-iron.com/)
> - Horaires
> - À savoir : Sur les horaires de production.
> - Horaires de vente
> - Lundi | 9 h – 17 h
> - Mardi | 9 h – 17 h
> - Mercredi | 9 h – 17 h
> - Jeudi | 9 h – 17 h
> - Vendredi | 9 h – 17 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie-iron.com](https://brasserie-iron.com/) le 27 novembre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 3. Brasserie Oc'Ale — fiche nouvelle

- n : (vide) → Brasserie Oc'Ale
- c : (vide) → Bressols
- d : (vide) → 82
- lat : (vide) → 43.94343
- lon : (vide) → 1.30991
- km : (vide) → 333
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie de Bressols, en vente directe, qui accueille du lundi au vendredi de 10 h à 18 h, de préférence sur rendez-vous, d'après son site ; fermée pendant les fêtes de fin d'année.
- addr : (vide) → 547 chemin du Château d'Eau, 82710 Bressols
- src : (vide) → https://www.bieres-ocale.fr
- coordPrecision : (vide) → address
- beers.0.type : (vide) → blanche
- beers.1.type : (vide) → brune
- beers.2.type : (vide) → ipa
- contact.tel : (vide) → 09 50 33 54 90
- contact.source : (vide) → https://www.montauban-tourisme.com/en/offers/brasserie-ocale-bressols-en-3474815
- contact.verifieLe : (vide) → 2026-11-27
- verifieLe : (vide) → 2026-11-27

Sources (vérifiée le 2026-11-27) : https://www.bieres-ocale.fr ; https://www.montauban-tourisme.com/en/offers/brasserie-ocale-bressols-en-3474815 ; https://data.geopf.fr/geocodage/search?q=547+chemin+du+Ch%C3%A2teau+d%27Eau%2C+82710+Bressols&limit=5

Extrait lu : « Vente en ligne (paiement CB) / Vente directe »

Choix du vérificateur : Site officiel et fiche de l'office de Montauban relus sur la page brute le 27/11. « De préférence sur rendez-vous » : pas de grille, heures dans la note. Le prénom écrit sur le site n'est pas recopié. Fixe lu dans le bloc de la brasserie sur l'office (règle du 31/10).

**Aperçu de la fiche** (état du moment calculé le vendredi 27 novembre 2026 à 08:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 547 chemin du Château d'Eau, 82710 Bressols
> - Pas encore dans la fiche : ses horaires.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Oc%27Ale+Bressols)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 09 50 33 54 90](tel:+33950335490)
> - Ses bières
> - Blanche (non référencé) — au blé, souvent trouble et rafraîchissante
> - Brune (non référencé) — foncée, notes torréfiées
> - IPA (non référencé) — très houblonnée, souvent amère
> - [Chercher ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Oc%27Ale&type=brewery) (Untappd, une application d’avis sur les bières ; la recherche se fait par le nom de la brasserie)
> - Lu sur [bieres-ocale.fr](https://www.bieres-ocale.fr) le 27 novembre 2026. Lu sur [montauban-tourisme.com](https://www.montauban-tourisme.com/en/offers/brasserie-ocale-bressols-en-3474815) le 27 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 4. Abracada'Brasserie — fiche nouvelle

- n : (vide) → Abracada'Brasserie
- c : (vide) → Montauban
- d : (vide) → 82
- lat : (vide) → 44.04039
- lon : (vide) → 1.36935
- km : (vide) → 322.8
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Microbrasserie au nord de Montauban, avec une taproom où les brasseurs servent ses bières, neuf à la pression, et des soirées, d'après son site. La vente à emporter n'y est pas dite.
- addr : (vide) → 1620 avenue de Cos, 82000 Montauban
- src : (vide) → https://www.abracadabrasserie.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-11-27

Sources (vérifiée le 2026-11-27) : https://www.abracadabrasserie.com ; https://data.geopf.fr/geocodage/search?q=1620+avenue+de+Cos%2C+82000+Montauban&limit=5

Extrait lu : « Ici ce sont les brasseurs qui servent votre bière. »

Choix du vérificateur : Site officiel et fiche de l'office de Montauban relus sur la page brute le 27/11. Catégorie 0 : une taproom sans vente dite (la catégorie 4 demande « pas de vente à emporter » écrit). Les heures de l'office sont données comme non vérifiées : non reprises. Seul un portable, publié par l'office : non repris.

**Aperçu de la fiche** (état du moment calculé le vendredi 27 novembre 2026 à 08:30, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 1620 avenue de Cos, 82000 Montauban
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Abracada%27Brasserie+Montauban)[Ses bières sur Untappd](https://untappd.com/search?q=Abracada%27Brasserie&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [abracadabrasserie.com](https://www.abracadabrasserie.com) le 27 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 5. Brasserie Baltringue — fiche nouvelle

- n : (vide) → Brasserie Baltringue
- c : (vide) → Parisot
- d : (vide) → 82
- lat : (vide) → 44.253
- lon : (vide) → 1.86976
- km : (vide) → 276.5
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie de Parisot : on réserve sur sa boutique en ligne et on retire les bières à la brasserie pendant les horaires d'ouverture, uniquement sur rendez-vous, du lundi au vendredi, d'après son site. Rien ne dit qu'on peut y boire sur place.
- addr : (vide) → 876 route d'Albi, 82160 Parisot
- src : (vide) → https://www.brasseriebaltringue.fr/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.site : (vide) → https://www.brasseriebaltringue.fr/
- contact.source : (vide) → https://www.brasseriebaltringue.fr/
- contact.verifieLe : (vide) → 2026-11-27
- verifieLe : (vide) → 2026-11-27

Sources (vérifiée le 2026-11-27) : https://www.brasseriebaltringue.fr/ ; https://data.geopf.fr/geocodage/search?q=Parisot&type=municipality&limit=5

Extrait lu : « à la brasserie, pendant les horaires d »

Choix du vérificateur : Site officiel relu sur la page brute le 27/11 (« passez les retirer à la brasserie, pendant les horaires d'ouverture (uniquement sur rendez-vous) »). Le retrait sur rendez-vous ne fait pas une grille. Aucun téléphone sur le site ; le portable de l'office n'est pas repris.

**Aperçu de la fiche** (état du moment calculé le vendredi 27 novembre 2026 à 08:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 876 route d'Albi, 82160 Parisot
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Baltringue+Parisot)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Baltringue&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://www.brasseriebaltringue.fr/)
> - Lu sur [brasseriebaltringue.fr](https://www.brasseriebaltringue.fr/) le 27 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 6. La Cabane — fiche nouvelle

- n : (vide) → La Cabane
- c : (vide) → Caylus
- d : (vide) → 82
- lat : (vide) → 44.22931
- lon : (vide) → 1.76855
- km : (vide) → 284.6
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Microbrasserie de Caylus aux bières permanentes, éphémères, saisonnières ou vieillies en barriques, vendues sur son e-shop, d'après son site ; l'office cite une vente sur un point de vente collectif. Ni vente ni accueil à la brasserie ne sont dits.
- addr : (vide) → ZA Pech de Rondols, 82160 Caylus
- src : (vide) → https://www.brasserielacabane.com
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 07 60 91 65 55
- contact.site : (vide) → https://www.brasserielacabane.com
- contact.source : (vide) → https://www.brasserielacabane.com
- contact.verifieLe : (vide) → 2026-11-27
- verifieLe : (vide) → 2026-11-27

Sources (vérifiée le 2026-11-27) : https://www.brasserielacabane.com ; https://data.geopf.fr/geocodage/search?q=Caylus&type=municipality&limit=5

Extrait lu : « La Cabane vous propose un large choix de bières permanentes »

Choix du vérificateur : Site officiel et fiche de l'office relus sur la page brute le 27/11. Seul numéro publié par la brasserie, un portable (règle du 21/10).

**Aperçu de la fiche** (état du moment calculé le vendredi 27 novembre 2026 à 08:30, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - ZA Pech de Rondols, 82160 Caylus
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Cabane+Caylus)[Ses bières sur Untappd](https://untappd.com/search?q=La+Cabane&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 07 60 91 65 55](tel:+33760916555)
> - [Site de la brasserie](https://www.brasserielacabane.com)
> - Lu sur [brasserielacabane.com](https://www.brasserielacabane.com) le 27 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 7. Brasserie Escumosa (Domaine de la Tucayne) — fiche nouvelle

- n : (vide) → Brasserie Escumosa (Domaine de la Tucayne)
- c : (vide) → Bouillac
- d : (vide) → 82
- lat : (vide) → 43.8543
- lon : (vide) → 1.1133
- km : (vide) → 351.5
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie créée par un vigneron brasseur au Domaine de la Tucayne, avec vente à la propriété, d'après l'office de tourisme d'Occitanie ; la cave du domaine est ouverte le mercredi et le samedi de 9 h à 12 h et de 14 h à 18 h, d'après son site.
- addr : (vide) → 5450 chemin des Crêtes, 82600 Bouillac
- src : (vide) → https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-escumosa-bouillac_TFOSITRA2_DEG_6597355/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 05 63 27 70 43
- contact.site : (vide) → https://www.latucayne.fr/
- contact.source : (vide) → https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-escumosa-bouillac_TFOSITRA2_DEG_6597355/
- contact.verifieLe : (vide) → 2026-11-27
- horaires.0.nature : (vide) → vente
- horaires.0.mer : (vide) → 9 h – 12 h, 14 h – 18 h
- horaires.0.sam : (vide) → 9 h – 12 h, 14 h – 18 h
- horaires.0.remarque : (vide) → Heures de la cave du domaine ; en dehors, contacter le domaine.
- horaires.0.source : (vide) → https://www.latucayne.fr/
- horaires.0.verifieLe : (vide) → 2026-11-27
- verifieLe : (vide) → 2026-11-27

Sources (vérifiée le 2026-11-27) : https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-escumosa-bouillac_TFOSITRA2_DEG_6597355/ ; https://www.latucayne.fr/ ; https://data.geopf.fr/geocodage/search?q=5450+chemin+des+Cr%C3%AAtes%2C+82600+Bouillac&limit=5

Extrait lu : « Vente à la propriété »

Choix du vérificateur : Fiche de l'office et site du domaine relus sur la page brute le 27/11. Confiance moyenne : la cave du site peut viser le vin autant que la bière. Fixe lu dans le bloc de la brasserie sur l'office (règle du 31/10) ; les portables du site, associés à des prénoms, ne sont pas repris.

**Aperçu de la fiche** (état du moment calculé le vendredi 27 novembre 2026 à 08:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 8 h 30 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 5450 chemin des Crêtes, 82600 Bouillac
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Escumosa+%28Domaine+de+la+Tucayne%29&type=brewery)
> - Joindre la brasserie
> - [Appeler le 05 63 27 70 43](tel:+33563277043)
> - [Site de la brasserie](https://www.latucayne.fr/)
> - Horaires
> - À savoir : Heures de la cave du domaine ; en dehors, contacter le domaine.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 9 h – 12 h, 14 h – 18 h
> - Jeudi | non précisé
> - Vendredi | non précisé
> - Samedi | 9 h – 12 h, 14 h – 18 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [tourisme-occitanie.com](https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-escumosa-bouillac_TFOSITRA2_DEG_6597355/) le 27 novembre 2026. Lu sur [latucayne.fr](https://www.latucayne.fr/) le 27 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 8. Brasserie Barbarossa — fiche nouvelle

- n : (vide) → Brasserie Barbarossa
- c : (vide) → Grisolles
- d : (vide) → 82
- lat : (vide) → 43.8283
- lon : (vide) → 1.31087
- km : (vide) → 340.7
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → solide
- note : (vide) → Brasserie de Grisolles avec un espace dégustation et une vente sur place à emporter, d'après son site ; une guinguette éphémère est annoncée « bientôt ». Le samedi et le dimanche, sur demande. Téléphone publié par la brasserie : 05 63 92 97 13.
- addr : (vide) → 670 chemin des Crêtes, 82170 Grisolles
- src : (vide) → https://www.brasseriebarbarossa.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.brasseriebarbarossa.fr/
- contact.source : (vide) → https://www.brasseriebarbarossa.fr/
- contact.verifieLe : (vide) → 2026-11-27
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 9 h – 18 h
- horaires.0.mar : (vide) → 9 h – 18 h
- horaires.0.mer : (vide) → 14 h 30 – 18 h
- horaires.0.jeu : (vide) → 9 h – 18 h
- horaires.0.ven : (vide) → 9 h – 12 h
- horaires.0.remarque : (vide) → Samedi et dimanche : sur demande.
- horaires.0.source : (vide) → https://www.brasseriebarbarossa.fr/
- horaires.0.verifieLe : (vide) → 2026-11-27
- verifieLe : (vide) → 2026-11-27

Sources (vérifiée le 2026-11-27) : https://www.brasseriebarbarossa.fr/ ; https://data.geopf.fr/geocodage/search?q=670+chemin+des+Cr%C3%AAtes%2C+82170+Grisolles&limit=5

Extrait lu : « Espace dégustation - Vente sur place à emporter »

Choix du vérificateur : Site officiel relu sur la page brute le 27/11. Catégorie 2 : « Espace dégustation » ne dit pas qu'on boit un verre en dehors d'une dégustation, et la guinguette n'est pas ouverte. Le fixe est écrit collé (« 0563929713 »), que le contrôle ne relit pas : dans la note.

**Aperçu de la fiche** (état du moment calculé le vendredi 27 novembre 2026 à 08:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 8 h 30 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 9 h, sous réserve.
> - Adresse
> - 670 chemin des Crêtes, 82170 Grisolles
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Barbarossa&type=brewery)
> - Joindre la brasserie
> - [Appeler le 05 63 92 97 13 (numéro cité par la source, non revérifié)](tel:+33563929713)
> - [Site de la brasserie](https://www.brasseriebarbarossa.fr/)
> - Horaires
> - À savoir : Samedi et dimanche : sur demande.
> - Horaires de vente
> - Lundi | 9 h – 18 h
> - Mardi | 9 h – 18 h
> - Mercredi | 14 h 30 – 18 h
> - Jeudi | 9 h – 18 h
> - Vendredi | 9 h – 12 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriebarbarossa.fr](https://www.brasseriebarbarossa.fr/) le 27 novembre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 9. HopDuck Brewery — fiche nouvelle

- n : (vide) → HopDuck Brewery
- c : (vide) → Campsas
- d : (vide) → 82
- lat : (vide) → 43.89668
- lon : (vide) → 1.30948
- km : (vide) → 336.1
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Micro-brasserie de Campsas, d'après son site ; l'office de tourisme d'Occitanie lui donne une boutique. Aucun horaire publié ; rien ne dit qu'on peut y boire sur place.
- addr : (vide) → 4 rue Sépat, ZAC Sépat, 82370 Campsas
- src : (vide) → https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-hopduk-campsas_TFOSITRA2_DEG_6599807/
- coordPrecision : (vide) → address
- beers.0.type : (vide) → autre
- beers.0.libelle : (vide) → Cansas City (pale ale)
- beers.1.type : (vide) → ipa
- beers.1.libelle : (vide) → Session IPA
- beers.2.type : (vide) → ipa
- beers.2.libelle : (vide) → Mellow Yellow
- beers.3.type : (vide) → stout
- beers.3.libelle : (vide) → All Day Stout
- beers.4.type : (vide) → blanche
- beers.4.libelle : (vide) → Witbier
- contact.tel : (vide) → 06 68 54 29 20
- contact.source : (vide) → https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-hopduk-campsas_TFOSITRA2_DEG_6599807/
- contact.verifieLe : (vide) → 2026-11-27
- verifieLe : (vide) → 2026-11-27

Sources (vérifiée le 2026-11-27) : https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-hopduk-campsas_TFOSITRA2_DEG_6599807/ ; https://data.geopf.fr/geocodage/search?q=4+rue+S%C3%A9pat%2C+ZAC+S%C3%A9pat%2C+82370+Campsas&limit=5

Extrait lu : « Brasserie locale, made in Campsas. »

Choix du vérificateur : Fiche de l'office et site officiel relus sur la page brute le 27/11 (« Une gamme complète de bières artisanales produites dans notre micro brasserie de Campsas » ; les bières sur la page « Nos bières »). Catégorie 2 en confiance moyenne : la boutique n'est écrite que sur l'office. Seul numéro, un portable publié aussi par la brasserie (« 0668542920 » sur son site) : repris depuis l'office, où il est en paires (règle du 21/10).

**Aperçu de la fiche** (état du moment calculé le vendredi 27 novembre 2026 à 08:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 4 rue Sépat, ZAC Sépat, 82370 Campsas
> - Pas encore dans la fiche : ses horaires.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=HopDuck+Brewery+Campsas)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 68 54 29 20](tel:+33668542920)
> - Ses bières
> - Cansas City (pale ale) (non référencé)
> - Session IPA · IPA (non référencé) — très houblonnée, souvent amère
> - Mellow Yellow · IPA (non référencé)
> - All Day Stout · Stout (non référencé) — noire, café et chocolat
> - Witbier · Blanche (non référencé) — au blé, souvent trouble et rafraîchissante
> - « pale ale »
> - une bière blonde ou ambrée, houblonnée
> - [Chercher ses bières sur Untappd](https://untappd.com/search?q=HopDuck+Brewery&type=brewery) (Untappd, une application d’avis sur les bières ; la recherche se fait par le nom de la brasserie)
> - Lu sur [tourisme-occitanie.com](https://www.tourisme-occitanie.com/fr/fiche/degustation/brasserie-hopduk-campsas_TFOSITRA2_DEG_6599807/) le 27 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : ceb05810f8ad
