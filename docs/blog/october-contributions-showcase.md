---
title: October contributions showcase
author:
  - name: James Garbutt
sidebar: false
date: 2024-11-04
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: October contributions showcase
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/october-contributions-showcase
  - - meta
    - property: og:description
      content: A showcase of e18e-focused contributions from October
  - - meta
    - property: og:image
      content: https://e18e.dev/og/october-contributions-showcase.png
---

# October contributions

_October 4, 2024_

![October Contributions Cover Image](/og/october-contributions-showcase.png)

A few days late again because I was caught in another typhoon :grimacing:, but here's the latest wins from the e18e community!

## Libraries

### picospinner & nanospinner

Two small but great additions, these CLI spinner libraries are here to replace heavier weight alternatives like `ora`.

[`picospinner`](https://github.com/tinylibs/picospinner/) was recently adopted into the [tinylibs](https://github.com/tinylibs) organisation, and is being lead by [Pondwader](https://github.com/PondWader).

[`nanospinner`](https://github.com/usmanyunusov/nanospinner) author [@usmanyunusov](https://x.com/usmanyunusov) has also recently joined the e18e community and is actively helping move things forward.

Both of these libraries are great alternatives and unblock a whole bunch of future migrations. Looking forward to see more!

### empathic / fd-package-json

As part of the cleanup project, we needed an alternative package for finding the closest `package.json`. To fill the gap, [`fd-package-json`](https://github.com/es-tooling/fd-package-json) was created **and recently passed 800,000 downloads/week!**

However, we still had many gaps where we wanted to traverse for other files and directories without having to pull in a heavy library.

This is where [empathic](https://github.com/lukeed/empathic) comes in!

Another great library by [@lukeed](https://x.com/lukeed05), this provides a bunch of useful utilities for dealing with paths and traversals.

This library can easily replace many of the `find-up`-like packages floating around the ecosystem:

```ts
import * as find from 'empathic/find'

// Find closest "foobar.config.js" file
const file = find.up('foobar.config.js', { cwd })
```

Let the migrations begin!

### nano-staged

Another one by [@usmanyunusov](https://x.com/usmanyunusov), [nano-staged](https://github.com/usmanyunusov/nano-staged) is a tiny replacement for `lint-staged`.

Benchmarks show it is much faster, and comes in with a much smaller footprint (currently only 47kB, 1 dependency).

This is another easy migration we will soon be kicking off across the ecosystem :rocket:

### milliparsec

In the web server space, [milliparsec](https://github.com/tinyhttp/milliparsec) has gained a huge amount of usage as a replacement for `body-parser`.

At only 11kB, this is much smaller than older alternatives, and much faster!

Excellent work by [v1rtl](https://github.com/talentlessguy) on building this and actively working on feedback from the community :heart:

## Contributions / Improvements

### Storybook

### ESLint plugins (and removing older Node support!)

A big win for the community this month - removing support for very old Node versions in a few popular ESLint plugins :tada:

For some time now, these plugins have been a source of considerable bloat for those of us who do not need to support such old engines. It is awesome to see the source projects finally dropping these polyfills in new major (breaking) versions.

Just a couple of plugins that are moving ahead on this:

- `eslint-plugin-react` (thanks to [@MichaelDeBoey93](https://x.com/MichaelDeBoey93))
- `eslint-plugin-jsx-a11y` (thanks to [v1rtl](https://github.com/talentlessguy) and [@MichaelDeBoey93](https://x.com/MichaelDeBoey93))
- `eslint-plugin-import` (thanks to [@MichaelDeBoey93](https://x.com/MichaelDeBoey93) again)

**None of these have been released yet** but they are well on their way and are being supported by the maintainers.

Do note, the community lead alternatives will certainly live on as they drop even more opinionated dependencies and logic. If you want to reduce your install footprint and get some performance gains, check out the alternatives docs for them here:

- [`eslint-plugin-import`](https://github.com/es-tooling/module-replacements/blob/main/docs/modules/eslint-plugin-import.md)
- [`eslint-plugin-react`](https://github.com/es-tooling/module-replacements/blob/main/docs/modules/eslint-plugin-react.md)

### strip-ansi

The community had a realisation recently that `strip-ansi` can be replaced very easily by the built-in [stripVTControlCharacters](https://nodejs.org/api/util.html#utilstripvtcontrolcharactersstr)!

Since then, [Namchee](https://github.com/Namchee), [@ari_perkkio](https://x.com/ari_perkkio) and others have contributed a whole raft of PRs migrating away from the library.

This was a great catch and has allowed us to drop the dependency in dozens of projects already.

If you're using Node 16.x and above, you can drop this one too!

### Docusaurus

This one didn't originate from e18e but is still well worth a mention. [Docusaurus](https://github.com/facebook/docusaurus) is currently tackling a pretty huge project of [improving build performance](https://github.com/facebook/docusaurus/issues/10556).

Great to see another large project taking a focus on performance :pray:

They have already shaved off minutes from their build times :fire: very impressive work by [@sebastienlorber](https://x.com/sebastienlorber) and the team.

## Other news

### `require(esm)` in Node

[@joyeecheung](https://x.com/joyeecheung) and others have recently been working hard on allowing Node to `require(...)` ES modules.

For example, this means the following code would now work:

```ts
// chai 5.x is ESM only
const { expect } = require('chai')
```

Until now, many of us have been publishing "dual packages" - packages which contain both CommonJS and ES module syntax.

This is unfortunate since it means we're often shipping double our package size in order to support both systems.

With the ability to `require` ES modules, this will all change and we should be able to ship _only ESM_! :tada:

As part of this becoming available, the e18e community is preparing to help in a few ways:

- Migrate projects pinned to older CJS versions of dependencies to their later, ESM-only versions
- Migrate projects with a dual package setup to ESM-only
- Migrate projects which have `type: "module"` but also have CJS exports to ESM-only

Huge reductions will happen once we are able to stop publishing dual packages. Big wins ahead!

If you want to help out with this, we're [tracking the work here](https://github.com/es-tooling/ecosystem-cleanup/issues/129).

### porffor passes 50% of ECMAScript tests

If you haven't seen it yet, check out [porffor](https://porffor.dev/), a very cool experimental ahead-of-time JavaScript compiler/engine.

Built by [@canadahonk](https://x.com/canadahonk) (an active member of our community :heart:), porffor has the potential to become an extremely useful tool for producing much smaller and faster WASM binaries.

Instead of packaging a runtime alongside the code, porffor will compile down to native (which comes with huge performance gains).

Recently, the biggest win has been to see the engine pass 50% of the Test262 tests! You can [read more about this here](https://goose.icu/porffor-50/).

### e18e on Bluesky

The e18e community now also has a profile on Bluesky: [e18e.dev](https://bsky.app/profile/e18e.dev).

Give us a follow and we'll post updates on the cool stuff happening in the community! :butterfly:

## Get involved

If you want to help out, [join the discord](https://chat.e18e.dev). We'd love to have the help :pray:
