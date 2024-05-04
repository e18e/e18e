# Linting

Some performance improvements can be detected via a linter.

## ESLint

For those of us using ESLint, a few plugins are available which strongly
align with the principals of the e18e effort:

| Plugin | Description |
| -- | -- |
| [eslint-plugin-depend](https://github.com/es-tooling/eslint-plugin-depend) | Detects redundant packages and suggests more performant replacements |
| [eslint-plugin-barrel-files](https://github.com/thepassle/eslint-plugin-barrel-files) | Detects barrel/index files |

## Biome

Biome supports some rules out of the box which align with e18e:

- [noBarrelFile](https://biomejs.dev/linter/rules/no-barrel-file/)
- [noReExportAll](https://biomejs.dev/linter/rules/no-re-export-all/)
