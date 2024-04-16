
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
)