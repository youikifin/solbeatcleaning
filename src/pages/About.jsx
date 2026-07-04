import { Link } from 'react-router-dom'
import { business, founder } from '../content/content.js'
import PageHero from '../components/PageHero.jsx'
import { Reveal } from '../components/motion-helpers.jsx'
import {
  TornEdge,
  Tape,
  TapedPhoto,
  PlaceholderPhoto,
  Scribble,
} from '../components/Paper.jsx'
import './about.css'

export default function About() {
  return (
    <>
      <PageHero
        tone="gold"
        eyebrow="About SolBeat"
        title={
          <>
            One woman, one standard, <span className="serif-i">zero</span> cut corners
          </>
        }
        lede="SolBeat Cleaning Inc. is Beatrice Akinleye — her hands, her checklists, and over a decade of professional experience, working out of Steinbach, Manitoba."
      />

      {/* ---------------- story ---------------- */}
      <section className="section" aria-labelledby="story-heading">
        <div className="wrap grid-2">
          <div className="about-photo-stack">
            <Reveal rotate={-2}>
              <TapedPhoto tilt={-2.4} caption="from the QA floor to your floors" tapeTones={['gold', 'terra']}>
                <PlaceholderPhoto
                  alt="Beatrice Akinleye reviewing a cleaning checklist on a clipboard"
                  label={['Beatrice with', 'her checklist']}
                  tone="terracotta"
                  ratio={[4, 5]}
                />
              </TapedPhoto>
            </Reveal>
          </div>
          <div className="about-story">
            <Reveal as="p" className="eyebrow" y={18}>The story</Reveal>
            <Reveal as="h2" className="h-xl" delay={0.06} id="story-heading">
              A decade of quality work, brought home
            </Reveal>
            <Reveal as="p" className="about-p" delay={0.12}>
              Beatrice&rsquo;s working life has been about one thing: making sure work is
              done properly. Over more than ten years in cleaning, quality assurance, and
              operations, she inspected products, audited processes, and kept complex
              operations moving — in professional cleaning at <strong>Prima Klean</strong>,
              operations with <strong>Advantage Solutions (CDS Canada)</strong>, logistics
              at <strong>UPS</strong>, and quality control at{' '}
              <strong>Royal Mills and Foods</strong>.
            </Reveal>
            <Reveal as="p" className="about-p" delay={0.18}>
              She studied the discipline formally too, earning post-graduate certificates
              in Quality Assurance, Manufacturing Management, and Supply Chain Management
              from Conestoga College.
            </Reveal>
            <Reveal as="p" className="about-p" delay={0.24}>
              {business.founded} SolBeat exists because Beatrice believes the same rigour
              that keeps a factory line consistent belongs in the places people actually
              live and work — applied with warmth, and by someone whose name is on the
              company.
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- credentials ---------------- */}
      <TornEdge color="var(--paper-2)" />
      <section className="section section--deep" aria-labelledby="cred-heading">
        <div className="wrap">
          <Reveal as="p" className="eyebrow" y={18}>Credentials, not claims</Reveal>
          <Reveal as="h2" className="h-xl" delay={0.06} id="cred-heading">
            The paper on the wall
          </Reveal>
          <div className="cred-grid">
            {founder.credentials.map((c, i) => (
              <Reveal key={c.title} className="cred-card pcard" delay={0.08 + i * 0.08} rotate={i % 2 ? 1.2 : -1.2}>
                <Tape tone={['gold', 'sage', 'terra'][i % 3]} angle={-4} style={{ top: -13, left: '50%', marginLeft: -50 }} />
                <p className="cred-seal" aria-hidden="true">✦</p>
                <h3 className="h-md">{c.title}</h3>
                <p className="cred-detail">{c.detail}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="cred-exp" delay={0.2}>
            <h3 className="h-md cred-exp-head">Where the experience comes from</h3>
            <ul className="cred-exp-list">
              {founder.experience.map((e) => (
                <li key={e.company}>
                  <strong>{e.company}</strong>
                  <span>{e.area}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <TornEdge color="var(--paper-2)" flip />

      {/* ---------------- philosophy ---------------- */}
      <section className="section philosophy" aria-labelledby="phil-heading">
        <TornEdge color="var(--ink)" className="phil-torn-top" />
        <div className="philosophy-body">
          <div className="wrap">
            <Reveal as="p" className="eyebrow phil-eyebrow" y={18}>The philosophy</Reveal>
            <Reveal as="h2" className="h-xl phil-title" delay={0.06} id="phil-heading">
              “{business.motto}”
            </Reveal>
            <div className="phil-grid">
              <Reveal className="phil-item" delay={0.1}>
                <h3>Corners are inspection points.</h3>
                <p>
                  Work rarely fails in the middle of a surface — it fails at the edges and
                  transitions. That&rsquo;s where every SolBeat clean starts, not where it
                  gives up.
                </p>
              </Reveal>
              <Reveal className="phil-item" delay={0.18}>
                <h3>Checklists beat memory.</h3>
                <p>
                  Every job runs on a written checklist built for that space, so the tenth
                  visit is as thorough as the first. Consistency is a system, not a mood.
                </p>
              </Reveal>
              <Reveal className="phil-item" delay={0.26}>
                <h3>Mistakes get corrected, not argued.</h3>
                <p>
                  Report anything within 24 hours and it&rsquo;s fixed at no extra
                  charge — then it goes on the checklist so it never happens twice.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
        <TornEdge color="var(--ink)" flip className="phil-torn-bot" />
      </section>

      {/* ---------------- honesty block ---------------- */}
      <section className="section section--tight" aria-labelledby="honest-heading">
        <div className="wrap honest">
          <Reveal as="h2" className="h-lg honest-title" id="honest-heading">
            You won&rsquo;t find reviews here <Scribble>yet</Scribble> — on purpose.
          </Reveal>
          <Reveal as="p" className="lede honest-p" delay={0.1}>
            SolBeat is approaching its first year, and we&rsquo;d rather show up with real
            credentials than invented praise. What you get instead: a background-checked,
            trained, and insured cleaner; a written scope from your free estimate; and a
            24-hour satisfaction guarantee. The reviews will come — honestly.
          </Reveal>
          <Reveal delay={0.18}>
            <Link to="/contact" className="btn">Be one of our first stories</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
