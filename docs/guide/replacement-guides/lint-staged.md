---
description: Modern alternatives to lint-staged for running commands on staged Git files
---

# Replacements for `lint-staged`

> [!NOTE]
> `lint-staged` is still a solid, widely used choice and completely fine for most projects. Below is a smaller/faster alternative if you want fewer deps and a simpler tool.

## `nano-staged`

[`nano-staged`](https://www.npmjs.com/package/nano-staged) is a tiny pre-commit runner for staged (and more) files; much smaller and faster than `lint-staged`, with a simple config.

package.json config:

```json
{
  "lint-staged": { // [!code --]
    "*.{js,ts}": ["prettier --write"] // [!code --]
  }, // [!code --]

  "nano-staged": { // [!code ++]
    "*.{js,ts}": ["prettier --write"] // [!code ++]
  } // [!code ++]
}
```

> [!NOTE]
> Differences to be aware of:
> - `lint-staged` has advanced features like backup stashing, partial-staging handling, per-directory configs in monorepos, and detailed concurrency controls.
> - `nano-staged` focuses on simplicity and speed. If you rely on `lint-staged`’s stash/partial-staging features, keep using `lint-staged`.