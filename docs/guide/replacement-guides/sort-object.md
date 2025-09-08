---
description: Modern alternatives to the sort-object package for sorting object keys
---

# Replacements for `sort-object`

## JavaScript APIs (`Object.keys` + `Array.sort`)

For simple cases:

```ts
import sortObj from 'sort-object' // [!code --]
const sorted = sortObj(object) // [!code --]

// Ascending A→Z
const sorted = Object.keys(object) // [!code ++]
  .sort() // [!code ++]
  .reduce((acc, k) => (acc[k] = object[k], acc), {}) // [!code ++]
```

Replicating `sortBy` (function returns an ordered key list):

```ts
import sortObj from 'sort-object' // [!code --]
const sorted = sortObj(object, { sortBy: (obj) => { // [!code --]
  const arr: string[] = []  // [!code --]
  Object.keys(obj).forEach((k) => { if (/^a/.test(obj[k])) arr.push(k) })  // [!code --]
  return arr.reverse()  // [!code --]
}})  // [!code --]

const sortBy = (obj: Record<string, any>) => // [!code ++]
  Object.keys(obj).filter(k => /^a/.test(obj[k])).reverse()  // [!code ++]
const sorted = sortBy(object).reduce((acc, k) => (acc[k] = object[k], acc), {})  // [!code ++]
```

## `sort-object-keys`

[`sort-object-keys`](https://www.npmjs.com/package/sort-object-keys) is zero‑dependency and matches common `sort-object` use cases (custom order array or comparator).

```ts
import sortObj from 'sort-object' // [!code --]
import sortObjectKeys from 'sort-object-keys' // [!code ++]

// Default A→Z
const sorted = sortObj(object) // [!code --]
const sorted = sortObjectKeys(object) // [!code ++]

// With comparator
const sortedByCmp = sortObj(object, { sort: (a, b) => a.localeCompare(b) }) // [!code --]
const sortedByCmp = sortObjectKeys(object, (a, b) => a.localeCompare(b)) // [!code ++]
```

## `sortobject`

[`sortobject`](https://www.npmjs.com/package/sortobject) is zero‑dependency and deeply sorts nested objects.

```ts
import sortObj from 'sort-object' // [!code --]
import sortobject from 'sortobject' // [!code ++]

const sorted = sortObj(object) // [!code --]
const sorted = sortobject(object) // [!code ++]
```