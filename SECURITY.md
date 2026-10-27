# Signaler une faille

Mousse de Poche est une page statique (pas de serveur, pas de compte) ; une
faille peut toutefois toucher la vie privée (la position de la personne ne
doit jamais quitter le navigateur), un lien qui part dans la page, ou les
workflows qui publient le site.

## Comment la signaler

**Le signalement privé de GitHub n'est pas encore ouvert sur ce dépôt**
(lu le 27/10/2026 ; son ouverture est une décision du mainteneur,
`docs/stories/S364.md`). En attendant :

1. Ouvrez une issue **sans détail exploitable** : un titre comme « Faille :
   demande de contact », et le domaine touché (vie privée, lien, workflow),
   rien de plus.
2. Le mainteneur, Cédric (@Opaland), lit les issues et proposera un moyen
   d'échanger en privé. Aucun délai de réponse n'est promis.

Ne publiez ni preuve de concept, ni étapes pour reproduire, ni adresse de
page piégée dans une issue ou une PR.

## Ce qui est déjà vérifié

- La politique de sécurité du contenu : `tests/e2e/securite.spec.ts`.
- Aucune requête qui emporte la position : mesuré dans `docs/AUDIT.md`
  (0 requête sur 215, géolocalisation simulée).
- Les liens qui partent dans la page sont filtrés par leur protocole
  (`lienSchema`, `src/core/schema.ts`) : `tests/unit/schema.test.ts`.
