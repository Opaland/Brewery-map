# Les fiches à compléter

Écrit par `npx tsx outils/completude.ts --ecrire` à partir de
`data/breweries.json` ; ne pas modifier à la main (S295). Une PR qui
change `data/` le régénère : `tests/unit/completude.test.ts` le vérifie.

« Complète » veut dire ici qu’aucun des sept champs ne manque : une
source, ce qu’on peut y faire, le site, une adresse vérifiée, un
téléphone, des horaires et des bières. C’est une mesure, pas encore une
définition : une brasserie sans accueil n’aura jamais d’horaires
d’accueil. La définition revient à Cédric (`docs/DECISIONS.md`).

## Le bilan

| | Fiches | Complètes | Sans source | À confirmer | Sans site | Sans adresse vérifiée | Sans téléphone | Sans horaires | Sans bières |
|---|---|---|---|---|---|---|---|---|---|
| **Total** | 620 | 21 (3 %) | 42 | 242 | 216 | 283 | 377 | 419 | 456 |
| 01 · Ain | 14 | 0 (0 %) | 5 | 8 | 9 | 14 | 11 | 13 | 11 |
| 02 · Aisne | 3 | 0 (0 %) | 0 | 0 | 0 | 1 | 0 | 2 | 3 |
| 03 · Allier | 4 | 0 (0 %) | 0 | 0 | 0 | 0 | 0 | 2 | 4 |
| 04 · Alpes-de-Haute-Provence | 8 | 0 (0 %) | 0 | 3 | 3 | 3 | 3 | 6 | 8 |
| 05 · Hautes-Alpes | 12 | 0 (0 %) | 0 | 3 | 7 | 3 | 8 | 10 | 12 |
| 06 · Alpes-Maritimes | 10 | 0 (0 %) | 0 | 2 | 1 | 2 | 3 | 6 | 10 |
| 07 · Ardèche | 9 | 0 (0 %) | 3 | 4 | 4 | 9 | 7 | 5 | 5 |
| 13 · Bouches-du-Rhône | 18 | 0 (0 %) | 0 | 8 | 4 | 6 | 10 | 10 | 18 |
| 14 · Calvados | 10 | 1 (10 %) | 0 | 5 | 3 | 4 | 5 | 8 | 2 |
| 15 · Cantal | 2 | 0 (0 %) | 0 | 0 | 1 | 0 | 1 | 2 | 2 |
| 18 · Cher | 4 | 0 (0 %) | 0 | 1 | 0 | 0 | 2 | 1 | 4 |
| 21 · Côte-d'Or | 14 | 0 (0 %) | 0 | 5 | 3 | 3 | 6 | 8 | 14 |
| 22 · Côtes-d'Armor | 22 | 2 (9 %) | 0 | 11 | 6 | 16 | 17 | 14 | 6 |
| 25 · Doubs | 19 | 0 (0 %) | 0 | 8 | 5 | 2 | 8 | 11 | 19 |
| 26 · Drôme | 7 | 0 (0 %) | 3 | 3 | 6 | 7 | 6 | 7 | 7 |
| 27 · Eure | 4 | 1 (25 %) | 0 | 1 | 1 | 1 | 2 | 2 | 1 |
| 28 · Eure-et-Loir | 4 | 0 (0 %) | 0 | 3 | 2 | 0 | 2 | 2 | 4 |
| 29 · Finistère | 19 | 1 (5 %) | 0 | 8 | 4 | 8 | 14 | 11 | 4 |
| 2A · Corse-du-Sud | 1 | 0 (0 %) | 0 | 1 | 0 | 1 | 0 | 1 | 1 |
| 2B · Haute-Corse | 4 | 0 (0 %) | 0 | 0 | 4 | 4 | 4 | 4 | 4 |
| 35 · Ille-et-Vilaine | 17 | 2 (12 %) | 0 | 10 | 5 | 8 | 13 | 11 | 6 |
| 36 · Indre | 2 | 0 (0 %) | 0 | 0 | 0 | 1 | 1 | 1 | 2 |
| 37 · Indre-et-Loire | 5 | 0 (0 %) | 0 | 3 | 2 | 0 | 3 | 5 | 2 |
| 38 · Isère | 32 | 1 (3 %) | 7 | 22 | 17 | 30 | 26 | 28 | 24 |
| 39 · Jura | 14 | 0 (0 %) | 0 | 9 | 10 | 2 | 9 | 11 | 13 |
| 41 · Loir-et-Cher | 1 | 0 (0 %) | 0 | 0 | 0 | 0 | 1 | 0 | 1 |
| 42 · Loire | 21 | 1 (5 %) | 4 | 9 | 10 | 16 | 14 | 17 | 15 |
| 43 · Haute-Loire | 7 | 0 (0 %) | 3 | 3 | 5 | 6 | 6 | 7 | 6 |
| 44 · Loire-Atlantique | 32 | 3 (9 %) | 0 | 12 | 10 | 9 | 20 | 21 | 11 |
| 45 · Loiret | 8 | 0 (0 %) | 0 | 2 | 0 | 1 | 8 | 6 | 8 |
| 49 · Maine-et-Loire | 11 | 0 (0 %) | 0 | 3 | 4 | 8 | 7 | 7 | 5 |
| 50 · Manche | 9 | 0 (0 %) | 0 | 4 | 4 | 4 | 9 | 6 | 5 |
| 53 · Mayenne | 4 | 0 (0 %) | 0 | 3 | 3 | 3 | 4 | 3 | 2 |
| 56 · Morbihan | 25 | 1 (4 %) | 0 | 13 | 9 | 11 | 22 | 18 | 14 |
| 58 · Nièvre | 1 | 0 (0 %) | 0 | 0 | 0 | 1 | 1 | 1 | 0 |
| 59 · Nord | 34 | 2 (6 %) | 0 | 5 | 3 | 7 | 9 | 15 | 31 |
| 60 · Oise | 2 | 0 (0 %) | 0 | 0 | 0 | 0 | 0 | 1 | 2 |
| 61 · Orne | 3 | 0 (0 %) | 0 | 2 | 2 | 2 | 2 | 3 | 3 |
| 62 · Pas-de-Calais | 11 | 0 (0 %) | 0 | 4 | 3 | 2 | 5 | 8 | 11 |
| 63 · Puy-de-Dôme | 9 | 0 (0 %) | 0 | 1 | 1 | 4 | 1 | 5 | 9 |
| 69 · Rhône | 43 | 1 (2 %) | 10 | 16 | 24 | 30 | 32 | 33 | 33 |
| 70 · Haute-Saône | 4 | 0 (0 %) | 0 | 3 | 2 | 1 | 2 | 2 | 4 |
| 71 · Saône-et-Loire | 8 | 0 (0 %) | 4 | 6 | 6 | 7 | 7 | 8 | 6 |
| 72 · Sarthe | 7 | 1 (14 %) | 0 | 1 | 1 | 3 | 6 | 3 | 3 |
| 73 · Savoie | 15 | 0 (0 %) | 3 | 6 | 6 | 14 | 10 | 8 | 8 |
| 74 · Haute-Savoie | 22 | 0 (0 %) | 0 | 4 | 1 | 1 | 9 | 15 | 22 |
| 75 · Paris | 3 | 0 (0 %) | 0 | 2 | 0 | 0 | 0 | 1 | 3 |
| 76 · Seine-Maritime | 10 | 0 (0 %) | 0 | 5 | 4 | 6 | 9 | 8 | 8 |
| 80 · Somme | 2 | 0 (0 %) | 0 | 0 | 0 | 1 | 1 | 0 | 2 |
| 83 · Var | 15 | 0 (0 %) | 0 | 2 | 3 | 4 | 4 | 7 | 15 |
| 84 · Vaucluse | 21 | 0 (0 %) | 0 | 10 | 9 | 8 | 14 | 15 | 21 |
| 85 · Vendée | 17 | 4 (24 %) | 0 | 2 | 7 | 5 | 8 | 11 | 7 |
| 89 · Yonne | 9 | 0 (0 %) | 0 | 4 | 1 | 2 | 1 | 6 | 7 |
| 92 · Hauts-de-Seine | 3 | 0 (0 %) | 0 | 1 | 1 | 2 | 2 | 1 | 3 |
| 93 · Seine-Saint-Denis | 3 | 0 (0 %) | 0 | 1 | 0 | 0 | 2 | 2 | 3 |
| 94 · Val-de-Marne | 2 | 0 (0 %) | 0 | 0 | 0 | 0 | 0 | 0 | 2 |

