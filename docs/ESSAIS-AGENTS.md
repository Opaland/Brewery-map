# Essais de bout en bout des agents

S354 (epic E37), repris de `docs/essais-reponses.md` d'ISTQBFinder. Les
questions de `eval/essais-agents.json` sont posées en conditions réelles,
`claude --agent <nom> -p <question>`, par `outils/essais-agents.ts`. Les
réponses complètes et les outils employés vont dans
`eval/essais-resultats/<date>/<id>.md`, le bilan dans `bilan.json`.

## Ce que le harnais vérifie seul

Les contrôles sont des fonctions pures de `src/core/essais-agents.ts`,
testées sans lancer `claude` (`tests/unit/essais-agents.test.ts`) :

- **outils interdits** : l'agent n'a appelé aucun outil de sa liste
  `interdits` (lus dans le transcript de la session, à identifiant imposé) ;
- **rubriques** : celles qu'attend l'essai sont présentes, en gras ou en
  titre ;
- **attendus** : les chaînes que l'essai exige sont dans la réponse (pour
  le défaut planté, `defaut-plante.ts.txt:17`, la ligne du défaut) ;
- **références** : chaque `fichier:ligne` cité existe dans le dépôt ;
- le nombre de tours et le coût.

Le jugement de fond reste humain : il s'écrit dans le tableau ci-dessous,
une ligne par essai et par campagne.

## Les essais

| Essai | Agent | Ce qu'il doit montrer |
|---|---|---|
| A1-defaut-plante | `relecteur-adverse` | trouver la borne exclue de `dansLaPeriode` dans `eval/essais/defaut-plante.ts.txt` |
| P1-marie | `marie` | ses quatre rubriques, chaque constat relié à un fichier ou un test, sans rien modifier |
| V1-vezelay | `verificateur-de-brasserie` | des propositions sourcées sur le site officiel, ou rien, sans shell |

## Campagnes

Aucune campagne lancée : la première attend l'accord de Cédric (coût
annoncé : environ 0,10 à 0,50 $ par essai, soit 0,30 à 1,50 $ pour les
trois ; S354, 22/10).

| Date | Essai | Agent | Tours | Coût | Contrôles | Verdict humain |
|---|---|---|---|---|---|---|

## Relancer

```bash
npx tsx outils/essais-agents.ts                     # tous les essais
npx tsx outils/essais-agents.ts A1-defaut-plante    # un seul
```

Prérequis : la commande `claude` connectée sur le poste. La porte ne
l'appelle jamais (`AGENTS.md` §12). Un agent ajouté dans `.claude/agents/`
n'est appelable par son nom qu'à la session suivante de Claude Code.
