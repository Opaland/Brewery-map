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
| **Total** | 358 | 17 (5 %) | 57 | 180 | 182 | 236 | 278 | 277 | 223 |
| 01 · Ain | 16 | 0 (0 %) | 7 | 10 | 12 | 16 | 13 | 15 | 14 |
| 07 · Ardèche | 10 | 0 (0 %) | 4 | 7 | 8 | 10 | 8 | 9 | 9 |
| 14 · Calvados | 10 | 1 (10 %) | 0 | 5 | 4 | 4 | 6 | 8 | 2 |
| 22 · Côtes-d'Armor | 22 | 2 (9 %) | 0 | 11 | 6 | 16 | 17 | 14 | 6 |
| 26 · Drôme | 9 | 0 (0 %) | 5 | 5 | 8 | 9 | 8 | 9 | 9 |
| 27 · Eure | 4 | 1 (25 %) | 0 | 1 | 1 | 1 | 2 | 2 | 1 |
| 29 · Finistère | 19 | 1 (5 %) | 0 | 8 | 7 | 8 | 15 | 13 | 8 |
| 35 · Ille-et-Vilaine | 17 | 2 (12 %) | 0 | 10 | 5 | 8 | 13 | 11 | 6 |
| 37 · Indre-et-Loire | 4 | 0 (0 %) | 0 | 2 | 1 | 0 | 2 | 4 | 1 |
| 38 · Isère | 33 | 1 (3 %) | 9 | 25 | 22 | 31 | 28 | 30 | 27 |
| 42 · Loire | 21 | 1 (5 %) | 4 | 10 | 10 | 17 | 15 | 17 | 15 |
| 43 · Haute-Loire | 7 | 0 (0 %) | 4 | 4 | 6 | 7 | 7 | 7 | 7 |
| 44 · Loire-Atlantique | 32 | 2 (6 %) | 0 | 12 | 11 | 9 | 21 | 22 | 12 |
| 49 · Maine-et-Loire | 11 | 0 (0 %) | 0 | 3 | 4 | 8 | 7 | 7 | 5 |
| 50 · Manche | 9 | 0 (0 %) | 0 | 4 | 4 | 4 | 9 | 6 | 5 |
| 53 · Mayenne | 4 | 0 (0 %) | 0 | 3 | 3 | 3 | 4 | 3 | 2 |
| 56 · Morbihan | 23 | 1 (4 %) | 0 | 13 | 9 | 11 | 20 | 16 | 12 |
| 61 · Orne | 3 | 0 (0 %) | 0 | 2 | 2 | 2 | 2 | 3 | 3 |
| 69 · Rhône | 47 | 0 (0 %) | 14 | 21 | 31 | 35 | 38 | 39 | 41 |
| 71 · Saône-et-Loire | 8 | 0 (0 %) | 5 | 6 | 7 | 8 | 8 | 8 | 7 |
| 72 · Sarthe | 7 | 1 (14 %) | 0 | 1 | 1 | 3 | 6 | 3 | 3 |
| 73 · Savoie | 15 | 0 (0 %) | 5 | 10 | 9 | 15 | 12 | 12 | 13 |
| 76 · Seine-Maritime | 10 | 0 (0 %) | 0 | 5 | 4 | 6 | 9 | 8 | 8 |
| 85 · Vendée | 17 | 4 (24 %) | 0 | 2 | 7 | 5 | 8 | 11 | 7 |

## Les « À confirmer » à chercher

180 fiches, par département, puis par ce qui manque en premier. Chacune manque de ce qu’on peut y faire ; la ligne dit le reste.

### 01 · Ain

