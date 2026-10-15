#!/usr/bin/env bash
# Porte avant tout commit (voir CLAUDE.md §6).
#
# Repris de Sentiers. Une différence voulue : ici la porte contient aussi le
# build et les e2e, comme le demande le cahier des charges (prompt v2, §5).
# Sentiers les avait sortis parce que sa suite e2e durait 25 minutes ; celle-ci
# dure quelques secondes (mesuré le 15/10 : 5 tests en 5,1 s). Si elle
# s'allonge au point de rendre chaque commit insupportable, on les ressort —
# un garde-fou qu'on finit par désactiver ne garde rien.
#
# Les scripts propres à Sentiers (`listes`, `textes`, `chemins`) ne sont pas
# repris : ils gardent des fichiers qui n'existent pas ici. Ils reviendront
# quand un raté de la même famille se produira sur ce dépôt.
set -uo pipefail

# Le filtre `if` de settings.json n'est pas honoré partout : on relit la
# commande. Sans cela la porte se déclenche sur chaque commande bash et rend
# le TDD impossible (rouge-puis-vert est la méthode).
entree=$(cat 2>/dev/null || echo '{}')
commande=$(printf '%s' "$entree" | jq -r '.tool_input.command // ""' 2>/dev/null || echo "")
case "$commande" in
  *"git commit"*) ;;
  *) exit 0 ;;
esac

cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)" || exit 0
[ -f package.json ] || exit 0

echecs=""
sortie=""

lancer() {
  local nom="$1"; shift
  local log
  log=$("$@" 2>&1) || { echecs="${echecs}${nom} "; sortie="${sortie}
=== ${nom} ===
$(printf '%s' "$log" | tail -25)"; }
}

lancer "lint"      npm run lint --silent
# `tsc -b` et non `tsc --noEmit` : références de projet. `tsc --noEmit` seul
# rend 0 sans rien vérifier (mesuré sur Sentiers).
lancer "typecheck" npx tsc -b --noEmit
lancer "tests"     npx vitest run --silent
# Le build avant les e2e, et un build en échec arrête là : Playwright sert
# dist/, et un dist/ périmé fait passer au vert ce qui est cassé (§6quater).
lancer "build"     npm run build --silent
if [ -z "$echecs" ]; then
  lancer "e2e" env PW_CHROMIUM_PATH="${PW_CHROMIUM_PATH:-/opt/pw-browsers/chromium}" npx playwright test
fi

if [ -n "$echecs" ]; then
  raison="Porte avant commit : ${echecs}en échec. Corriger avant de committer.${sortie}"
  jq -nc --arg r "$raison" \
    '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$r}}'
  exit 0
fi

jq -nc '{systemMessage:"Porte avant commit : lint, typecheck, tests unitaires, build et e2e au vert."}'
