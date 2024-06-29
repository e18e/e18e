# Speedup

A major part of improving the ecosystem for everyone is _speed_. The speed of core packages, tools and more can always be improved and will benefit the community as a whole.

A few groups and individuals are working in this space. Just some of these are listed below:

- [Speeding up the Javascript Ecosystem](https://marvinh.dev/blog/speeding-up-javascript-ecosystem).

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
