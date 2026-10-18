# curation/

Les propositions des agents, en attente de Cédric ou déjà acceptées.

- **Un lot est immuable une fois écrit.** La garde de `data/`
  (`outils/garde-donnees.ts`) rejoue chaque accord de `curation/accords/`
  sur le lot qu'il cite, et vérifie son empreinte à l'octet. Renommer,
  corriger ou nettoyer un lot accepté rend la garde rouge (revue
  d'architecture S295, AR9). Un lot à corriger s'écrit sous un nouveau nom.
- **Deux lots ne portent pas le même nom** (`lot` du JSON) : la garde
  refuse les doublons.
- `A-MONTRER.md` : ce qui attend une réponse de Cédric, groupe par groupe.
- `A-CHERCHER.md` : où en sont les fiches, écrit par
  `npx tsx outils/completude.ts --ecrire` ; un test le tient à jour.
- `decision-regle.md` : le tri par la règle du 18/10 (`outils/curation.ts trier`).
