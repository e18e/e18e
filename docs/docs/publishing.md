# Publishing Packages

As a maintainer, there are many options available to you on how you setup your publishing workflow. This may be manual, semi-automated, or fully automated.

In this document, we will cover a typical workflow with security in mind, and some recipes for more advanced workflows.

## Standard Workflow

TODO: Explain the standard workflow. This should roughly be:

- One workflow (GitHub action)
- Pin actions to a hash
- Trigger on tag or GitHub release publish
- Build the package and `npm publish` in the same job
  - Possibly disable scripts even in CI (but this would mess up things like esbuild, so maybe not)
- Setup OIDC in npm
- Disable tokens in npm
- Require 2FA in npm and GitHub for you and your organisation where possible
- Use a GitHub environment with required reviewers for the publish job
- Setup dependabot or renovate to keep dependencies up to date

### Note on local publishing

TODO: Make sure we mention in a sub-section that it may still be worth doing local 2FA publishes if you're a solo maintainer _until_ GitHub supports 2FA for workflow approvals.

Basically, if you're a solo maintainer it may be safer to publish locally with 2FA for now.

If you're part of an org, or just want to use workflows, certainly do not publish locally.

## Changesets Workflow

TODO: Explain roughly the same as the "Standard workflow", but using `changesets` to manage versions.

- Show a diagram of the flow possibly
- Use the same steps as the standard flow mostly

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
