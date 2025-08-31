# Replacements for `lodash.isobject`

## `One-liner`

`lodash.isobject` checks if a value is of the language type *Object* (including arrays, functions, objects, regexes, and wrapper objects like `new Number(0)`). This can be replaced with a straightforward type check.

```js
var isObject = require('lodash.isobject') // [!code --]
const isObject = (value) =>
  !!value && (typeof value === 'object' || typeof value === 'function') // [!code ++]

console.log(isObject({}))            // true
console.log(isObject([1, 2, 3]))     // true
console.log(isObject(() => {}))      // true
console.log(isObject(1))             // false
console.log(isObject(null))          // false
```
