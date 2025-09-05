# Replacements for `lodash.add`

## `One liner`

`lodash.add` does a fair bit of type handling and edge-case logic. For **most use cases** (you just want to add two numbers / numeric-like values, treating `null`/`undefined` as 0) you can replace it with a tiny inline function.

For example:

```js
var add = require('lodash.add') // [!code --]
const add = (a, b) => (a == null ? 0 : Number(a)) + (b == null ? 0 : Number(b)) // [!code ++]

add(6, 4) // => 10 // [!code --]
add(6, 4) // => 10 // [!code ++]
```
