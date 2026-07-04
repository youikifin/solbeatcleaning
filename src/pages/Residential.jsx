import { Link } from 'react-router-dom'
import { residentialServices } from '../content/content.js'
import PageHero from '../components/PageHero.jsx'
import { Reveal } from '../components/motion-helpers.jsx'
import { TornEdge, TapedPhoto, PlaceholderPhoto } from '../components/Paper.jsx'
import './services.css'

const steps = [
  {
    n: '01',
    title: 'The free estimate',
    text: 'Call or send the form. You get a written scope and price — no guessing, no surprises.',
  },
  {
    n: '02',
    title: 'The clean',
    text: 'Beatrice arrives with everything needed (your products on request) and works the checklist, corners first.',
  },
  {
    n: '03',
    title: 'The 24-hour check',
    text: 'Walk the space. Anything not right, report it within 24 hours and it’s corrected free.',
  },
]

export default function Residential() {
  return (
    <>
      <PageHero
        tone="terra"
        eyebrow="Residential cleaning"
        title={
          <>
            Your home, cleaned like it&rsquo;s <span className="serif-i">inspected</span>
          </>
        }
        lede="From a single spring refresh to a standing schedule, every home gets the same detailed checklist — and the supplies are on us."
      />

      <section className="section section--tight" aria-label="Residential services">
        <div className="wrap">
          <ul className="svc-grid">
            {residentialServices.map((s, i) => (
              <Reveal
                as="li"
                key={s.name}
                className="svc-card pcard"
                delay={(i % 3) * 0.07}
                rotate={i % 2 ? 0.8 : -0.8}
              >
                <span className="svc-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="h-md">{s.name}</h2>
                <p>{s.blurb}</p>
              </Reveal>
            ))}
            <Reveal as="li" className="svc-card svc-card--cta" delay={0.14} rotate={-1}>
              <p className="hand svc-cta-hand">Not sure which one you need?</p>
              <p>Describe the space and we&rsquo;ll recommend the right clean — the estimate is free either way.</p>
              <Link to="/contact" className="btn">Get a Free Estimate</Link>
            </Reveal>
          </ul>
        </div>
      </section>

      <TornEdge color="var(--paper-2)" />
      <section className="section section--deep" aria-labelledby="how-heading">
        <div className="wrap svc-how-grid">
          <div>
            <Reveal as="p" className="eyebrow" y={18}>How it works</Reveal>
            <Reveal as="h2" className="h-xl" delay={0.06} id="how-heading">
              Three steps, no fine print
            </Reveal>
            <ol className="svc-steps">
              {steps.map((st, i) => (
                <Reveal as="li" key={st.n} delay={0.1 + i * 0.09}>
                  <span className="svc-step-num" aria-hidden="true">{st.n}</span>
                  <div>
                    <h3 className="h-md">{st.title}</h3>
                    <p>{st.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal rotate={2} delay={0.15}>
            <TapedPhoto tilt={2} caption="every corner, every time" tapeTones={['terra', 'gold']}>
              <PlaceholderPhoto
                alt="Sparkling clean bathtub and tiled bathroom wall"
                label={['a bathtub,', 'actually clean']}
                tone="cream"
                ratio={[4, 5]}
              />
            </TapedPhoto>
          </Reveal>
        </div>
      </section>
      <TornEdge color="var(--paper-2)" flip />
    </>
  )
}
