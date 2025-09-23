# CLI

The e18e CLI is a powerful tool for analyzing and optimizing your JavaScript/TypeScript projects. It helps you identify performance issues, find optimization opportunities, and automatically migrate to suggested dependencies.

## Quick Start

```sh
# Install and run analysis
npx @e18e/cli analyze

# Migrate packages interactively
npx @e18e/cli migrate --interactive
```

## Installation

You can install the e18e CLI globally or use it with npx:

::: code-group

```sh [npm]
npm install -g @e18e/cli
```

```sh [yarn]
yarn global add @e18e/cli
```

```sh [pnpm]
pnpm add -g @e18e/cli
```

```sh [bun]
bun add -g @e18e/cli
```

:::

## Commands

### `analyze`

Analyzes your project for various issues and provides recommendations for optimization.

```sh
e18e-cli analyze [path] [options]
```

**Arguments:**
- `path` (optional) - Path to a directory or tarball file to analyze. Defaults to current directory.

**Options:**
- `--pack <type>` - Package manager to use for packing. Options: `auto`, `npm`, `yarn`, `pnpm`, `bun`, `none`. Default: `auto`
- `--log-level <level>` - Set the log level. Options: `debug`, `info`, `warn`, `error`. Default: `info`
- `--manifest <path>` - Path(s) to custom manifest file(s) for module replacements analysis

**Examples:**
```sh
# Analyze current project
e18e-cli analyze

# Analyze with debug output
e18e-cli analyze --log-level debug

# Analyze with specific package manager
e18e-cli analyze --pack pnpm
```

### `migrate`

Migrates your project from packages to more performant alternatives.

```sh
e18e-cli migrate [packages...] [options]
```

**Arguments:**
- `packages...` - Names of packages to migrate (e.g., `chalk`, `lodash`)

**Options:**
- `--dry-run` - Don't apply any fixes, only show what would change
- `--include <pattern>` - Files to migrate. Default: `**/*.{ts,js}`
- `--interactive` - Run in interactive mode

**Examples:**
```sh
# Migrate specific packages
e18e-cli migrate chalk lodash

# Preview changes without applying
e18e-cli migrate chalk --dry-run

# Interactive mode to select packages
e18e-cli migrate --interactive
```

## Replacements System

The CLI uses a set of codemods from the [module-replacements-codemods](https://github.com/es-tooling/module-replacements-codemods) project for migrations, and replacements from the [replacements list](https://e18e.dev/guide/replacements.html).

### Default Replacements

The CLI comes with pre-configured replacements for common performance optimizations. You can find the list of the current replacements in the [replacements docs](https://e18e.dev/guide/replacements.html).

> [!IMPORTANT]
> The replacement list is still being developed and expanded. The current list represents the initial set of well-tested migrations. More replacements will be added as they are validated and tested across the ecosystem.

### Custom Manifests

You can bring your own replacement rules by providing custom manifest files:

```json
{
  "replacements": [
    {
      "moduleName": "custom-module",
      "type": "simple",
      "replacement": "Use picocolors, kleur, or native console styling"
    }
  ]
}
```

Use custom manifests with the `--manifest` option:

```sh
e18e-cli analyze --manifest ./my-replacements.json
```

## Troubleshooting

### Common Issues

**"No package.json found"**
- Make sure you're running the command from a project directory
- Check that package.json exists in the current or specified directory

**"Path must be a tarball file or a directory"**
- Ensure the path you're providing is valid
- For tarballs, make sure the file has a `.tgz` extension

**Permission errors**
- Try running with `npx` instead of global installation
- Check file permissions in your project directory

### Debug Mode

For detailed debugging information, use the `--log-level debug` option:

```sh
e18e-cli analyze --log-level debug
```

This will show detailed information about what the CLI is doing and help identify issues.
