# Lot dep-06 — les Alpes-Maritimes (S343)

Ce lot ajoute **9 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 36 candidats = 9 proposés + 27 non proposés (tableau ci-dessous).
Catégories proposées : 4 « acheter et consommer », 3 « acheter seulement », 0 « pas de vente », 2 « à confirmer ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| MN CAFE (`sirene:434284022`) | MN Café (Menton) : deux recherches, aucune brasserie ni café de ce nom |
| THE BEER GEEKS (`sirene:887867547`) | The Beer Geeks (Cannes) : trois recherches, aucun bar ni brasserie de ce nom |
| BEERCOMPANY NICE (`sirene:901867911`) | Beercompany (Nice) : deux recherches, rien sous ce nom, ni à Nice ni à Draguignan |
| BRASSERIE D'AQUI (`sirene:853474351`) | Brasserie d'Aqui (Nice) : annuaires et listes de bars seuls, adresses discordantes avec le registre |
| BRASSERIE ARTISANALE DE L'OURA (`sirene:977699156`) | Brasserie artisanale de l'Oura (Menton) : aucun site, office ni Untappd ; un restaurant homonyme sans bière |
| B.A.N (`sirene:809604275`) | Brasserie Artisanale de Nice : site officiel lu par l'agent, injoignable depuis le conteneur le 27/10 pour le contrôle : à relancer |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| THIS IS HAWKLAND (`sirene:910864727`) | This Is Hawkland (Carros) : deux recherches, aucune page à ce nom |
| SOCCA BIERA NICE (`sirene:815107867`) | Socca Bièra (Nice) : site officiel en maintenance le 27/10, une fiche d'office de 2016 seule : à relancer |
| BACKYARD BREWS (`sirene:839502382`) | Backyard Brews (Sophia Antipolis) : domaine repris par un tiers, un annuaire seul |
| IGGP (`sirene:844219774`) | IGGP (Menton) : même adresse que la brasserie La Mentounasc, mais aucune page ne relie les deux ; site sans adresse lisible : à relancer |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:5`) | entreprise sans nom ni adresse : rien à chercher |
| LA MAISON DU BONHEUR (`sirene:921194569`) | La Maison du Bonheur (Nice) : deux recherches, aucune brasserie à ce nom |
| Entreprise individuelle (`personne:6`) | entreprise sans nom ni adresse : rien à chercher |
| LES BRASSEURS DU DIMANCHE (`sirene:844117291`) | Les Brasseurs du Dimanche (Nice) : deux recherches, aucun résultat |
| GEKKO BEERS (`sirene:852437805`) | Gekko Beers : la brasserie publiée par l'office est à Tourrettes, dans le Var ; l'adresse niçoise du registre est celle de Blue Coast |
| LE GRAND BARBU (`sirene:909992174`) | Le Grand Barbu (Antibes) : quatre recherches, aucune page à ce nom |
| Entreprise individuelle (`personne:7`) | entreprise sans nom ni adresse : rien à chercher |
| DANDYBEAR (`sirene:949319750`) | Dandybear (Contes) : un annuaire de restaurants seul : à relancer (nom exact « Dandy Bear ») |
| Entreprise individuelle (`personne:8`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:9`) | entreprise sans nom ni adresse : rien à chercher |
| Beer Company (`node/12000605246`) | Beer Company (Nice) : aucune brasserie ni bar de ce nom |
| La brasserie berroise (`node/12804515852`) | La Brasserie Berroise : même lieu que sirene:829344001, une seule fiche |
| N7 Café (`node/6430502395`) | N7 Café (Saint-Laurent-du-Var) : quatre recherches, rien n'établit qu'il brasse |

## Les fiches proposées

## Lot dep-06 — 0 proposition(s), 9 fiche(s) nouvelle(s)

### 1. Brasserie du Comté — fiche nouvelle

