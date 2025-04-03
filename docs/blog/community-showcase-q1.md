---
title: Community Showcase (Q1 2025)
author:
  - name: The e18e Contributors
sidebar: false
date: 2025-04-01
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Community Showcase (Q1 2025)
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/community-showcase-q1
  - - meta
    - property: og:description
      content: An update on what the community has been up to in Q1 of 2025
---

_April 1, 2025_

It has been a while since we posted one of our monthly showcases. This is mostly because the community has been hard at work on some exciting but rather large projects!

Today, we're going to give some updates on those and share what we've been up to. We'll also be switching these posts to be quarterly since much of the work is longer running, but we'll still be posting about other things in between! :heart:

## Prettier CLI

For the last couple of months, we have been hard at work on the new prettier CLI. The idea is that this will eventually replace the current one, but initially be available behind a flag.

But why do we need a new one? Well, a little bit of backstory...

Some time ago, we were digging through CPU profiles of prettier, trying to figure out why it was particularly slow in some larger projects. It turns out, much of the slowness comes from things we often don't need.

For example, prettier currently allows you to override the config at any level, but we don't actually see much use of that in the wild. However, just in case you do use that, the CLI has to check **every directory** for **each supported format of `prettierrc`**. This is very expensive when you know you don't have any.

We raised this in the e18e discord, and found that [Fabio](https://bsky.app/profile/fabiospampinato.bsky.social) already started work on a new CLI a few years ago to solve this and many other performance issues!

The project had gone a little stale since he hadn't worked on it for some time, but we kicked off a new [piece of work](https://github.com/e18e/ecosystem-issues/issues/154) to get the ball rolling again.

Initial tests with this have often shown a **10x speed up** on formatting a large repo :tada:

There's still work to do, but keep an eye out for another announcement once we're ready to start trials!

## ESLint performance

We recently started discussions around the performance of ESLint. As usual with a pluggable tool, many of the performance issues come from plugins rather than ESLint itself. So, we started work on various plugins to improve their performance.

It is also worth noting that, while there are extremely fast alternatives to ESLint these days, many of us can't switch over or don't want to (e.g. if we rely on plugins that haven't been ported over). That is why it is still important we improve what we can in the ESLint ecosystem.

Just a few wins we've seen so far:

- [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x) moves to a rust-based resolver
  - Big thanks to [JounQin](https://bsky.app/profile/1stg.me) and [sukka](https://bsky.app/profile/skk.moe) for the various improvements on this and other ESLint plugins they maintain
- [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n/) had an almost 20x perf improvement on some rules
  - Thanks to [pralkarz](https://github.com/pralkarz) for this one
- [`eslint-plugin-svelte`](https://github.com/sveltejs/eslint-plugin-svelte) dropped a bunch of compat code for older versions of ESLint

## typescript-eslint vitest migration

A while ago, we started a conversation around migrating the [TSESLint](https://github.com/typescript-eslint/typescript-eslint) repo from `jest` to `vitest`.

The idea was that this would greatly improve test run performance, modernise some of the tests themselves and lighten the install size for maintainers.

Around the same time, [Arya](https://github.com/aryaemami59) started work on this and there the collaboration began! He has done a huge amount of work moving every sub-package of the repo to vitest one by one, and we're now at the stage where the TSESLint team can start reviewing and merging many of them.

This is a great example of where it will not affect the end user directly, but will speed up CI and maintainer workflows significantly.

If you want to follow the work, keep an eye on the [tracking issue](https://github.com/typescript-eslint/typescript-eslint/issues/7112).

## Collaborations

This year, we've taken more of a focus on collaborating with organisations involved in open source. Our community can't do all of this work alone, so helping organisations do some of this themselves will go a long way and ultimately impact the user a lot more in many cases.

Here's just a few of the projects and organisations we've been collaborating with:

- Netlify ([tracking issue](https://github.com/e18e/ecosystem-issues/issues/156))
- 11ty ([tracking issue](https://github.com/e18e/ecosystem-issues/issues/164))
- nx ([tracking issue](https://github.com/e18e/ecosystem-issues/issues/117))
- changesets

We're also continuing to collaborate with storybook, vitest, svelte, and many other projects.

## Events

This year, we're putting more effort into attending conferences and meet ups. This has given us some great opportunities to meet people from the community in person, and to introduce more people to it :tada:

At some point we will also be looking to do talks at events like this, so keep an eye out!

### Amsterdam meetup

As part of this, we also had our first ever meetup :partying_face: Taking place in Amsterdam, we had a great turnout and a lot of productive discussions.

**IMAGE HERE**

Big thanks to the people who managed to make it :heart: There will be more of these in future, so come along if you're able to and meet some of the community.

### Svelte Summit

[Svelte summit](https://www.sveltesummit.com/) is this May! Both [patak](https://bsky.app/profile/patak.dev) and [43081j](https://bsky.app/profile/43081j.com) will be around, so if you'll be there, come say hi!

We've collaborated a lot with the svelte community in the past, so this will be an exciting opportunity to meet some familiar faces in person and talk about where we can help in future.

## Get involved

**TODO**

[Join our discord](https://chat.e18e.dev)
