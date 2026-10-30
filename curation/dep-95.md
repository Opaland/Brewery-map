# Lot dep-95 — le Val-d'Oise (S345)

Ce lot ajoute **3 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 18 candidats = 3 proposés + 15 non proposés (tableau ci-dessous).
Catégories proposées : 2 « acheter et consommer », 1 « acheter seulement », 0 « pas de vente », 0 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| BRASSERIE 830 (`sirene:894337799`) | lu le 29/10 : un annuaire seul |
| E&B BIERE COMPAGNIE (`sirene:841277262`) | lu le 29/10 : rien sous ce nom |
| THE BEERWITCHED (`sirene:902093616`) | lu le 29/10 : rien sous ce nom |
| INTO THE MALT (`sirene:840712657`) | lu le 29/10 : rien sous ce nom |
| 1989 BREWING (`sirene:878788587`) | lu le 29/10 : entrepôt de 1989 Brewing, déjà une fiche (76) |
| LA FAMILONETTE (`sirene:903711273`) | lu le 29/10 : rien sous ce nom |
| LE CLOS LOUISE (`sirene:949092811`) | lu le 29/10 : rien sous ce nom |
| DELIVREZ-NOUS DU MALT (`sirene:852417443`) | lu le 29/10 : association à une adresse privée ; aucun lieu ouvert au public |
| ZENZYME (`sirene:980941991`) | lu le 29/10 : un annuaire seul : à relancer |
| HAKE BREW (`sirene:944776392`) | lu le 29/10 : rien sous ce nom |
| FRANCS BUVEURS (`sirene:917874539`) | lu le 29/10 : rien sous ce nom |
| HESPEBAY (`sirene:800191124`) | lu le 29/10 : des bières vendues par un caviste seulement ; le site ne s'ouvre pas depuis le conteneur : à relancer |
| l'Olivier Café (`node/9719196078`) | lu le 29/10 : rien sous ce nom |
| Brasserie du Château (Montmorency) (`way/146734234`) | lu le 29/10 : un restaurant, qui ne brasse pas |
| Sapeur Brasseur (`way/63796844`) | lu le 29/10 : le site ne s'ouvre pas depuis le conteneur : à relancer |

## Les fiches proposées

## Lot dep-95 — 0 proposition(s), 3 fiche(s) nouvelle(s)

### 1. Brasserie d'Orville — fiche nouvelle

- n : (vide) → Brasserie d'Orville
- c : (vide) → Louvres
- d : (vide) → 95
- lat : (vide) → 49.03921
- lon : (vide) → 2.50589
- km : (vide) → 410.6
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Brasserie à la ferme, avec bar et restaurant sur place : le site dit qu'on y déguste une bière « au comptoir ou dans le jardin ». Il ne parle d'aucune vente à emporter sur place : les bouteilles se commandent dans la boutique en ligne (livraison). Classée « acheter et consommer sur place » par défaut, sans preuve de la vente sur place : appelez avant de venir pour acheter.
- addr : (vide) → 29 rue de Paris, 95380 Louvres
- src : (vide) → https://brasseriedorville.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 01 85 52 11 11
- contact.site : (vide) → https://brasseriedorville.com
- contact.source : (vide) → https://brasseriedorville.com
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://brasseriedorville.com ; https://data.geopf.fr/geocodage/search?q=29+rue+de+Paris%2C+95380+Louvres&limit=5

Extrait lu : « déguster une bière locale au comptoir ou dans le jardin »

