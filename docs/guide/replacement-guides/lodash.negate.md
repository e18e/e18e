# Replacements for `lodash.negate`

## `One-liner`

`lodash.negate` creates a new function that negates the result of the given predicate.
In plain JavaScript, you can replace it with a simple function:

```js
var negate = require('lodash.negate') // [!code --]
const negate = fn => {
  if (typeof fn !== 'function') throw new TypeError('Expected a function')
  return (...args) => !fn(...args)
} // [!code ++]

const isEven = n => n % 2 === 0

console.log([1, 2, 3, 4, 5, 6].filter(negate(isEven))) // [1, 3, 5]
console.log(negate(() => true)()) // false
console.log(negate(() => false)()) // true
```
