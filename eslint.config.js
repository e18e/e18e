import antfu from '@antfu/eslint-config'

export default antfu(
  {},
  {
    ignores: [
      'docs/.vitepress/cache',
    ],
  },
  {
    files: [
      '*.d.ts',
    ],
    rules: {
      'unused-imports/no-unused-vars': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
    },
  },
  {
    files: ['docs/docs/replacements/**/*.md/*'],
    rules: {
      'antfu/curly': 'off',
      'antfu/if-newline': 'off',
      'jsonc/no-dupe-keys': 'off',
      'perfectionist/sort-imports': 'off',
      'style/indent': 'off',
    },
  },
)
