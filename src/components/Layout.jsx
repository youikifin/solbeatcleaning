import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import CookieConsent from './CookieConsent.jsx'
import { applyMeta } from '../lib/seo.js'
import { trackPageView } from '../lib/analytics.js'

export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const firstRender = useRef(true)

  useEffect(() => {
    applyMeta(pathname)
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo(0, 0)
    // hand keyboard/screen-reader focus to the new page content
    mainRef.current?.focus({ preventScroll: true })
    // SPA navigation = a new page view for the (consent-gated) Meta Pixel
    trackPageView()
  }, [pathname])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" ref={mainRef} tabIndex={-1} style={{ outline: 'none' }}>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </>
  )
}
