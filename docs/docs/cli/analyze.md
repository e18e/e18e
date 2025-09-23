# analyze

The `analyze` command is the core feature of the e18e CLI. It performs a comprehensive analysis of your JavaScript/TypeScript project to identify performance issues, potential optimizations, and areas for improvement.

## Overview

The analyze command runs multiple analysis plugins on your project:

1. **TypeScript publishing validation** - checks for common issues in publishing TypeScript declarations
2. **Package publishing validation** - ensures your package.json and publishing setup are correct
3. **Module replacement suggestions** - identifies packages that can be replaced with more performant alternatives
4. **Dependency analysis** - examines your dependency tree for optimization opportunities

## Usage

```sh
e18e-cli analyze [path] [options]
```

### Arguments

- `path` (optional) - Path to analyze. Can be:
  - A directory (defaults to current directory)
  - A tarball file (`.tgz`)

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--pack` | `enum` | `auto` | Package manager to use for packing. Options: `auto`, `npm`, `yarn`, `pnpm`, `bun`, `none` |
| `--log-level` | `enum` | `info` | Set the log level. Options: `debug`, `info`, `warn`, `error` |
| `--manifest` | `string[]` | `[]` | Path(s) to custom manifest file(s) for module replacements analysis |

## Examples

### Basic Analysis

```sh
# Analyze current directory
e18e-cli analyze

# Analyze specific directory
e18e-cli analyze ./my-project

# Analyze a tarball
e18e-cli analyze ./my-package.tgz
```

## Configuration

### Package Manager Detection

The CLI automatically detects your package manager based on lock files:
- `package-lock.json` → npm
- `yarn.lock` → yarn
- `pnpm-lock.yaml` → pnpm
- `bun.lockb` → bun

You can override this with the `--pack` option.

### Custom Manifests

Use the `--manifest` option to provide custom module replacement configurations:

```json
{
  "replacements": [
    {
      "from": "old-package",
      "to": "new-package",
      "reason": "Better performance"
    }
  ]
}
```
