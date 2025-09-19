---
description: TODO
---

<!-- lodash.callback - This package is discontinued. Use lodash.iteratee@^4.0.0. -->
<!-- lodash.compose - This package is discontinued. Use lodash.flowright@^3.0.0. -->
<!-- lodash.contains - This package is discontinued. Use lodash.includes@^4.0.0. -->
<!-- lodash.createcallback - This package is discontinued. Use lodash.iteratee@^4.0.0. -->

# Replacements for `lodash`, `underscore` and related

## `lodash.add`

`lodash.add` handles multiple types and edge cases. In most cases adding two numbers or numeric-like values and treating `null`/`undefined` as 0—a small inline function is sufficient.

```js
import add from 'lodash/add' // [!code --]
export function add(a, b) { // [!code ++]
  return Number(a ?? 0) + Number(b ?? 0); // [!code ++]
} // [!code ++]

add(6, 4)
```

## `lodash.after`

`lodash.after` performs minimal validation and numeric coercion. For most cases waiting `N` calls before invoking a function a tiny inline helper suffices.

```js
import after from 'lodash/after'; // [!code --]
export default function after(n, fn) { // [!code ++]
  if (typeof fn !== 'function') throw new TypeError('Expected a function'); // [!code ++]
  n = Math.trunc(n ?? 0); // [!code ++]
  return function (...args) { // [!code ++]
    if (--n < 1) return fn.apply(this, args); // [!code ++]
  }; // [!code ++]
} // [!code ++]

const done = after(3, () => console.log('All saves completed!'))

done() // nothing
done() // nothing
done() // "All saves completed!"
```

## `lodash.ary`

`lodash.ary` wraps a function so it accepts at most `N` arguments, ignoring the rest. For most use cases, a small wrapper that slices the arguments is sufficient.

```js
import ary from 'lodash/ary'; // [!code --]
function ary(fn, n = fn.length) {  // [!code ++]
  if (typeof fn !== 'function') throw new TypeError('Expected a function'); // [!code ++]
  const num = Number(n); // [!code ++]
  const cap = Number.isFinite(num) ? Math.max(0, Math.trunc(num)) : 0; // [!code ++]
  return function (...args) { // [!code ++]
    return fn.apply(this, args.slice(0, cap)); // [!code ++]
  }; // [!code ++]
} // [!code ++]

const parseOne = ary(parseInt, 1);
['6','8','10'].map(parseOne); // => [6, 8, 10]
```

## `lodash.assign`

`lodash.assign` copies own enumerable properties from source objects to a target. In modern JS, use `Object.assign`.

```js
import assign from 'lodash/assign'; // [!code --]
const assign = Object.assign; // [!code ++]

const out = assign({}, { a: 1 }, { b: 2 }); // => { a: 1, b: 2 }
```

## `lodash.assignIn`

`lodash.assignIn` copies enumerable own and inherited properties into a target. A simple for-in helper is enough.

```js
import assignIn from 'lodash/assignIn'; // [!code --]
function assignIn(target, ...sources) { // [!code ++]
  if (target == null) throw new TypeError('Cannot convert undefined or null to object'); // [!code ++]
  const t = Object(target); // [!code ++]
  for (const src of sources) { // [!code ++]
    if (src == null) continue; // [!code ++]
    for (const key in Object(src)) { // [!code ++]
      t[key] = src[key]; // [!code ++]
    } // [!code ++]
  } // [!code ++]
  return t; // [!code ++]
} // [!code ++]
```

## `lodash.assignInWith`

`lodash.assignInWith` copies enumerable own and inherited properties into a target using a customizer.

```js
import assignInWith from 'lodash/assignInWith'; // [!code --]
function assignInWith(target, ...sources) { // [!code ++]
  const customizer = sources.pop(); // [!code ++]
  if (typeof customizer !== 'function') throw new TypeError('Expected a function'); // [!code ++]
  if (target == null) throw new TypeError('Cannot convert undefined or null to object'); // [!code ++]
  const t = Object(target); // [!code ++]
  for (const src of sources) { // [!code ++]
    if (src == null) continue; // [!code ++]
    for (const key in Object(src)) { // [!code ++]
      const v = customizer(t[key], src[key], key, t, src); // [!code ++]
      t[key] = v === undefined ? src[key] : v; // [!code ++]
    } // [!code ++]
  } // [!code ++]
  return t; // [!code ++]
} // [!code ++]
```

## `lodash.assignWith`

`lodash.assignWith` copies properties from sources to a target using a customizer. A small helper is enough.

```js
import assignWith from 'lodash/assignWith'; // [!code --]
function assignWith(target, ...sources) { // [!code ++]
  const customizer = sources.pop(); // [!code ++]
  if (typeof customizer !== 'function') { // [!code ++]
    throw new TypeError('Expected a function'); // [!code ++]
  } // [!code ++]
  if (target == null) { // [!code ++]
    throw new TypeError('Cannot convert undefined or null to object'); // [!code ++]
  } // [!code ++]
  const t = Object(target); // [!code ++]
  for (const src of sources) { // [!code ++]
    if (src == null) continue; // [!code ++]
    for (const key of Reflect.ownKeys(src)) { // [!code ++]
      if (!Object.prototype.propertyIsEnumerable.call(src, key)) continue; // [!code ++]
      const v = customizer(t[key], src[key], key, t, src); // [!code ++]
      t[key] = v === undefined ? src[key] : v; // [!code ++]
    } // [!code ++]
  } // [!code ++]
  return t; // [!code ++]
} // [!code ++]

const out = assignWith(
  { a: 1, arr: [1] },
  { a: 2, b: 3, arr: [2] },
  (objVal, srcVal) => Array.isArray(objVal) && Array.isArray(srcVal) ? objVal.concat(srcVal) : undefined
); // => { a: 2, b: 3, arr: [1, 2] }
```

## `lodash.at`

`lodash.at` helps select values at given paths. Prefer built-in `Array.prototype.at`/`String.prototype.at` for indexing; for simple dot paths, a tiny helper is enough.

```js
import at from 'lodash/at'; // [!code --]
function at(obj, ...paths) { // [!code ++]
  const list = paths.flat(); // [!code ++]
  return list.map(p => // [!code ++]
    typeof p === 'number' // [!code ++]
      ? (Array.isArray(obj) || typeof obj === 'string' ? obj.at(p) : obj?.[p]) // [!code ++]
      : String(p).split('.').reduce((o, k) => o?.[k], obj) // [!code ++]
  ); // [!code ++]
} // [!code ++]
```

## `lodash.attempt`

`lodash.attempt` invokes a function and returns its result; if it throws, returns the error object.

```js
import attempt from 'lodash/attempt'; // [!code --]
function attempt(fn, ...args) { // [!code ++]
  if (typeof fn !== 'function') throw new TypeError('Expected a function'); // [!code ++]
  try { // [!code ++]
    return fn(...args); // [!code ++]
  } catch (e) { // [!code ++]
    return e instanceof Error ? e : new Error(String(e)); // [!code ++]
  } // [!code ++]
} // [!code ++]
```

## `lodash.before`

`lodash.before` executes a function while it’s been called fewer than `N` times; later calls return the last result.

```js
import before from 'lodash/before'; // [!code --]
function before(n, fn) { // [!code ++]
  if (typeof fn !== 'function') throw new TypeError('Expected a function'); // [!code ++]
  let remaining = Number(n); // [!code ++]
  remaining = Number.isFinite(remaining) ? Math.max(0, Math.trunc(remaining)) : 0; // [!code ++]
  let last; // [!code ++]
  return function (...args) { // [!code ++]
    if (--remaining > 0) last = fn.apply(this, args); // [!code ++]
    if (remaining <= 1) fn = undefined; // [!code ++]
    return last; // [!code ++]
  }; // [!code ++]
} // [!code ++]
```

## `lodash.bind`

Bind a function to a thisArg and optionally prepend arguments. Use Function.prototype.bind.

```js
import bind from 'lodash/bind'; // [!code --]
const bind = (fn, thisArg, ...partials) => { // [!code ++]
  if (typeof fn !== 'function') throw new TypeError('Expected a function'); // [!code ++]
  return fn.bind(thisArg, ...partials); // [!code ++]
}; // [!code ++]
```

## `lodash.bindAll`

`lodash.bindAll` binds the listed methods to the object.

```js
import bindAll from 'lodash/bindAll'; // [!code --]
function bindAll(obj, ...methodNames) { // [!code ++]
  if (obj == null) throw new TypeError('Cannot bind to null/undefined'); // [!code ++]
  for (const name of methodNames.flat()) { // [!code ++]
    const key = typeof name === 'symbol' ? name : String(name); // [!code ++]
    const fn = obj[key]; // [!code ++]
    if (typeof fn !== 'function') throw new TypeError('Expected a function'); // [!code ++]
    obj[key] = fn.bind(obj); // [!code ++]
  } // [!code ++]
  return obj; // [!code ++]
} // [!code ++]
```

## `lodash.bindKey`

`lodash.bindKey` bind a method name to an object, optionally pre-appending arguments. The method is looked up at call time.

```js
import bindKey from 'lodash/bindKey'; // [!code --]
const bindKey = (obj, key, ...partials) => (...args) => { // [!code ++]
  const fn = obj[key]; // [!code ++]
  if (typeof fn !== 'function') throw new TypeError('Expected a function'); // [!code ++]
  return fn.apply(obj, [...partials, ...args]); // [!code ++]
}; // [!code ++]
```

## `lodash.camelCase`

```js
import camelCase from 'lodash/camelCase'; // [!code --]
function camelCase(input) { // [!code ++]
  if (input == null) return ''; // [!code ++]
  let s = String(input) // [!code ++]
    .normalize('NFKD') // [!code ++]
    .replace(/\p{M}+/gu, ''); // remove diacritics [!code ++]
  s = s // [!code ++]
    .replace(/[_\-.]+/g, ' ') // separators -> space [!code ++]
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // fooBar -> foo Bar [!code ++]
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1 $2') // XMLHTTP -> XML HTTP [!code ++]
    .trim(); // [!code ++]
  const words = s.match(/[\p{L}\p{N}]+/gu) || []; // [!code ++]
  return words // [!code ++]
    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())) // [!code ++]
    .join(''); // [!code ++]
} // [!code ++]
```

