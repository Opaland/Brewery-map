# Lot dep-35 — l’Ille-et-Vilaine (S249)

Pour Cédric. Ce lot propose **17 fiches nouvelles**. **Rien n'est écrit dans `data/`** tant que tu
n'as pas répondu par les numéros acceptés.

**Décompte** : 50 candidats à lire = 17 proposés + 33 non proposés (tableau ci-dessous).
Catégories proposées : 3 « acheter et consommer », 4 « acheter seulement », 0 « pas de vente », 10 « à confirmer ».

**Comment le lot a été fait** (le circuit de la Normandie, S247-S248) :
- candidats de `outils/departement.ts` ;
- lecture par les agents ;
- chaque extrait relu dans le texte même de la page, puis contrôlé par
  `controler` (« contrôle sans écart ») ; une catégorie que l'extrait ne
  porte pas est redescendue à « à confirmer » ;
- positions par `outils/departement.ts lectures`, qui refuse une position
  hors du département ou de la commune (dans ce cas, centre de la commune).

**Non lus** : 6 entreprises sans nom (personnes, sans enseigne). En Normandie, aucune n'avait pu être trouvée.

**Contacts** (S261) : site officiel, lien Untappd et téléphone fixe, chacun relu sur la page citée (`contact.source`), puis contrôlé par `controler`. Les liens Untappd ne sont repris que s'ils figurent sur le site de la brasserie, ou s'ils sont la page lue. Les mobiles restent une option, citée dans les notes ou les choix.

**Horaires** (S262) : repris quand la page les donne en clair, jour par jour, et chaque heure relue par `controler`. Ceux d'une page qui ne les donne qu'en partie, ou « non garantis », restent dans les notes.

## Non proposés, et pourquoi

| Candidat | Raison |
|---|---|
| Coreff (`sirene:332210582`) | seule source, un article injoignable depuis le conteneur ; le site de Coreff à Carhaix est proposé dans le lot dep-29 |
| Changer D'air Parapente (`personne:2`) | le nom est celui d'une activité de parapente ; non vérifié plus loin (quota épuisé) |
| La Renneizh (`sirene:921634523`) | seule source, un annuaire de prestataires de mariage : pas un lieu de vente établi |
| Le Brasseur Bavarois (`sirene:843752312`) | même brasserie que la fiche proposée « Le Brasseur Bavarois » |
| Chat-malo (`sirene:850064957`) | même adresse que la Brasserie d'Émeraude, sans lien établi ; aucune page à ce nom |
| Brasserie Torr Penn (`sirene:878204346`) | site injoignable depuis le conteneur (connexion refusée) : aucun extrait relu |
| Brasserie de la Paumell (`personne:7`) | site officiel en 403, aucune autre source (une seule recherche, quota épuisé) |
| Brasserie D'emeraude (`sirene:813329406`) | existe, mais sa fiche d'office de tourisme répond 404 : extrait non lu |
| CM&CO (`sirene:993290840`) | même adresse que la Brasserie d'Émeraude, sans lien établi ; aucune page à ce nom |
| Choque microbrasserie (`node/13474138001`) | même brasserie que la fiche proposée « Choque microbrasserie » |
| Les Brassins de Saint-Malo (`node/2423228720`) | site détourné ; annuaire seulement, statut ouvert ou fermé incertain |
| Brasserie Louarn (`node/4225477240`) | même brasserie que la fiche proposée « Brasserie Louarn » ; son ancien site est détourné |
| Brasserie de l'Ombre (`node/6495311382`) | le site ne rend aucun texte sans JavaScript |
| Le "🍸" galant (`node/6776945082`) | nom fait d'un emoji, aucune page |
| Brasserie de la Paumell (`node/6813936276`) | site officiel en 403, aucune autre source |
| La Détente (`node/7073876519`) | site en 404, aucune autre trace |
| Brasserie Sainte-Colombe (`node/872324499`) | même brasserie que la fiche proposée « Brasserie Sainte Colombe » |
| Brasserie la Trink, Brasserie Bosco SARL, Brasserie Athanor, Yamas, Fenn, Compoz, La Chapellerie, La Biclounerie, Brasserie Sauvage, Bretagne Brewshop, Trisk'ale, Brasserie Perraut, Brasserie Brittany's, Tiens bon la Barre | introuvables en ligne |
| EURL Guyader, Old Hop | non trouvés, mais cherchés une fois au plus : le quota de recherches de la session était épuisé. **À relancer** |

