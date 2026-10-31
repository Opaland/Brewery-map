# P1-marie — marie

**Question** : Juge l'application telle qu'elle est sur main : peux-tu trouver une brasserie sympa près de Lyon et comprendre ce qu'on peut y faire, sans connaître le vocabulaire de la bière ? Rends ton rapport au format de ta fiche.

**Contrôles automatiques** : ÉCART · tours 18 · coût 0.332 $
- outils interdits employés : aucun
- rubriques manquantes : aucune
- attendus absents : aucun
- dépôt changé par l'essai : non
- références fichier:ligne introuvables : fiche.spec.ts:106, decouverte.spec.ts:88, fiche.spec.ts:106

## Réponse

**Rapport de Marie — « une brasserie sympa près de Lyon », sans connaître le vocabulaire de la bière**

J'ai lu le code et les tests, sans lancer Playwright. Je n'ai pas vu l'application tourner.

## Bloquant

Je n'ai trouvé aucun bloquant pour atteindre « une brasserie près de Lyon » et voir ce qu'on peut y faire. Le pas « sympa » n'est pas cherché ici (voir Hypothèses).

## Gênant

1. **Au premier écran, « près de Lyon » est en fait « près de Brignais ».**
   - Le texte de départ dit « En attendant, les distances se comptent depuis Brignais » (`src/PointDeDepart.tsx:139`). Je ne sais pas où est Brignais.
   - Si je tape « lyon » dans la recherche, un bouton « Compter depuis « lyon » » apparaît (`src/App.tsx:763-777`). C'est prouvé par `tests/e2e/compter-depuis.spec.ts`. Le pas existe donc, mais je dois deviner qu'il faut d'abord taper.
   - Ce test remplit « lyon » en minuscules et s'arrête sur « Point de départ : Lyon ». Le cas « je ne tape rien et j'attends que la liste soit celle de Lyon » n'est pas prouvé.

2. **Les mots du métier sont expliqués dans la fiche, pas dans la liste, où je les lis d'abord.**
   - Chaque ligne affiche la note de la source en entier, sous « Ce que dit la source » (`src/Liste.tsx:174-179`). Cette note contient souvent « Brewpub » ou « taproom ».
   - Le lexique (`src/core/lexique.ts`) ne s'affiche qu'après l'ouverture de la fiche (`src/Fiche.tsx:255-265`). Le seul test est `fiche.spec.ts:106`, qui clique d'abord sur la ligne.
   - Mon chiffre : 153 des 643 fiches de `data/breweries.json` citent au moins un de ces mots dans leur note. Recompter avec :
     `node -e "…note.match(/brewpub|taproom|pression|…/)"` sur `data/breweries.json`.
   - Exemple dans la liste, à moins de 30 km : « Brewpub (pression, bouteilles, planches) mars-octobre jeu-ven-sam ; la page cite une « vente directe de bières » » (Microbrasserie de Montchat). Je dois ouvrir la fiche pour comprendre « brewpub ».

3. **Des mots restent sans explication.**
   - « pression » apparaît dans 37 notes. À moins de 30 km, La Chénou dit « bières en bouteille ou pression » et Montchat dit « pression ».
   - « cave à bières » apparaît dans la note du Brass'in, et « craft » dans deux notes.
   - Aucun de ces mots n'est dans `LEXIQUE` (`src/core/lexique.ts:10-19`). Pour le vérifier : `grep -n "pression\|cave" src/core/lexique.ts` ne ressort rien.
   - « fût » est expliqué, pas « pression », alors que c'est le même sens.

4. **Les types de bière sont bien expliqués dans le menu, mais ce filtre est replié.**
   - Chaque option dit son sens : « IPA — très houblonnée, souvent amère » (`src/core/bieres.ts:12-27`, `src/FiltreType.tsx:50`).
   - Mais il est rangé sous « Plus de filtres » (`src/App.tsx:827-838`), et « houblonnée » reste un mot du métier.
   - Il ne peut aussi montrer que les fiches dont les bières sont renseignées. L'application le dit sous le menu (`src/FiltreType.tsx:55-65`) avec une phrase longue : « Bières renseignées sur n fiches sur total vérifiées : les autres, et celles d'OpenStreetMap, n'apparaissent pas avec ce filtre ». Je comprends mal « vérifiées » et « OpenStreetMap ».

