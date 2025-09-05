# Replacements for `lodash.multiply`

## One-liner

lodash.multiply performs numeric multiplication with some type coercion. For the common case (multiply two numeric-like values, treating null/undefined as the multiplicative identity 1) you can replace it with a tiny inline function:

```js
var multiply = require('lodash.multiply') // [!code --]
const multiply = (a, b) => (a == null ? 1 : Number(a)) * (b == null ? 1 : Number(b)) // [!code ++]

multiply(6, 4)      // => 24
multiply('6', 4)    // => 24
multiply(null, 5)   // => 5
multiply(undefined) // => 1
```

