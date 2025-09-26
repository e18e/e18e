import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { createInterface } from 'node:readline'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const repoRoot = join(__dirname, '..')
const guidesDir = join(repoRoot, 'docs/docs/replacements')
const indexPath = join(repoRoot, 'docs/docs/replacements/index.md')

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

function kebabCase(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function createReplacementGuide(moduleName, hasNative) {
  const kebabName = kebabCase(moduleName)
  const filePath = join(guidesDir, `${kebabName}.md`)

  if (existsSync(filePath)) {
    console.log(`⚠️  File already exists: ${filePath}`)
    return false
  }

  const descriptionType = hasNative ? 'Native Node.js alternatives' : 'Modern alternatives'
  const content = `---
description: ${descriptionType} to the ${moduleName} package for {TODO}
---

# Replacements for \`${moduleName}\`

## Example replacement

Describe the replacement here.
`

  writeFileSync(filePath, content)
  console.log(`✅ Created replacement guide: ${filePath}`)
  return true
}

function updateIndex(moduleName) {
  const kebabName = kebabCase(moduleName)
  const indexContent = readFileSync(indexPath, 'utf8')
  const lines = indexContent.split('\n')
  const tableStart = lines.findIndex(line => line.includes('| Module | Auto-fixable |'))
  const tableEnd = lines.findIndex((line, index) =>
    index > tableStart && (line.trim() === '' || !line.includes('|')),
  )

  if (tableStart === -1) {
    console.error('❌ Could not find the module table in replacements.md')
    return false
  }

  const tableEntries = lines.slice(tableStart + 2, tableEnd === -1 ? lines.length : tableEnd)
  const newEntry = `| [\`${moduleName}\`](./replacement-guides/${kebabName}.md) | :x: |`

  tableEntries.push(newEntry)
  tableEntries.sort()

  const beforeTable = lines.slice(0, tableStart + 2)
  const afterTable = tableEnd === -1 ? [] : lines.slice(tableEnd)

  const newContent = [
    ...beforeTable,
    ...tableEntries,
    ...afterTable,
  ].join('\n')

  writeFileSync(indexPath, newContent)
  console.log(`✅ Updated replacements index`)
  return true
}

async function main() {
  try {
    console.log('🔧 Add Replacement Guide\n')

    const moduleName = await question('Name of the module being replaced: ')
    if (!moduleName.trim()) {
      console.log('❌ Module name is required')
      process.exit(1)
    }

    const hasNativeAnswer = await question('Does it have native replacements? (y/n): ')
    const hasNative = hasNativeAnswer.toLowerCase().trim() === 'y'
    const created = createReplacementGuide(moduleName.trim(), hasNative)

    if (created) {
      updateIndex(moduleName.trim())
    }

    console.log('\n🎉 Done!')
  }
  catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
  finally {
    rl.close()
  }
}

main()