- n : (vide) → Brasserie du Comté
- c : (vide) → Saint-Martin-Vésubie
- d : (vide) → 06
- lat : (vide) → 44.07636
- lon : (vide) → 7.26277
- km : (vide) → 265.8
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Site officiel : boutique ouverte du lundi au samedi ; visites avec dégustation (vacances scolaires, 1 à 2 fois par semaine) et visites « apéro » du lundi au samedi. Une consommation sur place en dehors des visites n'est pas lue, d'où la catégorie 2. Le second établissement SIRENE (Colomars) n'a pas été cherché.
- addr : (vide) → Chemin de la Romegiero, lieu-dit Pra dou Majou, 06450 Saint-Martin-Vésubie
- src : (vide) → https://www.brasserieducomte.fr/nous-contacter/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 07 86 33 43 64
- contact.site : (vide) → https://www.brasserieducomte.fr
- contact.source : (vide) → https://www.brasserieducomte.fr/visite-de-la-brasserie/
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 9 h 30 – 12 h 30, 13 h 30 – 17 h 30
- horaires.0.mar : (vide) → 9 h 30 – 12 h 30, 13 h 30 – 17 h 30
- horaires.0.mer : (vide) → 9 h 30 – 12 h 30, 13 h 30 – 17 h 30
- horaires.0.jeu : (vide) → 9 h 30 – 12 h 30, 13 h 30 – 17 h 30
- horaires.0.ven : (vide) → 9 h 30 – 12 h 30, 13 h 30 – 17 h 30
- horaires.0.sam : (vide) → 9 h 30 – 12 h 30, 13 h 30 – 17 h 30
- horaires.0.source : (vide) → https://www.brasserieducomte.fr/nous-contacter/
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.brasserieducomte.fr/nous-contacter/ ; https://www.brasserieducomte.fr/visite-de-la-brasserie/ ; https://data.geopf.fr/geocodage/search?q=Saint-Martin-V%C3%A9subie&type=municipality&limit=5

Extrait lu : « Horaires ouverture boutique »

