---
title: Launching the Framework Performance project
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
      content: Launching the Framework Performance project
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/launching-the-framework-performance-project
  - - meta
    - property: og:image
      content: https://e18e.dev/og/launching-the-framework-performance-project.png
  - - meta
    - property: og:description
      content: Benchmarking JavaScript meta-frameworks
---

_November 10, 2026_

# ![Launching the Framework Performance project](/og/launching-the-framework-performance-project.png)

Today we're excited to launch the [Framework Performance project](https://frameworks.e18e.dev/), a collection of benchmarks to measure the performance of meta-frameworks! :tada:

What started as a project to provide a fair comparison of meta-frameworks and foster collaboration between authors has grown into something much bigger. Already, this has helped authors develop new versions of their frameworks and find real performance bottlenecks before release.

> Projects like the framework tracker are essential. We're all rightly allergic to hype-driven benchmarks. So it's good that e18e is helping provide continuous measurement and real data to keep us accountable and push us to continue to improve performance.
>
> \- Daniel Roe (Nuxt)

## Why

So why create this project? Doesn't every meta-framework have its own benchmarks and focus on performance? Well, that is actually the issue: each team measures performance differently, and each has its own priorities. Some meta-frameworks focus on server-side rendering, while others focus on client-side rendering. Often it is like comparing apples to spaceships, as no two frameworks are built the same and most of them have slightly different target audiences.

All of this inconsistency, and the fact that you're more likely to measure yourself in a category you know you excel in, makes it hard to get a clear picture from existing benchmarks. It's also why we believe many metrics are needed to give a full picture, rather than just one over-simplified number.

On top of this, not all meta-framework teams have the time to build and maintain these benchmarks.

With this project, we want to achieve two things:

- Help framework maintainers measure their own performance and improve it
- Provide a set of clear and transparent benchmarks for the community to see how well each framework performs in different areas

