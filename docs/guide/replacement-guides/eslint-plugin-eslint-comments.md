# Replacements for `eslint-plugin-eslint-comments`

## `@eslint-community/eslint-plugin-eslint-comments`

[`@eslint-community/eslint-plugin-eslint-comments`](https://github.com/eslint-community/eslint-plugin-eslint-comments) is the actively maintained successor with updated dependencies, flat config support, and continued development.

```js
import js from "@eslint/js"
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs" // [!code ++]

export default [
    js.configs.recommended,
    comments.recommended, // [!code ++]
    {
        rules: {
            "@eslint-community/eslint-comments/no-unused-disable": "error", // [!code ++]
        }
    },
]
```

If you're using a legacy config format:

```js
module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:eslint-comments/recommended", // [!code --]
        "plugin:@eslint-community/eslint-comments/recommended" // [!code ++]
    ],
    rules: {
        "eslint-comments/no-unused-disable": "error" // [!code --]
        "@eslint-community/eslint-comments/no-unused-disable": "error" // [!code ++]
    }
}
```
