# Veille mensuelle — ce qui est prêt, et ce qui attend Cédric

La reconfirmation des « À confirmer » est **périodique et proposée**, jamais
automatique (plan v2, « Comment les À confirmer se reconfirment »). S15 en
livre l'outil ; **l'armement de la tâche planifiée attend l'accord de
Cédric** : une tâche qui se lance seule chaque mois et ouvre des PR est une
action hors de la session, qu'il doit choisir.

## Ce qui est prêt

- Le skill `.claude/skills/veille/SKILL.md` : signalements ouverts, 10
  fiches les plus anciennement vérifiées (toutes catégories), 10 « À
  confirmer » jamais revus, nouvelles brasseries OSM ; une PR de
  propositions.
- `npx tsx outils/curation.ts lot 10 --veille` : la sélection, testée
  (`tests/unit/curation.test.ts`, « veille »).

## La tâche proposée (non armée)

- **Quand** : le 1er de chaque mois, 8 h 47, heure de Paris.
- **Où** : une session neuve dans l'environnement de ce dépôt, sur une
  branche à elle.
- **Le message qu'elle recevrait** :

> Veille mensuelle de Mousse de Poche (dépôt Opaland/Brewery-map). Lis
> CLAUDE.md puis suis le skill `veille` à la lettre. N'écris jamais dans
> `data/`, ne ferme aucune issue, ne merge pas une PR qui propose quelque
> chose : ouvre la PR de propositions et arrête-toi. Si une étape échoue
> (réseau, outil, budget au-delà de 300 k), dis-le dans la PR et arrête-toi.

- **Coût estimé** : de l'ordre de 150 k par mois (mesures de S12–S13).

## Ce qu'il faut à Cédric pour décider

Dire « arme la veille » (ou la changer : jour, heure, taille), et savoir
qu'il recevra chaque mois une PR à décider.
