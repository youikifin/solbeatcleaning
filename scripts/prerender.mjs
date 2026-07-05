/* Pre-renders every route to static HTML after the client build.
 *
 * Runs as the last step of `npm run build`:
 *   1. `vite build`                    → dist/ (client assets + template)
 *   2. `vite build --ssr ...`          → dist-ssr/entry-server.js
 *   3. this script                     → dist/<route>/index.html per route,
 *      each with the route's own title/description/canonical/OG tags.
 *
 * Adding a page? Routes are derived from src/App.jsx's route table and the
 * content data — update ROUTES below if you add a static route.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { getMeta, SITE_URL } from '../src/lib/seo.js'
import { blogPosts, resources } from '../src/content/content.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const { render } = await import(
  pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
)

const ROUTES = [
  '/',
  '/about',
  '/residential',
  '/commercial',
  '/blog',
  ...blogPosts.map((p) => `/blog/${p.slug}`),
  ...resources.map((r) => `/resources/${r.slug}`),
  '/contact',
  '/pay',
  '/privacy',
  '/terms',
]

const template = readFileSync(join(root, 'dist', 'index.html'), 'utf8')

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[\\s\\S]*?(")`)
  return html.replace(re, (m, open, close) => open + esc(value) + close)
}

function buildPage(path, { title, description }) {
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`
  let html = template.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(title)}</title>`)
  html = setMeta(html, 'name', 'description', description)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'property', 'og:url', canonical)
  html = setMeta(html, 'name', 'twitter:title', title)
  html = setMeta(html, 'name', 'twitter:description', description)
  html = html.replace(
    /(<link rel="canonical" href=")[\s\S]*?(")/,
    (m, open, close) => open + canonical + close
  )
  const app = render(path)
  return html.replace('<div id="root"></div>', () => `<div id="root">${app}</div>`)
}

for (const route of ROUTES) {
  const page = buildPage(route, getMeta(route))
  const outFile =
    route === '/' ? join(root, 'dist', 'index.html') : join(root, 'dist', route.slice(1), 'index.html')
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, page)
  console.log('prerendered', route)
}

/* 404 page — served by Vercel with a real 404 status for unknown paths. */
const notFound = buildPage('/this-page-does-not-exist', {
  title: 'Page not found | SolBeat Cleaning Inc.',
  description: getMeta('/').description,
})
writeFileSync(join(root, 'dist', '404.html'), notFound)
console.log('prerendered /404.html')
