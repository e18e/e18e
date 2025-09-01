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

```bash
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

### Environment Variables

The CLI respects these environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `DEBUG` | Enable debug output | `false` |
| `FORCE_COLOR` | Force colored output | `auto` |
| `NO_COLOR` | Disable colored output | `false` |

Example:
```bash
# Enable debug output
DEBUG=e18e:* e18e-cli analyze

# Force colored output
FORCE_COLOR=1 e18e-cli analyze
```

### Global Configuration

The CLI automatically detects your project's configuration:
- Package manager (from lock files)
- TypeScript configuration
- ESLint configuration
- Package.json settings

No additional configuration files are required.

## Troubleshooting

### Installation Issues

**"Permission denied" (Global Installation)**
```sh
# On macOS/Linux, use sudo
sudo npm install -g @e18e/cli

# Or change npm's default directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g @e18e/cli
```

**"Command not found"**
```sh
# Check if the binary is in your PATH
which e18e-cli

# If using npx, try with full package name
npx @e18e/cli analyze
```

**"EACCES: permission denied"**
```sh
# Fix npm permissions
sudo chown -R $USER /usr/local/lib/node_modules
sudo chown -R $USER /usr/local/bin
sudo chown -R $USER ~/.npm
```

### Node.js Version Issues

**"Unsupported Node.js version"**
```sh
# Check your Node.js version
node --version

# Update Node.js (using nvm)
nvm install 18
nvm use 18

# Or download from nodejs.org
```

### Network Issues

**"Network timeout"**
```sh
# Set npm registry
npm config set registry https://registry.npmjs.org/

# Use a different DNS
npm config set registry https://registry.npmjs.org/
```
