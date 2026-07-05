import { lazy, Suspense, useEffect, useState } from 'react'
import { business, serviceAreas } from '../content/content.js'
import PageHero from '../components/PageHero.jsx'
import ContactForm from '../components/ContactForm.jsx'
import FAQAccordion from '../components/FAQAccordion.jsx'
import { Reveal } from '../components/motion-helpers.jsx'
import { TornEdge, Tape } from '../components/Paper.jsx'
import './contact.css'

/* Leaflet is the heaviest dependency on the site and only this page
   uses it — load it lazily so it stays out of the main bundle. The
   mounted gate also keeps it away from build-time pre-rendering
   (Leaflet needs a real browser `window`). */
const BusinessMap = lazy(() => import('../components/BusinessMap.jsx'))

function MapFallback() {
  return (
    <div className="sb-map-frame" aria-hidden="true">
      <div className="sb-map" />
    </div>
  )
}

function LazyMap() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <MapFallback />
  return (
    <Suspense fallback={<MapFallback />}>
      <BusinessMap />
    </Suspense>
  )
}

export default function Contact() {
  return (
    <>
      <PageHero
        tone="sage"
        eyebrow="Contact & booking"
        title={
          <>
            Let&rsquo;s get you a <span className="serif-i">free</span> estimate
          </>
        }
        lede="Tell us about the space, or just call. Estimates are always free and always in writing — and we answer 7 days a week, 8 AM to 6 PM."
      />

      {/* form + info card */}
      <section className="section section--tight" aria-label="Contact form and details">
        <div className="wrap contact-grid">
          <Reveal className="contact-form-col">
            <h2 className="h-lg contact-col-title">Send the details</h2>
            <ContactForm />
          </Reveal>

          <Reveal className="contact-info pcard" delay={0.1} rotate={1}>
            <Tape tone="gold" angle={-4} style={{ top: -13, left: '50%', marginLeft: -52 }} />
            <h2 className="h-lg">Or reach us directly</h2>
            <dl className="contact-facts">
              <div>
                <dt>Call or text</dt>
                <dd>
                  <a href={business.phoneHref} className="contact-phone">{business.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>{business.hours}</dd>
              </div>
              <div>
                <dt>Based at</dt>
                <dd>{business.address}</dd>
              </div>
              <div>
                <dt>Service area</dt>
                <dd>
                  <ul className="contact-areas">
                    {serviceAreas.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <p className="contact-info-note hand">Estimates are free — the coffee&rsquo;s on you.</p>
          </Reveal>
        </div>
      </section>

      {/* map */}
      <section className="section section--tight" aria-labelledby="map-heading">
        <div className="wrap">
          <Reveal as="h2" className="h-lg contact-map-title" id="map-heading">
            Where you&rsquo;ll find us
          </Reveal>
          <Reveal delay={0.1}>
            <LazyMap />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <TornEdge color="var(--paper-2)" />
      <section className="section section--deep" aria-labelledby="faq-heading">
        <div className="wrap contact-faq">
          <div className="contact-faq-head">
            <Reveal as="p" className="eyebrow" y={18}>Good questions</Reveal>
            <Reveal as="h2" className="h-xl" delay={0.06} id="faq-heading">
              Asked &amp; answered
            </Reveal>
            <Reveal as="p" className="lede" delay={0.12}>
              Everything people usually want to know before booking. Anything else —
              just ask when you call or write.
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <FAQAccordion />
          </Reveal>
        </div>
      </section>
      <TornEdge color="var(--paper-2)" flip />
    </>
  )
}
