# Lot dep-62-r2 — le Pas-de-Calais (relance) (S344)

Ce lot ajoute **1 fiche nouvelle**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 9 candidats = 1 proposés + 8 non proposés (tableau ci-dessous).
Catégories proposées : 0 « acheter et consommer », 0 « acheter seulement », 0 « pas de vente », 1 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| LA BRASSERIE DU GOULOT (`sirene:854024254`) | lu le 29/10 : la page s'ouvre dans un navigateur mais répond 404 à l'outil de contrôle, qui ne peut pas relire l'extrait ; à relancer |
| BRASSERIE ARTESIENNE (`sirene:499451045`) | lu le 29/10 : site toujours en erreur 503, annuaires seuls : à relancer quand le site répond |
| LES BRASSEURS DES TERRES D'OPALE (`sirene:840053771`) | lu le 29/10 : site toujours en maintenance : à relancer |
| Micro brasserie L'estoupette (`node/11978102348`) | lu le 29/10 : rien sous ce nom |
| Brasserie de La Lawe (`node/12459402001`) | lu le 29/10 : rien sous ce nom |
| Brasserie des 2 Caps (`node/4829087299`) | lu le 29/10 : le site (2caps.fr) refuse encore la lecture automatique (403) : le contrôle ne peut pas relire l'extrait ; à relancer |
| Brasserie des 7 Bonnettes (`way/245646436`) | lu le 29/10 : le site refuse encore la lecture automatique (406) : le contrôle ne peut pas relire l'extrait ; à relancer |
| Brasserie Paysanne de l'Artois (`way/641318870`) | lu le 29/10 : site toujours en erreur 503 : à relancer quand le site répond |

## Les fiches proposées

## Lot dep-62-r2 — 0 proposition(s), 1 fiche(s) nouvelle(s)

### 1. Brasserie L'Intemporelle — fiche nouvelle

- n : (vide) → Brasserie L'Intemporelle
- c : (vide) → Wailly
- d : (vide) → 62
- lat : (vide) → 50.24266
- lon : (vide) → 2.7176
- km : (vide) → 530.1
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Micro-brasserie qui brasse sur place, d'après l'office de tourisme d'Arras Pays d'Artois. Ce qu'on peut y faire n'est pas établi : à confirmer.
- addr : (vide) → 40 bis rue de Pas, 62217 Wailly
- src : (vide) → https://arraspaysdartois.com/en/shops-service/en-micro-brasserie-lintemporelle/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://arraspaysdartois.com/en/shops-service/en-micro-brasserie-lintemporelle/ ; https://data.geopf.fr/geocodage/search?q=40+bis+rue+de+Pas%2C+62217+Wailly&limit=5

Extrait lu : « The brewery offers a wide range of craft beers, brewed on site using quality ingredients. »

Choix du vérificateur : Même régime que Funquet et Clairmarais (catégorie 0 sur la seule page de l'office qui dit qu'on y brasse). Téléphone lu seulement sur l'office : non repris. Page relue à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 06:49, heure de Paris) :

> - Ce qu’on peut y faire
> - À confirmer
> - Adresse
> - 40 bis rue de Pas, 62217 Wailly
> - Pas encore dans la fiche : son téléphone, ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+L%27Intemporelle+Wailly)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+L%27Intemporelle&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Lu sur [arraspaysdartois.com](https://arraspaysdartois.com/en/shops-service/en-micro-brasserie-lintemporelle/) le 29 octobre 2026. Rien n’établit encore ce qu’on peut y faire.

Empreinte du lot : 2e0c3bad7b29