## Les fiches proposées

## Lot dep-35 — 0 proposition(s), 17 fiche(s) nouvelle(s)

### 1. Le Brasseur Bavarois — fiche nouvelle

- n : (vide) → Le Brasseur Bavarois
- c : (vide) → Pleugueneuc
- d : (vide) → 35
- lat : (vide) → 48.42528
- lon : (vide) → -1.91334
- km : (vide) → 590.2
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Vente en ligne et sur les marchés ; horaires publiés (lundi, mardi, mercredi, vendredi 12 h–19 h) sans dire ce qu'on fait à la brasserie.
- addr : (vide) → 5 La Coudraie, 35720 Pleugueneuc
- src : (vide) → https://lebrasseurbavarois.fr/
- coordPrecision : (vide) → address
- beers.0.type : (vide) → lager
- beers.1.type : (vide) → blanche
- contact.site : (vide) → https://lebrasseurbavarois.fr/
- contact.source : (vide) → https://lebrasseurbavarois.fr/
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://lebrasseurbavarois.fr/ ; https://data.geopf.fr/geocodage/search?q=5+La+Coudraie%2C+35720+Pleugueneuc&limit=5

Extrait lu : « 5 La Coudraie 35720 Pleugueneuc »

Choix du vérificateur : Même brasserie que sirene:843752312 (Pleugueneuc). OSM la plaçait à Plesder.

### 2. Brasserie l'Embardée — fiche nouvelle

- n : (vide) → Brasserie l'Embardée
- c : (vide) → Fougères
- d : (vide) → 35
- lat : (vide) → 48.3535
- lon : (vide) → -1.20718
- km : (vide) → 541.1
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Bouteilles et fûts listés ; ni vente ni dégustation sur place, ni horaires indiqués.
- addr : (vide) → 3/5 rue Fos Kéraly, 35300 Fougères
- src : (vide) → https://www.brasserielembardee.fr/
- coordPrecision : (vide) → address
- beers.0.type : (vide) → blonde
- beers.1.type : (vide) → blanche
- beers.2.type : (vide) → ambree
- beers.3.type : (vide) → brune
- contact.site : (vide) → https://www.brasserielembardee.fr/
- contact.source : (vide) → https://www.brasserielembardee.fr/
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://www.brasserielembardee.fr/ ; https://data.geopf.fr/geocodage/search?q=3%2F5+rue+Fos+K%C3%A9raly%2C+35300+Foug%C3%A8res&limit=5

Extrait lu : « 3/5 rue Fos Kéraly, Fougères »

### 3. Brasserie Plouc — fiche nouvelle

- n : (vide) → Brasserie Plouc
- c : (vide) → Plerguer
- d : (vide) → 35
- lat : (vide) → 48.52696
- lon : (vide) → -1.83831
- km : (vide) → 591
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie installée à Plerguer d'après un annuaire ; rien sur la vente ou l'accueil.
- addr : (vide) → Plerguer
- src : (vide) → https://www.bieresbretonnes.fr/brasseries/brasserie-plouc/
- coordPrecision : (vide) → commune
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://www.bieresbretonnes.fr/brasseries/brasserie-plouc/

Extrait lu : « installée à Plerguer »

Choix du vérificateur : Annuaire seulement ; adresses contradictoires. Position au centre de Plerguer.

### 4. Brasserie Sainte Colombe — fiche nouvelle

- n : (vide) → Brasserie Sainte Colombe
- c : (vide) → Corps-Nuds
- d : (vide) → 35
- lat : (vide) → 47.98661
- lon : (vide) → -1.57988
- km : (vide) → 545.9
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → faible
- note : (vide) → Bar et vente directe le vendredi de 14 h à 20 h 30.
- addr : (vide) → 22 Boulevard François Mitterrand, 35150 Corps-Nuds
- src : (vide) → https://www.brasserie-sainte-colombe.com/
- coordPrecision : (vide) → address
- beers : (vide) → []
- contact.site : (vide) → https://www.brasserie-sainte-colombe.com/
- contact.source : (vide) → https://www.brasserie-sainte-colombe.com/
- contact.verifieLe : (vide) → 2026-10-17
- horaires.0.nature : (vide) → accueil
- horaires.0.ven : (vide) → 14 h – 20 h 30
- horaires.0.remarque : (vide) → Bar et vente directe.
- horaires.0.source : (vide) → https://www.brasserie-sainte-colombe.com/
- horaires.0.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://www.brasserie-sainte-colombe.com/ ; https://data.geopf.fr/geocodage/search?q=22+Boulevard+Fran%C3%A7ois+Mitterrand%2C+35150+Corps-Nuds&limit=5

