/* ============================================================
   SolBeat Cleaning — single integration point for the backend.

   Every form on the site calls one of the three functions below,
   and nothing else in the UI knows how submissions travel. To
   change the backend, change THIS file (and the matching
   serverless functions in /api) — no component edits needed.

   Current wiring:
   - In production (Vercel), each function POSTs to a serverless
     function in /api that delivers email via Resend.
     Set RESEND_API_KEY in Vercel → Project → Settings →
     Environment Variables to activate delivery.
   - In local dev (`npm run dev`), Vite serves no /api routes, so
     submissions fall back to a simulated success after a short
     delay. Watch the browser console for the logged payload.

   TODO: replace/augment with real Supabase inserts —
   e.g. supabase.from('newsletter_subscribers').insert(...) — either
   here (client SDK) or inside the /api functions (service role).
   ============================================================ */

/**
 * Stripe "Pay Now" checkout — a Stripe Payment Link where the
 * customer enters the amount from their written estimate (CAD).
 * Created in the "solbeatcleaning" Stripe sandbox.
 *
 * TODO: before launch, swap for a live-mode Payment Link from the
 * live Stripe account (Dashboard → Payment Links → New).
 */
export const STRIPE_PAYMENT_LINK =
  'https://buy.stripe.com/test_00wcMYfij2Fo65s9aygjC00'

async function post(endpoint, payload) {
  let res
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    return devFallback(endpoint, payload, err)
  }
  if (!res.ok) {
    if (import.meta.env.DEV) return devFallback(endpoint, payload, null)
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request to ${endpoint} failed (${res.status})`)
  }
  return res.json()
}

/* Local dev has no serverless runtime — simulate success so the
   full UI flow (validation → pending → success) can be exercised. */
async function devFallback(endpoint, payload, err) {
  if (!import.meta.env.DEV) throw err || new Error('Network error')
  console.info(
    `[SolBeat dev] Simulated POST ${endpoint} — payload:`,
    payload,
    '(deployed on Vercel, this hits the real /api function)'
  )
  await new Promise((r) => setTimeout(r, 700))
  return { ok: true, simulated: true }
}

/**
 * Lead magnet: email-gated "Seasonal Deep-Clean Guide" download.
 * `consents` = { marketingConsent, privacyConsent } — privacyConsent is
 * required (the form refuses to submit without it); marketingConsent is
 * the optional opt-in that also subscribes them to the newsletter.
 * Serverless side: /api/lead-magnet.js (Resend delivery).
 * TODO: replace with real Supabase insert / storage call
 * (e.g. table `lead_magnet_signups`) when wiring Supabase.
 */
export function subscribeForLeadMagnet(email, consents = {}) {
  return post('/api/lead-magnet', { email, ...consents })
}

/**
 * Newsletter signup. Joining the list is itself the marketing consent;
 * `consents.privacyConsent` is required by the form.
 * Serverless side: /api/newsletter.js.
 * TODO: replace with real Supabase insert
 * (e.g. table `newsletter_subscribers`) when wiring Supabase.
 */
export function subscribeNewsletter(name, email, consents = {}) {
  return post('/api/newsletter', { name, email, ...consents })
}

/**
 * Contact / booking form. Serverless side: /api/contact.js.
 * `data` = { name, email, phone, serviceType, message,
 *            marketingConsent, privacyConsent }.
 * TODO: replace with real Supabase insert
 * (e.g. table `contact_requests`) when wiring Supabase.
 */
export function submitContactForm(data) {
  return post('/api/contact', data)
}
