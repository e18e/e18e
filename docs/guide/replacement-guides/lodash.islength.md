# Replacements for `lodash.islength`

## `One-liner`

`lodash.islength` checks if a value is a valid array-like length: a non-negative, safe integer within JavaScript’s maximum safe integer range. This can be replicated with a simple inline check.

```js
var isLength = require('lodash.islength') // [!code --]
const isLength = (value) =>
  typeof value === 'number' &&
  value > -1 &&
  value % 1 === 0 &&
  value <= Number.MAX_SAFE_INTEGER // [!code ++]

console.log(isLength(3))                // true
console.log(isLength(Number.MIN_VALUE)) // false
console.log(isLength(Infinity))         // false
console.log(isLength('3'))              // false
```
