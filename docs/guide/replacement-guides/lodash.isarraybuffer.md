# Replacements for `lodash.isarraybuffer`

## One-liner

Checks whether a value is an ArrayBuffer. For most use cases a tiny inline function is enough:

```js
var isArrayBuffer = require('lodash.isarraybuffer') // [!code --]
const isArrayBuffer = value => Object.prototype.toString.call(value) === '[object ArrayBuffer]' // [!code ++]
```
