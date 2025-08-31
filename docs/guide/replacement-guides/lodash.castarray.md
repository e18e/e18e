# Replacements for `lodash.castarray`

## `One-liner`

`lodash.castArray` casts a single value to an array: when called with no arguments it returns `[]`, when called with an array it returns the same array reference, otherwise it returns a new one-element array containing the value. You can replace it with a tiny inline function:

```js
var castArray = require('lodash.castArray') // [!code --]
const castArray = (...args) => args.length ? (Array.isArray(args[0]) ? args[0] : [args[0]]) : [] // [!code ++]

// Examples
castArray()            // => []
castArray(1)           // => [1]
const arr = [1,2];
castArray(arr) === arr  // => true
castArray(undefined)   // => [undefined]
castArray(null)        // => [null]
castArray(1, 2, 3)     // => [1]   // extra args ignored
```
