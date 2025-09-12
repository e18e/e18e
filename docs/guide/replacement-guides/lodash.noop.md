# Replacements for `lodash.noop`

## `One-liner`

`lodash.noop` is just a function that does nothing and always returns `undefined`. You can replace it with an empty arrow function.

```js
var noop = require('lodash.noop') // [!code --]
const noop = () => {}             // [!code ++]

console.log(noop())                // undefined
console.log(noop(1, 2, 3))         // undefined
```
