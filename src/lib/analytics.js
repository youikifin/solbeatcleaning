/* Google Analytics 4 — loaded ONLY after the visitor accepts analytics
   in the cookie banner (see components/CookieConsent.jsx).

   The measurement ID comes from the NEXT_PUBLIC_GA_MEASUREMENT_ID
   environment variable (set in Vercel → Project → Settings →
   Environment Variables; exposed to the client via `envPrefix` in
   vite.config.js). It is baked into the bundle at build time, so a
   redeploy is needed after changing it. */
export const GA_MEASUREMENT_ID = (
  import.meta.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
).trim()

export function loadAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    console.info(
      '[SolBeat] Analytics consent granted, but NEXT_PUBLIC_GA_MEASUREMENT_ID is not set for this build — GA not loaded.'
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
