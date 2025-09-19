---
description: Modern alternatives to the execa package for running child processes
---

# Replacements for `execa`

## `tinyexec`

[`tinyexec`](https://github.com/tinylibs/tinyexec) is a minimal process execution library.

Example:

```ts
import { execa } from 'execa' // [!code --]
import { x } from 'tinyexec' // [!code ++]

const { stdout } = await execa('ls', ['-l']) // [!code --]
const { stdout } = await x('ls', ['-l'], { throwOnError: true }) // [!code ++]
```

## `nanoexec`

If you prefer a very thin wrapper over `child_process.spawn` (including full spawn options and optional shell), [`nanoexec`](https://github.com/fabiospampinato/nanoexec) is another light alternative. Its `stdout`/`stderr` are Buffers.

```ts
import { execa } from 'execa' // [!code --]
import exec from 'nanoexec' // [!code ++]

const { stdout } = await execa('echo', ['example']) // [!code --]
const res = await exec('echo', ['example']) // [!code ++]
const stdout = res.stdout.toString('utf8') // [!code ++]

await exec('echo "example"', { shell: true }) // [!code ++]
```

## Bun

If you’re on Bun, its built-in [`$`](https://bun.com/reference/bun/$) template tag can replace `execa`’s script-style usage:

```ts
import { $ } from 'execa' // [!code --]
import { $ } from 'bun' // [!code ++]

const { stdout } = await $`echo "Hello"` // [!code --]
const stdout = await $`echo "Hello"`.text() // [!code ++]
```