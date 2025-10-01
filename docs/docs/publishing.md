# Publishing Packages

As a maintainer, there are many options available to you on how you setup your publishing workflow. This may be manual, semi-automated, or fully automated.

In this document, we will cover a typical workflow with security in mind, and some recipes for more advanced workflows.

## Standard Workflow

With the rise of supply-chain attacks, it is more important than ever to ensure that your publishing workflow is secure. The following is the typical workflow we recommend for most maintainers.

### Setting up the GitHub repository

In your GitHub repository, there are a few important settings to configure:

- `Settings > Actions > General`
  - Check the "Require actions to be pinned to a full-length commit SHA" option
  - Check the "Require approval for first-time contributors" option
  - Ensure the default workflow permission is set to "Read repository contents and packages permissions"
- `Settings > Rules > Rulesets`
  - Create a ruleset for your default branch (e.g. `main`)
  - Require a pull request before merging
- `Settings > Secrets & Variables > Actions`
  - Remove any existing npm secrets

### Setting up Trusted Publishing

Inside your npm account, navigate to the package you're going to publish and configure the settings as follows:

- Set publishing access to "Require two-factor authentication and disallow tokens (recommended)"
- Setup a GitHub action trusted publisher
  - Organization and repository are the ones you're publishing from
  - Workflow filename is the name of the workflow file you'll create (e.g. `publish.yml`)

### The GitHub workflow

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

### Publishing!

To publish a new version of your package, you can now create a tag against main:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Then in the GitHub UI, navigate to the "Releases" page and click "Draft a new release".

You can now choose the tag you just pushed, and click "Generate release notes" to automatically generate the changelog from your commit history.

Finally, click "Publish release" to trigger the workflow and publish your package.

### Setup dependabot

We also highly recommend setting up [dependabot](https://docs.github.com/en/code-security/dependabot) or [renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/) to keep your dependencies up to date.

This will ensure that any security vulnerabilities in your dependencies are addressed promptly.

## `@e18e/setup-publish`

The [`@e18e/setup-publish`](https://github.com/e18e/setup-publish) CLI can help you set up the above workflow and a few other useful workflows in your repository.

You can use it with `npx`:

```bash
npx @e18e/setup-publish
```

### Recipes

Also in the [`@e18e/setup-publish`](https://github.com/e18e/setup-publish) repository, you can view the following templates:

- [default](https://github.com/e18e/setup-publish/blob/main/templates/default.yml) - The standard workflow described above
- [changesets](https://github.com/e18e/setup-publish/blob/main/templates/changesets.yml) - A workflow using `changesets` for versioning and changelog generation
- [changelogithub](https://github.com/e18e/setup-publish/blob/main/templates/changelogithub.yml) - A workflow using `changelogithub` for changelog generation

Should include:

- changesets
- changelogithub

Also:

- Show a diagram of the flow possibly
- Use the same steps as the standard flow mostly

This will guide you through setting up the publishing workflow, with support for third party tools like `changesets` and `changelogithub`.

## Note on local publishing

There's currently a feature request and [ongoing discussion](https://github.com/orgs/community/discussions/174507#discussioncomment-14559845) about supporting 2FA for workflow approvals on GitHub.

Until this is supported, using trusted publishing can actually be _less_ secure for solo-maintainers than publishing locally with 2FA enabled.

If your GitHub token leaks somehow, an attack could publish through your trusted workflow the same way a legitimate release would.

Once environment approvals support 2FA, this will no longer be a concern as the attacker would need to pass the 2FA check to approve the workflow.

For these reasons, if you're a solo maintainer, you may want to consider publishing locally with 2FA enabled until this feature is available.

## Tips & Tools

TODO: Show some further tips and tools from the community.

Briefly explain each of these:

- [`actions-up`](https://github.com/azat-io/actions-up) for managing updates of GitHub actions
- [`zizmor`](https://github.com/zizmorcore/zizmor) for linting GitHub workflows
- [`publint`](https://github.com/publint/publint) for linting that your publish config is right
- [`taze`](https://github.com/antfu-collective/taze) for managing dependency updates manually
- [`multiocular`](https://github.com/multiocular-com/multiocular) for visualising diffs of dependency changes

Either a table or a bullet list will probably work as long as we have a description, name, and link.

## Further Security

TODO: Explain further security measures that can be taken. Each as a sub-section

Probably these:

- Using physical security keys for 2FA
  - Or webauthn if that isn't possible
- Remove all npm tokens from your account
- Add protection rules to branches and tags
- Enable immutable releases
