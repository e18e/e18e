---
title: The Year Ahead (2026)
author:
  - name: James Garbutt
sidebar: false
date: 2026-01-22
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: The Year Ahead (2026)
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/the-year-ahead-2026
  - - meta
    - property: og:description
      content: A look ahead at what's coming in 2026 for the e18e community
  - - meta
    - property: og:image
      content: https://e18e.dev/og/the-year-ahead-2026.png
---

# The Year Ahead (2026)

_January 22, 2026_

![October Contributions Cover Image](/og/the-year-ahead-2026.png)

We haven't had a blog post in a while, largely due to the holiday season but also because many of us have been hard at work on some fairly chunky e18e projects lately! So let's have a look ahead at what's coming in 2026 and a small recap on what we got up to last year :rocket:

## 2025 Recap

In 2025, we saw a great number of contributions, new projects, and milestones across the e18e ecosystem.

### New Projects

- [Official ESLint plugin](https://github.com/e18e/eslint-plugin) to lint projects for possible performance and modernization improvements
- [Web features codemods](https://github.com/e18e/web-features-codemods) to help migrate from older syntax and APIs to modern alternatives
- [Dependency diff GitHub action](https://github.com/e18e/action-dependency-diff) to diff changes in dependencies in GitHub PRs
- [awesome-e18e](https://github.com/e18e/awesome-e18e) list to showcase performance-focused projects and resources
- [setup-publish](https://github.com/e18e/setup-publish) CLI to help scaffold GitHub workflows for publishing npm packages

### Notable Wins

- [11x improvement in Astro rendering](https://github.com/withastro/astro/pull/15123)
- [@acemarke](https://bsky.app/profile/acemarke.dev)'s [work](https://github.com/immerjs/immer/pulls?q=is%3Apr+is%3Aclosed+author%3Amarkerikson) on improving immer performance by over 25%
- Various [improvements to svelte's language tools](https://github.com/sveltejs/language-tools/pull/2852)
- TypeScript ESLint dropped their dependency count from 44 to 26, primarily thanks to the switch from `fast-glob` to [tinyglobby](https://github.com/SuperchupuDev/tinyglobby) ([PR here](https://github.com/typescript-eslint/typescript-eslint/pull/11740), big thanks to [@benmccann](https://bsky.app/profile/benmccann.com))
- Storybook massively [reduced its number of dependencies](https://storybook.js.org/blog/storybook-bloat-fixed/), and [switched to ESM only](https://storybook.js.org/blog/storybook-is-going-esm-only/)

TODO - add more contributions here

### Milestones

- [tinyglobby](https://www.npmjs.com/package/tinyglobby) reached 62M weekly downloads
- [tinyexec](https://www.npmjs.com/package/tinyexec) reached 36M weekly downloads
- [knip](https://www.npmjs.com/package/knip) reached 6M weekly downloads
- [obug](https://www.npmjs.com/package/obug) reached 6.7M weekly downloads
- [modern-tar](https://www.npmjs.com/package/modern-tar) reached 309K weekly downloads

## Sponsored by Google Chrome :rocket:

A huge milestone this week: the Google Chrome team have officially sponsored us as part of their Chrome Performance fund! :tada:

The e18e community and the Chrome team share a lot of the same goals - improving web performance and modernizing the code we ship to users on the web. So it is great to have their support and be able to collaborate more closely.

They have been very active as part of the [WebDX community group](https://www.w3.org/community/webdx/), a w3c group which aims to improve developer experience on the web. Two notable projects from this group will be fundamental for much of the tooling we're building in e18e - [baseline](https://web.dev/baseline), and the [web-features](https://github.com/web-platform-dx/web-features) project.

As part of the next major version of the [module-replacements](https://github.com/es-tooling/module-replacements) data set, we will be integrating both baseline and web-features. These will allow us to make much smarter suggestions based on the target environments of a project, as well as being able to suggest syntax and API replacements based on feature support.

This support is very much appreciated and will go a long way to helping us improve performance across the entire ecosystem :pray:

## Project Leads

Though much of what the e18e community does is through contributions, we do also have a _lot_ of ongoing and upcoming projects. Most of these are around building developer tooling to help make performance a more central part of the development workflow.

To help manage these projects and share the load, we've recently introduced a few project leads. These are some great people who were already part of the community and have stepped up to help drive these projects forward.

Current leads:

- [@43081j](https://bsky.app/profile/43081j.com) - community lead, module replacements, ESLint plugin
- [@dreyfus](https://bsky.app/profile/dreyfus11.bsky.social) & [Laura](https://github.com/laurathackray21) - e18e CLI
- [@paoloricciuti](https://bsky.app/profile/paolo.ricciuti.me) - MCP and other AI integrations/tooling
- [@willow](https://bsky.app/profile/willow.sh) - module replacements
- [@thealexlichter](https://bsky.app/profile/thealexlichter.com) - e18e & Friends
- [@alexanderkaran](https://bsky.app/profile/alexanderkaran.bsky.social) - framework performance tracker

## e18e & Friends

[@thealexlichter](https://bsky.app/profile/thealexlichter.com) has been a long-time member of the e18e community, and is now the host of our new show: **e18e & Friends!**

Every month, we will invite a guest from the wider community to chat about what they've been working on, often with a focus on the performance space.

This will be live streamed so we can take questions from the audience, and recorded for later viewing on YouTube.

The first episode will be live on the **10th February**, and the guest is yet to be announced!

Follow along on [Discord](https://chat.e18e.dev) for updates :rocket:

## Module Replacements v3

The [module replacements](https://github.com/es-tooling/module-replacements) project has been core to the e18e community since the beginning. It provides a data set which maps older, heavier dependencies to modern, more performant alternatives.

This has done a great job so far, but has been lacking a few notable things:

- Representing _syntax_ replacements (e.g. replacing some loops with `for...of`)
- Representing _API_ replacements (e.g. replacing `array[array.length - 1]` with `array.at(-1)`)
- Representing engine constraints (e.g. only suggest this replacement if the project supports Node 16+)

All of these are limitations of the schema we use, in that we simply don't have a place in the data to hold this information.

The next version of this data set will introduce a new schema which supports all of these use cases, and more!

This will lead to us being able to make smarter suggestions in tools like the ESLint plugin, based on baseline and engine constraints rather than just a flat list of recommendations.

## Replacements GitHub action

We're in the very early design stages, but we're cooking up a GitHub action which will automatically create pull requests for module replacements and syntax improvements!

This action should do a lot of what the CLI and the ESLint plugin do, but in an automated fashion and focused around migrations rather than analysis.

Think of it as dependabot for modernization and performance improvements!

## Framework Performance

The framework performance tracker is an exciting new project we've had brewing for a while now. A website which tracks various useful performance metrics across popular web meta-frameworks like Nuxt, Astro, and SvelteKit.

Comparing these frameworks is a complex task, as they all do things very differently and each framework has its own strengths it prioritizes in its own documented metrics. By creating this tracker, we hope to provide a more objective view of how they perform across the board.

To start, we're going to focus on a set of core metrics rather than comparisons, with the goal of expanding this over time. For example, `node_modules` size and build times might look something like this (with imaginary data):

| Framework | Install Size | Build Time |
| - | - | - |
| Framework A | 45 MB | 1.2s |
| Framework B | 287 MB | 3.1s |
| Framework C | 112 MB | 1.8s |

Many of these metrics should then be helpful for teams when choosing a framework, as well as tracking how each framework improves over time.

This is a large project; there's a lot to track and comparing fairly across frameworks isn't trivial. But if we pull it off, it'll be a genuinely useful resource for seeing how frameworks evolve in the performance space over time.

## e18e CLI

The [e18e CLI](https://github.com/e18e/cli) has had a bumpy start while we figured out the scope and the right developer experience. Though we've had a few delays, we are now well on our way to a stable release!

Ultimately, it will focus on these areas:

- Dependency analysis
- Security analysis (e.g. trust levels)
- Replacement suggestions
- Replacement migrations

This and the [ESLint plugin](https://github.com/e18e/eslint-plugin) will achieve roughly the same goals - allowing you to choose the one you prefer based on your workflow.

More to come on this front soon :rocket:

## Runtime analysis

This one isn't well defined yet, but is something we've been discussing on and off for a while now - a way to analyze the runtime code of a given web app for redundant polyfills, legacy code, and other improvable areas.

It is a fairly difficult problem to solve, but would allow us to give suggestions outside of developer workflows, and reach a wider audience.

Especially for helping reduce reliance on redundant polyfills, this could be a very useful tool.

## Get involved

If you want to help out, [join the discord](https://chat.e18e.dev). We'd love to have the help :pray:
