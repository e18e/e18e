import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://raw.githubusercontent.com/outslept/module-replacements/refs/heads/transport-docs/';
const DEST_DIR = 'docs/docs/replacements';

const LF = s => s.replaceAll('\r\n', '\n');

async function fetchText(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Fetch ${r.status}: ${url}`);
  return LF(await r.text());
}

function extractModuleFilesFromReadme(md) {
  const SECTION_START_RE = /^##\s+List of modules\b/;
  const SECTION_END_RE = /^##\s+/;
  const BULLET_RE = /^\s*-\s+/;
  const MD_LINK_RE = /\[[^\]]+\]\((?<href>[^)]+\.md)\)/;

  const lines = LF(md).split('\n');
  const files = [];
  let inSection = false;

  for (const line of lines) {
    if (!inSection) {
      if (SECTION_START_RE.test(line)) inSection = true;
      continue;
    }
    if (SECTION_END_RE.test(line)) break;
    if (!BULLET_RE.test(line)) continue;
    const m = MD_LINK_RE.exec(line);
    if (!m) continue;
    let href = m.groups?.href ?? '';
    files.push(href.replace(/^\.\//, ''));
  }
  return files;
}

function detectFrontmatterKind(md) {
  const lines = LF(md).split('\n');
  if (lines.length >= 5 && lines[0].trim() === '<!--' && lines[1].trim() === '---' && lines[3].trim() === '---' && lines[4].trim() === '-->') {
    return 'commented';
  }
  if (LF(md).startsWith('---\n') && LF(md).indexOf('\n---\n', 4) !== -1) return 'yaml';
  return 'none';
}

function unwrapCommentedFrontmatter(md) {
  const lines = LF(md).split('\n');
  if (lines.length >= 5 && lines[0].trim() === '<!--' && lines[4].trim() === '-->') {
    lines.splice(4, 1);
    lines.splice(0, 1);
    return lines.join('\n');
  }
  return md;
}

const stripOuterBlankLines = lines => {
  const out = [...lines];
  while (out.length && out[0].trim() === '') out.shift();
  while (out.length && out[out.length - 1].trim() === '') out.pop();
  return out;
};

const isShellPromptBlock = lines =>
  lines.some(raw => {
    const l = raw.trimStart();
    return /^[-+]\s*\$\s+\S/.test(l) || /^\$\s+\S/.test(l);
  });

function stripCodeAnnotations(text) {
  return text
    .replaceAll(/\s*\/\/\s*\[!code\s*(?:--|\+\+)\]\s*$/gm, '')
    .replaceAll(/\s*#\s*\[!code\s*(?:--|\+\+)\]\s*$/gm, '');
}

function isJsonLike(text, lines) {
  const t = text.trim();
  if (!t) return false;
  if (/^[\[{]/.test(t)) {
    try { JSON.parse(stripCodeAnnotations(t)); return true; } catch {}
  }
  const propRe = /^\s*"[^"]+"\s*:/;
  return lines.some(l => propRe.test(l));
}

const annotateSuffix = (lang, mark) => (lang === 'bash' ? ` # [!code ${mark}]` : ` // [!code ${mark}]`);

function dropMarkerKeepIndent(line) {
  if (!line || (line[0] !== '-' && line[0] !== '+')) return line;
  const a = line[1] || '';
  const b = line[2] || '';
  if (a === ' ' && b === ' ') return line.slice(1);
  if (a === ' ') return line.slice(2);
  return line.slice(1);
}

function convertShellDiff(lines) {
  const out = [];
  for (const raw of lines) {
    const l = raw.replace(/^\s+/, '');
    if (/^-\s*\$\s+/.test(l)) out.push(l.replace(/^-\s*\$\s+/, '') + annotateSuffix('bash', '--'));
    else if (/^\+\s*\$\s+/.test(l)) out.push(l.replace(/^\+\s*\$\s+/, '') + annotateSuffix('bash', '++'));
    else if (/^-\s+/.test(l)) out.push(dropMarkerKeepIndent(l) + annotateSuffix('bash', '--'));
    else if (/^\+\s+/.test(l)) out.push(dropMarkerKeepIndent(l) + annotateSuffix('bash', '++'));
    else if (/^\$\s+/.test(l)) out.push(l.replace(/^\$\s+/, ''));
    else out.push(l);
  }
  return out;
}

function transformDiffFencesOnly(md) {
  const fenceRE = /```([^\n]*)\n([\s\S]*?)```/g;
  return md.replace(fenceRE, (m, info, bodyRaw) => {
    const infoStr = String(info || '').trim().toLowerCase();
    const firstTok = infoStr.split(/\s+/)[0] || '';
    if (firstTok !== 'diff') return m;

    let lines = stripOuterBlankLines(LF(bodyRaw).split('\n'));
    if (isShellPromptBlock(lines)) {
      const converted = stripOuterBlankLines(convertShellDiff(lines)).join('\n');
      return '```bash\n' + converted + '\n```';
    }

    const forDetect = lines.map(l => (l[0] === '-' || l[0] === '+') ? dropMarkerKeepIndent(l) : l);
    const lang = isJsonLike(forDetect.join('\n'), forDetect) ? 'json' : 'ts';

    const converted = lines.map(l => {
      if (l[0] === '-') return `${dropMarkerKeepIndent(l)}${annotateSuffix(lang, '--')}`;
      if (l[0] === '+') return `${dropMarkerKeepIndent(l)}${annotateSuffix(lang, '++')}`;
      return l;
    }).join('\n');

    return `\`\`\`${lang}\n${converted}\n\`\`\``;
  });
}

async function main() {
  const readme = await fetchText(BASE + 'docs/modules/README.md');
  const files = extractModuleFilesFromReadme(readme);

  await mkdir(DEST_DIR, { recursive: true });

  for (const rel of files) {
    const raw = await fetchText(BASE + 'docs/modules/' + rel);
    const kind = detectFrontmatterKind(raw);
    const out =
      kind === 'none'
        ? raw
        : transformDiffFencesOnly(kind === 'commented' ? unwrapCommentedFrontmatter(raw) : raw);
    await writeFile(path.join(DEST_DIR, path.basename(rel)), out);
  }
}

main().catch(() => process.exit(1));
