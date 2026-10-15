---
name: porte
description: Lance la porte complète de Mousse de Poche — lint, typecheck, tests unitaires, build, e2e Playwright — dans le bon ordre et avec les pièges connus évités. À utiliser avant tout commit, et quand on veut savoir si l'arbre est sain.
---

# La porte complète

Reprise de Sentiers. Le hook `porte-avant-commit.sh` lance déjà les mêmes
étapes avant chaque `git commit` ; cette procédure sert à la lancer à la main
et à lire ses échecs.

## L'ordre, et pourquoi

Chaque étape coûte plus cher que la précédente : autant échouer tôt.

```bash
npm run lint
npx tsc -b --noEmit        # PAS `tsc --noEmit` : voir plus bas
npx vitest run             # dont data/breweries.json contre le schéma
npm run build              # SANS masquer la sortie
PW_CHROMIUM_PATH=/opt/pw-browsers/chromium npx playwright test
```

## Trois pièges, mesurés sur Sentiers

**`npx tsc --noEmit` rend 0 sans rien vérifier.** Le projet utilise les
références de projet TypeScript ; seul `tsc -b` les suit.

**Ne jamais faire `npm run build >/dev/null`.** Un build qui échoue laisse
`dist/` dans son état précédent, et Playwright teste une version périmée.
`tests/e2e/dist-a-jour.ts` refuse de démarrer dans ce cas.

**Ne jamais reconstruire pendant que la porte tourne.** `vite preview` sert
`dist/` depuis le disque : un build en cours change l'application sous les
tests.

## Quand un test e2e échoue

1. Le relancer **isolément**. S'il passe seul, c'est peut-être une course que
   la charge révèle, pas un caprice.
2. `git stash` puis relancer la suite. Si l'arbre propre échoue aussi, le
   défaut préexiste ; sinon il est à moi.
3. Ne pas conclure « instable » deux fois pour le même test.

## Ce que la porte ne dit pas

Elle ne dit pas que le sprint est fini. Elle dit que rien n'est cassé. Les
critères de sortie sont dans `docs/SPRINTS.md`.
