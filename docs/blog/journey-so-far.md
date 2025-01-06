---
title: The journey so far
author:
  - name: James Garbutt
sidebar: false
date: 2025-01-06
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: The journey so far
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/the-journey-so-far
  - - meta
    - property: og:description
      content: Our journey so far as a community leading into 2025
  - - meta
    - property: og:image
      content: https://e18e.dev/e18e-og-image.png
---

# e18e - Journey so far

_January 6, 2025_

![e18e Cover Image](/e18e-og-image.png)

This month we're skipping the usual monthly showcase post to write a little about what we got upto in 2024 and what lies ahead for us in 2025 :rocket:

Before we start, a little about me - I'm one of the creators of e18e and can be found in most places as [@43081j](https://bsky.app/profile/43081j.com). I maintain and contribute to a whole bunch of things but have been focusing on this community for the past year.

Enough about me though! Let's take a look at some history and what lies ahead for us as a community.

## Way back...

For a long time, I found myself returning many times to the need for a more performant JavaScript ecosystem.

As far back as 2017, I was involved with [depcheck](https://github.com/depcheck/depcheck), a tool which detects unused dependencies amongst other things. I worked on a whole bunch of features and fixes for this tool so I could start introducing it to projects to keep a closer eye on dependency trees.

Around the same time as this, I was submitting PRs to various projects to remove redundant polyfills, one-liner packages and a few other things.

Every few months, I'd think about this again and start submitting another bunch of cleanup PRs.

I even made a few attempts at creating repos to share this effort (e.g. [you-dont-need-x](https://github.com/43081j/you-dont-need-x) and [eslint-plugin-clutter](https://github.com/43081j/eslint-plugin-clutter)).

Unfortunately, none of these efforts really went anywhere. I struggled to find anyone who cared and would often move on to something else for a few months before I got the itch in my brain to tackle it again.

## Starting a cleanup

Eventually, I created the [ecosystem-cleanup](https://github.com/es-tooling/ecosystem-cleanup) project as place to track performance improvements in popular open source projects.

In the early days, this was basically me creating issues for myself to contribute to various OSS projects.  Things like:

- Removing redundant polyfills
- Upgrading packages
- Replacing large packages with lighter, more focused ones
- Replacing unmaintained packages with modern, maintained alternatives

It was a lot of work for one person, but I kept chipping away in the hope that I could raise awareness of performance and start to improve some of the ecosystem.

## Beginnings of a community

A few years later, [@bluwy](https://bsky.app/profile/bluwy.me) was posting about his efforts to speed up [astro's](https://github.com/withastro/astro) tooling. Around the same time, [@antfu](https://bsky.app/profile/antfu.me) quote posted this with the following:

> Would be cool if we have a "full-time perf optimizers" for the ecosystem :eyes:

A lengthy discussion later, [@antfu](https://bsky.app/profile/antfu.me), [@bluwy](https://bsky.app/profile/bluwy.me), [@patak](https://bsky.app/profile/patak.dev) and I came up with the idea for [e18e](https://e18e.dev/)!

Many of us care about ecosystem performance just as much as each other, but never had a space to collaborate or even share that we're working on similar things. The e18e community has connected us so closely and given us a place to grow together.

## Finding like-minded people

In the first couple of days, we went out to find others who were working on similar things and might want to collaborate.

To name a few:

- [@marvinh.dev](https://bsky.app/profile/marvinh.dev) had been writing for a while about [speeding up the ecosystem](https://marvinh.dev/blog/speeding-up-javascript-ecosystem/)
- [@aslemammad](https://bsky.app/profile/aslemammad.bsky.social) had been working hard on the [tinylibs organisation](https://github.com/tinylibs/)
- [@passle.dev](https://bsky.app/profile/passle.dev) had been digging into barrel files for a while (but hadn't yet made his [eslint plugin for detecting barrel files](https://github.com/thepassle/eslint-plugin-barrel-files))
- [@pi0.io](https://bsky.app/profile/pi0.io) had been working on [unjs](https://github.com/unjs)
- [@benmccann.com](https://bsky.app/profile/benmccann.com) had already been working on svelte performance

All of these people and many others were working on some aspect of performance. Seeing them connect and have a space to collaborate was awesome :heart:

## Results so far

Several months later, here's a few stats from the past year:

- ~150 issues in the [cleanup project](https://github.com/es-tooling/ecosystem-cleanup/) to track contributions to performance of other projects
- ~100 merged PRs in the [module-replacements project](https://github.com/es-tooling/module-replacements) to document performant replacements to popular modules
- ~150 codemods in the [module-replacements-codemods project](https://github.com/es-tooling/module-replacements-codemods) to automatically migrate to suggested replacements
- 1000+ members in the [discord](https://chat.e18e.dev)

Most of these PRs and issues are umbrella style, in that they're used to track contributions to _many_ projects.

This is really impressive work by the community, as it has resulted in hundreds, if not over a thousand contributions to many high impact projects around the ecosystem.

Graphs like this dependency reduction of svelte-preprocess are becoming a common sight:

![graph showing the dependency tree of svelte-preprocess in version 5 vs version 6](https://pbs.twimg.com/media/GSDjnNjboAAnrc5?format=jpg&name=4096x4096)

### Projects focusing on performance

To get an idea of some large projects focusing in this space now:

- [storybook](https://github.com/storybookjs/storybook/) have been working hard all year to reduce their footprint and have had some [amazing results](https://bsky.app/profile/shilman.net/post/3l7ik3onbbs2b)
- [svelte](https://github.com/sveltejs/svelte) had some great wins - to name a few, [svelte-check dropped many dependencies](https://x.com/BenjaminMcCann/status/1839349949605236753), [svelte-add did the same](https://x.com/BenjaminMcCann/status/1821685785554501786) and [svelte-preprocess went zero-dependencies](https://x.com/BenjaminMcCann/status/1810698991820321028)!
- [knip](https://github.com/webpro-nl/knip) has seen wide usage in CI pipelines to help detect unused dependencies and many other things
- [chokidar](https://github.com/paulmillr/chokidar/) had a v4 in the works [since 2022](https://github.com/paulmillr/chokidar/pull/1195) and completed it in 2024, dropping down to 1 dependency
- [nx](https://github.com/nrwl/nx) have dropped a hefty list of dependencies and migrated to many lighter ones like `picocolors`, `tinyglobby`, etc.
- [chai](https://github.com/chaijs/chai) went ESM only and modernised a huge amount of code across the core and various plugins

### Projects & tools

Another big win by the community has been the number of projects it has helped gain adoption, and the projects launched by members.

To name a few:

- [tinyglobby](https://github.com/SuperchupuDev/tinyglobby) - a glob library built on top of [fdir](https://github.com/thecodrr/fdir)
  - Created by [@superchupu.dev](https://bsky.app/profile/superchupu.dev), and lots of help from [@benmccann.com](https://bsky.app/profile/benmccann.com) migrating projects to it
- [tinyexec](https://github.com/tinylibs/tinyexec/) - a library for executing commands
- [picospinner](https://github.com/tinylibs/picospinner/) - a library for rendering CLI spinners
- [sonda](https://github.com/filipsobol/sonda) - a bundle visualiser
  - Created by [@filipsobol](https://bsky.app/profile/filipsobol.bsky.social)
- [knip](https://github.com/webpro-nl/knip) - a dependency & code analyser
  - Created by [@webpro.nl](https://bsky.app/profile/webpro.nl)
- [picoquery](https://github.com/43081j/picoquery) - a query string parser and stringifier
- [fdir](https://github.com/thecodrr/fdir/) - a file system traversal library
- [milliparsec](https://github.com/tinyhttp/milliparsec) - a body parser for web servers
- [unicode-segmenter](https://github.com/cometkim/unicode-segmenter) - a unicode segmentation library
  - Created by [@hyeseong.kim](https://bsky.app/profile/hyeseong.kim)
- [nano-staged](https://github.com/usmanyunusov/nano-staged) - a tool to run commands for staged git files
- [module-replacements-codemods](https://github.com/es-tooling/module-replacements-codemods) - a growing collection of codemods to automate migrations to replacement libraries
  - Created by [@passle.dev](https://bsky.app/profile/passle.dev)

I could go on, but there are far too many to list.

Some of these already existed before e18e, but the community has done great work driving adoption of them and collaborating with the maintainers (all of whom are in our community!).

## The year ahead

What a great year it has been! :heart:

We will continue most, if not all of the work we've been doing in the past year. Much of it will start showing results this year as more people install newer versions of packages we've had an effect on.

There is more to do though!

### Speed up

We spent a lot of 2024 focusing on cleaning up dependency trees, modernising packages and helping people lean more into platform functionality.

Much of this fits into the `cleanup` category of the e18e initiative.

In this new year, it would be great to put some time into the `speedup` category too. This is often much deeper, long running work since it involves performance testing amongst other things.

### Tooling

A lot of what we do is still a manual process, and developers still don't have the right tools to detect much of this stuff automatically.

We'd love to spend time this year on creating a good toolchain for helping take better care of dependency trees and finding performance bottlenecks.

Automating a lot of the investigation work would also be a huge win.

Lots to think about! Some of this will be kicking off in the discord server early in the year.

### Meet up

Early in 2025, we will be organising the first in-person e18e meetup!

We haven't decided yet what the structure of this will be (just a social, or something more), but we will post more details very soon.

It'll be great to see people connecting, and what awesome ideas come out of it!

## Get involved

We'd love to have you in our community, whatever it is you're working on.

You can help by contributing, or even just by telling us some of the stories of problems you've seen yourself.

[Join the discord](https://chat.e18e.dev) and come say Hi!
