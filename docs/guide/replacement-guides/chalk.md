# Replacements for `chalk`

## `styleText` (native)

Since Node 20.x, you can use the [`styleText`](https://nodejs.org/api/util.html#utilstyletextformat-text-options) function from the `node:util` module to style text in the terminal.

Example:

```ts
import { styleText } from 'node:util' // [!code ++]
import chalk from 'chalk' // [!code --]

console.log(`Hello ${chalk.blue('blue')} world!`) // [!code --]
console.log(`Hello ${styleText('blue', 'blue')} world!`) // [!code ++]
```

When using multiple styles, you can pass an array to `styleText`:

```ts
console.log(`I am ${chalk.blue.bgRed('blue on red')}!`) // [!code --]
console.log(`I am ${styleText(['blue', 'bgRed'], 'blue on red')}!`) // [!code ++]
```

> [!NOTE]
> `styleText` does not support RGB and hex colors (e.g. `#EFEFEF` or `255, 239, 235`). You can view the available styles in the [Node documentation](https://nodejs.org/api/util.html#modifiers).

## `picocolors`

[`picocolors`](https://github.com/alexeyraspopov/picocolors) follows a similar API but without chaining:

```ts
import chalk from 'chalk' // [!code --]
import picocolors from 'picocolors' // [!code ++]

console.log(`Hello ${chalk.blue('blue')} world!`) // [!code --]
console.log(`Hello ${picocolors.blue('blue')} world!`) // [!code ++]

// A chained example
console.log(chalk.blue.bgRed('blue on red')) // [!code --]
console.log(picocolors.blue(picocolors.bgRed('blue on red'))) // [!code ++]
```

> [!NOTE]
> `picocolors` currently does not support RGB and hex colors (e.g. `#EFEFEF` or `255, 239, 235`).

## `ansis`

[`ansis`](https://github.com/webdiscus/ansis/) supports a chaining syntax similar to chalk and supports both RGB, and hex colors.

Example:

```ts
import chalk from 'chalk' // [!code --]
import ansis from 'ansis' // [!code ++]

console.log(`Hello ${chalk.blue('blue')} world!`) // [!code --]
console.log(`Hello ${ansis.blue('blue')} world!`) // [!code ++]
```

When using multiple styles, you can chain them just like in chalk:

```ts
console.log(chalk.blue.bgRed('blue on red')) // [!code --]
console.log(ansis.blue.bgRed('blue on red')) // [!code ++]
```

Similarly, you can use RGB and hex colors:

```ts
console.log(chalk.rgb(239, 239, 239)('Hello world!')) // [!code --]
console.log(ansis.rgb(239, 239, 239)('Hello world!')) // [!code ++]
```
