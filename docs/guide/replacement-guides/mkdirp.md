---
description: Modern alternatives to the mkdirp and make-dir packages for recursively creating directories in Node.js
---

# Replacements for `mkdirp` / `make-dir`

# Alternatives

## Node.js (since v10.12.0)

Node.js v10.12.0 and up supports the `recursive` option in the [`fs.mkdir`](https://nodejs.org/api/fs.html#fsmkdirpath-options-callback) function, which allows parent directories to be created automatically.

From [`mkdirp`](https://github.com/isaacs/node-mkdirp):

```js
import { mkdirp } from 'mkdirp' // [!code --]
import { mkdir, mkdirSync } from 'node:fs' // [!code ++]
import { mkdir as mkdirAsync } from 'node:fs/promises' // [!code ++]

// Async
await mkdirp('/tmp/foo/bar/baz') // [!code --]
await mkdirAsync('/tmp/foo/bar/baz', { recursive: true }) // [!code ++]

// Sync
mkdirp.sync('/tmp/foo/bar/baz') // [!code --]
mkdirSync('/tmp/foo/bar/baz', { recursive: true }) // [!code ++]
```

From [`make-dir`](https://github.com/sindresorhus/make-dir):

```js
import { makeDirectory, makeDirectorySync } from 'make-dir' // [!code --]
import { mkdir, mkdirSync } from 'node:fs' // [!code ++]
import { mkdir as mkdirAsync } from 'node:fs/promises' // [!code ++]

// Async
await makeDirectory('unicorn/rainbow/cake') // [!code --]
await mkdirAsync('unicorn/rainbow/cake', { recursive: true }) // [!code ++]

// Sync
makeDirectorySync('unicorn/rainbow/cake') // [!code --]
mkdirSync('unicorn/rainbow/cake', { recursive: true }) // [!code ++]
```
