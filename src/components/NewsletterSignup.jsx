import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { subscribeNewsletter } from '../lib/api.js'
import { Reveal, EASE } from './motion-helpers.jsx'
import { Tape } from './Paper.jsx'
import ConsentFields from './ConsentFields.jsx'
import './forms.css'

const EMAIL_RE = /^\S+@\S+\.\S+$/

export default function NewsletterSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const reduce = useReducedMotion()

  async function onSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (name.trim().length < 2) errs.name = 'Please tell us your name.'
    if (!EMAIL_RE.test(email)) errs.email = 'That email doesn’t look right.'
    if (!privacy)
      errs.consent = 'Please agree to the Privacy Policy and Terms & Conditions to continue.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    setStatus('sending')
    try {
      await subscribeNewsletter(name.trim(), email.trim(), { privacyConsent: privacy })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section section--tight" aria-labelledby="newsletter-heading">
      <div className="wrap">
        <Reveal className="news-card pcard">
          <Tape tone="gold" angle={-3} style={{ top: -14, left: '50%', marginLeft: -52, width: 120 }} />
          <AnimatePresence mode="wait" initial={false}>
            {status === 'done' ? (
              <motion.div
                key="done"
                className="news-done"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, rotate: -1 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                role="status"
              >
                <p className="news-done-hand hand">Thanks, {name.trim()} — welcome to the SolBeat list.</p>
                <p className="news-done-sub">
                  A seasonal checklist or a note from Steinbach, once in a while. Never spam.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}>
                <h2 id="newsletter-heading" className="h-lg">
                  Letters from a <span className="serif-i">very</span> clean desk
                </h2>
                <p className="news-lede">
                  Seasonal cleaning checklists and short, useful notes from Beatrice — a
                  couple of times a season, nothing more.
                </p>
                <form className="news-form" onSubmit={onSubmit} noValidate>
                  <div className="field">
                    <label htmlFor="nl-name">First name</label>
                    <input
                      id="nl-name"
                      type="text"
                      autoComplete="given-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={errors.name ? 'true' : undefined}
                      aria-describedby={errors.name ? 'nl-name-err' : undefined}
                    />
                    {errors.name && (
                      <p className="field-error" id="nl-name-err">{errors.name}</p>
                    )}
                  </div>
                  <div className="field">
                    <label htmlFor="nl-email">Email</label>
                    <input
                      id="nl-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={errors.email ? 'true' : undefined}
                      aria-describedby={errors.email ? 'nl-email-err' : undefined}
                    />
                    {errors.email && (
                      <p className="field-error" id="nl-email-err">{errors.email}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn--sage news-btn" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Signing you up…' : 'Join the list'}
                  </button>
                  <ConsentFields
                    idPrefix="nl"
                    marketing={null}
                    privacy={privacy}
                    onPrivacy={setPrivacy}
                    error={errors.consent}
                  />
                </form>
                {status === 'error' && (
                  <p className="form-status form-status--error" role="alert">
                    Something went wrong sending your signup — please try again, or call{' '}
                    <a href="tel:+12043818505" style={{ textDecoration: 'underline' }}>+1 (204) 381-8505</a>.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
