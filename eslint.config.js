// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

import pluginCypress from 'eslint-plugin-cypress';
export default defineConfig([
  // Cypress e2e tests
  {
    files: ['cypress/**/*.js', 'cypress/**/*.ts'],
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: { ...globals.browser, ...globals.cypress },
    },
    plugins: { cypress: pluginCypress },
    extends: ['plugin:cypress/recommended'],
    rules: {},
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: globals.browser,
    },
    extends: [js.configs.recommended],
    rules: {
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'jsx-quotes': ['error', 'prefer-single'],
      'no-trailing-spaces': 'error',
    },
  },

  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: { prettier: pluginPrettier },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          jsxSingleQuote: true,
          trailingComma: 'es5',
          semi: true,
          endOfLine: 'lf',
          printWidth: 160,
          bracketSameLine: true,
        },
        { usePrettierrc: false },
      ],

      'react/react-in-jsx-scope': 'off',
    },
  },
]);
