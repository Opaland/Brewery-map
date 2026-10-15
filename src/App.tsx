import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { compterTypes, type TypeDeBiere } from './core/bieres'
import { CATEGORIES, ORDRE_CATEGORIES } from './core/categories'
import { BRASSERIES } from './core/donnees'
import { BRIGNAIS } from './core/distance'
import { rechercher } from './core/recherche'
import type { Categorie } from './core/schema'
import { FiltreType } from './FiltreType'
import { Liste } from './Liste'

// La carte (MapLibre) pèse l'essentiel du JavaScript : chargée à part, elle ne
// retarde pas la liste, qui suffit seule à trouver une brasserie.
const Carte = lazy(() => import('./Carte'))

/**
 * Rayon affiché à l'ouverture : 30 km. Choix de présentation tranché au
 * jugement (CLAUDE.md §2) — il ne change aucun calcul, la personne le règle
 * jusqu'à 100 km. Écartés : 100 km (les 166 lignes d'un coup, la plus
 * lointaine à 99,8 km) et 10 km (trop peu pour « près de Lyon » depuis
 * Brignais).
 */
const RAYON_INITIAL_KM = 30
export const RAYON_MAX_KM = 100

/** Combien de brasseries proposent chaque type : calculé une fois. */
const NB_PAR_TYPE = compterTypes(BRASSERIES)

export function App() {
  const [texte, setTexte] = useState('')
  const [rayonKm, setRayonKm] = useState(RAYON_INITIAL_KM)
  const [categories, setCategories] = useState<readonly Categorie[]>(ORDRE_CATEGORIES)
  const [selection, setSelection] = useState<string | null>(null)
  const [type, setType] = useState<TypeDeBiere | undefined>(undefined)
  const [enLigne, setEnLigne] = useState(() => navigator.onLine)

  useEffect(() => {
    const maj = () => {
      setEnLigne(navigator.onLine)
    }
    window.addEventListener('online', maj)
    window.addEventListener('offline', maj)
    return () => {
      window.removeEventListener('online', maj)
      window.removeEventListener('offline', maj)
    }
  }, [])

  const resultats = useMemo(
    () =>
      rechercher(BRASSERIES, {
        origine: BRIGNAIS,
        rayonKm,
        texte,
        categories,
        ...(type === undefined ? {} : { type }),
      }),
    [rayonKm, texte, categories, type],
  )

  const basculer = (cat: Categorie) => {
    setCategories((avant) =>
      avant.includes(cat) ? avant.filter((c) => c !== cat) : [...avant, cat],
    )
  }

  // La carte choisit toujours (pas de bascule) : re-toucher un marqueur
  // laisse sa fiche ouverte. C'est la liste qui referme. La mise à l'écran
  // de la fiche est faite par la liste elle-même.
  const choisirDepuisLaCarte = (nom: string) => {
    setSelection(nom)
  }

  return (
    <div className="page">
      <header className="entete">
        <h1>Mousse de Poche</h1>
        <p className="sous-titre">
          Les brasseries artisanales autour de Brignais, et ce qu’on peut y faire.
        </p>
      </header>

      {!enLigne && (
        <p className="bandeau-hors-ligne" role="status" data-testid="hors-ligne">
          Hors connexion : toutes les fiches restent consultables. La carte n’affiche que les
          zones déjà vues.
        </p>
      )}

      <section className="filtres" aria-label="Rechercher et filtrer">
        <label className="champ">
          <span>Nom ou commune</span>
          <input
            type="search"
            value={texte}
            onChange={(e) => {
              setTexte(e.target.value)
            }}
            placeholder="ex. Lyon, Oullins, Ninkasi…"
            data-testid="recherche"
          />
        </label>

        <label className="champ">
          <span>
            Distance maximale depuis Brignais : <strong>{rayonKm} km</strong>
          </span>
          <input
            type="range"
            min={5}
            max={RAYON_MAX_KM}
            step={5}
            value={rayonKm}
            onChange={(e) => {
              setRayonKm(Number(e.target.value))
            }}
            data-testid="rayon"
          />
        </label>

        <fieldset className="categories">
          <legend>Ce qu’on peut y faire</legend>
          {ORDRE_CATEGORIES.map((cat) => (
            <label key={cat} className={`case cat-${String(cat)}`}>
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => {
                  basculer(cat)
                }}
                data-testid={`categorie-${String(cat)}`}
              />
              <span className="pastille" aria-hidden="true" />
              {CATEGORIES[cat]}
            </label>
          ))}
        </fieldset>

        <FiltreType nbParType={NB_PAR_TYPE} valeur={type} onChange={setType} />
      </section>

      <p className="compte" role="status" data-testid="compte">
        {resultats.length === 0
          ? 'Aucune brasserie ne correspond.'
          : `${String(resultats.length)} brasserie${resultats.length > 1 ? 's' : ''} à moins de ${String(rayonKm)} km`}
      </p>

      <div className="vues">
        <Suspense fallback={<div className="carte carte-attente">Chargement de la carte…</div>}>
          <Carte
            resultats={resultats}
            origine={BRIGNAIS}
            rayonKm={rayonKm}
            selection={selection}
            onChoisir={choisirDepuisLaCarte}
          />
        </Suspense>
        <div className="liste-conteneur">
          <Liste
            resultats={resultats}
            selection={selection}
            onChoisir={(nom) => {
              // Un second toucher sur la ligne ouverte la referme.
              setSelection((avant) => (avant === nom ? null : nom))
            }}
          />
        </div>
      </div>

      <footer className="pied">
        <p>
          Distances à vol d’oiseau. Les positions sont celles du centre de la commune
          (à environ 2 km près), pas l’adresse exacte.
        </p>
        <p data-testid="mention-alcool">
          L’abus d’alcool est dangereux pour la santé, à consommer avec modération.
        </p>
        <p>
          <a href="https://github.com/Opaland/Brewery-map">Code source</a>
        </p>
      </footer>
    </div>
  )
}