## `lodash.capitalize`

For the vast majority of use cases -convert the first character to upper case and the rest to lower case - a tiny inline function is enough:

```js
var capitalize = require('lodash.capitalize') // [!code --]
import capitalize from 'lodash/capitalize'; // [!code --]
function capitalize(input) { // [!code ++]
  if (input == null) return ''; // [!code ++]
  let s = String(input).toLowerCase(); // [!code ++]
  if (s === '') return ''; // [!code ++]

  let first = '', rest = ''; // [!code ++]
  if (typeof Intl !== 'undefined' && Intl.Segmenter) { // [!code ++]
    const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' }); // [!code ++]
    const it = seg.segment(s)[Symbol.iterator](); // [!code ++]
    const { value, done } = it.next(); // [!code ++]
    if (!done && value) { // [!code ++]
      first = value.segment; // [!code ++]
      rest = s.slice(value.index + value.segment.length); // [!code ++]
    } // [!code ++]
  } else { // [!code ++]
    const [head = '', ...tail] = Array.from(s); // [!code ++]
    first = head; // [!code ++]
    rest = tail.join(''); // [!code ++]
  } // [!code ++]

  return first.toUpperCase() + rest; // [!code ++]
} // [!code ++]

capitalize('FRED') // => 'Fred'
capitalize(null)   // => ''
```

## `lodash.castarray`

`lodash.castArray` wraps the value in an array. If there are no arguments, it returns an empty array. If value is already an array, it returns it as it is. Additional arguments are ignored:

```js
import castArray from 'lodash/castArray'; // [!code --]
function castArray(...args) { // [!code ++]
  if (args.length === 0) return []; // [!code ++]
  const value = args[0]; // [!code ++]
  return Array.isArray(value) ? value : [value]; // [!code ++]
} // [!code ++]

castArray() // => []
castArray(1) // => [1]
```

## `lodash.ceil`

Rounds a number up to the given precision. Positive precision = decimal places; negative precision = powers of ten. Coerces inputs with Number(...) and uses the exponent-shift trick to avoid common floating‑point glitches.

```js
import ceil from 'lodash/ceil'; // [!code --]
function ceil(value, precision = 0) { // [!code ++]
  const n = Number(value); // [!code ++]
  let p = Math.trunc(Number(precision) || 0); // [!code ++]
  if (!Number.isFinite(n) || p === 0) return Math.ceil(n); // [!code ++]
  if (p > 292) p = 292; // [!code ++]
  if (p < -292) p = -292; // [!code ++]
  const [coeff, expStr = '0'] = String(n).split('e'); // [!code ++]
  const shifted = Math.ceil(Number(`${coeff}e${(+expStr) + p}`)); // [!code ++]
  const [coeff2, expStr2 = '0'] = String(shifted).split('e'); // [!code ++]
  return Number(`${coeff2}e${(+expStr2) - p}`); // [!code ++]
} // [!code ++]

// Examples
ceil(4.006)      // => 5
ceil(6.004, 2)   // => 6.01
ceil(6040, -2)   // => 6100
```

## `lodash.chunk`

Splits an array-like into groups of a given size. The final chunk may be shorter. Size is coerced to an integer (truncated toward zero); defaults to 1. If size < 1, or the input is nullish/empty, returns [].

```js
import chunk from 'lodash/chunk'; // [!code --]
function chunk(array, size = 1) { // [!code ++]
  if (array == null) return []; // [!code ++]
  const len = array.length >>> 0; // works for array-like // [!code ++]
  let n = Math.trunc(Number(size) || 0); // [!code ++]
  if (n < 1 || len === 0) return []; // [!code ++]

  const result = Array(Math.ceil(len / n)); // [!code ++]
  let i = 0, r = 0; // [!code ++]
  while (i < len) { // [!code ++]
    const end = i + n; // [!code ++]
    const group = []; // [!code ++]
    for (let j = i; j < end && j < len; j++) group.push(array[j]); // [!code ++]
    result[r++] = group; // [!code ++]
    i = end; // [!code ++]
  } // [!code ++]
  return result; // [!code ++]
} // [!code ++]
```

## `lodash.clamp`

Clamps a number to an inclusive range. If only two args are provided, the second is treated as the upper bound (no lower bound). Inputs are coerced with Number(...); NaN bounds become 0. If the value itself is NaN, the result is NaN.

```js
import clamp from 'lodash/clamp'; // [!code --]
function clamp(number, lower, upper) { // [!code ++]
  if (upper === undefined) { upper = lower; lower = undefined; } // [!code ++]

  const n = Number(number); // [!code ++]
  let hi = upper === undefined ? undefined : Number(upper); // [!code ++]
  let lo = lower === undefined ? undefined : Number(lower); // [!code ++]

  if (Number.isNaN(hi)) hi = 0; // [!code ++]
  if (Number.isNaN(lo)) lo = 0; // [!code ++]
  if (Number.isNaN(n)) return NaN; // [!code ++]

  let x = n; // [!code ++]
  if (hi !== undefined) x = x <= hi ? x : hi; // [!code ++]
  if (lo !== undefined) x = x >= lo ? x : lo; // [!code ++]
  return x; // [!code ++]
} // [!code ++]
```

## `lodash.clone`

Creates a shallow clone. For objects, preserves the prototype and copies own enumerable string and symbol keys. Arrays are sliced. Map/Set get new containers with the same entries. RegExp keeps flags and lastIndex. Typed arrays are re-wrapped over the same underlying buffer. Node Buffers are copied.

Note: If you need a deep clone, prefer the built-in structuredClone(value).

```js
import clone from 'lodash/clone'; // [!code --]
function clone(value) { // [!code ++]
  if (value == null || typeof value !== 'object') return value; // [!code ++]

  if (Array.isArray(value)) return value.slice(); // [!code ++]

  if (typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(value)) { // [!code ++]
    return Buffer.from(value); // [!code ++]
  } // [!code ++]

  if (value instanceof Map) return new Map(value); // [!code ++]
  if (value instanceof Set) return new Set(value); // [!code ++]

  if (value instanceof Date) return new Date(value.getTime()); // [!code ++]
  if (value instanceof RegExp) { // [!code ++]
    const r = new RegExp(value.source, value.flags); // [!code ++]
    r.lastIndex = value.lastIndex; // [!code ++]
    return r; // [!code ++]
  } // [!code ++]

  if (ArrayBuffer.isView(value)) { // [!code ++]
    if (value instanceof DataView) { // [!code ++]
      return new DataView(value.buffer, value.byteOffset, value.byteLength); // [!code ++]
    } // [!code ++]
    const Ctor = value.constructor; // [!code ++]
    return new Ctor(value.buffer, value.byteOffset, value.length); // [!code ++]
  } // [!code ++]

  if (value instanceof ArrayBuffer) return value.slice(0); // [!code ++]

  const proto = Object.getPrototypeOf(value); // [!code ++]
  return Object.assign(Object.create(proto), value); // [!code ++]
} // [!code ++]
```

## `lodash.cloneDeep`

Deep-clones a value. Uses the native structuredClone when available (Node 17+/modern browsers); falls back to a small cycle-safe clone that covers Arrays, Objects (with prototype), Map (values deep-cloned, keys preserved), Set (values deep-cloned), Date, RegExp (keeps lastIndex), ArrayBuffer/TypedArray/DataView, and Node Buffer. Functions, WeakMap, and WeakSet aren’t cloneable: top-level becomes {}, nested references are kept (lodash-ish behavior).

```js
import cloneDeep from 'lodash/cloneDeep'; // [!code --]
function cloneDeep(value) { // [!code ++]
  if (typeof globalThis.structuredClone === 'function') { // [!code ++]
    try { return globalThis.structuredClone(value); } catch {} // [!code ++]
  } // [!code ++]

  const seen = new Map(); // for cycles // [!code ++]
  const clone = (val, parent) => { // [!code ++]
    if (val == null || typeof val !== 'object') return val; // [!code ++]
    if (seen.has(val)) return seen.get(val); // [!code ++]

    const tag = Object.prototype.toString.call(val); // [!code ++]
    if (typeof val === 'function') return {}; // lodash-ish // [!code ++]
    if (tag === '[object WeakMap]' || tag === '[object WeakSet]') { // [!code ++]
      return parent ? val : {}; // keep ref when nested, {} at top level // [!code ++]
    } // [!code ++]

    if (val instanceof Date) return new Date(val.getTime()); // [!code ++]
    if (val instanceof RegExp) { const r = new RegExp(val.source, val.flags); r.lastIndex = val.lastIndex; return r; } // [!code ++]

    if (typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(val)) {
      const out = Buffer.from(val); seen.set(val, out); return out; // [!code ++]
    } // [!code ++]

    if (val instanceof ArrayBuffer) { const out = val.slice(0); seen.set(val, out); return out; } // [!code ++]
    if (ArrayBuffer.isView(val)) { // Typed arrays / DataView // [!code ++]
      if (typeof DataView !== 'undefined' && val instanceof DataView) {
        const buf = val.buffer.slice(0); const out = new DataView(buf, val.byteOffset, val.byteLength);
        seen.set(val, out); return out; // [!code ++]
      }
      const Ctor = val.constructor; const buf = val.buffer.slice(0);
      const out = new Ctor(buf, val.byteOffset, val.length);
      seen.set(val, out); return out; // [!code ++]
    } // [!code ++]

    if (Array.isArray(val)) {
      const out = new val.constructor(val.length); seen.set(val, out);
      for (let i = 0; i < val.length; i++) if (Object.prototype.hasOwnProperty.call(val, i)) out[i] = clone(val[i], val);
      for (const key of Reflect.ownKeys(val)) {
        if (typeof key === 'symbol' || !/^\d+$/.test(String(key))) {
          const d = Object.getOwnPropertyDescriptor(val, key);
          if (d && d.enumerable) out[key] = clone(val[key], val);
        }
      }
      return out; // [!code ++]
    } // [!code ++]

    if (val instanceof Map) {
      const out = new Map(); seen.set(val, out);
      val.forEach((v, k) => out.set(k, clone(v, val))); // clone values, keep keys // [!code ++]
      return out;
    } // [!code ++]

    if (val instanceof Set) {
      const out = new Set(); seen.set(val, out);
      val.forEach(v => out.add(clone(v, val)));
      return out;
    } // [!code ++]

    const proto = Object.getPrototypeOf(val);
    const out = Object.create(proto);
    seen.set(val, out);
    for (const key of Reflect.ownKeys(val)) {
      const d = Object.getOwnPropertyDescriptor(val, key);
      if (d && d.enumerable) out[key] = clone(val[key], val);
    }
    return out; // [!code ++]
  }; // [!code ++]

  return clone(value, undefined); // [!code ++]
} // [!code ++]
```

