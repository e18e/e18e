# Replacements for `lodash.stubfalse`

## `One-liner`

`lodash.stubFalse` is a utility that always returns `false`.
In plain JavaScript, you can replace it with a simple arrow function:

```js
var stubFalse = require('lodash.stubfalse') // [!code --]
const stubFalse = () => false // [!code ++]

console.log(stubFalse()) // false
console.log([1, 2, 3].map(stubFalse)) // [false, false, false]
```
