import antfu from '@antfu/eslint-config'

import globals from 'globals'

export default antfu({
  type: 'app',
  typescript: true,
  react: false,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  jsonc: false,
  yaml: false,

  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',

    'ts/no-explicit-any': 'off',
    'ts/no-floating-promises': 'warn',
    'ts/no-unsafe-argument': 'warn',
    'ts/explicit-function-return-type': 'off',

    'ts/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  },

  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    sourceType: 'commonjs',
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    }
  },

  ignores: [
    'dist',
    'node_modules'
  ]
})
