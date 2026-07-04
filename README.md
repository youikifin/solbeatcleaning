# SolBeat Cleaning Inc. — Marketing Site

> *"We don't cut corners. We clean them."*

Multi-page marketing site for SolBeat Cleaning Inc., a one-woman residential &
commercial cleaning company in Steinbach, Manitoba, founded by Beatrice Akinleye.

Built with **React + Vite + React Router**, **Framer Motion** (scroll reveals,
collage parallax, micro-interactions, `prefers-reduced-motion` respected), and
**Leaflet / react-leaflet** (custom-skinned OpenStreetMap of 300 First St).

## Run locally

```bash
npm install
npm run dev        # → http://localhost:5174
```

No Node on your PATH? Double-click `dev.cmd` — it borrows the portable Node
runtime from the neighbouring `stony-brook-eco-builders` project.

`npm run build` produces the production bundle in `dist/`.

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero collage, service-area ticker, Residential/Commercial paths, Pay Now, lead magnet, newsletter |
| `/about` | Beatrice's real story, credentials, philosophy |
| `/residential` | 9 residential services + how it works |
| `/commercial` | 5 commercial services + operations background |
| `/blog`, `/blog/:slug` | 3 genuinely useful posts in Beatrice's voice |
| `/contact` | Form, phone/hours, custom map, FAQ accordion |
| `/pay` | Stripe "Pay Now" (also a section on Home) |

## Where the backend hooks live

**Everything the backend touches is in `src/lib/api.js`** — the UI components
only ever call these three functions plus one constant:

- `subscribeForLeadMagnet(email)`
- `subscribeNewsletter(name, email)`
- `submitContactForm(data)`
- `STRIPE_PAYMENT_LINK`

Each function POSTs to a matching **Vercel serverless function** in `/api`
(`api/newsletter.js`, `api/lead-magnet.js`, `api/contact.js`) that delivers
email via **Resend**. In local dev (`npm run dev`) there is no serverless
runtime, so submissions fall back to a simulated success — the full UI flow
still works, and the payload is logged to the browser console.

### Activate email delivery (Resend)

1. Create a Resend account with **youikifn151@gmail.com** → https://resend.com
2. Create an API key, then in Vercel → Project → Settings → Environment
   Variables set `RESEND_API_KEY`.
3. Owner notifications (new subscriber / new lead / contact enquiry) are sent
   to `youikifn151@gmail.com` and work immediately using Resend's
   `onboarding@resend.dev` sender.
4. To email *subscribers* directly (welcome email, guide delivery), verify a
   sending domain in Resend and set `RESEND_FROM`, e.g.
   `SolBeat Cleaning <hello@solbeatcleaning.com>`.
   Optional: `OWNER_EMAIL` overrides the notification inbox.

### Stripe "Pay Now"

The Pay Now button opens a **Stripe Payment Link** (Stripe-hosted checkout)
where the customer types the amount from their written estimate (CAD, min $10).
It was created in the **solbeatcleaning sandbox** account, so it is **test
mode** — use card `4242 4242 4242 4242` to try it.

**Before launch:** create the same Payment Link in live mode (Stripe Dashboard
→ Payment Links) and swap `STRIPE_PAYMENT_LINK` in `src/lib/api.js`.

### Supabase (to be wired via your course)

Each of the three `/api` functions and `src/lib/api.js` carries a
`TODO (Supabase)` comment marking exactly where inserts belong
(`newsletter_subscribers`, `lead_magnet_signups`, `contact_requests`).

## Placeholders to replace before launch

- **Photos** — every image is a clearly labelled SVG placeholder
  (`PlaceholderPhoto` in `src/components/Paper.jsx`) with real alt text
  describing the photo that belongs there. Swap in real photography.
- **Lead-magnet PDF** — `public/downloads/solbeat-seasonal-deep-clean-guide.pdf`
  is a generated placeholder (`scripts/make-placeholder-pdf.mjs`). Replace with
  the designed guide.
- **Map pin** — OSM has no house-number entry for 300 First St, so the pin sits
  on the central First Street block (see `mapCenter` in
  `src/content/content.js`); nudge if needed.

## Content ground rules

All copy is built from the real business facts only: no invented testimonials,
reviews, star ratings, or customer counts. The FAQ answers on the Contact page
are used verbatim as supplied. All business facts live in
`src/content/content.js`.
