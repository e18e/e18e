# Replacements for `lodash.isstring`

## `One-liner`

`lodash.isstring` checks if a value is classified as a string (either a primitive or a `String` object). This can be replaced with a simple `typeof` check and an `instanceof String`.

```js
var isString = require('lodash.isstring') // [!code --]
const isString = (value) => typeof value === 'string' || value instanceof String // [!code ++]

console.log(isString('abc'))          // true
console.log(isString(new String(''))) // true
console.log(isString(123))            // false
console.log(isString(['a', 'b']))     // false
```
