---
title: Tinyglobby migration and matching at the speed of light
author:
  - name: Madeline Gurriarán
sidebar: false
# placeholder
date: 2025-05-22
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Tinyglobby migration and matching at the speed of light
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/tinyglobby-migration
  - - meta
    - property: og:description
      content: Our journey so far as a community leading into 2025
  - - meta
    - property: og:image
      content: https://e18e.dev/og/tinyglobby-migration.png
---

_May XX, 2025_

![Tinyglobby migration and matching at the speed of light)](/og/tinyglobby-migration.png)

My story with dependencies is odd. I started coding in JavaScript about six years ago,
and over time I started to notice just how big my lockfiles were getting every time
I wanted to use a new library. Most subdependencies didn't even seem related to the libraries I was using.
I had a low-end laptop until recently, and every time this happened I'd notice just how slow installations were getting.

I started inspecting what subdependencies were being added to my projects, and whether or not they really were
necessary in the modern days of the JavaScript ecosystem. After months of occasionally improving the dependency count
of some libraries I was using, I found out about e18e right as it was made public, a place where I learned many
ways I'd never thought of to improve libraries.

One notable library I wanted to replace was `globby` in `tsup`, and I got recommended to try `fdir` and `picomatch`
for it. I [submitted a PR](https://github.com/egoist/tsup/pull/1158), which got merged after a few days.
The next day I woke up to users being unable to use `tsup` because of it. It turns out that globs are complex!
I would have never thought I'd spend the rest of the year working on globs.

Since some people from e18e were also stuck on lightweight globs, we decided it was best if my little tsup PR
of less than 100 lines would be turned into its own library, so that others could benefit from its small size.
This is the story of that library.

## tinyglobby

`tinyglobby` is an attempt at having a glob library that's as small as possible without sacrificing on performance.

## Dependency savings

Let's take a look at some comparisons with other libraries in this space:

- `globby` consists of [24 packages by 14 maintainers](https://npmgraph.js.org/?q=globby) with an [install size of 637KB](https://pkg-size.dev/globby)
- `fast-glob` consists of [18 packages by 12 maintainers](https://npmgraph.js.org/?q=fast-glob) with an [install size of 513KB](https://pkg-size.dev/fast-glob)
- **`tinyglobby` consists of [3 packages by 6 maintainers](https://npmgraph.js.org/?q=tinyglobby) with an [install size of 179KB](https://pkg-size.dev/tinyglobby)**

Having fewer packages reduces the need to have as many people with access to merge and release new versions thus reducing supply chain vulnerabilities, of which we've seen a number of in the npm ecosystem. For example, just recently, users of `glob`, which has 26 dependencies, were affected by a supply chain attack in which a dependency - `strip-ansi` - [was compromised](https://socket.dev/blog/npm-author-qix-compromised-in-major-supply-chain-attack). Users of `tinyglobby` would not have been affected by this particular attack and face far less risk of similar attacks in the future.

### High adoption enables deduplication

Of course, `globby` and `fast-glob` are widely used, so you may question whether switching to `tinyglobby` just results in more dependencies rather than any savings once dependency deduplication is factored in.

Fortunately, the community have been hard at work consolidating around the use of tinyglobby and reducing this problem. 

A whole raft of popular build tools now rely solely on tinyglobby for glob functionality:

- Vite
- SWC
- copy-webpack-plugin
- tsup
- tsdown
- unbuild
- nx
- lerna
- and many more...

None of these tools have a deep dependency on other glob libraries - all of them use tinyglobby all the way down 🎉

Similarly, many popular frameworks have made the same move:

- React Router
- Preact
- Angular
- SvelteKit
- Astro
- Starlight
- Eleventy

New apps using these frameworks will no longer have deep dependencies on multiple glob libraries.

For others like Nuxt, SolidStart, and TanStack Start, all dependencies have fully switched to `tinyglobby` and those frameworks will only use `tinyglobby` once they update their dependencies. Most remaining frameworks use both `tinyglobby` and `fast-glob`.

Some ecosystems now rely almost entirely on `tinyglobby` — Svelte maintainer [benmccann](https://www.benmccann.com/) has switched over most of the Svelte ecosystem to using `tinyglobby`. Once the pending PR to `typescript-eslint` is merged, you will be able to setup a new SvelteKit project with [every integration it offers](https://svelte.dev/docs/cli/sv-add#Official-add-ons) and your project will exclusively use `tinyglobby`. Many other notable projects such as `pnpm`, `node-gyp`, and `eslint-import-resolver-typescript` have made the switch as well.

For projects that are new or have recently updated dependencies, `tinyglobby` is more likely to be used than `fast-glob` or `globby`. On both a relative and absolute basis, `tinyglobby` usage is growing faster than alternatives. Something important to keep in mind here is that all usage of `tinyglobby` is on a single release line where as it's split across major versions for alternatives. E.g. `globby` usage is split across ten versions (v5-14 all have more than 1m downloads/week). This means that the rate at which `tinyglobby` is being used on new projects compared to alternatives is even higher than raw download numbers might indicate.

## Performance

The journey with `tinyglobby` started out focusing more on size rather than performance. After many months past its
initial release though, I am proud to say that it is not only smaller but also faster than alternatives for
the vast majority of use cases.

A few months ago, an important performance improvement was achieved that applied to every use case that didn't
glob outside the cwd used. Comparing benchmarks between the newest release and the previous one shows a considerable
speedup! [Here's one](https://bsky.app/profile/superchupu.dev/post/3ly6vfdn6n225) where `tinyglobby` didn't use to be the fastest - globbing `packages/*.tsconfig.json` in the `typescript-eslint` repository:

------------------------------------
|                     | ops/s      |
----------------------|-------------
| `tinyglobby` 0.2.15 | 2357 ± 100 |
| `tinyglobby` 0.2.14 | 981 ± 131  |
| `fast-glob`         | 1878 ± 110 |
| `glob`              | 1767 ± 95  |
| `node:fs` glob      | 941 ± 74   |
------------------------------------

## Stability

`tinyglobby` is a newer library, so you may ask whether switching to it introduces a higher risk of bugs. It is certainly true that libraries take time to mature. In tinyglobby's earlier days some projects faced regressions. However, those issues have all now been fixed. With such widespread adoption by high profile widely-used projects in the ecosystem, any bugs in `tinyglobby` are found and reported quickly. Each issue has been patched with an included test and as a result `tinyglobby` now has over 100 individual tests. When there has been a bug in `tinyglobby`, it's been relatively straightforward to identify whether it's in `tinyglobby` itself or one of its two dependencies. It can be much harder to track down an issue in a library with 17 dependencies or even to see all of the issues across all of the repos that might be present. In fact, `fast-glob` and its dependencies together have roughly twice as many open issues as `tinyglobby` and its dependencies combined. `tinyglobby` has been very actively maintained and has the support of the e18e community who have been instrumental in identifying issues and their root causes. The [biggest release so far](https://bsky.app/profile/superchupu.dev/post/3ly6vfczjq225), `0.2.15`, has so far zero regressions reported despite it changing a lot of internals!

## Standing on the shoulders of giants

`tinyglobby` depends on `fdir` and `picomatch` and would not be possible without them. I've learned a lot about the complexity of globbing over the past year and it is wonderful being able to rely on `picomatch` as a battle-tested library implementing this functionality. And `fdir` lets us build on top of the fastest directory crawler on Node, which can easily crawl a directory containing 1 million files in < 1 second.

I'd also like to thank the authors of `globby` and `fast-glob` - Sindre Sorhus and Denis Malinochkin. `tinyglobby` is API-compatible with a subset of their APIs, which have found widespread adoption in the ecosystem. The creation of `tinyglobby` is in no way a criticism of their work. Those libraries implement a lot of functionality and are a great solution for many users. `tinyglobby` is meant as a lightweight alternative for the vast majority of projects that don't need the full breadth of options provided by those libraries. Additionally, a special thanks should be given to Sindre for helping to push forward the ecosystem in ways that e18e is also working on. E.g. Sindre has converted many of his packages to be ESM-only. While this has made upgrades difficult for consumers in the past, all LTS versions of Node now support the `module-sync` export path, which should greatly ease adoption of ESM packages by CJS code.
