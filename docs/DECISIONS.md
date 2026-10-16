# Décisions — ce qui était bloqué, et qui l'a tranché

Cédric, le 16/10 : « pour les issues bloquées, regarde si des personas ou
toi-même ne peut pas décider ». Ce qui suit est tranché ici, avec la persona
qui a pesé et la raison. Ce qui reste à Cédric y est dit, et pourquoi.

**La limite.** La règle du §0 de CLAUDE.md tient : aucune ligne de `data/`
ne change sans son accord écrit, ligne par ligne. Pour les lots de curation,
les personas **recommandent** une décision ligne par ligne. La phrase qui les
accepte reste à Cédric : `curation/RECOMMANDATIONS.md`.

## Tranché

| Issue | Sujet | Décision | Persona, raison |
|---|---|---|---|
| #35 | Brasserie fermée | **Un statut « fermée » s'ajoute au schéma**, facultatif, avec sa source et sa date. Une fiche fermée sort de la liste par défaut ; elle reste trouvable par son nom, marquée « Fermée selon … ». Le schéma change en S27 ; marquer une fiche fermée reste une ligne de `data/`, donc un lot. | Bernard (S17) : faire 30 km vers une porte close est le pire résultat. La retirer effacerait l'information « elle a fermé », que la veille doit pouvoir dire. |
| #36 | Changer la commune ou la position d'une fiche | **Par lot, comme tout champ**, avec la source de la nouvelle position : l'adresse lue sur le site de la brasserie, géocodée par la Base Adresse Nationale quand elle est joignable, sinon le point OSM de l'objet nommé. | Hugo : la position est ce qui l'amène à la porte. Aucune raison d'une procédure à part. |
| #37 | Un annuaire ou un office de tourisme comme source | **Office de tourisme et site institutionnel : oui**, avec la confiance « moyenne » au plus et la date de la page. **Annuaire commercial** (agrégateurs, pages jaunes) : **non**, il recopie sans dater. | Bernard veut un numéro à appeler ; Cédric veut une source qu'on peut citer. Un office date ses fiches (« mise à jour le 09/04/2024 », lu en S17), un annuaire non. |
| #39 | La confiance, dans la liste, et quoi en faire | **Sur la ligne d'une fiche de confiance faible** : « Vérifiez avant d'y aller ». **Dans la fiche** : la même phrase d'action avant la définition. Fait en S27. | Marie (revue UI/UX) : la définition seule ne dit pas quoi faire. La Scotch Whisky Association dit la même chose sur sa carte (veille concurrentielle). |
| #40 | Les 16 fiches sans aucune page à leur nom | **Elles restent « À confirmer »**, avec leur raison. La veille les reprend quand une page apparaît. Aucune n'est retirée : un retrait est une ligne de `data/`. | Cédric : « aucune donnée inventée » vaut aussi dans l'autre sens. Ne pas trouver une page ne prouve pas qu'elle n'existe pas. |
| #41 | « La carte ne suit pas » : suivre la position en continu ? | **Non, pas de suivi continu.** Le bouton « Autour de moi » relocalise à la demande, et la carte se recentre à chaque départ. | Hugo à vélo veut savoir où aller, pas une navigation : « Y aller » ouvre son appli de guidage. Un suivi continu viderait la batterie sur une sortie, pour rien de plus. Léa : rien n'est gardé de la position. |
| #59 | « Vérifié le … » à côté de chaque information | **Pas maintenant.** La fiche a déjà « Vérifiée le » pour la fiche entière. Une date par champ demande des données que le fichier n'a pas. | — |

## Reste à Cédric, et pourquoi

| Issue | Sujet | Pourquoi ce n'est pas tranché ici | Recommandation |
|---|---|---|---|
| #27 à #32 | Les lots de curation | Chaque ligne de `data/` demande son accord écrit (§0). | Voir `curation/RECOMMANDATIONS.md` : une phrase par lot suffit. |
| #33 | Armer la veille mensuelle | Un coût récurrent sur son compte, d'environ 130 à 150 k par mois (`docs/VEILLE.md`). | L'armer : la couche OSM de S25 rend la découverte de nouvelles brasseries plus utile chaque mois. Il suffit d'écrire « arme la veille ». |
| #34 | Licence de `data/breweries.json` | C'est son fichier : le droit de le licencier est le sien. | ODbL 1.0, comme la couche OSM qu'il côtoie : une seule règle pour qui réutilise les deux. |
| #38 | Un canal de signalement hors GitHub | Il faut une adresse de courriel à lui, qu'aucun agent ne peut inventer. | Une adresse dédiée (par exemple un alias), affichée à côté de « Signaler une erreur ». |
