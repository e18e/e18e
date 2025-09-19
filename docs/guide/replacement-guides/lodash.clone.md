# Replacements for `lodash.clone`

## One-liner

This package is deprecated - use the native `structuredClone` instead.

```js
var clone = require('lodash.clone') // [!code --]
const clone = structuredClone       // [!code ++]

clone({ a: 1 }) // => { a: 1 }
```
