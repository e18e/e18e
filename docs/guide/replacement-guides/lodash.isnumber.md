# Replacements for `lodash.isnumber`

## `One-liner`

`lodash.isnumber` checks if a value is classified as a number (either a primitive or a `Number` object). This can be replaced directly with a `typeof` check and `instanceof Number`.

```js
var isNumber = require('lodash.isnumber') // [!code --]
const isNumber = (value) => typeof value === 'number' || value instanceof Number // [!code ++]

console.log(isNumber(3))               // true
console.log(isNumber(Number.MIN_VALUE))// true
console.log(isNumber(Infinity))        // true
console.log(isNumber('3'))             // false
console.log(isNumber(new Number(5)))   // true
```
