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
    - property: og:description
      content: Benchmarking JavaScript meta-frameworks
---

_November 10, 2026_

As part of the [speedup](https://e18e.dev/learn/speedup.html) initiative in the e18e community, we have been building a benchmark collection to measure the performance of meta-frameworks.

What started as a project to provide a fair comparison of meta-frameworks and foster collaboration between authors has grown into helping authors develop new versions of their frameworks and find real performance bottlenecks before their first official release.

Our biggest learning from this: benchmarking meta-frameworks is hard. Often it is like comparing apples to spaceships, as no two frameworks are built the same and most of them have slightly different target audiences. This has given us a new appreciation for benchmarks, showing that many metrics are needed to give a full picture rather than just one over-simplified number.

> Projects like the framework tracker are essential. We're all rightly allergic to hype-driven benchmarks. So it's good that e18e is helping provide continuous measurement and real data to keep us accountable and push us to continue to improve performance - Daniel Roe (Nuxt)

## Why

So why create this project? Doesn't every meta-framework have its own benchmarks and focus on performance? Well, that is actually the issue: each team measures performance differently, and each has its own priorities. Some meta-frameworks focus on server-side rendering, while others focus on client-side rendering. We are right back at the issue of comparing apples to spaceships.

All of this inconsistency, and the fact that you're more likely to measure yourself in a category you know you excel in, makes it hard to get a clear picture from existing benchmarks.

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
- Minimum Node version.

Some of these tests can vary widely from project to project, so to keep the comparison fair, we set up a starter project using the default/recommended set provided by each meta-framework's CLI or docs.

### Run Time

- Client Side Rendered via Lighthouse
- Server Side Rendered via Lighthouse
- Initial Load
- Server Side Rendered Throughput
- Server Side Rendered Load Test
- Server Side Rendered Load Test using Framework link components

## Core Web Vitals

To continue our work of capturing the true cost of meta-frameworks, we are expanding our docs to include additional datasets. Thanks to Annie and Barry from Google and Ryan from the E18E community, we pulled in data from the HTTP Archive to provide real-world metrics. We also contributed back and added detection for TanStack, which was missing when we originally started the project. You can view the stats for supported meta-frameworks on its [own page](https://frameworks.e18e.dev/core-web-vitals/), with breakdowns by Desktop and Mobile.

Just as isolated benchmarks can paint a different picture than real usage in production, HTTP archive data can too. A meta-framework doesn't control how people use it or where it's hosted vs the origin of traffic. Sample size can skew data as well; for example, Solid performs very well but has a very small sample size. Maybe everyone building in Solid is just very hyper-focused on performance 😉.

The main takeaway here is that performance and benchmarking are a picture that needs to be looked at from many angles, thinking about all the impact, not just a cool image posted online.

## Impact so far

While working with the meta-framework teams, our benchmarks started finding improvements, which we have started collecting on an [impact page](https://frameworks.e18e.dev/impact/). Sometimes we found these improvements by making our tests fairer. For example, while working with Daniel Roe from Nuxt to make our SSR Load benchmark test fair, we noticed that framework-specific Link components were impacting performance. Daniel used this to improve links in Vue and Nuxt while we split our tests: one without framework component links and one with.

However, we are seeing the Framework Tracker being used in ways we could only hope for at the start:

> As we work on a major version of Solid 2.0 I have used the framework tracker extensively to make improvements to our SSR throughput. It really is an important project for the ecosystem - Brenley (Solid)

By adding Solid 2.0 to Framework Tracker, Brenley has been able to compare it with SolidStart and ensure each release candidate improves.

## Whats next

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
