# Replacements for `lodash.isfinite`

## `One-liner`

`lodash.isfinite` checks if a value is a finite number primitive. In modern JavaScript this is covered by the built-in [`Number.isFinite`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite).

```js
var isFinite = require('lodash.isfinite') // [!code --]
const isFinite = Number.isFinite          // [!code ++]

console.log(isFinite(3))              // true
console.log(isFinite(Number.MIN_VALUE)) // true
console.log(isFinite(Infinity))       // false
console.log(isFinite('3'))            // false
```
