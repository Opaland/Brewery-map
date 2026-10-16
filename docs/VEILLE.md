# Veille mensuelle — ce qui est prêt, et ce qui attend Cédric

La reconfirmation des fiches est **périodique et proposée**, jamais
automatique (plan v2, « Comment les À confirmer se reconfirment »). S15 en
livre l'outil ; **l'armement de la tâche planifiée attend l'accord de
Cédric** : une tâche qui se lance seule chaque mois et ouvre des PR est une
action hors de la session, qu'il doit choisir.

## Ce qui est prêt

- Le skill `.claude/skills/veille/SKILL.md`.
- `npx tsx outils/curation.ts lot 10 --veille` : les catégories 1 à 3,
  jamais vérifiées d'abord (catégorie 1 en tête), puis les plus anciennes ;
  `lot 10` : les « À confirmer » jamais revus. Les deux sont testés et ne se
  recoupent pas.
- `outils/decouverte.ts --lot <nom>` : n'écrase jamais un lot existant.

## Les délais, tels qu'ils sont

- **Un signalement** fait le 3 du mois est lu à la veille suivante, le 1er
  du mois d'après (moins de 31 jours), **si la veille est armée** ; puis il
  attend la décision de Cédric. Sans veille armée, il n'est lu que quand
  Cédric lance une curation à la main : l'écran dit déjà « Aucun délai
  n'est garanti ».
- **Une fiche vendue** (catégories 1 à 3, 65 fiches au 16/10) est revue au
  plus tard 7 mois après l'armement (10 par mois), puis revient à son tour,
  la plus anciennement vérifiée d'abord.
- **Limite connue** : une fiche revue sans résultat et restée sans date
  n'est plus reprise d'elle-même ; seul un signalement la ramène.

## La tâche proposée (non armée)

- **Quand** : le 1er de chaque mois, 8 h 47, heure de Paris.
- **Où** : une session neuve dans l'environnement de ce dépôt, sur une
  branche à elle.
- **Le message qu'elle recevrait** :

> Veille mensuelle de Mousse de Poche (dépôt Opaland/Brewery-map). Lis
> CLAUDE.md puis suis le skill `veille` à la lettre. N'écris jamais dans
> `data/`, ne ferme aucune issue sans y répondre, ne merge pas une PR qui
> propose quelque chose : ouvre la PR de propositions et arrête-toi. Si une
> étape échoue (réseau, outil), dis-le dans la PR et continue les autres ;
> ne dépasse pas 20 fiches plus les signalements.

- **Coût** : de l'ordre de 130 à 150 k par mois (157 à 167 k mesurés pour 25
  fiches en S12–S13).

## Ce qu'il faut à Cédric pour décider

Dire « arme la veille » (ou la changer : jour, heure, taille), et savoir
qu'il recevra chaque mois une PR à décider.
