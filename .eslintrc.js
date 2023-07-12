module.exports = {
  extends: [require.resolve('arui-presets-lint/eslint'), 'plugin:react/jsx-runtime'],
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  overrides: [
    {
      files: ['config/**/*.ts', 'src/global-definitions.d.ts', 'src/libs.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.{ts,tsx,js,jsx}'],
      },
    ],
    'import/no-default-export': 'error',
    indent: 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^action' }],
    'no-nested-ternary': 'off',
    'no-unneeded-ternary': 'off',
    'arrow-body-style': 'warn',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },
  ignorePatterns: ['coverage', 'cypress.config.ts'],
};
