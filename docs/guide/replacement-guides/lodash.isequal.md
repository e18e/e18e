# Replacements for `lodash.isequal`

## `One-liner`

`lodash.isequal` checks deep equality of values. In modern Node.js you can replace it with the built-in [`util.isDeepStrictEqual`](https://nodejs.org/api/util.html#utilisdeepstrictequalval1-val2).

```js
var isEqual = require('lodash.isequal') // [!code --]
const { isDeepStrictEqual: isEqual } = require('node:util') // [!code ++]

console.log(isEqual({ a: 1 }, { a: 1 })) // true
console.log(isEqual([1, 2, 3], [1, 2, 3])) // true
console.log(isEqual({ a: 1 }, { a: '1' })) // false
```
