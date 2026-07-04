/* Generates public/og-image.png (1200×630) for Open Graph / Twitter
 * previews, in the site's paper-collage style.
 * Run: node scripts/make-og-image.mjs
 * TODO: replace with a designed image (real photo of Beatrice at work)
 * when photography is available.
 */
import sharp from 'sharp'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', 'og-image.png')

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f6efe1"/>

  <!-- paper cutout shapes -->
  <circle cx="1020" cy="120" r="190" fill="#7d8b66" opacity="0.32"/>
  <rect x="-60" y="440" width="300" height="220" rx="24" fill="#c3922e" opacity="0.26" transform="rotate(-8 90 550)"/>
  <rect x="880" y="470" width="240" height="180" rx="18" fill="#bd5c31" opacity="0.18" transform="rotate(10 1000 560)"/>

  <!-- torn paper strip along the bottom -->
  <path d="M0,630 L0,596 L48,590 L86,599 L124,585 L171,594 L212,582 L264,597 L309,587 L353,600 L395,584 L444,595 L491,580 L539,593 L597,586 L643,598 L699,583 L746,594 L801,587 L858,599 L912,582 L973,596 L1027,585 L1086,597 L1146,584 L1200,592 L1200,630 Z" fill="#2e2418"/>

  <!-- logo: sun + beat mark -->
  <g transform="translate(96,88)">
    <circle cx="34" cy="34" r="32" fill="#c3922e"/>
    <circle cx="34" cy="34" r="32" fill="none" stroke="#2e2418" stroke-width="3.4" stroke-dasharray="5 7" stroke-linecap="round"/>
    <path d="M11 37 L24 37 L29 24 L37 47 L42 33 L45 37 L57 37" fill="none" stroke="#2e2418" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="88" y="46" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="700" fill="#2e2418">SolBeat <tspan font-style="italic" fill="#9c4a25">Cleaning</tspan> Inc.</text>
  </g>

  <!-- motto chip -->
  <g transform="translate(90,210) rotate(-1.6)">
    <rect x="0" y="0" width="1000" height="116" rx="14" fill="#2e2418"/>
    <rect x="440" y="-14" width="120" height="30" rx="4" fill="#e9d5a4" opacity="0.85" transform="rotate(-4 500 0)"/>
    <text x="48" y="74" font-family="Georgia, 'Times New Roman', serif" font-size="47" font-weight="700" fill="#c3922e">We don&#8217;t cut corners. We clean them.</text>
  </g>

  <!-- keyword line -->
  <text x="96" y="420" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-weight="600" fill="#2e2418">Cleaning services in Steinbach, Manitoba</text>
  <text x="96" y="474" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#6d5c47">Residential housekeeping &amp; commercial cleaning across the Eastman region</text>

  <!-- details -->
  <text x="96" y="546" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#9c4a25">Free estimates &#183; 7 days a week &#183; +1 (204) 381-8505</text>

  <text x="96" y="618" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="#f6efe1">solbeatcleaning.online</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)
console.log('Wrote', out)
