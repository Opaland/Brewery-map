# Lot dep-93 — la Seine-Saint-Denis (S345)

Ce lot ajoute **3 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 24 candidats = 3 proposés + 21 non proposés (tableau ci-dessous).
Catégories proposées : 1 « acheter et consommer », 1 « acheter seulement », 0 « pas de vente », 1 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| BRASSERIE LA PARISIENNE (`sirene:798950952`) | lu le 29/10 : site en erreur 503, annuaires et presse seuls : à relancer quand le site répond |
| TRIPLE I (`sirene:820574275`) | lu le 29/10 : rien sous ce nom |
| BRASSERIE DE LA GOUTTE D'OR (`sirene:751467457`) | lu le 29/10 : la brasserie est à Paris (18e), voir dep-75 : à relancer |
| MSD (`sirene:898065891`) | lu le 29/10 : rien sous ce nom |
| LE GOUT DE LA BOISSIERE (`sirene:109482752`) | lu le 29/10 : rien sous ce nom |
| Entreprise individuelle (`personne:1`) | entreprise sans nom ni adresse : rien à chercher |
| BRASSERIE MIR (`sirene:892717950`) | lu le 29/10 : un agrégateur seul |
| LA MONTREUILLOISE (`sirene:799884630`) | lu le 29/10 : site injoignable depuis le conteneur, presse seule : à relancer |
| UMA (`sirene:802521906`) | lu le 29/10 : rien sous ce nom |
| DPBC (`sirene:518903695`) | lu le 29/10 : le site de Paname ne s'ouvre pas depuis le conteneur, agrégateur seul : à relancer |
| BRASSERIE LA FRANCAISE (`sirene:849810171`) | lu le 29/10 : annuaires seuls |
| BRASSERIE CROIX DE CHAVAUX (`sirene:838844207`) | lu le 29/10 : agrégateurs seuls ; site officiel non trouvé |
| Entreprise individuelle (`personne:2`) | entreprise sans nom ni adresse : rien à chercher |
| Entreprise individuelle (`personne:3`) | entreprise sans nom ni adresse : rien à chercher |
| GALOPIN (`sirene:499969996`) | lu le 29/10 : une plateforme d'ateliers seule |
| Entreprise individuelle (`personne:4`) | entreprise sans nom ni adresse : rien à chercher |
| Le Relais Parisien (`node/3058136850`) | lu le 29/10 : rien sous ce nom |
| Brasserie de l'Être (`node/6087697663`) | lu le 29/10 : même brasserie que la lecture sirene:805054137 (Paris, lot dep-75) |
| Demory Paris (`node/7632124298`) | lu le 29/10 : sources contradictoires, aucun accueil établi : à relancer |
| Paname Brewing Company (`node/7659450772`) | lu le 29/10 : le site ne s'ouvre pas depuis le conteneur : à relancer |
| Les bières de Belleville (`way/70002564`) | lu le 29/10 : un guide de presse et Untappd seuls (Paris) |

## Les fiches proposées

## Lot dep-93 — 0 proposition(s), 2 fiche(s) nouvelle(s)

### 1. Brasserie Gallia — fiche nouvelle

- n : (vide) → Brasserie Gallia
- c : (vide) → Pantin
- d : (vide) → 93
- lat : (vide) → 48.88926
- lon : (vide) → 2.41355
- km : (vide) → 398.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Brasserie de Pantin (salle de brassage de 20 hl) : le bar est au milieu de la brasserie, les bières se boivent sur place et toutes les références se vendent à emporter. Visites de la brasserie proposées sur le site.
- addr : (vide) → 35 rue Méhul, 93500 Pantin
- src : (vide) → https://galliaparis.com/pages/bar
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://galliaparis.com
- contact.untappd : (vide) → https://untappd.com/Gallia1890
- contact.source : (vide) → http://www.galliaparis.com/
- contact.verifieLe : (vide) → 2026-10-29
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 12 h – 14 h 30, 17 h – minuit
- horaires.0.mer : (vide) → 12 h – 14 h 30, 17 h – minuit
- horaires.0.jeu : (vide) → 12 h – 14 h 30, 17 h – minuit
- horaires.0.ven : (vide) → 12 h – 14 h 30, 17 h – minuit
- horaires.0.sam : (vide) → 12 h – minuit
- horaires.0.dim : (vide) → 15 h – 23 h
- horaires.0.remarque : (vide) → Lundi fermé.
- horaires.0.source : (vide) → https://galliaparis.com/pages/bar
- horaires.0.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://galliaparis.com/pages/bar ; http://www.galliaparis.com/ ; https://data.geopf.fr/geocodage/search?q=35+rue+M%C3%A9hul%2C+93500+Pantin&limit=5

