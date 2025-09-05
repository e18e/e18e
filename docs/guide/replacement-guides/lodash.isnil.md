# Replacements for `lodash.isnil`

## `One-liner`

`lodash.isnil` checks if a value is `null` or `undefined`. You can replace it directly with a simple nullish check.

```js
var isNil = require('lodash.isnil') // [!code --]
const isNil = (value) => value == null // [!code ++]

console.log(isNil(null))      // true
console.log(isNil(undefined)) // true
console.log(isNil(NaN))       // false
```
