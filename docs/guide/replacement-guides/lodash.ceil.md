# Replacements for `lodash.ceil`

## `One-liner`

`lodash.ceil` performs type coercion and supports a precision parameter. For most uses you can replace it with a small inline function:

```js
var ceil = require('lodash.ceil') // [!code --]
const ceil = (number, precision = 0) => {
  number = Number(number);
  precision = precision == null ? 0 : Math.trunc(Number(precision));
  if (precision === 0) return Math.ceil(number);
  const factor = Math.pow(10, Math.abs(precision));
  return precision > 0
    ? Math.ceil(number * factor) / factor
    : Math.ceil(number / factor) * factor;
} // [!code ++]

// Examples
ceil(4.006)      // => 5
ceil(6.004, 2)   // => 6.01
ceil(6040, -2)   // => 6100
```
