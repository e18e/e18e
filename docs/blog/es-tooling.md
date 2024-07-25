---
title: ES Tooling - community lead e18e-focused tooling
author:
  - name: James Garbutt and Pascal Schilp
sidebar: false
date: 2024-07-22
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: ES tooling - community lead e18e-focused tooling
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/es-tooling
  - - meta
    - property: og:description
      content: ES Tooling - a community lead, e18e-focused collection of tools for the ecosystem
---

# ES Tooling

_July 22, 2024_

The e18e initiative has seen huge growth since launch. We've seen hundreds of performance contributions upstream to popular projects, and the creation of many community lead tools.

A notable example of this is the [ES Tooling](https://github.com/orgs/es-tooling/repositories) community GitHub organisation.

If you haven't yet encountered e18e, read more in the [guide](https://e18e.dev/guide/#why-e18e) and [join the community](https://chat.e18e.dev/).

## A home for e18e-focused tools

Over the last few months, many of us have collaborated and connected through the e18e community. The ES tooling organisation is a result of that - a place for us to store and own forks, tools, and other code bases we're working on together.

A few popular projects that were running solo until now, have come together to create this:

- [ecosystem-cleanup](https://github.com/43081j/ecosystem-cleanup).
- [module-replacements](https://github.com/es-tooling/module-replacements).
- [module-replacements-codemods](https://github.com/thepassle/module-replacements-codemods)
- [fd-package-json](https://github.com/es-tooling/fd-package-json)

While e18e exists to connect us all and provide a space to collaborate, it doesn't exist to own the projects coming out of the initiative. That is where projects like es-tooling, unjs and more come in to play.

**We expect es-tooling will be one of many community lead orgs with an e18e focus.**

## Ecosystem cleanup

One of the projects which kicked much of this initiative off - the ecosystem cleanup project has now moved into the ES Tooling organisation to allow better visibility and maintenance.

The cleanup project exists primarily as an issue tracker, tracking:

- Footprint reduction in popular packages
- Missing forks or alternatives that could be worked on
- Performance improvements in popular packages

If you want to help out, this project is a good starting point to find some open issues.

Read more at the [ecosystem cleanup project](https://github.com/es-tooling/ecosystem-cleanup).

## Module replacements

The module replacements project is a community lead list of popular npm packages and their possible replacements.

Often, these replacements are native, or much faster and more modern packages. If you know of a good alternative to something, get involved and add to the list!

Read more at the [module replacements project](https://github.com/es-tooling/module-replacements).

## Module replacements codemods

The module replacements codemods project is an effort to automate the ecosystem cleanup. Taking the module replacements as input, we aim to have automated codemods for all packages listed. This way other tooling can use these codemods to perform transformations on projects automatically. For example, a codemod for the `is-even` package would result in:

Before:
```js
const isEven = require('is-even')
console.log(isEven(2))
```

After:
```js
console.log(2 % 2 === 0)
```

We'll also be looking into implementing a CLI around these codemods so people can run them on their own projects, or so they can run them on other projects and create pull requests to them, hopefully simplifying the amount of effort it takes to replace dependencies.

You can find more information about the [module replacements codemods](https://github.com/es-tooling/module-replacements-codemods) repository. If you're interested in seeing the before/after states of the codemods, take a look at the [test fixtures](https://github.com/es-tooling/module-replacements-codemods/tree/main/test/fixtures). Every codemod has one or more before/after examples available.

## What's next?

If you own an e18e-focused project, or need a home for a new project, [get involved!](https://chat.e18e.dev/)