## `lodash.cloneDeepWith`

Deep-clones a value with a per-node override. Your customizer(value, key, parent, stack) can return a replacement; if it returns undefined, the value is cloned normally. Cycle-safe, preserves prototypes, copies own enumerable string and symbol keys, and handles Array, Map (clone values, keep keys), Set (clone values), Date, RegExp (keeps lastIndex), ArrayBuffer/TypedArray/DataView, and Node Buffer. Non‑cloneables (Function, Error, Promise, WeakMap, WeakSet): top-level becomes {}, nested references are kept as-is.

```js
import cloneDeepWith from 'lodash/cloneDeepWith'; // [!code --]
function cloneDeepWith(value, customizer) { // [!code ++]
  const isFn = typeof customizer === 'function'; // [!code ++]
  const seen = new Map(); // [!code ++]
  const pEnum = Object.prototype.propertyIsEnumerable; // [!code ++]

  const clone = (val, key, parent) => { // [!code ++]
    if (isFn) { // give customizer the first shot // [!code ++]
      const out = customizer(val, key, parent, seen); // [!code ++]
      if (out !== undefined) return out; // [!code ++]
    } // [!code ++]

    if (val == null || typeof val !== 'object') return val; // primitives // [!code ++]
    if (seen.has(val)) return seen.get(val); // cycle // [!code ++]

    if (typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(val)) {
      const out = Buffer.from(val); seen.set(val, out); return out;
    } // [!code ++]

    const tag = Object.prototype.toString.call(val); // [!code ++]

    if (tag === '[object Function]' || tag === '[object Error]' || tag === '[object Promise]' ||
        tag === '[object WeakMap]' || tag === '[object WeakSet]') {
      return parent ? val : {}; // [!code ++]
    } // [!code ++]

    if (Array.isArray(val)) {
      const out = new val.constructor(val.length);
      seen.set(val, out);
      for (let i = 0; i < val.length; i++) if (Object.prototype.hasOwnProperty.call(val, i)) {
        out[i] = clone(val[i], i, val);
      }
      for (const k of Object.keys(val)) if (!/^\d+$/.test(k)) out[k] = clone(val[k], k, val);
      for (const s of Object.getOwnPropertySymbols(val)) if (pEnum.call(val, s)) out[s] = clone(val[s], s, val);
      return out;
    } // [!code ++]

    if (val instanceof Date) { const out = new Date(val.getTime()); seen.set(val, out); return out; }
    if (val instanceof RegExp) { const out = new RegExp(val.source, val.flags); out.lastIndex = val.lastIndex; seen.set(val, out); return out; }
    if (val instanceof ArrayBuffer) { const out = val.slice(0); seen.set(val, out); return out; }
    if (ArrayBuffer.isView(val)) {
      if (typeof DataView !== 'undefined' && val instanceof DataView) {
        const buf = val.buffer.slice(0); const out = new DataView(buf, val.byteOffset, val.byteLength);
        seen.set(val, out); return out;
      }
      const Ctor = val.constructor; const buf = val.buffer.slice(0);
      const out = new Ctor(buf, val.byteOffset, val.length);
      seen.set(val, out); return out;
    } // [!code ++]

    if (val instanceof Map) {
      const out = new Map(); seen.set(val, out);
      val.forEach((v, k) => out.set(k, clone(v, k, val))); // [!code ++]
      return out;
    } // [!code ++]

    if (val instanceof Set) {
      const out = new Set(); seen.set(val, out);
      val.forEach(v => out.add(clone(v, v, val))); // [!code ++]
      return out;
    } // [!code ++]

    if (tag === '[object Number]' || tag === '[object String]' || tag === '[object Boolean]') {
      const out = new val.constructor(val.valueOf()); seen.set(val, out); return out;
    }
    if (tag === '[object Symbol]') {
      const out = Object(Symbol.prototype.valueOf.call(val)); seen.set(val, out); return out;
    } // [!code ++]

    const proto = Object.getPrototypeOf(val);
    const out = Object.create(proto);
    seen.set(val, out);
    for (const k of Object.keys(val)) out[k] = clone(val[k], k, val);
    for (const s of Object.getOwnPropertySymbols(val)) if (pEnum.call(val, s)) out[s] = clone(val[s], s, val);
    return out;
  }; // [!code ++]

  return clone(value, undefined, undefined); // [!code ++]
} // [!code ++]
```

## `lodash.cloneWith`

Shallow-clones a value, letting a customizer override the result. If customizer(value) returns anything other than undefined, that is returned; otherwise a normal shallow clone is produced. Only the top-level value is customized (matching lodash).

- Arrays: new array, same element references
- Objects: preserve prototype, copy own enumerable string and symbol keys
- Map/Set: new containers with the same entries (shallow)
- Date, RegExp: cloned; RegExp keeps lastIndex
- Typed arrays/DataView: re-wrapped over the same underlying buffer
- ArrayBuffer: bytes are copied
- Node Buffer: copied

```js
import cloneWith from 'lodash/cloneWith'; // [!code --]
function cloneWith(value, customizer) { // [!code ++]
  if (typeof customizer === 'function') { // [!code ++]
    const out = customizer(value); // [!code ++]
    if (out !== undefined) return out; // [!code ++]
  } // [!code ++]

  if (value == null || typeof value !== 'object') return value; // [!code ++]

  if (Array.isArray(value)) return value.slice(); // [!code ++]

  if (typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(value)) {
    return Buffer.from(value); // copy bytes // [!code ++]
  } // [!code ++]

  if (value instanceof Map) return new Map(value); // shallow // [!code ++]
  if (value instanceof Set) return new Set(value); // shallow // [!code ++]

  if (value instanceof Date) return new Date(value.getTime()); // [!code ++]
  if (value instanceof RegExp) { const r = new RegExp(value.source, value.flags); r.lastIndex = value.lastIndex; return r; } // [!code ++]

  if (ArrayBuffer.isView(value)) {
    if (typeof DataView !== 'undefined' && value instanceof DataView) {
      return new DataView(value.buffer, value.byteOffset, value.byteLength); // [!code ++]
    }
    const Ctor = value.constructor; // [!code ++]
    return new Ctor(value.buffer, value.byteOffset, value.length); // share buffer // [!code ++]
  } // [!code ++]

  if (value instanceof ArrayBuffer) return value.slice(0); // [!code ++]

  const proto = Object.getPrototypeOf(value); // [!code ++]
  return Object.assign(Object.create(proto), value); // [!code ++]
} // [!code ++]
```

## `lodash.compact`

Removes all falsey values from an array-like. Falsey: false, 0, "", null, undefined, NaN. Nullish input returns [].

```js
import compact from 'lodash/compact'; // [!code --]
function compact(array) { // [!code ++]
  if (array == null) return []; // [!code ++]
  const len = array.length >>> 0; // [!code ++]
  const out = []; // [!code ++]
  for (let i = 0; i < len; i++) { // [!code ++]
    const v = array[i]; // [!code ++]
    if (v) out.push(v); // [!code ++]
  } // [!code ++]
  return out; // [!code ++]
} // [!code ++]
```


## `lodash.concat`

Concatenates values to an array, flattening one level for arrays, arguments objects, and objects with Symbol.isConcatSpreadable = true. Always returns a new array. If called with no arguments, returns [].

```js
import concat from 'lodash/concat'; // [!code --]
function concat(...args) { // [!code ++]
  if (args.length === 0) return []; // [!code ++]
  const [array, ...rest] = args; // [!code ++]

  const out = Array.isArray(array) ? copyArray(array) : [array]; // [!code ++]

  for (const v of rest) { // [!code ++]
    if (isSpreadable(v)) { // [!code ++]
      const len = toLength(v.length); // [!code ++]
      for (let i = 0; i < len; i++) out.push(v[i]); // [!code ++]
    } else {
      out.push(v); // [!code ++]
    }
  }
  return out; // [!code ++]

  function isSpreadable(x) { // [!code ++]
    if (Array.isArray(x)) return true; // [!code ++]
    if (Object.prototype.toString.call(x) === '[object Arguments]') return true; // [!code ++]
    return !!(typeof Symbol === 'function' && Symbol.isConcatSpreadable && x && x[Symbol.isConcatSpreadable]); // [!code ++]
  } // [!code ++]

  function copyArray(src) { // [!code ++]
    const a = new Array(src.length); // [!code ++]
    for (let i = 0; i < src.length; i++) a[i] = src[i]; // [!code ++]
    return a; // [!code ++]
  } // [!code ++]

  function toLength(n) { // [!code ++]
    const num = Number(n); // [!code ++]
    if (!Number.isFinite(num) || num <= 0) return 0; // [!code ++]
    return Math.floor(num); // [!code ++]
  } // [!code ++]
} // [!code ++]
```

## `lodash.cond`

Builds a function from [predicate, action] pairs. When the returned function is called, it runs each predicate with the same arguments (and this), and invokes the first action whose predicate is truthy. If none match, returns undefined.

This “good enough” version preserves this and supports simple iteratee shorthands for predicates:
- function
- property name or path string (dot/bracket)
- [path, value]
- plain object partial match (shallow)

