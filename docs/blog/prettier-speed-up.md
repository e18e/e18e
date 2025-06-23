---
title: Improving Prettier performance with the new CLI
author:
  - name: James Garbutt
sidebar: false
date: 2025-06-23
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Improving Prettier performance with the new CLI
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/prettier-speed-up
  - - meta
    - property: og:description
      content: The new Prettier CLI - what it is and how it came to be.
---

# Improving Prettier performance with the new CLI

_June 23, 2025_

Over the last several months, we've been working with the Prettier team on a new version of the [Prettier](https://github.com/prettier/prettier/) CLI. Today, I'm happy to announce that it is now available behind a flag in the latest version of Prettier!

## Try it out!

To use the new CLI, install [Prettier 3.6.0](https://prettier.io/blog/2025/06/23/3.6.0):

```sh
npm i prettier@latest
```

You can then enable the experimental CLI like so:

```sh
# via the CLI flag
prettier . --check --experimental-cli

# via an environment variable
PRETTIER_EXPERIMENTAL_CLI=1 prettier . --check
```

## Community investigation

We started investigating the performance of Prettier in the e18e community after noticing it was quite slow in various larger projects. Given how widely used it is, this would be a great opportunity to improve performance for huge amounts of people in one go.

Through a lot of CPU profiling and debugging, we discovered that much of the time was lost in the CLI rather than in the formatter itself.

At this point, [Fabio](https://bsky.app/profile/fabiospampinato.bsky.social) popped up and pointed out that he was also tackling this a few years ago! He already had a work-in-progress CLI he had been building with the Prettier team, and had already done some great investigation work.

There, we decided to collaborate and finish the new CLI together, getting it over the line to be released in the next version of Prettier.

You can read a deeper dive into this in his [blog post](https://prettier.io/blog/2023/11/30/cli-deep-dive), along with how he architected it and the results.

## What's changed?

The new CLI is a complete rewrite of the existing one, with a focus on performance and modernisation.

From the outside, the CLI should feel and look the same. However, under the hood it has various performance improvements and a much smaller footprint.

Just some of the gains:

- Built in parallelism
- Improved caching layer
- Faster config file resolution
- Leaner dependency tree

## Results

If we run this against the TSESLint codebase, we can see a significant performance improvement:

```sh
$ time npx prettier --check .
Checking formatting...
All matched files use Prettier code style!
npx prettier --check .  34.24s user 7.39s system 141% cpu 29.407 total

$ PRETTIER_EXPERIMENTAL_CLI=1 time npx prettier . --check
Checking formatting...
All matched files use Prettier code style!
PRETTIER_EXPERIMENTAL_CLI=1 npx prettier --check .  54.18s user 4.76s system 647% cpu 9.096 total
```

That's **9 seconds** in the new CLI, vs **29 seconds** in the old CLI!

We are cheating slightly in that the new CLI has parallelisation and caching enabled by default. If we turn that and the caching layer off:

```sh
$ PRETTIER_EXPERIMENTAL_CLI=1 time npx prettier --no-cache --no-parallel --check .
Checking formatting...
All matched files use Prettier code style!
PRETTIER_EXPERIMENTAL_CLI=1 npx prettier --check --no-cache --no-parallel .  19.26s user 2.01s system 172% cpu 12.313 total
```

**12 seconds**, still _much_ faster.

![prettier run time results](/images/prettier-chart.png)

## Wrap up

Big thanks to Fabio, [pralkarz](https://github.com/pralkarz) and [@fisker](https://github.com/fisker) for working together on this with me ([@43081j](https://bsky.app/profile/43081j.com)).

This has been a great community effort, with months of collaboration happening and a lot of back and forth in the Discord.

## Get involved

If you want to get involved in projects like this, join us on [our Discord](https://chat.e18e.dev) and we'll be happy to pair up.
