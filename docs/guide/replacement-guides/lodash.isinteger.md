# Replacements for `lodash.isinteger`

## `One-liner`

`lodash.isinteger` checks if a value is an integer. In modern JavaScript this is directly covered by the built-in [`Number.isInteger`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger).

```js
var isInteger = require('lodash.isinteger') // [!code --]
const isInteger = Number.isInteger          // [!code ++]

console.log(isInteger(3))              // true
console.log(isInteger(Number.MIN_VALUE)) // false
console.log(isInteger(Infinity))       // false
console.log(isInteger('3'))            // false
```