## Les « À confirmer » à chercher

242 fiches, par département, puis par ce qui manque en premier. Chacune manque de ce qu’on peut y faire ; la ligne dit le reste.

### 01 · Ain

- Brasserie 3B (Bassin Bellegardien) (Billiat) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Voie Maltée (Saint-Jean-de-Thurigneux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Bières Hoffmann (Brasseurs du Grand Colombier) (Culoz) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Mac Never's and Co. (Maillat) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Malt Emoi (Meximieux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie de la Pérouze (Bâgé-Dommartin) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Poulette des Ebaudis (Curtafond) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Bugey (Hauteville-Lompnes) : sans adresse vérifiée, sans téléphone, sans horaires

### 04 · Alpes-de-Haute-Provence

- Brasserie de l'Aubrée (Selonnet) : sans site, sans téléphone, sans horaires, sans bières
- Brasseur du Verdon (Esparron-de-Verdon) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Bevedis (Le Chaffaut-Saint-Jurson) : sans adresse vérifiée, sans horaires, sans bières

### 05 · Hautes-Alpes

- B3 Brasserie Bio de Briançon (Briançon) : sans site, sans téléphone, sans horaires, sans bières
- Piolit Nanobrasserie (Avançon) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Tourmente (Briançon) : sans horaires, sans bières

### 06 · Alpes-Maritimes

- B06 (Antibes) : sans téléphone, sans horaires, sans bières
- Blue Coast Brewing Company (Nice) : sans horaires, sans bières

### 07 · Ardèche

- Brasserie Graine 2 Bulles (Davézieux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Haarddrëch (Alboussière) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Kan Mêm (Colombier-le-Jeune) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans bières
- Brasserie Longue Vie (Saint-Victor) : sans adresse vérifiée, sans téléphone, sans horaires

### 13 · Bouches-du-Rhône

- Cap Marca (Arles) : sans adresse vérifiée, sans horaires, sans bières
- Microbrasserie de la Crau (Istres) : sans adresse vérifiée, sans horaires, sans bières
- Brasserie La Baroude (Aix-en-Provence) : sans téléphone, sans horaires, sans bières
- Bulles de Provence (Aix-en-Provence) : sans téléphone, sans horaires, sans bières
- La Camaraderie (Marseille) : sans téléphone, sans horaires, sans bières
- La Petite Aixoise (Saint-Cannat) : sans téléphone, sans horaires, sans bières
- Brass.Art (Velaux) : sans horaires, sans bières
- Brasserie Artisanale des Alpilles (Eygalières) : sans horaires, sans bières

### 14 · Calvados

- Brasserie Paillette (Saint-Arnoult) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Dam Bière (Dives-sur-Mer) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Mobsby's (Vire Normandie) : sans site, sans téléphone, sans horaires
- Brasserie des 9 Mondes (Ranville) : sans adresse vérifiée, sans horaires
- La JJAP – Les 2 Terres (Caen) : sans horaires

### 18 · Cher

- Brasserie de l'Arnon (Loye-sur-Arnon) : sans téléphone, sans horaires, sans bières

### 21 · Côte-d'Or

- Brasserie de Flavigny (Flavigny-sur-Ozerain) : sans site, sans adresse vérifiée, sans horaires, sans bières
- Les Brassages du Meix (Saint-Julien) : sans site, sans téléphone, sans horaires, sans bières
- Belenium (Beaune) : sans téléphone, sans horaires, sans bières
- Brasserie Bouillant (Fleurey-sur-Ouche) : sans téléphone, sans horaires, sans bières
- Brasserie de France (Beaune) : sans horaires, sans bières

### 22 · Côtes-d'Armor

- Brasserie de Launay (Lamballe-Armor) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Régionale de l'Ouest (Tonquédec) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Brassins du Lion d'Or (Trémeur) : sans site, sans adresse vérifiée, sans téléphone, sans horaires
- Tiens bon la Barre (Plouasne) : sans site, sans adresse vérifiée, sans téléphone, sans horaires
- Brasserie de La Ville Porte Amour (Plouvara) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie des 7 Îles (Trégastel) : sans adresse vérifiée, sans téléphone, sans horaires
- Brasserie Les Alchimistes Ivres (Broons) : sans adresse vérifiée, sans téléphone, sans horaires
- Brasstillerie KanArFoll (Perros-Guirec) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Nautica (Plouasne) : sans téléphone, sans horaires
- Brasserie Uncle (Binic-Étables-sur-Mer) : sans téléphone, sans horaires
- L'Armateur (La Roche-Jaudy) : sans téléphone, sans horaires

### 25 · Doubs

- Brasserie Entre 2 Mondes (Mouthier-Haute-Pierre) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Les Petites Bulles (Loray) : sans site, sans téléphone, sans horaires, sans bières
- La Chauffouillarde (Villers-le-Lac) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Terra Comtix (Mamirolle) : sans adresse vérifiée, sans horaires, sans bières
- Brasserie Sâdjé (Pays-de-Montbenoît) : sans téléphone, sans bières
- Bière du Doubs (Nancray) : sans horaires, sans bières
- Brasserie de la Quiotte (Étalans) : sans horaires, sans bières
- Hélie, microbrasserie solaire (Dampierre-les-Bois) : sans horaires, sans bières

### 26 · Drôme

- Brasserie de Roche Colombe (Valence) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Ferme-brasserie Déluge (Chabeuil) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Valentinoise (Valence) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières

### 27 · Eure

- Les Deux Amants (Val-de-Reuil) : sans site, sans téléphone, sans horaires

### 28 · Eure-et-Loir

- Brasserie Bacquet et Cie (Pierres) : sans site, sans téléphone, sans horaires, sans bières
- Micro Brasserie Funk (Bouglainval) : sans site, sans téléphone, sans bières
- Brasserie delabonne (Gellainville) : sans horaires, sans bières

### 29 · Finistère

- Brasserie An Alarc'h (La Feuillée) : sans site, sans adresse vérifiée, sans téléphone, sans horaires
- La Brasserie du Bout du Monde (Rosnoën) : sans site, sans téléphone, sans horaires, sans bières
- La Brasserie Graphique (Carantec) : sans site, sans téléphone, sans horaires
- Brasserie D'Istribilh (Plouider) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- En Bières Inconnues (Brest) : sans adresse vérifiée, sans téléphone, sans horaires
- Microbrasserie PAB (Île-de-Batz) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Le Grain du Ponant (Riec-sur-Bélon) : sans téléphone, sans horaires
- Brasserie Kerav'ale (Roscoff) : sans horaires

### 2A · Corse-du-Sud

- Filitosa A Biera Corsa (Sollacaro) : sans adresse vérifiée, sans horaires, sans bières

### 35 · Ille-et-Vilaine

- Brasserie Beltane (Rennes) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie de la Bizhhh (Le Rheu) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Fusion (Bourgbarré) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Plouc (Plerguer) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Dinardaise Brasserie (Dinard) : sans site, sans téléphone, sans horaires
- La brasserie des Marais (Bains-sur-Oust) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie l'Embardée (Fougères) : sans téléphone, sans horaires
- Brasserie Minimum (Montreuil-sur-Ille) : sans téléphone, sans horaires
- Le Brasseur Bavarois (Pleugueneuc) : sans téléphone, sans horaires
- Brasserie Smash (Rennes) : sans horaires

### 37 · Indre-et-Loire

- Brasserie Kapsyl (Chambray-lès-Tours) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie des Canailles (Rochecorbon) : sans téléphone, sans horaires
- Brasserie de la Pigeonnelle (Céré-la-Ronde) : sans horaires

### 38 · Isère

- Brasserie de Chartreuse (Miribel-les-Échelles) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie de la Sanne (Saint-Romain-de-Surieu) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Dr D. Brewpub (Grenoble) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Marrel (Grenoble) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Vercors (Biercors) (Villard-de-Lans) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Peteukrane (Saint-Bueil) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Ateliers du Dauphiné (Saint-Bueil) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Bière des Frères Clavel (Biol) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie des Faux Semblables (La Bâtie-Montgascon) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Kiltin' (Grenoble) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Les Dameuses (Claix) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Solstice (Grenoble) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Domaine du Bélier Rouge (Saint-Sauveur) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Bonne Fabrique (Le Sappey-en-Chartreuse) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Une Petite Mousse (Échirolles) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie de l'Ours Barbu (Voiron) : sans adresse vérifiée, sans horaires
- Brasserie des Roches (Chonas-l'Amballan) : sans adresse vérifiée, sans téléphone, sans horaires
- Brasserie Grésiv'ale (Barraux) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie La Dourbie (Fontaine) : sans adresse vérifiée, sans téléphone, sans horaires
- Brasserie Maltobar (Grenoble) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Dame de Malt (Villette-d'Anthon) : sans adresse vérifiée, sans téléphone, sans horaires
- La Marmotte Masquée (Saint-Pierre-de-Chartreuse) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières

### 39 · Jura

- Brasserie des Trois Épis (Orgelet) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Doloise (Jouhe) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Lizon (Lavans-lès-Saint-Claude) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie l’Origine du Monde (Orgelet) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie La Nocturne (Brainans) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Plume Jurassienne (Cramans) : sans site, sans téléphone, sans horaires, sans bières
- La Jurassique (Pupillin) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie La Cascade (Les Rousses) : sans horaires, sans bières
- Brasserie Vachement Jura (Ivrey) : sans horaires, sans bières

### 42 · Loire

- Brasserie 767 (Chazelles-sur-Lyon) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- L'Agarithe (Panissières) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Gaudine (Brasserie de la Semène) (Marlhes) : sans source, sans site, sans téléphone, sans horaires, sans bières
- Les Cuves de la Madeleine (Ambierle) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Casino de Montrond (Montrond-les-Bains) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Margau (Bonson) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Roches Précieuses (Chazelles-sur-Lyon) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Miellerie Gachet (Chazelles-sur-Lavieu) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Brasseurs du Sornin (Pouilly-sous-Charlieu) : sans adresse vérifiée, sans horaires

### 43 · Haute-Loire

- Brasserie Rohner (Le Mazet-Saint-Voy) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Vellavia (Saint-Germain-Laprade) : sans source, sans site, sans téléphone, sans horaires, sans bières
- La Strol (Monistrol-sur-Loire) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières

### 44 · Loire-Atlantique

- Brasserie artisanale Philmore (La Chapelle-sur-Erdre) : sans site, sans téléphone, sans horaires, sans bières
- BUBAR (Nantes) : sans site, sans téléphone, sans horaires, sans bières
- La Turbulente (La Turballe) : sans site, sans téléphone, sans horaires
- Microbrasserie Brewen (Saint-Brevin-les-Pins) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie La Maison Blanche (Machecoul-Saint-Même) : sans adresse vérifiée, sans téléphone, sans horaires
- Brasserie Tête Haute (Le Cellier) : sans adresse vérifiée, sans horaires, sans bières
- Brasserie La Déviation (Riaillé) : sans téléphone, sans horaires
- Brasserie La Hulotte (Sautron) : sans téléphone, sans horaires, sans bières
- Brasserie Vestibule (Mesquer) : sans téléphone, sans horaires
- Brasserie Nautile (Rezé) : sans horaires, sans bières
- Brasserie Plormel (Vieillevigne) : sans horaires
- Brasserie San Roce (Jans) : sans horaires

### 45 · Loiret

- La Riole (La Ferté-Saint-Aubin) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Brasserie des Écluses (Saint-Hilaire-Saint-Mesmin) : sans téléphone, sans horaires, sans bières

### 49 · Maine-et-Loire

- Nuage Craft Beer (Brissac Loire Aubance) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Penrose (Angers) : sans adresse vérifiée, sans téléphone, sans horaires
- La Rombière (Beaupréau-en-Mauges) : sans adresse vérifiée, sans horaires

### 50 · Manche

- Brasserie Bifrost (Saint-Lô) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Cotentine (Barneville-Carteret) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Fée d'Orge (Bréhal) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Moussette (Hauteville-sur-Mer) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières

### 53 · Mayenne

- Brasserie associative de Montflours (BAM) (Montflours) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Cousin (Pré-en-Pail-Saint-Samson) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie des Nico (Lassay-les-Châteaux) : sans site, sans adresse vérifiée, sans téléphone, sans horaires

### 56 · Morbihan

- Bar Brasserie Artisanale l'Etrille (Locmariaquer) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Akène (Saint-Léry) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie artisanale L'Âne Doré (Languidic) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Casse-Grain (Damgan) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie de l'Hermine (Belz) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Déferle Micro-brasserie (Plouhinec) : sans site, sans téléphone, sans horaires, sans bières
- Horla (Grand-Champ) : sans site, sans adresse vérifiée, sans téléphone, sans horaires
- La Bière de Groix (Groix) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Gwennili (Locoal-Mendon) : sans adresse vérifiée, sans téléphone, sans horaires
- Brasserie La Bambelle (Saint-Gravé) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- L'âne Brasseur (Saint-Aignan) : sans adresse vérifiée, sans horaires, sans bières
- Microbrasserie VOL 56 (Sarzeau) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Microbrasserie Barque (Malestroit) : sans horaires, sans bières

### 59 · Nord

- Brasserie Motte Cordonnier (Armentières) : sans téléphone, sans horaires, sans bières
- Waale (Wasquehal) : sans téléphone, sans horaires, sans bières
- Brasserie Breweppes (Herlies) : sans horaires, sans bières
- Brasserie des Dunes de Flandre (Bray-Dunes) : sans horaires, sans bières
- Brasserie Lilloise (Roncq) : sans horaires, sans bières

### 61 · Orne

- Château de la Bière (Lonlay-l'Abbaye) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie du Perche (L'Home-Chamondot) : sans adresse vérifiée, sans horaires, sans bières

### 62 · Pas-de-Calais

- Brasserie de l'Abbaye de Clairmarais (Clairmarais) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Funquet (Escœuilles) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie L'Intemporelle (Wailly) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Chromatique (Outreau) : sans téléphone, sans horaires, sans bières

### 63 · Puy-de-Dôme

- Brasserie des Montagnes (Gelles) : sans horaires, sans bières

### 69 · Rhône

- Autour de la Bière (Chaussan) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Demi-Lune (Tassin-la-Demi-Lune) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Mont Popey (Saint-Forgeux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Krüger (Solaize) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Bulles d'Orge (Oullins) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- DWYN Brewing (Montagny) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Hoodo (Saint-Forgeux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Fabrique du Faubourg (Vénissieux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Maltazar (Vénissieux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Misso (Civrieux-d'Azergues) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Coldie Brewery (Lyon 7e) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Mozel'âne (Thizy-les-Bourgs) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Platypus Brewpub (Lyon 2e) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Cadole (Villié-Morgon) : sans adresse vérifiée, sans téléphone, sans horaires
- La Canute Lyonnaise (Pierre-Bénite) : sans adresse vérifiée, sans téléphone, sans horaires
- Brasserie Animus (Grigny-sur-Rhône) : sans téléphone, sans horaires

### 70 · Haute-Saône

- Brasserie 1551 (Charcenne) : sans site, sans téléphone, sans bières
- Brasserie artisanale de la Rente Rouge (Chargey-lès-Gray) : sans adresse vérifiée, sans bières
- Brasserie Frizon (Plancher-les-Mines) : sans horaires, sans bières

### 71 · Saône-et-Loire

- Brasserie des 2 Roches (Vergisson) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie La Couleuvre (Dompierre-les-Ormes) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Paille (Lournand) : sans source, sans site, sans téléphone, sans horaires, sans bières
- Terre de Possibles (Dompierre-les-Ormes) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Two Dudes (Tournus) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie de Cluny (Château) : sans adresse vérifiée, sans horaires

### 72 · Sarthe

- La Feuille Rouge (Vancé) : sans adresse vérifiée, sans téléphone, sans horaires

### 73 · Savoie

- Brasserie Coup de Mousse (Chambéry) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Montagnarde (Saint-Alban-Leysse) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Croqueurs de Lune (Serrières-en-Chautagne) : sans source, sans site, sans téléphone, sans horaires, sans bières
- Brasserie Caquot (Entrelacs) : sans adresse vérifiée, sans horaires
- Brasserie Quardin (Chignin) : sans adresse vérifiée, sans horaires
- La Barbue (La Ravoire) : sans adresse vérifiée, sans téléphone, sans horaires

### 74 · Haute-Savoie

- Big Mountain Brewing Company (Cluses) : sans téléphone, sans horaires, sans bières
- Brasserie Bombardos (Annecy) : sans téléphone, sans horaires, sans bières
- Brasserie Maelström (La Balme-de-Sillingy) : sans horaires, sans bières
- Les Brasseurs Savoyards (Alby-sur-Chéran) : sans horaires, sans bières

### 75 · Paris

- Brasserie de l'Être (Paris) : sans horaires, sans bières
- Brasserie La Baleine (Paris) : sans bières

### 76 · Seine-Maritime

- Brasserie Dieppoise (Martin-Église) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Saint Joseph (Le Havre) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Yata (Lillebonne) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Ragnar (Oissel-sur-Seine) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Bakbuk (Les Authieux-sur-le-Port-Saint-Ouen) : sans téléphone, sans horaires, sans bières

### 83 · Var

- La Snook (Esparron-de-Pallières) : sans adresse vérifiée, sans horaires, sans bières
- La Tuf (Le Tailleur de Bières) (Cotignac) : sans horaires, sans bières

### 84 · Vaucluse

- Agora Brasseurs (Carpentras) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Chante Grenouille (Vaison-la-Romaine) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Josseline (Monieux) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Fatch Brasserie Provençale (Courthézon) : sans site, sans téléphone, sans horaires, sans bières
- La Déjantée (L'Isle-sur-la-Sorgue) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Brasseurs Bran'chais (Châteauneuf-du-Pape) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Brasserie Interdite (Pertuis) : sans téléphone, sans horaires, sans bières
- La Comédienne (Avignon) : sans téléphone, sans horaires, sans bières
- Brasserie Epicentre (Pertuis) : sans horaires, sans bières
- Miss'Isle (Cavaillon) : sans horaires, sans bières

### 85 · Vendée

- Brasserie Plume (Châteauneuf) : sans site, sans téléphone, sans horaires, sans bières
- Opé Brewery (Les Sables-d'Olonne) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières

### 89 · Yonne

- Brasserie Popihn (Vaumort) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie de Chablis (Maddam) (Chablis) : sans horaires, sans bières
- Grand Duc Microbrasserie (Sormery) : sans horaires, sans bières
- La Vaugermaine (Saint-Cyr-les-Colons) : sans horaires, sans bières

### 92 · Hauts-de-Seine

- Suresnes Beer Factory (Suresnes) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières

### 93 · Seine-Saint-Denis

- Frogbeer (Saint-Denis) : sans téléphone, sans horaires, sans bières