Extrait lu : « Bar & Vente Directe : Tous les vendredis 14h - 20h30 »

Choix du vérificateur : Même brasserie que le point OSM node/872324499 (La Landelle, Sainte-Colombe).

### 5. Skumenn — fiche nouvelle

- n : (vide) → Skumenn
- c : (vide) → Cesson-Sévigné
- d : (vide) → 35
- lat : (vide) → 48.1054
- lon : (vide) → -1.62327
- km : (vide) → 554.7
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Brewpub : bar et cave sur place, magasin de vente directe ; ouvert du mardi au samedi.
- addr : (vide) → 8 impasse des Charmilles, 35510 Cesson-Sévigné
- src : (vide) → https://www.skumenn.com/brewpub
- coordPrecision : (vide) → address
- beers.0.type : (vide) → ipa
- beers.1.type : (vide) → ambree
- contact.tel : (vide) → 02 23 30 59 80
- contact.site : (vide) → https://www.skumenn.com/
- contact.untappd : (vide) → https://untappd.com/w/brasserie-skumenn/240180
- contact.source : (vide) → https://www.skumenn.com/brewpub
- contact.verifieLe : (vide) → 2026-10-17
- horaires.0.nature : (vide) → accueil
- horaires.0.lun : (vide) → fermé
- horaires.0.mar : (vide) → 11 h 30 – 14 h, 16 h – 21 h
- horaires.0.mer : (vide) → 11 h 30 – 14 h, 16 h – 21 h
- horaires.0.jeu : (vide) → 11 h 30 – 14 h, 16 h – 22 h
- horaires.0.ven : (vide) → 11 h 30 – 22 h
- horaires.0.sam : (vide) → 14 h 30 – 21 h
- horaires.0.dim : (vide) → fermé
- horaires.0.source : (vide) → https://www.skumenn.com/brewpub
- horaires.0.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://www.skumenn.com/brewpub ; https://data.geopf.fr/geocodage/search?q=8+impasse+des+Charmilles%2C+35510+Cesson-S%C3%A9vign%C3%A9&limit=5

Extrait lu : « passez simplement faire le plein de bière dans notre magasin de vente directe »

Choix du vérificateur : La boisson sur place se lit sur la même page : « Bar / Cave de nos cuves à votre verre il n’y a qu’un pas ».

### 6. Brasserie de la Bizhhh — fiche nouvelle

- n : (vide) → Brasserie de la Bizhhh
- c : (vide) → Le Rheu
- d : (vide) → 35
- lat : (vide) → 48.09789
- lon : (vide) → -1.79003
- km : (vide) → 565.4
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie du Rheu depuis 2017 ; ni adresse, ni horaires, ni vente lus.
- addr : (vide) → Le Rheu
- src : (vide) → https://tablejourney.com/france/rennes/breweries/
- coordPrecision : (vide) → commune
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://tablejourney.com/france/rennes/breweries/

Extrait lu : « Brasserie de la Bizhhh has brewed in Le Rheu on the west edge of Rennes since 2017 »

Choix du vérificateur : Annuaire en anglais seulement. Position au centre du Rheu.

### 7. Brasserie du Vieux Singe — fiche nouvelle

- n : (vide) → Brasserie du Vieux Singe
- c : (vide) → Saint-Jacques-de-la-Lande
- d : (vide) → 35
- lat : (vide) → 48.06658
- lon : (vide) → -1.69935
- km : (vide) → 557.8
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Magasin ouvert le jeudi de 14 h à 18 h et le vendredi de 10 h à 18 h ; aucune consommation sur place lue.
- addr : (vide) → 4b rue Janig Corlay, 35136 Saint-Jacques-de-la-Lande
- src : (vide) → https://www.vieuxsinge.com
- coordPrecision : (vide) → address
- beers.0.type : (vide) → blanche
- beers.1.type : (vide) → stout
- beers.2.type : (vide) → sour
- contact.site : (vide) → https://www.vieuxsinge.com/
- contact.source : (vide) → https://www.vieuxsinge.com
- contact.verifieLe : (vide) → 2026-10-17
- horaires.0.nature : (vide) → vente
- horaires.0.jeu : (vide) → 14 h – 18 h
- horaires.0.ven : (vide) → 10 h – 18 h
- horaires.0.source : (vide) → https://www.vieuxsinge.com
- horaires.0.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://www.vieuxsinge.com ; https://data.geopf.fr/geocodage/search?q=4b+rue+Janig+Corlay%2C+35136+Saint-Jacques-de-la-Lande&limit=5

