import { langueCourante, t } from './i18n'
import { useEffect, useMemo, useRef, useState } from 'react'
import { mouvementReduit } from './mouvement'
import {
  Map as CarteMapLibre,
  Marker,
  NavigationControl,
  setWorkerUrl,
  type GeoJSONSource,
  type StyleSpecification,
} from 'maplibre-gl'
import type { FeatureCollection } from 'geojson'
import urlDuWorker from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import 'maplibre-gl/dist/maplibre-gl.css'
import { CATEGORIES, ORDRE_CATEGORIES } from './core/categories'
import { formaterDistance, type Point } from './core/distance'
import { empriseDesPoints, type Emprise } from './core/emprise'
import { estDeOsm } from './core/osm-france'
import type { Resultat } from './core/recherche'
import type { Categorie } from './core/schema'

// Repris de Sentiers (`src/lib/maplibreSetup.ts`) : MapLibre 6 cherche son
// worker à côté de son module, qui n'existe plus après le bundling. Sans
// cette ligne, le worker ne charge pas, les données GeoJSON ne sont jamais
// calculées et la carte reste sans marqueur (constaté le 15/10).
setWorkerUrl(urlDuWorker)

interface Props {
  resultats: readonly Resultat[]
  origine: Point
  /** Pour le nom accessible du repère de départ. */
  libelleOrigine: string
  rayonKm: number
  /**
   * Un nom est tapé (S24) : la carte se cadre sur les brasseries trouvées,
   * à toute distance, plutôt que sur le rayon qu'elles ignorent.
   */
  cadrerSurResultats?: boolean
  selection: string | null
  onChoisir: (nom: string) => void
}

/**
 * Tuiles raster d'OpenStreetMap, attribution visible (ODbL). Une requête de
 * tuile ne porte que z/x/y : rien de la personne.
 *
 * Pas de `glyphs` : aucune couche de texte WebGL. Le 15/10, une couche
 * `symbol` (le nombre d'un groupe) sans police déclarée a fait échouer
 * l'ajout des couches suivantes — la carte s'affichait sans un seul marqueur,
 * et le test « la carte se dessine » restait vert parce qu'il ne regardait que
 * le canvas. Les marqueurs sont donc des boutons HTML, vérifiables et
 * atteignables au clavier.
 */
const STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      // Au plus le zoom 14 (tuiles d'environ 1,7 km de côté vers 45° de latitude),
      // agrandies au-delà : le texte de confidentialité promet « à quelques
      // kilomètres près », et zoomer sur sa position demandait des tuiles de
      // moins d'un kilomètre (audit S26, m3).
      maxzoom: 14,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">contributeurs OpenStreetMap</a>',
    },
  },
  layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
}

/**
 * Zoom maximal : 14. Toutes les positions sont communales (≈ 2 km, BACKLOG
 * D3) ; zoomer plus près ferait croire à une adresse exacte.
 *
 * Le regroupement reste actif jusqu'à ce zoom (`clusterMaxZoom`), si bien que
 * deux brasseries aux mêmes coordonnées (Le Brass'in et Single Track, BACKLOG
 * D7) ne se superposent jamais : elles restent un groupe « 2 ». Décision de
 * Cédric du 15/10 : marqueurs groupés.
 */
const ZOOM_MAX = 14

export const CARTE_IMPOSSIBLE =
  'La carte ne peut pas s’afficher sur cet appareil. La liste contient toutes les brasseries.'

/** WebGL est-il là ? Sans lui, MapLibre ne dessine rien : la liste suffit, et on le dit. */
function webglDisponible(): boolean {
  try {
    const toile = document.createElement('canvas')
    return toile.getContext('webgl2') !== null || toile.getContext('webgl') !== null
  } catch {
    return false
  }
}

function versGeoJSON(resultats: readonly Resultat[]): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: resultats.map(({ brasserie }) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [brasserie.lon, brasserie.lat] },
      properties: { nom: brasserie.n, cat: brasserie.cat },
    })),
  }
}

/** Le rectangle qui contient le cercle du rayon (approximation équirectangulaire). */
function emprise(origine: Point, rayonKm: number): [[number, number], [number, number]] {
  const dLat = rayonKm / 111.32
  const dLon = rayonKm / (111.32 * Math.cos((origine.lat * Math.PI) / 180))
  return [
    [origine.lon - dLon, origine.lat - dLat],
    [origine.lon + dLon, origine.lat + dLat],
  ]
}

