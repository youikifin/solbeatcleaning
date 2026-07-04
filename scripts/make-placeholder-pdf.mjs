/* Generates the placeholder lead-magnet PDF with valid xref offsets.
 * Run once: node scripts/make-placeholder-pdf.mjs
 * TODO: replace public/downloads/solbeat-seasonal-deep-clean-guide.pdf
 * with the real designed guide (or serve it from Supabase Storage).
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', 'downloads', 'solbeat-seasonal-deep-clean-guide.pdf')

const lines = [
  'BT /F1 24 Tf 72 720 Td (SolBeat Cleaning Inc.) Tj ET',
  'BT /F1 16 Tf 72 690 Td (The Seasonal Deep-Clean Guide - PLACEHOLDER) Tj ET',
  'BT /F1 12 Tf 72 650 Td (This is a placeholder PDF. Replace it with the real guide) Tj ET',
  'BT /F1 12 Tf 72 632 Td (before launch. The real content lives in the blog post) Tj ET',
  'BT /F1 12 Tf 72 614 Td ("The Southeast Manitoba Seasonal Deep-Clean Checklist".) Tj ET',
  "BT /F1 12 Tf 72 578 Td (We don't cut corners. We clean them.) Tj ET",
  'BT /F1 12 Tf 72 560 Td (300 First St, Steinbach, MB R5G 0T6 - +1 \\(204\\) 381-8505) Tj ET',
].join('\n')

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
  `<< /Length ${lines.length} >>\nstream\n${lines}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
]

let pdf = '%PDF-1.4\n'
const offsets = [0]
objects.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf, 'latin1'))
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`
})
const xrefStart = Buffer.byteLength(pdf, 'latin1')
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (let i = 1; i <= objects.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`

mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, Buffer.from(pdf, 'latin1'))
console.log('Wrote', out)
