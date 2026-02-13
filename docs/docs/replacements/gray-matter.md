---
description: Modern frontmatter parsers
---

# Replacements for `gray-matter` / `frontmatter`

## `simplematter`

[`simplematter`](https://github.com/remcohaszing/simplematter) is an up-to-date and minimal library that can parse YAML and TOML frontmatter data from strings.

Example:

```ts
import matter from 'gray-matter' // [!code --]
import { simplematter } from 'simplematter' // [!code ++]

const document = `---
title: e18e
---

# Hello e18e!
`

const { data, content } = matter(document) // [!code --]
const [data, content] = simplematter(document) // [!code ++]

console.log(data)
console.log(content)
```
