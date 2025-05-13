import antfu from '@antfu/eslint-config'

import base from './base.js'

export default antfu({
  type: 'lib',
  react: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false
  },
  typescript: true,
  jsonc: false,
  yaml: false,

  rules: {
    ...base[0].rules,
    'style/jsx-max-props-per-line': ['warn', { maximum: 1, when: 'multiline' }],
    "@typescript-eslint/explicit-function-return-type": "off",
    'style/jsx-quotes': ['error', 'prefer-single'],
  },

  ignores: [
    ...base[0].ignores
  ]
})
