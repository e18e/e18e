# Replacements for `lodash.unary`

## `One-liner`

`lodash.unary` creates a function that accepts up to one argument, ignoring any additional arguments.
In modern JavaScript you can replace it with a simple higher‑order arrow function that wraps the given function and only takes the first argument:

```js
var unary = require('lodash.unary') // [!code --]
const unary = fn => arg => fn(arg) // [!code ++]

console.log(['6', '8', '10'].map(unary(parseInt))) // [6, 8, 10]

// extra arguments are ignored:
const logFirst = unary((x, y) => [x, y])
console.log(logFirst(1, 2, 3)) // [1, undefined]
```
