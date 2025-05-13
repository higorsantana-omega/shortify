export default [
  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never']
    },
    ignores: ["dist/**"],
  }
]
