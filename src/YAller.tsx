import { destination, liensItineraire, plateformeDe } from './core/itineraire'
import type { Brasserie } from './core/schema'
import { t } from './i18n'

/**
 * « Y aller » (S19, persona Hugo) : l'application de navigation est au choix
 * de la personne, et le lien n'emporte que la destination
 * (`src/core/itineraire.ts`). Sans adresse, l'écran dit où mène vraiment
 * l'itinéraire : au point de la carte, approximatif.
 */
export function YAller({ brasserie }: { brasserie: Brasserie }) {
  const d = destination(brasserie)
  return (
    <div className="fiche-y-aller" data-testid="fiche-y-aller">
      <p className="fiche-titre">{t('Y aller')}</p>
      {d.mode === 'osm' && (
        <p className="fiche-aide" data-testid="y-aller-osm">
          {t('L’itinéraire mène au point placé sur OpenStreetMap, non vérifié sur place.')}
        </p>
      )}
      {d.mode === 'commune' && (
        <p className="fiche-aide" data-testid="y-aller-commune">
                    {t(
            'Adresse inconnue : l’itinéraire mène au point de la carte, qui n’est pas l’adresse et peut en être à plusieurs kilomètres.',
          )}
        </p>
      )}
      {/* Idée vue sur la carte des distilleries écossaises : « vérifiez
          auprès de la distillerie avant de partir » (veille, S27). */}
      <p className="fiche-aide" data-testid="verifier-avant">
        {t('Vérifiez avant de partir que la brasserie est ouverte et vous accueille.')}
      </p>
      <ul className="fiche-liens">
        {liensItineraire(brasserie, plateformeDe(navigator.userAgent)).map((l) => (
          <li key={l.appli}>
            <a href={l.url} target="_blank" rel="noopener noreferrer">
              {l.appli}
              <span className="lecteur-seul">{t(' : itinéraire vers {nom}', { nom: brasserie.n })}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="fiche-aide">
                {t(
          'Le lien ne contient que la destination. Votre position, l’application choisie la prend elle-même si vous le lui permettez.',
        )}
      </p>
    </div>
  )
}
