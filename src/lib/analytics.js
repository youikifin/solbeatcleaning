/* Google Tag Manager + Google Analytics 4 — loaded ONLY after the
   visitor accepts analytics in the cookie banner (CookieConsent.jsx),
   on every page (the loader runs app-wide via the consent component).

   Deliberate deviations from Google's stock install snippet, to keep
   the Privacy Policy's promise ("nothing is set unless you accept"):
   - GTM is injected at consent time instead of being hardcoded in
     <head>. For returning visitors who already accepted, it loads
     immediately on page load.
   - The <noscript> GTM iframe is intentionally omitted: it cannot be
     consent-gated (no JS = no consent), so including it would track
     non-consenting visitors and crawlers.

   GA4 is still loaded directly alongside GTM (it predates the GTM
   container and is verified working). TODO: once a GA4 tag with the
   same measurement ID is configured INSIDE GTM, remove loadGa4()
   below or page views will be counted twice. */

export const GTM_ID = 'GTM-MK79RMGD'

export const GA_MEASUREMENT_ID = (
  import.meta.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
).trim()

export function loadAnalytics() {
  loadGtm()
  loadGa4()
}

function loadGtm() {
  if (document.getElementById('sb-gtm')) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
  const script = document.createElement('script')
  script.id = 'sb-gtm'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)
}

function loadGa4() {
  if (!GA_MEASUREMENT_ID) {
    console.info(
      '[SolBeat] NEXT_PUBLIC_GA_MEASUREMENT_ID is not set for this build — direct GA4 not loaded.'
    )
    return
  }
  if (document.getElementById('sb-ga')) return

  const script = document.createElement('script')
  script.id = 'sb-ga'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true })
}
