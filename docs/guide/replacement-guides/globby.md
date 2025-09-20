---
description: Modern alternatives to the globby package for globbing and .gitignore support
---

# Replacements for `globby`

## tinyglobby 

[`globby`](https://github.com/sindresorhus/globby) is a convenience wrapper around [`fast-glob`](https://github.com/mrmlnc/fast-glob).

If you don’t need `.gitignore` handling, prefer [`tinyglobby`](https://github.com/SuperchupuDev/tinyglobby/) - it’s smaller and faster. If you do need `.gitignore` behavior, pair `tinyglobby` with a small git-based helper. For most cases, this will likely be good enough.

```js
import {globby} from 'globby' // [!code --]
const paths = await globby(['**/*'], {gitignore: true, cwd}) // [!code --]

import { execSync } from 'node:child_process'; // [!code ++]
import { glob, escapePath } from 'tinyglobby'; // [!code ++]

async function globWithGitignore(patterns, options = {}) { // [!code ++]
  const { cwd = process.cwd(), ...restOptions } = options; // [!code ++]

  try { // [!code ++]
    const gitIgnored = execSync( // [!code ++]
      'git ls-files --others --ignored --exclude-standard --directory', // [!code ++]
      { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] } // [!code ++]
    ) // [!code ++]
    .split('\n') // [!code ++]
    .filter(Boolean) // [!code ++]
    .map(p => escapePath(p)); // [!code ++]

    return glob(patterns, { // [!code ++]
      ...restOptions, // [!code ++]
      cwd, // [!code ++]
      ignore: [...(restOptions.ignore || []), ...gitIgnored] // [!code ++]
    }); // [!code ++]
  } catch { // [!code ++]
    return glob(patterns, options); // [!code ++]
  } // [!code ++]
} // [!code ++]

const paths = await globWithGitignore(['**/*'], {cwd}) // [!code ++]
```
