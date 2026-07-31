---
title: Source maps or not?
author:
  - name: James Garbutt
  - name: Alex Lichter
sidebar: false
date: 2026-07-30
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Source maps or not?
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/source-maps-or-not
  - - meta
    - property: og:description
      content: Source maps are great for debugging, but should we be shipping them in production?
  - - meta
    - property: og:image
      content: https://e18e.dev/og/source-maps-or-not.png
---

_July 30, 2026_

# ![Source maps or not?](/og/source-maps-or-not.png)

As part of the [cleanup](https://e18e.dev/learn/cleanup.html) initiative in the e18e community, we aim to greatly reduce the size of high impact packages. As well as runtime size, this includes the **install size**.

Often a big saving can be made by removing source maps, but when is this the right thing to do? In this post, we’ll explore the pros and cons of shipping source maps in production.

## What are source maps?

The code we ship to production is often different to the code we write. This can be due to transpilation (TypeScript), minification, or just regular bundling. Source maps are a way to map the code we ship back to the code we wrote, so that when an error occurs, we can see the original source code in the stack trace.

On top of this, it allows debuggers to show and step through the original source code, rather than the minified code.

To summarise, a full source map gives you the following:

- Stack traces that point to the original source code
- Stack traces contain the original file names and line numbers
- Debuggers can show and step through the original source code

## How big is a source map?

Let's say we start with this TypeScript:

```ts
export function greet(name: string): string {
  return `Hello, ${name}!`
}
```

Stripping the types gives us this JavaScript:

```js
export function greet(name) {
  return `Hello, ${name}!`
}
```

And the source map which comes with it looks like this:

```json
{
  "version": 3,
  "sources": ["greet.ts"],
  "sourcesContent": [
    "export function greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n"
  ],
  "mappings": "AAAO,SAAS,MAAM,MAAsB;AAC1C,SAAO,UAAU,IAAI;AACvB;",
  "names": []
}
```

Note that the `sourcesContent` field contains an entire copy of the original file. Even for three lines of code, the map is already bigger than the code it maps.

Basically, we have three options when producing a source map:

1. Include the original source code in the source map (as above)
2. Include the original source code in a separate file, and reference it from the source map
3. Do not include the original source code at all, and just include the mappings

In the first two cases, both the original source code and the published code will be shipped, which often means more than double the install size. In the last case, the map will generally be smaller than the published code, but still non-zero of course.

For example, I happen to have `change-case` installed right now and it has these two files:

- `index.js` (7.2k)
- `index.js.map` (15.5k)

In their case, they are following option 1. `index.js.map` contains the source code from the original `index.ts`, and `index.js` contains the transpiled (type-stripped) code. This means that the install size is **22.7k**, but if they were to remove the source map, it would be just **7.2k**.

This scales up quickly once you're looking at a package with real reach. `magic-string` is a good example: dropping source maps took its install size from **241KB** down to **155KB**. That's a 36% saving on a package that ends up in a huge number of `node_modules` directories, for no cost to the vast majority of the people installing it.

> [!NOTE]
> Option 3 is a useful middle ground if you can't drop source maps entirely. We cover it later in [if you must ship source maps](#if-you-must-ship-source-maps).

## When we need source maps

We basically need source maps when the published code is _lossy_. That is, when the published code no longer contains something important that was in the original source code.

### Case 1: TypeScript

The most common case for this is TypeScript. When we transpile TypeScript to JavaScript, we lose the type information. The output is still very much readable code, but is still lossy in that it no longer contains the types.

Often this is fine since the code is still readable and navigable, but in some cases, the type information is just as important as the code itself. This won't be the average case, but it is a case that should be considered.

### Case 2: Minification

Minification is another case where source maps are useful. When we minify code, we lose a lot of information. Variable names are shortened, whitespace is removed, and comments are stripped out. This can make the code very hard to read and understand.

In this situation, the stack traces are often worthless since they often point to a single, extremely long line of code. Similarly, debuggers do what they can by formatting the minified code on the fly, but this can cause chaos with jumping around and breakpoints.

### Case 3: Custom syntaxes

The strongest case is when the original source isn't JavaScript at all.
Let's take a look at two examples of this: Vue.js and Svelte.

We start with the Vue.js library. What you author is a Single File Component, so putting your `<template>`, `<script>` and `<style>` in one `.vue` file. But what you publish is different: Instead of the `.vue` SFC, you usually publish a JavaScript module that was compiled by the Vue compiler. It looks nothing like the SFC you wrote.

So here, "publish readable code" is tricky because you don't author readable _JavaScript_. This is a lossy transform, so if you publish compiled output, a source map with the sources embedded is the only way to map back.

Svelte on the other hand answers the same problem in the opposite way. `svelte-package` publishes the `.svelte` files themselves (preprocessed and type-stripped, but still `.svelte`) and leaves compilation to the consumer's build. Nothing has been compiled when publishing the files, so there's nothing to map back to, and the package ships no source maps at all. It's a smaller install, and the debugger shows you something very close to the file the author actually wrote.

But the compile step doesn't fully disappear. Instead it just moves as every consumer now compiles on every cold build, and your source has to be understood by whichever Svelte version they happen to have. Otherwise libraries require a certain Svelte version, which can create compatibility issues

Neither approach is wrong. They are different bets on what the consumer's build is able to do. And depending on the approach you should consider whether source maps are needed or not.

## When we don't need source maps

When the code is readable, we don't need source maps.

To summarise, taking the previous three cases into account:

- JavaScript: no source maps needed.
- TypeScript: no source maps needed, _unless_ the type information plays a significant role in understanding the code and stack traces.
- Minified code: source maps are needed. Though as we'll see below, publishing minified code isn't recommended in the first place.
- Custom syntaxes: source maps are needed, _unless_ you publish the original source itself and let the consumer compile it.

On the second point, if the package publishes type definitions (e.g. `index.d.ts`), then the type information is still available to the consumer, and source maps may not be needed.

## Who needs source maps?

This is an important question, and one we need to know the answer to before we can make a decision.

Let's say you maintain an npm package which has 20M downloads/week. How many of those 20M downloads are by people who need to debug the code or want the original stack trace locations in production? The answer is almost certainly a tiny minority.

Usually the people who need it are:

- The authors
- Anyone who is contributing to the package and needs to debug it
- Anyone who debugs `node_modules` regularly in production
- Anyone interpreting a production stack trace

Also worth noting, only the third point needs the original source code to be part of the published package, and only if the published code is not readable.

## Who pays for source maps?

The people who need to be convinced to drop source maps are, in many cases, the same people who benefit from them. That's an awkward position to be in.

The cost, though, isn't paid by the maintainer. It's paid once per install, by people who will never open a debugger on your package. Going back to the `magic-string` example, that 86KB saving isn't a single 86KB. It's 86KB in every `node_modules` directory which ends up with `magic-string` in it, and there are a very large number of those.

The benefit of shipping source maps is concentrated in a handful of people who are already well equipped to debug the code. The cost is spread thinly across everyone else, which is often the kind of cost that never gets noticed by the person who is in a position to remove it.

## Publish readable code

If you're publishing code to npm, rule of thumb is:

- Do not minify
- Do not bundle

> [!NOTE]
> There are some exceptions where bundling may be the right thing to do. You can read more about bundling in our [previous post](https://e18e.dev/blog/bundling-dependencies.html).

Minification, bundling, and tree-shaking are the user's responsibility rather than the package author's. On the other hand, if you're building an app, you should absolutely do these things to reduce the size of your runtime.

Assuming you don't do either of these, the code is already readable, and source maps are generally not needed. This is the case for most packages, and is the recommended approach.

### When minification might be appropriate

Although you should generally not minify your published code, there are some exceptions. The general rule is: **if your package is a library, don't minify it. If your package is a tool that people use directly, it may make sense to minify it.** Making this decision is very similar to deciding [when to bundle](https://e18e.dev/blog/bundling-dependencies.html).

For example, a CLI that nobody imports as a library may be a good candidate for minification. This is especially true for large CLIs like those provided for the various platforms (e.g. `wrangler`), or JavaScript frameworks (e.g. `sv`).

## Disabling source maps

In TypeScript, you can disable source maps by setting `sourceMap` to `false` in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "sourceMap": false
  }
}
```

In tsdown, you can disable source maps by setting `sourcemap` to `false` in your `tsdown.config.ts`:

```ts
import { defineConfig } from 'tsdown'

