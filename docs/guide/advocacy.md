# Advocacy

Much of e18e's work involves making changes in existing open source repositories.
These repositories generally have their own workflows that their maintainers expect to adhere to.
It's important when suggesting changes to repositories to respect those workflows and actively work with those maintainers.

## Coordinating Issues

Many repositories prefer discussing potential changes in an issue before they can fully review a pull request.
Unless a repository maintainer has explicitly indicated a willingness to bypass issue practices, stick with their normal flow and fully fill out the most applicable issue template if they prefer an issue to be filed ahead of any PRs.
[Explaining Changes](#explaining-changes) covers the common information you'll want to include.

### Umbrella e18e Tracking

When many changes are possible for a single repository, please search for an "umbrella" issue in [e18e/ecosystem-issues](https://github.com/e18e/ecosystem-issues), and open one if it doesn't already exist.
That will help with tracking progress and raising visibility for other e18e participants.

We also use these issues to keep track of maintainer preferences around the initiative.
If a maintainer requests a preference, especially one to not be sent e18e pull requests, please note it there.

## Explaining Changes

Some maintainers are not active participants in e18e or have not heard of it.
Suggested changes need to include the contextual information that can clearly and quickly explain to a repository maintainer why the change is for the better.

In general, it's best to demonstrate _tangible benefits_ that are _specific to the project_.
That can change depending on what area(s) of improvement your change falls under.

### Bundle Size

When a project creates a built output such as bundled JS files, and a cleanup is meant to improve the size of those bundles, show the actual file size difference.

This is important because:

* Many changes might change the devDependency tree size, but not impact the bundle
* Swapping out direct usage of a dependency that is also deeply required might result in a net bigger bundle

In the latter case, you might consider prioritizing working on the upstream consumers of that dependency first.

### Dependency tree

If a dependency cleanup is meant to reduce the size of a project's dependency tree, show the actual change to the tree.

An isolated dependency graph (e.g. via `npmgraph.js.org`) can be useful to give a quick overview of the difference between two dependencies.
However, sometimes it is not representative of how the overall project's dependency tree will be affected.
This can be for various reasons, such as the project pulling the same dependencies in elsewhere.

Showing a project dependency graph before and after can be more beneficial for this reason, and may help you find occurrences of target packages you weren't aware of.
See also [Bundle Size](#bundle-size).

### Speed

If a cleanup is meant to improve the performance of a project, showing actual performance measurements for the project would be the best option followed by sharing a more general benchmark together with an explanation of why it is relevant such as the benchmarked method being called in a hot code path.
Performance-oriented developers generally expect comparisons to include reproducible experiments.

Isolated benchmarks of a new dependency can be useful when the comparison is large (i.e. you're comparing against a _much_ slower dependency).
However, in cases where the gap is small, it is often better to benchmark the project before and after instead of the dependency itself in isolation.
Consider using a high-level tool like [hyperfine](https://github.com/sharkdp/hyperfine) to measure end-to-end performance.

Many maintainers just prefer a project benchmark too, so always refer to the contribution guide or ask the maintainers what their preference is.
Downstream users often have very different usage scenarios and/or don't use some dependencies in hot paths.

If your change does noticeable speed something up, be sure to call it out in the issue/PR description.
Developers love noticeable performance improvements!

## What Isn't Convincing

Most open source maintainers regularly deal with drive-by contributions that ignore their workflows and do a poor job of explaining themselves.
Be careful not to make these common mistakes, as that weakens the case for your change and for e18e as a whole.

### Abstract Reports

Don't be vague.
Indicating that a cleanup could offer bug fixes, improved developer experience, or other features in the abstract is not convincing without any evidence those impact the project.

* For bug fixes, be sure to have a reproduction -- much like any other kind of bug report
* For developer experience and other features, you'll similarly want to be able to demonstrate why the new way is tangibly better

### Downloads and Stars

Non-user-facing metrics such as GitHub Stars and npm download statistics are not generally convincing.
Both can easily be gamed and thus may not be seen as reliable metrics.

If your goal is to show that a package is well-known and trusted, it's better to demonstrate the factors that would result in those high numbers.
Most often that is from showing lists of dependents that include many existing projects, especially other high-profile ones.

### Support Ranges

Some cleanups involve restricting project dependency ranges, such as raising a minimum Node.js version from an older version to the current LTS.
Stricter dependency or platform support ranges are a drawback to users as it may cause additional difficulty in upgrading the library.
You'll want to demonstrate that the tangible benefits that come from them are large enough for the majority of users that they they are worth the trade-off.

For example, if you're proposing removing old code, show that the cleanup improves the bundle size, performance, and any other improved metrics.
