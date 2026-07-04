/* Vercel serverless function — contact / booking form delivery via Resend.
 * Sends the enquiry to Beatrice's inbox with reply-to set to the customer.
 * See api/newsletter.js for Resend setup.
 *
 * TODO (Supabase): persist the enquiry, e.g.
 *   await supabase.from('contact_requests').insert({ ...fields })
 */

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'youikifn151@gmail.com'
const FROM = process.env.RESEND_FROM || 'SolBeat Cleaning <onboarding@resend.dev>'
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

  const { name, email, phone, serviceType, message, marketingConsent, privacyConsent } =
    req.body || {}
  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email) || !message) {
    return res.status(400).json({ error: 'Name, a valid email, and a message are required.' })
  }
  if (privacyConsent !== true) {
    return res.status(400).json({ error: 'Please agree to the Privacy Policy and Terms & Conditions.' })
  }

  try {
    // TODO (Supabase): record both consent flags with the row.
    await sendEmail({
      to: OWNER_EMAIL,
      subject: `Estimate request (${esc(serviceType || 'General')}) — ${esc(name)}`,
      replyTo: email,
      html: `
        <h2>New enquiry from solbeatcleaning.vercel.app</h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone || '—')}</p>
        <p><strong>Service type:</strong> ${esc(serviceType || '—')}</p>
        <p><strong>Message:</strong></p>
        <p>${esc(message).replace(/\n/g, '<br/>')}</p>
        <p><strong>Marketing consent:</strong> ${marketingConsent ? 'YES — may be emailed promotions/newsletter' : 'no'}<br/>
        <strong>Privacy Policy &amp; Terms agreed:</strong> yes</p>`,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('contact delivery failed:', err)
    return res.status(502).json({ error: 'Could not send your message. Please call +1 (204) 381-8505.' })
  }
}
