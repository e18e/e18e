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
    files: ['docs/guide/replacement-guides/**/*.md/*'],
    rules: {
      'perfectionist/sort-imports': 'off',
      'jsonc/no-dupe-keys': 'off',
    },
  },
)
