---
title: Improving Prettier performance with the new CLI
author:
  - name: James Garbutt
sidebar: false
date: 2025-06-09
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

_June 09, 2025_

Over the last several months, we've been working on a new version of the [Prettier](https://github.com/prettier/prettier/) CLI. Today, I'm happy to announce that it is now available behind a flag in the latest version of Prettier!

Here's just some of the story of how we got there and how you can give it a try today.

## Investigation

While using Prettier to format a project I was working on, I was left wondering - "what takes so long?".

Of course, I went off on a huge tangent and started profiling the CLI to see where the time was going!

On my fairly slow Intel Macbook Pro, we can see this kind of result in the [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/) project:

```sh
$ time npx prettier --check .
Checking formatting...
All matched files use Prettier code style!
npx prettier --check .  37.96s user 5.20s system 117% cpu 36.843 total
```

**~36s** is quite a long time to wait, especially given we're not writing any of the formatting results back to disk.

To get a quick overview of what's going on here, we can use [pprof-it](https://github.com/jakebailey/pprof-it):

```sh
npx pprof-it node_modules/prettier/bin/prettier.cjs --check .
```

This will generate a `pprof-time-{number}.pb.gz` file we can then visualise in [pprof](https://github.com/google/pprof).

A quick glance at this shows us a whole bunch of time is spent in these functions:

- `getOptionsForFile`
- `normalizeFormatOptions`
- `loadEditorconfigInternal`
- `searchInDirectory`

All of this points at config loading being a slow down here.

It turns out, Prettier supports config files _at any level_. This means it has to scan every directory it encounters in case there is a Prettier config file.

That may not sound like a lot, but remember, Prettier supports multiple config formats. We're actually looking for `.prettierrc`, `.prettierrc.json`, `.editorconfig`, and many more. In every directory.

## Discovering the prior work

At this point, it was fairly clear that we could make things a _lot_ faster if we just look for a root config file. Even if we still scan for all the different types of file, we can do it in the current directory rather than every directory.

I raised this in the [e18e discord](https://chat.e18e.dev) to see if anyone was interested in trying to tackle it.

As it turns out, [Fabio](https://bsky.app/profile/fabiospampinato.bsky.social) had already started work on this a couple of years ago with the Prettier team!

He even has a very well explained [blog post](https://prettier.io/blog/2023/11/30/cli-deep-dive) where he discovered much more than I did, and had already started work on a new version of the official CLI to solve the problem.

The work was never quite finished and was never released outside of various pre-release tags. So we decided to join forces and pick it back up :tada:

## Collaborating

Fabio, myself ([@43081j](https://bsky.app/profile/43081j.com)) and [pralkarz](https://github.com/pralkarz) collaborated for the next several months.

Our task mostly involved porting integration tests from Prettier to the new CLI to ensure everything passes as it did before. If we could prove all of the existing tests passed, we would be in a good place to start migrating people to the new CLI.

Out of this, we found various changes we needed to make and improved the performance even further.

Huge thanks to the community for the time spent on this, and thanks to [@fisker](https://github.com/fisker) for helping us integrate it into Prettier itself.

## The new CLI

The new CLI can be used today by using the experimental flag:

```sh
PRETTIER_EXPERIMENTAL_CLI=1 prettier . --check
```

If we run this on the same Macbook:

```sh
$ PRETTIER_EXPERIMENTAL_CLI=1 time npx prettier . --check
Checking formatting...
All matched files use Prettier code style!
node node_modules/@prettier/cli/dist/bin.js --check .  30.51s user 1.82s system 208% cpu 15.494 total
```

This was ~36s using the old CLI, so we've dropped a whole 20s! :fire:

We are cheating slightly in that the new CLI has parallelisation enabled by default. If we turn that and the caching layer off:

```sh
$ PRETTIER_EXPERIMENTAL_CLI=1 time npx prettier --no-cache --no-parallel --check .
Checking formatting...
All matched files use Prettier code style!
node node_modules/@prettier/cli/dist/bin.js --no-cache --no-parallel --check   22.44s user 1.80s system 145% cpu 16.687 total
```

It is still _much_ faster.

## What's next?

Once we have this in wider use, there's still many optimisations we can make elsewhere in the CLI, and in Prettier itself.

This is already a great improvement, though. Try it out today and let us know how it goes!

## Get involved

If you want to get involved in projects like this, join us on [our Discord](https://chat.e18e.dev) and we'll be happy to pair up.
