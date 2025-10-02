# Publishing Packages

## Introduction

As a maintainer, there are many options available to you on how you setup your publishing workflow. This may be manual, semi-automated, or fully automated.

With the rise of supply-chain attacks, it is more important than ever to ensure that your publishing workflow is secure. Maintainers need to take extra care to ensure malicious code and people cannot compromise their packages via the publishing workflow.

In this document, we will cover a typical workflow with security in mind, and some recipes for more advanced workflows.

## Prerequisites

### Setting up the GitHub repository

First thing is to ensure your GitHub repository is setup securely.

#### Actions Settings

Navigate to `Settings > Actions > General` and configure:

- ✓ Require actions to be pinned to a full-length commit SHA
- ✓ Require approval for first-time contributors
- ✓ Set default workflow permissions to "Read repository contents and packages permissions"

These settings ensure that outside contributors cannot run arbitrary code in your workflows without your approval first, and that all actions used in your workflows are pinned to a specific commit SHA, preventing supply-chain attacks through action updates.

> [!NOTE]
> If your repository is part of an organization, we highly recommend you make these changes to the organisation as a whole rather than this specific repository.
> This will ensure all repositories in the organisation have a consistent security measures in place.

#### Branch Protection

Navigate to `Settings > Branches` and configure:

- ✓ Create a ruleset for your default branch (e.g. `main`)
- ✓ Require a pull request before merging
- ✓ Require approvals (set to at least 1)
- ✓ Dismiss stale pull request approvals when new commits are pushed
- ✓ Require approval of the most recent reviewable push

This ensures that nobody can push directly to the `main` branch, and that all changes are reviewed before being merged.

#### Secrets & Variables

Navigate to `Settings > Secrets & Variables > Actions`:

- Remove all unnecessary repository secrets (e.g. npm tokens, as OIDC can be used instead)

### Setting up Trusted Publishing

Now we need to configure trusted publishing for our npm package. This will ensure that only workflows we trust can publish new versions of our package.

Navigate to your npm package page, and click on the "Settings" tab. You will now see a "Trusted Publishing" section.

In this "Trusted Publishing" section, setup a trusted publisher for the workflow you're about to create with the following settings:

- Organisation and repository are the ones you're publishing from
- Workflow filename is the name of the workflow file you'll create (e.g. `publish.yml`)

While you're in there, also check the box for "Require two-factor authentication and disallow tokens (recommended)". This will ensure that manual publishing _must_ use 2FA.

