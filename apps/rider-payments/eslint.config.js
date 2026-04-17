import config from '@ando/eslint-config/next';

export default [
  ...config,
  {
    // Rider Payments was written against looser rules; keep it compiling until
    // migration-specific refactors happen in their own PRs.
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': 'off',
    },
  },
];
