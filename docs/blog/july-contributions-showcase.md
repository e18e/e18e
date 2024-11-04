---
title: July contributions showcase
author:
  - name: James Garbutt
sidebar: false
date: 2024-08-05
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: July contributions showcase
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/july-contributions-showcase
  - - meta
    - property: og:description
      content: A showcase of e18e-focused contributions from July
---

# July contributions

_August 5, 2024_

The [e18e community](https://chat.e18e.dev) has been flourishing lately. We've seen a huge amount of contributions across the ecosystem, all the way upstream to some of the deepest dependencies.

Most of us will have been affected by these contributions somewhere down the line, giving us better performance and a smaller footprint.

The people contributing these changes deserve so many thanks for their work, so here is a summary of some of the highlights from the past month!

## `svelte-preprocess` becomes dependency-free

The svelte team have been busy reducing the footprint of [svelte-preprocess](https://github.com/sveltejs/svelte-preprocess).

The before and after values speak for themselves:

- **Before:** 1.5MB / 26 packages
- **After:** 97KB / 1 package

![npmgraph of svelte-preprocess](https://pbs.twimg.com/media/GSDjnNjboAAnrc5?format=jpg&name=4096x4096)

You can read about how this was achieve through these two PRs in particular:

- https://github.com/sveltejs/svelte-preprocess/pull/640
- https://github.com/sveltejs/svelte-preprocess/pull/645

## codemods

One of the biggest steps forward with the [replacements project](https://github.com/es-tooling/module-replacements) has certainly been the [codemods](https://github.com/es-tooling/module-replacements-codemods) repo.

If you haven't yet seen the replacements project, it basically provides community driven lists of suggested replacements to npm packages. These are then consumed by various tools, such as the [eslint plugin](https://github.com/es-tooling/eslint-plugin-depend).

The [codemods project](https://github.com/es-tooling/module-replacements-codemods/) is another consumer of these lists. It provides a place for the community to contribute codemods which can automatically migrate your code to a given replacement package or native functionality.

[@passle_](https://x.com/passle_) has done great work here starting and maintaining the codemods project, and the community have contributed [_many codemods_](https://github.com/es-tooling/module-replacements-codemods/) already.

The future of the [es-tooling](https://github.com/es-tooling) organisation will likely involve a CLI which can apply these codemods for you. Keep an eye out for it in future!

## Removing `is-number` from `micromatch`

While this hasn't been published yet, it is great progress, showing that even some aged projects are open to performance contributions.

[This change](https://github.com/micromatch/to-regex-range/pull/17) removed, in this case, an unnecessary dependency often seen in the ongoing [cleanup work](https://github.com/es-tooling/ecosystem-cleanup/issues).

`is-number` may be small but is often entirely unnecessary. Most consumers can instead use something as simple as `typeof n === 'number'` and provide a stricter API rather than trying to coerce inputs.

Credit to [@talentlessguy](https://github.com/talentlessguy) for this contribution!

## Removing `rimraf` from `node-pre-gyp`

Node has had a `recursive` option for `rmdir` (or `rm` in newer versions) for a while now. This can achieve the same functionality `rimraf` was providing in many cases.

A small but effective win here is the [removal of rimraf](https://github.com/mapbox/node-pre-gyp/pull/720) from `node-pre-gyp`.

It is worth mentioning, for those cases where you'd still like a CLI, you can use [an alternative](https://github.com/es-tooling/module-replacements/blob/main/docs/modules/rimraf.md).

Credit to [@benjaminmccann](https://x.com/benjaminmccann) for this one!

## picoquery

As part of the [cleanup project](https://github.com/es-tooling/ecosystem-cleanup), we were in need of a fast and lightweight query-string parser/stringifier.

Some excellent solutions exist for part of this:

- `URLSearchParams` for general parsing and stringifying of query strings
- [`fast-querystring`](https://github.com/anonrig/fast-querystring): a very fast query string parser with support for arrays

Though a gap existed for the speed of `fast-querystring`, but the functionality of something like qs (object nesting, arrays, custom delimiters, etc).

This is why [picoquery](https://github.com/43081j/picoquery) was born! A super fast and small configurable query string library.

Our hope is that we see more and more of these alternatives being produced by the community. Many popular, bloated or outdated packages still need alternatives. Join the [discussion](https://chat.e18e.dev) if you're interested!

## neotraverse

Similar to how `picoquery` came about, we needed a lighter alternative to the popular `traverse` package.

Big thanks to [@puruvjdev](https://x.com/puruvjdev) for making this happen by publishing [neotraverse](https://github.com/PuruVJ/neotraverse)!

The savings are great:

- **traverse:** 3.9MB / 67 packages
- **neotraverse:** 140KB / 1 package

## package-size-calculator

Built by [@DevMiner](https://github.com/TheDevMinerTV), this is a cool little CLI that can provide package size stats and an estimate of the monthly bandwidth usage.

Many people have been using this already in the e18e community to get a rough idea of potential savings by changing dependencies.

Combining this with [npmgraph](https://npmgraph.js.org/) and [pkg-size](https://pkg-size.dev/) is a great way to investigate how to improve a package.
