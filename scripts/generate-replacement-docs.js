import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { parseArgs } from 'node:util'

const DEST_DIR = 'docs/docs/replacements'
const INDEX_PATH = path.join(DEST_DIR, 'index.md')
const TABLE_HEADER_REGEX = /\|\s+Module\s+\|\s+Auto-fixable\s+\|/

const { values } = parseArgs({
  options: {
    path: { type: 'string' },
  },
})

const sourceDir = values.path

if (!sourceDir) {
  console.error('Usage: node scripts/generate-replacement-docs.js --path <path-to-module-replacements>')
  process.exit(1)
}

const modulesDir = path.join(sourceDir, 'docs', 'modules')

async function findNewModuleFiles() {
  const [sourceFiles, destFiles] = await Promise.all([
    readdir(modulesDir),
    readdir(DEST_DIR).catch(() => []),
  ])
  const existing = new Set(destFiles)
  return sourceFiles.filter(f => f.endsWith('.md') && f !== 'README.md' && !existing.has(f))
}

async function updateIndexFile(downloadedFiles) {
  try {
    const indexContent = await readFile(INDEX_PATH, 'utf-8')
    const lines = indexContent.split('\n')

    const tableStartIdx = lines.findIndex(l => TABLE_HEADER_REGEX.test(l))
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

    const files = await findNewModuleFiles()
    console.log(`Found ${files.length} new replacement docs to copy\n`)

    let success = 0
    let failed = 0
    const downloadedFiles = []

    for (const filename of files) {
      try {
        await copyFile(path.join(modulesDir, filename), path.join(DEST_DIR, filename))
        console.log(`✓ ${filename}`)
        downloadedFiles.push(filename)
        success++
      }
      catch (error) {
        console.error(`✗ Failed: ${filename} - ${error.message}`)
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
