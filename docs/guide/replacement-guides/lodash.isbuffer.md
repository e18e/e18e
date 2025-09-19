# Replacements for `lodash.isbuffer`

## `One-liner`

`lodash.isbuffer` checks if a value is a Node.js `Buffer`. You can replace it directly with the built-in `Buffer.isBuffer`.

```js
var isBuffer = require('lodash.isbuffer') // [!code --]
const isBuffer = Buffer.isBuffer          // [!code ++]

console.log(isBuffer(Buffer.from('hi')))  // true
console.log(isBuffer(new Uint8Array(2)))  // false
console.log(isBuffer('not a buffer'))     // false
```
