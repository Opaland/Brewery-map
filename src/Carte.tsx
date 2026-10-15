import { useEffect, useRef, useState } from 'react'
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
import { CATEGORIES } from './core/categories'
import type { Point } from './core/distance'
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
  rayonKm: number
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
      maxzoom: 19,
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

const CARTE_IMPOSSIBLE =
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

function bouton(classe: string, libelle: string, texte = ''): HTMLButtonElement {
  const el = document.createElement('button')
  el.type = 'button'
  el.className = classe
  el.setAttribute('aria-label', libelle)
  el.textContent = texte
  return el
}

export default function Carte({ resultats, origine, rayonKm, selection, onChoisir }: Props) {
  const conteneur = useRef<HTMLDivElement>(null)
  const carte = useRef<CarteMapLibre | null>(null)
  const marqueurs = useRef(new Map<string, Marker>())
  const [prete, setPrete] = useState(false)
  // Le fond de carte n'a pas pu charger (hors connexion, serveur de tuiles
  // indisponible) : on le dit, au lieu d'un fond vide sans explication.
  const [fondAbsent, setFondAbsent] = useState(false)
  const [erreur, setErreur] = useState<string | null>(() =>
    webglDisponible() ? null : CARTE_IMPOSSIBLE,
  )
  const surChoix = useRef(onChoisir)
  const choisie = useRef(selection)
  useEffect(() => {
    surChoix.current = onChoisir
    choisie.current = selection
  }, [onChoisir, selection])

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
      })
    } catch {
      // WebGL annoncé mais refusé à la création : même repli, signalé après
      // le rendu en cours plutôt que pendant.
      void Promise.resolve().then(() => {
        setErreur(CARTE_IMPOSSIBLE)
      })
      return
    }
    carte.current = map
    const actifs = marqueurs.current
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right')

    const origineEl = document.createElement('div')
    origineEl.className = 'marqueur-origine'
    origineEl.setAttribute('aria-label', 'Brignais, point de départ')
    origineEl.setAttribute('role', 'img')
    new Marker({ element: origineEl }).setLngLat([origine.lon, origine.lat]).addTo(map)

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
          el = bouton('marqueur marqueur-groupe', `${String(n)} brasseries ici, voir le détail`, String(n))
          el.addEventListener('click', () => {
            void source.getClusterExpansionZoom(idGroupe).then((zoom) => {
              if (zoom <= ZOOM_MAX && zoom > map.getZoom()) {
                map.easeTo({ center: [lon, lat], zoom })
                return
              }
              // Zoom maximal atteint sans séparation. Avec un rayon de groupe
              // de 36 px (≈ 240 m au zoom 14), seules des coordonnées
              // identiques en sont là : les paires voisines du fichier sont
              // toutes à plus de 640 m (mesuré le 15/10). La première est
              // choisie ; les autres, à la même distance, la suivent dans la
              // liste.
              void source.getClusterLeaves(idGroupe, 1, 0).then((feuilles) => {
                const nom: unknown = feuilles[0]?.properties?.['nom']
                if (typeof nom === 'string') surChoix.current(nom)
              })
            })
          })
        } else {
          const nom = String(p['nom'])
          const cat = Number(p['cat']) as Categorie
          el = bouton(`marqueur cat-${String(cat)}`, `${nom} — ${CATEGORIES[cat]}`)
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
    }

    map.on('error', (e) => {
      if ((e as { sourceId?: string }).sourceId === 'osm') setFondAbsent(true)
    })
    map.on('sourcedata', (e) => {
      if (e.sourceId === 'osm' && e.tile !== undefined) setFondAbsent(false)
    })

    map.on('load', () => {
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

  // Le cadre suit le rayon.
  useEffect(() => {
    if (!prete) return
    carte.current?.fitBounds(emprise(origine, rayonKm), { duration: 300 })
  }, [prete, origine, rayonKm])

  // La brasserie choisie est marquée, et la carte la centre — une fois, au
  // choix. Dépendre aussi des résultats recentrait la carte à chaque frappe
  // dans la recherche (revue adverse du 15/10).
  const resultatsCourants = useRef(resultats)
  useEffect(() => {
    resultatsCourants.current = resultats
  }, [resultats])
  useEffect(() => {
    if (!prete) return
    for (const m of marqueurs.current.values()) {
      const el = m.getElement()
      if (el.dataset['nom'] === undefined) continue
      el.setAttribute('aria-pressed', String(el.dataset['nom'] === selection))
    }
    if (selection === null) return
    const trouvee = resultatsCourants.current.find((r) => r.brasserie.n === selection)
    if (!trouvee) return
    carte.current?.easeTo({
      center: [trouvee.brasserie.lon, trouvee.brasserie.lat],
      zoom: Math.max(carte.current.getZoom(), 11),
    })
  }, [prete, selection])

  if (erreur !== null) {
    return (
      <div className="carte carte-absente" role="note" data-testid="carte-absente">
        {erreur}
      </div>
    )
  }
  return (
    <div className="carte-cadre">
      <div
        ref={conteneur}
        className="carte"
        role="region"
        aria-label="Carte des brasseries (la liste contient les mêmes informations)"
        data-testid="carte"
      />
      {fondAbsent && (
        <p className="carte-fond-absent" role="status" data-testid="fond-absent">
          Fond de carte indisponible (pas de réseau ?). Les brasseries restent placées, et la
          liste est complète. Les zones déjà vues s’affichent hors connexion.
        </p>
      )}
    </div>
  )
}
