---
title: What module-replacements is (and isn't)
author:
  - name: The e18e Core Team
sidebar: false
date: 2026-07-25
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: What module-replacements is (and isn't)
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/module-replacements-intention
  - - meta
    - property: og:description
      content: The goal of the module replacements dataset, suggestions for lighter, more modern alternatives.
  - - meta
    - property: og:image
      content: https://e18e.dev/og/module-replacements-intention.png
---

# What module-replacements is (and isn't)

_July 25, 2026_

![What module-replacements is (and isn't) cover image](/og/module-replacements-intention.png)

The [module-replacements](https://github.com/e18e/module-replacements) project has been at the core of the e18e community since the beginning. As it has grown, so have the conversations around it and some of those conversations keep circling back to the same misunderstanding about what the project actually claims.

So let's write it down, once, in one place.

## What it is

module-replacements is a community-maintained dataset which maps npm packages to _possible_ alternatives. It covers three kinds of suggestions:

- **Native replacements**: modules whose functionality is now available in the platform itself (e.g. features that landed in JavaScript or Node.js years ago).
- **Micro utilities**: very small packages which could be replaced with a native equivalent or a few lines of your own code.
- **Preferred replacements**: an opinionated list of packages with lighter or more modern alternatives, sometimes actively maintained forks of unmaintained originals.

A module might be flagged as replaceable if it is no longer actively maintained, has more performant or modern alternatives, has known security vulnerabilities, or lacks support for modern JavaScript features (ES Modules, TypeScript, and so on).

That's it. It's a dataset of suggestions, built and reviewed in the open, powering tools like [replacements.fyi](https://replacements.fyi) and the [e18e CLI](https://e18e.dev/docs/cli/).

## What it isn't

### It is not a claim of feature parity

We have never claimed that a suggested replacement has 100% of the features of the module it replaces, and parity has never been the bar for inclusion.

A replacement is listed because it covers the _common_ use cases at a much lower cost: fewer bytes, fewer transitive dependencies, less legacy code, better support for modern platforms. Many of the modules in the dataset accumulated features over a decade or more; most consumers use a small fraction of them. If your project genuinely depends on the long tail of features, the original module may well still be the right choice for you, and that's fine. The dataset exists to tell you an alternative _exists_, not that it is a drop-in for every possible usage.

Judging a suggestion by whether it replicates every feature of the original is measuring it against a goal the project never had.

### It is not a verdict on a project or its maintainers

A module appearing in the dataset does not mean "this project is bad" or "these maintainers failed". Many listed modules are well-built and served the ecosystem for years. That's precisely _why_ they're widely used enough to matter. Listing means one thing: for many consumers, a lighter or more modern option now exists. Maintainers of listed modules have often done exactly what good maintainers should do, which is keep something stable for a very long time. The ecosystem moving on from some of that surface area is a sign the platform improved, not that their work didn't matter.

### It is not a mandate

Nobody is required to replace anything. The dataset is input for an informed decision, not an instruction. Our own [cleanup guide](https://e18e.dev/learn/cleanup) says as much: before replacing a dependency, check that the alternative supports your engine targets, that it actually covers what you use, and that the migration cost is worth it. "Don't replace this" is sometimes the correct conclusion, and reaching it with full information is the dataset doing its job.

## It's a living dataset

Modules are added over time, and removed. Projects regain active maintenance, drop their legacy weight, migrate to modern standards; when that happens, the reasons for a listing can disappear, and the listing should too.

Disagreement is part of that process, not a failure of it. If you think an entry is wrong (the suggested replacement is inadequate, the original has changed, the reasoning no longer holds), [open an issue](https://github.com/e18e/module-replacements/issues). Entries have been amended and removed because someone made a good argument. That's the system working.

## Get involved

- Explore the dataset at [replacements.fyi](https://replacements.fyi) or in the [repo](https://github.com/e18e/module-replacements)
- Suggest additions, changes, or removals via [issues](https://github.com/e18e/module-replacements/issues)
- Join the [e18e Discord](https://chat.e18e.dev) to discuss

The goal has always been the same: help people ship less code they don't need. Everything else is detail.
