import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { compterTypes, type TypeDeBiere } from './core/bieres'
import { CATEGORIES, ORDRE_CATEGORIES } from './core/categories'
import { BRASSERIES } from './core/donnees'
import { communesConnues, libelleOrigine, type Origine } from './core/origine'
import {
  basculerFavori,
  origineDesPreferences,
  PREFERENCES_DEFAUT,
  RAYON,
  versStockage,
  type Preferences,
} from './core/preferences'
import { favorisCaches, rechercher } from './core/recherche'
import { lienAjout, SANS_COMPTE, SUITE_SIGNALEMENT } from './core/signalement'
import type { Categorie } from './core/schema'
import { FiltreType } from './FiltreType'
import { Liste } from './Liste'
import { MesFavoris } from './MesFavoris'
import { PointDeDepart } from './PointDeDepart'
import type { Stockage } from './stockage'

// La carte (MapLibre) pèse l'essentiel du JavaScript : chargée à part, elle ne
// retarde pas la liste, qui suffit seule à trouver une brasserie.
const Carte = lazy(() => import('./Carte'))

/** Combien de brasseries proposent chaque type : calculé une fois. */
const NB_PAR_TYPE = compterTypes(BRASSERIES)
const NB_RENSEIGNEES = BRASSERIES.filter((b) => b.beers.length > 0).length
const COMMUNES = communesConnues(BRASSERIES)
const NOMS = new Set(BRASSERIES.map((b) => b.n))

/**
 * La ligne de compte. En mode « seulement mes favoris », elle le dit — la
 * case est gardée d'une visite à l'autre et peut être oubliée (revue Marie
 * S9) ; une liste vide dit comment en sortir.
 */
function texteDuCompte(
  n: number,
  rayonKm: number,
  origine: string,
  favorisSeulement: boolean,
  nbFavoris: number,
): string {
  const ou = `à moins de ${String(rayonKm)} km de ${origine}`
  if (!favorisSeulement) {
    return n === 0 ? 'Aucune brasserie ne correspond.' : `${String(n)} brasserie${n > 1 ? 's' : ''} ${ou}`
  }
  if (nbFavoris === 0) {
    return 'Vous n’avez pas encore de favori. Décochez « Afficher seulement mes favoris » pour revoir toutes les brasseries.'
  }
  if (n === 0) {
    return 'Aucun de vos favoris ne correspond. Décochez « Afficher seulement mes favoris » pour revoir toutes les brasseries.'
  }
  return `Seulement vos favoris : ${String(n)} ${ou}`
}

