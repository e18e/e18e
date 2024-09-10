---
title: August contributions showcase
author:
  - name: James Garbutt
sidebar: false
date: 2024-09-07
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: August contributions showcase
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/august-contributions-showcase
  - - meta
    - property: og:description
      content: A showcase of e18e-focused contributions from August
---

# August contributions

_September 7, 2024_

This post is a little late thanks to me being stuck in the middle of a super typhoon, but here's some highlights of what the community has been up to in August!

If you want to get involved, remember to come [join the discussion](https://chat.e18e.dev)!

# Libraries

Here are just some of the great libraries we've seen this August.

## tinyexec

[tinyexec](https://github.com/tinylibs/tinyexec) is a new library from the [tinylibs](https://github.com/tinylibs) group to provide a super lightweight abstraction around `child_process`.

Usage is familiar and simple:

```ts
import { x } from 'tinyexec'

await x('npm', ['install'])
```

In many places where we need to launch a command, we don't need a high level abstraction so we can save a lot on performance and footprint by using this instead.

[vitest](https://github.com/vitest-dev/vitest/), [nuxt](https://github.com/nuxt/nuxt), [astro](https://github.com/withastro/astro), and many others have already moved over.

For places where we do want a higher level interface, we still have projects like [zx](https://github.com/google/zx).

## tinyglobby / fdir

Much of the community has been hard at work moving projects away from various heavyweight glob libraries to [fdir](https://github.com/thecodrr/fdir).

fdir is a very fast and lightweight library for traversing the file system and has optional glob support.

Already a great contributor in the e18e space, [@superchupudev](https://x.com/superchupu) has also provided us with [tinyglobby](https://github.com/SuperchupuDev/tinyglobby).

tinyglobby adds a useful layer on top of fdir for when you still need a glob interface and consistent behaviour with other glob libraries:

```ts
import { glob } from 'tinyglobby'

const files = await glob(['src/*.ts'])
```

So many projects have been quick to adopt these libraries, saving on install size and getting great performance gains at the same time. To name a few:

- [nuxt](https://github.com/nuxt/nuxt)
- [vitest](https://github.com/vitest-dev/vitest/)
- [vitepress](https://github.com/unocss/unocss)
- [unocss](https://github.com/unocss/unocss)
- [pkg-pr-new](https://github.com/stackblitz-labs/pkg.pr.new)
- [tsup](https://github.com/egoist/tsup)
- and many, many more

Great work by both [@thecodrr](https://x.com/thecodrr) and [@superchupudev](https://x.com/superchupu) here!

## package-manager-detector

[`package-manager-detector`](https://github.com/antfu-collective/package-manager-detector) is used to detect the local package manager (e.g. `npm`, `pnpm`, `yarn`, etc.)

Much lighter than other alternatives, this package has quickly been adopted by many projects across the ecosystem.

As an example, [@benjaminmccann](https://x.com/benjaminmccann) switched from `preferred-pm` (1MB) to `package-manager-detector` (28KB) in [`changesets`](https://github.com/changesets/changesets/pull/1446) and [`svelte-add`](https://github.com/svelte-add/svelte-add/pull/535) recently. Great work :pray:

Thanks to [@antfu7](https://x.com/antfu7) and [@userquin](https://x.com/userquin) for building this!

## tschema

[tschema](https://github.com/lukeed/tschema) is a cool new library to generate JSON schema types by [@lukeed05](https://x.com/lukeed05).

Super light and fast, this is another package quickly being adopted in the e18e space.

```ts
import * as t from 'tschema'

const User = t.object({
  uid: t.integer()
})
```

## knip

[knip](https://github.com/webpro-nl/knip) is a tool for detecting unused files and dependencies in your project. This has been incredibly useful and widely used across the e18e community already.

For example, [mocha](https://github.com/mochajs/mocha/pull/5042) has already adopted this and cleaned up a huge amount of deep dependencies thanks to the efforts of [@voxpelli](https://x.com/voxpelli).

# Contributions / Improvements

As well as some cool new libraries, we've seen many great contributions to performance and clean up across the ecosystem.

## dotenvx

The maintainers of [dotenvx](https://github.com/dotenvx/dotenvx) have been hard at work with [@superchupudev](https://x.com/superchupu) to massively reduce the install size and depedency tree complexity.

Down from [142 dependencies](https://npmgraph.js.org/?q=@dotenvx/dotenvx@1.0.0) to only [28 dependencies](https://npmgraph.js.org/?q=@dotenvx/dotenvx), this is a great achievement :tada:

## changesets

The [changesets](https://github.com/changesets/changesets) project has been busy merging _many_ e18e-focused improvements.

Just a quick look at the [changelog](https://github.com/changesets/changesets/releases), you can see many of our community have been working to reduce the dependency tree and increase performance.

Thanks to [@bluwyoo](https://x.com/bluwyoo), [@benjaminmccann](https://x.com/benjaminmccann) and [@trivikram](https://x.com/trivikram) in particular for pushing this forward :pray:

## picocolors

[picocolors](https://github.com/alexeyraspopov/picocolors) has been around a while already, but recently published a new version with support for bright variants of colours.

This has allowed many, many projects to migrate to it from other slower and larger libraries.

If you need terminal colors, this is the one to use.

If you're using node 20 or above, and don't need to support older runtimes, also check out [styleText](https://nodejs.org/api/util.html#utilstyletextformat-text-options) which is built in!

## payload CMS

The [payload CMS](https://github.com/payloadcms/payload/) team have been doing some impressive work optimizing the install size and performance of their packages.

Some quick stats:

- **Before:** 277MB, 603 packages
- **After:** 54MB, 148 packages

To get an idea of the change, take a look at the npmgraph [before](https://npmgraph.js.org/?q=payload@2) and [after](https://npmgraph.js.org/?q=payload@3.0.0-beta.100).

## postcss

The PostCSS maintainers are taking a good focus on e18e lately. In [postcss-mixins](https://www.npmjs.com/package/postcss-mixins), the size has gone from 1.3MB to 930KB, dropping ~15 dependencies.

Great work by [@sitnikcode](https://x.com/sitnikcode) and the team on taking an e18e focus recently.

# Get involved

If you want to help out, [join the discord](https://chat.e18e.dev). We'd love to have the help :pray:

There are still many gaps to fill with new libraries, many contributions to existing libraries to be had, and many performance gains to be achieved.
