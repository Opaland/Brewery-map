# Lot S63 — horaires venus d'OpenStreetMap, relus sur la page de la brasserie

Pour toi, Cédric. Aucune fiche de `data/` n'a d'horaires. S60 a trouvé une étiquette `opening_hours` sur 17 des fiches rapprochées d'OpenStreetMap ; ce lot ne garde que ce que la page de la brasserie dit elle-même.

**Décompte** : 17 fiches avec des horaires OSM = 7 proposées + 10 écartées (tableau ci-dessous).

**7 propositions** (8 blocs d'horaires). **Rien n'est écrit dans `data/`** tant que tu n'as pas répondu par les numéros acceptés (« j'accepte 1, 3… » ou « tout sauf … »).

**Comment le lot a été fait** :
- OSM n'est qu'une piste (© les contributeurs d'OpenStreetMap, ODbL) : les créneaux proposés sont **ceux de la page de la brasserie**. Deux fois la page contredit OSM (Quintillière : vendredi et non mercredi ; Bières du Temps : 16 h et non 15 h) ; c'est la page qui est reprise ;
- la nature du bloc (accueil ou vente) est celle que la page écrit ; quand la page ne dit pas ce que ses horaires couvrent, la fiche est écartée ;
- `outils/curation.ts controler` relit chaque heure sur la page de son bloc : contrôle sans écart.

**À savoir avant de décider** : accepter des horaires date la fiche (règle S11). Deux notes de fiche (La Canaille, L'Etincelle) contredisent leur page d'aujourd'hui : c'est écrit dans le choix ; la note n'est pas changée ici.

## Écartés

| Fiche | Raison |
|---|---|
| La Soyeuse | la valeur OSM porte un commentaire (« Bar ») et définit le mercredi deux fois : rien à lire sans deviner |
| Brasserie de Chanaz | la valeur OSM a une règle sans jours ; le site répond 500 |
| Brasserie de la Pleine Lune | ses horaires sont dans le bloc de contact, sans dire ce qu'ils couvrent ; leur donner la nature « bar » serait une déduction |
| La Chénou, La Farlodoise, Ninkasi Fabriques, L'Ours qui brasse, Les Deux Branches, Brasserie Archimalt | les heures OSM ne sont pas toutes sur une page de la brasserie (ou la page ne répond pas) |
| Brasserie Georges | les heures OSM ne sont pas sur le site, qui renvoie aux réservations |

## Lot s63-horaires-osm — 7 proposition(s)

### 1. Ferme de la Quintillière

- horaires.0.nature : (vide) → vente
- horaires.0.ven : (vide) → 16 h 30 – 19 h 30
- horaires.0.source : (vide) → http://www.fermedelaquintilliere.com/bieres-busard/
- horaires.0.verifieLe : (vide) → 2026-10-18

Sources (vérifiée le 2026-10-18) : http://www.fermedelaquintilliere.com/bieres-busard/ ; https://www.openstreetmap.org/way/138335054

Extrait lu : « A la brasserie – Ferme de la Quintillière : tous les vendredis soirs, de 16h30 à 19h30. »

Choix du vérificateur : OSM dit le mercredi ; la page de la ferme dit le vendredi : c'est la page qui est reprise.

### 2. Brasserie Kachmar

- horaires.0.nature : (vide) → vente
- horaires.0.sam : (vide) → 10 h – 18 h
- horaires.0.source : (vide) → https://www.brasserie-kachmar.fr
- horaires.0.verifieLe : (vide) → 2026-10-18

Sources (vérifiée le 2026-10-18) : https://www.brasserie-kachmar.fr ; https://www.openstreetmap.org/node/13200279683

Extrait lu : « La brasserie vous accueille pour la vente en direct tous les samedis de 10h à 18h sans interruption »

### 3. Les Bières du Temps

- horaires.0.nature : (vide) → vente
- horaires.0.mer : (vide) → 10 h – 12 h 30, 16 h – 19 h
- horaires.0.ven : (vide) → 16 h – 19 h
- horaires.0.sam : (vide) → 10 h – 12 h 30, 15 h – 18 h
- horaires.0.remarque : (vide) → Boutique.
- horaires.0.source : (vide) → https://www.lesbieresdutemps.com/
- horaires.0.verifieLe : (vide) → 2026-10-18

Sources (vérifiée le 2026-10-18) : https://www.lesbieresdutemps.com/ ; https://www.openstreetmap.org/node/5705298290

Extrait lu : « La boutique est ouverte le MERCREDI de 10h à 12h30 et de 16h à 19h le VENDREDI de 16h à 19h le SAMEDI de 10h à 12h30 et de 15h à 18h »

Choix du vérificateur : OSM dit 15 h le mercredi après-midi ; la page dit 16 h : c'est la page qui est reprise.

### 4. La Canaille

- horaires.0.nature : (vide) → vente
- horaires.0.lun : (vide) → 9 h – 17 h
- horaires.0.mar : (vide) → 9 h – 17 h
- horaires.0.mer : (vide) → 9 h – 17 h
- horaires.0.jeu : (vide) → 9 h – 17 h
- horaires.0.ven : (vide) → 9 h – 23 h
- horaires.0.sam : (vide) → 16 h – 20 h
- horaires.0.remarque : (vide) → Boutique, vente à emporter.
- horaires.0.source : (vide) → https://www.brasserielacanaille.com
- horaires.0.verifieLe : (vide) → 2026-10-18
- horaires.1.nature : (vide) → accueil
- horaires.1.ven : (vide) → 16 h – 23 h
- horaires.1.sam : (vide) → 16 h – 21 h
- horaires.1.remarque : (vide) → Bar.
- horaires.1.source : (vide) → https://www.brasserielacanaille.com
- horaires.1.verifieLe : (vide) → 2026-10-18

Sources (vérifiée le 2026-10-18) : https://www.brasserielacanaille.com ; https://www.openstreetmap.org/node/2665151591

Extrait lu : « Boutique / Vente à emporter Du lundi au jeudi : 9h – 17h Vendredi : 9h – 23h Samedi : 16h – 20h Bar Vendredi : 16h – 23h Samedi : 16h – 21h »

Choix du vérificateur : La note de la fiche (« pas de bar cité », autres horaires) date d'une lecture antérieure ; la page annonce maintenant un bar. La note n'est pas changée ici. Les numéros de réservation de la page sont des mobiles : non repris.

### 5. L'Etincelle

- horaires.0.nature : (vide) → vente
- horaires.0.mer : (vide) → 16 h – 19 h
- horaires.0.ven : (vide) → 16 h – 19 h
- horaires.0.remarque : (vide) → « Vente en direct & brewpub », brewpub en terrasse uniquement.
- horaires.0.source : (vide) → https://www.brasserie-letincelle.fr/
- horaires.0.verifieLe : (vide) → 2026-10-18

Sources (vérifiée le 2026-10-18) : https://www.brasserie-letincelle.fr/ ; https://www.openstreetmap.org/way/138474252

Extrait lu : « Horaires vente en direct & brewpub* Mercredi · 16h-19h Vendredi : 16h-19h *terrasse uniquement »

Choix du vérificateur : La note de la fiche dit « pas de licence pour servir de l'alcool au verre » ; la page parle d'un brewpub en terrasse. Le bloc est donné en « vente » ; la note n'est pas changée ici.

### 6. Brasserie Stéphanoise

- horaires.0.nature : (vide) → vente
- horaires.0.ven : (vide) → 14 h – 18 h 30
- horaires.0.sam : (vide) → 14 h – 18 h 30
- horaires.0.remarque : (vide) → Vente à emporter, visites et dégustations ; en dehors, sur rendez-vous.
- horaires.0.source : (vide) → https://labrasseriestephanoise.com/
- horaires.0.verifieLe : (vide) → 2026-10-18

Sources (vérifiée le 2026-10-18) : https://labrasseriestephanoise.com/ ; https://www.openstreetmap.org/node/4343465583

Extrait lu : « Horaires d'ouverture Vente à emporter, visites et dégustations tous les vendredis et samedi de 14h à 18h30. »

Choix du vérificateur : La dégustation va avec la visite : le bloc est donné en « vente ».

### 7. Nomade Brewery

- horaires.0.nature : (vide) → accueil
- horaires.0.mar : (vide) → 12 h – 22 h
- horaires.0.mer : (vide) → 12 h – 22 h
- horaires.0.jeu : (vide) → 12 h – 23 h 30
- horaires.0.ven : (vide) → 12 h – 23 h 30
- horaires.0.sam : (vide) → 14 h 30 – 19 h
- horaires.0.remarque : (vide) → TapRoom.
- horaires.0.source : (vide) → https://www.nomadebiere.fr
- horaires.0.verifieLe : (vide) → 2026-10-18

Sources (vérifiée le 2026-10-18) : https://www.nomadebiere.fr ; https://www.openstreetmap.org/node/12852782429

Extrait lu : « Infos TapRoom Mardi-mercredi 12h-22h Jeudi-vendredi 12h-23h30 Samedi 14h30-19h »

Empreinte du lot : 1a3a479c55b8