```js
import cond from 'lodash/cond'; // [!code --]
function cond(pairs) { // [!code ++]
  if (!Array.isArray(pairs)) throw new TypeError('Expected an array of [predicate, fn] pairs'); // [!code ++]
  const table = pairs.map((pair, i) => { // [!code ++]
    if (!pair || pair.length !== 2) throw new TypeError(`Pair at index ${i} must be [predicate, fn]`); // [!code ++]
    const [pred, fn] = pair; // [!code ++]
    if (typeof fn !== 'function') throw new TypeError(`Action at index ${i} must be a function`); // [!code ++]
    return [toIteratee(pred), fn]; // [!code ++]
  }); // [!code ++]

  return function(...args) { // [!code ++]
    for (const [pred, fn] of table) { // [!code ++]
      if (pred.apply(this, args)) return fn.apply(this, args); // [!code ++]
    } // [!code ++]
  }; // [!code ++]

  function toIteratee(v) { // [!code ++]
    if (typeof v === 'function') return v; // [!code ++]
    if (v == null) return x => x; // identity // [!code ++]
    if (Array.isArray(v) && v.length === 2) { // [path, value] // [!code ++]
      const [path, expected] = v; // [!code ++]
      return obj => eq(get(obj, path), expected); // [!code ++]
    } // [!code ++]
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'symbol') { // [!code ++]
      return obj => get(obj, v); // property/path accessor (truthy) // [!code ++]
    } // [!code ++]
    if (typeof v === 'object') { // shallow partial match // [!code ++]
      const src = v; // [!code ++]
      const keys = Reflect.ownKeys(src); // [!code ++]
      return obj => { // [!code ++]
        if (obj == null) return false; // [!code ++]
        for (const k of keys) if (!eq(obj[k], src[k])) return false; // [!code ++]
        return true; // [!code ++]
      }; // [!code ++]
    } // [!code ++]
    return () => Boolean(v); // constant predicate // [!code ++]
  } // [!code ++]

  function get(obj, path) { // dot/bracket path: 'a.b[0]["c"]' // [!code ++]
    if (Array.isArray(path)) { // [!code ++]
      let o = obj; for (const k of path) { if (o == null) return undefined; o = o[k]; } return o; // [!code ++]
    } // [!code ++]
    if (typeof path !== 'string') return obj == null ? undefined : obj[path]; // [!code ++]
    const parts = []; // [!code ++]
    path.replace(/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])(.*?)\2)\]/g, (m, num, q, str) => { // [!code ++]
      parts.push(num !== undefined ? Number(num) : (str !== undefined ? str : m)); // [!code ++]
    }); // [!code ++]
    let o = obj; // [!code ++]
    for (const k of parts) { if (o == null) return undefined; o = o[k]; } // [!code ++]
    return o; // [!code ++]
  } // [!code ++]

  function eq(a, b) { return a === b || (a !== a && b !== b); } // NaN-safe === // [!code ++]
} // [!code ++]
```

## `lodash.conforms`

Returns a predicate that checks whether an object “conforms” to a spec of predicate functions. Each source key maps to a function that is invoked with the target’s value at that key. All predicates must return truthy. Inherited properties are allowed (key in obj). Missing keys fail; present-but-undefined values are passed to the predicate.

```js
import conforms from 'lodash/conforms'; // [!code --]
function conforms(source) { // [!code ++]
  const src = source == null ? {} : source; // treat null/undefined as {} // [!code ++]
  const keys = Object.keys(src); // only own enumerable string keys (lodash behavior) // [!code ++]
  const preds = {}; // [!code ++]

  for (const k of keys) { // [!code ++]
    const fn = src[k]; // [!code ++]
    if (typeof fn !== 'function') { // [!code ++]
      throw new TypeError(`Expected predicate function for key "${String(k)}"`); // [!code ++]
    } // [!code ++]
    preds[k] = fn; // [!code ++]
  } // [!code ++]

  return function(object) { // [!code ++]
    if (keys.length === 0) return true; // {} matches anything // [!code ++]
    if (object == null) return false; // non-empty spec can’t match null/undefined // [!code ++]
    const obj = Object(object); // allow primitives and inherited props // [!code ++]

    for (const k of keys) { // [!code ++]
      const v = obj[k]; // inherited lookup allowed // [!code ++]
      if (v === undefined && !(k in obj)) return false; // missing key // [!code ++]
      if (!preds[k](v)) return false; // predicate must be truthy // [!code ++]
    } // [!code ++]
    return true; // [!code ++]
  }; // [!code ++]
} // [!code ++]
```

## `lodash.conformsTo`

Checks if an object conforms to a spec of predicate functions. Only the spec’s own enumerable string keys are used. Predicates receive the object’s value at that key; inherited properties are allowed (key in obj). An empty spec matches anything. If source is null/undefined, returns true.

```js
import conformsTo from 'lodash/conformsTo'; // [!code --]
function conformsTo(object, source) { // [!code ++]
  if (source == null) return true; // lodash: null/undefined source -> true // [!code ++]
  const keys = Object.keys(source); // own enumerable string keys only // [!code ++]
  if (object == null) return keys.length === 0; // empty spec matches null/undefined // [!code ++]
  const obj = Object(object); // allow primitives and inherited lookup // [!code ++]

  for (const k of keys) { // [!code ++]
    const pred = source[k]; // [!code ++]
    if (typeof pred !== 'function') { // match lodash’s call-time error // [!code ++]
      throw new TypeError(`Expected predicate function for key "${String(k)}"`); // [!code ++]
    } // [!code ++]
    const v = obj[k]; // inherited properties allowed // [!code ++]
    if (v === undefined && !(k in obj)) return false; // missing key // [!code ++]
    if (!pred(v)) return false; // predicate must be truthy // [!code ++]
  } // [!code ++]
  return true; // [!code ++]
} // [!code ++]
```

<!-- --- FINISHED THERE --- -->

## `lodash.constant`

Creates a function that always returns the provided value. Works for any value (including objects/arrays/functions); for reference types it returns the same reference each time.

```js
import constant from 'lodash/constant'; // [!code --]
const constant = (value) => () => value; // [!code ++]

const object = { user: 'fred' }
const getter = constant(object)

console.log(getter() === object) // true
console.log(getter()) // { user: 'fred' }
```

## `lodash.countBy`

Counts elements in a collection by a key generated from each item. Works with arrays, array‑likes, and plain objects (own enumerable string keys). The iteratee defaults to identity and supports simple shorthands:

- function
- property path string (dot/bracket)
- number/symbol key
- [path, value] (matchesProperty → counts true/false)
- plain object (partial match → counts true/false)

```js
import countBy from 'lodash/countBy'; // [!code --]
function countBy(collection, iteratee) { // [!code ++]
  if (collection == null) return {}; // [!code ++]
  const fn = toIteratee(iteratee); // [!code ++]
  const out = {}; // [!code ++]

  if (isArrayLike(collection)) { // [!code ++]
    const len = collection.length >>> 0; // [!code ++]
    for (let i = 0; i < len; i++) { // [!code ++]
      add(out, fn(collection[i])); // [!code ++]
    }
  } else {
    for (const k of Object.keys(collection)) add(out, fn(collection[k])); // [!code ++]
  }
  return out; // [!code ++]

  function add(obj, keyRaw) { // [!code ++]
    const key = typeof keyRaw === 'symbol' ? keyRaw : String(keyRaw); // [!code ++]
    obj[key] = Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] + 1 : 1; // [!code ++]
  } // [!code ++]

  function isArrayLike(v) { // [!code ++]
    return v != null && typeof v.length === 'number' && v.length >= 0 && typeof v !== 'function'; // [!code ++]
  } // [!code ++]

  function toIteratee(v) { // [!code ++]
    if (typeof v === 'function') return v; // [!code ++]
    if (v == null) return x => x; // identity // [!code ++]
    if (typeof v === 'string') return o => get(o, v); // [!code ++]
    if (typeof v === 'number' || typeof v === 'symbol') return o => (o == null ? undefined : o[v]); // [!code ++]
    if (Array.isArray(v)) { // [!code ++]
      if (v.length === 2) { const [path, expected] = v; return o => eq(get(o, path), expected); } // [!code ++]
      return o => get(o, v); // [!code ++]
    }
    if (typeof v === 'object') { // [!code ++]
      const src = v, ks = Object.keys(src); // [!code ++]
      return o => ks.every(k => eq(o && o[k], src[k])); // [!code ++]
    }
    return x => x; // [!code ++]
  } // [!code ++]

  function get(obj, path) { // [!code ++]
    if (Array.isArray(path)) { let o = obj; for (const k of path) { if (o == null) return undefined; o = o[k]; } return o; } // [!code ++]
    if (typeof path !== 'string') return obj == null ? undefined : obj[path]; // [!code ++]
    const parts = []; // [!code ++]
    path.replace(/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])(.*?)\2)\]/g, (m, num, q, str) => { // [!code ++]
      parts.push(num !== undefined ? Number(num) : (str !== undefined ? str : m)); // [!code ++]
    }); // [!code ++]
    let o = obj; for (const k of parts) { if (o == null) return undefined; o = o[k]; } return o; // [!code ++]
  } // [!code ++]

  function eq(a, b) { return a === b || (a !== a && b !== b); } // [!code ++]
} // [!code ++]
```

## `lodash.create`

Creates an object that inherits from the given prototype, then shallow‑assigns own enumerable string‑keyed properties from the second argument onto it. If prototype isn’t object-like (null/primitive), returns a plain object {}. Note: unlike Object.create(proto, descriptors), the second argument is NOT treated as property descriptors.

```js
import create from 'lodash/create'; // [!code --]
function create(prototype, properties) { // [!code ++]
  const obj = (prototype != null && (typeof prototype === 'object' || typeof prototype === 'function')) // [!code ++]
    ? Object.create(prototype) // [!code ++]
    : {}; // [!code ++]

  if (properties != null) { // [!code ++]
    for (const k of Object.keys(Object(properties))) { // [!code ++]
      obj[k] = properties[k]; // [!code ++]
    } // [!code ++]
  } // [!code ++]

  return obj; // [!code ++]
} // [!code ++]
```

## `lodash.curry`

Returns a function that keeps collecting arguments (across calls) until it has at least arity non‑placeholder args, then calls the original. Preserves this. Supports placeholders via curry.placeholder; the returned function also exposes .placeholder.

