# Replacements for `lodash.capitalize`

## `One-liner`

For the vast majority of use cases -convert the first character to upper case and the rest to lower case, treating `null`/`undefined` as an empty string - a tiny inline function is enough:

```js
var capitalize = require('lodash.capitalize') // [!code --]
const capitalize = (value) => {
  const s = value == null ? '' : String(value);
  return s ? (s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()) : '';
} // [!code ++]

capitalize('FRED') // => 'Fred'
capitalize(null)   // => ''
```
