import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
    ],
  },

  js.configs.recommended,

  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks':
        reactHooks,
      'react-refresh':
        reactRefresh,
    },
    rules: {
      'react/react-in-jsx-scope':
        'off',
      'react/jsx-uses-react':
        'off',
      'react/prop-types':
        'off',
      'no-unused-vars':
        'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Cypress files
  {
    files: [
      'cypress/**/*.{js,jsx}',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        cy: 'readonly',
        Cypress:
          'readonly',
        describe:
          'readonly',
        it: 'readonly',
        beforeEach:
          'readonly',
        expect:
          'readonly',
      },
    },
    rules: {
      'no-unused-vars':
        'warn',
    },
  },

  // Test files
  {
    files: [
      '**/*.test.{js,jsx}',
    ],
    languageOptions: {
      globals: {
        describe:
          'readonly',
        test: 'readonly',
        expect:
          'readonly',
      },
    },
  },
]