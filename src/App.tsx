import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import {
  favorisCaches,
  listeCourte,
  plusProche,
  rechercher,
  rechercherPartout,
  compterParDepartement,
} from './core/recherche'
import { libelleDepartement } from './core/departements'
import { ficheDuLien } from './core/partage'
import { lienTournee, ordonnerTournee } from './core/tournee'
import { formaterDistance } from './core/distance'
import { lienAjout, SANS_COMPTE, SUITE_SIGNALEMENT } from './core/signalement'
import type { Brasserie, Categorie } from './core/schema'
import { CarteDifferee } from './CarteDifferee'
import { FiltreType } from './FiltreType'
import { Installer } from './Installer'
import { MiseAJour } from './MiseAJour'
import { Liste } from './Liste'
import { MesFavoris } from './MesFavoris'
import { PointDeDepart } from './PointDeDepart'
import type { Stockage } from './stockage'

// La carte (MapLibre) pèse l'essentiel du JavaScript : chargée à part, elle ne
// retarde pas la liste, qui suffit seule à trouver une brasserie.

/** Combien de brasseries proposent chaque type : calculé une fois. */
const NB_PAR_TYPE = compterTypes(BRASSERIES)
const NB_RENSEIGNEES = BRASSERIES.filter((b) => b.beers.length > 0).length
const COMMUNES = communesConnues(BRASSERIES)
/** Les départements du fichier, pour dire où il s'arrête (revue globale S22). */
const DEPARTEMENTS = [...new Set(BRASSERIES.map((b) => b.d))].sort()

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
  partout: boolean,
  departement?: string,
): string {
  // Un nom tapé cherche partout (S21) : le compte ne parle plus du rayon ;
  // un département choisi (S27) le dit.
  const ou =
    departement !== undefined
      ? `dans le département ${libelleDepartement(departement)}, distances depuis ${origine}`
      : partout
        ? `toutes distances, comptées depuis ${origine}`
        : `à moins de ${String(rayonKm)} km de ${origine}`
  if (!favorisSeulement) {
    // À zéro, dire d'où et jusqu'où : depuis Lille, « ne correspond » ne
    // disait pas que le fichier s'arrête loin de là (S21).
    if (n === 0) return partout ? 'Aucune brasserie ne correspond.' : `Aucune brasserie ${ou}.`
    return `${String(n)} brasserie${n > 1 ? 's' : ''} ${ou}`
  }
  if (nbFavoris === 0) {
    return 'Vous n’avez pas encore de favori. Décochez « Afficher seulement mes favoris » pour revoir toutes les brasseries.'
  }
  if (n === 0) {
    return 'Aucun de vos favoris ne correspond. Décochez « Afficher seulement mes favoris » pour revoir toutes les brasseries.'
  }
  return `Seulement vos favoris : ${String(n)} ${ou}`
}

