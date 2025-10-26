---
title: Community Showcase (Q3 2025)
author:
  - name: The e18e Contributors
sidebar: false
date: 2025-10-26
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
      content: https://e18e.dev/og/community-showcase-25-q2.png
---

_October 26, 2025_

# ![Community Showcase (Q3 2025)](/og/community-showcase-25-q2.png)

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

### ...and many more!

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

That's where [`modern-tar`](http://github.com/ayuhito/modern-tar) and [`nanotar`](https://github.com/unjs/nanotar) come in!

### `nanotar`

[`nanotar`](https://github.com/unjs/nanotar) is a super tiny runtime-agnostic implementation of parsing and creating tar files.

It comes in at just 37KB and 0 dependencies!

### `modern-tar`

While `nanotar` is great for parsing and creating tar files, it doesn't currently have a way to _extract_ them to the filesystem.

That's where [`modern-tar`](https://github.com/ayuhito/modern-tar) comes in!

`modern-tar` is can pack and unpack tar files to and from the filesystem, while still being very lightweight.

Similarly, it comes in at only 76KB and 0 dependencies :tada:

## Storybook

## Netlify

## Get involved

If you'd like to help out, come [join our discord](https://chat.e18e.dev) and say Hi!
