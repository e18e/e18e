# Replacements for `lodash.pick`

## `One-liner`

`lodash.pick` creates a shallow copy of an object including only specified properties. In modern JavaScript you can replace it with object destructuring and rest/spread syntax.

```js
var pick = require('lodash.pick') // [!code --]
const pick = (obj, keys) =>
  keys.reduce((res, key) => (key in obj && (res[key] = obj[key]), res), {}) // [!code ++]

const user = { id: 1, name: 'Alice', age: 25, role: 'admin' }
console.log(pick(user, ['id', 'name'])) // { id: 1, name: 'Alice' }
```
