/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'workspace',
        'petty-cash',
        'rider-payments',
        'auth',
        'ui',
        'config',
        'db',
        'tsconfig',
        'eslint-config',
        'infra',
        'e2e',
        'ci',
        'docs',
        'repo',
      ],
    ],
    'header-max-length': [2, 'always', 100],
  },
};