We've had the pleasure of working with many meta-framework teams on our journey to our first release. In this initial release, we cover Nuxt, Next.js, TanStack Start (React), Solid Start, Solid 2.0, Astro, SvelteKit, React Router and Pracht. If you're reading this and wondering where your favourite meta-framework is, please raise an issue in our [repo](https://github.com/e18e/framework-tracker/issues).

## What We Measure

The cost of using a meta-framework goes beyond page render speed. What about build time or dependency installation time? If you work on smaller projects/teams, you might not notice these as much, but as you scale, they can cause bottlenecks and cost serious money. To cover all costs of using a meta-framework, we split benchmarks into two categories: [DevTime](https://frameworks.e18e.dev/dev-time/) and [RunTime](https://frameworks.e18e.dev/run-time/).

We also track meta-frameworks over time, capturing every major and minor release, allowing you to see the progress a meta-framework makes, not just whether X is better than Y in one test.

### Dev Time

For our initial release, we benchmark:

- Dependency count
- Node modules size
- Build/install times
- Dev server startup
- Core-JS polyfills
- Browser baseline
- Minimum Node version

Some of these tests can vary widely from project to project, so to keep the comparison fair, we set up a starter project using the default/recommended setup provided by each meta-framework's CLI or docs. This also helps maintainers spot where their defaults could be improved.

### Run Time

Unlike Dev Time, our Run Time benchmarks build the same app in each meta-framework rather than using its defaults. Default setups can differ widely, and here we want to measure the framework itself. We also do a lot of work to ensure these benchmarks are fair by running tests multiple times and recording the min, max, median, and variance of runs.

We also partnered with [Depot](https://depot.dev/) to provide a consistent setup and run these benchmarks. Our initial Run Time benchmarks include:

- Client-side rendered via Lighthouse (FP, FCP, INP)
- Server-side rendered via Lighthouse (FP, FCP, INP)
- Initial load (KB loaded for a basic web page)
- Server-side rendered throughput (latency and request throughput using SSR)
- Server-side rendered load test (latency of SSR request under load)
- Server-side rendered load test using Framework link components

## Core Web Vitals

To continue our work of capturing the true cost of meta-frameworks, we are expanding our docs to include additional datasets. Thanks to [Annie](https://bsky.app/profile/anniesullie.com) and [Barry](https://bsky.app/profile/tunetheweb.com) from Google and [Ryan](https://bsky.app/profile/rdforte.bsky.social) from the e18e community, we pulled in data from the [HTTP Archive](https://httparchive.org/) to provide real-world metrics. We also contributed back to this by adding detection for TanStack, which was missing when we originally started the project. You can view the stats for supported meta-frameworks on its [own page](https://frameworks.e18e.dev/core-web-vitals/), with breakdowns by Desktop and Mobile.

Just as isolated benchmarks can paint a different picture than real usage in production, HTTP Archive data can too. A meta-framework doesn't control how people use it or where it's hosted vs the origin of traffic. Sample size can skew data as well; for example, Solid scores very well, though from a much smaller sample of sites. Maybe everyone building with Solid is just hyper-focused on performance 😉.

The main takeaway is that performance needs to be looked at from many angles, considering the full impact, not just a single chart posted online.

## Impact so far

While working with the meta-framework teams, our benchmarks began surfacing opportunities for improvement, which we have started documenting on an [impact page](https://frameworks.e18e.dev/impact/). Sometimes we found these improvements by making our tests fairer. For example, while working with Daniel Roe to make our SSR Load benchmark fair, we noticed that framework-specific Link components were impacting performance. Daniel used this to improve links in Vue and Nuxt. Meanwhile, we split our tests into two: one without framework component links and one with.

Beyond that, we are seeing the project being used in ways we could only hope for when we started:

> As we work on a major version of Solid 2.0 I have used the framework tracker extensively to make improvements to our SSR throughput. It really is an important project for the ecosystem.
>
> \- Brenley (Solid)

By adding Solid 2.0 to the Framework Performance project, Brenley has been able to compare it with SolidStart and ensure each release candidate improves.

A few highlights from the [impact page](https://frameworks.e18e.dev/impact/) so far:

- **Nuxt:** internal `<NuxtLink>` anchors render directly on the server, cutting render time for internal links by ~58%
- **React (Next.js):** RSC payload parsing is ~75% faster, speeding up frameworks built on it, including Next.js
- **Solid 2.0:** three upstream fixes took the SSR load test from 170 to 280 req/s (one connection) and ~200 to ~390 req/s (concurrent)
- **Vue Router & TanStack Router:** proposed fixes to make links cheaper to render, with Vue Router links 1.5-2.2x faster on the server

## Whats next

This is only the start. No benchmark is perfect, and we know people will question these results, which is exactly what we want. If you think a test is unfair or something is missing, tell us. Every bit of feedback makes the benchmarks more accurate, and better benchmarks help framework authors and developers alike.

We are already working on new benchmarks and adding more meta-frameworks to the project. While we have our own roadmap for new tests, we would love to hear your ideas. We already have an issue set up, so if you have an idea, [drop it in there](https://github.com/e18e/framework-tracker/issues/292).

## Special Thanks

Every meta-framework team helped review and improve our benchmarks, so thank you all. We also want to thank the core contributors who worked on tests, UI/UX, setups, and direction-setting, and who were always there to bounce ideas around.

- [Annie](https://bsky.app/profile/anniesullie.com)
- [Paul](https://bsky.app/profile/paulvall.dev)
- [Brenelz](https://bsky.app/profile/brenelz.com)
- [Ryan](https://bsky.app/profile/rdforte.bsky.social)
- [Harry](https://bsky.app/profile/the-intern.dev)
- [Sheraff](https://bsky.app/profile/sheraff.dev)
- [Daniel](https://bsky.app/profile/danielroe.dev)
- [Chris](https://m.webtoo.ls/@swithinbank)
- [Florian](https://bsky.app/profile/florian-lefebvre.dev)
- [Barry](https://bsky.app/profile/tunetheweb.com)

Finally, a big thank you to [Depot](https://depot.dev/) for sponsoring these benchmarks. With Depot, we can run several iterations in just a few minutes and check how consistent the results are across runs.
