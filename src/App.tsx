import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCarnetEntreOnglets, useCarteEnVue, useConnexion, useHauteurBarre } from './crochets'
import { compterTypes, type TypeDeBiere } from './core/bieres'
import { CATEGORIES, ORDRE_CATEGORIES } from './core/categories'
import { BRASSERIES } from './core/donnees'
import { communesConnues, libelleOrigine, type Origine } from './core/origine'
import {
  basculerFavori,
  basculerVisite,
  dateDuJour,
  ecrireNote,
  origineDesPreferences,
  PREFERENCES_DEFAUT,
  RAYON,
  versStockage,
  type Preferences,
  VERSION_PREFERENCES,
} from './core/preferences'
import {
  favorisCaches,
  favorisFermes,
  listeCourte,
  plusProche,
  rechercher,
  rechercherPartout,
  compterParDepartement,
} from './core/recherche'
import { libelleDepartement } from './core/departements'
import { resumeDesFiltres, type EtatFiltres } from './core/filtres'
import { libelleVerification } from './core/fiche'
import { DONNEES, NOUVEAUTES } from './core/nouveautes'
import { lireRaccourci } from './core/raccourcis'
import { t } from './i18n'
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
import { Sauvegarde } from './Sauvegarde'
import { appliquerTheme } from './theme'
import type { Stockage } from './stockage'

// L'affichette et son QR (S38) : chargés au premier clic, hors du chemin
// d'ouverture (revue adverse S38 : ~57 ko de source dans le paquet principal).
const AffichetteDifferee = lazy(() => import('./Affichette'))

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
  pasVisitees = false,
): string {
  // Tout ce qui reste est dans le carnet : le dire, et comment en sortir
  // (revue adverse S35 ; « aucune brasserie à moins de 30 km » trompait).
  if (n === 0 && pasVisitees) {
    return t('Toutes celles qui correspondent sont dans votre carnet. Décochez « Seulement les brasseries pas encore visitées » pour les revoir.')
  }
  // Un nom tapé cherche partout (S21) : le compte ne parle plus du rayon ;
  // un département choisi (S27) le dit.
  const ou =
    departement !== undefined
      ? t('dans le département {dep}, distances depuis {origine}', { dep: libelleDepartement(departement), origine })
      : partout
        ? t('toutes distances, comptées depuis {origine}', { origine })
        : t('à moins de {km} km de {origine}', { km: rayonKm, origine })
  if (!favorisSeulement) {
    // À zéro, dire d'où et jusqu'où : depuis Lille, « ne correspond » ne
    // disait pas que le fichier s'arrête loin de là (S21).
    // Un département choisi qui ne garde rien dit que ce sont les filtres
    // (revue adverse S31 : le menu annonce « (0) », le compte ne disait pas pourquoi).
    if (n === 0 && departement !== undefined) {
      return t('Aucune brasserie dans le département {dep} avec ces filtres : décochez-en dans « Plus de filtres ».', {
        dep: libelleDepartement(departement),
      })
    }
    if (n === 0) return partout ? t('Aucune brasserie ne correspond.') : t('Aucune brasserie {ou}.', { ou })
    return n > 1 ? t('{n} brasseries {ou}', { n, ou }) : t('{n} brasserie {ou}', { n, ou })
  }
  if (nbFavoris === 0) {
    return t('Vous n’avez pas encore de favori. Décochez « Afficher seulement mes favoris » pour revoir toutes les brasseries.')
  }
  if (n === 0) {
    return t('Aucun de vos favoris ne correspond. Décochez « Afficher seulement mes favoris » pour revoir toutes les brasseries.')
  }
  return t('Seulement vos favoris : {n} {ou}', { n, ou })
}

