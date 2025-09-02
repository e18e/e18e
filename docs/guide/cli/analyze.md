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

## Analysis Types

### 1. ATTW (Are The Types Wrong)

Checks for TypeScript declaration file issues that could cause problems for consumers of your package.

**What it checks:**
- Declaration file compatibility
- Type export issues
- Module resolution problems
- CommonJS/ESM interoperability

**Example output:**
```
⚠️  ATTW: Package has type declarations but they may not work correctly
   - Missing "types" field in package.json
   - Declaration files may not be properly exported
```

### 2. Publint

Validates your package.json and publishing configuration to ensure your package can be published correctly.

**What it checks:**
- Package.json structure and required fields
- Export maps configuration
- Entry point definitions
- Publishing metadata

**Example output:**
```
✅ Publint: Package configuration looks good
   - Valid package.json structure
   - Proper export maps configured
   - Entry points correctly defined
```

### 3. Module Replacements

Identifies packages in your dependencies that can be replaced with faster, more modern alternatives.

**What it checks:**
- Known slow packages (e.g., `lodash` → `lodash-es`)
- Outdated packages with better alternatives
- Performance-impacting dependencies

> [!IMPORTANT]
> The replacement list is still being developed and expanded. The current list represents the initial set of well-tested migrations. More replacements will be added as they are validated and tested across the ecosystem.

**Example output:**
```
💡 Module Replacements: Found 3 packages that can be optimized
   - lodash → lodash-es (faster ESM version)
   - chalk → picocolors (smaller, faster)
   - moment → date-fns (tree-shakeable, smaller)
```

### 4. Dependency Analysis

Analyzes your dependency tree to identify optimization opportunities.

**What it checks:**
- Duplicate dependencies
- Unused dependencies
- Large dependencies that could be replaced
- Dependency tree depth and complexity

**Example output:**
```
📊 Dependency Analysis:
   - Total dependencies: 45
   - Production: 23
   - Development: 22
   - Duplicates found: 2
   - Large packages (>1MB): 3
```

## Output Format

The analyze command provides structured output with:

### Summary Statistics
```
📦 Package: my-project@1.0.0
📊 Type: ESM
📈 Dependencies: 45 total (23 prod, 22 dev)
📏 Bundle size: 2.3 MB
```

### Messages

Each analysis plugin generates messages with different severity levels:

- **✅ Info** - General information and successful checks
- **💡 Suggestion** - Optimization opportunities
- **⚠️ Warning** - Issues that should be addressed
- **❌ Error** - Critical problems that need immediate attention

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
