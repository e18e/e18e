# Cleanup

The JavaScript ecosystem has grown massively over the years, in both good and bad ways. We have all the packages and choice we want, but have built up a vast amount of technical debt along the way.

Much of this is in the form of packages which are redundant, bloated, or have since fallen out of active maintenance.

A good example of the current efforts to clean our packages up is [es-tooling/ecosystem-cleanup](https://github.com/es-tooling/ecosystem-cleanup). This project aims to drive contributions upstream to popular open-source projects. The project aims to:

- Modernize existing packages
- Migrate from redundant packages
- Migrate from inactive packages
- Migrate to lighter and/or faster alternatives

::: info Jump into action!
The es-tooling community maintains a list of [open opportunities in the ecosystem-cleanup repo](https://github.com/43081j/ecosystem-cleanup/issues). After reading this guide, check out these issues for ideas to improve popular packages. And if you do research and find other places we can clean up a dependency tree, or speed it up, please open some tracking issues in the cleanup repo, so you give others good starting points to get involved.

We can have a bigger effect by working together. Join the [e18e Discord server](https://chat.e18e.dev) to connect with others to share your wins or get help along the way!
:::

## Contribution Guide

This guide is here to help you discover and contribute improvements to the ecosystem. We will go through some common discovery techniques and common problems to resolve in upstream packages.

### Discovery

We're mostly looking for packages which fit the following criteria:

- Bloated
- No longer maintained
- Outdated
- Slow
- Redundant

A good start to this is to choose the **target package** you want to improve. For example, we could choose to improve [Vite](https://github.com/vitejs/vite).

Our first step is to **discover** the current state of this package. We can do that with [npmgraph](https://npmgraph.js.org/) and [pkg-size](https://pkg-size.dev/). In this case, we can visualize Vite's dependency graph and size here:

- [vite dependency graph](https://npmgraph.js.org/?q=vite)
- [vite package size](https://pkg-size.dev/vite)

This should give us a good idea of dependency tree complexity and overall install size (amount of data you'll pull down on install).

#### Rollup bundles

In our particular example, Vite seems to have very few dependencies and has an install size we can probably reduce (32MB at time of writing this).

This is because Vite bundles many of their production dependencies, rather than pulling them in from `node_modules`.

Due to this, we have to go a little further: **Rollup bundle analysis**.

We can use the [`rollup-plugin-visualizer`](https://github.com/btd/rollup-plugin-visualizer) plugin to generate a visualization of Vite's bundle.

From the visualization this produces, you should quickly get a good idea of the larger dependencies in the bundle and the tree that leads to them being imported.

#### Note on dependency depth

Easy wins in the dependency graph are often those packages which themselves pull in very large subtrees of dependencies.

While this is usually true, some of those deep dependencies do have their uses (e.g. older Node versions). Remember to take this into account before assuming we can remove the tree from the dependency list.

### Improvement

Now that we've seen the dependency graph, the package size, and the bundle size/distribution, we can begin to think of improvements.

What we should be looking for:

- Dependencies which pull in large subtrees of deeper dependencies which themselves are not depended on by anything outside of the subtree
- Dependencies which are duplicated (either through multiple versions, or multiple dependencies achieving the same goals)
- Very large dependencies (in terms of install size)

Back to our Vite example - at the time of writing this, we can see in the Rollup bundle that both `fast-glob` and `glob` are bundled into Vite.

This means we are bundling two non-trivial packages which essentially do the same thing. We have found a possible performance improvement!

#### Create cleanup issues

At this point, if you have identified some potential performance improvements, you should open issues in the [ecosystem-cleanup](https://github.com/es-tooling/ecosystem-cleanup/issues) repository.

Even if you will try tackle them yourself, this will help improve visibility so people do not duplicate work and can help you out. Or, if you do not have time to tackle it yourself, it is possible for someone else to follow your findings.

Feel free to also attach a package report using [DevMiner's package-size-calculator](https://github.com/TheDevMinerTV/package-size-calculator) to the issue, to give an overview of the package's size and the changes you are proposing.

### Fixes

We've now identified a dependency which introduces performance problems. Depending on the type of improvement we've identified, there are a few different approaches for providing a fix/change.

#### Large subtrees

For these dependencies, we should first find out if there's a reason the dependency _is_ necessary and shouldn't be replaced with an alternative.

Reasons the dependency might still be necessary:

- There are no known alternatives (if not, there is a good opportunity to make one!)
- The library supports an older version of Node than any available alternative
- Every deep dependency in the subtree is necessary (in many cases the tree may be deep but for good reason, to share modules, etc.)

If it is indeed replaceable, you should find an alternative. Good resources for that are:

- The [module replacements repository](https://github.com/es-tooling/module-replacements/tree/main/docs/modules)
- [tinylibs](https://github.com/tinylibs/)
- [unjs](https://github.com/unjs/)

Many more may also exist. If you find a good, leaner alternative, [share it with the rest of us](https://chat.e18e.dev)!

#### Duplicated functionality

Often you will find multiple versions of the same dependency, or multiple dependencies entirely, to achieve the same overall functionality.

In the case of multiple versions, we should contribute upstream to update the older one to the latest version (or both if neither is up to date).

In the case of multiple packages, we should see if one solution is better than the other and consider migrating the other if this is the case.

In our Vite example, we would see what uses `fast-glob`, and what uses `glob`. We would then compare the two libraries and alternatives, to find if the dependencies pulling these in could use the same solution, or a newer and better solution.

#### Large dependencies

If you find a large dependency, it is usually the case that it contains far more functionality than we need.

The fix here is often that we either:

- Contribute upstream to split the dependency up into more granular modules (but not _too_ granular)
- Move to a dependency which is leaner and is more focused