/**
 * Les textes de MapLibre lus au lecteur d'écran, en français : la page est
 * en `lang="fr"` et Inès entendait « Map », « Zoom in » (revue Inès S18).
 */
const CARTE_EN_FRANCAIS: Record<string, string> = {
  'Map.Title': 'Carte interactive',
  'Marker.Title': 'Repère',
  'NavigationControl.ZoomIn': 'Zoomer',
  'NavigationControl.ZoomOut': 'Dézoomer',
  'NavigationControl.ResetBearing': 'Remettre le nord en haut',
  'AttributionControl.ToggleAttribution': 'Afficher ou masquer les crédits',
  'CooperativeGesturesHandler.WindowsHelpText': 'Ctrl + molette pour zoomer la carte',
  'CooperativeGesturesHandler.MacHelpText': '⌘ + molette pour zoomer la carte',
  'CooperativeGesturesHandler.MobileHelpText': 'Deux doigts pour déplacer la carte',
}

function bouton(classe: string, libelle: string, texte = ''): HTMLButtonElement {
  const el = document.createElement('button')
  el.type = 'button'
  el.className = classe
  el.setAttribute('aria-label', libelle)
  el.textContent = texte
  return el
}

export default function Carte({
  resultats,
  origine,
  libelleOrigine,
  rayonKm,
  cadrerSurResultats = false,
  selection,
  onChoisir,
}: Props) {
  const conteneur = useRef<HTMLDivElement>(null)
  const carte = useRef<CarteMapLibre | null>(null)
  const marqueurs = useRef(new Map<string, Marker>())
  const repere = useRef<Marker | null>(null)
  const [prete, setPrete] = useState(false)
  // Le fond de carte n'a pas pu charger (hors connexion, serveur de tuiles
  // indisponible) : on le dit, au lieu d'un fond vide sans explication.
  const [fondAbsent, setFondAbsent] = useState(false)
  const [erreur, setErreur] = useState<string | null>(() =>
    webglDisponible() ? null : t(CARTE_IMPOSSIBLE),
  )
  // Sur téléphone, un marqueur touché montre un aperçu dans la carte (S32) :
  // depuis S29, la liste est au-dessus, et choisir la ligne y ramenait la
  // page, loin de la carte. Sur ordinateur, la liste est à côté : on choisit.
  const [apercu, setApercu] = useState<string | null>(null)
  const titreApercu = useRef<HTMLHeadingElement>(null)
  // Un groupe au zoom maximal choisit sa première brasserie dans la liste,
  // où les autres la suivent : un aperçu n'en montrerait qu'une, sans
  // marqueur à qui rendre le focus (revue adverse S32).
  const choisirMarqueur = (nom: string, groupe = false) => {
    if (!groupe && window.matchMedia('(max-width: 899px)').matches) {
      setApercu(nom)
      return
    }
    onChoisir(nom)
  }
  /**
   * Un groupe qui contient la brasserie choisie le montre, et le dit au
   * lecteur d'écran (S40 ; revue adverse S2 : choisie dans un groupe, elle
   * n'avait aucun retour sur la carte).
   */
  const marquerGroupes = useRef<() => void>(() => undefined)
  const surChoix = useRef(choisirMarqueur)
  const choisie = useRef(selection)
  useEffect(() => {
    surChoix.current = choisirMarqueur
    choisie.current = selection
  })
  // Le focus va sur l'aperçu ouvert, pour le clavier et le lecteur d'écran.
  useEffect(() => {
    if (apercu !== null) titreApercu.current?.focus()
  }, [apercu])
  const fermerApercu = () => {
    const nom = apercu
    setApercu(null)
    // Le focus revient au marqueur ; s'il a rejoint un groupe entre-temps,
    // à la carte elle-même, plutôt qu'en haut de la page.
    const marqueur = [...marqueurs.current.values()].map((m) => m.getElement()).find((el) => el.dataset['nom'] === nom)
    ;(marqueur ?? conteneur.current?.querySelector<HTMLElement>('canvas'))?.focus()
  }
  // Une recherche qui ne garde plus la brasserie de l'aperçu le retire :
  // gardé, il revenait seul, sans focus, à la recherche suivante (revue
  // adverse S32).
  // Ajusté pendant le rendu, comme le recommande React pour un état qui
  // dépend d'une prop (plutôt qu'un effet qui rend deux fois).
  if (apercu !== null && !resultats.some((r) => r.brasserie.n === apercu)) setApercu(null)

  // Création, une seule fois.
  useEffect(() => {
    if (!conteneur.current || erreur !== null) return
    let map: CarteMapLibre
    try {
      map = new CarteMapLibre({
        container: conteneur.current,
        style: STYLE,
        bounds: emprise(origine, rayonKm),
        maxZoom: ZOOM_MAX,
        attributionControl: { compact: false },
        cooperativeGestures: true,
        // En anglais, les textes d'origine de MapLibre (S49).
        locale: langueCourante() === 'fr' ? CARTE_EN_FRANCAIS : {},
      })
    } catch {
      // WebGL annoncé mais refusé à la création : même repli, signalé après
      // le rendu en cours plutôt que pendant.
      void Promise.resolve().then(() => {
        setErreur(t(CARTE_IMPOSSIBLE))
      })
      return
    }
    carte.current = map
    const actifs = marqueurs.current
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right')

    const origineEl = document.createElement('div')
    origineEl.className = 'marqueur-origine'
    origineEl.setAttribute('role', 'img')
    origineEl.dataset['testid'] = 'repere-depart'
    repere.current = new Marker({ element: origineEl })
      .setLngLat([origine.lon, origine.lat])
      .addTo(map)

    /**
     * Les marqueurs visibles, recalculés depuis ce que le regroupement de
     * MapLibre a **rendu** pour la vue courante. `querySourceFeatures` ne
     * convient pas : pendant un changement de zoom, il rend les tuiles de deux
     * niveaux à la fois, et un groupe s'ajoutait à ses propres brasseries
     * (16 marqueurs pour 12, mesuré le 15/10). Une clé par groupe ou par
     * brasserie : un marqueur qui reste n'est pas recréé.
     */
    const redessiner = () => {
      const source = map.getSource<GeoJSONSource>('brasseries')
      if (!source) return
      const vus = new Set<string>()
      for (const f of map.queryRenderedFeatures({ layers: ['brasseries-calcul'] })) {
        if (f.geometry.type !== 'Point') continue
        const [lon, lat] = f.geometry.coordinates as [number, number]
        const p = f.properties
        const idGroupe: unknown = p['cluster_id']
        const cle = typeof idGroupe === 'number' ? `g${String(idGroupe)}` : `b${String(p['nom'])}`
        if (vus.has(cle)) continue
        vus.add(cle)
        if (actifs.has(cle)) continue

        let el: HTMLButtonElement
        if (typeof idGroupe === 'number') {
          const n = Number(p['point_count'])
          el = bouton('marqueur marqueur-groupe', t('{n} brasseries ici, voir le détail', { n }), String(n))
          el.dataset['groupe'] = String(idGroupe)
          el.dataset['libelle'] = el.getAttribute('aria-label') ?? ''
          el.addEventListener('click', () => {
            void source.getClusterExpansionZoom(idGroupe).then((zoom) => {
              if (zoom <= ZOOM_MAX && zoom > map.getZoom()) {
                map.easeTo({ center: [lon, lat], zoom, ...(mouvementReduit() ? { duration: 0 } : {}) })
                return
              }
              // Zoom maximal atteint sans séparation. Avec un rayon de groupe
              // de 36 px (≈ 240 m au zoom 14), des points très proches
              // peuvent en être là. Mesuré le 16/10 (revue globale S22) : Le
              // Brass'in et Single Track ont les mêmes coordonnées ; La Beer
              // Fabrique et Tom & Co sont à 136 m (vus séparés au zoom
              // maximal, par une sonde). « Plus de 640 m », écrit le 15/10,
              // était faux. La première est choisie ; les autres, à la même
              // distance, la suivent dans la liste.
              void source.getClusterLeaves(idGroupe, 1, 0).then((feuilles) => {
                const nom: unknown = feuilles[0]?.properties?.['nom']
                if (typeof nom === 'string') surChoix.current(nom, true)
              })
            })
          })
        } else {
          const nom = String(p['nom'])
          const cat = Number(p['cat']) as Categorie
          el = bouton(`marqueur cat-${String(cat)}`, `${nom} — ${t(CATEGORIES[cat])}`)
          el.dataset['nom'] = nom
          el.setAttribute('aria-pressed', String(choisie.current === nom))
          el.addEventListener('click', () => {
            surChoix.current(nom)
          })
        }
        actifs.set(cle, new Marker({ element: el }).setLngLat([lon, lat]).addTo(map))
      }
      for (const [cle, marqueur] of actifs) {
        if (!vus.has(cle)) {
          marqueur.remove()
          actifs.delete(cle)
        }
      }
      marquerGroupes.current()
    }

    // Le repli ne s'allume qu'après trois tuiles en échec d'affilée, sans
    // tuile reçue entre elles : une seule tuile perdue l'allumait puis
    // l'éteignait aussitôt (revue code S7, fait en S41). Trois : seuil de
    // présentation, au jugé (§2) — une vue de téléphone demande une dizaine
    // de tuiles, hors connexion toutes échouent.
    let echecs = 0
    map.on('error', (e) => {
      if ((e as { sourceId?: string }).sourceId !== 'osm') return
      echecs += 1
      if (echecs >= 3) setFondAbsent(true)
    })
    map.on('sourcedata', (e) => {
      if (e.sourceId === 'osm' && e.tile !== undefined) {
        echecs = 0
        setFondAbsent(false)
      }
    })

    map.on('load', () => {
      // Le lien d'attribution d'OSM quittait l'application, PWA comprise,
      // dans la même fenêtre (revue globale S22) : un nouvel onglet, sans
      // adresse d'origine, comme les autres liens sortants.
      for (const a of conteneur.current?.querySelectorAll('.maplibregl-ctrl-attrib a') ?? []) {
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', 'noopener noreferrer')
      }
      map.addSource('brasseries', {
        type: 'geojson',
        data: versGeoJSON([]),
        cluster: true,
        clusterRadius: 36,
        clusterMaxZoom: ZOOM_MAX,
      })
      // Couche invisible : c'est elle que `queryRenderedFeatures` interroge.
      // Le dessin est fait en HTML.
      map.addLayer({
        id: 'brasseries-calcul',
        type: 'circle',
        source: 'brasseries',
        paint: { 'circle-opacity': 0, 'circle-radius': 1 },
      })
      // `idle` : la vue est rendue et plus rien ne bouge — ni zoom en cours,
      // ni données en calcul. Le seul instant où ce qui est rendu est final.
      map.on('idle', redessiner)
      setPrete(true)
    })

    return () => {
      for (const m of actifs.values()) m.remove()
      actifs.clear()
      map.remove()
      carte.current = null
    }
    // La carte se crée une fois ; les changements passent par les effets suivants.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Les points suivent la recherche : on jette les marqueurs, la source
  // recalculée les redessine.
  useEffect(() => {
    if (!prete) return
    for (const m of marqueurs.current.values()) m.remove()
    marqueurs.current.clear()
    void carte.current?.getSource<GeoJSONSource>('brasseries')?.setData(versGeoJSON(resultats))
  }, [prete, resultats])

  // Comparé par valeur : `resultats` change d'identité à chaque favori
  // touché, et la carte quittait la brasserie choisie (revue adverse S24).
  const cleDuCadre = useMemo(
    () =>
      cadrerSurResultats
        ? JSON.stringify(empriseDesPoints(resultats.map(({ brasserie: b }) => ({ lat: b.lat, lon: b.lon }))) ?? null)
        : 'null',
    [cadrerSurResultats, resultats],
  )
  const cadreDesResultats = useMemo(() => JSON.parse(cleDuCadre) as Emprise | null, [cleDuCadre])

  // Le repère et le cadre suivent le point de départ et le rayon — ou, avec
  // un nom tapé, les brasseries trouvées.
  useEffect(() => {
    repere.current?.setLngLat([origine.lon, origine.lat])
    repere.current?.getElement().setAttribute('aria-label', t('Point de départ : {origine}', { origine: libelleOrigine }))
    if (!prete) return
    carte.current?.fitBounds(cadreDesResultats ?? emprise(origine, rayonKm), {
      duration: mouvementReduit() ? 0 : 300,
    })
  }, [prete, origine, libelleOrigine, rayonKm, cadreDesResultats])

  // La brasserie choisie est marquée, et la carte la centre — une fois, au
  // choix. Dépendre aussi des résultats recentrait la carte à chaque frappe
  // dans la recherche (revue adverse du 15/10).
  const resultatsCourants = useRef(resultats)
  useEffect(() => {
    resultatsCourants.current = resultats
  }, [resultats])
  const cible = apercu ?? selection
  const cibleCourante = useRef(cible)
  useEffect(() => {
    cibleCourante.current = cible
    marquerGroupes.current = () => {
      const source = carte.current?.getSource<GeoJSONSource>('brasseries')
      for (const m of marqueurs.current.values()) {
        const el = m.getElement()
        const id = el.dataset['groupe']
        if (id === undefined) continue
        const libelle = el.dataset['libelle'] ?? ''
        if (cible === null || source === undefined) {
          el.classList.remove('contient-choisie')
          el.setAttribute('aria-label', libelle)
          continue
        }
        source
          .getClusterLeaves(Number(id), Infinity, 0)
          .then((feuilles) => {
            // Une réponse arrivée après un autre choix ne marque rien (revue
            // adverse S40 : refermée aussitôt, la fiche laissait son groupe marqué).
            if (cibleCourante.current !== cible) return
            const dedans = feuilles.some((f) => f.properties?.['nom'] === cible)
            el.classList.toggle('contient-choisie', dedans)
            el.setAttribute('aria-label', dedans ? t('{libelle}, dont « {nom} », choisie', { libelle, nom: cible }) : libelle)
          })
          .catch(() => undefined)
      }
    }
    marquerGroupes.current()
  }, [cible, prete])
  useEffect(() => {
    if (!prete) return
    for (const m of marqueurs.current.values()) {
      const el = m.getElement()
      if (el.dataset['nom'] === undefined) continue
      el.setAttribute('aria-pressed', String(el.dataset['nom'] === cible))
    }
    if (cible === null) return
    const trouvee = resultatsCourants.current.find((r) => r.brasserie.n === cible)
    if (!trouvee) return
    carte.current?.easeTo({
      center: [trouvee.brasserie.lon, trouvee.brasserie.lat],
      zoom: Math.max(carte.current.getZoom(), 11),
      ...(mouvementReduit() ? { duration: 0 } : {}),
    })
  }, [prete, cible])

  if (erreur !== null) {
    return (
      <div className="carte carte-absente" role="note" data-testid="carte-absente">
        {erreur}
      </div>
    )
  }
  const vue = apercu === null ? undefined : resultats.find((r) => r.brasserie.n === apercu)
  return (
    <div className="carte-cadre">
      <div className="carte-zone">
        <div
          ref={conteneur}
          className="carte"
          role="region"
          aria-label={t('Carte des brasseries (la liste contient les mêmes informations)')}
          data-testid="carte"
        />
        {vue !== undefined && (
          <section
            className="apercu-carte"
            aria-labelledby="apercu-titre"
            data-testid="apercu-carte"
            onKeyDown={(e) => {
              if (e.key === 'Escape') fermerApercu()
            }}
          >
            <h3 id="apercu-titre" tabIndex={-1} ref={titreApercu}>
              {vue.brasserie.n}
            </h3>
            <p>
              {vue.brasserie.c} ({vue.brasserie.d}) · {formaterDistance(vue.distanceKm)}
            </p>
            <p className={`badge cat-${String(vue.brasserie.cat)}`}>
              <span className="pastille" aria-hidden="true" />
              {t(CATEGORIES[vue.brasserie.cat])}
              {estDeOsm(vue.brasserie) ? ' · OpenStreetMap' : ''}
            </p>
            <div className="depart-actions">
              <button
                type="button"
                className="bouton-principal"
                onClick={() => {
                  setApercu(null)
                  onChoisir(vue.brasserie.n)
                }}
                data-testid="apercu-voir-fiche"
              >
                {t('Voir la fiche')}
              </button>
              <button type="button" onClick={fermerApercu} data-testid="apercu-fermer">
                {t('Fermer')}
              </button>
            </div>
          </section>
        )}
      </div>
      {/* La légende, visible sans ouvrir de fiche (S27 ; idée vue sur Open
          Brewery Map). Les couleurs sont celles des marqueurs. */}
      <ul className="legende-carte" aria-label={t('Légende de la carte')} data-testid="legende-carte">
        {ORDRE_CATEGORIES.map((cat) => (
          <li key={cat} className={`cat-${String(cat)}`}>
            <span className="pastille" aria-hidden="true" />
            {t(CATEGORIES[cat])}
          </li>
        ))}
        <li>
          <span className="pastille pastille-groupe" aria-hidden="true" />
          {t('Plusieurs brasseries')}
        </li>
        <li>
          <span className="pastille pastille-depart" aria-hidden="true" />
          {t('Point de départ')}
        </li>
      </ul>
      {fondAbsent && (
        <p className="carte-fond-absent" role="status" data-testid="fond-absent">
          {t('Fond de carte incomplet ou indisponible. Les brasseries restent placées, et la liste est complète. Hors connexion, seules les zones déjà affichées sur cet appareil restent visibles.')}
        </p>
      )}
    </div>
  )
}
