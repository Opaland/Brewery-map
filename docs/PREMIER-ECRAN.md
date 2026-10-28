# Le premier écran quand le fichier grandit (S293)

Mesuré le 18/10 par `outils/mesure-premier-ecran.ts`, sur la page construite
(`npm run build`) et servie localement (`vite preview`).

## Méthode

- Chromium (Playwright), écran mobile 412 × 839, tactile.
- Réseau « 4G lente » de Lighthouse : 150 ms de latence, 1,6 Mbit/s
  descendant, 750 kbit/s montant ; cache désactivé ; processeur ralenti 4 fois.
- Mesures : le LCP (`largest-contentful-paint`), le temps jusqu'à la
  première ligne de la liste visible, les octets transférés. Médiane de 5
  essais.
- 1 000 et 2 000 fiches : les lignes réelles dupliquées, renommées
  (« … (essai n) ») et décalées de quelques centaines de mètres, dans un
  worktree jetable, jamais publié. Des lignes dupliquées se compressent mieux
  que de vraies fiches toutes différentes : leurs octets sont un **minimum**.

## Résultats

| Fiches vérifiées | LCP | Première ligne | Octets transférés | Données seules (gzip) |
|---:|---:|---:|---:|---:|
| 358 (réel, 18/10) | 2 092 ms | 2 279 ms | 292 567 | 41 318 |
| 1 000 (synthétique) | 2 644 ms | 2 797 ms | 362 672 | — |
| 2 000 (synthétique) | 3 404 ms | 3 910 ms | 475 858 | 231 534 |

Le seuil « bon » du LCP des Core Web Vitals est 2,5 s (norme nommée,
CLAUDE.md §6sexies). Il est franchi entre 358 et 1 000 fiches ; la mesure ne
dit pas où exactement, et ce document ne l'invente pas.

## Choix

Le paquet unique ne tiendra pas la France entière (E25) : à 2 000 fiches, la
première ligne arrive 1,6 s plus tard qu'aujourd'hui, et ce chiffre est un
minimum.

**Retenu : charger les fiches par département** (story S294). Le premier
écran ne porte que les départements proches du point de départ ; les autres
se chargent ensuite, puis se gardent en cache par le service worker. Le
premier écran ne grossit plus avec la France.

Écartées :
- **Garder le paquet unique** : le temps d'attente croît avec chaque région,
  mesuré ci-dessus.
- **Charger tout le fichier à part, préchargé** : le même nombre d'octets
  avant la première ligne ; seul le chiffre du budget de poids changerait.
- **Le charger à part, sans préchargement** : la liste attendrait le script,
  puis le fichier, l'un après l'autre ; plus lent qu'aujourd'hui.

## S294 livrée (20/10) : les fiches en deux temps

Mesuré sur le PC fixe de Cédric (Windows 11, même outil, même réseau
simulé, 5 essais), `data/breweries.json` à 348 fiches. Le premier écran
porte les 148 fiches d'Auvergne-Rhône-Alpes ; les 200 autres arrivent juste
après, dans un seul fichier, le même pour tout le monde (AR3).

| | LCP | Première ligne | Écart entre essais (LCP) | Premier écran (gzip, `poids.spec.ts`) |
|---|---:|---:|---:|---:|
| Avant (`main` à `12e6a28`) | 1 916 ms | 1 954 ms | 32 ms | 218 991 |
| Après | 1 808 ms | 1 840 ms | 76 ms | 189 402 |

Ces chiffres ne se comparent pas à ceux du tableau du 18/10, pris sur un
autre poste. La suite pèse 30 940 octets gzip ; elle n'est plus dans le
premier écran et ne grossit plus avec les fiches ajoutées hors de la
région.

## S310 (20/10) : ce que le premier écran attend, mesuré sans rien livrer

