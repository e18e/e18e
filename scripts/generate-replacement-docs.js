import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const RAW_BASE = 'https://raw.githubusercontent.com/outslept/module-replacements/refs/heads/transport-docs/docs/modules';
const README_URL = `${RAW_BASE}/README.md`;
const DEST_DIR = 'content/replacements';

function normalizeEOL(s) {
  return s.replace(/\r\n/g, '\n');
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed ${res.status} ${res.statusText}: ${url}`);
  return normalizeEOL(await res.text());
}

function extractModuleFilesFromReadme(md) {
  const lines = normalizeEOL(md).split('\n');
  const set = new Set();
  let inSection = false;
  for (const line of lines) {
    if (/^##\s+List of modules\b/.test(line)) { inSection = true; continue; }
    if (inSection && /^##\s+/.test(line)) break;
    if (!inSection) continue;
    if (!/^\s*-\s+/.test(line)) continue;
    const m = line.match(/\]\((\.\/[^)]+\.md)\)/);
    if (m) set.add(m[1].replace('./', ''));
  }
  return Array.from(set);
}

function unwrapCommentedFrontmatter(md) {
  const lines = normalizeEOL(md).split('\n');
  if (
    lines.length >= 5 &&
    lines[0].trim() === '<!--' &&
    lines[1].trim() === '---' &&
    /^description:/.test(lines[2].trim()) &&
    lines[3].trim() === '---' &&
    lines[4].trim() === '-->'
  ) {
    const fm = `---\n${lines[2].trim()}\n---\n`;
    const rest = lines.slice(5).join('\n');
    return fm + (rest.startsWith('\n') ? rest : `\n${rest}`);
  }
  return md;
}

function transformDiffFences(md) {
  const fenceRE = /```([^\n]*)\n([\s\S]*?)```/g;
  return md.replace(fenceRE, (m, info, body) => {
    if (!/^diff\b/i.test(String(info).trim())) return m;
    const out = normalizeEOL(body).split('\n').map(line => {
      if (line.startsWith('- ')) return `${line.slice(2)} // [!code --]`;
      if (line.startsWith('+ ')) return `${line.slice(2)} // [!code ++]`;
      return line;
    }).join('\n');
    return '```ts\n' + out + '\n```';
  });
}

async function ensureDir(p) {
  if (!existsSync(p)) await mkdir(p, { recursive: true });
}

async function main() {
  console.log(`Reading index: ${README_URL}`);
  const readme = await fetchText(README_URL);
  const files = extractModuleFilesFromReadme(readme);
  if (!files.length) {
    console.error('No module files found in README.');
    process.exit(1);
  }
  console.log(`Found ${files.length} file(s).`);

  await ensureDir(DEST_DIR);

  for (const rel of files) {
    const url = `${RAW_BASE}/${rel}`;
    console.log(`Fetching: ${url}`);
    const raw = await fetchText(url);
    let out = unwrapCommentedFrontmatter(raw);
    out = transformDiffFences(out);
    const dest = path.join(DEST_DIR, path.basename(rel));
    await writeFile(dest, out);
    console.log(`Wrote: ${dest}`);
  }

  console.log('Done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
