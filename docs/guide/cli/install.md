# Installation

The e18e CLI can be installed in several ways depending on your needs and preferences.

## Quick Start

The fastest way to get started is using `npx` (no installation required):

```sh
npx @e18e/cli analyze
```

## Installation Methods

### Global Installation (Recommended for Regular Use)

Install the CLI globally to use it from anywhere:

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

After global installation, you can use the CLI from any directory:

```sh
e18e-cli analyze
e18e-cli migrate chalk
```

### Using npx (No Installation)

Use the CLI without installing it:

```sh
npx @e18e/cli analyze
npx @e18e/cli migrate chalk
```

## Verification

After installation, verify that the CLI is working:

```sh
e18e-cli --help
```

Expected output:

```
e18e CLI

Usage: e18e-cli <command> [options]

Commands:
  analyze  Analyze the project for any warnings or errors
  migrate  Migrate from a package to a more performant alternative

Options:
  --help     Show this help message
  --version  Show version number
```

## Configuration

### Global Configuration

The CLI automatically detects your project's configuration:
- Package manager (from lock files)
- TypeScript configuration
- ESLint configuration
- Package.json settings

No additional configuration files are required.
