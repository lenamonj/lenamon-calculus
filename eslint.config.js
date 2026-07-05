import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'coverage']),

  // Application source
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Allow intentionally unused capitalized/underscore-prefixed bindings and
      // unused catch bindings (the deliberate storage-error swallow pattern).
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_', caughtErrors: 'none' }],
      // Empty catch blocks were all removed (each now logs or documents the
      // swallow); disallowing them keeps that settled class closed.
      'no-empty': ['error'],
      // Newer opinionated rules that conflict with deliberate, separately-tracked
      // patterns: App.jsx is a single-module app that also exports helpers for
      // tests (module split is a tracked item), and the KaTeX-ready and
      // completion effects set state intentionally. Kept as warnings so they
      // surface without blocking the baseline lint.
      'react-refresh/only-export-components': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },

  // Vitest test files run with globals: true, in a jsdom (browser) environment.
  {
    files: ['src/**/*.test.{js,jsx}', 'test/**/*.{js,jsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.vitest },
    },
  },

  // Node-side config files.
  {
    files: ['*.config.js', 'eslint.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
