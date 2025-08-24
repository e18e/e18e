# Replacements for `pkg-dir`

## `empathic`

[`empathic`](https://github.com/lukeed/empathic) provides a more generic way to find files and directories upwards.

The main difference is that `empathic` is _synchronous_, so you should no longer `await` the result.

Example:

```ts
import { packageDirectory } from 'pkg-dir' // [!code --]
import * as pkg from 'empathic/package' // [!code ++]
import { dirname } from 'node:fs' // [!code ++]

const dir = await packageDirectory(); // [!code --]
const dir = dirname(pkg.up()); // [!code ++]
```
