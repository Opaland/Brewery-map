# Mousse de Poche

Les brasseries artisanales autour de vous, et ce qu'on peut y faire :
acheter et boire sur place, acheter seulement, rien de tout ça, ou « à
confirmer » quand aucune source ne l'établit.

**État : en construction (sprint 1 sur 6).** La page publiée n'affiche pas
encore la carte ni la liste. Le plan est dans [`docs/SPRINTS.md`](docs/SPRINTS.md).

Application 100 % côté client : pas de serveur, pas de télémétrie.

## Développer

```bash
npm ci
npm run lint && npx tsc -b --noEmit && npx vitest run
npm run build
PW_CHROMIUM_PATH=/opt/pw-browsers/chromium npx playwright test   # conteneur
```

Le build échoue si `data/breweries.json` ne respecte pas le schéma
(`src/core/schema.ts`).

L'abus d'alcool est dangereux pour la santé, à consommer avec modération.

## Licence

Code sous licence MIT (voir `LICENSE`). Les licences des données seront
précisées avec leur intégration.
