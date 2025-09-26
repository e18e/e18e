---
description: Modern alternatives to the tempy package for creating temporary files and directories
---

# Replacements for `tempy`

## Node.js (since v14.x)

Node.js has the [`fs.mkdtemp`](https://nodejs.org/api/fs.html#fsmkdtempprefix-options-callback) function for creating a unique temporary directory.

Example:

```ts
import { temporaryDirectory } from 'tempy' // [!code --]
import { mkdtemp, realpath } from 'node:fs/promises' // [!code ++]
import { join } from 'node:path' // [!code ++]
import { tmpdir } from 'node:os' // [!code ++]

const tempDir = temporaryDirectory() // [!code --]
const tempDir = await mkdtemp(join(await realpath(tmpdir()), 'foo-')) // [!code ++]
```

Directory cleanup can be done by passing `{recursive: true}` to [`fs.rm`](https://nodejs.org/api/fs.html#fsrmpath-options-callback), available in v14.14.0 and up:

```js
import { rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

// logic to create tempDir...

try {
  await writeFile(join(tempDir, 'bar.txt'), 'Hello, world!', { encoding: 'utf-8' })
  await writeFile(join(tempDir, 'baz.txt'), '...', { encoding: 'utf-8' })
}
 finally {
  await rm(tempDir, { recursive: true })
}
```

## Deno

Deno provides built-in [`Deno.makeTempDir`](https://docs.deno.com/api/deno/~/Deno.makeTempDir) and [`Deno.makeTempFile`](https://docs.deno.com/api/deno/~/Deno.makeTempFile) for creating unique temporary directories and files in the system temp directory (or a custom `dir`). You can also set `prefix` and `suffix`. Both return the full path and require `--allow-write`.

```ts
import { temporaryDirectory } from 'tempy'
 // [!code --]
const tempDir = temporaryDirectory({ prefix: 'foo-' }) // [!code --]

const tempDir = await Deno.makeTempDir({ prefix: 'foo-' }) // [!code ++]

try { // [!code ++]
  await Deno.writeTextFile(`${tempDir}/bar.txt`, 'Hello, world!') // [!code ++]
  await Deno.writeTextFile(`${tempDir}/baz.txt`, '...') // [!code ++]
}
 finally { // [!code ++]
  await Deno.remove(tempDir, { recursive: true }) // [!code ++]
} // [!code ++]
```

```ts
import { temporaryFile } from 'tempy'
 // [!code --]
const tempFile = temporaryFile({ extension: 'txt' }) // [!code --]

const tempFile = await Deno.makeTempFile({ suffix: '.txt' }) // [!code ++]

try { // [!code ++]
  await Deno.writeTextFile(tempFile, 'contents') // [!code ++]
}
 finally { // [!code ++]
  await Deno.remove(tempFile) // [!code ++]
} // [!code ++]
```

> [!NOTE]
> See also: secure tempfiles in Node.js without dependencies (Advanced Web Machinery): https://advancedweb.hu/secure-tempfiles-in-nodejs-without-dependencies/
