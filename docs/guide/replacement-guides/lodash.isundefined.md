# Replacements for `lodash.isundefined`

## `One-liner`

`lodash.isundefined` checks if a value is strictly `undefined`. This is equivalent to a direct comparison.

```js
var isUndefined = require('lodash.isundefined') // [!code --]
const isUndefined = (value) => value === undefined // [!code ++]

console.log(isUndefined(undefined)) // true
console.log(isUndefined(void 0))    // true
console.log(isUndefined(null))      // false
console.log(isUndefined(0))         // false
```
