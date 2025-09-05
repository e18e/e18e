# Replacements for `lodash.after`

## `One-liner`

`lodash.after` does a small amount of validation and numeric coercion. For the vast majority of use cases - you're just waiting `N` calls and then invoke a function - you can replace it with a tiny inline function.

```js
var after = require('lodash.after') // [!code --]
const after = (n, func) => (...args) => --n <= 0 && func(...args) // [!code ++]

const done = after(3, () => console.log('All saves completed!'))

done() // nothing
done() // nothing
done() // "All saves completed!"
```
