import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const BASE = 'https://raw.githubusercontent.com/outslept/module-replacements/refs/heads/transport-docs/'
const DEST_DIR = 'docs/docs/replacements'

const LF = s => s.replaceAll('\r\n', '\n')

async function fetchText(url) {
  const r = await fetch(url)
  if (!r.ok)
    throw new Error(`Fetch ${r.status}: ${url}`)
  return LF(await r.text())
}

function extractModuleFilesFromReadme(md) {
  const BULLET_RE = /^\s*-\s+/
  const MD_LINK_RE = /\[[^\]]+\]\((?<href>[^)]+\.md)\)/
  const lines = LF(md).split('\n')
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

function stripOuterBlankLines(lines) {
  const out = [...lines]
  while (out.length && out[0].trim() === '') out.shift()
  while (out.length && out[out.length - 1].trim() === '') out.pop()
  return out
}

function isShellPromptBlock(lines) {
  return lines.some((raw) => {
    const l = raw.trimStart()
    return /^[-+]\s*\$\s+\S/.test(l) || /^\$\s+\S/.test(l)
  })
}

function stripCodeAnnotations(text) {
  return text
    .replaceAll(/\s*\/\/\s*\[!code\s*(?:--|\+\+)\]\s*$/gm, '')
    .replaceAll(/\s*#\s*\[!code\s*(?:--|\+\+)\]\s*$/gm, '')
}

function isJsonLike(text, lines) {
  const t = text.trim()
  if (!t)
    return false
  if (/^[[{]/.test(t)) {
    try {
      JSON.parse(stripCodeAnnotations(t))
      return true
    }
    catch {}
  }
  const propRe = /^\s*"[^"]+"\s*:/
  return lines.some(l => propRe.test(l))
}

function annotateSuffix(lang, mark) {
  return lang === 'bash' ? ` # [!code ${mark}]` : ` // [!code ${mark}]`
}

function dropMarkerKeepIndent(line) {
  if (!line)
    return line
  const c0 = line[0]
  if (c0 !== '-' && c0 !== '+')
    return line
  const c1 = line[1] ?? ''
  const c2 = line[2] ?? ''
  if (c1 === ' ')
    return c2 === ' ' ? line.slice(1) : line.slice(2)
  if (c1 === '\t')
    return line.slice(1)
  return line.slice(1)
}

function convertShellDiff(lines) {
  const out = []
  for (const raw of lines) {
    const l = raw.replace(/^\s+/, '')
    if (/^-\s*\$\s+/.test(l))
      out.push(l.replace(/^-+\s*\$\s+/, '') + annotateSuffix('bash', '--'))
    else if (/^\+\s*\$\s+/.test(l))
      out.push(l.replace(/^\++\s*\$\s+/, '') + annotateSuffix('bash', '++'))
    else if (/^-\s+/.test(l))
      out.push(dropMarkerKeepIndent(l) + annotateSuffix('bash', '--'))
    else if (/^\+\s+/.test(l))
      out.push(dropMarkerKeepIndent(l) + annotateSuffix('bash', '++'))
    else if (/^\$\s+/.test(l))
      out.push(l.replace(/^\$\s+/, ''))
    else out.push(l)
  }
  return out
}

function transformDiffFencesOnly(md) {
  const fenceRE = /```([^\n]*)\n([\s\S]*?)```/g
  return md.replace(fenceRE, (m, info, bodyRaw) => {
    const infoStr = String(info || '').trim().toLowerCase()
    const firstTok = infoStr.split(/\s+/)[0] || ''
    if (firstTok !== 'diff')
      return m
    const lines = stripOuterBlankLines(LF(bodyRaw).split('\n'))
    if (isShellPromptBlock(lines)) {
      const converted = stripOuterBlankLines(convertShellDiff(lines)).join('\n')
      return `\`\`\`bash\n${converted}\n\`\`\``
    }
    const forDetect = lines.map(l =>
      l[0] === '-' || l[0] === '+' ? dropMarkerKeepIndent(l) : l,
    )
    const lang = isJsonLike(forDetect.join('\n'), forDetect) ? 'json' : 'ts'
    const converted = lines
      .map((l) => {
        if (l[0] === '-')
          return `${dropMarkerKeepIndent(l)}${annotateSuffix(lang, '--')}`
        if (l[0] === '+')
          return `${dropMarkerKeepIndent(l)}${annotateSuffix(lang, '++')}`
        return l
      })
      .join('\n')
    return `\`\`\`${lang}\n${converted}\n\`\`\``
  })
}

function ensureBlankLineAfterFrontmatter(md) {
  return md.replace(/^(---\r?\n[\s\S]*?\r?\n---)(?:\r?\n)*/, '$1\n\n')
}

async function main() {
  const readme = await fetchText(`${BASE}docs/modules/README.md`)
  const files = extractModuleFilesFromReadme(readme)
  await mkdir(DEST_DIR, { recursive: true })
  for (const rel of files) {
    const raw = await fetchText(`${BASE}docs/modules/${rel}`)
    const normalized = ensureBlankLineAfterFrontmatter(raw)
    const out = transformDiffFencesOnly(normalized)
    await writeFile(path.join(DEST_DIR, path.basename(rel)), out)
  }
}

main().catch(() => process.exit(1))