Choix du vérificateur : Catégorie 1 en confiance faible, selon la réponse de Cédric du 29/10 : le site dit qu'on boit sur place et ne dit rien de la vente à emporter. Pas de lien Untappd : le site n'en porte pas, et la recherche n'a trouvé que des pages de bières (« Back in Black », « Onacommed'habpasfoutugrandgose »), aucune page de la brasserie. Les types de bière lus sur le site (lager, APA, white IPA, triple, berliner weisse) ne sont pas repris : `beers` reste vide. Horaires : ceux du « bar et resto » (nature accueil), lus sur la page d'accueil. L'office de tourisme Grand Roissy n'a pas pu être lu (404). Source rouverte à la main le 29/10. Horaires non saisis : l'outil de contrôle ne les relit pas sur la page.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:50, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place (à vérifier)
> - Adresse
> - 29 rue de Paris, 95380 Louvres
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+d%27Orville+Louvres)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+d%27Orville&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 01 85 52 11 11](tel:+33185521111)
> - [Site de la brasserie](https://brasseriedorville.com)
> - Lu sur [brasseriedorville.com](https://brasseriedorville.com) le 29 octobre 2026. Ce qu’on peut y faire est probable, pas établi par la source : appelez ou lisez-la avant d’y aller.

### 2. Ferme Brasserie du Vexin — fiche nouvelle

- n : (vide) → Ferme Brasserie du Vexin
- c : (vide) → Théméricourt
- d : (vide) → 95
- lat : (vide) → 49.08478
- lon : (vide) → 1.89373
- km : (vide) → 436
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Ferme-brasserie dont la boutique est ouverte le samedi et le dimanche. Le site dit qu'on n'y fait que de la vente à emporter « dans le contexte actuel » et que les dégustations ne sont pas possibles : formule peut-être ancienne, à confirmer par téléphone.
- addr : (vide) → 3 rue de la Croix des Ruelles, 95450 Théméricourt
- src : (vide) → https://biere-du-vexin.com/la-boutique-les-horaires/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 01 30 39 24 43
- contact.site : (vide) → https://biere-du-vexin.com
- contact.source : (vide) → https://biere-du-vexin.com/contact/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → vente
- horaires.0.sam : (vide) → 10 h 30 – 12 h 30, 14 h 30 – 18 h
- horaires.0.dim : (vide) → 10 h 30 – 12 h 30, 14 h 30 – 18 h
- horaires.0.remarque : (vide) → Samedi et dimanche uniquement ; fermé les jours fériés, même un week-end (fermeture annoncée le dimanche 1er novembre).
- horaires.0.source : (vide) → https://biere-du-vexin.com/la-boutique-les-horaires/
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://biere-du-vexin.com/la-boutique-les-horaires/ ; https://biere-du-vexin.com/contact/ ; https://data.geopf.fr/geocodage/search?q=3+rue+de+la+Croix+des+Ruelles%2C+95450+Th%C3%A9m%C3%A9ricourt&limit=5

Extrait lu : « Dans le contexte actuel, nous ne faisons que de la vente à emporter, »

Choix du vérificateur : Téléphone : la page contact donne « 01 30 39 24 43 » (étiqueté « téléphone fax ») et un portable « 07 86 31 81 44 (plus simple et plus rapide) ». Je retiens le portable, que la brasserie met en avant pour la joindre ; le fixe est ambigu (fax ?). Cédric peut préférer le fixe. Horaires : bloc vente samedi et dimanche 10h30-12h30 et 14h30-18h, fermé les jours fériés (remarque). La fermeture du dimanche 1er novembre 2026 est dite sur la page, non reprise dans les créneaux. Pas de lien Untappd (aucun sur le site, aucun trouvé). Bières lues (blonde, blanche, ambrée, brune, Véliocasse au miel, Vexin IPA) non reprises : `beers` vide. Le brassage à la ferme n'est pas dit en toutes lettres sur la page de présentation (texte de remplissage) : il ressort du nom et des titres du site (« ferme brasserie du vexin », « du champ à la chope »). Téléphone : le fixe de la page contact est retenu plutôt que le portable (un portable n'est permis que s'il est la seule ligne). Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:50, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 23 h 50 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 3 rue de la Croix des Ruelles, 95450 Théméricourt
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Ferme+Brasserie+du+Vexin&type=brewery)
> - Joindre la brasserie
> - [Appeler le 01 30 39 24 43](tel:+33130392443)
> - [Site de la brasserie](https://biere-du-vexin.com)
> - Horaires
> - À savoir : Samedi et dimanche uniquement ; fermé les jours fériés, même un week-end (fermeture annoncée le dimanche 1er novembre).
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | non précisé
> - Samedi | 10 h 30 – 12 h 30, 14 h 30 – 18 h
> - Dimanche | 10 h 30 – 12 h 30, 14 h 30 – 18 h
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [biere-du-vexin.com](https://biere-du-vexin.com/la-boutique-les-horaires/) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 3. Terrabière — fiche nouvelle

- n : (vide) → Terrabière
- c : (vide) → Deuil-la-Barre
- d : (vide) → 95
- lat : (vide) → 48.97594
- lon : (vide) → 2.32709
- km : (vide) → 410.1
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Brasserie bio avec boutique, bar et salon de dégustation ; vente directe à emporter et dégustation sur place.
- addr : (vide) → 13 rue Charles de Gaulle, 95170 Deuil-la-Barre
- src : (vide) → https://brasserie-terrabiere.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 51 55 42 15
- contact.site : (vide) → https://brasserie-terrabiere.com
- contact.source : (vide) → https://brasserie-terrabiere.com
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 17 h – 23 h
- horaires.0.mer : (vide) → 17 h – 23 h
- horaires.0.jeu : (vide) → 17 h – 23 h
- horaires.0.ven : (vide) → 17 h – 23 h
- horaires.0.sam : (vide) → 11 h – 23 h
- horaires.0.remarque : (vide) → Terrasse d'hiver selon météo.
- horaires.0.source : (vide) → https://brasserie-terrabiere.com
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://brasserie-terrabiere.com ; https://data.geopf.fr/geocodage/search?q=13+rue+Charles+de+Gaulle%2C+95170+Deuil-la-Barre&limit=5

Extrait lu : « Bar – Dégustation sur place »

Choix du vérificateur : Deux autres lignes du pied de page du même site : « Vente directe à emporter » (vente à emporter) et « Boutique, bar et terrasse : du mardi au vendredi (17h/23h) et samedi (11h/23h) ». Elles justifient la catégorie 1. Brassage sur place lu sur la page : « Production de bières artisanales ». Types de bière (blonde, ambrée, brune, blanche, scotch ale) lus mais non repris : la page ne donne pas de nom de bière ni de lien par bière, donc beers reste vide. Untappd : introuvable (page du site sans mention, deux recherches sans résultat). Le site publie un seul numéro, celui de la brasserie. La seconde adresse SIRENE (Enghien-les-Bains) n'est pas celle du site : écartée. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:50, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 23 h 50 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : demain à 17 h, sous réserve.
> - Adresse
> - 13 rue Charles de Gaulle, 95170 Deuil-la-Barre
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Terrabi%C3%A8re&type=brewery)
> - Joindre la brasserie
> - [Appeler le 09 51 55 42 15](tel:+33951554215)
> - [Site de la brasserie](https://brasserie-terrabiere.com)
> - Horaires
> - À savoir : Terrasse d'hiver selon météo.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 17 h – 23 h
> - Mercredi | 17 h – 23 h
> - Jeudi | 17 h – 23 h
> - Vendredi | 17 h – 23 h
> - Samedi | 11 h – 23 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie-terrabiere.com](https://brasserie-terrabiere.com) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

Empreinte du lot : 41080dbae04c
