import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  business,
  serviceAreas,
  residentialServices,
  commercialServices,
} from '../content/content.js'
import { Reveal, Drift, Magnetic, EASE } from '../components/motion-helpers.jsx'
import {
  TornEdge,
  Tape,
  TapedPhoto,
  PlaceholderPhoto,
  Sticker,
  Scribble,
  Ticker,
} from '../components/Paper.jsx'
import PayNow from '../components/PayNow.jsx'
import LeadMagnet from '../components/LeadMagnet.jsx'
import NewsletterSignup from '../components/NewsletterSignup.jsx'
import './home.css'

const heroWords = ["We", "don't", "cut", "corners."]

export default function Home() {
  const reduce = useReducedMotion()

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <Drift className="hero-cut hero-cut--sage" from={30} to={-34}><span /></Drift>
        <Drift className="hero-cut hero-cut--gold" from={14} to={-46}><span /></Drift>
        <Drift className="hero-cut hero-cut--terra" from={40} to={-16}><span /></Drift>

        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Reveal as="p" className="eyebrow" y={16}>
              Cleaning services in Steinbach, Manitoba
            </Reveal>
            <h1 className="h-display hero-title">
              {heroWords.map((w, i) => (
                <motion.span
                  key={i}
                  className="hero-word"
                  initial={reduce ? false : { opacity: 0, y: 44, rotate: i % 2 ? 2 : -2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.12 + i * 0.09, duration: 0.7, ease: EASE }}
                >
                  {w}&nbsp;
                </motion.span>
              ))}
              <motion.span
                className="hero-chip"
                initial={reduce ? false : { opacity: 0, y: 30, rotate: -7, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, rotate: -2.5, scale: 1 }}
                transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
              >
                <Tape tone="cream" angle={-5} style={{ top: -13, left: '50%', marginLeft: -48 }} />
                We clean them.
              </motion.span>
            </h1>
            <Reveal as="p" className="lede hero-lede" delay={0.65} y={20}>
              SolBeat Cleaning is a one-woman company founded by{' '}
              <strong>Beatrice Akinleye</strong> — a decade of professional cleaning and
              quality-assurance experience, now providing housekeeping and commercial
              cleaning across Steinbach and the Eastman region.
            </Reveal>
            <Reveal className="hero-actions" delay={0.75} y={18}>
              <Magnetic>
                <Link to="/contact" className="btn">Get a Free Estimate</Link>
              </Magnetic>
              <a className="hero-call" href={business.phoneHref}>
                or call <strong>{business.phone}</strong>
              </a>
            </Reveal>
            <Reveal as="p" className="hero-hours hand" delay={0.85} y={12}>
              Open 8 AM – 6 PM · 7 days a week
            </Reveal>
          </div>

          <div className="hero-collage">
            <Drift from={16} to={-16} className="hero-collage-main">
              <Reveal rotate={reduce ? 0 : 3} delay={0.35}>
                <TapedPhoto tilt={2.2} caption="Beatrice, making a kitchen shine" tapeTones={['gold', 'sage']}>
                  <PlaceholderPhoto
                    alt="Beatrice Akinleye providing house cleaning services in a Steinbach kitchen"
                    label={['Beatrice at work', '(real photo coming soon)']}
                    tone="terracotta"
                    ratio={[4, 5]}
                  />
                </TapedPhoto>
              </Reveal>
            </Drift>
            <Drift from={34} to={-8} className="hero-collage-small">
              <Reveal rotate={reduce ? 0 : -4} delay={0.55}>
                <TapedPhoto tilt={-4} tapeTones={['terra', 'cream']}>
                  <PlaceholderPhoto
                    alt="Cleaning caddy with supplies by a sunny window"
                    label="the trusty caddy"
                    tone="sage"
                    ratio={[5, 4]}
                  />
                </TapedPhoto>
              </Reveal>
            </Drift>
            <motion.div
              className="hero-sticker"
              initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: 30 }}
              animate={{ opacity: 1, scale: 1, rotate: 9 }}
              transition={{ delay: 0.95, duration: 0.6, ease: EASE }}
            >
              <Sticker tone="terra" rotate={0}>free estimates · insured &amp; vetted</Sticker>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- service-area ticker ---------------- */}
      <Ticker items={serviceAreas} />

      {/* ---------------- intro / mission ---------------- */}
      <section className="section" aria-labelledby="intro-heading">
        <div className="wrap grid-2">
          <Reveal rotate={-1.5}>
            <TapedPhoto tilt={-2} caption="est. last year, Steinbach MB" tapeTones={['sage', 'gold']}>
              <PlaceholderPhoto
                alt="Portrait of Beatrice Akinleye, founder of SolBeat Cleaning, a Steinbach cleaning services company"
                label={['Beatrice Akinleye', 'Founder & CEO']}
                tone="gold"
                ratio={[4, 3]}
              />
            </TapedPhoto>
          </Reveal>
          <div className="intro-copy">
            <Reveal as="p" className="eyebrow eyebrow--sage" y={18}>A note from the founder</Reveal>
            <Reveal as="h2" className="h-xl" delay={0.08} id="intro-heading">
              Hi, I&rsquo;m Beatrice. I clean like an <Scribble>inspector</Scribble> — because I was one.
            </Reveal>
            <Reveal as="p" className="lede" delay={0.16}>
              Before SolBeat, I spent over ten years in cleaning, quality assurance, and
              operations — auditing work, building checklists, and learning exactly where
              corners get cut. {business.founded} Every job gets the checklist, the
              detail work, and a simple promise: if anything isn&rsquo;t right, tell me
              within 24 hours and I&rsquo;ll fix it at no charge.
            </Reveal>
            <Reveal delay={0.24}>
              <Link to="/about" className="btn btn--ghost">Read my story</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- residential vs commercial paths ---------------- */}
      <TornEdge color="var(--paper-2)" />
      <section className="section section--deep" aria-labelledby="paths-heading">
        <div className="wrap">
          <Reveal as="p" className="eyebrow" y={18}>What we clean</Reveal>
          <Reveal as="h2" className="h-xl paths-title" delay={0.08} id="paths-heading">
            Cleaning services for Steinbach homes and businesses
          </Reveal>
          <div className="paths">
            <PathCard
              to="/residential"
              tone="terracotta"
              tilt={-1}
              title="Residential"
              hand="homes, condos & farmhouses"
              alt="A tidy, sunlit living room after a residential house cleaning in Steinbach"
              photoLabel="a freshly cleaned living room"
              items={residentialServices.slice(0, 4).map((s) => s.name)}
              more={residentialServices.length - 4}
            />
            <PathCard
              to="/commercial"
              tone="sage"
              tilt={1.2}
              title="Commercial"
              hand="offices, shops & common areas"
              alt="A clean office lobby after commercial cleaning in southern Manitoba"
              photoLabel="a spotless front lobby"
              items={commercialServices.slice(0, 4).map((s) => s.name)}
              more={commercialServices.length - 4}
            />
          </div>
        </div>
      </section>
      <TornEdge color="var(--paper-2)" flip />

      {/* ---------------- pay now ---------------- */}
      <PayNow />

      {/* ---------------- lead magnet + newsletter ---------------- */}
      <LeadMagnet />
      <NewsletterSignup />

      {/* ---------------- local-SEO prose ---------------- */}
      <TornEdge color="var(--paper-2)" />
      <section className="section section--deep seo-prose" aria-labelledby="local-heading">
        <div className="wrap">
          <h2 className="h-lg" id="local-heading">
            Cleaning services in Steinbach and the Eastman region
          </h2>
          <div className="seo-prose-cols">
            <div>
              <p>
                When you search for cleaning services in Steinbach, what you usually want
                is simple: someone local, insured, and careful, who treats your home or
                business like their own. SolBeat Cleaning Inc. is exactly that — a
                one-woman cleaning company based at 300 First St in Steinbach, Manitoba,
                founded by Beatrice Akinleye and serving the whole Eastman region:
                Mitchell, Blumenort, La Broquerie, Kleefeld, Giroux, Ste. Anne, New
                Bothwell, Grunthal, Niverville, and Landmark.
              </p>
              <h3>Housekeeping for every kind of home</h3>
              <p>
                Whether it&rsquo;s a one-time &ldquo;please clean my house before the
                guests arrive&rdquo; visit, a move-out clean that protects your deposit,
                or weekly and bi-weekly housekeeping that keeps life manageable, every
                home runs on a written checklist — detail dusting, kitchen appliances,
                bathrooms, baseboards, and the corners other services skip. Explore our{' '}
                <Link to="/residential">residential cleaning services</Link>.
              </p>
            </div>
            <div>
              <h3>Commercial cleaning for southern Manitoba businesses</h3>
              <p>
                Offices, storefronts, and common areas across Steinbach and southern
                Manitoba get the same discipline: a documented scope, a recurring
                schedule that stays out of your way, and a cleaner with a decade of
                quality-assurance experience behind her. See our{' '}
                <Link to="/commercial">commercial cleaning services</Link>.
              </p>
              <h3>It starts with a free estimate</h3>
              <p>
                Every job begins with a free written estimate — no obligation, no
                pressure. Call{' '}
                <a href={business.phoneHref}>{business.phone}</a> any day between 8 AM
                and 6 PM, or <Link to="/contact">request your free estimate online</Link>.
                And if anything isn&rsquo;t right after your clean, report it within 24
                hours and it&rsquo;s corrected at no extra charge.
              </p>
            </div>
          </div>
        </div>
      </section>
      <TornEdge color="var(--paper-2)" flip />
    </>
  )
}

function PathCard({ to, tone, tilt, title, hand, alt, photoLabel, items, more }) {
  return (
    <Reveal className="path-card pcard" rotate={tilt}>
      <Tape tone={tone === 'sage' ? 'sage' : 'terra'} angle={-4} style={{ top: -13, left: '50%', marginLeft: -52 }} />
      <div className="path-photo">
        <PlaceholderPhoto alt={alt} label={photoLabel} tone={tone} ratio={[16, 9]} />
      </div>
      <p className="path-hand hand">{hand}</p>
      <h3 className="h-lg">{title}</h3>
      <ul className="path-list">
        {items.map((name) => (
          <li key={name}>{name}</li>
        ))}
        <li className="path-more">+ {more} more services</li>
      </ul>
      <Link className="btn btn--ghost path-btn" to={to}>
        See {title.toLowerCase()} services
      </Link>
    </Reveal>
  )
}