export default defineConfig({
  // ...
  sourcemap: false
})
```

## If you must ship source maps

If you must ship source maps, it may be worth purposely excluding the original sources.

The primary use for source maps in production is really to get a nicer stack trace, rather than to debug the code.

For example, using TypeScript:

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "inlineSources": false
  }
}
```

If you do this, debuggers will try to load the original source **and will fail**. Instead, they will fall back to showing the published code, so you lose the ability to step through the original source. However, the stack trace filenames and locations will still point to the original source code.

For logging and error reporting, this is often enough to be useful, and it will save a lot of install size.

> [!TIP]
> You can use [maplint](https://github.com/43081j/maplint) to validate your source maps and ensure they are correct.

## Source map servers?

In the .NET world, we have "symbol servers" and "Source Link". Symbol servers are basically servers which host the symbols (equivalent of source mappings) for a given package, while Source Link provides a way to link to the original source. This means that debuggers can pull the symbols and source code when needed, rather than shipping them with the package.

It would be interesting to see if this same concept could apply to the JavaScript ecosystem. Instead of having to choose between debuggability and install size, we could have the best of both worlds. The package would be small, but if you need to debug it, you can download the source maps from a server.

Today, this is roughly doable by having `sourceMappingURL` point to a URL instead of a local file, but not all runtimes support doing such an external request during debugging. Similarly, there's no standardised place to host the source maps.

A thing to keep an eye on here is the [debug IDs proposal](https://github.com/tc39/ecma426/blob/main/proposals/debug-id.md), which will define a standard way of identifying which source maps correspond to which published code.

## Conclusion

We can wrap up most of the decision making process into these points:

- Prefer shipping readable code over minified code
- If you must ship minified code, ship source maps (possibly without source content)
- Otherwise, source maps are generally not needed

If you have any comments or questions on this topic, feel free to reach out on the [e18e Discord](https://chat.e18e.dev/).
