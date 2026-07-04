/* Vercel serverless function — newsletter signup email delivery via Resend.
 *
 * Setup (one-time):
 *   1. Create a Resend account with youikifn151@gmail.com → https://resend.com
 *   2. Create an API key and add it in Vercel → Settings → Environment
 *      Variables as RESEND_API_KEY.
 *   3. (Later) Verify a sending domain in Resend and set RESEND_FROM,
 *      e.g. "SolBeat Cleaning <hello@solbeatcleaning.com>". Until then the
 *      default onboarding sender is used, which can only deliver to the
 *      Resend account owner's own inbox — the owner notification below
 *      works day one; the subscriber welcome email starts working once
 *      the domain is verified.
 *
 * TODO (Supabase): also persist the subscriber, e.g.
 *   await supabase.from('newsletter_subscribers').insert({ name, email })
 */

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'youikifn151@gmail.com'
const FROM = process.env.RESEND_FROM || 'SolBeat Cleaning <onboarding@resend.dev>'

async function sendEmail({ to, subject, html, replyTo }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
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
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: 'Email is not configured yet (missing RESEND_API_KEY). Please call +1 (204) 381-8505.',
    })
  }

  const { name, email } = req.body || {}
  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'A valid name and email are required.' })
  }

  try {
    // Notify Beatrice of the new subscriber — deliverable from day one.
    await sendEmail({
      to: OWNER_EMAIL,
      subject: `New newsletter subscriber: ${name}`,
      replyTo: email,
      html: `<p><strong>${esc(name)}</strong> (${esc(email)}) just joined the SolBeat list via the website.</p>`,
    })

    // Welcome email to the subscriber — best-effort until the sending
    // domain is verified in Resend (see file header).
    try {
      await sendEmail({
        to: email,
        subject: 'Welcome to the SolBeat list',
        html: `
          <p>Hi ${esc(name)},</p>
          <p>Thanks for joining the SolBeat Cleaning list — you'll get seasonal
          cleaning checklists and the occasional note from Steinbach. No spam,
          no daily emails.</p>
          <p>We don't cut corners. We clean them.</p>
          <p>— Beatrice Akinleye<br/>SolBeat Cleaning Inc. · +1 (204) 381-8505</p>`,
      })
    } catch (welcomeErr) {
      console.warn('Welcome email not delivered (domain not verified yet?):', welcomeErr.message)
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('newsletter delivery failed:', err)
    return res.status(502).json({ error: 'Could not deliver the signup email. Please try again.' })
  }
}