> [!TIP]
> It can be a slow job opening all of your packages individually and changing these settings. To assist with this, you can use the [open-packages-on-npm](https://github.com/antfu/open-packages-on-npm) tool in your local repository to open the package(s) on npm, each in a new tab. You can then use this [userscript](https://github.com/sxzz/userscripts/blob/main/src/npm-trusted-publisher.md) to quickly update the trusted publisher settings on each page.

## Standard Workflow

Next, we need to create the GitHub workflow that will handle the publishing.

For this, let's use a template from the [setup-publish](https://github.com/e18e/setup-publish) repository:

[`publish.yml`](https://github.com/e18e/setup-publish/blob/main/templates/default.yml)

In this file, you'll see we have the following jobs:

- Test (runs tests)
- Build (builds the package)
- Publish (publishes the already built package)

There are a few important things to note about this workflow:

- The package is built in a separate job to publishing, ensuring the publish permissions are not exposed to runtime build code
- All actions are pinned to a full-length commit SHA
- Install is done with `--ignore-scripts` to avoid running any lifecycle scripts that may be malicious

When updating the workflow, keep these constraints in mind to ensure the security of your publishing process.

> [!TIP]
> It is also worth setting `ignore-scripts=true` in your project's `.npmrc` file so this applies to all installs, not just in the workflow.
> Similarly, we highly recommend you do this for your local user using `npm config set -g ignore-scripts true`.

### Creating a Release

To publish a new version of your package, you can now create a tag against main:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Then in the GitHub UI, navigate to the "Releases" page and click "Draft a new release".

You can now choose the tag you just pushed, and click "Generate release notes" to automatically generate the changelog from your commit history.

Finally, click "Publish release" to trigger the workflow and publish your package.

## Alternative Workflows

The [`@e18e/setup-publish`](https://github.com/e18e/setup-publish) CLI can help you set up the above workflow and a few other useful workflows in your repository.

You can use it with `npx`:

```bash
npx @e18e/setup-publish
```

This CLI uses a set of community defined [workflow templates](https://github.com/e18e/setup-publish/blob/main/templates) to help guide you in setting up your own workflow.

### Using changesets for versioning and changelog generation

If you'd prefer to use [changesets](https://github.com/changesets/changesets) to manage your versioning and changelog generation, you can use the [changesets template](https://github.com/e18e/setup-publish/blob/main/templates/changesets.yml).

This template differs from the basic workflow in a few ways:

- Releases are created by merging a generated changesets release pull request to `main`
- All other merged pull requests will automatically update the release pull request
- The changelog is generated by changesets, and included in the release pull request
- You no longer need to manually create releases or tags in GitHub

### Using changelogithub for changelog generation

You can also use [changelogithub](https://github.com/antfu/changelogithub) to generate your changelog from commit messages. You can set this up using the [changelogithub template](https://github.com/e18e/setup-publish/blob/main/templates/changelogithub.yml).

In this workflow:

- You must still push tags manually
- Any time a tag is pushed, a GitHub release is created with a changelog generated from commit messages
- Any time a tag is pushed, the package is published

## Maintenance & Tooling

### Managing dependency updates

We also highly recommend setting up [dependabot](https://docs.github.com/en/code-security/dependabot) or [renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/) to keep your dependencies up to date.

This will ensure that any security vulnerabilities in your dependencies are addressed promptly.

### Keeping actions up to date

It is important to keep your GitHub actions up to date, and always reference them using a full-length commit SHA.

To assist with switching to using full-length commit SHAs, you can use the [`actions-up`](https://github.com/azat-io/actions-up) CLI.

```bash
npx actions-up
```

This will update your workflow files to use the latest commit SHA for each action.

Once you've made the switch, you can then use dependabot, renovate or `actions-up` itself to keep your actions up to date.

### Linting workflows for issues and vulnerabilities

You can also use [`zizmor`](https://github.com/zizmorcore/zizmor) to lint your GitHub workflows for common issues. This will find things like template injection vulnerabilities, and excessive permission scopes.

For example, to lint your `publish.yml` workflow:

```bash
zizmor .github/workflows/publish.yml
```

### Validating package configuration

Use the [`publint`](https://github.com/publint/publint) tool to lint your package for common publishing issues. This will find things like missing files, incorrect `package.json` fields, and much more.

You can view the full list of rules in the [publint documentation](https://publint.dev/rules).

To run this, simply execute:

```bash
npx publint
```

### Visualising dependency changes

You can use [`multiocular`](https://github.com/multiocular-com/multiocular) to visualise changes in your dependencies between versions.

This will give you a visualisation of what code has changed when a dependency updated, which can help you identify potential security issues and breaking changes.

## Further Security

### Use an environment with required reviewers

It is possible to specify an `environment` in your workflow:

```yaml [publish.yml]
jobs:
  publish:
    environment: production
```

In GitHub, you can then configure this environment to require manual approval before the job can proceed. This ensures that even if you manage to trigger the workflow, a human still needs to review and approve the job before it can publish.

> [!IMPORTANT]
> If you do this, ensure that you set the environment in your npm trusted publishing settings too.

### Use hardware security keys

Physical security keys (like YubiKey) provide strong 2FA protection and are generally much more secure than using an authenticator app or SMS.

### Use protection rules in GitHub

We already noted that `main` should have a protection rule to prevent unreviewed changes. It would also be a good idea to add similar rules to any other long-lived branches you may have, and to _all_ tags.

### Use immutable releases

Enable [immutable releases](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/immutable-releases) on GitHub and this will prevent any changes to tags or GitHub releases after they are created. This will ensure that once a release is created, it cannot be modified or deleted.

## Sole Maintainer Considerations

There's currently a feature request and [ongoing discussion](https://github.com/orgs/community/discussions/174507#discussioncomment-14559845) about supporting 2FA for workflow approvals on GitHub.

Until this is supported, using trusted publishing can actually be _less_ secure for solo-maintainers than publishing locally with 2FA enabled.

If your GitHub token leaks somehow, an attack could publish through your trusted workflow the same way a legitimate release would.

Once environment approvals support 2FA, this will no longer be a concern as the attacker would need to pass the 2FA check to approve the workflow.

For these reasons, if you're a solo maintainer, you may want to consider publishing locally with 2FA enabled until this feature is available. Having said that, **please ensure you still follow all other security recommendations in this document.**
