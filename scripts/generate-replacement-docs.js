import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const BASE = 'https://raw.githubusercontent.com/outslept/module-replacements/refs/heads/transport-docs/'
const DEST_DIR = 'docs/docs/replacements'
const ETAG_CACHE = 'node_modules/etag/etags.json'

const fetchText = async u => (await fetch(u)).text()

function extractModuleFilesFromReadme(md) {
  return md.split('\n').filter(l => /^\s*-\s+/.test(l)).map(l => /\[[^\]]+\]\(([^)]+\.md)\)/.exec(l)?.[1]).filter(Boolean).map(h => h.replace(/^\.\//, ''))
}

async function loadEtags() {
  try {
    return JSON.parse(await readFile(ETAG_CACHE, 'utf8'))
  }
  catch { return {} }
}
async function saveEtags(m) {
  await mkdir(path.dirname(ETAG_CACHE), { recursive: true })
  await writeFile(ETAG_CACHE, JSON.stringify(m))
}

async function fetchWithEtag(url, etag) {
  const r = await fetch(url, { headers: etag ? { 'If-None-Match': etag } : undefined })
  if (r.status === 304)
    return { status: 304, etag }
  return { status: 200, etag: r.headers.get('etag'), text: await r.text() }
}

async function main() {
  const etags = await loadEtags()
  await mkdir(DEST_DIR, { recursive: true })
  const readme = await fetchText(`${BASE}docs/modules/README.md`)
  const files = extractModuleFilesFromReadme(readme)
  for (const rel of files) {
    const url = `${BASE}docs/modules/${rel}`
    const r = await fetchWithEtag(url, etags[url])
    if (r.status === 304)
      continue
    await writeFile(path.join(DEST_DIR, path.basename(rel)), r.text)
    if (r.etag)
      etags[url] = r.etag
  }
  await saveEtags(etags)
}
main()
