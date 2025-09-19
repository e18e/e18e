# Replacements for `lodash.ary`

## `One-liner`

`lodash.ary` creates a wrapper that invokes a function with up to `N` arguments (ignoring any additional arguments). For the vast majority of simple use cases you can replace it with a tiny wrapper that slices the arguments.

```js
var ary = require('lodash.ary') // [!code --]
const ary = (func, n) => {
  n = (func && n == null) ? func.length : n;
  return function(...args) {
    return func.apply(this, args.slice(0, n));
  };
} // [!code ++]

// Example
const parseOne = ary(parseInt, 1);
['6','8','10'].map(parseOne); // => [6, 8, 10]
```
