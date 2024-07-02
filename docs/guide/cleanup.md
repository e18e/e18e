# Cleanup

The JavaScript ecosystem has grown massively over the years, in good and bad ways. We have all the packages and choice we want, but have built up a vast amount of technical debt along the way.

Much of this is in the form of packages which are redundant, bloated or have since fallen out of active maintenance.

In an attempt to clean this up, the [ecosystem-cleanup effort](https://github.com/43081j/ecosystem-cleanup) has been started.

This project aims to drive contributions upstream to many different open-source projects. A few of the things we will do:

- Modernize existing packages
- Migrate from redundant packages
- Migrate from inactive packages
- Migrate to lighter and/or faster alternatives

If you'd like to get involved, we suggest reading the [Ecosystem Cleanup Guide](https://github.com/43081j/ecosystem-cleanup/blob/main/docs/guide.md), which explains how to discover common problems to resolve in upstream packages.

Make sure to checkout the [Module Replacements](https://github.com/es-tooling/module-replacements/tree/main?tab=readme-ov-file#module-replacements) project. It provides a collection of module replacements (i.e. possible alternative packages) and tools to automatically detect possible improvements.

And join us at the [e18e Discord server](https://chat.e18e.dev) to connect with others to share your wins or get help along the way!

## Contribution Guide

This guide is here to help you discover and contribute improvements to the ecosystem. We will go through some common discovery techniques and common problems to resolve in upstream packages.

### Discovery

We're mostly looking for packages which fit the following criteria:

- Bloated
- No longer maintained
- Outdated
- Slow
- Redundant

A good start to this is to choose the **target package** you want to improve. For example, we could choose to improve [vite](https://github.com/vitejs/vite).

Our first step is to _discover_ the current state of this package.

We can do that with [npmgraph](https://npmgraph.js.org/) and [pkg-size](https://pkg-size.dev/).

In this case, we can visualize vite's dependency graph and size here:

- [vite dependency graph](https://npmgraph.js.org/?q=vite)
- [vite package size](https://pkg-size.dev/vite)

This should give us a good idea of dependency tree complexity and overall _install size_ (amount of data you'll pull down on install).

#### Rollup bundles

In our particular example, vite seems to have very few dependencies and has an install size we can probably reduce (32MB at time of writing this).

This is because vite bundles many of their production dependencies rather than pulling them in from `node_modules`.

Due to this, we have to go a little further: rollup bundle analysis.

We can use the [`rollup-plugin-visualizer`](https://github.com/btd/rollup-plugin-visualizer) plugin to generate a visualization of vite's bundle.

From the visualization this produces, you should quickly get a good idea of the larger dependencies in the bundle and the tree that leads to them being imported.

#### Note on dependency depth

Easy wins in the dependency graph are often those packages which themselves pull in very large subtrees of dependencies.

While this is usually true, some of those deep dependencies do have their uses (e.g. older node versions). Remember to take this into account before assuming we can remove the tree from the dependency list.

### Improvement

Now that we've seen the dependency graph, the package size and the bundle size/distribution, we can begin to think of improvements.

What we should be looking for:

- Dependencies which pull in large subtrees of deeper dependencies which themselves are not depended on by anything outside of the subtree.
- Dependencies which are duplicated (either through multiple versions, or multiple dependencies achieving the same goals).
- Very large (install size) dependencies.

Back to our vite example - at the time of writing this, we can see in the rollup bundle that both `fast-glob` and `glob` are bundled into vite.

This will mean we are bundling two non-trivial packages which essentially do the same thing. We have found a possible performance improvement!

#### Create cleanup issues

At this point, if you have identified some potential performance improvements, you should open issues in this repository.

Even if you will try tackle them yourself, this will help improve visibility so people do not duplicate work and can help you out.

Or if you do not have time to tackle it yourself, it is possible someone else can follow your findings.

### Fixes

We've now identified some dependency which introduces performance problems.

Depending on the type of improvement we've identified, there are a few different approaches for providing a fix/change.

#### Large subtrees

For these dependencies, we should first find out if there's a reason we need them and not an alternative.

Common things to check:

- node `engines` specifying a node version low enough that this dependency supports (and alternatives don't).
- there is no known alternative (good opportunity to make one!).
- every deep dependency in the subtree is necessary (in many cases the tree may be deep but for good reason, to share modules, etc).

If it is indeed replaceable, you should find an alternative. Good resources for that are:

- The [module replacements repository](https://github.com/es-tooling/module-replacements/tree/main/docs/modules)
- [tinylibs](https://github.com/tinylibs/)
- [unjs](https://github.com/unjs/)

Many more will also exist. If you find a good, leaner alternative, [share it with the rest of us!](https://chat.e18e.dev)

#### Duplicated functionality

Often you will find dependencies which use separate versions, or separate solutions entirely to achieve the same piece of functionality.

In the case of separate versions, we should contribute upstream to update the one which is behind to the latest version (or both if neither is up to date).

In the case of separate solutions, we should see if one solution is better than the other and consider migrating the other if this is the case.

In our vite example, we would see what uses `fast-glob`, and what uses `glob`. We would then compare the two libraries and alternatives, to find if the dependencies pulling these in could use the same solution, or a newer and better solution.

#### Large dependencies

If you find a large dependency, it is usually the case that it contains far more (useful) functionality than we need.

The fix here is often that we either:

- Contribute upstream to split the dependency up into more granular modules (but not _too_ granular).
- Move to a dependency which is leaner and is more focused.

In this situation, it is worth looking for a lighter (and hopefully faster) alternative.
