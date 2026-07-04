import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE } from './motion-helpers.jsx'
import './nav.css'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/residential', label: 'Residential' },
  { to: '/commercial', label: 'Commercial' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export function LogoMark({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="24" cy="24" r="21" fill="var(--gold)" opacity="0.9" />
      <circle cx="24" cy="24" r="21" fill="none" stroke="var(--ink)" strokeWidth="2.4" strokeDasharray="3.5 5" strokeLinecap="round" />
      {/* heartbeat line — the "beat" in SolBeat */}
      <path
        d="M8 26 L17 26 L20.5 17 L26 33 L29.5 23 L32 26 L40 26"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduce = useReducedMotion()

  // close the menu whenever the route changes
  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="nav">
      <div className="wrap nav-row">
        <Link to="/" className="nav-brand" aria-label="SolBeat Cleaning Inc. — home">
          <LogoMark />
          <span className="nav-wordmark">
            SolBeat <em>Cleaning</em>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav-link">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-cta">
          <Link to="/contact" className="btn nav-estimate">
            Get a Free Estimate
          </Link>
          <button
            className="nav-burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
            <span className={`burger-lines ${open ? 'is-open' : ''}`} aria-hidden="true">
              <i /><i /><i />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="nav-mobile"
            aria-label="Main menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <ul>
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, duration: 0.35, ease: EASE }}
                >
                  <NavLink to={l.to} end={l.end} className="nav-mobile-link">
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <Link to="/contact" className="btn nav-mobile-cta">
              Get a Free Estimate
            </Link>
            <p className="nav-mobile-note hand">Open 8 AM – 6 PM, 7 days a week</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
