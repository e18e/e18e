---
title: September contributions showcase
author:
  - name: James Garbutt
sidebar: false
date: 2024-10-03
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

_October 3, 2024_

It's that time of month again where we show off some of the great contributions we've seen around the e18e community in the past month!

# Libraries

This month has been a great one for improvements to existing and upcoming libraries. Many have been listening closely to the e18e community and pushing forward together.

## chokidar 4.x

[chokidar](https://github.com/paulmillr/chokidar) is a library for watching for changes on a file system. Built on top of node's own watcher capabilities, it provides a higher level and simpler interface.

Almost all of us depend on this library in some way, often through the toolchain or framework we use.

Paul ([@paulmillr](https://x.com/paulmillr/), the author of chokidar) and I ([@43081j](https://x.com/43081j)) have been working hard to get the next major version of it over the line for a long time now (the branch was made in 2021!).

Recently, we finally released [4.0.0](https://github.com/paulmillr/chokidar/releases/tag/4.0.0)! :partying_face: this massively reduces the size and complexity.

Those of you who remember the `is-number` fiasco on social media will now also be super happy that we (chokidar) were the largest consumer of it and have since dropped it entirely :tada:

Big wins for the e18e community!

Thanks to [@benjaminmccann](https://x.com/benjaminmccann) and talentlessguy for contributing _many_ v3 to v4 upgrades already!

## fdir / tinyglobby

`fdir` was in last month's showcase but has earned another mention thanks to the author ([thecodrr](https://x.com/thecodrr)) landing various community contributed PRs and features.

This is a great example of where an author has joined the community and worked closely with it to further their library, and provide some much needed fixes and features.

In version [6.4.0](https://github.com/thecodrr/fdir/releases/tag/v6.4.0), we saw two important changes:

- Ability to exclude symlinks
- Ability to bring your own glob library (e.g. [zeptomatch](https://github.com/fabiospampinato/zeptomatch))

These two changes have helped the community migrate even more high level tools and frameworks across.

Similarly, [tinyglobby](https://github.com/SuperchupuDev/tinyglobby) has shipped a few new versions. Particularly it is now able to determine if a string is a glob or not. This is super useful for migrating more projects to it.

Thanks to pralkarz, [@benjaminmccann](https://x.com/benjaminmccann) and [@superchupudev](https://x.com/superchupu) for already migrating so many projects to these two libraries!

## tinyexec migrations

The community has been working wonders migrating countless projects from `execa`, `ez-spawn`, and other libraries to the super lean [tinyexec](https://github.com/tinylibs/tinyexec/).

For example, thanks to pralkarz, [vitest](https://github.com/vitest-dev/vitest) has already moved over!

There are many more PRs currently in progress to do just the same :pray: Great work by the community here.

# Contributions / Improvements

## storybook

The [storybook](https://storybook.js.org/) team have been working closely with the e18e community for some time now, dedicating huge amounts of time to improving the performance and install footprint for everyone.

This month, they've kept up the pace! Just a few examples of what has landed:

- Migrated from `chalk` to `picocolors`
- Migrated from `fs-extra` to built in `fs` functions
- Removed `handlebars` and simplified templating internally
- Removed `prettier` from the core bundle (saved **4MB** on the install size)
- Replaced `lodash` with `es-toolkit` (more huge savings, especially with tree shaking)

On top of this, the team has actually started a full project focusing on [reducing the install footprint](https://github.com/storybookjs/storybook/issues/29038) in collaboration with the e18e community.

For anyone interested in helping out in the e18e space, this issue a great way to learn some of the techniques used to track down bundle/install size issues.

As a bonus, they even integrated bundle size analysis into their CI so all new PRs can be compared with the main branch. Would love to see that in more projects!

This has all been so great to see and will hopefully lead to other large projects making similar efforts! Definitely some big wins ahead :raised_hands:

## nx

The folks over at [nx](https://github.com/nrwl/nx/) have been incredibly active with the e18e community. They are definitely on the same page and have been moving fast to work with the community to land many improvements.

You can see a lot of this in the [tracking issue](https://github.com/es-tooling/ecosystem-cleanup/issues/117) over on the ecosystem cleanup project. These issues are closing quickly, with contributions coming from a few different people in the e18e space.

Just a few examples of the improvements made:

- Migrating older fs-extra code to use newer, native `fs` functionality
- Migrating from chalk to picocolors
- Migrating from glob libraries to fdir

These are all improving the CPU performance of nx and cutting huge subtrees out of the dependency tree at the same time.

## jimp

[jimp](https://github.com/jimp-dev/jimp), an image manipulation library, has dropped an impressive amount of dependencies and reduced their package size hugely.

- Before: 120MB, 392 packages
- After: 25MB, 66 packages

This is awesome work :raised_hands:

# Get involved

If you want to help out, [join the discord](https://chat.e18e.dev). We'd love to have the help :pray:
