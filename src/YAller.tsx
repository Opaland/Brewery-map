import { phrasePosition } from './core/fiche'
import { liensItineraire, plateformeDe } from './core/itineraire'
import type { Brasserie } from './core/schema'
import { t } from './i18n'
import { LienExterne } from './LienExterne'

/**
 * « Y aller » (S19, persona Hugo) : l'application de navigation est au choix
 * de la personne, et le lien n'emporte que la destination
 * (`src/core/itineraire.ts`). L'adresse est dite en tête de fiche (« En
 * bref ») ; ici, une phrase dit où mène vraiment le point de la carte (S308 :
 * une seule, là où il y en avait trois).
 */
export function YAller({ brasserie }: { brasserie: Brasserie }) {
  const position = phrasePosition(brasserie)
  return (
    <div className="fiche-y-aller" data-testid="fiche-y-aller">
      {position !== '' && (
        <p className="fiche-aide" data-testid="fiche-precision">
          {position}
        </p>
      )}
      <ul className="fiche-liens">
        {liensItineraire(brasserie, plateformeDe(navigator.userAgent)).map((l) => (
          <li key={l.appli}>
            <LienExterne href={l.url}>
              {l.appli}
              <span className="lecteur-seul">{t(' : itinéraire vers {nom}', { nom: brasserie.n })}</span>
            </LienExterne>
          </li>
        ))}
      </ul>
      <p className="fiche-aide" data-testid="y-aller-confidentialite">
        {t('Le lien ne contient que la destination, pas votre position.')}
      </p>
    </div>
  )
}
