---
description: TODO
---

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

`lodash.constant` creates a function that always returns the same value.
In plain JavaScript, you can replace it with an arrow function that closes over the value:

```js
var constant = require('lodash.constant') // [!code --]
const constant = x => () => x // [!code ++]

const object = { user: 'fred' }
const getter = constant(object)

console.log(getter() === object) // true
console.log(getter()) // { user: 'fred' }
```

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
