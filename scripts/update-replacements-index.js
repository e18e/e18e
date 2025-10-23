import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DIR = path.join('docs', 'docs', 'replacements')
const INDEX = path.join(DIR, 'index.md')

function sortRows(rows) {
  return rows.sort((a, b) =>
    a.display.localeCompare(b.display, undefined, { sensitivity: 'base', numeric: true })
  )
}

async function readTable() {
  const text = await readFile(INDEX, 'utf8')
  const lines = text.split('\n')
  const headerIdx = lines.findIndex(l => l.trim() === '| Module | Auto-fixable |')
  if (headerIdx < 0 || lines[headerIdx + 1]?.trim() !== '| -- | -- |') throw new Error('Table not found')
  const rowsStart = headerIdx + 2
  let rowsEnd = rowsStart
  while (rowsEnd < lines.length && lines[rowsEnd].trim().startsWith('|')) rowsEnd++
  return { lines, rowsStart, rowsEnd }
}

function parseRows(lines, rowsStart, rowsEnd) {
  const out = []
  for (let i = rowsStart; i < rowsEnd; i++) {
    const cells = lines[i].split('|').map(s => s.trim())
    if (cells.length < 3) continue
    const cell = cells[1]
    const lp = cell.lastIndexOf('(')
    const rp = cell.lastIndexOf(')')
    if (lp === -1 || rp === -1) continue
    const href = cell.slice(lp + 1, rp).trim()
    const file = href.startsWith('./') ? href.slice(2) : href
    const lb = cell.indexOf('[')
    const rb = cell.indexOf(']', lb + 1)
    let display = lb !== -1 && rb !== -1 ? cell.slice(lb + 1, rb) : path.basename(file, '.md')
    display = display.replace(/`/g, '')
    const status = cells[2]
    out.push({ file, display, status })
  }
  return out
}

async function listFiles() {
  const entries = await readdir(DIR, { withFileTypes: true })
  return entries
    .filter(e => e.isFile())
    .map(e => e.name)
    .filter(n => n.toLowerCase().endsWith('.md'))
    .filter(n => n.toLowerCase() !== 'index.md' && n.toLowerCase() !== 'readme.md')
}

function mergeRows(existing, files) {
  const set = new Set(files)
  const kept = existing.filter(r => set.has(r.file))
  const present = new Set(kept.map(r => r.file))
  const additions = files
    .filter(f => !present.has(f))
    .map(f => ({ file: f, display: path.basename(f, '.md'), status: ':x:' }))
  return [...kept, ...additions]
}

function formatRows(rows) {
  return rows.map(m => `| [\`${m.display}\`](./${m.file}) | ${m.status} |`)
}

async function writeTable(lines, rowsStart, rowsEnd, rowLines) {
  const newText = [
    ...lines.slice(0, rowsStart),
    ...rowLines,
    ...lines.slice(rowsEnd),
  ].join('\n')
  await writeFile(INDEX, newText)
}

async function updateIndex() {
  const { lines, rowsStart, rowsEnd } = await readTable()
  const existing = parseRows(lines, rowsStart, rowsEnd)
  const files = await listFiles()
  const merged = mergeRows(existing, files)
  const rows = formatRows(sortRows(merged))
  await writeTable(lines, rowsStart, rowsEnd, rows)
  console.log('Index list updated.')
  console.log('Review and update the Auto‑fixable column for modules with available automated migrations.')
}

updateIndex()