export function App({ stockage }: { stockage: Stockage }) {
  const ini = stockage.initiales
  const [texte, setTexte] = useState('')
  const [rayonKm, setRayonKm] = useState<number>(ini.rayonKm)
  const [origine, setOrigine] = useState<Origine>(() => origineDesPreferences(ini.depart, COMMUNES))
  const [categories, setCategories] = useState<readonly Categorie[]>(ini.categories)
  const [selection, setSelection] = useState<string | null>(null)
  const [type, setType] = useState<TypeDeBiere | undefined>(ini.type)
  const [favoris, setFavoris] = useState<readonly string[]>(ini.favoris)
  const [favorisSeulement, setFavorisSeulement] = useState(ini.favorisSeulement)
  /** Ce que dit l'écran après un geste sur les favoris ou l'effacement. */
  const [annonce, setAnnonce] = useState('')
  const compte = useRef<HTMLParagraphElement>(null)
  const [enLigne, setEnLigne] = useState(() => navigator.onLine)
  // Prête hors ligne quand un service worker est actif : l'installation est
  // tout ou rien (public/sw.js), donc actif veut dire précache complet.
  const [pretHorsLigne, setPretHorsLigne] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    let vivant = true
    void navigator.serviceWorker.ready.then(() => {
      if (vivant) setPretHorsLigne(true)
    })
    return () => {
      vivant = false
    }
  }, [])

  useEffect(() => {
    const maj = () => {
      setEnLigne(navigator.onLine)
    }
    window.addEventListener('online', maj)
    window.addEventListener('offline', maj)
    // L'état initial est lu au rendu, l'écoute s'attache après : un passage
    // hors ligne entre les deux était perdu, et le bandeau ne venait jamais
    // (échec intermittent de hors-ligne.spec.ts en S17 et S18). On relit
    // donc l'état une fois l'écoute en place.
    maj()
    return () => {
      window.removeEventListener('online', maj)
      window.removeEventListener('offline', maj)
    }
  }, [])

  // Chaque changement est gardé sur l'appareil (S9). Le texte tapé et la
  // fiche ouverte ne le sont pas : ce sont des gestes, pas des réglages.
  // On n'écrit que ce qui diffère de ce qui est déjà gardé (revue code S9) :
  // écrire au montage réécrivait les valeurs par défaut juste après un
  // effacement, et figeait un stockage relu en partie.
  const dejaGarde = useRef(JSON.stringify(versStockage(ini)))
  useEffect(() => {
    const p: Preferences = versStockage({
      version: 1,
      rayonKm,
      categories: [...categories],
      ...(type === undefined ? {} : { type }),
      depart: origine,
      favoris: [...favoris],
      favorisSeulement,
    })
    const texte = JSON.stringify(p)
    if (texte === dejaGarde.current) return
    dejaGarde.current = texte
    stockage.garder(p)
  }, [stockage, rayonKm, categories, type, origine, favoris, favorisSeulement])

  const ensembleFavoris = useMemo(() => new Set(favoris), [favoris])

  const resultats = useMemo(
    () =>
      rechercher(BRASSERIES, {
        origine: origine.point,
        rayonKm,
        texte,
        categories,
        ...(type === undefined ? {} : { type }),
        ...(favorisSeulement ? { seulement: ensembleFavoris } : {}),
      }),
    [origine, rayonKm, texte, categories, type, favorisSeulement, ensembleFavoris],
  )

  const caches = favorisSeulement ? favorisCaches(BRASSERIES, favoris, resultats) : []
  // Un favori dont le nom n'est plus dans les données (renommée, retirée) :
  // dit et retirable, plutôt que compté en silence (revue code S9).
  const orphelins = favoris.filter((f) => !NOMS.has(f))
  const nbFavorisConnus = favoris.length - orphelins.length

  const basculerUnFavori = (nom: string) => {
    const retrait = favoris.includes(nom)
    setFavoris((avant) => basculerFavori(avant, nom))
    setAnnonce(retrait ? `« ${nom} » retirée de vos favoris.` : `« ${nom} » ajoutée à vos favoris.`)
    // Retirée en mode « seulement mes favoris », la ligne disparaît avec le
    // focus dedans : on le pose sur le compte, qui dit ce qui s'est passé.
    if (retrait && favorisSeulement) compte.current?.focus()
  }

  const toutEffacer = () => {
    stockage
      .effacer()
      .then(() => {
        const d = PREFERENCES_DEFAUT
        // Le stockage est vide : remettre les défauts ne doit pas le réécrire.
        dejaGarde.current = JSON.stringify(versStockage(d))
        setRayonKm(d.rayonKm)
        setCategories(d.categories)
        setType(d.type)
        setOrigine(origineDesPreferences(d.depart, COMMUNES))
        setFavoris(d.favoris)
        setFavorisSeulement(d.favorisSeulement)
        setAnnonce('Favoris et réglages effacés de cet appareil.')
      })
      .catch(() => {
        setAnnonce('L’effacement a échoué : rien n’a changé. Réessayez.')
      })
  }

  const retirerOrphelins = () => {
    setFavoris((avant) => avant.filter((f) => NOMS.has(f)))
  }

  const basculer = (cat: Categorie) => {
    setCategories((avant) =>
      avant.includes(cat) ? avant.filter((c) => c !== cat) : [...avant, cat],
    )
  }

  // La carte choisit toujours (pas de bascule) : re-toucher un marqueur
  // laisse sa fiche ouverte. C'est la liste qui referme. La mise à l'écran
  // de la fiche est faite par la liste elle-même.
  // Le focus suit sur la ligne ouverte : sinon le choix fait à la carte ne
  // s'entendait pas, la fiche s'ouvrant loin dans l'ordre de lecture (revue
  // Inès S18). Un compteur, pour qu'un même marqueur re-touché refocalise.
  const [focaliser, setFocaliser] = useState(0)
  const choisirDepuisLaCarte = (nom: string) => {
    setSelection(nom)
    setFocaliser((n) => n + 1)
  }

  return (
    <div className="page">
      <header className="entete">
        <h1>Mousse de Poche</h1>
        <p className="sous-titre">
          Les brasseries artisanales autour de vous, et ce qu’on peut y faire.
        </p>
      </header>

      {!enLigne && (
        <p className="bandeau-hors-ligne" role="status" data-testid="hors-ligne">
          Hors connexion : toutes les fiches restent consultables. La carte n’affiche que les
          zones déjà vues.
        </p>
      )}

      <main>
      <section className="filtres" aria-labelledby="titre-filtres">
        {/* Titres pour naviguer au lecteur d'écran, invisibles à l'œil : la
            page n'en avait qu'un, le h1 (revue Inès S18). */}
        <h2 id="titre-filtres" className="lecteur-seul">
          Rechercher et filtrer
        </h2>
        <PointDeDepart origine={origine} communes={COMMUNES} onChange={setOrigine} />

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
            Distance maximale depuis {libelleOrigine(origine)} : <strong>{rayonKm} km</strong>
          </span>
          <input
            type="range"
            min={RAYON.min}
            max={RAYON.max}
            step={RAYON.pas}
            value={rayonKm}
            onChange={(e) => {
              setRayonKm(Number(e.target.value))
            }}
            // La valeur lue avec son unité : « 30 » seul ne disait pas quoi
            // (revue Inès S18).
            aria-valuetext={`${String(rayonKm)} km`}
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

        <FiltreType
          nbParType={NB_PAR_TYPE}
          nbRenseignees={NB_RENSEIGNEES}
          nbFiches={BRASSERIES.length}
          valeur={type}
          onChange={setType}
        />

        <MesFavoris
          nbFavoris={nbFavorisConnus}
          orphelins={orphelins}
          onRetirerOrphelins={retirerOrphelins}
          seulement={favorisSeulement}
          onSeulement={setFavorisSeulement}
          stockageDisponible={stockage.disponible}
          onEffacer={toutEffacer}
        />
      </section>

      <p className="compte" role="status" data-testid="compte" ref={compte} tabIndex={-1}>
        {annonce !== '' && <span data-testid="annonce">{annonce} </span>}
        {texteDuCompte(resultats.length, rayonKm, libelleOrigine(origine), favorisSeulement, nbFavorisConnus)}
      </p>
      {caches.length > 0 && (
        <p className="champ-aide" data-testid="favoris-caches">
          {caches.length === 1 ? 'Un favori est caché' : `${String(caches.length)} favoris sont cachés`}{' '}
          par la distance ou les filtres : {caches.join(', ')}.
        </p>
      )}

      <h2 className="lecteur-seul">Carte</h2>
      <a className="evitement" href="#titre-liste">
        Aller à la liste des brasseries
      </a>
      <div className="vues">
        <Suspense fallback={<div className="carte carte-attente">Chargement de la carte…</div>}>
          <Carte
            resultats={resultats}
            origine={origine.point}
            libelleOrigine={libelleOrigine(origine)}
            rayonKm={rayonKm}
            selection={selection}
            onChoisir={choisirDepuisLaCarte}
          />
        </Suspense>
        <div className="liste-conteneur">
          <h2 id="titre-liste" className="lecteur-seul" tabIndex={-1}>
            Brasseries
          </h2>
          <Liste
            resultats={resultats}
            selection={selection}
            focaliser={focaliser}
            favoris={ensembleFavoris}
            onBasculerFavori={basculerUnFavori}
            onChoisir={(nom) => {
              // Un second toucher sur la ligne ouverte la referme.
              setSelection((avant) => (avant === nom ? null : nom))
            }}
          />
        </div>
      </div>
      </main>

      <footer className="pied">
        <p data-testid="etat-hors-ligne">
          {pretHorsLigne
            ? 'Prête pour une utilisation hors connexion sur cet appareil.'
            : 'Pas encore prête hors connexion : gardez la page ouverte un moment avec du réseau.'}{' '}
          Pour l’installer : menu du navigateur, puis « Ajouter à l’écran d’accueil ».
        </p>
        <p>
          Distances à vol d’oiseau. Les positions sont celles du centre de la commune
          (à environ 2 km près), pas l’adresse exacte.
        </p>
        <p data-testid="mention-alcool">
          L’abus d’alcool est dangereux pour la santé, à consommer avec modération.
        </p>
        <p data-testid="signaler-erreur-aide">
          Une erreur sur une fiche ? Ouvrez-la dans la liste, puis « Signaler une erreur sur
          cette fiche ».
        </p>
        <p data-testid="signaler-absente">
          Une brasserie manque ?{' '}
          <a href={lienAjout()} target="_blank" rel="noopener noreferrer">
            La signaler
          </a>{' '}
          (sur GitHub, compte gratuit nécessaire, signalement public). {SANS_COMPTE}{' '}
          {SUITE_SIGNALEMENT}
        </p>
        <p className="pied-lien">
          <a href="https://github.com/Opaland/Brewery-map">Code source</a>
        </p>
      </footer>
    </div>
  )
}
