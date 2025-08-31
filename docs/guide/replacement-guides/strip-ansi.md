# Replacements for `strip-ansi`

## Node.js

Added in v16.11.0, [util.stripVTControlCharacters](https://nodejs.org/api/util.html#utilstripvtcontrolcharactersstr) can be used to strip ANSI escape codes from a string.

```js
import { stripVTControlCharacters } from 'node:util' // [!code ++]
import stripAnsi from 'strip-ansi' // [!code --]

console.log(stripAnsi('\u001B[4me18e\u001B[0m')) // [!code --]
console.log(stripVTControlCharacters('\u001B[4me18e\u001B[0m')) // [!code ++]
```

## Deno

Deno implements the Node `util` API, and also provides [`util.stripVTControlCharacters`](https://docs.deno.com/api/node/util/~/stripVTControlCharacters). The usage is identical:

```js
import { stripVTControlCharacters } from 'node:util' // [!code ++]
import stripAnsi from 'strip-ansi' // [!code --]

console.log(stripAnsi('\u001B[4me18e\u001B[0m')) // [!code --]
console.log(stripVTControlCharacters('\u001B[4me18e\u001B[0m')) // [!code ++]
```

## Bun

### Using Node‑compatible API

Bun also implements Node’s [`util.stripVTControlCharacters`](https://bun.sh/reference/node/util/stripVTControlCharacters) through its Node compat layer:

```js
import { stripVTControlCharacters } from 'node:util' // [!code ++]
import stripAnsi from 'strip-ansi' // [!code --]

console.log(stripAnsi('\u001B[1mHello\u001B[0m')) // [!code --]
console.log(stripVTControlCharacters('\u001B[1mHello\u001B[0m')) // [!code ++]
```

### Using Bun's native API (>=1.2.21)

Since Bun v1.2.21, you can use the built-in [`Bun.stripANSI`](https://bun.com/blog/release-notes/bun-v1.2.21#bun-stripansi-simd-accelerated-ansi-escape-removal) method.

```js
import { stripANSI } from 'bun' // [!code ++]
import stripAnsi from 'strip-ansi' // [!code --]

console.log(stripAnsi('\u001B[31mHello World\u001B[0m')) // [!code --]
console.log(Bun.stripANSI('\u001B[31mHello World\u001B[0m')) // [!code ++]
```
