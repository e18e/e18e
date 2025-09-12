---
description: Modern alternatives to the ora package for displaying elegant terminal spinners with status indicators
---

# Replacements for `ora`

## `nanospinner`

[`nanospinner`](https://github.com/usmanyunusov/nanospinner) provides simple start/success/error/warning methods with one dependency (`picocolors`).

```ts
import ora from 'ora' // [!code --]
import { createSpinner } from 'nanospinner' // [!code ++]

const spinner = ora('Loading unicorns').start() // [!code --]
const spinner = createSpinner('Loading unicorns').start() // [!code ++]

spinner.succeed('Done!') // [!code --]
spinner.success('Done!') // [!code ++]

spinner.fail('Error!') // [!code --]
spinner.error('Error!') // [!code ++]
```

## `picospinner`

[`picospinner`](https://github.com/tinylibs/picospinner) has zero dependencies with support for custom symbols, frames, and colors through Node.js built-in styling.

```ts
import ora from 'ora' // [!code --]
import { Spinner } from 'picospinner' // [!code ++]

const spinner = ora('Loading...').start() // [!code --]
const spinner = new Spinner('Loading...') // [!code ++]
spinner.start() // [!code ++]

spinner.color = 'yellow' // [!code --]
// Custom colors via options // [!code ++]
const colorSpinner = new Spinner('Loading...', { colors: { spinner: 'yellow' } }) // [!code ++]
```

## `tiny-spinner`

[`tiny-spinner`](https://github.com/fabiospampinato/tiny-spinner) provides a clean API with built-in status methods and message updating.

```ts
import ora from 'ora' // [!code --]
import Spinner from 'tiny-spinner' // [!code ++]

const spinner = ora('Loading...').start() // [!code --]
const spinner = new Spinner() // [!code ++]
spinner.start('Loading...') // [!code ++]

spinner.text = 'New message' // [!code --]
spinner.update('New message') // [!code ++]

spinner.succeed('Success!') // [!code --]
spinner.success('Success!') // [!code ++]
```

## `yocto-spinner`

[`yocto-spinner`](https://github.com/sindresorhus/yocto-spinner) is a minimal version of ora by the same author with essential features and one dependency.

```ts
import ora from 'ora' // [!code --]
import yoctoSpinner from 'yocto-spinner' // [!code ++]

const spinner = ora('Loading...').start() // [!code --]
const spinner = yoctoSpinner({ text: 'Loading...' }).start() // [!code ++]

spinner.color = 'yellow' // [!code --]
spinner.color = 'yellow' // [!code ++]

spinner.succeed('Done!') // [!code --]
spinner.success('Done!') // [!code ++]
```