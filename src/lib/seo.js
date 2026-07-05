/* Per-route page titles and meta descriptions. The static tags in
   index.html cover crawlers that don't run JS (and social previews);
   this map keeps the title/description accurate as visitors navigate. */
import { blogPosts, resources } from '../content/content.js'

export const SITE_URL = 'https://solbeatcleaning.online'

/* Descriptions are kept between 120 and 160 characters — the range
   search engines display without truncating. */
const DEFAULT = {
  title: 'Cleaning Services in Steinbach, MB | SolBeat Cleaning Inc.',
  description:
    'Cleaning services in Steinbach & the Eastman region — residential housekeeping and commercial cleaning, insured, 7 days a week. Free estimates.',
}

const ROUTES = {
  '/': DEFAULT,
  '/about': {
    title: 'About Beatrice Akinleye | Cleaning Services in Steinbach | SolBeat Cleaning',
    description:
      'Meet Beatrice Akinleye, founder of SolBeat Cleaning — a decade of cleaning and quality-assurance experience behind Steinbach’s most careful cleaning service.',
  },
  '/residential': {
    title: 'House Cleaning in Steinbach, MB — Residential Services | SolBeat Cleaning',
    description:
      'Need a "clean my house" service in Steinbach? Move-in/out cleans, spring cleaning, and recurring housekeeping across the Eastman region. Free estimates.',
  },
  '/commercial': {
    title: 'Commercial Cleaning in Steinbach & Southern Manitoba | SolBeat Cleaning',
    description:
      'Commercial cleaning in Steinbach & southern Manitoba: common areas, recurring contracts, pipeline cleaning, junk removal. Scoped in writing, insured.',
  },
  '/blog': {
    title: 'Cleaning Guides & Checklists | SolBeat Cleaning, Steinbach MB',
    description:
      'Practical cleaning guides from a Steinbach professional: seasonal deep-clean checklists, move-out cleaning, and housekeeping know-how for the Eastman region.',
  },
  '/contact': {
    title: 'Free Estimate — Cleaning Services in Steinbach | SolBeat Cleaning',
    description:
      'Book cleaning services in Steinbach: free written estimates, 7 days a week, 8 AM–6 PM. Serving Mitchell, Blumenort, Niverville, and the wider Eastman region.',
  },
  '/pay': {
    title: 'Pay Your Invoice | SolBeat Cleaning, Steinbach MB',
    description:
      'Pay for your SolBeat clean securely online through Stripe, or by cash, credit/debit, or e-transfer. Payment is due after your service.',
  },
  '/privacy': {
    title: 'Privacy Policy | SolBeat Cleaning Inc.',
    description:
      'How SolBeat Cleaning collects, stores, and protects your information — and how to access, correct, or delete it.',
  },
  '/terms': {
    title: 'Terms & Conditions | SolBeat Cleaning Inc.',
    description:
      'The plain-language terms for using solbeatcleaning.online and booking SolBeat Cleaning services in Steinbach, Manitoba.',
  },
}

export function getMeta(pathname) {
  if (ROUTES[pathname]) return ROUTES[pathname]

  const post = blogPosts.find((p) => pathname === `/blog/${p.slug}`)
  if (post) {
    return {
      title: `${post.title} | SolBeat Cleaning, Steinbach MB`,
      description: post.excerpt,
    }
  }

  const resource = resources.find((r) => pathname === `/resources/${r.slug}`)
  if (resource) {
    return {
      title: `${resource.title} | SolBeat Cleaning`,
      description: resource.blurb,
    }
  }

  return DEFAULT
}

/* Called from Layout on every route change. */
export function applyMeta(pathname) {
  const { title, description } = getMeta(pathname)
  document.title = title
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', description)
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute('href', `${SITE_URL}${pathname === '/' ? '/' : pathname}`)
}
