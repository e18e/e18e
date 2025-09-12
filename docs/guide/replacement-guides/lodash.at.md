# Replacements for `lodash.at`

## One-liner

This package is deprecated - just use the native `.at` method for arrays and strings.

```js
var at = require('lodash.at') // [!code --]
const at = (arr, indexes) => indexes.map(i => arr.at(i)) // [!code ++]

at(['a', 'b', 'c', 'd'], [1, 3]) // => ['b', 'd']
at('hello', [1, 4])              // => ['e', 'o']
```
