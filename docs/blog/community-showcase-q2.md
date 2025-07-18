---
title: Community Showcase (Q2 2025)
author:
  - name: The e18e Contributors
sidebar: false
date: 2025-07-17
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Community Showcase (Q2 2025)
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/community-showcase-q2
  - - meta
    - property: og:description
      content: An update on what the community has been up to in Q2 of 2025
  - - meta
    - property: og:image
      content: https://e18e.dev/og/community-showcase-25-q1.png
---

_July 17, 2025_

# ![Community Showcase (Q2 2025)](/og/community-showcase-25-q1.png)

A little late, but it's time for another community showcase! :tada:

So many good things have happened over the last quarter in the community and around the ecosystem, and there's so much more to come :rocket:

## Prettier CLI

The Prettier team has been collaborating with the e18e community for some time now on a new, faster CLI for Prettier. In June, this was released behind a flag for all to try out! :tada:

This has been a great collaboration, driven mostly by the work of [@fabiospampinato](https://bsky.app/profile/fabiospampinato.bsky.social) and plenty of help from [@fisker](https://bsky.app/profile/fiskercheung.com) on the Prettier side of things.

You can see some of the huge performance improvements in the chart below:

![prettier run time results](/images/prettier-chart.png)

You can use this in your own project by using the new experimental flag:

```sh
# via the CLI flag
prettier . --check --experimental-cli

# via an environment variable
PRETTIER_EXPERIMENTAL_CLI=1 prettier . --check
```

Without any other changes, this should speed up your formatting runs a whole lot :raised_hands:

Read more about how we got here in the [blog post](https://e18e.dev/blog/prettier-speed-up.html).

## e18e CLI

We posted about the upcoming e18e CLI some time ago and the rough idea behind it. Since then, the community has been hard at work building it and shaping the definition of what's to come.

Soon you will be able to do cool things like this:

```sh
npx @e18e/cli migrate chalk # automatically migrate chalk to picocolors

npx @e18e/cli migrate --interactive chalk # interactively choose which library to migrate chalk to

npx @e18e/cli analyze # lint your dependency tree and produce useful stats
```

We now have the basics in place and a much fuller list of features to work towards. Just a few of the things this CLI will be able to do:

- Automatic migrations to suggested replacements
- Lint your dependency tree for common issues
- Lint your publishing setup (with help from publint!)
- Visualise CJS vs. ESM usage in your project
- Bring your own codemods and replacements lists (so the CLI can migrate and detect migrations of your own internal dependencies)

We're also working towards having a GitHub automation which can create these migration PRs for you, and run the lint steps in your CI.

If you want to contribute or if you just want to test the CLI as we build it, we'd love the help. Come join us in the [e18e Discord](https://chat.e18e.dev) and join the `#cli` channel!

You can also follow along with the release roadmap in the [roadmap issue](https://github.com/e18e/cli/issues/6).

Huge thanks to [@paul](https://bsky.app/profile/paul.studiocms.dev), [@passle](https://bsky.app/profile/passle.dev) and [@fuzzyma](https://bsky.app/profile/fuzzyma.bsky.social) for all the work so far.

## Storybook 9

Storybook recently released version 9! :rocket:

This release comes with all sorts of improvements like Storybook Test, story generation and much more. However, the highlight for us is by far the install footprint reduction and project complexity improvements.

Just look at this graphic taken from their post:

![storybook 9 dependency graph](https://storybookblog.ghost.io/content/images/2025/07/storybook-9-dep-graph.jpg)

They've almost flattened their dependency tree! This is some great progress and the result of many months of work by the Storybook team - much of which involved collaborating with the e18e community.

You can read more about how they achieved this and how they're keeping on top of it in their [blog post](https://storybook.js.org/blog/storybook-bloat-fixed/).

We also recently held a webinar where [Jeppe](https://bsky.app/profile/reinhold.is) from the Storybook team and [James](https://bsky.app/profile/43081j.com) from e18e discussed the technical details behind these improvements. You can watch the recording on YouTube: [Lessons learned from reducing bloat in Storybook](https://www.youtube.com/watch?v=h863b0nfsWg) where they dive deeper into the process and lessons learned.

Big thanks to the Storybook team for taking a lead on this kind of improvement, and for working so closely with the community throughout :heart:

## ESM-only migration

Ever since `require(esm)` became a thing, we've been pushing to move more and more projects to ESM-only. Helping maintainers with the migration has been high up on our list, and we've made great progress.

On top of that, we're seeing a lot more migrations happening outside the community as more and more maintainers are choosing to follow suit.

Here's just a few projects we've seen migrated:

- [eslint-config-preact](https://github.com/preactjs/eslint-config-preact)
- [parse5](https://github.com/inikulin/parse5/)
- [eslint-plugin-eslint-plugin](https://github.com/eslint-community/eslint-plugin-eslint-plugin)
- [faker](https://github.com/faker-js/faker)
- [uuid](https://github.com/uuidjs/uuid)
- [eslint-plugin-package-json](https://github.com/JoshuaKGoldberg/eslint-plugin-package-json)
- [package-json-validator](https://github.com/JoshuaKGoldberg/package-json-validator)
- [eslint-fix-utils](https://github.com/JoshuaKGoldberg/eslint-fix-utils)

Some future migrations on the horizon too:

- [chokidar](https://github.com/paulmillr/chokidar/)
- [storybook](https://github.com/storybookjs/storybook/) ([tracking issue](https://github.com/storybookjs/storybook/issues/31787))

Thanks to [@michael.faith](https://bsky.app/profile/michael.faith) for migrating some of these, and the maintainers who made the move themselves!

## fdir

With help from [@sxzz](https://bsky.app/profile/sxzz.dev) and [@thealexlichter](https://bsky.app/profile/thealexlichter.com), fdir is now bundled using [tsdown](https://github.com/rolldown/tsdown). This has lead to almost a 3x reduction in install size and a much faster build time for the maintainers!

This is unreleased as of writing, but will be coming soon. Keep an eye on the [releases page](https://github.com/thecodrr/fdir/releases).

Another upcoming feature for fdir is the ability to use async iterators rather than callback-style APIs. This should come with a massive reduction in memory usage and will look something like this:

```ts
import { fdir } from 'fdir'
const files = fdir().crawl('/path/to/dir').withIterator()

for await (const file of files) {
  console.log(file)
}
```

Since this means fdir doesn't need to hold the full set of files in memory, it should be far better in large projects than the current callback API.

Thanks to [@thecodrr](https://github.com/thecodrr/) for all the work on this :pray:

## tinyglobby

[tinyglobby](https://github.com/SuperchupuDev/tinyglobby) also has some unreleased performance improvements on the horizon, almost doubling its CPU performance in some cases.

Most notably, the underlying filtering in tinyglobby had a large rework which bumped performance massively.

Much of this was made possible by introducing some reproducible benchmarks to the project. These have allowed the maintainers to track down and fix performance bottlenecks in various places.

For example, here's the result of searching for `packages/*/tsconfig.json` in TSESLint's monorepo _before_ the change:

| Task name          | Throughput avg (ops/s) | Throughput med (ops/s)  |
| ------------------ | ---------------------- | ----------------------- |
| **'tinyglobby'**   | **'891 ± 1.35%'**      | **'981 ± 131'**         |
| 'fast-glob'        | '1822 ± 0.68%'         | '1878 ± 110'            |
| 'glob'             | '1725 ± 0.61%'         | '1767 ± 95'             |
| 'node:fs glob'     | '923 ± 0.67%'          | '941 ± 74'              |

And the result after the changes:

| Task name        | Throughput avg (ops/s) | Throughput med (ops/s)  |
| ---------------- | ---------------------- | ----------------------- |
| **'tinyglobby'** | **'2254 ± 0.42%'**     | **'2312 ± 89'**         |
| 'fast-glob'      | '1868 ± 0.60%'         | '1903 ± 103'            |
| 'glob'           | '1714 ± 0.58%'         | '1754 ± 85'             |
| 'node:fs glob'   | '927 ± 0.78%'          | '983 ± 49'              |

In many cases, this now makes tinyglobby the fastest glob library available.

Keep an eye on the [releases page](https://github.com/SuperchupuDev/tinyglobby/releases) for when this becomes available!

Thanks to [@superchupu](https://bsky.app/profile/superchupu.dev) and [@benmccann](https://bsky.app/profile/benmccann.com) for these huge improvements :fire:

## npmgraph suggested replacements

The [npmgraph](https://npmgraph.js.org/) tool now suggests replacements for your dependencies!

To do this, it uses the community-driven [`module-replacements`](https://github.com/es-tooling/module-replacements) project.

This is such a great addition, and will be a huge help for finding optimisations in your project.

All thanks to [@broofa](https://github.com/broofa) for implementing this! :tada:

## Project collaborations

We've seen another great few months of collaborations, both with projects and with individual maintainers.

### h3

[h3](https://github.com/h3js/h3) is a tiny HTTP server framework by one of our favourite people - [@pi0](https://bsky.app/profile/pi0.io)!

Often one of the largest and/or most complex dependencies is the web server, and the various middlewares and dependencies it pulls in. h3 is a super nice alternative to many of these - staying small, close to the platform, and incredibly fast.

A really awesome collaboration recently was one between pi0 and [reve](https://github.com/aquapi) to introduce compiled routes. This allows you to compile a static routing table at build time, resulting in some huge performance boosts.

Definitely check out both [h3](https://github.com/h3js/h3) and the underlying router, [rou3](https://github.com/h3js/rou3).

### react-router

With lots of help from [@MichaelDeBoey](https://github.com/MichaelDeBoey), we've been busy at work collaborating with the [React Router](https://github.com/remix-run/react-router) team to clean up a bunch of dependency clutter, unused code and start some discussions around modernisations of some parts of the project.

All sorts of clean up has been going on - including running [knip](https://knip.dev/) across the project, migrating to native functionality, and a possible future "unforking" of [clack](https://github.com/bombshell-dev/clack).

As part of the upcoming Remix v3, there's also the new [node-fetch-server](https://github.com/mjackson/remix-the-web/tree/main/packages/node-fetch-server) worth keeping an eye on. This is a new web server built on top of Node primitives and a fetch-like API.

Big thanks to Michaël and the React Router team for holding these discussions and helping the community follow the contribution process, too.

### Netlify

Some time ago, we reached out to the Netlify team to see if the community can help modernise and clean up some of the Netlify CLI. A few months later, we've seen many discussions happen and many PRs land. A lot of good collaboration has happened, and the Netlify team has done a lot of good work internally aligned with our goals.

Notable changes include:

- Dropped support for Node 16 and below in Netlify build (used by Netlify CLI) - this resolved vulnerabilities, reduced the install size and upgraded a whole bunch of dependencies
- Removed _71 dependencies_ from Netlify CLI
- Reduced the install size of Netlify CLI
- Improved the performance of the Netlify CLI by 2-3x ([changelog](https://www.netlify.com/changelog/netlify-cli-is-twice-as-fast/))

It has been awesome to see a company collaborating with the community on this and sharing their roadmap/vision. Big thanks to [@philippeserhal](https://bsky.app/profile/philippeserhal.com) in particular for being active in the community and helping get contributions over the line.

## Get involved

If you'd like to help out, come [join our discord](https://chat.e18e.dev) and say Hi!