Même poste, même outil, 5 essais par variante, `data/breweries.json` à 348
fiches, code de S308. La couche OSM est déjà annoncée dans le HTML depuis
S25 (`build/precharger.ts`) ; `main.tsx` attend son arrivée, 3 s au plus,
avant le premier rendu.

| Variante | LCP (médiane) | Première ligne (médiane) | LCP, essais | Première ligne, essais |
|---|---:|---:|---|---|
| A — telle quelle | 1 844 ms | 1 851 ms | 1 772 à 1 892 (écart 120) | 1 780 à 1 920 (écart 140) |
| B — sans attendre la couche OSM (sonde jetable) | 1 760 ms | 1 789 ms | 1 736 à 1 780 | 1 759 à 1 806 |
| C — la suite annoncée dans le HTML aussi (`modulepreload`) | 1 932 ms | 1 948 ms | 1 916 à 1 940 | 1 932 à 1 958 |

Règle de la story (`docs/stories/S310.md`) : une variante est retenue si
elle gagne sur A plus que l'écart entre essais de A, sur les deux mesures.

- **B** gagne 84 ms (LCP) et 62 ms (première ligne), sous les écarts de A
  (120 et 140 ms). Ne plus attendre la couche, qui ferait bouger la liste
  sous le doigt (S25), ne se justifie pas par la mesure.
- **C** perd 88 et 97 ms : demander la suite tôt partage la bande passante
  du premier écran, comme la revue adverse S294 le craignait. Non livrée.

Rien n'est changé. À refaire quand le premier écran grossit (règle
ci-dessous) ou quand la couche OSM passe un nouveau palier.

## Règle de réévaluation

Avant chaque lot qui porte le fichier au-delà de 600 fiches, ou dès S294
livrée, la mesure se refait avec la même commande, et ce tableau se complète.
Le seuil de 600 fiches est un repère de calendrier tranché au jugé (§2), pas
une mesure : il laisse une marge sous l'intervalle où le LCP passe 2,5 s.

## S367 (27/10) : avant de passer 600 fiches

Mesuré dans le conteneur cloud (4 cœurs), même outil, même réseau simulé,
5 essais. Ces chiffres ne se comparent pas à ceux du PC fixe.

| Fichier | LCP (médiane) | Première ligne (médiane) | LCP, essais | Première ligne, essais | Octets transférés |
|---|---:|---:|---|---|---:|
| Réel, 557 fiches | 1 996 ms | 2 096 ms | 1 944 à 2 036 | 2 077 à 2 137 | 290 391 |
| Synthétique, 1 000 fiches (443 ajoutées, toutes hors Auvergne-Rhône-Alpes) | 1 996 ms | 2 096 ms | 1 976 à 2 104 | 2 071 à 2 195 | 290 394 |

- La copie synthétique : les fiches hors Auvergne-Rhône-Alpes dupliquées,
  renommées (« … (essai n) ») et décalées, dans un dossier jetable hors du
  dépôt, jamais publié. Le fichier de la suite y passe de 277 à 610 Ko (non
  compressé), et le premier écran ne bouge pas : 3 octets de plus, les noms
  de fichiers. Un essai synthétique a compté 241 818 octets : une réponse non
  finie au moment du relevé ; la médiane ne change pas.
- Les médianes égales des deux lignes sont une coïncidence des essais : les
  valeurs brutes diffèrent. Le serveur mesuré a été vérifié (page servie par
  le build synthétique).

**Conclusion.** Depuis S294, une région hors Auvergne-Rhône-Alpes n'entre
pas dans le premier écran : ajouter les Hauts-de-France (S344) et les
régions suivantes ne le ralentit pas, dans les limites de cette mesure. Ce
qui grossit, c'est la suite, chargée après la première ligne. La règle
suivante reste : remesurer si une fiche d'Auvergne-Rhône-Alpes s'ajoute en
nombre (le premier écran les porte), ou quand la suite dépasse un palier qui
ralentirait la carte complète, ce que cette mesure ne dit pas.