```js
import curry from 'lodash/curry'; // [!code --]
function curry(fn, arity) { // [!code ++]
  if (typeof fn !== 'function') throw new TypeError('Expected a function'); // [!code ++]
  const ph = curry.placeholder; // [!code ++]
  const a = Math.max(arity == null ? fn.length : (arity | 0), 0); // [!code ++]

  function curried(collected) { // [!code ++]
    return function(...args) { // [!code ++]
      const filled = collected.slice(); // [!code ++]
      let i = 0; // [!code ++]
      for (let j = 0; j < filled.length && i < args.length; j++) { // [!code ++]
        if (filled[j] === ph) filled[j] = args[i++]; // [!code ++]
      } // [!code ++]
      while (i < args.length) filled.push(args[i++]); // [!code ++]

      let count = 0; // [!code ++]
      for (const v of filled) if (v !== ph) count++; // [!code ++]

      if (count >= a) {// [!code ++]
        const finalArgs = []; // [!code ++]
        for (const v of filled) if (v !== ph) finalArgs.push(v); // [!code ++]
        return fn.apply(this, finalArgs); // [!code ++]
      } // [!code ++]

      const next = curried(filled); // [!code ++]
      next.placeholder = ph; // [!code ++]
      return next; // [!code ++]
    }; // [!code ++]
  } // [!code ++]

  const out = curried([]); // [!code ++]
  out.placeholder = ph; // [!code ++]
  return out; // [!code ++]
} // [!code ++]
curry.placeholder = {}; // [!code ++]
```

## `lodash.curryRight`

Like curry, but collects arguments from the right. Each call prepends new args to the left of the collected list; when the number of non‑placeholder args reaches arity (defaults to fn.length), the original function is invoked with args ordered right-to-left. Preserves this. Supports placeholders via curryRight.placeholder.

```js
import curryRight from 'lodash/curryRight'; // [!code --]
function curryRight(fn, arity) { // [!code ++]
  if (typeof fn !== 'function') throw new TypeError('Expected a function'); // [!code ++]
  const ph = curryRight.placeholder; // [!code ++]
  const a = Math.max(arity == null ? fn.length : (arity | 0), 0); // [!code ++]

  function curried(collected) { // [!code ++]
    return function(...args) { // [!code ++]
      const filled = collected.slice(); // [!code ++]
      let i = args.length - 1; // [!code ++]
      for (let j = filled.length - 1; j >= 0 && i >= 0; j--) { // [!code ++]
        if (filled[j] === ph) filled[j] = args[i--]; // [!code ++]
      } // [!code ++]
      const merged = args.slice(0, i + 1).concat(filled); // [!code ++]

      let count = 0; for (const v of merged) if (v !== ph) count++; // [!code ++]

      if (count >= a) { // [!code ++]
        const finalArgs = []; // [!code ++]
        for (const v of merged) if (v !== ph) finalArgs.push(v); // [!code ++]
        return fn.apply(this, finalArgs); // [!code ++]
      } // [!code ++]

      const next = curried(merged); // [!code ++]
      next.placeholder = ph; // [!code ++]
      return next; // [!code ++]
    }; // [!code ++]
  } // [!code ++]

  const out = curried([]); // [!code ++]
  out.placeholder = ph; // [!code ++]
  return out; // [!code ++]
} // [!code ++]
curryRight.placeholder = {}; // [!code ++]
```

## `lodash.debounce`

Creates a debounced function that delays invoking fn until after wait ms have elapsed since the last call. Options:
- leading: invoke on the leading edge
- trailing: invoke on the trailing edge (default true)
- maxWait: ensure fn is invoked at least once every maxWait ms

The debounced function has .cancel() and .flush() methods.

```js
import debounce from 'lodash/debounce'; // [!code --]
function debounce(fn, wait = 0, options) { // [!code ++]
  if (typeof fn !== 'function') throw new TypeError('Expected a function'); // [!code ++]

  let leading = false; // [!code ++]
  let trailing = true; // [!code ++]
  let maxing = false; // [!code ++]
  let maxWait; // [!code ++]

  if (options && typeof options === 'object') { // [!code ++]
    leading = !!options.leading; // [!code ++]
    trailing = 'trailing' in options ? !!options.trailing : trailing; // [!code ++]
    if ('maxWait' in options) { // [!code ++]
      maxing = true; // [!code ++]
      maxWait = Math.max(Number(options.maxWait) || 0, Number(wait) || 0); // [!code ++]
    } // [!code ++]
  } // [!code ++]

  wait = Number(wait) || 0; // [!code ++]

  let timerId; // [!code ++]
  let lastArgs; // [!code ++]
  let lastThis; // [!code ++]
  let lastCallTime; // [!code ++]
  let lastInvokeTime = 0; // [!code ++]
  let result; // [!code ++]

  function now() { return Date.now(); } // [!code ++]

  function invoke(time) { // [!code ++]
    const args = lastArgs, thisArg = lastThis; // [!code ++]
    lastArgs = lastThis = undefined; // [!code ++]
    lastInvokeTime = time; // [!code ++]
    result = fn.apply(thisArg, args); // [!code ++]
    return result; // [!code ++]
  } // [!code ++]

  function leadingEdge(time) { // [!code ++]
    lastInvokeTime = time; // [!code ++]
    timerId = setTimeout(timerExpired, wait); // [!code ++]
    return leading ? invoke(time) : result; // [!code ++]
  } // [!code ++]

  function remainingWait(time) { // [!code ++]
    const timeSinceLastCall = time - lastCallTime; // [!code ++]
    const timeSinceLastInvoke = time - lastInvokeTime; // [!code ++]
    const timeWaiting = wait - timeSinceLastCall; // [!code ++]
    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting; // [!code ++]
  } // [!code ++]

  function shouldInvoke(time) { // [!code ++]
    const timeSinceLastCall = time - lastCallTime; // [!code ++]
    const timeSinceLastInvoke = time - lastInvokeTime; // [!code ++]
    return (lastCallTime === undefined) // [!code ++]
      || (timeSinceLastCall >= wait) // [!code ++]
      || (timeSinceLastCall < 0) // [!code ++]
      || (maxing && timeSinceLastInvoke >= maxWait); // force invoke // [!code ++]
  } // [!code ++]

  function timerExpired() { // [!code ++]
    const t = now(); // [!code ++]
    if (shouldInvoke(t)) return trailingEdge(t); // [!code ++]
    timerId = setTimeout(timerExpired, remainingWait(t)); // [!code ++]
  } // [!code ++]

  function trailingEdge(time) { // [!code ++]
    timerId = undefined; // [!code ++]
    if (trailing && lastArgs) return invoke(time); // [!code ++]
    lastArgs = lastThis = undefined; // [!code ++]
    return result; // [!code ++]
  } // [!code ++]

  function cancel() { // [!code ++]
    if (timerId !== undefined) clearTimeout(timerId); // [!code ++]
    lastInvokeTime = 0; // [!code ++]
    lastArgs = lastCallTime = lastThis = timerId = undefined; // [!code ++]
  } // [!code ++]

  function flush() { // [!code ++]
    return timerId === undefined ? result : trailingEdge(now()); // [!code ++]
  } // [!code ++]

  function debounced(...args) { // [!code ++]
    const t = now(); // [!code ++]
    const isInvoking = shouldInvoke(t); // [!code ++]
    lastArgs = args; // [!code ++]
    lastThis = this; // [!code ++]
    lastCallTime = t; // [!code ++]

    if (isInvoking) { // [!code ++]
      if (timerId === undefined) { // [!code ++]
        return leadingEdge(lastCallTime); // [!code ++]
      } // [!code ++]
      if (maxing) { // [!code ++]
        clearTimeout(timerId); // [!code ++]
        timerId = setTimeout(timerExpired, wait); // [!code ++]
        return invoke(lastCallTime); // [!code ++]
      } // [!code ++]
    } // [!code ++]

    if (timerId === undefined) { // [!code ++]
      timerId = setTimeout(timerExpired, wait); // [!code ++]
    } // [!code ++]
    return result; // [!code ++]
  } // [!code ++]

  debounced.cancel = cancel; // [!code ++]
  debounced.flush = flush; // [!code ++]
  return debounced; // [!code ++]
} // [!code ++]
```

<!-- link to perfect-debounce ? -->

## `lodash.deburr`

Strips accents/diacritics from (mostly Latin) text. This “good enough” version uses Unicode NFKD to split base letters and combining marks, removes the marks, and applies a couple of extra Latin fixes (like ß → ss). Nullish input becomes "".

```js
import deburr from 'lodash/deburr'; // [!code --]
function deburr(input) { // [!code ++]
  if (input == null) return ""; // [!code ++]
  let s = String(input); // [!code ++]
  if (!s) return ""; // [!code ++]

  if (typeof s.normalize === "function") { // [!code ++]
    s = s.normalize("NFKD"); // split base letters and marks // [!code ++]
  } // [!code ++]

  try { // [!code ++]
    s = s.replace(/\p{M}+/gu, ""); // [!code ++]
  } catch { // [!code ++]
    s = s.replace(/[\u0300-\u036f\uFE20-\uFE2F\u20D0-\u20FF]/g, ""); // [!code ++]
  } // [!code ++]

  s = s
    .replace(/ß/g, "ss") // [!code ++]
    .replace(/ẞ/g, "SS") // [!code ++]
    .replace(/ı/g, "i"); // [!code ++]

  return s; // [!code ++]
} // [!code ++]
```

## `lodash.defaults`

Assigns missing properties to an object from one or more source objects. It:
- Mutates and returns the target.
- Uses own AND inherited enumerable string keys from sources (like for..in).
- Only sets a key if target[key] is undefined, or if the key is only inherited from Object.prototype (e.g., toString) and not an own property.
- Later sources don’t overwrite values set by earlier ones. Symbols aren’t copied.

```js
import defaults from 'lodash/defaults'; // [!code --]
function defaults(object, ...sources) { // [!code ++]
  const obj = Object(object); // [!code ++]
  for (const src of sources) { // [!code ++]
    if (src == null) continue; // [!code ++]
    for (const key in src) { // [!code ++]
      const val = obj[key]; // [!code ++]
      if ( // [!code ++]
        val === undefined || // truly missing // [!code ++]
        ( // [!code ++]
          !Object.prototype.hasOwnProperty.call(obj, key) && // [!code ++]
          val === Object.prototype[key] // [!code ++]
        ) // [!code ++]
      ) { // [!code ++]
        obj[key] = src[key]; // [!code ++]
      } // [!code ++]
    } // [!code ++]
  } // [!code ++]
  return obj; // [!code ++]
} // [!code ++]
```

## `lodash.defaultsDeep`

