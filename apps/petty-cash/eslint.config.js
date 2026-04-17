import config from '@ando/eslint-config/next';

export default [
  ...config,
  {
    // petty-cash was written against less strict rules; keep legacy code passing
    // until migration-specific refactors happen in their own PRs.
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
