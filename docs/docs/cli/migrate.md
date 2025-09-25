# migrate

The `migrate` command helps you automatically migrate from packages to more performant alternatives. It can replace packages in your codebase with faster, smaller, or more modern alternatives.

The migrate command:

- Identifies packages that can be replaced with more performant alternatives
- Automatically migrates code to use the new package(s)
- Supports both interactive and batch modes
- Provides dry-run functionality to preview changes

## Usage

```sh
e18e-cli migrate [packages...] [options]
```

### Arguments

- `packages...` - Names of packages to migrate (e.g., `chalk`, `lodash`)

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--dry-run` | `boolean` | `false` | Don't apply any fixes, only show what would change |
| `--include` | `string` | `**/*.{ts,js}` | Files to migrate (glob pattern) |
| `--interactive` | `boolean` | `false` | Run in interactive mode |

## Examples

### Basic Migration

```sh
# Migrate a single package
e18e-cli migrate chalk

# Migrate multiple packages
e18e-cli migrate chalk lodash moment
```

### Advanced Options

```sh
# Preview changes without applying them
e18e-cli migrate chalk --dry-run

# Interactive mode to select packages
e18e-cli migrate --interactive

# Migrate specific file types
e18e-cli migrate chalk --include "src/**/*.{ts,js,jsx,tsx}"

# Combine options
e18e-cli migrate --all --dry-run --include "src/**/*.ts"
```

## Example Migration

Here's a complete example of migrating from `chalk` to `picocolors`:

```json [package.json]
{
  "dependencies": {
    "chalk": "^4.1.2", // [!code --]
    "picocolors": "^1.0.0" // [!code ++]
  }
}
```

```typescript [src/logger.ts]
import chalk from 'chalk' // [!code --]
import picocolors from 'picocolors' // [!code ++]

export function log(message: string) {
  console.log(chalk.green('✓'), message) // [!code --]
  console.log(picocolors.green('✓'), message) // [!code ++]
}

export function error(message: string) {
  console.error(chalk.red('✗'), message) // [!code --]
  console.error(picocolors.red('✗'), message) // [!code ++]
}
```