Recursively assigns missing properties from one or more sources. It:
- Mutates and returns the target
- Walks own and inherited enumerable string keys (like for..in)
- Only fills when the target value is undefined; otherwise it leaves it alone
- Recurses into plain objects and arrays; other types (Date, RegExp, Map, Set, typed arrays, etc.) are copied only when missing
- Skips dangerous keys like __proto__ and constructor (when it’s a function)
- Handles circular references in sources

```js
import defaultsDeep from 'lodash/defaultsDeep'; // [!code --]
function defaultsDeep(object, ...sources) { // [!code ++]
  if (object == null) return object; // [!code ++]
  const target = Object(object); // [!code ++]
  const srcToDst = new WeakMap(); // [!code ++]

  for (const src of sources) { // [!code ++]
    if (src == null) continue; // [!code ++]
    mergeInto(target, src); // [!code ++]
  } // [!code ++]
  return target; // [!code ++]

  function mergeInto(t, s) { // [!code ++]
    for (const key in s) { // [!code ++]
      if (key === '__proto__') continue; // [!code ++]
      if (key === 'constructor' && typeof s[key] === 'function') continue; // [!code ++]

      const sv = s[key]; // [!code ++]
      const tv = t[key]; // [!code ++]

      if (isMergeable(sv)) { // plain object or array // [!code ++]
        const existing = srcToDst.get(sv); // [!code ++]
        if (existing) { // [!code ++]
          if (tv === undefined) t[key] = existing; // [!code ++]
          continue; // [!code ++]
        } // [!code ++]

        let dst = tv; // [!code ++]
        if (!isMergeable(dst)) { // [!code ++]
          dst = Array.isArray(sv) ? [] : {}; // [!code ++]
          if (tv === undefined) t[key] = dst; // [!code ++]
        } // [!code ++]

        srcToDst.set(sv, dst); // [!code ++]
        mergeInto(dst, sv); // [!code ++]
      } else {
        if (tv === undefined) t[key] = sv; // [!code ++]
      }
    } // [!code ++]
  } // [!code ++]

  function isMergeable(x) { // [!code ++]
    return x != null && (Array.isArray(x) || isPlainObject(x)); // [!code ++]
  } // [!code ++]

  function isPlainObject(x) { // [!code ++]
    if (Object.prototype.toString.call(x) !== '[object Object]') return false; // [!code ++]
    const proto = Object.getPrototypeOf(x); // [!code ++]
    return proto === null || proto === Object.prototype; // [!code ++]
  } // [!code ++]
} // [!code ++]
```

## `lodash.defaultto`

Returns defaultValue when value is null, undefined, or NaN; otherwise returns value. Unlike the nullish coalescing operator (??), this also treats NaN as “missing.”

```js
import defaultTo from 'lodash/defaultTo'; // [!code --]
function defaultTo(value, defaultValue) { // [!code ++]
  return value == null || value !== value ? defaultValue : value; // [!code ++]
} // [!code ++]
```

## `lodash.defer`

Defers calling a function until the current call stack clears. It schedules a macrotask with setTimeout(..., 1), passes any extra args to the function, and returns the timer id.

```js
import defer from 'lodash/defer'; // [!code --]
function defer(fn, ...args) { // [!code ++]
  if (typeof fn !== 'function') throw new TypeError('Expected a function'); // [!code ++]
  return setTimeout(() => { fn(...args); }, 1); // [!code ++]
} // [!code ++]
```

## `lodash.delay`

Schedules a function to run after wait milliseconds, forwarding any extra arguments. Returns the timer id. Wait is coerced to a number (NaN -> 0).

```js
import delay from 'lodash/delay'; // [!code --]
function delay(fn, wait, ...args) { // [!code ++]
  if (typeof fn !== 'function') throw new TypeError('Expected a function'); // [!code ++]
  const ms = Number(wait) || 0; // [!code ++]
  return setTimeout(() => { fn.apply(undefined, args); }, ms); // [!code ++]
} // [!code ++]
```

## `lodash.difference`

Returns a new array of values from the first array that are not present in the other arrays. Uses SameValueZero equality (so NaN matches NaN, -0 equals 0). Flattens only one level of the “values” inputs.

```js
import difference from 'lodash/difference'; // [!code --]
function difference(array, ...values) { // [!code ++]
  const arr = Array.from(array ?? []); // [!code ++]
  if (values.length === 0) return arr.slice(); // [!code ++]

  const exclude = new Set( // [!code ++]
    values.flatMap(v => (v == null ? [] : Array.from(v))) // [!code ++]
  ); // [!code ++]

  return arr.filter(x => !exclude.has(x)); // [!code ++]
} // [!code ++]
```

## `lodash.differenceBy`

Like difference, but compares values after running them through an iteratee. Returns the elements of the first array whose transformed values aren’t present in the transformed “values” arrays.

- Flattens the “values” inputs one level
- Iteratee can be a function, a property path string (dot/bracket), or a key (number/symbol)
- If the last argument is array-like, it’s treated as part of “values” (no iteratee)
- Uses SameValueZero equality on transformed values (NaN equals NaN, -0 equals 0)

```js
import differenceBy from 'lodash/differenceBy'; // [!code --]
function differenceBy(array, ...rest) { // [!code ++]
  const arr = Array.from(array ?? []); // [!code ++]
  if (arr.length === 0) return []; // [!code ++]

  let iteratee = rest[rest.length - 1]; // [!code ++]
  const isArrayLike = v => v != null && typeof v === 'object' && typeof v.length === 'number'; // [!code ++]
  const hasIteratee = rest.length > 0 && !isArrayLike(iteratee); // [!code ++]
  const valuesLists = hasIteratee ? rest.slice(0, -1) : rest; // [!code ++]
  const fn = toIteratee(hasIteratee ? iteratee : x => x); // [!code ++]

  const flatValues = valuesLists.flatMap(v => (v == null ? [] : Array.from(v))); // [!code ++]
  const exclude = new Set(flatValues.map(fn)); // SameValueZero in Set // [!code ++]

  return arr.filter(x => !exclude.has(fn(x))); // [!code ++]

  function toIteratee(v) { // [!code ++]
    if (typeof v === 'function') return v; // [!code ++]
    if (typeof v === 'string') return o => get(o, v); // path string // [!code ++]
    if (typeof v === 'number' || typeof v === 'symbol') return o => (o == null ? undefined : o[v]); // [!code ++]
    return x => x; // [!code ++]
  } // [!code ++]

  function get(obj, path) { // [!code ++]
    if (Array.isArray(path)) { let o = obj; for (const k of path) { if (o == null) return undefined; o = o[k]; } return o; } // [!code ++]
    if (typeof path !== 'string') return obj == null ? undefined : obj[path]; // [!code ++]
    const parts = []; // [!code ++]
    path.replace(/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])(.*?)\2)\]/g, (m, num, q, str) => {
      parts.push(num !== undefined ? Number(num) : (str !== undefined ? str : m));
    }); // [!code ++]
    let o = obj; for (const k of parts) { if (o == null) return undefined; o = o[k]; } return o; // [!code ++]
  } // [!code ++]
} // [!code ++]
```

## `lodash.differenceWith`

## lodash.differenceWith

Like difference, but lets you supply a custom comparator(a, b) to decide equality. Returns elements from the first array that aren’t considered equal to any element in the other arrays.

- Flattens the “values” inputs one level
- If the last arg is array-like, it’s treated as part of “values” (no comparator)
- Comparator receives (arrVal, othVal) and should return true when equal
- No iteratee transform here; use differenceBy for that

```js
import differenceWith from 'lodash/differenceWith'; // [!code --]
function differenceWith(array, ...rest) { // [!code ++]
  const arr = Array.from(array ?? []); // [!code ++]
  if (arr.length === 0) return []; // [!code ++]

  const maybe = rest[rest.length - 1]; // [!code ++]
  const isArrayLike = v => v != null && typeof v === 'object' && typeof v.length === 'number'; // [!code ++]
  const comparator = rest.length && !isArrayLike(maybe) ? maybe : undefined; // [!code ++]
  const lists = comparator ? rest.slice(0, -1) : rest; // [!code ++]

  const flatValues = lists.flatMap(v => (v == null ? [] : Array.from(v))); // [!code ++]
  if (!comparator) { // [!code ++]
    const exclude = new Set(flatValues); // [!code ++]
    return arr.filter(x => !exclude.has(x)); // [!code ++]
  }

  return arr.filter(a => !flatValues.some(b => comparator(a, b))); // [!code ++]
} // [!code ++]
```

## `lodash.divide`

Divides two values with lodash-y coercion rules:
- If both are undefined, returns 1.
- If one is undefined, returns the other.
- If either arg is a string, both are converted to strings first (then JS / coerces to numbers).
- Otherwise both are coerced to numbers. Symbols become NaN.

```js
import divide from 'lodash/divide'; // [!code --]
function divide(a, b) { // [!code ++]
  if (a === undefined && b === undefined) return 1; // [!code ++]
  let result = a !== undefined ? a : undefined; // [!code ++]

  if (b !== undefined) { // [!code ++]
    if (result === undefined) return b; // [!code ++]
    const strMode = (typeof a === 'string') || (typeof b === 'string'); // [!code ++]
    const toNum = v => (typeof v === 'symbol' ? NaN : +v); // [!code ++]
    const toStr = v => String(v); / [!code ++]
    const x = strMode ? toStr(a) : toNum(a); // [!code ++]
    const y = strMode ? toStr(b) : toNum(b); // [!code ++]
    result = x / y; // [!code ++]
  } // [!code ++]

  return result; // [!code ++]
} // [!code ++]
```

## `lodash.drop`

Returns a slice of array with n elements dropped from the start. Defaults to 1. Accepts array-like input.

- n is coerced to an integer (truncated). NaN/undefined -> default 1; negative -> treated as 0.
- If guard is truthy (internal iteratee calls), it uses the default of 1.
- Nullish input returns [].

```js
import drop from 'lodash/drop'; // [!code --]
function drop(array, n, guard) { // [!code ++]
  if (array == null) return []; // [!code ++]
  const len = array.length >>> 0; // array-like safe // [!code ++]
  let count = (guard || n === undefined) ? 1 : Math.trunc(Number(n) || 0); // [!code ++]
  if (count < 0) count = 0; // [!code ++]
  if (count >= len) return []; // [!code ++]
  const out = new Array(len - count); // [!code ++]
  for (let i = count, j = 0; i < len; i++, j++) out[j] = array[i]; // [!code ++]
  return out; // [!code ++]
} // [!code ++]
```

