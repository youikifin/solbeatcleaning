/* Google Analytics — loaded ONLY after the visitor accepts analytics
   in the cookie banner (see components/CookieConsent.jsx).

   TODO: replace with the real GA4 measurement ID from
   Google Analytics → Admin → Data streams (looks like G-XXXXXXXXXX). */
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'

export function loadAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.info(
      '[SolBeat] Analytics consent granted, but no GA measurement ID is configured yet (src/lib/analytics.js).'
    )
    return
  }
  if (document.getElementById('sb-ga')) return

  const script = document.createElement('script')
  script.id = 'sb-ga'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true })
}
