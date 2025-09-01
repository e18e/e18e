# CLI

The e18e CLI is a powerful tool for analyzing and optimizing your JavaScript/TypeScript projects. It helps you identify performance issues, find optimization opportunities, and migrate to better alternatives.

## Quick Start

```bash
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

```bash
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

```bash
e18e-cli migrate [packages...] [options]
```

**Arguments:**
- `packages...` - Names of packages to migrate (e.g., `chalk`, `lodash`)

**Options:**
- `--all` - Run all available migrations
- `--dry-run` - Don't apply any fixes, only show what would change
- `--include <pattern>` - Files to migrate. Default: `**/*.{ts,js}`
- `--interactive` - Run in interactive mode
- `--manifest <path>` - Use custom migration manifest file(s)

**Examples:**
```bash
# Migrate specific packages
e18e-cli migrate chalk lodash

# Preview changes without applying
e18e-cli migrate chalk --dry-run

# Migrate all available packages
e18e-cli migrate --all

# Interactive mode to select packages
e18e-cli migrate --interactive

# Use custom migration manifest
e18e-cli migrate --manifest ./custom-migrations.json
```

## Migration System

The CLI uses an [opinionated codemod](https://github.com/es-tooling/module-replacements-codemods) approach for migrations, based on e18e's curated list of performance-focused package replacements. This ensures consistent, well-tested migrations across the ecosystem.

### Default Migrations
The CLI comes with pre-configured migrations for common performance optimizations:
- `chalk` → `picocolors` (smaller, faster)
- `lodash` → `lodash-es` (ESM version)
- `moment` → `date-fns` (tree-shakeable)
- `axios` → `undici` (native fetch-like API)

> [!IMPORTANT]
> The replacement list is still being developed and expanded. The current list represents the initial set of well-tested migrations. More replacements will be added as they are validated and tested across the ecosystem.

### Custom Manifests
You can bring your own migration rules by providing custom manifest files:

```json
{
  "replacements": [
    {
      "from": "old-package",
      "to": "new-package",
      "reason": "Better performance and smaller bundle"
    }
  ]
}
```

Use custom manifests with the `--manifest` option:
```bash
e18e-cli migrate --manifest ./my-migrations.json
```

## What the CLI Analyzes

The `analyze` command runs several checks on your project:

1. **ATTW (Are The Types Wrong)** - Checks for TypeScript declaration file issues
2. **Publint** - Validates package.json and publishing configuration
3. **Module Replacements** - Identifies opportunities to replace packages with faster alternatives
4. **Dependency Analysis** - Analyzes your dependency tree for optimization opportunities

## Documentation

### Getting Started
- **[Installation](./install.md)** - Detailed installation guide for all package managers

### Commands
- **[analyze](./analyze.md)** - Detailed guide to the analyze command
- **[migrate](./migrate.md)** - Complete guide to package migration

## Features

### Smart Analysis
- **Automatic detection** of package managers and project structure
- **Multiple analysis types** for comprehensive coverage
- **Actionable recommendations** with clear next steps

### Safe Migration
- **Dry-run mode** to preview changes before applying
- **Interactive selection** for choosing which packages to migrate
- **Automatic rollback** support through git integration

### Developer Experience
- **Beautiful CLI interface** with progress indicators
- **Comprehensive error handling** with helpful messages
- **Integration ready** for CI/CD pipelines

## Example Workflow

```bash
# 1. Analyze your project
e18e-cli analyze

# 2. Review the findings and recommendations
# Look for warnings, suggestions, and optimization opportunities

# 3. Migrate packages (preview first)
e18e-cli migrate --all --dry-run

# 4. Apply migrations
e18e-cli migrate --all

# 5. Verify improvements
e18e-cli analyze
```

## Development Workflow

The CLI can be used in your development workflow:

### Package Scripts
```json
{
  "scripts": {
    "analyze": "e18e-cli analyze",
    "migrate": "e18e-cli migrate --interactive"
  }
}
```

### Local Development
```bash
# Run analysis during development
npm run analyze

# Check for migration opportunities
e18e-cli migrate --dry-run
```

## Community

- **Discord**: [Join our community](https://chat.e18e.dev)
- **GitHub**: [Report issues and contribute](https://github.com/e18e/cli)
- **Documentation**: [Full documentation](https://e18e.dev)

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

```bash
e18e-cli analyze --log-level debug
```

This will show detailed information about what the CLI is doing and help identify issues.

## Support

If you need help:
1. Check the troubleshooting section above
2. Search existing [GitHub issues](https://github.com/e18e/cli/issues)
3. Ask questions in our [Discord server](https://chat.e18e.dev)
