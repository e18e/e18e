# Replacements for `lodash.issafeinteger`

## `One-liner`

`lodash.issafeinteger` checks if a value is a safe integer-an integer within JavaScript’s IEEE-754 safe range (`-(2^53 - 1)` to `2^53 - 1`). In modern JavaScript this is directly covered by the built-in [`Number.isSafeInteger`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

```js
var isSafeInteger = require('lodash.issafeinteger') // [!code --]
const isSafeInteger = Number.isSafeInteger          // [!code ++]

console.log(isSafeInteger(3))                  // true
console.log(isSafeInteger(Number.MIN_VALUE))   // false
console.log(isSafeInteger(Infinity))           // false
console.log(isSafeInteger('3'))                // false
console.log(isSafeInteger(Math.pow(2, 53) - 1))// true
```
