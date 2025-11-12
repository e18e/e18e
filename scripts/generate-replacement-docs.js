import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const BASE = 'https://raw.githubusercontent.com/es-tooling/module-replacements/refs/heads/main/'
const DEST_DIR = 'docs/docs/replacements'

async function fetchText(u) {
  try {
    const response = await fetch(u)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    return await response.text()
  }
  catch (error) {
    throw new Error(`Failed to fetch ${u}: ${error.message}`)
  }
}

function extractModuleFilesFromReadme(md) {
  return md.split('\n').filter(l => /^\s*-\s+/.test(l)).map(l => /\[[^\]]+\]\(([^)]+\.md)\)/.exec(l)?.[1]).filter(Boolean).map(h => h.replace(/^\.\//, ''))
}

async function main() {
  try {
    console.log('Starting replacement docs generation...\n')

    await mkdir(DEST_DIR, { recursive: true })
    console.log(`Created directory: ${DEST_DIR}\n`)

    const readme = await fetchText(`${BASE}docs/modules/README.md`)
    const files = extractModuleFilesFromReadme(readme)
    console.log(`\nFound ${files.length} replacement docs to download\n`)

    let success = 0
    let failed = 0

    for (const rel of files) {
      try {
        const url = `${BASE}docs/modules/${rel}`
        const r = await fetchText(url)
        const destPath = path.join(DEST_DIR, path.basename(rel))
        await writeFile(destPath, r)
        console.log(`✓ ${path.basename(rel)}`)
        success++
      }
      catch (error) {
        console.error(`✗ Failed: ${rel} - ${error.message}`)
        failed++
      }
    }

    console.log(`\n✓ Generation complete: ${success} succeeded, ${failed} failed`)
  }
  catch (error) {
    console.error(`\n✗ Fatal error: ${error.message}`)
    process.exit(1)
  }
}
main()
