import { Reveal, Drift } from './motion-helpers.jsx'
import { TornEdge } from './Paper.jsx'
import './pagehero.css'

/* Shared interior-page masthead with drifting paper cutouts
   and a torn lower edge into the page body. */
export default function PageHero({ eyebrow, title, lede, children, tone = 'sage' }) {
  return (
    <>
      <section className={`phero phero--${tone}`}>
        <Drift className="phero-shape phero-shape--a" from={18} to={-26}>
          <span />
        </Drift>
        <Drift className="phero-shape phero-shape--b" from={30} to={-14}>
          <span />
        </Drift>
        <div className="wrap phero-inner">
          <Reveal as="p" className="eyebrow" y={18}>
            {eyebrow}
          </Reveal>
          <Reveal as="h1" className="h-display phero-title" delay={0.08}>
            {title}
          </Reveal>
          {lede && (
            <Reveal as="p" className="lede phero-lede" delay={0.16}>
              {lede}
            </Reveal>
          )}
          {children}
        </div>
      </section>
      <TornEdge color="var(--paper)" bg="var(--paper-2)" />
    </>
  )
}
