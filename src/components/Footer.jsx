import { Link } from 'react-router-dom'
import { business, serviceAreas, socialLinks } from '../content/content.js'
import { LogoMark } from './Nav.jsx'
import { TornEdge } from './Paper.jsx'
import './footer.css'

/* Brand glyphs (24×24). Only platforms with a URL in content.js render. */
const SOCIAL_ICONS = {
  facebook: {
    label: 'Facebook',
    path: 'M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6C16.4 2.5 15.5 2.4 14.6 2.4c-2 0-3.4 1.2-3.4 3.5v2.6H8.5V12h2.7v8h3.3v-8h2.4l.4-3.5H14z',
  },
  instagram: {
    label: 'Instagram',
    path: 'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.1.4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.1.4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.4-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.1A6.7 6.7 0 1012 18.7 6.7 6.7 0 0012 5.3zm0 11a4.3 4.3 0 110-8.6 4.3 4.3 0 010 8.6zm6.9-11.3a1.6 1.6 0 11-3.1 0 1.6 1.6 0 013.1 0z',
  },
  x: {
    label: 'X',
    path: 'M17.5 3h3l-6.6 7.5L21.7 21h-5.8l-4.5-5.9L6.2 21H3.2l7-8L2.6 3h6l4 5.3L17.5 3zm-1 16h1.7L7.6 4.7H5.8L16.5 19z',
  },
  youtube: {
    label: 'YouTube',
    path: 'M22 8.2a2.6 2.6 0 00-1.8-1.8C18.6 6 12 6 12 6s-6.6 0-8.2.4A2.6 2.6 0 002 8.2 27 27 0 002 12a27 27 0 00.4 3.8 2.6 2.6 0 001.8 1.8C5.4 18 12 18 12 18s6.6 0 8.2-.4a2.6 2.6 0 001.8-1.8A27 27 0 0022 12a27 27 0 00-.4-3.8zM10 15V9l5.2 3-5.2 3z',
  },
  linkedin: {
    label: 'LinkedIn',
    path: 'M6.9 8.8v11.3H3.2V8.8h3.7zM7.1 5.3a2.1 2.1 0 11-4.3 0 2.1 2.1 0 014.3 0zM20.8 20.1h-3.7v-5.5c0-1.3 0-3-1.9-3-1.8 0-2.1 1.4-2.1 2.9v5.6H9.4V8.8H13v1.5h.1c.5-1 1.7-1.9 3.4-1.9 3.7 0 4.3 2.4 4.3 5.5v6.2z',
  },
}

function FooterSocial() {
  const active = socialLinks.filter((s) => s.url && SOCIAL_ICONS[s.platform])
  if (active.length === 0) return null
  return (
    <ul className="footer-social" aria-label="Follow SolBeat Cleaning">
      {active.map(({ platform, url }) => {
        const icon = SOCIAL_ICONS[platform]
        return (
          <li key={platform}>
            <a
              className="footer-social-link"
              href={url}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={icon.label}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <path d={icon.path} fill="currentColor" />
              </svg>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <TornEdge color="var(--ink)" />
      <div className="footer-body">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <LogoMark size={40} />
              <span>SolBeat <em>Cleaning</em> Inc.</span>
            </div>
            <p className="footer-motto hand">“{business.motto}”</p>
            <p className="footer-founded">{business.founded}</p>
            <FooterSocial />
          </div>

          <div>
            <h2 className="footer-head">Visit or call</h2>
            <address className="footer-address">
              <p>{business.address}</p>
              <p>
                <a href={business.phoneHref} className="footer-link">
                  {business.phone}
                </a>
              </p>
              <p>{business.hours}</p>
              <p className="footer-free">Free estimates, always.</p>
            </address>
          </div>

          <div>
            <h2 className="footer-head">Explore</h2>
            <ul className="footer-nav">
              <li><Link className="footer-link" to="/about">About Beatrice</Link></li>
              <li><Link className="footer-link" to="/residential">Residential cleaning</Link></li>
              <li><Link className="footer-link" to="/commercial">Commercial cleaning</Link></li>
              <li><Link className="footer-link" to="/blog">Blog</Link></li>
              <li><Link className="footer-link" to="/contact">Get a free estimate</Link></li>
              <li><Link className="footer-link" to="/pay">Pay an invoice</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer-head">Where we clean</h2>
            <p className="footer-areas">{serviceAreas.join(' · ')}</p>
            <p className="footer-areas-note">
              Somewhere nearby but not on the list? <Link to="/contact" className="footer-link">Ask — we may reach you.</Link>
            </p>
          </div>
        </div>

        <div className="wrap footer-bottom">
          <p>© {new Date().getFullYear()} SolBeat Cleaning Inc. · Steinbach, Manitoba</p>
          <nav className="footer-legal" aria-label="Legal">
            <Link className="footer-link" to="/privacy">Privacy Policy</Link>
            <Link className="footer-link" to="/terms">Terms &amp; Conditions</Link>
            <button
              className="footer-link footer-cookie-btn"
              onClick={() => window.dispatchEvent(new Event('sb-cookie-preferences'))}
            >
              Cookie preferences
            </button>
          </nav>
          <p>Founded &amp; operated by Beatrice Akinleye</p>
        </div>
      </div>
    </footer>
  )
}