Extrait lu : « Le magasin est ouvert le jeudi de 14h à 18h et le vendredi de 10h à 18h en continu. »

### 8. Brasserie Beltane — fiche nouvelle

- n : (vide) → Brasserie Beltane
- c : (vide) → Rennes
- d : (vide) → 35
- lat : (vide) → 48.1109
- lon : (vide) → -1.68365
- km : (vide) → 559
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Microbrasserie ouverte en 2022 avec un lieu de dégustation annoncé ; source de 2022, rien de plus récent.
- addr : (vide) → Rennes
- src : (vide) → https://unidivers.fr/microbrasserie-beltane-rennes/
- coordPrecision : (vide) → commune
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://unidivers.fr/microbrasserie-beltane-rennes/

Extrait lu : « accueilleront les consommateurs dans un lieu de dégustation pour une consommation sur place »

Choix du vérificateur : Article de 2022 au futur : catégorie non retenue. Position au centre de Rennes.

### 9. Draenek — fiche nouvelle

- n : (vide) → Draenek
- c : (vide) → Bain-de-Bretagne
- d : (vide) → 35
- lat : (vide) → 47.83621
- lon : (vide) → -1.68188
- km : (vide) → 545.8
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → faible
- note : (vide) → Vente directe à la brasserie le jeudi et le vendredi (10-12 h, 14-18 h), d'après un article de 2022 ; à reconfirmer sur le site.
- addr : (vide) → Bain-de-Bretagne
- src : (vide) → https://unidivers.fr/biere-draenek/
- coordPrecision : (vide) → commune
- beers.0.type : (vide) → blonde
- beers.1.type : (vide) → blanche
- beers.2.type : (vide) → ipa
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://unidivers.fr/biere-draenek/

Extrait lu : « 10-12h – 14-18h »

Choix du vérificateur : Article de 2022 ; adresse de l'article et de SIRENE discordantes. Position au centre de Bain-de-Bretagne.

### 10. Brasserie Minimum — fiche nouvelle

- n : (vide) → Brasserie Minimum
- c : (vide) → Montreuil-sur-Ille
- d : (vide) → 35
- lat : (vide) → 48.30748
- lon : (vide) → -1.67065
- km : (vide) → 568.2
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Gamme et boutique en ligne ; le site ne dit pas si l'on peut acheter ou consommer sur place.
- addr : (vide) → 20 avenue Alexis Rey, 35440 Montreuil-sur-Ille
- src : (vide) → https://brasserieminimum.fr/
- coordPrecision : (vide) → address
- beers.0.type : (vide) → lager
- beers.1.type : (vide) → brune
- beers.2.type : (vide) → ambree
- beers.3.type : (vide) → ipa
- beers.4.type : (vide) → blanche
- contact.site : (vide) → https://brasserieminimum.fr/
- contact.source : (vide) → https://brasserieminimum.fr/
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://brasserieminimum.fr/ ; https://data.geopf.fr/geocodage/search?q=20+avenue+Alexis+Rey%2C+35440+Montreuil-sur-Ille&limit=5

Extrait lu : « Brasserie Minimum, 20 avenue Alexis Rey, 35440 Montreuil sur Ille »

Choix du vérificateur : Peut-être la « brasserie de Montreuil-sur-Ille » de l'annuaire Gault&Millau, citée pour « Brittany's » (node/6814774338) : lien non établi.

### 11. Brasserie Smash — fiche nouvelle

- n : (vide) → Brasserie Smash
- c : (vide) → Rennes
- d : (vide) → 35
- lat : (vide) → 48.10683
- lon : (vide) → -1.7331
- km : (vide) → 562
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Horaires publiés (lundi-vendredi 9 h-18 h) et location de tireuses ; vente ou consommation sur place non dites.
- addr : (vide) → 4 bis Rue du Lieutenant Colonel Dubois, 35000 Rennes
- src : (vide) → https://smash.bzh
- coordPrecision : (vide) → address
- beers.0.type : (vide) → sour
- beers.1.type : (vide) → ipa
- contact.tel : (vide) → 02 90 22 87 00
- contact.site : (vide) → https://smash.bzh/
- contact.untappd : (vide) → https://untappd.com/brasserie_smash
- contact.source : (vide) → https://smash.bzh
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://smash.bzh ; https://data.geopf.fr/geocodage/search?q=4+bis+Rue+du+Lieutenant+Colonel+Dubois%2C+35000+Rennes&limit=5

