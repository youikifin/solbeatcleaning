import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { subscribeForLeadMagnet } from '../lib/api.js'
import { leadMagnet } from '../content/content.js'
import { Reveal, EASE } from './motion-helpers.jsx'
import { Tape, Sticker } from './Paper.jsx'
import './forms.css'

const EMAIL_RE = /^\S+@\S+\.\S+$/

export default function LeadMagnet() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const reduce = useReducedMotion()

  async function onSubmit(e) {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setError('Please enter a valid email so we know where to send it.')
      return
    }
    setError('')
    setStatus('sending')
    try {
      await subscribeForLeadMagnet(email.trim())
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section section--tight" aria-labelledby="leadmagnet-heading">
      <div className="wrap">
        <Reveal className="lm pcard" rotate={reduce ? 0 : -0.6}>
          <Tape tone="terra" angle={-40} style={{ top: -13, left: -20 }} />
          <Tape tone="sage" angle={35} style={{ bottom: -12, right: -18 }} />
          <div className="lm-grid">
            <div className="lm-booklet" aria-hidden="true">
              <div className="lm-booklet-page">
                <span className="lm-booklet-season">SPRING · SUMMER · FALL · WINTER</span>
                <strong>The Seasonal Deep-Clean Guide</strong>
                <em>by Beatrice Akinleye · SolBeat Cleaning</em>
                <span className="lm-booklet-check">
                  ✓ window tracks&ensp;✓ furnace filters<br />
                  ✓ salt haze&ensp;✓ oven, before December
                </span>
              </div>
              <Sticker tone="gold" rotate={10} className="lm-sticker">free printable PDF</Sticker>
            </div>

            <div className="lm-copy">
              <p className="eyebrow">Free download</p>
              <h2 id="leadmagnet-heading" className="h-lg">{leadMagnet.title}</h2>
              <p className="lm-lede">{leadMagnet.blurb}</p>

              <AnimatePresence mode="wait" initial={false}>
                {status === 'done' ? (
                  <motion.div
                    key="done"
                    role="status"
                    className="lm-done"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <p className="hand">It&rsquo;s yours — happy cleaning!</p>
                    <a
                      className="btn"
                      href={leadMagnet.fileUrl}
                      download={leadMagnet.fileName}
                    >
                      Download the guide (PDF)
                    </a>
                    <p className="lm-done-note">
                      We&rsquo;ve also emailed a copy to <strong>{email.trim()}</strong>.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="lm-form"
                    onSubmit={onSubmit}
                    noValidate
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  >
                    <div className="field lm-field">
                      <label htmlFor="lm-email">Email address</label>
                      <input
                        id="lm-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={error ? 'true' : undefined}
                        aria-describedby={error ? 'lm-email-err' : undefined}
                      />
                      {error && (
                        <p className="field-error" id="lm-email-err">{error}</p>
                      )}
                    </div>
                    <button type="submit" className="btn" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Send me the guide'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              {status === 'error' && (
                <p className="form-status form-status--error" role="alert">
                  That didn&rsquo;t go through — please try again in a moment.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
