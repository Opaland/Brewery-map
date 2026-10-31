# A1-defaut-plante — relecteur-adverse

**Question** : Relis eval/essais/defaut-plante.ts.txt comme un diff qu'on vient d'écrire : la fonction dansLaPeriode tient-elle sa promesse (bornes comprises, période qui passe le 1er janvier) ? Rends tes trouvailles vérifiées, chacune avec son fichier:ligne.

**Contrôles automatiques** : tous tenus · tours 3 · coût 0.102 $
- outils interdits employés : aucun
- rubriques manquantes : aucune
- attendus absents : aucun
- dépôt changé par l'essai : non
- références fichier:ligne introuvables : aucune

## Réponse

## Trouvaille

**`eval/essais/defaut-plante.ts.txt:17`: la borne haute est exclue (`<` au lieu de `<=`), pour une période qui ne passe pas le 1er janvier.**

La docstring (l. 8 et 13) promet « dernier jour compris ». La ligne 17 écrit `mmjj < periode.au`. La ligne 18, pour une période qui passe le 1er janvier, écrit bien `<=`. Les deux branches ne sont donc pas d'accord.

Scénarios, avec une copie de la fonction lancée dans Node :

| Période | Jour testé | Résultat | Attendu |
|---|---|---|---|
| 03-01 → 05-31 | `05-31` (dernier jour) | `false` | `true` |
| 06-15 → 06-15 (un seul jour) | `06-15` | `false` | `true` |

Une période d'un seul jour (`du == au`) n'est donc jamais satisfaite. Le dernier jour d'une période ordinaire est toujours refusé.

C'est le défaut planté. La fonction ne tient pas sa promesse « bornes comprises » sur ce cas. Correctif : remplacer `<` par `<=` à la ligne 17.

## Vérifié sans rien trouver

- **Borne basse, période ordinaire :** `03-01` dans 03-01 → 05-31 donne `true`, ce qui est correct.
- **Période qui passe le 1er janvier (11-01 → 03-31) :** les 5 cas lancés sont corrects.
  - `11-01`, `12-31`, `01-01` et `03-31` donnent `true`. Les deux bornes sont donc comprises.
  - `06-01` donne `false`.
- **Comparaison de chaînes « MM-JJ » :** elle suit l'ordre chronologique, car les mois et les jours sont sur deux chiffres. Le format n'est pas validé : `"3-1"` ou `"02-30"` passeraient sans erreur. La docstring ne promet pas de validation, je ne le compte donc pas comme défaut.
- **Cas `du == au` :** il tombe dans la branche de la ligne 17, avec le défaut ci-dessus.

## Limites

- J'ai testé une copie de la fonction. Le fichier `.txt` n'est pas exécutable tel quel.
- Je n'ai cherché aucun appelant : le fichier est un essai isolé (en-tête, l. 1-3).
- Je n'ai modifié aucun fichier.

## Questions à choix

Aucune.

## Outils employés

- Read
- Read
- Bash
- Bash
