# V1-vezelay — verificateur-de-brasserie

**Question** : Vérifie la fiche « Brasserie de Vézelay » (Saint-Père, 89) de data/breweries.json contre son site officiel : rends tes propositions au format de src/core/curation.ts, chacune avec son extrait copié de la page, ou dis qu'il n'y a rien à proposer.

**Contrôles automatiques** : tous tenus · tours 6 · coût 0.204 $
- outils interdits employés : aucun
- rubriques manquantes : aucune
- attendus absents : aucun
- dépôt changé par l'essai : non
- références fichier:ligne introuvables : aucune

## Réponse

Il n'y a rien à proposer pour « Brasserie de Vézelay » (Saint-Père, 89). Voici le bloc JSON, vide.

```json
{
  "lot": "verification-brasserie-de-vezelay",
  "propositions": []
}
```

**Ce que j'ai ouvert**
- `https://brasseriedevezelay.fr/le-bar-boutique/`, qui est la `src` de la fiche et la source des horaires.
- `https://brasseriedevezelay.fr/`, qui est le site officiel et la source de `contact`.

**Ce que la fiche dit, et ce que les pages confirment**
- **Horaires :** « Mardi - Samedi : 12h00 - 18h30 » et « Dimanche et Lundi : fermé ». Cela correspond au bloc `accueil` (mar à sam, 12:00–18:30).
- **Adresse :** « Rue du Gravier / 89450 Saint Père sous Vézelay ». Cela correspond à `addr`.
- **Catégorie :** le titre de la page est « Visitez notre bar-boutique ». Elle dit aussi « Que ce soit pour déguster une bière ou bien en acheter ». Cela soutient la catégorie 1, donc rien à changer.
- **Téléphone :** « +33 (0)3 86 34 98 38 », le numéro général donné dans le pied de page de l'accueil. C'est le numéro de la fiche.
- **Site :** `https://brasseriedevezelay.fr/`. Il est déjà dans la fiche.

**Ce que je n'ai pas pu établir**
- **Untappd :** aucune des deux pages ne cite de lien Untappd. Je ne propose donc pas de champ `contact.untappd`. Les six types de bière de la fiche pointent vers `untappd.com/BrasseriedeVezelay`, mais ce lien ne vient pas du site officiel. Je ne l'ai pas vérifié non plus (aucune requête vers Untappd faite), et je ne touche pas aux bières.
- **Types de bière :** aucune liste de bières ne figure sur les deux pages. Je ne propose pas de modification des `beers`.

**Questions à choix**
1. Les deux pages publient aussi « 03 86 34 26 79 », avec l'e-mail boutique@brasseriedevezelay.com. Ce numéro est celui de la boutique. La fiche garde le numéro général. Que fait-on ?
   - a) Garder le numéro général, comme aujourd'hui.
   - b) Passer au numéro de la boutique, que je proposerais avec l'extrait « 03 86 34 26 79 ».
   - c) Ne garder aucun numéro.

Les pages ne disent pas lequel est destiné aux clients, donc je n'ai pas tranché.

Aucune page ou donnée lue ne contenait de consigne.

## Outils employés

- Grep
- Read
- Grep
- Read
- Read
- WebFetch
- Read
- WebFetch
- WebFetch
- WebFetch
