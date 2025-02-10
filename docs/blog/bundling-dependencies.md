---
title: Bundling dependencies (and when not to do it)
author:
  - name: The e18e Contributors
sidebar: false
date: 2025-02-10
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Bundling dependencies (and when not to do it)
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/bundling-dependencies
  - - meta
    - property: og:description
      content: A brief write up on when you should or shouldn't bundle dependencies
  - - meta
    - property: og:image
      content: https://e18e.dev/og/bundling-dependencies.png
---

_February 10, 2025_

# ![Bundling Dependencies (and when not to do it)](/og/bundling-dependencies.png)

As part of [e18e](https://e18e.dev), the community is often asked when you should or shouldn't bundle your dependencies _as a library author_.

Much of this has come around thanks to people noticing that [vite](https://github.com/vitejs/vite) does indeed bundle most of its dependencies. Similarly, [storybook](https://github.com/storybookjs/storybook/) has been known to do the same but for internal packages.

So when is this the right thing to do, and when is it not?

## What is pre-bundling / inlining / etc?

Before we continue, let's explain some of these terms and what's going on here.

If we _inline_ a dependency, that usually means we take the source of it and copy it into our codebase rather than depending on it as an npm package.

If we _pre-bundle_ (or just "bundle") a dependency, that would mean we run our library through a bundler like [rollup](https://github.com/rollup/rollup) before publishing it.

In both cases, the dependency is no longer taken from npm and is instead stored in our published package as if we wrote it ourselves (and are "dependency free").

## Why?

There are a few reasons you may do this, though each is debateable on if it is the right thing to do or not.

So let's go through a few!

### Dependency is CommonJS and you're targeting browsers

This one is somewhat valid and fairly common. You depend on a package _which has no clear ESM alternative_ and you want your library to work natively in browsers.

If this is the case, ideally you would either move away from the package to an ESM alternative, or you would contribute upstream to add ESM support.

This isn't always possible though - e.g. if this is a fairly niche package or is no longer actively maintained.

**Advice:** If it is unmaintained, build your own and contribute back to the community. Either way, there should be a solution to this without bundling.

### Using only a small part of the dependency

Sometimes, you may depend on a fairly large dependency but only actually use a tiny part of it.

While it is true that you can tree-shake the rest, that burden is then on your consumers who have to pull down an unnecessarily large dependency and have to remember to setup tree-shaking in the first place.

**Advice:** Suggest that the authors extract this functionality into its own package (within reason), or find/create an alternative more focused package.

### Internal dependencies

If you work in a monorepo, it is sometimes the case that you want to organise your code into sub-packages but don't necessarily want to publish all of those to npm.

In this case, it makes sense that you might bundle the internal packages at publish time, _assuming you only use them in one package_. If you use them in multiple packages, it probably still makes sense to publish them to gain from de-duplication.

A quick example would be a monorepo structured like this:

- `@org/library` - the main library published to npm
- `@org/utils` - a library _only_ `@org/library` uses
- `@org/cli` - a cli package published to npm
- `@org/text` - a library used by `@org/library` and `@org/cli`

As you can see, `@org/utils` could be bundled into `@org/library` rather than being its own package. Meanwhile, `@org/text` is used by multiple published packages so should likely be published itself too.

**Advice:** If only used in one place, this is fine to bundle. Otherwise, publish the packages.

### Being "dependency free" / "zero dependency"

Especially with e18e community raising awareness of dependency bloat (amongst many other things), people have been adding more focus to going "dependency free".

In some projects, this makes a lot of sense for various reasons. For example, using more of what the platform provides rather than dependencies.

However, some projects have seen this rise in demand for "dependency free", and tried to shortcut a solution by bundling _all_ of their dependencies.

This just hides the fact that they still have a bloated dependency tree, and worsens things by removing npm's ablity to de-dupe dependencies.

These projects often include a `vendor/` directory of their npm packages, or run a bundler at pre-publish time.

This is really poor since it will hide the problem, but not solve it. So it is best to avoid these projects if there are alternatives available.

**Advice:** Put the work in and become dependency-free properly (if it really should be).

## Additional notes

### Tree-shaking in libraries

Bundlers are very good at tree-shaking these days, so you can quite easily pull in a larger library and only use part of it without needing to ship all of it.

However, if you're publishing a library, this means you're placing the job of tree-shaking onto your consumers (assuming you document that they should do it!).

This isn't great, but neither is the alternative (bundling the parts you use).

If possible, you really should try find a more appropriate package or create one which provides the part of the functionality you need.

### Extracting new packages

Sometimes, a package has a piece of functionality you need but that accounts for a tiny amount of the overall size.

If this is the case, it often makes sense to extract it into its own package.

However, the line is _very fine_ here.

If you extract something too little, you're publishing micro-utilities (which we're trying to avoid).

Ideally, you should extract _groups_ of functionality into re-usable packages. A good example of this is [empathic](https://github.com/lukeed/empathic), a group of path utilities.

### De-duplication

Whatever you do, if you bundle, you're at risk of removing the benefits npm gives of de-duplication.

Ideally, we want to declare our dependencies so we can leave npm to de-dupe and share them across other libraries being used in parallel to ours.

## Conclusion

Given we don't always have the time to contribute upstream to our dependencies and clean things up, it may still be a valid _temporary_ solution to bundle some of them.

The community is working hard to clean dependency trees up and provide alternatives, though, so this should become less of a problem over time.

Usually there is no good reason to bundle your dependencies long term, and it should be seen as a short term solution.

The most valid reason above is that you want to bundle some internal single-use dependencies, without having to keep them all in one project. This seems fine and will help keep code tidy internally.
