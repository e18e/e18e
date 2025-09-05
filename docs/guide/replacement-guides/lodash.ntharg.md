# Replacements for `lodash.ntharg`

## `One-liner`

`lodash.nthArg` creates a function that returns the argument at the given index `n`.
In modern JavaScript you can replace it with a higher‑order arrow function:

```js
var nthArg = require('lodash.ntharg') // [!code --]
const nthArg = n => (...args) => args[n < 0 ? args.length + n : n] // [!code ++]

const second = nthArg(1)
console.log(second('a', 'b', 'c', 'd')) // 'b'

const secondLast = nthArg(-2)
console.log(secondLast('a', 'b', 'c', 'd')) // 'c'
```
