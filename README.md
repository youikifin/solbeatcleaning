# SolBeat Cleaning Inc. — Marketing Site

> *"We don't cut corners. We clean them."*

Multi-page marketing site for SolBeat Cleaning Inc., a one-woman residential &
commercial cleaning company in Steinbach, Manitoba, founded by Beatrice Akinleye.

**Live:** https://solbeatcleaning.online · **Repo:** https://github.com/youikifin/solbeatcleaning

Built with **React + Vite + React Router**, **Framer Motion** (scroll reveals,
collage parallax, `prefers-reduced-motion` respected), and **Leaflet /
react-leaflet** (custom-skinned OpenStreetMap of 300 First St).

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
| `/blog`, `/blog/:slug` | 3 useful posts + "Cleaning for residential suites" resource cards |
| `/resources/:slug` | Coming-soon guide stubs that funnel into the newsletter |
| `/contact` | Form, phone/hours, custom map, FAQ accordion |
| `/pay` | Stripe "Pay Now" (also a section on Home) |
| `/privacy`, `/terms` | Legal pages (linked in the footer bottom bar) |

## Deployment

Pushing to `main` auto-deploys via the Vercel ↔ GitHub integration
(project `solbeatcleaning`, production domain `solbeatcleaning.online`).

### Environment variables (Vercel → Settings → Environment Variables)

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Email delivery for the three `/api` functions |
| `RESEND_FROM` | Optional sender once a domain is verified in Resend (falls back to `onboarding@resend.dev`) |
| `OWNER_EMAIL` | Notification inbox (defaults to youikifn151@gmail.com) |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Supabase project `solbeat-cleaning` (inserts still TODO, see below) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 — exposed to the bundle via `envPrefix` in `vite.config.js`, loaded **only after cookie-consent acceptance** |
| `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Reserved for server-side Stripe checkout if it replaces the Payment Link |

Local values live in `.env.local` (gitignored). Local dev has no serverless
runtime, so form submissions simulate success and log to the console.

## Where the backend hooks live

**Everything the backend touches is in `src/lib/api.js`** — the UI only calls:

- `subscribeForLeadMagnet(email, consents)`
- `subscribeNewsletter(name, email, consents)`
- `submitContactForm(data)` (includes consent flags)
- `STRIPE_PAYMENT_LINK`

Each POSTs to a Vercel serverless function (`api/newsletter.js`,
`api/lead-magnet.js`, `api/contact.js`) that validates the required
privacy consent and delivers email via Resend.

### Stripe "Pay Now"

The Pay Now button opens a **Stripe Payment Link** where the customer enters
the amount from their written estimate (CAD, min $10). It was created in the
**solbeatcleaning sandbox**, so it is **test mode** — card `4242 4242 4242 4242`.
**Before launch:** create a live-mode Payment Link and swap
`STRIPE_PAYMENT_LINK` in `src/lib/api.js`.

### Supabase (wiring TODO)

Tables `newsletter_subscribers`, `lead_magnet_signups`, and `contact_requests`
exist (RLS on, no public policies) in project `solbeat-cleaning`. Each `/api`
function carries a `TODO (Supabase)` comment marking where inserts belong.

## SEO / legal / consent

- Per-route titles & descriptions: `src/lib/seo.js` (static base in `index.html`)
- Open Graph / Twitter image: `public/og-image.png` (`scripts/make-og-image.mjs`)
- Touch icon: `public/apple-touch-icon.png` (`scripts/make-icons.mjs`)
- `public/sitemap.xml` + `public/robots.txt` — domain is DNS-verified in
  Google Search Console; submit the sitemap there
- Structured data: LocalBusiness/ProfessionalService JSON-LD in `index.html`
- GDPR: consent checkboxes on all forms (client + server validated), cookie
  banner gates GA4, Privacy/Terms pages in the footer

## Placeholders to replace before launch

- **Photos** — every image is a labelled SVG placeholder
  (`PlaceholderPhoto` in `src/components/Paper.jsx`) with real alt text.
- **Lead-magnet PDF** — `public/downloads/solbeat-seasonal-deep-clean-guide.pdf`
  (`scripts/make-placeholder-pdf.mjs`).
- **Resource guides** — `/resources/*` pages are coming-soon stubs
  (`src/pages/ResourceArticle.jsx`); content lives in `src/content/content.js`.
- **Map pin** — street-level approximation for 300 First St (`mapCenter` in
  `src/content/content.js`).
- **Stripe Payment Link** — still the sandbox link (see above).

## Content ground rules

All copy is built from the real business facts only: no invented testimonials,
reviews, star ratings, or customer counts. The FAQ on the Contact page is
verbatim as supplied. All business facts live in `src/content/content.js`.
