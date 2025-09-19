# Replacements for `lodash.issymbol`

## `One-liner`

`lodash.issymbol` checks if a value is classified as a symbol (either a primitive or a `Symbol` object). This can be replaced with a simple `typeof` check and an `instanceof Symbol`.

```js
var isSymbol = require('lodash.issymbol') // [!code --]
const isSymbol = (value) => typeof value === 'symbol' || value instanceof Symbol // [!code ++]

console.log(isSymbol(Symbol.iterator)) // true
console.log(isSymbol(Object(Symbol())) // true
console.log(isSymbol('abc'))           // false
console.log(isSymbol(123))             // false
```
