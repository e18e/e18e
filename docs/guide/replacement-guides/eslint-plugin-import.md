---
description: Modern alternative to eslint-plugin-import, which helps with linting of ES6+ import/export syntax
---

# Replacements for `eslint-plugin-import`

## `eslint-plugin-import-x`

[`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x) is a modern fork of [`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import). `import-x` focuses on faster module resolution via a Rust-based resolver, a smaller dependency footprint

### Flat config

```js
import importPlugin from 'eslint-plugin-import' // [!code --]
import { importX, createNodeResolver } from 'eslint-plugin-import-x' // [!code ++]
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript' // [!code ++]

export default [
  importPlugin.flatConfigs.recommended, // [!code --]
  importX.flatConfigs.recommended, // [!code ++]
  {
    settings: {
      'import/resolver': { typescript: true }, // [!code --]
      'import-x/resolver-next': [createTypeScriptImportResolver(), createNodeResolver()], // [!code ++]
    },
    rules: {
      'import/no-unresolved': 'error', // [!code --]
      'import-x/no-unresolved': 'error', // [!code ++]
      'import/no-nodejs-modules': 'warn', // [!code --]
      'import-x/no-nodejs-modules': 'warn', // [!code ++]
    }
  }
]
```

### Legacy config

```js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended', // [!code --]
    'plugin:import-x/recommended', // [!code ++]
    'plugin:import/typescript', // [!code --]
    'plugin:import-x/typescript' // [!code ++]
  ],
  plugins: [
    'import', // [!code --]
    'import-x' // [!code ++]
  ],
  settings: {
    'import/resolver': { typescript: true }, // [!code --]
    'import-x/resolver': { typescript: true } // [!code ++]
  },
  rules: {
    'import/no-unresolved': 'error', // [!code --]
    'import-x/no-unresolved': 'error' // [!code ++]
  }
}
```
