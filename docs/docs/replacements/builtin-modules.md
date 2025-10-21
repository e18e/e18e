---
description: Native Node.js alternatives to the builtin-modules package for listing built-in modules
---

# Replacements for `builtin-modules`

## Node.js (since 6.x)

For getting the list of built-in modules, you can use [builtinModules](https://nodejs.org/api/module.html#modulebuiltinmodules):

```ts
import builtinModulesList from 'builtin-modules' // [!code --]
import { builtinModules } from 'node:module' // [!code ++]

builtinModulesList.includes('fs') // [!code --]
builtinModules.includes('fs') // [!code ++]
```