Extrait lu : « du lundi au vendredi 9h00 - 18h00 »

### 12. Brasserie Louarn — fiche nouvelle

- n : (vide) → Brasserie Louarn
- c : (vide) → Montfort-sur-Meu
- d : (vide) → 35
- lat : (vide) → 48.1264
- lon : (vide) → -1.95447
- km : (vide) → 577.8
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Vente en boutique à la brasserie et sur les événements ; horaires sur demande.
- addr : (vide) → Montfort-sur-Meu
- src : (vide) → https://louarn.bzh
- coordPrecision : (vide) → commune
- beers.0.type : (vide) → blonde
- beers.1.type : (vide) → ipa
- beers.2.type : (vide) → blanche
- contact.site : (vide) → https://louarn.bzh/
- contact.source : (vide) → https://louarn.bzh
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://louarn.bzh

Extrait lu : « Oui, en boutique à la brasserie et sur les événements. »

Choix du vérificateur : Même brasserie que le point OSM node/4225477240 (Rennes). Une page Untappd « Brasserie Louarn » (Rennes) renvoie à un ancien domaine, détourné : non reprise. Position au centre de Montfort-sur-Meu.

### 13. Choque microbrasserie — fiche nouvelle

- n : (vide) → Choque microbrasserie
- c : (vide) → Guichen
- d : (vide) → 35
- lat : (vide) → 47.96353
- lon : (vide) → -1.79694
- km : (vide) → 559.5
- cat : (vide) → 1 (Acheter et consommer sur place)
- conf : (vide) → moyenne
- note : (vide) → Taproom du mardi au dimanche et vente à emporter du mardi au vendredi, 10 h-19 h.
- addr : (vide) → Guichen
- src : (vide) → https://www.choquemicrobrasserie.fr
- coordPrecision : (vide) → commune
- beers : (vide) → []
- contact.site : (vide) → https://www.choquemicrobrasserie.fr/
- contact.untappd : (vide) → https://untappd.com/w/choque-microbrasserie/559490
- contact.source : (vide) → https://www.choquemicrobrasserie.fr
- contact.verifieLe : (vide) → 2026-10-17
- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 17 h – 22 h
- horaires.0.mer : (vide) → 17 h – 22 h
- horaires.0.jeu : (vide) → 17 h – 22 h
- horaires.0.ven : (vide) → 16 h – 23 h
- horaires.0.sam : (vide) → 16 h – 23 h
- horaires.0.dim : (vide) → 16 h – 21 h
- horaires.0.remarque : (vide) → Taproom.
- horaires.0.source : (vide) → https://www.choquemicrobrasserie.fr
- horaires.0.verifieLe : (vide) → 2026-10-17
- horaires.1.nature : (vide) → vente
- horaires.1.mar : (vide) → 10 h – 19 h
- horaires.1.mer : (vide) → 10 h – 19 h
- horaires.1.jeu : (vide) → 10 h – 19 h
- horaires.1.ven : (vide) → 10 h – 19 h
- horaires.1.remarque : (vide) → Vente à emporter, et aux heures du taproom.
- horaires.1.source : (vide) → https://www.choquemicrobrasserie.fr
- horaires.1.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://www.choquemicrobrasserie.fr

Extrait lu : « Vente à emporter Mardi au Vendredi 10h - 19h + heure de taproom »

Choix du vérificateur : Les horaires du taproom sont juste avant sur la page. Même brasserie que le point OSM node/13474138001 (Bruz). Position au centre de Guichen.

### 14. Brasserie Fusion — fiche nouvelle

- n : (vide) → Brasserie Fusion
- c : (vide) → Bourgbarré
- d : (vide) → 35
- lat : (vide) → 48.00042
- lon : (vide) → -1.60103
- km : (vide) → 548
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Brasserie récente, canettes et fûts ; un lieu de dégustation est seulement à l'étude.
- addr : (vide) → 6 Rue des Placis, 35230 Bourgbarré
- src : (vide) → https://unidivers.fr/brasserie-fusion-bourgbarre/
- coordPrecision : (vide) → address
- beers : (vide) → []
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://unidivers.fr/brasserie-fusion-bourgbarre/ ; https://data.geopf.fr/geocodage/search?q=6+Rue+des+Placis%2C+35230+Bourgbarr%C3%A9&limit=5

