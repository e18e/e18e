# Replacements for `lodash.isnull`

## `One-liner`

`lodash.isnull` checks if a value is exactly `null`. This can be replaced directly with a strict equality check.

```js
var isNull = require('lodash.isnull') // [!code --]
const isNull = (value) => value === null // [!code ++]

console.log(isNull(null))      // true
console.log(isNull(undefined)) // false
```
