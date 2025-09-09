# Replacements for `mkdirp` / `make-dir`

# Alternatives

## Node.js (since v10.12.0)

Node.js v10.12.0 and up supports the `recursive` option in the `fs.mkdir` function, which allows parent directories to be created automatically:

```js
import {mkdir} from 'node:fs/promises';
import {mkdirSync} from 'node:fs';

await mkdir('some/nested/path', {recursive: true});
mkdirSync('some/nested/path', {recursive: true});
```

From `mkdirp` (async):

```js
import { mkdirp } from 'mkdirp' // [!code --]
import { mkdir } from 'node:fs/promises' // [!code ++]

await mkdirp('/tmp/foo/bar/baz') // [!code --]
await mkdir('/tmp/foo/bar/baz', { recursive: true }) // [!code ++]
```

From `mkdirp` (sync):

```js
import { mkdirp } from 'mkdirp' // [!code --]
import { mkdirSync } from 'node:fs' // [!code ++]

mkdirp.sync('/tmp/foo/bar/baz') // [!code --]
mkdirSync('/tmp/foo/bar/baz', { recursive: true }) // [!code ++]
```

From `make-dir` (async):

```js
import { makeDirectory } from 'make-dir' // [!code --]
import { mkdir } from 'node:fs/promises' // [!code ++]

await makeDirectory('unicorn/rainbow/cake') // [!code --]
await mkdir('unicorn/rainbow/cake', { recursive: true }) // [!code ++]
```

From `make-dir` (sync):

```js
import { makeDirectorySync } from 'make-dir' // [!code --]
import { mkdirSync } from 'node:fs' // [!code ++]

makeDirectorySync('unicorn/rainbow/cake') // [!code --]
mkdirSync('unicorn/rainbow/cake', { recursive: true }) // [!code ++]
```