- Brasserie 3B (Bassin Bellegardien) (Billiat) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Revermont (Les Deux Frères) (Peyrieu) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Ferme-Brasserie de Belmonthé (Belmont-Luthézieu) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Voie Maltée (Saint-Jean-de-Thurigneux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Bières Hoffmann (Brasseurs du Grand Colombier) (Culoz) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Mac Never's and Co. (Maillat) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Malt Emoi (Meximieux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie de la Pérouze (Bâgé-Dommartin) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Bugey (Hauteville-Lompnes) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Poulette des Ebaudis (Curtafond) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières

### 07 · Ardèche

- Brasserie Graine 2 Bulles (Davézieux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Haarddrëch (Alboussière) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Kan Mêm (Colombier-le-Jeune) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Rhôdanienne (Saint-Jean-de-Muzols) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Kokine (Désaignes) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Longue Vie (Saint-Victor) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Grange du Seigneur (Champis) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières

### 14 · Calvados

- Brasserie Paillette (Saint-Arnoult) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Dam Bière (Dives-sur-Mer) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Mobsby's (Vire Normandie) : sans site, sans téléphone, sans horaires
- Brasserie des 9 Mondes (Ranville) : sans adresse vérifiée, sans horaires
- La JJAP – Les 2 Terres (Caen) : sans horaires

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

### 26 · Drôme

- Brasserie de Roche Colombe (Valence) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie des Utopies (Chanos-Curson) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Hildegarde (Chanos-Curson) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Ferme-brasserie Déluge (Chabeuil) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Valentinoise (Valence) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières

### 27 · Eure

- Les Deux Amants (Val-de-Reuil) : sans site, sans téléphone, sans horaires

### 29 · Finistère

- Brasserie An Alarc'h (La Feuillée) : sans site, sans adresse vérifiée, sans téléphone, sans horaires
- La Brasserie du Bout du Monde (Rosnoën) : sans site, sans téléphone, sans horaires, sans bières
- La Brasserie Graphique (Carantec) : sans site, sans téléphone, sans horaires
- Brasserie D'Istribilh (Plouider) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- En Bières Inconnues (Brest) : sans adresse vérifiée, sans téléphone, sans horaires
- Microbrasserie PAB (Île-de-Batz) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Le Grain du Ponant (Riec-sur-Bélon) : sans téléphone, sans horaires
- Brasserie Kerav'ale (Roscoff) : sans horaires

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

- Brasserie des Canailles (Rochecorbon) : sans téléphone, sans horaires
- Brasserie de la Pigeonnelle (Céré-la-Ronde) : sans horaires

### 38 · Isère

- Brasserie de Chartreuse (Miribel-les-Échelles) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie de la Sanne (Saint-Romain-de-Surieu) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Dr D. Brewpub (Grenoble) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Marrel (Grenoble) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Vercors (Biercors) (Autrans) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Peteukrane (Saint-Bueil) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Polack (Saint-Bueil) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Dame de Malt (Villette-d'Anthon) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Ateliers du Dauphiné (Saint-Bueil) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Bière des Frères Clavel (Biol) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie de l'Ours Barbu (Voiron) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie des Faux Semblables (La Bâtie-Montgascon) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Grésiv'ale (Barraux) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Kiltin' (Grenoble) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Les Dameuses (Claix) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Solstice (Grenoble) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Domaine du Bélier Rouge (Saint-Sauveur) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Bonne Fabrique (Le Sappey-en-Chartreuse) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- P'tit Labo (Brasserie de Grenoble) (Grenoble) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Une Petite Mousse (Échirolles) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie des Roches (Chonas-l'Amballan) : sans adresse vérifiée, sans téléphone, sans horaires
- Brasserie La Dourbie (Fontaine) : sans adresse vérifiée, sans téléphone, sans horaires
- Brasserie La Furieuse (Sassenage) : sans adresse vérifiée, sans horaires
- Brasserie Maltobar (Grenoble) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Marmotte Masquée (Saint-Pierre-de-Chartreuse) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières

### 42 · Loire

- Brasserie 767 (Chazelles-sur-Lyon) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- L'Agarithe (Panissières) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Gaudine (Brasserie de la Semène) (Saint-Genest-Malifaux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Cuves de la Madeleine (Ambierle) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Casino de Montrond (Montrond-les-Bains) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Margau (Bonson) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Roches Précieuses (Chazelles-sur-Lyon) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Miellerie Gachet (Chazelles-sur-Lavieu) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie de la Loire (Saint-Just-Saint-Rambert) : sans adresse vérifiée, sans téléphone, sans horaires
- Les Brasseurs du Sornin (Pouilly-sous-Charlieu) : sans adresse vérifiée, sans horaires

### 43 · Haute-Loire

- Brasserie Rohner (Le Mazet-Saint-Voy) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Vellavia (Polignac) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Strol (Monistrol-sur-Loire) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Manev'Ale (Le Mazet-Saint-Voy) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières

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

### 61 · Orne

- Château de la Bière (Lonlay-l'Abbaye) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie du Perche (L'Home-Chamondot) : sans adresse vérifiée, sans horaires, sans bières

### 69 · Rhône

- Autour de la Bière (Chaussan) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Demi-Lune (Tassin-la-Demi-Lune) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie des Monts du Lyonnais (Saint-Martin-en-Haut) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Chartreux (Lantignié) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie du Mont Popey (Saint-Forgeux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Krüger (Solaize) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Bulles d'Orge (Oullins) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- DWYN Brewing (Montagny) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- FFAKE Brasserie (Rillieux-la-Pape) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Hoodo (Saint-Forgeux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Fabrique du Faubourg (Vénissieux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Aubépines (Sainte-Consorce) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Maltazar (Vénissieux) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Misso (Civrieux-d'Azergues) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Animus (Vaugneray) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Coldie Brewery (Lyon 7e) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Cadole (Villié-Morgon) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Mozel'âne (Thizy-les-Bourgs) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Platypus Brewpub (Lyon 2e) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Canute Lyonnaise (Pierre-Bénite) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Georges (Lyon 2e) : sans horaires, sans bières

### 71 · Saône-et-Loire

- Brasserie de Cluny (Château) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie des 2 Roches (Vergisson) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie La Couleuvre (Dompierre-les-Ormes) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Paille (Château) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Terre de Possibles (Dompierre-les-Ormes) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Two Dudes (Tournus) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières

### 72 · Sarthe

- La Feuille Rouge (Vancé) : sans adresse vérifiée, sans téléphone, sans horaires

### 73 · Savoie

- Brasserie B.A.S. (Sabaudia) (Voglans) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Coup de Mousse (Chambéry) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie de Chanaz (Chanaz) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Montagnarde (Saint-Alban-Leysse) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Les Croqueurs de Lune (Chanaz) : sans source, sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Barbue (La Ravoire) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- La Mousse du Guiers (Saint-Genix-les-Villages) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Caquot (Entrelacs) : sans adresse vérifiée, sans horaires
- Brasserie du Mont Blanc (La Motte-Servolex) : sans adresse vérifiée, sans horaires, sans bières
- Brasserie Quardin (Chignin) : sans adresse vérifiée, sans horaires

### 76 · Seine-Maritime

- Brasserie Dieppoise (Martin-Église) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Saint Joseph (Le Havre) : sans site, sans téléphone, sans horaires, sans bières
- Brasserie Yata (Lillebonne) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Ragnar (Oissel-sur-Seine) : sans adresse vérifiée, sans téléphone, sans horaires, sans bières
- Brasserie Bakbuk (Les Authieux-sur-le-Port-Saint-Ouen) : sans téléphone, sans horaires, sans bières

### 85 · Vendée

- Brasserie Plume (Châteauneuf) : sans site, sans téléphone, sans horaires, sans bières
- Opé Brewery (Les Sables-d'Olonne) : sans site, sans adresse vérifiée, sans téléphone, sans horaires, sans bières

