import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const README_URL = 'https://raw.githubusercontent.com/outslept/module-replacements/refs/heads/transport-docs/docs/modules/README.md';
const FILE_BASE  = 'https://raw.githubusercontent.com/outslept/module-replacements/refs/heads/transport-docs/docs/modules/';
const DEST_DIR   = 'docs/docs/replacements';

const LF = s => s.replace(/\r\n/g, '\n');

async function fetchText(url) {
  console.log(`[sync] fetch start url=${url}`);
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Fetch ${r.status}: ${url}`);
  const text = LF(await r.text());
  console.log(`[sync] fetch ok url=${url} bytes=${text.length}`);
  return text;
}

function extractModuleFilesFromReadme(md) {
  console.log('[sync] extract files from README');
  const SECTION_START_RE = /^##\s+List of modules\b/;
  const SECTION_END_RE   = /^##\s+/;
  const BULLET_RE        = /^\s*-\s+/;
  const MD_LINK_RE       = /\[[^\]]+\]\((?<href>[^)]+\.md)\)/;

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
    if (/^https?:\/\//.test(href)) continue;
    href = href.replace(/^\.\//, '');
    files.push(href);
  }
  console.log(`[sync] README files count=${files.length}`);
  files.forEach((f, i) => console.log(`[sync] README file[${i + 1}]=${f}`));
  return files;
}

function unwrapCommentedFrontmatterWithFlag(md) {
  const lines = LF(md).split('\n');
  let unwrapped = false;
  if (lines.length >= 5 && lines[0].trim() === '<!--' && lines[4].trim() === '-->') {
    lines.splice(4, 1);
    lines.splice(0, 1);
    unwrapped = true;
  }
  const out = lines.join('\n');
  return { text: out, unwrapped };
}

function stripOuterBlankLines(lines) {
  const out = [...lines];
  while (out.length && out[0].trim() === '') out.shift();
  while (out.length && out[out.length - 1].trim() === '') out.pop();
  return out;
}

function isShellPromptBlock(lines) {
  return lines.some(raw => {
    const l = raw.trimStart();
    return /^[-+]\s*\$\s+\S/.test(l) || /^\$\s+\S/.test(l);
  });
}

function stripCodeAnnotations(text) {
  return text
    .replace(/\s*\/\/\s*\[!code\s*(?:--|\+\+)\]\s*$/gm, '')
    .replace(/\s*#\s*\[!code\s*(?:--|\+\+)\]\s*$/gm, '');
}

function isJsonLike(text, lines) {
  const t = text.trim();
  if (!t) return false;
  if (/^[\[{]/.test(t)) {
    try { JSON.parse(stripCodeAnnotations(t)); return true; } catch {}
  }
  const propRe = /^\s*"[^"]+"\s*:/;
  if (lines.some(l => propRe.test(l))) return true;
  return false;
}

function annotateSuffix(lang, mark) {
  return lang === 'bash' ? ` # [!code ${mark}]` : ` // [!code ${mark}]`;
}

// preserve indentation when removing leading +/-
// cases:
// "-  X" → remove only "-"  → slice(1)
// "- X"  → remove "- "      → slice(2)
// "-X"   → remove "-"       → slice(1)
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
    if (/^-\s*\$\s+/.test(l)) {
      out.push(l.replace(/^-\s*\$\s+/, '') + annotateSuffix('bash', '--'));
    } else if (/^\+\s*\$\s+/.test(l)) {
      out.push(l.replace(/^\+\s*\$\s+/, '') + annotateSuffix('bash', '++'));
    } else if (/^-\s+/.test(l)) {
      out.push(dropMarkerKeepIndent(l) + annotateSuffix('bash', '--'));
    } else if (/^\+\s+/.test(l)) {
      out.push(dropMarkerKeepIndent(l) + annotateSuffix('bash', '++'));
    } else if (/^\$\s+/.test(l)) {
      out.push(l.replace(/^\$\s+/, ''));
    } else {
      out.push(l);
    }
  }
  return out;
}

function needsEslintSkipTS(originalLines) {
  const diffs = originalLines
    .filter(l => l && (l[0] === '-' || l[0] === '+'))
    .map(dropMarkerKeepIndent)
    .map(s => s.trim());
  const closersOnly = /^\s*[)\]}]+[,;)]*\s*$/;
  const openersOnly = /^\s*[\[{(]+[,;)]?\s*$/;
  return diffs.some(s => closersOnly.test(s) || openersOnly.test(s));
}

function transformDiffFencesOnly(md, fileCtx = '') {
  let idx = 0;
  const fenceRE = /```([^\n]*)\n([\s\S]*?)```/g;
  return md.replace(fenceRE, (m, info, bodyRaw) => {
    idx++;
    const infoStr = String(info || '').trim().toLowerCase();
    const firstTok = infoStr.split(/\s+/)[0] || '';
    if (firstTok !== 'diff') return m;

    let lines = stripOuterBlankLines(LF(bodyRaw).split('\n'));
    const shellPrompt = isShellPromptBlock(lines);

    if (shellPrompt) {
      console.log(`[sync] fence-diff file=${fileCtx} idx=${idx} shell=1 action=convert-shell`);
      const converted = stripOuterBlankLines(convertShellDiff(lines)).join('\n');
      return '```bash\n' + converted + '\n```';
    }

    const forDetect = lines.map(l => (l[0] === '-' || l[0] === '+') ? dropMarkerKeepIndent(l) : l);
    const jsonLike = isJsonLike(forDetect.join('\n'), forDetect);
    const lang = jsonLike ? 'json' : 'ts';

    console.log(`[sync] fence-diff file=${fileCtx} idx=${idx} shell=0 lang=${lang} action=annotate`);
    const converted = lines.map(l => {
      if (l[0] === '-') return `${dropMarkerKeepIndent(l)}${annotateSuffix(lang, '--')}`;
      if (l[0] === '+') return `${dropMarkerKeepIndent(l)}${annotateSuffix(lang, '++')}`;
      return l;
    }).join('\n');

    const prefix = lang === 'ts' && needsEslintSkipTS(lines) ? '<!-- eslint-skip -->\n' : '';
    return `${prefix}\`\`\`${lang}\n${converted}\n\`\`\``;
  });
}

async function main() {
  console.log('[sync] start');
  console.log(`[sync] index url=${README_URL}`);
  const readme = await fetchText(README_URL);
  const files = extractModuleFilesFromReadme(readme);

  console.log(`[sync] ensure dest dir=${DEST_DIR}`);
  await mkdir(DEST_DIR, { recursive: true });

  let count = 0;
  for (const rel of files) {
    const url = FILE_BASE + rel;
    const dest = path.join(DEST_DIR, path.basename(rel));
    console.log(`[sync] file start rel=${rel} url=${url} dest=${dest}`);
    const raw = await fetchText(url);
    const { text, unwrapped } = unwrapCommentedFrontmatterWithFlag(raw);
    console.log(`[sync] frontmatter unwrapped=${unwrapped ? 1 : 0} rel=${rel}`);
    const out = transformDiffFencesOnly(text, rel);
    await writeFile(dest, out);
    console.log(`[sync] file wrote dest=${dest} bytes=${out.length}`);
    count++;
  }

  console.log(`[sync] done files=${count}`);
}

main().catch(err => { console.error(err); process.exit(1); });
