# Replacements for `lodash.max`

## One-liner

Returns the maximum element of an array (by natural JS `>` comparison). Returns `undefined` for empty or falsey arrays and skips `null`/`undefined`/`NaN`/`Symbol` values (matching lodash’s behavior for those cases).

```js
var max = require('lodash.max') // [!code --]
const max = (array) => {
  if (!array || array.length === 0) return undefined;
  const isSymbol = v => typeof v === 'symbol' || (v && typeof v === 'object' && Object.prototype.toString.call(v) === '[object Symbol]');
  let result;
  let computed;
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    const current = value; // identity
    if (current == null) continue;          // skip null/undefined
    if (current !== current) continue;      // skip NaN
    if (isSymbol(current)) continue;        // skip symbols
    if (computed === undefined || current > computed) {
      computed = current;
      result = value;
    }
  }
  return result;
} // [!code ++]
```
