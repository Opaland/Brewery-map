# Veille : applications proches de Mousse de Poche (16/10/2026)

Faite par un agent de recherche le 16/10, sur demande de Cédric (« recherche
sur le web et dans les dépôts GitHub GitLab si une application existe déjà
ou proche, pour le vin, le whisky… et prends les meilleures idées »). Tout
ce qui suit a été lu à l'URL citée. Limites : la recherche par API GitHub
était refusée depuis le conteneur (403) — recherche par le web et par
<https://github.com/topics/brewery> ; l'exploration GitLab n'a rien rendu
de lisible.

## Ce qui existe

### Bière

| Nom | Lien | Type | Notable |
|---|---|---|---|
| Open Brewery DB | <https://github.com/openbrewerydb/openbrewerydb> | Données (MIT) + API | `brewery_type` dont `closed`, `planning`, `brewpub`, `taproom` ; seulement 3 brasseries françaises d'après ses statistiques. |
| Open Brewery Map | <https://brewmap.openstreetmap.de/> | Open source, OSM | Légende à 3 types ; données OSM « mises à jour toutes les heures » ; lien « Bugs ». |
| BrewMap UK | <https://github.com/jones139/BrewMap> | Open source | Compteurs par type ; étendu au cidre, poiré, distilleries ; page « tagQueries » des lieux peut-être mal étiquetés. |
| OpenBeerMap | <https://openbeermap.github.io/> | Open source (MIT) | Bières pression lues dans OSM ; un lieu absent se signale par une note OSM. |
| biere-tourisme.fr | <https://www.biere-tourisme.fr/> | Organisation professionnelle | Entrée par région avec compteur ; formulaire « nouvelle brasserie ». |
| Untappd | <https://untappd.com/> | Commercial | Fiches vérifiées par le propriétaire, check-ins. |
| Route des Brasseurs (Mauricie) | <https://www.authentikcanada.com/fr/blog/la-route-des-microbrasseries-du-quebec> | Carte papier | Passeport tamponné, circuit. |

### Vin, whisky, cidre, ferme

| Nom | Lien | Type | Notable |
|---|---|---|---|
| GéoGrappe | <https://geograppe.fr> | Annuaire cartographique | Données INAO et OSM ; pages par région. |
| Rue des Vignerons | <https://www.ruedesvignerons.com/> | Commercial | Domaines ouverts en semaine ou le week-end. |
| Scotch Whisky Association | <https://scotch-whisky.org.uk/discover-scotch/distillery-map/> | Organisation professionnelle | Carte mise à jour chaque printemps ; circuits tout faits et « faites le vôtre » ; « vérifiez auprès de la distillerie avant de partir ». |
| Route du cidre | <https://en.normandie-tourisme.fr/itinerary/route-du-cidre/> | Itinéraire | Circuit balisé. |
| Bienvenue à la ferme | <https://www.bienvenue-a-la-ferme.com/> | Réseau des Chambres d'agriculture | Filtres par point de vente et par produit. |

## Les idées retenues, et leur sort

| # | Idée | Vue sur | Sort |
|---|---|---|---|
| 1 | « Vérifiez avant de partir » près des horaires et de « Y aller » | Scotch Whisky Association | **S27** (texte seul) |
| 2 | Légende des catégories visible sur la carte | Open Brewery Map | **S27** (présentation) |
| 3 | Entrée par région (département) avec compteur | biere-tourisme.fr | **S27** (calcul local) |
| 4 | « Ma tournée » : les favoris en un circuit, ouvert dans une appli d'itinéraire (étapes seules, jamais le départ) | circuits whisky, route du cidre | **S27** |
| 5 | « Corriger sur OpenStreetMap » pour une fiche dont la source est OSM | OpenBeerMap, Open Brewery Map | **S27** si une fiche a OSM pour source |
| 6 | « Vérifié le … » à côté de chaque information | OSM `check_date` | existe déjà (« Vérifiée le ») ; par champ : données, décision de Cédric |
| 7 | Écran « Sources et licences », mention ODbL | openstreetmap.org/copyright | pied de page existant ; obligatoire si des données OSM entrent dans `data/` |
| 8 | Statut « fermée » et date de version des données | Open Brewery DB `closed` | BACKLOG (décision de Cédric sur le schéma) |
| 9 | Candidates mal étiquetées pour la veille | BrewMap « tagQueries » | BACKLOG (outil de veille) |
| 10 | « Boire sur place » : avec ou sans cuisine | Brewers Association, OSM | BACKLOG (données à sourcer) |

## Écartées, et pourquoi

- Notes, avis, check-ins, abonnés (Untappd, Vivino) : comptes et serveur ;
  l'activité locale révèle des positions ; une note sans origine serait
  une donnée inventée.
- Fiches « vérifiées par le propriétaire », enrichissement payant : comptes,
  serveur, publicité.
- Questionnaire avec pourcentage de compatibilité : un score inventé.
- Scan d'étiquette : une image envoyée à un serveur.
- Achat ou réservation intégrés : serveur, paiement, compte.
- Édition OSM dans l'application : un compte, et des données qui
  changeraient sans accord de Cédric.
- Passeport tamponné : suivrait les visites de la personne.

## Jeux de données ouverts pour la France

- OSM `craft=brewery` : ODbL (attribution, partage à l'identique) — à
  trancher avec la licence de `data/` (S23).
- Open Brewery DB : MIT, 3 fiches françaises.
- Base SIRENE : Licence Ouverte 2.0 ; code NAF 11.05Z (fabrication de bière),
  non vérifié sur la nomenclature.
- « Caves à bière » (data.gouv.fr) : Île-de-France, mise à jour de 2020.