5. **Le badge « À confirmer » est dur à lire pour moi.**
   - Autour de Lyon, 11 des 24 fiches à moins de 15 km sont en catégorie 0, par exemple Coldie Brewery et Platypus Brewpub. Calcul : `km<=15 && cat===0` sur `data/breweries.json`.
   - Pour ces fiches, la ligne ajoute « Pourquoi : » puis le texte de la source (`src/Liste.tsx:176`). Comme pour Platypus, ce texte dit parfois « vente à emporter non citée ». C'est exact, mais ça ne m'aide pas à décider si j'y vais.

## Vérifié sans obstacle

- **Chercher par commune, sans la carte.** `tests/e2e/decouverte.spec.ts:38` tape « oullins » et trouve une ligne avec « Oullins (69) ». Le même fichier couvre la recherche sans accent ni majuscule (`:55`).
- **La liste suffit sans la carte.** Le rayon change la liste (`:63`) et la liste est triée par distance (`:75`).
- **Les cinq catégories ont des noms en clair** : « Acheter et consommer sur place », « Acheter seulement », etc. Elles sont prouvées cochées et filtrantes par `decouverte.spec.ts:88`, et définies dans `src/core/categories.ts:10-16`.
- **Mon vocabulaire est partiellement couvert** : les huit mots du lexique des notes et les quatorze styles du lexique des bières (`src/core/lexique.ts`). Un test e2e prouve « brewpub » (`fiche.spec.ts:106`), et `tests/unit/lexique.test.ts` couvre le reste.
- **La fiche ouvre sur ce qu'on peut y faire** (`src/EnBref.tsx`), avec « (à vérifier) » quand la confiance est faible (`:25-27`) et « Vérifiez avant d'y aller » dès la ligne (`src/Liste.tsx:151-156`).
- **Je n'ai pas besoin de la carte** pour lire une fiche : horaires, « Y aller » et « Bières » sont dans la liste dépliée (`src/Fiche.tsx:269-273`).

## Hypothèses

- « Sympa » n'a pas d'équivalent dans l'application : pas d'ambiance, pas de note, pas de tri par qualité (`grep -n "sympa\|ambiance\|avis" src/Fiche.tsx` ne ressort rien). Je suppose que la catégorie « Acheter et consommer sur place » remplace « sympa » pour moi. Une vraie personne devrait dire si c'est le cas.
- Je suppose qu'avec mon téléphone je laisse les filtres repliés et que je ne vois pas « Type de bière ». Seule une vraie utilisatrice dirait si elle le cherche.
- Je suppose que « brewpub » m'arrête vraiment dans la liste. C'est peut-être un mot que je comprends par le contexte, ou que je saute.
- Je n'ai pas lu les captures ni l'écran réel : mes constats sur la mise en page ne valent que pour ce que le code montre.

## Questions à choix

1. Où expliquer les mots du métier de la note ?
   - a) Dans la ligne de la liste (sous la note, comme dans la fiche).
   - b) Seulement dans la fiche, comme aujourd'hui.
   - c) Réécrire les notes sans ces mots dans `data/`.
2. « pression » et « cave à bières » : les ajouter au lexique des notes ?
   - a) Oui, les deux.
   - b) Seulement « pression ».
   - c) Non.
3. « Près de Lyon » : que faire du départ « Brignais » au premier écran ?
   - a) Demander une position ou une commune avant d'afficher la liste.
   - b) Garder Brignais, mais le dire d'une phrase simple (« le sud-ouest de Lyon »).
   - c) Ne rien changer.

## Outils employés

- Grep
- Bash
- Grep
- Bash
- Read
- Bash
- Read
- Bash
- Bash
- Bash
- Read
- Bash
- Read
- Bash
- Read
- Read
- Bash
- Read
- Read
- Bash
- Read
- Bash
- Read
- Bash
- Bash
- Bash
- Bash
- Read
- Bash
- Read
- Bash
- Bash
- Bash
- Bash
