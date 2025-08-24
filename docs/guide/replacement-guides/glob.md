# Replacements for `glob`

## `tinyglobby`

[`tinyglobby`](https://github.com/SuperchupuDev/tinyglobby) provides a similar API.

Example:

```ts
import { glob } from "glob" // [!code --]
import { glob } from "tinyglobby" // [!code ++]

const files = await glob("**/*.ts");
```

Most options available to `glob` are available in `tinyglobby`, read more at the [tinyglobby documentation](https://github.com/SuperchupuDev/tinyglobby?tab=readme-ov-file#options).

## `fs.glob` (native, since Node 22.x)

[`fs.glob`](https://nodejs.org/api/fs.html#fspromisesglobpattern-options) is built into modern versions of Node.

Example:

```ts
import { glob } from 'glob' // [!code --]
import { glob } from 'node:fs/promises' // [!code ++]

const files = await glob('src/**/*.ts', { // [!code --]
const files = await Array.fromAsync(glob('src/**/*.ts', { // [!code ++]
  cwd,
}) // [!code --]
})) // [!code ++]
```

You can also iterate over the results asynchronously:

```ts
for await (const result of glob('src/**/*.ts', { cwd })) {
  // result is an individual path
  console.log(result)
}
```

## `fdir`

[`fdir`](https://github.com/thecodrr/fdir/) offers similar functionality but through a different API (and `tinyglobby` is actually built on top of it).

Example:

```ts
import { glob } from 'glob' // [!code --]
import { fdir } from 'fdir' // [!code ++]

const files = new fdir() // [!code ++]
  .withBasePath() // [!code ++]
  .glob('src/**/*.ts') // [!code ++]
  .crawl(cwd) // [!code ++]
  .withPromise() // [!code ++]
const files = await glob('src/**/*.ts', { // [!code --]
  cwd, // [!code --]
  maxDepth: 6 // [!code --]
}) // [!code --]
```
