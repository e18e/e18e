# Replacements for `lodash.lowercase`

## One-liner

lodash.lowerCase splits a string into words, deburrs Latin accents, joins the words with single spaces and lower-cases the result. For most common cases you can replace it with a small function:

```js
var lowerCase = require('lodash.lowercase') // [!code --]
const lowerCase = (value) => {
  const s = value == null ? '' : String(value);
  // simple deburr using NFD normalization (removes combining diacritics)
  const deburred = (s.normalize ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : s);
  const words = deburred
    // split camelCase boundaries: "fooBar" -> "foo Bar"
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    // replace non-alphanumeric (and underscores/dashes) with spaces
    .replace(/[^A-Za-z0-9\u00C0-\u017F]+/g, ' ')
    .trim()
    .split(/\s+/);
  return words.filter(Boolean).join(' ').toLowerCase();
} // [!code ++]
```

