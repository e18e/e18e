# Replacements for `lodash.stubtrue`

## `One-liner`

`lodash.stubTrue` is a utility that always returns `true`.
In plain JavaScript, you can replace it with a simple arrow function:

```js
var stubTrue = require('lodash.stubtrue') // [!code --]
const stubTrue = () => true // [!code ++]

console.log(stubTrue()) // true
console.log([1, 2, 3].map(stubTrue)) // [true, true, true]
```
