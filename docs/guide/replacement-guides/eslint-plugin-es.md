# Replacements for `eslint-plugin-es`

## `eslint-plugin-es-x`

[eslint-plugin-es-x](https://github.com/eslint-community/eslint-plugin-es-x) is a direct fork which is actively maintained. It has new features, bugfixes and updated dependencies.

```js
import pluginESx from "eslint-plugin-es-x" // [!code ++]

export default [
    pluginESx.configs['flat/restrict-to-es2018'], // [!code ++]
]
```

If you're using a legacy config format:

```js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:es/restrict-to-es2018', // [!code --]
    'plugin:es-x/restrict-to-es2018', // [!code ++]
  ],
  plugins: [
    'es',    // [!code --]
    'es-x'   // [!code ++]
  ],
  rules: {
    'es/no-regexp-lookbehind-assertions': 'error', // [!code --]
    'es-x/no-regexp-lookbehind-assertions': 'error', // [!code ++]
  }
}
```
