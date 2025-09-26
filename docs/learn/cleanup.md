# Cleanup

The JavaScript ecosystem has grown massively over the years, in both good and bad ways. We have all the packages and choice we want, but have built up a vast amount of technical debt along the way.

Much of this technical debt exists in the form of packages that are redundant, bloated, or no longer actively maintained.

The e18e community maintains [e18e/ecosystem-issues](https://github.com/e18e/ecosystem-issues), which aims to drive contributions upstream to popular open-source projects, including:

- Modernizing existing packages
- Migrating from redundant packages
- Migrating from inactive packages
- Migrating to lighter and/or faster alternatives

::: info Jump into action!
Check out the list of [open opportunities in the ecosystem-issues repo](https://github.com/e18e/ecosystem-issues/issues). After reading this guide, review these issues for ideas to improve popular packages. If you discover other places where we can clean up a dependency tree or improve performance, please open tracking issues in the cleanup repo to provide starting points for others.

We can have a greater impact working together. Join the [e18e Discord server](https://chat.e18e.dev) to connect with others, share your wins, or get help along the way!
:::

## Contribution Guide

This guide helps you discover and contribute improvements to the ecosystem. We'll explore common discovery techniques and problems to resolve in upstream packages.

### Discovery

We're primarily looking for packages that are:

- Bloated
- No longer maintained
- Outdated
- Slow
- Redundant
- Unused

A good starting point is to choose the **target package** you want to improve. For example, we could choose to improve [vite](https://github.com/vitejs/vite).

Our first step is to _discover_ the current state of this package.

We can do this with [npmgraph](https://npmgraph.js.org/) and [pkg-size](https://pkg-size.dev/).

In this case, we can visualize vite's dependency graph and size here:

- [vite dependency graph](https://npmgraph.js.org/?q=vite)
- [vite package size](https://pkg-size.dev/vite)

This provides a good overview of dependency tree complexity and overall _install size_ (amount of data downloaded during installation).

#### Rollup bundles

In our particular example, vite has relatively few dependencies, but has an install size we can likely reduce (32MB at time of writing).

This is because vite bundles many production dependencies rather than pulling them from `node_modules`.

For this reason, we need to go further with rollup bundle analysis.

We can use the [`rollup-plugin-visualizer`](https://github.com/btd/rollup-plugin-visualizer) plugin to generate a visualization of vite's bundle.

This visualization quickly reveals the larger dependencies in the bundle and the import paths leading to them.

#### Note on dependency depth

Easy wins in the dependency graph often involve packages that pull in large subtrees of dependencies.

While this is generally true, some deep dependencies serve important purposes (e.g., supporting older node versions). Consider this before assuming a dependency tree can be removed.

### Improvement

After examining the dependency graph, package size, and bundle distribution, we can identify potential improvements.

We should look for:

- Dependencies that pull in large subtrees of deeper dependencies not used elsewhere
- Duplicated dependencies (either multiple versions or multiple packages with similar functionality)
- Very large dependencies (by install size)

In our vite example, we can see that both `fast-glob` and `glob` are bundled into vite.

This means we're bundling two non-trivial packages that essentially perform the same function—a clear opportunity for improvement!

#### Create cleanup issues

When you identify potential performance improvements, open issues in this repository.

Even if you plan to address them yourself, this improves visibility, prevents duplicate work, and enables others to help.

If you lack time to implement the changes yourself, someone else might follow up on your findings.

Consider attaching a package report using [DevMiner's package-size-calculator](https://github.com/TheDevMinerTV/package-size-calculator) to provide an overview of the package size and your proposed changes.

### Fixes

Once we've identified dependencies that introduce performance issues, we can explore different approaches for improvements.

#### Large subtrees

For these dependencies, first determine if there's a reason we need them instead of alternatives.

Common considerations include:

- Node `engines` specifying a version low enough that this dependency supports (but alternatives don't)
- Absence of known alternatives (an opportunity to create one!)
- Necessity of each deep dependency in the subtree (sometimes depth exists for good reasons, like shared modules)

If a dependency is replaceable, look for alternatives. Good resources include:

- The [module replacements repository](https://github.com/es-tooling/module-replacements/tree/main/docs/modules)
- [tinylibs](https://github.com/tinylibs/)
- [unjs](https://github.com/unjs/)

If you find a good, leaner alternative, [share it with the community!](https://chat.e18e.dev)

#### Duplicated functionality

You'll often find dependencies using different versions or entirely separate solutions to achieve the same functionality.

For different versions, contribute upstream to update outdated dependencies to the latest version.

For separate solutions, evaluate which one performs better and consider standardizing on that solution.

In our vite example, we would identify what uses `fast-glob` and what uses `glob`, then compare these libraries and alternatives to determine if dependencies could use a single, better solution.

#### Large Dependencies

Large dependencies often contain more functionality than needed for your specific use case.

The solution typically involves:

- Contributing upstream to split the dependency into more granular modules (but not excessively granular)
- Migrating to a leaner, more focused dependency

In such cases, look for lighter and potentially faster alternatives.

### Tip: Finding Dependents of a Package

After identifying a package with replacement potential, create an issue in our [cleanup-repository](https://github.com/e18e/ecosystem-issues) to inform the community.

Next, use [fuzzyma's tool](https://github.com/fuzzyma/e18e-tools) to find package dependents. The tool's README provides usage documentation.

Here's an example that displays the top 100 dependents of `lodash`:

```sh
npx github:Fuzzyma/e18e-tools lodash -n 100 -U https://npm.devminer.xyz/registry
```

You can post the results as Markdown in your GitHub issue and then create PRs for affected projects:

```sh
npx github:Fuzzyma/e18e-tools lodash -n 100 -q -o md  -U https://npm.devminer.xyz/registry > md-output.md
```
