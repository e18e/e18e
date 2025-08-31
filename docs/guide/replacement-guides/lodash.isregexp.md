# Replacements for `lodash.isregexp`

## One-liner

lodash.isRegExp uses Node internals when available but otherwise falls back to a toString check. For almost all use cases you can replace it with a tiny inline function:

```js
var isRegExp = require('lodash.isregexp') // [!code --]
const isRegExp = value => Object.prototype.toString.call(value) === '[object RegExp]' // [!code ++]
```

