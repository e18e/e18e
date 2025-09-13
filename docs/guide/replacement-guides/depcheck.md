---
description: Modern alternatives to depcheck for analyzing project dependencies and unused code
---

# Replacements for `depcheck`

## `knip`

[knip](https://github.com/webpro-nl/knip) is a more actively maintained and feature-rich alternative to [`depcheck`](https://github.com/depcheck/depcheck).

Example:

```json
{
  "ignores": ["eslint", "babel-*"], //[!code --]
  "ignoreDependencies": ["eslint", "babel-*"], // [!code ++]
}
```
