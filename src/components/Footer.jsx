import { Link } from 'react-router-dom'
import { business, serviceAreas } from '../content/content.js'
import { LogoMark } from './Nav.jsx'
import { TornEdge } from './Paper.jsx'
import './footer.css'

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
              <li><Link className="footer-link" to="/privacy">Privacy Policy</Link></li>
              <li><Link className="footer-link" to="/terms">Terms &amp; Conditions</Link></li>
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