export function App({
  stockage,
  couche = null,
}: {
  stockage: Stockage
  couche?: { brasseries: readonly Brasserie[]; extrait: string } | null
}) {
  const ini = stockage.initiales
  // Une fiche partagée (S27, `#fiche=…`) : son nom dans la recherche, et la
  // fiche ouverte — trouvée à toute distance, comme un nom tapé.
  const [ficheOuverte] = useState(() => ficheDuLien(window.location.hash))
  const [texte, setTexte] = useState(ficheOuverte ?? '')
  const [rayonKm, setRayonKm] = useState<number>(ini.rayonKm)
  const [origine, setOrigine] = useState<Origine>(() => origineDesPreferences(ini.depart, COMMUNES))
  // « Autour de moi » gardé mais pas encore relocalisé (permission non
  // donnée, GPS lent) : l'écran part de Brignais, le stockage garde le choix
  // tant que la personne n'en a pas fait d'autre. Sans cela, l'ouverture
  // réécrivait « Brignais » et le choix était perdu (revue code S21).
  const [autourEnAttente, setAutourEnAttente] = useState(ini.depart.type === 'autour')
  const choisirOrigine = (o: Origine) => {
    setAutourEnAttente(false)
    setOrigine(o)
  }
  const [categories, setCategories] = useState<readonly Categorie[]>(ini.categories)
  const [selection, setSelection] = useState<string | null>(ficheOuverte ?? null)
  const [type, setType] = useState<TypeDeBiere | undefined>(ini.type)
  const [favoris, setFavoris] = useState<readonly string[]>(ini.favoris)
  const [favorisSeulement, setFavorisSeulement] = useState(ini.favorisSeulement)
  const [avecOsm, setAvecOsm] = useState(ini.avecOsm)
  const [departementChoisi, setDepartement] = useState<string | undefined>(undefined)
  /** Ce que dit l'écran après un geste sur les favoris ou l'effacement. */
  const [annonce, setAnnonce] = useState('')
  const compte = useRef<HTMLParagraphElement>(null)

  // Le compte collé au bas de l'écran couvrait le focus clavier (WCAG
  // 2.4.11, revue adverse UI/UX : une case sur Pixel 7, cinq contrôles à
  // 320 px). Sa hauteur, qui varie avec le retour à la ligne, devient la
  // marge de défilement du bas : le navigateur amène le focus au-dessus.
  useEffect(() => {
    const p = compte.current
    if (p === null || typeof ResizeObserver === 'undefined') return
    const racine = document.documentElement
    const suivre = new ResizeObserver(() => {
      racine.style.setProperty('--hauteur-compte', `${String(p.offsetHeight)}px`)
    })
    suivre.observe(p)
    return () => {
      suivre.disconnect()
    }
  }, [])
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
      depart: autourEnAttente && origine.type === 'brignais' ? { type: 'autour' } : origine,
      favoris: [...favoris],
      favorisSeulement,
      avecOsm,
    })
    const texte = JSON.stringify(p)
    if (texte === dejaGarde.current) return
    dejaGarde.current = texte
    stockage.garder(p)
  }, [stockage, rayonKm, categories, type, origine, autourEnAttente, favoris, favorisSeulement, avecOsm])

  // Deux onglets ouverts s'écrasaient : chacun réécrivait l'objet entier
  // depuis sa mémoire, et un favori ajouté dans l'un disparaissait (revue
  // code S9, fait en S24). Les favoris passent d'un onglet à l'autre ; le
  // reste des réglages suit le dernier onglet touché.
  const canal = useRef<BroadcastChannel | null>(null)
  const favorisPartages = useRef(JSON.stringify(favoris))
  // Le canal s'ouvre une fois ; il appelle la remise à zéro par une référence.
  const remettreAZeroRef = useRef<() => void>(() => undefined)
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return
    const c = new BroadcastChannel('mousse-de-poche-favoris')
    c.onmessage = (e: MessageEvent<unknown>) => {
      const m = e.data as { type?: unknown; favoris?: unknown } | null
      if (m?.type === 'effacer') {
        remettreAZeroRef.current()
        return
      }
      if (m?.type !== 'favoris' || !Array.isArray(m.favoris)) return
      const recus = m.favoris.filter((x): x is string => typeof x === 'string')
      favorisPartages.current = JSON.stringify(recus)
      setFavoris(recus)
    }
    canal.current = c
    return () => {
      c.close()
      canal.current = null
    }
  }, [])
  useEffect(() => {
    const texte = JSON.stringify(favoris)
    if (texte === favorisPartages.current) return
    favorisPartages.current = texte
    canal.current?.postMessage({ type: 'favoris', favoris: [...favoris] })
  }, [favoris])

  const ensembleFavoris = useMemo(() => new Set(favoris), [favoris])

  // Toute la France (S25) : la couche OpenStreetMap, chargée avant l'écran
  // (`main.tsx`), ou absente si elle n'a pas pu se charger.
  const osm = useMemo(
    () =>
      couche === null
        ? { etat: 'echec' as const, brasseries: [] as readonly Brasserie[], extrait: '' }
        : { etat: 'pret' as const, ...couche },
    [couche],
  )
  const toutes = useMemo(() => [...BRASSERIES, ...osm.brasseries], [osm.brasseries])
  // Ce qui est cherché : sans la couche OSM si la personne l'a décochée
  // (revue persona S25 : « À confirmer » seul ne la séparait pas du vérifié).
  const cherchees = avecOsm ? toutes : BRASSERIES

  const parDepartement = useMemo(() => compterParDepartement(cherchees), [cherchees])
  // Un département qui n'a plus de brasserie (couche OSM décochée) tombe :
  // gardé, il filtrait la liste sans plus paraître dans le menu (revue S27).
  const departement =
    departementChoisi !== undefined && parDepartement.has(departementChoisi) ? departementChoisi : undefined
  const resultats = useMemo(
    () =>
      rechercher(cherchees, {
        origine: origine.point,
        rayonKm,
        texte,
        categories,
        ...(type === undefined ? {} : { type }),
        ...(favorisSeulement ? { seulement: ensembleFavoris } : {}),
        ...(departement === undefined ? {} : { departement }),
      }),
    [cherchees, origine, rayonKm, texte, categories, type, favorisSeulement, ensembleFavoris, departement],
  )

  // Ma tournée (S27) : les favoris encore présents, de proche en proche.
  const tournee = useMemo(() => {
    const etapes = toutes.filter((b) => ensembleFavoris.has(b.n) && b.fermee === undefined)
    const ordre = ordonnerTournee(etapes, origine.point)
    return { etapes: ordre.map((b) => b.n), lien: lienTournee(ordre), total: etapes.length }
  }, [toutes, ensembleFavoris, origine])
  const partout = rechercherPartout({ texte, ...(departement === undefined ? {} : { departement }) })
  const caches = favorisSeulement ? favorisCaches(cherchees, favoris, resultats) : []
  // Un favori dont le nom n'est plus dans les données (renommée, retirée) :
  // dit et retirable, plutôt que compté en silence (revue code S9).
  // Pas avant la couche OSM : un favori qui en vient passerait pour disparu.
  const nomsConnus = useMemo(() => new Set(toutes.map((b) => b.n)), [toutes])
  const orphelins = osm.etat === 'pret' ? favoris.filter((f) => !nomsConnus.has(f)) : []
  const nbFavorisConnus = favoris.length - orphelins.length

  const basculerUnFavori = (nom: string) => {
    const retrait = favoris.includes(nom)
    setFavoris((avant) => basculerFavori(avant, nom))
    setAnnonce(retrait ? `« ${nom} » retirée de vos favoris.` : `« ${nom} » ajoutée à vos favoris.`)
    // Retirée en mode « seulement mes favoris », la ligne disparaît avec le
    // focus dedans : on le pose sur le compte, qui dit ce qui s'est passé.
    if (retrait && favorisSeulement) compte.current?.focus()
  }

  /**
   * Les réglages par défaut, sans réécrire le stockage (vide). Sert à
   * l'effacement ici et à celui fait dans un autre onglet : sans cela,
   * l'autre onglet réécrivait ses réglages et défaisait l'effacement (revue
   * adverse S24).
   */
  const remettreAZero = useCallback(() => {
    const d = PREFERENCES_DEFAUT
    dejaGarde.current = JSON.stringify(versStockage(d))
    favorisPartages.current = JSON.stringify(d.favoris)
    setRayonKm(d.rayonKm)
    setCategories(d.categories)
    setType(d.type)
    setOrigine(origineDesPreferences(d.depart, COMMUNES))
    setAutourEnAttente(false)
    setFavoris(d.favoris)
    setFavorisSeulement(d.favorisSeulement)
    setAvecOsm(d.avecOsm)
  }, [])
  useEffect(() => {
    remettreAZeroRef.current = remettreAZero
  }, [remettreAZero])

  const toutEffacer = () => {
    stockage
      .effacer()
      .then(() => {
        remettreAZero()
        canal.current?.postMessage({ type: 'effacer' })
        setAnnonce('Favoris et réglages effacés de cet appareil.')
      })
      .catch(() => {
        setAnnonce('L’effacement a échoué : rien n’a changé. Réessayez.')
      })
  }

  const retirerOrphelins = () => {
    setFavoris((avant) => avant.filter((f) => nomsConnus.has(f)))
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
        <div className="marque">
          <img className="logo" src="icon.svg" alt="" width={48} height={48} />
          <h1>Mousse de Poche</h1>
        </div>
        <p className="sous-titre">
          Les brasseries artisanales autour de vous, et ce qu’on peut y faire.
        </p>
        <Installer />
      </header>

      <MiseAJour />
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
        <PointDeDepart
          origine={origine}
          onChange={choisirOrigine}
          relocaliser={ini.depart.type === 'autour'}
        />

        <label className="champ">
          {/* « Chercher une brasserie » : à côté du champ de départ, « Nom ou
              commune » se confondait avec lui (revue globale S22). */}
          <span>Chercher une brasserie (nom ou commune)</span>
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

        {/* Parcourir un département (S27 ; idée vue sur biere-tourisme.fr) :
            découvrir une région sans donner sa position. */}
        <label className="champ">
          <span>Ou parcourir un département</span>
          <select
            value={departement ?? ''}
            onChange={(e) => {
              setDepartement(e.target.value === '' ? undefined : e.target.value)
            }}
            data-testid="departement"
          >
            <option value="">Non : autour du point de départ</option>
            {[...parDepartement.entries()]
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([code, n]) => (
                <option key={code} value={code}>
                  {libelleDepartement(code)} ({n})
                </option>
              ))}
          </select>
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
          {osm.etat === 'pret' && (
            <label className="case">
              <input
                type="checkbox"
                checked={avecOsm}
                onChange={(e) => {
                  setAvecOsm(e.target.checked)
                }}
                data-testid="avec-osm"
              />
              Inclure les {osm.brasseries.length} brasseries repérées sur OpenStreetMap (non
              vérifiées)
            </label>
          )}
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
          tournee={tournee}
        />
      </section>

      <p className="compte" role="status" data-testid="compte" ref={compte} tabIndex={-1}>
        {annonce !== '' && <span data-testid="annonce">{annonce} </span>}
        {texteDuCompte(
          resultats.length,
          rayonKm,
          libelleOrigine(origine),
          favorisSeulement,
          nbFavorisConnus,
          partout,
          departement,
        )}
      </p>
      {/* Rien à portée (depuis Lille) : où est la plus proche, et ce que
          couvre le fichier, plutôt qu'une liste vide (revue globale S22). */}
      {resultats.length === 0 && !favorisSeulement && !partout && (
        <p className="champ-aide" data-testid="plus-proche">
          {(() => {
            const p = plusProche(cherchees, origine.point)
            return p === undefined
              ? ''
              : `La plus proche : ${p.brasserie.n} (${p.brasserie.c}), à ${formaterDistance(p.distanceKm)}. `
          })()}
          Les fiches vérifiées couvrent {DEPARTEMENTS.length} départements : {DEPARTEMENTS.join(', ')}
          {osm.etat === 'pret'
            ? ` ; ailleurs, ${String(osm.brasseries.length)} brasseries repérées sur OpenStreetMap, à confirmer.`
            : '.'}
        </p>
      )}
      {osm.etat === 'echec' && (
        <div className="champ-aide" role="status" data-testid="osm-absente">
          <p>
            Les brasseries de toute la France (OpenStreetMap) n’ont pas pu se charger : seules les
            fiches vérifiées, dans {DEPARTEMENTS.length} départements, sont là.
          </p>
          <div className="depart-actions">
            <button
              type="button"
              onClick={() => {
                window.location.reload()
              }}
            >
              Recharger la page
            </button>
          </div>
        </div>
      )}
      {caches.length > 0 && (
        <p className="champ-aide" data-testid="favoris-caches">
          {caches.length === 1 ? 'Un favori est caché' : `${String(caches.length)} favoris sont cachés`}{' '}
          par la distance ou les filtres : {listeCourte(caches)}.
        </p>
      )}

      <h2 className="lecteur-seul">Carte</h2>
      <a className="evitement" href="#titre-liste">
        Aller à la liste des brasseries
      </a>
      <div className="vues">
        <CarteDifferee
          resultats={resultats}
          cadrerSurResultats={partout && resultats.length > 0}
          origine={origine.point}
          libelleOrigine={libelleOrigine(origine)}
          rayonKm={rayonKm}
          selection={selection}
          onChoisir={choisirDepuisLaCarte}
        />
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
            ? 'Prête pour une utilisation hors connexion sur cet appareil : fiches, liste et carte déjà vue. Chercher une commune de départ demande le réseau la première fois.'
            : 'Pas encore prête hors connexion : gardez la page ouverte un moment avec du réseau.'}
        </p>
        <p>
          Distances à vol d’oiseau. Les fiches vérifiées sont souvent placées au centre de
          leur commune (à environ 2 km près) ; celles d’OpenStreetMap, au point de la carte.
        </p>
        <p data-testid="sources-osm">
          Brasseries hors des fiches vérifiées : ©{' '}
          <a href="https://www.openstreetmap.org/copyright">contributeurs OpenStreetMap</a>, licence
          ODbL
          {osm.extrait === '' ? '' : `, extrait du ${osm.extrait.slice(0, 10)}`} — repérées comme
          brasseries, rien d’autre n’est vérifié.
        </p>
        <p data-testid="sources-communes">
          Communes : Code officiel géographique de l’INSEE (Licence ouverte, via le paquet
          d’Etalab), points tirés de Wikidata (CC0).
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
