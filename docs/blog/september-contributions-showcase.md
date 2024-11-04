---
title: September contributions showcase
author:
  - name: James Garbutt
sidebar: false
date: 2024-10-06
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: September contributions showcase
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/september-contributions-showcase
  - - meta
    - property: og:description
      content: A showcase of e18e-focused contributions from September
---

# September contributions

_October 6, 2024_

It's that time of month again where we show off some of the great contributions we've seen around the e18e community in the past month!

## Libraries

This month has been a great one for improvements to existing and upcoming libraries. Many have been listening closely to the e18e community and pushing forward together.

### chokidar 4.x

[chokidar](https://github.com/paulmillr/chokidar) is a library for watching for changes on a file system. Built on top of node's own watcher capabilities, it provides a higher level and simpler interface.

Almost all of us depend on this library in some way, often through the toolchain or framework we use.

[@paulmillr](https://x.com/paulmillr/), the author of chokidar, and I ([@43081j](https://x.com/43081j)) have been working hard to get the next major version of it over the line for a long time now (the branch was made in 2021!).

Recently, we finally released [4.0.0](https://github.com/paulmillr/chokidar/releases/tag/4.0.0)! :partying_face: This massively reduces the size and complexity.

Those of you who remember the `is-number` fiasco on social media will now also be super happy that we (chokidar) were the largest consumer of it and have since dropped it entirely :tada:

Big wins for the e18e community!

Thanks to [@benjaminmccann](https://x.com/benjaminmccann) and talentlessguy for contributing _many_ v3 to v4 upgrades already!

### fdir / tinyglobby

`fdir` was in last month's showcase but has earned another mention thanks to the author ([thecodrr](https://x.com/thecodrr)) landing various community contributed PRs and features.

This is a great example of where an author has joined the community and worked closely with it to further their library, and provide some much needed fixes and features.

In version [6.4.0](https://github.com/thecodrr/fdir/releases/tag/v6.4.0), we saw two important changes:

- Ability to exclude symlinks
- Ability to bring your own glob library (e.g. [zeptomatch](https://github.com/fabiospampinato/zeptomatch))

These two changes have helped the community migrate even more high level tools and frameworks across.

Similarly, [tinyglobby](https://github.com/SuperchupuDev/tinyglobby) has shipped a few new versions and **hit 1M downloads/week**. This is amazing work, especially keeping up with the feature requests and feedback of people migrating.

Thanks to [pralkarz](https://github.com/ziebam), [@benjaminmccann](https://x.com/benjaminmccann) and [@superchupudev](https://x.com/superchupu) for already migrating so many projects to these two libraries!

### tinyexec migrations

The community has been working wonders migrating countless projects from `execa`, `ez-spawn`, and other libraries to the super lean [tinyexec](https://github.com/tinylibs/tinyexec/).

For example, thanks to [pralkarz](https://github.com/ziebam), [vitest](https://github.com/vitest-dev/vitest) has already moved over!

There are many more PRs currently in progress to do just the same :pray: Great work by the community here.

## Contributions / Improvements

### Storybook

The [Storybook](https://storybook.js.org/) team have been working closely with the e18e community for some time now, dedicating huge amounts of time to improving the performance and install footprint for everyone.

This month, they've kept up the pace! Just a few examples of what has landed:

- Migrated from `chalk` to `picocolors`
- [pralkarz](https://github.com/ziebam) migrated from `fs-extra` to built in `fs` functions
- Removed `handlebars` and simplified templating internally
- Removed `prettier` from the core bundle (saved **10MB** on the install size)
- Replaced `lodash` with `es-toolkit` (more huge savings, especially with tree shaking)

On top of this, the team has actually started a full project focusing on [reducing the install footprint](https://github.com/storybookjs/storybook/issues/29038) in collaboration with the e18e community.

For anyone interested in helping out in the e18e space, this issue a great way to learn some of the techniques used to track down bundle/install size issues.

As a bonus, they even integrated visual bundle size analysis into their CI so all new PRs can be compared with the main branch.
They did this by generating [esbuild metafiles](https://esbuild.github.io/api/#build-metadata) for all of their packages every time they're built and storing links to the [esbuild Bundle Size Analyzer website](https://esbuild.github.io/analyze/) with those metafiles embedded.
The final result is a visual overview of all package's bundle, that you can [play around with here](https://next--635781f3500dd2c49e189caf.chromatic.com/?path=/story/bench--es-build-analyzer&args=metafile:builder-vite__metafile).

We would love to see this in more projects! You can get inspiration from [the PR](https://github.com/storybookjs/storybook/pull/29117) that implemented the work.

This has all been great to see and will hopefully lead to other large projects making similar efforts! Definitely some big wins ahead :raised_hands:

### nx

The folks over at [nx](https://github.com/nrwl/nx/) have been incredibly active with the e18e community. They are definitely on the same page and have been moving fast to work with the community to land many improvements.

You can see a lot of this in the [tracking issue](https://github.com/es-tooling/ecosystem-cleanup/issues/117) over on the ecosystem cleanup project. These issues are closing quickly, with contributions coming from a few different people in the e18e space.

Just a few examples of the improvements made:

- Migrating older fs-extra code to use newer, native `fs` functionality
- Migrating from chalk to picocolors
- Migrating from glob libraries to fdir

These are all improving the CPU performance of nx and cutting huge subtrees out of the dependency tree at the same time.

### changesets

The [changesets](https://github.com/changesets/changesets) project recently started collaborating directly with the e18e community and we've already seen a good amount of optimisations contributed.

There's a tracking discussion [here](https://github.com/changesets/changesets/discussions/1473) if you want to get involved.

It is awesome to see the maintainers of a large project working so closely with the community on these things :heart:

Big thanks to [@bluwyoo](https://x.com/bluwyoo) and [@andaristrake](https://x.com/andaristrake) for getting this setup!

### jimp

[jimp](https://github.com/jimp-dev/jimp), an image manipulation library, has reduced their package size by an impressive amount:

- Before: 120MB, 392 packages
- After: 25MB, 66 packages

This is awesome work :raised_hands:

## Bonus: ViteConf

[ViteConf](https://viteconf.org/) happened recently and had some amazing talks across all topics.

While it didn't happen in September, it still deserves a mention thanks to how many of the talks mentioned the e18e community.

Our own Bjorn did an excellent talk on performance ([watch here](https://viteconf.org/24/replay/performance)). Similarly, the great people at [Storybook](https://storybook.js.org/) explained a lot of their efforts to reduce their install footprint and how they've collaborated with the e18e community ([watch here](https://viteconf.org/24/replay/storybook)).

## Get involved

If you want to help out, [join the discord](https://chat.e18e.dev). We'd love to have the help :pray:
