## Replacements for `strip-ansi`

## Node.js

Added in v16.11.0, [util.stripVTControlCharacters](https://nodejs.org/api/util.html#utilstripvtcontrolcharactersstr) can be used to strip ANSI escape codes from a string.

```js
import { stripVTControlCharacters } from 'node:util' // [!code ++]
import stripAnsi from 'strip-ansi' // [!code --]

console.log(stripAnsi('\u001B[4me18e\u001B[0m')); // [!code --]
console.log(stripVTControlCharacters('\u001B[4me18e\u001B[0m')); // [!code ++]
```

## Deno

[Available via Node compat import](https://docs.deno.com/api/node/util/~/stripVTControlCharacters)

```js
import { stripVTControlCharacters } from 'node:util' // [!code ++]
import stripAnsi from 'strip-ansi' // [!code --]

console.log(stripAnsi('\u001B[4me18e\u001B[0m')); // [!code --]
console.log(stripVTControlCharacters('\u001B[4me18e\u001B[0m')); // [!code ++]
```

## Bun

[Bun supports the same API](https://bun.sh/reference/node/util/stripVTControlCharacters#node:util.stripVTControlCharacters)

```js
import { stripVTControlCharacters } from 'node:util' // [!code ++]
import stripAnsi from 'strip-ansi' // [!code --]

console.log(stripAnsi('\u001B[4me18e\u001B[0m')); // [!code --]
console.log(stripVTControlCharacters('\u001B[4me18e\u001B[0m')); // [!code ++]
```