Extrait lu : « un projet d'espace de dégustation/taproom est également à l'étude »

Choix du vérificateur : Article d'annuaire local seulement.

### 15. La Dinardaise Brasserie — fiche nouvelle

- n : (vide) → La Dinardaise Brasserie
- c : (vide) → Dinard
- d : (vide) → 35
- lat : (vide) → 48.62072
- lon : (vide) → -2.07087
- km : (vide) → 611
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → Bières vendues en caves et boutiques locales et servies dans des cafés de Dinard ; vente à la brasserie non mentionnée.
- addr : (vide) → 1 Rue des Frères Boussac, 35800 Dinard
- src : (vide) → https://www.dinardemeraudetourisme.com/en/fiche/la-dinardaise-brasserie-5V52O3JK
- coordPrecision : (vide) → address
- beers.0.type : (vide) → blonde
- beers.1.type : (vide) → brune
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://www.dinardemeraudetourisme.com/en/fiche/la-dinardaise-brasserie-5V52O3JK ; https://data.geopf.fr/geocodage/search?q=1+Rue+des+Fr%C3%A8res+Boussac%2C+35800+Dinard&limit=5

Extrait lu : « Whether blonde, red or brown »

Choix du vérificateur : Page en anglais de l'office de tourisme seulement.

### 16. Ferme-Brasserie Drao — fiche nouvelle

- n : (vide) → Ferme-Brasserie Drao
- c : (vide) → Melesse
- d : (vide) → 35
- lat : (vide) → 48.21937
- lon : (vide) → -1.68858
- km : (vide) → 564.8
- cat : (vide) → 2 (Acheter seulement)
- conf : (vide) → moyenne
- note : (vide) → Boutique ouverte le vendredi de 14 h à 18 h ; rien sur une consommation sur place.
- addr : (vide) → Melesse
- src : (vide) → https://brasseriedrao.com/
- coordPrecision : (vide) → commune
- beers : (vide) → []
- contact.site : (vide) → https://brasseriedrao.com/
- contact.source : (vide) → https://brasseriedrao.com/
- contact.verifieLe : (vide) → 2026-10-17
- horaires.0.nature : (vide) → vente
- horaires.0.ven : (vide) → 14 h – 18 h
- horaires.0.source : (vide) → https://brasseriedrao.com/
- horaires.0.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://brasseriedrao.com/

Extrait lu : « NOTRE BOUTIQUE EST OUVERTE LE VENDREDI DE 14H À 18H. »

Choix du vérificateur : Position au centre de Melesse : l'adresse n'est pas relue.

### 17. La brasserie des Marais — fiche nouvelle

- n : (vide) → La brasserie des Marais
- c : (vide) → Bains-sur-Oust
- d : (vide) → 35
- lat : (vide) → 47.7123
- lon : (vide) → -2.07228
- km : (vide) → 567.6
- cat : (vide) → 0 (À confirmer)
- conf : (vide) → (vide)
- note : (vide) → En juin 2020, la brasserie répondait à une lectrice qu'elle ne pouvait pas recevoir de visiteurs, en plein déménagement ; rien de plus récent.
- addr : (vide) → Bains-sur-Oust
- src : (vide) → https://labrasseriedesmarais.wordpress.com/
- coordPrecision : (vide) → commune
- beers : (vide) → []
- contact.site : (vide) → https://labrasseriedesmarais.wordpress.com/
- contact.source : (vide) → https://labrasseriedesmarais.wordpress.com/
- contact.verifieLe : (vide) → 2026-10-17
- verifieLe : (vide) → 2026-10-17

Sources (vérifiée le 2026-10-17) : https://labrasseriedesmarais.wordpress.com/

Extrait lu : « La brasserie ne peut pas recevoir de visiteurs pour le moment. »

Choix du vérificateur : Réponse à un commentaire du 30/06/2020, temporaire : « pas de vente » non retenu. La commune vient d'OSM, d'avant le changement de local ; la page dit seulement « dans les marais de Redon ».

Empreinte du lot : 0341f4e7f97a
