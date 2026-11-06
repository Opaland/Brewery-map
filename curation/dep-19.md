# Lot dep-19 — la Corrèze (S347)

Ce lot ajoute **5 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 16 candidats = 5 proposés + 11 non proposés (tableau ci-dessous).
Catégories proposées : 3 « acheter et consommer », 0 « acheter seulement », 0 « pas de vente », 2 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| Entreprise individuelle (`personne:1`) | entreprise individuelle : rien de public trouvé |
| L'ERMITE (`sirene:910448067`) | L'Ermite : rien sous ce nom (deux recherches) |
| FONSECA FABRIQUE DE BIERES (`sirene:804522274`) | Fonseca : un annuaire seul |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| GAILLARDE DIFFUSION (`sirene:520767187`) | Gaillarde Diffusion : rien n'établit une brasserie à Chasteaux |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE DE LA BUSE (`sirene:901658203`) | Brasserie de la Buse : annuaires d'entreprises seuls |
| BRASSERIE PETIT MONDE (`sirene:933952731`) | Brasserie Petit Monde : la page de l'office répond 503 : à relancer |
| BRASSERIE DE LA VEZERE (`sirene:922571773`) | Brasserie de la Vézère : même lieu que personne:3, lue sous cette clé |
| Entreprise individuelle (`personne:5`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:7`) | entreprise sans nom ni adresse : rien à chercher |

## Les fiches proposées

## Lot dep-19 — 0 proposition(s), 5 fiche(s) nouvelle(s)

### 1. Brasserie de la Vézère — fiche nouvelle

- n : (vide) → Brasserie de la Vézère
- c : (vide) → Uzerche
- d : (vide) → 19
- lat : (vide) → 45.42749
- lon : (vide) → 1.56443
- km : (vide) → 249.9
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Boutique de vente directe de toutes les bières et dégustation à la pression sur place, d'après le site de la brasserie.
- addr : (vide) → 2 allée de la Papeterie, 19140 Uzerche
- src : (vide) → http://www.brasserie-vezere.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 05 55 73 11 56
- contact.site : (vide) → http://www.brasserie-vezere.fr/
- contact.source : (vide) → http://www.brasserie-vezere.fr/
- contact.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : http://www.brasserie-vezere.fr/ ; https://data.geopf.fr/geocodage/search?q=2+all%C3%A9e+de+la+Papeterie%2C+19140+Uzerche&limit=5

Extrait lu : « déguster sur place nos bières directement à la pression, au comptoir au pied des cuves ou en terrasse au bord de la rivière. »

Choix du vérificateur : Lu via un résumé du site officiel (WebFetch). Horaires non proposés : le site donne un tableau d'été (avril à septembre) et un d'hiver (octobre à avril) dont les périodes se chevauchent en avril. Le résumé n'en garantit pas la lecture exacte, donc aucun bloc d'horaires. Le doublon sirene:922571773 (même adresse) est fondu ici. Aucune page Untappd trouvée sur le site (seulement Facebook et Instagram). Le site cite aussi un food-truck et un traiteur, mais le seul numéro lu est celui de la brasserie.

**Aperçu de la fiche** (état du moment calculé le vendredi 6 novembre 2026 à 14:20, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 2 allée de la Papeterie, 19140 Uzerche
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+de+la+V%C3%A9z%C3%A8re+Uzerche)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+la+V%C3%A9z%C3%A8re&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 05 55 73 11 56](tel:+33555731156)
> - [Site de la brasserie](http://www.brasserie-vezere.fr/)
> - Lu sur [brasserie-vezere.fr](http://www.brasserie-vezere.fr/) le 6 novembre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 2. Brasserie des Anges — fiche nouvelle

- n : (vide) → Brasserie des Anges
- c : (vide) → Chamboulive
- d : (vide) → 19
- lat : (vide) → 45.42427
- lon : (vide) → 1.7104
- km : (vide) → 238.7
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie artisanale. Visites sur rendez-vous, avec dégustation à la fin. Aucune vente sur place n'est dite par la source : catégorie à confirmer.
- addr : (vide) → Place de la Chapelle, 19450 Chamboulive
- src : (vide) → https://brasseriedesanges.com/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- contact.tel : (vide) → 07 77 05 72 17
- contact.site : (vide) → https://brasseriedesanges.com/
- contact.source : (vide) → https://brasseriedesanges.com/
- contact.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://brasseriedesanges.com/ ; https://data.geopf.fr/geocodage/search?q=Chamboulive&type=municipality&limit=5

Extrait lu : « Les visites se font sur rendez-vous, durent approximativement une heure »

Choix du vérificateur : Catégorie 0 : le site parle de visite et de dégustation, pas de vente à la brasserie (les bières sont vendues dans plus de 30 magasins et en boutique en ligne). Le téléphone 07 77 05 72 17 est un portable, mais c'est la seule ligne publiée par la brasserie sur son site (règle du 21/10). L'office (guide-de-la-correze.com) donne « 3 place de la Chapelle », alors que le site donne « Place de la Chapelle » : j'ai gardé le site. Pas d'horaires publiés. Pas de page Untappd trouvée. Types de bière lus (blondes, brunes, ambrée, blanche, rousse, fruitée) mais sans liste détaillée au format attendu : beers laissé vide.

**Aperçu de la fiche** (état du moment calculé le vendredi 6 novembre 2026 à 14:20, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - Place de la Chapelle, 19450 Chamboulive
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+des+Anges+Chamboulive)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+des+Anges&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 07 77 05 72 17](tel:+33777057217)
> - [Site de la brasserie](https://brasseriedesanges.com/)
> - Lu sur [brasseriedesanges.com](https://brasseriedesanges.com/) le 6 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 3. Brasserie Corrézienne — fiche nouvelle

- n : (vide) → Brasserie Corrézienne
- c : (vide) → Marcillac-la-Croze
- d : (vide) → 19
- lat : (vide) → 45.03063
- lon : (vide) → 1.74033
- km : (vide) → 246.2
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie artisanale de Marcillac-la-Croze, établie par son site. Seul un guide commercial parle d'un bar : ce qu'on peut y faire reste à confirmer.
- addr : (vide) → Marcillac-la-Croze
- src : (vide) → https://www.brasserie-correzienne.com/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://www.brasserie-correzienne.com/ ; https://data.geopf.fr/geocodage/search?q=Marcillac-la-Croze&type=municipality&limit=5

Extrait lu : « Bienvenue à la Brasserie Corrézienne ! »

Choix du vérificateur : Le Guide de la Corrèze est un guide commercial, pas un office de tourisme : il ne suffit pas pour la catégorie (décision #37). Adresse non retenue : le registre et le guide se contredisent.

**Aperçu de la fiche** (état du moment calculé le vendredi 6 novembre 2026 à 14:20, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Pas encore dans la fiche : son adresse, son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Corr%C3%A9zienne+Marcillac-la-Croze)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Corr%C3%A9zienne&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [brasserie-correzienne.com](https://www.brasserie-correzienne.com/) le 6 novembre 2026. Rien n’établit encore ce qu’on peut y faire.

### 4. Brasserie du Causse — fiche nouvelle

- n : (vide) → Brasserie du Causse
- c : (vide) → Larche
- d : (vide) → 19
- lat : (vide) → 45.12292
- lon : (vide) → 1.41453
- km : (vide) → 267.9
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Petite brasserie artisanale sur le Causse corrézien, avec un bar et une vente à emporter du lundi au samedi (site officiel). Le site donne la vente à emporter du lundi au samedi, de 10 h à 12 h et de 15 h à 19 h, et le bar jusqu'à 19 h (23 h le vendredi) ; le contrôle ne relit pas l'écriture « 10H - 12H », ces heures restent dans cette note.
- addr : (vide) → 2 rue du Four, 19600 Larche
- src : (vide) → https://www.brasserieducausse.fr/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 06 07 88 66 88
- contact.site : (vide) → https://www.brasserieducausse.fr/
- contact.source : (vide) → https://www.brasserieducausse.fr/
- contact.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://www.brasserieducausse.fr/ ; https://data.geopf.fr/geocodage/search?q=2+rue+du+Four%2C+19600+Larche&limit=5

Extrait lu : « Petite brasserie artisanale en pleine effervescence située sur le Causse Corrézien »

Choix du vérificateur : Le site officiel montre un bar et une section « VENTE A EMPORTER », mais ne dit pas explicitement que la bière est brassée sur place : confiance moyenne, pas solide. Deux mobiles publiés (06 07 88 66 88 et 06 71 39 61 39), je retiens le premier (celui qui est listé en premier). Les horaires du bar (« jusqu'à 19h », « jusqu'à 23h le vendredi ») n'ont pas d'heure d'ouverture, donc non repris. Dimanche non renseigné. Les bières sont citées par leur nom sans style, donc aucun type retenu. Aucune page Untappd trouvée. Lecture du site via un résumé (outil WebFetch), les passages ne sont pas confirmés mot pour mot.

**Aperçu de la fiche** (état du moment calculé le vendredi 6 novembre 2026 à 14:20, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 2 rue du Four, 19600 Larche
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+du+Causse+Larche)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Causse&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 06 07 88 66 88](tel:+33607886688)
> - [Site de la brasserie](https://www.brasserieducausse.fr/)
> - Lu sur [brasserieducausse.fr](https://www.brasserieducausse.fr/) le 6 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 5. Brasserie TNT — fiche nouvelle

- n : (vide) → Brasserie TNT
- c : (vide) → Brive-la-Gaillarde
- d : (vide) → 19
- lat : (vide) → 45.14662
- lon : (vide) → 1.47251
- km : (vide) → 262.8
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brasserie artisanale de Brive depuis 2010 : la fiche de l'office de tourisme cite sa boutique et son bar à bières, et une visite guidée sur rendez-vous.
- addr : (vide) → 5 rue Robert Margerit, Zone Ouest, 19100 Brive-la-Gaillarde
- src : (vide) → https://www.brive-tourisme.com/en/fiche/degustations-tous-produits/brasserie-tnt-brive-la-gaillarde_TFODEGAQU019V5001E8
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 05 87 49 55 48
- contact.source : (vide) → https://www.brive-tourisme.com/en/fiche/degustations-tous-produits/brasserie-tnt-brive-la-gaillarde_TFODEGAQU019V5001E8
- contact.verifieLe : (vide) → 2026-11-06
- verifieLe : (vide) → 2026-11-06

Sources (vérifiée le 2026-11-06) : https://www.brive-tourisme.com/en/fiche/degustations-tous-produits/brasserie-tnt-brive-la-gaillarde_TFODEGAQU019V5001E8 ; https://data.geopf.fr/geocodage/search?q=5+rue+Robert+Margerit%2C+Zone+Ouest%2C+19100+Brive-la-Gaillarde&limit=5

Extrait lu : « Come and discover the Factory and the different production processes, as well as the Boutique and its beer bar. »

Choix du vérificateur : Office de tourisme seul : confiance faible, pas plus. La page dit « Shop » (équipement) et « and its beer bar » sans détail : je classe en 1 par la réponse du 29/10 (bar), à confirmer. Téléphone : fixe « +33 5 87 49 55 48 » lu dans le bloc de la brasserie, pas celui de l'office. Horaires non repris : la page dit seulement « Fermé le Monday, Tuesday, Sunday », sans heures. Aucun site ni Untappd trouvé. Lecture via un résumé (WebFetch).

**Aperçu de la fiche** (état du moment calculé le vendredi 6 novembre 2026 à 14:20, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Adresse
> - 5 rue Robert Margerit, Zone Ouest, 19100 Brive-la-Gaillarde
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+TNT+Brive-la-Gaillarde)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+TNT&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 05 87 49 55 48](tel:+33587495548)
> - Lu sur [brive-tourisme.com](https://www.brive-tourisme.com/en/fiche/degustations-tous-produits/brasserie-tnt-brive-la-gaillarde_TFODEGAQU019V5001E8) le 6 novembre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : 02fe29d6aef2
