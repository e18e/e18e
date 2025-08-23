# Replacements for `find-cache-directory`

## `empathic`

[`empathic`](https://github.com/lukeed/empathic) provides a more generic way to find files and directories upwards.

Example:

```ts
import findCacheDirectory from 'find-cache-directory' // [!code --]
import * as pkg from 'empathic' // [!code ++]

findCacheDirectory({ name: 'foo' }) // [!code --]
pkg.cache('foo') // [!code ++]
```
