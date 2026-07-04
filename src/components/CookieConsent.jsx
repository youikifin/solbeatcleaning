import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { loadAnalytics } from '../lib/analytics.js'
import { EASE } from './motion-helpers.jsx'
import { Tape } from './Paper.jsx'
import './cookieconsent.css'

const STORAGE_KEY = 'sb-cookie-consent' // 'accepted' | 'declined'

function getChoice() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function setChoice(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* private mode — banner will simply reappear next visit */
  }
}

/* First-visit cookie banner. Google Analytics is loaded only after the
   visitor accepts; declining sets no analytics cookies at all. The
   footer's "Cookie preferences" link reopens it via a window event. */
export default function CookieConsent() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const choice = getChoice()
    if (choice === 'accepted') loadAnalytics()
    if (!choice) {
      const t = setTimeout(() => setOpen(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    function reopen() {
      setOpen(true)
    }
    window.addEventListener('sb-cookie-preferences', reopen)
    return () => window.removeEventListener('sb-cookie-preferences', reopen)
  }, [])

  function decide(value) {
    setChoice(value)
    setOpen(false)
    if (value === 'accepted') loadAnalytics()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          className="cookie"
          role="region"
          aria-label="Cookie consent"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -0.8 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Tape tone="gold" angle={-5} style={{ top: -13, left: '50%', marginLeft: -50 }} />
          <h2 className="cookie-title hand">One small cookie?</h2>
          <p className="cookie-text">
            We&rsquo;d like to use one analytics cookie to learn which pages help people
            most. No ads, no selling data — and nothing is set unless you say yes.
            Details in the <Link to="/privacy">Privacy Policy</Link>.
          </p>
          <div className="cookie-actions">
            <button className="btn cookie-btn" onClick={() => decide('accepted')}>
              Accept analytics
            </button>
            <button className="btn btn--ghost cookie-btn" onClick={() => decide('declined')}>
              Decline
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
