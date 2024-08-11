# Speedup

A major part of improving the ecosystem for everyone is _speed_. The speed of core packages, tools and more can always be improved and will benefit the community as a whole.

A few groups and individuals are working in this space. Just some of these are listed below:

- [Speeding up the JavaScript Ecosystem](https://marvinh.dev/blog/speeding-up-javascript-ecosystem).

## Linting

Some performance improvements can be detected via a linter.

### ESLint

For those of us using ESLint, a few plugins are available which strongly align with the principals of the e18e effort:

| Plugin | Description |
| -- | -- |
| [eslint-plugin-depend](https://github.com/es-tooling/eslint-plugin-depend) | Detects redundant packages and suggests more performant replacements |
| [eslint-plugin-barrel-files](https://github.com/thepassle/eslint-plugin-barrel-files) | Detects barrel/index files |

### Biome

Biome supports some rules out of the box which align with e18e:

- [noBarrelFile](https://biomejs.dev/linter/rules/no-barrel-file/)
- [noReExportAll](https://biomejs.dev/linter/rules/no-re-export-all/)

## Coding tips

The code you write plays an important role in the performance of your app. Some patterns are highlighted below for common pitfalls and ways to improve it. Remember to always profile your code when making performance changes!

<!-- Headers below are sorted alphabetically -->
<!-- TODO: Add inline benchmark comparison playground -->

### Avoid generators for hot code paths

At the moment, most JavaScript engines do not optimize [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) function calls which leads to a large performance hit if used extensively.

Prefer using non-async [iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator) or plain arrays.

### Avoid chaining array methods

Chaining array methods like `map`, `filter`, `reduce`, etc leads to many intermediate arrays being created and disposed, causing more work for the garbage collector. Each chain also leads to an extra iteration, which can be more times than needed.

Prefer using [`for` loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for), [`for...in` loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), and[`for...of` loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), or a single chain method only to prevent the caveats above.
