# Replacements for `builtin-modules`

## Node.js (since 6.x)

For getting the list of built-in modules, you can use [builtinModules](https://nodejs.org/api/module.html#modulebuiltinmodules):

```js
import builtinModulesList from 'builtin-modules' // [!code --]
import { builtinModules } from 'node:module' // [!code ++]

builtinModulesList.includes('fs') // true [!code --]
builtinModules.includes('fs') // true [!code ++]
```

## Before Node 6

There was no official API before Node 6 - the safest option is to use an external package (e.g., `builtin-modules`). For historical context see: https://github.com/nodejs/node/issues/3307
