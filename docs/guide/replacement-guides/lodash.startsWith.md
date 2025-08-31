# Replacements for `lodash.startswith`

## One-liner

lodash.startswith checks whether a string starts with the given target at an optional position. For most uses a tiny inline replacement is enough:

```js
var startsWith = require('lodash.startswith') // [!code --]
const startsWith = (string, target, position = 0) => {
  const s = string == null ? '' : String(string);
  const t = target == null ? '' : String(target);

  let pos = position == null ? 0 : Number(position);
  if (!Number.isFinite(pos)) {
    pos = (pos === Infinity) ? s.length : 0;
  } else {
    pos = Math.trunc(pos);
  }
  pos = Math.max(0, Math.min(pos, s.length));

  return s.slice(pos, pos + t.length) === t;
} // [!code ++]
```
