# Replacements for `lodash.isnan`

## `One-liner`

`lodash.isnan` checks if a value is precisely `NaN` (not just any non-numeric value). This is equivalent to using the built-in [`Number.isNaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN), which avoids the pitfalls of the global `isNaN`.

```js
var isNaN = require('lodash.isnan') // [!code --]
const isNaN = Number.isNaN          // [!code ++]

console.log(isNaN(NaN))             // true
console.log(isNaN(new Number(NaN))) // true
console.log(isNaN(undefined))       // false
console.log(isNaN('foo'))           // false
```
