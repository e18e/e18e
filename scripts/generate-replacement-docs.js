import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const BASE = 'https://raw.githubusercontent.com/outslept/module-replacements/refs/heads/transport-docs/'
const DEST_DIR = 'docs/docs/replacements'

async function fetchText(url) {
  const r = await fetch(url)
  if (!r.ok)
    throw new Error(`Fetch ${r.status}: ${url}`)
  return r.text()
}

function extractModuleFilesFromReadme(md) {
  const BULLET_RE = /^\s*-\s+/
  const MD_LINK_RE = /\[[^\]]+\]\((?<href>[^)]+\.md)\)/
  const lines = md.split('\n')
  const files = []
  for (const line of lines) {
    if (!BULLET_RE.test(line))
      continue
    const m = MD_LINK_RE.exec(line)
    if (!m)
      continue
    const href = m.groups?.href ?? ''
    files.push(href.replace(/^\.\//, ''))
  }
  return files
}

async function main() {
  const readme = await fetchText(`${BASE}docs/modules/README.md`)
  const files = extractModuleFilesFromReadme(readme)
  await mkdir(DEST_DIR, { recursive: true })
  for (const rel of files) {
    const content = await fetchText(`${BASE}docs/modules/${rel}`)
    await writeFile(path.join(DEST_DIR, path.basename(rel)), content)
  }
}

main()
