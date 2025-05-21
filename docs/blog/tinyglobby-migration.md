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
      content: https://e18e.dev/og/tinyglobby-migration.jpg
---

_May XX, 2025_

# ![Tinyglobby migration and matching at the speed of light)](/og/tinyglobby-migration.png)

My story with dependencies is odd. I started coding in JavaScript about five years ago,
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
