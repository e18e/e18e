# Replacements for `lodash.identity`

## `One-liner`

`lodash.identity` simply returns the first argument provided to it.
In plain JavaScript, you can replace it with a one‑liner arrow function:

```js
var identity = require('lodash.identity') // [!code --]
const identity = x => x // [!code ++]

const object = { user: 'fred' }
console.log(identity(object) === object) // true
console.log(identity(42)) // 42
console.log(identity(null)) // null
```
