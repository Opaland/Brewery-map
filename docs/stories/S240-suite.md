# S240 (suite) — La mention de la carte ne recouvre plus le message de repli *(persona : Bernard)*

## Objectif

Sans tuiles, hors ligne par exemple, Bernard lit le message de repli en entier :
« … et la liste est complète. … ».

## Pourquoi maintenant

Les tests visuels de S240 ont trouvé ce défaut le 17/10, sur la capture
`carte` du Pixel 7. La mention « © contributeurs OpenStreetMap » est peinte
par-dessus la fin du message de repli (BACKLOG).

## Critères d'acceptation

| # | Étant donné… quand… alors… | Prouvé par |
|---|---|---|
| CA1 | Carte sans tuiles, à 412 px puis à 320 px de large, le cadre du message de repli et celui de la mention ne se croisent pas | `tests/e2e/hors-ligne.spec.ts` (vu rouge avant le correctif) |
| CA2 | Le texte du message est peint : le point de sa dernière ligne renvoie au message, et non à la mention | `document.elementFromPoint`, même test (§1bis) |
| CA3 | Les références visuelles sont refaites par la CI, et la nouvelle capture `carte` montre le message en entier | workflow « Références visuelles » |

## Hors périmètre

Le fond de carte hors ligne (S166).

## Porte qualité

Verdict : **PASSE**.
- CA1 et CA2 : vus rouges, puis verts.
- CA3 : références refaites par la CI (commit du robot).
- Après la revue adverse de S248, le message est passé sous la carte. La
  capture `carte` (commit 08efc63) montre maintenant la carte entière, sans
  rien par-dessus. Le message, hors du cadre capturé, est tenu par le test
  e2e : il ne croise pas la carte, à 412 et 320 px et à 200 % de texte.
