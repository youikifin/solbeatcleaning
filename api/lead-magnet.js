/* Vercel serverless function — "Seasonal Deep-Clean Guide" lead magnet.
 * Delivers via Resend: notifies the owner, and (best-effort) emails the
 * download link to the subscriber. See api/newsletter.js for Resend setup.
 *
 * TODO (Supabase): persist the lead, e.g.
 *   await supabase.from('lead_magnet_signups').insert({ email })
 * and optionally serve the PDF from Supabase Storage instead of /public.
 */

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'youikifn151@gmail.com'
const FROM = process.env.RESEND_FROM || 'SolBeat Cleaning <onboarding@resend.dev>'
const GUIDE_URL =
  'https://solbeatcleaning.vercel.app/downloads/solbeat-seasonal-deep-clean-guide.pdf'
// Strip whitespace/invisible characters (e.g. a pasted BOM) — they make
// the Authorization header invalid with a confusing ByteString error.
const RESEND_KEY = (process.env.RESEND_API_KEY || '').replace(/[^\x21-\x7E]/g, '')

async function sendEmail({ to, subject, html, replyTo }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, html, reply_to: replyTo }),
  })
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`)
  return res.json()
}

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!RESEND_KEY) {
    return res.status(500).json({
      error: 'Email is not configured yet (missing RESEND_API_KEY). Please call +1 (204) 381-8505.',
    })
  }

  const { email, marketingConsent, privacyConsent } = req.body || {}
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }
  if (privacyConsent !== true) {
    return res.status(400).json({ error: 'Please agree to the Privacy Policy and Terms & Conditions.' })
  }

  try {
    // Marketing consent is optional; if given, this signup also joins the
    // newsletter list. TODO (Supabase): record both consent flags with the row.
    await sendEmail({
      to: OWNER_EMAIL,
      subject: 'New Seasonal Deep-Clean Guide download',
      replyTo: email,
      html: `
        <p><strong>${esc(email)}</strong> downloaded the Seasonal Deep-Clean Guide from the website.</p>
        <p>Marketing consent: <strong>${marketingConsent ? 'YES — also subscribe them to the newsletter' : 'no'}</strong><br/>
        Privacy Policy &amp; Terms agreed: yes</p>`,
    })

    try {
      await sendEmail({
        to: email,
        subject: 'Your Seasonal Deep-Clean Guide',
        html: `
          <p>Hi,</p>
          <p>Here is your copy of the SolBeat Seasonal Deep-Clean Guide:</p>
          <p><a href="${GUIDE_URL}">Download the guide (PDF)</a></p>
          <p>We don't cut corners. We clean them.</p>
          <p>— Beatrice Akinleye<br/>SolBeat Cleaning Inc. · +1 (204) 381-8505</p>`,
      })
    } catch (guideErr) {
      console.warn('Guide email not delivered (domain not verified yet?):', guideErr.message)
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('lead-magnet delivery failed:', err)
    return res.status(502).json({ error: 'Could not process the signup. Please try again.' })
  }
}
