---
description: Modern alternatives to the qs package for parsing and serializing query strings
---

# Replacements for `qs`

## `URLSearchParams`

[`URLSearchParams`](https://developer.mozilla.org/docs/Web/API/URLSearchParams) is built into browsers and Node.js (>= 10). Use it when you don’t need nested objects or automatic array parsing. It preserves multiple values via `getAll`, and `toString()` gives you a URL-safe query string.

Example:

```ts
import qs from 'qs' // [!code --]

const query = 'a=1&a=2&b=3' // [!code ++]
const obj = qs.parse(query) // { a: ['1','2'], b: '3' } [!code --]
const sp = new URLSearchParams(query) // [!code ++]
const obj = Object.fromEntries(sp) // { a: '2', b: '3' } [!code ++]
const a = sp.getAll('a') // ['1', '2'] [!code ++]

const input = { a: ['1', '2'], b: '3' } // [!code ++]
const str = qs.stringify(input) // [!code --]
const out = new URLSearchParams() // [!code ++]
for (const v of input.a) out.append('a', v) // [!code ++]
out.append('b', input.b) // [!code ++]
const str = out.toString() // 'a=1&a=2&b=3' [!code ++]
```

## `fast-querystring`

[`fast-querystring`](https://www.npmjs.com/package/fast-querystring) is tiny and very fast. It handles flat key/value pairs and repeated keys as arrays; it does not support nested objects. Use it when you need arrays but not nesting.

Example:

```ts
import qs from 'qs' // [!code --]
import fqs from 'fast-querystring' // [!code ++]

const obj = qs.parse('tag=a&tag=b') // [!code --]
const obj = fqs.parse('tag=a&tag=b') // { tag: ['a', 'b'] } [!code ++]

const str = qs.stringify({ tag: ['a', 'b'], q: 'x y' }) // [!code --]
const str = fqs.stringify({ tag: ['a', 'b'], q: 'x y' }) // 'tag=a&tag=b&q=x%20y' [!code ++]
```

## `picoquery`

[`picoquery`](https://www.npmjs.com/package/picoquery) supports nesting and arrays with a fast single‑pass parser and configurable syntax. v2.x and above are ESM‑only; v1.x is CommonJS and will be maintained with non‑breaking changes. `nestingSyntax: 'js'` offers the highest compatibility with `qs`, though you can pick other syntaxes for performance.

Example:

```ts
import qs from 'qs' // [!code --]
import { parse, stringify } from 'picoquery' // [!code ++]

const opts = { // [!code ++]
  nestingSyntax: 'js', // [!code ++]
  arrayRepeat: true, // [!code ++]
  arrayRepeatSyntax: 'bracket' // [!code ++]
} // [!code ++]

const obj = qs.parse('user[name]=foo&tags[]=bar&tags[]=baz') // [!code --]
const obj = parse('user[name]=foo&tags[]=bar&tags[]=baz', opts) // { user: { name: 'foo' }, tags: ['bar','baz'] } [!code ++]

const str = qs.stringify({ user: { name: 'foo' }, tags: ['bar', 'baz'] }, { arrayFormat: 'brackets' }) // [!code --]
const str = stringify({ user: { name: 'foo' }, tags: ['bar', 'baz'] }, opts) // 'user[name]=foo&tags[]=bar&tags[]=baz' [!code ++]
```

## `neoqs`

[`neoqs`](https://www.npmjs.com/package/neoqs) is a fork of `qs` without legacy polyfills, with TypeScript types included, and with both ESM and CommonJS builds (plus a legacy ES5 mode). Choose it when you want `qs`‑level compatibility with modern packaging options.

Example:

```ts
import qs from 'qs' // [!code --]
import { parse, stringify } from 'neoqs' // [!code ++]

const obj = parse('a[b][c]=1&arr[]=2&arr[]=3') // [!code ++]
const str = stringify(obj, { arrayFormat: 'brackets' }) // [!code ++]
```