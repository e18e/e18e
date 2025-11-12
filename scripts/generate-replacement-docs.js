import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const BASE = 'https://raw.githubusercontent.com/es-tooling/module-replacements/refs/heads/main/'
const DEST_DIR = 'docs/docs/replacements'
const INDEX_PATH = path.join(DEST_DIR, 'index.md')

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

async function updateIndexFile(downloadedFiles) {
  try {
    const indexContent = await readFile(INDEX_PATH, 'utf-8')
    const lines = indexContent.split('\n')

    const tableStartIdx = lines.findIndex(l => l.includes('| Module | Auto-fixable |'))
    if (tableStartIdx === -1) {
      console.warn('Could not find table header in index.md')
      return
    }

    const tableRows = []
    for (let i = tableStartIdx + 2; i < lines.length; i++) {
      if (lines[i].startsWith('|')) {
        tableRows.push(lines[i])
      }
      else {
        break
      }
    }

    for (const filename of downloadedFiles) {
      if (!tableRows.some(row => row.includes(`./${filename}`))) {
        const moduleName = path.basename(filename, '.md')
        tableRows.push(`| [\`${moduleName}\`](./${filename}) | :x: |`)
      }
    }

    tableRows.sort((a, b) => {
      const aName = a.match(/`([^`]+)`/)?.[1]?.toLowerCase() || ''
      const bName = b.match(/`([^`]+)`/)?.[1]?.toLowerCase() || ''
      return aName.localeCompare(bName)
    })

    const beforeTable = lines.slice(0, tableStartIdx + 2)
    const afterTableIdx = tableStartIdx + 2 + lines.slice(tableStartIdx + 2).findIndex(l => !l.startsWith('|'))
    const afterTable = lines.slice(afterTableIdx === tableStartIdx + 1 ? lines.length : afterTableIdx)
    const newContent = [...beforeTable, ...tableRows, ...afterTable].join('\n')

    await writeFile(INDEX_PATH, newContent)
    console.log(`\n✓ Updated index.md with ${tableRows.length} entries`)
  }
  catch (error) {
    console.error(`\n✗ Failed to update index.md: ${error.message}`)
  }
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
    const downloadedFiles = []

    for (const rel of files) {
      try {
        const url = `${BASE}docs/modules/${rel}`
        const r = await fetchText(url)
        const destPath = path.join(DEST_DIR, path.basename(rel))
        await writeFile(destPath, r)
        console.log(`✓ ${path.basename(rel)}`)
        downloadedFiles.push(path.basename(rel))
        success++
      }
      catch (error) {
        console.error(`✗ Failed: ${rel} - ${error.message}`)
        failed++
      }
    }

    console.log(`\n✓ Generation complete: ${success} succeeded, ${failed} failed`)

    await updateIndexFile(downloadedFiles)
  }
  catch (error) {
    console.error(`\n✗ Fatal error: ${error.message}`)
    process.exit(1)
  }
}
main()
