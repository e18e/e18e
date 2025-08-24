# Replacements for `is-builtin-module`

## Node.js (since 16.x)

For determining if a module is built-in or not, you can use [isBuiltin](https://nodejs.org/api/module.html#moduleisbuiltinmodulename):

```ts
import { isBuiltin } from 'node:module' // [!code ++]
import isBuiltinModule from 'is-builtin-module' // [!code --]

isBuiltin('fs') // true // [!code ++]
isBuiltinModule('fs') // true // [!code --]
```

For a full list of built-in modules, you can use [builtinModules](https://nodejs.org/api/module.html#modulebuiltinmodules):

```ts
import { builtinModules } from 'node:module' // [!code ++]

console.log(builtinModules)
```

