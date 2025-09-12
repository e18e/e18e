# Replacements for `lodash.constant`

## `One-liner`

`lodash.constant` creates a function that always returns the same value.
In plain JavaScript, you can replace it with an arrow function that closes over the value:

```js
var constant = require('lodash.constant') // [!code --]
const constant = x => () => x // [!code ++]

const object = { user: 'fred' }
const getter = constant(object)

console.log(getter() === object) // true
console.log(getter()) // { user: 'fred' }
```
