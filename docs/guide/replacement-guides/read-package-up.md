# Replacements for `read-package-up`

## `pkg-types`

[`pkg-types`](https://github.com/unjs/pkg-types) provides a similar API and strong types.

For example:

```ts
import { readPackageUp } from 'pkg-types' // [!code --]
import { readPackage } from 'pkg-types' // [!code ++]

const packageJson = await readPackageUp() // [!code --]
const packageJson = await readPackage() // [!code ++]
```

## `empathic`

[`empathic`](https://github.com/lukeed/empathic) provides a more generic way to find files and directories upwards.

It can be combined with `node:fs` to read `package.json` files:

```ts
import { readPackageUp } from 'read-package-up' // [!code --]
import * as pkg from 'empathic' // [!code ++]

const packageJson = await readPackageUp() // [!code --]
const packageJsonPath = pkg.up() // [!code ++]
const packageJson = packageJsonPath ? await readFile(packageJsonPath, 'utf8') : undefined; // [!code ++]
```

> [!NOTE]
> This is of course a more manual way to read the `package.json` file, so one of the other options may be more attractive.
