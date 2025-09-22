# analyze

The `analyze` command is the core feature of the e18e CLI. It performs a comprehensive analysis of your JavaScript/TypeScript project to identify performance issues, potential optimizations, and areas for improvement.

## Overview

The analyze command runs multiple analysis plugins on your project:

1. **ATTW (Are The Types Wrong)** - Validates TypeScript declaration files
2. **Publint** - Checks package.json and publishing configuration
3. **Module Replacements** - Identifies packages that can be replaced with faster alternatives
4. **Dependency Analysis** - Analyzes your dependency tree for optimization opportunities

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

## Troubleshooting

### Common Issues

**"No package.json found"**
```sh
# Make sure you're in a project directory
ls package.json
# If not found, navigate to your project root
cd /path/to/your/project
e18e-cli analyze
```

**"Path must be a tarball file or a directory"**
```sh
# Check if the path exists and is valid
ls -la /path/to/analyze
# For tarballs, ensure it has .tgz extension
mv my-package.tar.gz my-package.tgz
```

**Permission errors**
```sh
# Try using npx instead of global installation
npx @e18e/cli analyze
# Or check file permissions
chmod -R 755 ./my-project
```

### Debug Mode

For detailed debugging information:

```sh
e18e-cli analyze --log-level debug
```

This will show:
- File system operations
- Package manager detection
- Analysis plugin execution
- Detailed error messages

## Development Workflow

The analyze command can be used in your development workflow:

### Package Scripts
```json
{
  "scripts": {
    "analyze": "e18e-cli analyze",
    "analyze:debug": "e18e-cli analyze --log-level debug"
  }
}
```

### Local Development

```sh
# Run analysis during development
npm run analyze

# Check for issues before committing
e18e-cli analyze --log-level debug
```
