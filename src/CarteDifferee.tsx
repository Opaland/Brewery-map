import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * La carte ne se charge qu'à l'approche de l'écran (S20, persona Bernard).
 * Mesuré le 16/10 (Lighthouse 13.5, mobile simulé, processeur ralenti 4×) :
 * son chunk prenait 3,8 s du fil principal dès l'ouverture, alors que sur un
 * téléphone elle commence sous l'écran (1 289 px pour 839 px de haut sur le
 * Pixel 7 des tests). La liste, elle, est là tout de suite.
 *
 * Marge de 300 px : la carte démarre un peu avant d'être vue, pour être prête
 * quand on y arrive. Chiffre de présentation, tranché au jugé (CLAUDE.md §2) :
 * 0 la ferait apparaître vide un instant ; un écran entier (≈ 800 px) la
 * chargerait presque toujours, ce qu'on veut éviter.
 *
 * Sans IntersectionObserver (très vieux navigateur), elle se charge tout de
 * suite, comme avant.
 */
export function CarteDifferee({ children }: { children: ReactNode }) {
  const repere = useRef<HTMLDivElement>(null)
  const [proche, setProche] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (proche || repere.current === null) return
    const obs = new IntersectionObserver(
      (entrees) => {
        if (entrees.some((e) => e.isIntersecting)) setProche(true)
      },
      { rootMargin: '300px' },
    )
    obs.observe(repere.current)
    return () => {
      obs.disconnect()
    }
  }, [proche])

  if (proche) return <>{children}</>
  return (
    <div ref={repere} className="carte carte-attente" data-testid="carte-en-attente">
      La carte se charge quand vous y arrivez.
    </div>
  )
}
