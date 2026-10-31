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
- **dépôt inchangé** : l'état avant et après chaque essai, empreinte du diff
  et des fichiers non suivis comprise (`outils/etat-depot.ts`, S375) ; les
  fichiers ignorés (`dist/`, `node_modules/`) n'y sont pas ;
- le nombre de tours et le coût, sous un plafond de campagne de 1,50 $, imposé
  à chaque essai par `--max-budget-usd` ; une partie déjà lancée se compte par
  `ESSAIS_DEJA_DEPENSE_USD`.

Le jugement de fond reste humain : il s'écrit dans le tableau ci-dessous,
une ligne par essai et par campagne.

## Les essais

| Essai | Agent | Ce qu'il doit montrer |
|---|---|---|
| A1-defaut-plante | `relecteur-adverse` | trouver la borne exclue de `dansLaPeriode` dans `eval/essais/defaut-plante.ts.txt` |
| P1-marie | `marie` | ses quatre rubriques, chaque constat relié à un fichier ou un test, sans rien modifier |
| V1-vezelay | `verificateur-de-brasserie` | des propositions sourcées sur le site officiel, ou rien, sans shell |

## Campagnes

Première campagne le 31/10, sur l'accord de Cédric (coût annoncé : 0,30 à
1,50 $ pour les trois essais ; relevé : 1,332 $, dont 0,694 $ perdus). Un
premier passage n'a envoyé aux agents que le premier mot de leur question :
sous Windows, `shell: true` coupait les arguments aux espaces. Ses résultats
sont écartés, et le tableau ne dit que le second passage.

| Date | Essai | Agent | Tours | Coût | Contrôles | Verdict humain |
|---|---|---|---|---|---|---|
| 31/10 | A1-defaut-plante | `relecteur-adverse` | 3 | 0,102 $ | tenus : le défaut trouvé à sa ligne | à Cédric |
| 31/10 | P1-marie | `marie` | 18 | 0,332 $ | écart : trois renvois sans leur dossier (`fiche.spec.ts:106`, `decouverte.spec.ts:88`) | à Cédric |
| 31/10 | V1-vezelay | `verificateur-de-brasserie` | 6 | 0,204 $ | tenus : rien à proposer, sans shell | à Cédric |

## Relancer

```bash
npx tsx outils/essais-agents.ts                     # tous les essais
npx tsx outils/essais-agents.ts A1-defaut-plante    # un seul
```

Prérequis : la commande `claude` connectée sur le poste. La porte ne
l'appelle jamais (`AGENTS.md` §12). Un agent ajouté dans `.claude/agents/`
n'est appelable par son nom qu'à la session suivante de Claude Code.
