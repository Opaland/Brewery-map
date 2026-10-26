# Mutation du cœur (S239)

Stryker modifie le code de `src/core` (un `<` en `<=`, une condition
retirée) et compte les modifications qu'aucun test ne remarque : chaque
survivant est un test creux ou un code inutile (CLAUDE.md §6bis).

- Configuration : `stryker.config.json`. Job à la demande (sa planification
  de nuit est retirée depuis le 25/10, à la demande de Cédric) :
  `.github/workflows/mutation.yml`, informatif, rapport gardé 30 jours.
- Stryker n'est pas dans `package.json` : avec `jsdom`, son installation
  désaccordait le fichier de verrouillage et cassait `npm ci`. Il s'installe
  pour le job seulement.
- **Mutants statiques ignorés** (`ignoreStatic`) : le code exécuté au
  chargement d'un module (les schémas Zod) n'est pas réévalué par le
  lanceur Vitest, et ses mutants sortaient « survivants » à tort — vérifié
  à la main le 17/10 (`parole` sans `.min(1)` : le test échoue bien). Ces
  schémas restent couverts par les tests ordinaires.
- Pas de score minimal avant une première mesure complète (§2).

## Premières mesures (17/10, en local)

| Fichier | Score | Tués | Survivants | Non couverts | Suite donnée |
|---|---:|---:|---:|---:|---|
| `untappd.ts` | 100 % | 5 | 0 | 0 | — |
| `garde-donnees.ts` (avant) | 58 % | 45 | 21 | 11 | test du fichier de base invalide ajouté |
| `garde-donnees.ts` (après, statiques ignorés) | 66 % | 45 | 16 | 7 | restent surtout des libellés de message |

La mesure complète de `src/core` viendra du premier lancement à la main
(`gh workflow run mutation.yml`) ; ses
survivants seront triés ici.
