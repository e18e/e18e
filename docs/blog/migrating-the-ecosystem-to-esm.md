---
title: Migrating the ecosystem to ES modules
author:
  - name: The e18e Contributors
sidebar: false
date: 2025-03-19
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Migrating the ecosystem to ES modules
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/migrating-ecosystem-to-es-modules
  - - meta
    - property: og:description
      content: An update on the progress we're making migrating packages to ES modules
---

_March 19, 2025_

Node made some huge steps forward recently by releasing `require(esm)` to each of the long-term support versions (other than the soon to fall out of LTS 18.x). Awesome work by [@joyeecheung](https://bsky.app/profile/joyeecheung.bsky.social) getting it over the line!

This is awesome work and unblocks a huge amount of packages on the migration path from CommonJS to ES modules :tada:

So let's have a look into what's next and how the e18e community is trying to help!

## `require(esm)`

One of the main blockers in the CJS vs ESM story has been interop. You could import CJS from within an ES module, but could not `require` an ES module from within a CJS module.

This left us with two options at the time for a migration path:

- Change much of the code to be `async`, such that we can use a dynamic `import` (which does work in CJS modules)
- Change all CJS dependencies of our ES module package to be ES modules

The ideal is the latter, that everyone uses ES modules. However, this obviously isn't feasible since not all packages are maintained and it'd be a crazy amount of work to replace them.

So we were blocked...

That is until `require(esm)` came along! This basically means we _can_ `require` an ES module inside a CJS module now. CJS packages can consume ES module packages and vice versa. A huge move forward and unblocks us all to get back on the migration path!

For example:

```ts
// file: foo.cjs

// chai is esm only, but this now works!
const { expect } = require('chai')
```

## Types of package

As part of this migration, we have three types of package to deal with:

- ESM packages
- CommonJS packages
- Dual packages

### Migrating a CommonJS package

In most cases, this is as simple as setting `type` to `"module"` in `package.json`, then updating all imports to include file extensions.

For example, in `package.json`:

```json
{
  "name": "my-package",
  "type": "module"
}
```

And updating the imports:

```ts
// before
import './foo'

// after
import './foo.js'
```

If you want to expose extensionless imports to your consumers, you can use an export map:

```json
{
  "exports": {
    "./foo": "./foo.js"
  }
}
```

### Migrating a dual package

Dual packages are basically a necessary evil if you want to support both CJS and ESM _before `require(esm)` was available_ and don't want to force your CJS users to use an async dynamic import.

These packages work by having **two copies** of the sources and the types.

Fortunately, this doesn't increase the package size much since it will be compressed anyway. However, **it does increase the on-disk size** (once extracted by `npm`).

Most people shipping TypeScript packages like this will be using a tool like [tsup](https://github.com/egoist/tsup) or [tshy](https://github.com/isaacs/tshy).

Those shipping JavaScript often just use a bundler like [esbuild](https://github.com/evanw/esbuild) to create two bundles (or one and the sources).

To migrate from these setups, we mostly need to do the same steps as migrating a CommonJS package from above.

Some maintainers may still want to use their choice of tool/bundler, so in those cases we can configure the tool to no longer output CommonJS.

For example, in `tsup`:

```json
{
  "name": "my-package",
  "type": "module",
  "tsup": {
    "format": ["esm"]
  }
}
```

## How the community is helping

Within the e18e community, we have been tracking the migration from CJS to ESM in an [issue](https://github.com/e18e/ecosystem-issues/issues/129) for some time.

It is a crazy amount of work for us to try migrate every possible package, so we have opted for the approach of helping migrate high impact tools, starter kits, frameworks and what not. This should hopefully help others to follow suit and give plenty of example migrations to work from.

### Who has migrated so far?

We've already seen a huge amount of packages make the jump. Here are just a few (some of which were assisted by e18e, and some not):

- [chai](https://github.com/chaijs/chai) and all official plugins
- [tinyspy](https://github.com/tinylibs/tinyspy)
- [tinybench](https://github.com/tinylibs/tinybench)
- [tinyexec](https://github.com/tinylibs/tinyexec)
- [vueuse](https://github.com/vueuse/vueuse)
- [@pinia/nuxt](https://github.com/vuejs/pinia) (_in progress_)
- [clack](https://github.com/bombshell-dev/clack)
- [eslint-plugin-lit](https://github.com/43081j/eslint-plugin-lit)
- [eslint-plugin-wc](https://github.com/43081j/eslint-plugin-wc)
- [eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte)
- [eslint-plugin-github](https://github.com/github/eslint-plugin-github)
- [picospinner](https://github.com/tinylibs/picospinner)

This is just a subset of the packages we've seen migrate, many more PRs are still in progress by contributors and maintainers alike.

### Migrating ESLint plugins

One place we can easily contribute to this effort is the migration of ESLint plugins.

ESLint already imports plugins under the hood, and so can support them in CommonJS _or_ ES module format.

Migrating an ESLint plugin to ES modules will mean dropping support specifically for consumers who have flat configs written as CommonJS in a version of Node less than 20.x.

This is because flat configs in `>=20` will have `require(esm)` available, and legacy configs (`.eslintrc`) will use `import`.

### Migrating starter kits and frameworks

Another high impact place to help with this migration is in starter kits and frameworks. Many projects are created from these templates, so migrating them to ES modules will mean all new consumers automatically have the right setup.

We haven't yet started collaborating with these projects on this yet, but it is high priority in the pipeline.

## Get involved

If you maintain a package and want some help migrating, let us know! Many of the community would be happy to chip in.

Similarly, if you want to help migrate packages with us, come say hi.

[Join our discord](https://chat.e18e.dev) and let us know you want to help!
