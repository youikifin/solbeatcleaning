import { Link } from 'react-router-dom'
import { commercialServices, serviceAreas } from '../content/content.js'
import PageHero from '../components/PageHero.jsx'
import { Reveal } from '../components/motion-helpers.jsx'
import { TornEdge, TapedPhoto, PlaceholderPhoto, Ticker } from '../components/Paper.jsx'
import './services.css'

export default function Commercial() {
  return (
    <>
      <PageHero
        tone="sage"
        eyebrow="Commercial cleaning"
        title={
          <>
            Spaces that work as hard as <span className="serif-i">you</span> do
          </>
        }
        lede="Offices, shops, and common areas across the Steinbach region — cleaned on a documented checklist, scoped in writing, on a schedule that stays out of your way."
      />

      <section className="section section--tight" aria-label="Commercial services">
        <div className="wrap">
          <ul className="svc-grid">
            {commercialServices.map((s, i) => (
              <Reveal
                as="li"
                key={s.name}
                className="svc-card pcard"
                delay={(i % 3) * 0.07}
                rotate={i % 2 ? 0.8 : -0.8}
              >
                <span className="svc-num svc-num--sage" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="h-md">{s.name}</h2>
                <p>{s.blurb}</p>
              </Reveal>
            ))}
            <Reveal as="li" className="svc-card svc-card--cta" delay={0.14} rotate={1}>
              <p className="hand svc-cta-hand">Managing a property or a storefront?</p>
              <p>
                Tell us the square footage and the schedule you need — you&rsquo;ll get a
                written scope and a free estimate back.
              </p>
              <Link to="/contact" className="btn btn--sage">Request a Commercial Estimate</Link>
            </Reveal>
          </ul>
        </div>
      </section>

      <TornEdge color="var(--paper-2)" />
      <section className="section section--deep" aria-labelledby="why-qa-heading">
        <div className="wrap svc-how-grid">
          <Reveal rotate={-2}>
            <TapedPhoto tilt={-2} caption="checklists you can audit" tapeTones={['sage', 'cream']}>
              <PlaceholderPhoto
                alt="Beatrice cleaning the glass doors of a commercial building entrance"
                label={['a common area,', 'kept presentable']}
                tone="sage"
                ratio={[4, 3]}
              />
            </TapedPhoto>
          </Reveal>
          <div>
            <Reveal as="p" className="eyebrow eyebrow--sage" y={18}>Why SolBeat for business</Reveal>
            <Reveal as="h2" className="h-xl" delay={0.06} id="why-qa-heading">
              Run by someone who managed operations for a living
            </Reveal>
            <Reveal as="p" className="lede" delay={0.12}>
              Beatrice&rsquo;s background is quality assurance, logistics, and operations —
              Prima Klean, Advantage Solutions (CDS Canada), UPS, Royal Mills and Foods.
              Commercial contracts get the treatment she&rsquo;d expect as an operator:
              a written scope, a documented checklist, insured and background-checked
              service, and a 24-hour correction guarantee.
            </Reveal>
            <Reveal delay={0.2}>
              <Link to="/about" className="btn btn--ghost">Meet the founder</Link>
            </Reveal>
          </div>
        </div>
      </section>
      <TornEdge color="var(--paper-2)" flip />

      <div className="svc-ticker">
        <Ticker items={serviceAreas} tone="terra" />
      </div>
    </>
  )
}
