# Replacements for `find-pkg`

## `empathic`

[`empathic`](https://github.com/lukeed/empathic) provides a more generic way to find files and directories upwards.

The main difference is that `empathic` is _synchronous_, so you should no longer `await` the result.

Example:

```ts
import findPkg from 'find-pkg' // [!code --]
import * as pkg from 'empathic/package' // [!code ++]

await findPkg(path) // [!code --]
pkg.up(path) // [!code ++]
```
