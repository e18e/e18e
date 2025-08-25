# Replacements for `is-builtin-module`

## Node.js (since 16.x)

For determining if a module is built-in or not, you can use [isBuiltin](https://nodejs.org/api/module.html#moduleisbuiltinmodulename):

```ts
import { isBuiltin } from 'node:module' // [!code ++]
import isBuiltinModule from 'is-builtin-module' // [!code --]

isBuiltin('fs') // true [!code ++]
isBuiltinModule('fs') // true [!code --]
```

## Node.js 6.x to 15.x

Before Node.js 16.x, `isBuiltin` was not available, so you need to implement your own check using [builtinModules](https://nodejs.org/api/module.html#modulebuiltinmodules):

```ts
import { builtinModules } from 'node:module' // [!code ++]
import isBuiltinModule from 'is-builtin-module' // [!code --]

function isBuiltin(moduleName) { // [!code ++]
  const name = moduleName.startsWith('node:') // [!code ++]
    ? moduleName.slice(5) // [!code ++]
    : moduleName // [!code ++]

  return builtinModules.includes(name) // [!code ++]
} // [!code ++]

isBuiltin('fs') // true [!code ++]
isBuiltinModule('fs') // true [!code --]
```

## Getting all built-in modules

For a full list of built-in modules (available since Node.js 6.x), you can use [builtinModules](https://nodejs.org/api/module.html#modulebuiltinmodules):

```ts
import { builtinModules } from 'node:module'

console.log(builtinModules)
```