Extrait lu : « TOUTES nos références de bières sont disponibles à la vente à emporter »

Choix du vérificateur : Aucun téléphone publié sur le site (seulement des e-mails) : le 01 41 40 99 80 vu sur Gault&Millau est celui d'un bureau parisien, écarté. Horaires du bar et de la vente à emporter lus sur la page « Notre bar » ; ParisBouge et 118712 donnent d'autres créneaux, ignorés. Bières laissées vides : types lus sur Untappd (American IPA, Session IPA, Pale Lager, Witbier, Hazy IPA, Helles, Pils tchèque) mais l'outil attend un format que je ne peux pas vérifier ; à relancer si Cédric veut les types. Lundi fermé écrit dans la remarque. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:19, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 23 h 19 (heure de Paris), accueil du public : ouvert jusqu’à minuit selon les créneaux, sous réserve de la remarque ci-dessous.
> - Adresse
> - 35 rue Méhul, 93500 Pantin
> - Pas encore dans la fiche : son téléphone et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+Gallia+Pantin)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+Gallia&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Site de la brasserie](https://galliaparis.com)[Untappd (avis sur les bières)](https://untappd.com/Gallia1890)
> - Horaires
> - À savoir : Lundi fermé.
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 12 h – 14 h 30, 17 h – minuit
> - Mercredi | 12 h – 14 h 30, 17 h – minuit
> - Jeudi | 12 h – 14 h 30, 17 h – minuit
> - Vendredi | 12 h – 14 h 30, 17 h – minuit
> - Samedi | 12 h – minuit
> - Dimanche | 15 h – 23 h
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [galliaparis.com](https://galliaparis.com/pages/bar) le 29 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 2. Brasserie du Grand Paris — fiche nouvelle

- n : (vide) → Brasserie du Grand Paris
- c : (vide) → Saint-Denis
- d : (vide) → 93
- lat : (vide) → 48.92976
- lon : (vide) → 2.34226
- km : (vide) → 405
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Le site de la brasserie dit qu'elle n'a pas de boutique physique avec accueil du public, et propose le retrait des commandes en ligne (Click & Collect) à la brasserie.
- addr : (vide) → 103 rue Charles Michels, 93200 Saint-Denis
- src : (vide) → https://www.bgp.paris
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 81 04 81 20
- contact.site : (vide) → https://www.bgp.paris
- contact.source : (vide) → https://www.bgp.paris
- contact.verifieLe : (vide) → 2026-10-29
- verifieLe : (vide) → 2026-10-29

Sources (vérifiée le 2026-10-29) : https://www.bgp.paris ; https://data.geopf.fr/geocodage/search?q=103+rue+Charles+Michels%2C+93200+Saint-Denis&limit=5

Extrait lu : « Commandez vos bières en ligne et choisissez la livraison (si éligible) ou le Click & Collect à la brasserie »

Choix du vérificateur : Catégorie 2 (acheter seulement) : la page dit « La brasserie ne dispose pas de boutique physique avec accueil du public. » et propose le Click & Collect à la brasserie. Confiance moyenne parce que le retrait n'est décrit qu'en une phrase, sans horaire ni conditions d'accueil. Aucun horaire retenu : la page n'en publie pas (le seul horaire vu, Cylex, est un annuaire). Raison sociale SIRENE My Beer Company, le nom d'usage est celui du site. Pas de page Untappd de la brasserie trouvée (seulement des pages de bières), donc pas de bières. Aucun autre téléphone sur la page. Source rouverte à la main le 29/10.

**Aperçu de la fiche** (état du moment calculé le jeudi 29 octobre 2026 à 23:19, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Adresse
> - 103 rue Charles Michels, 93200 Saint-Denis
> - Pas encore dans la fiche : ses horaires et ses bières.
> - [Chercher sur Google Maps](https://www.google.com/maps/search/?api=1&query=Brasserie+du+Grand+Paris+Saint-Denis)[Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+du+Grand+Paris&type=brewery)
> - Google Maps cherche par le nom et la commune : vérifiez que c’est la bonne brasserie.
> - Joindre la brasserie
> - [Appeler le 09 81 04 81 20](tel:+33981048120)
> - [Site de la brasserie](https://www.bgp.paris)
> - Lu sur [bgp.paris](https://www.bgp.paris) le 29 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

Empreinte du lot : 1423ebd7420c
