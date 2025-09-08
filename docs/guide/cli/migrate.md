# migrate

The `migrate` command helps you automatically migrate from packages to more performant alternatives. It can replace packages in your codebase with faster, smaller, or more modern alternatives.

The migrate command:

- Identifies packages that can be replaced with better alternatives
- Automatically updates import statements and package.json
- Supports both interactive and batch modes
- Provides dry-run functionality to preview changes
- Allows custom migration rules via manifest files

## Usage

```sh
e18e-cli migrate [packages...] [options]
```

### Arguments

- `packages...` - Names of packages to migrate (e.g., `chalk`, `lodash`)

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--all` | `boolean` | `false` | Run all available migrations |
| `--dry-run` | `boolean` | `false` | Don't apply any fixes, only show what would change |
| `--include` | `string` | `**/*.{ts,js}` | Files to migrate (glob pattern) |
| `--interactive` | `boolean` | `false` | Run in interactive mode |
| `--manifest` | `string[]` | `[]` | Path(s) to custom migration manifest file(s) |

## Examples

### Basic Migration

```sh
# Migrate a single package
e18e-cli migrate chalk

# Migrate multiple packages
e18e-cli migrate chalk lodash moment

# Migrate all available packages
e18e-cli migrate --all
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

# Use custom migration manifest
e18e-cli migrate --manifest ./custom-migrations.json
```

## File Patterns

The `--include` option accepts glob patterns to specify which files to process:

```sh
# Default pattern (TypeScript and JavaScript files)
e18e-cli migrate chalk --include "**/*.{ts,js}"

# Only source files
e18e-cli migrate chalk --include "src/**/*.{ts,js}"

# Include JSX/TSX files
e18e-cli migrate chalk --include "**/*.{ts,js,jsx,tsx}"

# Exclude test files
e18e-cli migrate chalk --include "src/**/*.{ts,js}" --exclude "**/*.test.{ts,js}"
```

## Migration Process

### Step 1: Validation

The CLI validates that:
- You're in a project directory with `package.json`
- The target packages are available for migration
- Files exist and are accessible

### Step 2: Analysis

Scans your codebase to:
- Find all import statements
- Identify package usage patterns
- Map dependencies to replacements

### Step 3: Transformation

For each file:
- Updates import statements
- Replaces package references
- Maintains code structure
- Preserves formatting

### Step 4: Package Updates

Updates `package.json`:
- Removes old dependencies
- Adds new dependencies
- Updates version constraints

## Example Migration

Here's a complete example of migrating from `chalk` to `picocolors`:

### Before Migration

**package.json:**
```json
{
  "dependencies": {
    "chalk": "^4.1.2"
  }
}
```

**src/logger.ts:**
```typescript
import chalk from 'chalk'

export function log(message: string) {
  console.log(chalk.green('✓'), message)
}

export function error(message: string) {
  console.error(chalk.red('✗'), message)
}
```

### After Migration

**package.json:**
```json
{
  "dependencies": {
    "picocolors": "^1.0.0"
  }
}
```

**src/logger.ts:**
```typescript
import { green, red } from 'picocolors'

export function log(message: string) {
  console.log(green('✓'), message)
}

export function error(message: string) {
  console.error(red('✗'), message)
}
```

## Troubleshooting

### Common Issues

**"No package.json found"**
```sh
# Make sure you're in a project directory
ls package.json
cd /path/to/your/project
e18e-cli migrate chalk
```

**"Target package has no available migrations"**
```sh
# Check available migrations
e18e-cli migrate --interactive
# Or use --all to see all available options
e18e-cli migrate --all --dry-run
```

**"Permission denied"**
```sh
# Check file permissions
chmod -R 755 ./src
# Or use npx
npx @e18e/cli migrate chalk
```

## Best Practices

### Before Migration

1. **Backup your code**:
   ```sh
   git add .
   git commit -m "Before migration"
   ```

2. **Test current functionality**:
   ```sh
   npm test
   npm run build
   ```

3. **Use dry-run first**:
   ```sh
   e18e-cli migrate chalk --dry-run
   ```

### After Migration

1. **Install new dependencies**:
   ```sh
   npm install
   ```

2. **Test thoroughly**:
   ```sh
   npm test
   npm run build
   npm start
   ```

3. **Check for breaking changes**:
   - Review the new package's documentation
   - Test all affected functionality
   - Update any custom code if needed

## Development Workflow

### Package Scripts

```json
{
  "scripts": {
    "migrate": "e18e-cli migrate",
    "migrate:preview": "e18e-cli migrate --all --dry-run",
    "migrate:all": "e18e-cli migrate --all"
  }
}
```

### Local Development

```sh
# Preview migrations before applying
npm run migrate:preview

# Apply migrations interactively
npm run migrate

# Run all available migrations
npm run migrate:all
```
