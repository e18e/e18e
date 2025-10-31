---
title: Community Showcase (Q3 2025)
author:
  - name: The e18e Contributors
sidebar: false
date: 2025-10-31
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Community Showcase (Q3 2025)
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/community-showcase-q3-2025
  - - meta
    - property: og:description
      content: An update on what the community have been up to in Q3 of 2025
  - - meta
    - property: og:image
      content: https://e18e.dev/og/community-showcase-25-q3.png
---

_October 31, 2025_

# ![Community Showcase (Q3 2025)](/og/community-showcase-25-q3.png)

A little late, but here is the Q3 2025 community showcase! :tada:

The community have been producing some great things over the last few months, and improving even more projects. Here's just a few highlights of what we've been up to.

## e18e GitHub Action

Recently, we saw the launch of the official [e18e GitHub Action](https://github.com/e18e/action-dependency-diff)! This action allows you to easily check for dependency changes in your pull requests.

It applies various checks to determine if the dependency tree has changed in an unusual or notable way, helping to catch potential issues before they make it into your main branch.

### Trust levels

The action detects when a dependency has changed its trust level. There are currently three trust levels:

- **Trusted**: Published using OIDC (trusted publishing) with provenance
- **Provenance**: Published with provenance, but not using OIDC
- **None**: No provenance or OIDC

With the rise in supply chain attacks, it is important to be aware of if a package changes between these trust levels. The action will do this by flagging any _decrease_ in trust level for a dependency.

### Install size

This check will flag any pull request which increases the install size of your package overall.

The install size of a package is that of the `node_modules` directory after running an `npm install`. Significant increases are often a sign of bloat or unnecessary dependencies being added.

### Bundle size

There also exists the ability to check for bundle size changes. This differs from install size as it is the size of the `npm pack` result (i.e. the tarball which would be published to npm).

This is extremely useful for libraries, as it can help catch accidental increases in bundle size which would affect end users.

### Module replacements

Of course, this also plugs into e18e's existing [module replacements](https://e18e.dev/docs/replacements), allowing you to enforce the use of more performant alternatives to certain packages.

If a pull request introduces a dependency which the community have marked as having suggested replacements, it will be flagged by the action.

### What's next for the action?

This action is still evolving, and we plan on adding more checks in the future. If you have any ideas or feedback, please [open an issue](https://github.com/e18e/action-dependency-diff/issues).

## Module replacements

As part of a wider effort to improve documentation of e18e recommendations, the community have been hard at work adding the new [module replacements](https://e18e.dev/docs/replacements) docs!

These new docs provide migration guides and tips for each of the recommended replacements, making it super easy to switch.

Just a few examples:

- [Replacing `chalk`](/docs/replacements/chalk.html)
- [Replacing `depcheck`](/docs/replacements/depcheck.html)
- [Replacing `find-up`](/docs/replacements/find-up.html)

Big thanks to [@outslept](https://bsky.app/profile/outslept.bsky.social) for doing the majority of the work on this!

## `modern-tar` and `nanotar`

While investigating ways to reduce install size and complexity, a commonly raised issue has been the use of the `tar` package, or the `tar-fs` package.

`tar` comes in at 1.8MB with 6 packages, while `tar-fs` is 3.6MB with 17 packages.

Both of these packages are rather large, and the community have been itching to replace them with something more lightweight for a while now.

That's where [`modern-tar`](https://github.com/ayuhito/modern-tar) and [`nanotar`](https://github.com/unjs/nanotar) come in!

### `nanotar`

[`nanotar`](https://github.com/unjs/nanotar) is a super tiny runtime-agnostic implementation of parsing and creating tar files.

It comes in at just 37KB and 0 dependencies!

This comes from the [unjs](https://github.com/unjs) ecosystem, which has many more lightweight packages like this. Thanks to [@pi0](https://bsky.app/profile/pi0.io) for this one!

### `modern-tar`

While `nanotar` is great for parsing and creating tar files, it doesn't currently have a way to _extract_ them to the filesystem.

That's where [`modern-tar`](https://github.com/ayuhito/modern-tar) comes in!

`modern-tar` is can pack and unpack tar files to and from the filesystem, while still being very lightweight.

Similarly, it comes in at only 76KB and 0 dependencies :tada:

Really awesome work by [@ayuhito](https://bsky.app/profile/ayuhito.com) here!

## Immer

Delving into the _speed up_ category, we've seen some great improvements to the popular [immer](https://github.com/immerjs/immer) library recently.

[@acemarke](https://bsky.app/profile/acemarke.dev) has been hard at work doing deep dives into the CPU and memory performance of immer across the board. He has made an impressive number of optimizations, and is still going!

You can read all about it on the latest [GitHub issue](https://github.com/immerjs/immer/pull/1183#issuecomment-3453662199), where he details many of the changes made so far.

These optimizations have led to some impressive speed-ups. For example, the latest branch is **20% faster** than `main` on many benchmarks!

We also recently held our first community call, where we were lucky enough to have [@acemarke](https://bsky.app/profile/acemarke.dev) walk us through these improvements and show us more of the deeper investigation.

Really great work here! :pray:

## Storybook

Storybook strikes again with another huge saving - migrating to ESM only!

They have announced Storybook v10 will be going [ESM only](https://storybook.js.org/blog/storybook-is-going-esm-only/). With this migration, they're able to drop all legacy CommonJS code from their published packages.

Storybook and many other popular packages currently ship two builds in their npm packages - one for CommonJS (CJS) and one for ESM. This means even if you install into an ESM-only project, you will still download the legacy CommonJS build, along with the duplicated type definitions.

By going ESM only, all of this falls away and there remains only one copy of everything.

This drops the `storybook` package from **66MB** to **53MB**, a great saving!

On top of this, even more savings were gained by [resolving some tree-shaking issues](https://github.com/storybookjs/storybook/pull/32800). Big thanks to [Bill](https://github.com/mrginglymus) for this one!

## Netlify

Netlify have been collaborating with the e18e community for some time now, and putting great effort into improving the performance of their OSS packages.

Recently, we've seen two huge savings from them:

- `@netlify/edge-functions` went from **34MB** to **8.4KB**! ([Release notes](https://github.com/netlify/primitives/releases/tag/edge-functions-v3.0.0))
- `@netlify/functions` went from **93MB** to **40KB**! ([Release notes](https://github.com/netlify/primitives/releases/tag/functions-v5.0.0))

It's not often we get to see savings as crazy as these. The Netlify team have done an amazing job here.

Much of this saving comes from publishing two separate packages - one for development (with a bunch of dev-time tools, emulators, etc.), and one for production (just the runtime code).

This means production installs will run _much_ faster, and the cost of the development tools is only paid when needed.

## Upcoming projects

### e18e CLI

The e18e CLI project missed a few milestones and isn't quite ready yet. However, with the completion and success of the GitHub Action, we're now in a much better place to complete the work.

This is core to the tooling the e18e community wants to provide, so we will be pushing hard to get this out soon!

Our vision for the CLI is that it can offer roughly the following:

- Dependency tree analysis matching that of the GitHub action
- Automated migrations to suggested replacements
- Publish linting
- Type definition linting

We are aiming to release an alpha version very soon, and will be reaching out to many of you to help test it out!

### e18e MCP

We're also working on an e18e MCP server! This will allow us to offer module replacements as a data source to LLMs.

This is early stages but will hint to your chosen agent on which libraries to use and modern syntax to prefer.

The same capability should be available via the e18e CLI, leaving the choice of which you use up to you.

### Module replacements v2

Finally, we're working on the next version of the module replacements data :tada:

One of the goals of this is to allow us to support more engines other than Node, and to offer syntax-only replacements (e.g. new platform capabilities).

Once this is complete, our tooling should be able to more intelligently suggest replacements based on your project's target environment. If you use Bun, for example, it will prefer built-in Bun APIs over third-party alternatives.

## Package publishing guide

In the wake of the recent supply chain attacks, many community members have been asking how to best secure their package publishing process.

To help with this, we've put together a [package publishing guide](https://e18e.dev/docs/publishing.html) which goes over best practices for securely publishing your packages.

In this guide, we cover how to configure a typical OIDC setup with GitHub Actions, as well as some best practices around keeping the workflow secure. We've also published a few different "recipes" to show how you can do the same with various changelog/release management tools.

This is the result of many discussions in the community, so a big thanks to everyone who contributed! Particularly, thanks to [@sxzz](https://bsky.app/profile/sxzz.dev), [@dominikg](https://bsky.app/profile/dominikg.dev), and [@jviide](https://bsky.app/profile/jviide.iki.fi) for their help putting this together.

## Community calls / stream

We had a small trial of a community call when [@acemarke](https://bsky.app/profile/acemarke.dev) presented his immer optimizations. This was a great success, so we plan on doing more of these in the future!

Nothing is set in stone yet, but we're planning on doing a monthly community call, usually with a guest speaker from the community. Hopefully, this will give some good insight into what people are working on, and will help teach us all new things.

Keep an eye out for announcements in our [Discord](https://chat.e18e.dev) when the next one is scheduled.

## Working Draft podcast

The Working Draft podcast also recently had an e18e-focused episode! You can check it out on their [website](https://workingdraft.de/684/) (Note it is in German language).

Great work by [@fuzzyma](https://bsky.app/profile/fuzzyma.bsky.social) and [@thealexlichter](https://bsky.app/profile/thealexlichter.com) for representing the community so well.

We're always happy to see community members getting involved in advocating for better practices around performance like this. If you run a similar podcast or want to suggest one for us to appear on, please let us know in the Discord!

## ViteConf

Earlier this month, the first in person ViteConf was held!

A few of us went along, and we even had the first e18e talk there 🎉

This was a great experience and so many people were interested in what the community has been up to. We'd love to make this more of a regular occurrence to help share the knowledge and increase collaboration.

From this event alone, we've kicked off a few collaborations with Astro, Netlify, Nuxt, and more!

This was also the first time a few of us were in person together. Just a few of the amazing people in our community who made the trip: [@antfu](https://bsky.app/profile/antfu.me), [@bluwy](https://bsky.app/profile/bluwy.me), [@fuzzyma](https://bsky.app/profile/fuzzyma.bsky.social), [@pi0](https://bsky.app/profile/pi0.io) 🥳

## Get involved

If you'd like to help out, come [join our discord](https://chat.e18e.dev) and say Hi!
