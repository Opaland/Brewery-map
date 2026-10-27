# Lot dep-13-r2 — les Bouches-du-Rhône (S366)

Ce lot ajoute **1 fiche nouvelle**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 7 candidats = 1 proposés + 6 non proposés (tableau ci-dessous).
Catégories proposées : 1 « acheter et consommer », 0 « acheter seulement », 0 « pas de vente », 0 « à confirmer ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| MINOT BRASSERIE (`sirene:812035277`) | relu le 27/10 : presse, annuaire et une bière sur Untappd seuls ; adresses contradictoires |
| BRASSERIE ARTISANALE ARLESIENNE (`sirene:812944361`) | relu le 27/10 : l’office seul, sans rien sur la vente ou la dégustation ; site introuvable |
| SANS PRESSION (`sirene:839988813`) | relu le 27/10 : un annuaire et une carte de bar seuls |
| Entreprise individuelle (`personne:11`) | relu le 27/10 : fiche d’office lisible seulement en anglais, sans passage exact ; ni site ni Untappd |
| Les deux font la bière (`node/7904653675`) | relu le 27/10 : son domaine a été repris par un tiers ; l’office seul, sans adresse ni rien sur l’accueil |
| Brasserie des Milles (`way/88763655`) | relu le 27/10 : site vide (page d’attente de l’hébergeur) et fiches d’office en 404 ; adresse incertaine (Aix ou Bouc-Bel-Air) |

## Les fiches proposées

## Lot dep-13-r2 — 0 proposition(s), 1 fiche(s) nouvelle(s)

### 1. Brasserie de Sulauze — fiche nouvelle

- n : (vide) → Brasserie de Sulauze
- c : (vide) → Miramas
- d : (vide) → 13
- lat : (vide) → 43.5828
- lon : (vide) → 5.00978
- km : (vide) → 233.5
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → D’après l’office de tourisme d’Istres : vente directe à la brasserie les lundis, mercredis et vendredis, et un Beer Garden ouvert de juin à septembre où l’on boit sur place ses bières.
- addr : (vide) → Domaine de Sulauze, Chemin du vieux Sulauze
- src : (vide) → https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/brasserie-de-sulauze-istres-fr-2886893/
- coordPrecision : (vide) → centre
- beers : (vide) → []
- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 15 h – 18 h
- horaires.0.mer : (vide) → 15 h – 18 h
- horaires.0.ven : (vide) → 15 h – 18 h
- horaires.0.source : (vide) → https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/brasserie-de-sulauze-istres-fr-2886893/
- horaires.0.verifieLe : (vide) → 2026-10-27
- verifieLe : (vide) → 2026-10-27

Sources (vérifiée le 2026-10-27) : https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/brasserie-de-sulauze-istres-fr-2886893/ ; https://data.geopf.fr/geocodage/search?q=Miramas&type=municipality&limit=5

Extrait lu : « Il est ouvert chaque été de juin à septembre, où vous pourrez déguster sur place les bières artisanales de la brasserie. »

Choix du vérificateur : Relance du 27/10 (S366), page relue à la main. Source : l’office de tourisme seul, d’où la confiance moyenne. Téléphone lu seulement chez des offices : non repris. Commune : Miramas (registre et Untappd), l’office dit Istres. Extrait changé à la relecture de la persona Cédric : celui de la vente ne portait pas la catégorie 1 ; la même page porte les deux.

**Aperçu de la fiche** (état du moment calculé le mercredi 28 octobre 2026 à 00:36, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 0 h 36 (heure de Paris), vente : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 15 h.
> - Adresse
> - Domaine de Sulauze, Chemin du vieux Sulauze
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+de+Sulauze+Miramas)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+de+Sulauze&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Horaires
> - Horaires de vente
> - Lundi | 15 h – 18 h
> - Mardi | non précisé
> - Mercredi | 15 h – 18 h
> - Jeudi | non précisé
> - Vendredi | 15 h – 18 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [provence-alpes-cotedazur.com](https://provence-alpes-cotedazur.com/que-faire/vin-et-gastronomie/toutes-les-activites-vin-et-gastronomie/brasserie-de-sulauze-istres-fr-2886893/) le 27 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : 9200682b342e