## `lodash.dropRight`

Returns a slice of array with n elements dropped from the end. Defaults to 1. Accepts array-like input.

- n is coerced to an integer (truncated). NaN/undefined -> default 1; negative -> treated as 0 (returns original array).
- If guard is truthy (internal iteratee calls), uses the default of 1.
- Nullish input returns [].

```js
import dropRight from 'lodash/dropRight'; // [!code --]
function dropRight(array, n, guard) { // [!code ++]
  if (array == null) return []; // [!code ++]
  const len = array.length >>> 0; // [!code ++]
  if (len === 0) return []; // [!code ++]

  let count = (guard || n === undefined) ? 1 : Math.trunc(Number(n) || 0); // [!code ++]
  if (count < 0) count = 0; // [!code ++]

  let end = len - count; // [!code ++]
  if (end < 0) end = 0; // [!code ++]
  if (end > len) end = len; // [!code ++]

  const out = new Array(end); // [!code ++]
  for (let i = 0; i < end; i++) out[i] = array[i]; // [!code ++]
  return out; // [!code ++]
} // [!code ++]
```

## `lodash.dropRightWhile`

Creates a slice of array excluding elements dropped from the end while predicate returns truthy. Once predicate is falsey, it stops and returns the remaining front part.

- Predicate receives (value, index, array)
- Shorthands: function, property path string, [path, value], plain object
- Nullish input returns []

```js
import dropRightWhile from 'lodash/dropRightWhile'; // [!code --]
function dropRightWhile(array, predicate) { // [!code ++]
  const len = array == null ? 0 : (array.length >>> 0); // [!code ++]
  if (!len) return []; // [!code ++]
  const fn = toIteratee(predicate); // [!code ++]

  let i = len - 1; // [!code ++]
  for (; i >= 0; i--) { if (!fn(array[i], i, array)) break; } // [!code ++]

  const end = i + 1; // [!code ++]
  const out = new Array(end); // [!code ++]
  for (let j = 0; j < end; j++) out[j] = array[j]; // [!code ++]
  return out; // [!code ++]

  function toIteratee(v) { // [!code ++]
    if (typeof v === 'function') return v; // [!code ++]
    if (v == null) return x => x; // [!code ++]
    if (Array.isArray(v) && v.length === 2) { // [path, value] // [!code ++]
      const [path, expected] = v; return obj => eq(get(obj, path), expected); // [!code ++]
    }
    if (typeof v === 'object') { // [!code ++]
      const src = v, ks = Reflect.ownKeys(src); // [!code ++]
      return obj => { if (obj == null) return false; for (const k of ks) if (!eq(obj[k], src[k])) return false; return true; }; // [!code ++]
    }
    return obj => get(obj, v); // [!code ++]
  } // [!code ++]

  function get(obj, path) { // [!code ++]
    if (Array.isArray(path)) { let o = obj; for (const k of path) { if (o == null) return undefined; o = o[k]; } return o; } // [!code ++]
    if (typeof path !== 'string') return obj == null ? undefined : obj[path]; // [!code ++]
    const parts = []; // [!code ++]
    path.replace(/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])(.*?)\2)\]/g, (m, num, q, str) => { // [!code ++]
      parts.push(num !== undefined ? Number(num) : (str !== undefined ? str : m)); // [!code ++]
    }); // [!code ++]
    let o = obj; for (const k of parts) { if (o == null) return undefined; o = o[k]; } return o; // [!code ++]
  } // [!code ++]

  function eq(a, b) { return a === b || (a !== a && b !== b); } // [!code ++]
} // [!code ++]
```

## `lodash.dropWhile`

Creates a slice of array excluding elements dropped from the beginning while predicate returns truthy. Once predicate is falsey, it stops and returns the rest.

- Predicate is called with (value, index, array)
- Shorthand supported: function, property path string, [path, value], plain object
- Nullish input returns []

```js
import dropWhile from 'lodash/dropWhile'; // [!code --]
function dropWhile(array, predicate) { // [!code ++]
  const len = array == null ? 0 : (array.length >>> 0); // [!code ++]
  if (!len) return []; // [!code ++]
  const fn = toIteratee(predicate); // [!code ++]

  let i = 0; // [!code ++]
  for (; i < len; i++) { if (!fn(array[i], i, array)) break; } // [!code ++]

  const outLen = len - i; // [!code ++]
  const out = new Array(outLen); // [!code ++]
  for (let j = 0; j < outLen; j++) out[j] = array[i + j]; // [!code ++]
  return out; // [!code ++]

  function toIteratee(v) { // [!code ++]
    if (typeof v === 'function') return v; // [!code ++]
    if (v == null) return x => x; // [!code ++]
    if (Array.isArray(v) && v.length === 2) { / [!code ++]
      const [path, expected] = v; return obj => eq(get(obj, path), expected); // [!code ++]
    }
    if (typeof v === 'object') { // [!code ++]
      const src = v, ks = Reflect.ownKeys(src); // [!code ++]
      return obj => { if (obj == null) return false; for (const k of ks) if (!eq(obj[k], src[k])) return false; return true; }; // [!code ++]
    }
    return obj => get(obj, v); // [!code ++]
  } // [!code ++]

  function get(obj, path) { // dot/bracket paths // [!code ++]
    if (Array.isArray(path)) { let o = obj; for (const k of path) { if (o == null) return undefined; o = o[k]; } return o; } // [!code ++]
    if (typeof path !== 'string') return obj == null ? undefined : obj[path]; // [!code ++]
    const parts = []; // [!code ++]
    path.replace(/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])(.*?)\2)\]/g, (m, num, q, str) => { // [!code ++]
      parts.push(num !== undefined ? Number(num) : (str !== undefined ? str : m)); // [!code ++]
    }); // [!code ++]
    let o = obj; for (const k of parts) { if (o == null) return undefined; o = o[k]; } return o; // [!code ++]
  } // [!code ++]

  function eq(a, b) { return a === b || (a !== a && b !== b); } // NaN-safe // [!code ++]
} // [!code ++]
```

<!-- STOPPED THERE -->

## `lodash.get`

`lodash.get` safely accesses a property at a given path of an object. In modern JavaScript, this can be directly replaced with the optional chaining (`?.`) operator combined with default values (`??`).

```js
var get = require('lodash.get') // [!code --]
const get = (obj, path, defaultValue) => {
  return path
    .split('.')
    .reduce((acc, key) => acc?.[key], obj) ?? defaultValue
} // [!code ++]

const user = { profile: { name: 'Alice' } }

console.log(get(user, 'profile.name', 'Unknown'))   // "Alice"
console.log(get(user, 'profile.age', 30))           // 30
console.log(get(user, 'account.settings.theme', 'light')) // "light"
```

## `lodash.identity`

`lodash.identity` simply returns the first argument provided to it.
In plain JavaScript, you can replace it with a one‑liner arrow function:

```js
var identity = require('lodash.identity') // [!code --]
const identity = x => x // [!code ++]

const object = { user: 'fred' }
console.log(identity(object) === object) // true
console.log(identity(42)) // 42
console.log(identity(null)) // null
```

## `lodash.isarray`

This package is deprecated - use the native `Array.isArray` instead.

```js
var isArray = require('lodash.isarray') // [!code --]
const isArray = Array.isArray // [!code ++]

isArray([1, 2, 3]) // => true
isArray('abc')     // => false
```

## `lodash.isarraybuffer`

Checks whether a value is an ArrayBuffer. For most use cases a tiny inline function is enough:

```js
var isArrayBuffer = require('lodash.isarraybuffer') // [!code --]
const isArrayBuffer = value => Object.prototype.toString.call(value) === '[object ArrayBuffer]' // [!code ++]
```

## `lodash.isboolean`

`lodash.isboolean` checks if a value is classified as a boolean (either a primitive or a `Boolean` object). This can be replaced with a simple `typeof` check and an `instanceof Boolean`.

```js
var isBoolean = require('lodash.isboolean') // [!code --]
const isBoolean = (value) => typeof value === 'boolean' || value instanceof Boolean // [!code ++]

console.log(isBoolean(false))            // true
console.log(isBoolean(true))             // true
console.log(isBoolean(new Boolean(true)))// true
console.log(isBoolean(null))             // false
console.log(isBoolean('true'))           // false
```

## `lodash.isbuffer`

`lodash.isbuffer` checks if a value is a Node.js `Buffer`. You can replace it directly with the built-in `Buffer.isBuffer`.

```js
var isBuffer = require('lodash.isbuffer') // [!code --]
const isBuffer = Buffer.isBuffer          // [!code ++]

console.log(isBuffer(Buffer.from('hi')))  // true
console.log(isBuffer(new Uint8Array(2)))  // false
console.log(isBuffer('not a buffer'))     // false
```

## `lodash.iselement`

`lodash.iselement` checks if a value is a DOM element. In modern JavaScript you can replace it with a simple `instanceof Element` check.

```js
var isElement = require('lodash.iselement') // [!code --]
const isElement = (value) => value instanceof Element // [!code ++]

console.log(isElement(document.body)) // true
console.log(isElement('<body>'))      // false
console.log(isElement({ nodeType: 1 })) // false
```

## `lodash.isequal`

