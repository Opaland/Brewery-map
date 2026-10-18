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

## Règle de réévaluation

Avant chaque lot qui porte le fichier au-delà de 600 fiches, ou dès S294
livrée, la mesure se refait avec la même commande, et ce tableau se complète.
Le seuil de 600 fiches est un repère de calendrier tranché au jugé (§2), pas
une mesure : il laisse une marge sous l'intervalle où le LCP passe 2,5 s.
