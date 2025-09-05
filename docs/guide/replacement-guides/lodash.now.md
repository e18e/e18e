# Replacements for `lodash.now`

## `One-liner`

`lodash.now` simply returns the current timestamp in milliseconds.
In modern JavaScript you can replace it directly with the built‑in [`Date.now`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/now).

```js
var now = require('lodash.now') // [!code --]
const now = Date.now // [!code ++]

console.log(now()) // e.g. 1756627380015
```
