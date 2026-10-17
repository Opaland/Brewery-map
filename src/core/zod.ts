import { z } from 'zod'

/**
 * Zod, configuré une fois, avant tout schéma. Sans compilation à la volée :
 * Zod essaie sinon `Function('')`, que la politique de sécurité de la page
 * (`build/csp.ts`, sans 'unsafe-eval') refuse et signale (S24).
 *
 * Zod lit ce réglage **à la construction** de chaque schéma objet. Posé dans
 * `schema.ts`, il venait trop tard quand le découpage du paquet (S38)
 * évaluait `preferences.ts` avant lui : la CSP a signalé l'eval. Tout module
 * de `src/core` importe donc `z` d'ici, jamais de 'zod' directement
 * (`tests/unit/zod-config.test.ts`).
 */
z.config({ jitless: true })

export { z }