`lodash.isequal` checks deep equality of values. In modern Node.js you can replace it with the built-in [`util.isDeepStrictEqual`](https://nodejs.org/api/util.html#utilisdeepstrictequalval1-val2).

```js
var isEqual = require('lodash.isequal') // [!code --]
const { isDeepStrictEqual: isEqual } = require('node:util') // [!code ++]

console.log(isEqual({ a: 1 }, { a: 1 })) // true
console.log(isEqual([1, 2, 3], [1, 2, 3])) // true
console.log(isEqual({ a: 1 }, { a: '1' })) // false
```

## `lodash.isfinite`

`lodash.isfinite` checks if a value is a finite number primitive. In modern JavaScript this is covered by the built-in [`Number.isFinite`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite).

```js
var isFinite = require('lodash.isfinite') // [!code --]
const isFinite = Number.isFinite          // [!code ++]

console.log(isFinite(3))              // true
console.log(isFinite(Number.MIN_VALUE)) // true
console.log(isFinite(Infinity))       // false
console.log(isFinite('3'))            // false
```

## `lodash.isinteger`

`lodash.isinteger` checks if a value is an integer. In modern JavaScript this is directly covered by the built-in [`Number.isInteger`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger).

```js
var isInteger = require('lodash.isinteger') // [!code --]
const isInteger = Number.isInteger          // [!code ++]

console.log(isInteger(3))              // true
console.log(isInteger(Number.MIN_VALUE)) // false
console.log(isInteger(Infinity))       // false
console.log(isInteger('3'))            // false
```

## `lodash.islength`

`lodash.islength` checks if a value is a valid array-like length: a non-negative, safe integer within JavaScript’s maximum safe integer range. This can be replicated with a simple inline check.

```js
var isLength = require('lodash.islength') // [!code --]
const isLength = (value) =>
  typeof value === 'number' &&
  value > -1 &&
  value % 1 === 0 &&
  value <= Number.MAX_SAFE_INTEGER // [!code ++]

console.log(isLength(3))                // true
console.log(isLength(Number.MIN_VALUE)) // false
console.log(isLength(Infinity))         // false
console.log(isLength('3'))              // false
```

## `lodash.isnan`

`lodash.isnan` checks if a value is precisely `NaN` (not just any non-numeric value). This is equivalent to using the built-in [`Number.isNaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN), which avoids the pitfalls of the global `isNaN`.

```js
var isNaN = require('lodash.isnan') // [!code --]
const isNaN = Number.isNaN          // [!code ++]

console.log(isNaN(NaN))             // true
console.log(isNaN(new Number(NaN))) // true
console.log(isNaN(undefined))       // false
console.log(isNaN('foo'))           // false
```

## `lodash.isnil`

`lodash.isnil` checks if a value is `null` or `undefined`. You can replace it directly with a simple nullish check.

```js
var isNil = require('lodash.isnil') // [!code --]
const isNil = (value) => value == null // [!code ++]

console.log(isNil(null))      // true
console.log(isNil(undefined)) // true
console.log(isNil(NaN))       // false
```

## `lodash.isnull`

`lodash.isnull` checks if a value is exactly `null`. This can be replaced directly with a strict equality check.

```js
var isNull = require('lodash.isnull') // [!code --]
const isNull = (value) => value === null // [!code ++]

console.log(isNull(null))      // true
console.log(isNull(undefined)) // false
```

## `lodash.isnumber`

`lodash.isnumber` checks if a value is classified as a number (either a primitive or a `Number` object). This can be replaced directly with a `typeof` check and `instanceof Number`.

```js
var isNumber = require('lodash.isnumber') // [!code --]
const isNumber = (value) => typeof value === 'number' || value instanceof Number // [!code ++]

console.log(isNumber(3))               // true
console.log(isNumber(Number.MIN_VALUE))// true
console.log(isNumber(Infinity))        // true
console.log(isNumber('3'))             // false
console.log(isNumber(new Number(5)))   // true
```

## `lodash.isobject`

`lodash.isobject` checks if a value is of the language type *Object* (including arrays, functions, objects, regexes, and wrapper objects like `new Number(0)`). This can be replaced with a straightforward type check.

```js
var isObject = require('lodash.isobject') // [!code --]
const isObject = (value) =>
  !!value && (typeof value === 'object' || typeof value === 'function') // [!code ++]

console.log(isObject({}))            // true
console.log(isObject([1, 2, 3]))     // true
console.log(isObject(() => {}))      // true
console.log(isObject(1))             // false
console.log(isObject(null))          // false
```

## `lodash.isregexp`

lodash.isRegExp uses Node internals when available but otherwise falls back to a toString check. For almost all use cases you can replace it with a tiny inline function:

```js
var isRegExp = require('lodash.isregexp') // [!code --]
const isRegExp = value => Object.prototype.toString.call(value) === '[object RegExp]' // [!code ++]
```

## `lodash.issafeinteger`

`lodash.issafeinteger` checks if a value is a safe integer-an integer within JavaScript’s IEEE-754 safe range (`-(2^53 - 1)` to `2^53 - 1`). In modern JavaScript this is directly covered by the built-in [`Number.isSafeInteger`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).

```js
var isSafeInteger = require('lodash.issafeinteger') // [!code --]
const isSafeInteger = Number.isSafeInteger          // [!code ++]

console.log(isSafeInteger(3))                  // true
console.log(isSafeInteger(Number.MIN_VALUE))   // false
console.log(isSafeInteger(Infinity))           // false
console.log(isSafeInteger('3'))                // false
console.log(isSafeInteger(Math.pow(2, 53) - 1))// true
```

## `lodash.isstring`

`lodash.isstring` checks if a value is classified as a string (either a primitive or a `String` object). This can be replaced with a simple `typeof` check and an `instanceof String`.

```js
var isString = require('lodash.isstring') // [!code --]
const isString = (value) => typeof value === 'string' || value instanceof String // [!code ++]

console.log(isString('abc'))          // true
console.log(isString(new String(''))) // true
console.log(isString(123))            // false
console.log(isString(['a', 'b']))     // false
```

## `lodash.issymbol`

`lodash.issymbol` checks if a value is classified as a symbol (either a primitive or a `Symbol` object). This can be replaced with a simple `typeof` check and an `instanceof Symbol`.

```js
var isSymbol = require('lodash.issymbol') // [!code --]
const isSymbol = (value) => typeof value === 'symbol' || value instanceof Symbol // [!code ++]

console.log(isSymbol(Symbol.iterator)) // true
console.log(isSymbol(Object(Symbol())) // true
console.log(isSymbol('abc'))           // false
console.log(isSymbol(123))             // false
```

## `lodash.isundefined`

`lodash.isundefined` checks if a value is strictly `undefined`. This is equivalent to a direct comparison.

```js
var isUndefined = require('lodash.isundefined') // [!code --]
const isUndefined = (value) => value === undefined // [!code ++]

console.log(isUndefined(undefined)) // true
console.log(isUndefined(void 0))    // true
console.log(isUndefined(null))      // false
console.log(isUndefined(0))         // false
```

## `lodash.lowercase`

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

## `lodash.max`

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

## `lodash.multiply`

lodash.multiply performs numeric multiplication with some type coercion. For the common case (multiply two numeric-like values, treating null/undefined as the multiplicative identity 1) you can replace it with a tiny inline function:

```js
var multiply = require('lodash.multiply') // [!code --]
const multiply = (a, b) => (a == null ? 1 : Number(a)) * (b == null ? 1 : Number(b)) // [!code ++]

multiply(6, 4)      // => 24
multiply('6', 4)    // => 24
multiply(null, 5)   // => 5
multiply(undefined) // => 1
```

## `lodash.negate`

`lodash.negate` creates a new function that negates the result of the given predicate.
In plain JavaScript, you can replace it with a simple function:

```js
var negate = require('lodash.negate') // [!code --]
const negate = fn => {
  if (typeof fn !== 'function') throw new TypeError('Expected a function')
  return (...args) => !fn(...args)
} // [!code ++]

const isEven = n => n % 2 === 0

console.log([1, 2, 3, 4, 5, 6].filter(negate(isEven))) // [1, 3, 5]
console.log(negate(() => true)()) // false
console.log(negate(() => false)()) // true
```

## `lodash.noop`

`lodash.noop` is just a function that does nothing and always returns `undefined`. You can replace it with an empty arrow function.

```js
var noop = require('lodash.noop') // [!code --]
const noop = () => {}             // [!code ++]

console.log(noop())                // undefined
console.log(noop(1, 2, 3))         // undefined
```

## `lodash.now`

`lodash.now` simply returns the current timestamp in milliseconds.
In modern JavaScript you can replace it directly with the built‑in [`Date.now`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/now).

```js
var now = require('lodash.now') // [!code --]
const now = Date.now // [!code ++]

console.log(now()) // e.g. 1756627380015
```

## `lodash.ntharg`

`lodash.nthArg` creates a function that returns the argument at the given index `n`.
In modern JavaScript you can replace it with a higher‑order arrow function:

```js
var nthArg = require('lodash.ntharg') // [!code --]
const nthArg = n => (...args) => args[n < 0 ? args.length + n : n] // [!code ++]

const second = nthArg(1)
console.log(second('a', 'b', 'c', 'd')) // 'b'

const secondLast = nthArg(-2)
console.log(secondLast('a', 'b', 'c', 'd')) // 'c'
```

## `lodash.pick`

`lodash.pick` creates a shallow copy of an object including only specified properties. In modern JavaScript you can replace it with object destructuring and rest/spread syntax.

```js
var pick = require('lodash.pick') // [!code --]
const pick = (obj, keys) =>
  keys.reduce((res, key) => (key in obj && (res[key] = obj[key]), res), {}) // [!code ++]

const user = { id: 1, name: 'Alice', age: 25, role: 'admin' }
console.log(pick(user, ['id', 'name'])) // { id: 1, name: 'Alice' }
```

## `lodash.startswith`

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

## `lodash.stubfalse`


`lodash.stubFalse` is a utility that always returns `false`.
In plain JavaScript, you can replace it with a simple arrow function:

```js
var stubFalse = require('lodash.stubfalse') // [!code --]
const stubFalse = () => false // [!code ++]

console.log(stubFalse()) // false
console.log([1, 2, 3].map(stubFalse)) // [false, false, false]
```

## `lodash.stubtrue`

`lodash.stubTrue` is a utility that always returns `true`.
In plain JavaScript, you can replace it with a simple arrow function:

```js
var stubTrue = require('lodash.stubtrue') // [!code --]
const stubTrue = () => true // [!code ++]

console.log(stubTrue()) // true
console.log([1, 2, 3].map(stubTrue)) // [true, true, true]
```

## `lodash.unary`

`lodash.unary` creates a function that accepts up to one argument, ignoring any additional arguments.
In modern JavaScript you can replace it with a simple higher‑order arrow function that wraps the given function and only takes the first argument:

```js
var unary = require('lodash.unary') // [!code --]
const unary = fn => arg => fn(arg) // [!code ++]

console.log(['6', '8', '10'].map(unary(parseInt))) // [6, 8, 10]

// extra arguments are ignored:
const logFirst = unary((x, y) => [x, y])
console.log(logFirst(1, 2, 3)) // [1, undefined]
```
