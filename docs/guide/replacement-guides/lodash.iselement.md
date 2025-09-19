# Replacements for `lodash.iselement`

## `One-liner`

`lodash.iselement` checks if a value is a DOM element. In modern JavaScript you can replace it with a simple `instanceof Element` check.

```js
var isElement = require('lodash.iselement') // [!code --]
const isElement = (value) => value instanceof Element // [!code ++]

console.log(isElement(document.body)) // true
console.log(isElement('<body>'))      // false
console.log(isElement({ nodeType: 1 })) // false
```
