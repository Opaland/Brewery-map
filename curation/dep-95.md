# Lot dep-95 — le Val-d'Oise (S345)

Ce lot ajoute **3 fiches nouvelles**, par la règle de Cédric du 21/10 (`docs/DECISIONS.md`).

**Décompte** : 18 candidats = 3 proposés + 15 non proposés (tableau ci-dessous).
Catégories proposées : 2 « acheter et consommer », 1 « acheter seulement », 0 « pas de vente », 0 « à confirmer », 0 « consommer sur place seulement ».

**Comment le lot a été fait** (`.claude/skills/campagne-departement/SKILL.md`) : candidats du registre SIRENE et de la couche OpenStreetMap ; lecture par les agents (site officiel, puis Untappd et office de tourisme, au moins deux recherches par candidat ; un annuaire, un article ou un réseau social seuls ne suffisent pas) ; chaque extrait contrôlé sur sa page par `controler` ; positions par le géocodeur de l’IGN.

**Limite** : « rien sous ce nom » veut dire que ces recherches n’ont rien trouvé, pas que la brasserie n’existe pas.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| BRASSERIE 830 (`sirene:894337799`) | registre seul, ce qui ne suffit pas (méthode du 19/10) |
| E&B BIERE COMPAGNIE (`sirene:841277262`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| THE BEERWITCHED (`sirene:902093616`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| INTO THE MALT (`sirene:840712657`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| 1989 BREWING (`sirene:878788587`) | déjà une fiche : entrepôt de 1989 Brewing, siège ailleurs |
| LA FAMILONETTE (`sirene:903711273`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| LE CLOS LOUISE (`sirene:949092811`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| DELIVREZ-NOUS DU MALT (`sirene:852417443`) | association au registre seul, aucun lieu où venir |
| ZENZYME (`sirene:980941991`) | annuaire seul, le site supposé n'existe pas |
| HAKE BREW (`sirene:944776392`) | un check-in d'utilisateur seul |
| FRANCS BUVEURS (`sirene:917874539`) | introuvable : aucun site, aucun Untappd, aucun office de tourisme |
| HESPEBAY (`sirene:800191124`) | marque vue chez des revendeurs, rien sur la commune ni sur un accueil |
| l'Olivier Café (`node/9719196078`) | aucune trace de ce café, rien sur une brasserie |
| Brasserie du Château (Montmorency) (`way/146734234`) | brasserie-restaurant sur des annuaires seuls, rien ne dit qu'on y brasse : à relancer |
| Sapeur Brasseur (`way/63796844`) | site sans réponse (DNS), une page intercommunale seule : à relancer |

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
- conf : (vide) → solide
- note : (vide) → Bar et restaurant sur place ; les bières s'achètent sur place aux horaires d'ouverture. Le samedi n'est pas repris : la page donne deux horaires différents pour ce jour.
- addr : (vide) → 29 rue de Paris, 95380 Louvres
- src : (vide) → https://brasseriedorville.com/contact/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 01 85 52 11 11
- contact.site : (vide) → https://brasseriedorville.com
- contact.source : (vide) → https://brasseriedorville.com/contact/
- contact.verifieLe : (vide) → 2026-10-30
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 12 h – 14 h, 17 h – 23 h
- horaires.0.mer : (vide) → 12 h – 14 h, 17 h – 23 h
- horaires.0.jeu : (vide) → 12 h – 14 h, 17 h – 23 h
- horaires.0.ven : (vide) → 12 h – 14 h, 17 h – 23 h
- horaires.0.source : (vide) → https://brasseriedorville.com/contact/
- horaires.0.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : https://brasseriedorville.com/contact/ ; https://data.geopf.fr/geocodage/search?q=29+rue+de+Paris%2C+95380+Louvres&limit=5

Extrait lu : « Vous pouvez les acheter sur place à Louvres, aux horaires d'ouverture »

Choix du vérificateur : Lu aussi sur la page : « le bar et resto, du mardi au samedi ». Samedi : 17h-23h dans le texte, 16h-00h dans le tableau de la même page, donc retiré. Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 13 h 30 (heure de Paris), accueil du public : ouvert jusqu’à 14 h, d’après les horaires publiés.
> - Adresse
> - 29 rue de Paris, 95380 Louvres
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Brasserie+d%27Orville&type=brewery)
> - Joindre la brasserie
> - [Appeler le 01 85 52 11 11](tel:+33185521111)
> - [Site de la brasserie](https://brasseriedorville.com)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 12 h – 14 h, 17 h – 23 h
> - Mercredi | 12 h – 14 h, 17 h – 23 h
> - Jeudi | 12 h – 14 h, 17 h – 23 h
> - Vendredi | 12 h – 14 h, 17 h – 23 h
> - Samedi | non précisé
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasseriedorville.com](https://brasseriedorville.com/contact/) le 30 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

### 2. Ferme Brasserie du Vexin — fiche nouvelle

- n : (vide) → Ferme Brasserie du Vexin
- c : (vide) → Théméricourt
- d : (vide) → 95
- lat : (vide) → 49.08478
- lon : (vide) → 1.89373
- km : (vide) → 436
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Boutique de la ferme ouverte le week-end, sauf jours fériés. « Dans le contexte actuel », dit le site, la vente est à emporter seulement, sans dégustation.
- addr : (vide) → 3 rue de la Croix des Ruelles, 95450 Théméricourt
- src : (vide) → https://www.biere-du-vexin.com/la-boutique-les-horaires/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 01 30 39 24 43
- contact.site : (vide) → https://www.biere-du-vexin.com
- contact.source : (vide) → https://www.biere-du-vexin.com/contact/
- contact.verifieLe : (vide) → 2026-10-30
- horaires.0.nature : (vide) → vente
- horaires.0.sam : (vide) → 10 h 30 – 12 h 30, 14 h 30 – 18 h
- horaires.0.dim : (vide) → 10 h 30 – 12 h 30, 14 h 30 – 18 h
- horaires.0.remarque : (vide) → Fermé les jours fériés, même tombant un week-end.
- horaires.0.source : (vide) → https://www.biere-du-vexin.com/la-boutique-les-horaires/
- horaires.0.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : https://www.biere-du-vexin.com/la-boutique-les-horaires/ ; https://www.biere-du-vexin.com/contact/ ; https://data.geopf.fr/geocodage/search?q=3+rue+de+la+Croix+des+Ruelles%2C+95450+Th%C3%A9m%C3%A9ricourt&limit=5

Extrait lu : « nous ne faisons que de la vente à emporter »

Choix du vérificateur : Fixe retenu ; le site met aussi en avant un portable. Adresse du registre. Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter seulement
> - Maintenant
> - À 13 h 30 (heure de Paris), vente : la source ne dit pas les heures de ce jour.
> - Adresse
> - 3 rue de la Croix des Ruelles, 95450 Théméricourt
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Ferme+Brasserie+du+Vexin&type=brewery)
> - Joindre la brasserie
> - [Appeler le 01 30 39 24 43](tel:+33130392443)
> - [Site de la brasserie](https://www.biere-du-vexin.com)
> - Horaires
> - À savoir : Fermé les jours fériés, même tombant un week-end.
> - Horaires de vente
> - Lundi | non précisé
> - Mardi | non précisé
> - Mercredi | non précisé
> - Jeudi | non précisé
> - Vendredi | non précisé
> - Samedi | 10 h 30 – 12 h 30, 14 h 30 – 18 h
> - Dimanche | 10 h 30 – 12 h 30, 14 h 30 – 18 h
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [biere-du-vexin.com](https://www.biere-du-vexin.com/la-boutique-les-horaires/) le 30 octobre 2026. La source cite la vente ou l’accueil, avec des réserves ou des manques.

### 3. Terrabière — fiche nouvelle

- n : (vide) → Terrabière
- c : (vide) → Deuil-la-Barre
- d : (vide) → 95
- lat : (vide) → 48.97594
- lon : (vide) → 2.32709
- km : (vide) → 410.1
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → solide
- note : (vide) → Microbrasserie avec vente directe à emporter, salon de dégustation et terrasse, selon son site.
- addr : (vide) → 13 rue Charles de Gaulle, 95170 Deuil-la-Barre
- src : (vide) → https://brasserie-terrabiere.com
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.tel : (vide) → 09 51 55 42 15
- contact.site : (vide) → https://brasserie-terrabiere.com
- contact.source : (vide) → https://brasserie-terrabiere.com
- contact.verifieLe : (vide) → 2026-10-30
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 17 h – 23 h
- horaires.0.mer : (vide) → 17 h – 23 h
- horaires.0.jeu : (vide) → 17 h – 23 h
- horaires.0.ven : (vide) → 17 h – 23 h
- horaires.0.sam : (vide) → 11 h – 23 h
- horaires.0.source : (vide) → https://brasserie-terrabiere.com
- horaires.0.verifieLe : (vide) → 2026-10-30
- verifieLe : (vide) → 2026-10-30

Sources (vérifiée le 2026-10-30) : https://brasserie-terrabiere.com ; https://data.geopf.fr/geocodage/search?q=13+rue+Charles+de+Gaulle%2C+95170+Deuil-la-Barre&limit=5

Extrait lu : « Vente directe à emporter »

Choix du vérificateur : Lu aussi sur le site : « Le salon de dégustation ». Horaires du site seuls, ceux des annuaires diffèrent. Source rouverte à la main le 30/10.

**Aperçu de la fiche** (état du moment calculé le vendredi 30 octobre 2026 à 13:30, heure de Paris) :

> - Ce qu’on peut y faire
> - Acheter et consommer sur place
> - Maintenant
> - À 13 h 30 (heure de Paris), accueil du public : fermé, d’après les horaires publiés. Prochaine ouverture : aujourd’hui à 17 h.
> - Adresse
> - 13 rue Charles de Gaulle, 95170 Deuil-la-Barre
> - Pas encore dans la fiche : ses bières.
> - [Ses bières sur Untappd](https://untappd.com/search?q=Terrabi%C3%A8re&type=brewery)
> - Joindre la brasserie
> - [Appeler le 09 51 55 42 15](tel:+33951554215)
> - [Site de la brasserie](https://brasserie-terrabiere.com)
> - Horaires
> - Horaires d’accueil du public
> - Lundi | non précisé
> - Mardi | 17 h – 23 h
> - Mercredi | 17 h – 23 h
> - Jeudi | 17 h – 23 h
> - Vendredi | 17 h – 23 h
> - Samedi | 11 h – 23 h
> - Dimanche | non précisé
> - Ils peuvent avoir changé depuis : la source ne dit pas jusqu’à quand ils valent.
> - Lu sur [brasserie-terrabiere.com](https://brasserie-terrabiere.com) le 30 octobre 2026. La source décrit précisément ce qu’on peut faire sur place.

Empreinte du lot : 4c08bbf3a9ff