Choix du vérificateur : Deux numéros sur la page de visite : le mobile de la brasserie (07 86 33 43 64, retenu : seule ligne publiée par la brasserie) et le 04 93 03 21 28, qui est celui de l'office de tourisme (écarté). Aucun lien Untappd trouvé. Je n'ai pas pu recopier le bloc d'horaires mot pour mot (le lecteur en rend un résumé) : l'extrait est le seul intitulé exact. Le résumé a une fois parlé de « cinq lignes » pour lundi à samedi ; à vérifier à l'œil par Cédric (la recherche web donne aussi lundi-samedi 9h30-12h30 / 13h30-17h30).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:47, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 16 h 47 (heure de Paris), vente : ouvert jusqu’à 17 h 30, d’après les horaires publiés.
> - Adresse
> - Chemin de la Romegiero, lieu-dit Pra dou Majou, 06450 Saint-Martin-Vésubie
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Comt%C3%A9&type=brewery)
> - Joindre la brasserie
> - [Appeler le 07 86 33 43 64](tel:+33786334364)
> - [Site de la brasserie](https://www.brasserieducomte.fr)
> - Horaires
> - Horaires de vente
> - Lundi | 9 h 30 – 12 h 30, 13 h 30 – 17 h 30
> - Mardi | 9 h 30 – 12 h 30, 13 h 30 – 17 h 30
> - Mercredi | 9 h 30 – 12 h 30, 13 h 30 – 17 h 30
> - Jeudi | 9 h 30 – 12 h 30, 13 h 30 – 17 h 30
> - Vendredi | 9 h 30 – 12 h 30, 13 h 30 – 17 h 30
> - Samedi | 9 h 30 – 12 h 30, 13 h 30 – 17 h 30
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserieducomte.fr](https://www.brasserieducomte.fr/nous-contacter/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 2. Brasserie l'Azuréenne — fiche nouvelle

- n : (vide) → Brasserie l'Azuréenne
- c : (vide) → Grasse
- d : (vide) → 06
- lat : (vide) → 43.64701
- lon : (vide) → 6.95339
- km : (vide) → 284.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brasserie artisanale avec boutique et bar ouverts au public ; visites suivies d'une dégustation. Source : fiche d'office de tourisme seule (site officiel illisible), d'où une confiance moyenne.
- addr : (vide) → 107 avenue Jean Maubert, ZI Sainte-Marguerite, 06130 Grasse
- src : (vide) → https://cotedazurfrance.fr/offres/brasserie-lazureenne-grasse-fr-3021414/
- coordPrecision : (vide) → address
- beers : (vide) → []
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 9 h – 12 h
- horaires.0.mar : (vide) → 9 h – 12 h, 14 h 30 – 18 h
- horaires.0.mer : (vide) → 9 h – 12 h, 14 h 30 – 18 h
- horaires.0.jeu : (vide) → 9 h – 12 h, 14 h 30 – 18 h
- horaires.0.ven : (vide) → 9 h – 12 h, 14 h 30 – 22 h
- horaires.0.remarque : (vide) → Fermé le samedi et le dimanche. Vendredi soir : happy hour.
- horaires.0.source : (vide) → https://cotedazurfrance.fr/offres/brasserie-lazureenne-grasse-fr-3021414/
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://cotedazurfrance.fr/offres/brasserie-lazureenne-grasse-fr-3021414/ ; https://data.geopf.fr/geocodage/search?q=107+avenue+Jean+Maubert%2C+ZI+Sainte-Marguerite%2C+06130+Grasse&limit=5

Extrait lu : « Elle est ouverte au public et dispose d’une boutique avec bar qui en fait un lieu de partage et de convivialité. »

Choix du vérificateur : Site officiel brasserie-lazureenne.com : la page servie est sans rapport avec une brasserie (contenu étranger, domaine apparemment repris), donc écarté et non repris en contact. Téléphone présent sur l'office seulement : non repris (précédent S342). Aucune page Untappd trouvée. Horaires 2026 repris de l'office (fiche datée 2026, non garantis pour le jour même), nature accueil (boutique avec bar).

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:47, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 16 h 47 (heure de Paris), accueil du public : ouvert jusqu’à 18 h selon les créneaux, sous réserve de la remarque ci-dessous.
> - Adresse
> - 107 avenue Jean Maubert, ZI Sainte-Marguerite, 06130 Grasse
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+l%27Azur%C3%A9enne+Grasse)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+l%27Azur%C3%A9enne&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Horaires
> - À savoir : Fermé le samedi et le dimanche. Vendredi soir : happy hour.
> - Horaires d’accueil du public
> - Lundi | 9 h – 12 h
> - Mardi | 9 h – 12 h, 14 h 30 – 18 h
> - Mercredi | 9 h – 12 h, 14 h 30 – 18 h
> - Jeudi | 9 h – 12 h, 14 h 30 – 18 h
> - Vendredi | 9 h – 12 h, 14 h 30 – 22 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [cotedazurfrance.fr](https://cotedazurfrance.fr/offres/brasserie-lazureenne-grasse-fr-3021414/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 3. Brasserie Bleue — fiche nouvelle

- n : (vide) → Brasserie Bleue
- c : (vide) → Nice
- d : (vide) → 06
- lat : (vide) → 43.70224
- lon : (vide) → 7.27606
- km : (vide) → 296.3
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Micro-brasserie et salle de dégustation (tap room) selon l'office de tourisme ; horaires contradictoires entre l'office (mardi au samedi, 14h-21h, et « tous les jours » en 2026) et le site de la brasserie (mercredi au samedi, 16h-22h), donc non repris.
- addr : (vide) → 15 rue Défly, 06000 Nice
- src : (vide) → https://cotedazurfrance.fr/offres/brasserie-bleue-nice-fr-3506423
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 04 93 80 17 39
- contact.site : (vide) → https://brasseriebleue.com
- contact.untappd : (vide) → https://untappd.com/BrasserieBleue
- contact.source : (vide) → https://brasseriebleue.com
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://cotedazurfrance.fr/offres/brasserie-bleue-nice-fr-3506423 ; https://brasseriebleue.com ; https://data.geopf.fr/geocodage/search?q=15+rue+D%C3%A9fly%2C+06000+Nice&limit=5

Extrait lu : « Dégustez la bière Bleue à la pression sur place et visitez la fabrique à bière ! »

Choix du vérificateur : Catégorie 1, confiance moyenne : la dégustation sur place est dite par l'office de tourisme. Horaires écartés : le site (mercredi à samedi, 16 h – 22 h) et l'office (mardi à samedi, 14 h – 21 h) se contredisent. Téléphone lu sur le site de la brasserie. Bières d'Untappd non reprises dans cette lecture.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:47, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 15 rue Défly, 06000 Nice
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Bleue+Nice)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Bleue&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 04 93 80 17 39](tel:+33493801739)
> - [Site de la brasserie](https://brasseriebleue.com)[Untappd (avis sur les bières)](https://untappd.com/BrasserieBleue)
> - Lu sur [cotedazurfrance.fr](https://cotedazurfrance.fr/offres/brasserie-bleue-nice-fr-3506423) le 27 octobre 2026. Lu sur [brasseriebleue.com](https://brasseriebleue.com) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 4. B06 — fiche nouvelle

- n : (vide) → B06
- c : (vide) → Antibes
- d : (vide) → 06
- lat : (vide) → 43.59582
- lon : (vide) → 7.11334
- km : (vide) → 297.1
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Microbrasserie existante (site officiel biereb06.fr, fiche de l'office de tourisme d'Antibes Juan-les-Pins, bières artisanales certifiées bio). Le site officiel ne dit ni l'adresse, ni le téléphone, ni les horaires, ni la vente sur place ; il propose des bières pour événements et liste des revendeurs. L'office indique « ouvert tous les jours » en 2026, « horaires non garantis ».
- addr : (vide) → 87 chemin de Beauvert
- src : (vide) → https://biereb06.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://biereb06.fr/
- contact.source : (vide) → https://biereb06.fr/
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://biereb06.fr/ ; https://data.geopf.fr/geocodage/search?q=87+chemin+de+Beauvert&limit=5

Extrait lu : « Découvrez nos bières artisanales certifiées bio »

Choix du vérificateur : Catégorie 0 : aucune vente ni dégustation sur place lue sur le site de la brasserie. Adresse reprise de SIRENE et de la fiche de l'office (le site ne la donne pas). Téléphone 07 64 07 21 64 vu seulement chez l'office de tourisme : non repris (précédent S342). Horaires de l'office (« ouvert tous les jours ») non repris : sans heures. Page Untappd non cherchée au-delà des recherches faites : aucune trouvée.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:47, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 87 chemin de Beauvert
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=B06+Antibes)[Ses bières sur Untappd](https://untappd.com/search?q=B06&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://biereb06.fr/)
> - Lu sur [biereb06.fr](https://biereb06.fr/) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 5. Blue Coast Brewing Company — fiche nouvelle

- n : (vide) → Blue Coast Brewing Company
- c : (vide) → Nice
- d : (vide) → 06
- lat : (vide) → 43.72005
- lon : (vide) → 7.19484
- km : (vide) → 290.5
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie existante (site officiel, Untappd, offices de tourisme). Le site propose une visite de la brasserie avec dégustation, le jeudi, sur réservation ; il ne dit pas si l'on peut acheter ou boire sur place (les « boutique » du site renvoient à une boutique en ligne). Aucun horaire d'ouverture publié.
- addr : (vide) → 18 chemin de Saquier
- src : (vide) → https://www.bluecoastbrewing.com/pages/contact
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 04 97 07 95 08
- contact.site : (vide) → https://www.bluecoastbrewing.com/
- contact.source : (vide) → https://www.bluecoastbrewing.com/pages/contact
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://www.bluecoastbrewing.com/pages/contact ; https://data.geopf.fr/geocodage/search?q=18+chemin+de+Saquier&limit=5

Extrait lu : « Venez découvrir les coulisses du brassage »

Choix du vérificateur : Catégorie 0 : visite + dégustation seulement, vente sur place non établie. Horaires non repris : seule la visite du jeudi (2 heures) est donnée, sans heure. Page Untappd https://untappd.com/BlueCoastBrewing ouverte (micro-brasserie, Nice) mais non mise dans contact : le lien n'est pas lu sur la page source du contact ; bières laissées vides (types non classés). Téléphone du site retenu (seul numéro publié) ; ceux de l'office de tourisme ignorés.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:47, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 18 chemin de Saquier
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Blue+Coast+Brewing+Company+Nice)[Ses bières sur Untappd](https://untappd.com/search?q=Blue+Coast+Brewing+Company&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 04 97 07 95 08](tel:+33497079508)
> - [Site de la brasserie](https://www.bluecoastbrewing.com/)
> - Lu sur [bluecoastbrewing.com](https://www.bluecoastbrewing.com/pages/contact) le 27 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 6. Brasserie des Ligures — fiche nouvelle

- n : (vide) → Brasserie des Ligures
- c : (vide) → Peille
- d : (vide) → 06
- lat : (vide) → 43.79036
- lon : (vide) → 7.40129
- km : (vide) → 296
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Sur rendez-vous : d'après la fiche de l'office de tourisme Côte d'Azur France, visites gratuites sur réservation, dégustation payante et vente de produits sur place. Le site de la brasserie propose de prendre rendez-vous ; aucun horaire d'accueil publié.
- addr : (vide) → 445 Route des Clues, 06440 Peille
- src : (vide) → https://cotedazurfrance.fr/offres/brasserie-des-ligures-peille-fr-4709527
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.site : (vide) → https://brasseriedesligures.com/
- contact.source : (vide) → https://brasseriedesligures.com/
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://cotedazurfrance.fr/offres/brasserie-des-ligures-peille-fr-4709527 ; https://brasseriedesligures.com/ ; https://data.geopf.fr/geocodage/search?q=Peille&type=municipality&limit=5

Extrait lu : « Visites gratuites sur réservation, dégustation payante et ventes de produits sur place »

Choix du vérificateur : Catégorie 2, confiance moyenne : la vente sur place est dite par l'office seul, et la dégustation passe par une visite réservée. Aucun téléphone publié par la brasserie. Horaires du site écartés : ils ne disent pas ce qu'ils couvrent. Adresse du registre. Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:47, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 445 Route des Clues, 06440 Peille
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+des+Ligures+Peille)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+des+Ligures&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://brasseriedesligures.com/)
> - Lu sur [cotedazurfrance.fr](https://cotedazurfrance.fr/offres/brasserie-des-ligures-peille-fr-4709527) le 27 octobre 2026. Lu sur [brasseriedesligures.com](https://brasseriedesligures.com/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 7. La Brasserie Berroise — fiche nouvelle

- n : (vide) → La Brasserie Berroise
- c : (vide) → Berre-les-Alpes
- d : (vide) → 06
- lat : (vide) → 43.82528
- lon : (vide) → 7.33982
- km : (vide) → 289.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brasserie artisanale ouverte au public : son site invite à venir boire une bière et déguster entre amis (Apéro Time le vendredi et le samedi soir). La vente à emporter sur place n'est pas dite. Horaires non repris : le corps de la page et son pied de page se contredisent.
- addr : (vide) → 46 avenue Paul Granet, 06390 Berre-les-Alpes
- src : (vide) → https://brasserieberroise.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 25 57 21 09
- contact.site : (vide) → https://brasserieberroise.com
- contact.source : (vide) → https://brasserieberroise.com
- contact.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://brasserieberroise.com ; https://data.geopf.fr/geocodage/search?q=46+avenue+Paul+Granet%2C+06390+Berre-les-Alpes&limit=5

Extrait lu : « La Brasserie est ouverte au public ! »

Choix du vérificateur : Seul numéro publié par la brasserie, un mobile : retenu (règle du 21/10). Horaires écartés (17 h – 23 h 30 contre 17 h – 23 h, jeudi 22 h contre 21 h). Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:47, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 46 avenue Paul Granet, 06390 Berre-les-Alpes
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=La+Brasserie+Berroise+Berre-les-Alpes)[Ses bières sur Untappd](https://untappd.com/search?q=La+Brasserie+Berroise&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 25 57 21 09](tel:+33625572109)
> - [Site de la brasserie](https://brasserieberroise.com)
> - Lu sur [brasserieberroise.com](https://brasserieberroise.com) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 8. Craftazur — fiche nouvelle

- n : (vide) → Craftazur
- c : (vide) → Antibes
- d : (vide) → 06
- lat : (vide) → 43.60824
- lon : (vide) → 7.0741
- km : (vide) → 294
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Microbrasserie : bières brassées et embouteillées sur place, vendues aux particuliers directement à la brasserie (boutique ouverte du lundi au vendredi). Le site officiel ne parle ni de bar ni de dégustation ouverte à tous ; il conseille d'appeler avant de venir.
- addr : (vide) → 165 rue des Cistes, 06600 Antibes
- src : (vide) → https://craftazur.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 67 18 85 55
- contact.site : (vide) → https://craftazur.fr
- contact.source : (vide) → https://craftazur.fr
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 10 h – 17 h 30
- horaires.0.mar : (vide) → 10 h – 17 h 30
- horaires.0.mer : (vide) → 10 h – 17 h 30
- horaires.0.jeu : (vide) → 10 h – 17 h 30
- horaires.0.ven : (vide) → 10 h – 17 h 30
- horaires.0.source : (vide) → https://craftazur.fr
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://craftazur.fr ; https://data.geopf.fr/geocodage/search?q=165+rue+des+Cistes%2C+06600+Antibes&limit=5

Extrait lu : « Toutes nos bières sont brassées et embouteillées sur place. Nous vendons aux professionnels (bars, restaurants, entreprises…) mais aussi aux particuliers directement à la brasserie ! »

Choix du vérificateur : Mobile, seule ligne publiée par la brasserie (règle du 21/10). Dégustation dite seulement par des offices : catégorie 2. Pas de bières reprises.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:47, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 16 h 47 (heure de Paris), vente : ouvert jusqu’à 17 h 30, d’après les horaires publiés.
> - Adresse
> - 165 rue des Cistes, 06600 Antibes
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Craftazur&type=brewery)
> - Joindre la brasserie
> - [Appeler le 07 67 18 85 55](tel:+33767188555)
> - [Site de la brasserie](https://craftazur.fr)
> - Horaires
> - Horaires de vente
> - Lundi | 10 h – 17 h 30
> - Mardi | 10 h – 17 h 30
> - Mercredi | 10 h – 17 h 30
> - Jeudi | 10 h – 17 h 30
> - Vendredi | 10 h – 17 h 30
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [craftazur.fr](https://craftazur.fr) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 9. À la Fût — fiche nouvelle

- n : (vide) → À la Fût
- c : (vide) → Mouans-Sartoux
- d : (vide) → 06
- lat : (vide) → 43.6248
- lon : (vide) → 6.96284
- km : (vide) → 287.1
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brasserie bio avec domaine agricole, bar et boutique. Le site officiel invite à venir boire un verre, avec un bar le jeudi et le vendredi soir. Les horaires du bar y sont donnés deux fois, avec des heures différentes (17h-23h et 16h-21h, happy hour 17h-19h dans les deux cas) : seuls les horaires de visite sont repris.
- addr : (vide) → Espace Palissy, 201 chemin des Plaines, 06370 Mouans-Sartoux
- src : (vide) → https://alafut.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 50 85 80 89
- contact.site : (vide) → https://alafut.fr
- contact.source : (vide) → https://alafut.fr
- contact.verifieLe : (vide) → 2026-10-27
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → 9 h 30 – 16 h 30
- horaires.0.mar : (vide) → 9 h 30 – 16 h 30
- horaires.0.mer : (vide) → 9 h 30 – 16 h 30
- horaires.0.jeu : (vide) → 9 h 30 – 16 h 30
- horaires.0.ven : (vide) → 9 h 30 – 16 h 30
- horaires.0.source : (vide) → https://alafut.fr
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://alafut.fr ; https://data.geopf.fr/geocodage/search?q=Espace+Palissy%2C+201+chemin+des+Plaines%2C+06370+Mouans-Sartoux&limit=5

Extrait lu : « Du lundi au vendredi de 9h30 à 16h30 et bar jeudi & vendredi soir de 17h à 23h »

Choix du vérificateur : Page lue en entier (site officiel, via lecture résumée par l'outil de fetch, avec citations littérales demandées). Pas de page Untappd trouvée : aucune bière proposée. Horaires du bar écartés, car la page se contredit (17h-23h contre 16h-21h) ; seul le bloc « Venez nous rendre visite » (lundi-vendredi 9h30-16h30) est repris, en `accueil`. Les annuaires d'offices donnent plutôt une boutique de 10h à 16h : non repris. Téléphone : 07 50 85 80 89 (mobile, seul numéro publié par la brasserie sur son site, donné pour les réservations et infos). Confiance moyenne à cause des contradictions de la page.

**Aperçu de la fiche** (état du moment calculé le mardi 27 octobre 2026 à 16:47, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 16 h 47 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 9 h 30.
> - Adresse
> - Espace Palissy, 201 chemin des Plaines, 06370 Mouans-Sartoux
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=%C3%80+la+F%C3%BBt&type=brewery)
> - Joindre la brasserie
> - [Appeler le 07 50 85 80 89](tel:+33750858089)
> - [Site de la brasserie](https://alafut.fr)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | 9 h 30 – 16 h 30
> - Mardi | 9 h 30 – 16 h 30
> - Mercredi | 9 h 30 – 16 h 30
> - Jeudi | 9 h 30 – 16 h 30
> - Vendredi | 9 h 30 – 16 h 30
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [alafut.fr](https://alafut.fr) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : 05cd21a4c4a9
