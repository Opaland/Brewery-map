# Lot dep-63 — le Puy-de-Dôme (S341)

Ce lot ajoute **9 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 36 candidats = 9 proposés + 27 non proposés (tableau ci-dessous).
Catégories proposées : 5 « acheter et consommer », 3 « acheter seulement », 0 « pas de vente », 1 « à confirmer ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| Entreprise individuelle (`personne:2`) | même brasserie que le point OSM « Brasserie des Montagnes » (proposé) |
| O BIERES (`sirene:812619005`) | « O Bières » : rien sous ce nom |
| BRASSERIE D ISSOIRE, LES COUZINES (`sirene:814876777`) | « Les Couzines », Issoire : pages illisibles depuis le poste ; à relancer |
| MICROBRASSERIE DE L'ECUREUIL (`sirene:822060109`) | « Microbrasserie de l’Écureuil » : rien sous ce nom |
| RODIL MICROBRASSERIE (`sirene:980078281`) | « Rodil Microbrasserie » : rien sous ce nom |
| LE BRASSEUR ARVERNE (`sirene:831675335`) | « Le Brasseur Arverne » : rien sous ce nom |
| BRASSERIE FORNABERA (`sirene:840289334`) | « Brasserie Fornabera » : rien sous ce nom |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| ARTULE (`sirene:904722881`) | « Artule », Riom : un annuaire et une fiche d’office illisible, qui se contredisent sur la vente |
| LA COCOTTE MALTEE (`sirene:922439310`) | « La Cocotte Maltée » : un atelier de brassage payant, pas une brasserie qui vend sa bière |
| ATELIER DU MALT (`sirene:801438946`) | « Atelier du Malt », Courpière : seule source une fiche d’office de tourisme en PDF, illisible par les outils ; à relancer |
| TEARS PROJECT (`sirene:924568884`) | « Tears Project » : rien sous ce nom |
| KAZAN CRAFTBEER (`sirene:922733126`) | « Kazan Craftbeer », Chamalières : un annuaire seul (et un Instagram) ; à relancer |
| BRASSERIE DES SAGNES (`sirene:821647781`) | « Brasserie des Sagnes », Ménat : registre et un titre de presse de 2018 seulement |
| BRASSE BAND (`sirene:852531227`) | « Brasse Band » : rien sous ce nom, adresse privée |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| LA BIERE DES FOUS (`sirene:921147187`) | « La Bière des Fous » : rien sous ce nom |
| Entreprise individuelle (`personne:5`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE BOUGNAT (`sirene:902476985`) | « Brasserie Bougnat » : un article de presse seul |
| BORNA (`sirene:910244672`) | « Borna », Plauzat : la page de l’office d’Issoire, seule source, ne répond plus au contrôle (erreur 521) ; à relancer |
| MICROBRASSERIE BALM (`sirene:813527967`) | « Microbrasserie Balm » : un guide commercial seul, site injoignable |
| Entreprise individuelle (`personne:6`) | « L’Impro », Chalus : un annuaire seul |
| LE REVEIL DES VOLCANS (`sirene:843353665`) | « Le Réveil des Volcans » : rien sous ce nom |
| HAGALAZ BREWING CO (`sirene:992935221`) | « Hagalaz Brewing Co » : rien sous ce nom |
| Bières le Plan B (`node/1804850834`) | « Bières le Plan B » : site illisible (certificat invalide) ; à relancer |
| L'Artense (`node/9934130694`) | « L’Artense » : site en erreur, sources contradictoires (fermée selon un annuaire) ; à relancer |
| Brasserie des Sagnes (`way/150209158`) | « Brasserie des Sagnes », Saint-Éloy-les-Mines : boutique en ligne morte, lien avec l’entreprise de Ménat non établi |

## Les fiches proposées

## Lot dep-63 — 0 proposition(s), 9 fiche(s) nouvelle(s)

### 1. Brasserie des Montagnes — fiche nouvelle

- n : (vide) → Brasserie des Montagnes
- c : (vide) → Gelles
- d : (vide) → 63
- lat : (vide) → 45.77614
- lon : (vide) → 2.75715
- km : (vide) → 155.5
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Microbrasserie bio de Gelles, d'après son site, qui ne dit rien de la vente ni de l'accueil.
- addr : (vide) → 1 chemin de rocher, 63740 Gelles
- src : (vide) → https://www.brasseriedesmontagnes.fr/contactez-nous
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 70 42 08 94
- contact.site : (vide) → https://www.brasseriedesmontagnes.fr/
- contact.source : (vide) → https://www.brasseriedesmontagnes.fr/contactez-nous
- contact.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://www.brasseriedesmontagnes.fr/contactez-nous ; https://data.geopf.fr/geocodage/search?q=1+chemin+de+rocher%2C+63740+Gelles&limit=5

Extrait lu : « 1 chemin de rocher, GELLES, 63740, France »

Choix du vérificateur : Catégorie 0 : aucun lieu de vente ni d'accueil décrit. Seule ligne publiée : un portable, retenu. Le registre la place « aux Quintins » ; le site, au 1 chemin de rocher : celle du site est retenue. Même brasserie que l'entreprise individuelle du registre (personne:2).

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:08, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 1 chemin de rocher, 63740 Gelles
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+des+Montagnes+Gelles)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+des+Montagnes&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 07 70 42 08 94](tel:+33770420894)
> - [Site de la brasserie](https://www.brasseriedesmontagnes.fr/)
> - Lu sur [brasseriedesmontagnes.fr](https://www.brasseriedesmontagnes.fr/contactez-nous) le 21 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

### 2. La Banne — fiche nouvelle

- n : (vide) → La Banne
- c : (vide) → Murat-le-Quaire
- d : (vide) → 63
- lat : (vide) → 45.59903
- lon : (vide) → 2.73535
- km : (vide) → 157.2
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Micro-brasserie avec boutique et bar sur place, visites guidées sur réservation, d'après l'office de tourisme du Sancy et son site.
- addr : (vide) → 12 impasse de la Fumade, 63150 Murat-le-Quaire
- src : (vide) → https://www.sancy.com/fr/fiche/degustation/micro-brasserie-la-banne-murat-le-quaire_TFO5929557
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 75 92 20 13
- contact.site : (vide) → https://www.brasserielabanne.fr/
- contact.source : (vide) → https://www.brasserielabanne.fr/
- contact.verifieLe : (vide) → 2026-10-21
- horaires.0.nature : (vide) → accueil
- horaires.0.mer : (vide) → 15 h – 19 h 30
- horaires.0.jeu : (vide) → 15 h – 19 h 30
- horaires.0.ven : (vide) → 15 h – 19 h 30
- horaires.0.sam : (vide) → 15 h – 19 h 30
- horaires.0.dim : (vide) → 15 h – 19 h 30
- horaires.0.remarque : (vide) → Hors vacances scolaires ; pendant les vacances, tous les jours de 15 h à 19 h 30. Visites et dégustations le mercredi et le jeudi de 11 h à 13 h, sur réservation.
- horaires.0.source : (vide) → https://www.brasserielabanne.fr/
- horaires.0.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://www.sancy.com/fr/fiche/degustation/micro-brasserie-la-banne-murat-le-quaire_TFO5929557 ; https://www.brasserielabanne.fr/ ; https://data.geopf.fr/geocodage/search?q=12+impasse+de+la+Fumade%2C+63150+Murat-le-Quaire&limit=5

Extrait lu : « dégustez nos produits (boutique et bar sur place) »

Choix du vérificateur : Le bar vient de l'office : confiance moyenne. Seule ligne publiée : un portable, retenu. Horaires du site hors vacances ; les vacances en remarque. Entrepreneur individuel : aucun nom recopié.

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:08, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 15 h 08 (heure de Paris), accueil du public : ouvert jusqu’à 19 h 30 selon les créneaux, sous réserve de la remarque ci-dessous.
> - Adresse
> - 12 impasse de la Fumade, 63150 Murat-le-Quaire
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=La+Banne&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 75 92 20 13](tel:+33675922013)
> - [Site de la brasserie](https://www.brasserielabanne.fr/)
> - Horaires
> - À savoir : Hors vacances scolaires ; pendant les vacances, tous les jours de 15 h à 19 h 30. Visites et dégustations le mercredi et le jeudi de 11 h à 13 h, sur réservation.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | 15 h – 19 h 30
> - Jeudi | 15 h – 19 h 30
> - Vendredi | 15 h – 19 h 30
> - Samedi | 15 h – 19 h 30
> - Dimanche | 15 h – 19 h 30
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [sancy.com](https://www.sancy.com/fr/fiche/degustation/micro-brasserie-la-banne-murat-le-quaire_TFO5929557) le 21 octobre 2026. Lu sur [brasserielabanne.fr](https://www.brasserielabanne.fr/) le 21 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 3. Brasserie NK — fiche nouvelle

- n : (vide) → Brasserie NK
- c : (vide) → Teilhède
- d : (vide) → 63
- lat : (vide) → 45.96284
- lon : (vide) → 3.0565
- km : (vide) → 135.4
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brewpub et vente de sa production, d'après son site ; pas d'horaires publiés.
- addr : (vide) → Champs Saint-Pierre, 63460 Teilhède
- src : (vide) → https://brasserienk.fr
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 04 73 66 19 15
- contact.site : (vide) → https://brasserienk.fr
- contact.source : (vide) → https://brasserienk.fr
- contact.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://brasserienk.fr ; https://data.geopf.fr/geocodage/search?q=Teilh%C3%A8de&type=municipality&limit=5

Extrait lu : « Envie de déguster une bière artisanale dans un endroit atypique & un lieu décalé? »

Choix du vérificateur : Le fixe du pied de page retenu ; deux portables de l'office écartés. Une page Untappd existe (brasserie-nk), non citée par le site. Horaires de l'office non datés : non repris.

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:08, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - Champs Saint-Pierre, 63460 Teilhède
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+NK+Teilh%C3%A8de)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+NK&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 04 73 66 19 15](tel:+33473661915)
> - [Site de la brasserie](https://brasserienk.fr)
> - Lu sur [brasserienk.fr](https://brasserienk.fr) le 21 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 4. Brasserie du Sancy — fiche nouvelle

- n : (vide) → Brasserie du Sancy
- c : (vide) → Besse-et-Saint-Anastaise
- d : (vide) → 63
- lat : (vide) → 45.50466
- lon : (vide) → 2.92087
- km : (vide) → 143.9
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Brasserie bio, boutique et vente à la propriété, visites sur rendez-vous, d'après l'office de tourisme du Sancy.
- addr : (vide) → Rue de La Tour-d'Auvergne, 63610 Besse-et-Saint-Anastaise
- src : (vide) → https://www.sancy.com/fr/fiche/degustation/brasserie-du-sancy-besse-et-saint-anastaise_TFO6022038/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 06 95 52 43 03
- contact.site : (vide) → https://brasserie-sancy.fr/
- contact.source : (vide) → https://brasserie-sancy.fr/
- contact.verifieLe : (vide) → 2026-10-21
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 9 h – 12 h, 14 h – 17 h
- horaires.0.mar : (vide) → 9 h – 12 h, 14 h – 17 h
- horaires.0.mer : (vide) → 9 h – 12 h, 14 h – 17 h
- horaires.0.jeu : (vide) → 9 h – 12 h, 14 h – 17 h
- horaires.0.ven : (vide) → 9 h – 12 h, 14 h – 17 h
- horaires.0.remarque : (vide) → Visites sur rendez-vous ; fermé les jours fériés.
- horaires.0.source : (vide) → https://www.sancy.com/fr/fiche/degustation/brasserie-du-sancy-besse-et-saint-anastaise_TFO6022038/
- horaires.0.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://www.sancy.com/fr/fiche/degustation/brasserie-du-sancy-besse-et-saint-anastaise_TFO6022038/ ; https://brasserie-sancy.fr/ ; https://data.geopf.fr/geocodage/search?q=Besse-et-Saint-Anastaise&type=municipality&limit=5

Extrait lu : « Vente à la propriété »

Choix du vérificateur : Office de tourisme : confiance moyenne. Seule ligne publiée par la brasserie : un portable, retenu. Horaires de l'office (2026-2027). Même lieu que le point OSM node/13810536073. À ne pas confondre avec Gaïa Bière du Sancy (Picherande).

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:08, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 15 h 08 (heure de Paris), vente : ouvert jusqu’à 17 h selon les créneaux, sous réserve de la remarque ci-dessous.
> - Adresse
> - Rue de La Tour-d'Auvergne, 63610 Besse-et-Saint-Anastaise
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Sancy&type=brewery)
> - Joindre la brasserie
> - [Appeler le 06 95 52 43 03](tel:+33695524303)
> - [Site de la brasserie](https://brasserie-sancy.fr/)
> - Horaires
> - À savoir : Visites sur rendez-vous ; fermé les jours fériés.
> - Horaires de vente
> - Lundi | 9 h – 12 h, 14 h – 17 h
> - Mardi | 9 h – 12 h, 14 h – 17 h
> - Mercredi | 9 h – 12 h, 14 h – 17 h
> - Jeudi | 9 h – 12 h, 14 h – 17 h
> - Vendredi | 9 h – 12 h, 14 h – 17 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [sancy.com](https://www.sancy.com/fr/fiche/degustation/brasserie-du-sancy-besse-et-saint-anastaise_TFO6022038/) le 21 octobre 2026. Lu sur [brasserie-sancy.fr](https://brasserie-sancy.fr/) le 21 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 5. Dark Lab Brewing — fiche nouvelle

- n : (vide) → Dark Lab Brewing
- c : (vide) → Saint-Ours
- d : (vide) → 63
- lat : (vide) → 45.82995
- lon : (vide) → 2.8953
- km : (vide) → 145.3
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Brewpub (cinq à dix bières pression brassées sur place) et vente directe de canettes, d'après son site.
- addr : (vide) → 4 route de la Via Bore, 63230 Saint-Ours
- src : (vide) → https://www.dark-lab.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 04 73 88 92 80
- contact.site : (vide) → https://www.dark-lab.fr/
- contact.source : (vide) → https://www.dark-lab.fr/nous-contacter
- contact.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://www.dark-lab.fr/ ; https://www.dark-lab.fr/nous-contacter ; https://data.geopf.fr/geocodage/search?q=4+route+de+la+Via+Bore%2C+63230+Saint-Ours&limit=5

Extrait lu : « à découvrir dans notre brewpub proche de Clermont-Ferrand et Riom, ou en vente directe. »

Choix du vérificateur : Le site décrit la consommation sur place et la vente : confiance solide. Téléphone de la page contact. Horaires de l'office sans heure de fermeture : non repris. Untappd existe (Dark_Lab), non cité sur la page contact.

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:08, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 4 route de la Via Bore, 63230 Saint-Ours
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Dark+Lab+Brewing+Saint-Ours)[Ses bières sur Untappd](https://untappd.com/search?q=Dark+Lab+Brewing&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 04 73 88 92 80](tel:+33473889280)
> - [Site de la brasserie](https://www.dark-lab.fr/)
> - Lu sur [dark-lab.fr](https://www.dark-lab.fr/) le 21 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 6. Gaïa Bière du Sancy — fiche nouvelle

- n : (vide) → Gaïa Bière du Sancy
- c : (vide) → Picherande
- d : (vide) → 63
- lat : (vide) → 45.46459
- lon : (vide) → 2.77012
- km : (vide) → 156.2
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Dégustation et vente sur place, d'après l'office de tourisme du Sancy ; boutique ouverte le vendredi et le samedi après-midi, d'après son site.
- addr : (vide) → Lieu dit Ravel, 63113 Picherande
- src : (vide) → https://www.sancy.com/fr/fiche/degustation/gaia-biere-du-sancy-picherande_TFO4658151
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 04 73 21 17 24
- contact.site : (vide) → https://www.gaia-biere-du-sancy.fr/
- contact.source : (vide) → https://www.gaia-biere-du-sancy.fr/
- contact.verifieLe : (vide) → 2026-10-21
- horaires.0.nature : (vide) → vente
- horaires.0.ven : (vide) → 15 h – 18 h 30
- horaires.0.sam : (vide) → 15 h – 18 h 30
- horaires.0.remarque : (vide) → Pendant les congés scolaires, aussi le jeudi, de 15 h à 18 h 30. Visites sur réservation.
- horaires.0.source : (vide) → https://www.gaia-biere-du-sancy.fr/
- horaires.0.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://www.sancy.com/fr/fiche/degustation/gaia-biere-du-sancy-picherande_TFO4658151 ; https://www.gaia-biere-du-sancy.fr/ ; https://data.geopf.fr/geocodage/search?q=Picherande&type=municipality&limit=5

Extrait lu : « Dégustation et vente sur place. »

Choix du vérificateur : Catégorie 1, confiance moyenne : la dégustation vient de l'office de tourisme (décision #37). Un fixe publié sur le site, retenu. Horaires hors congés scolaires ; le jeudi des congés en remarque. À ne pas confondre avec la Brasserie du Sancy de Besse. Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:08, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 15 h 08 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - Lieu dit Ravel, 63113 Picherande
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Ga%C3%AFa+Bi%C3%A8re+du+Sancy&type=brewery)
> - Joindre la brasserie
> - [Appeler le 04 73 21 17 24](tel:+33473211724)
> - [Site de la brasserie](https://www.gaia-biere-du-sancy.fr/)
> - Horaires
> - À savoir : Pendant les congés scolaires, aussi le jeudi, de 15 h à 18 h 30. Visites sur réservation.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | 15 h – 18 h 30
> - Samedi | 15 h – 18 h 30
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [sancy.com](https://www.sancy.com/fr/fiche/degustation/gaia-biere-du-sancy-picherande_TFO4658151) le 21 octobre 2026. Lu sur [gaia-biere-du-sancy.fr](https://www.gaia-biere-du-sancy.fr/) le 21 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 7. Potinga — fiche nouvelle

- n : (vide) → Potinga
- c : (vide) → Clermont-Ferrand
- d : (vide) → 63
- lat : (vide) → 45.78667
- lon : (vide) → 3.10706
- km : (vide) → 128.5
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Brewpub de Clermont-Ferrand, d'après sa page Untappd ; pas de site officiel.
- addr : (vide) → Clermont-Ferrand
- src : (vide) → https://untappd.com/Potinga
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.untappd : (vide) → https://untappd.com/Potinga
- contact.source : (vide) → https://untappd.com/Potinga
- contact.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://untappd.com/Potinga ; https://data.geopf.fr/geocodage/search?q=Clermont-Ferrand&type=municipality&limit=5

Extrait lu : « Brew Pub »

Choix du vérificateur : Untappd vaut source de vérité pour l'existence (méthode du 19/10) ; « Brew Pub » dit qu'on y boit sur place, sans plus : confiance faible. Adresse lue sur un annuaire seulement : non retenue, position au centre de Clermont-Ferrand. Aucun téléphone publié.

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:08, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Pas encore dans la fiche : son adresse, son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Potinga+Clermont-Ferrand)[Ses bières sur Untappd](https://untappd.com/search?q=Potinga&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Untappd (avis sur les bières)](https://untappd.com/Potinga)
> - Lu sur [untappd.com](https://untappd.com/Potinga) le 21 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : lisez-la avant d’y aller.

### 8. Brasserie du Valhalla — fiche nouvelle

- n : (vide) → Brasserie du Valhalla
- c : (vide) → Pontaumur
- d : (vide) → 63
- lat : (vide) → 45.86736
- lon : (vide) → 2.67138
- km : (vide) → 163
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Bières en vente à la boutique de la brasserie, d'après son site ; ni bar ni horaires publiés.
- addr : (vide) → 47 avenue du Pont, 63380 Pontaumur
- src : (vide) → https://brasserie-du-valhalla.fr
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 07 48 15 46 18
- contact.site : (vide) → https://brasserie-du-valhalla.fr
- contact.source : (vide) → https://brasserie-du-valhalla.fr
- contact.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://brasserie-du-valhalla.fr ; https://data.geopf.fr/geocodage/search?q=47+avenue+du+Pont%2C+63380+Pontaumur&limit=5

Extrait lu : « Vous pouvez retrouver nos bières directement en boutique à la Brasserie ou chez nos distributeurs. »

Choix du vérificateur : Seule ligne publiée par la brasserie : un portable, retenu (règle du 21/10). Pas de page Untappd de la brasserie.

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:08, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 47 avenue du Pont, 63380 Pontaumur
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+du+Valhalla+Pontaumur)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Valhalla&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 07 48 15 46 18](tel:+33748154618)
> - [Site de la brasserie](https://brasserie-du-valhalla.fr)
> - Lu sur [brasserie-du-valhalla.fr](https://brasserie-du-valhalla.fr) le 21 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 9. Brasserie des Puys — fiche nouvelle

- n : (vide) → Brasserie des Puys
- c : (vide) → Clermont-Ferrand
- d : (vide) → 63
- lat : (vide) → 45.76716
- lon : (vide) → 3.08299
- km : (vide) → 130.2
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Une boutique en vente directe à la brasserie, ouverte le samedi matin et sur rendez-vous, d'après son site ; ni bar ni dégustation cités.
- addr : (vide) → 32 avenue de la Libération, 63000 Clermont-Ferrand
- src : (vide) → https://brasseriedespuys.fr/la-brasserie
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 04 73 93 88 92
- contact.site : (vide) → https://brasseriedespuys.fr
- contact.source : (vide) → https://brasseriedespuys.fr/contact
- contact.verifieLe : (vide) → 2026-10-21
- horaires.0.nature : (vide) → vente
- horaires.0.sam : (vide) → 10 h – 12 h 30
- horaires.0.remarque : (vide) → Et sur rendez-vous.
- horaires.0.source : (vide) → https://brasseriedespuys.fr/la-brasserie
- horaires.0.verifieLe : (vide) → 2026-10-21
- verifieLe : (vide) → 2026-10-21

Sources (vérifiée le 2026-10-21) : https://brasseriedespuys.fr/la-brasserie ; https://brasseriedespuys.fr/contact ; https://data.geopf.fr/geocodage/search?q=32+avenue+de+la+Lib%C3%A9ration%2C+63000+Clermont-Ferrand&limit=5

Extrait lu : « La boutique en vente directe »

Choix du vérificateur : Le fixe de la page contact retenu ; le portable des rendez-vous écarté. Pas d'Untappd.

**Aperçu de la fiche** (état du moment calculé le mercredi 21 octobre 2026 à 15:08, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 15 h 08 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 32 avenue de la Libération, 63000 Clermont-Ferrand
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+des+Puys&type=brewery)
> - Joindre la brasserie
> - [Appeler le 04 73 93 88 92](tel:+33473938892)
> - [Site de la brasserie](https://brasseriedespuys.fr)
> - Horaires
> - À savoir : Et sur rendez-vous.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | non précisé
> - Samedi | 10 h – 12 h 30
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedespuys.fr](https://brasseriedespuys.fr/la-brasserie) le 21 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : d98efb83340a
