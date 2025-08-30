# Replacements for `rimraf`

## Node.js

If you are using [`rimraf`](https://github.com/isaacs/rimraf) to remove files and directories, modern Node.js provides native alternatives. Since Node v14.14.0, [`fs.rm`](https://nodejs.org/api/fs.html#fspromisesrmpath-options) supports recursive deletion and works as a direct replacement.

```js
import { rm } from 'node:fs/promises'; // [!code ++]
import rimraf from 'rimraf';           // [!code --]

await rimraf('./dist');                // [!code --]
await rm('./dist', { recursive: true, force: true }); // [!code ++]
```

## Node.js (older versions)

If you need to support Node 12, you can use [`fs.rmdir`](https://nodejs.org/api/fs.html#fsrmdirpath-options-callback) with the recursive option. This option has been available since Node v12.10, but will print a deprecation warning in Node v14 and newer.

```js
import { rmdir } from 'node:fs/promises';
import rimraf from 'rimraf';           // [!code --]

await rimraf('./dist');                // [!code --]
await rmdir('./dist', { recursive: true }); // [!code ++]
```

## CLI usage

To replace `rimraf` inside npm scripts, you can run Node directly in eval mode:

```sh
node -e "require('fs').rmSync('./dist', { recursive: true, force: true, maxRetries: process.platform === 'win32' ? 10 : 0 })"
```

---

## `premove`

For cases where you cannot rely on Node being available, use [`premove`](https://github.com/lukeed/premove). It includes a CLI and works on Node v8 and newer.

```sh
premove ./dist
```
