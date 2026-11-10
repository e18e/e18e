---
title: Framework Tracker
author:
  - name: Alexander Karan
sidebar: false
date: 2026-11-10
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Framework Tracker
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/framework-tracker
  - - meta
    - property: og:description
      content: Benchmarking JavaScript meta-frameworks
---

_November 10, 2026_

As part of the [speedup](https://e18e.dev/learn/speedup.html) initiative in the e18e community, we have been building a benchmark collection to measure the performance of meta-frameworks.

What started as a project to provide a fair comparison of meta-frameworks and foster collaboration between authors has grown into helping authors develop new versions of their frameworks and find real performance bottlenecks before their first official release.

Our biggest takeaway has been that benchmarking meta-frameworks is tricky to get right. Often it's like comparing apples to spaceships, so each test we add needs careful work. It's given us a new appreciation for benchmarks, showing that many approaches are needed to give a full picture rather than a screenshot of one bar or number being 10x higher than others.

> Projects like the framework tracker are essential. We're all rightly allergic to hype-driven benchmarks. So it's good that e18e is helping provide continuous measurement and real data to keep us accountable and push us to continue to improve performance - Daniel Roe (Nuxt)

## Why

We've had the pleasure of working with many meta-framework teams on our journey to our first release. In this initial release, we cover Nuxt, Next.js, TanStack Start (React), Solid Start, Solid 2.0, Astro, SvelteKit, React Router and Pracht. If you're reading this and wondering where your favourite meta-framework is, please raise an issue in our [repo](https://github.com/e18e/framework-tracker/issues).

## What We Measure

The cost of using a meta-framework goes beyond page render speed. What about build time or dependency installation time? If you work on smaller projects/teams, you might not notice these as much, but as you scale, they can cause bottlenecks and cost serious money. To cover all costs of using a meta-framework, we split benchmarks into two categories: [DevTime](https://frameworks.e18e.dev/dev-time/) and [RunTime](https://frameworks.e18e.dev/run-time/).

We also track meta-frameworks over time, capturing every major and minor release, allowing you to see the progress a meta-framework makes, not just whether X is better than Y in one test.

### Dev Time

For our initial release, we benchmark dependency count, node modules size, build/install times, dev server startup, Core-JS polyfills, browser baseline and minimum Node version.

Some of these tests can vary widely from project to project, so to keep the comparison fair, we set up a starter project using the default/recommended set provided by each meta-framework's CLI or docs.

### Run Time

## Core Web Vitals

// Work on HTTP Archive
// How these results can be miss-leading i.e loveable with TanStack or Solid having a smaller testing pool

## Impact so far

While working with the meta-framework teams, our benchmarks started finding improvements, which we have started collecting on an [impact page](https://frameworks.e18e.dev/impact/). Sometimes we found these improvements by making our tests fairer. For example, while working with Daniel Roe from Nuxt to make our SSR Load benchmark test fair, we noticed that framework-specific Link components were impacting performance. Daniel used this to improve links in Vue and Nuxt while we split our tests: one without framework component links and one with.

However, we are seeing the Framework Tracker being used in ways we could only hope for at the start:

> As we work on a major version of Solid 2.0 I have used the framework tracker extensively to make improvements to our SSR throughput. It really is an important project for the ecosystem - Brenley (Solid)

By adding Solid 2.0 to Framework Tracker, Brenley has been able to compare it with SolidStart and ensure each release candidate improves.

## Whats next

## Special Thanks

Every meta-framework team helped review and improve tests, so thank you all. We also want to thank the core contributors who worked on tests, UI/UX, colours, and more.

- [Paul](https://bsky.app/profile/paulvall.dev)
- [Brenelz](https://bsky.app/profile/brenelz.com)
- [Ryan](https://bsky.app/profile/rdforte.bsky.social)
- [Harry](https://e18e.dev/)
- [Sheraff](https://bsky.app/profile/sheraff.dev)
- [Daniel](https://bsky.app/profile/danielroe.dev)
- [Chris](https://e18e.dev/)
- [Florian](https://bsky.app/profile/florian-lefebvre.dev)
  // Add HTTP archive two members that helped a lot
