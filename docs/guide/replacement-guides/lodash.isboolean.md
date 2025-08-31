# Replacements for `lodash.isboolean`

## `One-liner`

`lodash.isboolean` checks if a value is classified as a boolean (either a primitive or a `Boolean` object). This can be replaced with a simple `typeof` check and an `instanceof Boolean`.

```js
var isBoolean = require('lodash.isboolean') // [!code --]
const isBoolean = (value) => typeof value === 'boolean' || value instanceof Boolean // [!code ++]

console.log(isBoolean(false))            // true
console.log(isBoolean(true))             // true
console.log(isBoolean(new Boolean(true)))// true
console.log(isBoolean(null))             // false
console.log(isBoolean('true'))           // false
```
