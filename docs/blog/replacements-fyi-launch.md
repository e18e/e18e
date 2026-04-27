---
title: Launching replacements.fyi - A new module replacements website
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
      content: Launching replacements.fyi - A new module replacements website
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

# Launching replacements.fyi - A new module replacements website

_April 27, 2026_

![replacements.fyi cover image](/og/the-year-ahead-2026.png)

Today, we're excited to announce the launch of a new e18e mini-site: [replacements.fyi](https://replacements.fyi)! :rocket:

This site aims to make the module replacements data set more accessible and easier to explore. It provides a searchable, filterable interface for browsing through the various replacements and LLM-friendly routes for programmatic access.

## Module replacements

The [module replacements](https://github.com/e18e/module-replacements) dataset contains mappings of npm packages to their suggested replacements. These range from packages that are no longer maintained, to those with known security vulnerabilities, to those that have more performant alternatives available.

We split these into three categories:

- "native" - packages that have native alternatives available in Node.js or the browser, and can be replaced with zero dependencies.
- "micro-utilities" - packages that are overly granular and can be replaced with a single line of code, or a small snippet.
- "preferred" - packages that have community-recommended alternatives that are more secure, better maintained, or more performant.

There are already quite a few tools which lean on this, such as the [e18e ESLint plugin](https://github.com/e18e/eslint-plugin), the [e18e CLI](https://github.com/e18e/cli) and [npmx](https://npmx.dev).

Overall, the goal of this data is to help developers make better informed decisions about the packages they use, and to encourage the ecosystem to move towards more secure, performant and well-maintained packages.

## The need for a new site

The data is already available and in wide use, but we have always been lacking a way to easily explore it and discover new replacements.

The e18e site does have a set of [replacement docs](https://e18e.dev/docs/replacements/), but these are a subset of the data since they only list documented replacements. All native replacements and snippet replacements are missing in these docs.

On top of that, the data is not easily searchable or filterable, and there is no easy way to browse through it in the context of your preferred runtime (e.g. Node).

## How npmx helps

The [npmx](https://npmx.dev) site already exposes much of this data when viewing a package. For example, if you view `chalk` on npmx, you will see a notice telling you that Node natively supports `styleText` for terminal colours these days.

This has been huge progress towards making this data more visible and useful to the wider community. However, it is still only visible on a per-package basis and as a small part of a much larger interface. There is still a gap for a dedicated site that focuses solely on this data and makes it easy to explore and discover replacements.

## The collaboration

The collaboration story on this project is another great one. Two weeks ago, I threw the idea out there about building a dedicated site for this data, and spun up an empty repo for people to contribute to.

That same day, [@paolo.ricciuti](https://bsky.app/profile/paolo.ricciuti.me) jumped on it and already had a basic svelte-powered site up and running by the end of the day. In the following days, [@AlexanderKaran](https://bsky.app/profile/alexanderkaran.bsky.social), [@rman](https://bsky.app/profile/rman.dev), and [@dreyfus](https://bsky.app/profile/dreyfus11.bsky.social) all got involved, iterating on it day by day.

In the last week alone, there have been **26 merged PRs**. This is before we've even officially announced working on this, purely from chatter in the e18e Discord.

## replacements.fyi

The new [replacements.fyi](https://replacements.fyi) site is the result of this collaboration! :tada:

The aim of this site is to be a focused tool just like [npmgraph](https://npmgraph.js.org) and [pkg-size](https://pkg-size.dev). It doesn't need to do everything, but it should do the one thing it does really well: make it easy to explore and discover module replacements.

Today, the feature list looks like this:

- Search for a package and see if there are any replacements for it.
- Filter replacements by your preferred runtime (e.g. Node, browser).
- View the replacement details, including links to documentation and migration examples.
- LLM-friendly API routes for programmatic access to the data.
- Show minimum runtime versions required for native replacements.

## Future plans

Now that we have the basics sorted, there are a few improvements and features we want to add in the future:

- Ability to set a preferred runtime _version_ (e.g. Node 20.x) to filter out replacements that require newer versions
- Ability to view a package's replaceable dependencies (defer to npmx for a deeper dive into the package graph)
- Better integration with agentic tools

## Get involved

If you want to help out, [join the discord](https://chat.e18e.dev). We will be opening issues for these things and more, so all help is very much welcome and appreciated. Even if you just want to give feedback on the site, or suggest a replacement, that would be amazing!
