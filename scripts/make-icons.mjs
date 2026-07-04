/* Generates public/apple-touch-icon.png (180×180) from the brand mark.
 * iOS ignores SVG favicons, so a PNG touch icon is standard metadata.
 * Run: node scripts/make-icons.mjs
 */
import sharp from 'sharp'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', 'apple-touch-icon.png')

const svg = `
<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="#f6efe1"/>
  <circle cx="90" cy="90" r="66" fill="#c3922e"/>
  <circle cx="90" cy="90" r="66" fill="none" stroke="#2e2418" stroke-width="7" stroke-dasharray="10.5 15" stroke-linecap="round"/>
  <path d="M42 96 L69 96 L79.5 69 L96 117 L106.5 87 L114 96 L138 96"
        fill="none" stroke="#2e2418" stroke-width="10"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)
console.log('Wrote', out)
