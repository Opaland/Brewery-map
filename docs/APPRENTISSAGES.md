# Apprentissages de la routine

Demande de Cédric du 09/11 : « penses à faire un fichier learning pour
apprendre de tes erreurs, que tu liras en premier pour éviter de faire les
erreurs ». **À lire en premier, avant `docs/ROUTINE.md` et avant tout
geste.** Chaque erreur vue s'ajoute ici le jour même, datée, avec la parade.
Une leçon ne s'efface pas ; si elle devient fausse, on la barre et on dit
pourquoi.

## Les données

- **Ne jamais relancer `campagne.ts rendre` sur un lot déjà appliqué.** Il
  voit ses fiches dans `data/` et vide le lot ; la garde de `data/` rougit
  (03/11, dep-67 et dep-68). Parade : si une raison change après
  `appliquer`, défaire (`git checkout -- data/ src/donnees-osm/
  curation/A-CHERCHER.md`, retirer les accords du jour), rendre, réappliquer.
- **Une commune fusionnée fait perdre une lecture sans bruit** à
  l'assemblage (Uberach → Val-de-Moder le 03/11, Plaizac → Rouillac le
  06/11). Parade : comparer toujours le nombre de lectures de
  `<dép>-lus.json` au nombre d'ajouts de `dep-<dép>.json`, et chercher la
  commune nouvelle.
- **Les guides commerciaux sont des annuaires, pas des offices** :
  guide-du-perigord, guide-de-la-correze, guide-charente-maritime,
  guide-des-landes, guide-bordeaux-gironde, guide-du-paysbasque, Gault&Millau,
  Petit Futé (06/11). Seuls ne suffisent jamais.
- **Une dégustation pendant une visite ne fait pas une catégorie 1** (persona
  Cédric, 06/11). Visite + boutique = catégorie 2 ; visite seule = 0.
- **Un extrait se copie d'un seul passage de la page brute**, jamais
  recomposé ni joint par « ; » (Bon Voyage, 06/11). Les agents lisent par
  résumé : rouvrir chaque source avec `curl` et vérifier extrait, téléphone
  et horaires (`scratchpad/nord/verif.py`).
- **`controler` ne lit pas certaines écritures d'horaires** : « 4-7pm »,
  « 9am to 12pm », « 10H - 12H ». Parade : les heures passent dans la note,
  dites en clair.
- **Un numéro avec des points ou en « +33 » collé** n'est pas relu ; un lien
  Untappd doit être écrit sur la page source.
- **Aucun nom de personne** : ni dans l'extrait, ni dans la note, ni dans le
  choix (Charly, Benjamin & Elisabeth, Hugh et Denise, Gaufillet, 03-06/11).
  Les enseignes SIRENE d'entrepreneurs individuels peuvent être des noms :
  ne jamais les recopier.
- **Doublons SIRENE / OSM** : même site ou même adresse = une seule fiche ;
  l'autre clé va aux raisons « même lieu que … ».
- **Un agent peut lire le mauvais paquet** (29/10) : lui faire lister ses
  clés et vérifier qu'elles sont celles du paquet.
- **Un site qui refuse la lecture automatique** (429, 403, vérification
  d'âge, connexion refusée) ne se contourne pas : « à relancer ».
- **Une raison contenant « à relancer » est reprise par `relancer`** : ne
  l'écrire que pour une cause passagère.
- **Ne pas retélécharger avec `curl -A "Mozilla/5.0"` un site qui a déjà
  répondu 503 à un agent** : le contrôle de la session le refuse comme un
  contournement (10/11). Parade : ne retélécharger que les pages des lectures
  retenues, sans en-tête de navigateur ; les autres restent « à relancer ».
- **Une lecture sans adresse fait tomber `rendre`** : le géocodeur reçoit
  `q=` vide et répond 400 (11/11, Pirates du Clain). Parade : écrire au moins
  « code postal + commune » dans `adresse` ; la fiche part au centre.
- **Le géocodeur IGN échoue sur une rue écrite autrement que dans la BAN**
  (« rue du Port de Brouillac », 10/11) et sur un lieu-dit (« Roche
  Gabard ») : la fiche part au centre de la commune ; le noter au BACKLOG
  sous #274.

## Le dépôt et la CI

- **Ne jamais mettre `git add` dans la même commande que `git commit`** : le
  crochet tourne avant la commande et la bloque entière (28/10).
- **`tests/unit/fins-de-ligne.test.ts` dépasse 5 s quand la machine est
  chargée** (agents en parallèle) : relancer le commit, ce n'est pas un
  défaut.
- **Une PR a deux runs** : attendre les deux lignes `porte` et les deux
  `visuel` avant de merger (§7bis). `navigateurs (firefox)` et
  `navigateurs (webkit)` sont informatifs et rouges partout (#250).
- **Après un merge en squash**, repartir de `origin/main` (`git checkout -B`)
  avant le travail suivant.
- **Les chiffres écrits** (README, ETAT, LINKEDIN, MARKETING, nouveautés FR
  et EN) sont tenus par des tests : lancer
  `tests/unit/chiffres-ecrits.test.ts`, `nouveautes.test.ts` et
  `i18n.test.ts`, qui disent la valeur attendue.

- **Un workflow que GitHub refuse ne rougit pas la PR** : il apparaît
  seulement après le merge, comme un run « en échec » à zéro job, nommé par
  son chemin (11/11, `mot-du-mois.yml` : un `name:` non cité contenait
  « : »). Parade : `python3 -c "import yaml,sys;yaml.safe_load(open(sys.argv[1]))"`
  sur chaque workflow touché avant le commit ; le test
  `tests/unit/workflows.test.ts` garde ce cas-là.

- **Le géocodeur IGN peut tomber** (12/11 : 504, puis plus de réponse) et
  `rendre` s'arrête. Parade : committer `<dép>-lus.json` et les raisons
  dès qu'ils sont écrits ; le lendemain, reprendre à `rendre` sans relire ;
  vérifier avant avec `curl -s -o /dev/null -w "%{http_code}"
  "https://data.geopf.fr/geocodage/search?q=Foix&limit=1"` ; borner `rendre`
  par `timeout`.

## La routine elle-même

- **Une routine lancée dans une session neuve n'a pas accès au dépôt** :
  lecture seule, pas de poussée, pas d'API GitHub (07/11). Parade : la
  routine tourne dans la session qui a l'accès.
- **Une session qui redémarre au moment du déclenchement perd la routine du
  jour** (08/11). Parade : le lendemain, le noter dans `docs/ROUTINE.md` et
  reprendre où l'état le dit.
