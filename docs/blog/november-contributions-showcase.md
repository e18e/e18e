---
title: November contributions showcase
author:
  - name: James Garbutt
sidebar: false
date: 2024-12-03
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: November contributions showcase
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/november-contributions-showcase
  - - meta
    - property: og:description
      content: A showcase of e18e-focused contributions from November
  - - meta
    - property: og:image
      content: https://e18e.dev/og/november-contributions-showcase.png
---

# November contributions

_December 3, 2024_

![November Contributions Cover Image](/og/november-contributions-showcase.png)

Another month, another great list of performance gains across the ecosystem. This month, we've also seen a huge effort to improving visibility of these things so more people can get involved. Let's take a look!

## Libraries

### kasi

A set of utilities we've seen quite often in the wild are case transforms. For example, transforming to and from camel case (e.g. from `foo-bar` to `fooBar`).

Often, this has been achieved by using a micro-utility dependency or by repeating a very similar function to everyone else who needed this logic.

This is a really good example of something which is too big to be copied everywhere, but too small to justify its own package.

So what do we do in these cases? We group the common case transforms and use _that_ as a library.

That is exactly what Fabio has done with [kasi](https://github.com/fabiospampinato/kasi)!

kasi is a great collection of functions for transforming between various cases (pascal, camel, snake, etc). Instead of pulling in many micro-packages, or repeating code, we can now use this.

Great work as always, Fabio! :pray:

### unicode-segmenter

As part of the bluesky contributions mentioned later in this post, some of the community noticed a large chunk of the JS bundle was taken up by [graphemer](https://github.com/flmnt/graphemer).

This library is used to split or count the number of grapheme clusters in a string (i.e. the visual symbols we would perceive as individual characters). It does a good job at this but comes in at a whopping 812KB!

Fortunately, [@hyeseong.kim](https://bsky.app/profile/hyeseong.kim) came along and built [unicode-segmenter](https://github.com/cometkim/unicode-segmenter) :tada: This library achieves the same functionality at a fraction of the size (250KB).

Really great work here. This helped us reduce bundle sizes in a whole bunch of projects.

### sonda

As part of the cleanup effort in the e18e space, it is a common need that we want to analyze the bundle of a project. Usually, we do this to find duplicate dependencies, oversized dependencies and so on.

In the wild, there are not many tools to do this analysis and do it accurately. This has left us with often manually inspecting bundles and the process taking a lot longer than it should.

All good, though, [Filip](https://bsky.app/profile/filipsobol.bsky.social) has come to the rescue with his new tool: [sonda](https://github.com/filipsobol/sonda/tree/main/packages/sonda)!

Sonda is a bundle analyzer which works with all popular bundlers and accurately determines the bundle contents by leaning on sourcemaps. This works great and has already helped us with many investigations into footprint reduction of some projects :pray:

### fuzzyma's e18e tools

Another great contribution to the community recently is a tool by [@fuzzyma](https://bsky.app/profile/fuzzyma.bsky.social) which can determine the dependents of a given package.

You can see the source [here](https://github.com/fuzzyma/e18e-tools) and an example of the produced output [here](https://github.com/es-tooling/ecosystem-cleanup/issues/137#issue-2702026306).

This is such a useful tool since we have no easy API access to find this information right now.

In many of the issues of the [cleanup project](https://github.com/es-tooling/ecosystem-cleanup/), we now have an incredibly useful list of all the top dependents of the target package. This is making the cleanup work so much easier.

Big thanks to [@fuzzyma](https://bsky.app/profile/fuzzyma.bsky.social) and [@devminer.xyz](https://bsky.app/profile/devminer.xyz) for making this a thing!

## Contributions / Improvements

### bluesky

Some fun collaboration kicked off in the [e18e discord](https://chat.e18e.dev) recently. A few members of the community started looking into the bluesky bundle size, and noticed a few inefficiencies :eyes:

While digging around, they noticed [zod](https://github.com/colinhacks/zod) was included twice in the bundle!

A simple lockfile update allowed this to be de-duped, and shaved off a fair chunk of the bundle.

Super work here by [@marvinh.dev](https://bsky.app/profile/marvinh.dev) and [@jviide.iki.fi](https://bsky.app/profile/jviide.iki.fi) :tada:

You can read more about the investigation and the solution in the [pull request](https://github.com/bluesky-social/social-app/pull/6610).

## Other news

### deoptexplorer

More of a "you should know about this" than news - [deoptexplorer](https://github.com/microsoft/deoptexplorer-vscode) is an extremely useful VSCode plugin to help you find deoptimisations in your code.

In the community, we have started using it heavily to find performance bottlenecks in many different popular tools.

Big thanks to microsoft for building this! Check it out and maybe you'll find some performance improvements :rocket:

### `require(esm)` unflagged in Node 22.x

In Node 22.x, the ability to `require(...)` ES modules has been unflagged and enabled by default!

This is huge news and should open many doors for us being able to migrate libraries to ESM-only. We should also be able to gradually start removing dual-package publishing from various popular packages and go all in on ESM.

Read more about this in [Node's blog post](https://nodejs.org/en/blog/release/v22.12.0#requireesm-is-now-enabled-by-default).

Excellent work by [@joyeecheung](https://bsky.app/profile/joyeecheung.bsky.social) as always :pray:

### vite 6.0

A big milestone this month - vite 6.0 was released!

This new release has a huge number of changes and, in the context of e18e, has a great list of performance improvements many of our community worked on.

Two big changes are the upgrade of [chokidar](https://github.com/paulmillr/chokidar) to 4.x, and the migration to [tinyglobby](https://github.com/SuperchupuDev/tinyglobby). These two alone reduced the bundle size greatly :broom:

On top of that, various other dependency upgrades and performance improvements mean this is by far the fastest and smallest vite so far. Great work as always by the team and the community :heart:

## Get involved

If you want to help out, [join the discord](https://chat.e18e.dev). We'd love to have the help :pray:
