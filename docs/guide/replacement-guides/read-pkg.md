# Replacements for `read-pkg`

## `pkg-types`

[`pkg-types`](https://github.com/unjs/pkg-types) provides a similar API and strong types.

For example:

```ts
import { readPackage } from 'read-pkg' // [!code --]
import { readPackageJSON } from 'pkg-types' // [!code ++]

const packageJson = await readPackage() // [!code --]
const packageJson = await readPackageJSON() // [!code ++]
```

You may also specify a `cwd`:

```ts
import { readPackageJSON } from 'pkg-types'

const packageJson = await readPackageJson({cwd})
```

## Native `node:fs`

You can use `node:fs` to read a known `package.json`:

```ts
import { readPackage } from 'read-pkg' // [!code --]
import fs from 'node:fs/promises' // [!code ++]

const packageJson = await readPackageUp() // [!code --]
const packageJson = JSON.parse(await readFile('./package.json', 'utf8')); // [!code ++]
```

> [!NOTE]
> Using this approach, you will have to handle errors yourself (e.g. failure to read the file).
