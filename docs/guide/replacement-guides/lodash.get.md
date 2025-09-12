# Replacements for `lodash.get`

## `One-liner`

`lodash.get` safely accesses a property at a given path of an object. In modern JavaScript, this can be directly replaced with the optional chaining (`?.`) operator combined with default values (`??`).

```js
var get = require('lodash.get') // [!code --]
const get = (obj, path, defaultValue) => {
  return path
    .split('.')
    .reduce((acc, key) => acc?.[key], obj) ?? defaultValue
} // [!code ++]

const user = { profile: { name: 'Alice' } }

console.log(get(user, 'profile.name', 'Unknown'))   // "Alice"
console.log(get(user, 'profile.age', 30))           // 30
console.log(get(user, 'account.settings.theme', 'light')) // "light"
```
