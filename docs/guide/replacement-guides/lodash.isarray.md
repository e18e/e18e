# Replacements for `lodash.isarray`

## One-liner

This package is deprecated - use the native `Array.isArray` instead.

```js
var isArray = require('lodash.isarray') // [!code --]
const isArray = Array.isArray // [!code ++]

isArray([1, 2, 3]) // => true
isArray('abc')     // => false
```
