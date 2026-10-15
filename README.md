# Mousse de Poche

Les brasseries artisanales autour de vous, et ce qu'on peut y faire :
acheter et boire sur place, acheter seulement, rien de tout ça, ou « à
confirmer » quand aucune source ne l'établit.

**État : en construction (sprint 2 sur 6).** On peut déjà chercher une
brasserie par nom ou par commune, régler la distance depuis Brignais (jusqu'à
100 km), filtrer par ce qu'on peut y faire, et la retrouver sur la liste ou
sur la carte. Pas encore de fiche détaillée ni de mode hors ligne. Le plan est
dans [`docs/SPRINTS.md`](docs/SPRINTS.md).

Fond de carte : © contributeurs [OpenStreetMap](https://www.openstreetmap.org/copyright)
(ODbL). Les distances sont calculées dans le navigateur.

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
