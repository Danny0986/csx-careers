import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**'
    ]
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['client/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser
    }
  },

  {
    files: ['server/**/*.ts'],
    languageOptions: {
      globals: globals.node
    }
  }
];