/** Les visites reçues d'un autre onglet, relues par les mêmes règles que le stockage. */

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
  const [lienPartage, setLienPartage] = useState(ficheOuverte !== undefined)
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
  // Un raccourci de l'application installée (S46), lu une fois puis retiré
  // de l'adresse : un lien partagé ensuite ne le porte pas.
  const [raccourci] = useState(() => lireRaccourci(window.location.search))
  useEffect(() => {
    if (raccourci === undefined) return
    window.history.replaceState(null, '', window.location.pathname + window.location.hash)
  }, [raccourci])
  const [favorisSeulement, setFavorisSeulement] = useState(ini.favorisSeulement || raccourci === 'favoris')
  // « Mes favoris » est une vue, pas un réglage : tant que la personne n'a
  // pas touché la case, ce qui est gardé reste son choix d'avant. Sans cela,
  // tous les lancements suivants s'ouvraient sur les seuls favoris (revue
  // adverse S46).
  const [favorisParRaccourci, setFavorisParRaccourci] = useState(raccourci === 'favoris')
  const [avecOsm, setAvecOsm] = useState(ini.avecOsm)
  // Mon carnet (S35) : les brasseries visitées, avec leur date, sur
  // l'appareil seulement.
  const [visites, setVisites] = useState(ini.visites)
  const [pasVisitees, setPasVisitees] = useState(ini.pasVisitees)
  // L'affichette à imprimer (S38) : montée le temps de l'impression, avec
  // un numéro pour qu'un second clic sur la même brasserie réimprime.
  const [affichette, setAffichette] = useState<{ brasserie: Brasserie; n: number } | null>(null)
  // Mes notes (S36) : une par brasserie, pour soi, sur l'appareil.
  const [notes, setNotes] = useState(ini.notes)
  // Le thème au choix (S45).
  const [theme, setTheme] = useState(ini.theme)
  useEffect(() => {
    appliquerTheme(theme)
  }, [theme])
  const [departementChoisi, setDepartement] = useState<string | undefined>(undefined)
  // Sur téléphone, les filtres secondaires sont repliés (S29 : la première
  // brasserie était à 2,1 écrans). Ouverts sur ordinateur, où ils tiennent
  // à côté du départ, et à l'ouverture si l'un d'eux est actif : un filtre
  // réglé ne se cache pas dès l'arrivée.
  const [filtresOuverts, setFiltresOuverts] = useState(
    () =>
      window.matchMedia('(min-width: 900px)').matches ||
      ini.favorisSeulement ||
      raccourci === 'favoris' ||
      ini.pasVisitees ||
      ini.type !== undefined ||
      ini.categories.length < ORDRE_CATEGORIES.length ||
      (couche !== null && !ini.avecOsm),
  )
  // Passé à 900 px de large (tablette tournée), le repli s'ouvre : les
  // filtres y tiennent à côté du départ (revue adverse S29).
  useEffect(() => {
    const large = window.matchMedia('(min-width: 900px)')
    const suivre = () => {
      if (large.matches) setFiltresOuverts(true)
    }
    large.addEventListener('change', suivre)
    return () => {
      large.removeEventListener('change', suivre)
    }
  }, [])
  const { titreCarte, carteEnVue } = useCarteEnVue()
  /** Ce que dit l'écran après un geste sur les favoris ou l'effacement. */
  const [annonce, setAnnonce] = useState('')
  const compte = useRef<HTMLParagraphElement>(null)
  const barre = useHauteurBarre()
  const { enLigne, pretHorsLigne } = useConnexion()

  // Chaque changement est gardé sur l'appareil (S9). Le texte tapé et la
  // fiche ouverte ne le sont pas : ce sont des gestes, pas des réglages.
  // On n'écrit que ce qui diffère de ce qui est déjà gardé (revue code S9) :
  // écrire au montage réécrivait les valeurs par défaut juste après un
  // effacement, et figeait un stockage relu en partie.
  const dejaGarde = useRef(JSON.stringify(versStockage(ini)))
  // Ce qui est gardé, calculé une fois : écrit par l'effet ci-dessous, et
  // enregistré tel quel par la sauvegarde (S37).
  const garde: Preferences = useMemo(
    () =>
      versStockage({
        version: VERSION_PREFERENCES,
        rayonKm,
        categories: [...categories],
        ...(type === undefined ? {} : { type }),
        depart: autourEnAttente && origine.type === 'brignais' ? { type: 'autour' } : origine,
        favoris: [...favoris],
        favorisSeulement: favorisParRaccourci ? ini.favorisSeulement : favorisSeulement,
        avecOsm,
        visites: [...visites],
        pasVisitees,
        notes: [...notes],
        theme,
      }),
    [rayonKm, categories, type, origine, autourEnAttente, favoris, favorisSeulement, favorisParRaccourci, ini.favorisSeulement, avecOsm, visites, pasVisitees, notes, theme],
  )
  useEffect(() => {
    const texte = JSON.stringify(garde)
    if (texte === dejaGarde.current) return
    dejaGarde.current = texte
    stockage.garder(garde)
  }, [stockage, garde])

  // Le carnet passe d'un onglet à l'autre (S24, S35 ; crochet sorti en S237).
  const remettreAZeroRef = useRef<() => void>(() => undefined)
  const { annoncerEffacement, tenirPourPartage } = useCarnetEntreOnglets(
    { favoris, visites, notes },
    { favoris: setFavoris, visites: setVisites, notes: setNotes, effacement: () => { remettreAZeroRef.current() } },
  )

  const ensembleFavoris = useMemo(() => new Set(favoris), [favoris])
  const datesDeVisite = useMemo(() => new Map(visites.map((v) => [v.nom, v.date])), [visites])
  const textesDeNote = useMemo(() => new Map(notes.map((n) => [n.nom, n.texte])), [notes])
  const exclure = useMemo(
    () => (pasVisitees ? new Set(visites.map((v) => v.nom)) : undefined),
    [pasVisitees, visites],
  )

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
  // Les nombres du menu suivent les filtres en cours (revue S27, fait en
  // S31). Un département à 0 reste dans le menu : le retirer aurait fait
  // tomber le choix au premier filtre décoché.
  const parDepartementFiltre = useMemo(
    () =>
      compterParDepartement(cherchees, {
        categories,
        ...(type === undefined ? {} : { type }),
        ...(favorisSeulement ? { seulement: new Set(favoris) } : {}),
        ...(exclure === undefined ? {} : { exclure }),
      }),
    [cherchees, categories, type, favorisSeulement, favoris, exclure],
  )
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
        ...(exclure === undefined ? {} : { exclure }),
        ...(departement === undefined ? {} : { departement }),
      }),
    [cherchees, origine, rayonKm, texte, categories, type, favorisSeulement, ensembleFavoris, exclure, departement],
  )

  // Ma tournée (S27) : les favoris encore présents, de proche en proche.
  const tournee = useMemo(() => {
    const etapes = toutes.filter((b) => ensembleFavoris.has(b.n) && b.fermee === undefined)
    const ordre = ordonnerTournee(etapes, origine.point)
    return {
      etapes: ordre.map((b) => b.n),
      // Pour l'image à partager (S34) : nom et commune, rien du départ.
      image: ordre.map((b) => ({ nom: b.n, commune: b.c, departement: b.d })),
      lien: lienTournee(ordre),
      total: etapes.length,
    }
  }, [toutes, ensembleFavoris, origine])
  const partout = rechercherPartout({ texte, ...(departement === undefined ? {} : { departement }) })
  const caches = favorisSeulement ? favorisCaches(cherchees, favoris, resultats) : []
  const fermes = useMemo(() => favorisFermes(cherchees, favoris), [cherchees, favoris])
  // Un favori dont le nom n'est plus dans les données (renommée, retirée) :
  // dit et retirable, plutôt que compté en silence (revue code S9).
  // Pas avant la couche OSM : un favori qui en vient passerait pour disparu.
  const nomsConnus = useMemo(() => new Set(toutes.map((b) => b.n)), [toutes])
  // Le carnet compte ce qu'on peut voir : une visite d'une brasserie OSM,
  // couche décochée, ne gonfle pas le nombre (revue adverse S35).
  const nomsCherches = useMemo(() => new Set(cherchees.map((b) => b.n)), [cherchees])
  const orphelins = osm.etat === 'pret' ? favoris.filter((f) => !nomsConnus.has(f)) : []
  const nbFavorisConnus = favoris.length - orphelins.length
  const etatFiltres: EtatFiltres = {
    categories,
    favorisSeulement,
    sansOsm: osm.etat === 'pret' && !avecOsm,
    pasVisitees,
    ...(departement === undefined ? {} : { departement }),
    ...(type === undefined ? {} : { type }),
  }

  const basculerUnFavori = (nom: string) => {
    const retrait = favoris.includes(nom)
    setFavoris((avant) => basculerFavori(avant, nom))
    setAnnonce(retrait ? t('« {nom} » retirée de vos favoris.', { nom }) : t('« {nom} » ajoutée à vos favoris.', { nom }))
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
    tenirPourPartage(d)
    setRayonKm(d.rayonKm)
    setCategories(d.categories)
    setType(d.type)
    setOrigine(origineDesPreferences(d.depart, COMMUNES))
    setAutourEnAttente(false)
    setFavoris(d.favoris)
    setFavorisSeulement(d.favorisSeulement)
    setAvecOsm(d.avecOsm)
    setVisites(d.visites)
    setPasVisitees(d.pasVisitees)
    setNotes(d.notes)
    setTheme(d.theme)
  }, [tenirPourPartage])
  useEffect(() => {
    remettreAZeroRef.current = remettreAZero
  }, [remettreAZero])

  const toutEffacer = () => {
    stockage
      .effacer()
      .then(() => {
        remettreAZero()
        annoncerEffacement()
        setAnnonce(t('Favoris, carnet, notes et réglages effacés de cet appareil.'))
      })
      .catch(() => {
        setAnnonce(t('L’effacement a échoué : rien n’a changé. Réessayez.'))
      })
  }

  const basculerUneVisite = (nom: string) => {
    const retrait = visites.some((v) => v.nom === nom)
    setVisites((avant) => basculerVisite(avant, nom, dateDuJour(new Date())))
    setAnnonce(retrait ? t('« {nom} » retirée de votre carnet.', { nom }) : t('« {nom} » notée comme visitée.', { nom }))
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

  /** Mène à la carte ou à la liste : le focus suit, pour le clavier et le lecteur d'écran. */
  const allerA = (id: string) => {
    const titre = document.getElementById(id)
    titre?.parentElement?.scrollIntoView({ block: 'start' })
    titre?.focus({ preventScroll: true })
  }

  return (
    <div className="page">
      <header className="entete">
        <div className="marque">
          {/* Le logo en ligne, pour que sa mousse monte une fois à l'ouverture
              (S33). Décoratif : le titre dit déjà le nom. Mêmes tracés que
              `public/icon.svg`. */}
          <svg className="logo" viewBox="0 0 512 512" width={48} height={48} aria-hidden="true" focusable="false">
            <rect width="512" height="512" rx="96" fill="#1e2b23" />
            <path d="M150 170h170v210a40 40 0 0 1-40 40h-90a40 40 0 0 1-40-40z" fill="#e8a33d" />
            <path
              d="M320 210h40a40 40 0 0 1 40 40v50a40 40 0 0 1-40 40h-40v-30h35a15 15 0 0 0 15-15v-40a15 15 0 0 0-15-15h-35z"
              fill="#e8a33d"
            />
            <path className="mousse" d="M140 175c0-40 30-65 65-60 15-30 70-35 90-5 35-5 55 25 45 65z" fill="#faf7f2" />
          </svg>
          <h1>Mousse de Poche</h1>
        </div>
        <p className="sous-titre">{t('Les brasseries artisanales autour de vous, et ce qu’on peut y faire.')}</p>
        <Installer />
      </header>

      <MiseAJour />
      {!enLigne && (
        <p className="bandeau-hors-ligne" role="status" data-testid="hors-ligne">
          {t('Hors connexion : toutes les fiches restent consultables. La carte n’affiche que les zones déjà vues.')}
        </p>
      )}

      <main>
      <section className="filtres" aria-labelledby="titre-filtres">
        {/* Titres pour naviguer au lecteur d'écran, invisibles à l'œil : la
            page n'en avait qu'un, le h1 (revue Inès S18). */}
        <h2 id="titre-filtres" className="lecteur-seul">
          {t('Rechercher et filtrer')}
        </h2>
        <PointDeDepart
          origine={origine}
          onChange={choisirOrigine}
          relocaliser={ini.depart.type === 'autour'}
          demander={raccourci === 'autour'}
        />

        <label className="champ">
          {/* « Chercher une brasserie » : à côté du champ de départ, « Nom ou
              commune » se confondait avec lui (revue globale S22). */}
          <span>{t('Chercher une brasserie (nom ou commune)')}</span>
          <input
            type="search"
            value={texte}
            onChange={(e) => {
              setTexte(e.target.value)
            }}
            placeholder={t('ex. Lyon, Oullins, Ninkasi…')}
            data-testid="recherche"
          />
        </label>
        {/* Arrivée par un lien partagé : le nom reste dans la recherche, et
            rien ne disait de l'effacer pour revenir à la liste autour du
            départ (revue S27, fait en S31). */}
        {lienPartage && ficheOuverte !== undefined && texte === ficheOuverte && (
          <div className="champ-aide" data-testid="lien-partage-aide">
            <p>{t('Fiche ouverte depuis un lien partagé.')}</p>
            <div className="depart-actions">
              <button
                type="button"
                onClick={() => {
                  setTexte('')
                  setSelection(null)
                  setLienPartage(false)
                  // Le lien quitte l'adresse : recharger ne rouvre plus la
                  // fiche (revue adverse S31).
                  window.history.replaceState(null, '', window.location.pathname + window.location.search)
                  // Le bouton disparaît : le focus va au compte, qui dit la
                  // nouvelle liste (revue adverse S31 ; il tombait en haut).
                  compte.current?.focus()
                }}
                data-testid="effacer-recherche"
              >
                {t('Voir les brasseries autour du départ')}
              </button>
            </div>
          </div>
        )}

        <label className="champ">
          <span>
            {t('Distance maximale depuis {origine} :', { origine: libelleOrigine(origine) })} <strong>{rayonKm} km</strong>
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

        <details
          className="plus-de-filtres"
          open={filtresOuverts}
          onToggle={(e) => {
            setFiltresOuverts(e.currentTarget.open)
          }}
          data-testid="plus-de-filtres"
        >
          <summary data-testid="plus-de-filtres-resume">
            {resumeDesFiltres(etatFiltres, nbFavorisConnus)}
          </summary>
          <div className="plus-de-filtres-corps">
            {/* Parcourir un département (S27 ; idée vue sur biere-tourisme.fr) :
                découvrir une région sans donner sa position. */}
            <label className="champ">
              <span>{t('Ou parcourir un département')}</span>
              <select
                value={departement ?? ''}
                onChange={(e) => {
                  setDepartement(e.target.value === '' ? undefined : e.target.value)
                }}
                data-testid="departement"
              >
                <option value="">{t('Non : autour du point de départ')}</option>
                {[...parDepartement.entries()]
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([code]) => (
                    <option key={code} value={code}>
                      {libelleDepartement(code)} ({parDepartementFiltre.get(code) ?? 0})
                    </option>
                  ))}
              </select>
            </label>

            <fieldset className="categories">
              <legend>{t('Ce qu’on peut y faire')}</legend>
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
                  {t(CATEGORIES[cat])}
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
                  {t('Inclure les {n} brasseries repérées sur OpenStreetMap (non vérifiées)', { n: osm.brasseries.length })}
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
              onSeulement={(v) => {
                setFavorisParRaccourci(false)
                setFavorisSeulement(v)
              }}
              stockageDisponible={stockage.disponible}
              onEffacer={toutEffacer}
              tournee={tournee}
              nbVisites={visites.filter((v) => nomsCherches.has(v.nom)).length}
              pasVisitees={pasVisitees}
              onPasVisitees={setPasVisitees}
            >
              {/* Changer d'appareil (S37) : un fichier, aucun serveur. Replié
                  avec ce qui est gardé : ouvert, il repoussait la liste sous
                  le premier écran d'ordinateur (porte, 904 px pour 800). */}
              <Sauvegarde
                actuelles={garde}
                onReprendre={(p) => {
                  setFavoris(p.favoris)
                  setVisites(p.visites)
                  setNotes(p.notes)
                }}
              />
            </MesFavoris>
          </div>
        </details>
      </section>

      {/* Rien à portée (depuis Lille) : où est la plus proche, et ce que
          couvre le fichier, plutôt qu'une liste vide (revue globale S22). */}
      {resultats.length === 0 && !favorisSeulement && !partout && (
        <p className="champ-aide" data-testid="plus-proche">
          {(() => {
            const p = plusProche(cherchees, origine.point)
            return p === undefined
              ? '' : `${t('La plus proche : {nom} ({commune}), à {distance}.', { nom: p.brasserie.n, commune: p.brasserie.c, distance: formaterDistance(p.distanceKm) })} `
          })()}
          {t('Les fiches vérifiées couvrent {n} départements : {liste}', { n: DEPARTEMENTS.length, liste: DEPARTEMENTS.join(', ') })}
          {osm.etat === 'pret'
            ? t(' ; ailleurs, {n} brasseries repérées sur OpenStreetMap, à confirmer.', { n: osm.brasseries.length })
            : '.'}
        </p>
      )}
      {osm.etat === 'echec' && (
        <div className="champ-aide" role="status" data-testid="osm-absente">
          <p>
            {t('Les brasseries de toute la France (OpenStreetMap) n’ont pas pu se charger : seules les fiches vérifiées, dans {n} départements, sont là.', { n: DEPARTEMENTS.length })}
          </p>
          <div className="depart-actions">
            <button
              type="button"
              onClick={() => {
                window.location.reload()
              }}
            >
              {t('Recharger la page')}
            </button>
          </div>
        </div>
      )}
      {caches.length > 0 && (
        <p className="champ-aide" data-testid="favoris-caches">
          {caches.length === 1
            ? t('Un favori est caché par la distance ou les filtres : {liste}.', { liste: listeCourte(caches) })
            : t('{n} favoris sont cachés par la distance ou les filtres : {liste}.', {
                n: caches.length,
                liste: listeCourte(caches),
              })}
        </p>
      )}
      {fermes.length > 0 && (
        <p className="champ-aide" data-testid="favoris-fermes">
          {fermes.length === 1
            ? t('Un favori est fermé : {nom}. Il ne paraît plus dans la liste autour du départ ni dans la tournée ; son nom tapé dans la recherche rouvre sa fiche.', { nom: fermes[0] ?? '' })
            : t('{n} favoris sont fermés : {liste}. Ils ne paraissent plus dans la liste autour du départ ni dans la tournée ; leur nom tapé dans la recherche rouvre leur fiche.', { n: fermes.length, liste: listeCourte(fermes) })}
        </p>
      )}

      {/* Sur téléphone, la liste vient avant la carte (S29) : la carte en
          premier repoussait la première brasserie de 400 px. Un bouton mène
          à la carte, un autre en revient ; sur ordinateur, elles sont côte à
          côte et les boutons s'effacent. */}
      <div className="vues">
        <div className="liste-conteneur">
          <h2 id="titre-liste" className="lecteur-seul" tabIndex={-1}>
            {t('Brasseries')}
          </h2>
          {/* Au clavier, la carte est après toute la liste : un lien
              d'évitement, peint au focus, y mène tout de suite. */}
          <a
            className="evitement"
            href="#titre-carte"
            onClick={(e) => {
              e.preventDefault()
              allerA('titre-carte')
            }}
          >
            {t('Aller à la carte')}
          </a>
          <Liste
            resultats={resultats}
            selection={selection}
            focaliser={focaliser}
            favoris={ensembleFavoris}
            onBasculerFavori={basculerUnFavori}
            visites={datesDeVisite}
            onBasculerVisite={basculerUneVisite}
            notes={textesDeNote}
            onEcrireNote={(nom, texte) => {
              setNotes((avant) => ecrireNote(avant, nom, texte))
            }}
            onImprimer={(b) => {
              setAffichette((avant) => ({ brasserie: b, n: (avant?.n ?? 0) + 1 }))
            }}
            onChoisir={(nom) => {
              // Un second toucher sur la ligne ouverte la referme.
              setSelection((avant) => (avant === nom ? null : nom))
            }}
          />
        </div>
        <div className="carte-conteneur">
          <h2 id="titre-carte" className="lecteur-seul" tabIndex={-1} ref={titreCarte}>
            {t('Carte')}
          </h2>
          <CarteDifferee
            resultats={resultats}
            cadrerSurResultats={partout && resultats.length > 0}
            origine={origine.point}
            libelleOrigine={libelleOrigine(origine)}
            rayonKm={rayonKm}
            selection={selection}
            onChoisir={choisirDepuisLaCarte}
          />
        </div>
      </div>
      {/* La barre collée en bas (S29) : le compte, et le bouton qui mène à
          la carte ou en revient. En fin de zone principale, elle colle
          pendant toute la lecture, filtres, liste et carte : placée avant la
          liste, elle partait avec le défilement (revue adverse S29). */}
      <div className="barre-compte" ref={barre}>
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
            pasVisitees,
          )}
          {pasVisitees && resultats.length > 0 ? ` ${t('(pas encore visitées)')}` : ''}
        </p>
        {resultats.length > 0 && (
          <button
            type="button"
            className="aller-vers"
            onClick={() => {
              allerA(carteEnVue ? 'titre-liste' : 'titre-carte')
            }}
            data-testid="vers-carte"
          >
            {carteEnVue ? t('Liste') : t('Carte')}
          </button>
        )}
      </div>
      </main>

      {affichette !== null && (
        <Suspense fallback={null}>
          <AffichetteDifferee
            key={affichette.n}
            brasserie={affichette.brasserie}
            onFin={() => {
              setAffichette(null)
            }}
          />
        </Suspense>
      )}
      <footer className="pied">
        {/* Le thème au choix (S45) : gardé avec les réglages. */}
        <fieldset className="theme-choix" data-testid="theme">
          <legend>{t('Apparence')}</legend>
          {(
            [
              ['auto', t('Comme le téléphone')],
              ['clair', t('Claire')],
              ['sombre', t('Sombre')],
            ] as const
          ).map(([valeur, libelle]) => (
            <label key={valeur} className="case">
              <input
                type="radio"
                name="theme"
                checked={theme === valeur}
                onChange={() => {
                  setTheme(valeur)
                }}
                data-testid={`theme-${valeur}`}
              />
              {libelle}
            </label>
          ))}
        </fieldset>
        {/* « Quoi de neuf ? » (S44) : l'application, et les fiches. */}
        <details className="quoi-de-neuf" data-testid="quoi-de-neuf">
          <summary>{t('Quoi de neuf ?')}</summary>
          <p>{t(DONNEES.phrase)}</p>
          <ul>
            {NOUVEAUTES.map((n) => (
              <li key={n.texte}>
                <time dateTime={n.date}>{libelleVerification(n.date)}</time> — {t(n.texte)}
              </li>
            ))}
          </ul>
        </details>
        <p data-testid="etat-hors-ligne">
          {pretHorsLigne
            ? t('Prête pour une utilisation hors connexion sur cet appareil : fiches, liste, communes de départ et carte déjà vue.')
            : t('Pas encore prête hors connexion : gardez la page ouverte un moment avec du réseau.')}
        </p>
        <p>
          {t('Distances à vol d’oiseau. Les fiches vérifiées sont souvent placées au centre de leur commune (à environ 2 km près) ; celles d’OpenStreetMap, au point de la carte.')}
        </p>
        <p data-testid="sources-osm">
          {t('Brasseries hors des fiches vérifiées :')} ©{' '}
          <a href="https://www.openstreetmap.org/copyright">{t('contributeurs OpenStreetMap')}</a>, {t('licence ODbL')}
          {osm.extrait === '' ? '' : t(', extrait du {date}', { date: osm.extrait.slice(0, 10) })}{' '}
          {t('— repérées comme brasseries, rien d’autre n’est vérifié.')}
        </p>
        <p data-testid="sources-communes">
          {t('Communes : Code officiel géographique de l’INSEE (Licence ouverte, via le paquet d’Etalab), points tirés de Wikidata (CC0).')}
        </p>
        <p data-testid="mention-alcool">
          {t('L’abus d’alcool est dangereux pour la santé, à consommer avec modération.')}
        </p>
        <p data-testid="signaler-erreur-aide">
          {t('Une erreur sur une fiche ? Ouvrez-la dans la liste, puis « Signaler une erreur sur cette fiche ».')}
        </p>
        <p data-testid="signaler-absente">
          {t('Une brasserie manque ?')}{' '}
          <a href={lienAjout()} target="_blank" rel="noopener noreferrer">
            {t('La signaler')}
          </a>{' '}
          {t('(sur GitHub, compte gratuit nécessaire, signalement public).')} {t(SANS_COMPTE)}{' '}
          {t(SUITE_SIGNALEMENT)}
        </p>
        <p className="pied-lien">
          <a href="https://github.com/Opaland/Brewery-map">{t('Code source')}</a>
        </p>
      </footer>
    </div>
  )
}
