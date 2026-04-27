---
title: replacements.fyi - A new module replacements website
author:
  - name: James Garbutt
sidebar: false
date: 2026-04-27
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: replacements.fyi - A new module replacements website
  - - meta
    - property: og:url
      content: https://e18e.dev/blog/replacements-fyi-launch
  - - meta
    - property: og:description
      content: A look at the new module replacements website and the collaboration that went into it
  - - meta
    - property: og:image
      content: https://e18e.dev/og/the-year-ahead-2026.png
---

# replacements.fyi - A new module replacements website

_April 27, 2026_

![replacements.fyi cover image](/og/the-year-ahead-2026.png)

[replacements.fyi](https://replacements.fyi) is live! :rocket:

It's a new, focused interface for exploring the e18e module replacements dataset - search any package and instantly see if there's a native equivalent or a community-recommended alternative.

What makes this launch worth writing about isn't just the site though - it's how it got built. From a Discord message to a live site in a couple of days, here's the story.

## The idea

The [module replacements](https://github.com/e18e/module-replacements) project provides community-defined mappings of npm packages to their recommended alternatives, whether those be native functionality, snippets, or other packages.

This data is already used in various tools today, such as the [e18e ESLint plugin](https://github.com/e18e/eslint-plugin), the [e18e CLI](https://github.com/e18e/cli) and [npmx](https://npmx.dev).

However, there isn't a great way to explore this data in a more general way. The e18e site has a set of [replacement docs](https://e18e.dev/docs/replacements/), but these are a subset of the data since they only list documented replacements. All native replacements and snippet replacements are missing in these docs.

The solution? Build a dedicated site for exploring this data! A place where you can search for packages and see if there are any replacements available, filter by runtime, and view the details of each replacement.

## The collaboration

Two weeks ago, I threw the idea out there in the e18e Discord and asked a few people what they thought about it. That same day, [@paolo.ricciuti](https://bsky.app/profile/paolo.ricciuti.me) jumped on it and already had a basic svelte-powered site up and running by the end of the day! :fire:

In the following days, [@AlexanderKaran](https://bsky.app/profile/alexanderkaran.bsky.social), [Roman](https://bsky.app/profile/rman.dev), and [@dreyfus](https://bsky.app/profile/dreyfus11.bsky.social) all joined in the fun and started working on the project with Paolo.

In the last week alone, there have been **26 merged PRs**. All of this before we'd even officially announced the project, purely from chatter in the e18e Discord.

This kind of collaboration is always amazing to see. Just a great group of people who care about improving the ecosystem, coming together to build something useful for everyone.

## replacements.fyi

The new [replacements.fyi](https://replacements.fyi) site is the result of this collaboration! :tada:

The aim of this site is to be a focused tool just like [npmgraph](https://npmgraph.js.org) and [pkg-size](https://pkg-size.dev). It doesn't need to do everything, but it should do the one thing it does really well: make it easy to explore and discover module replacements.

At its core, the site is a simple search interface that allows you to look up any npm package and see if there are any recommended replacements for it.

The data gives us the ability to do more than this, though. So we also expose filters to allow you to narrow down replacements by runtime, and we show details for each replacement, including the minimum runtime version required, plus links to documentation and examples where available.

In a world driven largely by AI agents these days, we've also tried to make the site as agent-friendly as possible. Giving agents direct access to replacement advice means something like Claude can now produce code which leans more towards using native functionality than installing new dependencies.

## Prior art: npmx

The [npmx](https://npmx.dev) site already exposes much of this data when viewing a package. For example, if you view `chalk` on npmx, you will see a notice telling you that Node natively supports `styleText` for terminal colours these days.

![npmx chalk screenshot](/images/npmx-chalk.jpg)

This has greatly improved the visibility of replacements, and has already led to many clean up PRs throughout the ecosystem.

If you want to see more than the replacements of a package, npmx is still a great place to go. In addition to the replacement info, the e18e community has also collaborated with npmx on displaying things like package size changes, security notices, and more.

## Future plans

Now that we have the basics sorted, there are a few improvements and features we want to add in the future:

- Ability to set a preferred runtime _version_ (e.g. Node 20.x) to filter out replacements that require newer versions
- Ability to view a package's replaceable dependencies (defer to npmx for a deeper dive into the package graph)
- Improved integration with agentic tools

## Get involved

If you want to help out, [join the discord](https://chat.e18e.dev). We will be opening issues for these things and more, so all help is very much welcome and appreciated. Even if you just want to give feedback on the site, or suggest a replacement, that would be amazing!
