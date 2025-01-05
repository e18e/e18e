---
title: The journey so far
author:
  - name: James Garbutt
sidebar: false
date: 2024-12-16
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
---

# e18e - Journey so far

This month we're skipping the usual monthly showcase post to write a little about what we got upto in 2024 and what lies ahead for us in 2025 :rocket:

## Way back...

For a long time, I found myself returning many times to the need for a clean up of the JavaScript ecosystem, particularly npm at the time.

As far back as 2017, I was involved with [depcheck](https://github.com/depcheck/depcheck), a tool which detects unused dependencies amongst other things. I worked on a whole bunch of features and fixes for this tool so I could start introducing it to projects to keep a closer eye on dependency trees.

Around the same time as this, I was submitting PRs to various projects to remove redundant polyfills, one-liner packages and a few other things.

Every few months, I'd think about this again and start submitting another bunch of cleanup PRs.

I even made a few attempts at creating repos to share this effort (e.g. [you-dont-need-x](https://github.com/43081j/you-dont-need-x) and [eslint-plugin-clutter](https://github.com/43081j/eslint-plugin-clutter)).

Unfortunately, none of these efforts really went anywhere. I struggled to find anyone who cared and would often move on to something else for a few months before I got the itch in my brain to tackle it again.

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

All of these people and many others were working on some aspect of performance. Seeing them connect and have a space to collaborate was awesome :heart:

## Results so far

Several months later, we now have over **1000 members** :tada:

Just a few project-level stats from the past year:

- ~150 issues in the [cleanup project](https://github.com/es-tooling/ecosystem-cleanup/) to track contributions to performance of other projects
- ~100 merged PRs in the [module-replacements project](https://github.com/es-tooling/module-replacements) to document performant replacements to popular modules
- ~150 codemods in the [module-replacements-codemods project](https://github.com/es-tooling/module-replacements-codemods) to automatically migrate to suggested replacements

> [!NOTE]
> TODO - better or more stats?

Most of these PRs and issues are umbrella style, in that they're used to track contributions to _many_ projects.

This is really impressive work by the community, as it has resulted in hundreds, if not over a thousand contributions to many high impact projects around the ecosystem.

To get an idea of some large projects focusing in this space now:

- [storybook](https://github.com/storybookjs/storybook/) have been working hard all year to reduce their footprint and have had some [amazing results](https://bsky.app/profile/shilman.net/post/3l7ik3onbbs2b)
- [knip](https://github.com/webpro-nl/knip) has seen wide usage in CI pipelines to help detect unused dependencies and many other things

> [!NOTE]
> TODO - more examples

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
