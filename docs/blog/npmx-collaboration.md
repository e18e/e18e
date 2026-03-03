---
title: Collaborating with npmx
author:
  - name: James Garbutt
sidebar: false
date: 2026-03-03
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Collaborating with npmx
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/npmx-collaboration
  - - meta
    - property: og:description
      content: How the e18e community have been collaborating with npmx to create a better experience for the ecosystem
---

# Collaborating with npmx

_March 3, 2025_

As part of reaching more developers with best practice advice and tools, we have recently started collaborating with the great new [npmx](https://npmx.dev/) project!

## What is npmx?

Today, the npm website is lacking in many useful features and seems to largely be unmaintained other than for bug fixes. This has led to an increase in demand for an alternative frontend to the npm registry.

Many people have been trying to solve this problem for some time now. For example, [@bluwy](https://bsky.app/profile/bluwy.me) created a very helpful [user script](https://github.com/bluwy/npm-userscript) which adds a bunch of extra features to the npm website at runtime. However, this has its limits as a user script. Similarly, many people have tried to create alternative frontends, but each with their own approach and none have really taken off.

npmx is a new project which aims to solve this problem, and has done much of that by bringing all of these people and many more together to collaborate on one unified frontend.

## How we're collaborating

A large part of the e18e initiative is about documenting and advising developers on how to make their packages more performant. We do this today through a few of our tools: an [ESLint plugin](https://github.com/e18e/eslint-plugin), a [CLI](https://github.com/e18e/cli), and a [GitHub action](https://github.com/e18e/action-dependency-diff).

These are all extremely useful tools, but they need to be introduced into your workflow rather than being available out of the box.

As an npm frontend, npmx is the perfect place to surface this advice and tooling to developers at the point of discovery. For example, when a developer is looking at a package on npmx, they could see a warning that the package has a large footprint and be given advice on how to fix it, along with links to our tools to help them do that.

## Performance advice on npmx

The community have already added some great features to npmx which make use of our curated best practices advice.

For example, when looking at a package which is known to be redundant across all modern engines, you will now see something like this:

> ![npmx screenshot](/images/npmx-redundant-package.png)

Similarly, when you look at a package which has significantly increased in size or dependencies since the last version, you will see something like this:

> ![npmx screenshot](/images/npmx-increased-size.png)

Lastly, when you look at the dependencies of a package, you will now see warnings on any dependencies which are known to be redundant or have more performant replacements:

> ![npmx screenshot](/images/npmx-dependency-warnings.png)

## What's next?

This is just the beginning of our collaboration and what we can achieve together. A few more upcoming ideas we have include:

- Adding smart dependency advice (based on your chosen minimum Node version, browser support, etc.)
- Adding richer advice with example code snippets and links to our tools
- Highlighting packages with duplicate dependencies

Thanks to our community-maintained [replacements data](https://github.com/es-tooling/module-replacements), much of this advice and more is already available to be surfaced.

In addition to the module replacements data, we are also hard at work on a new data project which will provide enriched registry data. This will allow npmx and other tools to show things like license information, install sizes, and more.

## Get involved

If you're interested in collaborating with us on this, or have any ideas on how we can improve the experience for developers, please join our community on [Discord](https://chat.e18e.dev/) and let us know!
